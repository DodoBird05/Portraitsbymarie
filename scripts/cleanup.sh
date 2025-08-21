#!/bin/bash

echo "🧹 Cleaning up development environment..."

# Kill any processes on development ports
for port in {3100..3200}; do
  lsof -ti :$port | xargs -r kill -9 2>/dev/null
done

# Remove build artifacts
rm -rf .next
rm -rf node_modules/.cache

echo "✅ Cleanup complete!"