import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { BrandRing } from "@/components/BrandRing";
import { APP_LOGIN_URL } from "@/lib/site";

/**
 * The deep-teal band at the top of every page: logo, account links, and
 * whatever the page puts under them (the search, on most pages).
 */
export function SiteHeader({ children, ring = false }: { children?: ReactNode; ring?: boolean }) {
  return (
    <header className="relative overflow-hidden bg-panel">
      {ring ? (
        <BrandRing className="pointer-events-none absolute -right-44 top-1/2 hidden size-[460px] -translate-y-1/2 lg:block" />
      ) : null}
      <div className="relative mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-5 pt-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 rounded-lg">
          <Image
            src="/img/centa-logo.png"
            alt="CentaHR"
            width={97}
            height={30}
            priority
            className="h-[30px] w-auto"
          />
          <span className="border-l border-white/15 pl-3 font-display text-[17px] font-semibold tracking-[-0.01em] text-cream">
            Help centre
          </span>
        </Link>
        <nav aria-label="Account" className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/contact"
            className="hidden rounded-lg px-3 py-2 text-[15px] font-semibold text-panel-ink transition-colors hover:text-cream sm:block"
          >
            Contact support
          </Link>
          <a
            href={APP_LOGIN_URL}
            className="inline-flex h-10 items-center rounded-xl bg-white px-4 text-[14.5px] font-semibold text-panel transition-colors hover:bg-cream"
          >
            Log in
          </a>
        </nav>
      </div>
      <div className="relative mx-auto max-w-[1180px] px-5 pb-10 pt-8 sm:px-8 sm:pb-12">
        {children}
      </div>
    </header>
  );
}
