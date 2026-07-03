import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * Premium glass card with 3D tilt effect (mouse-tracked).
 * Enhanced shimmer highlight that follows cursor position.
 */
const GlassCard = ({ 
  children, 
  className = '', 
  hover = true,
  glow = false,
  delay = 0,
  tilt = true,
  tiltStrength = 8,
  ...props 
}) => {
  const ref = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current || !tilt) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const rotateX = (y - 0.5) * -tiltStrength;
    const rotateY = (x - 0.5) * tiltStrength;
    
    setTiltStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
    });
    
    setGlowPosition({ x: x * 100, y: y * 100 });
  }, [tilt, tiltStrength]);

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out',
    });
    setGlowPosition({ x: 50, y: 50 });
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={hover && tilt ? tiltStyle : {}}
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
      {/* Dynamic cursor-following highlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 hover-parent:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(34,211,238,0.08) 0%, transparent 60%)`,
          opacity: tiltStyle.transform ? 0.8 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
      
      {/* Inner glow effect — enhanced gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent pointer-events-none" />
      
      {/* Top shimmer line */}
      <div 
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.2), transparent)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
