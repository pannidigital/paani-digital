'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioData, Project, Photo, Video } from '@/types/portfolio';

// --- Components ---

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}) => (
    <AnimatePresence>
        {isOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md relative z-10 border border-gray-100"
                >
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-black text-center mb-2">{title}</h3>
                    <p className="text-gray-600 text-center mb-8">{message}</p>
                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => { onConfirm(); onClose(); }}
                            className="flex-1 px-6 py-3 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 transition-all shadow-lg shadow-red-500/30"
                        >
                            Delete
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
    </AnimatePresence>
);

const SuccessNotification = ({
    show,
    message
}: {
    show: boolean;
    message: string;
}) => (
    <AnimatePresence>
        {show && (
            <motion.div
                initial={{ opacity: 0, y: -100, scale: 0.5 }}
                animate={{ opacity: 1, y: 20, scale: 1 }}
                exit={{ opacity: 0, y: -100, scale: 0.5 }}
                className="fixed top-4 left-1/2 -translate-x-1/2 z-[110] bg-white rounded-2xl px-8 py-4 shadow-2xl border border-green-100 flex items-center gap-4"
            >
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <span className="font-bold text-black text-lg">{message}</span>
            </motion.div>
        )}
    </AnimatePresence>
);

// --- Main Page ---

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [data, setData] = useState<PortfolioData | null>(null);
    const [activeTab, setActiveTab] = useState<'store' | 'website' | 'photos' | 'videos'>('store');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState<number | null>(null);

    // UI States
    const [showSuccess, setShowSuccess] = useState(false);
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        onConfirm: () => void;
        title: string;
        message: string;
    }>({
        isOpen: false,
        onConfirm: () => { },
        title: '',
        message: ''
    });

    useEffect(() => {
        if (isAuthenticated) {
            fetchPortfolio();
        }
    }, [isAuthenticated]);

    const fetchPortfolio = async () => {
        try {
            const res = await fetch('/api/portfolio');
            const json = await res.json();
            setData(json);
        } catch (error) {
            console.error('Failed to fetch portfolio:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === '12345') {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect password');
        }
    };

    const handleSave = async () => {
        if (!data) return;
        setSaving(true);
        try {
            const res = await fetch('/api/portfolio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (res.ok) {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            } else {
                alert(`Failed to update portfolio: ${result.error}${result.details ? `\n\nDetails: ${result.details}` : ''}`);
            }
        } catch (error) {
            console.error('Save error:', error);
            alert('An unexpected error occurred while saving.');
        } finally {
            setSaving(false);
        }
    };

    const handleFileUpload = async (file: File, index: number, type: 'photo' | 'project', category?: 'store' | 'website') => {
        setUploading(index);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const json = await res.json();
            if (res.ok && json.url) {
                if (type === 'photo') {
                    updatePhoto(index, 'src', json.url);
                } else if (type === 'project' && category) {
                    updateProject(category, index, 'image', json.url);
                }
            } else {
                alert(`Failed to upload image: ${json.error}${json.details ? `\n\nDetails: ${json.details}` : ''}`);
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('An unexpected error occurred during upload.');
        } finally {
            setUploading(null);
        }
    };

    const updateProject = (category: 'store' | 'website', index: number, field: keyof Project, value: string) => {
        if (!data) return;
        const newData = JSON.parse(JSON.stringify(data));
        newData.caseStudies[category][index] = { ...newData.caseStudies[category][index], [field]: value };
        setData(newData);
    };

    const addProject = (category: 'store' | 'website') => {
        if (!data) return;
        const newData = JSON.parse(JSON.stringify(data));
        newData.caseStudies[category].unshift({
            title: '',
            image: '',
            summary: '',
            details: '',
            link: ''
        });
        setData(newData);
    };

    const removeProject = (category: 'store' | 'website', index: number) => {
        setConfirmModal({
            isOpen: true,
            title: 'Delete Project?',
            message: 'Are you sure you want to remove this project? This action cannot be undone.',
            onConfirm: () => {
                if (!data) return;
                const newData = JSON.parse(JSON.stringify(data));
                newData.caseStudies[category].splice(index, 1);
                setData(newData);
            }
        });
    };

    const updatePhoto = (index: number, field: keyof Photo, value: any) => {
        if (!data) return;
        const newData = JSON.parse(JSON.stringify(data));
        newData.photos[index] = { ...newData.photos[index], [field]: value };
        setData(newData);
    };

    const addPhoto = () => {
        if (!data) return;
        const newData = JSON.parse(JSON.stringify(data));
        newData.photos.unshift({
            id: Date.now(),
            src: '',
            alt: '',
            category: 'Model'
        });
        setData(newData);
    };

    const removePhoto = (index: number) => {
        setConfirmModal({
            isOpen: true,
            title: 'Delete Photo?',
            message: 'Are you sure you want to remove this photo from the gallery?',
            onConfirm: () => {
                if (!data) return;
                const newData = JSON.parse(JSON.stringify(data));
                newData.photos.splice(index, 1);
                setData(newData);
            }
        });
    };

    const updateVideo = (index: number, field: keyof Video, value: any) => {
        if (!data) return;
        const newData = JSON.parse(JSON.stringify(data));
        newData.videos[index] = { ...newData.videos[index], [field]: value };
        setData(newData);
    };

    const addVideo = () => {
        if (!data) return;
        const newData = JSON.parse(JSON.stringify(data));
        newData.videos.unshift({
            id: Date.now(),
            title: '',
            category: 'Commercial',
            url: ''
        });
        setData(newData);
    };

    const removeVideo = (index: number) => {
        setConfirmModal({
            isOpen: true,
            title: 'Delete Video?',
            message: 'Are you sure you want to remove this video from the showcase?',
            onConfirm: () => {
                if (!data) return;
                const newData = JSON.parse(JSON.stringify(data));
                newData.videos.splice(index, 1);
                setData(newData);
            }
        });
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-blue-950 flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-md">
                    <h1 className="text-3xl font-bold text-black mb-6 text-center">Admin Login</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-black font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black"
                                placeholder="Enter admin password"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg">
                            Login
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    if (loading || !data) {
        return <div className="min-h-screen bg-blue-950 flex items-center justify-center text-white text-2xl">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 pb-20 text-black">
            <SuccessNotification show={showSuccess} message="Changes saved successfully!" />
            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirmModal.onConfirm}
                title={confirmModal.title}
                message={confirmModal.message}
            />

            <header className="bg-white text-black py-6 shadow-md sticky top-0 z-10 border-b border-gray-200">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <h1 className="text-2xl font-bold text-black">Portfolio Admin</h1>
                        <a
                            href="/"
                            target="_blank"
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg transition-all text-sm flex items-center gap-2"
                        >
                            Visit Website <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 hidden sm:inline">Logged in as Admin</span>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
                        >
                            {saving ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Saving...
                                </>
                            ) : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 mt-8">
                <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-200">
                    {(['store', 'website', 'photos', 'videos'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-3 rounded-xl font-bold capitalize transition-all ${activeTab === tab
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 min-h-[600px]">
                    {/* Case Studies (Store & Website) */}
                    {(activeTab === 'store' || activeTab === 'website') && (
                        <div className="space-y-8">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-6">
                                <h2 className="text-3xl font-bold text-black capitalize">{activeTab} Projects</h2>
                                <button
                                    onClick={() => addProject(activeTab)}
                                    className="bg-green-50 text-green-600 hover:bg-green-100 font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2 border border-green-200"
                                >
                                    <span className="text-xl">+</span> Add Project
                                </button>
                            </div>
                            <div className="grid gap-8">
                                {data.caseStudies[activeTab].map((project, index) => (
                                    <div key={index} className="bg-gray-50 rounded-2xl p-8 space-y-6 relative group border border-gray-200 hover:border-blue-300 transition-colors">
                                        <button
                                            onClick={() => removeProject(activeTab, index)}
                                            className="absolute top-6 right-6 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-lg transition-all font-bold shadow-sm"
                                            title="Remove Project"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                        <div className="grid lg:grid-cols-3 gap-8">
                                            <div className="lg:col-span-1 space-y-4">
                                                <div className="aspect-video bg-white rounded-xl overflow-hidden border border-gray-200 shadow-inner relative group/upload">
                                                    {project.image ? (
                                                        <img src={project.image} alt="Preview" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                                                    )}
                                                    <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/upload:opacity-100 transition-opacity cursor-pointer text-white font-bold text-sm">
                                                        {uploading === index ? 'Uploading...' : 'Upload Image'}
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            accept="image/*"
                                                            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], index, 'project', activeTab)}
                                                        />
                                                    </label>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Image Path</label>
                                                    <input
                                                        type="text"
                                                        value={project.image}
                                                        onChange={(e) => updateProject(activeTab, index, 'image', e.target.value)}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-black bg-white"
                                                        placeholder="/uploads/..."
                                                    />
                                                </div>
                                            </div>
                                            <div className="lg:col-span-2 space-y-6">
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Project Title</label>
                                                        <input
                                                            type="text"
                                                            value={project.title}
                                                            onChange={(e) => updateProject(activeTab, index, 'title', e.target.value)}
                                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-black bg-white"
                                                            placeholder="Project Title"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Website URL</label>
                                                        <input
                                                            type="text"
                                                            value={project.link || ''}
                                                            onChange={(e) => updateProject(activeTab, index, 'link', e.target.value)}
                                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-black bg-white"
                                                            placeholder="https://..."
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Short Summary</label>
                                                    <textarea
                                                        value={project.summary}
                                                        onChange={(e) => updateProject(activeTab, index, 'summary', e.target.value)}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none h-20 text-black bg-white"
                                                        placeholder="Short Summary"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Detailed Description</label>
                                                    <textarea
                                                        value={project.details}
                                                        onChange={(e) => updateProject(activeTab, index, 'details', e.target.value)}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none h-32 text-black bg-white"
                                                        placeholder="Detailed Description"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Photos */}
                    {activeTab === 'photos' && (
                        <div className="space-y-8">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-6">
                                <h2 className="text-3xl font-bold text-black">Photos Gallery</h2>
                                <button
                                    onClick={addPhoto}
                                    className="bg-green-50 text-green-600 hover:bg-green-100 font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2 border border-green-200"
                                >
                                    <span className="text-xl">+</span> Add Photo
                                </button>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {data.photos.map((photo, index) => (
                                    <div key={index} className="bg-gray-50 rounded-2xl p-5 space-y-4 relative group border border-gray-200 hover:border-blue-300 transition-colors">
                                        <button
                                            onClick={() => removePhoto(index)}
                                            className="absolute top-3 right-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-1.5 rounded-lg transition-all font-bold shadow-sm z-10"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                        <div
                                            className="aspect-square bg-white rounded-xl overflow-hidden border border-gray-200 shadow-inner relative group/photo"
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                const file = e.dataTransfer.files[0];
                                                if (file) handleFileUpload(file, index, 'photo');
                                            }}
                                        >
                                            {photo.src ? (
                                                <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4 text-center">
                                                    <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    <span className="text-xs">Drag & Drop or Click to Upload</span>
                                                </div>
                                            )}
                                            <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity cursor-pointer text-white font-bold text-sm">
                                                {uploading === index ? 'Uploading...' : 'Upload Image'}
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], index, 'photo')}
                                                />
                                            </label>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Image Path</label>
                                                <input
                                                    type="text"
                                                    value={photo.src}
                                                    onChange={(e) => updatePhoto(index, 'src', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-black bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                                                    placeholder="/uploads/..."
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Alt Text</label>
                                                <input
                                                    type="text"
                                                    value={photo.alt}
                                                    onChange={(e) => updatePhoto(index, 'alt', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-black bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                                                    placeholder="Alt Text"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Category</label>
                                                <select
                                                    value={photo.category}
                                                    onChange={(e) => updatePhoto(index, 'category', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm text-black bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                                                >
                                                    <option value="Model">Model</option>
                                                    <option value="Commercial">Commercial</option>
                                                    <option value="Event">Event</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Videos */}
                    {activeTab === 'videos' && (
                        <div className="space-y-8">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-6">
                                <h2 className="text-3xl font-bold text-black">Video Gallery</h2>
                                <button
                                    onClick={addVideo}
                                    className="bg-green-50 text-green-600 hover:bg-green-100 font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2 border border-green-200"
                                >
                                    <span className="text-xl">+</span> Add Video
                                </button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                {data.videos.map((video, index) => (
                                    <div key={index} className="bg-gray-50 rounded-2xl p-8 space-y-6 relative group border border-gray-200 hover:border-blue-300 transition-colors">
                                        <button
                                            onClick={() => removeVideo(index)}
                                            className="absolute top-6 right-6 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-lg transition-all font-bold shadow-sm"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Video Title</label>
                                                <input
                                                    type="text"
                                                    value={video.title}
                                                    onChange={(e) => updateVideo(index, 'title', e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-black bg-white"
                                                    placeholder="Video Title"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">YouTube URL</label>
                                                <input
                                                    type="text"
                                                    value={video.url || ''}
                                                    onChange={(e) => updateVideo(index, 'url', e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-black bg-white"
                                                    placeholder="https://www.youtube.com/watch?v=..."
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Category</label>
                                                <select
                                                    value={video.category}
                                                    onChange={(e) => updateVideo(index, 'category', e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-black bg-white"
                                                >
                                                    <option value="Commercial">Commercial</option>
                                                    <option value="Event">Event</option>
                                                    <option value="Social Media">Social Media</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
