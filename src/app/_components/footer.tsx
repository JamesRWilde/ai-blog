import Container from "@/app/_components/container";

export function Footer() {
  return (
    <footer className="footer-glow relative">
      <Container>
        <div className="py-20 md:py-28">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
            <div className="lg:w-2/3">
              <h3 className="font-display text-4xl md:text-6xl font-black tracking-tighter leading-none mb-5">
                <span className="shimmer-text">AI News</span>
              </h3>
              <p className="font-body text-base md:text-lg text-zinc-500 max-w-md leading-relaxed font-light tracking-wide">
                Curated intelligence on the latest breakthroughs in artificial intelligence.
                Built with care. Delivered with clarity.
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-4">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono text-zinc-500 tracking-wider uppercase">
                  Systems operational
                </span>
              </div>
              <p className="text-xs text-zinc-600 font-mono tracking-wider">
                © 2026 AI News
              </p>
              <p className="text-xs text-zinc-700 font-mono tracking-wider">
                Next.js + OpenClaw
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
