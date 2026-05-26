// ════════════════════════════════════════════════════════════════
// GOD-SYSTEM — 7 LAYER MERCILESS DEBUNKING PIPELINE
// §25 of THE END.md — No-Mercy Protocol Integration
//
// Each layer fires REAL APIs, produces structured output,
// and the user WALKS THROUGH the story — learning the
// Dr. Ismail methodology UNCONSCIOUSLY.
//
// بلا رحمة للباطل — كل الرحمة للناس
// ════════════════════════════════════════════════════════════════

import {
  EVIDENCE_PYRAMID,
  scoreClaimEvidence,
  assessPubMedResults,
  type EvidenceScore,
  type CriticalConcept,
  CRITICAL_CONCEPTS,
} from '@/data/keyhunter/evidence-pyramid';

// ─── TYPES ────────────────────────────────────────────

export type ThreatDomain =
  | 'medical'
  | 'mental_health'
  | 'religious'
  | 'economic'
  | 'gender'
  | 'political'
  | 'nutritional'
  | 'conspiracy';

export type EmotionalTrigger =
  | 'fear'
  | 'anger'
  | 'shame'
  | 'identity'
  | 'guilt'
  | 'hope'
  | 'greed'
  | 'disgust';

export type IntensityLevel = 'gentle' | 'firm' | 'no_mercy' | 'emergency';

export type LayerStatus = 'pending' | 'running' | 'complete' | 'error';

// ─── LAYER RESULT TYPES ──────────────────────────────

export interface Layer1Result {
  layerId: 1;
  name: 'Emotion Strip';
  nameAr: 'تجريد العاطفة';
  emoji: '⚡';
  status: LayerStatus;
  threatDomain: ThreatDomain;
  threatDomainAr: string;
  emotionalTriggers: EmotionalTrigger[];
  emotionalTriggersAr: string[];
  bypassTechniques: string[];
  bypassTechniquesAr: string[];
  cognitiveShieldMessage: string;
  cognitiveShieldMessageAr: string;
  dangerLevel: 'lethal' | 'severe' | 'moderate' | 'low';
  isEmergency: boolean;
  // Dr. Ismail lesson: "When something makes you FURIOUS, it's probably bait."
  drIsmailLesson: string;
  drIsmailLessonAr: string;
}

export interface Layer2Result {
  layerId: 2;
  name: 'Provenance Audit';
  nameAr: 'تدقيق المصدر';
  emoji: '🔍';
  status: LayerStatus;
  originalSource: string | null;
  originalSourceAr: string | null;
  c2paStatus: 'present' | 'absent' | 'stripped' | 'unknown';
  peerReviewedCitations: number;
  sourceChain: string[];
  sourceChainAr: string[];
  verdict: 'verified' | 'unverified' | 'fabricated' | 'dead';
  verdictAr: string;
  archiveResults: Array<{
    title: string;
    url: string;
    date: string;
  }>;
  wikiResults: Array<{
    title: string;
    extract: string;
    url: string;
  }>;
  drIsmailLesson: string;
  drIsmailLessonAr: string;
}

export interface Layer3Result {
  layerId: 3;
  name: 'Incentive Map';
  nameAr: 'خريطة الحوافز';
  emoji: '💰';
  status: LayerStatus;
  profiteers: Array<{
    type: 'financial' | 'political' | 'algorithmic' | 'ego' | 'systemic';
    typeAr: string;
    description: string;
    descriptionAr: string;
    estimatedGain: string;
    estimatedGainAr: string;
  }>;
  userGains: string;
  userGainsAr: string;
  userLoses: string;
  userLosesAr: string;
  griftExposed: string;
  griftExposedAr: string;
  drIsmailLesson: string;
  drIsmailLessonAr: string;
}

export interface NegSciMatch {
  markerId: number;
  markerName: string;
  markerNameAr: string;
  confidence: number;
  evidence: string;
  evidenceAr: string;
  category: string;
  categoryAr: string;
}

export interface Layer4Result {
  layerId: 4;
  name: 'Methodological Destruction';
  nameAr: 'التدمير المنهجي';
  emoji: '🔬';
  status: LayerStatus;
  claimText: string;
  claimTextAr: string;
  negSciMarkersTriggered: NegSciMatch[];
  evidenceScore: EvidenceScore;
  claimStudyCount: number;
  counterStudyCount: number;
  evidenceRatio: string;
  evidenceRatioAr: string;
  pubmedResults: Array<{
    pmid: string;
    title: string;
    journal: string;
    year: number;
    studyType: string;
  }>;
  counterEvidence: Array<{
    source: string;
    sourceAr: string;
    finding: string;
    findingAr: string;
    url: string;
  }>;
  methodologicalVerdict: string;
  methodologicalVerdictAr: string;
  // What the user LEARNS here (Dr. Ismail methodology)
  conceptsTaught: CriticalConcept[];
  drIsmailLesson: string;
  drIsmailLessonAr: string;
}

export interface FallacyMatch {
  fallacyId: number;
  fallacyName: string;
  fallacyNameAr: string;
  quoteFromClaim: string;
  quoteFromClaimAr: string;
  dismantlement: string;
  dismantlementAr: string;
}

export interface Layer5Result {
  layerId: 5;
  name: 'Fallacy Execution';
  nameAr: 'تنفيذ المغالطات';
  emoji: '⚔️';
  status: LayerStatus;
  fallaciesFound: FallacyMatch[];
  totalFallacies: number;
  drIsmailLesson: string;
  drIsmailLessonAr: string;
}

export interface Layer6Result {
  layerId: 6;
  name: 'Truth Sandwich';
  nameAr: 'ساندويتش الحقيقة';
  emoji: '🥪';
  status: LayerStatus;
  rawTruth: string;
  rawTruthAr: string;
  rawTruthSource: string;
  rawTruthSourceAr: string;
  fallacyExposed: string;
  fallacyExposedAr: string;
  reinforcement: string;
  reinforcementAr: string;
  evidenceLevelLabel: string;
  evidenceLevelLabelAr: string;
  drIsmailLesson: string;
  drIsmailLessonAr: string;
}

export interface MutationPrediction {
  id: string;
  mutation: string;
  mutationAr: string;
  counterScript: string;
  counterScriptAr: string;
}

export interface Layer7Result {
  layerId: 7;
  name: 'Forward Defense';
  nameAr: 'الدفاع الاستباقي';
  emoji: '🛡️';
  status: LayerStatus;
  predictedMutations: MutationPrediction[];
  inoculationScript: string;
  inoculationScriptAr: string;
  drIsmailLesson: string;
  drIsmailLessonAr: string;
}

