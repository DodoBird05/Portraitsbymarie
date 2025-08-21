# Tailwind CSS v4 Configuration Guide

## Overview
Tailwind CSS v4 represents a major architectural change from v3. This guide provides essential information for proper v4.1+ configuration.

## Key Differences from v3

### CSS Import Syntax (CHANGED)
**v4 uses:**
```css
@import "tailwindcss";
```

**v3 used (NO LONGER VALID):**
```css
@tailwind base;
@tailwind components;  
@tailwind utilities;
```

### PostCSS Configuration (NEW PLUGIN)
**v4 requires:**
```javascript
// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

**IMPORTANT:** Next.js requires object syntax, not array syntax.

### Dependencies (NEW PACKAGE)
**v4 requires BOTH:**
- `tailwindcss@4.1+` (main package)
- `@tailwindcss/postcss@4.1+` (PostCSS plugin)

## Minimum Version Requirements
- **Tailwind CSS**: v4.1.0 minimum
- **@tailwindcss/postcss**: v4.1.0 minimum  
- **Next.js**: 15.0+ (for full v4 compatibility)
- **PostCSS**: 8.4+ 

## Installation Commands
```bash
# Core v4 packages
pnpm add tailwindcss@4.1+ @tailwindcss/postcss@4.1+ postcss

# Note: autoprefixer not needed in v4
```

## Configuration Files

### 1. PostCSS Config
Create `postcss.config.js`:
```javascript
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### 2. CSS Import
In `src/styles/globals.css`:
```css
@import "tailwindcss";
```

## Common Issues & Solutions

### Issue: "Cannot resolve 'tailwindcss'"
**Solution:** Ensure `tailwindcss` is in `dependencies`, not `devDependencies`

### Issue: "PostCSS plugin not found"  
**Solution:** Install `@tailwindcss/postcss` package

### Issue: "Styles not loading"
**Solution:** Verify CSS import syntax uses `@import "tailwindcss";`

## Verification Steps
1. Check package.json has both tailwindcss and @tailwindcss/postcss
2. Verify postcss.config.js uses correct plugin name
3. Confirm globals.css uses new import syntax
4. Test build process with `pnpm run build`

## Next.js Integration Requirements

### PostCSS Configuration for Next.js
Next.js specifically requires object syntax for PostCSS config:
```javascript
// postcss.config.js - CORRECT for Next.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

// NOT this array syntax (works with other tools but not Next.js)
module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),
  ],
}
```

### Cache Clearing (CRITICAL)
After making PostCSS configuration changes:
```bash
rm -rf .next node_modules/.cache
pnpm run dev
```

### Bundle Loading Issues
If JavaScript bundles return 404 errors:
1. **Immediately clear cache and restart:**
   ```bash
   rm -rf .next node_modules/.cache
   pnpm run dev
   ```
2. **Verify bundles load correctly:**
   - Check `/_next/static/chunks/main.js` returns 200 status
   - Open browser dev tools and verify no 404 errors in network tab

### Troubleshooting Next.js + Tailwind v4
- **Styles not loading**: Clear cache and restart dev server
- **404 bundle errors**: Always clear `.next` and `node_modules/.cache`
- **Build failures**: Verify PostCSS config uses object syntax
- **CSS not updating**: Restart dev server after config changes
