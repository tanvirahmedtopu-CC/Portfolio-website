import React from 'react';
import { motion } from 'framer-motion';
import { aboutContent } from '../data/mock';
import GlassCard from './GlassCard';

const AboutSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050508] to-black" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4 block"
            >
              About
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-8"
            >
              Crafting{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Digital Excellence
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-white/50 leading-relaxed"
            >
              {aboutContent.bio}
            </motion.p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4">
            {aboutContent.stats.map((stat, index) => (
              <GlassCard 
                key={stat.label}
                delay={0.1 * index}
                className="p-6"
                glow={index === 0}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
                    >
                      {stat.value}
                    </motion.span>
                    <p className="text-white/40 text-sm mt-2 font-medium">
                      {stat.label}
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10 flex items-center justify-center">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
