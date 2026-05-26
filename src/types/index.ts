/**
 * TYPE BARREL EXPORT
 * Egyptian Awareness Library — Complete Type System
 *
 * Covers ALL data points from framework:
 * - 17 constructs (12 original + 5 baseline)
 * - 6 instruments (MIST-20, MHLS, GHSQ, Brief RCOPE, SUS, MC-SDS)
 * - 42 exercises (14 DR + 14 MH + 14 RH) — all with COM-B metadata
 * - 42 KeyHunter entries (7 layers each)
 * - 100 sources (7-criteria scoring + freshness monitoring)
 * - 42 prompts (12 strategies, 6 Bloom levels, COM-B targets)
 * - 17 non-exercise modes
 * - 15 API integrations
 * - 11 safety risks
 * - 3 disclaimer templates
 * - 10 crisis contacts (expanded)
 * - 8 Gate Check steps
 * - 5 UI boxes
 * - COM-B behavioral analytics pipeline
 */

// Source + Trust + Tags
export * from "./source";

// KeyHunter 7-Layer System
export * from "./keyhunter";

// Exercise Template
export * from "./exercise";

// Assessment Instruments + Baseline
export * from "./assessment";

// Prompt Library
export * from "./prompt";

// Analytics + Modes
export * from "./analytics";

// User / Participant
export * from "./user";

// Safety + Disclaimers + Crisis
export * from "./safety";

// API Response + Cache
export * from "./api-response";

// Crisis Contact Validation (Chunk 11)
export * from "./crisis-contact";
