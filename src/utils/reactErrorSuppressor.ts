// Utility to handle React's internal error logging issues

export class ReactErrorSuppressor {
  private originalConsoleError: typeof console.error;
  private isActive = false;

  constructor() {
    this.originalConsoleError = console.error;
  }

  activate() {
    if (this.isActive) return;

    console.error = (...args: any[]) => {
      const message = args[0];
      
      // Check for specific React internal errors that we want to suppress or handle differently
      if (typeof message === 'string') {
        // Handle logCapturedError specifically
        if (message.includes('logCapturedError') || 
            message.includes('chunk-') ||
            message.includes('The above error occurred in the')) {
          
          // Log a cleaner version for development
          if (process.env.NODE_ENV === 'development') {
            console.warn('🔧 React Internal Error (handled by error boundary):', {
              message: message,
              timestamp: new Date().toISOString(),
              note: 'This error is being handled by our error boundary system'
            });
          }
          
          // Don't call the original console.error for these specific cases
          return;
        }

        // Handle other React warnings/errors
        if (message.includes('Warning:') || 
            message.includes('React will try to recreate')) {
          
          // Log React warnings in a cleaner format
          console.warn('⚠️ React Warning:', message);
          return;
        }
      }

      // For all other errors, use the original console.error
      this.originalConsoleError.apply(console, args);
    };

    this.isActive = true;
  }

  deactivate() {
    if (!this.isActive) return;
    
    console.error = this.originalConsoleError;
    this.isActive = false;
  }

  // Method to temporarily suppress errors during specific operations
  suppressDuring<T>(operation: () => T): T {
    const wasActive = this.isActive;
    
    if (!wasActive) {
      this.activate();
    }

    try {
      return operation();
    } finally {
      if (!wasActive) {
        this.deactivate();
      }
    }
  }
}

export const reactErrorSuppressor = new ReactErrorSuppressor();