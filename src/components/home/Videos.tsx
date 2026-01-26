'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video } from '@/types/portfolio';

export default function Videos() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        fetch('/api/portfolio')
            .then(res => res.json())
            .then(json => {
                setVideos(json.videos);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch videos:', err);
                setLoading(false);
            });
    }, []);

    const getYoutubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    if (loading) return null;

    return (
        <section id="videos" className="py-20 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 relative overflow-hidden">
            {/* Glowing Circles */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, delay: 1 }} className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl" />
            </div>

            <div className="relative container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-blue-200 font-semibold text-sm uppercase tracking-wider">Videos</span>
                    <h2 className="text-4xl font-bold text-white mt-4 mb-4">Our Video Gallery</h2>
                    <div className="h-1 bg-blue-200 mx-auto mb-8 w-20" />
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Dynamic visual storytelling that brings brands to life.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video) => {
                        const youtubeId = video.url ? getYoutubeId(video.url) : null;

                        return (
                            <motion.div
                                key={video.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                onClick={() => setSelectedVideo(video)}
                                className="relative group bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-blue-400/20 hover:bg-white/20 transition-all cursor-pointer"
                            >
                                <div className="aspect-video bg-blue-950/30 flex items-center justify-center relative">
                                    {youtubeId ? (
                                        <div className="w-full h-full pointer-events-none">
                                            <iframe
                                                className="w-full h-full scale-105"
                                                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0`}
                                                title={video.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            ></iframe>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 bg-blue-400/10 group-hover:bg-blue-400/20 transition-colors" />
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg z-10"
                                            >
                                                <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </motion.div>
                                        </>
                                    )}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                </div>
                                <div className="p-6">
                                    <span className="text-blue-200 text-sm font-semibold uppercase tracking-wider">{video.category}</span>
                                    <h3 className="text-xl font-bold text-white mt-2">{video.title}</h3>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Full Screen Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
                    >
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute top-6 right-6 text-white/70 hover:text-white z-[110] transition-colors"
                        >
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="absolute top-6 left-6 z-[110] flex items-center gap-4">
                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full text-white transition-all border border-white/10"
                            >
                                {isMuted ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                    </svg>
                                )}
                            </button>
                            <div className="text-white">
                                <span className="text-sm font-semibold uppercase tracking-widest opacity-60">{selectedVideo.category}</span>
                                <h3 className="text-xl font-bold">{selectedVideo.title}</h3>
                            </div>
                        </div>

                        <div className="w-full h-full relative">
                            {selectedVideo.url && (
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${getYoutubeId(selectedVideo.url)}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${getYoutubeId(selectedVideo.url)}&controls=0&modestbranding=1&rel=0`}
                                    title={selectedVideo.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
