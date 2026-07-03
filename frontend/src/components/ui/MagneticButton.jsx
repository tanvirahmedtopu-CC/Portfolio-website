import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Wraps children in a magnetic hover effect.
 * The element subtly follows the cursor when hovered.
 * 
 * @param {number} strength — magnetic pull strength (default 0.3)
 * @param {number} radius — activation radius in px (default 200)
 */
const MagneticButton = ({ 
  children, 
  className = '', 
  strength = 0.3,
  as = 'div',
  ...props 
}) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = motion[as] || motion.div;

  return (
    <Component
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default MagneticButton;
