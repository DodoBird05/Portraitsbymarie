# Component Code Examples

## Page Component Template
```typescript
import Layout from '@/components/Layout'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

export default function Page({ frontmatter, content }) {
  return (
    <Layout title={frontmatter.title} description={frontmatter.description}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'home.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}
```

## Component Requirements

### Header Component
- Import: `import { Menu, X } from 'lucide-react'`
- Navigation links: Home, About, Pricing, Contact
- Responsive mobile menu

### Footer Component
- Copyright information
- Contact info

### Layout Component
- Import: `import { NextSeo } from 'next-seo'`
- DO NOT import globals.css here (causes build errors)
- Wrap Header, main content, Footer
- Handle SEO meta tags

## Testing Commands
```bash
# Test endpoints using the ASSIGNED PORT from step 1.2
curl -I http://localhost:[ASSIGNED_PORT]/
curl -I http://localhost:[ASSIGNED_PORT]/about
curl -I http://localhost:[ASSIGNED_PORT]/pricing
curl -I http://localhost:[ASSIGNED_PORT]/contact
```
**IMPORTANT**: Replace [ASSIGNED_PORT] with the actual port number found in step 1.2 (e.g., 3100, 3101, etc.)

## Build Verification
```bash
pnpm run build
pnpm run dev
```

**Note**: The port is automatically configured in package.json scripts, so `pnpm run dev` will use the assigned port.
