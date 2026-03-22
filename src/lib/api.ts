import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Validate required fields
  const missing: string[] = [];
  if (!data.title) missing.push("title");
  if (!data.excerpt) missing.push("excerpt");
  // coverImage is optional — empty string is allowed
  if (data.coverImage && data.coverImage !== "") {
    // Check the image file actually exists on disk (skip check for external URLs)
    if (!data.coverImage.startsWith("http://") && !data.coverImage.startsWith("https://")) {
      const imgPath = join(process.cwd(), "public", data.coverImage);
      if (!fs.existsSync(imgPath)) {
        throw new Error(
          `Post "${realSlug}": coverImage "${data.coverImage}" not found at ${imgPath}. ` +
          `Add the image file to public/assets/blog/`
        );
      }
    }
  }
  // ogImage.url is optional — empty string is allowed
  if (!data.author?.name) missing.push("author.name");
  if (!data.author?.picture) missing.push("author.picture");

  if (missing.length > 0) {
    throw new Error(
      `Post "${realSlug}" is missing required fields:\n  - ${missing.join("\n  - ")}`
    );
  }

  // Gray-matter (yaml) can parse dates into Date objects, but our Post type expects a string.
  const date = data.date instanceof Date ? data.date.toISOString() : data.date;

  return { ...data, date, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
