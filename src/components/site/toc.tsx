"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

import type { Heading } from "@/lib/content";

/** The article's headings; the one you're reading is highlighted. */
export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    const targets = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);
    if (!targets.length) return;

    // A heading becomes current once it reaches the top third of the screen.
    const observer = new IntersectionObserver(
      (entries) => {
        const reached = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (reached[0]) setActive(reached[0].target.id);
      },
      { rootMargin: "0px 0px -66% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav aria-label="On this page" className="text-[14px]">
      <p className="mb-3 font-semibold text-ink">On this page</p>
      <ul className="border-l border-line-soft">
        {headings.map((heading) => {
          const current = heading.id === active;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={() => setActive(heading.id)}
                aria-current={current ? "location" : undefined}
                className={clsx(
                  "-ml-px block border-l-2 py-1.5 pr-2 leading-snug transition-colors",
                  heading.depth === 3 ? "pl-7" : "pl-4",
                  current
                    ? "border-primary font-semibold text-primary"
                    : "border-transparent text-ink-3 hover:text-ink",
                )}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
