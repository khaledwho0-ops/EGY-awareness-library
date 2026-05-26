import { NextResponse } from "next/server";
import { ERR } from "@/lib/api/api-error";
import { withSearchCache } from "@/lib/api/search-cache";

interface SemanticReference {
  source: "quran" | "hadith";
  title: string;
  reference?: string;
  excerpt: string;
  score: number;
  url?: string;
}

const KALIMAT_API_URL = process.env.KALIMAT_API_URL;
const KALIMAT_API_KEY = process.env.KALIMAT_API_KEY;

function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[\s,.;:!?()[\]{}\"']+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 2);
}

function overlapScore(query: string, candidate: string): number {
  const queryTokens = tokenize(query);
  const candidateTokens = new Set(tokenize(candidate));
  if (queryTokens.length === 0) {
    return 0;
  }

  const matches = queryTokens.filter((token) => candidateTokens.has(token)).length;
  return Number((matches / queryTokens.length).toFixed(2));
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return ERR.missingQuery();
  }

  try {
    const results = await withSearchCache(
      `islamic-semantic:${query.toLowerCase()}`,
      1000 * 60 * 30,
      async () => {
        // --- Try Kalimat API first ---
        if (KALIMAT_API_URL) {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 12000);

          try {
            const url = new URL(KALIMAT_API_URL);
            url.searchParams.set("q", query);

            const response = await fetch(url.toString(), {
              headers: {
                ...(KALIMAT_API_KEY ? { Authorization: `Bearer ${KALIMAT_API_KEY}` } : {}),
                "User-Agent": "EgyptianAwarenessLibrary/1.0",
                Accept: "application/json",
              },
              signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (response.ok) {
              const payload = await response.json();
              const entries = Array.isArray(payload.results)
                ? payload.results
                : Array.isArray(payload.data)
                  ? payload.data
                  : [];

              if (entries.length > 0) {
                return entries.slice(0, 10).map((entry: Record<string, unknown>) => ({
                  source: entry.source === "hadith" ? "hadith" : "quran",
                  title: typeof entry.title === "string" ? entry.title
                    : typeof entry.surah_name === "string" ? entry.surah_name
                    : "Semantic result",
                  reference: typeof entry.reference === "string" ? entry.reference
                    : typeof entry.verse_key === "string" ? entry.verse_key
                    : undefined,
                  excerpt: typeof entry.excerpt === "string" ? entry.excerpt
                    : typeof entry.text === "string" ? entry.text
                    : "No excerpt returned.",
                  score: typeof entry.score === "number" ? entry.score
                    : typeof entry.relevance === "number" ? entry.relevance
                    : 0.5,
                  url: typeof entry.url === "string" ? entry.url : undefined,
                })) as SemanticReference[];
              }
            } else {
              console.error(`Kalimat API returned ${response.status}`);
            }
          } catch (kalimatError) {
            clearTimeout(timeoutId);
            console.error("Kalimat API fetch failed:", kalimatError);
          }
        }

        // --- Fallback: compose from Quran + Hadith routes ---
        const [quranResponse, hadithResponse] = await Promise.all([
          fetch(`${origin}/api/islamic/quran?type=search&q=${encodeURIComponent(query)}`, { cache: "no-store" }).catch(() => null),
          fetch(`${origin}/api/islamic/hadith?q=${encodeURIComponent(query)}`, { cache: "no-store" }).catch(() => null),
        ]);

        const quranPayload = quranResponse?.ok ? await quranResponse.json() : { results: { results: [] } };
        const hadithPayload = hadithResponse?.ok ? await hadithResponse.json() : { results: [] };

        const quranResults = Array.isArray(quranPayload.results?.results) ? quranPayload.results.results : [];
        const hadithResults = Array.isArray(hadithPayload.results) ? hadithPayload.results : [];

        const combined: SemanticReference[] = [
          ...quranResults.slice(0, 6).map((result: Record<string, unknown>) => ({
            source: "quran" as const,
            title: typeof result.surahName === "string" ? result.surahName : "Quran result",
            reference: typeof result.reference === "string" ? result.reference : undefined,
            excerpt: typeof result.text === "string" ? result.text : "No excerpt returned.",
            score: overlapScore(query, `${result.text ?? ""} ${result.surahName ?? ""}`),
          })),
          ...hadithResults.slice(0, 6).map((result: Record<string, unknown>) => ({
            source: "hadith" as const,
            title: typeof result.collection === "string" ? result.collection : "Hadith result",
            reference: typeof result.reference === "string" ? result.reference : undefined,
            excerpt: typeof result.englishText === "string" ? result.englishText : "No excerpt returned.",
            score: overlapScore(query, `${result.englishText ?? ""} ${result.collection ?? ""}`),
            url: typeof result.sourceUrl === "string" ? result.sourceUrl : undefined,
          })),
        ];

        return combined
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);
      },
    );

    return NextResponse.json({
      results,
      provider: KALIMAT_API_URL ? "kalimat" : "composed-quran-hadith-fallback",
      disclaimer: "Semantic religious search is for educational verification and context discovery only. It does not replace formal tafsir, fiqh, or pastoral guidance.",
    });
  } catch (error) {
    console.error("Islamic semantic route error:", error);
    return ERR.fetchFailed("Islamic semantic search");
  }
}