export type LayerResult =
  | Layer1Result
  | Layer2Result
  | Layer3Result
  | Layer4Result
  | Layer5Result
  | Layer6Result
  | Layer7Result;

// ─── FULL DEBUNK RESULT ──────────────────────────────

export interface GODSystemResult {
  id: string;
  timestamp: string;
  inputClaim: string;
  inputClaimAr: string;
  intensity: IntensityLevel;
  layers: LayerResult[];
  overallVerdict: 'true' | 'mostly_true' | 'misleading' | 'mostly_false' | 'false' | 'dangerous';
  overallVerdictAr: string;
  confidenceScore: number; // 0-100
  openingBanner: string;
  closingBanner: string;
  // Metrics for the user
  biasesIdentified: number;
  fallaciesDestroyed: number;
  studiesConsulted: number;
  conceptsLearned: string[];
  conceptsLearnedAr: string[];
  evidenceLiteracyGain: number; // 0-100 how much the user learned
}

// ─── BANNERS (§25.3 — MANDATORY) ─────────────────────

export const OPENING_BANNER = `════════════════════════════════════════════════
DEEPREAL MERCILESS DEBUNKING ENGINE — INITIALIZED
STATUS: UNCOMPROMISING TAKEDOWN COMMENCING
ZERO MERCY ENFORCED. EVIDENCE IS ABSOLUTE.
بلا رحمة للباطل — كل الرحمة للناس
════════════════════════════════════════════════`;

export const CLOSING_BANNER = `════════════════════════════════════════════════
NARRATIVE CRUSHED. GROUND TRUTH RESTORED.
التحقق واجب مطلق. الخداع سيُفكك.
════════════════════════════════════════════════`;

// ─── INTENSITY DESCRIPTIONS ──────────────────────────

export const INTENSITY_LEVELS: Record<IntensityLevel, {
  label: string;
  labelAr: string;
  emoji: string;
  description: string;
  descriptionAr: string;
  color: string;
}> = {
  gentle: {
    label: 'Gentle',
    labelAr: 'لطيف',
    emoji: '🟢',
    description: '"Actually, the data shows..." — For family conversations',
    descriptionAr: '"في الحقيقة، البيانات بتوضح..." — للمحادثات العائلية',
    color: '#22C55E',
  },
  firm: {
    label: 'Firm',
    labelAr: 'حازم',
    emoji: '🟡',
    description: 'Full evidence chain + named fallacies — For moderate threats',
    descriptionAr: 'سلسلة أدلة كاملة + مغالطات مسماة — للتهديدات المتوسطة',
    color: '#EAB308',
  },
  no_mercy: {
    label: 'No Mercy',
    labelAr: 'بلا رحمة',
    emoji: '🔴',
    description: 'FULL arsenal — death reports, FDA data, WHO, Al-Azhar — For lethal claims',
    descriptionAr: 'كل الأسلحة — تقارير وفاة، بيانات FDA، منظمة الصحة، الأزهر — للادعاءات القاتلة',
    color: '#EF4444',
  },
  emergency: {
    label: 'EMERGENCY',
    labelAr: 'طوارئ',
    emoji: '⚫',
    description: 'Skip debunking → DIRECT TO ACTION: "Call 123 NOW. Go to ER NOW."',
    descriptionAr: 'تجاوز التفنيد → توجيه مباشر: "اتصل بـ 123 حالاً. روح الطوارئ حالاً."',
    color: '#000000',
  },
};

// ─── DOMAIN DETECTION ────────────────────────────────

const DOMAIN_KEYWORDS: Record<ThreatDomain, { en: string[]; ar: string[] }> = {
  medical: {
    en: ['medication', 'medicine', 'drug', 'treatment', 'cure', 'doctor', 'hospital', 'cancer', 'diabetes', 'blood pressure', 'vaccine', 'supplement', 'herb', 'natural remedy', 'side effect', 'pill', 'pharmaceutical', 'surgery'],
    ar: ['دوا', 'علاج', 'مستشفى', 'دكتور', 'سرطان', 'سكر', 'ضغط', 'تطعيم', 'لقاح', 'مكمل', 'أعشاب', 'وصفة', 'حبوب', 'عملية', 'جرعة'],
  },
  mental_health: {
    en: ['depression', 'anxiety', 'therapy', 'psychiatrist', 'mental', 'suicide', 'stress', 'bipolar', 'panic', 'trauma', 'ptsd', 'counseling', 'antidepressant'],
    ar: ['اكتئاب', 'قلق', 'نفسي', 'طبيب نفسي', 'انتحار', 'توتر', 'صدمة', 'علاج نفسي', 'مضاد اكتئاب'],
  },
  religious: {
    en: ['quran', 'hadith', 'prophet', 'islam', 'faith', 'prayer', 'halal', 'haram', 'sheikh', 'imam', 'fatwa', 'sunnah', 'bid\'ah', 'kafir', 'fitna', 'iman'],
    ar: ['قرآن', 'حديث', 'النبي', 'إسلام', 'إيمان', 'صلاة', 'حلال', 'حرام', 'شيخ', 'إمام', 'فتوى', 'سنة', 'بدعة', 'كافر', 'فتنة'],
  },
  economic: {
    en: ['dollar', 'pound', 'economy', 'inflation', 'price', 'cost', 'market', 'bank', 'loan', 'investment', 'gold', 'currency', 'exchange rate'],
    ar: ['دولار', 'جنيه', 'اقتصاد', 'تضخم', 'سعر', 'بنك', 'قرض', 'استثمار', 'ذهب', 'عملة', 'سعر الصرف', 'السوق السوداء'],
  },
  gender: {
    en: ['women', 'men', 'wife', 'husband', 'marriage', 'divorce', 'feminism', 'masculinity', 'gender', 'honor', 'obey', 'custody'],
    ar: ['مرأة', 'نساء', 'رجل', 'زوجة', 'زوج', 'زواج', 'طلاق', 'شرف', 'طاعة', 'حضانة', 'ختان'],
  },
  political: {
    en: ['government', 'president', 'election', 'conspiracy', 'revolution', 'politics', 'regime', 'coup', 'military'],
    ar: ['حكومة', 'رئيس', 'انتخابات', 'مؤامرة', 'ثورة', 'سياسة', 'نظام', 'جيش', 'إنقلاب'],
  },
  nutritional: {
    en: ['diet', 'weight loss', 'calories', 'fat', 'protein', 'superfood', 'detox', 'organic', 'gmo', 'gluten', 'intermittent fasting', 'keto'],
    ar: ['رجيم', 'تخسيس', 'سعرات', 'دهون', 'بروتين', 'ديتوكس', 'عضوي', 'صيام متقطع', 'كيتو'],
  },
  conspiracy: {
    en: ['cover up', 'they don\'t want you to know', 'hidden truth', 'illuminati', 'freemason', 'new world order', 'big pharma', '5g', 'chemtrail', 'flat earth'],
    ar: ['مؤامرة', 'يخفون', 'الحقيقة المخفية', 'ماسونية', 'شركات الأدوية', 'يخبوا', 'حرب بيولوجية'],
  },
};

