import React from 'react';
import { useScrollToTop } from '../hooks/useScrollToTop';

/**
 * Higher-Order Component (HOC) that automatically adds scroll-to-top functionality
 * to any page component. This is more efficient than adding the hook to each page individually.
 * 
 * @param {React.Component} WrappedComponent - The component to wrap
 * @param {boolean} smooth - Whether to use smooth scrolling (default: true)
 * @returns {React.Component} Enhanced component with scroll-to-top functionality
 */
const withScrollToTop = (WrappedComponent, smooth = true) => {
  const WithScrollToTopComponent = (props) => {
    // Auto scroll to top when page loads
    useScrollToTop(smooth);
    
    return <WrappedComponent {...props} />;
  };

  // Set display name for debugging
  WithScrollToTopComponent.displayName = `withScrollToTop(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithScrollToTopComponent;
};

export default withScrollToTop;
