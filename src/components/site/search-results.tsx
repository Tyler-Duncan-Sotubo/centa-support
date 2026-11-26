"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { SearchBox } from "./search-box";
import { useSearch } from "./use-search";

/** The band's search box on the results page, filled with the query. */
export function UrlSearchBox() {
  const query = useSearchParams().get("q") ?? "";
  return <SearchBox key={query} size="md" defaultValue={query} />;
}

const heading =
  "font-display text-[2.1rem] font-semibold leading-tight tracking-[-0.025em] text-ink sm:text-[2.45rem]";

export function SearchResults() {
  const query = (useSearchParams().get("q") ?? "").trim();
  const { hits, status } = useSearch(query, 50);

  if (!query) {
    return (
      <section className="max-w-[46rem] pt-3">
        <h1 className={heading}>Search the help centre</h1>
        <p className="mt-3 text-[1.1rem] text-ink-2">
          Type what you&apos;re looking for in the search box above.
        </p>
      </section>
    );
  }

  return (
    <section aria-live="polite" className="max-w-[46rem] pt-3">
      <h1 className={heading}>Results for “{query}”</h1>
      <p className="mt-2 text-[15px] text-ink-3">
        {status === "ready"
          ? `${hits.length} ${hits.length === 1 ? "article" : "articles"}`
          : status === "loading"
            ? "Searching…"
            : ""}
      </p>

      {status === "error" ? (
        <p className="mt-6 text-[1.05rem] text-ink-2">
          Search isn&apos;t available right now. Try again in a moment.
        </p>
      ) : null}

      {status === "ready" && hits.length === 0 ? (
        <p className="mt-6 text-[1.05rem] text-ink-2">
          No articles match. Try fewer or different words, or{" "}
          <Link href="/" className="font-semibold text-primary underline-offset-4 hover:underline">
            browse the guides by module
          </Link>
          .
        </p>
      ) : null}

      {hits.length ? (
        <ul className="mt-6 divide-y divide-line-faint border-y border-line-faint">
          {hits.map((hit) => (
            <li key={hit.id}>
              <Link
                href={hit.href}
                className="group -mx-3 block rounded-xl px-3 py-5 transition-colors hover:bg-tint"
              >
                <span className="block text-[13px] text-ink-3">
                  {[hit.collection, hit.section].filter(Boolean).join(" › ")}
                </span>
                <span className="mt-1 block text-[17px] font-semibold leading-snug text-ink group-hover:text-primary">
                  {hit.title}
                </span>
                <span className="mt-1 block text-[15px] leading-relaxed text-ink-2">{hit.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
