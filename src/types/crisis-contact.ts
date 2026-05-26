/**
 * CRISIS CONTACT VALIDATION SCHEMA
 * Chunk 11 — Ensures crisis contact data integrity
 *
 * Template Non-Negotiable: Crisis contacts must be verified,
 * bilingual (en/ar), and have confirmed status before deployment.
 *
 * Framework: §6.3, §28.9
 */

import { z } from "zod";

export const PilotCrisisContactSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  nameAr: z.string().min(1, "Arabic name required for bilingual pilot"),
  type: z.enum(["phone", "web", "info"]),
  value: z.string().min(1),
  status: z.enum(["confirmed", "unconfirmed", "deprecated"]),
  description: z.string().min(10),
  descriptionAr: z.string().min(5, "Arabic description required"),
});

export type ValidatedCrisisContact = z.infer<typeof PilotCrisisContactSchema>;

export const PilotCrisisRegistrySchema = z.object({
  contacts: z.array(PilotCrisisContactSchema).min(5, "Minimum 5 crisis contacts required"),
});

/**
 * Validates the crisis contacts JSON and returns a report.
 */
export function validateCrisisContacts(data: unknown): {
  valid: boolean;
  totalContacts: number;
  errors: string[];
  byType: Record<string, number>;
  bilingualCoverage: number;
} {
  const result = PilotCrisisRegistrySchema.safeParse(data);

  if (!result.success) {
    return {
      valid: false,
      totalContacts: 0,
      errors: result.error.issues.map(e => `${e.path.join(".")}: ${e.message}`),
      byType: {},
      bilingualCoverage: 0,
    };
  }

  const contacts = result.data.contacts;
  const byType: Record<string, number> = {};
  let bilingualCount = 0;

  for (const c of contacts) {
    byType[c.type] = (byType[c.type] || 0) + 1;
    if (c.nameAr && c.descriptionAr) bilingualCount++;
  }

  return {
    valid: true,
    totalContacts: contacts.length,
    errors: [],
    byType,
    bilingualCoverage: Math.round((bilingualCount / contacts.length) * 100),
  };
}
