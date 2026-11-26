import Link from "next/link";

import SetupSteps from "@/components/SetupSteps";
import { ChatButton } from "@/components/site/chat-button";
import { ModuleIcon, SiteFooter } from "@/components/site/parts";
import { SearchBox } from "@/components/site/search-box";
import { SiteHeader } from "@/components/site/site-header";
import { assertPaths, getCollections, getSetupSteps } from "@/lib/content";
import { POPULAR_GUIDES } from "@/lib/site";

const secondaryButton =
  "inline-flex min-h-11 shrink-0 items-center rounded-xl border-[1.5px] border-line bg-white px-5 text-[15px] font-semibold text-ink transition-colors hover:border-ink-3 hover:bg-tint";

export default async function HomePage() {
  const [collections, steps] = await Promise.all([getCollections(), getSetupSteps()]);
  await assertPaths(POPULAR_GUIDES.map((guide) => guide.href));

  return (
    <>
      <SiteHeader ring>
        <h1 className="sr-only">CentaHR help centre</h1>
        <div className="mx-auto flex max-w-[54rem] flex-col items-center gap-6 pb-2">
          <nav aria-label="Popular guides" className="flex flex-wrap justify-center gap-2.5">
            {POPULAR_GUIDES.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="inline-flex min-h-11 items-center rounded-full border border-panel-ink/35 px-4 text-[15px] font-semibold text-cream transition-colors hover:border-cream/70 hover:bg-white/[0.06]"
              >
                {guide.label}
              </Link>
            ))}
          </nav>
          <SearchBox size="lg" />
        </div>
      </SiteHeader>

      <main id="content">
        <section aria-labelledby="setup-title" className="border-b border-line-soft bg-canvas">
          <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2
                    id="setup-title"
                    className="font-display text-[1.75rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.9rem]"
                  >
                    Set up Performance in five steps
                  </h2>
                  <span className="rounded-full bg-coral-ink px-2.5 py-0.5 text-[13px] font-bold text-white">
                    New
                  </span>
                </div>
                <p className="mt-2 max-w-2xl text-[1.02rem] leading-relaxed text-ink-2">
                  From your first settings to your first finished appraisal cycle, with a drawing of
                  every screen you&apos;ll use.
                </p>
              </div>
              <Link href="/performance/overview" className={secondaryButton}>
                Read the overview
              </Link>
            </div>
            <SetupSteps steps={steps} />
          </div>
        </section>

        <section aria-labelledby="modules-title" className="bg-white">
          <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8">
            <h2
              id="modules-title"
              className="font-display text-[1.75rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.9rem]"
            >
              Guides by module
            </h2>
            <ul className="mt-7 flex flex-wrap justify-center gap-7">
              {collections.map((collection) => (
                <li
                  key={collection.slug}
                  className="flex min-w-0 basis-full sm:basis-[calc((100%_-_1.75rem)/2)] lg:basis-[calc((100%_-_3.5rem)/3)]"
                >
                  <Link
                    href={`/${collection.slug}`}
                    className="group flex w-full flex-col items-center rounded-2xl border border-line-soft bg-white px-8 pb-9 pt-12 text-center transition hover:border-primary hover:shadow-[0_10px_30px_-18px_rgba(0,98,111,0.45)]"
                  >
                    <ModuleIcon name={collection.icon} size={60} strokeWidth={1.4} className="mb-6 text-primary" />
                    <span className="font-display text-[1.3rem] font-semibold tracking-[-0.01em] text-ink transition-colors group-hover:text-primary">
                      {collection.title}
                    </span>
                    <span className="mt-2 max-w-[19rem] text-[1.05rem] leading-relaxed text-ink-2">
                      {collection.description}
                    </span>
                    <span className="mt-auto pt-5 text-[15px] tabular-nums text-ink-3">
                      {collection.count} {collection.count === 1 ? "article" : "articles"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-line-soft bg-canvas">
          <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-5 px-5 py-12 sm:px-8">
            <div>
              <h2 className="font-display text-[1.6rem] font-semibold tracking-[-0.02em] text-ink">
                Can&apos;t find what you need?
              </h2>
              <p className="mt-2 max-w-2xl text-[1.02rem] leading-relaxed text-ink-2">
                Chat with the CentaHR team. Tell us your company name and what you were trying to do.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <ChatButton />
              <Link href="/contact" className={secondaryButton}>
                Contact support
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
