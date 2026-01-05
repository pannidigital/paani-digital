'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPricingData } from '@/data/Plans';

export default function Pricing() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const pricingCategories = getPricingData();

  const handleWhatsAppClick = (planName: string, price: string) => {
    const message = encodeURIComponent(`Hi, I'm interested in your ${planName} (${price}). Can you provide more details?`);
    window.open(`https://wa.me/+9779801157986?text=${message}`, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 relative overflow-hidden min-h-screen">

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 90, 180] 
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "linear" 
            }}
            className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-400/20 rounded-full filter blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
              rotate: [180, 270, 360] 
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              delay: 5 
            }}
            className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-300/20 rounded-full filter blur-3xl"
          />
        </div>
      </div>

      <div className="relative container mx-auto px-4 z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-blue-300 font-semibold text-sm uppercase tracking-wider px-4 py-1 rounded-full bg-blue-900/40 mb-4"
          >
            Pricing Plans
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Choose Your Perfect Plan
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-1 bg-blue-300 mx-auto mb-8 w-24"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-blue-100 max-w-2xl mx-auto px-4 leading-relaxed"
          >
            Flexible pricing options tailored to meet your business needs with comprehensive digital marketing solutions
          </motion.p>
        </motion.div>

        {/* Category Selection*/}
        <div className="mb-16">
          <motion.div 
            className="flex flex-wrap justify-center gap-3 rounded-2xl bg-blue-900/30 p-3 max-w-4xl mx-auto backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {pricingCategories.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedCategory(index)}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className={`py-3 px-6 text-sm font-medium rounded-xl transition-all duration-300
                  ${selectedCategory === index 
                    ? 'bg-white text-blue-900 shadow-lg shadow-blue-500/20' 
                    : 'text-blue-100 hover:bg-white/10'
                  }`}
              >
                {category.title}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Selected Category Title */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            {pricingCategories[selectedCategory].title}
          </h3>
          <p className="text-blue-100 mt-2 max-w-2xl mx-auto">
            {pricingCategories[selectedCategory].description}
          </p>
        </motion.div>

        {/* Plans Grid*/}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {pricingCategories[selectedCategory].plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: plan.isPopular ? 1.02 : 1.05 }}
                className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 relative transition-all ${
                  plan.isPopular ? 'border-2 border-blue-300 lg:scale-105' : 'border border-blue-400/20'
                }`}
              >
                {plan.isPopular && (
                  <motion.div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-white text-blue-900 px-6 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </motion.div>
                )}
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{plan.name}</h3>
                  <div className="text-3xl md:text-4xl font-bold text-blue-300 mb-6">
                    {plan.price}
                    <span className="text-base md:text-lg text-blue-200">{plan.period}</span>
                  </div>
                  <motion.ul className="space-y-3 md:space-y-4 mb-8 text-left">
                    {plan.features.map((feature, i) => (
                      <motion.li key={i} className="flex items-center gap-2 text-sm md:text-base text-blue-100">
                        <svg className="w-5 h-5 text-blue-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                  <div className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleWhatsAppClick(plan.name, plan.price)}
                      className={`w-full py-3 md:py-4 px-6 md:px-4 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                        plan.isPopular
                          ? 'bg-white text-blue-900 hover:bg-blue-50'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      </svg>
                      Book Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Production Services Grid */}
        {selectedCategory === 3 && pricingCategories[selectedCategory].productionServices && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto"
          >
            {pricingCategories[selectedCategory].productionServices?.map((service, index) => (
              <motion.div
                key={index}
                variants={{
                  
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-5 flex flex-col h-full border border-blue-400/20"
              >
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">{service.title}</h4>
                <p className="text-blue-300 font-bold text-lg md:text-xl mb-4 whitespace-pre-line">{service.price}</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleWhatsAppClick(service.title, service.price)}
                  className="mt-auto py-2.5 px-4 rounded-lg bg-blue-600/30 text-white hover:bg-blue-600/50 
                    transition-all border border-blue-400/30 flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                  Book Service
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Custom Packages Grid */}
        {pricingCategories[selectedCategory].customPackages && (
          <div className="mt-16 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h3 className="text-xl md:text-2xl font-bold text-white">Additional Services</h3>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {pricingCategories[selectedCategory].customPackages?.map((pkg, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-5 flex flex-col h-full border border-blue-400/20"
                >
                  <h4 className="text-base md:text-lg font-semibold text-white mb-2">{pkg.service}</h4>
                  <p className="text-blue-300 font-bold text-lg md:text-xl mb-4">{pkg.price}</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleWhatsAppClick(pkg.service, pkg.price)}
                    className="mt-auto py-2.5 px-4 rounded-lg bg-blue-600/30 text-white hover:bg-blue-600/50 
                      transition-all border border-blue-400/30 flex items-center justify-center gap-2 text-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    </svg>
                    Book Service
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Custom Package Note */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-blue-600/30 backdrop-blur-sm border border-blue-400/20 rounded-xl p-5 max-w-3xl mx-auto mt-12 text-center"
        >
          <p className="text-white font-medium text-lg">You can create your own desired custom packages</p>
          <p className="text-blue-200 text-sm mt-2">Contact Us For Custom Plans</p>
        </motion.div>
      </div>
    </section>
  );
}
