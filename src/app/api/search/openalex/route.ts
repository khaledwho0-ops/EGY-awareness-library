import { NextResponse } from "next/server";
import { ERR } from "@/lib/api/api-error";
import { createHash } from "crypto";
import type { NormalizedAPIResponse } from "@/types";
import { withSearchCache } from "@/lib/api/search-cache";

function createResultId(seed: string): string {
  return `openalex-${createHash("sha1").update(seed).digest("hex").slice(0, 12)}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return ERR.missingQuery();
  }

  try {
    const results = await withSearchCache(
      `openalex:${query.toLowerCase()}`,
      1000 * 60 * 30,
      async () => {
        const url = `https://api.openalex.org/works?search=${encodeURIComponent(query)}&per-page=6&mailto=admin@egyptianawareness.local`;
        const res = await fetch(url, {
          headers: {
            "User-Agent": "EgyptianAwarenessLibrary/1.0 (research routing; mailto:admin@egyptianawareness.local)",
          },
          next: { revalidate: 1800 },
        });

        if (!res.ok) {
          throw new Error(`OpenAlex API error: ${res.status}`);
        }

        const data = await res.json();
        const items = data.results || [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return items.map((item: any): NormalizedAPIResponse => {
          const authorList = item.authorships?.slice(0, 3).map((entry: { author?: { display_name?: string } }) => entry.author?.display_name).filter(Boolean).join(", ") || "Unknown author";
          const title = item.display_name || "Untitled OpenAlex work";
          const year = item.publication_year ? String(item.publication_year) : "Unknown date";
          const sourceName = item.primary_location?.source?.display_name || "OpenAlex scholarly record";
          const urlValue = item.primary_location?.landing_page_url || item.doi || item.id || "https://openalex.org";
          const isOpenAccess = Boolean(item.open_access?.is_oa);
          const accessUrl =
            item.best_oa_location?.landing_page_url ||
            item.best_oa_location?.pdf_url ||
            item.primary_location?.landing_page_url ||
            item.doi ||
            item.id ||
            "https://openalex.org";

          return {
            id: createResultId(item.id || `${title}-${year}`),
            title,
            sourceName,
            sourceType: "journal",
            url: isOpenAccess ? accessUrl : urlValue,
            publishedAt: year,
            summary: `Authors: ${authorList}. Cited by: ${item.cited_by_count ?? 0}. Open access: ${item.open_access?.is_oa ? "yes" : "no"}.`,
            trustBand: item.primary_location?.source ? "A" : "B",
            module: "deepreal",
            tags: ["openalex", "scholarly-discovery", "works-search"],
            whyRecommended: "OpenAlex is the framework's second research-discovery layer for broader paper search beyond DOI metadata.",
            accessTier: isOpenAccess ? "free" : "paid",
            openAccess: isOpenAccess,
            accessNotes: isOpenAccess ? "OpenAlex flagged this work as open access." : "OpenAlex located the scholarly record, but full text may be limited.",
          };
        });
      },
    );

    return NextResponse.json({ results });
  } catch (error) {
    console.error("OpenAlex Search Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from OpenAlex." },
      { status: 500 },
    );
  }
}
