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

export function FeaturedPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  const cat = getCategory(slug);

  return (
    <article className="featured-card">
      <Link href={`/posts/${slug}`} className="block">
        <div className="card-image relative">
          <CoverImage title={title} src={coverImage} />
          {/* Featured badge overlay */}
          <div className="absolute top-5 right-5 z-10 flex items-center gap-2.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75 featured-pulse" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400" />
            </span>
            <span className="text-xs font-body font-semibold text-white/90 tracking-wide">
              Featured
            </span>
          </div>
        </div>
      </Link>

      <div className="p-8 md:p-10">
        <div className="flex items-center gap-3 mb-4">
          <span className={`badge ${cat.badge}`}>{cat.label}</span>
          <span className="text-sm text-zinc-500 font-mono tracking-wider">
            <DateFormatter dateString={date} />
          </span>
        </div>

        <h3 className="font-display text-3xl md:text-4xl font-bold mb-4 leading-snug tracking-tight text-zinc-100 hover:text-white transition-colors duration-200">
          <Link href={`/posts/${slug}`}>{title}</Link>
        </h3>

        <p className="font-body text-base md:text-lg leading-relaxed text-zinc-400 mb-8 max-w-3xl">{excerpt}</p>

        <div className="pt-5 border-t border-white/5">
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </article>
  );
}
