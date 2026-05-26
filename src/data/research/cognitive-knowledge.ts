import type { LocalizedText, ModuleId } from "./module-briefings";

export type BiasFamily = "deepfake-fallacy" | "deepfake-bias" | "religious-bias";

export interface KnowledgeSourceLink {
  label: LocalizedText;
  url: string;
}

export interface KeyHunterV2Entry {
  id: string;
  module: ModuleId;
  category: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  action: LocalizedText;
  whyItMatters: LocalizedText;
  tags: string[];
  priority?: "egypt-critical" | "global-critical" | "high-need";
  coreKeywords: string[];
  expertKeywords: string[];
  hiddenTerms: string[];
  researchPhrases: string[];
  threatKeywords: string[];
  confusionWords: string[];
  promptSuggestions: string[];
  sources: KnowledgeSourceLink[];
}

export interface BiasLibraryEntry {
  id: string;
  family: BiasFamily;
  title: LocalizedText;
  summary: LocalizedText;
  manipulationUse: LocalizedText;
  defenseMove: LocalizedText;
  tags: string[];
  sources: KnowledgeSourceLink[];
}

export interface CommunityResource {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  url: string;
  access: "free" | "community" | "official";
  scope: ModuleId | "shared";
  tags: string[];
}

export interface CognitiveResilienceProtocol {
  id: string;
  module: ModuleId;
  title: LocalizedText;
  summary: LocalizedText;
  action: LocalizedText;
  whyItWorks: LocalizedText;
  sources: KnowledgeSourceLink[];
}

function t(en: string, ar: string, arEG?: string): LocalizedText {
  return { en, ar, arEG: arEG || ar };
}

type Foundation = {
  category: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  action: LocalizedText;
  why: LocalizedText;
  tags: string[];
  coreKeywords: string[];
  expertKeywords: string[];
  hiddenTerms: string[];
  sources: KnowledgeSourceLink[];
  priority?: "egypt-critical" | "global-critical" | "high-need";
};

type Lens = {
  title: LocalizedText;
  summary: LocalizedText;
  action: LocalizedText;
  researchPhrase: string;
  threatKeyword: string;
  confusionWord: string;
};

const SHARED_LENSES: Lens[] = [
  {
    title: t("Urgency pressure", "ضغط الاستعجال", "ضغط الاستعجال"),
    summary: t("Treat speed as a risk signal, not a truth signal.", "تعامل مع السرعة كإشارة خطر لا كإشارة حقيقة.", "تعامل مع السرعة كإشارة خطر لا كإشارة حقيقة."),
    action: t("Slow the decision before you inspect the claim.", "أبطئ القرار قبل أن تفحص الادعاء.", "أبطئ القرار قبل أن تفحص الادعاء."),
    researchPhrase: "time pressure decision quality",
    threatKeyword: "urgency",
    confusionWord: "now-or-never",
  },
  {
    title: t("Source chain", "سلسلة المصدر", "سلسلة المصدر"),
    summary: t("Trace who said it first and who only repeated it.", "تتبع من قالها أولاً ومن كررها فقط.", "تتبع من قالها أولاً ومن كررها بس."),
    action: t("Separate the origin from the forwarding chain.", "افصل الأصل عن سلسلة إعادة التوجيه.", "افصل الأصل عن سلسلة إعادة التوجيه."),
    researchPhrase: "source provenance chain",
    threatKeyword: "laundered source",
    confusionWord: "people are saying",
  },
  {
    title: t("Context integrity", "سلامة السياق", "سلامة السياق"),
    summary: t("Check what was cut, cropped, or translated away.", "افحص ما تم حذفه أو قصه أو إضاعته بالترجمة.", "افحص ما تم حذفه أو قصه أو إضاعته بالترجمة."),
    action: t("Ask what context is missing before judging.", "اسأل ما السياق المفقود قبل الحكم.", "اسأل ما السياق المفقود قبل الحكم."),
    researchPhrase: "context collapse misinformation",
    threatKeyword: "out-of-context",
    confusionWord: "clip proves everything",
  },
  {
    title: t("Authority test", "اختبار السلطة", "اختبار السلطة"),
    summary: t("Ask whether status is being used instead of evidence.", "اسأل هل يتم استخدام المكانة بدلاً من الدليل.", "اسأل يتم استخدام المكانة بدلاً من الدليل."),
    action: t("Demand method and evidence, not title alone.", "اطلب المنهج والدليل لا اللقب فقط.", "اطلب المنهج والدليل لا اللقب بس."),
    researchPhrase: "authority heuristic misinformation",
    threatKeyword: "borrowed authority",
    confusionWord: "trusted face",
  },
  {
    title: t("Emotion regulation", "تنظيم الانفعال", "تنظيم الانفعال"),
    summary: t("Notice whether fear, anger, shame, or relief is driving attention.", "لاحظ هل يقود الانتباه خوف أو غضب أو عار أو ارتياح.", "لاحظ يقود الانتباه خوف أو غضب أو عار أو ارتياح."),
    action: t("Name the emotion before you accept the message.", "سم الشعور قبل أن تقبل الرسالة.", "سم الشعور قبل أن تقبل الرسالة."),
    researchPhrase: "emotion and misinformation",
    threatKeyword: "emotional hijack",
    confusionWord: "it feels true",
  },
  {
    title: t("Evidence class", "فئة الدليل", "فئة الدليل"),
    summary: t("Sort the claim into official, scholarly, eyewitness, or anonymous evidence.", "صنف الادعاء إلى دليل رسمي أو علمي أو شاهد عيان أو مجهول.", "صنف الادعاء إلى دليل رسمي أو علمي أو شاهد عيان أو مجهول."),
    action: t("Compare across evidence classes before deciding.", "قارن بين فئات الدليل قبل القرار.", "قارن بين فئات الدليل قبل القرار."),
    researchPhrase: "evidence hierarchy literacy",
    threatKeyword: "single-source tunnel",
    confusionWord: "one proof is enough",
  },
  {
    title: t("Bias friction", "احتكاك الانحياز", "احتكاك الانحياز"),
    summary: t("Interrupt confirmation bias with one disconfirming check.", "اقطع انحياز التأكيد بفحص واحد معاكس.", "اقطع انحياز التأكيد بفحص واحد معاكس."),
    action: t("Look for what would disprove your current belief.", "ابحث عما يمكن أن يفند اعتقادك الحالي.", "ابحث عما يمكن أن يفند اعتقادك الحالي."),
    researchPhrase: "confirmation bias intervention",
    threatKeyword: "belief lock",
    confusionWord: "I already know",
  },
  {
    title: t("Translation discipline", "انضباط الترجمة", "انضباط الترجمة"),
    summary: t("Arabic and English searches can reveal different evidence trails.", "البحث بالعربية والإنجليزية قد يكشف مسارات أدلة مختلفة.", "البحث بالعربية والإنجليزية قد يكشف مسارات أدلة مختلفة."),
    action: t("Search the exact Arabic wording and a precise English equivalent.", "ابحث عن الصياغة العربية الدقيقة ومقابل إنجليزي دقيق.", "ابحث عن الصياغة العربية الدقيقة ومقابل إنجليزي دقيق."),
    researchPhrase: "cross-language verification",
    threatKeyword: "translation drift",
    confusionWord: "same meaning everywhere",
  },
  {
    title: t("Risk routing", "توجيه المخاطر", "توجيه المخاطر"),
    summary: t("When risk is high, move toward official routes faster.", "عندما يكون الخطر مرتفعاً تحرك أسرع نحو المسارات الرسمية.", "لما يكون الخطر مرتفعاً تحرك أسرع نحو المسارات الرسمية."),
    action: t("Decide whether this needs documentation, moderation, or referral.", "قرر هل تحتاج الحالة إلى توثيق أو اعتدال أو إحالة.", "قرر تحتاج الحالة إلى توثيق أو اعتدال أو إحالة."),
    researchPhrase: "risk communication routing",
    threatKeyword: "delay harm",
    confusionWord: "wait and see",
  },
  {
    title: t("Maintenance habit", "عادة الصيانة", "عادة الصيانة"),
    summary: t("Cognitive resilience depends on repeatable habits, not one-time insight.", "المرونة المعرفية تعتمد على عادات قابلة للتكرار لا على وعي لحظي فقط.", "المرونة المعرفية تعتمد على عادات قابلة للتكرار لا على وعي لحظي بس."),
    action: t("Turn the defense move into a repeatable daily habit.", "حوّل حركة الدفاع إلى عادة يومية قابلة للتكرار.", "حوّل حركة الدفاع إلى عادة يومية قابلة للتكرار."),
    researchPhrase: "cognitive resilience training",
    threatKeyword: "awareness decay",
    confusionWord: "I learned this once",
  },
];

