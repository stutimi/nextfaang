// Safety wrapper specifically for Clerk instance creation issues

export class ClerkInstanceSafetyWrapper {
  private static instance: ClerkInstanceSafetyWrapper;
  private clerkInstances = new Map<string, any>();
  private failedAttempts = new Map<string, number>();
  private maxRetries = 3;

  static getInstance(): ClerkInstanceSafetyWrapper {
    if (!ClerkInstanceSafetyWrapper.instance) {
      ClerkInstanceSafetyWrapper.instance = new ClerkInstanceSafetyWrapper();
    }
    return ClerkInstanceSafetyWrapper.instance;
  }

  // Safe wrapper for Clerk component creation
  createClerkComponent(componentName: string, component: any, props?: any, children?: any) {
    const instanceKey = `${componentName}_${JSON.stringify(props)}`;
    
    try {
      // Check if we have a cached instance
      if (this.clerkInstances.has(instanceKey)) {
        const cachedInstance = this.clerkInstances.get(instanceKey);
        if (cachedInstance) {
          return cachedInstance;
        }
      }

      // Check retry count
      const attempts = this.failedAttempts.get(instanceKey) || 0;
      if (attempts >= this.maxRetries) {
        console.warn(`Max retries reached for ${componentName}, returning null`);
        return null;
      }

      // Validate component before creation
      if (!this.isValidClerkComponent(component)) {
        console.warn(`Invalid Clerk component: ${componentName}`);
        return null;
      }

      // Create the component safely
      const instance = this.safeCreateClerkInstance(component, props, children);
      
      if (instance) {
        // Cache successful instance
        this.clerkInstances.set(instanceKey, instance);
        // Reset failed attempts
        this.failedAttempts.delete(instanceKey);
        return instance;
      } else {
        throw new Error(`Failed to create ${componentName} instance`);
      }

    } catch (error) {
      console.error(`Clerk component creation failed for ${componentName}:`, error);
      
      // Increment failed attempts
      this.failedAttempts.set(instanceKey, attempts + 1);
      
      // Report error
      if (window.globalErrorHandler) {
        window.globalErrorHandler.reportError(error as Error, {
          type: 'clerk_instance_creation_error',
          componentName,
          props,
          attempts: attempts + 1,
          source: 'ClerkInstanceSafetyWrapper'
        });
      }
      
      return null;
    }
  }

  private isValidClerkComponent(component: any): boolean {
    return (
      component &&
      (typeof component === 'function' || 
       (typeof component === 'object' && component.$$typeof))
    );
  }

  private safeCreateClerkInstance(component: any, props?: any, children?: any) {
    try {
      // Use React.createElement with additional safety
      if (children !== undefined) {
        return React.createElement(component, props, children);
      } else {
        return React.createElement(component, props);
      }
    } catch (error) {
      console.error('React.createElement failed for Clerk component:', error);
      throw error;
    }
  }

  // Method to clear cache and reset state
  reset() {
    this.clerkInstances.clear();
    this.failedAttempts.clear();
  }

  // Method to get cached instances (for debugging)
  getCachedInstances() {
    return Array.from(this.clerkInstances.keys());
  }

  // Method to get failed attempts (for debugging)
  getFailedAttempts() {
    return Array.from(this.failedAttempts.entries());
  }
}

import React from 'react';

export const clerkInstanceSafetyWrapper = ClerkInstanceSafetyWrapper.getInstance();