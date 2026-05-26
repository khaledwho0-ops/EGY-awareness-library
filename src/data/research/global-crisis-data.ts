/**
 * GLOBAL CRISIS DATA MODULE
 * Chunk 1A — Real-world misinformation & deepfake crisis evidence
 *
 * Purpose: Structured, citation-backed data that exercises reference.
 * Framework: §8.1 DeepReal, RESSEARCH TASK.txt Tasks 1,3,5,6
 * Template: 20 Universal Standards #11 (Empirical Evidence)
 */

// ─── Types ───────────────────────────────────────────────────────

export interface CrisisStatistic {
  id: string;
  claim: string;
  value: string;
  source: string;
  sourceYear: number;
  sourceTier: "S" | "A" | "B" | "C";
  doi?: string;
  url?: string;
  mvpRelevance: ("deepreal" | "mental-health" | "religion-hub")[];
  exerciseApplication: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  titleAr: string;
  region: "global" | "egypt" | "mena";
  field: string;
  year: number;
  summary: string;
  summaryAr: string;
  impact: string;
  source: string;
  sourceUrl?: string;
  exerciseId?: string;
  exerciseApplication: string;
  comBTarget: string;
  manipulationTechnique: string;
}

export interface ViralFake {
  id: string;
  claim: string;
  claimAr: string;
  region: "global" | "egypt";
  year: number;
  category: "health" | "political" | "financial" | "social" | "religious";
  viralityMetric: string;
  debunkedBy: string;
  siftStepHighlighted: "stop" | "investigate" | "find" | "trace";
  exerciseType: string;
  exerciseApplication: string;
}

// ─── Global Statistics ───────────────────────────────────────────

export const GLOBAL_CRISIS_STATISTICS: CrisisStatistic[] = [
  {
    id: "gcs-01",
    claim: "Misinformation ranked as #1 short-term global risk",
    value: "#1 risk (ahead of extreme weather)",
    source: "World Economic Forum — Global Risks Report 2024",
    sourceYear: 2024,
    sourceTier: "C",
    url: "https://www.weforum.org/publications/global-risks-report-2024/",
    mvpRelevance: ["deepreal"],
    exerciseApplication: "DeepReal intro — 'Why This Matters' panel on Day 1",
  },
  {
    id: "gcs-02",
    claim: "900% increase in deepfake keyword mentions in global news",
    value: "900% increase (2022→2025)",
    source: "GDELT Project — Global Media Monitoring",
    sourceYear: 2025,
    sourceTier: "B",
    url: "https://www.gdeltproject.org/",
    mvpRelevance: ["deepreal"],
    exerciseApplication: "DeepReal Day 7 — Deepfake Detection Literacy statistics panel",
  },
  {
    id: "gcs-03",
    claim: "85% of internet users worried about online disinformation",
    value: "85%",
    source: "UNESCO — Survey on Information Integrity",
    sourceYear: 2024,
    sourceTier: "C",
    mvpRelevance: ["deepreal"],
    exerciseApplication: "Baseline Assessment — context for pre-test MIST-20",
  },
  {
    id: "gcs-04",
    claim: "Deepfake creation barrier dropped to near-zero cost",
    value: "Consumer GPU + open-source models sufficient",
    source: "arXiv — Survey of Deepfake Generation 2024",
    sourceYear: 2024,
    sourceTier: "B",
    mvpRelevance: ["deepreal"],
    exerciseApplication: "DeepReal Day 7 — 'Why detection matters more than ever'",
  },
  {
    id: "gcs-05",
    claim: "Voice cloning requires only 3-5 seconds of audio",
    value: "3-5 seconds (from TikTok/Reels)",
    source: "OpenAI Research — Voice Engine Safety Assessment",
    sourceYear: 2024,
    sourceTier: "B",
    mvpRelevance: ["deepreal", "religion-hub"],
    exerciseApplication: "Religion Hub scenario: 'Voice note from Sheikh asking for money'",
  },
  {
    id: "gcs-06",
    claim: "Emotionally charged false content shared 6x more than neutral",
    value: "6x sharing rate",
    source: "Brady et al. — Emotion shapes diffusion of moralized content. PNAS.",
    sourceYear: 2017,
    sourceTier: "A",
    doi: "10.1073/pnas.1618923114",
    mvpRelevance: ["deepreal", "mental-health"],
    exerciseApplication: "DeepReal Day 8 — Emotional Manipulation Detection statistics",
  },
  {
    id: "gcs-07",
    claim: "Prebunking reduces susceptibility by 21-25%",
    value: "21-25% reduction",
    source: "Roozenbeek et al. — Psychological inoculation. Science Advances.",
    sourceYear: 2022,
    sourceTier: "S",
    doi: "10.1126/sciadv.abo6254",
    mvpRelevance: ["deepreal"],
    exerciseApplication: "DeepReal theoretical justification — why daily exercises work",
  },
  {
    id: "gcs-08",
    claim: "25% of Egyptian population suffers from mental/neurological disorders",
    value: "~25%",
    source: "WHO Egypt — Mental Health Atlas",
    sourceYear: 2023,
    sourceTier: "C",
    mvpRelevance: ["mental-health"],
    exerciseApplication: "Mental Health MVP justification — prevalence data",
  },
  {
    id: "gcs-09",
    claim: "90% mental health treatment gap in Egypt",
    value: "90% treatment gap",
    source: "MoHP Egypt — National Mental Health Report",
    sourceYear: 2023,
    sourceTier: "C",
    mvpRelevance: ["mental-health"],
    exerciseApplication: "Mental Health Day 5 — Help-Seeking barrier statistics",
  },
  {
    id: "gcs-10",
    claim: "95% of Egyptians say religion is very important in their lives",
    value: "95%",
    source: "Pew Research Center — Global Attitudes Survey",
    sourceYear: 2023,
    sourceTier: "A",
    mvpRelevance: ["religion-hub"],
    exerciseApplication: "Religion Hub MVP justification — salience data",
  },
];

