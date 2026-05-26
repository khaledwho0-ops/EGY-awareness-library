export interface VisionPillar {
  id: string;
  title: string;
  titleAr: string;
  summary: string;
}

export interface EgyptianMisinformationPattern {
  id: string;
  title: string;
  titleAr: string;
  summary: string;
}

export interface CognitionBiasEntry {
  id: string;
  name: string;
  nameAr: string;
  egyptianPattern: string;
  researcher: string;
  citation: string;
  whyItMatters: string;
  productResponse: string;
}

export interface VisionResponseLayer {
  id: string;
  title: string;
  titleAr: string;
  summary: string;
  featureRefs: string[];
}

export const PROJECT_VISION_PILLARS: VisionPillar[] = [
  {
    id: "behavior-change",
    title: "Behavior change before content volume",
    titleAr: "تغيير السلوك قبل تكثير المحتوى",
    summary:
      "The project is designed to interrupt reckless sharing, not just publish more information into the same noisy feed.",
  },
  {
    id: "egypt-first",
    title: "Egypt-first misinformation literacy",
    titleAr: "وعي مصري أولاً تجاه التضليل",
    summary:
      "The target patterns are Egyptian WhatsApp families, vernacular rumors, reused visuals, unofficial fatwas, and panic-driven health and economy claims.",
  },
  {
    id: "three-lens",
    title: "Three-lens trust logic",
    titleAr: "منطق الثقة عبر ثلاث عدسات",
    summary:
      "DeepReal checks the claim, Mental Hub names the bias, and Religion Hub handles authority-sensitive faith framing without pretending all claims are purely technical.",
  },
  {
    id: "repeatable-habits",
    title: "Repeatable habits over one-time awareness",
    titleAr: "عادات قابلة للتكرار لا وعي لحظي فقط",
    summary:
      "The platform keeps returning the user to the same friction moves: slow down, identify the claim, trace the source, and compare evidence before forwarding.",
  },
];

export const EGYPT_MISINFORMATION_PATTERNS: EgyptianMisinformationPattern[] = [
  {
    id: "health-panic",
    title: "Health panic forwarding",
    titleAr: "تمرير الذعر الصحي",
    summary:
      "Vaccine scares, diabetes myths, fake cures, and Ministry of Health impersonation spread fast because they exploit fear, urgency, and family trust.",
  },
  {
    id: "authority-audio",
    title: "Voice-note authority",
    titleAr: "سلطة الرسائل الصوتية",
    summary:
      "Anonymous audio from a supposed doctor, sheikh, or insider carries borrowed status even when no accountable source exists.",
  },
  {
    id: "religious-chain",
    title: "Religious chain messaging",
    titleAr: "سلاسل دينية متداولة",
    summary:
      "WhatsApp fatwa chains and moralized advice can bypass evidence scrutiny because users treat belonging and piety as proof.",
  },
  {
    id: "economic-rumor",
    title: "Economic rumor acceleration",
    titleAr: "تسارع الشائعات الاقتصادية",
    summary:
      "Currency panic, bank-closure rumors, and investment scams become believable when uncertainty is already high and people search for certainty.",
  },
  {
    id: "recycled-visuals",
    title: "Recycled visuals and false context",
    titleAr: "إعادة استخدام الصور والفيديو خارج سياقها",
    summary:
      "Old photos, foreign clips, and cropped screenshots are routinely reframed as current Egyptian evidence because visuals shortcut deliberation.",
  },
];

