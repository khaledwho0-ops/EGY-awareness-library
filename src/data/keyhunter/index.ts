/**
 * KeyHunter — Complete Registry
 * Framework: §7, §10.3
 *
 * Total: 42 entries (14 DeepReal + 14 Mental Health + 14 Religion Hub)
 * Coverage: 100% of exercises have a KeyHunter entry (§7.6)
 */

export type { KeyHunterEntry } from "./types";
export { DEEPREAL_KEYHUNTER } from "./deepreal-entries";
export { MENTAL_HEALTH_KEYHUNTER } from "./mental-health-entries";
export { RELIGION_HUB_KEYHUNTER } from "./religion-hub-entries";

import { DEEPREAL_KEYHUNTER } from "./deepreal-entries";
import { MENTAL_HEALTH_KEYHUNTER } from "./mental-health-entries";
import { RELIGION_HUB_KEYHUNTER } from "./religion-hub-entries";

/** All 42 KeyHunter entries */
export const ALL_KEYHUNTER_ENTRIES = [
  ...DEEPREAL_KEYHUNTER,
  ...MENTAL_HEALTH_KEYHUNTER,
  ...RELIGION_HUB_KEYHUNTER,
];

/** Get a single entry by ID */
export function getKeyHunterEntry(id: string) {
  return ALL_KEYHUNTER_ENTRIES.find((e) => e.id === id);
}

/** Get entries by MVP */
export function getKeyHunterByMVP(mvp: "deepreal" | "mental-health" | "religion-hub") {
  return ALL_KEYHUNTER_ENTRIES.filter((e) => e.mvp === mvp);
}
