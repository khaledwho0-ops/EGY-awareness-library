import { NextResponse } from "next/server";
import { createHash } from "crypto";
import type { NormalizedAPIResponse } from "@/types";
import { withSearchCache } from "@/lib/api/search-cache";
import { ERR } from "@/lib/api/api-error";

function resultId(prefix: string, seed: string) {
  return `${prefix}-${createHash("sha1").update(seed).digest("hex").slice(0, 12)}`;
}

function scoreResult(result: NormalizedAPIResponse) {
  const accessScore =
    result.accessTier === "free" ? 30 : result.accessTier === "mixed" ? 18 : result.accessTier === "unknown" ? 8 : 0;
  const trustScore = result.trustBand === "A" ? 30 : result.trustBand === "B" ? 18 : 8;
  const officialScore = result.sourceType === "official_guidance" ? 24 : result.sourceType === "journal" ? 16 : 0;
  return accessScore + trustScore + officialScore;
}

function sortEvidence(results: NormalizedAPIResponse[]) {
  return [...results].sort((left, right) => scoreResult(right) - scoreResult(left));
}

async function fetchOpenAlex(query: string): Promise<NormalizedAPIResponse[]> {
  const url = `https://api.openalex.org/works?search=${encodeURIComponent(query)}&per-page=8&mailto=admin@egyptianawareness.local`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": "EgyptianAwarenessLibrary/1.0 (free-first evidence routing; mailto:admin@egyptianawareness.local)",
    },
    next: { revalidate: 1800 },
  });

  if (!response.ok) return [];
  const data = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data.results || []).map((item: any): NormalizedAPIResponse => {
    const title = item.display_name || "Untitled OpenAlex work";
    const year = item.publication_year ? String(item.publication_year) : "Unknown date";
    const sourceName = item.primary_location?.source?.display_name || "OpenAlex scholarly record";
    const authors =
      item.authorships?.slice(0, 3).map((entry: { author?: { display_name?: string } }) => entry.author?.display_name).filter(Boolean).join(", ") ||
      "Unknown author";
    const openUrl =
      item.best_oa_location?.landing_page_url ||
      item.best_oa_location?.pdf_url ||
      item.primary_location?.landing_page_url ||
      item.doi ||
      item.id ||
      "https://openalex.org";
    const isOpenAccess = Boolean(item.open_access?.is_oa);

    return {
      id: resultId("openalex", item.id || `${title}-${year}`),
      title,
      sourceName,
      sourceType: "journal",
      url: openUrl,
      publishedAt: year,
      summary: `Authors: ${authors}. Cited by: ${item.cited_by_count ?? 0}. ${isOpenAccess ? "Open-access route available." : "Metadata only; full text may be limited."}`,
      trustBand: item.primary_location?.source ? "A" : "B",
      module: "deepreal",
      tags: ["openalex", "scholarly-discovery", "free-first"],
      whyRecommended: "OpenAlex is open research discovery and is ranked first when it exposes a free-access route.",
      accessTier: isOpenAccess ? "free" : "paid",
      openAccess: isOpenAccess,
      accessNotes: isOpenAccess ? "OpenAlex flagged this item as open access." : "OpenAlex found the record, but free full text was not confirmed.",
    };
  });
}

