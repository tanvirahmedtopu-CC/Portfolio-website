import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { softwareTools } from '../data/mock';
import SmoothReveal from './ui/SmoothReveal';
import TextReveal from './ui/TextReveal';

// Custom logo components
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

// 3D Tilt Tool Card
const ToolCard = ({ tool, index, renderLogo }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (y - 0.5) * -8,
      rotateY: (x - 0.5) * 8,
    });
    setGlowPos({ x: x * 100, y: y * 100 });
  }, []);

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlowPos({ x: 50, y: 50 });
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.15 * index, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden p-8 text-center cursor-default transition-all duration-300 hover:border-white/[0.15] hover:shadow-[0_0_60px_rgba(120,200,255,0.12)]"
        style={{
          transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) ${hovered ? 'scale3d(1.03,1.03,1.03)' : ''}`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Cursor-following glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(34,211,238,0.08) 0%, transparent 60%)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Top shimmer */}
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.2), transparent)' }}
        />

        {/* Inner gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent pointer-events-none" />

        {/* Logo */}
        <motion.div
          className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-3 overflow-hidden"
          animate={hovered ? { 
            boxShadow: '0 0 40px rgba(80,180,220,0.25)',
            borderColor: 'rgba(34,211,238,0.3)',
          } : {
            boxShadow: '0 0 0 rgba(0,0,0,0)',
            borderColor: 'rgba(255,255,255,0.1)',
          }}
          transition={{ duration: 0.3 }}
        >
          {renderLogo(tool)}
        </motion.div>

        {/* Name */}
        <h3 className="relative z-10 text-xl font-semibold text-white mb-2">
          {tool.name}
        </h3>

        {/* Description */}
        <p className="relative z-10 text-white/40 text-sm">
          {tool.description}
        </p>
      </div>
    </motion.div>
  );
};

const SoftwareSection = () => {
  const renderLogo = (tool) => {
    if (tool.name === "Final Cut Pro") return <FinalCutProLogo />;
    if (tool.name === "CapCut") return <CapCutLogo />;
    
    return (
      <img 
        src={tool.logo} 
        alt={tool.name}
        className="w-full h-full object-contain"
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    );
  };

  return (
    <section id="tools" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050508] to-black" />

      <motion.div
        className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(40,80,120,0.1) 0%, transparent 70%)' }}
        animate={{ x: [100, 50, 100], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <SmoothReveal blur>
            <span className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4 block">
              Primary Tools
            </span>
          </SmoothReveal>
          
          <TextReveal
            text="Software I Use"
            highlightWords={['Use']}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white justify-center"
            staggerDelay={0.08}
            delay={0.1}
          />
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {softwareTools.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} index={index} renderLogo={renderLogo} />
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 section-separator" />
    </section>
  );
};

export default SoftwareSection;
