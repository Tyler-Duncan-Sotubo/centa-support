import type { ReactNode } from "react";
import Link from "next/link";

import { ChatButton } from "./chat-button";
import { SiteFooter } from "./parts";
import { SearchBox } from "./search-box";
import { SiteHeader } from "./site-header";

/** Every page but the home page: the band with search, the page, the footer. */
export function PageShell({
  children,
  search = <SearchBox size="md" />,
  tone = "white",
}: {
  children: ReactNode;
  /** What sits in the band; the search box unless the page says otherwise. */
  search?: ReactNode;
  /** White for reading; canvas (light grey) behind pages made of cards. */
  tone?: "white" | "canvas";
}) {
  return (
    <>
      <SiteHeader>
        <div className="mx-auto max-w-3xl">{search}</div>
      </SiteHeader>
      <main id="content" className={tone === "canvas" ? "min-h-[50vh] bg-canvas" : "min-h-[50vh] bg-white"}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

/**
 * The page body, aligned with the band above it: it starts where the logo
 * starts and ends where Log in ends. Main content on the left; a rail on the
 * right (sticky, wide screens only).
 */
export function PageColumns({
  breadcrumbs,
  rail,
  children,
}: {
  breadcrumbs?: ReactNode;
  rail?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8">
      {breadcrumbs}
      <div
        className={
          rail
            ? "mt-5 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_260px]"
            : "mt-5"
        }
      >
        <div className="min-w-0">{children}</div>
        {rail ? (
          <aside className="sticky top-6 hidden max-h-[calc(100vh-3rem)] overflow-y-auto pb-6 lg:block">
            {rail}
          </aside>
        ) : null}
      </div>
    </div>
  );
}

/** The end of articles and other pages: a way to reach a person. */
export function HelpBox({ card = false }: { card?: boolean }) {
  return (
    <section
      aria-labelledby="help-title"
      className={
        card
          ? "mt-5 flex flex-wrap items-center justify-between gap-5 rounded-[20px] border border-line-soft bg-white px-6 py-7 sm:px-10"
          : "mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-line-soft pt-8"
      }
    >
      <div>
        <h2 id="help-title" className="font-display text-xl font-semibold tracking-[-0.01em] text-ink">
          Still need help?
        </h2>
        <p className="mt-1 text-[15.5px] text-ink-2">
          Chat with the CentaHR team, or{" "}
          <Link href="/contact" className="font-semibold text-primary underline-offset-4 hover:underline">
            see other ways to reach us
          </Link>
          .
        </p>
      </div>
      <ChatButton />
    </section>
  );
}
