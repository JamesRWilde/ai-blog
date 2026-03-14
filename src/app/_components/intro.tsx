export default function Hero() {
  return (
    <section className="relative mb-16 md:mb-24 py-16 md:py-24 overflow-hidden">
      {/* Animated orbs */}
      <div className="hero-orb-1 absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
        }}
      />
      <div className="hero-orb-2 absolute -bottom-48 -right-32 w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
        }}
      />
      <div className="hero-orb-3 absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(217,70,239,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-pattern" />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-bg" />

      <div className="relative z-10">
        {/* Accent tag */}
        <div className="accent-tag anim-slide-in mb-8">
          Intelligence Briefing
        </div>

        {/* Main heading */}
        <h1 className="text-7xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-[0.85] mb-8 anim-fade-up">
          <span className="shimmer-text">AI News</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-xl anim-fade-up-d1 font-light tracking-wide">
          All the latest and greatest in the world of AI.
        </p>
        <p className="text-base md:text-lg text-zinc-500 mt-3 anim-fade-up-d2 font-light tracking-wide">
          Curated intelligence. Future-focused insights.
        </p>

        {/* Divider */}
        <div className="mt-12 h-[1px] w-full anim-fade-up-d3"
          style={{
            background: 'linear-gradient(90deg, #6366f1, rgba(6,182,212,0.3), transparent)',
          }}
        />
      </div>
    </section>
  );
}
