import Container from "@/app/_components/container";
import Hero from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts();

  return (
    <main className="min-h-screen">
      {/* Skip to content link (accessibility) */}
      <a href="#latest" className="skip-link">Skip to articles</a>

      {/* Sticky nav */}
      <nav className="nav-glass sticky top-0 z-50">
        <Container>
          <div className="flex items-center justify-between h-14">
            <a href="/" className="flex items-center gap-2.5 group">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
              </span>
              <span className="font-display text-base font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
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

      {/* Scroll reveal script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.querySelectorAll('.reveal').forEach(function(el) {
                  el.classList.add('visible');
                });
                return;
              }
              var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                  if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                  }
                });
              }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
              document.querySelectorAll('.reveal').forEach(function(el) {
                observer.observe(el);
              });
            })();
          `,
        }}
      />
    </main>
  );
}