async function fetchSemanticScholar(query: string): Promise<NormalizedAPIResponse[]> {
  const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}&limit=8&fields=title,abstract,url,year,citationCount,influentialCitationCount,tldr,authors,journal,isOpenAccess,openAccessPdf`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": "EgyptianAwarenessLibrary/1.0 (free-first evidence routing)",
    },
    next: { revalidate: 1800 },
  });

  if (!response.ok) return [];
  const data = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data.data || []).map((paper: any): NormalizedAPIResponse => {
    const citations = paper.citationCount || 0;
    const influential = paper.influentialCitationCount || 0;
    const trustBand: "A" | "B" | "C" = citations > 100 ? "A" : citations > 10 ? "B" : "C";
    const isOpenAccess = Boolean(paper.isOpenAccess || paper.openAccessPdf?.url);
    const authors = (paper.authors || []).slice(0, 3).map((author: { name: string }) => author.name).join(", ") || "Unknown author";
    const summary = paper.tldr?.text || paper.abstract?.slice(0, 220) || "No abstract summary available.";

    return {
      id: resultId("semanticscholar", paper.paperId || paper.title || query),
      title: paper.title || "Untitled paper",
      sourceName: paper.journal?.name || "Semantic Scholar record",
      sourceType: "journal",
      url: paper.openAccessPdf?.url || paper.url || `https://api.semanticscholar.org/paper/${paper.paperId}`,
      publishedAt: paper.year ? String(paper.year) : "Unknown date",
      summary: `${summary} [${citations} citations, ${influential} influential] Authors: ${authors}`,
      trustBand,
      module: "deepreal",
      tags: ["semantic-scholar", "scholarly-discovery", "free-first"],
      whyRecommended: "Semantic Scholar adds concise paper summaries and open-access hints before paid-only records.",
      accessTier: isOpenAccess ? "free" : "unknown",
      openAccess: isOpenAccess,
      accessNotes: isOpenAccess ? "Semantic Scholar exposed an open-access route." : "Open access was not confirmed for this record.",
    };
  });
}

async function fetchCrossref(query: string): Promise<NormalizedAPIResponse[]> {
  const url = `https://api.crossref.org/works?query=${encodeURIComponent(query)}&select=DOI,title,author,published-print,published-online,URL,container-title,type,is-referenced-by-count&rows=4&mailto=admin@egyptianawareness.local`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": "EgyptianAwarenessLibrary/1.0 (free-first evidence routing; mailto:admin@egyptianawareness.local)",
    },
    next: { revalidate: 1800 },
  });

  if (!response.ok) return [];
  const data = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data.message.items || []).map((item: any): NormalizedAPIResponse => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const authors = item.author?.map((author: any) => `${author.given ? `${author.given} ` : ""}${author.family}`).join(", ") || "Unknown author";
    const dateParts = item["published-print"]?.["date-parts"]?.[0] ?? item["published-online"]?.["date-parts"]?.[0] ?? [];
    const publishedAt = dateParts.length > 0 ? dateParts.join("-") : "Unknown date";
    const journal = item["container-title"]?.[0] || "Crossref record";
    const citations = item["is-referenced-by-count"] || 0;
    const urlValue = item.URL || (item.DOI ? `https://doi.org/${item.DOI}` : "https://api.crossref.org");

    return {
      id: resultId("crossref", item.DOI || `${item.title?.[0]}-${publishedAt}`),
      title: item.title?.[0] || "Untitled Crossref record",
      sourceName: journal,
      sourceType: "journal",
      url: urlValue,
      publishedAt,
      summary: `Authors: ${authors}. Type: ${item.type || "scholarly record"}. Citations indexed by Crossref: ${citations}.`,
      trustBand: item.DOI ? "A" : citations > 0 ? "B" : "C",
      module: "deepreal",
      tags: ["crossref", "metadata-fallback"],
      whyRecommended: "Crossref is still useful for DOI discovery, but it is ranked behind confirmed free-access routes.",
      accessTier: "paid",
      openAccess: false,
      accessNotes: "This is metadata-first and may resolve to a paid landing page.",
    };
  });
}

