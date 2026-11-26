import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import Script from "next/script";

import { SITE_NAME, SITE_URL, ZENDESK_SNIPPET_URL } from "@/lib/site";

import "./globals.css";

// The dashboard's fonts: Figtree for text, Bricolage Grotesque for headings.
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description:
    "Guides for setting up and running HR in CentaHR, for HR teams, managers and employees.",
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    images: ["/img/social-card.jpg"],
  },
  twitter: { card: "summary_large_image", images: ["/img/social-card.jpg"] },
  // Dark Reader leaves the pages alone; the app is light only.
  other: { "darkreader-lock": "true" },
};

export const viewport: Viewport = {
  colorScheme: "only light",
  themeColor: "#0d3b41",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${figtree.variable} ${bricolage.variable}`}>
      <body>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        {children}
        <Script id="ze-snippet" src={ZENDESK_SNIPPET_URL} strategy="afterInteractive" />
      </body>
    </html>
  );
}