const DEEPREAL_FOUNDATIONS: Foundation[] = [
  {
    category: t("Claim triage", "فرز الادعاءات", "فرز الادعاءات"),
    title: t("Claim triage", "فرز الادعاء", "فرز الادعاء"),
    summary: t("Reduce the message to a single checkable claim.", "اختزل الرسالة إلى ادعاء واحد قابل للفحص.", "اختزل الرسالة إلى ادعاء واحد قابل للفحص."),
    action: t("Write who did what, where, and when.", "اكتب من فعل ماذا وأين ومتى.", "اكتب من فعل إيه وفين وإمتى."),
    why: t("Smaller claims are harder to manipulate and easier to test.", "الادعاءات الأصغر أصعب في التلاعب وأسهل في الاختبار.", "الادعاءات الأصغر أصعب في التلاعب وأسفي الاختبار."),
    tags: ["triage", "verification", "logic"],
    coreKeywords: ["claim", "checkable", "scope"],
    expertKeywords: ["claim decomposition", "falsifiability", "lateral reading"],
    hiddenTerms: ["compression", "scope creep"],
    sources: [
      { label: t("Digital Inquiry Group", "مجموعة الاستقصاء الرقمي", "مجموعة الاستقصاء الرقمي"), url: "https://www.digitalinquirygroup.org/" },
      { label: t("News Literacy Project", "مشروع محو أمية الأخبار", "مشروع محو أمية الأخبار"), url: "https://newslit.org/" },
    ],
    priority: "global-critical",
  },
  {
    category: t("Source verification", "التحقق من المصدر", "التحقق من المصدر"),
    title: t("Original-source verification", "التحقق من المصدر الأصلي", "التحقق من المصدر الأصلي"),
    summary: t("Distinguish original publication from copied screenshots and reposts.", "ميّز بين النشر الأصلي وبين الصور المعاد تداولها وإعادة النشر.", "ميّز بين النشر الأصلي وبين الصور المعاد تداولها وإعادة النشر."),
    action: t("Find the first accountable publication.", "اعثر على أول نشر خاضع للمساءلة.", "اعثر على أول نشر خاضع للمساءلة."),
    why: t("The original source defines what can actually be defended.", "المصدر الأصلي يحدد ما يمكن الدفاع عنه فعلاً.", "المصدر الأصلي يحدد ما يمكن الدفاع عنه فعلاً."),
    tags: ["source", "trace", "verification"],
    coreKeywords: ["origin", "source", "trace"],
    expertKeywords: ["provenance", "publication chain", "primary source"],
    hiddenTerms: ["relay account", "source laundering"],
    sources: [
      { label: t("InVID WeVerify", "InVID WeVerify", "InVID WeVerify"), url: "https://www.invid-project.eu/tools-and-services/" },
      { label: t("OpenAlex", "OpenAlex", "OpenAlex"), url: "https://openalex.org/" },
    ],
    priority: "global-critical",
  },
  {
    category: t("Media context", "سياق الوسائط", "سياق الوسائط"),
    title: t("Video and image context", "سياق الفيديو والصورة", "سياق الفيديو والصورة"),
    summary: t("Check whether clips or images were cut to force one interpretation.", "افحص هل تم قص المقاطع أو الصور لفرض تفسير واحد.", "افحص تم قص المقاطع أو الصور لفرض تفسير واحد."),
    action: t("Look for the full clip, full image, and upload date.", "ابحث عن المقطع الكامل والصورة الكاملة وتاريخ الرفع.", "ابحث عن المقطع الكامل والصورة الكاملة وتاريخ الرفع."),
    why: t("Context failure is one of the fastest paths to false certainty.", "فشل السياق من أسرع الطرق إلى اليقين الزائف.", "فشل السياق من أسرع الطرق إلى اليقين الزائف."),
    tags: ["video", "image", "context"],
    coreKeywords: ["clip", "context", "crop"],
    expertKeywords: ["context collapse", "selective editing", "frame extraction"],
    hiddenTerms: ["missing lead-in", "missing aftermath"],
    sources: [
      { label: t("InVID WeVerify", "InVID WeVerify", "InVID WeVerify"), url: "https://www.invid-project.eu/tools-and-services/" },
      { label: t("News Literacy Project", "مشروع محو أمية الأخبار", "مشروع محو أمية الأخبار"), url: "https://newslit.org/" },
    ],
    priority: "global-critical",
  },
  {
    category: t("Deepfake defense", "الدفاع ضد التزييف العميق", "الدفاع ضد التزييف العميق"),
    title: t("Deepfake first-pass defense", "الدفاع الأولي ضد التزييف العميق", "الدفاع الأولي ضد التزييف العميق"),
    summary: t("Treat realism as an attack surface, not as proof.", "تعامل مع الواقعية كمساحة هجوم لا كدليل.", "تعامل مع الواقعية كمساحة هجوم لا كدليل."),
    action: t("Check lips, timing, cuts, metadata, and provenance together.", "افحص الشفاه والتوقيت والقص والبيانات الوصفية وسلسلة المصدر معاً.", "افحص الشفاه والتوقيت والقص والبيانات الوصفية وسلسلة المصدر معاً."),
    why: t("High realism increases confidence faster than it increases truth.", "الواقعية العالية ترفع الثقة أسرع مما ترفع الحقيقة.", "الواقعية العالية ترفع الثقة أسرع مما ترفع الحقيقة."),
    tags: ["deepfake", "video", "forensics"],
    coreKeywords: ["deepfake", "sync", "provenance"],
    expertKeywords: ["synthetic media", "artifact review", "media forensics"],
    hiddenTerms: ["confidence trap", "artifact blindness"],
    sources: [
      { label: t("InVID WeVerify", "InVID WeVerify", "InVID WeVerify"), url: "https://www.invid-project.eu/tools-and-services/" },
      { label: t("Cambridge Bad News", "كامبريدج Bad News", "كامبريدج Bad News"), url: "https://www.cam.ac.uk/research/news/fake-news-vaccine-works-pre-bunk-game-reduces-susceptibility-to-disinformation" },
    ],
    priority: "global-critical",
  },
  {
    category: t("Logical defense", "الدفاع المنطقي", "الدفاع المنطقي"),
    title: t("Fallacy resistance", "مقاومة المغالطات", "مقاومة المغالطات"),
    summary: t("Catch when a narrative replaces evidence with faulty reasoning.", "التقط اللحظة التي يستبدل فيها السرد الدليل باستدلال فاسد.", "التقط اللحظة اللي يستبدل فيها السرد الدليل باستدلال فاسد."),
    action: t("Name the fallacy before arguing the conclusion.", "سمّ المغالطة قبل مناقشة النتيجة.", "سمّ المغالطة قبل مناقشة النتيجة."),
    why: t("Fallacies often make a weak claim feel complete.", "المغالطات تجعل الادعاء الضعيف يبدو مكتملاً.", "المغالطات تجعل الادعاء الضعيف يبدو مكتملاً."),
    tags: ["fallacy", "logic", "argument"],
    coreKeywords: ["fallacy", "argument", "proof"],
    expertKeywords: ["false dilemma", "appeal to fear", "causal error"],
    hiddenTerms: ["logic shortcut", "argument inflation"],
    sources: [
      { label: t("Digital Inquiry Group", "مجموعة الاستقصاء الرقمي", "مجموعة الاستقصاء الرقمي"), url: "https://www.digitalinquirygroup.org/" },
      { label: t("MIST", "اختبار MIST", "اختبار MIST"), url: "https://www.cam.ac.uk/stories/misinformation-susceptibility-test" },
    ],
  },
  {
    category: t("Bias resistance", "مقاومة الانحياز", "مقاومة الانحياز"),
    title: t("Bias interruption", "قطع الانحياز", "قطع الانحياز"),
    summary: t("Build friction against confirmation, halo, and familiarity bias.", "ابنِ احتكاكاً ضد انحياز التأكيد والهالة والألفة.", "ابنِ احتكاكاً ضد انحياز التأكيد والهالة والألفة."),
    action: t("Search for one serious contradiction before you settle.", "ابحث عن تناقض جاد واحد قبل أن تستقر على رأي.", "ابحث عن تناقض جاد واحد قبل أن تستقر على رأي."),
    why: t("Biases usually feel natural exactly when they are distorting judgment.", "الانحيازات تبدو طبيعية غالباً عندما تكون تشوه الحكم.", "الانحيازات تبدو طبيعية غالباً لما تكون تشوه الحكم."),
    tags: ["bias", "cognition", "skepticism"],
    coreKeywords: ["bias", "belief", "friction"],
    expertKeywords: ["confirmation bias", "familiarity effect", "halo effect"],
    hiddenTerms: ["belief comfort", "identity pull"],
    sources: [
      { label: t("News Literacy Project", "مشروع محو أمية الأخبار", "مشروع محو أمية الأخبار"), url: "https://newslit.org/" },
      { label: t("Cambridge MIST", "كامبريدج MIST", "كامبريدج MIST"), url: "https://www.cam.ac.uk/stories/misinformation-susceptibility-test" },
    ],
  },
  {
    category: t("Egypt routing", "التوجيه المصري", "التوجيه المصري"),
    title: t("Egypt-specific verification routing", "التوجيه المصري للتحقق", "التوجيه المصري للتحقق"),
    summary: t("Use Egyptian official anchors before treating local claims as unresolved noise.", "استخدم المراسي الرسمية المصرية قبل التعامل مع الادعاءات المحلية كضوضاء غير محسومة.", "استخدم المراسي الرسمية المصرية قبل التعامل مع الادعاءات المحلية كضوضاء غير محسومة."),
    action: t("Check the Egyptian issuing body, then compare with a global free source.", "افحص الجهة المصرية المصدرة ثم قارن بمصدر عالمي مجاني.", "افحص الجهة المصرية المصدرة ثم قارن بمصدر عالمي مجاني."),
    why: t("Local rumors exploit trust in familiar tone, logos, and institutions.", "الشائعات المحلية تستغل الثقة في النبرة والألوان والشعارات المألوفة.", "الشائعات المحلية تستغل الثقة في النبرة والألوان والشعارات المألوفة."),
    tags: ["egypt", "routing", "local"],
    coreKeywords: ["Egypt", "official", "institution"],
    expertKeywords: ["local verification", "state communication", "regional context"],
    hiddenTerms: ["familiar branding", "local authority drift"],
    sources: [
      { label: t("Egypt MoHP", "وزارة الصحة المصرية", "وزارة الصحة المصرية"), url: "https://www.mohp.gov.eg/" },
      { label: t("WHO Egypt", "منظمة الصحة العالمية - مصر", "منظمة الصحة العالمية - مصر"), url: "https://www.emro.who.int/countries/egy/index.html" },
    ],
    priority: "egypt-critical",
  },
  {
    category: t("Search discipline", "انضباط البحث", "انضباط البحث"),
    title: t("Bilingual search discipline", "انضباط البحث الثنائي", "انضباط البحث الثنائي"),
    summary: t("Search the exact Arabic wording and its strongest English translation.", "ابحث عن الصياغة العربية الدقيقة وترجمتها الإنجليزية الأقوى.", "ابحث عن الصياغة العربية الدقيقة وترجمتها الإنجليزية الأقوى."),
    action: t("Compare what appears only in Arabic with what survives in English.", "قارن ما يظهر فقط بالعربية مع ما يصمد بالإنجليزية.", "قارن ما يظهر بس بالعربية مع ما يصمد بالإنجليزية."),
    why: t("Translation gaps often hide free evidence or reveal the manipulation style.", "فجوات الترجمة غالباً تخفي أدلة مجانية أو تكشف أسلوب التلاعب.", "فجوات الترجمة غالباً تخفي أدلة مجانية أو تكشف أسلوب التلاعب."),
    tags: ["search", "arabic", "english"],
    coreKeywords: ["Arabic", "translation", "search"],
    expertKeywords: ["cross-language retrieval", "query reformulation", "multilingual verification"],
    hiddenTerms: ["translation drift", "keyword mismatch"],
    sources: [
      { label: t("OpenAlex", "OpenAlex", "OpenAlex"), url: "https://openalex.org/" },
      { label: t("Europe PMC", "Europe PMC", "Europe PMC"), url: "https://europepmc.org/" },
    ],
    priority: "egypt-critical",
  },
  {
    category: t("Evidence comparison", "مقارنة الأدلة", "مقارنة الأدلة"),
    title: t("Evidence comparison board", "لوحة مقارنة الأدلة", "لوحة مقارنة الأدلة"),
    summary: t("Put official, scholarly, and fact-check evidence side by side.", "ضع الأدلة الرسمية والعلمية وأدلة التحقق جنباً إلى جنب.", "ضع الأدلة الرسمية والعلمية وأدلة التحقق جنباً إلى جنب."),
    action: t("Log where the sources agree, diverge, or stay silent.", "سجل مواضع الاتفاق والاختلاف والصمت بين المصادر.", "سجل مواضع الاتفاق والاختلاف والصمت بين المصادر."),
    why: t("Comparison prevents one source class from dominating the whole decision.", "المقارنة تمنع فئة مصدر واحدة من السيطرة على القرار كله.", "المقارنة تمنع فئة مصدر واحدة من السيطرة على القرار كله."),
    tags: ["comparison", "evidence", "triangulation"],
    coreKeywords: ["compare", "evidence", "agreement"],
    expertKeywords: ["triangulation", "evidence synthesis", "source-class comparison"],
    hiddenTerms: ["silent disagreement", "evidence asymmetry"],
    sources: [
      { label: t("IFCN", "IFCN", "IFCN"), url: "https://ifcncodeofprinciples.poynter.org/" },
      { label: t("OpenAlex", "OpenAlex", "OpenAlex"), url: "https://openalex.org/" },
    ],
  },
  {
    category: t("Decision logging", "تسجيل القرار", "تسجيل القرار"),
    title: t("Decision logging", "تسجيل القرار", "تسجيل القرار"),
    summary: t("Document why you trusted, rejected, or held a claim.", "وثّق لماذا وثقت أو رفضت أو علقت الادعاء.", "وثّق لإيه وثقت أو رفضت أو علقت الادعاء."),
    action: t("Write one sentence for evidence, one for uncertainty, and one for next action.", "اكتب جملة للدليل وجملة لعدم اليقين وجملة للخطوة التالية.", "اكتب جملة للدليل وجملة لعدم اليقين وجملة للخطوة التالية."),
    why: t("Logging reduces hindsight bias and improves future judgment.", "التسجيل يقلل انحياز الإدراك المتأخر ويحسن الحكم مستقبلاً.", "التسجيل يقلل انحياز الإدراك المتأخر ويحسن الحكم مستقبلاً."),
    tags: ["decision", "documentation", "audit"],
    coreKeywords: ["decision", "log", "audit"],
    expertKeywords: ["decision hygiene", "audit trail", "metacognition"],
    hiddenTerms: ["memory rewrite", "post-hoc certainty"],
    sources: [
      { label: t("Digital Inquiry Group", "مجموعة الاستقصاء الرقمي", "مجموعة الاستقصاء الرقمي"), url: "https://www.digitalinquirygroup.org/" },
      { label: t("News Literacy Project", "مشروع محو أمية الأخبار", "مشروع محو أمية الأخبار"), url: "https://newslit.org/" },
    ],
  },
];

