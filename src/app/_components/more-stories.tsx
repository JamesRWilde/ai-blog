import { Post } from "@/interfaces/post";
import { PostPreview } from "@/app/_components/post-preview";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  return (
    <section className="mb-20">
      {/* Section header */}
      <div className="mb-14">
        <div className="accent-tag anim-slide-in mb-5">
          Latest Articles
        </div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-white">
          Latest
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
