// Development mode configuration

// Set this to true to bypass Clerk authentication in development only
// This will NEVER bypass authentication in production
export const BYPASS_AUTH_IN_DEV = true;

// Helper function to check if we should bypass auth
export const shouldBypassAuth = () => {
  const isDev = import.meta.env.DEV;
  const isProd = import.meta.env.PROD;
  
  // Never bypass auth in production, regardless of BYPASS_AUTH_IN_DEV setting
  if (isProd) return false;
  
  // Only bypass in development if the flag is set
  return isDev && BYPASS_AUTH_IN_DEV;
};