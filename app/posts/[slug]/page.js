import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return [
    { slug: 'first-ai-breakthrough' },
  ]
}

export function generateMetadata(props) {
  return {
    title: 'Blog - AI Learning Journey',
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
    <article>
      <h1>{post.title}</h1>
      <div className="content">
        <p>{post.content}</p>
      </div>
    </article>
  )
}