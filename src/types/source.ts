/**
 * SOURCE TYPES + ZOD SCHEMAS
 * Framework: §7.3, §19.2, §19.4, §28.5, §28.6
 *
 * 100 trusted sources with:
 * - 3 trust bands (A=12-14, B=9-11, C=6-8)
 * - 6 tag fields per source (§28.5)
 * - 3 visibility tiers (§28.6)
 */
import { z } from "zod";

// ── MVP Type (§25.1) ──
export const MVPEnum = z.enum(["deepreal", "mental-health", "religion-hub"]);
export type MVP = z.infer<typeof MVPEnum>;

// ── Trust Bands (§19.2: A=12-14, B=9-11, C=6-8, Rejected=0-5) ──
export const TrustBandEnum = z.enum(["A", "B", "C", "rejected"]);
export type TrustBand = z.infer<typeof TrustBandEnum>;

// ── Source Role (§28.5: 5 values) ──
export const SourceRoleEnum = z.enum([
  "primary_guidance",
  "fact_check",
  "research_discovery",
  "context_data",
  "orientation_only",
]);
export type SourceRole = z.infer<typeof SourceRoleEnum>;

// ── User Visibility (§28.5: 3 values) ──
export const UserVisibilityEnum = z.enum([
  "default_user",
  "search_only",
  "admin_only",
]);
export type UserVisibility = z.infer<typeof UserVisibilityEnum>;

// ── Evidence Level (§28.5: 5 values) ──
export const EvidenceLevelEnum = z.enum([
  "official",
  "peer_reviewed",
  "methodological",
  "journalistic",
  "exploratory",
]);
export type EvidenceLevel = z.infer<typeof EvidenceLevelEnum>;

// ── Jurisdiction (§28.5: 3 values) ──
export const JurisdictionEnum = z.enum(["Egypt", "regional", "global"]);
export type Jurisdiction = z.infer<typeof JurisdictionEnum>;

// ── Source Scoring Rubric (§19.2: 7 criteria, 0-2 each, max 14) ──
export const SourceScoreSchema = z.object({
  editorialTransparency: z.number().int().min(0).max(2),
  authorTransparency: z.number().int().min(0).max(2),
  methodTransparency: z.number().int().min(0).max(2),
  correctionPolicy: z.number().int().min(0).max(2),
  evidenceQuality: z.number().int().min(0).max(2),
  institutionalIndependence: z.number().int().min(0).max(2),
  publicAccountability: z.number().int().min(0).max(2),
});
export type SourceScore = z.infer<typeof SourceScoreSchema>;

// ── Complete Source Entry (§19.4 + §28.5) ──
export const SourceEntrySchema = z.object({
  id: z.number().int().min(1).max(100),
  name: z.string().min(1),
  mvp: MVPEnum,
  whyTrusted: z.string(),         // §19.4 "why trusted" column
  appUse: z.string(),              // §19.4 "how used in app" column
  trustBand: TrustBandEnum,

  // §28.5 Tag Fields (6 required)
  sourceRole: SourceRoleEnum,
  userVisibility: UserVisibilityEnum,
  evidenceLevel: EvidenceLevelEnum,
  jurisdiction: JurisdictionEnum,
  lastVerified: z.string(),        // ISO date

  // Optional fields
  url: z.string().optional(),
  backupSource: z.string().optional(),
});
export type SourceEntry = z.infer<typeof SourceEntrySchema>;
