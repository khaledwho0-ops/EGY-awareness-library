/**
 * KEYHUNTER TYPES + ZOD SCHEMAS
 * Framework: §7.2, §7.3, §7.4
 *
 * 42 entries (14 per MVP), each with 7 layers:
 * Layer 1: Core Keywords (3-5)
 * Layer 2: Expert Keywords (3-5)
 * Layer 3: Hidden Terms (2-3)
 * Layer 4: Research Phrases (2-3)
 * Layer 5: Threat Keywords (2-3)
 * Layer 6: Confusion Words (2-3)
 * Layer 7: Prompt Suggestions (1-2)
 */
import { z } from "zod";
import { MVPEnum } from "./source";

export const KeyHunterEntrySchema = z.object({
  id: z.string(),
  topic: z.string().min(1),
  mvp: MVPEnum,
  coreKeywords: z.array(z.string()).min(3).max(5),
  expertKeywords: z.array(z.string()).min(3).max(5),
  hiddenTerms: z.array(z.string()).min(2).max(3),
  researchPhrases: z.array(z.string()).min(2).max(3),
  threatKeywords: z.array(z.string()).min(2).max(3),
  confusionWords: z.array(z.string()).min(2).max(3),
  promptSuggestions: z.array(z.string()).min(1).max(2),
  source: z.string(), // Academic source citation
  lastUpdated: z.string(), // ISO date
});
export type KeyHunterEntry = z.infer<typeof KeyHunterEntrySchema>;

/**
 * KeyHunter Layer Names — used for UI rendering
 * Each layer has a specific color defined in globals.css
 */
export const KEYHUNTER_LAYERS = [
  { key: "coreKeywords", label: "Core Keywords", cssClass: "kh-layer-core", icon: "📘" },
  { key: "expertKeywords", label: "Expert Keywords", cssClass: "kh-layer-expert", icon: "🎓" },
  { key: "hiddenTerms", label: "Hidden Terms", cssClass: "kh-layer-hidden", icon: "🔍" },
  { key: "researchPhrases", label: "Research Phrases", cssClass: "kh-layer-research", icon: "📄" },
  { key: "threatKeywords", label: "Threat Keywords", cssClass: "kh-layer-threat", icon: "⚠️" },
  { key: "confusionWords", label: "Confusion Words", cssClass: "kh-layer-confusion", icon: "🔄" },
  { key: "promptSuggestions", label: "Prompt Suggestions", cssClass: "kh-layer-prompt", icon: "💡" },
] as const;
