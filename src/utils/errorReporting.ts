// Error reporting utilities following React's best practices

export interface ErrorReport {
  error: Error;
  errorInfo?: React.ErrorInfo;
  userId?: string;
  sessionId?: string;
  timestamp: number;
  url: string;
  userAgent: string;
  additionalContext?: Record<string, any>;
}

class ErrorReportingService {
  private static instance: ErrorReportingService;
  private isProduction = process.env.NODE_ENV === 'production';
  private sessionId = this.generateSessionId();

  static getInstance(): ErrorReportingService {
    if (!ErrorReportingService.instance) {
      ErrorReportingService.instance = new ErrorReportingService();
    }
    return ErrorReportingService.instance;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Main error reporting method
  reportError(error: Error, errorInfo?: React.ErrorInfo, additionalContext?: Record<string, any>) {
    const errorReport: ErrorReport = {
      error,
      errorInfo,
      sessionId: this.sessionId,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      additionalContext,
    };

    // Always log to console in development
    if (!this.isProduction) {
      this.logToConsole(errorReport);
    }

    // Report to external services in production
    if (this.isProduction) {
      this.reportToExternalServices(errorReport);
    }

    // Store locally for debugging
    this.storeLocallyForDebugging(errorReport);
  }

  private logToConsole(errorReport: ErrorReport) {
    console.group('🚨 Error Report');
    console.error('Error:', errorReport.error);
    console.error('Error Info:', errorReport.errorInfo);
    console.error('Session ID:', errorReport.sessionId);
    console.error('URL:', errorReport.url);
    console.error('Timestamp:', new Date(errorReport.timestamp).toISOString());
    if (errorReport.additionalContext) {
      console.error('Additional Context:', errorReport.additionalContext);
    }
    console.groupEnd();
  }

  private reportToExternalServices(errorReport: ErrorReport) {
    // Sentry integration
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(errorReport.error, {
        tags: {
          sessionId: errorReport.sessionId,
        },
        contexts: {
          react: errorReport.errorInfo,
          additional: errorReport.additionalContext,
        },
      });
    }

    // LogRocket integration
    if (typeof window !== 'undefined' && (window as any).LogRocket) {
      (window as any).LogRocket.captureException(errorReport.error);
    }

    // Google Analytics integration
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: errorReport.error.toString(),
        fatal: false,
        custom_map: {
          sessionId: errorReport.sessionId,
        },
      });
    }

    // Custom API endpoint
    this.reportToCustomAPI(errorReport);
  }

  private async reportToCustomAPI(errorReport: ErrorReport) {
    try {
      // Replace with your actual error reporting endpoint
      const response = await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: errorReport.error.message,
          stack: errorReport.error.stack,
          componentStack: errorReport.errorInfo?.componentStack,
          sessionId: errorReport.sessionId,
          timestamp: errorReport.timestamp,
          url: errorReport.url,
          userAgent: errorReport.userAgent,
          additionalContext: errorReport.additionalContext,
        }),
      });

      if (!response.ok) {
        console.warn('Failed to report error to API:', response.statusText);
      }
    } catch (apiError) {
      console.warn('Error reporting API failed:', apiError);
    }
  }

  private storeLocallyForDebugging(errorReport: ErrorReport) {
    try {
      const errors = JSON.parse(localStorage.getItem('app_errors') || '[]');
      errors.push({
        ...errorReport,
        error: {
          message: errorReport.error.message,
          stack: errorReport.error.stack,
          name: errorReport.error.name,
        },
      });

      // Keep only last 10 errors
      if (errors.length > 10) {
        errors.splice(0, errors.length - 10);
      }

      localStorage.setItem('app_errors', JSON.stringify(errors));
    } catch (storageError) {
      console.warn('Failed to store error locally:', storageError);
    }
  }

  // Method to get stored errors for debugging
  getStoredErrors(): any[] {
    try {
      return JSON.parse(localStorage.getItem('app_errors') || '[]');
    } catch {
      return [];
    }
  }

  // Clear stored errors
  clearStoredErrors() {
    localStorage.removeItem('app_errors');
  }
}

export const errorReporter = ErrorReportingService.getInstance();