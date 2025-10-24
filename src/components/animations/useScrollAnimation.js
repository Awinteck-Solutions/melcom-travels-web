import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for one-time scroll animations
 * @param {Object} options - Animation options
 * @param {number} options.threshold - Intersection threshold (0-1)
 * @param {number} options.rootMargin - Root margin for intersection observer
 * @param {boolean} options.triggerOnce - Whether to trigger animation only once
 * @returns {Object} - { ref, isVisible, hasAnimated }
 */
export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasAnimated(true);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible, hasAnimated };
};

export default useScrollAnimation;
