@echo off
echo ===================================
echo NEXTFAANG Dependency Update Script
echo ===================================
echo.
echo This script will update the project dependencies to fix compatibility issues.
echo.

echo Step 1: Removing node_modules and package-lock.json...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
echo Done!
echo.

echo Step 2: Installing dependencies...
call npm install --legacy-peer-deps
echo Done!
echo.

echo Step 3: Verifying installation...
call npm list react
echo Done!
echo.

echo ===================================
echo Installation complete!
echo.
echo You can now run the project with:
echo npm run dev
echo ===================================