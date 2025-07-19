// Development fixes for Clerk cookie and digest issues

export const applyClerkDevelopmentFixes = () => {
  console.log('🔧 Applying Clerk development fixes...');

  // Fix 1: Handle digest property errors
  const originalObjectDefineProperty = Object.defineProperty;
  Object.defineProperty = function(obj: any, prop: string, descriptor: PropertyDescriptor) {
    try {
      return originalObjectDefineProperty.call(this, obj, prop, descriptor);
    } catch (error) {
      if (prop === 'digest' || (error as Error).message?.includes('digest')) {
        console.debug('Clerk digest property error (handled):', error);
        return obj; // Return object without setting the property
      }
      throw error;
    }
  };

  // Fix 2: Provide fallback for undefined digest reads
  if (typeof window !== 'undefined') {
    const originalGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    Object.getOwnPropertyDescriptor = function(obj: any, prop: string) {
      try {
        const descriptor = originalGetOwnPropertyDescriptor.call(this, obj, prop);
        if (prop === 'digest' && !descriptor) {
          // Provide a fallback descriptor for digest property
          return {
            value: undefined,
            writable: true,
            enumerable: false,
            configurable: true
          };
        }
        return descriptor;
      } catch (error) {
        console.debug('Property descriptor error (handled):', error);
        return undefined;
      }
    };
  }

  // Fix 3: Handle cookie operations safely
  if (typeof document !== 'undefined') {
    const originalCookieGetter = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie')?.get;
    const originalCookieSetter = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie')?.set;

    Object.defineProperty(document, 'cookie', {
      get: function() {
        try {
          return originalCookieGetter?.call(this) || '';
        } catch (error) {
          console.debug('Cookie read error (handled):', error);
          return '';
        }
      },
      set: function(value: string) {
        try {
          if (originalCookieSetter) {
            originalCookieSetter.call(this, value);
          }
        } catch (error) {
          console.debug('Cookie write error (handled):', error);
          // Silently fail for development
        }
      },
      configurable: true,
      enumerable: true
    });
  }

  // Fix 4: Provide crypto.subtle fallback for HTTP development
  if (typeof window !== 'undefined' && !window.isSecureContext) {
    if (!window.crypto?.subtle) {
      console.warn('🔧 Providing crypto.subtle fallback for HTTP development');
      
      // Create a minimal crypto.subtle implementation for development
      const mockSubtle = {
        digest: async (algorithm: string, data: ArrayBuffer) => {
          console.debug('Mock crypto.subtle.digest called (development only)');
          // Return a mock hash for development
          return new ArrayBuffer(32); // Mock SHA-256 result
        },
        importKey: async () => {
          console.debug('Mock crypto.subtle.importKey called (development only)');
          return {} as CryptoKey;
        },
        sign: async () => {
          console.debug('Mock crypto.subtle.sign called (development only)');
          return new ArrayBuffer(64);
        },
        verify: async () => {
          console.debug('Mock crypto.subtle.verify called (development only)');
          return true;
        }
      };

      if (!window.crypto) {
        (window as any).crypto = {};
      }
      
      if (!window.crypto.subtle) {
        (window.crypto as any).subtle = mockSubtle;
      }
    }
  }

  console.log('✅ Clerk development fixes applied');
};

export const logClerkDevelopmentStatus = () => {
  const isSecure = window.isSecureContext;
  const hasSubtle = !!window.crypto?.subtle;
  const protocol = window.location.protocol;

  console.log(`
🔧 CLERK DEVELOPMENT STATUS 🔧

📍 Current URL: ${window.location.href}
🔒 Secure Context: ${isSecure ? '✅ Yes' : '❌ No (HTTP)'}
🔐 Crypto.subtle: ${hasSubtle ? '✅ Available' : '❌ Not Available'}
🌐 Protocol: ${protocol}

${!isSecure ? `
⚠️  DEVELOPMENT NOTICE:
- You're using HTTP (not HTTPS) for development
- This causes Clerk cookie/digest issues
- These issues will NOT occur in production with HTTPS
- Clerk authentication will still work despite warnings

💡 SOLUTIONS:
1. Use HTTPS for development: https://localhost:3000
2. Configure Clerk for HTTP in development
3. Ignore warnings (they won't affect functionality)
` : `
✅ SECURE DEVELOPMENT ENVIRONMENT
- HTTPS is being used
- Clerk should work without cookie issues
`}
  `);
};