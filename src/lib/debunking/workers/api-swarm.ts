import { z } from "zod";

const WorkerResponseSchema = z.object({
  title: z.string(),
  abstract: z.string().max(500),
  credibilityScore: z.number().min(0).max(100),
  citationUrl: z.string().url().optional(),
});
export type WorkerResponse = z.infer<typeof WorkerResponseSchema>;

// Use deterministic scoring based on domain authority to respect 8000ms SLA
export async function evaluateCredibility(claim: string, title: string, abstract: string): Promise<number> {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("alquran") || lowerTitle.includes("dorar")) return 100; // Theological absolute
  if (lowerTitle.includes("europepmc") || lowerTitle.includes("pubmed")) return 95; // Peer-reviewed medical
  if (lowerTitle.includes("openalex") || lowerTitle.includes("cochrane")) return 90; // High-tier scientific graph
  if (lowerTitle.includes("google factcheck") || lowerTitle.includes("reuters")) return 85; // Verified OSINT fact-checker
  
  // Fallback heuristic scoring based on abstract length/detail
  return abstract.length > 50 ? 75 : 50;
}

export async function withTimeout<T>(promise: Promise<T>, ms = 8000, abortController?: AbortController): Promise<T> {
  let timeoutId: number | ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      if (abortController) {
        abortController.abort();
      }
      reject(new Error("Worker timed out"));
    }, ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
}

// Migrated/Stubbed Fetchers

async function fetchOpenAlex(query: string, signal?: AbortSignal): Promise<WorkerResponse | null> {
  const res = await fetch(`https://api.openalex.org/works?search=${encodeURIComponent(query)}&per-page=3`, { signal });
  if (!res.ok) throw new Error("OpenAlex API Error");
  
  const data = await res.json();
  if (data.results && data.results.length > 0) {
    const title = `OpenAlex: ${data.results[0].title || "Scientific Graph Match"}`;
    const abstract = data.results[0].abstract_inverted_index ? "Matched scientific literature confirming/debunking claim." : "OpenAlex citation found.";
    const credibilityScore = await evaluateCredibility(query, title, abstract);

    return WorkerResponseSchema.parse({
      title,
      abstract,
      credibilityScore,
      citationUrl: data.results[0].id,
    });
  }
  return null;
}

async function fetchEuropePMC(query: string, signal?: AbortSignal): Promise<WorkerResponse | null> {
  const res = await fetch(`https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(query)}&format=json&resultType=lite`, { signal });
  if (!res.ok) throw new Error("EuropePMC API Error");

  const data = await res.json();
  if (data.resultList && data.resultList.result && data.resultList.result.length > 0) {
    const title = `EuropePMC: ${data.resultList.result[0].title}`;
    const abstract = "EuropePMC peer-reviewed verification hit.";
    const credibilityScore = await evaluateCredibility(query, title, abstract);

    return WorkerResponseSchema.parse({
      title,
      abstract,
      credibilityScore,
      citationUrl: `https://europepmc.org/article/MED/${data.resultList.result[0].pmid}`,
    });
  }
  return null;
}

async function fetchQuran(query: string, signal?: AbortSignal): Promise<WorkerResponse | null> {
  const res = await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(query)}/all/ar`, { signal });
  if (!res.ok) throw new Error("AlQuran API Error");

  const data = await res.json();
  if (data.data && data.data.count > 0) {
    const title = "AlQuran.cloud Verification";
    const abstract = `Found ${data.data.count} exact matches in Quranic text.`;
    const credibilityScore = await evaluateCredibility(query, title, abstract);

    return WorkerResponseSchema.parse({
      title,
      abstract,
      credibilityScore,
      citationUrl: "https://alquran.cloud",
    });
  }
  return null;
}

async function fetchGoogleFactCheck(query: string, signal?: AbortSignal): Promise<WorkerResponse | null> {
  const apiKey = process.env.GOOGLE_FACTCHECK_API_KEY;
  if (!apiKey) return null;

  const res = await fetch(`https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(query)}&key=${apiKey}`, { signal });
  if (!res.ok) throw new Error("Google FactCheck API Error");

  const data = await res.json();
  if (data.claims && data.claims.length > 0) {
    const title = `Google FactCheck: ${data.claims[0].claimReview[0].publisher.name}`;
    const abstract = `Rating: ${data.claims[0].claimReview[0].textualRating}.`;
    const credibilityScore = await evaluateCredibility(query, title, abstract);

    return WorkerResponseSchema.parse({
      title,
      abstract,
      credibilityScore,
      citationUrl: data.claims[0].claimReview[0].url,
    });
  }
  return null;
}

// Group fetchers into parallel clusters using Promise.allSettled
export async function executeApiSwarm(query: string): Promise<WorkerResponse[]> {
  const fetcherFns = [
    fetchOpenAlex,
    fetchEuropePMC,
    fetchQuran,
    fetchGoogleFactCheck
  ];

  const results = await Promise.allSettled(
    fetcherFns.map(fn => {
      const ac = new AbortController();
      return withTimeout(fn(query, ac.signal), 8000, ac);
    })
  );

  const successfulResults: WorkerResponse[] = [];
  
  for (const result of results) {
    if (result.status === "fulfilled" && result.value !== null) {
      successfulResults.push(result.value);
    } else if (result.status === "rejected") {
      console.warn("[Api-Swarm] A fetcher failed or timed out:", result.reason);
    }
  }

  return successfulResults;
}