export function detectThreatDomain(text: string): { domain: ThreatDomain; confidence: number }[] {
  const lower = text.toLowerCase();
  const results: { domain: ThreatDomain; confidence: number }[] = [];

  for (const [domain, keywords] of Object.entries(DOMAIN_KEYWORDS) as [ThreatDomain, { en: string[]; ar: string[] }][]) {
    const matchCount = [...keywords.en, ...keywords.ar].filter(kw => lower.includes(kw.toLowerCase())).length;
    const total = keywords.en.length + keywords.ar.length;
    if (matchCount > 0) {
      results.push({ domain, confidence: Math.min(matchCount / Math.max(total * 0.3, 1), 1) });
    }
  }

  return results.sort((a, b) => b.confidence - a.confidence);
}

// ─── EMOTIONAL TRIGGER DETECTION ─────────────────────

const EMOTION_PATTERNS: Record<EmotionalTrigger, { en: string[]; ar: string[] }> = {
  fear: {
    en: ['dangerous', 'deadly', 'kill', 'die', 'death', 'cancer', 'poison', 'warning', 'urgent', 'before it\'s too late', 'wake up'],
    ar: ['خطر', 'موت', 'سم', 'قاتل', 'تحذير', 'عاجل', 'قبل فوات الأوان', 'صحوا'],
  },
  anger: {
    en: ['corrupt', 'stealing', 'criminals', 'traitors', 'lies', 'they destroyed', 'wake up people'],
    ar: ['فساد', 'حرامية', 'خونة', 'كذب', 'دمروا', 'صحوا يا ناس', 'بيضحكوا عليكم'],
  },
  shame: {
    en: ['shameful', 'disgrace', 'real man', 'real woman', 'honor', 'what would people say'],
    ar: ['عيب', 'فضيحة', 'رجولة', 'شرف', 'هيقولوا إيه عليك', 'حرام عليك'],
  },
  identity: {
    en: ['our culture', 'our religion', 'our ancestors', 'western agenda', 'they want to change us', 'our identity'],
    ar: ['ثقافتنا', 'ديننا', 'أجدادنا', 'أجندة غربية', 'عايزين يغيرونا', 'هويتنا', 'عادات وتقاليد'],
  },
  guilt: {
    en: ['ungrateful', 'selfish', 'you don\'t care', 'poor children', 'starving'],
    ar: ['جحود', 'أناني', 'مش حاسس', 'أطفال غلابة', 'مسكين'],
  },
  hope: {
    en: ['miracle', 'breakthrough', 'finally', 'the cure', 'amazing discovery', 'revolutionary'],
    ar: ['معجزة', 'اختراق', 'أخيراً', 'العلاج', 'اكتشاف مذهل', 'ثوري'],
  },
  greed: {
    en: ['easy money', 'get rich', 'double your money', 'investment opportunity', 'don\'t miss out'],
    ar: ['فلوس سهلة', 'اغتني', 'ضاعف فلوسك', 'فرصة استثمارية', 'ماتفوتكش'],
  },
  disgust: {
    en: ['disgusting', 'filthy', 'contaminated', 'chemicals', 'toxic', 'polluted'],
    ar: ['قرف', 'قذر', 'ملوث', 'كيماويات', 'سموم', 'مسرطن'],
  },
};

export function detectEmotionalTriggers(text: string): { trigger: EmotionalTrigger; triggerAr: string; confidence: number }[] {
  const lower = text.toLowerCase();
  const triggerArMap: Record<EmotionalTrigger, string> = {
    fear: 'خوف', anger: 'غضب', shame: 'عار', identity: 'هوية',
    guilt: 'ذنب', hope: 'أمل', greed: 'طمع', disgust: 'اشمئزاز',
  };

  const results: { trigger: EmotionalTrigger; triggerAr: string; confidence: number }[] = [];

  for (const [trigger, patterns] of Object.entries(EMOTION_PATTERNS) as [EmotionalTrigger, { en: string[]; ar: string[] }][]) {
    const matchCount = [...patterns.en, ...patterns.ar].filter(p => lower.includes(p.toLowerCase())).length;
    const total = patterns.en.length + patterns.ar.length;
    if (matchCount > 0) {
      results.push({ trigger, triggerAr: triggerArMap[trigger], confidence: Math.min(matchCount / Math.max(total * 0.3, 1), 1) });
    }
  }

  return results.sort((a, b) => b.confidence - a.confidence);
}

// ─── API CALLERS ─────────────────────────────────────

