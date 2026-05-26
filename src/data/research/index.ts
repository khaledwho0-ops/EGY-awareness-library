/**
 * RESEARCH DATA — Barrel Export
 * Centralizes all research data modules for import across the app.
 */

// ─── Modules ─────────────────────────────────────────────────────
export {
  // Types
  type CrisisStatistic,
  type CaseStudy,
  type ViralFake,
  // Data
  GLOBAL_CRISIS_STATISTICS,
  GLOBAL_CASE_STUDIES,
  VIRAL_FAKES_REGISTRY,
  // Helpers
  getCrisisStatsByMVP,
  getCaseStudiesByRegion,
  getViralFakesByRegion,
  getViralFakesBySiftStep,
  getCaseStudyForExercise,
} from "./global-crisis-data";

export {
  type VictimProfile,
  VICTIM_IMPACT_PROFILES,
  getProfilesByDemographic,
  getProfilesByMVP,
  getProfileForExerciseDay,
} from "./victim-impact-profiles";

export {
  type MediaType,
  type SupportMedia,
  SUPPORT_MEDIA_REGISTRY,
  getMediaByType,
  getMediaByMVP,
  getMediaForExercise,
} from "./support-media-registry";

export {
  type ScopeSectionCoverage,
  type ResearchTaskCoverage,
  PROJECT_SCOPE_COVERAGE,
  RESEARCH_TASKS_COVERAGE,
} from "./coverage-maps";

export {
  type SubResearchQuestion,
  type HypothesisSpec,
  type LabeledValue,
  type MeasurementPhase,
  type EvaluationMethod,
  type SuccessCriterion,
  RESEARCH_PROTOCOL,
  SUB_RESEARCH_QUESTIONS,
  FALSIFIABLE_HYPOTHESES,
  SAMPLING_STRATEGY,
  MEASUREMENT_SCHEDULE,
  EVALUATION_PROTOCOL,
  SUCCESS_CRITERIA,
} from "./protocol-spec";

export {
  type ParalysisStrategy,
  type ExpertImplementation,
  type UniversityStandard,
  type KeywordMatrixEntry,
  type ResearchApplication,
  type IALComponent,
  type AuthorityOutreach,
  type PromptStrategy,
  type StandardApplication,
  type SciencePrinciple,
  type NegativeScienceThreat,
  type ReferenceItem,
  type PresentationGuideline,
  type AntiPattern,
  PARALYSIS_STRATEGIES,
  DATA_SCIENTIST_STRATEGIES,
  UNIVERSAL_RESEARCH_STANDARDS,
  APPLIED_SCIENCE_PRINCIPLES,
  NEGATIVE_SCIENCE_THREATS,
  UNIVERSITY_STANDARDS,
  CORE_PROJECT_KEYWORDS,
  SOURCE_STANDARD_KEYWORDS,
  SCIENCE_DOMAIN_KEYWORDS,
  INTELLIGENCE_KEYWORDS,
  MENTAL_HEALTH_SYNTHESIS,
  RELIGION_SYNTHESIS,
  STANDARDS_SYNTHESIS,
  IAL_MODEL_COMPONENTS,
  AUTHORITY_OUTREACH,
  PROMPT_ENGINEERING_STRATEGIES,
  CURATED_BOOKS,
  CURATED_PODCASTS,
  CURATED_MEDIA,
  FOUNDATIONAL_QUOTES,
  PRESENTATION_CONFIDENCE_GUIDELINES,
  DEFENSE_ANTI_PATTERNS,
  DEFENSE_CHECKLIST,
} from "./defense-library";
