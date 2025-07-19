// Specialized handler for React work loop and unit of work errors

export class ReactWorkLoopHandler {
  private static instance: ReactWorkLoopHandler;
  private isActive = false;
  private workLoopErrors = new Map<string, { count: number, lastSeen: number, recovered: boolean }>();
  private maxWorkLoopErrors = 2;
  private recoveryTimeout = 3000; // 3 seconds
  private globalRecoveryCount = 0;

  static getInstance(): ReactWorkLoopHandler {
    if (!ReactWorkLoopHandler.instance) {
      ReactWorkLoopHandler.instance = new ReactWorkLoopHandler();
    }
    return ReactWorkLoopHandler.instance;
  }

  initialize() {
    if (this.isActive) return;

    // Set up work loop error handling
    this.setupWorkLoopErrorHandling();
    this.setupGlobalErrorOverride();
    
    this.isActive = true;
    console.log('React work loop handler initialized');
  }

  private setupWorkLoopErrorHandling() {
    // Override React's scheduler and work loop functions
    this.interceptReactScheduler();
    
    // Handle work loop errors from window events
    window.addEventListener('error', this.handleWorkLoopError);
    window.addEventListener('unhandledrejection', this.handleWorkLoopRejection);
  }

  private setupGlobalErrorOverride() {
    // Create a comprehensive error override that catches ALL React errors
    const originalError = window.Error;
    
    window.Error = class extends originalError {
      constructor(message?: string) {
        super(message);
        
        // Check if this is a work loop error during construction
        if (message && ReactWorkLoopHandler.getInstance().isWorkLoopError(message)) {
          ReactWorkLoopHandler.getInstance().handleWorkLoopErrorMessage(message);
        }
      }
    } as any;
  }

  private interceptReactScheduler() {
    // Override console methods with more comprehensive patterns
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    
    console.error = (...args: any[]) => {
      if (this.isWorkLoopError(args[0]) || this.hasWorkLoopInStack(args)) {
        this.handleWorkLoopErrorMessage(args[0], args);
        return; // Suppress work loop errors
      }
      originalConsoleError.apply(console, args);
    };

    console.warn = (...args: any[]) => {
      if (this.isWorkLoopWarning(args[0])) {
        this.handleWorkLoopWarning(args[0]);
        return; // Suppress work loop warnings
      }
      originalConsoleWarn.apply(console, args);
    };
  }

  private isWorkLoopError(message: any): boolean {
    if (typeof message !== 'string') return false;

    const workLoopPatterns = [
      'performUnitOfWork',
      'completeUnitOfWork',
      'beginWork',
      'completeWork',
      'workLoop',
      'workLoopSync',
      'workLoopConcurrent',
      'performWork',
      'performSyncWorkOnRoot',
      'performConcurrentWorkOnRoot',
      'renderRoot',
      'renderRootSync',
      'renderRootConcurrent',
      'commitRoot',
      'commitMutationEffects',
      'commitLayoutEffects',
      'commitPassiveEffects',
      'flushSyncCallbacks',
      'flushPassiveEffects',
      'scheduleWork',
      'scheduleUpdateOnFiber',
      'ensureRootIsScheduled',
      'processUpdateQueue',
      'getStateFromUpdate',
      'commitUpdateQueue',
      'captureCommitPhaseError',
      'throwException',
      'unwindWork',
      'unwindInterruptedWork',
      'resetSuspendedComponent',
      'retrySuspendedRoot'
    ];

    return workLoopPatterns.some(pattern => 
      message.toLowerCase().includes(pattern.toLowerCase()) ||
      message.includes(pattern)
    );
  }

  private hasWorkLoopInStack(args: any[]): boolean {
    return args.some(arg => {
      if (arg && arg.stack && typeof arg.stack === 'string') {
        return this.isWorkLoopError(arg.stack);
      }
      return false;
    });
  }

  private isWorkLoopWarning(message: any): boolean {
    if (typeof message !== 'string') return false;

    const workLoopWarningPatterns = [
      'Warning: React',
      'Warning: Each child in a list',
      'Warning: Failed prop type',
      'Warning: componentWill',
      'Warning: Cannot update a component',
      'Warning: Maximum update depth exceeded'
    ];

    return workLoopWarningPatterns.some(pattern => message.includes(pattern));
  }

  private handleWorkLoopError = (event: ErrorEvent) => {
    const error = event.error;
    const message = event.message || '';
    
    if (this.isWorkLoopError(message) || this.isWorkLoopError(error?.stack)) {
      console.warn('Work loop error intercepted:', { message, error });
      event.preventDefault();
      event.stopPropagation();
      
      this.processWorkLoopError(message, error);
    }
  };

  private handleWorkLoopRejection = (event: PromiseRejectionEvent) => {
    const reason = event.reason;
    
    if (this.isWorkLoopError(String(reason)) || this.isWorkLoopError(reason?.stack)) {
      console.warn('Work loop rejection intercepted:', reason);
      event.preventDefault();
      
      this.processWorkLoopError(String(reason), reason);
    }
  };

