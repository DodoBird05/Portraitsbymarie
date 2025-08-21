import Layout from '@/components/Layout'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

interface PricingProps {
  frontmatter: {
    title: string
    description: string
  }
  content: string
}

export default function PricingPage({ frontmatter, content }: PricingProps) {
  return (
    <Layout title={frontmatter.title} description={frontmatter.description}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'pricing.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}