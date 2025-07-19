// Specialized handler for React Fiber reconciler errors

export class ReactFiberHandler {
  private static instance: ReactFiberHandler;
  private isActive = false;
  private fiberErrors = new Map<string, { count: number, lastSeen: number }>();
  private maxFiberErrors = 3;
  private errorCooldown = 5000; // 5 seconds

  static getInstance(): ReactFiberHandler {
    if (!ReactFiberHandler.instance) {
      ReactFiberHandler.instance = new ReactFiberHandler();
    }
    return ReactFiberHandler.instance;
  }

  initialize() {
    if (this.isActive) return;

    // Set up comprehensive React Fiber error handling
    this.setupFiberErrorInterception();
    this.setupReactDevToolsErrorHandling();
    
    this.isActive = true;
    console.log('React Fiber handler initialized');
  }

  private setupFiberErrorInterception() {
    // Intercept all console methods to catch React Fiber errors
    this.interceptConsoleErrors();
    
    // Set up window error handlers for Fiber errors
    window.addEventListener('error', this.handleFiberError);
    window.addEventListener('unhandledrejection', this.handleFiberRejection);
  }

  private interceptConsoleErrors() {
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    
    console.error = (...args: any[]) => {
      if (this.isFiberError(args)) {
        this.processFiberError(args);
        return; // Don't log Fiber errors to console
      }
      originalConsoleError.apply(console, args);
    };

    console.warn = (...args: any[]) => {
      if (this.isFiberWarning(args)) {
        this.processFiberWarning(args);
        return; // Don't log Fiber warnings to console
      }
      originalConsoleWarn.apply(console, args);
    };
  }

  private isFiberError(args: any[]): boolean {
    const message = args[0];
    if (typeof message !== 'string') return false;

    const fiberErrorPatterns = [
      'performUnitOfWork',
      'completeUnitOfWork',
      'completeWork',
      'beginWork',
      'commitRoot',
      'workLoop',
      'workLoopSync',
      'workLoopConcurrent',
      'performWork',
      'performSyncWorkOnRoot',
      'performConcurrentWorkOnRoot',
      'renderRoot',
      'renderRootSync',
      'renderRootConcurrent',
      'commitMutation',
      'commitMutationEffects',
      'commitLayout',
      'commitLayoutEffects',
      'commitPassive',
      'commitPassiveEffects',
      'reconcileChildren',
      'reconcileChildFibers',
      'updateHostComponent',
      'updateFunctionComponent',
      'updateClassComponent',
      'mountIndeterminateComponent',
      'updateForwardRef',
      'updateMemoComponent',
      'updateSimpleMemoComponent',
      'updateContextProvider',
      'updateContextConsumer',
      'updateSuspenseComponent',
      'updateOffscreenComponent',
      'updateLazyComponent',
      'mountLazyComponent',
      'updatePortalComponent',
      'updateProfiler',
      'finishClassComponent',
      'mountClassInstance',
      'updateClassInstance',
      'resumeMountClassInstance',
      'constructClassInstance'
    ];

    return fiberErrorPatterns.some(pattern => 
      message.includes(pattern) || 
      (args.length > 1 && String(args[1]).includes(pattern))
    );
  }

  private isFiberWarning(args: any[]): boolean {
    const message = args[0];
    if (typeof message !== 'string') return false;

    const fiberWarningPatterns = [
      'Warning: React',
      'Warning: Each child in a list',
      'Warning: Failed prop type',
      'Warning: componentWillMount',
      'Warning: componentWillReceiveProps',
      'Warning: componentWillUpdate'
    ];

    return fiberWarningPatterns.some(pattern => message.includes(pattern));
  }

  private processFiberError(args: any[]) {
    const errorKey = this.getFiberErrorKey(args);
    const now = Date.now();
    const errorInfo = this.fiberErrors.get(errorKey);

    // Check if we're in cooldown period
    if (errorInfo && (now - errorInfo.lastSeen) < this.errorCooldown) {
      return; // Skip processing during cooldown
    }

    // Update error tracking
    const newCount = errorInfo ? errorInfo.count + 1 : 1;
    this.fiberErrors.set(errorKey, { count: newCount, lastSeen: now });

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.debug('React Fiber error (handled):', {
        message: args[0],
        count: newCount,
        timestamp: new Date().toISOString()
      });
    }

