import { NextResponse } from "next/server";
import { ERR } from "@/lib/api/api-error";
import { createHash } from "crypto";
import type { NormalizedAPIResponse } from "@/types";
import { withSearchCache } from "@/lib/api/search-cache";

function createResultId(seed: string): string {
  return `mediawiki-${createHash("sha1").update(seed).digest("hex").slice(0, 12)}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return ERR.missingQuery();
  }

  try {
    const results = await withSearchCache(
      `mediawiki:${query.toLowerCase()}`,
      1000 * 60 * 15,
      async () => {
        const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&utf8=1&format=json&origin=*&srlimit=6&srsearch=${encodeURIComponent(query)}`;
        const res = await fetch(url, {
          headers: {
            "User-Agent": "EgyptianAwarenessLibrary/1.0 (orientation search)",
          },
          next: { revalidate: 900 },
        });

        if (!res.ok) {
          throw new Error(`MediaWiki API error: ${res.status}`);
        }

        const data = await res.json();
        const items = data.query?.search || [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return items.map((item: any): NormalizedAPIResponse => ({
          id: createResultId(String(item.pageid || item.title)),
          title: item.title || "Untitled page",
          sourceName: "Wikipedia / MediaWiki orientation layer",
          sourceType: "orientation",
          url: `https://en.wikipedia.org/?curid=${item.pageid}`,
          publishedAt: "Live wiki page",
          summary: "Orientation-only result for entity discovery and terminology lookup. Do not treat this as final proof without triangulating against primary or official sources.",
          trustBand: "C",
          module: "deepreal",
          tags: ["mediawiki", "orientation-only", "entity-discovery"],
          whyRecommended: "Framework §28 keeps MediaWiki in the stack for orientation and entity resolution, not final adjudication.",
        }));
      },
    );

    return NextResponse.json({ results });
  } catch (error) {
    console.error("MediaWiki Search Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orientation results from MediaWiki." },
      { status: 500 },
    );
  }
}
