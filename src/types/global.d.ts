// Global type definitions for error boundary enhancements

declare global {
  interface Window {
    // Google Analytics
    gtag?: (
      command: 'config' | 'event' | 'exception',
      targetId: string | 'exception',
      config?: {
        description?: string;
        fatal?: boolean;
        custom_map?: Record<string, any>;
        [key: string]: any;
      }
    ) => void;

    // Sentry
    Sentry?: {
      captureException: (error: Error, options?: {
        tags?: Record<string, string>;
        contexts?: Record<string, any>;
        [key: string]: any;
      }) => void;
      [key: string]: any;
    };

    // LogRocket
    LogRocket?: {
      captureException: (error: Error) => void;
      [key: string]: any;
    };

    // Global error handler
    globalErrorHandler?: {
      reportError: (error: Error, context?: Record<string, any>) => void;
      [key: string]: any;
    };

    // Instance creation handler
    instanceCreationHandler?: {
      createSafeInstance: (component: any, props?: any, children?: any) => any;
      [key: string]: any;
    };
  }
}

export {};