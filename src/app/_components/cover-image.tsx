import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  if (!src) {
    return (
      <div className="sm:mx-0 bg-gradient-to-br from-zinc-800 to-zinc-900 h-[300px] md:h-[400px] flex items-center justify-center rounded-lg">
        <span className="text-zinc-600 text-sm font-mono tracking-wider uppercase">{title}</span>
      </div>
    );
  }
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("w-full object-cover", {
        "transition-transform duration-500 hover:scale-105": slug,
      })}
      width={1300}
      height={630}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
