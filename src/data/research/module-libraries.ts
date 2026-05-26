import type { LocalizedText, ModuleId } from "./module-briefings";
import { AUTHORED_BRAIN_EXERCISES, AUTHORED_BRAIN_EXERCISES_EXTENDED, AUTHORED_MYTHS, AUTHORED_REVERSE_CASES, AUTHORED_SCENARIOS, AUTHORED_SCENARIOS_EXTENDED, AUTHORED_TRICKS, AUTHORED_TRICKS_EXTENDED } from "./authored-casebook";

export interface ModuleLibraryItem {
  id: string;
  module: ModuleId;
  title: LocalizedText;
  summary: LocalizedText;
  action: LocalizedText;
  intensity: "low" | "medium" | "high";
  tags: string[];
  goal?: LocalizedText;
  decisionLogic?: LocalizedText[];
  protocolNextAction?: LocalizedText;
  linkedEvidenceClaimIds?: string[];
  priority?: "egypt-critical" | "global-critical" | "high-need";
  contentOrigin?: "authored" | "generated";
}

function t(en: string, ar: string, arEG: string): LocalizedText {
  return { en, ar, arEG };
}

function buildLibrary(
  module: ModuleId,
  prefix: string,
  count: number,
  templates: Array<{
    title: [string, string, string];
    summary: [string, string, string];
    action: [string, string, string];
    intensity: "low" | "medium" | "high";
    tags: string[];
  }>
): ModuleLibraryItem[] {
  return Array.from({ length: count }, (_, index) => {
    const template = templates[index % templates.length];
    return {
      id: `${prefix}-${index + 1}`,
      module,
      title: t(`${template.title[0]} ${index + 1}`, `${template.title[1]} ${index + 1}`, `${template.title[2]} ${index + 1}`),
      summary: t(template.summary[0], template.summary[1], template.summary[2]),
      action: t(template.action[0], template.action[1], template.action[2]),
      intensity: template.intensity,
      tags: template.tags,
      contentOrigin: "generated",
    };
  });
}

