// Development mode configuration

// Set this to true to bypass Clerk authentication in development
export const BYPASS_AUTH_IN_DEV = true;

// Helper function to check if we should bypass auth
export const shouldBypassAuth = () => {
  const isDev = import.meta.env.DEV;
  return isDev && BYPASS_AUTH_IN_DEV;
};