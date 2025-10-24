import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const EarthPageTransition = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentChildren, setCurrentChildren] = useState(children);

  useEffect(() => {
    setIsTransitioning(true);
    
    // 500ms delay to allow the earth animation to complete
    const timer = setTimeout(() => {
      setCurrentChildren(children);
      setIsTransitioning(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname, children]);

  return (
    <div className="relative">
      {/* Page Content - Always visible */}
      <div className="w-full">
        {currentChildren}
      </div>

      {/* Earth Loading Overlay - Transparent background */}
      <AnimatePresence>
        {isTransitioning && (
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
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.39)' }}
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
};

export default EarthPageTransition;
