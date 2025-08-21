# Stable Development Environment Setup

## Problem Diagnosis

Photography website development environments often suffer from instability due to:

1. **Package Manager Conflicts**: Mixed use of npm (package-lock.json) and pnpm (specified in package.json)
2. **Memory Issues**: Next.js 15 dev server memory leaks causing crashes every 7-15 minutes
3. **Port Conflicts**: No proper cleanup between server restarts, leading to hanging processes
4. **Build Artifacts**: Stale .next directory causing rendering issues and build failures

## Solutions Implemented

### 1. Package Manager Standardization
- Remove conflicting lock files (package-lock.json, yarn.lock) when using pnpm
- Commit to single package manager throughout project lifecycle
- Auto-detect package manager based on existing lock files

### 2. Memory Management
- Set NODE_OPTIONS with 4GB memory allocation for Next.js 15
- Configure Next.js to optimize imports and reduce memory usage
- Implement automatic restart on memory errors

### 3. Error Logging System
- Create `/logs/` directory for comprehensive tracking
- Separate logs for general output and errors
- Timestamps on all log entries for debugging
- Persistent logging across development sessions

### 4. Stable Development Scripts

#### Available Commands:

```bash
# Standard development
npm run dev              # or pnpm dev

# Enhanced stability options
npm run dev:stable       # With error recovery and monitoring
npm run dev:clean        # Clean start (removes artifacts first)

# Maintenance
npm run clean           # Manual cleanup of ports and artifacts

# Monitoring
npm run logs           # View general development logs
npm run logs:error     # View error logs only
```

### 5. Configuration Improvements

#### Next.js Configuration Optimizations
- Enable package import optimizations for commonly used libraries
- Configure on-demand entries for better memory management
- Disable telemetry to prevent external network calls during development

#### Environment Variables
- Fixed PORT assignment to prevent conflicts
- Disabled Next.js telemetry for stability
- Increased Node.js memory limit to 4GB
- Set development mode explicitly

## Usage Recommendations

### For Daily Development

1. **First Time Setup** (after running installer):
   ```bash
   npm run clean
   npm install           # or pnpm install
   npm run dev:stable    # Start with monitoring
   ```

2. **Regular Development Sessions**:
   ```bash
   npm run dev           # Standard Next.js development
   ```

3. **When Server Hangs or Crashes**:
   ```bash
   # Stop server (Ctrl+C)
   npm run clean         # Clean artifacts and ports
   npm run dev           # Restart normally
   ```

4. **For Long Development Sessions**:
   ```bash
   npm run dev:stable    # Automatic crash recovery
   ```

### Monitoring and Debugging

- **Check general activity**: `npm run logs`
- **Check for errors**: `npm run logs:error`
- **View log files directly**:
  - General: `logs/dev-server.log`
  - Errors: `logs/dev-server-errors.log`

## Port Management

- **Assigned Port Range**: 3100-3200 (configured during setup)
- **Automatic Cleanup**: Scripts remove hanging processes on startup
- **Conflict Resolution**: Port scanning finds available ports automatically

## Troubleshooting

### Server Won't Start
```bash
npm run clean                    # Clean all artifacts
rm -rf node_modules             # Nuclear option
npm install                     # Reinstall dependencies
npm run dev:clean               # Clean start
```

### Memory Issues Persist
1. Check if you have enough system memory (8GB+ recommended)
2. Close other memory-intensive applications
3. Increase memory limit in `.env.development`:
   ```
   NODE_OPTIONS=--max-old-space-size=6144
   ```

### Port Already in Use
```bash
npm run clean                   # Should fix automatically
# Manual port cleanup (replace PORT with your assigned port):
lsof -ti :PORT | xargs kill -9  # macOS/Linux
netstat -ano | findstr :PORT   # Windows (find PID, then taskkill)
```

### Build Failures
```bash
npm run clean                   # Remove .next directory
rm -rf .next node_modules/.cache
npm run build                   # Try build again
```

## Platform Compatibility

### macOS/Linux
- Uses bash scripts for efficient port cleanup
- Leverages `lsof` and `kill` commands
- Scripts are made executable automatically

### Windows
- Uses Node.js-based scripts for cross-platform compatibility
- Employs `netstat` and `taskkill` commands
- Batch files provided as alternatives

