import type { LocalizedText, ModuleId } from "@/data/research/module-briefings";
import { BRAIN_EXERCISES, INSIDER_TRICKS, MYTH_LIBRARY, NEVER_DO_RULES, REAL_SCENARIOS, REVERSE_ENGINEERING_CASES } from "@/data/research/module-libraries";
import { getEvidenceClaimIds } from "./evidence-store";

export type ProtocolKind = "exercises" | "rules" | "myths" | "scenarios" | "tricks" | "reverse";
export type ProtocolFieldType = "boolean" | "scale" | "select" | "textarea";

export interface ProtocolFieldOption {
  value: string;
  label: LocalizedText;
}

export interface ProtocolField {
  id: string;
  type: ProtocolFieldType;
  label: LocalizedText;
  description: LocalizedText;
  min?: number;
  max?: number;
  options?: ProtocolFieldOption[];
}

export interface ExecutableProtocol {
  id: string;
  module: ModuleId;
  kind: ProtocolKind;
  title: LocalizedText;
  summary: LocalizedText;
  goal: LocalizedText;
  decisionLogic: LocalizedText[];
  nextAction: LocalizedText;
  linkedEvidenceClaimIds: string[];
  inputSchema: ProtocolField[];
  outcomes: Array<{
    id: string;
    title: LocalizedText;
    meaning: LocalizedText;
    severity: "low" | "medium" | "high";
    egyptianContext: LocalizedText;
  }>;
}

export interface ProtocolEvaluation {
  protocolId: string;
  score: number;
  outcome: ExecutableProtocol["outcomes"][number];
  reasoning: LocalizedText[];
  nextAction: LocalizedText;
  egyptianContext: LocalizedText;
  linkedEvidenceClaimIds: string[];
}

function t(en: string, ar: string, arEG?: string): LocalizedText {
  return { en, ar, arEG: arEG || ar };
}

function getCollection(kind: ProtocolKind) {
  if (kind === "exercises") return BRAIN_EXERCISES;
  if (kind === "rules") return NEVER_DO_RULES;
  if (kind === "myths") return MYTH_LIBRARY;
  if (kind === "scenarios") return REAL_SCENARIOS;
  if (kind === "tricks") return INSIDER_TRICKS;
  return REVERSE_ENGINEERING_CASES;
}

function getLibraryItem(module: ModuleId, kind: ProtocolKind, id: string) {
  return getCollection(kind).find((item) => item.module === module && item.id === id) ?? null;
}

function getDefaultGoal(module: ModuleId) {
  return module === "deepreal"
    ? t("Turn this item into a defendable verification decision.", "حوّل هذا العنصر إلى قرار تحقق يمكن الدفاع عنه.", "حول الخبر ده لقرار تأكد تقدر تدافع عنه.")
    : module === "mental-health"
      ? t("Turn this item into a safe routing decision.", "حوّل هذا العنصر إلى قرار توجيه آمن.", "حول حالتك لقرار مساعدة آمن.")
      : t("Turn this item into a moderation and boundary decision.", "حوّل هذا العنصر إلى قرار اعتدال وحدود.", "حول الكلام ده لقرار اعتدال وحدود واضحة.");
}

