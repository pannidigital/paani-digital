'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Video } from '@/types/portfolio';

export default function Videos() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

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
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
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
                                className="relative group bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-blue-400/20 hover:bg-white/20 transition-all"
                            >
                                <div className="aspect-video bg-blue-950/30 flex items-center justify-center relative">
                                    {youtubeId ? (
                                        <iframe
                                            className="w-full h-full"
                                            src={`https://www.youtube.com/embed/${youtubeId}`}
                                            title={video.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
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
        </section>
    );
}
