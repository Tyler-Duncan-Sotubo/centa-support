import type { ReactNode, FormEvent } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

type Module = {
  title: string;
  description: string;
  to: string;
};

const MODULES: Module[] = [
  {
    title: "Core HR",
    description: "Employee records, profiles, org structure.",
    to: "/core-hr",
  },
  {
    title: "Attendance",
    description: "Time tracking, timesheets, clock-in/out.",
    to: "/attendance",
  },
  {
    title: "Leave",
    description: "Requests, approvals, balances, policies.",
    to: "/leave",
  },
  {
    title: "Appraisals",
    description: "Performance reviews and feedback cycles.",
    to: "/appraisals",
  },
  {
    title: "Payroll",
    description: "Payslips, deductions, payroll outputs.",
    to: "/payroll",
  },
  // Add the rest of your 14 modules here
];

function HelpCenterHeader() {
  const { siteConfig } = useDocusaurusContext();

  function onSearchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.querySelector<HTMLInputElement>('input[name="q"]');
    const q = input?.value?.trim();
    if (!q) return;

    // If you later add local search or Algolia, you can route to their search page.
    // For now, just take users to docs where the search bar will be visible.
    window.location.href = `/docs/intro?query=${encodeURIComponent(q)}`;
  }

  return (
    <header className={clsx(styles.hero)}>
      <div className={clsx("container", styles.heroInner)}>
        <div className={styles.heroText}>
          <Heading as="h1" className={styles.title}>
            {siteConfig.title || "CentaHR Support"}
          </Heading>
          <p className={styles.subtitle}>
            Find guides, how-tos, and troubleshooting across all modules.
          </p>

          <form className={styles.search} onSubmit={onSearchSubmit}>
            <input
              className={styles.searchInput}
              name="q"
              type="search"
              placeholder="Search the help center…"
              aria-label="Search the help center"
            />
            <button className={styles.searchButton} type="submit">
              Search
            </button>
          </form>

          <div className={styles.quickLinks}>
            <Link className={styles.quickLink} to="/docs/intro">
              Getting started
            </Link>
            <Link className={styles.quickLink} to="/docs/faq">
              FAQs
            </Link>
            <Link className={styles.quickLink} to="/docs/troubleshooting">
              Troubleshooting
            </Link>
            <Link className={styles.quickLink} to="/docs/release-notes">
              Release notes
            </Link>
            <Link className={styles.quickLink} to="/docs/contact">
              Contact support
            </Link>
          </div>
        </div>

        <div className={styles.heroCard}>
          <div className={styles.heroCardInner}>
            <Heading as="h2" className={styles.cardTitle}>
              Popular articles
            </Heading>
            <ul className={styles.popularList}>
              <li>
                <Link to="/docs/appraisals/start-appraisals">
                  How employees can start appraisals
                </Link>
              </li>
              <li>
                <Link to="/docs/leave/request-leave">How to request leave</Link>
              </li>
              <li>
                <Link to="/docs/payroll/download-payslips">
                  How to download payslips
                </Link>
              </li>
            </ul>
            <div className={styles.cardFooter}>
              <Link className={styles.cardCta} to="/docs">
                Browse all articles →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function ModuleGrid() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Browse by module
        </Heading>
        <div className={styles.grid}>
          {MODULES.map((m) => (
            <Link key={m.title} to={m.to} className={styles.card}>
              <div className={styles.cardBody}>
                <Heading as="h3" className={styles.cardHeading}>
                  {m.title}
                </Heading>
                <p className={styles.cardDescription}>{m.description}</p>
              </div>
              <div className={styles.cardArrow}>→</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Support Center"
      description="CentaHR Support Center — product guides, how-tos, and troubleshooting."
    >
      <HelpCenterHeader />
      <main>
        <ModuleGrid />
      </main>
    </Layout>
  );
}
