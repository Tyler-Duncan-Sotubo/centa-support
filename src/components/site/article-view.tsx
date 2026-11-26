import {
  getHeadings,
  getNeighbours,
  getSectionArticles,
  type Article,
  type Collection,
} from "@/lib/content";
import { renderArticle } from "@/lib/content/render";

import { HelpBox, PageColumns, PageShell } from "./page-shell";
import { AuthorLine, Breadcrumbs } from "./parts";
import { PrevNext, SectionNav } from "./rails";
import { TableOfContents } from "./toc";

/**
 * One article on a white page: the text on the left, aligned with the logo;
 * "On this page" and the rest of its section on the right, aligned with Log in.
 */
export async function ArticleView({ article, collection }: { article: Article; collection: Collection }) {
  const [content, sectionArticles, neighbours] = await Promise.all([
    renderArticle(article),
    getSectionArticles(article),
    getNeighbours(article),
  ]);
  const headings = getHeadings(article);
  const showToc = headings.length > 1;
  const section = collection.sections.find((s) => s.id === article.section);
  const sectionTitle = collection.sections.length > 1 && section ? section.title : collection.title;

  return (
    <PageShell>
      <PageColumns
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "All collections", href: "/" },
              { label: collection.title, href: `/${collection.slug}` },
              { label: article.navTitle ?? article.title },
            ]}
          />
        }
        rail={
          <>
            {showToc ? <TableOfContents headings={headings} /> : null}
            <SectionNav
              title={sectionTitle}
              articles={sectionArticles}
              current={article.slug}
              className={showToc ? "mt-9" : undefined}
            />
          </>
        }
      >
        <article className="max-w-[46rem] pt-3">
          <h1 className="text-balance font-display text-[2.1rem] font-semibold leading-[1.15] tracking-[-0.025em] text-ink sm:text-[2.45rem]">
            {article.title}
          </h1>
          <p className="mt-3 text-[1.15rem] leading-relaxed text-ink-2">{article.summary}</p>
          <AuthorLine updated={article.updated} />
          <div className="article mt-8 border-t border-line-soft pt-8">{content}</div>
        </article>

        <div className="max-w-[46rem]">
          <PrevNext previous={neighbours.previous} next={neighbours.next} />
          {/* The rail is hidden on narrow screens; the section list moves here. */}
          <SectionNav
            title={sectionTitle}
            articles={sectionArticles}
            current={article.slug}
            className="mt-10 lg:hidden"
          />
          <HelpBox />
        </div>
      </PageColumns>
    </PageShell>
  );
}