export const BRAIN_EXERCISES = [
  ...AUTHORED_BRAIN_EXERCISES,
  ...AUTHORED_BRAIN_EXERCISES_EXTENDED,
  ...buildLibrary("deepreal", "brain-dr", 36, [
    { 
      title: ["Claim triage drill", "تمرين فرز الادعاء", "تمرين فرز الكلام"], 
      summary: ["Practice naming the claim type before checking truth.", "تدرب على تسمية نوع الادعاء قبل فحص صدقه.", "اتعلم إزاي تصنف الخبر قبل ما تدور وراه."], 
      action: ["Open one rumor and classify it in under 30 seconds.", "افتح شائعة واحدة وصنفها خلال أقل من 30 ثانية.", "افتح إشاعة وصنفها في أقل من 30 ثانية."], 
      intensity: "low", tags: ["triage", "logic"] 
    },
    { 
      title: ["Lateral reading sprint", "سباق القراءة الجانبية", "تحدي القراءة السريعة"], 
      summary: ["Train yourself to leave the page and inspect the source first.", "درّب نفسك على مغادرة الصفحة وفحص المصدر أولاً.", "عود نفسك تخرج من الصفحة وتتأكد من المصدر الأول."], 
      action: ["Open two external confirmations before forming judgment.", "افتح مصدرين خارجيين قبل تكوين الحكم.", "شوف مصدرين تانين قبل ما تقرر الخبر صح ولا غلط."], 
      intensity: "medium", tags: ["source", "verification"] 
    },
    { 
      title: ["Manipulation pause", "توقف التلاعب", "وقفة ضد التلاعب"], 
      summary: ["Interrupt urgency and emotional pressure before sharing.", "أوقف الاستعجال والضغط العاطفي قبل المشاركة.", "وقف الاستعجال والضغط العصبي قبل ما تبعت الخبر لأي حد."], 
      action: ["Write the emotion, then write the missing evidence.", "اكتب الشعور ثم اكتب الدليل المفقود.", "حدد إيه اللي حاسس بيه، وبعدين حدد إيه الدليل اللي ناقص."], 
      intensity: "low", tags: ["emotion", "friction"] 
    },
  ]),
  ...buildLibrary("mental-health", "brain-mh", 36, [
    { 
      title: ["Emotion labeling drill", "تمرين تسمية المشاعر", "تمرين تسمية مشاعرك"], 
      summary: ["Separate feeling, trigger, and body signal in one short pass.", "افصل بين الشعور والمحفز والإشارة الجسدية في مرور قصير.", "فرق بين الشعور، والسبب، وعلامات جسمك في ثواني."], 
      action: ["Name one feeling and one body cue before reading advice.", "سم شعوراً واحداً وإشارة جسدية واحدة قبل قراءة النصيحة.", "قول حاسس بإيه وجسمك بيقولك إيه قبل ما تسمع أي نصيحة."], 
      intensity: "low", tags: ["emotion", "awareness"] 
    },
    { 
      title: ["Support routing drill", "تمرين توجيه الدعم", "تمرين تدوير الدعم"], 
      summary: ["Practice choosing between self-care, trusted contact, and formal help.", "تدرب على الاختيار بين الرعاية الذاتية والشخص الموثوق والمساعدة الرسمية.", "اتمرن تختار بين إنك تهتم بنفسك، تكلم حد بتثق فيه، أو تطلب مساعدة رسمية."], 
      action: ["Review one scenario and assign the safest route.", "راجع سيناريو واحداً وحدد المسار الأكثر أماناً.", "شوف حالة واحدة واختار الطريق الأأمن ليها."], 
      intensity: "medium", tags: ["support", "routing"] 
    },
    { 
      title: ["Stigma interruption", "قطع الوصمة", "كسر كلام الناس"], 
      summary: ["Catch one stigmatizing phrase and rewrite it into safe language.", "التقط عبارة وصمية واحدة وأعد صياغتها بلغة آمنة.", "قفش جملة فيها تنمر أو وصمة وصلحها بكلام أأمن."], 
      action: ["Turn one harmful sentence into a help-seeking sentence.", "حوّل جملة ضارة إلى جملة تشجع طلب المساعدة.", "حول جملة مضرة لجملة بتشجع على طلب المساعدة."], 
      intensity: "medium", tags: ["stigma", "language"] 
    },
  ]),
  ...buildLibrary("religion-hub", "brain-rh", 36, [
    { 
      title: ["Moderation check drill", "تمرين فحص الاعتدال", "تمرين كشف التطرف"], 
      summary: ["Inspect whether advice is peaceful, bounded, and non-coercive.", "افحص هل النصيحة سلمية ومنضبطة وغير قسرية.", "شوف لو النصيحة دي هادية، ليها حدود، ومفيهاش إجبار."], 
      action: ["Rate one message for absolutism, shame, and escalation.", "قيّم رسالة واحدة من حيث الإطلاقية والعار والتصعيد.", "قيم الرسالة وشوف فيها تعصب، تخويف، أو تسخين."], 
      intensity: "medium", tags: ["moderation", "boundaries"] 
    },
    { 
      title: ["Coping clarity drill", "تمرين وضوح التكيف", "تمرين وضوح الراحة"], 
      summary: ["Separate spiritual comfort from clinical or legal claims.", "افصل بين السكينة الروحية والادعاءات العلاجية أو القانونية.", "فرق بين الراحة النفسية والدينية، وبين العلاج الطبي أو القانون."], 
      action: ["Mark which part is comfort and which part needs another authority.", "حدد ما هو دعم روحي وما يحتاج جهة أخرى.", "حدد إيه الجزء الديني وإيه الجزء اللي محتاج دكتور أو متخصص."], 
      intensity: "low", tags: ["coping", "clarity"] 
    },
    { 
      title: ["Sectarian friction drill", "تمرين تعطيل الطائفية", "تمرين فك التعصب"], 
      summary: ["Slow down content that tries to make you morally hostile.", "أبطئ المحتوى الذي يحاول دفعك إلى العداء الأخلاقي.", "وقف الكلام اللي بيحاول يخليك تكره غيرك."], 
      action: ["Identify one hostile cue and route it to a moderation source.", "حدد إشارة عدائية واحدة ووجّهها إلى مصدر اعتدال.", "طلع أي كلمة فيها كراهية وروح لمصدر معتدل."], 
      intensity: "high", tags: ["sectarian", "safety"] 
    },
  ]),
];


