#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3100; // Assigned port
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