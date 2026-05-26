export type ReadinessStatus = "ready" | "conditional" | "blocked";

export interface InstrumentReadinessProfile {
  instrumentId: string;
  instrumentName: string;
  english: ReadinessStatus;
  arabic: ReadinessStatus;
  permissionStatus: "clear" | "conditional" | "not_confirmed";
  deploymentRule: string;
  why: string;
  nextAction: string;
  reviewerNeeded: string;
}

/**
 * Framework §28.1 gating matrix translated into runtime metadata.
 */
export const INSTRUMENT_READINESS: Record<string, InstrumentReadinessProfile> = {
  mist20: {
    instrumentId: "mist20",
    instrumentName: "MIST-20",
    english: "ready",
    arabic: "blocked",
    permissionStatus: "clear",
    deploymentRule: "English workflow may run now. Arabic deployment is locked until a localized item bank is built and revalidated.",
    why: "The verified instrument is English-based and headline items are culturally specific.",
    nextAction: "Run a proper Arabic adaptation workflow with localized headlines, expert filtering, and psychometric checks before participant launch.",
    reviewerNeeded: "DeepReal reviewer + language adaptation review",
  },
  mhls: {
    instrumentId: "mhls",
    instrumentName: "MHLS",
    english: "conditional",
    arabic: "conditional",
    permissionStatus: "conditional",
    deploymentRule: "Use only on a permission-cleared path. Arabic use stays conditional until the exact approved student form is frozen.",
    why: "Framework marks MHLS as potentially usable, but reuse must respect permission and exact form selection.",
    nextAction: "Confirm the exact licensed form, document the permission path, and freeze the participant language version.",
    reviewerNeeded: "Mental Health reviewer + instrument permission check",
  },
  "brief-rcope": {
    instrumentId: "brief-rcope",
    instrumentName: "Brief RCOPE",
    english: "conditional",
    arabic: "blocked",
    permissionStatus: "not_confirmed",
    deploymentRule: "English use is supervision-only. Arabic participant deployment remains locked until translation, theology-safety review, and reliability pilot are complete.",
    why: "Framework keeps the construct but explicitly says Arabic deployment is not ready in the current verification pass.",
    nextAction: "Secure item-use clarity, run translation/back-translation, and complete a small pilot before Arabic launch.",
    reviewerNeeded: "Religion Hub reviewer + theology / psychometric review",
  },
  ghsq: {
    instrumentId: "ghsq",
    instrumentName: "GHSQ",
    english: "conditional",
    arabic: "blocked",
    permissionStatus: "conditional",
    deploymentRule: "English route may be used for English-literate participants. Arabic deployment stays locked until translation, back-translation, and cognitive pilot are completed.",
    why: "Framework marks GHSQ as not Arabic-ready in the current pass.",
    nextAction: "Complete adaptation for Egyptian Arabic use and confirm the final administered version.",
    reviewerNeeded: "Mental Health reviewer + language adaptation review",
  },
  sus: {
    instrumentId: "sus",
    instrumentName: "SUS",
    english: "ready",
    arabic: "ready",
    permissionStatus: "clear",
    deploymentRule: "Ready for post-test use across the MVPs.",
    why: "Public-domain usability measure with stable administration logic.",
    nextAction: "Keep wording stable and collect post-only.",
    reviewerNeeded: "Usability / methods reviewer only",
  },
  "mc-sds": {
    instrumentId: "mc-sds",
    instrumentName: "MC-SDS",
    english: "ready",
    arabic: "conditional",
    permissionStatus: "clear",
    deploymentRule: "English baseline use is ready. Arabic wording should be frozen before participant launch.",
    why: "The covariate logic is stable, but the exact participant language version still needs to be documented.",
    nextAction: "Freeze the administered text in the study packet and match it to the selected participant language.",
    reviewerNeeded: "Methods reviewer",
  },
};

export function getInstrumentReadiness(instrumentId: string): InstrumentReadinessProfile | null {
  return INSTRUMENT_READINESS[instrumentId] ?? null;
}
