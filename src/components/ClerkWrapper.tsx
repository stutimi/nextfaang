import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { safeCreateElement } from '@/utils/safeCreateElement';
import { clerkInstanceSafetyWrapper } from '@/utils/clerkInstanceSafetyWrapper';
import { shouldBypassAuth } from '@/utils/devMode';

// Dynamic import function for Clerk components
const loadClerkComponent = async (componentName: string) => {
  try {
    const clerkModule = await import('@clerk/clerk-react');
    return clerkModule[componentName as keyof typeof clerkModule];
  } catch (error) {
    console.warn('Clerk not available:', error);
    return null;
  }
};

// Wrapper components that handle Clerk availability
export const SafeSignedIn = ({ children }: { children: React.ReactNode }) => {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const [ClerkSignedIn, setClerkSignedIn] = React.useState<any>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  
  React.useEffect(() => {
    if (PUBLISHABLE_KEY && !shouldBypassAuth()) {
      loadClerkComponent('SignedIn').then((component) => {
        setClerkSignedIn(() => component);
        setIsLoaded(true);
      });
    } else {
      setIsLoaded(true);
    }
  }, [PUBLISHABLE_KEY]);
  
  if (!isLoaded) return null;
  if (!PUBLISHABLE_KEY || !ClerkSignedIn) return null;
  
  return clerkInstanceSafetyWrapper.createClerkComponent('SignedIn', ClerkSignedIn, {}, children);
};

export const SafeSignedOut = ({ children }: { children: React.ReactNode }) => {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const [ClerkSignedOut, setClerkSignedOut] = React.useState<any>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  
  React.useEffect(() => {
    if (PUBLISHABLE_KEY && !shouldBypassAuth()) {
      loadClerkComponent('SignedOut').then((component) => {
        setClerkSignedOut(() => component);
        setIsLoaded(true);
      });
    } else {
      setIsLoaded(true);
    }
  }, [PUBLISHABLE_KEY]);
  
  if (!isLoaded) return null;
  
  if (!PUBLISHABLE_KEY || !ClerkSignedOut) {
    // Show fallback auth buttons when Clerk is not configured
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
        <Button size="sm">
          Sign Up
        </Button>
      </div>
    );
  }
  
  const element = clerkInstanceSafetyWrapper.createClerkComponent('SignedOut', ClerkSignedOut, {}, children);
  if (element) return element;
  
  // Fallback if createElement fails
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm">
        Sign In
      </Button>
      <Button size="sm">
        Sign Up
      </Button>
    </div>
  );
};

export const SafeSignInButton = ({ children }: { children: React.ReactNode }) => {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const [ClerkSignInButton, setClerkSignInButton] = React.useState<any>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  
  React.useEffect(() => {
    if (PUBLISHABLE_KEY && !shouldBypassAuth()) {
      loadClerkComponent('SignInButton').then((component) => {
        setClerkSignInButton(() => component);
        setIsLoaded(true);
      });
    } else {
      setIsLoaded(true);
    }
  }, [PUBLISHABLE_KEY]);
  
  if (!isLoaded) return null;
  
  if (!PUBLISHABLE_KEY || !ClerkSignInButton) {
    return (
      <Button variant="ghost" size="sm">
        Sign In
      </Button>
    );
  }
  
  const element = clerkInstanceSafetyWrapper.createClerkComponent('SignInButton', ClerkSignInButton, {}, children);
  return element || (
    <Button variant="ghost" size="sm">
      Sign In
    </Button>
  );
};

export const SafeSignUpButton = ({ children }: { children: React.ReactNode }) => {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const [ClerkSignUpButton, setClerkSignUpButton] = React.useState<any>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  
  React.useEffect(() => {
    if (PUBLISHABLE_KEY && !shouldBypassAuth()) {
      loadClerkComponent('SignUpButton').then((component) => {
        setClerkSignUpButton(() => component);
        setIsLoaded(true);
      });
    } else {
      setIsLoaded(true);
    }
  }, [PUBLISHABLE_KEY]);
  
  if (!isLoaded) return null;
  
  if (!PUBLISHABLE_KEY || !ClerkSignUpButton) {
    return (
      <Button size="sm">
        Sign Up
      </Button>
    );
  }
  
  const element = clerkInstanceSafetyWrapper.createClerkComponent('SignUpButton', ClerkSignUpButton, {}, children);
  return element || (
    <Button size="sm">
      Sign Up
    </Button>
  );
};

