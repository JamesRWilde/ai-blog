import { Post } from "@/interfaces/post";
import { PostPreview } from "@/app/_components/post-preview";
import { FeaturedPost } from "@/app/_components/featured-post";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  const [featured, ...rest] = posts;

  return (
    <section className="mb-20" id="latest">
      {/* Section header */}
      <div className="mb-12">
        <div className="accent-tag reveal mb-5">
          <span className="accent-line" />
          Latest Articles
        </div>
        <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter leading-none text-white reveal reveal-d1">
          Latest
        </h2>
      </div>

      {/* Featured post — full width hero card */}
      {featured && (
        <div className="mb-8 reveal reveal-d2">
          <FeaturedPost
            title={featured.title}
            coverImage={featured.coverImage}
            date={featured.date}
            author={featured.author}
            slug={featured.slug}
            excerpt={featured.excerpt}
          />
        </div>
      )}

      {/* Remaining posts in grid */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {rest.map((post, i) => (
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
      )}
    </section>
  );
}
