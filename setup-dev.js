// Development setup script
const fs = require('fs');
const path = require('path');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('Creating .env.local file...');
  
  const envContent = `# Clerk Authentication (Required for production)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_Y3JlYXRpdmUtcmhpbm8tNzAuY2xlcmsuYWNjb3VudHMuZGV2JA

# Supabase Configuration (Required)
VITE_SUPABASE_URL=https://your-supabase-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Optional AI Features
# VITE_OPENAI_API_KEY=your_openai_api_key
# VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key

# Optional Analytics
# VITE_GOOGLE_ANALYTICS_ID=your_ga_id`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local file');
} else {
  console.log('✅ .env.local file already exists');
}

// Check if devMode.ts exists
const devModePath = path.join(__dirname, 'src', 'utils', 'devMode.ts');
if (!fs.existsSync(devModePath)) {
  console.log('Creating devMode.ts file...');
  
  const devModeContent = `// Development mode configuration

// Set this to true to bypass Clerk authentication in development
export const BYPASS_AUTH_IN_DEV = true;

// Helper function to check if we should bypass auth
export const shouldBypassAuth = () => {
  const isDev = import.meta.env.DEV;
  return isDev && BYPASS_AUTH_IN_DEV;
};`;

  // Create directory if it doesn't exist
  const devModeDir = path.dirname(devModePath);
  if (!fs.existsSync(devModeDir)) {
    fs.mkdirSync(devModeDir, { recursive: true });
  }

  fs.writeFileSync(devModePath, devModeContent);
  console.log('✅ Created devMode.ts file');
} else {
  console.log('✅ devMode.ts file already exists');
}

console.log('\n🚀 Development setup complete!');
console.log('\nYou can now run:');
console.log('  npm install');
console.log('  npm run dev');
console.log('\nFor more information, see SETUP.md');