import Layout from '@/components/Layout'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

interface HomeProps {
  frontmatter: {
    title: string
    description: string
  }
  content: string
}

export default function HomePage({ frontmatter, content }: HomeProps) {
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