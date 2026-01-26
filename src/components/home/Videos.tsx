'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Video } from '@/types/portfolio';

export default function Videos() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

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
        <section id="videos" className="bg-black relative">
            {/* Global Mute Toggle */}
            <div className="fixed top-24 left-6 z-[60] flex items-center gap-4">
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full text-white transition-all border border-white/10 shadow-xl"
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
                <div className="hidden md:block">
                    <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">Sound Controls</span>
                </div>
            </div>

            <div
                ref={containerRef}
                className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth hide-scrollbar"
            >
                {videos.map((video, index) => {
                    const youtubeId = video.url ? getYoutubeId(video.url) : null;

                    return (
                        <div
                            key={video.id}
                            className="h-screen w-full snap-start snap-always relative flex items-center justify-center overflow-hidden bg-black"
                        >
                            {/* Video Background */}
                            <div className="absolute inset-0 w-full h-full">
                                {youtubeId ? (
                                    <iframe
                                        className="w-full h-full scale-[1.4] pointer-events-none"
                                        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&enablejsapi=1`}
                                        title={video.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    ></iframe>
                                ) : (
                                    <div className="w-full h-full bg-blue-900/20 flex items-center justify-center">
                                        <span className="text-white/20 text-2xl font-bold">No Video URL</span>
                                    </div>
                                )}
                                {/* Overlay for better text readability */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                            </div>

                            {/* Content Overlay */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative z-10 text-center px-4 max-w-4xl"
                            >
                                <span className="inline-block px-4 py-1.5 bg-blue-500/20 backdrop-blur-md text-blue-200 text-xs font-bold rounded-full border border-blue-400/20 mb-6 uppercase tracking-[0.3em]">
                                    {video.category}
                                </span>
                                <h3 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-none">
                                    {video.title}
                                </h3>
                                <div className="flex items-center justify-center gap-4">
                                    <div className="h-[1px] w-12 bg-white/20" />
                                    <span className="text-white/60 text-sm font-medium uppercase tracking-widest">Scroll to Explore</span>
                                    <div className="h-[1px] w-12 bg-white/20" />
                                </div>
                            </motion.div>

                            {/* Scroll Indicator */}
                            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-5 h-8 border-2 border-white rounded-full flex justify-center p-1"
                                >
                                    <div className="w-1 h-2 bg-white rounded-full" />
                                </motion.div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
