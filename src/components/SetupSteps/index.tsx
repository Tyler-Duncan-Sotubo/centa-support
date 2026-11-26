import Link from "next/link";
import clsx from "clsx";

import type { SetupStep } from "@/lib/content";

import styles from "./styles.module.css";

/** The Performance setup steps as a track; stacks on narrow screens. */
export default function SetupSteps({
  steps,
  tone = "light",
}: {
  steps: SetupStep[];
  tone?: "light" | "panel";
}) {
  return (
    <ol className={clsx(styles.track, tone === "panel" && styles.onPanel)}>
      {steps.map((step, i) => (
        <li key={step.href} className={styles.step}>
          <span className={styles.number} aria-hidden="true">
            {i + 1}
          </span>
          <Link href={step.href} className={styles.link}>
            <span className={styles.title}>
              <span className="sr-only">Step {i + 1}: </span>
              {step.title}
            </span>
            <span className={styles.text}>{step.text}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