const MENTAL_HEALTH_FOUNDATIONS: Foundation[] = [
  {
    category: t("Distress triage", "فرز الضيق", "فرز الضيق"),
    title: t("Distress triage", "فرز الضيق", "فرز الضيق"),
    summary: t("Separate immediate danger from lower-risk distress before reading more.", "افصل الخطر الفوري عن الضيق الأقل خطراً قبل قراءة المزيد.", "افصل الخطر الفوري عن الضيق الأقل خطراً قبل قراءة المزيد."),
    action: t("Score danger, function loss, and isolation first.", "قيّم الخطر وتعطل الوظيفة والعزلة أولاً.", "قيّم الخطر وتعطل الوظيفة والعزلة أولاً."),
    why: t("Safety routing beats vague reassurance.", "توجيه السلامة يتفوق على الطمأنة الغامضة.", "توجيه السلامة يتفوق على الطمأنة الغامضة."),
    tags: ["triage", "safety", "support"],
    coreKeywords: ["distress", "risk", "triage"],
    expertKeywords: ["safety planning", "functional impairment", "risk stratification"],
    hiddenTerms: ["delay risk", "false reassurance"],
    sources: [
      { label: t("WHO Mental Health", "منظمة الصحة العالمية: الصحة النفسية", "منظمة الصحة العالمية: الصحة النفسية"), url: "https://www.who.int/health-topics/mental-health" },
      { label: t("Egypt MoHP Platform", "منصة وزارة الصحة المصرية", "منصة وزارة الصحة المصرية"), url: "https://mentalhealth.mohp.gov.eg/" },
    ],
    priority: "high-need",
  },
  {
    category: t("Symptom literacy", "فهم الأعراض", "فهم الأعراض"),
    title: t("Symptom-not-label discipline", "انضباط العرض لا الملصق", "انضباط العرض لا الملصق"),
    summary: t("Describe the symptom pattern before reaching for diagnosis labels.", "صف نمط الأعراض قبل الوصول إلى الملصقات التشخيصية.", "صف نمط الأعراض قبل الوصول إلى الملصقات التشخيصية."),
    action: t("Name the symptom, duration, trigger, and function effect.", "سم العرض والمدة والمحفز وأثره الوظيفي.", "سم العرض والمدة والمحفز وأثره الوظيفي."),
    why: t("Symptoms are safer starting points than identity-heavy labels.", "الأعراض نقاط بداية أكثر أماناً من الملصقات الثقيلة بالهوية.", "الأعراض نقاط بداية أكثر أماناً من الملصقات الثقيلة بالهوية."),
    tags: ["symptoms", "labels", "literacy"],
    coreKeywords: ["symptom", "duration", "function"],
    expertKeywords: ["symptom cluster", "functional impact", "clinical caution"],
    hiddenTerms: ["label trap", "identity capture"],
    sources: [
      { label: t("WHO Mental Disorders", "منظمة الصحة العالمية: الاضطرابات النفسية", "منظمة الصحة العالمية: الاضطرابات النفسية"), url: "https://www.who.int/en/news-room/fact-sheets/detail/mental-disorders" },
      { label: t("UNICEF Egypt", "يونيسف مصر", "يونيسف مصر"), url: "https://www.unicef.org/egypt/" },
    ],
  },
  {
    category: t("Body-first awareness", "الوعي الجسدي أولاً", "الوعي الجسدي أولاً"),
    title: t("Body-first awareness", "الوعي الجسدي أولاً", "الوعي الجسدي أولاً"),
    summary: t("Start with sleep, breath, appetite, energy, and tension.", "ابدأ بالنوم والتنفس والشهية والطاقة والتوتر.", "ابدأ بالنوم والتنفس والشهية والطاقة والتوتر."),
    action: t("Log one body cue before reading social content.", "سجل إشارة جسدية واحدة قبل قراءة المحتوى الاجتماعي.", "سجل إشارة جسدية واحدة قبل قراءة المحتوى الاجتماعي."),
    why: t("The body often signals overload before the mind tells a coherent story.", "الجسد غالباً يعلن الحمل الزائد قبل أن يصوغ العقل قصة متماسكة.", "الجسد غالباً يعمش هـالحمل الزائد قبل أن يصوغ العقل قصة متماسكة."),
    tags: ["body", "awareness", "stabilization"],
    coreKeywords: ["sleep", "breath", "tension"],
    expertKeywords: ["somatic cue", "physiological arousal", "self-monitoring"],
    hiddenTerms: ["body neglect", "stress masking"],
    sources: [
      { label: t("WHO Mental Health", "منظمة الصحة العالمية: الصحة النفسية", "منظمة الصحة العالمية: الصحة النفسية"), url: "https://www.who.int/health-topics/mental-health" },
      { label: t("Egypt MoHP Platform", "منصة وزارة الصحة المصرية", "منصة وزارة الصحة المصرية"), url: "https://mentalhealth.mohp.gov.eg/" },
    ],
  },
  {
    category: t("Support routing", "توجيه الدعم", "توجيه الدعم"),
    title: t("Support routing", "توجيه الدعم", "توجيه الدعم"),
    summary: t("Decide whether the safest next move is self-care, a trusted person, or formal care.", "قرر هل الخطوة التالية الأكثر أماناً هي رعاية ذاتية أو شخص موثوق أو رعاية رسمية.", "قرر الخطوة التالية الأكثر أماناً هي رعاية ذاتية أو شخص موثوق أو رعاية رسمية."),
    action: t("Choose one route and one backup route now.", "اختر مساراً واحداً ومساراً احتياطياً الآن.", "اختر مساراً واحداً ومساراً احتياطياً دلوقتي."),
    why: t("Support becomes usable when it is specific and visible.", "يصبح الدعم قابلاً للاستخدام عندما يكون محدداً ومرئياً.", "يصبح الدعم قابلاً للاستخدام لما يكون محدداً ومرئياً."),
    tags: ["support", "routing", "safety"],
    coreKeywords: ["support", "route", "backup"],
    expertKeywords: ["care routing", "trusted contact", "formal support"],
    hiddenTerms: ["support fog", "route paralysis"],
    sources: [
      { label: t("Egypt MoHP Platform", "منصة وزارة الصحة المصرية", "منصة وزارة الصحة المصرية"), url: "https://mentalhealth.mohp.gov.eg/" },
      { label: t("WHO Suicide", "منظمة الصحة العالمية: الانتحار", "منظمة الصحة العالمية: الانتحار"), url: "https://www.who.int/news-room/fact-sheets/detail/suicide" },
    ],
    priority: "high-need",
  },
  {
    category: t("Stigma resistance", "مقاومة الوصمة", "مقاومة الوصمة"),
    title: t("Stigma resistance", "مقاومة الوصمة", "مقاومة الوصمة"),
    summary: t("Catch shame language before it blocks help-seeking.", "التقط لغة العار قبل أن تعطل طلب المساعدة.", "التقط لغة العار قبل أن تعطل طلب المساعدة."),
    action: t("Rewrite one harmful phrase into one safe phrase.", "أعد كتابة عبارة ضارة إلى عبارة آمنة.", "أعد كتابة عبارة ضارة إلى عبارة آمنة."),
    why: t("Language changes whether people seek help or hide.", "اللغة تغير ما إذا كان الناس يطلبون المساعدة أم يختبئون.", "اللغة تغير ما إذا كان الناس يطلبون المساعدة أم يختبئون."),
    tags: ["stigma", "language", "help-seeking"],
    coreKeywords: ["shame", "stigma", "help"],
    expertKeywords: ["stigma interruption", "help-seeking", "language reframing"],
    hiddenTerms: ["moral blame", "silence pressure"],
    sources: [
      { label: t("WHO Depression", "منظمة الصحة العالمية: الاكتئاب", "منظمة الصحة العالمية: الاكتئاب"), url: "https://www.who.int/en/news-room/fact-sheets/detail/depression" },
      { label: t("UNICEF Egypt", "يونيسف مصر", "يونيسف مصر"), url: "https://www.unicef.org/egypt/" },
    ],
  },
  {
    category: t("Youth pressure", "ضغط الشباب", "ضغط الشباب"),
    title: t("Youth and student overload", "الضغط على الشباب والطلاب", "الضغط على الشباب والطلاب"),
    summary: t("Treat study pressure and youth overload as real support contexts, not as weakness.", "تعامل مع ضغط الدراسة وإرهاق الشباب كسياقات دعم حقيقية لا كضعف.", "تعامل مع ضغط الدراسة وإرهاق الشباب كسياقات دعم حقيقية لا كضعف."),
    action: t("Log one academic pressure, one family pressure, and one function loss.", "سجل ضغطاً دراسياً واحداً وضغطاً أسرياً واحداً وتعطلاً وظيفياً واحداً.", "سجل ضغطاً دراسياً واحداً وضغطاً أسرياً واحداً وتعطلاً وظيفياً واحداً."),
    why: t("Young users often normalize dangerous overload until function collapses.", "المستخدمون الأصغر سناً يطبعون الحمل الخطر حتى تنهار الوظيفة.", "المستخدمون الأصغر سناً يطبعون الحمل الخطر حتى تنهار الوظيفة."),
    tags: ["youth", "students", "overload"],
    coreKeywords: ["student", "pressure", "function"],
    expertKeywords: ["academic stress", "youth mental health", "support planning"],
    hiddenTerms: ["normalization", "exam panic"],
    sources: [
      { label: t("UNICEF Egypt", "يونيسف مصر", "يونيسف مصر"), url: "https://www.unicef.org/egypt/" },
      { label: t("WHO Anxiety", "منظمة الصحة العالمية: القلق", "منظمة الصحة العالمية: القلق"), url: "https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders" },
    ],
    priority: "egypt-critical",
  },
  {
    category: t("Misinformation shield", "درع ضد التضليل", "درع ضد التضليل"),
    title: t("Mental-health misinformation shield", "درع ضد تضليل الصحة النفسية", "درع ضد تضليل الصحة النفسية"),
    summary: t("Separate education from diagnosis, miracle cures, and stigma content.", "افصل التثقيف عن التشخيص والعلاجات المعجزة ومحتوى الوصمة.", "افصل التثقيف عن التشخيص والعلاجات المعجزة ومحتوى الوصمة."),
    action: t("Ask whether the content teaches, diagnoses, shames, or sells.", "اسأل هل المحتوى يعلّم أم يشخص أم يعيب أم يبيع.", "اسأل المحتوى يعلّم أم يشخص أم يعيب أم يبيع."),
    why: t("Unsafe content often hides behind the look of education.", "المحتوى غير الآمن يختبئ غالباً خلف مظهر التعليم.", "المحتوى غير الآمن يختبئ غالباً خلف مظهر التعليم."),
    tags: ["misinformation", "diagnosis", "safety"],
    coreKeywords: ["education", "diagnosis", "selling"],
    expertKeywords: ["psychoeducation", "misleading claims", "safety cues"],
    hiddenTerms: ["miracle promise", "identity bait"],
    sources: [
      { label: t("WHO Mental Disorders", "منظمة الصحة العالمية: الاضطرابات النفسية", "منظمة الصحة العالمية: الاضطرابات النفسية"), url: "https://www.who.int/en/news-room/fact-sheets/detail/mental-disorders" },
      { label: t("News Literacy Project", "مشروع محو أمية الأخبار", "مشروع محو أمية الأخبار"), url: "https://newslit.org/" },
    ],
  },
  {
    category: t("Trusted expert checks", "فحوص الخبير الموثوق", "فحوص الخبير الموثوق"),
    title: t("Expert credibility checks", "فحوص مصداقية الخبير", "فحوص مصداقية الخبير"),
    summary: t("Do not stop at 'see an expert'; check role, scope, method, and accountability.", "لا تتوقف عند عبارة راجع خبير؛ افحص الدور والنطاق والمنهج والمساءلة.", "لا تتوقف عند عبارة راجع خبير؛ افحص الدور والنطاق والمنهج والمساءلة."),
    action: t("Ask what makes this expert qualified for this exact question.", "اسأل ما الذي يجعل هذا الخبير مؤهلاً لهذا السؤال تحديداً.", "اسأل ما اللي يجعل ده الخبير مؤهلاً لده السؤال تحديداً."),
    why: t("Users need a way to audit expertise, not just obey it.", "يحتاج المستخدمون إلى طريقة لمراجعة الخبرة لا مجرد طاعتها.", "يحتاج المستخدمون إلى طريقة لمراجعة الخبرة لا مجرد طاعتها."),
    tags: ["expert", "credibility", "audit"],
    coreKeywords: ["expert", "qualification", "scope"],
    expertKeywords: ["professional scope", "credential relevance", "evidence-based practice"],
    hiddenTerms: ["title drift", "scope inflation"],
    sources: [
      { label: t("WHO Mental Health", "منظمة الصحة العالمية: الصحة النفسية", "منظمة الصحة العالمية: الصحة النفسية"), url: "https://www.who.int/health-topics/mental-health" },
      { label: t("Egypt MoHP Platform", "منصة وزارة الصحة المصرية", "منصة وزارة الصحة المصرية"), url: "https://mentalhealth.mohp.gov.eg/" },
    ],
  },
  {
    category: t("Daily stabilizers", "مثبتات يومية", "مثبتات يومية"),
    title: t("Daily stabilizer routines", "روتينات التثبيت اليومية", "روتينات التثبيت اليومية"),
    summary: t("Build repeatable small actions that reduce overload before crisis peaks.", "ابنِ أفعالاً صغيرة متكررة تقلل الحمل قبل أن يبلغ الأزمة.", "ابنِ أفعالاً صغيرة متكررة تقلل الحمل قبل أن يبلغ الأزمة."),
    action: t("Choose one morning, one mid-day, and one evening stabilizer.", "اختر مثبّتاً صباحياً وآخر منتصف اليوم وثالثاً مساءً.", "اختر مثبّتاً صباحياً وآخر منتصف اليوم وثالثاً مساءً."),
    why: t("Daily repetition creates resilience faster than occasional insight.", "التكرار اليومي يصنع المرونة أسرع من الوعي العابر.", "التكرار اليومي يصنع المرونة أسرع من الوعي العابر."),
    tags: ["daily", "routine", "stabilizer"],
    coreKeywords: ["daily", "routine", "stabilizer"],
    expertKeywords: ["behavioral activation", "habit loop", "protective routine"],
    hiddenTerms: ["all-or-nothing routine", "collapse days"],
    sources: [
      { label: t("WHO Mental Health", "منظمة الصحة العالمية: الصحة النفسية", "منظمة الصحة العالمية: الصحة النفسية"), url: "https://www.who.int/health-topics/mental-health" },
      { label: t("UNICEF Egypt", "يونيسف مصر", "يونيسف مصر"), url: "https://www.unicef.org/egypt/" },
    ],
  },
  {
    category: t("Family communication", "التواصل الأسري", "التواصل الأسري"),
    title: t("Family-safe communication", "التواصل الآمن داخل الأسرة", "التواصل الآمن داخل الأسرة"),
    summary: t("Turn blame-heavy home language into support-routing language.", "حوّل لغة اللوم المنزلية إلى لغة توجيه نحو الدعم.", "حوّل لغة اللوم المنزلية إلى لغة توجيه نحو الدعم."),
    action: t("Replace accusation with observation, need, and route.", "استبدل الاتهام بالملاحظة والاحتياج والمسار.", "استبدل الاتهام بالملاحظة والاحتياج والمسار."),
    why: t("Family framing can either increase risk or lower it quickly.", "تأطير الأسرة قد يرفع الخطر أو يخفضه بسرعة.", "تأطير الأسرة قد يرفع الخطر أو يخفضه بسرعة."),
    tags: ["family", "communication", "support"],
    coreKeywords: ["family", "support", "language"],
    expertKeywords: ["supportive communication", "non-stigmatizing language", "family systems"],
    hiddenTerms: ["blame cycle", "dismissive comfort"],
    sources: [
      { label: t("UNICEF Egypt", "يونيسف مصر", "يونيسف مصر"), url: "https://www.unicef.org/egypt/" },
      { label: t("WHO Mental Health", "منظمة الصحة العالمية: الصحة النفسية", "منظمة الصحة العالمية: الصحة النفسية"), url: "https://www.who.int/health-topics/mental-health" },
    ],
    priority: "egypt-critical",
  },
];