export const COGNITION_BIAS_MAP: CognitionBiasEntry[] = [
  {
    id: "confirmation-bias",
    name: "Confirmation Bias",
    nameAr: "تحيز التأكيد",
    egyptianPattern: "بصدق اللي بيوافق رأيي عن اللقاحات حتى لو المصدر ضعيف.",
    researcher: "Raymond S. Nickerson",
    citation: "Nickerson, R.S. (1998). Confirmation bias: A ubiquitous phenomenon in many guises.",
    whyItMatters:
      "Users search for proof that matches the belief they already hold, which makes rumor correction feel like personal attack.",
    productResponse:
      "Mental Hub inserts contradiction checks before verdicts and pushes one serious disconfirming source before sharing.",
  },
  {
    id: "availability-heuristic",
    name: "Availability Heuristic",
    nameAr: "الاستدلال بالتوافر",
    egyptianPattern: "سمعت قصص عن ناس ماتت من اللقاح، يبقى الخطر أكيد حتى لو الإحصاء عكس كده.",
    researcher: "Amos Tversky and Daniel Kahneman",
    citation: "Tversky, A., & Kahneman, D. (1973). Availability: A heuristic for judging frequency and probability.",
    whyItMatters:
      "Vivid anecdotes dominate judgment faster than base rates, especially in family groups where stories spread more easily than datasets.",
    productResponse:
      "DeepReal pairs emotional claims with plain-language risk ratios, official Egyptian health references, and side-by-side probability framing.",
  },
  {
    id: "authority-bias",
    name: "Authority Bias",
    nameAr: "تحيز السلطة",
    egyptianPattern: "الدكتور اللي على يوتيوب قاله، أو الشيخ اللي في التسجيل الصوتي قاله، يبقى صح.",
    researcher: "Stanley Milgram",
    citation: "Milgram, S. (1963). Behavioral study of obedience.",
    whyItMatters:
      "Perceived status replaces evidence, which is especially dangerous in health, religion, and political crisis messaging.",
    productResponse:
      "The platform checks accountable origin, verified institutional sources, and whether the title is being used without method or evidence.",
  },
  {
    id: "dunning-kruger-effect",
    name: "Dunning-Kruger Effect",
    nameAr: "تأثير دانينغ-كروغر",
    egyptianPattern: "بعد فيديو ثلاث دقايق عن الاقتصاد أو الطب، الشخص يحس إنه فهم الملف بالكامل.",
    researcher: "David Dunning and Justin Kruger",
    citation: "Kruger, J., & Dunning, D. (1999). Unskilled and unaware of it.",
    whyItMatters:
      "Low competence can produce high certainty, which makes fast-forwarded misinformation tutorials unusually persuasive.",
    productResponse:
      "The app decomposes claims into smaller checkable units and shows how much evidence is still missing before a confident conclusion is warranted.",
  },
  {
    id: "illusory-truth-effect",
    name: "Illusory Truth Effect",
    nameAr: "تأثير الحقيقة الوهمية",
    egyptianPattern: "كل ما أشوف نفس الادعاء في جروبات أكتر أحسه حقيقي حتى لو مفيش مصدر أصلي.",
    researcher: "Lynn Hasher, David Goldstein, and Thomas Toppino",
    citation: "Hasher, L., Goldstein, D., & Toppino, T. (1977). Frequency and the conference of referential validity.",
    whyItMatters:
      "Repetition creates familiarity, and familiarity can be misread as truth when users are overloaded.",
    productResponse:
      "Branching experiences and report views explicitly expose repetition loops so users see spread velocity as a warning, not a credibility signal.",
  },
  {
    id: "social-proof",
    name: "Social Proof",
    nameAr: "البرهان الاجتماعي",
    egyptianPattern: "1,247 مشاركة أو آلاف التعليقات، يبقى الكلام أكيد صحيح.",
    researcher: "Robert B. Cialdini",
    citation: "Cialdini, R.B. (1984). Influence: The Psychology of Persuasion.",
    whyItMatters:
      "Large visible engagement counts can legitimize falsehoods before any verification happens.",
    productResponse:
      "The search, report, and branching UI all restate that reach measures spread, not evidence quality.",
  },
  {
    id: "in-group-bias",
    name: "In-Group Bias",
    nameAr: "تحيز الجماعة",
    egyptianPattern: "واحد من ديننا أو منطقتنا أو دايرتنا قاله، يبقى نصدقه أكتر من أي مصدر خارجي.",
    researcher: "Henri Tajfel and John Turner",
    citation: "Tajfel, H., & Turner, J.C. (1979). An integrative theory of intergroup conflict.",
    whyItMatters:
      "Identity trust can override evidence standards, especially when the message is framed as defending the group.",
    productResponse:
      "Religion Hub and Mental Hub separate respect for identity from proof of factual accuracy, then route the user to accountable authorities.",
  },
  {
    id: "backfire-effect",
    name: "Backfire Effect",
    nameAr: "أثر الارتداد",
    egyptianPattern: "لما تصحح الإشاعة بطريقة هجومية، الشخص يتمسك بيها أكتر عشان يحافظ على صورته.",
    researcher: "Brendan Nyhan and Jason Reifler",
    citation: "Nyhan, B., & Reifler, J. (2010). When Corrections Fail: The persistence of political misperceptions.",
    whyItMatters:
      "Correction style matters; if the platform humiliates the user, it risks strengthening the wrong belief instead of weakening it.",
    productResponse:
      "The copy style avoids shaming language and uses guided comparison, calm confidence labels, and reversible learning paths.",
  },
  {
    id: "emotional-reasoning",
    name: "Emotional Reasoning",
    nameAr: "الاستدلال العاطفي",
    egyptianPattern: "بحس إنه صح، أو الرسالة خوفتني، يبقى أكيد لازم أصدقها وأبعتها.",
    researcher: "Aaron T. Beck",
    citation: "Beck, A.T. (1979). Cognitive Therapy of Depression.",
    whyItMatters:
      "Fear, disgust, and moral panic make messages feel urgent and self-validating even when the evidence is thin.",
    productResponse:
      "The platform names the user’s likely emotional trigger and slows the decision before showing the verification verdict.",
  },
  {
    id: "proportionality-bias",
    name: "Proportionality Bias",
    nameAr: "تحيز التناسب",
    egyptianPattern: "حدث كبير لازم يكون وراه مؤامرة كبيرة، فالتفسير البسيط يبان ساذج.",
    researcher: "David Aaronovitch",
    citation: "Aaronovitch, D. (2009). Voodoo Histories.",
    whyItMatters:
      "Conspiracy narratives thrive when people reject ordinary explanations as emotionally unsatisfying.",
    productResponse:
      "DeepReal compares the dramatic explanation against the documented chain of simpler verified causes and evidence classes.",
  },
  {
    id: "pattern-recognition-overreach",
    name: "Pattern Recognition Overreach",
    nameAr: "المبالغة في رؤية الأنماط",
    egyptianPattern: "شوية مصادفات متجاورة يتحولوا بسرعة إلى قصة مؤامرة كاملة.",
    researcher: "Michael Shermer",
    citation: "Shermer, M. (2011). The Believing Brain.",
    whyItMatters:
      "Humans are built to detect patterns, but misinformation exploits that instinct by over-linking unrelated events.",
    productResponse:
      "Interactive claim breakdowns force the user to separate coincidence, timeline, causation, and evidence source.",
  },
  {
    id: "curse-of-knowledge",
    name: "Curse of Knowledge",
    nameAr: "لعنة المعرفة",
    egyptianPattern: "الخبير يشرح المصطلحات كأن المستخدم العادي فاهمها، فيسيب فراغ تملؤه الشائعة.",
    researcher: "Chip Heath and Dan Heath",
    citation: "Heath, C., & Heath, D. (2007). Made to Stick.",
    whyItMatters:
      "If explanations are too technical, users abandon the trusted source and fall back to simpler misleading narratives.",
    productResponse:
      "Arabic plain-language summaries, dialect-aware phrasing, and stepwise definitions reduce the gap between expert knowledge and public comprehension.",
  },
  {
    id: "zero-risk-bias",
    name: "Zero-Risk Bias",
    nameAr: "تحيز انعدام الخطر",
    egyptianPattern: "أرفض لقاح فيه احتمال نادر جدًا لمضاعفة، حتى لو الخطر الأكبر هو المرض نفسه.",
    researcher: "Paul Slovic",
    citation: "Slovic, P. (1987). Perception of risk.",
    whyItMatters:
      "People often prefer eliminating a tiny visible risk over reducing a much larger background risk.",
    productResponse:
      "Health fact-check results compare small side-effect risk against larger disease risk in the same frame and unit.",
  },
  {
    id: "anchoring-effect",
    name: "Anchoring Effect",
    nameAr: "تأثير الارتساء",
    egyptianPattern: "أول رقم عن الدولار أو أول شائعة عن قرار حكومي يثبت في الذهن ويصير مرجعًا لباقي الحكم.",
    researcher: "Amos Tversky and Daniel Kahneman",
    citation: "Tversky, A., & Kahneman, D. (1974). Judgment under Uncertainty: Heuristics and Biases.",
    whyItMatters:
      "The first number or framing a user sees can distort later evaluation, even after correction arrives.",
    productResponse:
      "Result cards restate the original anchor, then explicitly replace it with verified figures, dates, and accountable sources.",
  },
];

