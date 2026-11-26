import type { Metadata } from "next";
import { Suspense } from "react";

import { PageColumns, PageShell } from "@/components/site/page-shell";
import { CollectionsNav } from "@/components/site/rails";
import { SearchBox } from "@/components/site/search-box";
import { SearchResults, UrlSearchBox } from "@/components/site/search-results";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false },
};

export default function SearchPage() {
  return (
    <PageShell
      search={
        <Suspense fallback={<SearchBox size="md" />}>
          <UrlSearchBox />
        </Suspense>
      }
    >
      <PageColumns rail={<CollectionsNav />}>
        <Suspense fallback={<p className="pt-3 text-[15px] text-ink-3">Loading results…</p>}>
          <SearchResults />
        </Suspense>
      </PageColumns>
    </PageShell>
  );
}
