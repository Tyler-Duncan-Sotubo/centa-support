import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/components/mdx";

import { getLinkTargets, getSetupSteps, type Article } from "./index";

type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

type LinkCheckOptions = {
  from: string;
  paths: Set<string>;
  anchors: Map<string, Set<string>>;
};

/** Fails the build when an article links to a page or heading that doesn't exist. */
function rehypeCheckLinks({ from, paths, anchors }: LinkCheckOptions) {
  return (tree: unknown) => {
    const broken: string[] = [];
    const visit = (node: HastNode) => {
      if (node.type === "element" && node.tagName === "a") {
        const href = String(node.properties?.href ?? "");
        if (href.startsWith("/") || href.startsWith("#")) {
          const [path, hash] = href.split("#");
          const target = path || from;
          if (!paths.has(target)) broken.push(href);
          else if (hash && anchors.has(target) && !anchors.get(target)!.has(hash)) broken.push(href);
        }
      }
      node.children?.forEach(visit);
    };
    visit(tree as HastNode);
    if (broken.length) {
      throw new Error(`${from} links to pages or headings that don't exist: ${broken.join(", ")}`);
    }
  };
}

/** The article's MDX as React, with the help centre's components. */
export async function renderArticle(article: Article) {
  const [{ paths, anchors }, steps] = await Promise.all([getLinkTargets(), getSetupSteps()]);
  const { default: Content } = await evaluate(article.body, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeCheckLinks, { from: article.href, paths, anchors }]],
  });
  return <Content components={mdxComponents({ steps })} />;
}