const RELIGION_FOUNDATIONS: Foundation[] = [
  {
    category: t("Moderation checks", "فحوص الاعتدال", "فحوص الاعتدال"),
    title: t("Moderation checks", "فحوص الاعتدال", "فحوص الاعتدال"),
    summary: t("Test whether a message builds peace and boundaries or control and guilt.", "اختبر هل تبني الرسالة سلاماً وحدوداً أم سيطرة وذنباً.", "اختبر تبني الرسالة سلاماً وحدوداً أم سيطرة وذنباً."),
    action: t("Score peace, coercion, shame, and boundary respect.", "قيّم السلام والقسر والعار واحترام الحدود.", "قيّم السلام والقسر والعار واحترام الحدود."),
    why: t("Moderation becomes clearer when you rate message behavior, not just content.", "يصبح الاعتدال أوضح عندما تقيّم سلوك الرسالة لا محتواها فقط.", "يصبح الاعتدال أوضح لما تقيّم سلوك الرسالة لا محتواها بس."),
    tags: ["moderation", "peace", "boundaries"],
    coreKeywords: ["peace", "coercion", "boundaries"],
    expertKeywords: ["moderation", "boundary respect", "coercion check"],
    hiddenTerms: ["shame obedience", "control frame"],
    sources: [
      { label: t("Dar al-Ifta", "دار الإفتاء", "دار الإفتاء"), url: "https://www.dar-alifta.org/" },
      { label: t("Al-Azhar Observatory", "مرصد الأزهر", "مرصد الأزهر"), url: "https://observatory.azhar.eg/" },
    ],
    priority: "egypt-critical",
  },
  {
    category: t("Care boundaries", "حدود الرعاية", "حدود الرعاية"),
    title: t("Care-boundary discipline", "انضباط حدود الرعاية", "انضباط حدود الرعاية"),
    summary: t("Separate spiritual comfort from medical, legal, and mental-health authority.", "افصل بين المواساة الروحية وبين السلطة الطبية والقانونية والنفسية.", "افصل بين المواساة الروحية وبين السلطة الطبية والقانونية والنفسية."),
    action: t("Mark what comforts and what needs referral.", "حدد ما يطمئن وما يحتاج إحالة.", "حدد ما يطمئن وما يحتاج إحالة."),
    why: t("Many harmful messages become persuasive by blending care domains together.", "تنجح رسائل ضارة كثيرة لأنها تخلط مجالات الرعاية معاً.", "تنجح رسائل ضارة كثيرة عشانها تخلط مجالات الرعاية معاً."),
    tags: ["care", "boundaries", "referral"],
    coreKeywords: ["comfort", "care", "referral"],
    expertKeywords: ["scope discipline", "care handoff", "boundary management"],
    hiddenTerms: ["scope takeover", "care replacement"],
    sources: [
      { label: t("Dar al-Ifta", "دار الإفتاء", "دار الإفتاء"), url: "https://www.dar-alifta.org/" },
      { label: t("Egypt MoHP Platform", "منصة وزارة الصحة المصرية", "منصة وزارة الصحة المصرية"), url: "https://mentalhealth.mohp.gov.eg/" },
    ],
    priority: "egypt-critical",
  },
  {
    category: t("Guilt control", "السيطرة بالذنب", "السيطرة بالذنب"),
    title: t("Guilt-control detection", "كشف السيطرة بالذنب", "كشف السيطرة بالذنب"),
    summary: t("Distinguish conscience from coercive guilt loops.", "ميز بين الضمير وبين دوائر الذنب القهرية.", "ميز بين الضمير وبين دوائر الذنب القهرية."),
    action: t("Ask whether guilt is clarifying responsibility or trapping the person.", "اسأل هل يوضح الذنب المسؤولية أم يحبس الشخص.", "اسأل يوضح الذنب المسؤولية أم يحبس الشخص."),
    why: t("Weaponized guilt can look spiritual while acting psychologically unsafe.", "قد يبدو الذنب المسلح روحياً بينما يعمل نفسياً بشكل غير آمن.", "قد يبدو الذنب المسلح روحياً بينما يعمل نفسياً بشكل غير آمن."),
    tags: ["guilt", "coercion", "safety"],
    coreKeywords: ["guilt", "control", "pressure"],
    expertKeywords: ["scrupulosity", "coercive guilt", "shame escalation"],
    hiddenTerms: ["fear loop", "obedience trigger"],
    sources: [
      { label: t("Dar al-Ifta", "دار الإفتاء", "دار الإفتاء"), url: "https://www.dar-alifta.org/" },
      { label: t("WHO Mental Health", "منظمة الصحة العالمية: الصحة النفسية", "منظمة الصحة العالمية: الصحة النفسية"), url: "https://www.who.int/health-topics/mental-health" },
    ],
    priority: "high-need",
  },
  {
    category: t("Religious misinformation", "التضليل الديني", "التضليل الديني"),
    title: t("Religious misinformation checks", "فحوص التضليل الديني", "فحوص التضليل الديني"),
    summary: t("Check whether sacred language is being used to bypass verification.", "افحص هل تُستخدم اللغة المقدسة لتجاوز التحقق.", "افحص تُستخدم اللغة المقدسة لتجاوز التحقق."),
    action: t("Trace the quote, context, and accountable institution.", "تتبع النص والسياق والمؤسسة الخاضعة للمساءلة.", "تتبع النص والسياق والمؤسسة الخاضعة للمساءلة."),
    why: t("Sacred framing can mask weak evidence if users stop checking.", "التأطير المقدس قد يخفي دليلاً ضعيفاً إذا توقف المستخدم عن الفحص.", "التأطير المقدس قد يخفي دليلاً ضعيفاً إذا توقف المستخدم عن الفحص."),
    tags: ["verification", "religion", "misinformation"],
    coreKeywords: ["quote", "context", "institution"],
    expertKeywords: ["religious misinformation", "context verification", "source accountability"],
    hiddenTerms: ["scripture laundering", "context theft"],
    sources: [
      { label: t("Dar al-Ifta", "دار الإفتاء", "دار الإفتاء"), url: "https://www.dar-alifta.org/" },
      { label: t("Al-Azhar Observatory", "مرصد الأزهر", "مرصد الأزهر"), url: "https://observatory.azhar.eg/" },
    ],
  },
  {
    category: t("Sectarian resistance", "مقاومة الطائفية", "مقاومة الطائفية"),
    title: t("Sectarian pressure resistance", "مقاومة الضغط الطائفي", "مقاومة الضغط الطائفي"),
    summary: t("Catch identity-based hostility before it hardens into moral permission.", "التقط العداء القائم على الهوية قبل أن يتحول إلى إذن أخلاقي.", "التقط العداء القائم على الهوية قبل أن يتحول إلى إذن أخلاقي."),
    action: t("Freeze sharing and inspect the identity frame.", "جمّد المشاركة وافحص إطار الهوية.", "جمّد المشاركة وافحص إطار الهوية."),
    why: t("Sectarian content converts group threat into rapid behavioral escalation.", "المحتوى الطائفي يحول تهديد الجماعة إلى تصعيد سلوكي سريع.", "المحتوى الطائفي يحول تهديد الجماعة إلى تصعيد سلوكي سريع."),
    tags: ["sectarian", "identity", "moderation"],
    coreKeywords: ["sectarian", "identity", "hostility"],
    expertKeywords: ["identity escalation", "group threat", "sectarian framing"],
    hiddenTerms: ["moral permission", "ingroup capture"],
    sources: [
      { label: t("Al-Azhar Observatory", "مرصد الأزهر", "مرصد الأزهر"), url: "https://observatory.azhar.eg/" },
      { label: t("Dar al-Ifta", "دار الإفتاء", "دار الإفتاء"), url: "https://www.dar-alifta.org/" },
    ],
    priority: "egypt-critical",
  },
  {
    category: t("Expert checks", "فحوص الخبرة", "فحوص الخبرة"),
    title: t("Qualified-guidance checks", "فحوص التوجيه المؤهل", "فحوص التوجيه المؤهل"),
    summary: t("Do not stop at 'a sheikh said' or 'a doctor said'; inspect role and scope.", "لا تتوقف عند عبارة قال شيخ أو قال طبيب؛ افحص الدور والنطاق.", "لا تتوقف عند عبارة قال شيخ أو قال طبيب؛ افحص الدور والنطاق."),
    action: t("Ask why this person is qualified for this exact issue.", "اسأل لماذا هذا الشخص مؤهل لهذه المسألة تحديداً.", "اسأل لإيه ده الشخص مؤلدي المسألة تحديداً."),
    why: t("Authority mismatch is one of the easiest ways to sell bad guidance.", "عدم تطابق السلطة من أسهل طرق تمرير التوجيه السيئ.", "عدم تطابق السلطة من أسطرق تمرير التوجيه السيئ."),
    tags: ["expert", "authority", "scope"],
    coreKeywords: ["authority", "qualification", "scope"],
    expertKeywords: ["authority mismatch", "scope relevance", "credential audit"],
    hiddenTerms: ["title laundering", "scope jump"],
    sources: [
      { label: t("Dar al-Ifta", "دار الإفتاء", "دار الإفتاء"), url: "https://www.dar-alifta.org/" },
      { label: t("Al-Azhar Observatory", "مرصد الأزهر", "مرصد الأزهر"), url: "https://observatory.azhar.eg/" },
    ],
  },
  {
    category: t("Peace practices", "ممارسات السلام", "ممارسات السلام"),
    title: t("Peace-centered practice", "الممارسة المتمحورة حول السلام", "الممارسة المتمحورة حول السلام"),
    summary: t("Build habits that increase calm, patience, and clarity without erasing danger signals.", "ابنِ عادات تزيد الهدوء والصبر والوضوح دون محو إشارات الخطر.", "ابنِ عادات تزيد الهدوء والصبر والوضوح دون محو إشارات الخطر."),
    action: t("Choose one grounding act and one verification act together.", "اختر فعلاً للتهدئة وفعلاً للتحقق معاً.", "اختر فعلاً للتهدئة وفعلاً للتحقق معاً."),
    why: t("Calm without boundaries can become passivity; boundaries without calm become aggression.", "الهدوء بلا حدود قد يصير سلبية، والحدود بلا هدوء قد تصير عدواناً.", "الهدوء بلا حدود قد يصير سلبية، والحدود بلا هدوء قد تصير عدواناً."),
    tags: ["peace", "practice", "balance"],
    coreKeywords: ["peace", "patience", "clarity"],
    expertKeywords: ["grounding", "calm discipline", "reflective pause"],
    hiddenTerms: ["false calm", "passive avoidance"],
    sources: [
      { label: t("Dar al-Ifta", "دار الإفتاء", "دار الإفتاء"), url: "https://www.dar-alifta.org/" },
      { label: t("WHO Mental Health", "منظمة الصحة العالمية: الصحة النفسية", "منظمة الصحة العالمية: الصحة النفسية"), url: "https://www.who.int/health-topics/mental-health" },
    ],
  },
  {
    category: t("Text context", "سياق النص", "سياق النص"),
    title: t("Text-and-context discipline", "انضباط النص والسياق", "انضباط النص والسياق"),
    summary: t("Do not let an isolated text fragment carry more meaning than its context allows.", "لا تدع مقطعاً نصياً معزولاً يحمل معنى أكبر مما يسمح به سياقه.", "لا تدع مقطعاً نصياً معزولاً يحمل معنى أكبر مما يسمح به سياقه."),
    action: t("Ask what comes before, after, and around the cited text.", "اسأل ماذا يأتي قبل النص وبعده وحوله.", "اسأل إيه يأتي قبل النص وبعده وحوله."),
    why: t("Context theft is a common route for coercive certainty.", "سرقة السياق طريق شائع إلى اليقين القسري.", "سرقة السياق طريق شائع إلى اليقين القسري."),
    tags: ["text", "context", "verification"],
    coreKeywords: ["text", "context", "citation"],
    expertKeywords: ["context integrity", "citation discipline", "selective quotation"],
    hiddenTerms: ["quotation trap", "decontextualization"],
    sources: [
      { label: t("Dar al-Ifta", "دار الإفتاء", "دار الإفتاء"), url: "https://www.dar-alifta.org/" },
      { label: t("Al-Azhar Observatory", "مرصد الأزهر", "مرصد الأزهر"), url: "https://observatory.azhar.eg/" },
    ],
  },
  {
    category: t("Egypt community tension", "توتر المجتمع في مصر", "توتر المجتمع في مصر"),
    title: t("Egypt-specific community tension checks", "فحوص التوتر المجتمعي المصري", "فحوص التوتر المجتمعي المصري"),
    summary: t("Treat local incidents as high-context cases requiring local moderation routes.", "تعامل مع الحوادث المحلية كحالات عالية السياق تتطلب مسارات اعتدال محلية.", "تعامل مع الحوادث المحلية كحالات عالية السياق تتطلب مسارات اعتدال محلية."),
    action: t("Check the local incident source before accepting a group-level story.", "افحص مصدر الحادث المحلي قبل قبول قصة على مستوى الجماعة.", "افحص مصدر الحادث المحلي قبل قبول قصة على مستوى الجماعة."),
    why: t("Local tension is easily inflated into sectarian certainty.", "التوتر المحلي يُضخّم بسهولة إلى يقين طائفي.", "التوتر المحلي يُضخّم بسهولة إلى يقين طائفي."),
    tags: ["egypt", "community", "local"],
    coreKeywords: ["local incident", "community", "moderation"],
    expertKeywords: ["local context", "community moderation", "incident verification"],
    hiddenTerms: ["incident inflation", "group blame"],
    sources: [
      { label: t("Al-Azhar Observatory", "مرصد الأزهر", "مرصد الأزهر"), url: "https://observatory.azhar.eg/" },
      { label: t("Dar al-Ifta", "دار الإفتاء", "دار الإفتاء"), url: "https://www.dar-alifta.org/" },
    ],
    priority: "egypt-critical",
  },
  {
    category: t("Handoff awareness", "وعي الإحالة", "وعي الإحالة"),
    title: t("Mental-health handoff awareness", "وعي الإحالة إلى الصحة النفسية", "وعي الإحالة إلى الصحة النفسية"),
    summary: t("Know when a religious message crosses into a mental-health referral case.", "اعرف متى تتحول الرسالة الدينية إلى حالة إحالة للصحة النفسية.", "اعرف إمتى تتحول الرسالة الدينية إلى حالة إحالة للصحة النفسية."),
    action: t("Check whether distress, compulsion, or danger now exceeds reflection mode.", "افحص هل الضيق أو القهر أو الخطر يتجاوز الآن وضع التأمل.", "افحص الضيق أو القهر أو الخطر يتجاوز دلوقتي وضع التأمل."),
    why: t("Healthy religious support stays compatible with care rather than blocking it.", "الدعم الديني الصحي يبقى متوافقاً مع الرعاية بدلاً من حجبها.", "الدعم الديني الصحي يبقى متوافقاً مع الرعاية بدلاً من حجبها."),
    tags: ["handoff", "mental-health", "care"],
    coreKeywords: ["handoff", "care", "distress"],
    expertKeywords: ["support handoff", "scrupulosity", "care boundary"],
    hiddenTerms: ["blocked care", "coercive reassurance"],
    sources: [
      { label: t("Dar al-Ifta", "دار الإفتاء", "دار الإفتاء"), url: "https://www.dar-alifta.org/" },
      { label: t("Egypt MoHP Platform", "منصة وزارة الصحة المصرية", "منصة وزارة الصحة المصرية"), url: "https://mentalhealth.mohp.gov.eg/" },
    ],
    priority: "high-need",
  },
];

