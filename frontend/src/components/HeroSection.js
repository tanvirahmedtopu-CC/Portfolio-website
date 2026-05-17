import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { heroContent } from '../data/mock';

// ─── RANDOM COLOR HELPERS ─────────────────────────────────────────────────────
const randomHex = () =>
  '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

const randomColors = (count) => Array.from({ length: count }, randomHex);

// ─── TUBES BACKGROUND ─────────────────────────────────────────────────────────
// Uses webpackIgnore so CRA/webpack leaves the CDN import alone
// and the browser handles it as a native ES module — no build error.
const TubesBackground = ({ onClick }) => {
  const canvasRef = useRef(null);
  const tubesRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (!canvasRef.current) return;
      try {
        // webpackIgnore tells webpack to skip this — browser handles it natively
        const module = await import(
          /* webpackIgnore: true */
          'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js'
        );
        if (!mounted) return;

        const TubesCursor = module.default;
        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ['#22d3ee', '#818cf8', '#34d399'],
            lights: {
              intensity: 150,
              colors: ['#06b6d4', '#6366f1', '#10b981', '#0ea5e9'],
            },
          },
        });
        tubesRef.current = app;
      } catch (err) {
        console.error('Tubes load error:', err);
      }
    };

    init();
    return () => { mounted = false; };
  }, []);

  const handleClick = () => {
    if (tubesRef.current) {
      tubesRef.current.tubes.setColors(randomColors(3));
      tubesRef.current.tubes.setLightsColors(randomColors(4));
    }
    onClick?.();
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      className="absolute inset-0 w-full h-full block"
      style={{ touchAction: 'none', zIndex: 0 }}
    />
  );
};

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
const HeroSection = () => {
  const [clickHint, setClickHint] = useState(false);

  const scrollToSection = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

      {/* Tubes canvas */}
      <TubesBackground onClick={() => setClickHint(true)} />

      {/* Overlay: darkens center (text area) more than edges (where tubes live) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 100%)',
          zIndex: 1,
        }}
      />
      {/* Top/bottom edge fade to black */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.85) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center" style={{ zIndex: 2 }}>

        {/* Tagline pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }} className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] rounded-full text-white/70 text-sm">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            Content Creation & Digital Marketing | AI Powered
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] tracking-tight mb-8"
        >
          {heroContent.headline.split(' ').map((word, i) => (
            <motion.span
              key={i}
              className={`inline-block mr-3 ${
                word === 'Cinematic' || word === 'Convert'
                  ? 'bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent'
                  : ''
              }`}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {heroContent.subtext}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => scrollToSection('#portfolio')}
            className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium text-base transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          >
            <Play size={18} className="fill-current" />
            {heroContent.ctaPrimary}
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>

          <motion.button
            onClick={() => scrollToSection('#contact')}
            className="flex items-center gap-3 px-8 py-4 bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] rounded-full text-white font-medium text-base transition-all duration-500 hover:bg-white/[0.12] hover:border-white/[0.25]"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          >
            {heroContent.ctaSecondary}
          </motion.button>
        </motion.div>
      </div>

      {/* Click to randomize hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <p className="text-white/20 text-xs font-mono tracking-widest uppercase">
          Click background to randomize colors
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ zIndex: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], height: ['4px', '8px', '4px'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 bg-white/50 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
