import { useState, useEffect, useCallback } from 'react';

/**
 * Track the mouse position globally (normalized or raw).
 * Used by MagneticButton, 3D tilt effects, and parallax elements.
 */
const useMousePosition = (normalized = false) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (normalized) {
      setPosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,  // -1 to 1
        y: (e.clientY / window.innerHeight) * 2 - 1,  // -1 to 1
      });
    } else {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  }, [normalized]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return position;
};

export default useMousePosition;
