'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Photo } from '@/types/portfolio';

export default function Photos() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/portfolio')
            .then(res => res.json())
            .then(json => {
                setPhotos(json.photos);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch photos:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return null;

    return (
        <section id="photos" className="py-20 bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 relative overflow-hidden">
            {/* Glowing Circles */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl" />
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }} className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
            </div>

            <div className="relative container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-blue-300 font-semibold text-sm uppercase tracking-wider">Gallery</span>
                    <h2 className="text-4xl font-bold text-white mt-4 mb-4">Model & Photography</h2>
                    <div className="h-1 bg-blue-300 mx-auto mb-8 w-20" />
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Capturing moments and showcasing talent through our lens.
                    </p>
                </motion.div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {photos.map((photo) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer bg-white/10 backdrop-blur-lg border border-blue-400/20"
                        >
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                width={800}
                                height={1000}
                                className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <span className="text-blue-300 text-sm font-medium mb-1">{photo.category}</span>
                                <h3 className="text-white text-xl font-bold">{photo.alt}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
