export default function Hero() {
  return (
    <section className="relative mb-16 md:mb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 dark:from-cyan-500/10 dark:via-violet-500/10 dark:to-fuchsia-500/10" />
      <div className="relative z-10 px-5 text-center md:text-left md:px-10">
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-6 bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
          AI News
        </h1>
        <p className="text-2xl md:text-3xl font-serif text-slate-600 dark:text-slate-300 leading-relaxed">
          All the latest and greatest in the world of AI
        </p>
      </div>
    </section>
  );
}
