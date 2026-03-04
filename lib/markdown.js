// Simple markdown parser for blog posts

// Basic markdown to HTML conversion
export function parseMarkdown(text) {
  let html = text
    // Escape HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[(.+)\]\((.+)\)/g, '<a href="$2">$1</a>')
    // Line breaks
    .replace(/\n/g, '<br />')

  return html
}

// Create a markdown processor singleton
export function createMarkdownProcessor() {
  return {
    parse: parseMarkdown,
  }
}

const processor = createMarkdownProcessor()
export default processor