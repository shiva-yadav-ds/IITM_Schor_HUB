#!/bin/bash
echo "Starting build process..."

# Install dependencies with legacy peer deps
npm install --legacy-peer-deps

# Build the Vite app
npm run build

# Create a public directory for serving static assets if it doesn't exist
mkdir -p public

# Copy the index.html to correct location if needed
if [ -d "dist" ]; then
  echo "Build completed successfully!"
else
  echo "Build failed. Check the build logs for errors."
  exit 1
fi

echo "Build process completed." 