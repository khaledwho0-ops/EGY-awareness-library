import { NextResponse } from "next/server";
import { ERR } from "@/lib/api/api-error";
import { withSearchCache } from "@/lib/api/search-cache";

interface HadithSearchResult {
  id: string;
  collection: string;
  reference?: string;
  grade?: string;
  narrator?: string;
  englishText: string;
  arabicText?: string;
  sourceUrl?: string;
  provider: "sunnah-configured" | "hadithapi";
}

function normalizeText(value: unknown): string | undefined {
  return typeof value === "string" ? value.trim() || undefined : undefined;
}

function toArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

async function fetchConfiguredSunnahProvider(query: string, collection?: string): Promise<HadithSearchResult[]> {
  const endpoint = process.env.SUNNAH_HADITH_SEARCH_URL;
  const apiKey = process.env.SUNNAH_API_KEY;

  if (!endpoint || !apiKey) {
    return [];
  }

  const url = new URL(endpoint);
  url.searchParams.set("q", query);
  if (collection) {
    url.searchParams.set("collection", collection);
  }

  const response = await fetch(url.toString(), {
    headers: {
      "X-API-Key": apiKey,
      "User-Agent": "EgyptianAwarenessLibrary/1.0",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Configured Sunnah provider failed with ${response.status}`);
  }

  const payload = await response.json();
  const entries = toArray<Record<string, unknown>>(payload.results ?? payload.data ?? payload.hadiths);

  return entries.slice(0, 6).map((entry, index) => ({
    id: normalizeText(entry.id) ?? `sunnah-${index}`,
    collection: normalizeText(entry.collection) ?? normalizeText(entry.book) ?? "Hadith collection",
    reference: normalizeText(entry.reference) ?? normalizeText(entry.hadithNumber),
    grade: normalizeText(entry.grade) ?? normalizeText(entry.status),
    narrator: normalizeText(entry.narrator),
    englishText: normalizeText(entry.englishText) ?? normalizeText(entry.hadithEnglish) ?? "No English text returned.",
    arabicText: normalizeText(entry.arabicText) ?? normalizeText(entry.hadithArabic),
    sourceUrl: normalizeText(entry.url),
    provider: "sunnah-configured",
  }));
}

async function fetchHadithApiProvider(query: string, collection?: string): Promise<HadithSearchResult[]> {
  const apiKey = process.env.HADITH_API_KEY;
  if (!apiKey) {
    return [];
  }

  const url = new URL("https://hadithapi.com/public/api/hadiths/");
  url.searchParams.set("apiKey", apiKey);
  url.searchParams.set("hadithEnglish", query);
  url.searchParams.set("paginate", "6");
  if (collection) {
    url.searchParams.set("book", collection);
  }

  const response = await fetch(url.toString(), {
    headers: {
      "User-Agent": "EgyptianAwarenessLibrary/1.0",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Hadith API provider failed with ${response.status}`);
  }

  const payload = await response.json();
  const entries = toArray<Record<string, unknown>>(payload.hadiths?.data ?? payload.data ?? payload.hadiths);

  return entries.slice(0, 6).map((entry, index) => {
    const book = typeof entry.book === "object" && entry.book !== null
      ? (entry.book as Record<string, unknown>)
      : undefined;
    const collectionName = normalizeText(entry.bookName) ?? normalizeText(book?.bookName) ?? "Hadith collection";
    const reference = normalizeText(entry.hadithNumber) ?? normalizeText(entry.id) ?? `${index + 1}`;
    const slug = normalizeText(entry.bookSlug) ?? normalizeText(book?.bookSlug);

    return {
      id: normalizeText(entry.id) ?? `${slug ?? "hadith"}-${reference}`,
      collection: collectionName,
      reference,
      grade: normalizeText(entry.status),
      narrator: normalizeText(entry.englishNarrator) ?? normalizeText(entry.narrator),
      englishText: normalizeText(entry.hadithEnglish) ?? "No English text returned.",
      arabicText: normalizeText(entry.hadithArabic),
      sourceUrl: slug ? `https://hadithapi.com/public/api/${slug}/${reference}` : undefined,
      provider: "hadithapi",
    };
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const collection = searchParams.get("collection") ?? undefined;

  if (!query) {
    return ERR.missingQuery();
  }

  try {
    const results = await withSearchCache(
      `hadith:${collection ?? "all"}:${query.toLowerCase()}`,
      1000 * 60 * 60,
      async () => {
        const configuredResults = await fetchConfiguredSunnahProvider(query, collection);
        if (configuredResults.length > 0) {
          return configuredResults;
        }

        const fallbackResults = await fetchHadithApiProvider(query, collection);
        return fallbackResults;
      }
    );

    if (results.length === 0) {
      // Educational fallback: curated well-known hadiths for keyword search
      const fallbackResults = searchLocalHadithFallback(query);
      if (fallbackResults.length > 0) {
        return NextResponse.json({
          results: fallbackResults,
          provider: "local-educational-fallback",
          disclaimer:
            "These are curated, well-known hadiths provided for educational context. Add SUNNAH_API_KEY or HADITH_API_KEY for comprehensive live hadith search. Do not use isolated hadith results as personal rulings.",
        });
      }

      return NextResponse.json({
        results: [],
        provider: "no-provider-configured",
        disclaimer:
          "No hadith matches found in the local educational dataset. Add SUNNAH_API_KEY + SUNNAH_HADITH_SEARCH_URL or HADITH_API_KEY for comprehensive live hadith verification.",
      });
    }

    return NextResponse.json({
      results,
      disclaimer:
        "Hadith search is provided for educational verification only. Do not use isolated hadith search results as personal rulings; use formal guidance routes for fiqh or fatwa questions.",
    });
  } catch (error) {
    console.error("Hadith API Error:", error);
    return ERR.fetchFailed("Hadith search");
  }
}

// ─── Local Educational Fallback Dataset ───
// Curated from universally accepted, well-known hadiths (Sahih Bukhari/Muslim)
const LOCAL_HADITH_DATASET: HadithSearchResult[] = [
  {
    id: "local-1",
    collection: "Sahih al-Bukhari",
    reference: "1",
    grade: "Sahih",
    narrator: "Umar ibn al-Khattab (RA)",
    englishText: "Actions are judged by intentions, so each person will have what they intended.",
    arabicText: "إنما الأعمال بالنيات وإنما لكل امرئ ما نوى",
    sourceUrl: "https://sunnah.com/bukhari:1",
    provider: "sunnah-configured",
  },
  {
    id: "local-2",
    collection: "Sahih Muslim",
    reference: "2586",
    grade: "Sahih",
    narrator: "Abu Hurairah (RA)",
    englishText: "Do not envy one another, do not inflate prices for one another, do not hate one another, do not turn your backs on one another, and do not undercut one another in trade. Be, O servants of Allah, brothers.",
    sourceUrl: "https://sunnah.com/muslim:2564",
    provider: "sunnah-configured",
  },
  {
    id: "local-3",
    collection: "Sahih al-Bukhari",
    reference: "6018",
    grade: "Sahih",
    narrator: "Abu Hurairah (RA)",
    englishText: "Whoever believes in Allah and the Last Day should speak good or remain silent. Whoever believes in Allah and the Last Day should honor his neighbor. Whoever believes in Allah and the Last Day should honor his guest.",
    sourceUrl: "https://sunnah.com/bukhari:6018",
    provider: "sunnah-configured",
  },
  {
    id: "local-4",
    collection: "Sahih Muslim",
    reference: "2577",
    grade: "Sahih",
    narrator: "Abu Dharr (RA)",
    englishText: "O My servants, I have forbidden oppression for Myself and have made it forbidden among you, so do not oppress one another.",
    arabicText: "يا عبادي إني حرمت الظلم على نفسي وجعلته بينكم محرما فلا تظالموا",
    sourceUrl: "https://sunnah.com/muslim:2577",
    provider: "sunnah-configured",
  },
  {
    id: "local-5",
    collection: "Sahih al-Bukhari",
    reference: "13",
    grade: "Sahih",
    narrator: "Anas ibn Malik (RA)",
    englishText: "None of you truly believes until he loves for his brother what he loves for himself.",
    arabicText: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه",
    sourceUrl: "https://sunnah.com/bukhari:13",
    provider: "sunnah-configured",
  },
  {
    id: "local-6",
    collection: "Sahih Muslim",
    reference: "2999",
    grade: "Sahih",
    narrator: "Suhaib (RA)",
    englishText: "How wonderful is the affair of the believer, for his affairs are all good. If something good happens to him, he is thankful for it and that is good for him. If something bad happens to him, he bears it with patience and that is good for him.",
    sourceUrl: "https://sunnah.com/muslim:2999",
    provider: "sunnah-configured",
  },
  {
    id: "local-7",
    collection: "Sunan Ibn Majah",
    reference: "224",
    grade: "Sahih",
    narrator: "Anas ibn Malik (RA)",
    englishText: "Seeking knowledge is an obligation upon every Muslim.",
    arabicText: "طلب العلم فريضة على كل مسلم",
    sourceUrl: "https://sunnah.com/ibnmajah:224",
    provider: "sunnah-configured",
  },
  {
    id: "local-8",
    collection: "Sahih al-Bukhari",
    reference: "6011",
    grade: "Sahih",
    narrator: "Nu'man ibn Bashir (RA)",
    englishText: "The believers in their mutual kindness, compassion, sympathy and support are like one body. When one limb aches, the whole body reacts with sleeplessness and fever.",
    arabicText: "مثل المؤمنين في توادهم وتراحمهم وتعاطفهم مثل الجسد",
    sourceUrl: "https://sunnah.com/bukhari:6011",
    provider: "sunnah-configured",
  },
  {
    id: "local-9",
    collection: "Sahih Muslim",
    reference: "2319",
    grade: "Sahih",
    narrator: "Abu Hurairah (RA)",
    englishText: "Allah has divided mercy into one hundred parts. He kept ninety-nine parts with Himself and sent down one part to the earth. From that one part comes the compassion which creation shows to one another.",
    arabicText: "جعل الله الرحمة مائة جزء فأمسك عنده تسعة وتسعين جزءاً",
    sourceUrl: "https://sunnah.com/muslim:2752",
    provider: "sunnah-configured",
  },
  {
    id: "local-10",
    collection: "Sunan Abu Dawud",
    reference: "4941",
    grade: "Sahih",
    narrator: "Abu Hurairah (RA)",
    englishText: "Whoever does not show mercy to others, will not be shown mercy. Whoever does not forgive others, will not be forgiven.",
    arabicText: "من لا يرحم لا يُرحم ومن لا يغفر لا يُغفر",
    sourceUrl: "https://sunnah.com/bukhari:5997",
    provider: "sunnah-configured",
  },
  {
    id: "local-11",
    collection: "Jami at-Tirmidhi",
    reference: "2516",
    grade: "Hasan Sahih",
    narrator: "Ibn Abbas (RA)",
    englishText: "Be mindful of Allah and He will protect you. Be mindful of Allah and you will find Him before you. If you ask, ask from Allah. If you seek help and support, seek help from Allah. Know that if the whole nation were to come together to benefit you, they would only benefit you with what Allah has already written for you.",
    arabicText: "احفظ الله يحفظك احفظ الله تجده تجاهك إذا سألت فاسأل الله وإذا استعنت فاستعن بالله",
    sourceUrl: "https://sunnah.com/tirmidhi:2516",
    provider: "sunnah-configured",
  },
  {
    id: "local-12",
    collection: "Sahih Muslim",
    reference: "2664",
    grade: "Sahih",
    narrator: "Abu Hurairah (RA)",
    englishText: "A strong believer is better and more beloved to Allah than a weak believer, although both are good. Strive for that which will benefit you, seek help from Allah, and do not give up hope. If something befalls you, do not say 'If only I had done such-and-such'; rather say 'Allah has decreed and what He wills He does,' for 'if only' opens the door to the devil's work.",
    sourceUrl: "https://sunnah.com/muslim:2664",
    provider: "sunnah-configured",
  },
  {
    id: "local-13",
    collection: "Sahih al-Bukhari",
    reference: "6502",
    grade: "Sahih",
    narrator: "Abu Hurairah (RA)",
    englishText: "Allah says: I am as My servant expects of Me, and I am with him when he remembers Me. If he remembers Me in himself, I remember him in Myself. If he draws near to Me a hand's length, I draw near to him an arm's length. If he comes to Me walking, I go to him running. Have faith and trust in Allah.",
    arabicText: "أنا عند ظن عبدي بي وأنا معه إذا ذكرني",
    sourceUrl: "https://sunnah.com/bukhari:6502",
    provider: "sunnah-configured",
  },
];

// Synonym expansion map: query terms → additional search terms
const SYNONYM_MAP: Record<string, string[]> = {
  support: ["help", "kindness", "compassion", "brother", "body", "limb", "seek"],
  mercy: ["compassion", "merciful", "forgive", "rahma"],
  forgiveness: ["forgive", "forgiven", "mercy", "pardon"],
  hope: ["give up", "strive", "benefit", "expect", "beloved"],
  faith: ["believer", "believes", "trust", "mindful", "allah"],
  sabr: ["patience", "patient", "bears", "endure"],
  rahma: ["mercy", "compassion", "merciful"],
  charity: ["give", "servant", "benefit", "good"],
  prayer: ["remembers", "mindful", "allah", "ask"],
  trust: ["expect", "faith", "mindful", "allah"],
  love: ["beloved", "loves", "brother"],
};

function searchLocalHadithFallback(query: string): HadithSearchResult[] {
  const lowered = query.toLowerCase();
  const baseTokens = lowered.split(/\s+/).filter((t) => t.length > 2);

  // Expand tokens with synonyms
  const expandedTokens = new Set(baseTokens);
  for (const token of baseTokens) {
    const synonyms = SYNONYM_MAP[token];
    if (synonyms) {
      synonyms.forEach((s) => expandedTokens.add(s));
    }
  }
  const allTokens = Array.from(expandedTokens);

  return LOCAL_HADITH_DATASET
    .map((hadith) => {
      const searchable = `${hadith.englishText} ${hadith.collection} ${hadith.narrator ?? ""} ${hadith.arabicText ?? ""}`.toLowerCase();
      const matchCount = allTokens.filter((token) => searchable.includes(token)).length;
      return { hadith, matchCount };
    })
    .filter(({ matchCount }) => matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, 4)
    .map(({ hadith }) => hadith);
}
