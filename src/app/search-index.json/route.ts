import { getSearchDocs } from "@/lib/content";

// Built once with the site; the search box loads it on first use.
export const dynamic = "force-static";

export async function GET() {
  return Response.json(await getSearchDocs());
}
