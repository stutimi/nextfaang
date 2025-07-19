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
import { masterErrorHandler } from '@/utils/masterErrorHandler';
import { checkErrorHandlingStatus, logCurrentProtectionStatus } from '@/utils/errorHandlingStatus';
import { clerkCookieHandler } from '@/utils/clerkCookieHandler';
import { applyClerkDevelopmentFixes, logClerkDevelopmentStatus } from '@/utils/clerkDevelopmentFixes';

// Apply Clerk development fixes first (before any Clerk initialization)
applyClerkDevelopmentFixes();

// Initialize the master error handler (coordinates all error handling systems)
masterErrorHandler.initialize();

// Initialize Clerk-specific error handling
clerkCookieHandler.initialize();

// Verify error handling status
setTimeout(() => {
  checkErrorHandlingStatus();
  logCurrentProtectionStatus();
  logClerkDevelopmentStatus();
}, 2000);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Fallback for development if Clerk key is missing
const isDevelopment = import.meta.env.DEV;
if (!PUBLISHABLE_KEY && !isDevelopment) {
  throw new Error("Missing Clerk Publishable Key");
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
    if (PUBLISHABLE_KEY) {
      import('@clerk/clerk-react')
        .then((clerkModule) => {
          setClerkProvider(() => clerkModule.ClerkProvider);
          setIsLoaded(true);
        })
        .catch((error) => {
          console.warn('Failed to load Clerk:', error);
          setIsLoaded(true);
        });
    } else {
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
  
  if (PUBLISHABLE_KEY && ClerkProvider) {
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
