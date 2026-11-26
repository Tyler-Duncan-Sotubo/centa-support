import Link from "next/link";

import { ChevronRightIcon } from "@/components/Icons";
import { getSections, type CollectionSummary } from "@/lib/content";

import { HelpBox, PageColumns, PageShell } from "./page-shell";
import { Breadcrumbs, ModuleIcon } from "./parts";
import { CollectionsNav } from "./rails";

/** A module's page: what it covers, then a card of articles per section. */
export async function CollectionView({ collection }: { collection: CollectionSummary }) {
  const sections = await getSections(collection);
  const titled = sections.length > 1;

  return (
    <PageShell tone="canvas">
      <PageColumns
        breadcrumbs={<Breadcrumbs items={[{ label: "All collections", href: "/" }, { label: collection.title }]} />}
        rail={<CollectionsNav current={collection.slug} />}
      >
        <section className="flex flex-col gap-5 rounded-[20px] border border-line-soft bg-white px-6 py-8 sm:flex-row sm:items-center sm:px-10">
          <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
            <ModuleIcon name={collection.icon} size={32} strokeWidth={1.6} />
          </span>
          <div>
            <h1 className="font-display text-[2rem] font-semibold leading-tight tracking-[-0.025em] text-ink sm:text-[2.3rem]">
              {collection.title}
            </h1>
            <p className="mt-1.5 text-[1.05rem] leading-relaxed text-ink-2">{collection.description}</p>
            <p className="mt-2 text-[14px] text-ink-3">
              {collection.count} {collection.count === 1 ? "article" : "articles"}, written by the
              CentaHR team
            </p>
          </div>
        </section>

        {sections.map((section) => (
          <section
            key={section.id}
            aria-label={titled ? undefined : `${collection.title} articles`}
            aria-labelledby={titled ? `section-${section.id}` : undefined}
            className="mt-5 rounded-[20px] border border-line-soft bg-white py-3"
          >
            {titled ? (
              <h2
                id={`section-${section.id}`}
                className="px-6 pb-1 pt-4 font-display text-[1.2rem] font-semibold tracking-[-0.01em] text-ink sm:px-10"
              >
                {section.title}
              </h2>
            ) : null}
            <ul className="divide-y divide-line-faint px-2 sm:px-6">
              {section.articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={article.href}
                    className="group flex items-center gap-4 rounded-xl px-4 py-4 transition-colors hover:bg-tint"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-[16px] font-semibold leading-snug text-ink group-hover:text-primary">
                        {article.title}
                      </span>
                      <span className="mt-1 block text-[14.5px] leading-relaxed text-ink-3">
                        {article.summary}
                      </span>
                    </span>
                    <ChevronRightIcon size={18} className="shrink-0 text-ink-4 group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <HelpBox card />
      </PageColumns>
    </PageShell>
  );
}
