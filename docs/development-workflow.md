# Development Workflow Guide

## Getting Started

### Prerequisites
- Node.js (LTS version) installed
- Git installed
- Code editor (VS Code recommended)

### Initial Setup
Run the Claude Code prompt to set up the complete environment automatically.

## Daily Development Workflow

### 1. Start Development Server
```bash
pnpm run dev
```
Server will start on assigned port (3100-3200 range).

### 2. Edit Content
- Navigate to `/content/` folder
- Edit `.md` files for page content
- Changes appear immediately in browser

### 3. Add Images
- Place images in `/public/images/`
- Reference in content as `/images/filename.jpg`
- Next.js optimizes images automatically

### 4. Code Changes
- Edit components in `/src/components/`
- Edit pages in `/src/pages/`
- TypeScript will catch errors as you type

## File Organization

### Content Files (`/content/`)
- `home.md` - Homepage content
- `about.md` - About page content  
- `pricing.md` - Pricing page content
- `contact.md` - Contact page content

### Component Files (`/src/components/`)
- `Layout.tsx` - Page wrapper
- `Header.tsx` - Navigation header
- `Footer.tsx` - Site footer

### Page Files (`/src/pages/`)
- `index.tsx` - Homepage (reads home.md)
- `about.tsx` - About page (reads about.md)
- `pricing.tsx` - Pricing page (reads pricing.md)
- `contact.tsx` - Contact page (reads contact.md)

## Common Tasks

### Adding a New Page
1. Create content file in `/content/newpage.md`
2. Create page component in `/src/pages/newpage.tsx`
3. Add navigation link in `Header.tsx`

### Updating Branding
- Edit site name in `Header.tsx`
- Update colors in `tailwind.config.js`
- Replace favicon in `/public/`

### Testing Changes
```bash
pnpm run build
```
Checks for errors before deployment.

## Deployment

### Build for Production
```bash
pnpm run build
pnpm run start
```

### Deploy to Vercel
1. Push to GitHub repository
2. Connect repository to Vercel
3. Automatic deployments on push

### Deploy to Netlify
1. Push to GitHub repository
2. Connect repository to Netlify
3. Build command: `pnpm run build`
4. Publish directory: `.next`

## Troubleshooting

### Port Issues
- Check assigned port in CLAUDE.md
- Ensure no other services using the port

### Build Errors
- Run `pnpm run build` to see specific errors
- Check TypeScript errors in editor
- Verify all imports are correct

### Content Not Updating
- Restart development server
- Check file paths in content files
- Verify frontmatter syntax

## Git Workflow

### Daily Commits
```bash
git add .
git commit -m "Update content and styling"
git push
```

### Before Major Changes
```bash
git checkout -b new-feature
# Make changes
git commit -m "Add new feature"
git push -u origin new-feature
```

## Performance Tips

### Image Optimization
- Use Next.js Image component
- Compress images before upload
- Use appropriate image formats (WebP, AVIF)

### Content Loading
- Keep markdown files reasonably sized
- Use frontmatter for metadata
- Optimize image references
