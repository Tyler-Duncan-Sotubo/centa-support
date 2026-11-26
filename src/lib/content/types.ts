export type IconName = "target" | "clock" | "users" | "key" | "calendar" | "wallet" | "grid";

export type Section = { id: string; title: string };

/** A group of articles, e.g. Performance. */
export type Collection = {
  slug: string;
  title: string;
  description: string;
  icon: IconName;
  /** In the order they're shown. */
  sections: Section[];
};

export type ArticleMeta = {
  /** Path without a leading slash, e.g. "performance/setup/general-settings". */
  slug: string;
  /** The page address, e.g. "/performance/setup/general-settings". */
  href: string;
  /** The collection's slug: the first part of the path. */
  collection: string;
  /** A section id from the collection. */
  section: string;
  /** Position within its section. */
  order: number;
  title: string;
  /** A shorter title for breadcrumbs and step lists. */
  navTitle?: string;
  /** One line for step lists. */
  short?: string;
  summary: string;
  /** YYYY-MM-DD. */
  updated: string;
};

export type Article = ArticleMeta & {
  /** The article as MDX. */
  body: string;
};

/**
 * Where articles come from. Today: MDX files in content/. Later: the CentaHR
 * API, for articles managed in the admin. Pages only use src/lib/content,
 * so changing the source doesn't touch them.
 */
export interface ContentSource {
  collections(): Promise<Collection[]>;
  articles(): Promise<Article[]>;
}