function getDefaultDecisionLogic(module: ModuleId): LocalizedText[] {
  return module === "deepreal"
    ? [
        t("Unknown source plus missing evidence is an automatic hold-or-reject state.", "المصدر المجهول مع غياب الدليل يضع الحالة مباشرة في التوقف أو الرفض.", "مصدر مجهول ومعندكش دليل؟ يبقى توقف الخبر فوراً أو ترفضه."),
        t("Emotional pressure raises the score because urgency is a known manipulation path.", "الضغط العاطفي يرفع الدرجة لأن الاستعجال مسار معروف للتلاعب.", "لو الكلام بيسخنك وبيخليك مستعجل، يبقى غالباً فيه تلاعب."),
        t("Official or scholarly support can lower risk, but never erase missing context.", "الدعم الرسمي أو العلمي قد يخفض الخطر لكنه لا يمحو السياق المفقود.", "وجود جهة رسمية بتقلل الخطر، بس لازم برضه نتأكد من الكلام الناقص."),
      ]
    : module === "mental-health"
      ? [
          t("Immediate danger beats all other logic and triggers urgent routing.", "الخطر الفوري يتغلب على كل منطق آخر ويطلق المسار العاجل.", "الخطر الفوري أهم من أي كلام تاني ولازم تطلب مساعدة فوراً."),
          t("Function loss and duration matter more than labels or vibes.", "تعطل الوظيفة والمدة أهم من الملصقات أو الانطباعات.", "قدرتك على ممارسة حياتك ومدة تعبك أهم بكتير من مسميات الأمراض."),
          t("Trusted support lowers isolation risk but does not replace formal care when severity is high.", "الدعم الموثوق يقلل العزلة لكنه لا يستبدل الرعاية الرسمية عندما تكون الشدة مرتفعة.", "وجود ناس بيحبوك بيساعد، بس لو التعب شديد لازم دكتور متخصص."),
        ]
      : [
          t("Coercion, guilt, and sectarian targeting are escalation markers, not spiritual proof.", "القسر والذنب والاستهداف الطائفي علامات تصعيد وليست دليلاً روحياً.", "الإجبار والذنب والكلام الطائفي دي علامات خطر مش كلام دين."),
          t("Replacing care with religious certainty is a boundary failure.", "استبدال الرعاية بيقين ديني هو فشل في الحدود.", "إنك تسيب العلاج عشان 'كلام ديني' ده غلط كبير في حدود التعامل."),
          t("Official moderation lowers ambiguity but never cancels verification.", "الاعتدال الرسمي يقلل الغموض لكنه لا يلغي التحقق.", "كلام المؤسسات الرسمية بيطمن بس لازم برضه نشغل عقلنا ونتأكد."),
        ];
}

function getDefaultProtocolAction(module: ModuleId, outcomeId: string) {
  if (module === "deepreal") {
    return outcomeId === "reject-share"
      ? t("Do not share. Open the evidence board and archive trace before any further action.", "لا تشارك. افتح لوحة الأدلة وتتبع الأرشيف قبل أي تصرف آخر.", "ماتنشرش الخبر. افتح لوحة الأدلة واتأكد من المصادر الأول.")
      : outcomeId === "hold-cross-check"
        ? t("Cross-check with one fact-check route and one scholarly route, then document your decision.", "قارن بين مسار تحقق صحفي ومسار علمي واحد، ثم وثّق قرارك.", "قارن الخبر بصفحة تأكد وبمصدر علمي، وبعدين قرر.")
        : t("Document the evidence path, then proceed carefully with the verified route.", "وثّق مسار الدليل، ثم تابع بحذر عبر المسار الموثق.", "سجل خطوات تأكدك، وبعدين كمل بحذر مع الخبر اللي اتأكدت منه.");
  }

  if (module === "mental-health") {
    return outcomeId === "formal-support-route"
      ? t("Move to formal support routing and keep official contacts visible while documenting your symptoms and function changes.", "انتقل إلى مسار الدعم الرسمي وأبقِ جهات الاتصال الرسمية ظاهرة أثناء توثيق الأعراض وتعطل الوظيفة.", "روح لمسار الدعم الرسمي وخلي أرقام الطوارئ قدامك وأنت بتسجل حالتك.")
      : t("Use one low-intensity stabilizer, tell one trusted person, and review again if distress rises or persists.", "استخدم أداة تهدئة منخفضة الشدة، وأخبر شخصاً موثوقاً، ثم راجع الحالة إذا ارتفع الضيق أو استمر.", "جرب تمرين تنفس بسيط، كلم حد بتثق فيه، ولو لسه تعبان كلم دكتور.");
  }

  return outcomeId === "block-and-escalate"
    ? t("Stop sharing, move to an official moderation source, and if care is being replaced, open mental-health routing as well.", "أوقف المشاركة وانتقل إلى جهة اعتدال رسمية، وإذا كانت الرعاية تُستبدل فافتح مسار الصحة النفسية أيضاً.", "وقف الشير فوراً، واسمع لرأي مؤسسة رسمية، ولو الكلام بيمنع العلاج روح لدكتور نفسي.")
    : outcomeId === "official-guidance-and-handoff"
      ? t("Use an official moderation route and keep mental-health handoff visible before giving or accepting advice.", "استخدم مسار اعتدال رسمي وأبقِ إحالة الصحة النفسية ظاهرة قبل تقديم النصيحة أو قبولها.", "اسمع لمؤسسة رسمية وخليك فاكر إن العلاج النفسي أساس قبل ما تدي نصيحة لحد.")
      : t("Proceed with calm reflection only while keeping coercion and care boundaries under review.", "تابع التأمل الهادئ فقط مع إبقاء حدود القسر والرعاية قيد المراجعة.", "فكر بهدوء وخليك واعي لو حد بيحاول يسيطر عليك أو يمنعك من العلاج.");
}

