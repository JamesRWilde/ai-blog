import Header from '@/components/Header.js';
import Footer from '@/components/Footer.js';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const post = await import(`./${slug}/page.js`);
  const { metadata } = post;
  return metadata;
}

export default async function Post({ params }) {
  const slug = params.slug;
  const PostPage = await import(`./${slug}/page.js`);
  const { Post } = PostPage;
  
  if (!Post) {
    return notFound();
  }
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Post slug={slug} />
      </main>
      <Footer />
    </>
  );
}
