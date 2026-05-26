/**
 * Assessment Instruments — Complete Registry
 * Framework: §3.2
 *
 * All 6 instruments required for the evaluation protocol (§4.1):
 *
 * | Instrument | Items | When | §Section |
 * |-----------|-------|------|----------|
 * | MIST-20   | 20    | Pre + Post | §3.2.1 |
 * | MHLS      | 35    | Pre + Post | §3.2.2 |
 * | Brief RCOPE | 14  | Pre + Post | §3.2.3 |
 * | GHSQ      | 17    | Pre + Post | §3.2.4 |
 * | SUS       | 10    | Post only  | §3.2.5 |
 * | MC-SDS    | 13    | Pre only   | §3.2.6 (TODO) |
 */

// Re-export instrument factories
export { createMHLSConfig } from "./mhls";
export { createBriefRCOPEConfig } from "./brief-rcope";
export { createGHSQConfig } from "./ghsq";
export { createMCSDSConfig } from "./mc-sds";

// Import SUS and MIST-20 for unified access
export { createSUSConfig } from "./sus";
// MIST-20 is already integrated into the assessment page
