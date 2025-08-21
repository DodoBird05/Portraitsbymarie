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