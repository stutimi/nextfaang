import React, { useEffect } from 'react';

// Component to catch and handle specific React errors
export const ErrorCatcher: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Catch any errors that might occur during component lifecycle
    const handleComponentError = (error: Error) => {
      console.error('Component lifecycle error:', error);
      
      // Report to our error system
      if (window.globalErrorHandler) {
        window.globalErrorHandler.reportError(error, {
          type: 'component_lifecycle_error',
          source: 'ErrorCatcher'
        });
      }
    };

    // Set up error handling for async operations
    const originalSetTimeout = window.setTimeout;
    window.setTimeout = (callback: Function, delay?: number, ...args: any[]) => {
      const wrappedCallback = (...callbackArgs: any[]) => {
        try {
          return callback.apply(this, callbackArgs);
        } catch (error) {
          handleComponentError(error as Error);
          throw error;
        }
      };
      return originalSetTimeout(wrappedCallback, delay, ...args);
    };

    return () => {
      // Cleanup if needed
      window.setTimeout = originalSetTimeout;
    };
  }, []);

  return <>{children}</>;
};