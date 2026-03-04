import { Post } from "@/interfaces/post";
import { PostPreview } from "@/app/_components/post-preview";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  return (
    <section className="mb-20">
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-slate-800 dark:text-slate-100">
          Latest
        </h2>
        <p className="text-xl md:text-2xl font-serif text-slate-500 dark:text-slate-400 mt-4">
          Curated intelligence. Future-focused insights.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-12 lg:gap-x-16">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
