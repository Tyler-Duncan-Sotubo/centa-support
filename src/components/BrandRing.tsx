/**
 * CentaHR's C-ring mark (coral ring, teal core, coral dot), drawn the same
 * way as in the app. Decorative unless given a label.
 */
export function BrandRing({
  className,
  label,
  size,
}: {
  className?: string;
  label?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 560 560"
      width={size}
      height={size}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      className={className}
    >
      <circle
        cx="280"
        cy="280"
        r="210"
        fill="none"
        stroke="#fe4b60"
        strokeWidth="70"
        strokeDasharray="1085 235"
        transform="rotate(32 280 280)"
      />
      <circle cx="280" cy="280" r="118" fill="#1c8792" />
      <circle cx="468" cy="280" r="34" fill="#fe4b60" />
    </svg>
  );
}
