# Clerk Authentication Setup Guide

This guide will help you set up Clerk authentication for the NEXTFAANG platform.

## Development Mode

In development mode, the application will work without Clerk authentication. The app uses a fallback authentication flow that provides mock authentication UI elements.

### Working Without Clerk

If you don't have a Clerk account or don't want to set up Clerk for development:

1. Leave the `VITE_CLERK_PUBLISHABLE_KEY` commented out in your `.env.local` file
2. The app will automatically use the fallback authentication flow
3. You'll see mock Sign In/Sign Up buttons that don't perform actual authentication

### Setting Up Clerk for Development

If you want to use actual Clerk authentication in development:

1. Create a Clerk account at [https://clerk.com/](https://clerk.com/)
2. Create a new application in the Clerk dashboard
3. Go to API Keys in your Clerk dashboard
4. Copy the "Publishable Key" that starts with `pk_test_`
5. Add it to your `.env.local` file:

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
```

6. Restart your development server

## Production Mode

For production deployment, a valid Clerk publishable key is required:

1. Create a production instance in your Clerk dashboard
2. Copy the production "Publishable Key" that starts with `pk_live_`
3. Add it to your `.env.production` file:

```
VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_production_key_here
```

## Troubleshooting

### Invalid Key Error

If you see an error like:

```
@clerk/clerk-react: The publishableKey passed to Clerk is invalid.
```

This means:
- The key format is incorrect
- The key has been revoked
- You're using a development key in production or vice versa

### HTTP Development Issues

When developing with Clerk on HTTP (not HTTPS):
- You may see cookie and digest-related warnings
- These are handled by our development fixes
- The app will still function correctly
- These issues won't occur in production with HTTPS

### Authentication Bypass

In development mode, authentication is bypassed by default. To change this behavior:
1. Open `src/utils/devMode.ts`
2. Set `BYPASS_AUTH_IN_DEV` to `false`
3. Restart your development server

## Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk React SDK](https://clerk.com/docs/references/react/overview)
- [Clerk Authentication API](https://clerk.com/docs/references/backend/overview)