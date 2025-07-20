import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AuthProvider } from '@/components/AuthProvider';
import { globalErrorHandler } from '@/utils/globalErrorHandler';
import { reactErrorSuppressor } from '@/utils/reactErrorSuppressor';
import { chunkErrorHandler } from '@/utils/chunkErrorHandler';
import { safeCreateElement } from '@/utils/safeCreateElement';
import { instanceCreationHandler } from '@/utils/instanceCreationHandler';
import { reactReconcilerHandler } from '@/utils/reactReconcilerHandler';
import { reactFiberHandler } from '@/utils/reactFiberHandler';
import { reactWorkLoopHandler } from '@/utils/reactWorkLoopHandler';
import { extensionErrorHandler } from '@/utils/extensionErrorHandler';
import { extensionConflictHandler } from '@/utils/extensionConflictHandler';
import { masterErrorHandler } from '@/utils/masterErrorHandler';
import { checkErrorHandlingStatus, logCurrentProtectionStatus } from '@/utils/errorHandlingStatus';
import { extensionInterferenceHandler } from '@/utils/extensionInterferenceHandler';

// Initialize extension interference handler first (before anything else)
extensionInterferenceHandler.initialize();

// Make extension handler available globally for testing
(window as any).extensionInterferenceHandler = extensionInterferenceHandler;

// Initialize extension conflict handler first (before anything else)
extensionConflictHandler.initialize();

// Initialize the master error handler (coordinates all error handling systems)
masterErrorHandler.initialize();

// Initialize React Fiber handler to suppress React Fragment errors
reactFiberHandler.initialize();

// Initialize extension error handler separately for immediate effect
extensionErrorHandler.initialize();

// Verify error handling status
setTimeout(() => {
  checkErrorHandlingStatus();
  logCurrentProtectionStatus();
  
  // Import extension error test in development mode only
  if (import.meta.env.DEV) {
    import('./utils/extensionErrorTest');
  }
}, 2000);

// Check for Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("CRITICAL: Missing Supabase configuration");
  console.error("Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file");
}

// Error handler for the main app
const handleAppError = (error: Error, errorInfo: React.ErrorInfo) => {
  console.error('Main App Error:', error, errorInfo);
  // You can add error reporting service here (e.g., Sentry, LogRocket)
};

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary onError={handleAppError}>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </ErrorBoundary>
);
