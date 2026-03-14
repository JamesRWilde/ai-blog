import Container from "@/app/_components/container";
import Hero from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts();
  const morePosts = allPosts;

  return (
    <main className="min-h-screen">
      {/* Sticky nav */}
      <nav className="nav-glass sticky top-0 z-50">
        <Container>
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2 group">
              <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:bg-cyan-300 transition-colors animate-pulse" />
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                AI News
              </span>
            </a>
            <div className="flex items-center gap-6">
              <a href="#latest"
                 className="text-sm text-zinc-400 hover:text-white transition-colors"
                 style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                Articles
              </a>
              <div className="w-px h-4 bg-white/10" />
              <span className="text-xs text-zinc-600"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                {allPosts.length} articles
              </span>
            </div>
          </div>
        </Container>
      </nav>

      <Container>
        <Hero />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}
