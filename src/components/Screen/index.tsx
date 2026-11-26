import type { CSSProperties, ReactNode } from "react";
import clsx from "clsx";

import { BrandRing } from "../BrandRing";
import {
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  GridIcon,
  InboxIcon,
  MoreIcon,
  StarIcon,
  TargetIcon,
  UsersIcon,
} from "../Icons";
import styles from "./styles.module.css";

/**
 * Screen illustrations: simplified drawings of CentaHR pages, built from the
 * app's own colours, type and components. Labels match the app word for word.
 * Everything is static: nothing here can be clicked or focused.
 */

type ScreenProps = {
  /** What the drawing shows, read out by screen readers. */
  label: string;
  /** Where the page lives, as you'd click to it. */
  path?: string[];
  title?: string;
  description?: string;
  actions?: ReactNode;
  caption?: ReactNode;
  /** Show the app's menu rail on the left. */
  rail?: boolean;
  /** No page padding: for dialogs that cover the page. */
  bare?: boolean;
  children?: ReactNode;
};

export function Screen({
  label,
  path,
  title,
  description,
  actions,
  caption,
  rail = true,
  bare = false,
  children,
}: ScreenProps) {
  return (
    <figure className={styles.figure}>
      <div
        className={clsx(styles.frame, !rail && styles.noRail)}
        role="img"
        aria-label={label}
      >
        {rail ? <Rail /> : null}
        <div className={clsx(styles.main, bare && styles.bare)}>
          {path || title ? (
            <div className={styles.header}>
              <div className={styles.headText}>
                {path ? (
                  <div className={styles.crumbs}>{path.join(" › ")}</div>
                ) : null}
                {title ? <div className={styles.title}>{title}</div> : null}
                {description ? (
                  <div className={styles.desc}>{description}</div>
                ) : null}
              </div>
              {actions ? <div className={styles.actions}>{actions}</div> : null}
            </div>
          ) : null}
          <div className={styles.body}>{children}</div>
        </div>
      </div>
      {caption ? (
        <figcaption className={styles.caption}>{caption}</figcaption>
      ) : null}
    </figure>
  );
}

const RAIL_ICONS = [GridIcon, InboxIcon, UsersIcon, TargetIcon, ClockIcon, CalendarIcon];

function Rail() {
  return (
    <div className={styles.rail}>
      <BrandRing className={styles.railMark} />
      {RAIL_ICONS.map((Icon, i) => (
        <span key={i} className={clsx(styles.railItem, i === 3 && styles.railActive)}>
          <Icon size={16} />
        </span>
      ))}
    </div>
  );
}

export function Card({
  title,
  description,
  action,
  children,
  tight = false,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  children?: ReactNode;
  tight?: boolean;
}) {
  return (
    <div className={clsx(styles.card, tight && styles.cardTight)}>
      {title || action ? (
        <div className={styles.cardHead}>
          <div>
            {title ? <div className={styles.cardTitle}>{title}</div> : null}
            {description ? (
              <div className={styles.cardDesc}>{description}</div>
            ) : null}
          </div>
          {action}
        </div>
      ) : null}
      {children}
    </div>
  );
}

/** A setting: label and hint on the left, its control on the right. */
export function Row({
  label,
  hint,
  mark,
  children,
}: {
  label: ReactNode;
  hint?: ReactNode;
  mark?: number;
  children?: ReactNode;
}) {
  return (
    <div className={styles.row}>
      <div className={styles.rowText}>
        <div className={styles.rowLabel}>
          {mark !== undefined ? <Mark n={mark} /> : null}
          {label}
        </div>
        {hint ? <div className={styles.rowHint}>{hint}</div> : null}
      </div>
      {children ? <div className={styles.rowControl}>{children}</div> : null}
    </div>
  );
}

export function Toggle({ on = false }: { on?: boolean }) {
  return (
    <span className={clsx(styles.toggle, on && styles.toggleOn)}>
      <span className={styles.thumb} />
    </span>
  );
}

