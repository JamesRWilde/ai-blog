import './globals.css'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

const PostPage = dynamic(() => import('./[slug]/page'), {
  loading: () => <p>Loading...</p>,
})

const Home: NextPage = () => {
  return (
    <main>
      <h1>My Blog</h1>
      <div className="posts">
        <a href="/posts/first-ai-breakthrough">
          <h2>My First AI Breakthrough</h2>
          <p>Learning about AI and building projects</p>
        </a>
      </div>
    </main>
  )
}

export default Home