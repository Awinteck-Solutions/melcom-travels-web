import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn, slideInFromTop, staggerContainer, staggerItem } from './AnimationVariants';

// Reusable animated wrapper components
export const AnimatedDiv = ({ 
  children, 
  variant = fadeInUp, 
  delay = 0, 
  className = "",
  ...props 
}) => (
  <motion.div
    variants={variant}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const AnimatedSection = ({ 
  children, 
  variant = fadeInUp, 
  delay = 0, 
  className = "",
  ...props 
}) => (
  <motion.section
    variants={variant}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.section>
);

export const AnimatedButton = ({ 
  children, 
  variant = fadeInUp, 
  delay = 0, 
  className = "",
  whileHover = { scale: 1.05 },
  whileTap = { scale: 0.95 },
  ...props 
}) => (
  <motion.button
    variants={variant}
    initial="initial"
    animate="animate"
    exit="exit"
    whileHover={whileHover}
    whileTap={whileTap}
    transition={{ delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.button>
);

export const AnimatedCard = ({ 
  children, 
  variant = scaleIn, 
  delay = 0, 
  className = "",
  hoverX = false,
  whileHover = hoverX ? { x: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" } : { y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" },
  ...props 
}) => (
  <motion.div
    variants={variant}
    initial="initial"
    animate="animate"
    exit="exit"
    whileHover={whileHover}
    transition={{ delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({ 
  children, 
  className = "",
  ...props 
}) => (
  <motion.div
    variants={staggerContainer}
    initial="initial"
    animate="animate"
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ 
  children, 
  className = "",
  ...props 
}) => (
  <motion.div
    variants={staggerItem}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const AnimatedImage = ({ 
  src, 
  alt, 
  variant = fadeInUp, 
  delay = 0, 
  className = "",
  ...props 
}) => (
  <motion.img
    src={src}
    alt={alt}
    variants={variant}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ delay }}
    className={className}
    {...props}
  />
);

export const AnimatedHeading = ({ 
  children, 
  variant = slideInFromTop, 
  delay = 0, 
  className = "",
  ...props 
}) => (
  <motion.h1
    variants={variant}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.h1>
);

export const AnimatedParagraph = ({ 
  children, 
  variant = fadeInUp, 
  delay = 0, 
  className = "",
  ...props 
}) => (
  <motion.p
    variants={variant}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.p>
);

export const AnimatedForm = ({ 
  children, 
  variant = fadeInUp, 
  delay = 0, 
  className = "",
  ...props 
}) => (
  <motion.form
    variants={variant}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.form>
);

export const AnimatedInput = ({ 
  variant = fadeInUp, 
  delay = 0, 
  className = "",
  whileFocus = { scale: 1.02 },
  ...props 
}) => (
  <motion.input
    variants={variant}
    initial="initial"
    animate="animate"
    exit="exit"
    whileFocus={whileFocus}
    transition={{ delay }}
    className={className}
    {...props}
  />
);

export const AnimatedSelect = ({ 
  children, 
  variant = fadeInUp, 
  delay = 0, 
  className = "",
  whileFocus = { scale: 1.02 },
  ...props 
}) => (
  <motion.select
    variants={variant}
    initial="initial"
    animate="animate"
    exit="exit"
    whileFocus={whileFocus}
    transition={{ delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.select>
);

// Specialized components for common use cases
export const FadeInUp = ({ children, delay = 0, className = "" }) => (
  <AnimatedDiv variant={fadeInUp} delay={delay} className={className}>
    {children}
  </AnimatedDiv>
);

export const FadeInLeft = ({ children, delay = 0, className = "" }) => (
  <AnimatedDiv variant={fadeInLeft} delay={delay} className={className}>
    {children}
  </AnimatedDiv>
);

export const FadeInRight = ({ children, delay = 0, className = "" }) => (
  <AnimatedDiv variant={fadeInRight} delay={delay} className={className}>
    {children}
  </AnimatedDiv>
);

export const ScaleIn = ({ children, delay = 0, className = "" }) => (
  <AnimatedDiv variant={scaleIn} delay={delay} className={className}>
    {children}
  </AnimatedDiv>
);

export const SlideInFromTop = ({ children, delay = 0, className = "" }) => (
  <AnimatedDiv variant={slideInFromTop} delay={delay} className={className}>
    {children}
  </AnimatedDiv>
);