    // Report if under threshold
    if (newCount <= this.maxFiberErrors) {
      this.reportFiberError(args, newCount);
    }

    // Attempt recovery if needed
    if (newCount >= this.maxFiberErrors) {
      this.attemptFiberRecovery(errorKey);
    }
  }

  private processFiberWarning(args: any[]) {
    // Log warnings in a cleaner format for development
    if (process.env.NODE_ENV === 'development') {
      console.debug('React warning (handled):', args[0]);
    }
  }

  private getFiberErrorKey(args: any[]): string {
    const message = String(args[0]);
    const context = args.length > 1 ? String(args[1]).substring(0, 100) : '';
    return `${message}_${context}`;
  }

  private reportFiberError(args: any[], count: number) {
    const error = new Error(`React Fiber Error: ${args[0]}`);
    
    if (window.globalErrorHandler) {
      window.globalErrorHandler.reportError(error, {
        type: 'react_fiber_error',
        originalArgs: args,
        errorCount: count,
        source: 'ReactFiberHandler'
      });
    }
  }

  private attemptFiberRecovery(errorKey: string) {
    console.warn(`Attempting Fiber recovery for: ${errorKey}`);
    
    // Strategy 1: Force a global re-render
    this.triggerGlobalRecovery();
    
    // Strategy 2: Clear the error after recovery attempt
    setTimeout(() => {
      this.fiberErrors.delete(errorKey);
    }, this.errorCooldown);
  }

  private triggerGlobalRecovery() {
    // Dispatch recovery event
    const event = new CustomEvent('fiber-recovery', {
      detail: { 
        timestamp: Date.now(),
        type: 'fiber_error_recovery'
      }
    });
    window.dispatchEvent(event);
  }

  private handleFiberError = (event: ErrorEvent) => {
    const error = event.error;
    const message = event.message || '';
    
    if (this.isFiberErrorFromEvent(error, message)) {
      console.warn('Fiber error from event:', { error, message });
      event.preventDefault();
      
      this.processFiberError([message, error]);
    }
  };

  private handleFiberRejection = (event: PromiseRejectionEvent) => {
    const reason = event.reason;
    
    if (this.isFiberErrorFromRejection(reason)) {
      console.warn('Fiber error from rejection:', reason);
      event.preventDefault();
      
      this.processFiberError([String(reason), reason]);
    }
  };

  private isFiberErrorFromEvent(error: any, message: string): boolean {
    return this.isFiberError([message]) || 
           (error && error.stack && this.isFiberError([error.stack]));
  }

  private isFiberErrorFromRejection(reason: any): boolean {
    return this.isFiberError([String(reason)]) ||
           (reason && reason.stack && this.isFiberError([reason.stack]));
  }

  private setupReactDevToolsErrorHandling() {
    // Handle React DevTools related errors
    if (typeof window !== 'undefined' && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      const devTools = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
      const originalOnCommitFiberRoot = devTools.onCommitFiberRoot;
      
      devTools.onCommitFiberRoot = (id: any, root: any, ...args: any[]) => {
        try {
          if (originalOnCommitFiberRoot) {
            return originalOnCommitFiberRoot.call(devTools, id, root, ...args);
          }
        } catch (error) {
          console.warn('React DevTools error (handled):', error);
          this.processFiberError([`DevTools error: ${error}`]);
        }
      };
    }
  }

  // Get Fiber error statistics
  getFiberStats() {
    return {
      totalErrors: Array.from(this.fiberErrors.values()).reduce((sum, info) => sum + info.count, 0),
      uniqueErrors: this.fiberErrors.size,
      errors: Array.from(this.fiberErrors.entries()).map(([key, info]) => ({
        key,
        count: info.count,
        lastSeen: new Date(info.lastSeen).toISOString()
      }))
    };
  }

  // Reset Fiber error tracking
  reset() {
    this.fiberErrors.clear();
  }

  cleanup() {
    if (!this.isActive) return;
    
    window.removeEventListener('error', this.handleFiberError);
    window.removeEventListener('unhandledrejection', this.handleFiberRejection);
    
    this.isActive = false;
  }
}

// Global type for React DevTools
declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: {
      onCommitFiberRoot?: (id: any, root: any, ...args: any[]) => any;
      [key: string]: any;
    };
  }
}

export const reactFiberHandler = ReactFiberHandler.getInstance();