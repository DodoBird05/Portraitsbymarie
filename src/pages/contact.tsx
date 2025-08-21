import Layout from '@/components/Layout'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

interface ContactProps {
  frontmatter: {
    title: string
    description: string
    showContactForm?: boolean
  }
  content: string
}

export default function ContactPage({ frontmatter, content }: ContactProps) {
  return (
    <Layout title={frontmatter.title} description={frontmatter.description}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'contact.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { props: { frontmatter: data, content } }
}