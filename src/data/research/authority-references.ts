import type { LocalizedText, ModuleId } from "./module-briefings";

export interface AuthorityRoute {
  id: string;
  module: ModuleId;
  title: LocalizedText;
  expertType: LocalizedText;
  useWhen: LocalizedText;
  whyTrusted: LocalizedText;
  verifyYourself: LocalizedText;
  doNotRelyIf: LocalizedText;
  proofSignals: string[];
  routes: Array<{
    label: LocalizedText;
    url: string;
    access: "free" | "official" | "community";
  }>;
}

export interface ReligiousReference {
  id: string;
  module: ModuleId;
  tradition: "quran" | "hadith";
  title: LocalizedText;
  theme: LocalizedText;
  summary: LocalizedText;
  whyRelevant: LocalizedText;
  resolve: {
    type: "ayah" | "search";
    q: string;
  };
  sourceUrl?: string;
  tags: string[];
}

function t(en: string, ar: string, arEG?: string): LocalizedText {
  return { en, ar, arEG: arEG || ar };
}

export const AUTHORITY_ROUTES: AuthorityRoute[] = [
  {
    id: "deepreal-primary-source",
    module: "deepreal",
    title: t("Original issuing source", "الجهة الأصلية المُصدِرة", "الجهة الأصلية المُصدِرة"),
    expertType: t("Primary source owner", "صاحب المصدر الأولي", "صاحب المصدر الأولي"),
    useWhen: t("Use when the claim says a ministry, university, hospital, company, or lab announced something.", "استخدمه عندما يزعم المحتوى أن وزارة أو جامعة أو مستشفى أو شركة أو مختبر أعلن شيئاً.", "استخدمه لما يزعم المحتوى أن وزارة أو جامعة أو مستشفى أو شركة أو مختبر أعمش هـشيئاً."),
    whyTrusted: t("The primary source is accountable for the original wording, release date, correction history, and contact route.", "المصدر الأولي خاضع للمساءلة عن الصياغة الأصلية وتاريخ النشر وسجل التصحيح وطريق التواصل.", "المصدر الأولي خاضع للمساءلة عن الصياغة الأصلية وتاريخ النشر وسجل التصحيح وطريق التواصل."),
    verifyYourself: t("Check the official domain, the publication date, the named office, and whether the same statement appears in the institution archive.", "افحص النطاق الرسمي وتاريخ النشر والجهة المسماة وهل يظهر البيان نفسه في أرشيف المؤسسة.", "افحص النطاق الرسمي وتاريخ النشر والجهة المسماة ويظهر البيان نفسه في أرشيف المؤسسة."),
    doNotRelyIf: t("Do not rely on screenshots, reposted graphics, cropped PDFs, or anonymous repost accounts that pretend to quote the source.", "لا تعتمد على الصور المعاد نشرها أو الرسومات المعاد تداولها أو ملفات PDF المقتطعة أو الحسابات المجهولة التي تدّعي النقل عن المصدر.", "لا تعتمد على الصور المعاد نشرها أو الرسومات المعاد تداولها أو ملفات PDF المقتطعة أو الحسابات المجهولة اللي تدّعي النقل عن المصدر."),
    proofSignals: ["official domain", "named office", "archive copy", "correction path"],
    routes: [
      { label: t("OpenAlex", "OpenAlex", "OpenAlex"), url: "https://openalex.org/", access: "free" },
      { label: t("Crossmark", "Crossmark", "Crossmark"), url: "https://www.crossref.org/services/crossmark/", access: "free" },
    ],
  },
  {
    id: "deepreal-factcheck",
    module: "deepreal",
    title: t("Independent fact-checker", "جهة تقصّي حقائق مستقلة", "جهة تقصّي حقائق مستقلة"),
    expertType: t("Method-driven verifier", "متحقق قائم على المنهج", "متحقق قائم على المنهج"),
    useWhen: t("Use when the claim is already viral and you need a fast first-pass judgment with method notes.", "استخدمه عندما يكون الادعاء قد انتشر بالفعل وتحتاج إلى حكم أولي سريع مع ملاحظات المنهج.", "استخدمه لما يكون الادعاء قد انتشر بالفعل وتحتاج إلى حكم أولي سريع مع ملاحظات المنهج."),
    whyTrusted: t("Good fact-checkers document evidence chains, uncertainty, timestamps, and update corrections publicly.", "جهات تقصي الحقائق الجيدة توثّق سلاسل الأدلة وعدم اليقين والطوابع الزمنية وتصحيح التحديثات علناً.", "جهات تقصي الحقائق الجيدة توثّق سلاسل الأدلة وعدم اليقين والطوابع الزمنية وتصحيح التحديثات علناً."),
    verifyYourself: t("Check whether the checker shows evidence links, archived originals, reverse-image work, and an explicit verdict method.", "افحص هل الجهة تعرض روابط الأدلة والأصول المؤرشفة وعمل التحقق العكسي للصور ومنهجاً واضحاً للحكم.", "افحص الجهة تعرض روابط الأدلة والأصول المؤرشفة وعمل التحقق العكسي للصور ومنهجاً واضحاً للحكم."),
    doNotRelyIf: t("Do not rely on pages that give only verdict slogans without showing how they got there.", "لا تعتمد على الصفحات التي تعطي شعار حكم فقط من دون إظهار كيف وصلت إليه.", "لا تعتمد على الصفحات اللي تعطي شعار حكم بس من دون إظهار إزاي وصلت إليه."),
    proofSignals: ["verdict method", "linked evidence", "archive links", "update log"],
    routes: [
      { label: t("Full Fact", "Full Fact", "Full Fact"), url: "https://fullfact.org/", access: "free" },
      { label: t("Africa Check", "Africa Check", "Africa Check"), url: "https://africacheck.org/", access: "free" },
      { label: t("AFP Fact Check", "AFP Fact Check", "AFP Fact Check"), url: "https://factcheck.afp.com/", access: "free" },
    ],
  },
  {
    id: "deepreal-forensics",
    module: "deepreal",
    title: t("Media-forensics route", "مسار الطب الشرعي للوسائط", "مسار الطب الشرعي للوسائط"),
    expertType: t("Media verification specialist", "مختص تحقق وسائط", "مختص تحقق وسائط"),
    useWhen: t("Use when the threat is a clip, synthetic face, altered image, or cropped visual frame.", "استخدمه عندما يكون التهديد مقطعاً أو وجهاً اصطناعياً أو صورة معدلة أو إطاراً بصرياً مقتطعاً.", "استخدمه لما يكون التهديد مقطعاً أو وجهاً اصطناعياً أو صورة معدلة أو إطاراً بصرياً مقتطعاً."),
    whyTrusted: t("A forensics route is trusted when it checks provenance, frame artifacts, clip boundaries, and metadata instead of judging by realism alone.", "يُوثق بمسار الطب الشرعي عندما يفحص السلسلة الأصلية وآثار الإطار وحدود المقطع والبيانات الوصفية بدلاً من الحكم بالواقعية وحدها.", "يُوثق بمسار الطب الشرعي لما يفحص السلسلة الأصلية وآثار الإطار وحدود المقطع والبيانات الوصفية بدلاً من الحكم بالواقعية وحدها."),
    verifyYourself: t("Run a reverse check, search for the full clip, inspect cuts, and compare with an earlier upload.", "شغّل فحصاً عكسياً وابحث عن المقطع الكامل وافحص القصّ وقارن مع رفع أقدم.", "شغّل فحصاً عكسياً وابحث عن المقطع الكامل وافحص القصّ وقارن مع رفع أقدم."),
    doNotRelyIf: t("Do not rely on anyone who says 'it looks real' or 'it feels fake' without a process.", "لا تعتمد على من يقول: يبدو حقيقياً أو يبدو مزيفاً من دون عملية واضحة.", "لا تعتمد على من يقول: يبدو حقيقياً أو يبدو مزيفاً من دون عملية واضحة."),
    proofSignals: ["provenance", "frame comparison", "upload history", "artifact review"],
    routes: [
      { label: t("InVID WeVerify", "InVID WeVerify", "InVID WeVerify"), url: "https://www.invid-project.eu/tools-and-services/", access: "free" },
      { label: t("MediaWise", "MediaWise", "MediaWise"), url: "https://www.poynter.org/mediawise/", access: "community" },
    ],
  },
  {
    id: "mental-health-clinician",
    module: "mental-health",
    title: t("Licensed clinician route", "مسار الأخصائي المرخّص", "مسار الأخصائي المرخّص"),
    expertType: t("Psychiatrist / psychologist / licensed therapist", "طبيب نفسي / أخصائي نفسي / معالج مرخّص", "طبيب نفسي / أخصائي نفسي / معالج مرخّص"),
    useWhen: t("Use when the issue concerns diagnosis, medication, suicidality, panic collapse, trauma escalation, or daily functioning loss.", "استخدمه عندما تتعلق المشكلة بالتشخيص أو الدواء أو الأفكار الانتحارية أو انهيار الهلع أو تصاعد الصدمة أو فقدان الأداء اليومي.", "استخدمه لما تتعلق المشكلة بالتشخيص أو الدواء أو الأفكار الانتحارية أو انهيار الهلع أو تصاعد الصدمة أو فقدان الأداء اليومي."),
    whyTrusted: t("A licensed clinician is accountable to training standards, scope of practice, referral rules, and documented risk assessment.", "الأخصائي المرخّص خاضع لمعايير تدريب ونطاق ممارسة وقواعد إحالة وتقييم خطر موثق.", "الأخصائي المرخّص خاضع لمعايير تدريب ونطاق ممارسة وقواعد إحالة وتقييم خطر موثق."),
    verifyYourself: t("Check licensure, the professional role, the scope they claim, whether they distinguish symptoms from diagnosis, and whether they offer referral when needed.", "افحص الترخيص والدور المهني والنطاق الذي يدّعونه وهل يميزون بين الأعراض والتشخيص وهل يقدّمون إحالة عند الحاجة.", "افحص الترخيص والدور المهني والنطاق اللي يدّعونه ويميزون بين الأعراض والتشخيص ويقدّمون إحالة عند الحاجة."),
    doNotRelyIf: t("Do not rely on coaches, influencers, or motivational pages that diagnose everyone from clips or promise certainty from one symptom.", "لا تعتمد على المدربين أو المؤثرين أو الصفحات التحفيزية التي تشخّص الجميع من المقاطع أو تعد بيقين من عرض واحد.", "لا تعتمد على المدربين أو المؤثرين أو الصفحات التحفيزية اللي تشخّص الجميع من المقاطع أو تعد بيقين من عرض واحد."),
    proofSignals: ["license", "scope clarity", "risk triage", "referral discipline"],
    routes: [
      { label: t("Egypt MoHP Mental Health", "وزارة الصحة المصرية للصحة النفسية", "وزارة الصحة المصرية للصحة النفسية"), url: "https://mentalhealth.mohp.gov.eg/", access: "official" },
      { label: t("WHO Mental Health", "منظمة الصحة العالمية: الصحة النفسية", "منظمة الصحة العالمية: الصحة النفسية"), url: "https://www.who.int/health-topics/mental-health", access: "official" },
      { label: t("NIMH", "المعهد الوطني للصحة النفسية", "المعهد الوطني للصحة النفسية"), url: "https://www.nimh.nih.gov/", access: "free" },
    ],
  },
  {
    id: "mental-health-crisis-route",
    module: "mental-health",
    title: t("Crisis route", "مسار الأزمة", "مسار الأزمة"),
    expertType: t("Immediate crisis support", "دعم أزمة فوري", "دعم أزمة فوري"),
    useWhen: t("Use when there is self-harm risk, suicidal talk, psychotic break, severe dissociation, or inability to stay safe.", "استخدمه عندما يوجد خطر إيذاء النفس أو كلام انتحاري أو نوبة ذهانية أو انفصال شديد أو عجز عن البقاء آمناً.", "استخدمه لما يوجد خطر إيذاء النفس أو كلام انتحاري أو نوبة ذهانية أو انفصال شديد أو عجز عن البقاء آمناً."),
    whyTrusted: t("Crisis routes are trusted because they are built for immediate safety, escalation, and real-world handoff, not just advice.", "تُوثق بمسارات الأزمة لأنها مبنية للأمان الفوري والتصعيد والتسليم الواقعي لا للنصح المجرد فقط.", "تُوثق بمسارات الأزمة عشانها مبنية للأمان الفوري والتصعيد والتسليم الواقعي لا للنصح المجرد بس."),
    verifyYourself: t("Check whether the route gives immediate contact, country fit, escalation instructions, and emergency steps instead of long articles only.", "افحص هل يعطي المسار وسيلة تواصل فورية وملاءمة البلد وتعليمات تصعيد وخطوات طوارئ بدلاً من مقالات طويلة فقط.", "افحص يعطي المسار وسيلة تواصل فورية وملاءمة البلد وتعليمات تصعيد وخطوات طوارئ بدلاً من مقالات طويلة بس."),
    doNotRelyIf: t("Do not rely on content creators telling you to simply breathe, journal, or pray when direct danger is present.", "لا تعتمد على من يطلب منك فقط التنفس أو الكتابة أو الدعاء عندما يكون الخطر المباشر حاضراً.", "لا تعتمد على من يطلب منك بس التنفس أو الكتابة أو الدعاء لما يكون الخطر المباشر حاضراً."),
    proofSignals: ["emergency contact", "country fit", "safety first", "handoff path"],
    routes: [
      { label: t("MoHP 16328", "الخط الساخن 16328", "الخط الساخن 16328"), url: "https://mentalhealth.mohp.gov.eg/", access: "official" },
      { label: t("Befrienders Worldwide", "Befrienders Worldwide", "Befrienders Worldwide"), url: "https://www.befrienders.org/", access: "community" },
    ],
  },
  {
    id: "religion-formal-guidance",
    module: "religion-hub",
    title: t("Formal religious guidance route", "مسار الإرشاد الديني الرسمي", "مسار الإرشاد الديني الرسمي"),
    expertType: t("Accountable mainstream religious institution", "مؤسسة دينية وسطية خاضعة للمساءلة", "مؤسسة دينية وسطية خاضعة للمساءلة"),
    useWhen: t("Use when the question concerns fatwa, formal religious duty, sectarian incitement, or a claim presented as binding religion.", "استخدمه عندما يكون السؤال متعلقاً بفتوى أو حكم ديني رسمي أو تحريض طائفي أو ادعاء يُقدَّم بوصفه ديناً مُلزِماً.", "استخدمه لما يكون السؤال متعلقاً بفتوى أو حكم ديني رسمي أو تحريض طائفي أو ادعاء يُقدَّم بوصفه ديناً مُلزِماً."),
    whyTrusted: t("A formal institution is more trustworthy when it publishes names, contact routes, topic scope, and visible correction or clarification paths.", "تكون المؤسسة الرسمية أكثر موثوقية عندما تنشر الأسماء وطرق التواصل ونطاق الموضوع ومسارات واضحة للتصحيح أو التوضيح.", "تكون المؤسسة الرسمية أكثر موثوقية لما تنشر الأسماء وطرق التواصل ونطاق الموضوع ومسارات واضحة للتصحيح أو التوضيح."),
    verifyYourself: t("Check whether the institution identifies scholars, dates the answer, clarifies the scope, and distinguishes legal judgment from pastoral advice.", "افحص هل تحدد المؤسسة العلماء وتؤرخ الجواب وتوضح النطاق وتميّز بين الحكم الفقهي والنصح الرعوي.", "افحص تحدد المؤسسة العلماء وتؤرخ الجواب وتوضح النطاق وتميّز بين الحكم الفقهي والنصح الرعوي."),
    doNotRelyIf: t("Do not rely on anonymous sermon pages, cut clips, or accounts that use scripture as a weapon without identifiable scholars or institutions.", "لا تعتمد على صفحات الوعظ المجهولة أو المقاطع المقتطعة أو الحسابات التي تستخدم النص كسلاح من دون علماء أو مؤسسات معروفة.", "لا تعتمد على صفحات الوعظ المجهولة أو المقاطع المقتطعة أو الحسابات اللي تستخدم النص كسلاح من دون علماء أو مؤسسات معروفة."),
    proofSignals: ["named scholars", "topic scope", "dated answer", "official contact"],
    routes: [
      { label: t("Dar al-Ifta", "دار الإفتاء", "دار الإفتاء"), url: "https://www.dar-alifta.org/en", access: "official" },
      { label: t("Al-Azhar", "الأزهر", "الأزهر"), url: "https://www.azhar.eg/", access: "official" },
      { label: t("Al-Azhar Observatory", "مرصد الأزهر", "مرصد الأزهر"), url: "https://observatory.azhar.eg/", access: "official" },
    ],
  },
  {
    id: "religion-care-boundary",
    module: "religion-hub",
    title: t("Care-boundary route", "مسار حدود الرعاية", "مسار حدود الرعاية"),
    expertType: t("Religion + mental-health boundary check", "فحص حدود الدين والصحة النفسية", "فحص حدود الدين والصحة النفسية"),
    useWhen: t("Use when someone uses verses, hadiths, or sermons to replace therapy, medication, safeguarding, or crisis support.", "استخدمه عندما يستعمل أحد الآيات أو الأحاديث أو الخطب لاستبدال العلاج أو الدواء أو الحماية أو دعم الأزمة.", "استخدمه لما يستعمل أحد الآيات أو الأحاديث أو الخطب لاستبدال العلاج أو الدواء أو الحماية أو دعم الأزمة."),
    whyTrusted: t("This route is trusted when it keeps religion visible without letting it erase clinical risk, violence, coercion, or abuse signs.", "يُوثق بهذا المسار عندما يُبقي الدين حاضراً من دون أن يمحو خطر العيادة أو العنف أو الإكراه أو مؤشرات الإساءة.", "يُوثق بده المسار لما يُبقي الدين حاضراً من دون أن يمحو خطر العيادة أو العنف أو الإكراه أو مؤشرات الإساءة."),
    verifyYourself: t("Check whether the advice explicitly preserves medical referral, consent, safety, and lawful boundaries.", "افحص هل النصيحة تحفظ بوضوح الإحالة الطبية والرضا والأمان والحدود القانونية.", "افحص النصيحة تحفظ بوضوح الإحالة الطبية والرضا والأمان والحدود القانونية."),
    doNotRelyIf: t("Do not rely on anyone who says prayer alone proves there is no need for protection, therapy, or emergency help.", "لا تعتمد على من يقول إن الدعاء وحده يثبت عدم الحاجة إلى حماية أو علاج أو مساعدة طارئة.", "لا تعتمد على من يقول إن الدعاء وحده يثبت عدم الحاجة إلى حماية أو علاج أو مساعدة طارئة."),
    proofSignals: ["clinical boundary", "safeguarding", "consent", "referral kept visible"],
    routes: [
      { label: t("WHO Mental Health", "منظمة الصحة العالمية: الصحة النفسية", "منظمة الصحة العالمية: الصحة النفسية"), url: "https://www.who.int/health-topics/mental-health", access: "official" },
      { label: t("MoHP Mental Health", "منصة وزارة الصحة للصحة النفسية", "منصة وزارة الصحة للصحة النفسية"), url: "https://mentalhealth.mohp.gov.eg/", access: "official" },
      { label: t("Dar al-Ifta Telephone Service", "خدمة دار الإفتاء الهاتفية", "خدمة دار الإفتاء الهاتفية"), url: "https://www.dar-alifta.org/en/service/details/32/telephone-service", access: "official" },
    ],
  },
];

