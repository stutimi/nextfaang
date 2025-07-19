// Global error handler that provides centralized error reporting and coordination

export class GlobalErrorHandler {
  private static instance: GlobalErrorHandler;
  private isInitialized = false;
  private errorCount = 0;
  private maxErrors = 50; // Prevent infinite error loops
  private errorCooldown = 5000; // 5 seconds between similar errors
  private recentErrors = new Map<string, number>();

  static getInstance(): GlobalErrorHandler {
    if (!GlobalErrorHandler.instance) {
      GlobalErrorHandler.instance = new GlobalErrorHandler();
    }
    return GlobalErrorHandler.instance;
  }

  initialize() {
    if (this.isInitialized) {
      console.warn('GlobalErrorHandler already initialized');
      return;
    }

    console.log('🌐 Initializing Global Error Handler...');

    // Set up global error listeners
    this.setupGlobalErrorListeners();

    // Make the handler globally available
    (window as any).globalErrorHandler = this;

    this.isInitialized = true;
    console.log('✅ Global Error Handler initialized successfully');
  }

  private setupGlobalErrorListeners() {
    // Global error event listener
    window.addEventListener('error', this.handleGlobalError);

    // Global unhandled promise rejection listener
    window.addEventListener('unhandledrejection', this.handleGlobalRejection);
  }

  private handleGlobalError = (event: ErrorEvent) => {
    // This is a fallback for any errors not caught by specific handlers
    const error = event.error || new Error(event.message);

    this.reportError(error, {
      type: 'global_error_event',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      source: 'GlobalErrorHandler'
    });
  };

  private handleGlobalRejection = (event: PromiseRejectionEvent) => {
    // This is a fallback for any promise rejections not caught by specific handlers
    const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));

    this.reportError(error, {
      type: 'global_promise_rejection',
      source: 'GlobalErrorHandler'
    });
  };

  // Main error reporting method that matches the expected interface
  reportError(error: Error, context?: Record<string, any>) {
    // Prevent infinite error loops
    if (this.errorCount >= this.maxErrors) {
      console.warn('GlobalErrorHandler: Maximum error count reached, suppressing further errors');
      return;
    }

    // Check for error cooldown to prevent spam
    const errorKey = this.getErrorKey(error);
    const lastReported = this.recentErrors.get(errorKey);
    const now = Date.now();

    if (lastReported && (now - lastReported) < this.errorCooldown) {
      return; // Skip reporting this error due to cooldown
    }

    this.recentErrors.set(errorKey, now);
    this.errorCount++;

    // Log error details
    this.logErrorDetails(error, context);

    // Report to external services if available
    this.reportToExternalServices(error, context);

    // Clean up old error records
    this.cleanupOldErrors();
  }

  private getErrorKey(error: Error): string {
    return `${error.name}:${error.message}`.substring(0, 100);
  }

  private logErrorDetails(error: Error, context?: Record<string, any>) {
    console.group('🚨 Global Error Handler - Error Report');
    console.error('Error:', error);
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    if (context) {
      console.error('Context:', context);
    }
    console.error('Timestamp:', new Date().toISOString());
    console.error('Error Count:', this.errorCount);
    console.groupEnd();
  }

  private reportToExternalServices(error: Error, context?: Record<string, any>) {
    // Report to Sentry if available
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      try {
        (window as any).Sentry.captureException(error, {
          tags: {
            source: context?.source || 'unknown',
            type: context?.type || 'unknown'
          },
          contexts: {
            additional: context
          }
        });
      } catch (sentryError) {
        console.warn('Failed to report to Sentry:', sentryError);
      }
    }

    // Report to LogRocket if available
    if (typeof window !== 'undefined' && (window as any).LogRocket) {
      try {
        (window as any).LogRocket.captureException(error);
      } catch (logRocketError) {
        console.warn('Failed to report to LogRocket:', logRocketError);
      }
    }

    // Report to Google Analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      try {
        (window as any).gtag('event', 'exception', {
          description: error.message,
          fatal: false,
          custom_map: context
        });
      } catch (gtagError) {
        console.warn('Failed to report to Google Analytics:', gtagError);
      }
    }
  }

  private cleanupOldErrors() {
    const now = Date.now();
    const cutoff = now - (this.errorCooldown * 2); // Clean up errors older than 2x cooldown

    for (const [key, timestamp] of this.recentErrors.entries()) {
      if (timestamp < cutoff) {
        this.recentErrors.delete(key);
      }
    }
  }

  // Public methods for status and management
  getStatus() {
    return {
      isInitialized: this.isInitialized,
      errorCount: this.errorCount,
      recentErrorsCount: this.recentErrors.size,
      maxErrors: this.maxErrors
    };
  }

  reset() {
    console.log('🔄 Resetting Global Error Handler...');

    // Remove event listeners
    window.removeEventListener('error', this.handleGlobalError);
    window.removeEventListener('unhandledrejection', this.handleGlobalRejection);

    // Reset state
    this.isInitialized = false;
    this.errorCount = 0;
    this.recentErrors.clear();

    // Remove from window
    if ((window as any).globalErrorHandler === this) {
      delete (window as any).globalErrorHandler;
    }

    console.log('✅ Global Error Handler reset complete');
  }

  cleanup() {
    this.reset();
  }
}

export const globalErrorHandler = GlobalErrorHandler.getInstance();