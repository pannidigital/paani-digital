'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Team = () => {
  const teamMembers = [
    {
      name: "Ishwor Khadka",
      role: "Founder & CEO",
      image: "/images/ish1.jpg",
      bio: "Leading the agency with innovative thinking and bold digital strategies."
    },
    
    {
      name: "Ujjwal Karki",
      role: "Market Researcher",
      image: "/images/u1.png",
      bio: "Crafting visual stories and compelling brand experiences with elegance."
    },
    {
      name: "Rejeena Rai",
      role: "Graphic Designer",
      image: "/images/rejeena.jpg",
      bio: "Crafting visual stories and compelling brand experiences with elegance."
    },
    {
      name: "Simran Lama",
      role: "Content Creator",
      image: "/images/simran.jpg",
      bio: "Crafting visual stories and compelling brand experiences with elegance."
    },
    {
      name: "Samir Kharel",
      role: "Developer",
      image: "/images/samir.jpg",
      bio: "Optimizing campaigns and ensuring every strategy delivers measurable results."
    }
    
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 relative overflow-hidden">
      {/* Glowing blurred circles */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-300/20 rounded-full filter blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 4 }}
          className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-blue-200/20 rounded-full filter blur-3xl"
        />
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-blue-300 font-semibold text-sm uppercase tracking-wider"
          >
            Our Team
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl font-bold text-white mt-4 mb-4"
          >
            Meet the Faces Behind Paani
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-blue-300 mx-auto mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Dedicated professionals working behind the scenes to drive your success.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="grid md:grid-cols-3 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.03 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/20 hover:bg-white/20 transition-all group text-center"
            >
              <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-300 shadow-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-blue-300 font-medium mb-3">{member.role}</p>
              <p className="text-blue-100 text-sm">{member.bio}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
