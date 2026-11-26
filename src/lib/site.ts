export const SITE_URL = "https://support.centahr.com";
export const SITE_NAME = "CentaHR Help Centre";
export const APP_LOGIN_URL = "https://app.centahr.com/login";

/** The Zendesk chat widget the site has always loaded. */
export const ZENDESK_SNIPPET_URL =
  "https://static.zdassets.com/ekr/snippet.js?key=03695948-5585-4b5b-8422-d595bbd18af7";

/** Shown above the search on the home page. */
export const POPULAR_GUIDES = [
  { label: "Set up Performance", href: "/performance/setup/general-settings" },
  { label: "Clock in and out", href: "/attendance/employee-clock-in-out" },
  { label: "Fix an expired reset link", href: "/troubleshooting/password-reset-token-expired" },
];

/** "2026-11-26" as "26 November 2026". */
export function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