### Detection and Adaptation
Scripts automatically detect the operating system and use appropriate commands:
- `win32`: Windows-specific commands
- `darwin`: macOS optimizations
- `linux`: Linux-compatible operations

## Best Practices

1. **Single Package Manager**: Never mix npm and pnpm in the same project
2. **Regular Cleanup**: Run `npm run clean` when switching branches or after updates
3. **Monitor Logs**: Check error logs when experiencing issues
4. **Memory Awareness**: Use stable scripts for long development sessions
5. **Environment Consistency**: Keep `.env.development` file for consistent settings

## File Structure

```
project-root/
├── scripts/
│   ├── dev-stable.js        # Stability monitor (all platforms)
│   ├── cleanup.sh          # Unix/macOS cleanup
│   ├── cleanup.js          # Cross-platform cleanup
│   └── cleanup.bat         # Windows batch script
├── logs/
│   ├── dev-server.log      # General development output
│   └── dev-server-errors.log # Error-specific logs
├── .env.development        # Development environment config
├── next.config.js          # Optimized Next.js configuration
└── package.json           # Enhanced scripts configuration
```

## Why This Setup is More Stable

1. **Conflict Prevention**: Single package manager, no lock file conflicts
2. **Memory Optimization**: Proper allocation prevents OOM crashes
3. **Automatic Recovery**: Scripts restart on failures without manual intervention
4. **Comprehensive Logging**: Issues are tracked and can be diagnosed
5. **Clean Starts**: Removes stale artifacts that cause mysterious failures
6. **Port Management**: No hanging processes between development sessions

This setup prioritizes reliability over advanced features, making it ideal for photographers and non-technical users who need a dependable development environment for their websites.

## Environment Variables Reference

### .env.development
```bash
# Core settings
PORT=[ASSIGNED_PORT]                # Port assigned during setup
NODE_ENV=development               # Explicit development mode

# Stability optimizations
NEXT_TELEMETRY_DISABLED=1          # Disable external calls
NODE_OPTIONS=--max-old-space-size=4096  # 4GB memory allocation

# Performance tuning (optional)
GENERATE_SOURCEMAP=false           # Disable source maps for faster builds
```

## Next.js Configuration Reference

### Enhanced next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Reduce memory usage by optimizing common imports
    optimizePackageImports: ['lucide-react'],
  },
  // Better error handling and memory management
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,      // Keep pages in memory for 1 minute
    pagesBufferLength: 5,           # Limit concurrent page compilation
  },
}

module.exports = nextConfig
```

This configuration helps prevent memory leaks and improves development server stability while maintaining good performance for photography websites.

## Build Verification and Testing Procedures

### Pre-build Cleanup
```bash
pnpm run clean
```
Remove any stale build artifacts before verification.

### Build Verification
```bash
pnpm run build
```
Ensure no TypeScript errors or build failures before proceeding.

### Server Start and Port Verification
```bash
pnpm run dev
```
The port is configured in package.json scripts and will use the assigned port automatically.
Wait for "Ready - started server on" message and VERIFY it shows the assigned port, not 3000.

### Port Validation (CRITICAL)
After server starts, verify it's running on the correct port:
```bash
# FAIL CHECK: Verify server is NOT running on port 3000
curl -I http://localhost:3000 2>/dev/null && echo "FAILURE: Server running on port 3000 instead of assigned port" && exit 1

# SUCCESS CHECK: Verify server IS running on assigned port
curl -I http://localhost:[ASSIGNED_PORT] || (echo "FAILURE: Server not running on assigned port [ASSIGNED_PORT]" && exit 1)

echo "✅ Port validation successful - server running on assigned port"
```

**If port validation fails:**
1. Check that package.json scripts include `-p [ASSIGNED_PORT]`
2. Restart with explicit port: `pnpm run dev -p [ASSIGNED_PORT]`
3. Verify .env.development has correct PORT value

For enhanced stability, alternatively use:
```bash
pnpm run dev:stable
```

### Endpoint Testing
Test all 4 endpoints using curl commands from `/docs/component-examples.md` to verify all endpoints return 200 status.

### Final Steps
- LEAVE SERVER RUNNING for user review
- Do NOT shut down the development server after testing