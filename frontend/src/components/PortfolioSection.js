import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Play, ChevronRight } from 'lucide-react';
import { CardSwap, Card } from './CardSwap';

// ─── DATA ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    key: 'shortForm',
    label: 'Short-form Edits',
    sublabel: 'Reels · Shorts · Stories',
    tag: '01',
    accent: '#22d3ee',
    glow: 'rgba(34,211,238,0.18)',
    folderUrl: 'https://drive.google.com/drive/folders/1rpsEctlFC1fhBX-n28FU6CuWxGXqFOSh',
    description: 'Fast-paced, scroll-stopping edits built for Instagram Reels and YouTube Shorts.',
    thumbnail: process.env.PUBLIC_URL + '/thumb-shortform.png',
    views: '2.4M',
    videos: [],
  },
  {
    key: 'reelsTiktok',
    label: 'Reels & TikTok',
    sublabel: 'Viral · UGC · Trends',
    tag: '02',
    accent: '#a78bfa',
    glow: 'rgba(167,139,250,0.18)',
    folderUrl: 'https://www.dropbox.com/scl/fo/2xoof6h8131dbzdv7luww/h?rlkey=g5rymfh0hon8e1s73v1e9up6l&dl=0',
    description: 'Viral-format vertical content optimised for TikTok and Instagram engagement.',
    thumbnail: process.env.PUBLIC_URL + '/thumb-reels.png',
    views: '877K',
    videos: [],
  },
  {
    key: 'aiGenerated',
    label: 'AI Generated',
    sublabel: 'Veo · Kling · Runway',
    tag: '03',
    accent: '#34d399',
    glow: 'rgba(52,211,153,0.18)',
    folderUrl: 'https://drive.google.com/drive/folders/1MwIFRFtv1z4P43IohW4jMdSsobFwogVg',
    description: 'Cutting-edge productions built with Veo, Kling, Runway, and Higgsfield.',
    thumbnail: process.env.PUBLIC_URL + '/thumb-ai.png',
    views: '1.1M',
    videos: [],
  },
];

