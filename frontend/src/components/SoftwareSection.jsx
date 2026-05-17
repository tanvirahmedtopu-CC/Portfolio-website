import React from 'react';
import { motion } from 'framer-motion';
import { softwareTools } from '../data/mock';
import GlassCard from './GlassCard';

// Custom logo components for tools without accessible logos
const FinalCutProLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <defs>
      <linearGradient id="fcpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
    <rect x="10" y="10" width="80" height="80" rx="18" fill="url(#fcpGrad)" />
    <path d="M35 30 L35 70 L45 70 L45 55 L60 55 L60 45 L45 45 L45 40 L65 40 L65 30 Z" fill="white" />
  </svg>
);

const CapCutLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="45" fill="#000" />
    <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="4" />
    <circle cx="50" cy="50" r="20" fill="white" />
    <circle cx="50" cy="50" r="8" fill="#000" />
  </svg>
);

const SoftwareSection = () => {
  const renderLogo = (tool) => {
    // Use custom SVG logos for better control
    if (tool.name === "Final Cut Pro") {
      return <FinalCutProLogo />;
    }
    if (tool.name === "CapCut") {
      return <CapCutLogo />;
    }
    
    // For DaVinci Resolve, use the Wikipedia SVG
    return (
      <img 
        src={tool.logo} 
        alt={tool.name}
        className="w-full h-full object-contain"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
    );
  };

  return (
    <section id="tools" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050508] to-black" />

      {/* Decorative gradient */}
      <motion.div
        className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(40,80,120,0.1) 0%, transparent 70%)',
        }}
        animate={{
          x: [100, 50, 100],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4 block"
          >
            Primary Tools
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white"
          >
            Software I{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Use
            </span>
          </motion.h2>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {softwareTools.map((tool, index) => (
            <GlassCard
              key={tool.id}
              delay={0.15 * index}
              glow={index === 0}
              className="p-8 text-center"
            >
              {/* Logo */}
              <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-3 overflow-hidden"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 0 40px rgba(80,180,220,0.2)'
                }}
                transition={{ duration: 0.3 }}
              >
                {renderLogo(tool)}
              </motion.div>

              {/* Name */}
              <h3 className="text-xl font-semibold text-white mb-2">
                {tool.name}
              </h3>

              {/* Description */}
              <p className="text-white/40 text-sm">
                {tool.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoftwareSection;
