import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Wrapper that adds parallax scroll-speed offsets to children.
 * Content moves at a different speed than normal scroll.
 */
const ParallaxSection = ({
  children,
  className = '',
  speed = 0.3,          // 0 = no parallax, 1 = full parallax
  direction = 'up',     // 'up' or 'down'
  ...props
}) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const multiplier = direction === 'up' ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [
    multiplier * speed * 100,
    multiplier * speed * -100,
  ]);

  return (
    <div ref={ref} className={`relative ${className}`} {...props}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;
