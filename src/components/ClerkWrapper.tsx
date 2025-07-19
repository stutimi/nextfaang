import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { safeCreateElement } from '@/utils/safeCreateElement';
import { clerkInstanceSafetyWrapper } from '@/utils/clerkInstanceSafetyWrapper';

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
    if (PUBLISHABLE_KEY) {
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
    if (PUBLISHABLE_KEY) {
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
    if (PUBLISHABLE_KEY) {
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
    if (PUBLISHABLE_KEY) {
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
    if (PUBLISHABLE_KEY) {
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