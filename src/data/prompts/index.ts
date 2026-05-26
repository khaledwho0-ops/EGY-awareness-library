/**
 * Prompt Library — Complete Index
 * Framework: §20 (lines 1289-1389)
 *
 * Total: 42 prompts (24 DeepReal + 9 Mental Health + 9 Religion Hub)
 * All prompts are EXACT verbatim copies from the Master Framework.
 *
 * Variable slots (§20.2): {claim}, {url}, {source_name}, {date},
 * {region}, {language}, {media_type}, {topic}
 *
 * 42-prompt starter pack generates 250+ practical runtime variants (§20.2)
 */

export type { PromptEntry, PromptStrategy } from "./deepreal-prompts";
export { DEEPREAL_PROMPTS } from "./deepreal-prompts";
export { MENTAL_HEALTH_PROMPTS } from "./mental-health-prompts";
export { RELIGION_HUB_PROMPTS } from "./religion-prompts";

import { DEEPREAL_PROMPTS } from "./deepreal-prompts";
import { MENTAL_HEALTH_PROMPTS } from "./mental-health-prompts";
import { RELIGION_HUB_PROMPTS } from "./religion-prompts";

/** All 42 framework-specified prompts */
export const ALL_PROMPTS = [
  ...DEEPREAL_PROMPTS,
  ...MENTAL_HEALTH_PROMPTS,
  ...RELIGION_HUB_PROMPTS,
];

/** Get prompts filtered by MVP */
export function getPromptsByMVP(mvp: "deepreal" | "mental-health" | "religion-hub") {
  return ALL_PROMPTS.filter((p) => p.mvp === mvp);
}

/** Get a single prompt by ID */
export function getPromptById(id: string) {
  return ALL_PROMPTS.find((p) => p.id === id);
}

/**
 * Fill prompt variables with user-provided values
 * Replaces {claim}, {url}, {topic}, {region} etc.
 */
export function fillPromptVariables(
  promptText: string,
  variables: Record<string, string>
): string {
  let filled = promptText;
  for (const [key, value] of Object.entries(variables)) {
    filled = filled.replace(new RegExp(`\\{${key}\\}`, "g"), value);
  }
  return filled;
}