// ─── 3D CATEGORY ICONS ────────────────────────────────────────────────────────
const ShortFormIcon3D = ({ accent, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="sf-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95"/>
        <stop offset="100%" stopColor={accent} stopOpacity="0.85"/>
      </linearGradient>
      <filter id="sf-glow"><feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor={accent} floodOpacity="0.6"/></filter>
    </defs>
    <rect x="8" y="2" width="16" height="28" rx="3" fill="url(#sf-grad)" opacity="0.12" filter="url(#sf-glow)"/>
    <rect x="8" y="2" width="16" height="28" rx="3" stroke="url(#sf-grad)" strokeWidth="1.5" fill="none"/>
    <rect x="13" y="3.2" width="6" height="1.5" rx="0.75" fill="url(#sf-grad)" opacity="0.45"/>
    <path d="M13.5 11 L13.5 17 L19 14 Z" fill="url(#sf-grad)" opacity="0.9"/>
    <rect x="12.5" y="26.5" width="7" height="1" rx="0.5" fill="url(#sf-grad)" opacity="0.35"/>
  </svg>
);

const ReelsTikTokIcon3D = ({ accent, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="rt-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95"/>
        <stop offset="100%" stopColor={accent} stopOpacity="0.85"/>
      </linearGradient>
      <filter id="rt-glow"><feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor={accent} floodOpacity="0.6"/></filter>
    </defs>
    <path d="M19 3 C19 3 21.5 3.2 23.5 5.5 C25.2 7.5 25 10 25 10 L21 10 C21 10 21.2 8.2 20 7 L20 19.5 C20 22.5 17.5 25 14.5 25 C11.5 25 9 22.5 9 19.5 C9 16.5 11.5 14 14.5 14 C15 14 15.5 14.1 16 14.3 L16 18.2 C15.5 18.1 15 18 14.5 18 C13.7 18 13 18.7 13 19.5 C13 20.3 13.7 21 14.5 21 C15.3 21 16 20.3 16 19.5 L16 3 L19 3Z"
      fill="url(#rt-grad)" filter="url(#rt-glow)" opacity="0.9"/>
  </svg>
);

const AIGeneratedIcon3D = ({ accent, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <defs>
      <linearGradient id="ai-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95"/>
        <stop offset="100%" stopColor={accent} stopOpacity="0.85"/>
      </linearGradient>
      <filter id="ai-glow"><feDropShadow dx="0" dy="1" stdDeviation="2" floodColor={accent} floodOpacity="0.7"/></filter>
    </defs>
    <path d="M16 3 L18.2 12.8 L28 15 L18.2 17.2 L16 27 L13.8 17.2 L4 15 L13.8 12.8 Z"
      fill="url(#ai-grad)" filter="url(#ai-glow)" opacity="0.95"/>
    <path d="M25 5 L25.8 7.7 L28.5 8.5 L25.8 9.3 L25 12 L24.2 9.3 L21.5 8.5 L24.2 7.7 Z"
      fill="url(#ai-grad)" opacity="0.55"/>
    <path d="M7 22 L7.5 23.8 L9.5 24.5 L7.5 25.2 L7 27 L6.5 25.2 L4.5 24.5 L6.5 23.8 Z"
      fill="url(#ai-grad)" opacity="0.45"/>
  </svg>
);

const ICONS_3D = {
  shortForm: ShortFormIcon3D,
  reelsTiktok: ReelsTikTokIcon3D,
  aiGenerated: AIGeneratedIcon3D,
};

// ─── VIEW BADGE (Instagram/TikTok style) ──────────────────────────────────────
const ViewBadge = ({ views }) => (
  <div
    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md"
    style={{
      background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.1)',
    }}
  >
    {/* Instagram-style eye icon */}
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
        stroke="white" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3.5" fill="white"/>
      <circle cx="12" cy="12" r="1.5" fill="rgba(0,0,0,0.4)"/>
    </svg>
    <span style={{ color: '#fff', fontSize: 12, fontWeight: 600, letterSpacing: '-0.01em' }}>
      {views}
    </span>
  </div>
);

// ─── CATEGORY CARD ────────────────────────────────────────────────────────────
const CategoryCard = ({ category, isHovered }) => (
  <div
    className="w-full h-full rounded-2xl overflow-hidden relative select-none"
    style={{
      background: '#08090f',
      border: `1px solid ${isHovered ? category.accent + '55' : 'rgba(255,255,255,0.09)'}`,
      boxShadow: isHovered
        ? `0 0 60px ${category.glow}, 0 20px 60px rgba(0,0,0,0.7), inset 0 1px 0 ${category.accent}25`
        : `0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`,
      transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
    }}
  >
    {/* Top shimmer */}
    <div className="absolute top-0 left-0 right-0 h-px z-10" style={{
      background: isHovered
        ? `linear-gradient(90deg, transparent, ${category.accent}80, transparent)`
        : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
      transition: 'background 0.4s ease',
    }} />

    {/* Thumbnail — fills top 65% */}
    <div className="absolute top-0 left-0 right-0" style={{ height: '65%' }}>
      <img
        src={category.thumbnail}
        alt={category.label}
        className="w-full h-full object-cover"
        style={{ objectPosition: 'center top' }}
      />
      {/* Gradient fade */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to bottom, transparent 35%, rgba(8,9,15,0.55) 75%, #08090f 100%)',
      }} />
      {/* Accent tint */}
      <div className="absolute inset-0" style={{
        background: `linear-gradient(135deg, ${category.accent}20 0%, transparent 55%)`,
        opacity: isHovered ? 1 : 0.55,
        transition: 'opacity 0.4s ease',
      }} />

      {/* View badge — bottom-left */}
      <div className="absolute bottom-3 left-3 z-10">
        <ViewBadge views={category.views} />
      </div>

      {/* Play overlay on hover */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s ease' }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: `${category.accent}25`,
            border: `1px solid ${category.accent}70`,
            backdropFilter: 'blur(10px)',
          }}>
          <Play size={18} fill={category.accent} style={{ color: category.accent, marginLeft: 2 }} />
        </div>
      </div>
    </div>

    {/* Glass divider */}
    <div className="absolute left-4 right-4 z-10" style={{
      top: 'calc(65% - 1px)',
      height: '1px',
      background: `linear-gradient(90deg, transparent, ${isHovered ? category.accent + '40' : 'rgba(255,255,255,0.07)'}, transparent)`,
      transition: 'background 0.4s ease',
    }} />

    {/* Text — bottom 35% */}
    <div className="absolute bottom-0 left-0 right-0 p-5" style={{ height: '35%' }}>
      <span className="text-xs font-mono tracking-[0.2em] block mb-1" style={{ color: category.accent, opacity: 0.8 }}>
        {category.tag}
      </span>
      <h3 className="text-white font-semibold text-base leading-tight mb-1"
        style={{ letterSpacing: '-0.02em' }}>
        {category.label}
      </h3>
      <p className="text-xs font-mono" style={{ color: category.accent, opacity: 0.5 }}>
        {category.sublabel}
      </p>
    </div>

    {/* Bottom accent line */}
    <div className="absolute bottom-0 left-0 right-0 h-px z-10" style={{
      background: `linear-gradient(90deg, transparent, ${category.accent}${isHovered ? '60' : '22'}, transparent)`,
      transition: 'background 0.4s ease',
    }} />
  </div>
);