export function Select({
  value,
  placeholder,
  width,
}: {
  value?: ReactNode;
  placeholder?: string;
  width?: number | string;
}) {
  return (
    <span className={styles.input} style={width ? { width } : undefined}>
      <span className={value ? undefined : styles.placeholder}>
        {value ?? placeholder}
      </span>
      <ChevronDownIcon size={15} className={styles.chevron} />
    </span>
  );
}

export function Input({
  value,
  placeholder,
  width,
  tall = false,
}: {
  value?: ReactNode;
  placeholder?: string;
  width?: number | string;
  tall?: boolean;
}) {
  return (
    <span
      className={clsx(styles.input, tall && styles.textarea)}
      style={width ? { width } : undefined}
    >
      <span className={value ? undefined : styles.placeholder}>
        {value ?? placeholder}
      </span>
    </span>
  );
}

export function Button({
  children,
  variant = "primary",
  mark,
}: {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "light";
  mark?: number;
}) {
  return (
    <span className={styles.buttonWrap}>
      {mark !== undefined ? <Mark n={mark} /> : null}
      <span className={clsx(styles.button, styles[`button_${variant}`])}>
        {children}
      </span>
    </span>
  );
}

export function Tabs({
  items,
}: {
  items: { label: string; count?: number; active?: boolean; mark?: number }[];
}) {
  return (
    <div className={styles.tabs}>
      {items.map((tab) => (
        <span
          key={tab.label}
          className={clsx(styles.tab, tab.active && styles.tabActive)}
        >
          {tab.mark !== undefined ? <Mark n={tab.mark} /> : null}
          {tab.label}
          {tab.count !== undefined ? (
            <span className={styles.count}>{tab.count}</span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "success" | "warning" | "primary" | "violet" | "danger";
  children: ReactNode;
}) {
  return <span className={clsx(styles.badge, styles[`badge_${tone}`])}>{children}</span>;
}

export function Stars({ value }: { value: number }) {
  return (
    <span className={styles.stars}>
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          size={17}
          strokeWidth={1.6}
          className={star <= value ? styles.starOn : styles.starOff}
        />
      ))}
    </span>
  );
}

/** A form field: label above its control. */
export function Field({
  label,
  required = false,
  hint,
  mark,
  children,
}: {
  label: ReactNode;
  required?: boolean;
  hint?: ReactNode;
  mark?: number;
  children?: ReactNode;
}) {
  return (
    <div className={styles.field}>
      <div className={styles.fieldLabel}>
        {mark !== undefined ? <Mark n={mark} /> : null}
        {label}
        {required ? <span className={styles.required}>*</span> : null}
      </div>
      {children}
      {hint ? <div className={styles.fieldHint}>{hint}</div> : null}
    </div>
  );
}

export function Check({ checked = false, label }: { checked?: boolean; label: ReactNode }) {
  return (
    <span className={styles.choice}>
      <span className={clsx(styles.checkbox, checked && styles.checkboxOn)}>
        {checked ? <CheckIcon size={11} strokeWidth={3} /> : null}
      </span>
      {label}
    </span>
  );
}

export function Radio({ checked = false, label }: { checked?: boolean; label: ReactNode }) {
  return (
    <span className={styles.choice}>
      <span className={clsx(styles.radio, checked && styles.radioOn)} />
      {label}
    </span>
  );
}

export function Segmented({ items, active }: { items: string[]; active: string }) {
  return (
    <span className={styles.segmented}>
      {items.map((item) => (
        <span key={item} className={clsx(styles.segment, item === active && styles.segmentOn)}>
          {item}
        </span>
      ))}
    </span>
  );
}

/** A numbered marker; the text under the drawing explains each number. */
export function Mark({ n }: { n: number }) {
  return <span className={styles.mark}>{n}</span>;
}

/** Columns that stack on narrow screens. */
export function Columns({
  template = "1fr 1fr",
  children,
}: {
  template?: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.columns} style={{ "--cols": template } as CSSProperties}>
      {children}
    </div>
  );
}

export function Stack({ children, gap = 12 }: { children: ReactNode; gap?: number }) {
  return (
    <div className={styles.stack} style={{ gap }}>
      {children}
    </div>
  );
}

export function Inline({ children, gap = 8 }: { children: ReactNode; gap?: number }) {
  return (
    <div className={styles.inline} style={{ gap }}>
      {children}
    </div>
  );
}

/** Small secondary text inside a drawing. */
export function Meta({ children }: { children: ReactNode }) {
  return <span className={styles.meta}>{children}</span>;
}

export function Table({
  columns,
  head,
  rows,
}: {
  /** CSS grid template for the columns, e.g. "2fr 1fr 1fr". */
  columns: string;
  head: ReactNode[];
  rows: ReactNode[][];
}) {
  const style = { "--cols": columns } as CSSProperties;
  return (
    <div className={styles.tableScroll}>
      <div className={styles.table} style={style}>
        <div className={clsx(styles.tr, styles.th)}>
          {head.map((cell, i) => (
            <span key={i}>{cell}</span>
          ))}
        </div>
        {rows.map((row, r) => (
          <div key={r} className={styles.tr}>
            {row.map((cell, i) => (
              <span key={i}>{cell}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Person({ name, sub }: { name: string; sub?: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
  return (
    <span className={styles.person}>
      <span className={styles.avatar}>{initials}</span>
      <span className={styles.personText}>
        <span className={styles.personName}>{name}</span>
        {sub ? <span className={styles.meta}>{sub}</span> : null}
      </span>
    </span>
  );
}

export function More() {
  return (
    <span className={styles.more}>
      <MoreIcon size={16} />
    </span>
  );
}

export function Progress({ value }: { value: number }) {
  return (
    <span className={styles.progress}>
      <span className={styles.progressTrack}>
        <span className={styles.progressFill} style={{ width: `${value}%` }} />
      </span>
      <span className={styles.progressValue}>{value}%</span>
    </span>
  );
}

/** Horizontal bars, e.g. a score spread. */
export function Bars({
  rows,
  max,
  suffix = "",
}: {
  rows: { label: string; value: number }[];
  max: number;
  suffix?: string;
}) {
  return (
    <div className={styles.bars}>
      {rows.map((row) => (
        <div key={row.label} className={styles.barRow}>
          <span className={styles.barLabel}>{row.label}</span>
          <span className={styles.barTrack}>
            <span
              className={styles.barFill}
              style={{ width: `${Math.max(2, (row.value / max) * 100)}%` }}
            />
          </span>
          <span className={styles.barValue}>
            {row.value}
            {suffix}
          </span>
        </div>
      ))}
    </div>
  );
}

/** A dialog over a dimmed page. Use inside a bare Screen. */
export function Dialog({
  title,
  children,
  footer,
}: {
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className={styles.scrim}>
      <div className={styles.dialog}>
        <div className={styles.dialogTitle}>{title}</div>
        <div className={styles.dialogBody}>{children}</div>
        {footer ? <div className={styles.dialogFoot}>{footer}</div> : null}
      </div>
    </div>
  );
}

/** A list item with a check, e.g. an agenda item or a checklist row. */
export function Item({ done = false, children }: { done?: boolean; children: ReactNode }) {
  return (
    <div className={styles.item}>
      <span className={clsx(styles.checkbox, done && styles.checkboxOn)}>
        {done ? <CheckIcon size={11} strokeWidth={3} /> : null}
      </span>
      <span className={done ? styles.itemDone : undefined}>{children}</span>
    </div>
  );
}

/** A tick or a dash for yes/no cells. */
export function Yes({ on = true }: { on?: boolean }) {
  return on ? (
    <span className={styles.yes}>
      <CheckIcon size={14} strokeWidth={2.6} />
    </span>
  ) : (
    <span className={styles.no}>–</span>
  );
}

/** A selectable row in a list, e.g. a competency in the left column. */
export function ListRow({
  title,
  sub,
  active = false,
}: {
  title: ReactNode;
  sub?: ReactNode;
  active?: boolean;
}) {
  return (
    <div className={clsx(styles.listRow, active && styles.listRowActive)}>
      <span className={styles.listTitle}>{title}</span>
      {sub ? <span className={styles.meta}>{sub}</span> : null}
    </div>
  );
}

/** A big number with its label. */
export function Figure({ value, label }: { value: ReactNode; label: string }) {
  return (
    <span className={styles.figureStat}>
      <span className={styles.figureValue}>{value}</span>
      <span className={styles.meta}>{label}</span>
    </span>
  );
}

/** The deep-teal brand card the app uses for the current cycle. */
export function PanelCard({ children }: { children: ReactNode }) {
  return <div className={styles.panelCard}>{children}</div>;
}

/** A small heading inside a drawing. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return <div className={styles.sectionLabel}>{children}</div>;
}

/** An open dropdown menu. */
export function Menu({ items, mark }: { items: string[]; mark?: number }) {
  return (
    <div className={styles.menuWrap}>
      {mark !== undefined ? <Mark n={mark} /> : null}
      <div className={styles.menu}>
        {items.map((item) => (
          <span key={item} className={styles.menuItem}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/** A toast, as the app shows after an action. */
export function Toast({
  title,
  description,
  tone = "error",
}: {
  title: string;
  description?: string;
  tone?: "error" | "success";
}) {
  return (
    <div className={clsx(styles.toast, tone === "error" ? styles.toastError : styles.toastSuccess)}>
      <span className={styles.toastIcon}>{tone === "error" ? "!" : <CheckIcon size={13} strokeWidth={3} />}</span>
      <span className={styles.toastText}>
        <span className={styles.toastTitle}>{title}</span>
        {description ? <span className={styles.meta}>{description}</span> : null}
      </span>
    </div>
  );
}

/** A map with an office pin and the 100-metre circle people clock in within. */
export function MapBox({ caption = "100 m" }: { caption?: string }) {
  return (
    <div className={styles.map}>
      <span className={styles.mapRadius} />
      <span className={styles.mapRadiusLabel}>{caption}</span>
      <span className={styles.mapPin} />
    </div>
  );
}

/** The deep-teal menu of the employee portal or the dashboard. */
export function NavPanel({
  groups,
}: {
  groups: { label?: string; items: { label: string; active?: boolean }[] }[];
}) {
  return (
    <div className={styles.navPanel}>
      <BrandRing className={styles.navPanelMark} />
      {groups.map((group, i) => (
        <div key={group.label ?? i} className={styles.navGroup}>
          {group.label ? <span className={styles.navGroupLabel}>{group.label}</span> : null}
          {group.items.map((item) => (
            <span key={item.label} className={clsx(styles.navItem, item.active && styles.navItemActive)}>
              {item.label}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/** The sign-in screens: a deep-teal brand panel beside the form. */
export function AuthScreen({
  label,
  title,
  description,
  caption,
  children,
}: {
  label: string;
  title: string;
  description?: string;
  caption?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <figure className={styles.figure}>
      <div className={clsx(styles.frame, styles.noRail)} role="img" aria-label={label}>
        <div className={styles.auth}>
          <div className={styles.authAside}>
            <BrandRing className={styles.authRing} />
            <span className={styles.authBrand}>Centa</span>
          </div>
          <div className={styles.authMain}>
            <div className={styles.authTitle}>{title}</div>
            {description ? <div className={styles.desc}>{description}</div> : null}
            <div className={styles.authBody}>{children}</div>
          </div>
        </div>
      </div>
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
