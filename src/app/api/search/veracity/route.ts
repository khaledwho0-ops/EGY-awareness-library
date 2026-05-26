import { NextResponse } from "next/server";
import { withSearchCache } from "@/lib/api/search-cache";
import { ERR } from "@/lib/api/api-error";

interface VeracityEvidence {
  title: string;
  rationale: string;
  sourceType: "fact_check" | "academic" | "official_guidance" | "archive" | "local_pattern";
  url?: string;
}

interface VeracityResult {
  claim: string;
  verdict: "refuted" | "supported" | "mixed" | "uncertain";
  confidence: number;
  explanation: string;
  evidence: VeracityEvidence[];
  provider: "veracity-backend" | "local-rag-fallback";
}

const VERACITY_BACKEND_URL = process.env.VERACITY_BACKEND_URL;
const VERACITY_BACKEND_TOKEN = process.env.VERACITY_BACKEND_TOKEN;

const fallbackPatterns = [
  {
    match: /(5g).*(covid|virus|corona)|(covid|virus|corona).*(5g)/i,
    verdict: "refuted" as const,
    confidence: 0.91,
    explanation: "This matches a well-known misinformation pattern that falsely links telecommunications infrastructure with viral disease. Debunked by WHO, Reuters, and AFP.",
    evidence: [
      {
        title: "WHO Mythbusters: 5G networks do NOT spread COVID-19",
        rationale: "Telecommunications infrastructure does not transmit biological viruses. Viruses cannot travel on radio waves or mobile networks.",
        sourceType: "official_guidance" as const,
        url: "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters",
      },
    ],
  },
  {
    match: /vaccines?.*(autism)|autism.*vaccines?/i,
    verdict: "refuted" as const,
    confidence: 0.95,
    explanation: "This claim stems from a retracted 1998 Lancet paper. Multiple large-scale studies (Denmark 650K+ children, meta-analysis of 1.2M+ children) found zero association.",
    evidence: [
      {
        title: "Lancet retraction of Wakefield et al. (2010)",
        rationale: "The original study was retracted for ethical violations and scientific fraud.",
        sourceType: "academic" as const,
        url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(97)11096-0/fulltext",
      },
      {
        title: "Hviid et al. (2019) — Annals of Internal Medicine",
        rationale: "Study of 657,461 Danish children found no increased risk of autism with MMR vaccination.",
        sourceType: "academic" as const,
        url: "https://doi.org/10.7326/M18-2101",
      },
    ],
  },
  {
    match: /(miracle cure|secret cure|overnight cure|guaranteed cure)/i,
    verdict: "uncertain" as const,
    confidence: 0.68,
    explanation: "Extraordinary health-treatment claims should be treated as high-risk until verified with formal evidence and regulatory guidance.",
    evidence: [
      {
        title: "Extraordinary-claim heuristic",
        rationale: "Claims promising secret or guaranteed cures deserve immediate verification with academic and official sources.",
        sourceType: "local_pattern" as const,
      },
    ],
  },
  {
    match: /(flat earth|earth is flat)/i,
    verdict: "refuted" as const,
    confidence: 0.99,
    explanation: "Earth's spherical shape is confirmed by satellite imagery, circumnavigation, gravitational physics, and astronomical observation.",
    evidence: [
      {
        title: "NASA Earth observation imagery",
        rationale: "Decades of satellite photography from multiple space agencies confirm Earth's oblate spheroid shape.",
        sourceType: "official_guidance" as const,
        url: "https://earthobservatory.nasa.gov/",
      },
    ],
  },
];

function buildFallbackVeracity(claim: string): VeracityResult {
  const pattern = fallbackPatterns.find((entry) => entry.match.test(claim));
  if (pattern) {
    return {
      claim,
      verdict: pattern.verdict,
      confidence: pattern.confidence,
      explanation: pattern.explanation,
      evidence: pattern.evidence,
      provider: "local-rag-fallback",
    };
  }

  return {
    claim,
    verdict: "uncertain",
    confidence: 0.54,
    explanation: "No configured Veracity backend is available, so the system is returning a local grounded-verification fallback. Cross-check with fact-check, academic, and archive sources before accepting or sharing this claim.",
    evidence: [
      {
        title: "Claim verification workflow",
        rationale: "Use the fact-check, source verification, and evidence-search tools together instead of relying on a single signal.",
        sourceType: "local_pattern",
      },
    ],
    provider: "local-rag-fallback",
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const claim = typeof body.claim === "string" ? body.claim.trim() : "";
    const context = typeof body.context === "string" ? body.context.trim() : undefined;

    if (!claim) {
      return ERR.invalidPayload();
    }

    const result = await withSearchCache(
      `veracity:${claim.toLowerCase()}:${context?.toLowerCase() ?? ""}`,
      1000 * 60 * 30,
      async () => {
        if (!VERACITY_BACKEND_URL) {
          return buildFallbackVeracity(claim);
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        try {
          const response = await fetch(`${VERACITY_BACKEND_URL.replace(/\/$/, "")}/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(VERACITY_BACKEND_TOKEN ? { Authorization: `Bearer ${VERACITY_BACKEND_TOKEN}` } : {}),
            },
            body: JSON.stringify({ claim, context }),
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (!response.ok) {
            console.error(`Veracity backend returned ${response.status}`);
            return buildFallbackVeracity(claim);
          }

          const payload = await response.json();
          return {
            claim,
            verdict: payload.verdict ?? "uncertain",
            confidence: typeof payload.confidence === "number" ? payload.confidence : 0.5,
            explanation: payload.explanation ?? "External Veracity backend response.",
            evidence: Array.isArray(payload.evidence) ? payload.evidence : [],
            provider: "veracity-backend" as const,
          };
        } catch (fetchError) {
          clearTimeout(timeoutId);
          console.error("Veracity backend fetch failed:", fetchError);
          return buildFallbackVeracity(claim);
        }
      },
    );

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Veracity route error:", error);
    return ERR.fetchFailed("Veracity analysis");
  }
}
