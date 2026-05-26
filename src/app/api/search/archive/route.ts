import { NextResponse } from "next/server";
import { ERR } from "@/lib/api/api-error";
import { createHash } from "crypto";
import type { NormalizedAPIResponse } from "@/types";
import { withSearchCache } from "@/lib/api/search-cache";

function createResultId(seed: string): string {
  return `archive-${createHash("sha1").update(seed).digest("hex").slice(0, 12)}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return ERR.missingQuery();
  }

  try {
    const results = await withSearchCache(
      `archive:${query.toLowerCase()}`,
      1000 * 60 * 30,
      async () => {
        const url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(query)}&fl[]=identifier&fl[]=title&fl[]=creator&fl[]=date&rows=6&page=1&output=json`;
        const res = await fetch(url, { next: { revalidate: 1800 } });

        if (!res.ok) {
          throw new Error(`Internet Archive search error: ${res.status}`);
        }

        const data = await res.json();
        const items = data.response?.docs || [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return items.map((item: any): NormalizedAPIResponse => ({
          id: createResultId(String(item.identifier || item.title)),
          title: item.title || "Untitled archive item",
          sourceName: "Internet Archive",
          sourceType: "archive",
          url: item.identifier ? `https://archive.org/details/${item.identifier}` : "https://archive.org",
          publishedAt: item.date || "Unknown date",
          summary: `Archive record${item.creator ? ` by ${item.creator}` : ""}. Use this to inspect preserved historical material or trace older versions of claims, reports, or media artifacts.`,
          trustBand: "A",
          module: "deepreal",
          tags: ["internet-archive", "archive", "historical-evidence"],
          whyRecommended: "Framework §28 keeps archive tools in the verification stack for historical comparison and record preservation.",
        }));
      },
    );

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Archive Search Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch archive records from the Internet Archive." },
      { status: 500 },
    );
  }
}
