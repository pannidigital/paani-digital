
'use client';
import { motion } from 'framer-motion';
import { JSX } from 'react';
import {
  FaCameraRetro,  FaServer, FaCogs,
} from 'react-icons/fa';
import {
  SiAdobephotoshop, SiAdobeillustrator, SiAdobepremierepro,
  SiCanva, SiReact, SiNextdotjs, SiFramer,
  SiTailwindcss, SiMongodb, SiNodedotjs, SiJavascript,
  SiTypescript, SiExpress, SiHtml5, SiCss3,
  SiDavinciresolve, SiOpenai,
} from 'react-icons/si';
import { MdAnimation } from 'react-icons/md';
import { TbDeviceDesktopCode } from 'react-icons/tb';
import { PiVideoCameraFill } from 'react-icons/pi';

const editingSoftware = [
  { name: 'Photoshop', icon: <SiAdobephotoshop /> },
  { name: 'Illustrator', icon: <SiAdobeillustrator /> },
  { name: 'After Effects', icon: <MdAnimation /> },
  { name: 'Premiere Pro', icon: <SiAdobepremierepro /> },
  { name: 'Canva', icon: <SiCanva /> },
  { name: 'DaVinci Resolve', icon: <SiDavinciresolve /> },
  { name: 'AI Tools', icon: <SiOpenai /> },
  { name: 'CapCut', icon: <PiVideoCameraFill /> },
];

const videoShoot = [
  { name: 'DSLR + Lenses', icon: <FaCameraRetro /> },
  { name: 'Studio Setup', icon: <TbDeviceDesktopCode /> },
  { name: 'Gimbal', icon: <PiVideoCameraFill /> },
  
];

const technologies = [
  { name: 'React.js', icon: <SiReact /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'Node.js', icon: <SiNodedotjs /> },
  { name: 'Express.js', icon: <SiExpress /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
  { name: 'JavaScript', icon: <SiJavascript /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'HTML5', icon: <SiHtml5 /> },
  { name: 'CSS3', icon: <SiCss3 /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
  { name: 'Framer Motion', icon: <SiFramer /> },
  { name: 'DevOps', icon: <FaServer /> },
  { name: 'Automation', icon: <FaCogs /> },
];

const floatVariants = {
  animate: {
    y: [0, -6, 0, 6, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const SectionBox = ({
  title,
  items,
}: {
  title: string;
  items: { name: string; icon: JSX.Element }[];
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-blue-300/30 shadow-md hover:shadow-xl transition hover:scale-[1.02]"
  >
    <h3 className="text-2xl font-bold text-white mb-6 text-center">{title}</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={floatVariants}
          animate="animate"
          whileHover={{ scale: 1.1 }}
          className="flex flex-col items-center text-white space-y-2 p-4 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 transition"
        >
          <div className="text-3xl">{item.icon}</div>
          <p className="text-center text-sm">{item.name}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const ToolsTechWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600 relative overflow-hidden">
      {/* Background animation */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="absolute w-72 h-72 bg-blue-400/20 rounded-full blur-3xl top-1/3 left-1/3"
      />

      <div className="relative container mx-auto px-4 space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-2">Our Stack</h2>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            Tools, technologies, and production process that shape every creative and technical delivery.
          </p>
        </motion.div>

        {/* Three Column Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          <SectionBox title="Editing Software" items={editingSoftware} />
          <SectionBox title="Technologies" items={technologies} />
          <SectionBox title="Video / Photo Shoot" items={videoShoot} />
        </div>

        {/* Offer Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-20 max-w-4xl mx-auto bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-8 rounded-3xl shadow-xl border border-white/20 text-center"
        >
          <h3 className="text-3xl font-bold mb-4">Launch Your Website for Just NPR 10,000!</h3>
          <p className="text-lg mb-6">
            Get a beautiful, fast, and SEO-optimized website for your business at a startup-friendly price.
            Limited-time offer tailored for new brands and growing startups.
          </p>
         <a
              href="https://wa.me/9849653183" // Replace with your WhatsApp number
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-blue-100 transition shadow-md inline-block"
>
  Book Now
</a>

        </motion.div>
      </div>
    </section>
  );
};

export default ToolsTechWorks;