function buildKeyHunterBasics(module: ModuleId, prefix: string, foundations: Foundation[]) {
  return foundations.flatMap((foundation, foundationIndex) =>
    SHARED_LENSES.map((lens, lensIndex) => ({
      id: `${prefix}-khv2-${foundationIndex + 1}-${lensIndex + 1}`,
      module,
      category: foundation.category,
      title: t(`${foundation.title.en}: ${lens.title.en}`, `${foundation.title.ar}: ${lens.title.ar}`, `${foundation.title.ar}: ${lens.title.ar}`),
      summary: t(`${foundation.summary.en} — ${lens.title.en}: ${lens.summary.en}`, `${foundation.summary.ar} — ${lens.title.ar}: ${lens.summary.ar}`, `${foundation.summary.ar} — ${lens.title.ar}: ${lens.summary.ar}`),
      action: t(`${foundation.action.en} Then: ${lens.action.en}`, `${foundation.action.ar} ثم: ${lens.action.ar}`, `${foundation.action.ar} ثم: ${lens.action.ar}`),
      whyItMatters: t(`${foundation.why.en}`, `${foundation.why.ar}`, `${foundation.why.ar}`),
      tags: [...foundation.tags, lens.threatKeyword, `lens-${lensIndex + 1}`],
      priority: foundation.priority,
      coreKeywords: [...foundation.coreKeywords.slice(0, 2), lens.threatKeyword, `basic-${foundationIndex + 1}`],
      expertKeywords: [...foundation.expertKeywords.slice(0, 2), lens.researchPhrase, `${module} cognition`],
      hiddenTerms: [...foundation.hiddenTerms.slice(0, 2), lens.confusionWord],
      researchPhrases: [lens.researchPhrase, `${foundation.title.en.toLowerCase()} evidence`, `${module} real-time cognition`],
      threatKeywords: [lens.threatKeyword, `${module} manipulation`, "cognitive pressure"],
      confusionWords: [lens.confusionWord, "confidence without trace", "shared but unverified"],
      promptSuggestions: [
        `Audit this ${module} claim through ${foundation.title.en.toLowerCase()} with a ${lens.title.en.toLowerCase()} lens.`,
        `List the missing evidence, strongest counter-check, and safest next action for this ${foundation.title.en.toLowerCase()} case.`,
      ],
      sources: foundation.sources,
    }))
  );
}

type BiasPattern = {
  label: string;
  labelAr: string;
  summary: string;
  summaryAr: string;
};

type BiasFrame = {
  label: string;
  labelAr: string;
  manipulation: string;
  manipulationAr: string;
  defense: string;
  defenseAr: string;
};

const DEEPFAKE_FALLACY_PATTERNS: BiasPattern[] = [
  { label: "False dilemma", labelAr: "ثنائية زائفة", summary: "Frames only two choices after synthetic media appears.", summaryAr: "تؤطر خيارين فقط بعد ظهور وسائط صناعية." },
  { label: "Appeal to fear", labelAr: "الاحتكام إلى الخوف", summary: "Uses fear to replace verification.", summaryAr: "يستخدم الخوف لاستبدال التحقق." },
  { label: "False cause", labelAr: "سببية زائفة", summary: "Treats sequence as proof of causation.", summaryAr: "يتعامل مع التسلسل كأنه إثبات للسببية." },
  { label: "Hasty generalization", labelAr: "تعميم متسرع", summary: "Turns one clip into a broad conclusion.", summaryAr: "يحوّل مقطعاً واحداً إلى نتيجة عامة." },
  { label: "Appeal to authority", labelAr: "الاحتكام إلى السلطة", summary: "Borrows status instead of evidence.", summaryAr: "يستعير المكانة بدلاً من الدليل." },
  { label: "Straw man", labelAr: "رجل القش", summary: "Simplifies a target so the fake clip can defeat it.", summaryAr: "يبسط الهدف حتى يهزمه المقطع المزيف." },
  { label: "Cherry-picking", labelAr: "انتقاء منحاز", summary: "Shows the one artifact or frame that favors the narrative.", summaryAr: "يعرض الأثر أو الإطار الواحد الذي يخدم السرد." },
  { label: "Circular proof", labelAr: "استدلال دائري", summary: "Uses the clip as proof that the clip is real.", summaryAr: "يستخدم المقطع دليلاً على أن المقطع حقيقي." },
  { label: "Loaded language", labelAr: "لغة مشحونة", summary: "Loads the viewer with certainty before review.", summaryAr: "يشحن المشاهد باليقين قبل المراجعة." },
  { label: "Moral panic", labelAr: "هلع أخلاقي", summary: "Pushes social danger framing to block analysis.", summaryAr: "يدفع بإطار الخطر الاجتماعي لمنع التحليل." },
];

const DEEPFAKE_BIAS_PATTERNS: BiasPattern[] = [
  { label: "Confirmation bias", labelAr: "انحياز التأكيد", summary: "Accepts synthetic media because it fits prior belief.", summaryAr: "يقبل الوسائط الصناعية لأنها توافق الاعتقاد السابق." },
  { label: "Halo effect", labelAr: "تأثير الهالة", summary: "A trusted face makes the media feel real.", summaryAr: "الوجه الموثوق يجعل الوسائط تبدو حقيقية." },
  { label: "Familiarity effect", labelAr: "تأثير الألفة", summary: "Repeated clips start to feel true.", summaryAr: "المقاطع المتكررة تبدأ في الشعور بالحقيقة." },
  { label: "Authority bias", labelAr: "انحياز السلطة", summary: "Professional tone overrides forensic caution.", summaryAr: "النبرة المهنية تتغلب على الحذر الجنائي." },
  { label: "Availability bias", labelAr: "انحياز التوفر", summary: "Recent scandals make new clips feel plausible.", summaryAr: "الفضائح الحديثة تجعل المقاطع الجديدة تبدو معقولة." },
  { label: "Outrage bias", labelAr: "انحياز الغضب", summary: "Anger sharpens forwarding and weakens checking.", summaryAr: "الغضب يقوي إعادة النشر ويضعف الفحص." },
  { label: "Negativity bias", labelAr: "انحياز السلبية", summary: "Bad-looking outcomes dominate careful review.", summaryAr: "النتائج السيئة الظاهرية تهيمن على المراجعة الدقيقة." },
  { label: "Ingroup bias", labelAr: "انحياز الجماعة", summary: "Media that protects your side receives less scrutiny.", summaryAr: "الوسائط التي تحمي جانبك تتلقى تدقيقاً أقل." },
  { label: "Truth-by-repetition", labelAr: "الحقيقة بالتكرار", summary: "Repetition substitutes for proof.", summaryAr: "يحل التكرار محل الإثبات." },
  { label: "Confidence bias", labelAr: "انحياز الثقة", summary: "High confidence is mistaken for high evidence.", summaryAr: "تُخطأ الثقة العالية على أنها دليل عالٍ." },
];

const RELIGIOUS_BIAS_PATTERNS: BiasPattern[] = [
  { label: "Scripture laundering", labelAr: "غسل السلطة بالنص", summary: "A text fragment is used to seal a weak argument.", summaryAr: "يُستخدم مقطع نصي لإغلاق حجة ضعيفة." },
  { label: "Doctor-scripture fusion", labelAr: "دمج الطبيب بالنص", summary: "A clinician uses scripture to over-claim outside scope.", summaryAr: "يستخدم الطبيب النص لادعاء زائد خارج النطاق." },
  { label: "Shame obedience", labelAr: "طاعة العار", summary: "The message uses guilt to demand compliance.", summaryAr: "تستخدم الرسالة الذنب لفرض الامتثال." },
  { label: "Sectarian certainty", labelAr: "يقين طائفي", summary: "Group hostility is dressed as moral clarity.", summaryAr: "يُلبس العداء الجماعي لباس الوضوح الأخلاقي." },
  { label: "Sacred authority mismatch", labelAr: "عدم تطابق السلطة المقدسة", summary: "Religious tone is used outside qualified guidance.", summaryAr: "تستخدم النبرة الدينية خارج التوجيه المؤهل." },
  { label: "Context theft", labelAr: "سرقة السياق", summary: "A citation is stripped from its interpretive context.", summaryAr: "يُنتزع الاستشهاد من سياقه التفسيري." },
  { label: "Care replacement bias", labelAr: "انحياز استبدال الرعاية", summary: "Spiritual reassurance is made to replace care.", summaryAr: "تُجعل الطمأنة الروحية بديلاً عن الرعاية." },
  { label: "Ingroup virtue bias", labelAr: "انحياز فضيلة الجماعة", summary: "One group is assumed righteous without checking.", summaryAr: "تُفترض صلاحية جماعة دون فحص." },
  { label: "Fear-of-doubt bias", labelAr: "انحياز الخوف من الشك", summary: "Questions are framed as disloyalty rather than inquiry.", summaryAr: "تُؤطر الأسئلة كخيانة لا كاستفسار." },
  { label: "Certainty theater", labelAr: "مسرح اليقين", summary: "Performance confidence hides weak evidence.", summaryAr: "يخفي الأداء الواثق دليلاً ضعيفاً." },
];

const DEEPFAKE_FRAMES: BiasFrame[] = [
  { label: "viral clip", labelAr: "مقطع فيروسي", manipulation: "Pushes the clip as self-evident proof.", manipulationAr: "يدفع المقطع باعتباره دليلاً ذاتياً.", defense: "Demand provenance, full context, and one independent forensic clue.", defenseAr: "اطلب سلسلة المصدر والسياق الكامل وقرينة جنائية مستقلة واحدة." },
  { label: "voice clone", labelAr: "استنساخ صوت", manipulation: "Uses familiar voice texture to bypass doubt.", manipulationAr: "يستخدم نسيج الصوت المألوف لتجاوز الشك.", defense: "Check source origin, phrase timing, and parallel reporting.", defenseAr: "افحص أصل المصدر وتوقيت العبارة والتغطية الموازية." },
  { label: "cropped interview", labelAr: "مقابلة مقتطعة", manipulation: "Removes lead-in and aftermath to trap interpretation.", manipulationAr: "يحذف ما قبل وما بعد لإيقاع التفسير.", defense: "Find the full interview and compare the omitted sections.", defenseAr: "اعثر على المقابلة الكاملة وقارن الأجزاء المحذوفة." },
  { label: "edited livestream", labelAr: "بث مباشر معدل", manipulation: "Claims live status to borrow authenticity.", manipulationAr: "يدعي صفة البث المباشر ليقترض الأصالة.", defense: "Verify the original platform record and upload timeline.", defenseAr: "تحقق من سجل المنصة الأصلي وخط الزمن للنشر." },
  { label: "screen-recorded post", labelAr: "منشور مصور من الشاشة", manipulation: "Uses degraded quality to hide artifacts.", manipulationAr: "يستخدم رداءة الجودة لإخفاء الآثار.", defense: "Reject the screen recording until the original post is traced.", defenseAr: "ارفض تصوير الشاشة حتى يتم تتبع المنشور الأصلي." },
  { label: "AI image mashup", labelAr: "صورة ذكاء اصطناعي مركبة", manipulation: "Combines visual cues that feel plausible at first glance.", manipulationAr: "يمزج إشارات بصرية تبدو معقولة للوهلة الأولى.", defense: "Inspect anatomical, lighting, and contextual inconsistencies.", defenseAr: "افحص التناقضات التشريحية والضوئية والسياقية." },
  { label: "translated subtitle clip", labelAr: "مقطع بترجمة فرعية", manipulation: "Makes the subtitle carry the deception rather than the audio.", manipulationAr: "يجعل الترجمة تحمل الخداع لا الصوت نفسه.", defense: "Check the original language track and multiple translations.", defenseAr: "افحص المسار اللغوي الأصلي وترجمات متعددة." },
  { label: "outrage meme", labelAr: "ميم غضب", manipulation: "Packages a deepfake cue inside a shareable joke.", manipulationAr: "يعبئ إشارة التزييف داخل نكتة قابلة للنشر.", defense: "Separate the joke from the factual claim and verify both.", defenseAr: "افصل النكتة عن الادعاء الواقعي وتحقق من الاثنين." },
  { label: "insider leak story", labelAr: "قصة تسريب داخلي", manipulation: "Uses secret-access framing to cancel normal checks.", manipulationAr: "يستخدم إطار الوصول السري لإلغاء الفحوص العادية.", defense: "Treat unnamed insider access as a higher-risk state.", defenseAr: "تعامل مع الوصول الداخلي غير المسمى كحالة أعلى خطراً." },
  { label: "crisis alert post", labelAr: "منشور إنذار أزمة", manipulation: "Collapses time so the viewer forwards before thinking.", manipulationAr: "يضغط الوقت حتى يعيد المشاهد النشر قبل التفكير.", defense: "Pause, log the exact claim, and open one official route first.", defenseAr: "توقف وسجل الادعاء الدقيق وافتح مساراً رسمياً واحداً أولاً." },
];

const RELIGIOUS_FRAMES: BiasFrame[] = [
  { label: "doctor uses scripture", labelAr: "طبيب يستخدم النص", manipulation: "Borrows medical trust and sacred framing together.", manipulationAr: "يستعير الثقة الطبية والتأطير المقدس معاً.", defense: "Separate clinical scope from spiritual scope before accepting the claim.", defenseAr: "افصل النطاق السريري عن النطاق الروحي قبل قبول الادعاء." },
  { label: "viral sermon clip", labelAr: "مقطع وعظي فيروسي", manipulation: "Uses emotional delivery to outpace moderation checks.", manipulationAr: "يستخدم الأداء العاطفي لتجاوز فحوص الاعتدال.", defense: "Check institution, context, and care boundaries together.", defenseAr: "افحص المؤسسة والسياق وحدود الرعاية معاً." },
  { label: "family guilt advice", labelAr: "نصيحة عائلية قائمة على الذنب", manipulation: "Turns obedience into the price of belonging.", manipulationAr: "تحول الطاعة إلى ثمن للانتماء.", defense: "Ask whether the message clarifies responsibility or traps identity.", defenseAr: "اسأل هل توضح الرسالة المسؤولية أم تحبس الهوية." },
  { label: "sectarian post", labelAr: "منشور طائفي", manipulation: "Frames hostility as religious duty.", manipulationAr: "يؤطر العداء كواجب ديني.", defense: "Freeze sharing and move to official moderation routing.", defenseAr: "جمّد المشاركة وانتقل إلى مسار اعتدال رسمي." },
  { label: "healing promise", labelAr: "وعد بالشفاء", manipulation: "Replaces care with total certainty.", manipulationAr: "يستبدل الرعاية بيقين كامل.", defense: "Keep care handoff visible and check the claim against formal support routes.", defenseAr: "أبقِ إحالة الرعاية مرئية وافحص الادعاء بمقابل مسارات الدعم الرسمية." },
  { label: "quote card", labelAr: "بطاقة اقتباس", manipulation: "Uses a polished quote card to seal debate.", manipulationAr: "يستخدم بطاقة اقتباس مصقولة لإغلاق النقاش.", defense: "Trace the original wording and the context around it.", defenseAr: "تتبع الصياغة الأصلية والسياق المحيط بها." },
  { label: "anonymous fatwa thread", labelAr: "سلسلة فتوى مجهولة", manipulation: "Presents unsourced rulings as settled truth.", manipulationAr: "يقدم أحكاماً بلا مصدر كحقائق مستقرة.", defense: "Reject anonymous rulings until an accountable institution appears.", defenseAr: "ارفض الأحكام المجهولة حتى تظهر مؤسسة خاضعة للمساءلة." },
  { label: "shame testimony", labelAr: "شهادة قائمة على العار", manipulation: "Uses personal guilt narratives to pressure the audience.", manipulationAr: "يستخدم سرديات الذنب الشخصي للضغط على الجمهور.", defense: "Separate testimony from guidance and then audit both.", defenseAr: "افصل الشهادة عن التوجيه ثم راجع الاثنين." },
  { label: "authority pile-on", labelAr: "تكديس السلطات", manipulation: "Stacks titles to avoid evidence review.", manipulationAr: "يراكم الألقاب لتجنب مراجعة الدليل.", defense: "Ask what each authority contributes and what remains unproven.", defenseAr: "اسأل ماذا يضيف كل صاحب سلطة وما الذي يبقى بلا إثبات." },
  { label: "calm-sounding coercion", labelAr: "قسر يبدو هادئاً", manipulation: "Soft tone hides hard control.", manipulationAr: "النبرة الناعمة تخفي سيطرة صلبة.", defense: "Rate the message by behavior, not tone alone.", defenseAr: "قيّم الرسالة بالسلوك لا بالنبرة وحدها." },
];