export const NEVER_DO_RULES = [
  ...buildLibrary("deepreal", "rule-dr", 40, [
    { 
      title: ["Never trust screenshot-only evidence", "لا تثق أبداً في دليل قائم على لقطة شاشة فقط", "أوعى تصدق صورة سكرين شوت لوحدها"], 
      summary: ["Screenshots remove context, timestamps, and traceability.", "لقطات الشاشة تزيل السياق والتاريخ وإمكانية التتبع.", "السكرين شوت بتمسح السياق والوقت وبتخلي صعب تعرف الحقيقة فين."], 
      action: ["Find the original source before belief or forwarding.", "اعثر على المصدر الأصلي قبل التصديق أو الإرسال.", "دور على المصدر الأصلي قبل ما تصدق أو تبعت الخبر لحد."], 
      intensity: "high", tags: ["source", "evidence"] 
    },
    { 
      title: ["Never let urgency replace method", "لا تجعل الاستعجال بديلاً عن المنهج", "ماتخليش الاستعجال ينسيك التأكد"], 
      summary: ["Urgency is a manipulation vector, not proof.", "الاستعجال قناة للتلاعب وليس دليلاً.", "الاستعجال ده طريقة عشان يضحكوا عليك، مش دليل على الحقيقة."], 
      action: ["Pause and compare with one official source.", "توقف وقارن مع مصدر رسمي واحد.", "اهدأ كدة وشوف مصدر رسمي بيقول إيه."], 
      intensity: "high", tags: ["urgency", "method"] 
    },
    { 
      title: ["Never outsource judgment to one influencer", "لا تفوض حكمك لشخص مؤثر واحد", "ماتخليش انفلونسر يقرر بدالك"], 
      summary: ["A loud voice is not a verification method.", "الصوت العالي ليس منهج تحقق.", "إن صوته عالي أو عنده متابعين كتير مش معناه إنه بيقول الحقيقة."], 
      action: ["Demand source, method, and date.", "اطلب المصدر والمنهج والتاريخ.", "اطلب المصدر، الطريقة، والتاريخ."], 
      intensity: "medium", tags: ["authority", "logic"] 
    },
  ]),
  ...buildLibrary("mental-health", "rule-mh", 36, [
    { 
      title: ["Never self-diagnose from one reel", "لا تشخص نفسك من مقطع واحد", "أوعى تشخص نفسك من فيديو واحد"], 
      summary: ["Short clips can describe symptoms without clinical context.", "المقاطع القصيرة قد تصف أعراضاً بلا سياق إكلينيكي.", "الفيديوهات القصيرة ممكن توصف أعراض بس من غير ما تعرف حالتك الحقيقية إيه."], 
      action: ["Use definition cards first, then support routing.", "استخدم بطاقات التعريف أولاً ثم توجيه الدعم.", "استخدم بطاقات التعريف الأول وبعدين شوف تروح لمين."], 
      intensity: "high", tags: ["diagnosis", "safety"] 
    },
    { 
      title: ["Never romanticize distress", "لا تمجد المعاناة", "ماتحليش التعب النفسي"], 
      summary: ["Aestheticizing distress blocks help-seeking.", "تجميل المعاناة يعطل طلب المساعدة.", "إنك تخلي التعب شكله 'شيك' أو 'عميق' بيمنعك تطلب مساعدة بجد."], 
      action: ["Translate the content into a safety-oriented sentence.", "حوّل المحتوى إلى جملة موجهة نحو السلامة.", "حول الكلام اللي بتسمعه لجملة بتهتم بسلامتك النفسية."], 
      intensity: "medium", tags: ["stigma", "safety"] 
    },
    { 
      title: ["Never shame help-seeking", "لا تعيب طلب المساعدة", "طلب المساعدة مش عيب"], 
      summary: ["Shame increases delay and risk.", "العار يزيد التأخير والخطر.", "الكسوف أو العيب بيخلي المشكلة تكبر وتتأخر في الحل."], 
      action: ["Replace shame language with route language.", "استبدل لغة العيب بلغة المسار.", "شيل كلمة 'عيب' وحط مكانها 'أروح فين عشان أتحسن'."], 
      intensity: "high", tags: ["help-seeking", "language"] 
    },
  ]),
  ...buildLibrary("religion-hub", "rule-rh", 36, [
    { 
      title: ["Never weaponize religion for control", "لا تستخدم الدين كسلاح للسيطرة", "أوعى تستخدم الدين عشان تسيطر على حد"], 
      summary: ["Coercion disguised as guidance is a high-risk pattern.", "الإكراه المتخفي في صورة توجيه نمط عالي الخطورة.", "إنك تجبر حد على حاجة باسم الدين ده خطر جداً."], 
      action: ["Check moderation and route to an official source.", "افحص الاعتدال ووجّه إلى مصدر رسمي.", "تأكد من الاعتدال وروح لمصدر رسمي موثوق."], 
      intensity: "high", tags: ["control", "moderation"] 
    },
    { 
      title: ["Never replace professional care with guilt", "لا تستبدل الرعاية المهنية بالذنب", "الذنب مش علاج للتعب النفسي"], 
      summary: ["Guilt cannot treat clinical need.", "الذنب لا يعالج الحاجة الإكلينيكية.", "الإحساس بالذنب مش هيحل مشكلة طبية محتاجة متخصص."], 
      action: ["Use the handoff path to mental-health support.", "استخدم مسار الإحالة إلى دعم الصحة النفسية.", "استخدم مسار التحويل لدعم الصحة النفسية."], 
      intensity: "high", tags: ["handoff", "care"] 
    },
    { 
      title: ["Never amplify sectarian humiliation", "لا تضخم الإذلال الطائفي", "ماتنشرش كلام فيه إهانة لغيرك"], 
      summary: ["Humiliation escalates conflict and blocks calm judgment.", "الإذلال يصعد الصراع ويمنع الحكم الهادئ.", "الإهانة بتكبر المشاكل وبتخليك ما تعرفش تفكر صح."], 
      action: ["Stop sharing and verify the context first.", "توقف عن النشر وتحقق من السياق أولاً.", "بطل تنشر الخبر وتأكد من الكلام الأول."], 
      intensity: "high", tags: ["sectarian", "peace"] 
    },
  ]),
];


