import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated text reveal component.
 * Splits text into words/chars and animates each with blur → sharp + translate-y.
 * 
 * @param {string} text — the text to animate
 * @param {string} as — HTML tag (h1, h2, p, span)
 * @param {'word'|'char'} mode — split mode
 * @param {number} staggerDelay — delay between each unit
 * @param {boolean} once — animate only once
 * @param {string} className — applied to wrapper
 * @param {React.ReactNode} children — rendered AFTER the animated text
 */
const TextReveal = ({
  text,
  as: Tag = 'h2',
  mode = 'word',
  staggerDelay = 0.04,
  delay = 0,
  once = true,
  className = '',
  highlightWords = [],
  highlightClass = 'bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent',
  children,
}) => {
  const units = mode === 'char' ? text.split('') : text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const unitVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap' }}
    >
      {units.map((unit, i) => {
        const isHighlight = highlightWords.includes(unit);
        return (
          <motion.span
            key={`${unit}-${i}`}
            variants={unitVariants}
            className={isHighlight ? highlightClass : ''}
            style={{
              display: 'inline-block',
              marginRight: mode === 'word' ? '0.3em' : '0',
              willChange: 'transform, opacity, filter',
            }}
          >
            {unit}
            {mode === 'char' && unit === ' ' ? '\u00A0' : ''}
          </motion.span>
        );
      })}
      {children}
    </motion.div>
  );
};

export default TextReveal;
