import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content");

type RawPostData = {
  title: string;
  date: string;
  country: string;
  type: string;
  image: string;
  tags?: string[] | string;
  description?: string;
};

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  country: string;
  type: string;
  image: string;
  tags: string[];
  year: number;
  description: string;
};

export type PostWithContent = PostMeta & {
  content: string;
};

function normalizeTags(tags: string[] | string | undefined) {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.map((tag) => String(tag).trim()).filter(Boolean);
  return String(tags)
    .split(/[,\n]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function normalizeDate(value: unknown) {
  if (value instanceof Date) {
    return value.toISOString().split("T")[0];
  }
  return String(value);
}

function normalizePostMeta(slug: string, data: RawPostData): PostMeta {
  const date = normalizeDate(data.date);
  const year = Number(date.slice(0, 4));

  return {
    slug,
    title: String(data.title || slug),
    date,
    country: String(data.country || "-").trim(),
    type: String(data.type || "-").trim(),
    image: String(data.image || ""),
    tags: normalizeTags(data.tags),
    year: Number.isNaN(year) ? new Date().getFullYear() : year,
    description:
      String(data.description || "") ||
      String(data.title || slug) + " の研究ノートです。",
  };
}

export function getPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return normalizePostMeta(slug, data as RawPostData);
  });

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): PostWithContent {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  console.log("[getPost] slug", slug);
  console.log("[getPost] data", data);

  return {
    ...normalizePostMeta(slug, data as RawPostData),
    content,
  };
}

export function getAllCountries() {
  return Array.from(new Set(getPosts().map((post) => post.country))).filter(Boolean);
}

export function getAllTypes() {
  return Array.from(new Set(getPosts().map((post) => post.type))).filter(Boolean);
}

export function getAllYears() {
  return Array.from(new Set(getPosts().map((post) => post.year))).sort((a, b) => b - a);
}

export function getPostsByField(field: "country" | "type", value: string) {
  return getPosts().filter((post) => post[field] === value);
}

export function getPostsByYear(year: number) {
  return getPosts().filter((post) => post.year === year);
}