export const MYTH_LIBRARY = [
  ...AUTHORED_MYTHS,
  ...buildLibrary("deepreal", "myth-dr", 33, [
    { 
      title: ["If it looks professional it must be true", "إذا بدا احترافياً فلا بد أنه صحيح", "لو شكله 'شيك' يبقى أكيد صح"], 
      summary: ["Visual polish is often used to borrow trust.", "الاحتراف البصري يستعمل كثيراً لسرقة الثقة.", "التصميم النظيف والشكل الاحترافي بيستعمل عشان يخليك تثق في الكلام من غير ما تفكر."], 
      action: ["Inspect source and method, not design quality.", "افحص المصدر والمنهج لا جودة التصميم.", "شوف المصدر والطريقة، مش جودة الصورة أو التصميم."], 
      intensity: "medium", tags: ["trust", "design"] 
    },
    { 
      title: ["One fact-check ends the whole case", "تحقق واحد ينهي القضية كلها", "خبر واحد كفاية عشان أصدق"], 
      summary: ["Fact-checking is a strong input, not a magical endpoint.", "التحقق مدخل قوي وليس نهاية سحرية.", "إنك تتأكد من حاجة واحدة ده كويس، بس مش معناه إن القصة كلها خلصت."], 
      action: ["Triangulate across at least two source classes.", "قارن بين فئتين على الأقل من المصادر.", "قارن بين كذا نوع من المصادر قبل ما تقرر."], 
      intensity: "medium", tags: ["fact-check", "triangulation"] 
    },
    { 
      title: ["Virality proves relevance", "الانتشار يثبت الأهمية", "طالما الخبر 'تريند' يبقى مهم"], 
      summary: ["Virality often tracks emotion rather than truth.", "الانتشار يتبع العاطفة أكثر من الحقيقة.", "الحاجة بتنتشر عشان بتلعب على المشاعر، مش عشان هي حقيقية بالضرورة."], 
      action: ["Measure evidence, not attention.", "قِس الدليل لا الانتباه.", "ركز في الدليل، مش في عدد الشير واللايك."], 
      intensity: "low", tags: ["virality", "attention"] 
    },
  ]),
  ...buildLibrary("mental-health", "myth-mh", 33, [
    { 
      title: ["Mental illness is weak character", "المرض النفسي ضعف في الشخصية", "المرض النفسي ضعف إرادة"], 
      summary: ["This myth collapses biology, environment, and distress into blame.", "هذه الخرافة تختزل البيولوجيا والبيئة والضيق في اللوم.", "الخرافة دي بتنسى العوامل الصحية والبيئية وبترمي اللوم كله على الشخص."], 
      action: ["Use one evidence card and one support route.", "استخدم بطاقة دليل واحدة ومسار دعم واحد.", "استخدم بطاقة علمية وشوف طريق دعم مناسب."], 
      intensity: "high", tags: ["stigma", "blame"] 
    },
    { 
      title: ["Good people never need help", "الناس الأقوياء لا يحتاجون مساعدة", "الشاطر بيحل مشاكله لوحده"], 
      summary: ["Strength myths delay intervention.", "أساطير القوة تؤخر التدخل.", "كلام 'الجدعنة' ده بيخلي الناس تتأخر في طلب المساعدة لحد ما المشكلة تكبر."], 
      action: ["Rewrite the statement into safe help-seeking language.", "أعد كتابة العبارة بلغة آمنة تشجع طلب المساعدة.", "غير الكلام ده لكلام بيشجع على طلب المساعدة بشكل أأمن."], 
      intensity: "medium", tags: ["help-seeking", "identity"] 
    },
    { 
      title: ["One symptom equals one diagnosis", "عرض واحد يساوي تشخيصاً واحداً", "عرض واحد كفاية عشان أعرف مرضي"], 
      summary: ["Symptoms overlap; diagnosis requires broader evaluation.", "الأعراض تتداخل والتشخيص يحتاج تقييماً أوسع.", "الأعراض بتتشابه في حاجات كتير، والتشخيص لازم يكون من متخصص."], 
      action: ["Separate symptom, function, and urgency.", "افصل بين العرض والوظيفة والإلحاح.", "فرق بين العرض اللي حاسس بيه، وتأثيره على حياتك، ومدى استعجاله."], 
      intensity: "high", tags: ["diagnosis", "logic"] 
    },
  ]),
  ...buildLibrary("religion-hub", "myth-rh", 33, [
    { 
      title: ["Faith alone replaces all support", "الإيمان وحده يغني عن كل دعم", "الصلاة بتغني عن الدكتور"], 
      summary: ["This myth confuses spiritual support with every other domain of care.", "هذه الخرافة تخلط بين الدعم الروحي وكل مجالات الرعاية الأخرى.", "الخرافة دي بتخلط بين الراحة الروحية وبين العلاج الطبي اللي جسمنا ومخنا محتاجينه."], 
      action: ["Use the handoff rule and official moderation route.", "استخدم قاعدة الإحالة ومسار الاعتدال الرسمي.", "استخدم قاعدة التحويل لمسار طبي ومسار الاعتدال الرسمي."], 
      intensity: "high", tags: ["faith", "care"] 
    },
    { 
      title: ["Religious certainty means no verification", "اليقين الديني يعني عدم الحاجة للتحقق", "مادام كلام دين يبقى ما تسألش"], 
      summary: ["Manipulators often hide behind sacred language to avoid scrutiny.", "المتلاعبون يختبئون كثيراً خلف اللغة المقدسة لتجنب التدقيق.", "ناس كتير بتستخبى ورا كلام الدين عشان محدش يراجع وراهم أو يكتشف كذبهم."], 
      action: ["Check source chain and context before acceptance.", "افحص سلسلة المصدر والسياق قبل القبول.", "اتأكد من المصدر وجاي منين قبل ما تصدق أي حاجة."], 
      intensity: "high", tags: ["verification", "context"] 
    },
    { 
      title: ["Guilt is proof of truth", "الشعور بالذنب دليل على الحقيقة", "لو حاسس بالذنب يبقى الخبر صح"], 
      summary: ["Guilt can be manipulated and is not itself evidence.", "يمكن التلاعب بالذنب وهو ليس دليلاً في حد ذاته.", "الذنب ده شعور ممكن أي حد يضحك عليك بيه، بس هو مش دليل علمي على الحقيقة."], 
      action: ["Separate moral feeling from factual claim.", "افصل بين الشعور الأخلاقي والادعاء الواقعي.", "فرق بين اللي حاسس بيه أخلاقياً وبين الخبر نفسه حقيقي ولا لأ."], 
      intensity: "medium", tags: ["guilt", "logic"] 
    },
  ]),
];


