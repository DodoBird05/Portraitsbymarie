# Stability Scripts Guide

## Overview
These scripts provide a stable development environment with automatic error recovery, memory management, and port cleanup for Next.js photography websites.

## Development Stability Monitor (scripts/dev-stable.js)

### Core Functionality Required:
1. Clean up before starting (ports, .next directory)
2. Start dev server with memory optimization
3. Monitor for crashes and auto-restart
4. Log output for debugging

### Cross-Platform Implementation:

```javascript
#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT;
const PROJECT_ROOT = path.dirname(__dirname);
const LOG_FILE = path.join(PROJECT_ROOT, 'logs', 'dev-server.log');
const ERROR_LOG_FILE = path.join(PROJECT_ROOT, 'logs', 'dev-server-errors.log');

// Ensure logs directory exists
const logsDir = path.join(PROJECT_ROOT, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Create write streams for logs
const logStream = fs.createWriteStream(LOG_FILE, { flags: 'a' });
const errorLogStream = fs.createWriteStream(ERROR_LOG_FILE, { flags: 'a' });

function log(message, isError = false) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  
  console.log(message);
  logStream.write(logMessage);
  
  if (isError) {
    errorLogStream.write(logMessage);
  }
}

function cleanupBeforeStart() {
  log('🧹 Cleaning up before starting...');
  
  // Clean .next directory
  const nextDir = path.join(PROJECT_ROOT, '.next');
  if (fs.existsSync(nextDir)) {
    log('Removing .next directory...');
    fs.rmSync(nextDir, { recursive: true, force: true });
  }
  
  // Platform-specific port cleanup
  if (os.platform() === 'win32') {
    // Windows: Use netstat and taskkill
    exec(`netstat -ano | findstr :${PORT}`, (err, stdout) => {
      if (stdout) {
        const lines = stdout.trim().split('\n');
        lines.forEach(line => {
          const parts = line.trim().split(/\s+/);
          const pid = parts[parts.length - 1];
          if (pid && pid !== '0') {
            exec(`taskkill /F /PID ${pid}`, () => {
              log(`Killed process ${pid} on port ${PORT}`);
            });
          }
        });
      }
    });
  } else {
    // Unix/macOS: Use lsof and kill
    exec(`lsof -ti :${PORT}`, (err, stdout) => {
      if (stdout) {
        const pid = stdout.trim();
        exec(`kill -9 ${pid}`, () => {
          log(`Killed process ${pid} on port ${PORT}`);
        });
      }
    });
  }
}

function startDevServer() {
  log(`🚀 Starting Next.js dev server on port ${PORT}...`);
  
  const env = {
    ...process.env,
    PORT: PORT,
    NODE_ENV: 'development',
    NODE_OPTIONS: '--max-old-space-size=4096',
    NEXT_TELEMETRY_DISABLED: '1',
  };
  
  // Use pnpm if available, otherwise npm
  const packageManager = fs.existsSync('pnpm-lock.yaml') ? 'pnpm' : 'npm';
  
  const devServer = spawn(packageManager, ['run', 'dev'], {
    cwd: PROJECT_ROOT,
    env: env,
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: os.platform() === 'win32'
  });
  
  devServer.stdout.on('data', (data) => {
    const message = data.toString();
    process.stdout.write(message);
    logStream.write(message);
  });
  
  devServer.stderr.on('data', (data) => {
    const message = data.toString();
    process.stderr.write(message);
    errorLogStream.write(message);
    
    // Check for common error patterns
    if (message.includes('out of memory') || message.includes('ENOMEM')) {
      log('⚠️ Memory issue detected! Restarting server...', true);
      devServer.kill();
      setTimeout(() => {
        cleanupBeforeStart();
        startDevServer();
      }, 3000);
    }
  });
  
  devServer.on('close', (code) => {
    if (code !== 0 && code !== null) {
      log(`Dev server exited with code ${code}`, true);
      log('Restarting in 3 seconds...', true);
      setTimeout(() => {
        cleanupBeforeStart();
        startDevServer();
      }, 3000);
    }
  });
  
  devServer.on('error', (err) => {
    log(`Failed to start dev server: ${err.message}`, true);
  });
  
  return devServer;
}

// Handle shutdown gracefully
process.on('SIGINT', () => {
  log('👋 Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('👋 Shutting down gracefully...');
  process.exit(0);
});

// Main execution
log('='.repeat(50));
log('Starting stable development environment');
log(`Project: ${PROJECT_ROOT}`);
log(`Port: ${PORT}`);
log(`Platform: ${os.platform()}`);
log('='.repeat(50));

cleanupBeforeStart();
setTimeout(startDevServer, 1000);
```