function getFieldSet(module: ModuleId): ProtocolField[] {
  if (module === "deepreal") {
    return [
      {
        id: "sourceKnown",
        type: "boolean",
        label: t("Do you know the original source?", "هل تعرف المصدر الأصلي؟", "عارف المصدر الأصلي للخبر؟"),
        description: t("Unknown source chains sharply increase verification risk.", "سلاسل المصدر المجهولة ترفع خطر التحقق بشدة.", "لما تكون مش عارف الخبر جاي منين ده خطر جداً."),
      },
      {
        id: "evidencePresent",
        type: "boolean",
        label: t("Is there direct evidence attached?", "هل توجد أدلة مباشرة مرفقة؟", "فيه دليل حقيقي مع الخبر؟"),
        description: t("Screenshots and quotations without primary evidence count as no.", "اللقطات والاقتباسات بلا دليل أولي تُحسب كأنها لا.", "الصور والكلام من غير لينك لمصدر أصلي مبيتحسبش دليل."),
      },
      {
        id: "emotionalPressure",
        type: "scale",
        label: t("How emotionally pressuring is it?", "ما شدة الضغط العاطفي؟", "الخبر بيسخنك عاطفياً قد إيه؟"),
        description: t("Score from 0 to 10.", "درجة من 0 إلى 10.", "درجة من 0 لـ 10."),
        min: 0,
        max: 10,
      },
      {
        id: "officialMatch",
        type: "boolean",
        label: t("Does an official or scholarly source support it?", "هل يدعمه مصدر رسمي أو علمي؟", "فيه جهة رسمية أو علمية مأكدة الخبر؟"),
        description: t("Use this only after checking the source chain.", "استخدم هذا فقط بعد فحص سلسلة المصدر.", "ماتجاوبش غير لما تتأكد من المصدر الأول."),
      },
      {
        id: "notes",
        type: "textarea",
        label: t("What is missing or suspicious?", "ما الشيء الناقص أو المريب؟", "إيه اللي ناقص أو مش مظبوط في الخبر؟"),
        description: t("Optional note for your decision log.", "ملاحظة اختيارية لسجل القرار.", "ملاحظة زيادة لو حابب."),
      },
    ];
  }

  if (module === "mental-health") {
    return [
      {
        id: "dangerNow",
        type: "boolean",
        label: t("Is there immediate danger now?", "هل يوجد خطر فوري الآن؟", "فيه خطر عليك دلوقتي؟"),
        description: t("Immediate danger overrides all self-help steps.", "الخطر الفوري يتقدم على كل خطوات المساعدة الذاتية.", "لو فيه خطر حقيقي، سيب الأبلكيشن وكلم الطوارئ فوراً."),
      },
      {
        id: "distressLevel",
        type: "scale",
        label: t("Current distress level", "مستوى الضيق الحالي", "تعبان نفسياً قد إيه دلوقتي؟"),
        description: t("Score from 0 to 10.", "درجة من 0 إلى 10.", "درجة من 0 لـ 10."),
        min: 0,
        max: 10,
      },
      {
        id: "functionDrop",
        type: "scale",
        label: t("How much is daily function affected?", "كم تأثرت الوظيفة اليومية؟", "مأثر على يومك وشغلك قد إيه؟"),
        description: t("Score from 0 to 10.", "درجة من 0 إلى 10.", "درجة من 0 لـ 10."),
        min: 0,
        max: 10,
      },
      {
        id: "supportAvailable",
        type: "boolean",
        label: t("Is a trusted person available?", "هل يوجد شخص موثوق متاح؟", "فيه حد بتثق فيه جنبك؟"),
        description: t("Trusted support changes the safest next route.", "الدعم الموثوق يغير المسار التالي الأكثر أماناً.", "وجود حد معاك بيغير طريقة تعاملنا مع الموقف."),
      },
      {
        id: "durationBand",
        type: "select",
        label: t("How long has this been happening?", "منذ متى يحدث هذا؟", "الحالة دي بقالها معاك قد إيه؟"),
        description: t("Longer duration increases formal-support weight.", "المدة الأطول تزيد وزن الإحالة الرسمية.", "كل ما زادت المدة، كل ما كان احتياجك لدكتور أكبر."),
        options: [
          { value: "today", label: t("Today only", "اليوم فقط", "النهاردة بس") },
          { value: "week", label: t("Several days", "عدة أيام", "بقالها كذا يوم") },
          { value: "weeks", label: t("More than two weeks", "أكثر من أسبوعين", "أكتر من أسبوعين") },
        ],
      },
    ];
  }

  return [
    {
      id: "coercion",
      type: "scale",
      label: t("How coercive is the message?", "ما درجة القسر في الرسالة؟", "الرسالة فيها إجبار قد إيه؟"),
      description: t("Score from 0 to 10.", "درجة من 0 إلى 10.", "درجة من 0 لـ 10."),
      min: 0,
      max: 10,
    },
    {
      id: "guilt",
      type: "scale",
      label: t("How strongly does it weaponize guilt?", "ما شدة توظيف الذنب كسلاح؟", "الرسالة بتلعب على إحساسك بالذنب قد إيه؟"),
      description: t("Score from 0 to 10.", "درجة من 0 إلى 10.", "درجة من 0 لـ 10."),
      min: 0,
      max: 10,
    },
    {
      id: "replacesCare",
      type: "boolean",
      label: t("Does it replace medical or psychological care?", "هل يستبدل الرعاية الطبية أو النفسية؟", "الكلام ده بيمنعك تروح لدكتور؟"),
      description: t("Replacing care triggers a higher-risk route.", "استبدال الرعاية يطلق مساراً أعلى خطراً.", "لو الكلام بيمنع العلاج الطبي، يبقى فيه خطر كبير."),
    },
    {
      id: "officialSource",
      type: "boolean",
      label: t("Is the guidance tied to an official moderation source?", "هل التوجيه مرتبط بجهة اعتدال رسمية؟", "التوجيه ده جاي من مؤسسة رسمية معتدلة؟"),
      description: t("Official routing reduces ambiguity, not scrutiny.", "الجهة الرسمية تقلل الغموض لا التدقيق.", "وجود مؤسسة رسمية بيعرفنا إن الكلام مدروس ومعتدل."),
    },
    {
      id: "sectarianTargeting",
      type: "boolean",
      label: t("Does it target a group with hostility?", "هل يستهدف جماعة بعداء؟", "فيه هجوم على طائفة أو جماعة معينة؟"),
      description: t("Sectarian hostility is an escalation trigger.", "العداء الطائفي محفز مباشر للتصعيد.", "الهجوم على الطوائف ده خطر جداً وبيعمل فتنة."),
    },
  ];
}