export const REAL_SCENARIOS = [
  ...AUTHORED_SCENARIOS,
  ...AUTHORED_SCENARIOS_EXTENDED,
  ...buildLibrary("deepreal", "scenario-dr", 120, [
    { 
      title: ["Family WhatsApp outbreak rumor", "شائعة وباء في مجموعة العائلة", "إشاعة مرض في جروب العيلة"], 
      summary: ["A forwarded voice note claims a local emergency and names no official source.", "ملاحظة صوتية محولة تزعم وجود طارئ محلي من دون مصدر رسمي.", "ريكورد مبعوث على الواتساب بيقول إن في حالة طوارئ بس مش قايل المصدر إيه."], 
      action: ["Triage the claim, then compare MoHP and WHO updates.", "فرز الادعاء ثم قارن تحديثات وزارة الصحة ومنظمة الصحة العالمية.", "صنف الخبر الأول، وبعدين شوف صفحة وزارة الصحة بتقول إيه."], 
      intensity: "high", tags: ["egypt", "whatsapp", "health"] 
    },
    { 
      title: ["Edited politician clip", "مقطع معدل لسياسي", "فيديو متقطع لسياسي"], 
      summary: ["A short clip appears shocking but lacks full context and date.", "مقطع قصير صادم ظاهرياً لكنه بلا سياق كامل ولا تاريخ.", "فيديو قصير شكله يخض بس مش باين اتصور فين ولا إمتى ولا السياق كان إيه."], 
      action: ["Find full video and a second newsroom source.", "اعثر على الفيديو الكامل ومصدر صحفي ثان.", "دور على الفيديو الأصلي وشوف مصدر إخباري تاني قايل إيه."], 
      intensity: "medium", tags: ["video", "context", "politics"] 
    },
    { 
      title: ["Fake scholarship poster", "ملصق منحة مزيفة", "إعلان منحة مضروب"], 
      summary: ["A high-design poster promises urgent registration and asks for payment.", "ملصق مصمم جيداً يعد بمنحة عاجلة ويطلب الدفع.", "بوستر شكله شيك جداً بيقول سجل بسرعة للمنحة بس طالب فلوس الأول."], 
      action: ["Reject screenshot proof and verify the official domain.", "ارفض دليل الصورة وتحقق من النطاق الرسمي.", "ماتصدقش مجرد صورة، وادخل على الموقع الرسمي للمنحة تأكد."], 
      intensity: "high", tags: ["students", "scam", "design"] 
    },
  ]),
  ...buildLibrary("mental-health", "scenario-mh", 120, [
    { 
      title: ["Student panic before exams", "هلع طالب قبل الامتحانات", "طالب مرعوب قبل الامتحانات"], 
      summary: ["A student says they cannot breathe, cannot sleep, and believes they are broken.", "طالب يقول إنه لا يستطيع التنفس أو النوم ويعتقد أنه محطم.", "طالب مش عارف ينام ولا يتنفس وحاسس إنه خلاص مش قادر يكمل."], 
      action: ["Stabilize, label the state, and route support by urgency.", "ثبّت الموقف ثم سم الحالة ثم وجه الدعم حسب الإلحاح.", "اهدى الأول، وسم اللي حاسس بيه، وشوف محتاج مساعدة إزاي."], 
      intensity: "high", tags: ["students", "panic", "support"] 
    },
    { 
      title: ["Burnout framed as laziness", "احتراق نفسي يُوصف بالكسل", "تعب نفسي بيتقال عليه كسل"], 
      summary: ["A worker is called lazy despite sustained overload and exhaustion.", "عامل يُتهم بالكسل رغم الإرهاق والضغط المستمر.", "موظف بيتقال عليه كسلان رغم إنه شايل شغل كتير وتعبان جداً."], 
      action: ["Use one definition card and one never-do rule.", "استخدم بطاقة تعريف واحدة وقاعدة عدم واحدة.", "استخدم بطاقة تعريف المشكلة وشوف قاعدة الـ 'أوعى تعمل كدة'."], 
      intensity: "medium", tags: ["burnout", "stigma", "work"] 
    },
    { 
      title: ["Friend shares self-diagnosis reel", "صديق يشارك مقطع تشخيص ذاتي", "صاحبك باعت فيديو بيشخص نفسه"], 
      summary: ["A friend decides on a diagnosis after one short video.", "صديق يقرر تشخيصه بعد فيديو قصير واحد.", "واحد صاحبك قرر إنه عنده مرض نفسي بس عشان شاف فيديو قصير."], 
      action: ["Interrupt the myth and route to safer next steps.", "اقطع الخرافة ووجّه إلى الخطوات الأكثر أماناً.", "صلح له المعلومة وقوله على خطوات أأمن يعرف بيها الحقيقة."], 
      intensity: "medium", tags: ["social", "diagnosis", "reels"] 
    },
  ]),
  ...buildLibrary("religion-hub", "scenario-rh", 120, [
    { 
      title: ["Shame-based sermon clip", "مقطع وعظ قائم على العار", "فيديو شيخ بيخوف الناس"], 
      summary: ["A clip equates distress with weak faith and forbids outside help.", "مقطع يربط الضيق بضعف الإيمان ويمنع طلب المساعدة.", "فيديو بيقول إن تعبك ده عشان إيمانك ضعيف وبيقولك ما تروحش لدكاترة."], 
      action: ["Run moderation checks and handoff review.", "شغّل فحوص الاعتدال ومراجعة الإحالة.", "اتأكد من اعتدال الكلام وشوف قاعدة التحويل للمتخصصين."], 
      intensity: "high", tags: ["guilt", "care", "moderation"] 
    },
    { 
      title: ["Sectarian rumor after local event", "شائعة طائفية بعد حدث محلي", "إشاعة فتنة بعد خناقة في المنطقة"], 
      summary: ["A rumor frames one community as intentionally hostile without evidence.", "شائعة تصوّر مجتمعاً معيناً عدائياً عمداً بلا دليل.", "إشاعة بتقول إن في ناس قاصدة تعمل مشاكل بس من غير أي دليل."], 
      action: ["Freeze sharing, verify context, and route to moderation source.", "جمّد المشاركة وتحقق من السياق ثم وجّه إلى مصدر اعتدال.", "وقف الشير، اتأكد من اللي حصل بجد، واسمع لمصدر معتدل."], 
      intensity: "high", tags: ["sectarian", "egypt", "safety"] 
    },
    { 
      title: ["Religious advice mixed with health claim", "نصيحة دينية ممزوجة بادعاء صحي", "نصيحة دين فيها كلام طبي"], 
      summary: ["A message gives spiritual comfort but also unsafe medical advice.", "رسالة تقدم طمأنة روحية لكنها تتضمن نصيحة طبية غير آمنة.", "رسالة بتريحك نفسياً بس بتقولك بطل دواء أو اعمل حاجة طبية غلط."], 
      action: ["Split the comfort part from the health part and route each correctly.", "افصل الجزء المطمئن عن الجزء الصحي ووجّه كل واحد لمساره الصحيح.", "فرق بين الراحة الروحية وبين النصيحة الطبية، وروح لكل واحد في مكانه الصح."], 
      intensity: "medium", tags: ["health", "faith", "boundaries"] 
    },
  ]),
];


