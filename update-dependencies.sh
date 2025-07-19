#!/bin/bash

echo "==================================="
echo "NEXTFAANG Dependency Update Script"
echo "==================================="
echo

echo "Step 1: Removing node_modules and package-lock.json..."
rm -rf node_modules package-lock.json
echo "Done!"
echo

echo "Step 2: Installing dependencies..."
npm install --legacy-peer-deps
echo "Done!"
echo

echo "Step 3: Verifying installation..."
npm list react
echo "Done!"
echo

echo "==================================="
echo "Installation complete!"
echo
echo "You can now run the project with:"
echo "npm run dev"
echo "==================================="