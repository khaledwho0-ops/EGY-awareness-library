/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Cognitive Bias Detector
 *
 * Server-only module — all heavy NLP deps are lazily required
 * so Turbopack / Next.js never bundles them into a client chunk.
 *
 * Detection tiers:
 *   Tier 1  – Regex pattern matching (EN + AR) per bias
 *   Tier 2  – Linguistic feature extraction via wink-nlp + VADER
 *   Scoring – Weighted combination → confidence 0-1, threshold 0.35
 */

// ---------------------------------------------------------------------------
//  Lazy loaders (same pattern as nlp/sentiment-engine.ts)
// ---------------------------------------------------------------------------

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

import { Domain, CognitiveBias, DetectedBias, COGNITIVE_BIASES } from './biases-data';

// ---------------------------------------------------------------------------
//  Tier 1 — Regex pattern banks per bias (EN + AR)
// ---------------------------------------------------------------------------

interface BiasPatternBank {
  biasId: string;
  patterns: RegExp[];
  /** If *all* of these are absent the confidence gets a penalty */
  antiPatterns?: RegExp[];
  weight: number; // per-match base weight
  evidenceEn: string;
  evidenceAr: string;
}

const BIAS_PATTERN_BANKS: BiasPatternBank[] = [
  {
    biasId: "E1",
    patterns: [
      /only.*evidence|proves? my point|all studies show|the proof is clear|clearly proves?/i,
      /ignor(e|ing) (the )?contradicting|no (other|alternative) explanation/i,
      /everyone (who )?agree|research confirms? what (i|we) (already )?know/i,
      /only (trust|believe|read|follow|listen to).{0,30}(confirm|agree|support|match|prove)/i,
      /confirms?\s+what (i|we)\s*(already\s*)?(believe|think|know|feel)/i,
      /sources? that (confirm|agree with|support|prove)/i,
      /كل الدراسات|الدليل واضح|ده بيأكد كلام(ي|نا)|مفيش تفسير تاني/i,
      /بس هو اللي صح|مفيش رأي تاني|بصدق بس اللي بيأكد/i,
    ],
    weight: 0.22,
    evidenceEn: "One-sided evidence gathering detected — only supportive data cited",
    evidenceAr: "تم رصد جمع أدلة أحادي الجانب — فقط البيانات الداعمة مذكورة",
  },
  {
    biasId: "E2",
    patterns: [
      /i know better|experts are wrong|scientists don't understand|i('ve| have) researched? (it )?(myself|on my own)/i,
      /don't need (a )?degree|simple (common )?sense|wake up sheeple/i,
      /any(one|body) can see|obvious(ly)?.*wrong/i,
      /أنا أعرف أكتر|العلماء غلط|مش محتاج شهادة|المنطق بيقول/i,
      /أنا قريت وفهمت|ده واضح لأي حد/i,
    ],
    weight: 0.24,
    evidenceEn: "Overconfident dismissal of expert knowledge detected",
    evidenceAr: "تم رصد ثقة مفرطة في رفض المعرفة المتخصصة",
  },
  {
    biasId: "E3",
    patterns: [
      /\d[\d,.]*%?\s*(of|say|show|prove|confirm)/i,
      /the (first|initial|original) (study|report|number|stat)/i,
      /as (i|we) (first|initially) (said|mentioned|showed|noted)/i,
      /الرقم الأول|الإحصائية الأولى|زي ما قلنا الأول/i,
      /أول دراسة|الإحصاء بيقول/i,
    ],
    antiPatterns: [
      /however|but|on the other hand|alternatively|other studies/i,
    ],
    weight: 0.16,
    evidenceEn: "First statistic or number anchors the entire argument",
    evidenceAr: "الرقم أو الإحصائية الأولى تسيطر على الحجة بالكامل",
  },
  {
    biasId: "E4",
    patterns: [
      /everyone knows|it's everywhere|we('ve| have) all (seen|heard)|you see it every ?day/i,
      /recent(ly)? (there|we|i) (saw|heard|noticed)|just (yesterday|last week|today)/i,
      /all over (the )?(news|social media|facebook|twitter)/i,
      /الكل عارف|منتشر|شايفه في كل حتة|ده في الأخبار كل يوم/i,
      /كل الناس بتتكلم عن|سمعت إمبارح/i,
    ],
    weight: 0.20,
    evidenceEn: "Recent or easily recalled examples used as primary evidence",
    evidenceAr: "أمثلة حديثة أو سهلة التذكر تُستخدم كدليل رئيسي",
  },
  {
    biasId: "E5",
    patterns: [
      /millions? (of people )?(believe|use|trust|do)|everyone (does|believes?|agrees?|knows?)/i,
      /most people|the majority|popular(ity)? (proves?|means?|shows?)/i,
      /can'?t all be wrong|so many people can('t|not)/i,
      /everyone\s+(is|are|keeps?|'?s)\s*(sharing|posting|saying|talking|forwarding|doing)/i,
      /\d[\d,.]*\s*(k|thousand|million|m)?\+?\s*(shares?|likes?|views?|people|followers?)/i,
      /can'?t (all )?be wrong|must be true|so many (shares?|likes?|people)/i,
      /ملايين|الكل بيعمل|الأغلبية|معقول كلهم غلط/i,
      /ناس كتير|الكل بيقول|الكل بيعمل شير|مش ممكن كلهم غلط/i,
    ],
    weight: 0.22,
    evidenceEn: "Popularity used as proof instead of evidence",
    evidenceAr: "الشعبية تُستخدم كدليل بدلاً من البراهين",
  },
  {
    biasId: "E6",
    patterns: [
      /dr\.?\s+\w+\s+(said|says|told|confirms?|proved?)|professor\s+\w+/i,
      /sheikh\s+\w+\s+(said|says|told|ruled|confirmed)|the expert said/i,
      /according to (dr|professor|sheikh|imam)|a (doctor|scientist|expert) (said|confirmed)/i,
      /الدكتور قال|الشيخ قال|حسب البروفيسور|العالم أكد/i,
      /الإمام قال|الخبير بيقول/i,
    ],
    antiPatterns: [
      /study|peer.?review|data|evidence|trial|research|experiment|meta.?analysis/i,
    ],
    weight: 0.20,
    evidenceEn: "Authority figure cited as sole evidence without supporting data",
    evidenceAr: "شخصية ذات سلطة مذكورة كدليل وحيد بدون بيانات داعمة",
  },
  {
    biasId: "E7",
    patterns: [
      /proves? (i('m| am)|we('re| are)) right|even more reason|that('s| is) exactly why/i,
      /you('re| are) (just )?proving my point|nice try|double(d| )down/i,
      /they('re| are) trying to silence|this confirms? (the )?conspiracy/i,
      /ده بيأكد إن أنا صح|بيحاولوا يسكتونا|ده بالظبط اللي قلته/i,
      /شايف.*بيحاولوا|كل ما يردوا علينا/i,
    ],
    weight: 0.24,
    evidenceEn: "Counter-evidence used to strengthen original belief (backfire)",
    evidenceAr: "الأدلة المضادة تُستخدم لتعزيز المعتقد الأصلي (تأثير عكسي)",
  },
  {
    biasId: "E8",
    patterns: [
      /since\s+(i|we)\s+started|ever since|after\s+(i|we)\s+(began|started)/i,
      /every time (i|we)|whenever (i|we).*then|because (i|we) did/i,
      /caused? by|led to|resulted? in|that('s| is) why/i,
      /من ساعة ما|من يوم ما|كل ما.*يحصل|بسبب إن(ي|نا)/i,
      /عشان عملت|من وقت ما بدأت/i,
    ],
    weight: 0.18,
    evidenceEn: "Causal link assumed between unrelated events",
    evidenceAr: "تم افتراض علاقة سببية بين أحداث غير مرتبطة",
  },
  {
    biasId: "E9",
    patterns: [
      /deadly|catastroph|devastat|miraculous|incredible|unbelievable/i,
      /destroy|annihilat|obliterat|terrif|horrif|nightmar/i,
      /shocking|outrageous|disgusting|despicable|wonderful|amazing/i,
      /كارث|مدمر|مذهل|صادم|مقرف|فظيع|رهيب|عظيم|مذبحة/i,
      /فضيحة|خطير جداً|معجزة/i,
    ],
    weight: 0.14,
    evidenceEn: "Emotionally loaded framing detected in presentation",
    evidenceAr: "تم رصد تأطير عاطفي مُحمّل في العرض",
  },
  {
    biasId: "E10",
    patterns: [
      /(been|spent)\s+(doing|using|following|investing).*\b(years?|months?|decades?)\b/i,
      /invested?\s+(so|too)\s+much|can('t|not) (stop|quit|give up) now/i,
      /come this far|too late to (stop|change|go back)|already (paid|spent)/i,
      /must keep (using|going|doing|it)|have to (keep|continue)|can'?t (stop|quit) now|too much (money|time) (to|already)/i,
      /من سنين|صرفت كتير|مش هسيب دلوقتي|بقالي سنين/i,
      /مش هرجع|دفعت كتير|ضيعت وقت كتير/i,
    ],
    weight: 0.22,
    evidenceEn: "Past investment used to justify continuing a course of action",
    evidenceAr: "الاستثمار السابق يُستخدم لتبرير الاستمرار في مسار العمل",
  },
  {
    biasId: "E11",
    patterns: [
      /looks? (trustworthy|honest|reliable|credible)|charisma|eloquen|well[- ]?dressed/i,
      /beautiful|handsome|charming|impressive (person|speaker|man|woman)/i,
      /has a great (voice|presence|aura)|speaks? (so )?well/i,
      /شكله محترم|كاريزما|بيتكلم حلو|صوته جميل/i,
      /هيبته|منظره مقنع|شخصيته قوية/i,
    ],
    weight: 0.18,
    evidenceEn: "Appearance or charisma used as evidence of credibility",
    evidenceAr: "المظهر أو الكاريزما يُستخدم كدليل على المصداقية",
  },
  {
    biasId: "E12",
    patterns: [
      /won('t|not) happen|can('t|not) happen|impossible|never (going to|gonna)/i,
      /we('re| are) (fine|safe|ok)|nothing (to|will) worry|that('s| is) (far|distant)/i,
      /overreact|exaggerat|blown out of proportion|alarmist/i,
      /مش هيحصل|مستحيل|إحنا كويسين|مبالغة/i,
      /ده بعيد عننا|مفيش خطر|ده تهويل/i,
    ],
    weight: 0.20,
    evidenceEn: "Dismissal of realistic threats through normalcy assumptions",
    evidenceAr: "رفض التهديدات الواقعية من خلال افتراضات الحالة الطبيعية",
  },
  {
    biasId: "E13",
    patterns: [
      /\b(our|we|us)\b.*(better|superior|smarter|stronger|right)/i,
      /\b(they|them|their)\b.*(wrong|worse|inferior|backward|stupid)/i,
      /our (people|group|nation|community|team|madhab|sect)/i,
      /إحنا.*أحسن|هم.*غلط|شعبنا|جماعتنا أفضل/i,
      /المذهب بتاعنا|هم مش زينا/i,
    ],
    weight: 0.22,
    evidenceEn: "In-group favoritism and out-group derogation detected",
    evidenceAr: "تم رصد تحيز للمجموعة الداخلية وتحقير المجموعة الخارجية",
  },
  {
    biasId: "E14",
    patterns: [
      /the conclusion (is|was|shows?)|in (the )?end|the (result|bottom line|takeaway)/i,
      /proved that|finally shows?|most important(ly)? (is|was)/i,
      /the (key|main) (finding|point|result)/i,
      /النتيجة إن|في الآخر|أهم حاجة إن|الخلاصة/i,
      /المهم إن|اللي طلع إن/i,
    ],
    antiPatterns: [
      /method(ology)?|sample size|control group|peer.?review|replicated|margin of error/i,
    ],
    weight: 0.16,
    evidenceEn: "Conclusion cited without reference to methodology or process",
    evidenceAr: "الخلاصة مذكورة بدون إشارة للمنهجية أو العملية",
  },
  {
    biasId: "E15",
    patterns: [
      /everyone (says|knows)|as (i|we)('ve| have) (always )?said|been saying (this )?for/i,
      /i('ve| have) heard (this )?(many|a hundred|so many) times/i,
      /common knowledge|well[- ]?known (fact|truth)|it('s| is) (a )?fact/i,
      /الكل بيقول كده|زي ما بنقول دايماً|معروف|حقيقة ثابتة/i,
      /سمعتها كتير|ده كلام معروف/i,
    ],
    weight: 0.18,
    evidenceEn: "Repeated exposure to a claim presented as evidence of truth",
    evidenceAr: "التعرض المتكرر لادعاء يُقدم كدليل على صحته",
  },
];

// ---------------------------------------------------------------------------
//  Tier 2 — Linguistic Feature Extraction
// ---------------------------------------------------------------------------

interface LinguisticFeatures {
  sentimentCompound: number;
  sentimentExtremity: number; // |compound|, how polar
  absolutistCount: number;
  emotionalDensity: number; // emotional words / total words
  authorityMentions: number;
  evidenceKeywords: number;
  usVsThemRatio: number; // (us words - them words) normalized
  numberCount: number;
  questionCount: number;
  exclamationCount: number;
  uniqueSentenceRatio: number; // distinct sentences / total (repetition detector)
  tokenCount: number;
}

const ABSOLUTIST_WORDS = /\b(always|never|all|none|every|no one|nobody|nothing|everything|completely|totally|absolutely|entirely|impossible|certain(ly)?|undeniable|undoubtedly|without (a )?doubt)\b/gi;
const EMOTIONAL_WORDS = /\b(outrage|disgust|shock|horrif|terrib|amaz|incredibl|miracul|devastat|catastroph|panic|fear|hate|love|anger|fury|ecstat|desperat|hopeless|danger|threat|crisis)\w*/gi;
const AUTHORITY_WORDS = /\b(dr\.?|professor|sheikh|imam|expert|scientist|scholar|researcher|specialist|الدكتور|الشيخ|الإمام|البروفيسور|العالم|الخبير)\b/gi;
const EVIDENCE_WORDS = /\b(study|studies|research|data|evidence|experiment|trial|peer[- ]?review|meta[- ]?analysis|replicate|sample|control group|p[- ]?value|دراسة|بحث|أدلة|تجربة)\b/gi;
const US_WORDS = /\b(we|us|our|ours|ourselves|إحنا|بتاعنا|عندنا)\b/gi;
const THEM_WORDS = /\b(they|them|their|theirs|themselves|هم|بتاعهم|عندهم)\b/gi;

function countMatches(text: string, regex: RegExp): number {
  const m = text.match(regex);
  return m ? m.length : 0;
}

function extractLinguisticFeatures(text: string): LinguisticFeatures {
  const vader = getVader();
  const scores = vader.polarity_scores(text);

  const doc = getNlp().readDoc(text);
  const tokens: string[] = doc.tokens().out();
  const tokenCount = tokens.length || 1;

  const sentences: string[] = doc.sentences().out();
  const uniqueSentences = new Set(sentences.map((s: string) => s.toLowerCase().trim()));

  return {
    sentimentCompound: scores.compound,
    sentimentExtremity: Math.abs(scores.compound),
    absolutistCount: countMatches(text, ABSOLUTIST_WORDS),
    emotionalDensity: countMatches(text, EMOTIONAL_WORDS) / tokenCount,
    authorityMentions: countMatches(text, AUTHORITY_WORDS),
    evidenceKeywords: countMatches(text, EVIDENCE_WORDS),
    usVsThemRatio: (countMatches(text, US_WORDS) - countMatches(text, THEM_WORDS)) / tokenCount,
    numberCount: countMatches(text, /\b\d[\d,.]*%?\b/g),
    questionCount: (text.match(/\?/g) || []).length,
    exclamationCount: (text.match(/!/g) || []).length,
    uniqueSentenceRatio: sentences.length > 0 ? uniqueSentences.size / sentences.length : 1,
    tokenCount,
  };
}

// ---------------------------------------------------------------------------
//  Scoring engine
// ---------------------------------------------------------------------------

interface BiasScore {
  biasId: string;
  regexScore: number;
  linguisticBoost: number;
  antiPenalty: number;
  finalConfidence: number;
  matchedPatterns: number;
}

function computeBiasScores(
  text: string,
  features: LinguisticFeatures,
): BiasScore[] {
  const scores: BiasScore[] = [];

  for (const bank of BIAS_PATTERN_BANKS) {
    let matchCount = 0;
    for (const pat of bank.patterns) {
      if (pat.test(text)) matchCount++;
    }
    if (matchCount === 0) continue; // no regex hit → skip this bias entirely

    // Base regex score: diminishing returns per additional match
    const regexScore = Math.min(
      bank.weight * matchCount * (1 - 0.12 * (matchCount - 1)),
      0.72,
    );

    // Anti-pattern penalty: if evidence / balancing language is present, reduce score
    let antiPenalty = 0;
    if (bank.antiPatterns) {
      for (const ap of bank.antiPatterns) {
        if (ap.test(text)) antiPenalty += 0.12;
      }
    }

    // Linguistic boosts per bias
    let linguisticBoost = 0;

    switch (bank.biasId) {
      case "E1": // Confirmation bias — one-sided, absolutist
        linguisticBoost += features.absolutistCount * 0.03;
        if (features.sentimentExtremity > 0.5) linguisticBoost += 0.06;
        break;
      case "E2": // Dunning-Kruger — overconfidence, no evidence
        if (features.evidenceKeywords === 0) linguisticBoost += 0.10;
        linguisticBoost += features.exclamationCount * 0.02;
        break;
      case "E3": // Anchoring — numbers present, low balance
        if (features.numberCount > 0) linguisticBoost += 0.08;
        if (features.numberCount > 2) linguisticBoost += 0.04;
        break;
      case "E4": // Availability — recency emphasis, emotional
        linguisticBoost += features.emotionalDensity * 0.3;
        if (features.exclamationCount > 0) linguisticBoost += 0.04;
        break;
      case "E5": // Bandwagon — popularity without evidence
        if (features.evidenceKeywords === 0) linguisticBoost += 0.08;
        linguisticBoost += features.absolutistCount * 0.02;
        break;
      case "E6": // Authority — authority mentions without evidence
        if (features.authorityMentions > 0 && features.evidenceKeywords === 0)
          linguisticBoost += 0.12;
        break;
      case "E7": // Backfire — extreme sentiment, defensive
        if (features.sentimentCompound < -0.3) linguisticBoost += 0.08;
        linguisticBoost += features.exclamationCount * 0.03;
        break;
      case "E8": // Illusory correlation — causal language
        if (features.numberCount > 0) linguisticBoost += 0.04;
        break;
      case "E9": // Framing — extreme VADER sentiment
        if (features.sentimentExtremity > 0.5) linguisticBoost += 0.12;
        linguisticBoost += features.emotionalDensity * 0.4;
        break;
      case "E10": // Sunk cost — investment language
        linguisticBoost += features.sentimentExtremity * 0.06;
        break;
      case "E11": // Halo — appearance + authority
        if (features.authorityMentions > 0) linguisticBoost += 0.06;
        break;
      case "E12": // Normalcy — dismissive, low negativity toward risk
        if (features.sentimentCompound > 0.1) linguisticBoost += 0.06;
        linguisticBoost += features.absolutistCount * 0.03;
        break;
      case "E13": // In-group — us vs them strong
        if (Math.abs(features.usVsThemRatio) > 0.05) linguisticBoost += 0.10;
        if (features.sentimentExtremity > 0.4) linguisticBoost += 0.05;
        break;
      case "E14": // Peak-end — conclusions without method
        if (features.evidenceKeywords === 0) linguisticBoost += 0.10;
        break;
      case "E15": // Mere exposure — repetition
        if (features.uniqueSentenceRatio < 0.8) linguisticBoost += 0.10;
        linguisticBoost += features.absolutistCount * 0.02;
        break;
    }

    linguisticBoost = Math.min(linguisticBoost, 0.30);

    const finalConfidence = Math.min(
      Math.max(regexScore + linguisticBoost - antiPenalty, 0),
      0.98,
    );

    scores.push({
      biasId: bank.biasId,
      regexScore,
      linguisticBoost,
      antiPenalty,
      finalConfidence,
      matchedPatterns: matchCount,
    });
  }

  return scores;
}

// ---------------------------------------------------------------------------
//  Public API
// ---------------------------------------------------------------------------

const CONFIDENCE_THRESHOLD = 0.35;

const biasMap = new Map<string, CognitiveBias>();
for (const b of COGNITIVE_BIASES) biasMap.set(b.id, b);

const evidenceMap = new Map<string, { en: string; ar: string }>();
for (const bank of BIAS_PATTERN_BANKS) {
  evidenceMap.set(bank.biasId, {
    en: bank.evidenceEn,
    ar: bank.evidenceAr,
  });
}

/**
 * Detects cognitive biases present in a text using regex pattern matching
 * and NLP-based linguistic feature extraction.
 *
 * @param text  - The text to analyze (EN or AR)
 * @param domain - Optional domain hint (currently reserved for future use)
 * @returns Array of detected biases sorted by confidence descending
 */
export async function detectCognitiveBiases(
  text: string,
  domain?: Domain,
): Promise<DetectedBias[]> {
  if (!text || text.trim().length < 8) return [];

  const normalizedText = text.trim();

  // Tier 2: Extract linguistic features (uses wink-nlp + VADER)
  const features = extractLinguisticFeatures(normalizedText);

  // Score every bias
  const scores = computeBiasScores(normalizedText, features);

  // Apply domain weighting if specified
  const domainWeighted = scores.map((s) => {
    if (!domain || domain === "both") return s;

    const bias = biasMap.get(s.biasId);
    if (!bias) return s;

    // Slightly boost biases whose domain-specific application is more relevant
    const domainText =
      domain === "scientific"
        ? bias.scientificApplication
        : bias.islamicApplication;

    // Simple heuristic: if domain-specific text has keywords that also appear
    // in the analysed text, give a small boost
    const domainKeywords = domainText
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length > 4);
    const textLower = normalizedText.toLowerCase();
    const domainHits = domainKeywords.filter((kw) =>
      textLower.includes(kw),
    ).length;

    if (domainHits > 0) {
      return {
        ...s,
        finalConfidence: Math.min(
          s.finalConfidence + domainHits * 0.03,
          0.98,
        ),
      };
    }
    return s;
  });

  // Filter by threshold and build result
  const results: DetectedBias[] = domainWeighted
    .filter((s) => s.finalConfidence >= CONFIDENCE_THRESHOLD)
    .sort((a, b) => b.finalConfidence - a.finalConfidence)
    .map((s) => {
      const bias = biasMap.get(s.biasId)!;
      const ev = evidenceMap.get(s.biasId)!;
      return {
        bias,
        confidence: Math.round(s.finalConfidence * 100) / 100,
        evidence: ev.en,
        evidenceAr: ev.ar,
      };
    });

  return results;
}
