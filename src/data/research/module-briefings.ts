export type ModuleId = "deepreal" | "mental-health" | "religion-hub";

export interface LocalizedText {
  en: string;
  ar: string;
  arEG: string;
}

export interface WorkflowStep {
  id: string;
  order: number;
  title: LocalizedText;
  description: LocalizedText;
  when: LocalizedText;
  action: LocalizedText;
}

export interface ComparisonMetric {
  id: string;
  label: LocalizedText;
  unit: string;
  global: number;
  egypt: number;
  source: string;
}

export interface ModuleBriefing {
  module: ModuleId;
  title: LocalizedText;
  subtitle: LocalizedText;
  mission: LocalizedText;
  workflow: WorkflowStep[];
  metrics: ComparisonMetric[];
}

function t(en: string, ar: string, arEG: string): LocalizedText {
  return { en, ar, arEG };
}

export const MODULE_BRIEFINGS: Record<ModuleId, ModuleBriefing> = {
  deepreal: {
    module: "deepreal",
    title: t("DeepReal command center", "مركز قيادة الحقيقة العميقة", "مركز قيادة ديب ريل"),
    subtitle: t(
      "Scientific verification flow for misinformation, evidence, and trust.",
      "مسار علمي للتحقق من التضليل والدليل والثقة.",
      "نظام عملي عشان تتأكد من الكلام وتكشف الإشاعات."
    ),
    mission: t(
      "Move from reaction to verification: inspect the claim, inspect the source, compare with evidence, then decide.",
      "انتقل من رد الفعل إلى التحقق: افحص الادعاء ثم المصدر ثم قارنه بالدليل ثم قرر.",
      "ماتصدقش أي حاجة وخلاص: افحص الكلام، وشوف مين اللي قاله، وقارنه بالأدلة، وبعدين قرر."
    ),
    workflow: [
      {
        id: "triage",
        order: 1,
        title: t("Triage the claim", "فرز الادعاء", "صنّف الادعاء"),
        description: t(
          "Classify whether the item is a headline, image, authority claim, or emotional rumor before you touch tools.",
          "صنف المحتوى أولاً: عنوان أم صورة أم ادعاء سلطة أم شائعة عاطفية قبل استخدام أي أداة.",
          "شوف الأول ده خبر ولا صورة ولا كلام منسوب لحد ولا مجرد إشاعة بتلعب على المشاعر."
        ),
        when: t("Use first, within 30 seconds of exposure.", "استخدمه أولاً خلال 30 ثانية من التعرض.", "أول ما تشوف الخبر، في أول 30 ثانية."),
        action: t("Name the risk and open the matching scenario drill.", "سم الخطر وافتح سيناريو التدريب المطابق.", "حدد نوع الخطر وابدأ التدريب اللي زيه."),
      },
      {
        id: "trace",
        order: 2,
        title: t("Trace the source", "تتبع المصدر", "دوّر ورا المصدر"),
        description: t(
          "Find the original post, institution, or paper instead of trusting screenshots or forwarded text.",
          "اعثر على المنشور أو المؤسسة أو الورقة الأصلية بدل الثقة في لقطات الشاشة أو الرسائل المحولة.",
          "هات أصل الكلام، المؤسسة أو البحث اللي نُشر فيه، وماتعتمدش على السكرين شوتس."
        ),
        when: t("After triage, before sharing.", "بعد الفرز وقبل المشاركة.", "بعد ما تصنفه وقبل ما تبعته لحد."),
        action: t("Open evidence search and compare two source types.", "افتح بحث الأدلة وقارن بين نوعين من المصادر.", "افتح صفحة الأدلة وقارن بين مصدرين مختلفين."),
      },
      {
        id: "cross-check",
        order: 3,
        title: t("Cross-check the evidence", "مقارنة الأدلة", "قارن الأدلة ببعض"),
        description: t(
          "Triangulate official, academic, and fact-check coverage, then log what agrees and what conflicts.",
          "قارن بين التغطية الرسمية والأكاديمية والتحقق الصحفي ثم سجل ما يتفق وما يتعارض.",
          "شوف المصادر الرسمية والأبحاث ومواقع التحقق قالوا إيه، وشوف إيه اللي راكب على بعضه وإيه اللي لأ."
        ),
        when: t("Use when the claim feels urgent or emotionally loaded.", "استخدمه عندما يبدو الادعاء عاجلاً أو مشحوناً عاطفياً.", "لو الكلام سخن أو بيخوفك أو بيحمسك بزيادة."),
        action: t("Work through one myth, one rule, and one scenario before deciding.", "مر على خرافة واحدة وقاعدة واحدة وسيناريو واحد قبل اتخاذ القرار.", "شوف خرافة وقاعدة وسيناريو قبل ما تاخد قرارك النهائي."),
      },
      {
        id: "decide",
        order: 4,
        title: t("Decide and document", "اتخذ القرار ووثقه", "قرر ووثّق اللي وصلتله"),
        description: t(
          "Choose one of three outcomes: trust, hold, or reject, and write why.",
          "اختر واحدة من ثلاث نتائج: الثقة أو التوقف أو الرفض، ثم اكتب السبب.",
          "اختار حاجة من تلاتة: تصدق، ولا تستنى، ولا ترفض، واكتب ليه عملت كده."
        ),
        when: t("After evidence review, before action.", "بعد مراجعة الأدلة وقبل التصرف.", "بعد ما تخلص مراجعة وقبل ما تعمل أي حاجة."),
        action: t("Mark the step complete and store the decision path.", "أكمل الخطوة واحفظ مسار القرار.", "خلّص الخطوة واحفظ الطريق اللي مشيت فيه للقرار."),
      },
    ],
    metrics: [
      { id: "risk", label: t("Short-term risk ranking", "ترتيب الخطر قصير المدى", "ترتيب الخطر قريب المدى"), unit: "rank", global: 1, egypt: 1, source: "WEF 2024 + project local risk framing" },
      { id: "cyber-safety", label: t("Children exposed to online rumor risk", "الأطفال المعرضون لمخاطر الشائعات عبر الإنترنت", "الأطفال اللي بيواجهوا إشاعات أونلاين"), unit: "%", global: 62, egypt: 74, source: "UNICEF digital-safety framing" },
      { id: "verification-gap", label: t("People who share before checking", "أشخاص يشاركون قبل التحقق", "الناس اللي بتشير قبل ما تتأكد"), unit: "%", global: 55, egypt: 67, source: "Project evidence model" },
    ],
  },
  "mental-health": {
    module: "mental-health",
    title: t("Mental Health command center", "مركز قيادة الصحة النفسية", "مركز قيادة الصحة النفسية"),
    subtitle: t(
      "Safety-first literacy flow for recognition, support, and referral.",
      "مسار توعية آمن للتعرف والدعم والإحالة.",
      "طريق آمن عشان تفهم مشاعرك وتعرف تروح لمين."
    ),
    mission: t(
      "Help the user separate emotion, symptom, diagnosis, and next support route without self-harm or self-diagnosis traps.",
      "مساعدة المستخدم على فصل الشعور عن العرض عن التشخيص عن مسار الدعم التالي بدون فخ إيذاء النفس أو التشخيص الذاتي.",
      "عشان تفرق بين مجرد شعور، وبين عرض مرضي، وبين تشخيص حقيقي، وتعرف تروح لمين صح من غير ما تظلم نفسك."
    ),
    workflow: [
      {
        id: "stabilize",
        order: 1,
        title: t("Stabilize the moment", "تثبيت اللحظة", "ثبّت نفسك دلوقتي"),
        description: t(
          "Start with distress level, safety, and immediate support before teaching concepts.",
          "ابدأ بدرجة الضيق والسلامة والدعم الفوري قبل تعليم المفاهيم.",
          "ابدأ بإنك تهدي نفسك وتتأكد إنك في أمان، وبعدين نبقى نفهم المفاهيم."
        ),
        when: t("Use first if the user feels overwhelmed.", "استخدمه أولاً إذا كان المستخدم يشعر بالانهيار.", "أول حاجة لو حاسس إنك مضغوط جداً ومش قادر."),
        action: t("Open the support path and one low-intensity exercise.", "افتح مسار الدعم وتمريناً منخفض الشدة.", "افتح مسار الدعم واعمل تمرين بسيط يهدي الأعصاب."),
      },
      {
        id: "label",
        order: 2,
        title: t("Label what this is", "سم ما يحدث", "سمّي اللي بيحصلك"),
        description: t(
          "Differentiate stress, sadness, panic, burnout, and clinical warning signs using plain definitions.",
          "ميز بين الضغط والحزن والهلع والاحتراق وعلامات الخطر الإكلينيكي باستخدام تعريفات واضحة.",
          "فرّق بين التوتر العادي، الحزن، الهلع، والاحتراق النفسي بتعريفات بسيطة."
        ),
        when: t("After immediate safety is clear.", "بعد وضوح السلامة الفورية.", "بعد ما تتأكد إنك هديت وفي أمان."),
        action: t("Compare one definition card and one myth autopsy.", "قارن بين بطاقة تعريف واحدة وتشريح خرافة واحدة.", "شوف تعريف واحد وشوف إشاعة مشهورة وردها إيه."),
      },
      {
        id: "navigate",
        order: 3,
        title: t("Choose the safest next route", "اختر المسار التالي الأكثر أماناً", "اختار الطريق الأأمن ليك"),
        description: t(
          "Guide the user toward self-care, trusted contact, or formal support based on severity.",
          "وجه المستخدم نحو الرعاية الذاتية أو الشخص الموثوق أو الدعم الرسمي حسب الشدة.",
          "شوف لو محتاج مجرد رعاية ذاتية، ولا تتكلم مع حد بتثق فيه، ولا تروح لمتخصص."
        ),
        when: t("Use before the user leaves the page.", "استخدمه قبل مغادرة المستخدم للصفحة.", "قبل ما تقفل الصفحة دي."),
        action: t("Complete the decision flow and log the selected route.", "أكمل مسار القرار وسجل المسار المختار.", "خلّص خطوات القرار واعرف إيه الطريق اللي اخترته."),
      },
      {
        id: "train",
        order: 4,
        title: t("Train the daily habit", "درب العادة اليومية", "عوّد نفسك كل يوم"),
        description: t(
          "Reinforce emotional awareness, stigma reduction, and help-seeking discipline with repeatable drills.",
          "عزز الوعي العاطفي وتقليل الوصمة والانضباط في طلب المساعدة من خلال تدريبات متكررة.",
          "قوّي وعيك بمشاعرك، وقلل الخوف من كلام الناس، واتعلم إزاي تطلب المساعدة صح."
        ),
        when: t("Use after the route is clear.", "استخدمه بعد وضوح المسار.", "بعد ما تعرف طريقك بوضوح."),
        action: t("Mark one exercise, one rule, and one scenario as reviewed today.", "علّم تمريناً واحداً وقاعدة واحدة وسيناريو واحداً كمراجعة اليوم.", "خلّص تمرين وقاعدة وسيناريو النهاردة."),
      },
    ],
    metrics: [
      { id: "burden", label: t("People living with mental conditions", "أشخاص يعيشون مع حالات نفسية", "ناس بيعانوا من حالات نفسية"), unit: "millions", global: 1000, egypt: 19, source: "WHO + project Egypt estimate band" },
      { id: "treatment-gap", label: t("Treatment gap", "فجوة العلاج", "فجوة العلاج"), unit: "%", global: 56, egypt: 84, source: "WHO EMRO framing" },
      { id: "violent-discipline", label: t("Children exposed to violent discipline", "أطفال تعرضوا لعنف تربوي", "أطفال اتعرضوا لعنف في التربية"), unit: "%", global: 70, egypt: 93, source: "UNICEF Egypt DHS citation" },
    ],
  },
  "religion-hub": {
    module: "religion-hub",
    title: t("Religion Hub command center", "مركز قيادة المحور الديني", "مركز قيادة المحور الديني"),
    subtitle: t(
      "Moderation-first flow for safe coping, verification, and boundaries.",
      "مسار يقدّم الاعتدال أولاً من أجل التكيف الآمن والتحقق والحدود.",
      "طريق بيعلّمك الاعتدال عشان ترتاح نفسياً ودينياً بحدود صحية."
    ),
    mission: t(
      "Support meaning and peace without sectarian escalation, coercive guilt, or replacing professional care.",
      "دعم المعنى والسلام دون تصعيد طائفي أو ذنب قهري أو استبدال الرعاية المهنية.",
      "عشان تلاقي معنى وسلام من غير تعصب أو إحساس بالذنب ملوش لزمة، ومن غير ما تستغنى عن الطب."
    ),
    workflow: [
      {
        id: "frame",
        order: 1,
        title: t("Frame the question safely", "ضع السؤال في إطار آمن", "حط السؤال في إطار صح"),
        description: t(
          "Decide whether the issue is about coping, rumor, guilt, or formal religious guidance.",
          "حدد هل القضية تتعلق بالتكيف أو الشائعة أو الشعور بالذنب أو التوجيه الديني الرسمي.",
          "شوف الموضوع ده له علاقة براحتك النفسية، ولا إشاعة، ولا شعور بالذنب، ولا فتوى رسمية."
        ),
        when: t("Use at the start of every religion-linked concern.", "استخدمه في بداية كل مسألة مرتبطة بالدين.", "في بداية أي حاجة ليها علاقة بالدين."),
        action: t("Select the concern type before reading answers.", "اختر نوع المسألة قبل قراءة الإجابات.", "حدد نوع المشكلة قبل ما تقرأ أي ردود."),
      },
      {
        id: "moderate",
        order: 2,
        title: t("Apply moderation checks", "طبق فحوص الاعتدال", "شوف الكلام ده معتدل ولا لأ"),
        description: t(
          "Check for absolutism, sectarian contempt, fake certainty, and shame-based control.",
          "افحص وجود الإطلاقية والاحتقار الطائفي واليقين الزائف والتحكم القائم على العار.",
          "شوف لو في تعصب، أو تقليل من حد تاني، أو وعود وهمية، أو تحكم عن طريق التخويف."
        ),
        when: t("Use whenever content sounds morally absolute.", "استخدمه عندما يبدو المحتوى حاسماً أخلاقياً بشكل مطلق.", "لو حسيت الكلام فيه لهجة حادة أو تعصب أعمى."),
        action: t("Open the red flags and one reverse-engineering scenario.", "افتح العلامات الحمراء وسيناريو هندسة عكسية واحد.", "شوف العلامات الحمرا وحالة تحليل لإشاعة دينية."),
      },
      {
        id: "route",
        order: 3,
        title: t("Route to the right support", "وجّه إلى الدعم المناسب", "روح للمكان الصح"),
        description: t(
          "Distinguish personal reflection, trusted moderation source, and mental-health referral.",
          "فرّق بين التأمل الشخصي والمصدر المعتدل الموثوق والإحالة للصحة النفسية.",
          "فرّق بين مجرد تفكيرك الشخصي، وبين مصدر ديني موثوق، وبين إنك محتاج دكتور نفساني."
        ),
        when: t("Use before any strong recommendation.", "استخدمه قبل أي توصية قوية.", "قبل ما تاخد أي نصيحة على إنها حقيقة مطلقة."),
        action: t("Save the route so the user knows exactly where to go next.", "احفظ المسار حتى يعرف المستخدم بدقة أين يذهب بعد ذلك.", "احفظ المسار عشان تعرف خطوتك الجاية فين بالظبط."),
      },
      {
        id: "practice",
        order: 4,
        title: t("Practice peaceful coping", "تدرب على التكيف السلمي", "اتعلم التكيف الهادي"),
        description: t(
          "Reinforce positive coping, boundary setting, and calm verification through drills.",
          "عزز التكيف الإيجابي ووضع الحدود والتحقق الهادئ من خلال تدريبات عملية.",
          "قوّي قدرتك على الصبر والهدوء النفسي، وحط حدود تحميك، واتعلم تتأكد بهدوء."
        ),
        when: t("Use after the risk is framed and the route is chosen.", "استخدمه بعد تحديد الخطر واختيار المسار.", "بعد ما تحدد الخطر وتعرف طريقك."),
        action: t("Complete one coping exercise and one myth reversal case.", "أكمل تمرين تكيف واحداً وحالة عكس خرافة واحدة.", "خلّص تمرين تكيف واحد وحالة كشف إشاعة دينية."),
      },
    ],
    metrics: [
      { id: "restrictions", label: t("Religion restriction pressure", "ضغط القيود الدينية", "ضغط القيود الدينية"), unit: "index", global: 58, egypt: 82, source: "Pew comparative framing" },
      { id: "moderation-need", label: t("Need for moderation routes", "الحاجة إلى مسارات اعتدال", "الحاجة لمسارات اعتدال"), unit: "%", global: 49, egypt: 71, source: "Project moderation model" },
      { id: "support-overlap", label: t("Cases needing MH + RH handoff", "حالات تحتاج إحالة بين الصحة النفسية والدين", "حالات محتاجة ربط بين الصحة النفسية والدين"), unit: "%", global: 22, egypt: 31, source: "Project support overlap estimate" },
    ],
  },
};

