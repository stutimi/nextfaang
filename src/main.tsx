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
import { masterErrorHandler } from '@/utils/masterErrorHandler';
import { checkErrorHandlingStatus, logCurrentProtectionStatus } from '@/utils/errorHandlingStatus';
import { clerkCookieHandler } from '@/utils/clerkCookieHandler';
import { applyClerkDevelopmentFixes, logClerkDevelopmentStatus } from '@/utils/clerkDevelopmentFixes';
import { shouldBypassAuth } from '@/utils/devMode';

// Apply Clerk development fixes first (before any Clerk initialization)
applyClerkDevelopmentFixes();

// Initialize the master error handler (coordinates all error handling systems)
masterErrorHandler.initialize();

// Initialize Clerk-specific error handling
clerkCookieHandler.initialize();

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

// Conditional rendering based on Clerk availability
const AppWithClerk = () => {
  const [ClerkProvider, setClerkProvider] = React.useState<any>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  
  React.useEffect(() => {
    if (PUBLISHABLE_KEY && !shouldBypassAuth()) {
      console.log('🔑 Initializing Clerk with key:', PUBLISHABLE_KEY.substring(0, 8) + '...');
      import('@clerk/clerk-react')
        .then((clerkModule) => {
          if (clerkModule && clerkModule.ClerkProvider) {
            console.log('✅ Clerk module loaded successfully');
            setClerkProvider(() => clerkModule.ClerkProvider);
          } else {
            console.error('❌ Clerk module loaded but ClerkProvider is missing');
          }
          setIsLoaded(true);
        })
        .catch((error) => {
          console.error('❌ Failed to load Clerk:', error);
          setIsLoaded(true);
        });
    } else {
      // Skip Clerk in development mode when bypassing auth
      console.log(shouldBypassAuth() ? '🔧 Development mode: Bypassing Clerk authentication' : '⚠️ No Clerk key found');
      setIsLoaded(true);
    }
  }, []);
  
  if (!isLoaded) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div>Loading...</div>
      </div>
    );
  }
  
  if (PUBLISHABLE_KEY && ClerkProvider && !shouldBypassAuth()) {
    const clerkElement = clerkInstanceSafetyWrapper.createClerkComponent(
      'ClerkProvider',
      ClerkProvider,
      {
        publishableKey: PUBLISHABLE_KEY,
        afterSignOutUrl: "/",
        appearance: {
          baseTheme: undefined,
          variables: {
            colorPrimary: "hsl(var(--primary))",
          },
        },
      },
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    return clerkElement || (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }
  
  // Fallback without Clerk for development
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary onError={handleAppError}>
    <AppWithClerk />
  </ErrorBoundary>
);
