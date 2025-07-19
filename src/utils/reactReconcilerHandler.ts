// Handler for React reconciler errors (completeWork, beginWork, etc.)

export class ReactReconcilerHandler {
  private static instance: ReactReconcilerHandler;
  private isActive = false;
  private reconcilerErrors = new Map<string, number>();
  private maxReconcilerErrors = 5;

  static getInstance(): ReactReconcilerHandler {
    if (!ReactReconcilerHandler.instance) {
      ReactReconcilerHandler.instance = new ReactReconcilerHandler();
    }
    return ReactReconcilerHandler.instance;
  }

  initialize() {
    if (this.isActive) return;

    // Set up React reconciler error handling
    this.setupReconcilerErrorHandler();
    
    // Override React's internal error handling
    this.setupReactInternalOverrides();
    
    this.isActive = true;
    console.log('React reconciler handler initialized');
  }

  private setupReconcilerErrorHandler() {
    // Handle errors during React's reconciliation process
    window.addEventListener('error', this.handleReconcilerError);
    window.addEventListener('unhandledrejection', this.handleReconcilerRejection);
  }

  private setupReactInternalOverrides() {
    // Override console methods to catch React internal errors
    const originalConsoleError = console.error;
    
    console.error = (...args: any[]) => {
      const message = args[0];
      
      if (typeof message === 'string') {
        // Handle completeWork and other reconciler errors
        if (this.isReconcilerError(message)) {
          this.handleReconcilerErrorMessage(message, args);
          return; // Don't spam console with reconciler errors
        }
        
        // Handle other React internal errors
        if (this.isReactInternalError(message)) {
          this.handleReactInternalErrorMessage(message, args);
          return;
        }
      }
      
      // Call original console.error for other messages
      originalConsoleError.apply(console, args);
    };
  }

  private isReconcilerError(message: string): boolean {
    const reconcilerErrorIndicators = [
      'completeWork',
      'completeUnitOfWork',
      'beginWork',
      'commitWork',
      'commitRoot',
      'reconciler',
      'fiber',
      'workLoop',
      'workLoopSync',
      'workLoopConcurrent',
      'performWork',
      'performSyncWorkOnRoot',
      'performConcurrentWorkOnRoot',
      'flushWork',
      'flushSyncCallbacks',
      'renderRootSync',
      'renderRootConcurrent',
      'commitMutationEffects',
      'commitLayoutEffects',
      'commitPassiveEffects'
    ];

    return reconcilerErrorIndicators.some(indicator => 
      message.toLowerCase().includes(indicator.toLowerCase())
    );
  }

  private isReactInternalError(message: string): boolean {
    const reactInternalIndicators = [
      'React will try to recreate',
      'The above error occurred',
      'Consider adding an error boundary',
      'React DevTools',
      'Warning: React'
    ];

    return reactInternalIndicators.some(indicator => 
      message.includes(indicator)
    );
  }

  private handleReconcilerError = (event: ErrorEvent) => {
    const error = event.error;
    const message = event.message || '';
    
    if (this.isReconcilerError(message) || this.isReconcilerErrorStack(error)) {
      console.warn('React reconciler error detected:', {
        message,
        error,
        filename: event.filename,
        lineno: event.lineno
      });
      
      // Prevent the error from propagating
      event.preventDefault();
      
      // Handle the reconciler error
      this.processReconcilerError(error || new Error(message));
    }
  };

  private handleReconcilerRejection = (event: PromiseRejectionEvent) => {
    const reason = event.reason;
    
    if (this.isReconcilerErrorStack(reason)) {
      console.warn('React reconciler promise rejection:', reason);
      
      // Prevent the error from propagating
      event.preventDefault();
      
      // Handle the reconciler error
      this.processReconcilerError(reason instanceof Error ? reason : new Error(String(reason)));
    }
  };

  private isReconcilerErrorStack(error: any): boolean {
    if (!error || !error.stack) return false;
    
    const reconcilerStackIndicators = [
      'completeWork',
      'completeUnitOfWork',
      'beginWork',
      'commitRoot',
      'workLoopSync',
      'workLoopConcurrent',
      'performSyncWorkOnRoot',
      'performConcurrentWorkOnRoot',
      'flushSyncCallbacks',
      'renderRootSync',
      'renderRootConcurrent',
      'commitMutationEffects',
      'commitLayoutEffects',
      'commitPassiveEffects',
      'reconcileChildren',
      'updateHostComponent',
      'updateFunctionComponent'
    ];

    return reconcilerStackIndicators.some(indicator => 
      error.stack.includes(indicator)
    );
  }

  private handleReconcilerErrorMessage(message: string, args: any[]) {
    if (process.env.NODE_ENV === 'development') {
      console.debug('React reconciler message (handled):', {
        message,
        timestamp: new Date().toISOString(),
        note: 'This is a React internal message that has been handled'
      });
    }
    
    // Create an error for reporting
    const error = new Error(`React Reconciler: ${message}`);
    this.processReconcilerError(error);
  }

  private handleReactInternalErrorMessage(message: string, args: any[]) {
    if (process.env.NODE_ENV === 'development') {
      console.debug('React internal message (handled):', {
        message,
        timestamp: new Date().toISOString()
      });
    }
  }

  private processReconcilerError(error: Error) {
    const errorKey = this.getErrorKey(error);
    const currentCount = this.reconcilerErrors.get(errorKey) || 0;
    
    // Increment error count
    this.reconcilerErrors.set(errorKey, currentCount + 1);
    
    // Report to error tracking if we haven't hit the limit
    if (currentCount < this.maxReconcilerErrors) {
      if (window.globalErrorHandler) {
        window.globalErrorHandler.reportError(error, {
          type: 'react_reconciler_error',
          errorCount: currentCount + 1,
          source: 'ReactReconcilerHandler'
        });
      }
    }
    
    // If we've hit too many reconciler errors, try to recover
    if (currentCount >= this.maxReconcilerErrors) {
      this.attemptReconcilerRecovery(errorKey);
    }
  }

  private getErrorKey(error: Error): string {
    // Create a key based on error message and stack trace
    const message = error.message || 'Unknown error';
    const stackLine = error.stack?.split('\n')[1] || '';
    return `${message}_${stackLine}`;
  }

  private attemptReconcilerRecovery(errorKey: string) {
    console.warn(`Attempting recovery for reconciler error: ${errorKey}`);
    
    // Strategy 1: Force a re-render by updating a dummy state
    this.forceGlobalRerender();
    
    // Strategy 2: Clear the error count after recovery attempt
    setTimeout(() => {
      this.reconcilerErrors.delete(errorKey);
    }, 5000);
  }

  private forceGlobalRerender() {
    // Dispatch a custom event that components can listen to for re-rendering
    const event = new CustomEvent('reconciler-recovery', {
      detail: { timestamp: Date.now() }
    });
    window.dispatchEvent(event);
  }

  // Method to get reconciler error statistics
  getReconcilerStats() {
    return {
      totalErrors: Array.from(this.reconcilerErrors.values()).reduce((sum, count) => sum + count, 0),
      uniqueErrors: this.reconcilerErrors.size,
      errors: Array.from(this.reconcilerErrors.entries())
    };
  }

  // Method to reset reconciler error tracking
  reset() {
    this.reconcilerErrors.clear();
  }

  cleanup() {
    if (!this.isActive) return;
    
    window.removeEventListener('error', this.handleReconcilerError);
    window.removeEventListener('unhandledrejection', this.handleReconcilerRejection);
    
    this.isActive = false;
  }
}

export const reactReconcilerHandler = ReactReconcilerHandler.getInstance();