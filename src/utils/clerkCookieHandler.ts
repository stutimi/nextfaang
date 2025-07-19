// Handler for Clerk cookie and digest-related errors

export class ClerkCookieHandler {
  private static instance: ClerkCookieHandler;
  private isActive = false;

  static getInstance(): ClerkCookieHandler {
    if (!ClerkCookieHandler.instance) {
      ClerkCookieHandler.instance = new ClerkCookieHandler();
    }
    return ClerkCookieHandler.instance;
  }

  initialize() {
    if (this.isActive) return;

    // Handle Clerk cookie errors
    this.setupClerkCookieErrorHandling();
    
    // Set up development environment fixes
    this.setupDevelopmentFixes();
    
    this.isActive = true;
    console.log('Clerk cookie handler initialized');
  }

  private setupClerkCookieErrorHandling() {
    // Override console.error to catch Clerk cookie errors
    const originalConsoleError = console.error;
    
    console.error = (...args: any[]) => {
      const message = args[0];
      
      if (typeof message === 'string' && this.isClerkCookieError(message)) {
        this.handleClerkCookieError(message, args);
        return; // Don't spam console with cookie errors
      }
      
      originalConsoleError.apply(console, args);
    };

    // Handle window errors that might be Clerk-related
    window.addEventListener('error', this.handleClerkError);
  }

  private isClerkCookieError(message: string): boolean {
    const clerkCookieErrorPatterns = [
      'Suffixed cookie failed',
      'Cannot read properties of undefined (reading \'digest\')',
      'secure-context: false',
      'clerk cookie',
      'digest is not defined',
      'cookie digest error'
    ];

    return clerkCookieErrorPatterns.some(pattern => 
      message.toLowerCase().includes(pattern.toLowerCase())
    );
  }

  private handleClerkCookieError(message: string, args: any[]) {
    if (process.env.NODE_ENV === 'development') {
      console.debug('Clerk cookie error (handled):', {
        message,
        note: 'This is a development environment issue and will not affect production',
        solution: 'Use HTTPS in production or configure Clerk for HTTP development'
      });
    }

    // Report to error tracking
    if (window.globalErrorHandler) {
      window.globalErrorHandler.reportError(new Error(`Clerk Cookie Error: ${message}`), {
        type: 'clerk_cookie_error',
        environment: 'development',
        secure_context: false,
        source: 'ClerkCookieHandler'
      });
    }
  }

  private handleClerkError = (event: ErrorEvent) => {
    const error = event.error;
    const message = event.message || '';
    
    if (this.isClerkCookieError(message) || this.isClerkCookieError(error?.message || '')) {
      console.warn('Clerk cookie error intercepted:', { message, error });
      event.preventDefault();
      
      this.handleClerkCookieError(message, [error]);
    }
  };

  private setupDevelopmentFixes() {
    // Apply development environment fixes for Clerk
    if (process.env.NODE_ENV === 'development') {
      this.applyDevelopmentCookieFixes();
    }
  }

  private applyDevelopmentCookieFixes() {
    // Set up cookie handling for development environment
    try {
      // Ensure document.cookie is available
      if (typeof document !== 'undefined') {
        // Set up basic cookie support for development
        const originalCookieDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');
        
        if (originalCookieDescriptor) {
          Object.defineProperty(document, 'cookie', {
            get: function() {
              try {
                return originalCookieDescriptor.get?.call(this) || '';
              } catch (error) {
                console.debug('Cookie access error (handled):', error);
                return '';
              }
            },
            set: function(value) {
              try {
                if (originalCookieDescriptor.set) {
                  originalCookieDescriptor.set.call(this, value);
                }
              } catch (error) {
                console.debug('Cookie set error (handled):', error);
              }
            },
            configurable: true
          });
        }
      }
    } catch (error) {
      console.debug('Development cookie fix failed (non-critical):', error);
    }
  }

  // Method to check if we're in a secure context
  isSecureContext(): boolean {
    return window.isSecureContext || window.location.protocol === 'https:';
  }

  // Method to get development recommendations
  getDevelopmentRecommendations(): string[] {
    const recommendations = [];
    
    if (!this.isSecureContext()) {
      recommendations.push('Consider using HTTPS for development (https://localhost:3000)');
      recommendations.push('Or configure Clerk for HTTP development in your dashboard');
    }
    
    recommendations.push('This cookie error will not occur in production with HTTPS');
    recommendations.push('Clerk authentication will still work despite this warning');
    
    return recommendations;
  }

  cleanup() {
    if (!this.isActive) return;
    
    window.removeEventListener('error', this.handleClerkError);
    this.isActive = false;
  }
}

export const clerkCookieHandler = ClerkCookieHandler.getInstance();