import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
};

export function PostHeader({ title, coverImage, date, author }: Props) {
  // Determine category from title
  const isSiliconflow = title.toLowerCase().includes("siliconflow");
  const category = isSiliconflow ? "Cloud Platform" : "API Platform";
  const badgeClass = isSiliconflow ? "category-badge-cyan" : "category-badge-violet";

  return (
    <>
      {/* Category badge */}
      <div className="mb-6">
        <span className={`category-badge ${badgeClass}`}>{category}</span>
      </div>

      {/* Title */}
      <PostTitle>{title}</PostTitle>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-6 mb-10 pb-10 border-b border-white/5">
        <Avatar name={author.name} picture={author.picture} />
        <div className="flex items-center gap-2 text-zinc-500" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          <DateFormatter dateString={date} />
        </div>
      </div>

      {/* Cover image */}
      <div className="mb-12 rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
        <CoverImage title={title} src={coverImage} />
      </div>
    </>
  );
}
