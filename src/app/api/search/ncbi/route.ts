import { NextResponse } from "next/server";
import { ERR } from "@/lib/api/api-error";
import { createHash } from "crypto";
import type { NormalizedAPIResponse } from "@/types";
import { withSearchCache } from "@/lib/api/search-cache";

function createResultId(seed: string): string {
  return `ncbi-${createHash("sha1").update(seed).digest("hex").slice(0, 12)}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return ERR.missingQuery();
  }

  try {
    const results = await withSearchCache(
      `ncbi:${query.toLowerCase()}`,
      1000 * 60 * 30,
      async () => {
        const esearchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=6&sort=relevance&term=${encodeURIComponent(query)}`;
        const esearchRes = await fetch(esearchUrl, { next: { revalidate: 1800 } });

        if (!esearchRes.ok) {
          throw new Error(`NCBI ESearch error: ${esearchRes.status}`);
        }

        const esearchData = await esearchRes.json();
        const ids: string[] = esearchData.esearchresult?.idlist || [];

        if (ids.length === 0) {
          return [];
        }

        const esummaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${ids.join(",")}`;
        const esummaryRes = await fetch(esummaryUrl, { next: { revalidate: 1800 } });

        if (!esummaryRes.ok) {
          throw new Error(`NCBI ESummary error: ${esummaryRes.status}`);
        }

        const esummaryData = await esummaryRes.json();

        return ids.map((id): NormalizedAPIResponse => {
          const item = esummaryData.result?.[id];
          const title = item?.title || "Untitled PubMed record";
          const authors = item?.authors?.slice(0, 3).map((author: { name?: string }) => author.name).join(", ") || "Unknown author";
          const sourceName = item?.fulljournalname || item?.source || "PubMed";
          const publishedAt = item?.pubdate || "Unknown date";

          return {
            id: createResultId(id),
            title,
            sourceName,
            sourceType: "journal",
            url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
            publishedAt,
            summary: `PubMed summary. Authors: ${authors}. Publication type: ${(item?.pubtype || []).join(", ") || "not listed"}.`,
            trustBand: "A",
            module: "mental-health",
            tags: ["ncbi", "pubmed", "biomedical-literature"],
            whyRecommended: "NCBI E-utilities are the framework's biomedical evidence route for health-related verification and context.",
          };
        });
      },
    );

    return NextResponse.json({ results });
  } catch (error) {
    console.error("NCBI Search Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch biomedical literature from NCBI." },
      { status: 500 },
    );
  }
}
