// Specific handler for chunk loading errors (common in Vite/Webpack apps)

export class ChunkErrorHandler {
  private static instance: ChunkErrorHandler;
  private retryCount = new Map<string, number>();
  private maxRetries = 3;

  static getInstance(): ChunkErrorHandler {
    if (!ChunkErrorHandler.instance) {
      ChunkErrorHandler.instance = new ChunkErrorHandler();
    }
    return ChunkErrorHandler.instance;
  }

  initialize() {
    // Handle dynamic import errors (chunk loading failures)
    window.addEventListener('error', this.handleChunkError);
    
    // Handle unhandled rejections that might be chunk-related
    window.addEventListener('unhandledrejection', this.handleChunkRejection);
  }

  private handleChunkError = (event: ErrorEvent) => {
    const error = event.error;
    const message = event.message || '';
    
    // Check if this is a chunk loading error
    if (this.isChunkError(error, message)) {
      console.warn('🔄 Chunk loading error detected, attempting recovery...');
      
      // Prevent the error from propagating
      event.preventDefault();
      
      // Attempt to recover
      this.attemptChunkRecovery(error);
    }
  };

  private handleChunkRejection = (event: PromiseRejectionEvent) => {
    const reason = event.reason;
    
    if (this.isChunkError(reason, String(reason))) {
      console.warn('🔄 Chunk promise rejection detected, attempting recovery...');
      
      // Prevent the error from propagating
      event.preventDefault();
      
      // Attempt to recover
      this.attemptChunkRecovery(reason);
    }
  };

  private isChunkError(error: any, message: string): boolean {
    const chunkErrorIndicators = [
      'Loading chunk',
      'chunk-',
      'ChunkLoadError',
      'Loading CSS chunk',
      'Failed to import',
      'dynamically imported module'
    ];

    return chunkErrorIndicators.some(indicator => 
      message.includes(indicator) || 
      (error && error.message && error.message.includes(indicator))
    );
  }

  private attemptChunkRecovery(error: any) {
    const errorKey = this.getErrorKey(error);
    const currentRetries = this.retryCount.get(errorKey) || 0;
    
    if (currentRetries < this.maxRetries) {
      this.retryCount.set(errorKey, currentRetries + 1);
      
      // Strategy 1: Reload the page after a short delay
      setTimeout(() => {
        console.log(`🔄 Attempting chunk recovery (attempt ${currentRetries + 1}/${this.maxRetries})`);
        window.location.reload();
      }, 1000 * (currentRetries + 1)); // Exponential backoff
      
    } else {
      // Max retries reached, show user-friendly error
      this.showChunkErrorMessage();
    }
  }

  private getErrorKey(error: any): string {
    if (error && error.message) {
      return error.message;
    }
    return String(error);
  }

  private showChunkErrorMessage() {
    // Create a user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border: 2px solid #ef4444;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        text-align: center;
        font-family: system-ui, -apple-system, sans-serif;
      ">
        <h3 style="margin: 0 0 10px 0; color: #ef4444;">Application Update Required</h3>
        <p style="margin: 0 0 15px 0; color: #666;">
          The application has been updated. Please refresh the page to load the latest version.
        </p>
        <button onclick="window.location.reload()" style="
          background: #ef4444;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        ">
          Refresh Page
        </button>
      </div>
    `;
    
    document.body.appendChild(errorDiv);
  }

  cleanup() {
    window.removeEventListener('error', this.handleChunkError);
    window.removeEventListener('unhandledrejection', this.handleChunkRejection);
    this.retryCount.clear();
  }
}

export const chunkErrorHandler = ChunkErrorHandler.getInstance();