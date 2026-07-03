import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Initialize Lenis smooth scrolling.
 * Returns the lenis instance for programmatic scroll control.
 */
const useSmoothScroll = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Make lenis available globally for scroll-to functionality
    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return lenisRef;
};

export default useSmoothScroll;
