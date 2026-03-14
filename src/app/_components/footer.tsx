import Container from "@/app/_components/container";

export function Footer() {
  return (
    <footer className="footer-gradient">
      <Container>
        <div className="py-16 md:py-24">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
            {/* Left side — branding */}
            <div className="lg:w-1/2">
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight mb-4"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                <span className="shimmer-text">AI News</span>
              </h3>
              <p className="text-lg text-zinc-500 max-w-md leading-relaxed"
                 style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
                Curated intelligence on the latest breakthroughs in artificial intelligence.
                Built with care, delivered with clarity.
              </p>
            </div>

            {/* Right side — copyright & meta */}
            <div className="flex flex-col items-start lg:items-end gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-zinc-500" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                  All systems operational
                </span>
              </div>
              <p className="text-sm text-zinc-600" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                © 2026 AI News Blog. All rights reserved.
              </p>
              <p className="text-xs text-zinc-700" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
                Powered by Next.js &amp; OpenClaw
              </p>
            </div>
          </div>

          {/* Bottom border gradient */}
          <div className="mt-12 h-[1px] w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
