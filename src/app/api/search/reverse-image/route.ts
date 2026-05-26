import { NextResponse } from "next/server";
import { withSearchCache } from "@/lib/api/search-cache";
import { ERR } from "@/lib/api/api-error";

interface ReverseImageMatch {
  title: string;
  domain: string;
  url?: string;
  score: number;
  firstIndexed?: string;
  thumbnail?: string;
  note: string;
}

const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY;

function buildFallbackMatches(imageUrl: string): ReverseImageMatch[] {
  const domain = (() => {
    try {
      return new URL(imageUrl).hostname;
    } catch {
      return "uploaded-media";
    }
  })();

  return [
    {
      title: "Origin unknown in fallback mode",
      domain,
      url: imageUrl,
      score: 0.42,
      note: "No reverse-image provider is configured. Set SERPAPI_API_KEY to enable Google Lens reverse image search (100 free searches/month).",
    },
    {
      title: "Cross-platform repost risk",
      domain: "social-repost-pattern",
      score: 0.36,
      note: "Highly reposted images often lose context. Check whether the first publication predates the current claim.",
    },
  ];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const imageUrl = typeof body.imageUrl === "string" ? body.imageUrl.trim() : "";

    if (!imageUrl) {
      return ERR.invalidPayload();
    }

    const results = await withSearchCache(
      `reverse-image:${imageUrl.toLowerCase()}`,
      1000 * 60 * 60,
      async () => {
        if (!SERPAPI_API_KEY) {
          return buildFallbackMatches(imageUrl);
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000);

        try {
          // SerpApi Google Lens endpoint
          const apiUrl = new URL("https://serpapi.com/search");
          apiUrl.searchParams.set("engine", "google_lens");
          apiUrl.searchParams.set("url", imageUrl);
          apiUrl.searchParams.set("api_key", SERPAPI_API_KEY);
          apiUrl.searchParams.set("hl", "en");

          const response = await fetch(apiUrl.toString(), {
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (!response.ok) {
            console.error(`SerpApi returned ${response.status}: ${response.statusText}`);
            return buildFallbackMatches(imageUrl);
          }

          const payload = await response.json();
          const matches: ReverseImageMatch[] = [];

          // Parse visual_matches (visually similar images)
          const visualMatches = Array.isArray(payload.visual_matches) ? payload.visual_matches : [];
          for (const match of visualMatches.slice(0, 8)) {
            const domain = (() => {
              try {
                return typeof match.link === "string" ? new URL(match.link).hostname : "unknown";
              } catch {
                return "unknown";
              }
            })();

            matches.push({
              title: typeof match.title === "string" ? match.title : "Visual match",
              domain,
              url: typeof match.link === "string" ? match.link : undefined,
              score: typeof match.position === "number" ? Math.max(0, 1 - match.position * 0.1) : 0.5,
              thumbnail: typeof match.thumbnail === "string" ? match.thumbnail : undefined,
              note: typeof match.source === "string"
                ? `Source: ${match.source}`
                : "Visual match found via Google Lens.",
            });
          }

          // Parse knowledge_graph if present (info about the image content)
          const kg = payload.knowledge_graph;
          if (kg && typeof kg === "object") {
            const kgTitle = typeof kg.title === "string" ? kg.title : undefined;
            const kgLink = typeof kg.link === "string" ? kg.link : undefined;
            if (kgTitle) {
              matches.unshift({
                title: `Identified: ${kgTitle}`,
                domain: "knowledge-graph",
                url: kgLink,
                score: 0.95,
                note: typeof kg.description === "string"
                  ? kg.description
                  : "Google identified the subject of this image.",
              });
            }
          }

          if (matches.length === 0) {
            return [{
              title: "No matches found",
              domain: "google-lens",
              score: 0,
              note: "Google Lens found no matching images. This image may be original, very new, or not widely published.",
            }];
          }

          return matches;
        } catch (fetchError) {
          clearTimeout(timeoutId);
          console.error("SerpApi fetch failed:", fetchError);
          return buildFallbackMatches(imageUrl);
        }
      },
    );

    return NextResponse.json({
      results,
      totalMatches: results.length,
      provider: SERPAPI_API_KEY ? "serpapi-google-lens" : "local-fallback",
      disclaimer: "Reverse-image results help establish provenance, not truth on their own. Always compare the earliest known publication against the claim context.",
    });
  } catch (error) {
    console.error("Reverse-image route error:", error);
    return ERR.fetchFailed("Reverse image search");
  }
}
