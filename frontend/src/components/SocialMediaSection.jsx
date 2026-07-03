import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Instagram, Youtube } from 'lucide-react';
import AnimatedCounter from './ui/AnimatedCounter';
import SmoothReveal from './ui/SmoothReveal';
import TextReveal from './ui/TextReveal';
import MagneticButton from './ui/MagneticButton';

// Screenshots from Google Drive folder
const socialMediaScreenshots = [
  { id: 1, image: "https://lh3.googleusercontent.com/d/1k1FIqAIsRPT_Yi06pNlcsNmgkG2bvYCf", platform: "instagram", brand: "Marugame Udon" },
  { id: 2, image: "https://lh3.googleusercontent.com/d/1QrECaoPQMybec_u9bs4YRuafZ6iVDhtS", platform: "instagram", brand: "Big Life Journal" },
  { id: 3, image: "https://lh3.googleusercontent.com/d/1S3uZ_tV5KjdkB2VcSXF4nNUfxZcOsfsw", platform: "instagram", brand: "Centric" },
  { id: 4, image: "https://lh3.googleusercontent.com/d/1QNDHMi_6ProVth1QZOFUbKpynjX8JMe7", platform: "instagram", brand: "Resonate Media" },
  { id: 5, image: "https://lh3.googleusercontent.com/d/1MkSU5iD1EV6s1Xdqx04L2lfszCBUtlN6", platform: "instagram", brand: "Halal Meals" },
  { id: 6, image: "https://lh3.googleusercontent.com/d/1pPFGDlls6iyMbTeGr6vYeBQY6jNKdGtC", platform: "instagram", brand: "Nada Manley Style" },
  { id: 7, image: "https://lh3.googleusercontent.com/d/1IF9GhnUA9UW9c17IRraBJLlnv4UcrISe", platform: "youtube", brand: "The Edge Of Show" },
  { id: 8, image: "https://lh3.googleusercontent.com/d/1pwL2me_TsnyDfS-ih4vSCdHuu0wrwgIo", platform: "youtube", brand: "Nada Manley Style" },
  { id: 9, image: "https://lh3.googleusercontent.com/d/1OHMrjaUdtCq6G2XXwgTydVEQApETicnq", platform: "youtube", brand: "Moving to Idaho" },
  { id: 10, image: "https://lh3.googleusercontent.com/d/1Ivpd6u4Ai2udb6pfqzBs6_FjDxPOEYML", platform: "instagram", brand: "Avaris Corporation" },
];

// iPhone Frame Component — enhanced with reflections
const IPhoneFrame = ({ children, className = "" }) => (
  <div className={`relative ${className}`}>
    <div className="relative bg-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl shadow-black/50">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1a1a1a] rounded-b-2xl z-20 flex items-center justify-center">
        <div className="w-16 h-4 bg-black rounded-full" />
      </div>
      <div className="relative bg-black rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/50 to-transparent z-10 flex items-center justify-between px-8 pt-2">
          <span className="text-white text-xs font-medium">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 border border-white rounded-sm">
              <div className="w-3/4 h-full bg-white rounded-sm" />
            </div>
          </div>
        </div>
        <div className="w-full h-full">{children}</div>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
    </div>
    {/* Enhanced reflection */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[3rem] pointer-events-none" />
    <div className="absolute inset-0 bg-gradient-to-tl from-white/5 via-transparent to-transparent rounded-[3rem] pointer-events-none" />
  </div>
);

const SocialMediaSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % socialMediaScreenshots.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => goToSlide((currentIndex + 1) % socialMediaScreenshots.length);
  const prevSlide = () => goToSlide((currentIndex - 1 + socialMediaScreenshots.length) % socialMediaScreenshots.length);

  const getVisibleSlides = () => {
    const slides = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + socialMediaScreenshots.length) % socialMediaScreenshots.length;
      slides.push({ ...socialMediaScreenshots[index], position: i });
    }
    return slides;
  };

  return (
    <section id="social-media" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#08080c] to-black" />
      
      <motion.div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)' }}
        animate={{ x: [50, 0, 50], scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)' }}
        animate={{ x: [-50, 0, -50], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <SmoothReveal blur>
            <span className="text-pink-400 text-sm font-medium tracking-widest uppercase mb-4 block">
              Social Media Management
            </span>
          </SmoothReveal>

          <TextReveal
            text="Brands I've Managed"
            highlightWords={['Managed']}
            highlightClass="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 justify-center"
            staggerDelay={0.07}
            delay={0.1}
          />

          <SmoothReveal blur delay={0.3}>
            <p className="text-white/40 max-w-xl mx-auto">
              Growing social media presence and creating engaging content for diverse brands
            </p>
          </SmoothReveal>
        </div>

        {/* Phone Carousel */}
        <div 
          ref={containerRef}
          className="relative flex items-center justify-center min-h-[600px]"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Arrows */}
          <MagneticButton strength={0.2} className="absolute left-4 md:left-8 z-30">
            <motion.button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
          </MagneticButton>
          
          <MagneticButton strength={0.2} className="absolute right-4 md:right-8 z-30">
            <motion.button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </MagneticButton>

          {/* Phones Display */}
          <div className="relative w-full flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {getVisibleSlides().map((slide) => (
                <motion.div
                  key={`${slide.id}-${slide.position}`}
                  className="absolute"
                  initial={{ 
                    opacity: 0, 
                    scale: 0.8,
                    x: slide.position * 300,
                    rotateY: slide.position * -15
                  }}
                  animate={{ 
                    opacity: slide.position === 0 ? 1 : 0.4,
                    scale: slide.position === 0 ? 1 : 0.72,
                    x: slide.position * (window.innerWidth < 768 ? 180 : 280),
                    rotateY: slide.position * -10,
                    zIndex: slide.position === 0 ? 20 : 10
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.8,
                    x: slide.position * 300
                  }}
                  transition={{ 
                    duration: 0.7, 
                    ease: [0.32, 0.72, 0, 1]
                  }}
                  style={{ 
                    perspective: '1200px',
                    filter: slide.position !== 0 ? 'blur(3px)' : 'none'
                  }}
                >
                  <IPhoneFrame className="w-[220px] md:w-[260px]">
                    <img
                      src={slide.image}
                      alt={slide.brand}
                      className="w-full h-full object-cover"
                    />
                  </IPhoneFrame>
                  
                  {/* Platform badge */}
                  {slide.position === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ delay: 0.3 }}
                      className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full"
                    >
                      {slide.platform === 'instagram' ? (
                        <Instagram size={16} className="text-pink-400" />
                      ) : (
                        <Youtube size={16} className="text-red-500" />
                      )}
                      <span className="text-white text-sm font-medium">{slide.brand}</span>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-24">
          {socialMediaScreenshots.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentIndex 
                  ? 'w-8 bg-gradient-to-r from-pink-400 to-purple-400' 
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Stats with animated counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "10+", label: "Brands Managed" },
            { value: "500K+", label: "Total Followers" },
            { value: "1M+", label: "Content Views" },
            { value: "200+", label: "Posts Created" }
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              className="text-center p-6 bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-2xl transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <AnimatedCounter
                value={stat.value}
                duration={2.5}
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent block mb-1"
              />
              <div className="text-white/40 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 section-separator" />
    </section>
  );
};

export default SocialMediaSection;
