import { cache } from "react";
import GithubSlugger from "github-slugger";

import { fileSource } from "./file-source";
import type { Article, Collection, ContentSource, Section } from "./types";

export type { Article, ArticleMeta, Collection, IconName, Section } from "./types";

// Swap for an API source when articles move into the admin.
const source: ContentSource = fileSource;

/** Pages that aren't collections or articles. */
const STATIC_PATHS = ["/", "/search", "/contact"];

type Content = { collections: Collection[]; articles: Article[] };

/** All collections and articles, checked and in display order. */
export const getContent = cache(async (): Promise<Content> => {
  const [collections, articles] = await Promise.all([
    source.collections(),
    source.articles(),
  ]);

  const bySlug = new Map(collections.map((collection) => [collection.slug, collection]));
  const seen = new Set<string>();
  for (const article of articles) {
    const collection = bySlug.get(article.collection);
    if (!collection) {
      throw new Error(`${article.slug}: there's no collection "${article.collection}"`);
    }
    if (!collection.sections.some((section) => section.id === article.section)) {
      throw new Error(`${article.slug}: ${collection.slug} has no section "${article.section}"`);
    }
    if (seen.has(article.slug)) throw new Error(`${article.slug}: listed twice`);
    seen.add(article.slug);
  }

  const rank = (article: Article) => {
    const collection = bySlug.get(article.collection)!;
    return [
      collections.indexOf(collection),
      collection.sections.findIndex((section) => section.id === article.section),
      article.order,
    ];
  };
  articles.sort((a, b) => {
    const [x, y] = [rank(a), rank(b)];
    for (let i = 0; i < x.length; i++) if (x[i] !== y[i]) return x[i] - y[i];
    return a.title.localeCompare(b.title);
  });

  return { collections, articles };
});

export type CollectionSummary = Collection & { count: number };

export async function getCollections(): Promise<CollectionSummary[]> {
  const { collections, articles } = await getContent();
  return collections.map((collection) => ({
    ...collection,
    count: articles.filter((article) => article.collection === collection.slug).length,
  }));
}

export async function getCollection(slug: string) {
  return (await getCollections()).find((collection) => collection.slug === slug) ?? null;
}

export async function getArticle(slug: string) {
  return (await getContent()).articles.find((article) => article.slug === slug) ?? null;
}

export type SectionWithArticles = Section & { articles: Article[] };

/** A collection's articles by section, in order. Empty sections are left out. */
export async function getSections(collection: Collection): Promise<SectionWithArticles[]> {
  const { articles } = await getContent();
  return collection.sections
    .map((section) => ({
      ...section,
      articles: articles.filter(
        (article) => article.collection === collection.slug && article.section === section.id,
      ),
    }))
    .filter((section) => section.articles.length);
}

/** The articles in the same section as this one, this one included, in order. */
export async function getSectionArticles(article: Article): Promise<Article[]> {
  const { articles } = await getContent();
  return articles.filter(
    (other) => other.collection === article.collection && other.section === article.section,
  );
}

/** The articles before and after this one in its collection's reading order. */
export async function getNeighbours(article: Article) {
  const { articles } = await getContent();
  const inCollection = articles.filter((other) => other.collection === article.collection);
  const i = inCollection.findIndex((other) => other.slug === article.slug);
  return {
    previous: i > 0 ? inCollection[i - 1] : null,
    next: i >= 0 && i < inCollection.length - 1 ? inCollection[i + 1] : null,
  };
}

export type SetupStep = { title: string; text: string; href: string };

/** The Performance setup steps, for the step track. */
export async function getSetupSteps(): Promise<SetupStep[]> {
  const { articles } = await getContent();
  return articles
    .filter((article) => article.collection === "performance" && article.section === "setup")
    .map((article) => ({
      title: article.navTitle ?? article.title,
      text: article.short ?? article.summary,
      href: article.href,
    }));
}

/** Markdown inline syntax removed, for headings and search. */
function plain(markdown: string) {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();
}

function headings(body: string) {
  return body
    .split("\n")
    .map((line) => /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line))
    .filter((match): match is RegExpExecArray => Boolean(match))
    .map((match) => ({ depth: match[1].length, text: plain(match[2]) }));
}

export type Heading = { id: string; text: string; depth: number };

/** Every heading with the id rehype-slug gives it (one slugger, in order). */
function slugHeadings(body: string): Heading[] {
  const slugger = new GithubSlugger();
  return headings(body).map((heading) => ({ ...heading, id: slugger.slug(heading.text) }));
}

/** The ids rehype-slug gives an article's headings, for checking #links. */
function headingIds(body: string) {
  return new Set(slugHeadings(body).map((heading) => heading.id));
}

/** The article's h2s and h3s, for "On this page". */
export function getHeadings(article: Article): Heading[] {
  return slugHeadings(article.body).filter((heading) => heading.depth === 2 || heading.depth === 3);
}

export type LinkTargets = { paths: Set<string>; anchors: Map<string, Set<string>> };

/** Every page on the site, and the anchors in each article. */
export const getLinkTargets = cache(async (): Promise<LinkTargets> => {
  const { collections, articles } = await getContent();
  const paths = new Set([
    ...STATIC_PATHS,
    ...collections.map((collection) => `/${collection.slug}`),
    ...articles.map((article) => article.href),
  ]);
  const anchors = new Map(articles.map((article) => [article.href, headingIds(article.body)]));
  return { paths, anchors };
});

/** Stops the build when a hard-coded link points nowhere. */
export async function assertPaths(hrefs: string[]) {
  const { paths } = await getLinkTargets();
  const broken = hrefs.filter((href) => !paths.has(href.split("#")[0]));
  if (broken.length) throw new Error(`Links to pages that don't exist: ${broken.join(", ")}`);
}

export type SearchDoc = {
  id: string;
  href: string;
  title: string;
  summary: string;
  collection: string;
  section: string;
  headings: string;
  text: string;
};

/** The article as plain words: drawings, markup and links removed. */
function toPlainText(body: string) {
  return body
    .replace(/<Screen[\s\S]*?<\/Screen>/g, " ")
    .replace(/<[A-Z][A-Za-z]*\b[^>]*\/>/g, " ")
    .replace(/<\/?[A-Za-z][^>]*>/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-+*]\s+\[[ xX]\]\s+/gm, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>|#]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** What the search box searches. */
export async function getSearchDocs(): Promise<SearchDoc[]> {
  const { collections, articles } = await getContent();
  return articles.map((article) => {
    const collection = collections.find((c) => c.slug === article.collection)!;
    const section = collection.sections.find((s) => s.id === article.section)!;
    return {
      id: article.slug,
      href: article.href,
      title: article.title,
      summary: article.summary,
      collection: collection.title,
      section: collection.sections.length > 1 ? section.title : "",
      headings: headings(article.body)
        .map((heading) => heading.text)
        .join(" "),
      text: toPlainText(article.body),
    };
  });
}