export const INSIDER_TRICKS = [
  ...AUTHORED_TRICKS,
  ...AUTHORED_TRICKS_EXTENDED,
  ...buildLibrary("deepreal", "trick-dr", 33, [
    { 
      title: ["Use date plus source as a first filter", "استخدم التاريخ مع المصدر كمرشح أول", "خلي التاريخ والمصدر أول حاجة تبص عليها"], 
      summary: ["Old truth can become current misinformation when context changes.", "الحقيقة القديمة قد تصبح تضليلاً حالياً عندما يتغير السياق.", "الخبر القديم اللي كان صح زمان ممكن يبقى إشاعة دلوقتي لو السياق اغير."], 
      action: ["Check publication date before reading the body.", "افحص تاريخ النشر قبل قراءة المتن.", "بص على التاريخ قبل ما تضيع وقتك في قراءة الكلام."], 
      intensity: "low", tags: ["freshness", "filter"] 
    },
    { 
      title: ["Open a second tab before believing", "افتح تبويباً ثانياً قبل التصديق", "افتح صفحة تانية اتأكد قبل ما تصدق"], 
      summary: ["A second tab interrupts emotional capture and restores comparison.", "التبويب الثاني يقطع الاستحواذ العاطفي ويعيد المقارنة.", "إنك تفتح صفحة تانية بيخليك تهدا وما تنجرفش ورا مشاعرك وتقارن الكلام بجد."], 
      action: ["Force one external lookup before any share action.", "افرض بحثاً خارجياً واحداً قبل أي مشاركة.", "دور في جوجل الأول قبل ما تعمل شير لأي حاجة."], 
      intensity: "low", tags: ["friction", "habit"] 
    },
    { 
      title: ["Write the exact claim in your own words", "اكتب الادعاء بصياغتك الدقيقة", "لخص الخبر بأسلوبك أنت"], 
      summary: ["Rephrasing exposes exaggeration and hidden assumptions.", "إعادة الصياغة تكشف المبالغة والافتراضات الخفية.", "لما تعيد صياغة الكلام بأسلوبك هتعرف لو كان فيه مبالغة أو كلام مش مظبوط."], 
      action: ["Reduce a viral post to one checkable sentence.", "اختزل المنشور الشائع إلى جملة واحدة قابلة للفحص.", "لخص المنشور الطويل في جملة واحدة تقدر تتأكد منها."], 
      intensity: "medium", tags: ["logic", "clarity"] 
    },
  ]),
  ...buildLibrary("mental-health", "trick-mh", 33, [
    { 
      title: ["Name the body cue before the story", "سم الإشارة الجسدية قبل القصة", "بص على جسمك قبل ما تحكي الحكاية"], 
      summary: ["This interrupts spiraling and improves accuracy.", "هذا يقطع التصاعد ويحسن الدقة.", "ده بيخليك تهدا وتعرف حقيقة شعورك قبل ما الأفكار تسوحك."], 
      action: ["Start with breath, sleep, appetite, and tension.", "ابدأ بالتنفس والنوم والشهية والتوتر.", "شوف نفسك، نومك، أكلبك، وشدة عضلاتك."], 
      intensity: "low", tags: ["body", "awareness"] 
    },
    { 
      title: ["Swap labels for needs", "استبدل الملصقات بالاحتياجات", "ركز في اللي محتاجه مش في اسم حالتك"], 
      summary: ["Needs create safer next steps than identity labels.", "الاحتياجات تصنع خطوات أكثر أماناً من الملصقات.", "إنك تعرف أنت محتاج إيه دلوقتي أأمن بكتير من إنك تحط لنفسك 'ليبل' مرضي."], 
      action: ["Ask what support is needed today, not what identity fits forever.", "اسأل ما الدعم المطلوب اليوم لا ما الهوية المناسبة للأبد.", "اسأل نفسك محتاج مساعدة في إيه النهاردة، مش إيه اسم المرض اللي عندك."], 
      intensity: "medium", tags: ["support", "language"] 
    },
    { 
      title: ["Use one official support link every time", "استخدم رابط دعم رسمي واحداً في كل مرة", "خلي معاك دايما لينك دعم رسمي"], 
      summary: ["A stable support anchor lowers panic and indecision.", "مرساة دعم ثابتة تقلل الهلع والتردد.", "وجود رقم أو لينك رسمي بيخليك تحس بالأمان وما تتهزش لما تتعب."], 
      action: ["Keep one hotline or MoHP route visible during drills.", "أبق خطاً ساخناً أو مسار وزارة الصحة مرئياً أثناء التمارين.", "خلي رقم الخط الساخن لوزارة الصحة قدامك دايماً."], 
      intensity: "low", tags: ["support", "routing"] 
    },
  ]),
  ...buildLibrary("religion-hub", "trick-rh", 33, [
    { 
      title: ["Separate source authority from emotional intensity", "افصل سلطة المصدر عن شدة العاطفة", "فرق بين اسم المصدر وبين زعيقه"], 
      summary: ["A loud religious tone is not proof of qualified guidance.", "النبرة الدينية العالية ليست دليلاً على التوجيه المؤهل.", "الزعيم والنبرة العالية في الدين مش معناها إن الكلام صح أو موثوق."], 
      action: ["Check institution, role, and moderation stance.", "افحص المؤسسة والدور وموقف الاعتدال.", "شوف الشخص ده تبع مؤسسة إيه ودوره إيه وكلامه معتدل ولا لأ."], 
      intensity: "medium", tags: ["authority", "moderation"] 
    },
    { 
      title: ["Ask whether the message increases peace or control", "اسأل هل الرسالة تزيد السلام أم السيطرة", "اسأل نفسك: الكلام ده بيريح ولا بيسيطر؟"], 
      summary: ["This single question catches many harmful patterns early.", "هذا السؤال الواحد يلتقط كثيراً من الأنماط الضارة مبكراً.", "السؤال ده هيفضح أي كلام بيحاول يسيطر عليك باسم الدين."], 
      action: ["Score one message on peace, clarity, and coercion.", "قيّم رسالة واحدة في السلام والوضوح والإكراه.", "قيم الرسالة وشوف فيها هدوء ولا إجبار."], 
      intensity: "medium", tags: ["peace", "control"] 
    },
    { 
      title: ["Keep mental-health handoff visible", "أبق إحالة الصحة النفسية مرئية", "دايما افتكر إن في دكاترة نفسيين"], 
      summary: ["Some spiritual distress is also clinical distress.", "بعض الضيق الروحي هو أيضاً ضيق إكلينيكي.", "ساعات التعب اللي فاكرينه ديني بيبقى تعب نفسي محتاج دكتور."], 
      action: ["Review the handoff rule before giving advice.", "راجع قاعدة الإحالة قبل تقديم النصيحة.", "افتكر قاعدة التحويل للدكتور قبل ما تنصح حد في الدين."], 
      intensity: "high", tags: ["handoff", "care"] 
    },
  ]),
];

