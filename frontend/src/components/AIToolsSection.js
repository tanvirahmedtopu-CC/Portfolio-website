import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Boxes } from 'lucide-react';
import { aiModels, aiPlatforms } from '../data/mock';

// ─── BRAND COLORS & LOGOS ─────────────────────────────────────────────────────
// Using light/color PNG variants from LobeHub CDN + direct brand URLs
// LobeHub light variant = colored logos on dark backgrounds
const L = (slug) => `https://unpkg.com/@lobehub/icons-static-png@latest/light/${slug}.png`;

const TOOL_META = {
  // AI Models
  'Google Veo 3.2': {
    logo: L('google-deepmind'),
    color: '#4285F4',
    bg: 'rgba(66,133,244,0.12)',
    border: 'rgba(66,133,244,0.3)',
  },
  'Sora 2': {
    logo: L('sora'),
    color: '#10A37F',
    bg: 'rgba(16,163,127,0.12)',
    border: 'rgba(16,163,127,0.3)',
  },
  'Kling 3.0': {
    logo: L('kling'),
    color: '#FF6B35',
    bg: 'rgba(255,107,53,0.12)',
    border: 'rgba(255,107,53,0.3)',
  },
  'Seedream 4': {
    logo: L('bytedance'),
    color: '#FE2C55',
    bg: 'rgba(254,44,85,0.12)',
    border: 'rgba(254,44,85,0.3)',
  },
  'Claude 4.5 Opus': {
    logo: L('claude'),
    color: '#D97706',
    bg: 'rgba(217,119,6,0.12)',
    border: 'rgba(217,119,6,0.3)',
  },
  // AI Platforms
  'Higgsfield': {
    logo: L('higgsfield'),
    color: '#00FF88',
    bg: 'rgba(0,255,136,0.1)',
    border: 'rgba(0,255,136,0.28)',
  },
  'HeyGen': {
    logo: L('heygen'),
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.12)',
    border: 'rgba(124,58,237,0.3)',
  },
  'Runway': {
    logo: L('runway'),
    color: '#FFFFFF',
    bg: 'rgba(255,255,255,0.08)',
    border: 'rgba(255,255,255,0.2)',
  },
  'InVideo': {
    logo: L('invideo'),
    color: '#6D28D9',
    bg: 'rgba(109,40,217,0.12)',
    border: 'rgba(109,40,217,0.3)',
  },
  'Captions': {
    logo: L('captions'),
    color: '#EC4899',
    bg: 'rgba(236,72,153,0.12)',
    border: 'rgba(236,72,153,0.3)',
  },
  'Opus Clip': {
    logo: L('opus-clip'),
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.3)',
  },
  'Descript': {
    logo: L('descript'),
    color: '#10B981',
    bg: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.3)',
  },
  'Canva': {
    logo: L('canva'),
    color: '#00C4CC',
    bg: 'rgba(0,196,204,0.12)',
    border: 'rgba(0,196,204,0.3)',
  },
};

