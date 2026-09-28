import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useReducedMotion } from 'framer-motion';

// Vertical page scroll drives a horizontal rail on roomy viewports.
// Touch, short screens and reduced motion retain a native scrollable gallery.
export default function useScrollRail() {
  const section = useRef(null);
  const rail = useRef(null);
  const reduced = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 900px) and (min-height: 700px) and (pointer: fine)');
    const measure = () => {
      setEnabled(query.matches && !reduced);
      if (rail.current) setDistance(Math.max(0, rail.current.scrollWidth - rail.current.clientWidth));
    };
    const observer = new ResizeObserver(measure);
    if (rail.current) observer.observe(rail.current);
    query.addEventListener('change', measure);
    measure();
    return () => { observer.disconnect(); query.removeEventListener('change', measure); };
  }, [reduced]);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const onKeyDown = event => {
    if (!enabled || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const top = section.current.getBoundingClientRect().top + window.scrollY;
    const target = event.key === 'Home' ? top : event.key === 'End' ? top + distance : window.scrollY + (event.key === 'ArrowRight' ? 320 : -320);
    const position = Math.min(top + distance, Math.max(top, target));
    if (window.__lenis) window.__lenis.scrollTo(position); else window.scrollTo({ top: position, behavior: 'smooth' });
  };
  return { section, rail, enabled, distance, x, progress: scrollYProgress, onKeyDown };
}
