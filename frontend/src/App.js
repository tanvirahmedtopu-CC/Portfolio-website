import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

// Hooks
import useSmoothScroll from "./hooks/useSmoothScroll";

// Components
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import PortfolioSection from "./components/PortfolioSection";
import ServicesSection from "./components/ServicesSection";
import SocialMediaSection from "./components/SocialMediaSection";
import SoftwareSection from "./components/SoftwareSection";
import AIToolsSection from "./components/AIToolsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

// ─── CUSTOM CURSOR ──────────────────────────────────────────────────────────
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  const moveCursor = useCallback((e) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", moveCursor, { passive: true });

    // Track hoverable elements
    const handleMouseOver = (e) => {
      const el = e.target.closest("a, button, [role='button'], .hoverable");
      setHovering(!!el);
    };

    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [moveCursor]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${hovering ? "hovering" : ""}`}
    />
  );
};

// ─── PAGE LOADER ──────────────────────────────────────────────────────────
const PageLoader = ({ onComplete }) => {
  return (
    <motion.div
      className="page-loader"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-white text-2xl font-semibold tracking-tight"
      >
        TAT<span className="text-cyan-400">.</span>
      </motion.div>
    </motion.div>
  );
};

// ─── NOISE OVERLAY ────────────────────────────────────────────────────────
const NoiseOverlay = () => <div className="noise-overlay" />;

// ─── APP ──────────────────────────────────────────────────────────────────
function App() {
  const [loading, setLoading] = useState(true);

  // Initialize smooth scrolling
  useSmoothScroll();

  return (
    <div className="App bg-black min-h-screen">
      {/* Page load animation */}
      <AnimatePresence>
        {loading && <PageLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Noise grain overlay for premium texture */}
      <NoiseOverlay />

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <ServicesSection />
        <SocialMediaSection />
        <SoftwareSection />
        <AIToolsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
