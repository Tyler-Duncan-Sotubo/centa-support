import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleView } from "@/components/site/article-view";
import { CollectionView } from "@/components/site/collection-view";
import { getArticle, getCollection, getContent } from "@/lib/content";

type Props = { params: Promise<{ slug: string[] }> };

// Every collection and article is built ahead; anything else is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  const { collections, articles } = await getContent();
  return [
    ...collections.map((collection) => ({ slug: [collection.slug] })),
    ...articles.map((article) => ({ slug: article.slug.split("/") })),
  ];
}

/** A one-part path is a collection; anything longer is an article. */
async function findPage(slug: string[]) {
  const path = slug.join("/");
  if (slug.length === 1) {
    const collection = await getCollection(path);
    return collection ? ({ kind: "collection", collection } as const) : null;
  }
  const article = await getArticle(path);
  if (!article) return null;
  const collection = await getCollection(article.collection);
  return collection ? ({ kind: "article", article, collection } as const) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await findPage((await params).slug);
  if (!page) return {};
  if (page.kind === "collection") {
    return {
      title: page.collection.title,
      description: page.collection.description,
      alternates: { canonical: `/${page.collection.slug}` },
    };
  }
  return {
    title: page.article.title,
    description: page.article.summary,
    alternates: { canonical: page.article.href },
    openGraph: {
      type: "article",
      title: page.article.title,
      description: page.article.summary,
      modifiedTime: page.article.updated,
    },
  };
}

export default async function Page({ params }: Props) {
  const page = await findPage((await params).slug);
  if (!page) notFound();
  return page.kind === "collection" ? (
    <CollectionView collection={page.collection} />
  ) : (
    <ArticleView article={page.article} collection={page.collection} />
  );
}
