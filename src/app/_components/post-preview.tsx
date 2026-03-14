import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
  index: number;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  index,
}: Props) {
  // Assign category based on slug for visual variety
  const isSiliconflow = slug.includes("siliconflow");
  const category = isSiliconflow ? "Cloud Platform" : "API Platform";
  const badgeClass = isSiliconflow ? "category-badge-cyan" : "category-badge-violet";

  return (
    <article
      className={`article-card animate-fade-in-up-delay-${index + 1}`}
      style={{ animationFillMode: 'forwards' }}
    >
      {/* Image */}
      <Link href={`/posts/${slug}`} className="block">
        <div className="card-image relative">
          <CoverImage slug={slug} title={title} src={coverImage} />
          {/* Gradient overlay on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-transparent to-transparent opacity-60" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 pt-4">
        {/* Category badge */}
        <div className="mb-4">
          <span className={`category-badge ${badgeClass}`}>
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl mb-3 leading-snug font-bold tracking-tight"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          <Link href={`/posts/${slug}`} className="hover:text-cyan-400 transition-colors duration-200">
            {title}
          </Link>
        </h3>

        {/* Date */}
        <div className="text-base text-zinc-500 mb-4" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          <DateFormatter dateString={date} />
        </div>

        {/* Excerpt */}
        <p className="text-lg leading-relaxed mb-6 text-zinc-400">{excerpt}</p>

        {/* Author */}
        <div className="pt-4 border-t border-white/5">
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </article>
  );
}
