import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated rotating gradient border effect.
 * Wraps children with a conic-gradient that rotates on hover.
 */
const AnimatedGradientBorder = ({
  children,
  className = '',
  borderWidth = 1,
  borderRadius = '1rem',
  gradientColors = ['#22d3ee', '#818cf8', '#34d399', '#22d3ee'],
  animate = true,
  duration = 3,
  ...props
}) => {
  const gradient = `conic-gradient(from var(--border-angle), ${gradientColors.join(', ')})`;

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        '--border-angle': '0deg',
        padding: borderWidth,
        borderRadius,
        background: gradient,
        backgroundSize: '200% 200%',
      }}
      animate={animate ? {
        '--border-angle': ['0deg', '360deg'],
      } : {}}
      transition={animate ? {
        '--border-angle': {
          duration,
          repeat: Infinity,
          ease: 'linear',
        },
      } : {}}
      {...props}
    >
      <div
        style={{
          borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
          background: '#08090f',
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default AnimatedGradientBorder;
