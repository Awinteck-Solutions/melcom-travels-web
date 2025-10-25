import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to automatically scroll to top when route changes
 * Provides smooth scrolling behavior for better user experience
 */
export const useScrollToTop = (smooth = true) => {
    const location = useLocation();

    useEffect(() => {
        // Scroll to top when location changes
        if (smooth) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.pathname, smooth]);
};

/**
 * Alternative hook for immediate scroll to top (no smooth animation)
 * Useful for cases where smooth scrolling might interfere with page transitions
 */
export const useScrollToTopImmediate = () => {
    useScrollToTop(false);
};

export default useScrollToTop;
