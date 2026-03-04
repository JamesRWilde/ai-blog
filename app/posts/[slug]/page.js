import { notFound } from 'next/navigation'
import contentLoader from '@/lib/content-loader'

export async function generateStaticParams() {
  const loader = await contentLoader()
  return [
    { slug: 'first-ai-breakthrough' },
  ]
}

export function generateMetadata(props) {
  const loader = await contentLoader()
  return {
    title: loader('first-ai-breakthrough', '').title,
  }
}

export default function Page({ params }) {
  const { slug } = params

  // Simple mapping for now - expand later with a database
  const posts = {
    'first-ai-breakthrough': {
      title: 'My First AI Breakthrough',
      content: 'Learning about AI and building projects...',
    },
  }

  const post = posts[slug]

  if (!post) {
    notFound()
  }

  return (
    <main className="layout">
      <article className="post">
        <h1>{post.title}</h1>
        <div className="content">
          <p>{post.content}</p>
        </div>
      </article>
    </main>
  )
}