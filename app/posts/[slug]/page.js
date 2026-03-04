import Header from '@/components/Header.js';
import Footer from '@/components/Footer.js';
import { notFound } from 'next/navigation';

// Helper to read markdown files
async function readMarkdownFile(filePath) {
  try {
    const response = await fetch(filePath);
    const text = await response.text();
    return text;
  } catch (error) {
    return null;
  }
}

// Get post data from markdown file
async function getPost(slug) {
  const postPath = `/content/posts/${slug}.md`;
  
  try {
    const content = await readMarkdownFile(postPath);
    
    if (!content) {
      return null;
    }
    
    // Parse frontmatter (simple YAML parser)
    const lines = content.split('\n');
    const frontmatter = {};
    let inFrontmatter = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line === '---') {
        inFrontmatter = !inFrontmatter;
        continue;
      }
      
      if (inFrontmatter) {
        const [key, value] = line.split(':');
        if (key && value) {
          frontmatter[key.trim()] = value.trim();
        }
      } else if (line && line[0] !== '#') {
        // Content starts after frontmatter ends
        break;
      }
    }
    
    // Extract content after frontmatter
    const contentStart = content.indexOf('---\n', content.indexOf('---') + 3) + 4;
    const markdownContent = content.substring(contentStart).trim();
    
    return {
      title: frontmatter.title || slug,
      date: frontmatter.date || new Date().toISOString(),
      author: frontmatter.author || 'Unknown',
      excerpt: frontmatter.excerpt || 'Read more...',
      content: markdownContent,
    };
  } catch (error) {
    console.error('Error reading post:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {};
  }
  
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function Post({ params }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600 mb-6">
            By {post.author} | {new Date(post.date).toLocaleDateString()}
          </p>
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
