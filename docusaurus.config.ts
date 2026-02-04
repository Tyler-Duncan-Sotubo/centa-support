import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import "dotenv/config";

const config: Config = {
  title: "CentaHR Support",
  tagline: "Product guides, how-tos, and troubleshooting",
  favicon: "img/favicon.ico",

  scripts: [
    {
      id: "ze-snippet",
      src: "https://static.zdassets.com/ekr/snippet.js?key=03695948-5585-4b5b-8422-d595bbd18af7",
      async: true,
    },
  ],

  future: {
    v4: true,
  },

  url: "https://support.centahr.com",
  baseUrl: "/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
          editUrl: undefined,
          breadcrumbs: true,
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },

    navbar: {
      title: "Support",
      logo: {
        alt: "CentaHR",
        src: "img/logo.svg",
      },
      items: [
        { to: "/intro", label: "Getting started", position: "left" },
        { to: "/contact", label: "Contact support", position: "right" },
      ],
    },

    footer: {
      style: "dark",
      links: [
        {
          title: "Help",
          items: [
            { label: "Getting started", to: "/intro" },
            { label: "All articles", to: "/" },
          ],
        },
        {
          title: "Company",
          items: [{ label: "Main site", href: "https://centahr.com" }],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CentaHR.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