function buildBiasEntries(family: BiasFamily, patterns: BiasPattern[], frames: BiasFrame[], sources: KnowledgeSourceLink[]) {
  return patterns.flatMap((pattern, patternIndex) =>
    frames.map((frame, frameIndex) => ({
      id: `${family}-${patternIndex + 1}-${frameIndex + 1}`,
      family,
      title: t(`${pattern.label} in ${frame.label}`, `${pattern.labelAr} في ${frame.labelAr}`, `${pattern.labelAr} في ${frame.labelAr}`),
      summary: t(`${pattern.summary} Context: ${frame.label}.`, `${pattern.summaryAr} السياق: ${frame.labelAr}.`, `${pattern.summaryAr} السياق: ${frame.labelAr}.`),
      manipulationUse: t(`${frame.manipulation}`, `${frame.manipulationAr}`, `${frame.manipulationAr}`),
      defenseMove: t(`${frame.defense} Name the ${pattern.label.toLowerCase()} pattern first.`, `${frame.defenseAr} سمّ نمط ${pattern.labelAr} أولاً.`, `${frame.defenseAr} سمّ نمط ${pattern.labelAr} أولاً.`),
      tags: [family, frame.label, pattern.label.toLowerCase().replace(/\s+/g, "-")],
      sources,
    }))
  );
}

function buildResilienceProtocols(module: ModuleId, prefix: string, baseTitle: string, baseTitleAr: string, sources: KnowledgeSourceLink[]) {
  const frames = [
    { id: "pressure", title: t("Pressure pause", "توقف الضغط", "توقف الضغط"), summary: t(`Slow the first reaction inside ${baseTitle}.`, `أبطئ أول استجابة داخل ${baseTitleAr}.`, `أبطئ أول استجابة داخل ${baseTitleAr}.`), action: t("Take 30 seconds, write the trigger, then choose the safest route.", "خذ 30 ثانية واكتب المحفز ثم اختر المسار الأكثر أماناً.", "خذ 30 ثانية واكتب المحفز ثم اختر المسار الأكثر أماناً."), why: t("Pausing lowers automatic capture and increases reflective control.", "التوقف يقلل الالتقاط التلقائي ويزيد التحكم التأملي.", "التوقف يقلل الالتقاط التلقائي ويزيد التحكم التأملي.") },
    { id: "label", title: t("Label the state", "سم الحالة", "سم الحالة"), summary: t(`Name what kind of pressure ${baseTitle} is creating.`, `سم نوع الضغط الذي يصنعه ${baseTitleAr}.`, `سم نوع الضغط اللي يصنعه ${baseTitleAr}.`), action: t("Choose one label: urgency, shame, confusion, overload, or coercion.", "اختر تسمية واحدة: استعجال أو عار أو ارتباك أو حمل زائد أو قسر.", "اختر تسمية واحدة: استعجال أو عار أو ارتباك أو حمل زائد أو قسر."), why: t("Naming the state weakens its automatic influence.", "تسمية الحالة تضعف تأثيرها التلقائي.", "تسمية الحالة تضعف تأثيرها التلقائي.") },
    { id: "source", title: t("Open a free source", "افتح مصدراً مجانياً", "افتح مصدراً مجانياً"), summary: t("Do not stop at closed or paid sources when a free route exists.", "لا تتوقف عند المصادر المغلقة أو المدفوعة عندما يوجد مسار مجاني.", "لا تتوقف عند المصادر المغلقة أو المدفوعة لما يوجد مسار مجاني."), action: t("Open one official route and one open research route.", "افتح مساراً رسمياً واحداً ومساراً بحثياً مفتوحاً واحداً.", "افتح مساراً رسمياً واحداً ومساراً بحثياً مفتوحاً واحداً."), why: t("Free routes keep verification usable in real life.", "المسارات المجانية تجعل التحقق قابلاً للاستخدام في الحياة الواقعية.", "المسارات المجانية تجعل التحقق قابلاً للاستخدام في الحياة الواقعية.") },
    { id: "counter", title: t("Counter-check", "فحص معاكس", "فحص معاكس"), summary: t("Look for what would challenge your first reading.", "ابحث عما يتحدى قراءتك الأولى.", "ابحث عما يتحدى قراءتك الأولى."), action: t("Search for one strong contradiction before deciding.", "ابحث عن تناقض قوي واحد قبل القرار.", "ابحث عن تناقض قوي واحد قبل القرار."), why: t("Contradiction protects against confirmation bias.", "التناقض يحمي من انحياز التأكيد.", "التناقض يحمي من انحياز التأكيد.") },
    { id: "route", title: t("Route by risk", "وجّه حسب الخطر", "وجّه حسب الخطر"), summary: t("Move from browsing to routing when the case affects safety or care.", "انتقل من التصفح إلى التوجيه عندما تمس الحالة السلامة أو الرعاية.", "انتقل من التصفح إلى التوجيه لما تمس الحالة السلامة أو الرعاية."), action: t("Decide whether the next move is verify, moderate, document, or refer.", "قرر هل الخطوة التالية هي التحقق أو الاعتدال أو التوثيق أو الإحالة.", "قرر الخطوة التالية هي التحقق أو الاعتدال أو التوثيق أو الإحالة."), why: t("Routing converts insight into action.", "التوجيه يحول الفهم إلى فعل.", "التوجيه يحول الفهم إلى فعل.") },
    { id: "translation", title: t("Dual-language pass", "فحص ثنائي اللغة", "فحص ثنائي اللغة"), summary: t(`Recheck the ${baseTitle} issue in Arabic and English before you settle.`, `أعد فحص مسألة ${baseTitleAr} بالعربية والإنجليزية قبل أن تستقر على نتيجة.`, `أعد فحص مسألة ${baseTitleAr} بالعربية والإنجليزية قبل أن تستقر على نتيجة.`), action: t("Search the exact Arabic phrase and one disciplined English equivalent.", "ابحث عن العبارة العربية الدقيقة ومقابل إنجليزي منضبط واحد.", "ابحث عن العبارة العربية الدقيقة ومقابل إنجليزي منضبط واحد."), why: t("Cross-language checking exposes hidden context and weak translations.", "الفحص عبر اللغتين يكشف السياق المخفي والترجمات الضعيفة.", "الفحص عبر اللغتين يكشف السياق المخفي والترجمات الضعيفة.") },
    { id: "body", title: t("Body reset", "إعادة ضبط الجسد", "إعادة ضبط الجسد"), summary: t(`Reduce physiological overload so ${baseTitle} decisions stay sharp.`, `قلل الحمل الجسدي حتى تبقى قرارات ${baseTitleAr} حادة.`, `قلل الحمل الجسدي حتى تبقى قرارات ${baseTitleAr} حادة.`), action: t("Do one slow-breath cycle, release your shoulders, then restart the route.", "قم بدورة تنفس بطيئة واحدة وأرخ كتفيك ثم أعد تشغيل المسار.", "قم بدورة تنفس بطيئة واحدة وأرخ كتفيك ثم أعد تشغيل المسار."), why: t("A calmer body lowers urgency capture and improves cognitive control.", "الجسد الأهدأ يقلل أسر الاستعجال ويحسن التحكم المعرفي.", "الجسد الأهدأ يقلل أسر الاستعجال ويحسن التحكم المعرفي.") },
    { id: "ladder", title: t("Evidence ladder", "سلم الأدلة", "سماالأدلة"), summary: t(`Rank what ${baseTitle} evidence deserves more weight right now.`, `رتب ما يستحق وزناً أكبر من أدلة ${baseTitleAr} الآن.`, `رتب ما يستحق وزناً أكبر من أدلة ${baseTitleAr} دلوقتي.`), action: t("Score official, open research, eyewitness, and anonymous material separately.", "قيّم المواد الرسمية والبحث المفتوح وشهادة العيان والمادة المجهولة بشكل منفصل.", "قيّم المواد الرسمية والبحث المفتوح وشهادة العيان والمادة المجهولة بشكل منفصل."), why: t("Evidence ladders stop one vivid item from dominating the whole conclusion.", "سلم الأدلة يمنع مادة واحدة لافتة من السيطرة على الاستنتاج كله.", "سماالأدلة يمنع مادة واحدة لافتة من السيطرة على الاستنتاج كله.") },
    { id: "social", title: t("Social friction", "احتكاك اجتماعي", "احتكاك اجتماعي"), summary: t(`Interrupt peer pressure before ${baseTitle} turns into forwarding or obedience.`, `اقطع ضغط المجموعة قبل أن يتحول ${baseTitleAr} إلى إعادة نشر أو طاعة.`, `اقطع ضغط المجموعة قبل أن يتحول ${baseTitleAr} إلى إعادة نشر أو طاعة.`), action: t("Write one sentence you can say that buys time without escalating the room.", "اكتب جملة واحدة تمنحك وقتاً من دون تصعيد الموقف.", "اكتب جملة واحدة تمنحك وقتاً من دون تصعيد الموقف."), why: t("Prepared friction protects the user when family, group, or authority pressure is high.", "الاحتكاك المجهز يحمي المستخدم عندما يكون ضغط العائلة أو المجموعة أو السلطة مرتفعاً.", "الاحتكاك المجهز يحمي المستخدم لما يكون ضغط العائلة أو المجموعة أو السلطة مرتفعاً.") },
    { id: "habit", title: t("Micro-habit lock", "تثبيت العادة المصغرة", "تثبيت العادة المصغرة"), summary: t(`Turn the best ${baseTitle} defense into a repeatable habit.`, `حوّل أفضل دفاع في ${baseTitleAr} إلى عادة قابلة للتكرار.`, `حوّل أفضل دفاع في ${baseTitleAr} إلى عادة قابلة للتكرار.`), action: t("Choose one 20-second habit to repeat daily.", "اختر عادة واحدة من 20 ثانية لتكررها يومياً.", "اختر عادة واحدة من 20 ثانية لتكررها يومياً."), why: t("Resilience grows through repetition more than intensity.", "المرونة تنمو بالتكرار أكثر من الشدة.", "المرونة تنمو بالتكرار أكثر من الشدة.") },
    { id: "community", title: t("Community anchor", "مرساة المجتمع", "مرساة المجتمع"), summary: t("Use a free trusted community instead of isolated guessing.", "استخدم مجتمعاً موثوقاً مجانياً بدلاً من التخمين المعزول.", "استخدم مجتمعاً موثوقاً مجانياً بدلاً من التخمين المعزول."), action: t("Open one community or institutional page and compare guidance.", "افتح صفحة مجتمع أو مؤسسة واحدة وقارن التوجيه.", "افتح صفحة مجتمع أو مؤسسة واحدة وقارن التوجيه."), why: t("Community anchors reduce isolation and improve calibration.", "المراسي المجتمعية تقلل العزلة وتحسن المعايرة.", "المراسي المجتمعية تقلل العزلة وتحسن المعايرة.") },
    { id: "audit", title: t("Decision audit", "مراجعة القرار", "مراجعة القرار"), summary: t(`Document why your ${baseTitle} conclusion is defendable.`, `وثق لماذا يمكن الدفاع عن استنتاجك في ${baseTitleAr}.`, `وثق لإيه يمكن الدفاع عن استنتاجك في ${baseTitleAr}.`), action: t("Write the reason, uncertainty, and next step in one minute.", "اكتب السبب وعدم اليقين والخطوة التالية في دقيقة واحدة.", "اكتب السبب وعدم اليقين والخطوة التالية في دقيقة واحدة."), why: t("Auditing preserves learning and reduces hindsight distortion.", "المراجعة تحفظ التعلم وتقلل تشويه الإدراك المتأخر.", "المراجعة تحفظ التعماوتقلل تشويه الإدراك المتأخر.") },
  ];

  return frames.map((frame, index) => ({
    id: `${prefix}-rtc-${index + 1}`,
    module,
    title: frame.title,
    summary: frame.summary,
    action: frame.action,
    whyItWorks: frame.why,
    sources,
  }));
}

export const KEYHUNTER_V2 = [
  ...buildKeyHunterBasics("deepreal", "dr", DEEPREAL_FOUNDATIONS),
  ...buildKeyHunterBasics("mental-health", "mh", MENTAL_HEALTH_FOUNDATIONS),
  ...buildKeyHunterBasics("religion-hub", "rh", RELIGION_FOUNDATIONS),
];

