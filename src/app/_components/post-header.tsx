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

const categoryMap: Record<string, { label: string; badge: string }> = {
  siliconflow: { label: "Cloud Platform", badge: "badge-cyan" },
  aimlapi: { label: "API Platform", badge: "badge-indigo" },
};

function getCategory(title: string) {
  const lower = title.toLowerCase();
  for (const [key, val] of Object.entries(categoryMap)) {
    if (lower.includes(key)) return val;
  }
  return { label: "AI", badge: "badge-indigo" };
}

export function PostHeader({ title, coverImage, date, author }: Props) {
  const cat = getCategory(title);

  return (
    <>
      <div className="mb-6">
        <span className={`badge ${cat.badge}`}>{cat.label}</span>
      </div>

      <PostTitle>{title}</PostTitle>

      <div className="flex flex-wrap items-center gap-5 mt-8 mb-10 pb-10 border-b border-white/5">
        <Avatar name={author.name} picture={author.picture} />
        <div className="w-px h-4 bg-white/10" />
        <span className="text-sm text-zinc-500 font-mono tracking-wider">
          <DateFormatter dateString={date} />
        </span>
      </div>

      <div className="mb-14 rounded-2xl overflow-hidden border border-white/5 shadow-2xl shadow-black/40">
        <CoverImage title={title} src={coverImage} />
      </div>
    </>
  );
}
