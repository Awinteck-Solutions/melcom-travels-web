import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageTransition } from './AnimationVariants';

const PageTransition = ({ children, location, useEarthAnimation = false }) => {
  const [showEarthLoader, setShowEarthLoader] = useState(false);
  const [currentChildren, setCurrentChildren] = useState(children);

  useEffect(() => {
    if (useEarthAnimation) {
      setShowEarthLoader(true);
      
      // 500ms delay to allow the earth animation to complete
      const timer = setTimeout(() => {
        setCurrentChildren(children);
        setShowEarthLoader(false);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setCurrentChildren(children);
    }
  }, [location, children, useEarthAnimation]);

  if (useEarthAnimation) {
    return (
      <div className="relative">
        {/* Page Content - Always visible */}
        <div className="w-full">
          {currentChildren}
        </div>

        {/* Earth Loading Overlay - Transparent background */}
        <AnimatePresence>
          {showEarthLoader && (
            <motion.div
              className="fixed inset-0 bg-transparent z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
            {/* Semi-transparent black backdrop */}
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.59)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
              
              {/* Earth Animation Content */}
              <motion.div
                className="relative flex flex-col items-center justify-center z-20"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ 
                  duration: 0.3,
                  ease: "easeOut"
                }}
              >
                {/* Earth SVG with rotation animation */}
                <motion.div
                  className="mb-4"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <img 
                    src="/earth.svg" 
                    alt="Loading..." 
                    className="w-24 h-24 drop-shadow-2xl"
                    style={{ 
                      filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5)) brightness(0) invert(1)',
                      opacity: 1
                    }}
                  />
                </motion.div>
                
                {/* Loading text */}
                <motion.p
                  className="text-white text-xl font-bold"
                  style={{ 
                    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.8)',
                    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6))',
                    opacity: 1
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Exploring the world...
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Original page transition without earth animation
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 1, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0,
          ease: "linear"
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
