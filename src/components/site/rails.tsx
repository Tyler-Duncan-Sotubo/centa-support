import Link from "next/link";
import clsx from "clsx";

import { ChevronRightIcon } from "@/components/Icons";
import { getCollections, type Article } from "@/lib/content";

import { ModuleIcon } from "./parts";

const railLink = "block rounded-lg px-3 py-2 leading-snug transition-colors";
const railIdle = "text-ink-2 hover:bg-tint hover:text-ink";
const railCurrent = "bg-primary-soft font-semibold text-primary";

/** The other articles in this article's section, to move through a guide. */
export function SectionNav({
  title,
  articles,
  current,
  className,
}: {
  title: string;
  articles: Article[];
  current: string;
  className?: string;
}) {
  return (
    <nav aria-label={title} className={clsx("text-[14px]", className)}>
      <p className="mb-2 font-semibold text-ink">{title}</p>
      <ul className="space-y-0.5">
        {articles.map((article) => {
          const isCurrent = article.slug === current;
          return (
            <li key={article.slug}>
              <Link
                href={article.href}
                aria-current={isCurrent ? "page" : undefined}
                className={clsx(railLink, isCurrent ? railCurrent : railIdle)}
              >
                {article.navTitle ?? article.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Every module, for pages that aren't inside one article. */
export async function CollectionsNav({ current }: { current?: string }) {
  const collections = await getCollections();
  return (
    <nav aria-label="Collections" className="text-[14px]">
      <p className="mb-2 font-semibold text-ink">Collections</p>
      <ul className="space-y-0.5">
        {collections.map((collection) => {
          const isCurrent = collection.slug === current;
          return (
            <li key={collection.slug}>
              <Link
                href={`/${collection.slug}`}
                aria-current={isCurrent ? "page" : undefined}
                className={clsx(railLink, "flex items-center gap-3", isCurrent ? railCurrent : railIdle)}
              >
                <ModuleIcon name={collection.icon} size={18} />
                <span className="flex-1">{collection.title}</span>
                <span className="text-[12.5px] font-normal tabular-nums text-ink-3">{collection.count}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Previous and next articles in the collection's reading order. */
export function PrevNext({ previous, next }: { previous: Article | null; next: Article | null }) {
  if (!previous && !next) return null;
  const card =
    "group flex min-h-[84px] flex-col justify-center rounded-[20px] border border-line-soft bg-white px-6 py-4 transition-colors hover:border-primary";
  return (
    <nav aria-label="Previous and next articles" className="mt-6 grid gap-4 sm:grid-cols-2">
      {previous ? (
        <Link href={previous.href} className={card}>
          <span className="text-[13px] text-ink-3">Previous</span>
          <span className="mt-1 font-semibold leading-snug text-ink group-hover:text-primary">
            {previous.navTitle ?? previous.title}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next ? (
        <Link href={next.href} className={clsx(card, "sm:items-end sm:text-right")}>
          <span className="text-[13px] text-ink-3">Next</span>
          <span className="mt-1 flex items-center gap-1.5 font-semibold leading-snug text-ink group-hover:text-primary">
            {next.navTitle ?? next.title}
            <ChevronRightIcon size={16} className="shrink-0" />
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
