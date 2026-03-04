export default function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white py-6 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">AI Blog</h1>
        <nav className="hidden md:flex space-x-8">
          <a href="/" className="hover:text-purple-300 transition-colors duration-200">Home</a>
          <a href="/about" className="hover:text-purple-300 transition-colors duration-200">About</a>
          <a href="/contact" className="hover:text-purple-300 transition-colors duration-200">Contact</a>
        </nav>
      </div>
    </header>
  );
}