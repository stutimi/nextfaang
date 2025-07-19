// Handler for createInstance errors and component instantiation issues

export class InstanceCreationHandler {
  private static instance: InstanceCreationHandler;
  private originalCreateElement: typeof React.createElement;
  private isActive = false;

  static getInstance(): InstanceCreationHandler {
    if (!InstanceCreationHandler.instance) {
      InstanceCreationHandler.instance = new InstanceCreationHandler();
    }
    return InstanceCreationHandler.instance;
  }

  constructor() {
    // Store original React.createElement for restoration
    this.originalCreateElement = React.createElement;
  }

  initialize() {
    if (this.isActive) return;

    // Override React.createElement globally to catch createInstance errors
    this.setupCreateElementOverride();
    
    // Handle specific createInstance errors
    this.setupInstanceErrorHandler();
    
    this.isActive = true;
    console.log('Instance creation handler initialized');
  }

  private setupCreateElementOverride() {
    const originalCreateElement = React.createElement;
    
    React.createElement = (type: any, props?: any, ...children: any[]) => {
      try {
        // Validate the component type
        if (!this.isValidComponentType(type)) {
          console.warn('Invalid component type detected:', type);
          return null;
        }

        // Validate props
        if (props && typeof props !== 'object') {
          console.warn('Invalid props detected:', props);
          props = {};
        }

        // Call original createElement with validation
        return originalCreateElement(type, props, ...children);
      } catch (error) {
        console.error('createElement failed:', error);
        console.error('Component type:', type);
        console.error('Props:', props);
        console.error('Children:', children);
        
        // Report the error
        if (window.globalErrorHandler) {
          window.globalErrorHandler.reportError(error as Error, {
            type: 'createElement_failure',
            componentType: typeof type,
            componentName: type?.name || type?.displayName || 'Unknown',
            props: props,
            source: 'InstanceCreationHandler'
          });
        }
        
        // Return null instead of crashing
        return null;
      }
    };
  }

  private setupInstanceErrorHandler() {
    // Override common instance creation methods
    this.overrideInstanceMethods();
    
    // Set up error listeners for instance creation
    window.addEventListener('error', this.handleInstanceError);
  }

  private isValidComponentType(type: any): boolean {
    return (
      typeof type === 'string' ||
      typeof type === 'function' ||
      (type && typeof type === 'object' && type.$$typeof)
    );
  }

  private overrideInstanceMethods() {
    // Override common problematic methods
    const originalSetTimeout = window.setTimeout;
    window.setTimeout = (callback: Function, delay?: number, ...args: any[]) => {
      const safeCallback = (...callbackArgs: any[]) => {
        try {
          return callback.apply(this, callbackArgs);
        } catch (error) {
          console.error('setTimeout callback error:', error);
          if (window.globalErrorHandler) {
            window.globalErrorHandler.reportError(error as Error, {
              type: 'setTimeout_callback_error',
              source: 'InstanceCreationHandler'
            });
          }
        }
      };
      return originalSetTimeout(safeCallback, delay, ...args);
    };

    // Override setInterval similarly
    const originalSetInterval = window.setInterval;
    window.setInterval = (callback: Function, delay?: number, ...args: any[]) => {
      const safeCallback = (...callbackArgs: any[]) => {
        try {
          return callback.apply(this, callbackArgs);
        } catch (error) {
          console.error('setInterval callback error:', error);
          if (window.globalErrorHandler) {
            window.globalErrorHandler.reportError(error as Error, {
              type: 'setInterval_callback_error',
              source: 'InstanceCreationHandler'
            });
          }
        }
      };
      return originalSetInterval(safeCallback, delay, ...args);
    };
  }

  private handleInstanceError = (event: ErrorEvent) => {
    const error = event.error;
    const message = event.message || '';
    
    // Check if this is a createInstance error
    if (this.isInstanceCreationError(error, message)) {
      console.warn('Instance creation error detected:', error);
      
      // Prevent the error from propagating
      event.preventDefault();
      
      // Report the error
      if (window.globalErrorHandler) {
        window.globalErrorHandler.reportError(error || new Error(message), {
          type: 'instance_creation_error',
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          source: 'InstanceCreationHandler'
        });
      }
    }
  };

  private isInstanceCreationError(error: any, message: string): boolean {
    const instanceErrorIndicators = [
      'createInstance',
      'instance creation',
      'Cannot create instance',
      'Failed to create instance',
      'Instance initialization',
      'constructor error'
    ];

    return instanceErrorIndicators.some(indicator => 
      message.includes(indicator) || 
      (error && error.message && error.message.includes(indicator)) ||
      (error && error.stack && error.stack.includes(indicator))
    );
  }

  cleanup() {
    if (!this.isActive) return;
    
    // Restore original React.createElement
    React.createElement = this.originalCreateElement;
    
    // Remove event listeners
    window.removeEventListener('error', this.handleInstanceError);
    
    this.isActive = false;
  }
}

// Import React at the top level to avoid issues
import React from 'react';

export const instanceCreationHandler = InstanceCreationHandler.getInstance();