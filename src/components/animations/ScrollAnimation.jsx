import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from './useScrollAnimation';

/**
 * ScrollAnimation component for one-time scroll animations
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.animation - Animation configuration
 * @param {Object} props.options - Scroll animation options
 * @returns {JSX.Element} - Animated component
 */
const ScrollAnimation = ({ 
  children, 
  className = '', 
  animation = 'fadeUp',
  options = {}
}) => {
  const { ref, isVisible } = useScrollAnimation(options);

  // Animation variants
  const animations = {
    fadeUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: "easeOut" }
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.8, ease: "easeOut" }
    },
    slideLeft: {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6, ease: "easeOut" }
    },
    slideRight: {
      initial: { opacity: 0, x: -100 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6, ease: "easeOut" }
    },
    scaleUp: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.6, ease: "easeOut" }
    },
    stagger: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const selectedAnimation = animations[animation] || animations.fadeUp;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={selectedAnimation.initial}
      animate={isVisible ? selectedAnimation.animate : selectedAnimation.initial}
      transition={selectedAnimation.transition}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggeredScrollAnimation for animating multiple children with delays
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.delay - Delay between children animations
 * @param {Object} props.options - Scroll animation options
 * @returns {JSX.Element} - Animated component
 */
export const StaggeredScrollAnimation = ({ 
  children, 
  className = '', 
  delay = 0.1,
  options = {}
}) => {
  const { ref, isVisible } = useScrollAnimation(options);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: delay,
            delayChildren: 0.1
          }
        }
      }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.5, ease: "easeOut" }
            }
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ScrollAnimation;
