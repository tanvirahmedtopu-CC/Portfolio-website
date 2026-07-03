import React from 'react';
import { motion } from 'framer-motion';
import { aboutContent } from '../data/mock';
import GlassCard from './GlassCard';
import AnimatedCounter from './ui/AnimatedCounter';
import SmoothReveal from './ui/SmoothReveal';
import TextReveal from './ui/TextReveal';

const AboutSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050508] to-black" />
      
      {/* Subtle ambient orb */}
      <motion.div
        className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)' }}
        animate={{ x: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <SmoothReveal direction="left" blur delay={0}>
              <span className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4 block">
                About
              </span>
            </SmoothReveal>
            
            <TextReveal
              text="Crafting Digital Excellence"
              highlightWords={['Digital', 'Excellence']}
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-8"
              staggerDelay={0.06}
              delay={0.1}
            />
            
            <SmoothReveal direction="up" blur delay={0.3}>
              <p className="text-lg text-white/50 leading-relaxed">
                {aboutContent.bio}
              </p>
            </SmoothReveal>
          </div>

          {/* Stats Cards — with animated counters and 3D tilt */}
          <div className="grid gap-4">
            {aboutContent.stats.map((stat, index) => (
              <GlassCard 
                key={stat.label}
                delay={0.1 * index}
                className="p-6"
                glow={index === 0}
                tilt={true}
                tiltStrength={6}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <AnimatedCounter
                      value={stat.value}
                      duration={2}
                      className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent block"
                    />
                    <p className="text-white/40 text-sm mt-2 font-medium">
                      {stat.label}
                    </p>
                  </div>
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10 flex items-center justify-center"
                    animate={{ 
                      boxShadow: [
                        '0 0 20px rgba(34,211,238,0.1)',
                        '0 0 40px rgba(34,211,238,0.2)',
                        '0 0 20px rgba(34,211,238,0.1)',
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                  </motion.div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
      
      {/* Section separator */}
      <div className="absolute bottom-0 left-0 right-0 section-separator" />
    </section>
  );
};

export default AboutSection;
