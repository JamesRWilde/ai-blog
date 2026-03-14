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

const categoryMap: Record<string, { label: string; badge: string }> = {
  siliconflow: { label: "Cloud Platform", badge: "badge-cyan" },
  aimlapi: { label: "API Platform", badge: "badge-indigo" },
};

function getCategory(slug: string) {
  for (const [key, val] of Object.entries(categoryMap)) {
    if (slug.toLowerCase().includes(key)) return val;
  }
  return { label: "AI", badge: "badge-indigo" };
}

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  index,
}: Props) {
  const cat = getCategory(slug);

  return (
    <article className={`article-card anim-fade-up-d${Math.min(index + 1, 3)}`}>
      {/* Image */}
      <Link href={`/posts/${slug}`} className="block">
        <div className="card-image relative">
          <CoverImage slug={slug} title={title} src={coverImage} />
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 md:p-7">
        {/* Category + date row */}
        <div className="flex items-center gap-3 mb-4">
          <span className={`badge ${cat.badge}`}>{cat.label}</span>
          <span className="text-xs text-zinc-500 font-mono tracking-wider">
            <DateFormatter dateString={date} />
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold mb-3 leading-snug tracking-tight text-zinc-100 hover:text-white transition-colors duration-200">
          <Link href={`/posts/${slug}`}>
            {title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm md:text-base leading-relaxed text-zinc-400 mb-6 line-clamp-3">{excerpt}</p>

        {/* Author */}
        <div className="pt-4 border-t border-white/5">
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </article>
  );
}
