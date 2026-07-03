import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../data/mock';
import MagneticButton from './ui/MagneticButton';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Track active section
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-700 ease-out
          ${scrolled 
            ? 'py-3 bg-black/50 backdrop-blur-2xl border-b border-white/[0.05]' 
            : 'py-6 bg-transparent'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <MagneticButton strength={0.15}>
            <motion.a
              href="#"
              className="text-white font-semibold text-xl tracking-tight relative group"
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.3 }}
            >
              <span className="relative">
                TAT<span className="text-cyan-400">.</span>
                {/* Animated underline on hover */}
                <motion.span 
                  className="absolute -bottom-1 left-0 h-[1.5px] bg-gradient-to-r from-cyan-400 to-blue-400"
                  initial={{ width: '0%' }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                  style={{ width: 0 }}
                />
              </span>
            </motion.a>
          </MagneticButton>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <MagneticButton key={link.label} strength={0.12}>
                  <motion.button
                    onClick={() => scrollToSection(link.href)}
                    className="relative text-sm font-medium tracking-wide px-4 py-2 rounded-full transition-colors duration-300"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    style={{
                      color: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.55)',
                    }}
                  >
                    {link.label}
                    {/* Animated underline indicator */}
                    <motion.span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"
                      initial={false}
                      animate={{ 
                        width: isActive ? '60%' : '0%',
                        opacity: isActive ? 1 : 0 
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </motion.button>
                </MagneticButton>
              );
            })}
            
            {/* CTA Button */}
            <MagneticButton strength={0.15} className="ml-4">
              <motion.button
                onClick={() => scrollToSection('#contact')}
                className="
                  px-5 py-2.5
                  bg-white/[0.08]
                  backdrop-blur-xl
                  border border-white/[0.12]
                  rounded-full
                  text-white text-sm font-medium
                  transition-all duration-300
                  hover:bg-white/[0.15]
                  hover:border-white/[0.2]
                  hover:shadow-[0_0_30px_rgba(120,200,255,0.15)]
                  relative overflow-hidden
                "
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Shimmer effect on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Get in Touch</span>
              </motion.button>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-white text-2xl font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => scrollToSection('#contact')}
                className="mt-4 px-8 py-3 bg-white/10 border border-white/20 rounded-full text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08, duration: 0.4 }}
              >
                Get in Touch
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
