import React from 'react';
import { SafeSignedIn, SafeSignedOut, SafeSignInButton, SafeSignUpButton, SafeUserButton, ClerkUserProvider } from '@/components/ClerkWrapper';

export const ClerkTest = () => {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Clerk Authentication Test</h2>
      
      <div className="space-y-4">
        <div className="p-2 border rounded bg-gray-50">
          <h3 className="font-medium mb-2">Authentication Status:</h3>
          <SafeSignedIn>
            <div className="text-green-600 font-medium">✅ Signed In</div>
          </SafeSignedIn>
          <SafeSignedOut>
            <div className="text-red-600 font-medium">❌ Signed Out</div>
          </SafeSignedOut>
        </div>
        
        <div className="p-2 border rounded bg-gray-50">
          <h3 className="font-medium mb-2">Authentication Actions:</h3>
          <div className="flex gap-2">
            <SafeSignInButton>
              Sign In
            </SafeSignInButton>
            <SafeSignUpButton>
              Sign Up
            </SafeSignUpButton>
          </div>
        </div>
        
        <div className="p-2 border rounded bg-gray-50">
          <h3 className="font-medium mb-2">User Profile:</h3>
          <div className="flex items-center gap-2">
            <SafeUserButton />
            <ClerkUserProvider>
              {({ user, isLoaded, isSignedIn }) => (
                <div>
                  {isLoaded ? (
                    isSignedIn ? (
                      <span>Welcome, {user?.firstName || 'User'}!</span>
                    ) : (
                      <span>Not signed in</span>
                    )
                  ) : (
                    <span>Loading...</span>
                  )}
                </div>
              )}
            </ClerkUserProvider>
          </div>
        </div>
        
        <div className="p-2 border rounded bg-gray-50">
          <h3 className="font-medium mb-2">Debug Information:</h3>
          <div className="text-sm text-gray-600">
            <div>VITE_CLERK_PUBLISHABLE_KEY: {import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ? '✅ Set' : '❌ Not Set'}</div>
            <div>Development Mode: {import.meta.env.DEV ? '✅ Yes' : '❌ No'}</div>
            <div>Production Mode: {import.meta.env.PROD ? '✅ Yes' : '❌ No'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClerkTest;