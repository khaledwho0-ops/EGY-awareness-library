/**
 * Source Types — §19.2, §28.5, §28.6
 *
 * Schema enforces the exact tag structure required by the framework.
 */

export interface TrustedSource {
  id: number;                   // 1-100 per §19.4
  name: string;                 // Official name
  mvp: "deepreal" | "mental-health" | "religion-hub";  // Primary MVP module
  whyTrusted: string;           // §19.4 "why trusted" column
  appUse: string;               // §19.4 "how used in app" column
  
  // §28.5 required tags
  sourceRole:
    | "fact_check"              // Verifies claims
    | "primary_guidance"        // Authoritative educational content
    | "research_discovery"      // Academic discovery tool
    | "context_data"            // Background/trend data
    | "orientation_only";       // Initial exploration only
  
  userVisibility:
    | "default_user"            // Shown to all users
    | "search_only"             // Only appears in search results
    | "admin_only";             // Internal use only
  
  evidenceLevel:
    | "peer_reviewed"           // Published in peer-reviewed journals
    | "official"                // Government or international body
    | "journalistic"            // Professional fact-checking or news
    | "methodological"          // Technical methodology reference
    | "exploratory";            // Preliminary or non-peer-reviewed
  
  jurisdiction:
    | "global"
    | "regional"
    | "Egypt";
  
  trustBand: "A" | "B" | "C";  // §19.2 scoring: A(12-14), B(9-11), C(6-8)
  lastVerified: string;         // ISO date of last verification
  url?: string;                 // Optional — URL populated when needed
  backupSource?: string;        // §28.5 optional backup source ID
}
