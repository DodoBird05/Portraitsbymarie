# Deployment Guide

## Overview
This guide covers deploying your photography website from local development to a live, public website.

## Hosting Options

### Vercel (Recommended)
- **Best for**: Next.js sites (built by same team)
- **Pros**: Automatic deployments, excellent performance, free tier
- **Cons**: Limited to serverless functions

### Netlify
- **Best for**: Static sites with forms
- **Pros**: Great form handling, easy setup, generous free tier
- **Cons**: Slightly more complex Next.js setup

### Traditional Hosting
- **Best for**: Full control, existing hosting relationships
- **Pros**: Complete control, can use existing provider
- **Cons**: More manual setup required

## Vercel Deployment (Recommended)

### Step 1: Prepare Repository
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub account
3. Click "New Project"
4. Import your repository
5. Configure project:
   - Framework Preset: Next.js
   - Build Command: `pnpm run build`
   - Output Directory: `.next`

### Step 3: Environment Variables
Add to Vercel dashboard if needed:
- `NEXT_PUBLIC_SITE_NAME`
- `NEXT_PUBLIC_SITE_URL`

### Step 4: Deploy
- Click "Deploy"
- Wait for build to complete
- Get live URL

### Step 5: Custom Domain (Optional)
1. Purchase domain from registrar
2. Add domain in Vercel dashboard
3. Update DNS records as instructed
4. SSL certificate auto-generated

## Netlify Deployment

### Step 1: Build Settings
Create `netlify.toml` in project root:
```toml
[build]
  command = "pnpm run build"
  publish = ".next"

[build.environment]
  NPM_FLAGS = "--version"
```

### Step 2: Deploy
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub account
3. Click "New site from Git"
4. Connect repository
5. Build settings auto-detected
6. Click "Deploy site"

### Step 3: Custom Domain
1. Go to Site settings > Domain management
2. Add custom domain
3. Update DNS records
4. SSL certificate auto-generated

## Pre-Deployment Checklist

### Content Review
- [ ] All content files updated with real information
- [ ] Contact information accurate
- [ ] Pricing current and correct
- [ ] About page reflects your story

### Technical Checks
- [ ] `pnpm run build` completes without errors
- [ ] All images optimized and compressed
- [ ] Meta descriptions and titles set
- [ ] Contact form tested (if applicable)

### SEO Preparation
- [ ] Favicon added to `/public/`
- [ ] robots.txt configured
- [ ] sitemap.xml generated
- [ ] Google Analytics added (if desired)

## Post-Deployment Tasks

### 1. Test Live Site
- Check all 4 pages load correctly
- Test navigation between pages
- Verify images display properly
- Test responsive design on mobile

### 2. Set Up Analytics
```javascript
// Add to pages/_app.tsx if using Google Analytics
import { GoogleAnalytics } from '@next/third-parties/google'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <GoogleAnalytics gaId="GA_MEASUREMENT_ID" />
    </>
  )
}
```

### 3. Submit to Search Engines
- Submit sitemap to Google Search Console
- Submit sitemap to Bing Webmaster Tools
- Verify ownership of domain

### 4. Set Up Monitoring
- Monitor site performance with hosting provider tools
- Set up uptime monitoring (e.g., UptimeRobot)
- Check Core Web Vitals regularly

## Ongoing Maintenance

### Content Updates
1. Edit files in `/content/` folder
2. Commit and push changes
3. Automatic deployment triggered

### Code Updates
1. Make changes in development
2. Test locally with `pnpm run build`
3. Commit and push
4. Monitor deployment logs

### Performance Monitoring
- Check Lighthouse scores monthly
- Monitor image loading times
- Review and compress new images

## Troubleshooting

### Build Failures
- Check deployment logs in hosting dashboard
- Verify all dependencies in package.json
- Test build locally first

### Slow Loading
- Compress images further
- Review bundle size with analyzer
- Optimize image formats (WebP, AVIF)

### SEO Issues
- Verify meta tags in page source
- Check robots.txt accessibility
- Ensure sitemap is accessible

## Domain and SSL

### Custom Domain Setup
1. Purchase domain from registrar (Namecheap, GoDaddy, etc.)
2. Point domain to hosting provider
3. Configure DNS records as instructed
4. Wait for propagation (24-48 hours)

### SSL Certificate
- Automatically provided by Vercel/Netlify
- Ensures https:// for all visitors
- Required for modern browsers and SEO

## Backup Strategy

### Code Backup
- Code automatically backed up in Git repository
- Multiple copies on GitHub/hosting provider

### Content Backup
- Regularly export content files
- Keep local copies of all images
- Document any custom configurations

## Cost Considerations

### Free Tiers
- Vercel: Generous limits for personal/small business use
- Netlify: Good free tier with form submissions
- GitHub: Free for public repositories

### Paid Upgrades
- Usually needed for:
  - High traffic volumes
  - Advanced features
  - Premium support
  - Multiple team members
