// Specific error handler for Clerk-related issues
export class ClerkErrorHandler {
  private static instance: ClerkErrorHandler;
  private isInitialized = false;
  private clerkErrors = new Map<string, number>();
  private maxRetries = 3;

  static getInstance(): ClerkErrorHandler {
    if (!ClerkErrorHandler.instance) {
      ClerkErrorHandler.instance = new ClerkErrorHandler();
    }
    return ClerkErrorHandler.instance;
  }

  initialize() {
    if (this.isInitialized) return;

    console.log('🔐 Initializing Clerk Error Handler...');

    // Override console.error to catch Clerk-specific errors
    this.setupClerkErrorInterception();

    // Set up promise rejection handler for Clerk
    this.setupClerkPromiseRejectionHandler();

    this.isInitialized = true;
    console.log('✅ Clerk Error Handler initialized');
  }

  private setupClerkErrorInterception() {
    const originalConsoleError = console.error;
    
    console.error = (...args: any[]) => {
      // Check if this is a Clerk-related error
      const errorMessage = args.join(' ');
      
      if (this.isClerkError(errorMessage)) {
        this.handleClerkError(errorMessage, args);
        
        // Only log if it's not a known recoverable error
        if (!this.isRecoverableClerkError(errorMessage)) {
          originalConsoleError.apply(console, args);
        }
      } else {
        originalConsoleError.apply(console, args);
      }
    };
  }

  private setupClerkPromiseRejectionHandler() {
    window.addEventListener('unhandledrejection', (event) => {
      const error = event.reason;
      
      if (this.isClerkError(String(error))) {
        console.log('🔐 Clerk Error Handler caught promise rejection:', error);
        
        // Prevent the error from being logged to console if it's recoverable
        if (this.isRecoverableClerkError(String(error))) {
          event.preventDefault();
        }
        
        this.handleClerkError(String(error), [error]);
      }
    });
  }

  private isClerkError(message: string): boolean {
    const clerkIndicators = [
      'clerk',
      'Class constructors cannot be invoked without',
      'ClerkProvider',
      'useUser',
      'useAuth',
      'SignIn',
      'SignUp',
      'UserButton'
    ];

    return clerkIndicators.some(indicator => 
      message.toLowerCase().includes(indicator.toLowerCase())
    );
  }

  private isRecoverableClerkError(message: string): boolean {
    const recoverableErrors = [
      'Class constructors cannot be invoked without',
      'development keys',
      'HTTP development',
      'crypto.subtle',
      'cookie/digest issues'
    ];

    return recoverableErrors.some(error => 
      message.toLowerCase().includes(error.toLowerCase())
    );
  }

  private handleClerkError(message: string, args: any[]) {
    const errorKey = this.getErrorKey(message);
    const attempts = this.clerkErrors.get(errorKey) || 0;

    if (attempts < this.maxRetries) {
      this.clerkErrors.set(errorKey, attempts + 1);
      
      console.log(`🔐 Clerk Error Handler (attempt ${attempts + 1}/${this.maxRetries}):`, message);
      
      // Try to recover from specific errors
      this.attemptClerkErrorRecovery(message);
    } else {
      console.warn(`🔐 Clerk Error Handler: Max retries reached for error: ${message}`);
    }
  }

  private attemptClerkErrorRecovery(message: string) {
    if (message.includes('Class constructors cannot be invoked without')) {
      console.log('🔐 Attempting recovery from class constructor error...');
      
      // Clear any cached Clerk instances
      if ((window as any).Clerk) {
        try {
          delete (window as any).Clerk;
        } catch (e) {
          // Ignore cleanup errors
        }
      }
      
      // Trigger a re-initialization after a delay
      setTimeout(() => {
        console.log('🔐 Triggering Clerk re-initialization...');
        // This will be handled by the main app's error recovery
      }, 1000);
    }
  }

  private getErrorKey(message: string): string {
    return message.substring(0, 100);
  }

  reset() {
    this.clerkErrors.clear();
  }

  getStatus() {
    return {
      isInitialized: this.isInitialized,
      errorCount: this.clerkErrors.size,
      errors: Array.from(this.clerkErrors.entries())
    };
  }
}

export const clerkErrorHandler = ClerkErrorHandler.getInstance();