## Cleanup Scripts

### Unix/macOS (scripts/cleanup.sh)
```bash
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
```

### Windows (scripts/cleanup.bat)
```batch
@echo off
echo Cleaning up development environment...

REM Kill processes on development ports
for /l %%i in (3100,1,3200) do (
  for /f "tokens=5" %%a in ('netstat -ano ^| findstr :%%i') do (
    taskkill /F /PID %%a 2>nul
  )
)

REM Remove build artifacts
rmdir /s /q .next 2>nul
rmdir /s /q node_modules\.cache 2>nul

echo Cleanup complete!
```

### Cross-Platform Node.js (scripts/cleanup.js)
```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const os = require('os');

console.log('🧹 Cleaning up development environment...');

// Remove build artifacts
const dirs = ['.next', 'node_modules/.cache'];
dirs.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
    console.log(`Removed ${dir}`);
  }
});

// Platform-specific port cleanup
const startPort = 3100;
const endPort = 3200;

if (os.platform() === 'win32') {
  // Windows
  for (let port = startPort; port <= endPort; port++) {
    exec(`netstat -ano | findstr :${port}`, (err, stdout) => {
      if (stdout) {
        const lines = stdout.trim().split('\n');
        lines.forEach(line => {
          const parts = line.trim().split(/\s+/);
          const pid = parts[parts.length - 1];
          if (pid && pid !== '0') {
            exec(`taskkill /F /PID ${pid}`, () => {
              console.log(`Killed process ${pid} on port ${port}`);
            });
          }
        });
      }
    });
  }
} else {
  // Unix/macOS
  for (let port = startPort; port <= endPort; port++) {
    exec(`lsof -ti :${port} | xargs kill -9 2>/dev/null`, (err) => {
      if (!err) {
        console.log(`Cleaned port ${port}`);
      }
    });
  }
}

console.log('✅ Cleanup complete!');
```

## Platform Detection & Script Creation

### Recommended Script Creation Logic:
1. Detect operating system using `os.platform()`
2. Create appropriate scripts based on platform:
   - `win32`: Create Node.js-based scripts (cross-platform)
   - `darwin` or `linux`: Create bash scripts (more efficient)
   - Unknown: Default to Node.js scripts

### Making Scripts Executable:
```javascript
// For Unix-based systems, make scripts executable
if (os.platform() !== 'win32') {
  const { execSync } = require('child_process');
  try {
    execSync('chmod +x scripts/*.sh', { stdio: 'inherit' });
  } catch (err) {
    console.warn('Could not make scripts executable:', err.message);
  }
}
```

## Usage Notes

1. **Memory Management**: Scripts set NODE_OPTIONS to 4GB to prevent Next.js 15 memory issues
2. **Package Manager Detection**: Automatically detects pnpm vs npm based on lock files
3. **Error Patterns**: Monitors for "out of memory" and "ENOMEM" strings in stderr
4. **Logging**: Separates general logs from error logs for easier debugging
5. **Port Range**: Cleans entire development port range (3100-3200)
6. **Graceful Shutdown**: Handles SIGINT and SIGTERM for clean exits

## Integration with package.json

Update package.json scripts to use the appropriate cleanup method:

```json
{
  "scripts": {
    "dev": "next dev",
    "dev:stable": "node scripts/dev-stable.js",
    "dev:clean": "./scripts/cleanup.sh && next dev",
    "clean": "./scripts/cleanup.sh",
    "logs": "tail -f logs/dev-server.log",
    "logs:error": "tail -f logs/dev-server-errors.log"
  }
}
```

**Windows adaptation:**
```json
{
  "scripts": {
    "dev:clean": "node scripts/cleanup.js && next dev",
    "clean": "node scripts/cleanup.js",
    "logs": "type logs\\dev-server.log",
    "logs:error": "type logs\\dev-server-errors.log"
  }
}
```

## Testing Scripts

After creating scripts, test them:

```bash
# Test cleanup
npm run clean

# Test stable development (should start and create logs)
npm run dev:stable

# In another terminal, test logging
npm run logs
```

Verify that:
1. Scripts execute without errors
2. Logs directory is created
3. Port cleanup works
4. Dev server starts with proper memory allocation
5. Auto-restart works (simulate crash by killing process)