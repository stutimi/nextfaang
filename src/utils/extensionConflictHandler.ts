// Handler for browser extension conflicts and property redefinition errors
export class ExtensionConflictHandler {
  private static instance: ExtensionConflictHandler;
  private isInitialized = false;
  private conflictingExtensions = new Set<string>();

  static getInstance(): ExtensionConflictHandler {
    if (!ExtensionConflictHandler.instance) {
      ExtensionConflictHandler.instance = new ExtensionConflictHandler();
    }
    return ExtensionConflictHandler.instance;
  }

  initialize() {
    if (this.isInitialized) return;

    console.log('🛡️ Initializing Extension Conflict Handler...');

    // Protect critical properties from redefinition
    this.protectCriticalProperties();

    // Set up extension error monitoring
    this.setupExtensionErrorMonitoring();

    this.isInitialized = true;
    console.log('✅ Extension Conflict Handler initialized');
  }

  private protectCriticalProperties() {
    // Protect location.href from redefinition
    try {
      const originalHref = location.href;
      const hrefDescriptor = Object.getOwnPropertyDescriptor(location, 'href');
      
      if (!hrefDescriptor || hrefDescriptor.configurable) {
        // Only protect if it's not already protected
        Object.defineProperty(location, 'href', {
          get: () => originalHref,
          set: (value) => {
            try {
              window.location.href = value;
            } catch (e) {
              console.warn('Extension conflict: href assignment blocked');
            }
          },
          configurable: false,
          enumerable: true
        });
      }
    } catch (error) {
      // Property already protected or can't be protected
      console.log('🛡️ Location.href already protected or protection failed');
    }

    // Protect other critical properties
    this.protectProperty(window, 'fetch');
    this.protectProperty(window, 'XMLHttpRequest');
    this.protectProperty(document, 'createElement');
  }

  private protectProperty(obj: any, propName: string) {
    try {
      const descriptor = Object.getOwnPropertyDescriptor(obj, propName);
      if (descriptor && descriptor.configurable) {
        Object.defineProperty(obj, propName, {
          ...descriptor,
          configurable: false
        });
      }
    } catch (error) {
      // Property protection failed, which is expected for some properties
    }
  }

  private setupExtensionErrorMonitoring() {
    // Monitor for extension-related errors
    const originalConsoleError = console.error;
    
    console.error = (...args: any[]) => {
      const message = args.join(' ');
      
      if (this.isExtensionError(message)) {
        this.handleExtensionError(message);
        
        // Don't log certain extension errors to reduce noise
        if (!this.shouldSuppressError(message)) {
          originalConsoleError.apply(console, args);
        }
      } else {
        originalConsoleError.apply(console, args);
      }
    };

    // Monitor for property redefinition attempts
    window.addEventListener('error', (event) => {
      if (event.message.includes('Cannot redefine property')) {
        console.log('🛡️ Extension conflict detected and handled:', event.message);
        event.preventDefault();
      }
    });
  }

  private isExtensionError(message: string): boolean {
    const extensionIndicators = [
      'Cannot redefine property',
      'universal-blocker',
      'content-blocker',
      'feedback-manager',
      'extension',
      'chrome-extension',
      'moz-extension',
      'content script'
    ];

    return extensionIndicators.some(indicator => 
      message.toLowerCase().includes(indicator.toLowerCase())
    );
  }

  private shouldSuppressError(message: string): boolean {
    const suppressibleErrors = [
      'Cannot redefine property: href',
      'universal-blocker',
      'content-blocker',
      'feedback-manager',
      'startQueueProcessor is not a function',
      'Cannot read properties of undefined'
    ];

    return suppressibleErrors.some(error => 
      message.toLowerCase().includes(error.toLowerCase())
    );
  }

  private handleExtensionError(message: string) {
    // Extract extension name if possible
    const extensionMatch = message.match(/(universal-blocker|content-blocker|feedback-manager)/i);
    if (extensionMatch) {
      const extensionName = extensionMatch[1];
      this.conflictingExtensions.add(extensionName);
      
      console.log(`🛡️ Detected conflicting extension: ${extensionName}`);
    }
  }

  getConflictingExtensions(): string[] {
    return Array.from(this.conflictingExtensions);
  }

  getStatus() {
    return {
      isInitialized: this.isInitialized,
      conflictingExtensions: this.getConflictingExtensions(),
      conflictCount: this.conflictingExtensions.size
    };
  }

  reset() {
    this.conflictingExtensions.clear();
  }
}

export const extensionConflictHandler = ExtensionConflictHandler.getInstance();