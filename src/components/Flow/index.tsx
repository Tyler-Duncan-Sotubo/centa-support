import clsx from "clsx";

import styles from "./styles.module.css";

export type FlowStage = {
  title: string;
  text: string;
  /** Who acts: HR, Managers, Employees, or Automatic. */
  actors: string[];
};

const TONE: Record<string, string> = {
  HR: styles.hr,
  Managers: styles.managers,
  Employees: styles.employees,
  Automatic: styles.system,
};

/** Stages in order, each with who acts at that stage. */
export default function Flow({ stages }: { stages: FlowStage[] }) {
  return (
    <ol className={styles.flow}>
      {stages.map((stage, i) => (
        <li key={stage.title} className={styles.stage}>
          <span className={styles.node} aria-hidden="true">
            {i + 1}
          </span>
          <div className={styles.content}>
            <div className={styles.top}>
              <span className={styles.title}>{stage.title}</span>
              <span className={styles.actors}>
                {stage.actors.map((actor) => (
                  <span key={actor} className={clsx(styles.actor, TONE[actor] ?? styles.system)}>
                    {actor}
                  </span>
                ))}
              </span>
            </div>
            <p className={styles.text}>{stage.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