export const REVERSE_ENGINEERING_CASES = [
  ...AUTHORED_REVERSE_CASES,
  ...buildLibrary("deepreal", "reverse-dr", 24, [
    { 
      title: ["How a rumor hijacks urgency", "كيف تختطف الشائعة الاستعجال", "إزاي الإشاعة بتستغل استعجالك"], 
      summary: ["Break down the manipulator sequence: shock, urgency, authority, forwarding pressure.", "فكك تسلسل المتلاعب: صدمة ثم استعجال ثم سلطة ثم ضغط للمشاركة.", "افهم الخطة: يصدمك، وبعدين يستعجلك، وبعدين يجيب سيرة حد مهم، ويقولك انشر بسرعة."], 
      action: ["Use the reverse view to name each tactic before belief.", "استخدم الرؤية العكسية لتسمية كل تكتيك قبل التصديق.", "استخدم 'الرؤية العكسية' عشان تسمي كل تكتيك قبل ما تقع فيه."], 
      intensity: "high", tags: ["reverse", "manipulation"] 
    },
    { 
      title: ["How edited clips manufacture certainty", "كيف تصنع المقاطع المعدلة يقيناً زائفاً", "إزاي الفيديوهات المتقطعة بتخدعك"], 
      summary: ["Short clips remove ambiguity and replace context with confidence.", "المقاطع القصيرة تزيل الغموض وتستبدل السياق بالثقة.", "الفيديوهات القصيرة بتمسح التفاصيل وبتحط مكانها ثقة عمياء في خبر غلط."], 
      action: ["Find what was cut out and what assumption was inserted.", "اعثر على ما حُذف وما الافتراض الذي زُرع.", "دور على اللي اتمسح من الفيديو وشوف إيه الفكرة اللي بيحاولوا يزرعوها."], 
      intensity: "high", tags: ["video", "context"] 
    },
  ]),
  ...buildLibrary("mental-health", "reverse-mh", 24, [
    { 
      title: ["How self-diagnosis content hooks identity", "كيف يصطاد محتوى التشخيص الذاتي الهوية", "إزاي فيديوهات التشخيص بتلعب بدماغك"], 
      summary: ["The pattern often moves from recognition to over-identification to certainty.", "يتحرك النمط غالباً من التعرف إلى التماهي الزائد إلى اليقين.", "الموضوع بيبدأ بإنك تحس إن الكلام عليك، وبعدين تقتنع تماماً إنك مريض."], 
      action: ["Mark where education turned into identity capture.", "حدد أين تحول التعليم إلى أسر للهوية.", "حدد اللحظة اللي الخبر اتحول فيها من معلومة لوصمة لزقت فيك."], 
      intensity: "high", tags: ["identity", "diagnosis"] 
    },
    { 
      title: ["How shame blocks support", "كيف يمنع العار طلب الدعم", "إزاي الكسوف بيمنعك تخف"], 
      summary: ["Shame reframes need as failure and delays action.", "العار يعيد تعريف الحاجة على أنها فشل ويؤخر الفعل.", "الكسوف بيحسسك إن تعبك ده فشل فبيخليك تتأخر في العلاج."], 
      action: ["Reverse the shame script into a safe route.", "اعكس نص العار إلى مسار آمن.", "حول 'كلام العيب' لطريق أمان وعلاج."], 
      intensity: "medium", tags: ["shame", "support"] 
    },
  ]),
  ...buildLibrary("religion-hub", "reverse-rh", 24, [
    { 
      title: ["How coercive certainty enters religious content", "كيف يدخل اليقين القسري إلى المحتوى الديني", "إزاي الإجبار بيدخل في كلام الدين"], 
      summary: ["The pattern often uses sacred language to block questions and alternatives.", "يستخدم النمط غالباً اللغة المقدسة لمنع الأسئلة والبدائل.", "بيستعملوا كلام مقدس عشان يمنعوك تسأل أو تفكر في بدائل تانية."], 
      action: ["Identify where moderation disappeared from the message.", "حدد أين اختفى الاعتدال من الرسالة.", "حدد إمتى الاعتدال اختفى من الكلام وبقى فيه تشدد."], 
      intensity: "high", tags: ["certainty", "moderation"] 
    },
    { 
      title: ["How sectarian clips weaponize identity", "كيف تسلح المقاطع الطائفية الهوية", "إزاي فيديوهات الفتنة بتستغل أصلك"], 
      summary: ["Identity is narrowed until hostility feels righteous.", "تُضيَّق الهوية حتى يبدو العداء مبرراً.", "بيفضلوا يضيقوا في هويتك لحد ما تحس إن كرهك لغيرك هو الصح."], 
      action: ["Trace the path from grievance to escalation.", "تتبع المسار من التظلم إلى التصعيد.", "تتبع الطريق من أول الزعل لحد ما المشكلة كبرت وبقت فتنة."], 
      intensity: "high", tags: ["sectarian", "identity"] 
    },
  ]),
];