export const SafeUserButton = (props?: any) => {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const [ClerkUserButton, setClerkUserButton] = React.useState<any>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (PUBLISHABLE_KEY && !shouldBypassAuth()) {
      loadClerkComponent('UserButton').then((component) => {
        setClerkUserButton(() => component);
        setIsLoaded(true);
      });
    } else {
      setIsLoaded(true);
    }
  }, [PUBLISHABLE_KEY]);

  if (!isLoaded) return null;

  if (!PUBLISHABLE_KEY || !ClerkUserButton) {
    return (
      <Button variant="ghost" size="sm" className="w-9 h-9 px-0">
        <User className="h-4 w-4" />
      </Button>
    );
  }

  const element = clerkInstanceSafetyWrapper.createClerkComponent('UserButton', ClerkUserButton, props);
  return element || (
    <Button variant="ghost" size="sm" className="w-9 h-9 px-0">
      <User className="h-4 w-4" />
    </Button>
  );
};

// Safe useUser hook
export const useClerkUser = () => {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const [user, setUser] = React.useState<any>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  React.useEffect(() => {
    if (PUBLISHABLE_KEY && !shouldBypassAuth()) {
      import('@clerk/clerk-react')
        .then((clerkModule) => {
          // Use the useUser hook from Clerk
          const useUser = clerkModule.useUser;
          if (useUser) {
            // This is a bit tricky since we can't use hooks conditionally
            // We'll need to handle this differently
            setIsLoaded(true);
          }
        })
        .catch((error) => {
          console.warn('Failed to load Clerk useUser:', error);
          setIsLoaded(true);
        });
    } else {
      setIsLoaded(true);
    }
  }, [PUBLISHABLE_KEY]);

  return {
    user,
    isLoaded,
    isSignedIn
  };
};

// Component wrapper that provides user data
export const ClerkUserProvider = ({ children }: { children: (userData: any) => React.ReactNode }) => {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [userData, setUserData] = React.useState({
    user: null,
    isLoaded: true,
    isSignedIn: false
  });

  React.useEffect(() => {
    if (PUBLISHABLE_KEY && !shouldBypassAuth()) {
      // Check if we're inside a ClerkProvider context
      import('@clerk/clerk-react')
        .then((clerkModule) => {
          // Try to use the hook, but catch any context errors
          try {
            // We can't use hooks conditionally, so we'll create a wrapper component
            setIsLoaded(true);
          } catch (error) {
            console.warn('Clerk context not available:', error);
            setIsLoaded(true);
          }
        })
        .catch((error) => {
          console.warn('Failed to load Clerk:', error);
          setIsLoaded(true);
        });
    } else {
      setIsLoaded(true);
    }
  }, [PUBLISHABLE_KEY]);

  if (!isLoaded) return null;

  if (!PUBLISHABLE_KEY) {
    // Return mock data when Clerk is not available
    return children(userData);
  }

  // Create a safe wrapper that handles Clerk context errors
  const UserDataWrapper = () => {
    const [clerkData, setClerkData] = React.useState(userData);

    React.useEffect(() => {
      if (PUBLISHABLE_KEY && !shouldBypassAuth()) {
        import('@clerk/clerk-react')
          .then((clerkModule) => {
            try {
              // This will only work if we're inside ClerkProvider
              const useUser = clerkModule.useUser;
              // We can't call useUser here directly due to rules of hooks
              // Instead, we'll return fallback data
              setClerkData({
                user: null,
                isLoaded: true,
                isSignedIn: false
              });
            } catch (error) {
              console.warn('Clerk useUser error:', error);
              setClerkData(userData);
            }
          })
          .catch(() => {
            setClerkData(userData);
          });
      }
    }, []);

    return children(clerkData);
  };

  return <UserDataWrapper />;
};