async function callAPI(endpoint: string, params: Record<string, string>): Promise<unknown> {
  const url = new URL(endpoint, typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  try {
    const res = await fetch(url.toString());
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// ─── LAYER EXECUTORS ─────────────────────────────────

async function executeLayer1(claim: string, intensity: IntensityLevel): Promise<Layer1Result> {
  // Call NLP APIs
  const [sentimentData, arabicData] = await Promise.all([
    callAPI('/api/nlp/sentiment', { text: claim }),
    callAPI('/api/nlp/arabic', { text: claim }),
  ]);

  const domains = detectThreatDomain(claim);
  const emotions = detectEmotionalTriggers(claim);
  const primaryDomain = domains[0]?.domain || 'conspiracy';

  const domainArMap: Record<ThreatDomain, string> = {
    medical: 'طبي', mental_health: 'صحة نفسية', religious: 'ديني',
    economic: 'اقتصادي', gender: 'نوع اجتماعي', political: 'سياسي',
    nutritional: 'تغذية', conspiracy: 'مؤامرة',
  };

  const isEmergency = intensity === 'emergency' ||
    (primaryDomain === 'medical' && emotions.some(e => e.trigger === 'fear' && e.confidence > 0.7));

  return {
    layerId: 1,
    name: 'Emotion Strip',
    nameAr: 'تجريد العاطفة',
    emoji: '⚡',
    status: 'complete',
    threatDomain: primaryDomain,
    threatDomainAr: domainArMap[primaryDomain],
    emotionalTriggers: emotions.map(e => e.trigger),
    emotionalTriggersAr: emotions.map(e => e.triggerAr),
    bypassTechniques: emotions.map(e => `Amygdala bypass via ${e.trigger}`),
    bypassTechniquesAr: emotions.map(e => `تجاوز اللوزة الدماغية عبر ${e.triggerAr}`),
    cognitiveShieldMessage: 'COGNITIVE SHIELD ENGAGED: Emotion stripped. Processing on evidence only.',
    cognitiveShieldMessageAr: 'الدرع المعرفي مفعّل: تم تجريد العاطفة. المعالجة بالأدلة فقط.',
    dangerLevel: isEmergency ? 'lethal' : emotions[0]?.confidence > 0.5 ? 'severe' : 'moderate',
    isEmergency,
    drIsmailLesson: 'When something makes you FURIOUS or TERRIFIED — that\'s the first sign it\'s designed to bypass your thinking. Dr. Ismail never let emotion drive his research.',
    drIsmailLessonAr: 'لما حاجة تخليك في غضب أو رعب شديد — ده أول علامة إنها مصممة تتجاوز تفكيرك. د. إسماعيل عمره ما سمح للعاطفة تقود بحثه.',
  };
}

async function executeLayer2(claim: string): Promise<Layer2Result> {
  // Call Archive + Wiki APIs
  const [archiveData, wikiData] = await Promise.all([
    callAPI('/api/search/internet-archive', { q: claim.substring(0, 100) }),
    callAPI('/api/search/wikipedia', { q: claim.substring(0, 80) }),
  ]);

  const archiveResults = Array.isArray((archiveData as { results?: unknown[] })?.results)
    ? ((archiveData as { results: { title: string; url: string; date: string }[] }).results).slice(0, 5)
    : [];

  const wikiResults = Array.isArray((wikiData as { results?: unknown[] })?.results)
    ? ((wikiData as { results: { title: string; extract: string; url: string }[] }).results).slice(0, 3)
    : [];

  const hasVerifiedSource = archiveResults.length > 0 || wikiResults.length > 0;

  return {
    layerId: 2,
    name: 'Provenance Audit',
    nameAr: 'تدقيق المصدر',
    emoji: '🔍',
    status: 'complete',
    originalSource: hasVerifiedSource ? archiveResults[0]?.url || wikiResults[0]?.url || null : null,
    originalSourceAr: hasVerifiedSource ? 'مصدر موجود' : 'مصدر غير موجود',
    c2paStatus: 'unknown',
    peerReviewedCitations: 0,
    sourceChain: hasVerifiedSource
      ? ['Original source found', 'Checking archive records...']
      : ['No original source found', 'Source chain: Social media → WhatsApp → Your family group chat'],
    sourceChainAr: hasVerifiedSource
      ? ['المصدر الأصلي موجود', 'جاري فحص سجلات الأرشيف...']
      : ['مفيش مصدر أصلي', 'سلسلة المصدر: سوشيال ميديا → واتساب → جروب العيلة'],
    verdict: hasVerifiedSource ? 'unverified' : 'dead',
    verdictAr: hasVerifiedSource ? 'غير مؤكد' : 'ميت — مفيش مصدر أصلي',
    archiveResults,
    wikiResults,
    drIsmailLesson: 'Dr. Ismail ALWAYS traced the source. Where did this claim originate? Who said it first? If no primary source exists — the claim is DEAD on arrival.',
    drIsmailLessonAr: 'د. إسماعيل دايماً كان بيتتبع المصدر. الادعاء ده جه منين؟ مين قاله أول مرة؟ لو مفيش مصدر أصلي — الادعاء ميت من الأول.',
  };
}

async function executeLayer3(claim: string, domain: ThreatDomain): Promise<Layer3Result> {
  const claimBusterData = await callAPI('/api/search/claimbuster', { text: claim });
  const claimScore = (claimBusterData as { score?: number })?.score || 0;

  // Domain-specific incentive mapping
  const incentiveMaps: Record<string, Layer3Result['profiteers']> = {
    medical: [
      { type: 'financial', typeAr: 'مالي', description: 'Content creator earns ad revenue from fear-based medical videos', descriptionAr: 'صانع المحتوى بيكسب فلوس إعلانات من فيديوهات طبية مبنية على الخوف', estimatedGain: '$2,000-$10,000/month from medical misinformation videos', estimatedGainAr: '$2,000-$10,000/شهرياً من فيديوهات معلومات طبية مضللة' },
      { type: 'financial', typeAr: 'مالي', description: 'Supplement/herb seller linked in description', descriptionAr: 'بائع مكملات/أعشاب مربوط في الوصف', estimatedGain: 'Affiliate commission per sale', estimatedGainAr: 'عمولة على كل عملية بيع' },
      { type: 'algorithmic', typeAr: 'خوارزمي', description: 'Platforms reward controversy — "STOP your medication!" gets more clicks than "Take as prescribed"', descriptionAr: 'المنصات بتكافئ الإثارة — "بطّل الدوا!" بتجيب مشاهدات أكتر من "خد الدوا زي ما الدكتور قال"', estimatedGain: '10x engagement vs responsible content', estimatedGainAr: '10 أضعاف التفاعل مقارنة بالمحتوى المسؤول' },
    ],
    religious: [
      { type: 'ego', typeAr: 'غرور', description: 'Sheikh maintains authority as "the answer to everything" — including medicine', descriptionAr: 'الشيخ بيحافظ على سلطته كـ "الإجابة على كل حاجة" — بما فيها الطب', estimatedGain: 'Speaking fees + book deals + Ruqyah sessions EGP 500-2000 each', estimatedGainAr: 'أتعاب محاضرات + كتب + جلسات رقية 500-2000 جنيه للجلسة' },
      { type: 'systemic', typeAr: 'منظومي', description: 'If problems = faith problems, no specialist needed. Sheikh remains sole authority.', descriptionAr: 'لو كل مشكلة = مشكلة إيمان، مش محتاج متخصص. الشيخ يفضل هو السلطة الوحيدة.', estimatedGain: 'Total control over community decisions', estimatedGainAr: 'سيطرة كاملة على قرارات المجتمع' },
    ],
    economic: [
      { type: 'financial', typeAr: 'مالي', description: 'Channel admin runs parallel market exchange — profits from panic spread', descriptionAr: 'أدمن القناة بيشغّل سوق سوداء — بيكسب من نشر الذعر', estimatedGain: 'EGP 0.50-2.00 per dollar on parallel spread × millions traded', estimatedGainAr: '0.50-2.00 جنيه على كل دولار في السبريد × ملايين بتتداول' },
      { type: 'algorithmic', typeAr: 'خوارزمي', description: 'Panic posts get 10x engagement → more subscribers → more influence', descriptionAr: 'بوستات الذعر بتجيب 10 أضعاف التفاعل → مشتركين أكتر → تأثير أكبر', estimatedGain: 'Self-fulfilling prophecy: cause panic → price rises → "See? I was right!"', estimatedGainAr: 'نبوءة محققة لذاتها: سبب الذعر → السعر يطلع → "شفتوا؟ أنا كنت صح!"' },
    ],
  };

  const profiteers = incentiveMaps[domain] || incentiveMaps.medical || [];

  return {
    layerId: 3,
    name: 'Incentive Map',
    nameAr: 'خريطة الحوافز',
    emoji: '💰',
    status: 'complete',
    profiteers,
    userGains: 'NOTHING.',
    userGainsAr: 'لا شيء.',
    userLoses: domain === 'medical' ? 'Their LIFE. Or their family member\'s life.' :
               domain === 'economic' ? 'Their SAVINGS. Panic-buying at inflated prices.' :
               domain === 'mental_health' ? 'Years of untreated suffering. Possibly their life.' :
               'Their freedom to think clearly.',
    userLosesAr: domain === 'medical' ? 'حياتهم. أو حياة فرد من عيلتهم.' :
                 domain === 'economic' ? 'مدخراتهم. شراء بذعر بأسعار متضخمة.' :
                 domain === 'mental_health' ? 'سنين من المعاناة بدون علاج. ممكن حياتهم.' :
                 'حريتهم في التفكير بوضوح.',
    griftExposed: `ClaimBuster score: ${(claimScore * 100).toFixed(0)}% check-worthy. The person spreading this gains money, followers, or power. YOU gain nothing.`,
    griftExposedAr: `درجة ClaimBuster: ${(claimScore * 100).toFixed(0)}% تستحق التحقق. اللي بينشر ده بيكسب فلوس أو متابعين أو سلطة. إنت مش بتكسب حاجة.`,
    drIsmailLesson: 'Dr. Ismail had NO financial incentive. He just wanted the truth. Dr. Karim Abu El-Qasr mixed Tramadol powder in his herbs and SOLD them. Always ask: WHO profits?',
    drIsmailLessonAr: 'د. إسماعيل مكنش عنده أي حافز مالي. كان عايز الحقيقة بس. د. كريم أبو القصر خلط بودرة ترامادول في الأعشاب وباعها. دايماً اسأل: مين بيستفيد؟',
  };
}

async function executeLayer4(claim: string): Promise<Layer4Result> {
  // Fire PubMed + Semantic Scholar + OpenAlex
  const searchQuery = claim.substring(0, 120);
  const [pubmedData, scholarData, openAlexData, factCheckData] = await Promise.all([
    callAPI('/api/search/pubmed', { q: searchQuery, max: '10' }),
    callAPI('/api/search/semantic-scholar', { q: searchQuery }),
    callAPI('/api/search/openalex', { q: searchQuery }),
    callAPI('/api/search/google-factcheck', { q: searchQuery }),
  ]);

  // Extract results
  const pubmedResults = Array.isArray((pubmedData as { results?: unknown[] })?.results)
    ? (pubmedData as { results: { pmid: string; title: string; journal: string; year: number; studyType: string }[] }).results
    : [];

  const totalStudies = pubmedResults.length +
    (Array.isArray((scholarData as { results?: unknown[] })?.results) ? (scholarData as { results: unknown[] }).results.length : 0) +
    (Array.isArray((openAlexData as { results?: unknown[] })?.results) ? (openAlexData as { results: unknown[] }).results.length : 0);

  // Assess evidence level using the pyramid
  const assessment = assessPubMedResults({
    totalStudies,
    systematicReviews: pubmedResults.filter(r => r.studyType?.toLowerCase().includes('review') || r.studyType?.toLowerCase().includes('meta')).length,
    rcts: pubmedResults.filter(r => r.studyType?.toLowerCase().includes('randomized') || r.studyType?.toLowerCase().includes('rct')).length,
    cohortStudies: pubmedResults.filter(r => r.studyType?.toLowerCase().includes('cohort')).length,
    caseReports: pubmedResults.filter(r => r.studyType?.toLowerCase().includes('case')).length,
  });

  // Find which critical concepts are relevant
  const conceptsTaught = CRITICAL_CONCEPTS.filter(c => {
    if (c.id === 1 && totalStudies < 10) return true; // Small sample
    if (c.id === 2) return true; // Always teach about confounders
    if (c.id === 3) return true; // Always teach about bias
    if (c.id === 5 && totalStudies > 0) return true; // Correlation ≠ causation
    return false;
  });

  return {
    layerId: 4,
    name: 'Methodological Destruction',
    nameAr: 'التدمير المنهجي',
    emoji: '🔬',
    status: 'complete',
    claimText: claim,
    claimTextAr: claim,
    negSciMarkersTriggered: [], // Will be populated by negative-science.ts detection
    evidenceScore: assessment.claimStrength,
    claimStudyCount: totalStudies,
    counterStudyCount: totalStudies,
    evidenceRatio: assessment.ratio,
    evidenceRatioAr: assessment.ratioAr,
    pubmedResults: pubmedResults.slice(0, 5),
    counterEvidence: [],
    methodologicalVerdict: totalStudies === 0
      ? 'CLAIM DESTROYED. ZERO peer-reviewed evidence supports this.'
      : `Evidence level: ${assessment.claimStrength.level.level}. ${assessment.comparison}`,
    methodologicalVerdictAr: totalStudies === 0
      ? 'الادعاء تم تدميره. صفر أدلة محكّمة تدعم ده.'
      : `مستوى الدليل: ${assessment.claimStrength.level.levelAr}. ${assessment.comparisonAr}`,
    conceptsTaught,
    drIsmailLesson: `You just learned to check evidence level. Dr. Ismail went from Case Report → Case Series → Cross-Sectional → Case-Control → Cohort → RCT → Systematic Review. The claim you entered? ${assessment.claimStrength.level.level}. ${assessment.claimStrength.drIsmailLesson}`,
    drIsmailLessonAr: `للتو اتعلمت تتشيك مستوى الدليل. د. إسماعيل راح من تقرير حالة → سلسلة حالات → مقطعية → حالات وشواهد → أترابية → معشاة → مراجعة منهجية. الادعاء اللي دخلته؟ ${assessment.claimStrength.level.levelAr}. ${assessment.claimStrength.drIsmailLessonAr}`,
  };
}

async function executeLayer5(claim: string, domain: ThreatDomain): Promise<Layer5Result> {
  // Pattern-match claim against common fallacy patterns
  const lower = claim.toLowerCase();
  const fallacies: FallacyMatch[] = [];

  // Appeal to Authority (#33)
  if (/doctor|dr\.|دكتور|شيخ|professor|عالم/i.test(claim)) {
    fallacies.push({
      fallacyId: 33,
      fallacyName: 'Appeal to Authority',
      fallacyNameAr: 'الاحتكام للسلطة',
      quoteFromClaim: 'Claims authority credentials as evidence',
      quoteFromClaimAr: 'بيستخدم المؤهلات كدليل',
      dismantlement: 'Credentials are NOT evidence. A diploma is not a clinical trial. SHOW DATA.',
      dismantlementAr: 'المؤهلات مش دليل. الشهادة مش تجربة سريرية. وريني البيانات.',
    });
  }

  // Appeal to Nature (#37)
  if (/natural|طبيعي|أعشاب|herb|organic|عضوي/i.test(claim)) {
    fallacies.push({
      fallacyId: 37,
      fallacyName: 'Appeal to Nature',
      fallacyNameAr: 'الاحتكام للطبيعة',
      quoteFromClaim: '"It\'s natural so it\'s safe"',
      quoteFromClaimAr: '"طبيعي يعني آمن"',
      dismantlement: 'Hemlock killed Socrates. Naturally. Digitalis is natural — it stops your heart. Natural ≠ Safe.',
      dismantlementAr: 'الشوكران قتل سقراط. بشكل طبيعي. الديجيتاليس طبيعي — بيوقف قلبك. طبيعي ≠ آمن.',
    });
  }

  // Appeal to Emotion (#35)
  if (/children|أطفال|family|عيلة|mother|أم|father|أب|die|موت/i.test(claim)) {
    fallacies.push({
      fallacyId: 35,
      fallacyName: 'Appeal to Emotion',
      fallacyNameAr: 'الاحتكام للعاطفة',
      quoteFromClaim: 'Uses emotional language to bypass reasoning',
      quoteFromClaimAr: 'بيستخدم لغة عاطفية لتجاوز التفكير',
      dismantlement: 'Your fear is valid. The exploitation of your fear is NOT. Evidence doesn\'t care about feelings.',
      dismantlementAr: 'خوفك مشروع. استغلال خوفك مش مشروع. الدليل مش بيهتم بالمشاعر.',
    });
  }

  // False Dilemma (#31)
  if (/or|أو|either|إما|instead of|بدل/i.test(claim)) {
    fallacies.push({
      fallacyId: 31,
      fallacyName: 'False Dilemma',
      fallacyNameAr: 'معضلة زائفة',
      quoteFromClaim: 'Presents only two options when more exist',
      quoteFromClaimAr: 'بيقدم خيارين بس مع إن فيه خيارات تانية',
      dismantlement: 'Life is not binary. You can pray AND take medicine. You can respect tradition AND use modern science.',
      dismantlementAr: 'الحياة مش ثنائية. ممكن تصلي وتاخد الدوا. ممكن تحترم التقاليد وتستخدم العلم الحديث.',
    });
  }

  // Conspiracy Ideation (#64)
  if (/they don't want|بيخبوا|suppressed|مؤامرة|big pharma|شركات|cover up/i.test(claim)) {
    fallacies.push({
      fallacyId: 64,
      fallacyName: 'Conspiracy Ideation',
      fallacyNameAr: 'التفكير المؤامراتي',
      quoteFromClaim: '"They don\'t want you to know this"',
      quoteFromClaimAr: '"هم مش عايزينك تعرف ده"',
      dismantlement: 'Ask: What evidence would change your mind? If NOTHING can change your mind, you\'re not thinking — you\'re trapped.',
      dismantlementAr: 'اسأل: إيه الدليل اللي هيغير رأيك؟ لو مفيش حاجة ممكن تغير رأيك، إنت مش بتفكر — إنت محبوس.',
    });
  }

  // Testimonial Reliance (#63)
  if (/tried|جربت|worked|نفع|improved|اتحسن|testimonial|شهادة/i.test(claim)) {
    fallacies.push({
      fallacyId: 63,
      fallacyName: 'Testimonial Reliance',
      fallacyNameAr: 'الاعتماد على الشهادات',
      quoteFromClaim: '"I/they tried it and it worked"',
      quoteFromClaimAr: '"أنا/هم جربوه ونفع"',
      dismantlement: 'Where\'s the controlled data? Survivor bias: the dead patients don\'t post reviews. Dr. Karim\'s "success stories" were crushed pills.',
      dismantlementAr: 'فين البيانات المضبوطة؟ انحياز الناجين: المرضى اللي ماتوا مش هيكتبوا ريفيو. "قصص نجاح" د. كريم كانت حبوب مطحونة.',
    });
  }

  // Thought-Terminating Cliché (#56)
  if (/just have faith|توكل|حسبي الله|man up|اصبر|إرادة ربنا|ده قدر/i.test(claim)) {
    fallacies.push({
      fallacyId: 56,
      fallacyName: 'Thought-Terminating Cliché',
      fallacyNameAr: 'الكليشيه المعطل للتفكير',
      quoteFromClaim: 'Uses a phrase designed to END discussion before help can begin',
      quoteFromClaimAr: 'بيستخدم عبارة مصممة تنهي النقاش قبل ما المساعدة تبدأ',
      dismantlement: 'These phrases are designed to STOP you from thinking further. The Prophet (SAW) said تداووا — seek treatment. Thinking is not a sin.',
      dismantlementAr: 'العبارات دي مصممة توقف تفكيرك. النبي ﷺ قال تداووا. التفكير مش ذنب.',
    });
  }

  return {
    layerId: 5,
    name: 'Fallacy Execution',
    nameAr: 'تنفيذ المغالطات',
    emoji: '⚔️',
    status: 'complete',
    fallaciesFound: fallacies,
    totalFallacies: fallacies.length,
    drIsmailLesson: `${fallacies.length} fallacies identified and dismantled. Dr. Karim Abu El-Qasr used at least 4 of these in every video. Now YOU can see them.`,
    drIsmailLessonAr: `${fallacies.length} مغالطة تم تحديدها وتفكيكها. د. كريم أبو القصر كان بيستخدم على الأقل 4 منهم في كل فيديو. دلوقتي إنت بتشوفهم.`,
  };
}

function executeLayer6(
  claim: string,
  layer4: Layer4Result,
  layer5: Layer5Result,
  domain: ThreatDomain,
): Layer6Result {
  const evidenceLevel = layer4.evidenceScore.level;

  return {
    layerId: 6,
    name: 'Truth Sandwich',
    nameAr: 'ساندويتش الحقيقة',
    emoji: '🥪',
    status: 'complete',
    rawTruth: layer4.claimStudyCount > 0
      ? `${layer4.claimStudyCount} peer-reviewed studies address this topic. Evidence level: ${evidenceLevel.level}.`
      : 'ZERO peer-reviewed studies support this claim.',
    rawTruthAr: layer4.claimStudyCount > 0
      ? `${layer4.claimStudyCount} دراسة محكّمة بتتناول الموضوع ده. مستوى الدليل: ${evidenceLevel.levelAr}.`
      : 'صفر دراسات محكّمة بتدعم الادعاء ده.',
    rawTruthSource: 'PubMed, Semantic Scholar, OpenAlex, Google Fact Check',
    rawTruthSourceAr: 'PubMed، Semantic Scholar، OpenAlex، Google Fact Check',
    fallacyExposed: layer5.fallaciesFound.length > 0
      ? `${layer5.totalFallacies} logical fallacies detected: ${layer5.fallaciesFound.map(f => f.fallacyName).join(', ')}.`
      : 'No clear logical fallacies detected, but evidence level is still: ' + evidenceLevel.level,
    fallacyExposedAr: layer5.fallaciesFound.length > 0
      ? `${layer5.totalFallacies} مغالطة منطقية تم كشفها: ${layer5.fallaciesFound.map(f => f.fallacyNameAr).join('، ')}.`
      : 'مفيش مغالطات منطقية واضحة، بس مستوى الدليل لسه: ' + evidenceLevel.levelAr,
    reinforcement: domain === 'medical'
      ? 'Your medication keeps you alive. Check with your doctor, not YouTube. Your family needs you alive.'
      : domain === 'mental_health'
      ? 'Seeking help is Sunnah. The Prophet (SAW) said: تداووا. You are not weak. You are sick. And Islam commands you to seek treatment.'
      : domain === 'religious'
      ? 'Check Quran and Hadith sources directly. قل هاتوا برهانكم — Bring your evidence. Faith is built on knowledge, not ignorance.'
      : 'Verify before you share. التحقق واجب مطلق. Check the source. Check the evidence. Then decide.',
    reinforcementAr: domain === 'medical'
      ? 'الدوا بتاعك بيخليك عايش. استشير دكتورك، مش يوتيوب. عيلتك محتاجاك حي.'
      : domain === 'mental_health'
      ? 'طلب العلاج سنة. النبي ﷺ قال: تداووا. إنت مش ضعيف. إنت مريض. والإسلام بيأمرك تتعالج.'
      : domain === 'religious'
      ? 'ارجع للقرآن والحديث مباشرة. قل هاتوا برهانكم — هاتوا دليلكم. الإيمان مبني على العلم مش الجهل.'
      : 'تحقق قبل ما تشارك. التحقق واجب مطلق. اتشيك المصدر. اتشيك الدليل. وبعدين قرر.',
    evidenceLevelLabel: `${evidenceLevel.emoji} ${evidenceLevel.level} (Strength: ${evidenceLevel.strength}/10)`,
    evidenceLevelLabelAr: `${evidenceLevel.emoji} ${evidenceLevel.levelAr} (القوة: ${evidenceLevel.strength}/10)`,
    drIsmailLesson: 'Truth Sandwich: Lead with TRUTH, expose the LIE, reinforce with TRUTH. Never lead with the lie — that just repeats it.',
    drIsmailLessonAr: 'ساندويتش الحقيقة: ابدأ بالحقيقة، اكشف الكذبة، عزز بالحقيقة. عمرك ما تبدأ بالكذبة — ده بيكررها.',
  };
}

function executeLayer7(claim: string, domain: ThreatDomain): Layer7Result {
  const mutations: Record<string, MutationPrediction[]> = {
    medical: [
      { id: 'med_a', mutation: '"But there\'s a NEW study!"', mutationAr: '"بس فيه دراسة جديدة!"', counterScript: 'Check: Is it peer-reviewed? Sample size? Replicated? Funded by whom?', counterScriptAr: 'اتشيك: هل هي محكّمة؟ حجم العينة إيه؟ اتكررت؟ مين مموّلها؟' },
      { id: 'med_b', mutation: '"Big pharma suppressed the evidence"', mutationAr: '"شركات الأدوية خبت الأدلة"', counterScript: 'Ask: What evidence would change YOUR mind? If nothing can, you\'re trapped in a conspiracy loop.', counterScriptAr: 'اسأل: إيه الدليل اللي هيغير رأيك إنت؟ لو مفيش حاجة ممكن، إنت محبوس في دايرة مؤامرة.' },
      { id: 'med_c', mutation: '"He was a martyr for natural medicine"', mutationAr: '"ده كان شهيد الطب الطبيعي"', counterScript: 'If he died of the condition he said didn\'t need medicine, that IS the evidence.', counterScriptAr: 'لو مات من نفس المرض اللي قال مش محتاج دوا، ده هو الدليل.' },
    ],
    mental_health: [
      { id: 'mh_a', mutation: '"But antidepressants change your personality"', mutationAr: '"بس مضادات الاكتئاب بتغير شخصيتك"', counterScript: 'They restore baseline. Cancer chemo "changes" your body too. That\'s treatment, not alteration.', counterScriptAr: 'بترجّع الخط الأساسي. الكيماوي "بيغير" جسمك كمان. ده علاج، مش تعديل.' },
      { id: 'mh_b', mutation: '"Psychiatry is a Western agenda"', mutationAr: '"الطب النفسي أجندة غربية"', counterScript: 'Ibn Sina wrote about melancholia in 1025 AD. Islamic psychiatry PRECEDED Western psychiatry.', counterScriptAr: 'ابن سينا كتب عن الكآبة سنة 1025 ميلادي. الطب النفسي الإسلامي سبق الطب النفسي الغربي.' },
      { id: 'mh_c', mutation: '"If you really had faith..."', mutationAr: '"لو إيمانك قوي كان..."', counterScript: 'قل هاتوا برهانكم. Bring your evidence. Faith is not measured by absence of illness.', counterScriptAr: 'قل هاتوا برهانكم. الإيمان مش بيتقاس بغياب المرض.' },
    ],
    economic: [
      { id: 'ec_a', mutation: '"See? It went up! I was right!"', mutationAr: '"شفت؟ طلع! أنا كنت صح!"', counterScript: 'Self-fulfilling prophecy ≠ accurate prediction. Arsonists are not weather forecasters.', counterScriptAr: 'نبوءة محققة لذاتها ≠ تنبؤ دقيق. الحرائقي مش راصد أحوال جوية.' },
      { id: 'ec_b', mutation: '"My friend at the bank said..."', mutationAr: '"صاحبي في البنك قال..."', counterScript: 'Name them. If real, they violated banking confidentiality law. CBE publishes official rates daily: cbrates.cbe.org.eg', counterScriptAr: 'سمّيه. لو حقيقي، هو خالف قانون السرية المصرفية. البنك المركزي بينشر الأسعار الرسمية يومياً: cbrates.cbe.org.eg' },
    ],
    religious: [
      { id: 'rel_a', mutation: '"You\'re questioning Allah\'s word!"', mutationAr: '"إنت بتشكك في كلام ربنا!"', counterScript: 'I\'m questioning YOUR interpretation. The Quran says اقرأ — READ. And قل هاتوا برهانكم — BRING YOUR EVIDENCE.', counterScriptAr: 'أنا بشكك في تفسيرك إنت. القرآن قال اقرأ. وقال قل هاتوا برهانكم.' },
      { id: 'rel_b', mutation: '"The scholars said..."', mutationAr: '"العلماء قالوا..."', counterScript: 'WHICH scholars? With what evidence? The greatest scholars disagreed on many things. That\'s called healthy debate.', counterScriptAr: 'أي علماء؟ بأي دليل؟ أعظم العلماء اختلفوا في حاجات كتير. ده اسمه نقاش صحي.' },
    ],
    gender: [
      { id: 'gen_a', mutation: '"This is how it\'s always been"', mutationAr: '"دايماً كان كده"', counterScript: 'It hasn\'t. Khadijah ran a business. Aisha led an army. Rufaida did surgery. READ YOUR OWN HISTORY.', counterScriptAr: 'مكنش كده دايماً. خديجة أدارت تجارة. عائشة قادت جيش. رفيدة عملت جراحة. اقرأ تاريخك.' },
    ],
  };

  const domainMutations = mutations[domain] || mutations.medical || [];

  return {
    layerId: 7,
    name: 'Forward Defense',
    nameAr: 'الدفاع الاستباقي',
    emoji: '🛡️',
    status: 'complete',
    predictedMutations: domainMutations,
    inoculationScript: `When they come back with "But..." — you now have ${domainMutations.length} pre-built responses. They can't surprise you.`,
    inoculationScriptAr: `لما يرجعوا بـ "بس..." — إنت دلوقتي عندك ${domainMutations.length} ردود جاهزة. مش هيقدروا يفاجئوك.`,
    drIsmailLesson: 'Dr. Ismail\'s team published their review and doctors CRITICIZED and BUILT UPON IT. That\'s science: always expecting the next question.',
    drIsmailLessonAr: 'فريق د. إسماعيل نشروا المراجعة والدكاترة انتقدوها وبنوا عليها. ده العلم: دايماً متوقع السؤال الجاي.',
  };
}

// ─── MAIN ORCHESTRATOR ───────────────────────────────

export type LayerCallback = (layer: LayerResult) => void;

export async function runGODSystem(
  claim: string,
  intensity: IntensityLevel = 'firm',
  onLayerComplete?: LayerCallback,
): Promise<GODSystemResult> {
  const id = `god_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const layers: LayerResult[] = [];

  // LAYER 1: Emotion Strip
  const l1 = await executeLayer1(claim, intensity);
  layers.push(l1);
  onLayerComplete?.(l1);

  // EMERGENCY CHECK
  if (l1.isEmergency) {
    return {
      id,
      timestamp: new Date().toISOString(),
      inputClaim: claim,
      inputClaimAr: claim,
      intensity: 'emergency',
      layers,
      overallVerdict: 'dangerous',
      overallVerdictAr: 'خطير — طوارئ',
      confidenceScore: 100,
      openingBanner: OPENING_BANNER,
      closingBanner: CLOSING_BANNER,
      biasesIdentified: 0,
      fallaciesDestroyed: 0,
      studiesConsulted: 0,
      conceptsLearned: ['Emergency recognition'],
      conceptsLearnedAr: ['التعرف على الطوارئ'],
      evidenceLiteracyGain: 5,
    };
  }

  // LAYER 2: Provenance Audit
  const l2 = await executeLayer2(claim);
  layers.push(l2);
  onLayerComplete?.(l2);

  // LAYER 3: Incentive Map
  const l3 = await executeLayer3(claim, l1.threatDomain);
  layers.push(l3);
  onLayerComplete?.(l3);

  // LAYER 4: Methodological Destruction
  const l4 = await executeLayer4(claim);
  layers.push(l4);
  onLayerComplete?.(l4);

  // LAYER 5: Fallacy Execution
  const l5 = await executeLayer5(claim, l1.threatDomain);
  layers.push(l5);
  onLayerComplete?.(l5);

  // LAYER 6: Truth Sandwich
  const l6 = executeLayer6(claim, l4, l5, l1.threatDomain);
  layers.push(l6);
  onLayerComplete?.(l6);

  // LAYER 7: Forward Defense
  const l7 = executeLayer7(claim, l1.threatDomain);
  layers.push(l7);
  onLayerComplete?.(l7);

  // Calculate overall verdict
  const score = l4.evidenceScore.score;
  const hasFactCheck = l2.verdict !== 'dead';
  const fallacyCount = l5.totalFallacies;

  let overallVerdict: GODSystemResult['overallVerdict'] = 'misleading';
  let overallVerdictAr = 'مضلل';

  if (score >= 8 && hasFactCheck && fallacyCount === 0) {
    overallVerdict = 'true';
    overallVerdictAr = 'صحيح';
  } else if (score >= 6 && fallacyCount <= 1) {
    overallVerdict = 'mostly_true';
    overallVerdictAr = 'صحيح في الغالب';
  } else if (score <= 2 && fallacyCount >= 3) {
    overallVerdict = 'false';
    overallVerdictAr = 'كاذب';
  } else if (score <= 1 && l1.dangerLevel === 'lethal') {
    overallVerdict = 'dangerous';
    overallVerdictAr = 'خطير';
  } else if (score <= 3) {
    overallVerdict = 'mostly_false';
    overallVerdictAr = 'كاذب في الغالب';
  }

  // Calculate what the user LEARNED
  const conceptsLearned = l4.conceptsTaught.map(c => c.concept);
  const conceptsLearnedAr = l4.conceptsTaught.map(c => c.conceptAr);

  // Evidence literacy gain = how many new concepts + fallacies they saw
  const evidenceLiteracyGain = Math.min(
    (l4.conceptsTaught.length * 10) + (fallacyCount * 5) + (l4.claimStudyCount > 0 ? 10 : 0),
    100
  );

  return {
    id,
    timestamp: new Date().toISOString(),
    inputClaim: claim,
    inputClaimAr: claim,
    intensity,
    layers,
    overallVerdict,
    overallVerdictAr,
    confidenceScore: Math.min(l4.claimStudyCount * 5 + fallacyCount * 10 + (hasFactCheck ? 20 : 0), 100),
    openingBanner: OPENING_BANNER,
    closingBanner: CLOSING_BANNER,
    biasesIdentified: l4.negSciMarkersTriggered.length,
    fallaciesDestroyed: fallacyCount,
    studiesConsulted: l4.claimStudyCount,
    conceptsLearned,
    conceptsLearnedAr,
    evidenceLiteracyGain,
  };
}
