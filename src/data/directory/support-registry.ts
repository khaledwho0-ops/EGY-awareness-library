export type SupportDirectoryType = "phone" | "web" | "reference";
export type SupportDirectoryStatus = "confirmed" | "pending";

import {
  DAR_AL_IFTA_CONTACTS_URL,
  DAR_AL_IFTA_TELEPHONE_SERVICE_URL,
  EGYPT_CRISIS_CONTACTS,
  MOHP_HOTLINE_SOURCE_URL,
  MOHP_MENTAL_HEALTH_PLATFORM_URL,
  OFFICIAL_SUPPORT_LAST_VERIFIED,
} from "@/data/directory/official-support";

export interface SupportDirectoryEntry {
  id: string;
  name: string;
  type: SupportDirectoryType;
  mvp: "mental-health" | "religion-hub" | "all";
  jurisdiction: "Egypt" | "regional" | "global";
  phone?: string;
  url?: string;
  hours: string;
  lastVerified: string;
  escalationUse: string;
  status: SupportDirectoryStatus;
  officialSource: string;
  notes: string;
}

/**
 * Framework §28.9-§28.10 support registry.
 * These entries are the operational safety / formal-guidance routes the app can surface,
 * not a generic links dump.
 */
export const SUPPORT_DIRECTORIES: SupportDirectoryEntry[] = [
  {
    id: "egypt-gsmhat-16328",
    name: "General Secretariat of Mental Health and Addiction Treatment Hotline",
    type: "phone",
    mvp: "mental-health",
    jurisdiction: "Egypt",
    phone: EGYPT_CRISIS_CONTACTS.mentalHealthShortCode,
    url: MOHP_MENTAL_HEALTH_PLATFORM_URL,
    hours: "24/7 urgent routing via hotline",
    lastVerified: OFFICIAL_SUPPORT_LAST_VERIFIED,
    escalationUse: "Use when the user is in crisis, is worried about self-harm, or needs an immediate official Egyptian mental-health support route.",
    status: "confirmed",
    officialSource: `Egypt Ministry of Health and Population hotline notice (${MOHP_HOTLINE_SOURCE_URL})`,
    notes: "Short code surfaced as the primary Egyptian mental-health line across the app because it is easy to remember in urgent situations.",
  },
  {
    id: "egypt-gsmhat-08008880700",
    name: "General Secretariat of Mental Health and Addiction Treatment Toll-Free Hotline",
    type: "phone",
    mvp: "mental-health",
    jurisdiction: "Egypt",
    phone: EGYPT_CRISIS_CONTACTS.mentalHealthTollFree,
    url: MOHP_MENTAL_HEALTH_PLATFORM_URL,
    hours: "24/7 urgent routing via hotline",
    lastVerified: OFFICIAL_SUPPORT_LAST_VERIFIED,
    escalationUse: "Use when the short code is unreachable or when a user specifically needs the toll-free GSMHAT backup number referenced by the Ministry of Health.",
    status: "confirmed",
    officialSource: `Egypt Ministry of Health and Population hotline notice (${MOHP_HOTLINE_SOURCE_URL})`,
    notes: "Kept as a backup route because MOHP published it alongside 16328 during hotline expansion and Gaza-response support communications.",
  },
  {
    id: "egypt-gsmhat-landline",
    name: "General Secretariat of Mental Health and Addiction Treatment Cairo Hotline",
    type: "phone",
    mvp: "mental-health",
    jurisdiction: "Egypt",
    phone: EGYPT_CRISIS_CONTACTS.mentalHealthLandline,
    url: MOHP_MENTAL_HEALTH_PLATFORM_URL,
    hours: "Official hotline support line",
    lastVerified: OFFICIAL_SUPPORT_LAST_VERIFIED,
    escalationUse: "Use as the landline backup published by the Ministry of Health when the short code or toll-free route is unavailable.",
    status: "confirmed",
    officialSource: `Egypt Ministry of Health and Population hotline notice (${MOHP_HOTLINE_SOURCE_URL})`,
    notes: "Secondary backup route published together with 16328 and 08008880700.",
  },
  {
    id: "egypt-ambulance-123",
    name: "Egyptian Ambulance Emergency Line",
    type: "phone",
    mvp: "all",
    jurisdiction: "Egypt",
    phone: EGYPT_CRISIS_CONTACTS.ambulance,
    hours: "24/7 emergency response",
    lastVerified: OFFICIAL_SUPPORT_LAST_VERIFIED,
    escalationUse: "Use when there is imminent danger, acute self-harm risk, medical emergency, or the person cannot stay safe while waiting for another support route.",
    status: "confirmed",
    officialSource: "Egypt public emergency service references",
    notes: "Shown whenever the platform detects a same-session crisis escalation path.",
  },
  {
    id: "egypt-mohp-platform",
    name: "MoHP Mental Health Platform",
    type: "web",
    mvp: "mental-health",
    jurisdiction: "Egypt",
    url: MOHP_MENTAL_HEALTH_PLATFORM_URL,
    hours: "Always available online",
    lastVerified: OFFICIAL_SUPPORT_LAST_VERIFIED,
    escalationUse: "Use for official online literacy, referral orientation, and support-navigation after education content or post-assessment prompts.",
    status: "confirmed",
    officialSource: `Egypt Ministry of Health and Population mental health platform (${MOHP_MENTAL_HEALTH_PLATFORM_URL})`,
    notes: "Primary digital referral route for the Mental Health MVP.",
  },
  {
    id: "egypt-dar-al-ifta-107",
    name: "Dar al-Ifta Egypt Telephone Service",
    type: "phone",
    mvp: "religion-hub",
    jurisdiction: "Egypt",
    phone: EGYPT_CRISIS_CONTACTS.darAlIfta,
    url: DAR_AL_IFTA_TELEPHONE_SERVICE_URL,
    hours: "Sunday-Thursday, 9 AM-5 PM (official contact page)",
    lastVerified: OFFICIAL_SUPPORT_LAST_VERIFIED,
    escalationUse: "Use when the user explicitly needs formal religious guidance beyond the app's scope, especially for a personal ruling or official consultation.",
    status: "confirmed",
    officialSource: `Egypt's Dar al-Ifta official contact and telephone-service pages (${DAR_AL_IFTA_CONTACTS_URL})`,
    notes: "Religion Hub should surface this only for formal-guidance routing, not as a replacement for psychological care.",
  },
  {
    id: "egypt-al-azhar-observatory",
    name: "Al-Azhar Observatory for Combating Extremism",
    type: "reference",
    mvp: "religion-hub",
    jurisdiction: "Egypt",
    url: "https://www.azhar.eg/observer",
    hours: "Reference resource",
    lastVerified: OFFICIAL_SUPPORT_LAST_VERIFIED,
    escalationUse: "Use when the issue involves extremist framing, manipulative religious messaging, or moderation / boundary-setting rather than personal fatwa guidance.",
    status: "confirmed",
    officialSource: "Official Al-Azhar Observatory pages",
    notes: "Reference body for moderation and anti-extremism boundaries, not emergency counseling.",
  },
  {
    id: "campus-counseling-pending",
    name: "University Campus Counseling Service",
    type: "reference",
    mvp: "mental-health",
    jurisdiction: "Egypt",
    hours: "Depends on target university",
    lastVerified: OFFICIAL_SUPPORT_LAST_VERIFIED,
    escalationUse: "Use only after the exact university service is locally verified for the pilot site.",
    status: "pending",
    officialSource: "Per-university student support office",
    notes: "Framework §28.9 marks this as pending local confirmation before launch.",
  },
];

export function getSupportDirectoriesForMvp(
  mvp: SupportDirectoryEntry["mvp"],
): SupportDirectoryEntry[] {
  return SUPPORT_DIRECTORIES.filter((entry) => entry.mvp === "all" || entry.mvp === mvp);
}