// ─── LOGO WITH FALLBACK ───────────────────────────────────────────────────────
const LogoImg = ({ name, size = 40 }) => {
  const [failed, setFailed] = useState(false);
  const meta = TOOL_META[name] || {};

  if (failed || !meta.logo) {
    return (
      <div
        className="flex items-center justify-center rounded-lg text-sm font-bold"
        style={{
          width: size, height: size,
          background: meta.bg || 'rgba(255,255,255,0.06)',
          color: meta.color || 'rgba(255,255,255,0.6)',
          fontFamily: "'Sora', sans-serif",
        }}
      >
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <img
      src={meta.logo}
      alt={name}
      width={size}
      height={size}
      style={{ objectFit: 'contain', borderRadius: 6 }}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
};

// ─── TOOL CARD ────────────────────────────────────────────────────────────────
const ToolCard = ({ name, delay }) => {
  const [hovered, setHovered] = useState(false);
  const meta = TOOL_META[name] || { color: '#22d3ee', bg: 'rgba(34,211,238,0.08)', border: 'rgba(34,211,238,0.2)' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={{ y: hovered ? -5 : 0, scale: hovered ? 1.03 : 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col items-center gap-3 p-4 rounded-2xl cursor-default text-center overflow-hidden"
        style={{
          background: hovered ? meta.bg : 'rgba(255,255,255,0.03)',
          border: `1px solid ${hovered ? meta.border : 'rgba(255,255,255,0.07)'}`,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: hovered
            ? `0 8px 32px ${meta.bg}, 0 0 0 1px ${meta.border}, inset 0 1px 0 rgba(255,255,255,0.1)`
            : '0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)',
          transition: 'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
        }}
      >
        {/* Top shimmer */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: hovered
              ? `linear-gradient(90deg, transparent, ${meta.color}60, transparent)`
              : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
            transition: 'background 0.35s ease',
          }}
        />

        {/* Corner glow */}
        <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${meta.bg} 0%, transparent 70%)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.35s ease',
          }}
        />

        {/* Logo container */}
        <div
          className="relative flex items-center justify-center rounded-xl transition-all duration-300"
          style={{
            width: 48, height: 48,
            background: hovered ? meta.bg : 'rgba(255,255,255,0.05)',
            border: `1px solid ${hovered ? meta.border : 'rgba(255,255,255,0.08)'}`,
            padding: 6,
          }}
        >
          <LogoImg name={name} size={32} />
        </div>

        {/* Name */}
        <p
          className="text-xs font-medium leading-tight"
          style={{
            color: hovered ? meta.color : 'rgba(255,255,255,0.45)',
            fontFamily: "'Sora', sans-serif",
            letterSpacing: '-0.01em',
            transition: 'color 0.3s ease',
          }}
        >
          {name}
        </p>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${meta.color}${hovered ? '40' : '10'}, transparent)`,
            transition: 'background 0.35s ease',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// ─── SECTION DIVIDER ─────────────────────────────────────────────────────────
const SubHeader = ({ icon: Icon, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className="flex items-center gap-3 mb-6"
  >
    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)' }}>
      <Icon size={15} className="text-cyan-400" />
    </div>
    <span className="text-xs font-medium tracking-[0.18em] uppercase"
      style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Sora', sans-serif" }}>
      {label}
    </span>
    <div className="flex-1 h-px"
      style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.07), transparent)' }} />
  </motion.div>
);

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
const AIToolsSection = () => {
  // Inject Sora font
  if (typeof document !== 'undefined' && !document.getElementById('sora-font')) {
    const link = document.createElement('link');
    link.id = 'sora-font';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);
  }

  // Add Canva to platforms if not in mock
  const platforms = aiPlatforms.some(p => p.name === 'Canva')
    ? aiPlatforms
    : [...aiPlatforms, { id: 'canva', name: 'Canva' }];

  return (
    <section id="ai" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#05070d] to-black" />

      {/* Ambient orbs */}
      <motion.div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)' }}
        animate={{ x: [0, 50, 0], y: [0, -25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.04) 0%, transparent 70%)' }}
        animate={{ x: [0, -40, 0], y: [0, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="block text-xs font-mono tracking-[0.28em] uppercase mb-4 text-cyan-400"
            style={{ fontFamily: "'Sora', sans-serif" }}>
            AI Technology
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-4xl md:text-5xl font-semibold text-white mb-4"
            style={{ letterSpacing: '-0.03em', fontFamily: "'Sora', sans-serif" }}>
            AI Models &{' '}
            <span style={{
              background: 'linear-gradient(90deg, #22d3ee, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Tools</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="text-sm leading-relaxed max-w-md mx-auto"
            style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Sora', sans-serif" }}>
            Leveraging frontier AI to create the future of video content
          </motion.p>
        </div>

        {/* AI Models */}
        <div className="mb-14">
          <SubHeader icon={Cpu} label="AI Models" delay={0} />
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {aiModels.map((model, i) => (
              <ToolCard key={model.id} name={model.name} delay={0.06 * i} />
            ))}
          </div>
        </div>

        {/* AI Platforms */}
        <div>
          <SubHeader icon={Boxes} label="AI Creation Platforms" delay={0.05} />
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {platforms.map((platform, i) => (
              <ToolCard key={platform.id} name={platform.name} delay={0.04 * i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIToolsSection;
