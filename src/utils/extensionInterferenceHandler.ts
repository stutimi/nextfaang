// Handler for browser extension interference issues

export class ExtensionInterferenceHandler {
  private static instance: ExtensionInterferenceHandler;
  private protectedProperties = new Set(['href', 'location', 'cookie']);
  private originalDefineProperty: typeof Object.defineProperty;
  private isInitialized = false;

  static getInstance(): ExtensionInterferenceHandler {
    if (!ExtensionInterferenceHandler.instance) {
      ExtensionInterferenceHandler.instance = new ExtensionInterferenceHandler();
    }
    return ExtensionInterferenceHandler.instance;
  }

  initialize() {
    if (this.isInitialized) return;
    
    console.log('🛡️ Initializing Extension Interference Handler...');
    
    this.originalDefineProperty = Object.defineProperty;
    this.setupPropertyProtection();
    this.setupMethodProtection();
    this.setupGlobalErrorSuppression();
    
    this.isInitialized = true;
    console.log('✅ Extension Interference Handler initialized');
  }

  private setupPropertyProtection() {
    // Protect against property redefinition attempts
    Object.defineProperty = (obj: any, prop: string, descriptor: PropertyDescriptor) => {
      try {
        // Check if this is a protected property being redefined
        if (this.protectedProperties.has(prop)) {
          // Check if the property already exists and is non-configurable
          const existingDescriptor = Object.getOwnPropertyDescriptor(obj, prop);
          if (existingDescriptor && !existingDescriptor.configurable) {
            console.debug(`🛡️ Blocked redefinition of protected property: ${prop}`);
            return obj; // Silently ignore the redefinition attempt
          }
        }
        
        return this.originalDefineProperty.call(this, obj, prop, descriptor);
      } catch (error) {
        const errorMessage = (error as Error).message;
        
        // Handle specific extension-related errors
        if (errorMessage.includes('Cannot redefine property') || 
            errorMessage.includes('href') ||
            errorMessage.includes('location')) {
          console.debug(`🛡️ Extension interference blocked: ${errorMessage}`);
          return obj; // Return object without modification
        }
        
        // Re-throw other errors
        throw error;
      }
    };
  }

  private setupMethodProtection() {
    // Protect against undefined method calls
    const originalConsoleError = console.error;
    console.error = (...args: any[]) => {
      const message = args[0]?.toString() || '';
      
      // Suppress extension-related errors
      if (message.includes('startQueueProcessor is not a function') ||
          message.includes('Cannot read properties of undefined') ||
          message.includes('universal-blocker') ||
          message.includes('feedback-manager') ||
          message.includes('content-blocker')) {
        console.debug('🛡️ Suppressed extension error:', message);
        return;
      }
      
      // Allow other errors through
      originalConsoleError.apply(console, args);
    };
  }

  private setupGlobalErrorSuppression() {
    // Handle uncaught errors from extensions
    const originalErrorHandler = window.onerror;
    window.onerror = (message, source, lineno, colno, error) => {
      const messageStr = message?.toString() || '';
      const sourceStr = source?.toString() || '';
      
      // Check if this is an extension-related error
      if (sourceStr.includes('extension://') ||
          messageStr.includes('universal-blocker') ||
          messageStr.includes('feedback-manager') ||
          messageStr.includes('content-blocker') ||
          messageStr.includes('Cannot redefine property') ||
          messageStr.includes('startQueueProcessor is not a function')) {
        console.debug('🛡️ Suppressed extension error:', messageStr);
        return true; // Prevent default error handling
      }
      
      // Let other errors through
      if (originalErrorHandler) {
        return originalErrorHandler(message, source, lineno, colno, error);
      }
      return false;
    };

    // Handle unhandled promise rejections from extensions
    const originalUnhandledRejection = window.onunhandledpromiserejection;
    window.onunhandledpromiserejection = (event) => {
      const reason = event.reason?.toString() || '';
      
      if (reason.includes('universal-blocker') ||
          reason.includes('feedback-manager') ||
          reason.includes('content-blocker') ||
          reason.includes('Cannot redefine property')) {
        console.debug('🛡️ Suppressed extension promise rejection:', reason);
        event.preventDefault();
        return;
      }
      
      // Let other rejections through
      if (originalUnhandledRejection) {
        originalUnhandledRejection(event);
      }
    };
  }

  // Method to check if an error is extension-related
  isExtensionError(error: Error | string): boolean {
    const message = error.toString();
    return message.includes('universal-blocker') ||
           message.includes('feedback-manager') ||
           message.includes('content-blocker') ||
           message.includes('Cannot redefine property') ||
           message.includes('startQueueProcessor is not a function') ||
           message.includes('extension://');
  }

  // Method to safely suppress extension errors
  suppressExtensionError(error: Error, context?: any) {
    if (this.isExtensionError(error)) {
      console.debug('🛡️ Extension error suppressed:', error.message, context);
      return true;
    }
    return false;
  }

  getStatus() {
    return {
      initialized: this.isInitialized,
      protectedProperties: Array.from(this.protectedProperties)
    };
  }
}

export const extensionInterferenceHandler = ExtensionInterferenceHandler.getInstance();