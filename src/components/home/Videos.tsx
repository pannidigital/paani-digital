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
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    if (loading) return null;

    return (
        <section id="videos" className="py-24 bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 relative overflow-hidden">
            {/* Enhanced Glowing Circles */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 12, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[100px]"
                />
            </div>

            <div className="relative container mx-auto px-6 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="flex flex-col items-center gap-6 mb-6">
                        <span className="text-blue-200 font-bold text-sm uppercase tracking-[0.3em]">Visual Gallery</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">Our Video Gallery</h2>
                    <div className="h-1.5 bg-blue-400 mx-auto mb-10 w-24 rounded-full shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                    <p className="text-xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
                        Dynamic visual storytelling that brings brands to life through cinematic motion.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 max-w-7xl mx-auto">
                    {videos.map((video, index) => {
                        const youtubeId = video.url ? getYoutubeId(video.url) : null;

                        return (
                            <motion.div
                                key={video.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative group"
                            >
                                <div className="relative bg-white/5 backdrop-blur-2xl rounded-[2rem] shadow-2xl overflow-hidden border border-white/10 group-hover:border-blue-400/30 transition-all duration-500 group-hover:-translate-y-2">
                                    <div className="aspect-[9/16] bg-blue-950/30 flex items-center justify-center relative overflow-hidden">
                                        {youtubeId ? (
                                            <div className="w-full h-full pointer-events-none transition-transform duration-700 group-hover:scale-105">
                                                <iframe
                                                    className="w-full h-full scale-[1.5]"
                                                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&enablejsapi=1`}
                                                    title={video.title}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                ></iframe>
                                            </div>
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-blue-200/40 p-10 text-center">
                                                <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-xs font-bold uppercase tracking-widest">No Video URL</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-10 pt-20 bg-gradient-to-t from-blue-950/90 to-transparent">
                                        <span className="text-blue-300 text-[10px] font-black uppercase tracking-[0.3em] mb-3 block">{video.category}</span>
                                        <h3 className="text-2xl font-bold text-white tracking-tight leading-tight group-hover:text-blue-200 transition-colors">{video.title}</h3>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
