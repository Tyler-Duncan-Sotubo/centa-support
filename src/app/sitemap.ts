import type { MetadataRoute } from "next";

import { getContent } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { collections, articles } = await getContent();
  return [
    { url: SITE_URL },
    ...collections.map((collection) => ({ url: `${SITE_URL}/${collection.slug}` })),
    ...articles.map((article) => ({
      url: `${SITE_URL}${article.href}`,
      lastModified: article.updated,
    })),
    { url: `${SITE_URL}/contact` },
  ];
}
