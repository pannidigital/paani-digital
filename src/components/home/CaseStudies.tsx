
'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const caseStudies = [
  {
    title: "Ecommerce Growth Boost",
    image: "/images/ish1.jpg",
    summary: "A 250% increase in conversions through strategic redesign and SEO.",
    details: "We optimized UI/UX, improved checkout, and used targeted SEO strategies."
  },
  {
    title: "Healthcare Branding Success",
    image: "/images/u1.png",
    summary: "Crafted a complete digital presence for a wellness clinic.",
    details: "Full branding, social strategy, and paid campaigns for audience growth."
  },
  {
    title: "Education Lead Generation",
    image: "/images/u1.png",
    summary: "Generated 1,000+ leads in 3 months for an edtech platform.",
    details: "Built lead funnels, automation systems, and content marketing."
  },
];

export default function CaseStudies() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Close popup on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (activeIndex !== null) setActiveIndex(null);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 relative overflow-hidden">
      {/* Glowing Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }} className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-blue-300 font-semibold text-sm uppercase tracking-wider">Case Studies</span>
          <h2 className="text-4xl font-bold text-white mt-4 mb-4">Real Results from Our Work</h2>
          <div className="h-1 bg-blue-300 mx-auto mb-8 w-20" />
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Real life examples of problem-solving and performance-driven strategies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              onClick={() => setActiveIndex(index)}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-400/20 cursor-pointer hover:bg-white/20 transition-all"
            >
              <div className="w-full h-48 mb-4 overflow-hidden rounded-xl border-2 border-blue-200 shadow-md">
                <Image src={study.image} alt={study.title} width={400} height={300} className="object-cover w-full h-full" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{study.title}</h3>
              <p className="text-blue-100 text-sm">{study.summary}</p>
            </motion.div>
          ))}
        </div>

        {/* Popup Side Panel */}
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5 }}
              className="fixed top-0 right-0 w-full sm:w-[400px] h-full z-50 bg-white shadow-xl overflow-y-auto p-6"
            >
              <button onClick={() => setActiveIndex(null)} className="text-blue-800 font-bold float-right text-lg">&times;</button>
              <h2 className="text-2xl font-bold mb-4 text-blue-900">{caseStudies[activeIndex].title}</h2>
              <Image src={caseStudies[activeIndex].image} alt="Detail" width={600} height={400} className="rounded-xl mb-4" />
              <p className="text-gray-700">{caseStudies[activeIndex].details}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
