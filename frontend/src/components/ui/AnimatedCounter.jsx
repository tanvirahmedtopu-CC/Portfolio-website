import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Animated counter that counts up from 0 when scrolled into view.
 * Handles values like "50+", "5M+", "100%", "877K" etc.
 */
const AnimatedCounter = ({ 
  value, 
  duration = 2, 
  className = '',
  once = true 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Parse the value — extract numeric part, prefix, and suffix
    const match = value.match(/^([^\d]*)(\d+\.?\d*)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const [, prefix, numStr, suffix] = match;
    const targetNum = parseFloat(numStr);
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentNum = Math.round(eased * targetNum);
      
      setDisplayValue(`${prefix}${currentNum}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value); // Ensure exact final value
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {displayValue}
    </motion.span>
  );
};

export default AnimatedCounter;
