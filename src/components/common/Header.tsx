'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07
      }
    }
  };

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className="fixed top-0 w-full bg-white/90 shadow-lg backdrop-blur-md border-b border-gray-200/50 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative w-[100px] h-[65px]"
            >
              <Image
                src="/l.png"
                alt="Paani Digital Marketing"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 120px, 150px"
                quality={100}
              />
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Home', 'About', 'Services', 'Pricing'].map((item, index) => (
              <motion.div
                key={item}
                variants={navItemVariants}
                custom={index}
                initial="hidden"
                animate="visible"
              >
                <Link 
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="relative text-blue-600 hover:text-blue-800 transition-colors font-medium group"
                >
                  {item}
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"
                    whileHover={{ width: "100%" }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            className="md:hidden p-2 text-blue-600 z-50 hover:bg-blue-50 rounded-lg transition-colors"
            aria-label="Toggle Menu"
          >
            <motion.svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={isOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 180, transition: { duration: 0.4 } },
                closed: { rotate: 0, transition: { duration: 0.4 } }
              }}
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                variants={{
                  closed: { d: "M4 6h16M4 12h16M4 18h16" },
                  open: { d: "M6 18L18 6M6 6l12 12" }
                }}
                transition={{ duration: 0.4 }}
              />
            </motion.svg>
          </motion.button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div
                  variants={mobileMenuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="fixed top-0 right-0 h-screen w-72 bg-white/95 backdrop-blur-lg shadow-2xl md:hidden z-40"
                >
                  <div className="flex flex-col h-full">
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 border-b border-gray-200"
                    >
                      <h2 className="text-blue-600 font-semibold text-xl">Menu</h2>
                    </motion.div>

                    <nav className="flex flex-col py-8 px-6">
                      {['Home', 'About', 'Services', 'Pricing'].map((item, index) => (
                        <motion.div
                          key={item}
                          initial={{ x: 50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: 50, opacity: 0 }}
                          transition={{ 
                            delay: 0.1 * index,
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                          }}
                        >
                          <Link 
                            href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                            onClick={toggleMenu}
                            className="flex items-center space-x-2 text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl transition-all duration-300"
                          >
                            <span className="text-lg font-medium">{item}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </nav>

                    <motion.div 
                      className="mt-auto p-6 border-t border-gray-200"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={toggleMenu}
                        className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg"
                      >
                        Close Menu
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={toggleMenu}
                  className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden z-30"
                />
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;