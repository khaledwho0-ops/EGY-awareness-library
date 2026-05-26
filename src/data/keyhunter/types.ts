/**
 * KeyHunter Entry Type — §7.3 Data Model
 *
 * Each entry has exactly 7 layers as specified in the framework.
 */
export interface KeyHunterEntry {
  id: string;                    // Format: {mvp-prefix}-kh-{nn}
  topic: string;                 // Human-readable topic name
  mvp: "deepreal" | "mental-health" | "religion-hub";
  coreKeywords: string[];        // Layer 1: 3-5 core keywords
  expertKeywords: string[];      // Layer 2: 3-5 expert keywords
  hiddenTerms: string[];         // Layer 3: 2-3 hidden terms
  researchPhrases: string[];     // Layer 4: 2-3 research phrases
  threatKeywords: string[];      // Layer 5: 2-3 threat keywords
  confusionWords: string[];      // Layer 6: 2-3 confusion words
  promptSuggestions: string[];   // Layer 7: 1-2 prompt suggestions
  source: string;                // Academic citation
  lastUpdated: string;           // ISO date
  // COM-B linkage (Chunk 11 — links KeyHunter to behavioral change pipeline)
  comBTarget?: string;           // e.g., "Capability/Psychological"
  day?: number;                  // Exercise day (1-14) this entry maps to
}
