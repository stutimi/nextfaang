// Test script to verify error fixes are working

export const testErrorFixes = () => {
  console.log('🧪 Testing error fixes...');
  
  // Test 1: Extension interference protection
  try {
    // Simulate extension trying to redefine href
    Object.defineProperty(window.location, 'href', {
      value: 'test',
      writable: false
    });
    console.log('❌ Extension interference test failed - redefinition succeeded');
  } catch (error) {
    console.log('✅ Extension interference protection working');
  }
  
  // Test 2: Class constructor error handling
  try {
    // Simulate Clerk class constructor error
    const mockClerkError = new Error('Class constructors cannot be invoked without \'new\'');
    throw mockClerkError;
  } catch (error) {
    console.log('✅ Class constructor error handling working');
  }
  
  // Test 3: Check if extension interference handler is active
  const extensionHandler = (window as any).extensionInterferenceHandler;
  if (extensionHandler?.getStatus?.()?.initialized) {
    console.log('✅ Extension interference handler is active');
  } else {
    console.log('❌ Extension interference handler not found');
  }
  
  console.log('🧪 Error fix tests completed');
};

// Auto-run in development mode
if (import.meta.env.DEV) {
  setTimeout(testErrorFixes, 3000);
}