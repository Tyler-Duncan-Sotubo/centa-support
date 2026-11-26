import Link from "next/link";

import { BrandRing } from "@/components/BrandRing";
import {
  CalendarIcon,
  ChevronRightIcon,
  ClockIcon,
  GridIcon,
  KeyIcon,
  TargetIcon,
  UsersIcon,
  WalletIcon,
} from "@/components/Icons";
import type { IconName } from "@/lib/content";
import { APP_LOGIN_URL, formatDate } from "@/lib/site";

const MODULE_ICONS = {
  target: TargetIcon,
  clock: ClockIcon,
  users: UsersIcon,
  key: KeyIcon,
  calendar: CalendarIcon,
  wallet: WalletIcon,
  grid: GridIcon,
} as const;

export function ModuleIcon({
  name,
  size = 24,
  strokeWidth = 1.8,
  className,
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const Icon = MODULE_ICONS[name];
  return <Icon size={size} strokeWidth={strokeWidth} className={className} />;
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px]">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-2">
            {i > 0 ? <ChevronRightIcon size={14} className="text-ink-4" /> : null}
            {item.href ? (
              <Link href={item.href} className="font-medium text-ink-2 hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-3">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Who wrote it and when it last changed. */
export function AuthorLine({ updated }: { updated: string }) {
  return (
    <div className="mt-6 flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-full border border-line-soft bg-white">
        <BrandRing size={24} />
      </span>
      <span className="flex flex-col text-[14px] leading-snug">
        <span className="font-semibold text-ink">Written by the CentaHR team</span>
        <span className="text-ink-3">Updated {formatDate(updated)}</span>
      </span>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line-soft bg-white">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-x-8 gap-y-4 px-5 py-8 sm:px-8">
        <div className="flex items-center gap-3">
          <BrandRing size={28} />
          <span className="text-[14px] text-ink-3">© {new Date().getFullYear()} CentaHR</span>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-[14.5px] font-semibold">
          <Link href="/contact" className="text-ink-2 hover:text-primary">
            Contact support
          </Link>
          <a href={APP_LOGIN_URL} className="text-ink-2 hover:text-primary">
            Log in to CentaHR
          </a>
          <a href="https://centahr.com" className="text-ink-2 hover:text-primary">
            centahr.com
          </a>
        </nav>
      </div>
    </footer>
  );
}
