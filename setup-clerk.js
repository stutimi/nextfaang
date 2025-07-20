#!/usr/bin/env node

/**
 * Clerk Authentication Configuration Helper
 * 
 * This script helps configure Clerk authentication for the NEXTFAANG platform.
 * It checks for valid Clerk publishable keys in environment files and provides guidance.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

console.log(`${colors.bright}${colors.blue}
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   NEXTFAANG - Clerk Authentication Configuration Helper   ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
${colors.reset}`);

// Check if environment files exist
const envLocalPath = path.join(process.cwd(), '.env.local');
const envProdPath = path.join(process.cwd(), '.env.production');

const envLocalExists = fs.existsSync(envLocalPath);
const envProdExists = fs.existsSync(envProdPath);

// Read environment files if they exist
let envLocalContent = '';
let envProdContent = '';

if (envLocalExists) {
  envLocalContent = fs.readFileSync(envLocalPath, 'utf8');
}

if (envProdExists) {
  envProdContent = fs.readFileSync(envProdPath, 'utf8');
}

// Extract Clerk keys from environment files
const extractClerkKey = (content) => {
  const match = content.match(/VITE_CLERK_PUBLISHABLE_KEY=([^\s\n]+)/);
  return match ? match[1] : null;
};

const localClerkKey = extractClerkKey(envLocalContent);
const prodClerkKey = extractClerkKey(envProdContent);

// Check if keys are placeholders
const isPlaceholder = (key) => {
  return !key ||
    key === 'your_clerk_publishable_key_here' ||
    key === 'your_production_clerk_publishable_key' ||
    key.includes('your_') ||
    key.includes('placeholder');
};

const localKeyIsPlaceholder = isPlaceholder(localClerkKey);
const prodKeyIsPlaceholder = isPlaceholder(prodClerkKey);

// Display current status
console.log(`${colors.cyan}Current Clerk Configuration Status:${colors.reset}\n`);

console.log(`${colors.yellow}Development Environment (.env.local):${colors.reset}`);
if (!envLocalExists) {
  console.log(`  ${colors.red}✘ File not found${colors.reset}`);
} else if (!localClerkKey) {
  console.log(`  ${colors.yellow}⚠ Clerk key not configured${colors.reset}`);
} else if (localKeyIsPlaceholder) {
  console.log(`  ${colors.yellow}⚠ Using placeholder key${colors.reset}`);
} else {
  console.log(`  ${colors.green}✓ Valid key configured: ${localClerkKey.substring(0, 8)}...${colors.reset}`);
}

console.log(`\n${colors.yellow}Production Environment (.env.production):${colors.reset}`);
if (!envProdExists) {
  console.log(`  ${colors.red}✘ File not found${colors.reset}`);
} else if (!prodClerkKey) {
  console.log(`  ${colors.red}✘ Clerk key not configured${colors.reset}`);
} else if (prodKeyIsPlaceholder) {
  console.log(`  ${colors.red}✘ Using placeholder key: "${prodClerkKey}"${colors.reset}`);
} else {
  console.log(`  ${colors.green}✓ Valid key configured: ${prodClerkKey.substring(0, 8)}...${colors.reset}`);
}

// Provide guidance
console.log(`\n${colors.cyan}Configuration Guide:${colors.reset}\n`);

if (localKeyIsPlaceholder) {
  console.log(`${colors.yellow}For Development:${colors.reset}`);
  console.log(`  1. Create a Clerk account at ${colors.bright}https://clerk.com/${colors.reset}`);
  console.log(`  2. Create a new application in the Clerk dashboard`);
  console.log(`  3. Go to API Keys in your Clerk dashboard`);
  console.log(`  4. Copy the "Publishable Key" that starts with ${colors.bright}pk_test_${colors.reset}`);
  console.log(`  5. Add it to your .env.local file:\n`);
  console.log(`     ${colors.green}VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here${colors.reset}\n`);
}

if (prodKeyIsPlaceholder) {
  console.log(`${colors.yellow}For Production:${colors.reset}`);
  console.log(`  1. Create a production instance in your Clerk dashboard`);
  console.log(`  2. Copy the production "Publishable Key" that starts with ${colors.bright}pk_live_${colors.reset}`);
  console.log(`  3. Add it to your .env.production file:\n`);
  console.log(`     ${colors.green}VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_production_key_here${colors.reset}\n`);
}

// Update environment files function
const updateEnvFile = (filePath, currentContent, keyName, newValue) => {
  let updatedContent;

  if (currentContent.includes(`${keyName}=`)) {
    // Replace existing key
    updatedContent = currentContent.replace(
      new RegExp(`${keyName}=[^\n]*`),
      `${keyName}=${newValue}`
    );
  } else {
    // Add new key
    updatedContent = currentContent + `\n${keyName}=${newValue}\n`;
  }

  fs.writeFileSync(filePath, updatedContent);
  console.log(`${colors.green}✓ Updated ${path.basename(filePath)} successfully!${colors.reset}`);
};

// Prompt for key function
const promptForKey = (environment) => {
  return new Promise((resolve) => {
    rl.question(`\n${colors.yellow}Would you like to update the ${environment} Clerk key now? (y/n) ${colors.reset}`, (answer) => {
      if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        rl.question(`\n${colors.cyan}Enter your ${environment} Clerk publishable key: ${colors.reset}`, (key) => {
          resolve(key);
        });
      } else {
        resolve(null);
      }
    });
  });
};

// Main function
const main = async () => {
  // Development key
  if (envLocalExists && (localKeyIsPlaceholder || !localClerkKey)) {
    const devKey = await promptForKey('development');
    if (devKey) {
      updateEnvFile(envLocalPath, envLocalContent, 'VITE_CLERK_PUBLISHABLE_KEY', devKey);
    }
  }

  // Production key
  if (envProdExists && (prodKeyIsPlaceholder || !prodClerkKey)) {
    const prodKey = await promptForKey('production');
    if (prodKey) {
      updateEnvFile(envProdPath, envProdContent, 'VITE_CLERK_PUBLISHABLE_KEY', prodKey);
    }
  }

  console.log(`\n${colors.bright}${colors.green}Configuration complete!${colors.reset}`);
  console.log(`\n${colors.cyan}For more information, see ${colors.bright}CLERK_SETUP.md${colors.reset}\n`);

  rl.close();
};

// Run the main function
main();