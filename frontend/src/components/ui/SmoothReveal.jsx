import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable scroll-triggered reveal with configurable direction, blur, and stagger.
 * Wraps children in a motion.div with InView animation.
 */
const SmoothReveal = ({
  children,
  direction = 'up',       // 'up' | 'down' | 'left' | 'right'
  delay = 0,
  duration = 0.8,
  blur = false,
  distance = 40,
  once = true,
  className = '',
  as = 'div',
  ...props
}) => {
  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  const offset = directionMap[direction] || directionMap.up;

  const Component = motion[as] || motion.div;

  return (
    <Component
      initial={{
        opacity: 0,
        ...offset,
        ...(blur ? { filter: 'blur(10px)' } : {}),
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        ...(blur ? { filter: 'blur(0px)' } : {}),
      }}
      viewport={{ once, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
};

export default SmoothReveal;
