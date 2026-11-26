import type { ReactNode, SVGProps } from "react";

/**
 * A few icons from the CentaHR app's own set (24px grid, round caps,
 * currentColor stroke), so the help centre looks like the product.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function icon(body: ReactNode) {
  return function Icon({ size = 20, strokeWidth = 1.8, ...props }: IconProps) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        {body}
      </svg>
    );
  };
}

export const TargetIcon = icon(
  <>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" />
  </>,
);

export const ClockIcon = icon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>,
);

export const UsersIcon = icon(
  <>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
    <circle cx="17" cy="9" r="2.5" />
    <path d="M16 14.2a5 5 0 0 1 5.5 4.8" />
  </>,
);

export const KeyIcon = icon(
  <>
    <circle cx="8" cy="15" r="4" />
    <path d="m10.8 12.2 8.2-8.2" />
    <path d="m17 6 3 3" />
    <path d="m15 8 2 2" />
  </>,
);

export const GridIcon = icon(
  <>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </>,
);

export const CalendarIcon = icon(
  <>
    <rect x="3" y="5" width="18" height="16" rx="2.5" />
    <path d="M3 10h18" />
    <path d="M8 3v4" />
    <path d="M16 3v4" />
  </>,
);

export const InboxIcon = icon(
  <>
    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
    <path d="M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.1z" />
  </>,
);

export const ChecklistIcon = icon(
  <>
    <path d="M10 6h10" />
    <path d="M10 12h10" />
    <path d="M10 18h10" />
    <path d="m3 6 1.5 1.5L7 5" />
    <path d="m3 12 1.5 1.5L7 11" />
    <path d="M4 18h2" />
  </>,
);

export const MessageIcon = icon(
  <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H9l-5 4z" />,
);

export const StarIcon = icon(
  <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z" />,
);

export const CheckIcon = icon(<path d="M20 6 9 17l-5-5" />);

export const ChevronDownIcon = icon(<path d="m6 9 6 6 6-6" />);

export const ChevronRightIcon = icon(<path d="m9 18 6-6-6-6" />);

export const MoreIcon = icon(
  <>
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="19" r="1" />
  </>,
);

export const WalletIcon = icon(
  <>
    <path d="M3 7a2 2 0 0 1 2-2h12v3" />
    <rect x="3" y="7" width="18" height="13" rx="2.5" />
    <path d="M16 13.5h2" />
  </>,
);

export const SearchIcon = icon(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </>,
);

export const PlusIcon = icon(
  <>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </>,
);
