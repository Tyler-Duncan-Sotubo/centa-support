import type { Metadata } from "next";
import Link from "next/link";

import { ChatButton } from "@/components/site/chat-button";
import { PageColumns, PageShell } from "@/components/site/page-shell";
import { Breadcrumbs } from "@/components/site/parts";
import { CollectionsNav } from "@/components/site/rails";
import { assertPaths } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact support",
  description: "How to reach the CentaHR team when a guide doesn't answer your question.",
};

export default async function ContactPage() {
  await assertPaths(["/performance/troubleshooting", "/troubleshooting"]);

  return (
    <PageShell>
      <PageColumns
        breadcrumbs={<Breadcrumbs items={[{ label: "All collections", href: "/" }, { label: "Contact support" }]} />}
        rail={<CollectionsNav />}
      >
        <article className="max-w-[46rem] pt-3">
          <h1 className="font-display text-[2.1rem] font-semibold leading-tight tracking-[-0.025em] text-ink sm:text-[2.45rem]">
            Contact support
          </h1>
          <p className="mt-3 text-[1.15rem] leading-relaxed text-ink-2">
            The quickest way to reach the CentaHR team is the chat, from any page in this help centre.
          </p>
          <div className="mt-6">
            <ChatButton />
          </div>

          <div className="article mt-9 border-t border-line-soft pt-8">
            <h2>Help us answer in one go</h2>
            <ul>
              <li>Your company name</li>
              <li>
                The module and page you were on, for example{" "}
                <strong>Performance → Settings → Templates</strong>
              </li>
              <li>What you were trying to do, and what happened instead</li>
              <li>A screenshot, if you can take one</li>
            </ul>
            <p>
              If you manage CentaHR for your company, check{" "}
              <Link href="/performance/troubleshooting">Troubleshooting Performance</Link> or the{" "}
              <Link href="/troubleshooting">Troubleshooting</Link> collection first: most setup
              questions are answered there.
            </p>
          </div>
        </article>
      </PageColumns>
    </PageShell>
  );
}
