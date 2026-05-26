/**
 * SAFETY TYPES + ZOD SCHEMAS
 * Framework: §6.3 (safety per MVP), §6.4 (data privacy), §6.5 (disclaimer templates)
 * Framework: §17.4 (8-Gate Check), §17.5 (5 UI boxes), §28.9 (crisis contacts)
 */
import { z } from "zod";

// ── §6.5 Disclaimer Templates (EXACT TEXT from framework) ──
export const DISCLAIMERS = {
  deepreal: "This module teaches identification of misinformation and deepfakes. It does not guarantee perfect detection of manipulated content. Always verify information through multiple trusted sources. All examples used are educational only and should not be used for other purposes.",
  mentalHealth: "This module is EDUCATIONAL only. It is NOT a substitute for professional mental health care. This platform does not diagnose, treat, or cure any mental health condition. If you are experiencing a mental health crisis, please contact emergency support immediately.",
  religionHub: "This module explores the relationship between religion and wellbeing through the lens of psychological research. It does not represent, endorse, or critique any particular religious tradition or practice. For theological guidance, please consult a qualified religious scholar.",
} as const;

// ── §17.4 The 8-Gate Check (permanent shared protocol) ──
export const EIGHT_GATE_CHECK = [
  "What is the exact claim?",
  "What evidence is actually shown?",
  "Who is the source, not just the platform?",
  "What is the date and context?",
  "What is missing or not shown?",
  "What would disconfirm this?",
  "What is my emotional state right now?",
  "What happens if I believe this too quickly?",
] as const;

// ── §17.5 Five UI Boxes ──
export const UI_BOXES = {
  claim: { label: "Claim", prompt: "State the claim in one sentence", duration: "15-20s" },
  evidence: { label: "Evidence", prompt: "Paste or select the evidence", duration: "20-30s" },
  context: { label: "Context", prompt: "When published? For whom? In which situation?", duration: "15s" },
  emotion: { label: "Emotion", prompt: "How does this content make you feel?", duration: "10s" },
  consequence: { label: "Consequence", prompt: "What is the harm if this is wrong?", duration: "10s" },
} as const;

// ── §28.9 Local Support Directory (CONFIRMED statuses) ──
export const CrisisContactSchema = z.object({
  id: z.string(),
  name: z.string(),
  nameAr: z.string().optional(),
  type: z.enum(["phone", "web", "reference"]),
  value: z.string(), // Phone number or URL
  status: z.enum(["confirmed", "pending"]),
  description: z.string(),
  descriptionAr: z.string().optional(),
});
export type CrisisContact = z.infer<typeof CrisisContactSchema>;

export const CRISIS_CONTACTS: CrisisContact[] = [
  {
    id: "gsmhat",
    name: "Egypt Mental Health Hotline (GSMHAT)",
    nameAr: "خط مساعدة الصحة النفسية",
    type: "phone",
    value: "16328",
    status: "confirmed",
    description: "Free mental health support from the General Secretariat of Mental Health and Addiction Treatment",
    descriptionAr: "الأمانة العامة للصحة النفسية وعلاج الإدمان",
  },
  {
    id: "ambulance",
    name: "Emergency Ambulance",
    nameAr: "الإسعاف",
    type: "phone",
    value: "123",
    status: "confirmed",
    description: "Egypt national emergency ambulance service",
    descriptionAr: "خدمة الإسعاف الطبي الطارئ",
  },
  {
    id: "mohp",
    name: "MoHP Mental Health Platform",
    nameAr: "منصة الصحة النفسية - وزارة الصحة",
    type: "web",
    value: "https://mentalhealth.mohp.gov.eg",
    status: "confirmed",
    description: "Ministry of Health and Population mental health resources",
    descriptionAr: "وزارة الصحة والسكان - موارد الصحة النفسية",
  },
  {
    id: "darifta",
    name: "Dar al-Ifta Religious Guidance",
    nameAr: "دار الإفتاء المصرية",
    type: "phone",
    value: "107",
    status: "confirmed",
    description: "Official religious guidance and consultation (within Egypt)",
    descriptionAr: "استشارات ومعلومات دينية",
  },
  {
    id: "alazhar-obs",
    name: "Al-Azhar Observatory for Combating Extremism",
    nameAr: "مرصد الأزهر لمكافحة التطرف",
    type: "reference",
    value: "https://www.azhar.eg",
    status: "confirmed",
    description: "Reference body for countering extremist content",
    descriptionAr: "جهة مرجعية لمكافحة المحتوى المتطرف",
  },
  {
    id: "campus",
    name: "University Campus Counseling",
    nameAr: "الإرشاد الجامعي",
    type: "reference",
    value: "",
    status: "pending",
    description: "Campus counseling services — contact details pending confirmation",
    descriptionAr: "خدمات الإرشاد النفسي في الجامعة",
  },
];

// ── §6.3 Safety Risk Catalog ──
export const SAFETY_RISKS = {
  deepreal: [
    { risk: "Disturbing deepfake content", mitigation: "Mild, non-violent, non-sexual, labeled educational" },
    { risk: "User creates deepfakes", mitigation: "Detection only, no creation tools" },
    { risk: "Political content", mitigation: "Neutral, non-political, non-regional" },
  ],
  mentalHealth: [
    { risk: "Discovers condition", mitigation: "Disclaimer every screen: Educational only" },
    { risk: "Active crisis", mitigation: "Crisis Resource Panel: 16328, 123, MoHP" },
    { risk: "Exercises trigger distress", mitigation: "Stop anytime + grounding instructions" },
    { risk: "Misinterprets as diagnosis", mitigation: "General educational description, not diagnostic" },
  ],
  religionHub: [
    { risk: "Perceived promotion", mitigation: "Neutrality disclaimer, psychology-of-religion framing" },
    { risk: "Religious guilt", mitigation: "Positive coping only, skip if uncomfortable" },
    { risk: "Extremist interpretation", mitigation: "Expert review, no political-religious content" },
    { risk: "Spiritual bypassing", mitigation: "Explicit module on recognizing it" },
  ],
} as const;

// ── §6.4 Data Privacy Principles (6 principles) ──
export const DATA_PRIVACY_PRINCIPLES = [
  { principle: "Anonymity", detail: "Random code IDs, no names" },
  { principle: "Minimal data", detail: "Only scores + completion, NO symptoms, NO detailed beliefs" },
  { principle: "Storage", detail: "Local encrypted, NO cloud unless university-approved" },
  { principle: "Retention", detail: "Deleted 1 year after completion" },
  { principle: "Access", detail: "Only PI and supervisor" },
  { principle: "Law", detail: "Egyptian PDPL Law No. 151 of 2020" },
] as const;
