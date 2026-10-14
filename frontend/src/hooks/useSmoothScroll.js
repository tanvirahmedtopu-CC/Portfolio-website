import { useEffect, useRef } from 'react';
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
      lerp: 0.08,
      syncTouch: false,
      autoResize: true,
    });

    lenisRef.current = lenis;

    let frame;
    function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);

    // Make lenis available globally for scroll-to functionality
    window.__lenis = lenis;

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return lenisRef;
};

export default useSmoothScroll;
