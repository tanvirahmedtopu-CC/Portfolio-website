import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import SmoothReveal from './ui/SmoothReveal';
import TextReveal from './ui/TextReveal';

// ─── SERVICE DATA ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: '01',
    title: 'Content Creation',
    description:
      'Short-form and long-form content designed to capture attention, stop the scroll, and drive real engagement.',
    accent: '#22d3ee',
    glow: 'rgba(34, 211, 238, 0.15)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="5" width="22" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M11 9.5 L11 14.5 L16.5 12 Z" fill="currentColor" opacity="0.9" />
        <path d="M3 19 L25 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <path d="M8 23 L20 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
      </svg>
    ),
  },
  {
    id: '02',
    title: 'Social Media Growth',
    description:
      'Strategic content and platform optimisation to grow audiences organically on TikTok, YouTube, and Instagram.',
    accent: '#a78bfa',
    glow: 'rgba(167, 139, 250, 0.15)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20 L9 13 L13 16 L18 9 L24 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="9" cy="13" r="1.5" fill="currentColor" />
        <circle cx="13" cy="16" r="1.5" fill="currentColor" />
        <circle cx="18" cy="9" r="1.5" fill="currentColor" />
        <circle cx="24" cy="4" r="1.5" fill="currentColor" />
        <path d="M4 24 L24 24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
      </svg>
    ),
  },
  {
    id: '03',
    title: 'Video Editing',
    description:
      'Cinematic pacing, colour grading, and storytelling that transforms raw footage into content that converts viewers into followers.',
    accent: '#34d399',
    glow: 'rgba(52, 211, 153, 0.15)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="8" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M20 11.5 L26 8.5 L26 19.5 L20 16.5 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        <circle cx="11" cy="14.5" r="2.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <path d="M10 14.5 L10 14.5 L12.2 13.2 L12.2 15.8 Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: '04',
    title: 'AI Content Systems',
    description:
      'Leveraging Veo, Kling, Runway, and other frontier tools to scale content production and automate marketing workflows.',
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.15)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="14" cy="14" r="1.5" fill="currentColor" />
        <ellipse cx="14" cy="14" rx="10" ry="4" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" fill="none" />
        <ellipse cx="14" cy="14" rx="10" ry="4" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" fill="none"
          transform="rotate(60 14 14)" />
        <ellipse cx="14" cy="14" rx="10" ry="4" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" fill="none"
          transform="rotate(120 14 14)" />
      </svg>
    ),
  },
];

// ─── SERVICE CARD WITH 3D TILT ────────────────────────────────────────────────
const ServiceCard = ({ service, index }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (y - 0.5) * -10,
      rotateY: (x - 0.5) * 10,
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
      initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      <div
        className="relative h-full rounded-2xl p-7 cursor-default overflow-hidden"
        style={{
          background: hovered
            ? `linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)`
            : `linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)`,
          border: `1px solid ${hovered ? service.accent + '40' : 'rgba(255,255,255,0.08)'}`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: hovered
            ? `0 0 0 1px ${service.accent}20, 0 20px 60px ${service.glow}, 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)`
            : `0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`,
          transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease, transform 0.15s ease-out',
          transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) ${hovered ? 'scale3d(1.02,1.02,1.02)' : ''}`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Cursor-following glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${service.accent}15 0%, transparent 60%)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-6 right-6 h-px rounded-full"
          style={{
            background: hovered
              ? `linear-gradient(90deg, transparent, ${service.accent}, transparent)`
              : `linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)`,
            transition: 'background 0.4s ease',
          }}
        />

        {/* Ambient glow blob */}
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${service.glow} 0%, transparent 70%)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        />

        {/* Icon */}
        <motion.div
          className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5"
          style={{
            background: hovered ? `${service.accent}18` : 'rgba(255,255,255,0.05)',
            border: `1px solid ${hovered ? service.accent + '30' : 'rgba(255,255,255,0.08)'}`,
            color: hovered ? service.accent : 'rgba(255,255,255,0.6)',
            transition: 'all 0.4s ease',
          }}
          animate={hovered ? { rotate: [0, 5, -5, 0] } : {}}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {service.icon}
        </motion.div>

        {/* Number tag */}
        <div
          className="absolute top-7 right-7 text-xs font-mono tracking-widest"
          style={{
            color: hovered ? service.accent : 'rgba(255,255,255,0.15)',
            transition: 'color 0.4s ease',
          }}
        >
          {service.id}
        </div>

        {/* Title */}
        <h3
          className="text-white text-lg font-semibold mb-3 leading-tight"
          style={{
            letterSpacing: '-0.025em',
            color: hovered ? '#ffffff' : 'rgba(255,255,255,0.92)',
            transition: 'color 0.3s ease',
          }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed"
          style={{
            color: hovered ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.35)',
            transition: 'color 0.4s ease',
          }}
        >
          {service.description}
        </p>

        {/* Bottom accent */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${service.accent}${hovered ? '35' : '12'}, transparent)`,
            transition: 'background 0.4s ease',
          }}
        />
      </div>
    </motion.div>
  );
};

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
const ServicesSection = () => {
  return (
    <section
      id="services"
      className="relative py-28 overflow-hidden"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#05070d] to-black" />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(34,211,238,0.03) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <SmoothReveal blur>
            <span
              className="block text-xs font-mono tracking-[0.28em] uppercase mb-4"
              style={{ color: '#22d3ee', fontFamily: "'Sora', sans-serif" }}
            >
              What I Do
            </span>
          </SmoothReveal>

          <TextReveal
            text="Services & Expertise"
            highlightWords={['Expertise']}
            highlightClass="bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent"
            className="text-4xl md:text-5xl font-semibold text-white mb-4 justify-center"
            staggerDelay={0.07}
            delay={0.1}
          />

          <SmoothReveal blur delay={0.3}>
            <p
              className="text-sm leading-relaxed max-w-sm mx-auto"
              style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Sora', sans-serif" }}
            >
              End-to-end content and marketing solutions — built for brands that want to grow.
            </p>
          </SmoothReveal>
        </div>

        {/* 2×2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 section-separator" />
    </section>
  );
};

export default ServicesSection;