// ─── Global Case Studies ─────────────────────────────────────────

export const GLOBAL_CASE_STUDIES: CaseStudy[] = [
  {
    id: "gcase-01",
    title: "Hong Kong Deepfake CFO Scam",
    titleAr: "عملية احتيال الفيديو المزيف في هونغ كونغ",
    region: "global",
    field: "Finance",
    year: 2024,
    summary: "Attackers used AI to impersonate a CFO in a video conference call, tricking an employee into transferring $25 million to fraudulent accounts.",
    summaryAr: "استخدم المهاجمون الذكاء الاصطناعي لانتحال شخصية المدير المالي في مكالمة فيديو، وخدعوا موظفًا لتحويل 25 مليون دولار إلى حسابات احتيالية.",
    impact: "$25M stolen via AI video impersonation",
    source: "CNN Business / South China Morning Post",
    exerciseId: "dr-day-07",
    exerciseApplication: "Voice/Video Verification in Professional Settings exercise",
    comBTarget: "Capability/Psychological",
    manipulationTechnique: "Deepfake video impersonation + authority bias",
  },
  {
    id: "gcase-02",
    title: "COVID-19 Infodemic",
    titleAr: "وباء المعلومات المضللة حول كوفيد-19",
    region: "global",
    field: "Health",
    year: 2020,
    summary: "WHO estimated misinformation contributed to thousands of preventable deaths globally due to non-compliance with public health measures.",
    summaryAr: "قدرت منظمة الصحة العالمية أن المعلومات المضللة ساهمت في آلاف الوفيات التي كان يمكن تجنبها بسبب عدم الامتثال لتدابير الصحة العامة.",
    impact: "Thousands of preventable deaths worldwide",
    source: "WHO — Managing the COVID-19 Infodemic",
    sourceUrl: "https://www.who.int/health-topics/infodemic",
    exerciseApplication: "Source Registry prioritizes WHO & MoHP sources",
    comBTarget: "Capability/Physical",
    manipulationTechnique: "Health misinformation + emotional appeal + social proof",
  },
  {
    id: "gcase-03",
    title: "Slovakia Deepfake Audio Election Interference",
    titleAr: "تدخل صوتي مزيف في انتخابات سلوفاكيا",
    region: "global",
    field: "Politics",
    year: 2023,
    summary: "AI-generated audio of a politician discussing vote-buying was released during the pre-election media blackout period, making real-time fact-checking impossible.",
    summaryAr: "تم نشر تسجيل صوتي مولد بالذكاء الاصطناعي لسياسي يناقش شراء الأصوات أثناء فترة حظر الإعلام قبل الانتخابات.",
    impact: "Potential election manipulation; fact-checking blocked by timing",
    source: "Reuters / AFP Fact Check",
    exerciseId: "dr-day-08",
    exerciseApplication: "Timing & Tactical Misinformation exercise",
    comBTarget: "Capability/Psychological",
    manipulationTechnique: "Deepfake audio + strategic timing + media blackout exploitation",
  },
  {
    id: "gcase-04",
    title: "Teen AI-Generated NCII Crisis",
    titleAr: "أزمة الصور المزيفة غير التوافقية للمراهقين",
    region: "global",
    field: "Social/Ethics",
    year: 2024,
    summary: "Multiple cases worldwide of teenagers using AI to create deepfake nude images of classmates, causing severe psychological harm to victims.",
    summaryAr: "حالات متعددة حول العالم لمراهقين يستخدمون الذكاء الاصطناعي لإنشاء صور عارية مزيفة لزملائهم، مما تسبب في أضرار نفسية شديدة.",
    impact: "Severe psychological harm; criminal investigations in multiple countries",
    source: "FBI / National Center for Missing & Exploited Children",
    exerciseApplication: "DeepReal Ethics module — Digital Consent & Harm",
    comBTarget: "Motivation/Reflective",
    manipulationTechnique: "AI image generation + non-consensual distribution",
  },
  {
    id: "gcase-05",
    title: "Climate Scientist Harassment via Doctored Charts",
    titleAr: "مضايقة العلماء عبر مخططات بيانات معدلة",
    region: "global",
    field: "Academia",
    year: 2023,
    summary: "Coordinated harassment campaigns against climate scientists using cherry-picked and doctored data visualizations to undermine research credibility.",
    summaryAr: "حملات مضايقة منسقة ضد علماء المناخ باستخدام رسوم بيانية انتقائية ومعدلة لتقويض مصداقية البحث.",
    impact: "Scientists receiving death threats; research chilling effect",
    source: "Nature — Survey of harassed scientists",
    exerciseId: "dr-day-11",
    exerciseApplication: "KeyHunter term: Cherry Picking Data with visual exercise",
    comBTarget: "Capability/Psychological",
    manipulationTechnique: "Data cherry-picking + coordinated harassment + appeal to conspiracy",
  },
];

