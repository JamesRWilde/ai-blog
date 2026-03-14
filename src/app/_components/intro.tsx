export default function Hero() {
  return (
    <section className="relative mb-20 md:mb-28 overflow-hidden py-12 md:py-20">
      {/* Animated gradient orbs */}
      <div className="hero-orb absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.3) 0%, rgba(34,211,238,0) 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div className="hero-orb-2 absolute -bottom-40 -right-20 w-[600px] h-[600px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(167,139,250,0.35) 0%, rgba(167,139,250,0) 70%)',
          filter: 'blur(100px)',
        }}
      />
      <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(232,121,249,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5">
        <div className="animate-fade-in-up">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full" />
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-zinc-400"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              Intelligence Briefing
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-8"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            <span className="shimmer-text">AI News</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-zinc-400 leading-relaxed max-w-2xl"
             style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
            All the latest and greatest in the world of AI.
            <span className="text-zinc-500 block mt-2 text-lg md:text-xl">
              Curated intelligence. Future-focused insights.
            </span>
          </p>
        </div>

        {/* Decorative line */}
        <div className="mt-12 h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-fade-in-up-delay-1" />
      </div>
    </section>
  );
}
