/**
 * VICTIM IMPACT PROFILES
 * Chunk 1C — Demographic-specific harm case studies
 *
 * Purpose: Maps real-world harm cases to specific demographics,
 * exercises, and intervention modes per Template mandate.
 * Framework: RESSEARCH TASK.txt (Task 4, Task 14)
 * Template: Demographics + Use Cases + Harm Profiles
 */

export interface VictimProfile {
  id: string;
  demographic: string;
  demographicAr: string;
  field: string;
  harmCase: string;
  harmCaseAr: string;
  region: "global" | "egypt" | "mena";
  mvp: "deepreal" | "mental-health" | "religion-hub";
  exerciseApplication: string;
  exerciseDay?: number;
  comBTarget: string;
  comBBarrier: string;
  manipulationVector: string;
  protectiveSkill: string;
}

export const VICTIM_IMPACT_PROFILES: VictimProfile[] = [
  {
    id: "vip-01",
    demographic: "Mothers",
    demographicAr: "الأمهات",
    field: "Health",
    harmCase: "WhatsApp audio claiming 'Vaccine causes infertility' — mother delays child's polio vaccination, exposing child to preventable disease.",
    harmCaseAr: "رسالة صوتية على واتساب تدعي أن 'اللقاح يسبب العقم' — الأم تؤخر تطعيم طفلها ضد شلل الأطفال.",
    region: "egypt",
    mvp: "mental-health",
    exerciseApplication: "Mental Health: Health Literacy card on understanding risk vs absolute claims",
    exerciseDay: 5,
    comBTarget: "Capability/Psychological",
    comBBarrier: "Cannot distinguish medical evidence from social media claims",
    manipulationVector: "Emotional appeal (child safety) + authority fabrication (fake doctor)",
    protectiveSkill: "SIFT Step F: Find better coverage from WHO/MoHP",
  },
  {
    id: "vip-02",
    demographic: "Sons/Daughters",
    demographicAr: "الأبناء/البنات",
    field: "Social/Digital Safety",
    harmCase: "Teen uses AI to create deepfake nude images of female classmates (NCII), causing severe psychological trauma to victims.",
    harmCaseAr: "مراهق يستخدم الذكاء الاصطناعي لإنشاء صور عارية مزيفة لزميلاته، مما يسبب صدمة نفسية شديدة.",
    region: "global",
    mvp: "deepreal",
    exerciseApplication: "DeepReal: Ethics module on Digital Consent & Harm",
    exerciseDay: 7,
    comBTarget: "Motivation/Reflective",
    comBBarrier: "Lack of awareness that AI image generation constitutes harm",
    manipulationVector: "AI image generation tool accessibility + anonymity perception",
    protectiveSkill: "Understanding legal consequences + ethical digital citizenship",
  },
  {
    id: "vip-03",
    demographic: "Students",
    demographicAr: "الطلاب",
    field: "Education/Finance",
    harmCase: "Fake 'Scholarship Portal' phishing link sent during exam season. Student enters personal data and bank info, loses savings.",
    harmCaseAr: "رابط تصيد لبوابة منح مزيفة يُرسل أثناء موسم الامتحانات. الطالب يدخل بياناته الشخصية والبنكية ويخسر مدخراته.",
    region: "egypt",
    mvp: "deepreal",
    exerciseApplication: "SIFT Step I: Check URL domain (.gov.eg vs .com impostor)",
    exerciseDay: 4,
    comBTarget: "Capability/Psychological",
    comBBarrier: "Cannot distinguish legitimate .gov.eg from impostor domains",
    manipulationVector: "Urgency (exam season) + authority mimicry (government logo) + financial incentive",
    protectiveSkill: "URL verification + lateral reading + official channel confirmation",
  },
  {
    id: "vip-04",
    demographic: "Teachers",
    demographicAr: "المعلمون",
    field: "Professional Reputation",
    harmCase: "False accusations of misconduct spread via anonymous social media posts. Teacher loses professional standing before any verification occurs.",
    harmCaseAr: "اتهامات كاذبة بسوء السلوك تنتشر عبر منشورات مجهولة الهوية. المعلم يفقد مكانته المهنية قبل أي تحقق.",
    region: "global",
    mvp: "deepreal",
    exerciseApplication: "Source Ranking exercise: Anonymous Post vs School Official Statement",
    exerciseDay: 11,
    comBTarget: "Capability/Psychological",
    comBBarrier: "Audience cannot distinguish anonymous claim from verified report",
    manipulationVector: "Anonymity + social proof (sharing count) + emotional outrage",
    protectiveSkill: "Source credibility evaluation + waiting for official statement",
  },
  {
    id: "vip-05",
    demographic: "Scientists",
    demographicAr: "العلماء",
    field: "Academia/Research",
    harmCase: "Harassment campaigns using doctored data charts to undermine climate research. Scientists receive death threats based on fabricated 'evidence'.",
    harmCaseAr: "حملات مضايقة باستخدام مخططات بيانات معدلة لتقويض أبحاث المناخ. العلماء يتلقون تهديدات بالقتل.",
    region: "global",
    mvp: "deepreal",
    exerciseApplication: "KeyHunter term: Cherry Picking Data with visual detection exercise",
    exerciseDay: 13,
    comBTarget: "Capability/Psychological",
    comBBarrier: "Audience lacks data visualization literacy to spot manipulation",
    manipulationVector: "Data cherry-picking + misleading axes + coordinated amplification",
    protectiveSkill: "Data visualization literacy + source triangulation",
  },
  {
    id: "vip-06",
    demographic: "Elderly",
    demographicAr: "كبار السن",
    field: "Finance",
    harmCase: "Fake bank call using spoofed caller ID (Vishing). Elderly person shares account details believing they're speaking with their bank.",
    harmCaseAr: "مكالمة بنكية مزيفة باستخدام هوية متصل مزورة. كبير السن يشارك تفاصيل حسابه معتقدًا أنه يتحدث مع البنك.",
    region: "egypt",
    mvp: "deepreal",
    exerciseApplication: "Threat Glossary: Vishing (Voice Phishing) with practical verification steps",
    exerciseDay: 8,
    comBTarget: "Capability/Physical",
    comBBarrier: "Low tech literacy + trust in phone authority cues",
    manipulationVector: "Caller ID spoofing + urgency ('account compromised') + authority mimicry",
    protectiveSkill: "Hang up and call bank directly using number on card",
  },
  {
    id: "vip-07",
    demographic: "Doctors",
    demographicAr: "الأطباء",
    field: "Medical/Reputation",
    harmCase: "Viral post claiming 'Doctor X is harvesting organs' leads to mob violence against medical staff and clinic damage.",
    harmCaseAr: "منشور فيروسي يدعي أن 'الطبيب X يتاجر بالأعضاء' يؤدي إلى عنف جماعي ضد الطاقم الطبي.",
    region: "egypt",
    mvp: "religion-hub",
    exerciseApplication: "Religion Hub: Boundary Guide — Islamic ethics of slander (Buhtan/Nameemah)",
    exerciseDay: 9,
    comBTarget: "Motivation/Reflective",
    comBBarrier: "Emotional outrage bypasses verification before sharing",
    manipulationVector: "Emotional trigger (organ theft fear) + social proof (viral sharing) + mob dynamics",
    protectiveSkill: "SIFT Stop + Islamic ethics of verification (Quran 49:6 — verify before acting)",
  },
  {
    id: "vip-08",
    demographic: "Youth (18-25)",
    demographicAr: "الشباب (18-25)",
    field: "Mental Health",
    harmCase: "Student consumes TikTok 'self-diagnosis' content, convinces self they have multiple disorders, avoids professional help because 'I already know what I have'.",
    harmCaseAr: "طالب يستهلك محتوى 'التشخيص الذاتي' على تيك توك، يقنع نفسه بأنه يعاني من اضطرابات متعددة، ويتجنب المساعدة المهنية.",
    region: "global",
    mvp: "mental-health",
    exerciseApplication: "Mental Health: Myth Autopsy — 'Self-diagnosis via social media is reliable'",
    exerciseDay: 11,
    comBTarget: "Capability/Psychological",
    comBBarrier: "Cannot distinguish clinical diagnosis from social media content",
    manipulationVector: "Relatable content + algorithm reinforcement + false expertise cues",
    protectiveSkill: "Distinguish educational content from clinical diagnosis; know referral pathways",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────

export function getProfilesByDemographic(demographic: string): VictimProfile[] {
  return VICTIM_IMPACT_PROFILES.filter(p => p.demographic === demographic);
}

export function getProfilesByMVP(mvp: "deepreal" | "mental-health" | "religion-hub"): VictimProfile[] {
  return VICTIM_IMPACT_PROFILES.filter(p => p.mvp === mvp);
}

export function getProfileForExerciseDay(mvp: string, day: number): VictimProfile | undefined {
  return VICTIM_IMPACT_PROFILES.find(p => p.mvp === mvp && p.exerciseDay === day);
}