// ─── MODAL ────────────────────────────────────────────────────────────────────
const CategoryModal = ({ category, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
    style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(20px)' }}
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.93, opacity: 0, y: 24 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.93, opacity: 0, y: 24 }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      className="relative max-w-5xl w-full my-8 rounded-3xl overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #0d0f18 0%, #090b12 100%)',
        border: `1px solid ${category.accent}22`,
        boxShadow: `0 0 100px ${category.glow}, 0 40px 80px rgba(0,0,0,0.7)`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${category.accent}50, transparent)` }} />

      <div className="px-8 py-7 flex items-start justify-between"
        style={{ borderBottom: `1px solid ${category.accent}12` }}>
        <div>
          <span className="text-xs font-mono tracking-[0.2em] block mb-2" style={{ color: category.accent }}>
            {category.tag} — PORTFOLIO
          </span>
          <h3 className="text-2xl font-semibold text-white mb-1" style={{ letterSpacing: '-0.02em' }}>
            {category.label}
          </h3>
          <p className="text-white/40 text-sm">{category.description}</p>
        </div>
        <button onClick={onClose}
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <X size={17} className="text-white/60" />
        </button>
      </div>

      <div className="p-8">
        <div className="text-center py-14">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: `${category.accent}10`, border: `1px solid ${category.accent}22`, boxShadow: `0 0 30px ${category.glow}` }}>
            <Play size={30} style={{ color: category.accent }} fill="currentColor" />
          </div>
          <p className="text-white text-base font-medium mb-2">{category.label}</p>
          <p className="text-white/35 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
            Browse the full collection of {category.label.toLowerCase()} videos.
          </p>
          <button
            onClick={() => window.open(category.folderUrl, '_blank', 'noopener,noreferrer')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-medium transition-all duration-300 hover:opacity-75"
            style={{ background: `${category.accent}12`, border: `1px solid ${category.accent}28`, color: category.accent }}>
            <ExternalLink size={15} />
            Browse Full Collection
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section id="portfolio" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#060609] to-black" />

      <motion.div className="absolute top-1/3 -left-48 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)' }}
        animate={{ x: [-10, 12, -10], scale: [1, 1.08, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 70%)' }}
        animate={{ x: [10, -12, 10], scale: [1.06, 1, 1.06] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-cyan-400 text-xs font-mono tracking-[0.25em] uppercase mb-4 block">
            Selected Work
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4"
            style={{ letterSpacing: '-0.03em' }}>
            The{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-white/30 max-w-md mx-auto text-sm leading-relaxed">
            Three categories. One consistent standard — content that performs.
          </motion.p>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-16 lg:gap-28">

          {/* CardSwap */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0"
          >
            <p className="text-white/20 text-xs font-mono text-center mb-4 tracking-widest uppercase">
              Hover to preview · Click to explore
            </p>
            <CardSwap
              width={300} height={420} cardDistance={42} verticalDistance={50}
              delay={5000} pauseOnHover={false} skewAmount={5} easing="elastic"
              onCardHover={(idx) => setHoveredIdx(idx)}
              onCardClick={(idx) => setActiveCategory(CATEGORIES[idx])}
            >
              {CATEGORIES.map((cat, idx) => (
                <Card key={cat.key}>
                  <CategoryCard category={cat} isHovered={hoveredIdx === idx} />
                </Card>
              ))}
            </CardSwap>
          </motion.div>

          {/* Category list — right side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 w-full lg:max-w-xs pt-10"
          >
            <p className="text-white/25 text-xs font-mono tracking-[0.2em] uppercase mb-3">Categories</p>

            {CATEGORIES.map((cat, i) => {
              const Icon3D = ICONS_3D[cat.key];
              return (
                <motion.button
                  key={cat.key}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.18 + i * 0.09 }}
                  onClick={() => setActiveCategory(cat)}
                  className="group flex items-center justify-between px-5 py-4 rounded-2xl text-left transition-all duration-300 cursor-pointer"
                  style={{
                    background: hoveredIdx === i ? `${cat.accent}0e` : 'rgba(255,255,255,0.025)',
                    border: `1px solid ${hoveredIdx === i ? cat.accent + '30' : 'rgba(255,255,255,0.06)'}`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${cat.accent}10`;
                    e.currentTarget.style.borderColor = `${cat.accent}35`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = hoveredIdx === i ? `${cat.accent}0e` : 'rgba(255,255,255,0.025)';
                    e.currentTarget.style.borderColor = hoveredIdx === i ? `${cat.accent}30` : 'rgba(255,255,255,0.06)';
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${cat.accent}18 0%, ${cat.accent}08 100%)`,
                        border: `1px solid ${cat.accent}28`,
                        boxShadow: `0 4px 12px ${cat.accent}20, inset 0 1px 0 rgba(255,255,255,0.08)`,
                      }}>
                      <Icon3D accent={cat.accent} size={22} />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
                        {cat.label}
                      </p>
                      <p className="text-white/25 text-xs mt-0.5 font-mono">{cat.sublabel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-mono" style={{ color: cat.accent, opacity: 0.55 }}>{cat.views}</span>
                    <ChevronRight size={14} className="transition-all duration-300 group-hover:translate-x-1"
                      style={{ color: cat.accent, opacity: 0.5 }} />
                  </div>
                </motion.button>
              );
            })}

            {/* Quick links */}
            <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-white/20 text-xs font-mono mb-3">Quick access</p>
              <div className="flex flex-col gap-2">
                {CATEGORIES.map((cat) => (
                  <button key={cat.key}
                    onClick={() => window.open(cat.folderUrl, '_blank', 'noopener,noreferrer')}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-all duration-200"
                    style={{ background: `${cat.accent}08`, border: `1px solid ${cat.accent}15`, color: cat.accent, opacity: 0.7 }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}>
                    <ExternalLink size={11} />
                    All {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeCategory && (
          <CategoryModal category={activeCategory} onClose={() => setActiveCategory(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
