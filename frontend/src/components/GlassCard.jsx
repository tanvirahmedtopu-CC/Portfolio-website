import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ 
  children, 
  className = '', 
  hover = true,
  glow = false,
  delay = 0,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      whileHover={hover ? { 
        y: -8,
        transition: { duration: 0.4, ease: "easeOut" }
      } : {}}
      className={`
        relative
        bg-white/[0.03]
        backdrop-blur-xl
        border border-white/[0.08]
        rounded-2xl
        overflow-hidden
        ${glow ? 'shadow-[0_0_40px_rgba(120,200,255,0.08)]' : ''}
        ${hover ? 'cursor-pointer transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(120,200,255,0.12)] hover:border-white/[0.15]' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Inner glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
