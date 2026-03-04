export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <p className="text-center">&copy; {new Date().getFullYear()} AI Blog. All rights reserved.</p>
      </div>
    </footer>
  );
}