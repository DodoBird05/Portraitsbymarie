# Technology Stack Documentation

## Package Manager: pnpm
**Why chosen over npm/yarn:**
- 3x faster installation times
- 50% less disk space usage
- Stricter dependency resolution (prevents phantom dependencies)
- Better security through content-addressable storage

## Core Framework: Next.js
**Why chosen:**
- Server-side rendering for better SEO
- Built-in image optimization (perfect for photography)
- File-based routing (simple and intuitive)
- Excellent performance out of the box

## Language: TypeScript
**Why chosen:**
- Type safety reduces bugs
- Better developer experience with IntelliSense
- Self-documenting code
- Easier to maintain

## Styling: Tailwind CSS
**Why chosen:**
- Utility-first approach is designer-friendly
- Consistent design system
- Excellent responsive design utilities
- No CSS file management needed

## Content Management: Markdown + Frontmatter
**Why chosen:**
- Easy to write and edit
- Separates content from code logic
- Familiar to content creators
- Version control friendly

## Code Quality Tools

### ESLint
- Catches potential bugs
- Enforces consistent coding standards
- Next.js specific rules included

### Prettier
- Automatic code formatting
- Consistent style across files
- No manual formatting decisions

## SEO & Performance

### next-seo
- Simplifies meta tag management
- Open Graph and Twitter Cards support
- JSON-LD structured data

### Sharp
- High-performance image processing
- Automatic format optimization
- Required by Next.js Image component

## Port Strategy: 3100-3200
**Why this range:**
- Above system ports (0-1023)
- Below common dev ports (3000, 8000, 8080)
- Unlikely to conflict with other services

## LTS/Stable Versions Strategy
- All dependencies use Long Term Support or latest stable versions
- Node.js must be LTS, others can be stable production releases
- Ensures stability and security patches
- Predictable update schedule
- Better compatibility between packages
- EXACT researched versions must be used - NO SUBSTITUTIONS
