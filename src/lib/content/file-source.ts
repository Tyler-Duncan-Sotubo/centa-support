import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

import type { Article, Collection, ContentSource } from "./types";

const ROOT = path.join(process.cwd(), "content");
const ARTICLES = path.join(ROOT, "articles");

function text(data: Record<string, unknown>, key: string, file: string, required = true) {
  const value = data[key];
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string" && value.trim()) return value.trim();
  if (required) throw new Error(`${file}: front matter needs "${key}"`);
  return undefined;
}

function toArticle(file: string, raw: string): Article {
  const { data, content } = matter(raw);
  const slug = path.relative(ARTICLES, file).split(path.sep).join("/").replace(/\.mdx$/, "");
  const order = Number(data.order);
  if (!Number.isFinite(order)) throw new Error(`${file}: front matter needs a numeric "order"`);
  return {
    slug,
    href: `/${slug}`,
    collection: slug.split("/")[0],
    section: text(data, "section", file)!,
    order,
    title: text(data, "title", file)!,
    navTitle: text(data, "navTitle", file, false),
    short: text(data, "short", file, false),
    summary: text(data, "summary", file)!,
    updated: text(data, "updated", file)!,
    body: content,
  };
}

/** Articles as MDX files under content/articles, one folder per collection. */
export const fileSource: ContentSource = {
  async collections() {
    const raw = await fs.readFile(path.join(ROOT, "collections.json"), "utf8");
    return JSON.parse(raw) as Collection[];
  },

  async articles() {
    const entries = await fs.readdir(ARTICLES, { recursive: true });
    const files = entries
      .filter((entry) => entry.endsWith(".mdx"))
      .map((entry) => path.join(ARTICLES, entry));
    return Promise.all(
      files.map(async (file) => toArticle(file, await fs.readFile(file, "utf8"))),
    );
  },
};