export const BIAS_LIBRARY = [
  ...buildBiasEntries("deepfake-fallacy", DEEPFAKE_FALLACY_PATTERNS, DEEPFAKE_FRAMES, [
    { label: t("InVID WeVerify", "InVID WeVerify", "InVID WeVerify"), url: "https://www.invid-project.eu/tools-and-services/" },
    { label: t("Cambridge Bad News", "كامبريدج Bad News", "كامبريدج Bad News"), url: "https://www.cam.ac.uk/research/news/fake-news-vaccine-works-pre-bunk-game-reduces-susceptibility-to-disinformation" },
  ]),
  ...buildBiasEntries("deepfake-bias", DEEPFAKE_BIAS_PATTERNS, DEEPFAKE_FRAMES, [
    { label: t("Cambridge MIST", "كامبريدج MIST", "كامبريدج MIST"), url: "https://www.cam.ac.uk/stories/misinformation-susceptibility-test" },
    { label: t("News Literacy Project", "مشروع محو أمية الأخبار", "مشروع محو أمية الأخبار"), url: "https://newslit.org/" },
  ]),
  ...buildBiasEntries("religious-bias", RELIGIOUS_BIAS_PATTERNS, RELIGIOUS_FRAMES, [
    { label: t("Dar al-Ifta", "دار الإفتاء", "دار الإفتاء"), url: "https://www.dar-alifta.org/" },
    { label: t("Al-Azhar Observatory", "مرصد الأزهر", "مرصد الأزهر"), url: "https://observatory.azhar.eg/" },
  ]),
];

export const COGNITIVE_COMMUNITIES: CommunityResource[] = [
  { id: "community-openalex", title: t("OpenAlex", "OpenAlex", "OpenAlex"), summary: t("Free scholarly discovery across journals, authors, and concepts.", "اكتشاف علمي مجاني عبر الدوريات والباحثين والمفاهيم.", "اكتشاف علمي مجاني عبر الدوريات والباحثين والمفاهيم."), url: "https://openalex.org/", access: "free", scope: "shared", tags: ["research", "open", "papers"] },
  { id: "community-semantic-scholar", title: t("Semantic Scholar", "Semantic Scholar", "Semantic Scholar"), summary: t("Free paper discovery with summaries and open-access hints.", "اكتشاف مجاني للأوراق مع ملخصات وإشارات للوصول المفتوح.", "اكتشاف مجاني للأوراق مع ملخصات وإشارات للوصول المفتوح."), url: "https://www.semanticscholar.org/", access: "free", scope: "shared", tags: ["research", "open", "papers"] },
  { id: "community-europepmc", title: t("Europe PMC", "Europe PMC", "Europe PMC"), summary: t("Free biomedical literature and full-text discovery.", "أدبيات طبّية حيوية مجانية واكتشاف للنص الكامل.", "أدبيات طبّية حيوية مجانية واكتشاف للنص الكامل."), url: "https://europepmc.org/", access: "free", scope: "shared", tags: ["biomedical", "free", "evidence"] },
  { id: "community-pubmed", title: t("PubMed", "PubMed", "PubMed"), summary: t("Free search over biomedical and health literature.", "بحث مجاني عبر الأدبيات الطبية والصحية.", "بحث مجاني عبر الأدبيات الطبية والصحية."), url: "https://pubmed.ncbi.nlm.nih.gov/", access: "free", scope: "shared", tags: ["biomedical", "search", "health"] },
  { id: "community-doaj", title: t("DOAJ", "دليل الدوريات المفتوحة", "دليل الدوريات المفتوحة"), summary: t("Directory of open-access journals.", "دليل للدوريات مفتوحة الوصول.", "دليل للدوريات مفتوحة الوصول."), url: "https://doaj.org/", access: "free", scope: "shared", tags: ["open-access", "journals"] },
  { id: "community-pmc", title: t("PubMed Central", "PubMed Central", "PubMed Central"), summary: t("Free full-text biomedical archive.", "أرشيف مجاني للنصوص الطبية الحيوية الكاملة.", "أرشيف مجاني للنصوص الطبية الحيوية الكاملة."), url: "https://pmc.ncbi.nlm.nih.gov/", access: "free", scope: "shared", tags: ["biomedical", "full-text", "archive"] },
  { id: "community-owid", title: t("Our World in Data", "عالمنا في بيانات", "عالمنا في بيانات"), summary: t("Free charts and public evidence explainers.", "رسوم وبيانات مجانية وشروح عامة قائمة على الأدلة.", "رسوم وبيانات مجانية وشروح عامة قائمة على الأدلة."), url: "https://ourworldindata.org/", access: "free", scope: "shared", tags: ["data", "charts", "public"] },
  { id: "community-cochrane", title: t("Cochrane Plain Language Summaries", "ملخصات كوكرين المبسطة", "ملخصات كوكرين المبسطة"), summary: t("Free evidence summaries for health questions.", "ملخصات أدلة مجانية للأسئلة الصحية.", "ملخصات أدلة مجانية للأسئلة الصحية."), url: "https://www.cochrane.org/news/plain-language-summaries", access: "free", scope: "shared", tags: ["health", "evidence", "summaries"] },
  { id: "community-dig", title: t("Digital Inquiry Group", "مجموعة الاستقصاء الرقمي", "مجموعة الاستقصاء الرقمي"), summary: t("Lateral reading and source-checking education.", "تعليم القراءة الجانبية وفحص المصادر.", "تعليم القراءة الجانبية وفحص المصادر."), url: "https://www.digitalinquirygroup.org/", access: "community", scope: "deepreal", tags: ["verification", "education"] },
  { id: "community-newslit", title: t("News Literacy Project", "مشروع محو أمية الأخبار", "مشروع محو أمية الأخبار"), summary: t("Free resources for misinformation resistance.", "موارد مجانية لمقاومة التضليل.", "موارد مجانية لمقاومة التضليل."), url: "https://newslit.org/", access: "community", scope: "deepreal", tags: ["misinformation", "education"] },
  { id: "community-badnews", title: t("Bad News / DROG", "Bad News / DROG", "Bad News / DROG"), summary: t("Prebunking game and inoculation-oriented public resources.", "لعبة تمهيد مضاد وموارد عامة موجهة للتحصين المعرفي.", "لعبة تمهيد مضاد وموارد عامة موجهة للتحصين المعرفي."), url: "https://www.getbadnews.com/", access: "community", scope: "deepreal", tags: ["prebunking", "game"] },
  { id: "community-mist", title: t("MIST", "اختبار MIST", "اختبار MIST"), summary: t("Misinformation susceptibility testing and educational framing.", "اختبار القابلية للتضليل وإطار تعليمي مرتبط به.", "اختبار القابلية للتضليل وإطار تعليمي مرتبط به."), url: "https://www.cam.ac.uk/stories/misinformation-susceptibility-test", access: "free", scope: "deepreal", tags: ["misinformation", "assessment"] },
  { id: "community-invid", title: t("InVID WeVerify", "InVID WeVerify", "InVID WeVerify"), summary: t("Free verification tools and media analysis guidance.", "أدوات تحقق مجانية وإرشاد لتحليل الوسائط.", "أدوات تحقق مجانية وإرشاد لتحليل الوسائط."), url: "https://www.invid-project.eu/tools-and-services/", access: "free", scope: "deepreal", tags: ["deepfake", "verification", "tools"] },
  { id: "community-harmony-square", title: t("Harmony Square", "Harmony Square", "Harmony Square"), summary: t("Prebunking-style public game about manipulation techniques.", "لعبة عامة بأسلوب التحصين المعرفي حول تقنيات التلاعب.", "لعبة عامة بأسلوب التحصين المعرفي حول تقنيات التلاعب."), url: "https://harmonysquare.game/", access: "community", scope: "deepreal", tags: ["prebunking", "game", "manipulation"] },
  { id: "community-mediawise", title: t("MediaWise", "MediaWise", "MediaWise"), summary: t("Free practical media-literacy explainers and social verification help.", "شروح مجانية عملية لمحو الأمية الإعلامية والمساعدة في التحقق الاجتماعي.", "شروح مجانية عملية لمحو الأمية الإعلامية والمساعدة في التحقق الاجتماعي."), url: "https://www.poynter.org/mediawise/", access: "community", scope: "deepreal", tags: ["media-literacy", "verification", "social"] },
  { id: "community-afp-fact-check", title: t("AFP Fact Check", "AFP Fact Check", "AFP Fact Check"), summary: t("Free fact-check archive with misinformation case coverage.", "أرشيف مجاني لتقصي الحقائق مع تغطية لحالات التضليل.", "أرشيف مجاني لتقصي الحقائق مع تغطية لحالات التضليل."), url: "https://factcheck.afp.com/", access: "free", scope: "deepreal", tags: ["fact-check", "cases", "archive"] },
  { id: "community-ap-fact-check", title: t("AP Fact Check", "AP Fact Check", "AP Fact Check"), summary: t("Free fact-check reporting on recurring public claims.", "تقارير مجانية لتقصي الحقائق حول الادعاءات العامة المتكررة.", "تقارير مجانية لتقصي الحقائق حول الادعاءات العامة المتكررة."), url: "https://apnews.com/hub/ap-fact-check", access: "free", scope: "deepreal", tags: ["fact-check", "news", "claims"] },
  { id: "community-who-mental", title: t("WHO Mental Health", "منظمة الصحة العالمية: الصحة النفسية", "منظمة الصحة العالمية: الصحة النفسية"), summary: t("Free public mental-health guidance and fact sheets.", "إرشادات صحية نفسية عامة مجانية ونشرات حقائق.", "إرشادات صحية نفسية عامة مجانية ونشرات حقائق."), url: "https://www.who.int/health-topics/mental-health", access: "official", scope: "mental-health", tags: ["official", "mental-health"] },
  { id: "community-mohp-mental", title: t("Egypt MoHP Mental Health Platform", "منصة وزارة الصحة المصرية للصحة النفسية", "منصة وزارة الصحة المصرية للصحة النفسية"), summary: t("Official Egyptian support-routing platform.", "منصة مصرية رسمية لتوجيه الدعم.", "منصة مصرية رسمية لتوجيه الدعم."), url: "https://mentalhealth.mohp.gov.eg/", access: "official", scope: "mental-health", tags: ["egypt", "official", "support"] },
  { id: "community-unicef-egypt", title: t("UNICEF Egypt", "يونيسف مصر", "يونيسف مصر"), summary: t("Free child and youth wellbeing resources with Egypt context.", "موارد مجانية لرفاه الأطفال والشباب بسياق مصري.", "موارد مجانية لرفاه الأطفال والشباب بسياق مصري."), url: "https://www.unicef.org/egypt/", access: "official", scope: "mental-health", tags: ["egypt", "youth", "support"] },
  { id: "community-who-emro", title: t("WHO EMRO", "منظمة الصحة العالمية - إقليم شرق المتوسط", "منظمة الصحة العالمية - إقليم شرق المتوسط"), summary: t("Regional public health guidance with MENA context.", "إرشادات صحية عامة إقليمية بسياق الشرق الأوسط وشمال أفريقيا.", "إرشادات صحية عامة إقليمية بسياق الشرق الأوسط وشمال أفريقيا."), url: "https://www.emro.who.int/", access: "official", scope: "mental-health", tags: ["mena", "regional", "health"] },
  { id: "community-unicef-parenting", title: t("UNICEF Parenting", "يونيسف التربية الإيجابية", "يونيسف التربية الإيجابية"), summary: t("Free parenting and child-support guidance that reduces harm normalization.", "إرشاد مجاني للتربية ودعم الطفل يقلل تطبيع الضرر.", "إرشاد مجاني للتربية ودعم الطفل يقلل تطبيع الضرر."), url: "https://www.unicef.org/parenting", access: "official", scope: "mental-health", tags: ["parenting", "child", "support"] },
  { id: "community-befrienders", title: t("Befrienders Worldwide", "Befrienders Worldwide", "Befrienders Worldwide"), summary: t("Free crisis and emotional-support directory by country.", "دليل مجاني للدعم العاطفي والأزمات حسب البلد.", "دليل مجاني للدعم العاطفي والأزمات حسب البلد."), url: "https://www.befrienders.org/", access: "community", scope: "mental-health", tags: ["crisis", "support", "directory"] },
  { id: "community-dar-al-ifta", title: t("Dar al-Ifta", "دار الإفتاء", "دار الإفتاء"), summary: t("Official Egyptian religious guidance and contact routes.", "توجيه ديني مصري رسمي ومسارات تواصل.", "توجيه ديني مصري رسمي ومسارات تواصل."), url: "https://www.dar-alifta.org/", access: "official", scope: "religion-hub", tags: ["egypt", "religion", "official"] },
  { id: "community-azhar-observatory", title: t("Al-Azhar Observatory", "مرصد الأزهر", "مرصد الأزهر"), summary: t("Observatory work on extremism, hate, and moderation discourse.", "عمل رصدي حول التطرف والكراهية وخطاب الاعتدال.", "عمل رصدي حول التطرف والكراهية وخطاب الاعتدال."), url: "https://observatory.azhar.eg/", access: "official", scope: "religion-hub", tags: ["egypt", "moderation", "observatory"] },
  { id: "community-azhar-portal", title: t("Al-Azhar Portal", "بوابة الأزهر", "بوابة الأزهر"), summary: t("Official institutional route for mainstream Egyptian religious context.", "مسار مؤسسي رسمي للسياق الديني المصري الوسطي.", "مسار مؤسسي رسمي للسياق الديني المصري الوسطي."), url: "https://www.azhar.eg/", access: "official", scope: "religion-hub", tags: ["egypt", "religion", "mainstream"] },
  { id: "community-uscirf-egypt", title: t("USCIRF Egypt updates", "تحديثات USCIRF عن مصر", "تحديثات USCIRF عن مصر"), summary: t("Public reporting on religious-freedom pressure and context.", "تقارير عامة عن ضغط حرية الدين وسياقه.", "تقارير عامة عن ضغط حرية الدين وسياقه."), url: "https://www.uscirf.gov/countries/egypt", access: "free", scope: "religion-hub", tags: ["egypt", "religious-freedom", "context"] },
  { id: "community-arab-barometer-religion", title: t("Arab Barometer religion", "Arab Barometer - الدين", "Arab Barometer - الدين"), summary: t("Free public survey context on religion and society in the region.", "سياق مجاني من استطلاعات عامة حول الدين والمجتمع في المنطقة.", "سياق مجاني من استطلاعات عامة حول الدين والمجتمع في المنطقة."), url: "https://www.arabbarometer.org/topics/religion/", access: "free", scope: "religion-hub", tags: ["religion", "survey", "mena"] },
  { id: "community-ifcn", title: t("IFCN", "الشبكة الدولية لتقصي الحقائق", "الشبكة الدولية لتقصي الحقائق"), summary: t("Global fact-checking principles and community of practice.", "مبادئ عالمية لتقصي الحقائق ومجتمع ممارسة.", "مبادئ عالمية لتقصي الحقائق ومجتمع ممارسة."), url: "https://ifcncodeofprinciples.poynter.org/", access: "community", scope: "shared", tags: ["fact-checking", "standards"] },
  { id: "community-unesco-mil", title: t("UNESCO MIL", "اليونسكو لمحو الأمية الإعلامية", "اليونسكو لمحو الأمية الإعلامية"), summary: t("Media and information literacy resources.", "موارد لمحو الأمية الإعلامية والمعلوماتية.", "موارد لمحو الأمية الإعلامية والمعلوماتية."), url: "https://www.unesco.org/en/media-information-literacy", access: "official", scope: "shared", tags: ["media-literacy", "education"] },
  { id: "community-crossmark", title: t("Crossmark", "Crossmark", "Crossmark"), summary: t("Publication status and correction signals for scholarly work.", "إشارات حالة النشر والتصحيحات للأعمال العلمية.", "إشارات حالة النشر والتصحيحات للأعمال العلمية."), url: "https://www.crossref.org/services/crossmark/", access: "free", scope: "shared", tags: ["research", "status", "corrections"] },
  { id: "community-first-draft", title: t("First Draft", "First Draft", "First Draft"), summary: t("Free practical guides for verifying online content and eyewitness media.", "أدلة عملية مجانية للتحقق من المحتوى عبر الإنترنت ووسائط شهود العيان.", "أدلة عملية مجانية للتحقق من المحتوى عبر الإنترنت ووسائط شهود العيان."), url: "https://firstdraftnews.org/", access: "community", scope: "deepreal", tags: ["verification", "guides", "media"] },
  { id: "community-full-fact", title: t("Full Fact", "Full Fact", "Full Fact"), summary: t("UK-based independent fact-checking with open tools and methodology.", "تحقق مستقل من بريطانيا بأدوات ومنهجية مفتوحة.", "تحقق مستقل من بريطانيا بأدوات ومنهجية مفتوحة."), url: "https://fullfact.org/", access: "free", scope: "deepreal", tags: ["fact-checking", "tools", "open"] },
  { id: "community-africa-check", title: t("Africa Check", "Africa Check", "Africa Check"), summary: t("Fact-checking with African and MENA regional context.", "تقصي حقائق بسياق أفريقي وإقليمي للشرق الأوسط وشمال أفريقيا.", "تقصي حقائق بسياق أفريقي وإقليمي للشرق الأوسط وشمال أفريقيا."), url: "https://africacheck.org/", access: "free", scope: "deepreal", tags: ["fact-checking", "africa", "regional"] },
  { id: "community-snopes", title: t("Snopes", "Snopes", "Snopes"), summary: t("One of the oldest fact-checking databases with long-tail rumor archives.", "من أقدم قواعد بيانات تقصي الحقائق مع أرشيف شائعات طويل الأمد.", "من أقدم قواعد بيانات تقصي الحقائق مع أرشيف شائعات طويل الأمد."), url: "https://www.snopes.com/", access: "free", scope: "deepreal", tags: ["fact-checking", "archive", "rumors"] },
  { id: "community-google-fact-check", title: t("Google Fact Check Explorer", "مستكشف تقصي الحقائق من Google", "مستكشف تقصي الحقائق من Google"), summary: t("Free search across fact-check articles and repeated public claims.", "بحث مجاني عبر مقالات تقصي الحقائق والادعاءات العامة المتكررة.", "بحث مجاني عبر مقالات تقصي الحقائق والادعاءات العامة المتكررة."), url: "https://toolbox.google.com/factcheck/explorer", access: "free", scope: "deepreal", tags: ["fact-checking", "search", "claims"] },
  { id: "community-wayback", title: t("Wayback Machine", "آلة الزمن للأرشيف", "آلة الزمن للأرشيف"), summary: t("Free archive for checking whether a page, claim, or institution changed over time.", "أرشيف مجاني لفحص ما إذا كانت الصفحة أو الادعاء أو المؤسسة قد تغيّرت مع الزمن.", "أرشيف مجاني لفحص ما إذا كانت الصفحة أو الادعاء أو المؤسسة قد تغيّرت مع الزمن."), url: "https://web.archive.org/", access: "free", scope: "deepreal", tags: ["archive", "history", "verification"] },
  { id: "community-claimreview", title: t("ClaimReview", "ClaimReview", "ClaimReview"), summary: t("Structured fact-check markup ecosystem used by many public fact-checkers.", "نظام توصيف منظم لتقصي الحقائق تستخدمه جهات عامة كثيرة.", "نظام توصيف منظم لتقصي الحقائق تستخدمه جهات عامة كثيرة."), url: "https://schema.org/ClaimReview", access: "free", scope: "deepreal", tags: ["standards", "fact-checking", "schema"] },
  { id: "community-unesco-moocs", title: t("UNESCO MIL MOOCs", "دورات اليونسكو لمحو الأمية الإعلامية", "دورات اليونسكو لمحو الأمية الإعلامية"), summary: t("Free self-paced media and information literacy courses, including misinformation-focused modules.", "دورات مجانية ذاتية الإيقاع لمحو الأمية الإعلامية والمعلوماتية، تشمل وحدات تركز على التضليل.", "دورات مجانية ذاتية الإيقاع لمحو الأمية الإعلامية والمعلوماتية، تشمل وحدات تركز على التضليل."), url: "https://www.unesco.org/en/media-information-literacy/moocs", access: "official", scope: "deepreal", tags: ["unesco", "course", "media-literacy"] },
  { id: "community-unesco-mil-alliance", title: t("UNESCO MIL Alliance", "تحالف اليونسكو لمحو الأمية الإعلامية", "تحالف اليونسكو لمحو الأمية الإعلامية"), summary: t("Global collaboration network for media and information literacy resources and communities.", "شبكة تعاون عالمية لموارد ومجتمعات محو الأمية الإعلامية والمعلوماتية.", "شبكة تعاون عالمية لموارد ومجتمعات محو الأمية الإعلامية والمعلوماتية."), url: "https://www.unesco.org/en/media-information-literacy", access: "official", scope: "deepreal", tags: ["unesco", "community", "media-literacy"] },
  { id: "community-nimh", title: t("NIMH", "المعهد الوطني للصحة النفسية", "المعهد الوطني للصحة النفسية"), summary: t("Free US-based mental health research summaries and evidence guides.", "ملخصات بحثية مجانية وأدلة قائمة على الأدلة من المعهد الأمريكي للصحة النفسية.", "ملخصات بحثية مجانية وأدلة قائمة على الأدلة من المعهد الأمريكي للصحة النفسية."), url: "https://www.nimh.nih.gov/", access: "free", scope: "mental-health", tags: ["research", "evidence", "mental-health"] },
  { id: "community-nimh-topics", title: t("NIMH Health Topics", "موضوعات الصحة النفسية من NIMH", "موضوعات الصحة النفسية من NIMH"), summary: t("Free topic-by-topic pages on disorders, treatment, research, and help routes.", "صفحات مجانية حسب الموضوع عن الاضطرابات والعلاج والبحث ومسارات المساعدة.", "صفحات مجانية حسب الموضوع عن الاضطرابات والعلاج والبحث ومسارات المساعدة."), url: "https://www.nimh.nih.gov/health/topics", access: "free", scope: "mental-health", tags: ["topics", "evidence", "guidance"] },
  { id: "community-mind-uk", title: t("Mind UK", "Mind UK", "Mind UK"), summary: t("Free mental health support guides, coping tools, and crisis routing.", "أدلة دعم مجانية للصحة النفسية وأدوات تكيف وتوجيه أزمات.", "أدلة دعم مجانية للصحة النفسية وأدوات تإزاي وتوجيه أزمات."), url: "https://www.mind.org.uk/", access: "community", scope: "mental-health", tags: ["support", "coping", "crisis"] },
  { id: "community-mha-screening", title: t("MHA Screening", "فحوصات Mental Health America", "فحوصات Mental Health America"), summary: t("Free and confidential validated mental-health screening tools with support routes.", "أدوات فحص مجانية وسرية ومحققة للصحة النفسية مع مسارات دعم.", "أدوات فحص مجانية وسرية ومحققة للصحة النفسية مع مسارات دعم."), url: "https://screening.mhanational.org/", access: "free", scope: "mental-health", tags: ["screening", "validated", "support"] },
  { id: "community-mha-screening-method", title: t("MHA Test Method Notes", "ملاحظات منهجية فحوصات MHA", "ملاحظات منهجية فحوصات MHA"), summary: t("Explains how the free screens were developed, validated, and limited.", "يشرح كيف طُوِّرت الفحوصات المجانية وكيف جرى التحقق منها وما حدودها.", "يشرح إزاي طُوِّرت الفحوصات المجانية وإزاي جرى التحقق منها وما حدودها."), url: "https://screening.mhanational.org/about-our-mental-health-tests/", access: "free", scope: "mental-health", tags: ["method", "validation", "screening"] },
  { id: "community-who-self-care", title: t("WHO Self-care", "الرعاية الذاتية من منظمة الصحة العالمية", "الرعاية الذاتية من منظمة الصحة العالمية"), summary: t("Free WHO guidance on evidence-based self-care for health and well-being.", "إرشادات مجانية من منظمة الصحة العالمية حول الرعاية الذاتية المبنية على الأدلة للصحة والعافية.", "إرشادات مجانية من منظمة الصحة العالمية حول الرعاية الذاتية المبنية على الأدلة للصحة والعافية."), url: "https://www.who.int/health-topics/self-care", access: "official", scope: "mental-health", tags: ["self-care", "who", "guidance"] },
  { id: "community-988", title: t("988 Lifeline", "خط 988", "خط 988"), summary: t("Free crisis support guidance and public educational resources.", "إرشادات دعم أزمات مجانية وموارد تثقيفية عامة.", "إرشادات دعم أزمات مجانية وموارد تثقيفية عامة."), url: "https://988lifeline.org/", access: "official", scope: "mental-health", tags: ["crisis", "hotline", "support"] },
  { id: "community-yaqeen-institute", title: t("Yaqeen Institute", "معهد يقين", "معهد يقين"), summary: t("Free evidence-based Islamic research addressing contemporary faith questions.", "بحث إسلامي مجاني قائم على الأدلة يعالج أسئلة الإيمان المعاصرة.", "بحث إسلامي مجاني قائم على الأدلة يعالج أسئلة الإيمان المعاصرة."), url: "https://yaqeeninstitute.org/", access: "free", scope: "religion-hub", tags: ["islam", "research", "evidence-based"] },
  { id: "community-tabah-foundation", title: t("Tabah Foundation", "مؤسسة طابة", "مؤسسة طابة"), summary: t("UAE-based research center on Islamic moderation and contemporary Muslim thought.", "مركز بحثي إماراتي حول الاعتدال الإسلامي والفكر المسلم المعاصر.", "مركز بحثي إماراتي حول الاعتدال الإسلامي والفكر المسماالمعاصر."), url: "https://www.tabahfoundation.org/", access: "community", scope: "religion-hub", tags: ["moderation", "islam", "research"] },
  { id: "community-dar-al-ifta-services", title: t("Dar al-Ifta Fatwa Services", "خدمات الفتوى من دار الإفتاء", "خدمات الفتوى من دار الإفتاء"), summary: t("Official free routes to submit, track, and retrieve accountable fatwa answers.", "مسارات رسمية مجانية لتقديم الفتوى وتتبعها واسترجاع جواب خاضع للمساءلة.", "مسارات رسمية مجانية لتقديم الفتوى وتتبعها واسترجاع جواب خاضع للمساءلة."), url: "https://www.dar-alifta.org/en/fatwa/fatwa-services", access: "official", scope: "religion-hub", tags: ["fatwa", "services", "official"] },
  { id: "community-dar-al-ifta-moderation", title: t("Dar al-Ifta Moderation", "منهج الاعتدال من دار الإفتاء", "منهج الاعتدال من دار الإفتاء"), summary: t("Official explanation of moderation in fatwa and disciplined religious guidance.", "شرح رسمي للاعتدال في الفتوى والتوجيه الديني المنضبط.", "شرح رسمي للاعتدال في الفتوى والتوجيه الديني المنضبط."), url: "https://www.dar-alifta.org/en/article/details/364/moderation", access: "official", scope: "religion-hub", tags: ["moderation", "fatwa", "guidance"] },
  { id: "community-dar-al-ifta-what-is-fatwa", title: t("What is Fatwa?", "ما هي الفتوى؟", "إيه هي الفتوى؟"), summary: t("Official clarification of what a fatwa is, what changes, and what does not.", "توضيح رسمي لماهية الفتوى وما يتغير فيها وما لا يتغير.", "توضيح رسمي لماهية الفتوى وما يتغير فيها وما لا يتغير."), url: "https://dar-alifta.org/en/fatwa/what-is-fatwa", access: "official", scope: "religion-hub", tags: ["fatwa", "basics", "official"] },
];

