// Test file for extension error handler

/**
 * This function simulates browser extension errors to test our handler
 */
export const testExtensionErrorHandler = () => {
  console.log('🧪 Testing extension error handler...');
  
  // Test 1: runtime.lastError message
  console.error('Unchecked runtime.lastError: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received');
  
  // Test 2: Error object with runtime.lastError message
  console.error(new Error('Unchecked runtime.lastError: Message channel closed'));
  
  // Test 3: Promise rejection with runtime.lastError
  Promise.reject(new Error('Unchecked runtime.lastError: Async response')).catch(err => {
    // This should be caught by our unhandledrejection handler
  });
  
  console.log('✅ Extension error tests complete - check if errors were suppressed');
};

// Only run in development mode
if (import.meta.env.DEV) {
  // Run tests after a short delay to ensure handler is initialized
  setTimeout(() => {
    testExtensionErrorHandler();
  }, 3000);
}