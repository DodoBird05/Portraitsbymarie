# Configuration File Templates

## tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "paths": {"@/*": ["./src/*"]}
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## tailwind.config.js
```javascript
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: {} },
  plugins: [],
}
```

## Enhanced package.json scripts
Include stability scripts with ASSIGNED PORT:
```json
{
  "scripts": {
    "dev": "next dev -p [ASSIGNED_PORT]",
    "dev:stable": "node scripts/dev-stable.js",
    "dev:clean": "node scripts/cleanup.js && next dev -p [ASSIGNED_PORT]",
    "build": "next build",
    "start": "next start -p [ASSIGNED_PORT]",
    "lint": "next lint",
    "clean": "node scripts/cleanup.js",
    "logs": "tail -f logs/dev-server.log || type logs\\dev-server.log",
    "logs:error": "tail -f logs/dev-server-errors.log || type logs\\dev-server-errors.log"
  }
}
```

**Platform Adaptation Note**: For Unix/macOS systems, update cleanup commands to use bash scripts:
```json
{
  "scripts": {
    "dev:clean": "./scripts/cleanup.sh && next dev",
    "clean": "./scripts/cleanup.sh",
    "logs": "tail -f logs/dev-server.log",
    "logs:error": "tail -f logs/dev-server-errors.log"
  }
}
```

## Enhanced .gitignore
```
node_modules
.next
.env*.local
.DS_Store
*.log

# Development logs
logs/

# Lock files (if switching package managers)
package-lock.json
yarn.lock

# Cache directories
node_modules/.cache
.next/cache
```

## Environment Configuration (.env.development)
```
PORT=[ASSIGNED_PORT]
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
NODE_OPTIONS=--max-old-space-size=4096
```

## postcss.config.js (Tailwind v4 + Next.js format)
```javascript
// IMPORTANT: Next.js requires object syntax, not array syntax
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

## src/styles/globals.css (Tailwind v4 syntax)
```css
@import "tailwindcss";
```

## src/pages/_app.tsx (CRITICAL for Global CSS)
```typescript
import type { AppProps } from 'next/app'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

**IMPORTANT**: Global CSS must ONLY be imported in _app.tsx, never in components. This prevents Next.js build errors.

## Cache Clearing Commands
```bash
# Clear Next.js and node cache after PostCSS changes
rm -rf .next node_modules/.cache

# Then restart dev server
pnpm run dev
```

## Port Scanning Script
Find available port in range 3100-3200:
```bash
for port in {3100..3200}; do
  if ! lsof -i :$port > /dev/null 2>&1; then
    echo "Using port $port"
    break
  fi
done
```
Use this script to automatically detect and assign an available port before starting the development server.

## Enhanced Next.js Configuration
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
    pagesBufferLength: 5,           // Limit concurrent page compilation
  },
}

module.exports = nextConfig
```

## Environment Configuration (.env.development)
```bash
# Core settings
PORT=[ASSIGNED_PORT]
NODE_ENV=development

# Stability optimizations
NEXT_TELEMETRY_DISABLED=1
NODE_OPTIONS=--max-old-space-size=4096

# Performance tuning (optional)
GENERATE_SOURCEMAP=false
```

## Stability Script Templates

Reference `/docs/stability-scripts-guide.md` for complete implementations of:

### Development Monitor (scripts/dev-stable.js)
- Cross-platform Node.js script
- Memory monitoring and auto-restart
- Comprehensive error logging
- Port cleanup before starting

### Cleanup Utilities
- **Unix/macOS**: `scripts/cleanup.sh` (bash script)
- **Windows**: `scripts/cleanup.js` (Node.js script)
- **Cross-platform**: `scripts/cleanup.js` (recommended fallback)

See stability guide for platform-specific implementations and usage instructions.