export const VISION_RESPONSE_LAYERS: VisionResponseLayer[] = [
  {
    id: "deepreal-layer",
    title: "DeepReal claim layer",
    titleAr: "طبقة فحص الادعاء",
    summary:
      "Handles claim isolation, evidence depth, accountable source tracing, and the final reliability framing.",
    featureRefs: ["DeepReal verdict cards", "saved reports", "shareable report URLs", "printable Arabic exports"],
  },
  {
    id: "mental-layer",
    title: "Mental Hub bias layer",
    titleAr: "طبقة التحيزات الذهنية",
    summary:
      "Names the cognitive shortcut being exploited so users learn why the false claim felt compelling in the first place.",
    featureRefs: ["bias prompts", "slow-down friction", "self-awareness reflection", "assessment carryover"],
  },
  {
    id: "religion-layer",
    title: "Religion Hub trust layer",
    titleAr: "طبقة الثقة الدينية",
    summary:
      "Supports high-trust religious contexts without letting chain messages or moral panic masquerade as authoritative proof.",
    featureRefs: ["Dar al-Iftaa references", "authority checks", "faith-sensitive routing"],
  },
  {
    id: "behavior-layer",
    title: "Behavioral rehearsal layer",
    titleAr: "طبقة التدريب السلوكي",
    summary:
      "Uses the branching experience, reversal flow, and trailer storytelling to rehearse safer sharing behavior instead of only telling users what to do.",
    featureRefs: ["branching reverse mode", "time-travel recovery", "family trailer scenes", "result summaries"],
  },
];
