/**
 * Ambient type declarations for untyped vendor modules.
 * These stubs satisfy TypeScript without affecting runtime behavior.
 */

declare module "canvas-confetti" {
  interface Options {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: { x?: number; y?: number };
    colors?: string[];
    shapes?: string[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
  }
  function confetti(options?: Options): Promise<null>;
  export = confetti;
}

declare module "vader-sentiment" {
  interface SentimentResult {
    compound: number;
    pos: number;
    neg: number;
    neu: number;
  }
  class SentimentIntensityAnalyzer {
    polarity_scores(text: string): SentimentResult;
  }
  export { SentimentIntensityAnalyzer };
}

declare module "text-readability" {
  function fleschReadingEase(text: string): number;
  function fleschKincaidGrade(text: string): number;
  function gunningFog(text: string): number;
  function smogIndex(text: string): number;
  function automatedReadabilityIndex(text: string): number;
  function colemanLiauIndex(text: string): number;
  function linsearWriteFormula(text: string): number;
  function daleChallReadabilityScore(text: string): number;
  function textStandard(text: string, floatOutput?: boolean): string | number;
  function syllableCount(text: string): number;
  function lexiconCount(text: string, removePunctuation?: boolean): number;
  function sentenceCount(text: string): number;
  export {
    fleschReadingEase, fleschKincaidGrade, gunningFog, smogIndex,
    automatedReadabilityIndex, colemanLiauIndex, linsearWriteFormula,
    daleChallReadabilityScore, textStandard, syllableCount, lexiconCount, sentenceCount,
  };
}
