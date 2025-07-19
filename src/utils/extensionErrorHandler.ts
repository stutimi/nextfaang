// Handler for browser extension-related errors

interface ExtensionErrorStatus {
  initialized: boolean;
  errorsSuppressed: number;
  rejectionsHandled: number;
}

let status: ExtensionErrorStatus = {
  initialized: false,
  errorsSuppressed: 0,
  rejectionsHandled: 0
};

export const extensionErrorHandler = {
  initialize: () => {
    console.log('🔌 Initializing Extension Error Handler...');
    
    // Override console.error to filter out extension-related errors
    const originalConsoleError = console.error;
    console.error = function(...args: any[]) {
      // Check if the error is related to runtime.lastError
      const errorString = typeof args[0] === 'string' ? args[0] : String(args[0]);
      
      if (
        (errorString.includes && (
          errorString.includes('runtime.lastError') || 
          errorString.includes('message channel closed') ||
          errorString.includes('asynchronous response')
        )) ||
        (args[0] && args[0].message && (
          args[0].message.includes('runtime.lastError') ||
          args[0].message.includes('message channel closed') ||
          args[0].message.includes('asynchronous response')
        ))
      ) {
        // In production, completely suppress these errors
        if (import.meta.env.PROD) {
          status.errorsSuppressed++;
          return;
        }
        // In development, log to debug instead of error
        console.debug('🔌 Extension error suppressed:', ...args);
        status.errorsSuppressed++;
        return;
      }
      
      // Pass through to original console.error for all other errors
      originalConsoleError.apply(console, args);
    };
    
    // Also handle unhandledrejection events for extension errors
    window.addEventListener('unhandledrejection', (event) => {
      const errorMsg = event.reason?.message || String(event.reason);
      if (
        errorMsg.includes('runtime.lastError') ||
        errorMsg.includes('message channel closed') ||
        errorMsg.includes('asynchronous response')
      ) {
        // Prevent the default handling
        event.preventDefault();
        event.stopPropagation();
        
        // In development, log to debug
        if (import.meta.env.DEV) {
          console.debug('🔌 Extension promise rejection suppressed:', errorMsg);
        }
        status.rejectionsHandled++;
        return true;
      }
    }, true);
    
    status.initialized = true;
    console.log('✅ Extension Error Handler initialized');
    return true;
  },
  
  cleanup: () => {
    // Cleanup would restore the original console.error if needed
    console.log('🔄 Extension Error Handler cleaned up');
    status.initialized = false;
    return true;
  },
  
  getStatus: () => {
    return { ...status };
  },
  
  handleError: (error: Error) => {
    console.debug('🔌 Extension error handled:', error.message);
    return true;
  }
};