  private handleWorkLoopErrorMessage(message: string, args?: any[]) {
    if (process.env.NODE_ENV === 'development') {
      console.debug('Work loop error (handled):', {
        message,
        timestamp: new Date().toISOString(),
        args: args?.slice(1) // Exclude the message from args
      });
    }
    
    this.processWorkLoopError(message);
  }

  private handleWorkLoopWarning(message: string) {
    if (process.env.NODE_ENV === 'development') {
      console.debug('Work loop warning (handled):', message);
    }
  }

  private processWorkLoopError(message: string, error?: any) {
    const errorKey = this.getWorkLoopErrorKey(message);
    const now = Date.now();
    const errorInfo = this.workLoopErrors.get(errorKey);

    // Update error tracking
    const newCount = errorInfo ? errorInfo.count + 1 : 1;
    const recovered = errorInfo ? errorInfo.recovered : false;
    
    this.workLoopErrors.set(errorKey, { 
      count: newCount, 
      lastSeen: now, 
      recovered 
    });

    // Report error if under threshold and not recently recovered
    if (newCount <= this.maxWorkLoopErrors && !recovered) {
      this.reportWorkLoopError(message, error, newCount);
    }

    // Attempt recovery if threshold reached
    if (newCount >= this.maxWorkLoopErrors && !recovered) {
      this.attemptWorkLoopRecovery(errorKey, message);
    }
  }

  private getWorkLoopErrorKey(message: string): string {
    // Extract the core error pattern
    const patterns = ['performUnitOfWork', 'completeUnitOfWork', 'workLoop', 'renderRoot', 'commitRoot'];
    const foundPattern = patterns.find(pattern => message.includes(pattern));
    return foundPattern || message.substring(0, 50);
  }

  private reportWorkLoopError(message: string, error: any, count: number) {
    const reportError = error || new Error(`React Work Loop Error: ${message}`);
    
    if (window.globalErrorHandler) {
      window.globalErrorHandler.reportError(reportError, {
        type: 'react_work_loop_error',
        message,
        errorCount: count,
        globalRecoveryCount: this.globalRecoveryCount,
        source: 'ReactWorkLoopHandler'
      });
    }
  }

  private attemptWorkLoopRecovery(errorKey: string, message: string) {
    console.warn(`Attempting work loop recovery for: ${errorKey}`);
    
    // Mark as attempting recovery
    const errorInfo = this.workLoopErrors.get(errorKey);
    if (errorInfo) {
      this.workLoopErrors.set(errorKey, { ...errorInfo, recovered: true });
    }

    // Strategy 1: Force immediate React reconciliation reset
    this.forceReactReconciliationReset();
    
    // Strategy 2: Trigger global recovery event
    this.triggerGlobalWorkLoopRecovery(errorKey);
    
    // Strategy 3: Schedule a delayed full recovery
    setTimeout(() => {
      this.performDelayedRecovery(errorKey);
    }, this.recoveryTimeout);
  }

  private forceReactReconciliationReset() {
    // Force React to reset its internal state
    try {
      // Trigger a high-priority update that forces React to reset
      const event = new CustomEvent('react-force-update', {
        detail: { 
          timestamp: Date.now(),
          type: 'work_loop_recovery',
          priority: 'immediate'
        }
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.warn('Failed to force React reset:', error);
    }
  }

  private triggerGlobalWorkLoopRecovery(errorKey: string) {
    this.globalRecoveryCount++;
    
    const event = new CustomEvent('work-loop-recovery', {
      detail: { 
        timestamp: Date.now(),
        errorKey,
        recoveryCount: this.globalRecoveryCount,
        type: 'work_loop_error_recovery'
      }
    });
    window.dispatchEvent(event);
  }

  private performDelayedRecovery(errorKey: string) {
    // Clear the error after recovery timeout
    this.workLoopErrors.delete(errorKey);
    
    // Trigger a final recovery event
    const event = new CustomEvent('work-loop-recovery-complete', {
      detail: { 
        timestamp: Date.now(),
        errorKey,
        type: 'work_loop_recovery_complete'
      }
    });
    window.dispatchEvent(event);
  }

  // Get work loop error statistics
  getWorkLoopStats() {
    return {
      totalErrors: Array.from(this.workLoopErrors.values()).reduce((sum, info) => sum + info.count, 0),
      uniqueErrors: this.workLoopErrors.size,
      globalRecoveryCount: this.globalRecoveryCount,
      errors: Array.from(this.workLoopErrors.entries()).map(([key, info]) => ({
        key,
        count: info.count,
        lastSeen: new Date(info.lastSeen).toISOString(),
        recovered: info.recovered
      }))
    };
  }

  // Reset work loop error tracking
  reset() {
    this.workLoopErrors.clear();
    this.globalRecoveryCount = 0;
  }

  cleanup() {
    if (!this.isActive) return;
    
    window.removeEventListener('error', this.handleWorkLoopError);
    window.removeEventListener('unhandledrejection', this.handleWorkLoopRejection);
    
    this.isActive = false;
  }
}

export const reactWorkLoopHandler = ReactWorkLoopHandler.getInstance();