const QURAN_REFERENCES: Array<[string, string, string, string, string]> = [
  ["quran-1", "2:256", "No compulsion in religion", "Builds a boundary against coercive religious control.", "coercion freedom boundaries"],
  ["quran-2", "16:125", "Invite with wisdom and good instruction", "Useful against aggressive certainty and humiliating preaching.", "wisdom speech moderation"],
  ["quran-3", "49:6", "Verify news from a wrongdoer", "Core anti-rumor verification anchor in Religion Hub and DeepReal.", "verification rumors evidence"],
  ["quran-4", "49:10", "Believers are brothers, so reconcile", "Supports de-escalation and anti-sectarian repair.", "reconciliation unity sectarianism"],
  ["quran-5", "5:8", "Do not let hatred make you unjust", "Directly blocks bias and retaliation logic.", "justice hatred bias"],
  ["quran-6", "4:135", "Stand firmly for justice", "Useful when identity pressure tries to override truth or fairness.", "justice truth pressure"],
  ["quran-7", "17:36", "Do not follow what you have no knowledge of", "A foundational anti-fake and anti-certainty verse.", "knowledge caution evidence"],
  ["quran-8", "39:18", "Listen to speech and follow the best of it", "Encourages comparative reasoning, not blind following.", "discernment reasoning comparison"],
  ["quran-9", "94:5", "With hardship comes ease", "Supports hope framing without denying difficulty.", "hope hardship resilience"],
  ["quran-10", "13:28", "In remembrance of Allah hearts find rest", "Useful for calming without replacing care boundaries.", "calm remembrance coping"],
  ["quran-11", "2:286", "Allah does not burden a soul beyond capacity", "Helps fight manipulative guilt overload.", "capacity guilt burden"],
  ["quran-12", "12:18", "Beautiful patience", "Useful in distress pacing and non-impulsive response.", "patience distress pacing"],
  ["quran-13", "3:159", "Consult them in affairs", "Supports consultation over isolated certainty.", "consultation teamwork humility"],
  ["quran-14", "42:38", "Their affairs are by consultation", "Useful against authoritarian claims in public decisions.", "consultation governance collective"],
  ["quran-15", "24:15", "You thought it trivial while it was grave", "Anti-forwarding anchor for rumor harm.", "rumor harm speech"],
  ["quran-16", "33:70", "Speak words directed to the right", "Supports disciplined speech and anti-harm language.", "speech truth discipline"],
  ["quran-17", "41:34", "Repel evil with what is better", "Strong anti-retaliation and anti-escalation anchor.", "deescalation kindness conflict"],
  ["quran-18", "5:32", "Whoever saves one life", "Useful for safety-first and harm reduction routes.", "life safety harm"],
  ["quran-19", "4:94", "Investigate carefully", "Supports caution before labeling others or escalating conflict.", "investigation caution conflict"],
  ["quran-20", "20:44", "Speak to him gently", "Useful against humiliation-based preaching.", "gentleness preaching moderation"],
  ["quran-21", "31:18", "Do not turn your cheek in contempt", "Counters arrogance and superiority performance.", "humility contempt arrogance"],
  ["quran-22", "31:19", "Be moderate in your pace and lower your voice", "Supports moderation, tone control, and non-aggression.", "moderation tone selfcontrol"],
  ["quran-23", "9:119", "Be with the truthful", "Supports truth-signal routing and accountability.", "truth accountability company"],
  ["quran-24", "58:11", "Allah raises those given knowledge", "Useful for valuing real knowledge without blind status worship.", "knowledge learning humility"],
  ["quran-25", "39:53", "Do not despair of Allah's mercy", "Anti-despair anchor in mental-health crossover use.", "hope mercy despair"],
  ["quran-26", "3:103", "Hold fast together and do not divide", "Useful against sectarian fragmentation pressure.", "unity division sectarianism"],
  ["quran-27", "11:115", "Be patient", "Supports stable action over impulsive reaction.", "patience stability"],
  ["quran-28", "25:63", "Servants of the Merciful walk gently", "Counters hostile identity performance.", "gentleness identity humility"],
  ["quran-29", "49:12", "Avoid much suspicion", "Direct anti-suspicion and anti-character-assassination anchor.", "suspicion gossip slander"],
  ["quran-30", "103:1", "Time and mutual truth and patience", "Compact resilience anchor for truth plus patience.", "truth patience resilience"],
  ["quran-31", "90:17", "Those who advise patience and mercy", "Supports compassionate resilience and mutual care.", "mercy patience care"],
  ["quran-32", "16:43", "Ask people of knowledge if you do not know", "Useful when routing to real qualified authority.", "authority knowledge routing"],
  ["quran-33", "2:83", "Speak kindly to people", "Useful against harsh manipulative speech.", "kind speech relations"],
  ["quran-34", "24:30", "Lower the gaze", "Can be used in dignity and impulse-control discussions without shame weaponization.", "dignity impulse modesty"],
  ["quran-35", "4:58", "Render trusts to whom they are due", "Useful in integrity, duty, and role boundaries.", "trust duty integrity"],
  ["quran-36", "59:18", "Let every soul look to what it sent ahead", "Useful for reflective audit rather than panic guilt.", "reflection audit accountability"],
  ["quran-37", "6:141", "Do not be excessive", "Supports anti-extremes and moderation framing.", "moderation excess restraint"],
  ["quran-38", "7:199", "Show forgiveness, enjoin what is right, turn away from the ignorant", "Useful for de-escalating provocations.", "forgiveness deescalation"],
  ["quran-39", "17:53", "Say what is best", "Useful in speech filtering and conflict prevention.", "speech best conflict"],
  ["quran-40", "8:46", "Do not dispute and lose courage", "Supports cohesion over destructive escalation.", "unity courage dispute"],
];

