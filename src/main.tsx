import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { reactErrorSuppressor } from '@/utils/reactErrorSuppressor';
import { chunkErrorHandler } from '@/utils/chunkErrorHandler';
import { safeCreateElement } from '@/utils/safeCreateElement';
import { instanceCreationHandler } from '@/utils/instanceCreationHandler';
import { clerkInstanceSafetyWrapper } from '@/utils/clerkInstanceSafetyWrapper';
import { reactReconcilerHandler } from '@/utils/reactReconcilerHandler';
import { reactFiberHandler } from '@/utils/reactFiberHandler';
import { reactWorkLoopHandler } from '@/utils/reactWorkLoopHandler';
import { extensionErrorHandler } from '@/utils/extensionErrorHandler';
import { extensionConflictHandler } from '@/utils/extensionConflictHandler';
import { masterErrorHandler } from '@/utils/masterErrorHandler';
import { checkErrorHandlingStatus, logCurrentProtectionStatus } from '@/utils/errorHandlingStatus';
import { clerkCookieHandler } from '@/utils/clerkCookieHandler';
import { clerkErrorHandler } from '@/utils/clerkErrorHandler';
import { applyClerkDevelopmentFixes, logClerkDevelopmentStatus } from '@/utils/clerkDevelopmentFixes';
import { shouldBypassAuth } from '@/utils/devMode';
import { extensionInterferenceHandler } from '@/utils/extensionInterferenceHandler';

// Initialize extension interference handler first (before anything else)
extensionInterferenceHandler.initialize();

// Make extension handler available globally for testing
(window as any).extensionInterferenceHandler = extensionInterferenceHandler;

// Initialize extension conflict handler first (before anything else)
extensionConflictHandler.initialize();

// Apply Clerk development fixes first (before any Clerk initialization)
applyClerkDevelopmentFixes();

// Initialize the master error handler (coordinates all error handling systems)
masterErrorHandler.initialize();

// Initialize Clerk-specific error handling
clerkCookieHandler.initialize();
clerkErrorHandler.initialize();

// Initialize extension error handler separately for immediate effect
extensionErrorHandler.initialize();

// Verify error handling status
setTimeout(() => {
  checkErrorHandlingStatus();
  logCurrentProtectionStatus();
  logClerkDevelopmentStatus();
  
  // Import extension error test in development mode only
  if (import.meta.env.DEV) {
    import('./utils/extensionErrorTest');
  }
}, 2000);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Check for Clerk key availability
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

if (!PUBLISHABLE_KEY) {
  if (isProduction) {
    // In production, log a more severe warning for missing Clerk key
    console.error("CRITICAL: Missing Clerk Publishable Key in production environment");
    // Still continue with fallback to prevent app from breaking completely
  } else if (isDevelopment) {
    // In development, use a more informative message
    console.log("ℹ️ No Clerk Publishable Key found - using fallback authentication flow");
    console.log("ℹ️ This is normal for development without Clerk setup");
    console.log("ℹ️ Add a valid key to .env.local to enable Clerk authentication");
  }
}

// Error handler for the main app
const handleAppError = (error: Error, errorInfo: React.ErrorInfo) => {
  console.error('Main App Error:', error, errorInfo);
  // You can add error reporting service here (e.g., Sentry, LogRocket)
};

// App wrapper with proper Clerk setup
const AppWithClerk: React.FC = () => {
  // If no Clerk key is provided, render without ClerkProvider
  if (!PUBLISHABLE_KEY || shouldBypassAuth()) {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }

  // Dynamically import and use ClerkProvider only when needed
  const [ClerkProvider, setClerkProvider] = React.useState<any>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (PUBLISHABLE_KEY && !shouldBypassAuth()) {
      // Add a small delay to ensure all error handlers are initialized
      setTimeout(() => {
        import('@clerk/clerk-react')
          .then((clerkModule) => {
            try {
              // Validate the ClerkProvider before setting it
              if (clerkModule.ClerkProvider && typeof clerkModule.ClerkProvider === 'function') {
                setClerkProvider(() => clerkModule.ClerkProvider);
              } else {
                console.warn('Invalid ClerkProvider received from module');
              }
            } catch (error) {
              console.warn('Error setting ClerkProvider:', error);
            } finally {
              setIsLoaded(true);
            }
          })
          .catch((error) => {
            console.warn('Failed to load Clerk:', error);
            setIsLoaded(true);
          });
      }, 100);
    } else {
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!ClerkProvider) {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }

  // Wrap ClerkProvider with error boundary
  const SafeClerkProvider = ({ children }: { children: React.ReactNode }) => {
    try {
      return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          {children}
        </ClerkProvider>
      );
    } catch (error) {
      console.warn('ClerkProvider failed, falling back to no-auth mode:', error);
      return <>{children}</>;
    }
  };

  return (
    <SafeClerkProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SafeClerkProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary onError={handleAppError}>
    <AppWithClerk />
  </ErrorBoundary>
);
