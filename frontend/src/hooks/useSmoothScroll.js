import { useEffect, useRef } from 'react';
import { frame, cancelFrame } from 'framer-motion';
import Lenis from 'lenis';

/**
 * Initialize Lenis smooth scrolling.
 * Returns the lenis instance for programmatic scroll control.
 */
const useSmoothScroll = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      anchors: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Drive Lenis from Framer Motion's frame loop so the scroll position and every
    // scroll-linked animation update in the same frame instead of two competing loops.
    const update = ({ timestamp }) => lenis.raf(timestamp);
    frame.update(update, true);

    // Make lenis available globally for scroll-to functionality
    window.__lenis = lenis;

    return () => {
      cancelFrame(update);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return lenisRef;
};

export default useSmoothScroll;
