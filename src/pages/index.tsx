import type { ReactNode, FormEvent } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HelpCenterHeader() {
  const { siteConfig } = useDocusaurusContext();

  function onSearchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // For now, just take users to the docs root
    window.location.href = "/";
  }

  return (
    <header className={clsx(styles.hero)}>
      <div className={clsx("container", styles.heroInner)}>
        <div className={styles.heroText}>
          <Heading as="h1" className={styles.title}>
            {siteConfig.title || "CentaHR Support"}
          </Heading>
          <p className={styles.subtitle}>
            Find guides, how-tos, and troubleshooting across CentaHR.
          </p>

          <form className={styles.search} onSubmit={onSearchSubmit}>
            <input
              className={styles.searchInput}
              name="q"
              type="search"
              placeholder="Search the help center…"
              aria-label="Search the help center"
              disabled
            />
            <button className={styles.searchButton} type="submit" disabled>
              Search
            </button>
          </form>

          <div className={styles.quickLinks}>
            <Link className={styles.quickLink} to="/intro">
              Getting started
            </Link>
            <Link
              className={styles.quickLink}
              to="/attendance/employee-clock-in-out"
            >
              Clock in and clock out
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
                <Link to="/attendance/employee-clock-in-out">
                  Employee clock in and clock out
                </Link>
              </li>
              <li>
                <Link to="/attendance/not-at-assigned-location">
                  Clock in blocked due to location
                </Link>
              </li>
            </ul>
            <div className={styles.cardFooter}>
              <Link className={styles.cardCta} to="/">
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
          <Link to="/attendance/overview" className={styles.card}>
            <div className={styles.cardBody}>
              <Heading as="h3" className={styles.cardHeading}>
                Attendance
              </Heading>
              <p className={styles.cardDescription}>
                Time tracking, clock-in/out, and attendance rules.
              </p>
            </div>
            <div className={styles.cardArrow}>→</div>
          </Link>
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
