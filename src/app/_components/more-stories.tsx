import { Post } from "@/interfaces/post";
import { PostPreview } from "@/app/_components/post-preview";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  return (
    <section className="mb-20">
      {/* Section header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-[2px] bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full" />
          <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-zinc-400"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            Latest Articles
          </h2>
        </div>
        <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-white"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          Latest
        </h3>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post, i) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
