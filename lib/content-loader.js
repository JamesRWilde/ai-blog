// Simple content loader for blog posts
export default async function contentLoader() {
  // Return a simple mapping for now - expand later with a database
  return async (slug, defaultContent = '') => {
    const posts = {
      'first-ai-breakthrough': {
        title: 'My First AI Breakthrough',
        content: 'Learning about AI and building projects...',
      },
    }
    return posts[slug] || {
      title: defaultContent.title || 'Untitled',
      content: defaultContent.content || 'No content available.',
    }
  }
}