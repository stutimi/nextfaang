// Master error handler that coordinates all error handling systems

import { globalErrorHandler } from './globalErrorHandler';
import { reactErrorSuppressor } from './reactErrorSuppressor';
import { chunkErrorHandler } from './chunkErrorHandler';
import { instanceCreationHandler } from './instanceCreationHandler';
import { clerkInstanceSafetyWrapper } from './clerkInstanceSafetyWrapper';
import { reactReconcilerHandler } from './reactReconcilerHandler';
import { reactFiberHandler } from './reactFiberHandler';
import { reactWorkLoopHandler } from './reactWorkLoopHandler';

export class MasterErrorHandler {
  private static instance: MasterErrorHandler;
  private isInitialized = false;
  private errorHandlers: Array<{ name: string; handler: any; initialized: boolean }> = [];

  static getInstance(): MasterErrorHandler {
    if (!MasterErrorHandler.instance) {
      MasterErrorHandler.instance = new MasterErrorHandler();
    }
    return MasterErrorHandler.instance;
  }

  constructor() {
    // Register all error handlers
    this.errorHandlers = [
      { name: 'GlobalErrorHandler', handler: globalErrorHandler, initialized: false },
      { name: 'ReactErrorSuppressor', handler: reactErrorSuppressor, initialized: false },
      { name: 'ChunkErrorHandler', handler: chunkErrorHandler, initialized: false },
      { name: 'InstanceCreationHandler', handler: instanceCreationHandler, initialized: false },
      { name: 'ReactReconcilerHandler', handler: reactReconcilerHandler, initialized: false },
      { name: 'ReactFiberHandler', handler: reactFiberHandler, initialized: false },
      { name: 'ReactWorkLoopHandler', handler: reactWorkLoopHandler, initialized: false }
    ];
  }

  initialize() {
    if (this.isInitialized) {
      console.warn('MasterErrorHandler already initialized');
      return;
    }

    console.log('🛡️ Initializing Master Error Handler...');

    // Initialize all error handlers in the correct order
    this.errorHandlers.forEach(({ name, handler }) => {
      try {
        if (handler && typeof handler.initialize === 'function') {
          handler.initialize();
          this.markHandlerAsInitialized(name);
          console.log(`✅ ${name} initialized successfully`);
        } else if (handler && typeof handler.activate === 'function') {
          handler.activate();
          this.markHandlerAsInitialized(name);
          console.log(`✅ ${name} activated successfully`);
        } else {
          console.warn(`⚠️ ${name} does not have initialize() or activate() method`);
        }
      } catch (error) {
        console.error(`❌ Failed to initialize ${name}:`, error);
      }
    });

    // Set up master error coordination
    this.setupMasterErrorCoordination();

    this.isInitialized = true;
    console.log('🎯 Master Error Handler initialization complete!');
    this.logInitializationStatus();
  }

  private markHandlerAsInitialized(name: string) {
    const handler = this.errorHandlers.find(h => h.name === name);
    if (handler) {
      handler.initialized = true;
    }
  }

  private setupMasterErrorCoordination() {
    // Set up cross-system error coordination
    window.addEventListener('error', this.handleMasterError);
    window.addEventListener('unhandledrejection', this.handleMasterRejection);

    // Make master error handler globally available
    (window as any).masterErrorHandler = this;
  }

  private handleMasterError = (event: ErrorEvent) => {
    // This is the final catch-all for any errors not handled by specific handlers
    console.log('🔍 Master error handler caught unhandled error:', event.error);
    
    // Log error details for debugging
    this.logErrorDetails(event.error, {
      type: 'unhandled_error',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      source: 'MasterErrorHandler'
    });
  };

  private handleMasterRejection = (event: PromiseRejectionEvent) => {
    // This is the final catch-all for any promise rejections not handled by specific handlers
    console.log('🔍 Master error handler caught unhandled promise rejection:', event.reason);
    
    // Log rejection details for debugging
    this.logErrorDetails(event.reason, {
      type: 'unhandled_promise_rejection',
      source: 'MasterErrorHandler'
    });
  };

  private logErrorDetails(error: any, context: any) {
    console.group('🚨 Master Error Handler - Error Details');
    console.log('Error:', error);
    console.log('Context:', context);
    console.log('Timestamp:', new Date().toISOString());
    console.log('Initialized Handlers:', this.getInitializedHandlers());
    console.groupEnd();
  }

  // Public methods for status checking
  getInitializationStatus() {
    return {
      isInitialized: this.isInitialized,
      handlers: this.errorHandlers.map(({ name, initialized }) => ({ name, initialized }))
    };
  }

  getInitializedHandlers() {
    return this.errorHandlers
      .filter(h => h.initialized)
      .map(h => h.name);
  }

  getFailedHandlers() {
    return this.errorHandlers
      .filter(h => !h.initialized)
      .map(h => h.name);
  }

  logInitializationStatus() {
    const status = this.getInitializationStatus();
    console.log(`
🛡️ MASTER ERROR HANDLER STATUS 🛡️

✅ Initialized: ${status.isInitialized}
✅ Active Handlers: ${this.getInitializedHandlers().join(', ')}
${this.getFailedHandlers().length > 0 ? `⚠️ Failed Handlers: ${this.getFailedHandlers().join(', ')}` : ''}

🎯 All React errors, chunk errors, and instance creation errors are now being handled!
    `);
  }

  // Method to reset all handlers (useful for testing)
  reset() {
    console.log('🔄 Resetting Master Error Handler...');
    
    this.errorHandlers.forEach(({ name, handler }) => {
      try {
        if (handler && typeof handler.cleanup === 'function') {
          handler.cleanup();
          console.log(`✅ ${name} cleaned up`);
        } else if (handler && typeof handler.deactivate === 'function') {
          handler.deactivate();
          console.log(`✅ ${name} deactivated`);
        } else if (handler && typeof handler.reset === 'function') {
          handler.reset();
          console.log(`✅ ${name} reset`);
        }
      } catch (error) {
        console.error(`❌ Failed to cleanup ${name}:`, error);
      }
    });

    // Remove master event listeners
    window.removeEventListener('error', this.handleMasterError);
    window.removeEventListener('unhandledrejection', this.handleMasterRejection);

    // Reset state
    this.isInitialized = false;
    this.errorHandlers.forEach(handler => handler.initialized = false);

    console.log('🎯 Master Error Handler reset complete!');
  }

  // Method to reinitialize if needed
  reinitialize() {
    this.reset();
    this.initialize();
  }
}

export const masterErrorHandler = MasterErrorHandler.getInstance();