export const REALTIME_COGNITIVE_V2 = [
  ...buildResilienceProtocols("deepreal", "dr", "DeepReal", "ديب ريال", [
    { label: t("Bad News", "Bad News", "Bad News"), url: "https://www.getbadnews.com/" },
    { label: t("Digital Inquiry Group", "مجموعة الاستقصاء الرقمي", "مجموعة الاستقصاء الرقمي"), url: "https://www.digitalinquirygroup.org/" },
  ]),
  ...buildResilienceProtocols("mental-health", "mh", "Mental Health", "الصحة النفسية", [
    { label: t("WHO Mental Health", "منظمة الصحة العالمية: الصحة النفسية", "منظمة الصحة العالمية: الصحة النفسية"), url: "https://www.who.int/health-topics/mental-health" },
    { label: t("Egypt MoHP", "وزارة الصحة المصرية", "وزارة الصحة المصرية"), url: "https://mentalhealth.mohp.gov.eg/" },
  ]),
  ...buildResilienceProtocols("religion-hub", "rh", "Religion Hub", "المحور الديني", [
    { label: t("Dar al-Ifta", "دار الإفتاء", "دار الإفتاء"), url: "https://www.dar-alifta.org/" },
    { label: t("Al-Azhar Observatory", "مرصد الأزهر", "مرصد الأزهر"), url: "https://observatory.azhar.eg/" },
  ]),
];
