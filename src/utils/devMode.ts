// Development mode configuration

// Set this to false to enable Clerk authentication in development
// This will NEVER bypass authentication in production
export const BYPASS_AUTH_IN_DEV = false;

// Helper function to check if we should bypass auth
export const shouldBypassAuth = () => {
  const isDev = import.meta.env.DEV;
  const isProd = import.meta.env.PROD;
  
  // Never bypass auth in production, regardless of BYPASS_AUTH_IN_DEV setting
  if (isProd) return false;
  
  // Always bypass auth in development if no valid key is provided
  const hasClerkKey = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  
  // Only bypass in development if the flag is set or no key is provided
  return isDev && (BYPASS_AUTH_IN_DEV || !hasClerkKey);
};