async function fetchEuropePMC(query: string): Promise<NormalizedAPIResponse[]> {
  const url = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(query)}&format=json&pageSize=6`;
  const response = await fetch(url, { next: { revalidate: 1800 } });

  if (!response.ok) return [];
  const data = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data.resultList?.result || []).map((item: any): NormalizedAPIResponse => {
    const isOpenAccess = item.isOpenAccess === "Y";
    return {
      id: resultId("europepmc", item.id || item.doi || item.title || query),
      title: item.title || "Untitled Europe PMC record",
      sourceName: item.journalTitle || "Europe PMC",
      sourceType: "journal",
      url: item.fullTextUrlList?.fullTextUrl?.[0]?.url || (item.doi ? `https://doi.org/${item.doi}` : "https://europepmc.org/"),
      publishedAt: item.firstPublicationDate || item.pubYear || "Unknown date",
      summary: `${item.authorString || "Unknown authors"}. ${item.abstractText?.slice(0, 180) || "No abstract summary available."}`,
      trustBand: isOpenAccess ? "A" : "B",
      module: "deepreal",
      tags: ["europe-pmc", "biomedical", "free-first"],
      whyRecommended: "Europe PMC adds free biomedical literature before any paid fallback.",
      accessTier: isOpenAccess ? "free" : "unknown",
      openAccess: isOpenAccess,
      accessNotes: isOpenAccess ? "Europe PMC exposed a free full-text route." : "Europe PMC returned metadata but did not confirm free full text.",
    };
  });
}

async function fetchDoaj(query: string): Promise<NormalizedAPIResponse[]> {
  const url = `https://doaj.org/api/search/articles/${encodeURIComponent(query)}?pageSize=6`;
  const response = await fetch(url, { next: { revalidate: 1800 } });

  if (!response.ok) return [];
  const data = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data.results || []).map((item: any): NormalizedAPIResponse => {
    const bibjson = item.bibjson || {};
    const links = Array.isArray(bibjson.link) ? bibjson.link : [];
    const urlValue = links.find((link: { type?: string }) => link.type === "fulltext")?.url || bibjson.identifier?.find((entry: { type?: string }) => entry.type === "doi")?.id || "https://doaj.org/";
    return {
      id: resultId("doaj", item.id || bibjson.title || query),
      title: bibjson.title || "Untitled DOAJ article",
      sourceName: bibjson.journal?.title || "DOAJ",
      sourceType: "journal",
      url: urlValue,
      publishedAt: bibjson.year || "Unknown date",
      summary: `${(bibjson.author || []).slice(0, 3).map((author: { name?: string }) => author.name).filter(Boolean).join(", ") || "Unknown authors"}. Open-access journal record.`,
      trustBand: "A",
      module: "deepreal",
      tags: ["doaj", "open-access", "free-first"],
      whyRecommended: "DOAJ is fully open-access and keeps the evidence route free.",
      accessTier: "free",
      openAccess: true,
      accessNotes: "Listed in the Directory of Open Access Journals.",
    };
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const includePaid = searchParams.get("includePaid") === "1";

  if (!query) {
    return ERR.missingQuery();
  }

  try {
    const results = await withSearchCache(`evidence:${query.toLowerCase()}:${includePaid ? "all" : "free"}`, 1000 * 60 * 30, async () => {
      const [openAlex, semanticScholar, europePMC, doaj, crossref] = await Promise.all([
        fetchOpenAlex(query).catch(() => []),
        fetchSemanticScholar(query).catch(() => []),
        fetchEuropePMC(query).catch(() => []),
        fetchDoaj(query).catch(() => []),
        fetchCrossref(query).catch(() => []),
      ]);

      const merged = sortEvidence([...openAlex, ...semanticScholar, ...europePMC, ...doaj, ...(includePaid ? crossref : [])]);
      const freeFirst = merged.filter((item) => item.accessTier === "free" && item.openAccess);
      const fallback = includePaid ? [] : [];

      return sortEvidence([...freeFirst, ...fallback]).slice(0, 6);
    });

    return NextResponse.json({
      results,
      policy: includePaid ? "free-and-fallback" : "free-first",
    });
  } catch (error) {
    console.error("[Evidence Search Error]", error);
    return ERR.fetchFailed("Evidence APIs");
  }
}
