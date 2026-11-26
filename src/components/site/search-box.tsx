"use client";

import { useId, useState, type FormEvent, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import { SearchIcon } from "@/components/Icons";

import { useSearch } from "./use-search";

/**
 * The search on the deep-teal band. Shows matching articles as you type;
 * Enter opens the highlighted one, or the full results page.
 */
export function SearchBox({
  size = "md",
  defaultValue = "",
}: {
  size?: "lg" | "md";
  defaultValue?: string;
}) {
  const router = useRouter();
  const id = useId();
  const listId = `${id}-results`;
  const [query, setQuery] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const { hits, status } = useSearch(query, 6);
  const term = query.trim();
  const showList = open && term.length > 0;

  const go = (href: string) => {
    setOpen(false);
    setActive(-1);
    router.push(href);
  };
  const searchAll = () => {
    if (term) go(`/search?q=${encodeURIComponent(term)}`);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (active >= 0 && hits[active]) go(hits[active].href);
    else searchAll();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, hits.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, -1));
    } else if (event.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  };

  return (
    <form role="search" onSubmit={onSubmit} className="group relative w-full">
      <SearchIcon
        size={size === "lg" ? 24 : 21}
        strokeWidth={2}
        className={clsx(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 text-cream/85 group-focus-within:text-ink-3",
          size === "lg" ? "left-6" : "left-5",
        )}
      />
      <input
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
        aria-label="Search for articles"
        placeholder="Search for articles..."
        autoComplete="off"
        enterKeyHint="search"
        className={clsx(
          "w-full appearance-none border border-white/20 bg-white/10 text-cream transition-colors placeholder:text-cream/75 hover:bg-white/[0.14]",
          "focus:border-white focus:bg-white focus:text-ink focus:outline-none focus:ring-4 focus:ring-coral/40 focus:placeholder:text-ink-3",
          size === "lg"
            ? "h-[72px] rounded-[20px] pl-16 pr-6 text-[1.3rem]"
            : "h-14 rounded-2xl pl-14 pr-5 text-[1.05rem]",
        )}
      />

      {showList ? (
        <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-line-soft bg-white text-left text-ink shadow-[0_24px_60px_-20px_rgba(13,59,65,0.45)]">
          {hits.length ? (
            <ul id={listId} role="listbox" aria-label="Matching articles" className="py-1.5">
              {hits.map((hit, i) => (
                <li
                  key={hit.id}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(hit.href)}
                  className={clsx("cursor-pointer px-5 py-3", i === active && "bg-primary-soft")}
                >
                  <span className="block text-[15.5px] font-semibold leading-snug">{hit.title}</span>
                  <span className="mt-0.5 block text-[13px] text-ink-3">
                    {[hit.collection, hit.section].filter(Boolean).join(" › ")}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p id={listId} className="px-5 py-4 text-[15px] text-ink-2">
              {status === "error"
                ? "Search isn't available right now. Try again in a moment."
                : status === "ready"
                  ? `No articles match “${term}”. Try fewer or different words.`
                  : "Searching…"}
            </p>
          )}
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={searchAll}
            className="block w-full cursor-pointer border-t border-line-faint px-5 py-3 text-left text-[14.5px] font-semibold text-primary hover:bg-tint"
          >
            See all results for “{term}”
          </button>
        </div>
      ) : null}
    </form>
  );
}
