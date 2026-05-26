/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * IMPORTANT — Server-only module
 * All heavy NLP deps are lazily resolved so that Turbopack
 * never tries to bundle them into a client chunk.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _vaderSIA: any = null;
function getVader() {
  if (!_vaderSIA) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mod = require("vader-sentiment") as any;
    _vaderSIA = mod.SentimentIntensityAnalyzer ?? mod;
  }
  return _vaderSIA;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _nlp: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _its: any = null;
function getNlp() {
  if (!_nlp) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const winkNLP = require("wink-nlp") as any;
    const winkModel = require("wink-eng-lite-web-model");
    _nlp = winkNLP.default ? winkNLP.default(winkModel) : winkNLP(winkModel);
  }
  return _nlp;
}
function getIts() {
  if (!_its) {
    const n = getNlp();
    _its = n.its;
  }
  return _its;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _textReadability: any = null;
function getTextReadability() {
  if (!_textReadability) {
    const mod = require("text-readability");
    // text-readability uses __esModule interop — the actual API lives on .default
    _textReadability = mod.default ?? mod;
  }
  return _textReadability;
}


type SentimentLabel = "positive" | "negative" | "neutral";

export interface SentimentResult {
  label: SentimentLabel;
  compound: number;
  positive: number;
  negative: number;
  neutral: number;
  manipulationScore: number;
  emotionalTriggers: string[];
  persuasionPatterns: string[];
  topContributors: string[];
  entities: string[];
  tokenCount: number;
  readabilityGrade: number;
  crisisDetected: boolean;
  crisisConfidence: number;
}

interface SentimentBadge {
  label: string;
  color: string;
  bg: string;
  icon: string;
}

const EMOTIONAL_TRIGGERS = [
  "urgent",
  "breaking",
  "warning",
  "shocking",
  "outrage",
  "fear",
  "panic",
  "miracle",
  "secret",
  "exposed",
  "crisis",
  "danger",
  "catastrophe",
  "guilt",
  "shame",
  "hopeless",
  "worthless",
  "unsafe",
  "helpless",
  "desperate",
  "suicide",
  "die",
];

const PERSUASION_PATTERNS = [
  "do this now",
  "share before deleted",
  "they don't want you to know",
  "they dont want you to know",
  "what they won't tell you",
  "what they wont tell you",
  "secret cure",
  "miracle cure",
  "guaranteed cure",
  "everyone is talking about this",
  "act now",
  "must watch",
  "must see",
  "only natural solution",
  "zero side effects",
];

const CRISIS_POSITIVE_BUFFER = [
  "i am safe",
  "i am okay",
  "i need support",
  "i should ask for help",
  "this claim is manipulative",
  "this content feels unsafe",
];

const CRISIS_CORPUS = [
  "i want to die",
  "i want to disappear",
  "i feel hopeless and unsafe",
  "there is no point in living",
  "i cannot go on anymore",
  "i want to hurt myself",
  "i am thinking about suicide",
  "nothing matters and i am done",
  "i feel trapped and cannot stay alive",
  "i am not safe with my thoughts",
];

const NON_CRISIS_CORPUS = [
  "this article is manipulative but i am safe",
  "i feel stressed but i can cope",
  "i need help with this assignment",
  "this headline is emotionally loaded",
  "i am angry about this misinformation",
  "i am studying today and feel okay",
  "this post is scary but i am not in danger",
  "i should talk to a friend or counselor",
  "this content is misleading and dramatic",
  "i feel anxious but i am safe right now",
];

interface BayesModel {
  priors: Record<"crisis" | "noncrisis", number>;
  tokenCounts: Record<"crisis" | "noncrisis", Map<string, number>>;
  totalTokens: Record<"crisis" | "noncrisis", number>;
  vocabulary: Set<string>;
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function tokenizeForBayes(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1);
}

function createBayesModel(): BayesModel {
  const tokenCounts = {
    crisis: new Map<string, number>(),
    noncrisis: new Map<string, number>(),
  };
  const totalTokens = {
    crisis: 0,
    noncrisis: 0,
  };
  const vocabulary = new Set<string>();

  const ingest = (label: "crisis" | "noncrisis", samples: string[]) => {
    samples.forEach((sample) => {
      tokenizeForBayes(sample).forEach((token) => {
        vocabulary.add(token);
        tokenCounts[label].set(token, (tokenCounts[label].get(token) ?? 0) + 1);
        totalTokens[label] += 1;
      });
    });
  };

  ingest("crisis", CRISIS_CORPUS);
  ingest("noncrisis", NON_CRISIS_CORPUS);

  const totalDocuments = CRISIS_CORPUS.length + NON_CRISIS_CORPUS.length;

  return {
    priors: {
      crisis: CRISIS_CORPUS.length / totalDocuments,
      noncrisis: NON_CRISIS_CORPUS.length / totalDocuments,
    },
    tokenCounts,
    totalTokens,
    vocabulary,
  };
}

const crisisBayesModel = createBayesModel();

function getReadabilityGrade(text: string): number {
  return round(clamp(getTextReadability().fleschKincaidGrade(text), 0, 18));
}

function findMatches(text: string, candidates: string[]): string[] {
  const lowered = text.toLowerCase();
  return candidates.filter((candidate) => lowered.includes(candidate)).slice(0, 8);
}

function buildEntityList(text: string): string[] {
  const doc = getNlp().readDoc(text);
  const entities = doc.entities().out(getIts().value) as string[];
  if (entities.length > 0) {
    return entities.slice(0, 6);
  }

  const tokens = doc
    .tokens()
    .out()
    .map((token: string) => token.trim())
    .filter((token: string) => /^[A-Z][a-z]{2,}/.test(token));

  return Array.from(new Set<string>(tokens)).slice(0, 6);
}

function getTopContributors(text: string): string[] {
  const doc = getNlp().readDoc(text);
  const tokens = doc
    .tokens()
    .out()
    .map((token: string) => token.toLowerCase())
    .filter((token: string) => /^[a-z][a-z'-]{2,}$/.test(token));

  const emotionallyWeighted = tokens.filter((token: string) =>
    EMOTIONAL_TRIGGERS.includes(token) ||
    ["fake", "fraud", "lies", "lying", "hoax", "threat", "attack"].includes(token),
  );

  return Array.from(new Set<string>(emotionallyWeighted)).slice(0, 6);
}

function classifyCrisis(text: string, compound: number, emotionalTriggers: string[]): {
  detected: boolean;
  confidence: number;
} {
  const lowered = text.toLowerCase();
  const tokens = tokenizeForBayes(lowered);
  const vocabularySize = Math.max(crisisBayesModel.vocabulary.size, 1);
  const scoreFor = (label: "crisis" | "noncrisis") => {
    let logProbability = Math.log(crisisBayesModel.priors[label]);
    tokens.forEach((token) => {
      const count = crisisBayesModel.tokenCounts[label].get(token) ?? 0;
      const smoothed = (count + 1) / (crisisBayesModel.totalTokens[label] + vocabularySize);
      logProbability += Math.log(smoothed);
    });
    return logProbability;
  };
  const crisisScore = scoreFor("crisis");
  const nonCrisisScore = scoreFor("noncrisis");
  const maxScore = Math.max(crisisScore, nonCrisisScore);
  const normalizedCrisis = Math.exp(crisisScore - maxScore);
  const normalizedNonCrisis = Math.exp(nonCrisisScore - maxScore);
  const classifierSignal = normalizedCrisis / Math.max(normalizedCrisis + normalizedNonCrisis, 0.0001);

  const directRiskPattern = /(want to die|thinking about suicide|hurt myself|end my life|cannot go on|no point in living|kill myself)/i.test(lowered);
  const bufferedLanguage = CRISIS_POSITIVE_BUFFER.some((phrase) => lowered.includes(phrase));
  const lexicalRiskBoost = emotionalTriggers.filter((trigger) =>
    ["hopeless", "worthless", "unsafe", "helpless", "desperate", "suicide", "die"].includes(trigger),
  ).length * 0.08;

  const confidence = clamp(
    classifierSignal + lexicalRiskBoost + (compound <= -0.6 ? 0.08 : 0),
    0,
    1,
  );

  const detected = directRiskPattern || (!bufferedLanguage && confidence >= 0.62);

  return {
    detected,
    confidence: round(confidence),
  };
}

export function analyzeSentiment(text: string): SentimentResult {
  const normalizedText = text.trim();

  if (!normalizedText) {
    return {
      label: "neutral",
      compound: 0,
      positive: 0,
      negative: 0,
      neutral: 1,
      manipulationScore: 0,
      emotionalTriggers: [],
      persuasionPatterns: [],
      topContributors: [],
      entities: [],
      tokenCount: 0,
      readabilityGrade: 0,
      crisisDetected: false,
      crisisConfidence: 0,
    };
  }

  const vaderScores = getVader().polarity_scores(normalizedText);
  const doc = getNlp().readDoc(normalizedText);
  const readabilityStats = doc.out(getIts().readabilityStats) as {
    numOfTokens?: number;
  };

  const emotionalTriggers = findMatches(normalizedText, EMOTIONAL_TRIGGERS);
  const persuasionPatterns = findMatches(normalizedText, PERSUASION_PATTERNS);
  const topContributors = getTopContributors(normalizedText);
  const entities = buildEntityList(normalizedText);

  const manipulationScore = clamp(
    Math.round(
      Math.abs(vaderScores.compound) * 40 +
      emotionalTriggers.length * 7 +
      persuasionPatterns.length * 12,
    ),
    0,
    100,
  );

  const crisis = classifyCrisis(normalizedText, vaderScores.compound, emotionalTriggers);

  let label: SentimentLabel = "neutral";
  if (vaderScores.compound >= 0.2) {
    label = "positive";
  } else if (vaderScores.compound <= -0.2) {
    label = "negative";
  }

  return {
    label,
    compound: round(vaderScores.compound),
    positive: round(vaderScores.pos),
    negative: round(vaderScores.neg),
    neutral: round(vaderScores.neu),
    manipulationScore,
    emotionalTriggers,
    persuasionPatterns,
    topContributors,
    entities,
    tokenCount: Number(readabilityStats?.numOfTokens ?? doc.tokens().length()),
    readabilityGrade: getReadabilityGrade(normalizedText),
    crisisDetected: crisis.detected,
    crisisConfidence: crisis.confidence,
  };
}

export function getSentimentBadge(result: SentimentResult): SentimentBadge {
  if (result.crisisDetected) {
    return {
      label: "Crisis-sensitive",
      color: "var(--color-danger)",
      bg: "rgba(239, 68, 68, 0.12)",
      icon: "!",
    };
  }

  if (result.manipulationScore >= 70) {
    return {
      label: "High emotional load",
      color: "var(--color-danger)",
      bg: "rgba(239, 68, 68, 0.12)",
      icon: "!",
    };
  }

  if (result.manipulationScore >= 45 || result.compound <= -0.35) {
    return {
      label: "Moderate emotional load",
      color: "var(--color-warning)",
      bg: "rgba(245, 158, 11, 0.12)",
      icon: "~",
    };
  }

  if (result.label === "positive" && result.persuasionPatterns.length > 0) {
    return {
      label: "Hope-bait risk",
      color: "var(--color-info)",
      bg: "rgba(14, 165, 233, 0.12)",
      icon: "+",
    };
  }

  return {
    label: "Low emotional load",
    color: "var(--color-success)",
    bg: "rgba(16, 185, 129, 0.12)",
    icon: "=",
  };
}