function getOutcomes(module: ModuleId) {
  if (module === "deepreal") {
    return [
      {
        id: "reject-share",
        title: t("Stop and reject for now", "توقف وارفض حالياً", "وقف الخبر ده فوراً"),
        meaning: t("The signal pattern is too weak or too manipulative to trust.", "نمط الإشارة أضعف أو أكثر تلاعباً من أن يُوثق به.", "الإشارات بتقول إن فيه تلاعب أو الخبر ضعيف جداً."),
        severity: "high" as const,
        egyptianContext: t("Real-world action: Report via Egyptian Fact-Check or IDSC platforms.", "إجراء واقعي: أبلغ عبر منصات 'تأكد' المصرية أو المركز الإعلامي لمجلس الوزراء.", "خطوة عملية: بلغ عن الخبر في صفحة 'تأكد' أو المركز الإعلامي لمجلس الوزراء."),
      },
      {
        id: "hold-cross-check",
        title: t("Hold and cross-check", "توقف وراجع بالمقارنة", "اصبر واتأكد الأول"),
        meaning: t("You need one more official or scholarly confirmation before action.", "تحتاج إلى تأكيد رسمي أو علمي إضافي قبل التصرف.", "محتاج تتأكد من جهة تانية قبل ما تعمل أي حاجة."),
        severity: "medium" as const,
        egyptianContext: t("Real-world action: Search the official Ministry of Health or Education portal depending on the topic.", "إجراء واقعي: ابحث في البوابة الرسمية لوزارة الصحة أو التربية والتعليم حسب الموضوع.", "خطوة عملية: دور في الصفحة الرسمية للوزارة المختصة (صحة، تعليم، تموين) وشوف الكلام ده صح ولا لا."),
      },
      {
        id: "document-trust",
        title: t("Document and proceed carefully", "وثّق وتابع بحذر", "سجل وكمل بحذر"),
        meaning: t("The claim has enough signal to continue, but keep the evidence path visible.", "للدعوى قدر كافٍ من الإشارات للاستمرار، لكن أبقِ مسار الدليل مرئياً.", "الخبر شكله حقيقي بس خليك حذر وعينك على الأدلة."),
        severity: "low" as const,
        egyptianContext: t("Real-world action: If sharing, include the source link and mention it is a verified official update.", "إجراء واقعي: إذا قمت بالمشاركة، أرفق رابط المصدر واذكر أنه تحديث رسمي موثق.", "خطوة عملية: لو هتشير الخبر، حط اللينك الأصلي معاه وقول إن ده خبر رسمي متأكد منه."),
      },
    ];
  }

  if (module === "mental-health") {
    return [
      {
        id: "emergency-route",
        title: t("Emergency / urgent support route", "مسار طارئ / دعم عاجل", "مسار طوارئ ومساعدة فورية"),
        meaning: t("Immediate safety overrides self-help content.", "السلامة الفورية تتقدم على محتوى المساعدة الذاتية.", "أمانك دلوقتي أهم من أي تمارين أو كلام تاني."),
        severity: "high" as const,
        egyptianContext: t("Real-world action: Call 123 (Ambulance) or 08008880700 (National Mental Health Hotline).", "إجراء واقعي: اتصل بـ 123 (الإسعاف) أو 08008880700 (الخط الساخن القومي للصحة النفسية).", "خطوة عملية: كلم 123 فوراً لو فيه خطر، أو كلم الخط الساخن للصحة النفسية (08008880700)."),
      },
      {
        id: "formal-support-route",
        title: t("Formal support route", "مسار دعم رسمي", "مسار دعم متخصص"),
        meaning: t("Symptoms and function loss are strong enough to justify professional help.", "الأعراض وتعطل الوظيفة كافيان لتبرير المساعدة المهنية.", "حالتك محتاجة رأي دكتور متخصص فوراً."),
        severity: "medium" as const,
        egyptianContext: t("Real-world action: Visit the nearest Abbasia or Maadi Mental Health Hospital or a private specialist.", "إجراء واقعي: توجه لأقرب مستشفى للصحة النفسية (العباسية أو المعادي) أو استشر أخصائياً خاصاً.", "خطوة عملية: روح لأقرب مستشفى حكومي (زي العباسية أو الخانكة) أو دكتور متخصص تثق فيه."),
      },
      {
        id: "guided-selfcare",
        title: t("Guided self-care and trusted contact", "رعاية ذاتية موجهة مع شخص موثوق", "اهتمام بالنفس مع حد بتثق فيه"),
        meaning: t("A low-risk, structured next step is reasonable if danger is low.", "الخطوة المنظمة منخفضة الخطورة معقولة إذا كان الخطر منخفضاً.", "ممكن نبدأ بخطوات بسيطة طالما مفيش خطر كبير دلوقتي."),
        severity: "low" as const,
        egyptianContext: t("Real-world action: Practice the 4-7-8 breathing technique and talk to a trusted family member or friend.", "إجراء واقعي: مارس تقنية التنفس 4-7-8 وتحدث مع فرد موثوق من العائلة أو صديق.", "خطوة عملية: جرب تمرين النفس اللي اتعلمته هنا، وكلم حد قريب منك بتثق في رأيه وفضفض معاه."),
      },
    ];
  }

  return [
    {
      id: "block-and-escalate",
      title: t("Block and escalate to moderation", "أوقف وصعّد إلى جهة اعتدال", "وقف وصعد للمسؤولين"),
      meaning: t("The message is coercive or sectarian enough to reject and reroute.", "الرسالة قسرية أو طائفية بدرجة تستدعي الرفض وإعادة التوجيه.", "الرسالة دي فيها تطرف أو إجبار ولازم ترفضها فوراً."),
      severity: "high" as const,
      egyptianContext: t("Real-world action: Report to the Egyptian Dar al-Ifta or the Cybercrime Unit (108).", "إجراء واقعي: أبلغ دار الإفتاء المصرية أو مباحث الإنترنت (108).", "خطوة عملية: بلغ دار الإفتاء المصرية لو فيه تطرف، أو كلم مباحث الإنترنت على 108 لو فيه تهديد."),
    },
    {
      id: "official-guidance-and-handoff",
      title: t("Official guidance plus MH handoff", "توجيه رسمي مع إحالة للصحة النفسية", "توجيه رسمي ومساعدة نفسية"),
      meaning: t("This requires formal moderation and visible care boundaries.", "هذه الحالة تحتاج اعتدالاً رسمياً وحدوداً واضحة للرعاية.", "الموقف ده محتاج رأي رسمي وحدود واضحة عشان تحمي نفسك."),
      severity: "medium" as const,
      egyptianContext: t("Real-world action: Use the official Dar al-Ifta app (Fatwa Pro) and cross-check with a licensed psychologist.", "إجراء واقعي: استخدم تطبيق دار الإفتاء الرسمي (Fatwa Pro) وقارن الفتوى برأي أخصائي نفسي مرخص.", "خطوة عملية: اسأل في تطبيق دار الإفتاء (فتاوى برو) واتأكد إن الكلام مش بيأثر على صحتك النفسية بمساعدة مختص."),
    },
    {
      id: "safe-reflection",
      title: t("Safe reflection route", "مسار تأمل آمن", "مسار تفكير هادي وآمن"),
      meaning: t("The content can be handled with calm reflection while keeping boundaries visible.", "يمكن التعامل مع المحتوى بتأمل هادئ مع إبقاء الحدود مرئية.", "ممكن تفكر في الكلام ده بهدوء بس خليك عارف حدودك."),
      severity: "low" as const,
      egyptianContext: t("Real-world action: Read official scholarly publications from Al-Azhar or Ministry of Awqaf.", "إجراء واقعي: اقرأ المنشورات العلمية الرسمية من الأزهر الشريف أو وزارة الأوقاف.", "خطوة عملية: اقرأ الكتب أو المقالات الرسمية اللي طالعة من الأزهر أو وزارة الأوقاف عشان تطمن."),
    },
  ];
}

