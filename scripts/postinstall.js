#!/usr/bin/env node

// Post-install script to handle @parcel/watcher issues
console.log('Running post-install script...');

// Check if we're in a CI environment
if (process.env.CI === 'true') {
  console.log('CI environment detected');
  
  const { execSync } = require('child_process');
  
  try {
    // Try to install @parcel/watcher, but don't fail if it doesn't work
    execSync('npm list @parcel/watcher', { stdio: 'pipe' });
    console.log('@parcel/watcher is already installed');
  } catch (error) {
    console.log('Attempting to install @parcel/watcher...');
    try {
      execSync('npm install @parcel/watcher --optional --no-save', { stdio: 'inherit' });
      console.log('@parcel/watcher installed successfully');
    } catch (installError) {
      console.log('@parcel/watcher installation failed, continuing...');
    }
  }
}

console.log('Post-install script completed');
