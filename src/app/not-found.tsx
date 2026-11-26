import type { Metadata } from "next";
import Link from "next/link";

import { PageColumns, PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <PageShell>
      <PageColumns>
        <section className="mx-auto max-w-xl py-12 text-center">
          <h1 className="font-display text-[2.1rem] font-semibold tracking-[-0.025em] text-ink">
            We couldn&apos;t find that page
          </h1>
          <p className="mt-3 text-[1.1rem] leading-relaxed text-ink-2">
            It may have moved. Search above, or start again from the help centre home.
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex h-11 items-center rounded-xl bg-primary px-5 text-[14.5px] font-semibold text-white shadow-[0_6px_16px_rgba(0,98,111,0.18)] transition-colors hover:bg-primary-hover"
          >
            Go to the help centre
          </Link>
        </section>
      </PageColumns>
    </PageShell>
  );
}
