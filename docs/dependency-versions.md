# Dependency Versions - Research Results

## Research Findings

### Core Runtime
- **Node.js**: v22 LTS ("Jod" - Active LTS until Oct 2025)

### Core Framework & Libraries
- **Next.js**: 15.5.0 (Latest stable with React 19 support)
- **React**: 19.1.1 (Latest stable)
- **React DOM**: 19.1.1 (Match React version)

### Language & Tools
- **TypeScript**: 5.9.2 (Latest stable)

### Styling (v4.1+ REQUIRED)
- **Tailwind CSS**: 4.1.0 (MEETS v4.1+ requirement)
- **@tailwindcss/postcss**: 4.1.0 (Match Tailwind version)
- **PostCSS**: 8.5.6 (Latest stable)
- **Autoprefixer**: 10.4.21 (Latest stable)

### Development Dependencies
- **@types/node**: 24.3.0 (Latest stable)
- **@types/react**: 19.0.2 (Match React 19)
- **@types/react-dom**: 19.0.2 (Match React DOM 19)
- **ESLint**: 9.33.0 (Latest stable)
- **eslint-config-next**: 15.5.0 (Latest stable)
- **Prettier**: 3.6.2 (Latest stable)

### Additional Dependencies
- **next-seo**: 6.8.0 (Latest stable)
- **lucide-react**: 0.540.0 (Latest stable)
- **gray-matter**: 4.0.3 (Latest stable)

## Installation Commands
Using exact researched versions:

```bash
# Core dependencies
pnpm add next@15.5.0 react@19.1.1 react-dom@19.1.1 typescript@5.9.2

# Styling dependencies  
pnpm add tailwindcss@4.1.0 @tailwindcss/postcss@4.1.0 postcss@8.5.6 autoprefixer@10.4.21

# Development dependencies
pnpm add -D @types/node@24.3.0 @types/react@19.0.2 @types/react-dom@19.0.2 eslint@9.33.0 eslint-config-next@15.5.0 prettier@3.6.2

# Additional dependencies
pnpm add next-seo@6.8.0 lucide-react@0.540.0 gray-matter@4.0.3
```

## Critical Notes
- Use EXACT researched versions - NO SUBSTITUTIONS
- Tailwind CSS v4.1.0 MEETS the v4.1+ minimum requirement
- All versions researched on: January 21, 2025