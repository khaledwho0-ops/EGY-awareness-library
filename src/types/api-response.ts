/**
 * API RESPONSE TYPES + ZOD SCHEMAS
 * Framework: §21.5 Normalized Response Schema (EXACT)
 */
import { z } from "zod";
import { MVPEnum, TrustBandEnum } from "./source";

// ── §21.5 Source Types (5 values) ──
export const SourceTypeEnum = z.enum([
  "fact_check",
  "journal",
  "official_guidance",
  "archive",
  "local_directory",
  "orientation",
]);
export type SourceType = z.infer<typeof SourceTypeEnum>;

// ── §21.5 Normalized API Response (EXACT 11 fields) ──
export const NormalizedAPIResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  sourceName: z.string(),
  sourceType: SourceTypeEnum,
  url: z.string(),
  publishedAt: z.string(), // ISO date
  summary: z.string(),
  trustBand: TrustBandEnum,
  module: MVPEnum,
  tags: z.array(z.string()),
  whyRecommended: z.string(),
  accessTier: z.enum(["free", "mixed", "paid", "unknown"]).optional(),
  openAccess: z.boolean().optional(),
  accessNotes: z.string().optional(),
});
export type NormalizedAPIResponse = z.infer<typeof NormalizedAPIResponseSchema>;

// ── §21.3 Integration Pattern: server-side with cache ──
export const APICacheEntrySchema = z.object({
  key: z.string(),
  response: NormalizedAPIResponseSchema.or(z.array(NormalizedAPIResponseSchema)),
  fetchedAt: z.string(), // ISO datetime
  expiresAt: z.string(), // ISO datetime
});
export type APICacheEntry = z.infer<typeof APICacheEntrySchema>;

// ── §21.2 API Priority Order ──
export const API_PRIORITY = [
  "crossref",
  "openAlex",
  "googleFactCheck",
  "internetArchive",
  "ncbi",
  "europePMC",
] as const;

// ── §28.3 API Rate Limits (verified) ──
export const API_RATE_LIMITS = {
  googleFactCheck: { type: "api_key", quota: "Cloud project" },
  openAlex: { noKey: 100, freeKey: 100000, maxReqPerSec: 100 },
  crossref: { public: { single: 5, list: 1 }, polite: { single: 10, list: 3 } },
  ncbi: { noKey: 3, withKey: 10 },
  mediaWiki: { note: "No hard limit, serial requests, cache, User-Agent" },
  internetArchive: { note: "No fixed public limit confirmed" },
  nominatim: { maxReqPerSec: 1, note: "Valid ID, no heavy use" },
  overpass: { note: "Can refuse high-memory queries" },
  wikidataSPARQL: { note: "Broad queries time out" },
} as const;
