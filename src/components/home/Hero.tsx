'use client';

import Image from 'next/image';
import { motion} from 'framer-motion';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();

  const backgroundVariants = {
    initial: { 
      opacity: 0,
      scale: 0.8 
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  const fadeInUpVariant = {
    initial: { 
      opacity: 0, 
      y: 30 
    },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: custom * 0.2,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    })
  };

  const floatingAnimation = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 relative overflow-hidden">
    
      <div className="absolute inset-0">
        <motion.div
          variants={backgroundVariants}
          initial="initial"
          animate="animate"
          className="absolute inset-0"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
              filter: ["blur(40px)", "blur(60px)", "blur(40px)"]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/30 to-blue-300/20 rounded-full"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.25, 0.15],
              filter: ["blur(30px)", "blur(50px)", "blur(30px)"]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-gradient-to-r from-blue-300/20 to-blue-200/20 rounded-full"
          />
        </motion.div>
      </div>

      <div className="relative container mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col md:flex-row md:items-center gap-12 md:gap-20">
          {/* Left Column */}
          <motion.div
            variants={fadeInUpVariant}
            initial="initial"
            animate="animate"
            custom={0}
            className="w-full md:w-2/5 space-y-10"
          >
            <motion.div
              variants={floatingAnimation}
              animate="animate"
              className="relative z-10"
            >
              <div className="relative max-w-md mx-auto md:mx-0">
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                      "0 0 40px rgba(59, 130, 246, 0.2)",
                      "0 0 20px rgba(59, 130, 246, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-blue-400/10 rounded-2xl blur-xl"
                />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  className="relative overflow-hidden rounded-2xl shadow-2xl"
                >
                  <Image
                    src="/img1.png"
                    alt="Digital Marketing Dashboard"
                    width={400}
                    height={220}
                    className="relative z-10 w-full h-auto"
                    priority
                  />
                  <motion.div
                    animate={{
                      opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent z-20"
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={{
                initial: { opacity: 0 },
                animate: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.5
                  }
                }
              }}
              initial="initial"
              animate="animate"
              className="grid grid-cols-3 gap-4"
            >
              {[
                { number: "100+", text: "Clients" },
                { number: "250+", text: "Projects" },
                { number: "99%", text: "Success" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1), duration: 0.7 }}
                  className="text-center p-4 rounded-xl backdrop-blur-sm bg-white/10 border border-white/5 hover:bg-white/15 transition-all shadow-lg"
                >
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                    {stat.number}
                  </h3>
                  <p className="text-blue-100 text-sm mt-1 font-medium">{stat.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            variants={fadeInUpVariant}
            initial="initial"
            animate="animate"
            custom={1}
            className="text-white w-full md:w-3/5"
          >
            <div className="space-y-10">
              <div className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                >
                  <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-500/30 to-blue-600/30 backdrop-blur-sm text-blue-100 text-sm font-medium rounded-full shadow-inner shadow-white/5 border border-blue-400/10">
                    Digital Marketing Agency
                  </span>
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight"
                >
                  Marketing in its Purest form{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100">
                    &ldquo;Like Paani&rdquo;
                  </span>
                </motion.h1>
              </div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-base md:text-lg text-blue-100 leading-relaxed font-light max-w-xl"
              >
                Launch your online store with zero cost setup and zero commission on sales. 
                Our premium plans cover social media management, SEO optimization, professional 
                content design, and targeted advertising — delivering your complete digital 
                marketing solution with measurable results.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-wrap gap-5"
              >
                <motion.button
                  onClick={() => router.push('/pricing')}
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gradient-to-r from-white to-blue-50 text-blue-900 px-7 py-3.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
                >
                  Get Started
                </motion.button>
                <motion.button
                  onClick={() => router.push('/services')}
                  whileHover={{ scale: 1.03, backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
                  whileTap={{ scale: 0.97 }}
                  className="border border-white/30 backdrop-blur-sm text-white px-7 py-3.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:shadow-white/10"
                >
                  View Services
                </motion.button>
              </motion.div>

              {/* Feature list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                {[
                  "Social Media Management",
                  "SEO & Content Marketing",
                  "Web & App Development",
                  "Ads Management"
                ].map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + (index * 0.1), duration: 0.7 }}
                    className="flex items-center space-x-3 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400/40 to-blue-500/20 flex items-center justify-center shadow-md group-hover:from-blue-400/60 group-hover:to-blue-500/40 transition-all duration-300">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm md:text-base text-blue-50 font-medium group-hover:text-white transition-colors">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;