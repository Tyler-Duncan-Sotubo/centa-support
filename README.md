# CentaHR Help Centre

The help centre at support.centahr.com: a Next.js app (same version and setup as the dashboard) laid out like most help centres. A home page with search and module cards, a page per module listing its articles, and one page per article.

## Run it

```bash
npm install
npm run dev        # http://localhost:3001 (3000 is the dashboard)
npm run build      # also fails on any broken link between articles
npm start          # serves the build; uses $PORT when it's set
npm run lint
npm run typecheck
```

## Where things live

| Path | What it is |
| --- | --- |
| `content/collections.json` | The modules (collections): title, description, icon, and their sections in order |
| `content/articles/<collection>/…/*.mdx` | One file per article. The path is the page address. |
| `public/img/` | Images used in articles |
| `src/lib/content/` | Reads collections and articles, builds search, checks links. Pages only use this. |
| `src/components/Screen/` | The drawings of CentaHR screens used in articles |
| `src/app/` | The pages |

## Add an article

Create `content/articles/<collection>/<name>.mdx`:

```mdx
---
title: "Step 1: General settings"
summary: "One sentence on what the article answers. Shown under the title and in lists."
section: "setup"          # a section id from collections.json
order: 1                  # position within the section
updated: "2026-11-26"
navTitle: "General settings"   # optional: shorter title for breadcrumbs
short: "Cycle length and automatic appraisals."   # optional: one line for step lists
---

Article text in Markdown.
```

Articles can use, without importing:

- `<Screen>`, `<Card>`, `<Row>`, `<Toggle>`, `<Button>`, `<Dialog>` and the rest of `src/components/Screen` to draw a screen
- `<Callout type="tip|note|warning|danger" title="…">…</Callout>` for highlighted notes
- `<CycleFlow />` and `<SetupSteps />`

Link to other articles by their address, e.g. `[step 3](/performance/setup/review-templates#create-a-template)`. The build stops if a link points to a page or heading that doesn't exist.

## Articles from the admin, later

Pages get everything through `src/lib/content`, which reads from a `ContentSource` (`src/lib/content/types.ts`). Today that's `file-source.ts`. To manage articles in the CentaHR admin, add a source that fetches collections and articles from the backend and select it in `src/lib/content/index.ts`; the pages don't change. Articles written in the admin should be plain Markdown rather than MDX, since MDX can run code when it's rendered.