const HADITH_REFERENCES: Array<[string, string, string, string, string, string?]> = [
  ["hadith-1", "intentions", "Actions are judged by intentions", "Useful against performance religion and for self-audit.", "intention sincerity motive", "https://sunnah.com/bukhari:1"],
  ["hadith-2", "speak good remain silent", "Speak good or remain silent", "Useful for misinformation, slander, and escalation control.", "speech silence harm", "https://sunnah.com/bukhari:6018"],
  ["hadith-3", "do not oppress", "Do not oppress one another", "Strong anti-abuse and anti-coercion anchor.", "justice oppression coercion", "https://sunnah.com/muslim:2577"],
  ["hadith-4", "love for his brother", "Love for your brother what you love for yourself", "Useful against sectarian contempt and dehumanization.", "empathy brotherhood unity", "https://sunnah.com/bukhari:13"],
  ["hadith-5", "body aches", "Believers are like one body", "Useful for social care and collective responsibility.", "body support community", "https://sunnah.com/bukhari:6011"],
  ["hadith-6", "seeking knowledge", "Seeking knowledge is obligatory", "Supports anti-ignorance and disciplined learning.", "knowledge learning duty", "https://sunnah.com/ibnmajah:224"],
  ["hadith-7", "wonderful affair believer", "The believer's affair can contain good through patience and gratitude", "Useful in resilient coping without denial.", "patience gratitude coping", "https://sunnah.com/muslim:2999"],
  ["hadith-8", "mercy 100 parts", "Mercy was divided into one hundred parts", "Useful in hope, compassion, and non-despair framing.", "mercy hope compassion", "https://sunnah.com/muslim:2752"],
  ["hadith-9", "whoever does not show mercy", "Whoever does not show mercy will not be shown mercy", "Useful against cruelty disguised as righteousness.", "mercy cruelty ethics", "https://sunnah.com/bukhari:5997"],
  ["hadith-10", "be mindful of Allah", "Be mindful of Allah and He will protect you", "Useful in grounding and trust without magical certainty.", "mindfulness trust grounding", "https://sunnah.com/tirmidhi:2516"],
  ["hadith-11", "strong believer", "The strong believer is better and more beloved", "Useful for benefit-seeking, agency, and not giving up.", "strength benefit agency", "https://sunnah.com/muslim:2664"],
  ["hadith-12", "I am as my servant expects", "Allah is as His servant expects of Him", "Useful for hope with responsibility.", "hope trust expectation", "https://sunnah.com/bukhari:6502"],
  ["hadith-13", "do not envy one another", "Do not envy, hate, or turn away from one another", "Useful against toxic rivalry and suspicion.", "envy hate rivalry", "https://sunnah.com/muslim:2564"],
  ["hadith-14", "intentions sincerity", "Intentions define the act", "Useful in checking whether guilt is moral or performative.", "intentions guilt sincerity", "https://sunnah.com/bukhari:1"],
  ["hadith-15", "seeking benefit", "Strive for what benefits you", "Useful in choosing practical routes over paralysis.", "benefit action resilience", "https://sunnah.com/muslim:2664"],
  ["hadith-16", "forbidden oppression", "Oppression is forbidden", "Useful against spiritual abuse and authoritarian misuse of religion.", "oppression abuse power", "https://sunnah.com/muslim:2577"],
  ["hadith-17", "brotherhood kindness", "Believers support one another like one body", "Useful in compassionate peer support.", "brotherhood support empathy", "https://sunnah.com/bukhari:6011"],
  ["hadith-18", "remain silent", "Silence is better than harmful speech", "Useful in rumor control and online reactions.", "silence rumors speech", "https://sunnah.com/bukhari:6018"],
  ["hadith-19", "mercy", "Mercy is central to human treatment", "Useful against harsh preaching and humiliation.", "mercy gentleness ethics", "https://sunnah.com/bukhari:5997"],
  ["hadith-20", "gratitude and patience", "Good can come through gratitude and patience", "Useful in non-catastrophic coping.", "gratitude patience coping", "https://sunnah.com/muslim:2999"],
  ["hadith-21", "knowledge obligation", "Knowledge is a duty", "Useful against lazy certainty and anti-learning culture.", "knowledge duty truth", "https://sunnah.com/ibnmajah:224"],
  ["hadith-22", "ask Allah seek help", "Ask Allah and seek help from Him", "Useful in grounding without erasing planning or referral.", "prayer help trust", "https://sunnah.com/tirmidhi:2516"],
  ["hadith-23", "love and fairness", "Faith includes wanting good for others", "Useful against confirmation bias driven by in-group preference.", "fairness empathy bias", "https://sunnah.com/bukhari:13"],
  ["hadith-24", "expect of Allah", "Hope and expectation need discipline", "Useful against despair and spiritual doom loops.", "hope despair trust", "https://sunnah.com/bukhari:6502"],
];

export const RELIGION_REFERENCE_LIBRARY: ReligiousReference[] = [
  ...QURAN_REFERENCES.map(([id, q, title, why, tags]) => ({
    id,
    module: "religion-hub" as const,
    tradition: "quran" as const,
    title: t(title, title),
    theme: t("Quranic anchor", "مرجع قرآني", "مرجع قرآني"),
    summary: t(`Reference ${q}`, `المرجع ${q}`, `المرجع ${q}`),
    whyRelevant: t(why, why),
    resolve: { type: "ayah" as const, q },
    sourceUrl: `https://quran.com/${q.replace(":", "/")}`,
    tags: tags.split(" "),
  })),
  ...HADITH_REFERENCES.map(([id, q, title, why, tags, sourceUrl]) => ({
    id,
    module: "religion-hub" as const,
    tradition: "hadith" as const,
    title: t(title, title),
    theme: t("Hadith anchor", "مرجع حديثي", "مرجع حديثي"),
    summary: t(`Keyword route: ${q}`, `مسار بالكلمة المفتاحية: ${q}`, `مسار بالكلمة المفتاحية: ${q}`),
    whyRelevant: t(why, why),
    resolve: { type: "search" as const, q },
    sourceUrl,
    tags: tags.split(" "),
  })),
];
