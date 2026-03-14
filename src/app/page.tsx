import Container from "@/app/_components/container";
import Hero from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts();

  return (
    <main className="min-h-screen">
      {/* Sticky nav */}
      <nav className="nav-glass sticky top-0 z-50">
        <Container>
          <div className="flex items-center justify-between h-14">
            <a href="/" className="flex items-center gap-2.5 group">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
              </span>
              <span className="text-base font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                AI News
              </span>
            </a>
            <div className="flex items-center gap-5">
              <a href="#latest"
                 className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors tracking-wider uppercase">
                Articles
              </a>
              <div className="w-px h-3 bg-white/10" />
              <span className="text-xs font-mono text-zinc-600 tracking-wider">
                {allPosts.length} posts
              </span>
            </div>
          </div>
        </Container>
      </nav>

      <Container>
        <Hero />
        {allPosts.length > 0 && <MoreStories posts={allPosts} />}
      </Container>
    </main>
  );
}
