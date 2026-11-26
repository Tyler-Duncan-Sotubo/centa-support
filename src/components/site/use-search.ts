"use client";

import { useEffect, useState } from "react";
import MiniSearch, { type SearchResult } from "minisearch";

import type { SearchDoc } from "@/lib/content";

export type Hit = {
  id: string;
  href: string;
  title: string;
  summary: string;
  collection: string;
  section: string;
};

type Status = "idle" | "loading" | "ready" | "error";

let loading: Promise<MiniSearch<SearchDoc>> | null = null;

/** Loads the search index once per visit, on first use. */
function loadIndex() {
  loading ??= fetch("/search-index.json")
    .then((response) => {
      if (!response.ok) throw new Error(`Search index returned ${response.status}`);
      return response.json() as Promise<SearchDoc[]>;
    })
    .then((docs) => {
      const index = new MiniSearch<SearchDoc>({
        fields: ["title", "headings", "summary", "text"],
        storeFields: ["href", "title", "summary", "collection", "section"],
        searchOptions: {
          boost: { title: 4, headings: 2, summary: 2 },
          prefix: true,
          fuzzy: 0.2,
        },
      });
      index.addAll(docs);
      return index;
    })
    .catch((error: unknown) => {
      loading = null; // try again next time
      throw error;
    });
  return loading;
}

function toHit(result: SearchResult): Hit {
  return {
    id: String(result.id),
    href: String(result.href),
    title: String(result.title),
    summary: String(result.summary),
    collection: String(result.collection),
    section: String(result.section ?? ""),
  };
}

/** Articles matching the query, best first. */
export function useSearch(query: string, limit: number) {
  const term = query.trim();
  const [result, setResult] = useState<{ term: string; hits: Hit[]; status: Status }>({
    term: "",
    hits: [],
    status: "idle",
  });

  useEffect(() => {
    if (!term) return;
    let cancelled = false;
    loadIndex().then(
      (index) => {
        if (cancelled) return;
        setResult({ term, hits: index.search(term).slice(0, limit).map(toHit), status: "ready" });
      },
      () => {
        if (!cancelled) setResult({ term, hits: [], status: "error" });
      },
    );
    return () => {
      cancelled = true;
    };
  }, [term, limit]);

  if (!term) return { hits: [] as Hit[], status: "idle" as Status };
  // While the new search runs, keep showing the last results.
  if (result.term !== term) return { hits: result.hits, status: "loading" as Status };
  return { hits: result.hits, status: result.status };
}
