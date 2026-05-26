import { NextResponse } from "next/server";
import { withSearchCache } from "@/lib/api/search-cache";
import { ERR } from "@/lib/api/api-error";

/**
 * CLAIMBUSTER API ROUTE — Chunk 1.2
 * 
 * University of Texas Arlington's ClaimBuster scores text 0-1
 * on "claim-worthiness" — how much does this sentence need fact-checking?
 * 
 * Published: VLDB 2017 (Hassan et al.)
 * Free API: https://idir.uta.edu/claimbuster/
 * 
 * Used in ExerciseEngine to show students which parts of a claim
 * are most in need of verification.
 */

interface ClaimBusterResult {
  text: string;
  score: number;
  classification: "NFS" | "UFS" | "CFS"; // Non-Factual, Unimportant Factual, Check-worthy Factual
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== "string") {
      return ERR.invalidPayload();
    }

    const apiKey = process.env.CLAIMBUSTER_API_KEY;

    // If no API key, use the local scoring heuristic
    if (!apiKey) {
      const localResults = scoreClaimsLocally(text);
      return NextResponse.json({
        results: localResults,
        source: "local-heuristic",
        disclaimer: "Using local claim-worthiness heuristic. Add CLAIMBUSTER_API_KEY for academic-grade scoring.",
      });
    }

    const results = await withSearchCache(
      `claimbuster:${text.slice(0, 100).toLowerCase()}`,
      1000 * 60 * 60, // 1 hour cache
      async () => {
        const res = await fetch("https://idir.uta.edu/claimbuster/api/v2/score/text/", {
          method: "POST",
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input_text: text }),
        });

        if (!res.ok) throw new Error(`ClaimBuster API error: ${res.status}`);
        const data = await res.json();

        return (data.results || []).map((r: { text: string; score: number }) => ({
          text: r.text,
          score: Math.round(r.score * 100) / 100,
          classification: r.score >= 0.5 ? "CFS" : r.score >= 0.25 ? "UFS" : "NFS",
        }));
      }
    );

    return NextResponse.json({ results, source: "claimbuster-api" });
  } catch (error) {
    console.error("ClaimBuster Error:", error);
    return ERR.fetchFailed("ClaimBuster");
  }
}

/**
 * LOCAL HEURISTIC FALLBACK
 * When ClaimBuster API is unavailable, use rule-based scoring.
 * Checks for: numbers/statistics, absolute language, causal claims,
 * attribution to authority, and verifiable proper nouns.
 */
function scoreClaimsLocally(text: string): ClaimBusterResult[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

  return sentences.map((sentence) => {
    const s = sentence.trim();
    let score = 0.15; // base score

    // Numbers/statistics increase check-worthiness
    if (/\d+%|\d+\s*(million|billion|thousand|percent)/i.test(s)) score += 0.25;
    if (/\d{2,}/.test(s)) score += 0.1;

    // Absolute language
    if (/\b(always|never|all|none|every|no one|everyone|impossible|proven|fact)\b/i.test(s)) score += 0.15;

    // Causal claims
    if (/\b(causes?|leads? to|results? in|prevents?|cures?|eliminates?)\b/i.test(s)) score += 0.2;

    // Attribution to authority
    if (/\b(according to|study shows?|research proves?|scientists say|experts say|WHO|CDC|FDA)\b/i.test(s)) score += 0.15;

    // Proper nouns (potential verifiable entities)
    const properNouns = s.match(/[A-Z][a-z]{2,}/g) || [];
    if (properNouns.length >= 2) score += 0.1;

    score = Math.min(score, 1.0);

    return {
      text: s,
      score: Math.round(score * 100) / 100,
      classification: score >= 0.5 ? "CFS" : score >= 0.25 ? "UFS" : "NFS",
    };
  });
}
