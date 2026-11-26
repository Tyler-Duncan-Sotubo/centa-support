import type { ReactNode } from "react";
import clsx from "clsx";

const TONES = {
  note: "border-[#c4e0e3] bg-primary-soft",
  tip: "border-[#c9e7d6] bg-success-soft",
  warning: "border-[#f3d9a8] bg-warning-soft",
  danger: "border-danger-line bg-danger-soft",
} as const;

const FALLBACK_TITLES = {
  note: "Note",
  tip: "Tip",
  warning: "Before you do this",
  danger: "Be careful",
} as const;

/** A highlighted note inside an article. */
export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: keyof typeof TONES;
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className={clsx("callout my-6 rounded-2xl border px-5 py-4", TONES[type])}>
      <p className="callout-title text-[15px] font-semibold text-ink">
        {title ?? FALLBACK_TITLES[type]}
      </p>
      <div className="callout-body text-[15.5px]">{children}</div>
    </aside>
  );
}
