/**
 * Extension Error Test Utility
 * 
 * This file is used to test the extension error handling system in development mode.
 * It's dynamically imported in main.tsx only in development environments.
 */

import { extensionErrorHandler } from './extensionErrorHandler';

console.log('📋 Extension Error Test: Loaded successfully');

// Log the current status of the extension error handler
const status = extensionErrorHandler.getStatus();
console.log('📋 Extension Error Handler Status:', status);

// Export a test function that can be used to manually trigger extension errors
export const triggerTestError = () => {
  try {
    throw new Error('Test extension error');
  } catch (error) {
    extensionErrorHandler.handleError(error as Error);
    return { success: true, message: 'Test error triggered successfully' };
  }
};

// Export default for easy importing
export default {
  triggerTestError,
  status: extensionErrorHandler.getStatus()
};