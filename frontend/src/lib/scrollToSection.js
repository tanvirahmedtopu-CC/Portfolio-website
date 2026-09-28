export default function scrollToSection(target) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (window.__lenis && !reduced) window.__lenis.scrollTo(element, { duration: 1.1 });
  else element.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' });
}