// ─── Top Viral Fakes ─────────────────────────────────────────────

export const VIRAL_FAKES_REGISTRY: ViralFake[] = [
  {
    id: "vf-g01",
    claim: "AI-generated images of Donald Trump being arrested",
    claimAr: "صور مولدة بالذكاء الاصطناعي لاعتقال دونالد ترامب",
    region: "global",
    year: 2023,
    category: "political",
    viralityMetric: "Millions of views across platforms within hours",
    debunkedBy: "Bellingcat, Snopes, AFP Fact Check",
    siftStepHighlighted: "investigate",
    exerciseType: "Reverse Image Search",
    exerciseApplication: "DeepReal Day 7: 'Can you identify the AI artifacts in this image?'",
  },
  {
    id: "vf-g02",
    claim: "AI image of Pentagon explosion causing stock market dip",
    claimAr: "صورة مزيفة لانفجار في البنتاغون تسبب هبوطًا في سوق الأسهم",
    region: "global",
    year: 2023,
    category: "financial",
    viralityMetric: "Brief S&P 500 dip; multi-million dollar impact",
    debunkedBy: "AP, Reuters, DoD official statement",
    siftStepHighlighted: "find",
    exerciseType: "Check the Source Not Just the Image",
    exerciseApplication: "DeepReal Day 9: Multi-source triangulation when stakes are high",
  },
  {
    id: "vf-g03",
    claim: "Pope Francis wearing a white puffer jacket",
    claimAr: "البابا فرنسيس يرتدي سترة بيضاء منفوخة",
    region: "global",
    year: 2023,
    category: "social",
    viralityMetric: "Shared by millions, many believing it was real",
    debunkedBy: "BuzzFeed, Snopes",
    siftStepHighlighted: "stop",
    exerciseType: "Is It Real or Just a Meme?",
    exerciseApplication: "DeepReal Day 7: Harmless but demonstrates Synthetic Media Saturation",
  },
  {
    id: "vf-e01",
    claim: "Egyptian government secretly implanting chips via COVID vaccines",
    claimAr: "الحكومة المصرية تزرع شرائح سرية عبر لقاحات كوفيد",
    region: "egypt",
    year: 2021,
    category: "health",
    viralityMetric: "Millions of WhatsApp forwards across Egyptian governorates",
    debunkedBy: "Misbar, MoHP official statement",
    siftStepHighlighted: "trace",
    exerciseType: "Pre-Bunking Medical Conspiracy Trope",
    exerciseApplication: "DeepReal Day 10: Trace origin of health conspiracy to social media fabrication",
  },
  {
    id: "vf-e02",
    claim: "Currency float imminent — rush to buy dollars",
    claimAr: "تعويم العملة وشيك — اسرعوا بشراء الدولار",
    region: "egypt",
    year: 2024,
    category: "financial",
    viralityMetric: "Drives black market speculation and economic panic",
    debunkedBy: "Central Bank of Egypt official statements",
    siftStepHighlighted: "find",
    exerciseType: "Wait for Official Statement",
    exerciseApplication: "DeepReal Day 9: 'Find Better Coverage' from CBE before acting on rumors",
  },
  {
    id: "vf-e03",
    claim: "Plastic rice being sold in Egyptian markets",
    claimAr: "أرز بلاستيكي يُباع في الأسواق المصرية",
    region: "egypt",
    year: 2023,
    category: "health",
    viralityMetric: "Viral WhatsApp video with millions of views",
    debunkedBy: "National Food Safety Authority (NFSA), Fatabyyano",
    siftStepHighlighted: "trace",
    exerciseType: "Trace to Original Authority",
    exerciseApplication: "DeepReal Day 12: Trace claim to NFSA laboratory analysis",
  },
  {
    id: "vf-e04",
    claim: "Celebrity death hoax (various Egyptian celebrities)",
    claimAr: "خبر وفاة مزيف لمشاهير مصريين",
    region: "egypt",
    year: 2024,
    category: "social",
    viralityMetric: "Trends on Twitter/X within minutes",
    debunkedBy: "Official celebrity social media accounts",
    siftStepHighlighted: "investigate",
    exerciseType: "Check Official Account",
    exerciseApplication: "DeepReal Day 5: Investigate the source — check verified accounts",
  },
  {
    id: "vf-e05",
    claim: "Fake government scholarship portal phishing",
    claimAr: "بوابة منح حكومية مزيفة للتصيد الاحتيالي",
    region: "egypt",
    year: 2024,
    category: "financial",
    viralityMetric: "Targeted at students during exam season",
    debunkedBy: "Ministry of Higher Education",
    siftStepHighlighted: "investigate",
    exerciseType: "URL Domain Check",
    exerciseApplication: "DeepReal Day 4: SIFT Step I — check .gov.eg vs impostor domains",
  },
];

// ─── Helper Functions ────────────────────────────────────────────

export function getCrisisStatsByMVP(mvp: "deepreal" | "mental-health" | "religion-hub"): CrisisStatistic[] {
  return GLOBAL_CRISIS_STATISTICS.filter(s => s.mvpRelevance.includes(mvp));
}

export function getCaseStudiesByRegion(region: "global" | "egypt" | "mena"): CaseStudy[] {
  return GLOBAL_CASE_STUDIES.filter(c => c.region === region);
}

export function getViralFakesByRegion(region: "global" | "egypt"): ViralFake[] {
  return VIRAL_FAKES_REGISTRY.filter(f => f.region === region);
}

export function getViralFakesBySiftStep(step: "stop" | "investigate" | "find" | "trace"): ViralFake[] {
  return VIRAL_FAKES_REGISTRY.filter(f => f.siftStepHighlighted === step);
}

export function getCaseStudyForExercise(exerciseId: string): CaseStudy | undefined {
  return GLOBAL_CASE_STUDIES.find(c => c.exerciseId === exerciseId);
}
