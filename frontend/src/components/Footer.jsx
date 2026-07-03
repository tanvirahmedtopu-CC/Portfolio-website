import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail, ArrowUp } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12">
      <div className="absolute inset-0 bg-[#030305]" />
      
      {/* Animated top border */}
      <div className="absolute top-0 left-0 right-0 h-px animate-border-shimmer"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.2), rgba(129,140,248,0.2), transparent)',
          backgroundSize: '400% 400%',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <MagneticButton strength={0.15}>
              <motion.span
                className="text-white font-semibold text-xl tracking-tight cursor-pointer"
                whileHover={{ opacity: 0.7 }}
              >
                TAT<span className="text-cyan-400">.</span>
              </motion.span>
            </MagneticButton>
            <p className="text-white/30 text-sm">
              © {new Date().getFullYear()} TAT. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <MagneticButton strength={0.25}>
              <motion.a
                href="mailto:tanvir@tatmedia.xyz"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(34,211,238,0.2)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={18} />
              </motion.a>
            </MagneticButton>
            <MagneticButton strength={0.25}>
              <motion.a
                href="https://instagram.com/tanvir.ahmed.topu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(236,72,153,0.2)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={18} />
              </motion.a>
            </MagneticButton>
          </div>

          {/* Back to top */}
          <MagneticButton strength={0.25}>
            <motion.button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2, boxShadow: '0 0 20px rgba(34,211,238,0.15)' }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp size={18} />
            </motion.button>
          </MagneticButton>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
