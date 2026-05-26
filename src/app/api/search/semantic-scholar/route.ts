import { NextResponse } from "next/server";
import { ERR } from "@/lib/api/api-error";
import { createHash } from "crypto";
import type { NormalizedAPIResponse } from "@/types";
import { withSearchCache } from "@/lib/api/search-cache";

/**
 * SEMANTIC SCHOLAR API ROUTE — Chunk 7.3
 * 
 * Allen Institute's AI-powered academic search.
 * Returns papers with TLDR summaries and citation influence scores.
 * FREE: 100 requests per 5 minutes (no key needed).
 * 
 * Why this over others: Only API with AI-generated paper summaries.
 * Students get instant understanding of complex research.
 */

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return ERR.missingQuery();
  }

  try {
    const results = await withSearchCache(
      `semanticscholar:${query.toLowerCase()}`,
      1000 * 60 * 30, // 30 min cache
      async () => {
        const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}&limit=8&fields=title,abstract,url,year,citationCount,influentialCitationCount,tldr,authors,journal,isOpenAccess,openAccessPdf`;

        const res = await fetch(url, {
          headers: {
            "User-Agent": "EgyptianAwarenessLibrary/1.0 (research-platform)",
          },
          next: { revalidate: 1800 },
        });

        if (!res.ok) throw new Error(`Semantic Scholar API error: ${res.status}`);

        const data = await res.json();
        const papers = data.data || [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return papers.map((paper: any): NormalizedAPIResponse => {
          const citations = paper.citationCount || 0;
          const influential = paper.influentialCitationCount || 0;
          const trustBand: "A" | "B" | "C" = citations > 100 ? "A" : citations > 10 ? "B" : "C";
          const tldr = paper.tldr?.text || paper.abstract?.slice(0, 200) || "No summary available.";
          const authors = (paper.authors || []).slice(0, 3).map((a: { name: string }) => a.name).join(", ");
          const isOpenAccess = Boolean(paper.isOpenAccess || paper.openAccessPdf?.url);
          const freeUrl = paper.openAccessPdf?.url || paper.url;

          return {
            id: `ss-${createHash("sha1").update(paper.paperId || paper.title).digest("hex").slice(0, 12)}`,
            title: paper.title || "Untitled Paper",
            sourceName: paper.journal?.name || "Academic Publication",
            sourceType: "journal",
            url: freeUrl || `https://api.semanticscholar.org/paper/${paper.paperId}`,
            publishedAt: paper.year ? String(paper.year) : "Unknown",
            summary: `${tldr} [${citations} citations, ${influential} influential] Authors: ${authors}`,
            trustBand,
            module: "deepreal",
            tags: ["semantic-scholar", "academic", "peer-reviewed"],
            whyRecommended: `AI-summarized academic paper with ${citations} citations. Trust Band ${trustBand} based on citation impact.`,
            accessTier: isOpenAccess ? "free" : "unknown",
            openAccess: isOpenAccess,
            accessNotes: isOpenAccess ? "Semantic Scholar exposed an open-access PDF or landing page." : "Semantic Scholar found the paper, but open full text was not confirmed.",
          };
        });
      }
    );

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Semantic Scholar Error:", error);
    const errMsg = error instanceof Error ? error.message : String(error);
    // Graceful degradation on rate limit (429) or transient errors
    if (errMsg.includes("429") || errMsg.includes("rate")) {
      return NextResponse.json({
        results: [],
        provider: "semantic-scholar-rate-limited",
        disclaimer: "Semantic Scholar is temporarily rate-limiting requests. Results will return shortly. Use OpenAlex or Crossref as alternative discovery layers.",
      });
    }
    return ERR.fetchFailed("Semantic Scholar");
  }
}
