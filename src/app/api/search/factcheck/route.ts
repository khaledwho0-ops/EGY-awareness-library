import { NextResponse } from "next/server";
import { createHash } from "crypto";
import type { NormalizedAPIResponse } from "@/types";
import { withSearchCache } from "@/lib/api/search-cache";
import { ERR } from "@/lib/api/api-error";

function createResultId(prefix: string, seed: string): string {
  return `${prefix}-${createHash("sha1").update(seed).digest("hex").slice(0, 12)}`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  
  if (!query) {
    return ERR.missingQuery();
  }

  try {
    const apiKey = process.env.GOOGLE_FACTCHECK_API_KEY;
    if (!apiKey) {
      return ERR.notConfigured("Google Fact Check");
    }

    const normalized = await withSearchCache(
      `factcheck:${query.toLowerCase()}`,
      1000 * 60 * 30,
      async () => {
        const apiUrl = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(query)}&key=${apiKey}`;
        const res = await fetch(apiUrl, { next: { revalidate: 1800 } });

        if (!res.ok) {
          throw new Error(`Google Fact Check API error: ${res.status}`);
        }

        const data = await res.json();
        const claims = data.claims || [];
        const knownHighTrust = ["Reuters", "AFP", "AP", "BBC", "Full Fact", "PolitiFact", "Snopes", "FactCheck.org"];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return claims.map((claim: any): NormalizedAPIResponse => {
          const review = claim.claimReview?.[0];
          const publisher = review?.publisher?.name || "Unknown publisher";
          const rating = review?.textualRating || "Unrated";
          const reviewUrl = review?.url || "https://toolbox.google.com/factcheck";
          const trustBand: "A" | "B" | "C" = knownHighTrust.some((name) => publisher.includes(name)) ? "A" : "B";

          return {
            id: createResultId("factcheck", `${claim.text}-${publisher}-${reviewUrl}`),
            title: claim.text || "Untitled claim review",
            sourceName: publisher,
            sourceType: "fact_check",
            url: reviewUrl,
            publishedAt: claim.claimDate ? claim.claimDate.split("T")[0] : "Unknown date",
            summary: `Verdict: ${rating}. Claim review surfaced through Google Fact Check Tools.`,
            trustBand,
            module: "deepreal",
            tags: ["google-fact-check-tools", "claimreview", "misinformation-check"],
            whyRecommended: "This route uses the framework's fact-check layer and only returns live ClaimReview-backed results.",
          };
        });
      },
    );

    return NextResponse.json({ results: normalized });
  } catch (error) {
    console.error("[Fact Check Error]", error);
    return ERR.fetchFailed("Google Fact Check");
  }
}
