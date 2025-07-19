# NEXTFAANG Development Guide

## Quick Setup

Run the setup script to configure your development environment:

```bash
npm run setup
```

This will:
1. Create a `.env.local` file with placeholder values
2. Create a `devMode.ts` file to bypass authentication in development

## Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Development Mode

By default, the setup script configures the application to bypass Clerk authentication in development mode. This allows you to develop without needing to set up Clerk authentication.

If you want to test with actual authentication:

1. Get a Clerk publishable key from [Clerk](https://clerk.com/)
2. Add it to your `.env.local` file
3. Set `BYPASS_AUTH_IN_DEV = false` in `src/utils/devMode.ts`

## Troubleshooting

### Missing Clerk Publishable Key Error

If you see this error:
```
Error: Missing Clerk Publishable Key
```

Solutions:
1. Make sure you've created a `.env.local` file with the correct Clerk publishable key
2. For development, you can bypass authentication by setting `BYPASS_AUTH_IN_DEV = true` in `src/utils/devMode.ts`
3. Restart the development server after making changes

### Clerk Cookie/Digest Issues

These are common in development mode and won't affect production. The application includes fixes for these issues.

## For More Information

See [SETUP.md](SETUP.md) for detailed setup instructions.