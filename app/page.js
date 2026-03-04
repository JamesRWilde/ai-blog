import Header from '@/components/Header';
import Footer from '@/components/Footer';

async function getAllPosts() {
  try {
    const fs = await import('fs');
    const path = await import('path');
    
    const postsDir = path.join(process.cwd(), 'content/posts');
    const files = fs.readdirSync(postsDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));
    
    return mdFiles.map(file => {
      const slug = file.replace('.md', '');
      const filePath = path.join(postsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Parse frontmatter
      const lines = content.split('\n');
      const frontmatter = {};
      let inFrontmatter = false;
      let contentStart = 0;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line === '---') {
          if (!inFrontmatter) {
            inFrontmatter = true;
          } else {
            contentStart = i + 1;
            break;
          }
          continue;
        }
        
        if (inFrontmatter && line.includes(':')) {
          const [key, value] = line.split(':');
          frontmatter[key.trim()] = value.trim();
        }
      }
      
      return {
        slug,
        title: frontmatter.title || slug,
        date: frontmatter.date || '',
        author: frontmatter.author || 'Unknown',
        excerpt: frontmatter.excerpt || ''
      };
    });
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

export default async function Home({ searchParams }) {
  const posts = await getAllPosts();
  
  // Sort by date descending
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">No posts yet</h1>
            <p className="text-gray-600">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post, index) => (
              <article 
                key={post.slug}
                className={`border-b pb-6 ${index !== posts.length - 1 ? 'border-gray-200' : ''}`}
              >
                <h2 className="text-3xl font-bold mb-2">
                  <a href={`/posts/${post.slug}`} className="hover:text-blue-600 transition-colors">
                    {post.title}
                  </a>
                </h2>
                <p className="text-gray-600 text-sm mb-3">
                  By {post.author} | {new Date(post.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <a 
                  href={`/posts/${post.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read more →
                </a>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}