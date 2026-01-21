'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/types/portfolio';

export default function CaseStudies() {
  const [data, setData] = useState<{ store: Project[], website: Project[] } | null>(null);
  const [activeIndex, setActiveIndex] = useState<{ category: 'store' | 'website', index: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(json => {
        setData(json.caseStudies);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch case studies:', err);
        setLoading(false);
      });
  }, []);

  // Close popup on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (activeIndex !== null) setActiveIndex(null);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  const renderSection = (title: string, category: 'store' | 'website') => {
    if (!data || !data[category]) return null;
    return (
      <div className="mb-16">
        <h3 className="text-3xl font-bold text-white mb-8 border-l-4 border-blue-400 pl-4">{title}</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data[category].map((study, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveIndex({ category, index })}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-400/20 cursor-pointer hover:bg-white/20 transition-all"
            >
              <div className="w-full h-64 mb-4 overflow-hidden rounded-xl border-2 border-blue-200 shadow-md">
                <Image src={study.image} alt={study.title} width={600} height={400} className="object-cover w-full h-full" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">{study.title}</h4>
              <p className="text-blue-100 text-lg">{study.summary}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) return null;

  return (
    <section id="case-studies" className="py-20 bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 relative overflow-hidden">
      {/* Glowing Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }} className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-blue-300 font-semibold text-sm uppercase tracking-wider">Portfolio</span>
          <h2 className="text-4xl font-bold text-white mt-4 mb-4">Our Case Studies</h2>
          <div className="h-1 bg-blue-300 mx-auto mb-8 w-20" />
        </motion.div>

        {renderSection("Store Projects", "store")}
        {renderSection("Website Projects", "website")}

        {/* Popup Side Panel */}
        <AnimatePresence>
          {activeIndex !== null && data && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5 }}
              className="fixed top-0 right-0 w-full sm:w-[500px] h-full z-50 bg-white shadow-2xl overflow-y-auto p-8"
            >
              <button onClick={() => setActiveIndex(null)} className="text-blue-800 font-bold float-right text-2xl hover:text-blue-600 transition-colors">&times;</button>
              <h2 className="text-3xl font-bold mb-6 text-blue-900">{data[activeIndex.category][activeIndex.index].title}</h2>
              <div className="rounded-xl overflow-hidden mb-6 shadow-lg">
                <Image src={data[activeIndex.category][activeIndex.index].image} alt="Detail" width={800} height={500} className="w-full h-auto" />
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Project Overview</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{data[activeIndex.category][activeIndex.index].details}</p>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">Key Features</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Responsive Design</li>
                    <li>Performance Optimized</li>
                    <li>User-Centric UI/UX</li>
                    <li>Custom Functionality</li>
                  </ul>
                </div>

                {data[activeIndex.category][activeIndex.index].link && (
                  <div className="pt-8">
                    <a
                      href={data[activeIndex.category][activeIndex.index].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
