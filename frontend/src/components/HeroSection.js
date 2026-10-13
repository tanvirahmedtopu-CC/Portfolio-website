import navigateToSection from '../lib/scrollToSection';
import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, frame, cancelFrame } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { heroContent } from '../data/mock';
import MagneticButton from './ui/MagneticButton';

// ─── RANDOM COLOR HELPERS ─────────────────────────────────────────────────────
const randomHex = () =>
  '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

const randomColors = (count) => Array.from({ length: count }, randomHex);

// ─── TUBES BACKGROUND ─────────────────────────────────────────────────────────
const TubesBackground = ({ onClick }) => {
  const canvasRef = useRef(null);
  const tubesRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (!canvasRef.current) return;
      try {
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
        // The library forces a 2x pixel ratio (even on 1x screens) under a bloom pass.
        // A lighter ratio keeps the same soft glow and frees the GPU for smooth scrolling.
        app.three.minPixelRatio = 1;
        app.three.maxPixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
        app.three.resize();
        tubesRef.current = app;
      } catch (err) {
        console.error('Tubes load error:', err);
      }
    };

    init();
    return () => {
      mounted = false;
      tubesRef.current?.dispose();
      tubesRef.current = null;
    };
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
      style={{ touchAction: 'pan-y', zIndex: 0 }}
    />
  );
};

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
const HeroSection = () => {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();
  const contentY = useMotionValue(0);
  const overlayOpacity = useMotionValue(0.72);
  const contentOpacity = useMotionValue(1);

  // Parallax reads the scroll position after Lenis moves the page in the same frame.
  // Scroll events arrive a frame late, which made the hero copy trail and shake.
  useEffect(() => {
    const section = sectionRef.current;
    let top = 0;
    let height = 1;
    const measure = () => {
      top = section.offsetTop;
      height = section.offsetHeight || 1;
    };
    const sync = () => {
      const progress = Math.min(1, Math.max(0, (window.scrollY - top) / height));
      contentY.set(progress * 150);
      overlayOpacity.set(0.72 + 0.23 * Math.min(1, progress / 0.5));
      // Fade the copy before parallax pushes it into the clipped bottom edge.
      contentOpacity.set(1 - Math.min(1, Math.max(0, (progress - 0.4) / 0.45)));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    measure();
    frame.preRender(sync, true);
    return () => {
      observer.disconnect();
      cancelFrame(sync);
    };
  }, [contentY, overlayOpacity, contentOpacity]);

  const scrollToSection = (href) => {
    navigateToSection(href);
  };

  // Word-by-word stagger container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[75vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Keep the signature cursor artwork; avoid a second WebGL renderer. */}
      {!reduced && <TubesBackground />}

      {/* Overlay with parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 100%)',
          zIndex: 1,
          opacity: overlayOpacity,
        }}
      />

      {/* Top/bottom edge fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.85) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content with parallax — pointer-events-none on mobile lets taps
          pass through to the tubes canvas; md+ restores normal behavior */}
      <motion.div
        className="relative max-w-5xl mx-auto px-6 lg:px-8 py-16 md:py-0 text-center pointer-events-none md:pointer-events-auto"
        style={{ zIndex: 2, y: reduced ? 0 : contentY, opacity: contentOpacity }}
      >
        {/* Tagline pill */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-4 md:mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 md:px-4 md:py-2 bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] rounded-full text-white/70 text-xs md:text-sm">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            Content Creation & Digital Marketing | AI Powered
          </span>
        </motion.div>

        {/* Headline — word-by-word blur reveal */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.15] md:leading-[1.1] tracking-tight mb-6 md:mb-8 flex flex-wrap justify-center"
        >
          {heroContent.headline.split(' ').map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className={`inline-block mr-3 ${
                word === 'Cinematic' || word === 'Convert'
                  ? 'bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent'
                  : ''
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtext — blur reveal */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed"
        >
          {heroContent.subtext}
        </motion.p>

        {/* CTAs with magnetic hover */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 pointer-events-auto"
        >
          <MagneticButton strength={0.15}>
            <motion.button
              onClick={() => scrollToSection('#portfolio')}
              className="group flex items-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 bg-white text-black rounded-full font-medium text-sm sm:text-base transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shimmer sweep */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Play size={18} className="fill-current relative z-10" />
              <span className="relative z-10">{heroContent.ctaPrimary}</span>
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
            </motion.button>
          </MagneticButton>

          <MagneticButton strength={0.15}>
            <motion.button
              onClick={() => scrollToSection('#contact')}
              className="flex items-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] rounded-full text-white font-medium text-sm sm:text-base transition-all duration-500 hover:bg-white/[0.12] hover:border-white/[0.25]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {heroContent.ctaSecondary}
            </motion.button>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, opacity: contentOpacity }}>
        {/* Click hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="hidden sm:block absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ zIndex: 2 }}
        >
          <p className="text-white/20 text-xs font-mono tracking-widest uppercase">
            Click background to randomize colors
          </p>
        </motion.div>

        {/* Scroll indicator — hidden on mobile to save space */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ zIndex: 2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5], scaleY: [1, 2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-1 origin-top bg-white/50 rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
