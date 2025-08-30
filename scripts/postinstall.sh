#!/bin/bash

# Post-install script to handle @parcel/watcher issues
echo "Running post-install script..."

# Check if we're in a CI environment
if [ "$CI" = "true" ]; then
  echo "CI environment detected"
  
  # Try to install @parcel/watcher, but don't fail if it doesn't work
  if ! npm list @parcel/watcher >/dev/null 2>&1; then
    echo "Attempting to install @parcel/watcher..."
    npm install @parcel/watcher --optional --no-save || echo "@parcel/watcher installation failed, continuing..."
  fi
fi

echo "Post-install script completed"