export function getProtocolDefinition(module: ModuleId, kind: ProtocolKind, id: string): ExecutableProtocol | null {
  const item = getLibraryItem(module, kind, id);
  if (!item) {
    return null;
  }

  const logic = item.decisionLogic ?? getDefaultDecisionLogic(module);
  const linkedEvidenceClaimIds = item.linkedEvidenceClaimIds?.length ? item.linkedEvidenceClaimIds : getEvidenceClaimIds(module);

  return {
    id: `${module}:${kind}:${id}`,
    module,
    kind,
    title: item.title,
    summary: item.summary,
    goal: item.goal ?? getDefaultGoal(module),
    decisionLogic: logic,
    nextAction: item.protocolNextAction ?? item.action,
    linkedEvidenceClaimIds,
    inputSchema: getFieldSet(module),
    outcomes: getOutcomes(module),
  };
}

function readBoolean(inputs: Record<string, unknown>, key: string) {
  return Boolean(inputs[key]);
}

function readNumber(inputs: Record<string, unknown>, key: string) {
  const value = inputs[key];
  return typeof value === "number" ? value : Number(value ?? 0);
}

function readString(inputs: Record<string, unknown>, key: string) {
  const value = inputs[key];
  return typeof value === "string" ? value : "";
}

export function evaluateProtocol(module: ModuleId, kind: ProtocolKind, id: string, inputs: Record<string, unknown>): ProtocolEvaluation | null {
  const protocol = getProtocolDefinition(module, kind, id);
  if (!protocol) {
    return null;
  }

  const reasoning: LocalizedText[] = [];
  let score = 0;

  if (module === "deepreal") {
    const sourceKnown = readBoolean(inputs, "sourceKnown");
    const evidencePresent = readBoolean(inputs, "evidencePresent");
    const emotionalPressure = readNumber(inputs, "emotionalPressure");
    const officialMatch = readBoolean(inputs, "officialMatch");

    if (!sourceKnown) {
      score += 4;
      reasoning.push(t("The original source is missing, which is one of the strongest verification red flags.", "المصدر الأصلي مفقود، وهذه من أقوى العلامات الحمراء في التحقق.", "المصدر الأصلي مش موجود، ودي أكبر علامة إن الكلام ممكن يكون كدب."));
    }

    if (!evidencePresent) {
      score += 4;
      reasoning.push(t("There is no direct evidence attached, so screenshots or quotes are carrying too much weight.", "لا يوجد دليل مباشر مرفق، ما يعني أن اللقطات أو الاقتباسات تحمل وزناً أكبر من اللازم.", "مفيش دليل حقيقي، والصور اللي متصورة من الشاشة مش دليل كافي."));
    }

    score += Math.round(emotionalPressure / 3);
    if (emotionalPressure >= 7) {
      reasoning.push(t("High emotional pressure suggests urgency is being used as a manipulation channel.", "الضغط العاطفي المرتفع يوحي بأن الاستعجال يُستخدم كقناة للتلاعب.", "الخبر بيسخن المشاعر، وده غالباً معناه إن فيه محاولة لتغييب عقلك."));
    }

    if (officialMatch) {
      score -= 2;
      reasoning.push(t("Official or scholarly support lowers risk, but does not erase missing context.", "الدعم الرسمي أو العلمي يخفض الخطر لكنه لا يمحو السياق المفقود.", "وجود جهة رسمية بيطمن شوية، بس لازم برضه نكون حذرين."));
    }

    const outcome = score >= 7 ? protocol.outcomes[0] : score >= 4 ? protocol.outcomes[1] : protocol.outcomes[2];
    return {
      protocolId: protocol.id,
      score,
      outcome,
      reasoning,
      nextAction: protocol.nextAction ?? getDefaultProtocolAction(module, outcome.id),
      egyptianContext: outcome.egyptianContext,
      linkedEvidenceClaimIds: protocol.linkedEvidenceClaimIds,
    };
  }

  if (module === "mental-health") {
    const dangerNow = readBoolean(inputs, "dangerNow");
    const distressLevel = readNumber(inputs, "distressLevel");
    const functionDrop = readNumber(inputs, "functionDrop");
    const supportAvailable = readBoolean(inputs, "supportAvailable");
    const durationBand = readString(inputs, "durationBand");

    if (dangerNow) {
      reasoning.push(t("Immediate danger overrides all lower-intensity tools.", "الخطر الفوري يتقدم على كل الأدوات الأقل شدة.", "الخطر الفوري أهم من أي كلام تاني ولازم تطلب مساعدة فوراً."));
      return {
        protocolId: protocol.id,
        score: 10,
        outcome: protocol.outcomes[0],
        reasoning,
        nextAction: protocol.nextAction ?? t("Use crisis or urgent support routes now. Do not stay inside educational content.", "استخدم مسارات الدعم الطارئ أو العاجل الآن. لا تبق داخل المحتوى التعليمي.", "كلم الطوارئ أو مسار الدعم العاجل دلوقتي، ما تضيعش وقت هنا."),
        egyptianContext: protocol.outcomes[0].egyptianContext,
        linkedEvidenceClaimIds: protocol.linkedEvidenceClaimIds,
      };
    }

    score += Math.round(distressLevel / 2);
    score += Math.round(functionDrop / 3);
    if (durationBand === "weeks") {
      score += 2;
      reasoning.push(t("The issue has persisted long enough to justify formal support weight.", "استمرت الحالة زمناً يكفي لإعطاء وزن أعلى للدعم الرسمي.", "الحالة بقالها فترة طويلة وده بيخلينا نرجح إنك محتاج مساعدة متخصص."));
    }
    if (!supportAvailable) {
      score += 1;
      reasoning.push(t("Low trusted support increases isolation risk.", "انخفاض الدعم الموثوق يرفع خطر العزلة.", "إنك لوحدك ده بيزود خطر الموقف عليك."));
    }

    const outcome = score >= 8 ? protocol.outcomes[1] : protocol.outcomes[2];
    return {
      protocolId: protocol.id,
      score,
      outcome,
      reasoning,
      nextAction: protocol.nextAction ?? getDefaultProtocolAction(module, outcome.id),
      egyptianContext: outcome.egyptianContext,
      linkedEvidenceClaimIds: protocol.linkedEvidenceClaimIds,
    };
  }

  const coercion = readNumber(inputs, "coercion");
  const guilt = readNumber(inputs, "guilt");
  const replacesCare = readBoolean(inputs, "replacesCare");
  const officialSource = readBoolean(inputs, "officialSource");
  const sectarianTargeting = readBoolean(inputs, "sectarianTargeting");

  score += Math.round(coercion / 2);
  score += Math.round(guilt / 3);
  if (replacesCare) {
    score += 3;
    reasoning.push(t("Replacing care with religious certainty is a direct boundary failure.", "استبدال الرعاية بيقين ديني هو فشل مباشر في الحدود.", "إنك تسيب العلاج عشان يقين ديني ده خطر كبير على حدود سلامتك."));
  }
  if (sectarianTargeting) {
    score += 4;
    reasoning.push(t("Sectarian targeting is a direct escalation trigger, not a minor disagreement.", "الاستهداف الطائفي محفز مباشر للتصعيد وليس خلافاً بسيطاً.", "الهجوم على الطوائف بيعمل فتنة ومحفز كبير للمشاكل."));
  }
  if (!officialSource) {
    score += 1;
    reasoning.push(t("The lack of official moderation routing increases ambiguity and risk.", "غياب جهة الاعتدال الرسمية يزيد الغموض والخطر.", "غياب الرأي الرسمي المعتدل بيخلي الموقف مريب وأخطر."));
  }

  const outcome = score >= 8 ? protocol.outcomes[0] : score >= 4 ? protocol.outcomes[1] : protocol.outcomes[2];
  return {
    protocolId: protocol.id,
    score,
    outcome,
    reasoning,
    nextAction: protocol.nextAction ?? getDefaultProtocolAction(module, outcome.id),
    egyptianContext: outcome.egyptianContext,
    linkedEvidenceClaimIds: protocol.linkedEvidenceClaimIds,
  };
}
