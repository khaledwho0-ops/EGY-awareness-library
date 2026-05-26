import type { LocalizedText } from "./module-briefings";
import { IMMUNITY_RUMORS_MODE, IMMUNITY_SCAMS_MODE, IMMUNITY_TIKTOK_MODE } from "./deepreal-immunity";

export type DeepRealGameModeId = "classic" | "egy" | "pov" | "immunity-rumors" | "immunity-scams" | "immunity-tiktok";

export interface DeepRealGameSource {
  label: LocalizedText;
  url: string;
}

export interface DeepRealGameChoice {
  id: string;
  label: LocalizedText;
  effectLabel: LocalizedText;
  feedback: LocalizedText;
  lesson: LocalizedText;
  scoreDelta: number;
  correct: boolean;
  tags: string[];
}

export interface DeepRealGameRound {
  id: string;
  title: LocalizedText;
  scene: LocalizedText;
  prompt: LocalizedText;
  objective: LocalizedText;
  choices: DeepRealGameChoice[];
}

export interface DeepRealGameModeDefinition {
  id: DeepRealGameModeId;
  title: LocalizedText;
  subtitle: LocalizedText;
  roleLabel: LocalizedText;
  scoreLabel: LocalizedText;
  warning: LocalizedText;
  completionTitle: LocalizedText;
  completionSummary: LocalizedText;
  sources: DeepRealGameSource[];
  rounds: DeepRealGameRound[];
}

function t(en: string, ar: string, arEG?: string): LocalizedText {
  return { en, ar, arEG: arEG || ar };
}

function source(en: string, ar: string, url: string): DeepRealGameSource {
  return { label: t(en, ar), url };
}

const CLASSIC_MODE: DeepRealGameModeDefinition = {
  id: "classic",
  title: t("Classic Inoculation Lab", "مختبر التمنيع الكلاسيكي"),
  subtitle: t(
    "A controlled tactic simulator inspired by misinformation inoculation research.",
    "محاكاة تكتيكية منضبطة مستلهمة من أبحاث التمنيع ضد التضليل."
  ),
  roleLabel: t("Tactic insight", "فهم التكتيك"),
  scoreLabel: t("Influence map", "خريطة التأثير"),
  warning: t(
    "This mode explains manipulative tactics so users can resist them later.",
    "هذا الوضع يشرح التكتيكات التلاعبية حتى يتمكن المستخدم من مقاومتها لاحقاً."
  ),
  completionTitle: t("You mapped the core spread tactics.", "لقد رسمت خريطة التكتيكات الأساسية للانتشار."),
  completionSummary: t(
    "Carry this lens into real claims: fear, fake authority, tribal pressure, and anti-checker attacks.",
    "احمل هذه العدسة إلى الادعاءات الحقيقية: الخوف والسلطة الزائفة والضغط القبلي والهجوم على المدقق."
  ),
  sources: [
    source("Cambridge Bad News", "كامبريدج باد نيوز", "https://www.cam.ac.uk/research/news/fake-news-vaccine-works-pre-bunk-game-reduces-susceptibility-to-disinformation"),
    source("Cambridge MIST", "كامبريدج ميست", "https://www.cam.ac.uk/stories/misinformation-susceptibility-test"),
    source("Digital Inquiry Group", "مجموعة الاستقصاء الرقمي", "https://cor.stanford.edu/"),
    source("News Literacy Project", "مشروع الثقافة الخبرية", "https://newslit.org/"),
  ],
  rounds: [
    {
      id: "classic-fear",
      title: t("Round 1: Shock first", "الجولة 1: الصدمة أولاً"),
      scene: t(
        "A post claims a hidden outbreak with no evidence, only fear and urgency.",
        "منشور يدّعي وجود تفشٍ مخفي بلا دليل، فقط خوف واستعجال."
      ),
      prompt: t("Which move grows it fastest?", "أي حركة تنميه بأسرع صورة؟"),
      objective: t("Recognize fear-plus-urgency.", "تعرّف على الخوف مع الاستعجال."),
      choices: [
        {
          id: "classic-fear-1",
          label: t("Add: “Share before they delete this.”", "أضف: «شارك قبل أن يحذفوا هذا»."),
          effectLabel: t("Fear + urgency", "خوف + استعجال"),
          feedback: t(
            "Correct for the simulation: urgency suppresses checking and accelerates forwarding.",
            "صحيح داخل المحاكاة: الاستعجال يضعف الفحص ويسرّع إعادة الإرسال."
          ),
          lesson: t(
            "In real life, any message demanding instant sharing should trigger a verification pause.",
            "في الواقع، أي رسالة تطلب مشاركة فورية يجب أن تفعّل وقفة تحقق."
          ),
          scoreDelta: 3,
          correct: true,
          tags: ["urgency", "fear"],
        },
        {
          id: "classic-fear-2",
          label: t("Ask for the original source and date.", "اطلب المصدر الأصلي والتاريخ."),
          effectLabel: t("Verification friction", "احتكاك التحقق"),
          feedback: t(
            "That is the public defense, not the manipulator move.",
            "هذا هو الدفاع العام، وليس حركة المضلِّل."
          ),
          lesson: t("Source plus date is the first filter for panic claims.", "المصدر مع التاريخ هو المرشح الأول لادعاءات الذعر."),
          scoreDelta: 0,
          correct: false,
          tags: ["source", "date"],
        },
        {
          id: "classic-fear-3",
          label: t("Add uncertainty and context.", "أضف عدم اليقين والسياق."),
          effectLabel: t("Nuance", "دقة"),
          feedback: t("Nuance slows virality, so manipulators avoid it.", "الدقة تبطئ الانتشار، لذلك يتجنبها المضللون."),
          lesson: t("Nuance is one of the strongest defenses against manipulation.", "الدقة من أقوى وسائل الدفاع ضد التلاعب."),
          scoreDelta: 0,
          correct: false,
          tags: ["nuance", "context"],
        },
      ],
    },
    {
      id: "classic-authority",
      title: t("Round 2: Costume the claim", "الجولة 2: ألبس الادعاء هيئة سلطة"),
      scene: t(
        "The evidence is weak, so you need the claim to look scientific without real method.",
        "الدليل ضعيف، لذا تحتاج أن يبدو الادعاء علمياً دون منهج حقيقي."
      ),
      prompt: t("Which move adds fake authority fastest?", "أي حركة تضيف سلطة زائفة بأسرع شكل؟"),
      objective: t("Spot authority theater.", "التقط مسرحية السلطة."),
      choices: [
        {
          id: "classic-authority-1",
          label: t("Wrap it in a chart screenshot and fake expert title.", "غلفه بصورة رسم بياني ولقب خبير مزيف."),
          effectLabel: t("Authority costume", "زيّ السلطة"),
          feedback: t("Correct for the simulation: visual professionalism can steal trust.", "صحيح داخل المحاكاة: الاحتراف البصري قد يسرق الثقة."),
          lesson: t("Inspect institution, method, and traceability before trusting polished visuals.", "افحص المؤسسة والمنهج وإمكانية التتبع قبل الوثوق بالشكل الاحترافي."),
          scoreDelta: 3,
          correct: true,
          tags: ["authority", "design"],
        },
        {
          id: "classic-authority-2",
          label: t("Link the full study and limitations.", "اربط الدراسة الكاملة وحدودها."),
          effectLabel: t("Method transparency", "شفافية المنهج"),
          feedback: t("Transparent evidence helps the public, not the manipulator.", "الدليل الشفاف يفيد الجمهور لا المضلِّل."),
          lesson: t("Full-method access is a strong trust signal.", "إتاحة المنهج الكامل إشارة ثقة قوية."),
          scoreDelta: 0,
          correct: false,
          tags: ["method", "evidence"],
        },
        {
          id: "classic-authority-3",
          label: t("State that it is just an opinion.", "صرّح بأنه مجرد رأي."),
          effectLabel: t("Opinion honesty", "صدق الرأي"),
          feedback: t("Honesty lowers manipulative force because the evidence ceiling becomes visible.", "الصدق يخفض القوة التلاعبية لأن سقف الدليل يصبح ظاهراً."),
          lesson: t("Opinion is allowed; disguised opinion presented as science is the problem.", "الرأي مسموح؛ المشكلة هي الرأي المقنّع على أنه علم."),
          scoreDelta: 0,
          correct: false,
          tags: ["opinion", "clarity"],
        },
      ],
    },
    {
      id: "classic-tribal",
      title: t("Round 3: Divide the room", "الجولة 3: اقسم الغرفة"),
      scene: t(
        "The claim is weak, so you need identity and outrage to push it harder.",
        "الادعاء ضعيف، لذا تحتاج إلى الهوية والغضب لدفعه بقوة أكبر."
      ),
      prompt: t("Which move turns disagreement into tribal energy?", "أي حركة تحول الاختلاف إلى طاقة قبلية؟"),
      objective: t("Catch us-versus-them framing.", "اكتشف صياغة نحن ضد هم."),
      choices: [
        {
          id: "classic-tribal-1",
          label: t("Frame critics as enemies of the group.", "صوّر النقاد على أنهم أعداء للمجموعة."),
          effectLabel: t("Tribal split", "انقسام قبلي"),
          feedback: t("Correct for the simulation: identity threat often spreads faster than evidence.", "صحيح داخل المحاكاة: تهديد الهوية ينتشر أسرع كثيراً من الدليل."),
          lesson: t("When a claim tells you who to hate before what happened, slow down.", "عندما يخبرك الادعاء بمن تكره قبل ما حدث، أبطئ."),
          scoreDelta: 3,
          correct: true,
          tags: ["tribal", "identity"],
        },
        {
          id: "classic-tribal-2",
          label: t("Invite a side-by-side evidence comparison.", "ادعُ إلى مقارنة الأدلة جنباً إلى جنب."),
          effectLabel: t("Triangulation", "مثلثة الأدلة"),
          feedback: t("Comparison restores evidence standards and weakens identity capture.", "المقارنة تعيد معايير الدليل وتضعف أسر الهوية."),
          lesson: t("Comparison is one of the fastest antidotes to tribal escalation.", "المقارنة من أسرع مضادات التصعيد القبلي."),
          scoreDelta: 0,
          correct: false,
          tags: ["comparison", "evidence"],
        },
        {
          id: "classic-tribal-3",
          label: t("State that the issue is mixed and complex.", "اذكر أن القضية مختلطة ومعقدة."),
          effectLabel: t("Complexity", "تعقيد"),
          feedback: t("Complexity lowers outrage velocity, which is why manipulators avoid it.", "التعقيد يبطئ سرعة الغضب، ولهذا يتجنبه المضللون."),
          lesson: t("Complex cases require slower judgment, not louder identity cues.", "القضايا المعقدة تحتاج حكماً أبطأ لا إشارات هوية أعلى."),
          scoreDelta: 0,
          correct: false,
          tags: ["complexity", "judgment"],
        },
      ],
    },
    {
      id: "classic-critics",
      title: t("Round 4: Punish the checker", "الجولة 4: عاقب من يتحقق"),
      scene: t(
        "Fact-checkers are slowing the rumor. You need people to distrust scrutiny itself.",
        "مدققو الحقائق يبطئون الشائعة. تحتاج أن يشك الناس في التدقيق نفسه."
      ),
      prompt: t("Which move weakens correction most?", "أي حركة تضعف التصحيح أكثر شيء؟"),
      objective: t("Detect attack-the-checker tactics.", "اكتشف تكتيكات الهجوم على المدقق."),
      choices: [
        {
          id: "classic-critics-1",
          label: t("Brand all checkers as biased gatekeepers.", "صِف كل المدققين بأنهم حراس منحازون."),
          effectLabel: t("Attack the checker", "الهجوم على المدقق"),
          feedback: t("Correct for the simulation: once scrutiny looks corrupt, the rumor breathes again.", "صحيح داخل المحاكاة: عندما يبدو التدقيق فاسداً، تتنفس الشائعة من جديد."),
          lesson: t("Evaluate corrections by method and cited evidence, not reflex suspicion alone.", "قيّم التصحيحات بالمنهج والأدلة المستشهد بها لا بالشك الانعكاسي وحده."),
          scoreDelta: 3,
          correct: true,
          tags: ["fact-check", "credibility"],
        },
        {
          id: "classic-critics-2",
          label: t("Invite people to inspect the correction process.", "ادعُ الناس لفحص عملية التصحيح."),
          effectLabel: t("Transparency", "شفافية"),
          feedback: t("Open scrutiny helps the public and hurts manipulative certainty.", "التدقيق المفتوح يفيد الجمهور ويضر اليقين التلاعبي."),
          lesson: t("The strongest corrections show their path, evidence, and limits.", "أقوى التصحيحات تُظهر مسارها وأدلتها وحدودها."),
          scoreDelta: 0,
          correct: false,
          tags: ["transparency", "method"],
        },
        {
          id: "classic-critics-3",
          label: t("Pause the rumor until new evidence appears.", "أوقف الشائعة حتى تظهر أدلة جديدة."),
          effectLabel: t("Hold state", "حالة التوقف"),
          feedback: t("A disciplined hold blocks spread dynamics.", "التوقف المنضبط يوقف ديناميكية الانتشار."),
          lesson: t("Holding weak claims is often smarter than confident but weak conclusions.", "توقيف الادعاءات الضعيفة أذكى كثيراً من نتائج واثقة لكنها ضعيفة."),
          scoreDelta: 0,
          correct: false,
          tags: ["hold", "discipline"],
        },
      ],
    },
  ],
};

const EGY_MODE: DeepRealGameModeDefinition = {
  id: "egy",
  title: t("EGY Context Lab", "مختبر السياق المصري"),
  subtitle: t(
    "The same inoculation logic, but with Egyptian rumor routes: WhatsApp chains, poster scams, local clips, and sectarian heat.",
    "المنطق التمنيعي نفسه لكن عبر مسارات شائعات مصرية: سلاسل واتساب، ملصقات الاحتيال، المقاطع المحلية، والحرارة الطائفية."
  ),
  roleLabel: t("Local pattern", "النمط المحلي"),
  scoreLabel: t("Spread pressure", "ضغط الانتشار"),
  warning: t(
    "These scenarios mirror Egyptian spread patterns so users can catch them earlier in daily life.",
    "هذه السيناريوهات تعكس أنماط الانتشار المصرية حتى يلتقطها المستخدم مبكراً في حياته اليومية."
  ),
  completionTitle: t("You now read the Egyptian rumor pattern faster.", "أصبحت تقرأ نمط الشائعة المصرية بسرعة أكبر."),
  completionSummary: t(
    "Verify domains, freeze voice notes, distrust screenshot-only posters, and slow sectarian escalation.",
    "تحقّق من النطاقات، جمّد الرسائل الصوتية، لا تثق في الملصقات المبنية على الصور فقط، وأبطئ التصعيد الطائفي."
  ),
  sources: [
    source("UNICEF Egypt", "يونيسف مصر", "https://www.unicef.org/egypt/protecting-children-cyberbullying"),
    source("UNESCO Media and Information Literacy", "يونسكو للتربية الإعلامية والمعلوماتية", "https://www.unesco.org/en/media-information-literacy"),
    source("AkhbarMeter", "أخبار ميتر", "https://akhbarmeter.org/"),
    source("InVID WeVerify", "إنفِد وي فيريفاي", "https://www.invid-project.eu/tools-and-services/invid-verification-plugin/"),
  ],
  rounds: [
    {
      id: "egy-whatsapp",
      title: t("Round 1: Voice note cascade", "الجولة 1: سيل الرسالة الصوتية"),
      scene: t("A WhatsApp voice note claims a hospital emergency and says “my cousin works inside.”", "رسالة صوتية على واتساب تدّعي وجود طارئ في مستشفى وتقول «قريبي يعمل بالداخل»."),
      prompt: t("Which move spreads it fastest in family groups?", "أي حركة تنشرها بأسرع صورة في مجموعات العائلة؟"),
      objective: t("Spot anecdotal authority plus panic.", "التقط سلطة الحكاية مع الذعر."),
      choices: [
        {
          id: "egy-whatsapp-1",
          label: t("Add family intimacy: “I trust the sender, forward now.”", "أضف الألفة العائلية: «أثق في المرسل، انشر الآن»."),
          effectLabel: t("Trust shortcut", "اختصار الثقة"),
          feedback: t("Correct for the simulation: family closeness often bypasses source standards.", "صحيح داخل المحاكاة: القرب العائلي يتجاوز كثيراً معايير المصدر."),
          lesson: t("Personal closeness does not upgrade evidence quality.", "القرب الشخصي لا يرفع جودة الدليل."),
          scoreDelta: 3,
          correct: true,
          tags: ["whatsapp", "family"],
        },
        {
          id: "egy-whatsapp-2",
          label: t("Ask for the hospital statement or MoHP source.", "اطلب بيان المستشفى أو مصدر وزارة الصحة."),
          effectLabel: t("Official route", "المسار الرسمي"),
          feedback: t("That is the real-world defense, but it blocks the rumor engine.", "هذا هو الدفاع الواقعي، لكنه يعطل محرك الشائعة."),
          lesson: t("Official health routing should appear before emergency-forwarding behavior.", "المسار الصحي الرسمي يجب أن يسبق سلوك النشر الطارئ."),
          scoreDelta: 0,
          correct: false,
          tags: ["mohp", "source"],
        },
        {
          id: "egy-whatsapp-3",
          label: t("Turn the note into a text summary with uncertainty.", "حوّل الرسالة إلى ملخص نصي مع عدم يقين."),
          effectLabel: t("Nuance", "دقة"),
          feedback: t("Nuance lowers spread pressure and weakens the emotional impulse.", "الدقة تقلل ضغط الانتشار وتضعف الاندفاع العاطفي."),
          lesson: t("Voice-note urgency is strongest when it sounds intimate and immediate.", "إلحاح الرسائل الصوتية يكون أقوى عندما تبدو حميمة وفورية."),
          scoreDelta: 0,
          correct: false,
          tags: ["voice-note", "uncertainty"],
        },
      ],
    },
    {
      id: "egy-poster",
      title: t("Round 2: Scholarship scam poster", "الجولة 2: ملصق منحة احتيالي"),
      scene: t("A polished Arabic poster promises a scholarship and asks for payment to reserve a seat.", "ملصق عربي مصمم جيداً يعد بمنحة ويطلب الدفع لتأكيد المقعد."),
      prompt: t("Which move helps the fake poster pass as real?", "أي حركة تساعد الملصق المزيف أن يمر كأنه حقيقي؟"),
      objective: t("Detect design-led trust theft.", "اكتشف سرقة الثقة عبر التصميم."),
      choices: [
        {
          id: "egy-poster-1",
          label: t("Add fake logos and a shortened payment link.", "أضف شعارات مزيفة ورابط دفع مختصر."),
          effectLabel: t("Visual authority", "سلطة بصرية"),
          feedback: t("Correct for the simulation: logos plus payment urgency create a strong scam cocktail.", "صحيح داخل المحاكاة: الشعارات مع إلحاح الدفع تولّد خليطاً احتيالياً قوياً."),
          lesson: t("Domains and institutional announcements matter more than poster quality.", "النطاقات والإعلانات المؤسسية أهم من جودة الملصق."),
          scoreDelta: 3,
          correct: true,
          tags: ["scam", "design"],
        },
        {
          id: "egy-poster-2",
          label: t("Ask for the official domain and archived announcement.", "اطلب النطاق الرسمي والإعلان المؤرشف."),
          effectLabel: t("Domain verification", "التحقق من النطاق"),
          feedback: t("That interrupts the scam by forcing traceability.", "هذا يقطع الاحتيال لأنه يفرض قابلية التتبع."),
          lesson: t("When money is requested before verification, default to suspicion.", "عندما يُطلب المال قبل التحقق، فالاشتباه هو الوضع الافتراضي."),
          scoreDelta: 0,
          correct: false,
          tags: ["domain", "archive"],
        },
        {
          id: "egy-poster-3",
          label: t("Tell people to trust the poster because many shared it.", "قل للناس أن يثقوا في الملصق لأن كثيرين شاركوه."),
          effectLabel: t("Social proof", "دليل اجتماعي"),
          feedback: t("Social proof adds pressure, but fake logos plus payment pressure is the stronger move here.", "الدليل الاجتماعي يضيف ضغطاً، لكن الشعارات المزيفة مع ضغط الدفع أقوى هنا."),
          lesson: t("Virality is not institutional proof.", "الانتشار ليس دليلاً مؤسسياً."),
          scoreDelta: 1,
          correct: false,
          tags: ["virality", "social-proof"],
        },
      ],
    },
    {
      id: "egy-local-clip",
      title: t("Round 3: Cropped local clip", "الجولة 3: مقطع محلي مبتور"),
      scene: t("A short clip of a local official looks shocking, but the date and full event are missing.", "مقطع قصير لمسؤول محلي يبدو صادماً، لكن التاريخ والحدث الكامل مفقودان."),
      prompt: t("Which move makes the clip feel conclusive?", "أي حركة تجعل المقطع يبدو حاسماً؟"),
      objective: t("Detect caption framing and context theft.", "اكتشف التأطير بالتعليق وسرقة السياق."),
      choices: [
        {
          id: "egy-local-clip-1",
          label: t("Add a caption that tells people what to think before they ask for context.", "أضف تعليقاً يخبر الناس بما يفكرون به قبل أن يطلبوا السياق."),
          effectLabel: t("Frame before evidence", "التأطير قبل الدليل"),
          feedback: t("Correct for the simulation: captions often do the manipulative work the clip itself cannot prove.", "صحيح داخل المحاكاة: التعليقات تؤدي كثيراً العمل التلاعبي الذي لا يستطيع المقطع نفسه إثباته."),
          lesson: t("Read the caption as a separate claim, not as proof attached to the clip.", "اقرأ التعليق كادعاء منفصل لا كدليل ملتصق بالمقطع."),
          scoreDelta: 3,
          correct: true,
          tags: ["caption", "context"],
        },
        {
          id: "egy-local-clip-2",
          label: t("Look for the full video and event coverage.", "ابحث عن الفيديو الكامل وتغطية الحدث."),
          effectLabel: t("Full context", "السياق الكامل"),
          feedback: t("That is the public defense and destroys false certainty.", "هذا هو الدفاع العام ويهدم اليقين الزائف."),
          lesson: t("Short clips are one of the easiest formats to weaponize.", "المقاطع القصيرة من أسهل الصيغ التي يمكن تسليحها."),
          scoreDelta: 0,
          correct: false,
          tags: ["full-video", "coverage"],
        },
        {
          id: "egy-local-clip-3",
          label: t("Say the emotion in the timeline proves authenticity.", "قل إن المشاعر في الخط الزمني تثبت الأصالة."),
          effectLabel: t("Emotion as proof", "العاطفة كدليل"),
          feedback: t("Emotion boosts spread, but caption framing is the stronger tactic here.", "العاطفة تعزز الانتشار، لكن التأطير بالتعليق أقوى هنا."),
          lesson: t("Emotional reaction is not a validity test.", "الاستجابة العاطفية ليست اختباراً للصحة."),
          scoreDelta: 1,
          correct: false,
          tags: ["emotion", "timeline"],
        },
      ],
    },
    {
      id: "egy-sectarian",
      title: t("Round 4: Sectarian heat", "الجولة 4: حرارة طائفية"),
      scene: t("After a local incident, a post blames an entire group and demands immediate retaliation.", "بعد حادث محلي، يلوم منشور جماعة كاملة ويطالب برد فوري."),
      prompt: t("Which move drives the post hardest?", "أي حركة تدفع المنشور بقوة أكبر؟"),
      objective: t("Catch identity escalation and retaliation language.", "التقط تصعيد الهوية ولغة الانتقام."),
      choices: [
        {
          id: "egy-sectarian-1",
          label: t("Turn one incident into proof about the whole group.", "حوّل حادثاً واحداً إلى دليل على الجماعة كلها."),
          effectLabel: t("Generalization", "تعميم"),
          feedback: t("Correct for the simulation: single-case generalization powers sectarian spread.", "صحيح داخل المحاكاة: التعميم من حالة واحدة يغذي الانتشار الطائفي."),
          lesson: t("If a post moves from one case to one community too fast, freeze it immediately.", "إذا انتقل المنشور من حالة واحدة إلى مجتمع كامل بسرعة، فجمّده فوراً."),
          scoreDelta: 3,
          correct: true,
          tags: ["sectarian", "generalization"],
        },
        {
          id: "egy-sectarian-2",
          label: t("Ask for verified reporting and confirmed details only.", "اطلب تقارير موثقة وتفاصيل مؤكدة فقط."),
          effectLabel: t("Verification", "تحقق"),
          feedback: t("That reduces heat and restores evidence standards.", "هذا يخفف الحرارة ويعيد معايير الدليل."),
          lesson: t("Sectarian escalation thrives when verification collapses.", "التصعيد الطائفي يزدهر عندما ينهار التحقق."),
          scoreDelta: 0,
          correct: false,
          tags: ["reporting", "details"],
        },
        {
          id: "egy-sectarian-3",
          label: t("Tell people silence means complicity.", "قل للناس إن الصمت يعني التواطؤ."),
          effectLabel: t("Moral pressure", "ضغط أخلاقي"),
          feedback: t("Moral blackmail is strong, but group generalization is the core escalator here.", "الابتزاز الأخلاقي قوي، لكن تعميم الجماعة هو المحرك الأساسي هنا."),
          lesson: t("Moral blackmail is often used to bypass slow verification.", "الابتزاز الأخلاقي يُستخدم كثيراً لتجاوز التحقق البطيء."),
          scoreDelta: 1,
          correct: false,
          tags: ["moral-pressure", "urgency"],
        },
      ],
    },
  ],
};

const POV_MODE: DeepRealGameModeDefinition = {
  id: "pov",
  title: t("POV Good Signal Lab", "مختبر POV للإشارة الجيدة"),
  subtitle: t(
    "The reverse mode: instead of learning how falsehood spreads, learn how strong truthful communication survives scrutiny.",
    "الوضع المعاكس: بدلاً من تعلّم كيف ينتشر الزيف، تعلّم كيف ينجو التواصل الصادق من التدقيق."
  ),
  roleLabel: t("Protective move", "الحركة الوقائية"),
  scoreLabel: t("Credibility score", "درجة المصداقية"),
  warning: t(
    "This mode rewards clarity, evidence, uncertainty disclosure, and safe handoff.",
    "هذا الوضع يكافئ الوضوح والدليل والإفصاح عن عدم اليقين والإحالة الآمنة."
  ),
  completionTitle: t("You built a trustworthy communication pattern.", "لقد بنيت نمط تواصل جديراً بالثقة."),
  completionSummary: t(
    "Carry this into the whole site: evidence first, uncertainty visible, and no claim without a traceable route.",
    "احمل هذا إلى كامل الموقع: الدليل أولاً، عدم اليقين ظاهر، ولا ادعاء بلا مسار قابل للتتبع."
  ),
  sources: [
    source("Digital Inquiry Group - SIFT", "مجموعة الاستقصاء الرقمي - SIFT", "https://cor.stanford.edu/curriculum/collections/sift"),
    source("News Literacy Project", "مشروع الثقافة الخبرية", "https://newslit.org/educators/resources/"),
    source("WHO Infodemic Guidance", "إرشادات منظمة الصحة العالمية لموجة التضليل", "https://www.who.int/news-room/questions-and-answers/item/disinformation-and-public-health"),
    source("InVID WeVerify", "إنفِد وي فيريفاي", "https://www.invid-project.eu/tools-and-services/invid-verification-plugin/"),
  ],
  rounds: [
    {
      id: "pov-health",
      title: t("Round 1: Calm public-health update", "الجولة 1: تحديث صحي هادئ"),
      scene: t("You need to share a health update without feeding panic. Evidence exists, but certainty is partial.", "تحتاج إلى مشاركة تحديث صحي دون تغذية الذعر. يوجد دليل لكن اليقين جزئي."),
      prompt: t("Which move makes the update most trustworthy?", "أي حركة تجعل التحديث أكثر جدارة بالثقة؟"),
      objective: t("Reward evidence plus uncertainty.", "كافئ الدليل مع عدم اليقين."),
      choices: [
        {
          id: "pov-health-1",
          label: t("State what is known, what is unknown, and link the official source.", "اذكر ما هو معروف وما هو غير معروف واربط المصدر الرسمي."),
          effectLabel: t("Evidence + uncertainty", "دليل + عدم يقين"),
          feedback: t("Correct: visible uncertainty plus a traceable route increases trust.", "صحيح: عدم اليقين الظاهر مع مسار قابل للتتبع يرفع الثقة."),
          lesson: t("You do not need false certainty to sound competent.", "لا تحتاج إلى يقين زائف لكي تبدو كفؤاً."),
          scoreDelta: 3,
          correct: true,
          tags: ["uncertainty", "official-source"],
        },
        {
          id: "pov-health-2",
          label: t("Hide uncertainty to keep people calm.", "أخفِ عدم اليقين حتى يظل الناس هادئين."),
          effectLabel: t("Comfort over truth", "راحة فوق الحقيقة"),
          feedback: t("That may feel safer short-term, but it weakens long-term credibility.", "قد يبدو أكثر أماناً على المدى القصير، لكنه يضعف المصداقية على المدى الطويل."),
          lesson: t("Calm communication is strongest when it stays honest about limits.", "التواصل الهادئ يكون أقوى عندما يبقى صادقاً بشأن حدوده."),
          scoreDelta: 0,
          correct: false,
          tags: ["comfort", "credibility"],
        },
        {
          id: "pov-health-3",
          label: t("Use dramatic language so people take it seriously.", "استخدم لغة درامية حتى يأخذها الناس بجدية."),
          effectLabel: t("Drama", "دراما"),
          feedback: t("Drama may raise attention, but it also raises distortion risk.", "الدراما قد ترفع الانتباه، لكنها ترفع أيضاً خطر التشويه."),
          lesson: t("Serious topics do not require theatrical language to be important.", "الموضوعات الجادة لا تحتاج لغة مسرحية حتى تكون مهمة."),
          scoreDelta: 0,
          correct: false,
          tags: ["attention", "drama"],
        },
      ],
    },
    {
      id: "pov-school",
      title: t("Round 2: Exam rumor in a school group", "الجولة 2: شائعة امتحان في مجموعة مدرسية"),
      scene: t("A school group is panicking over a rumored exam change. You want to help, not amplify noise.", "مجموعة مدرسية في حالة ذعر بسبب تغيير مزعوم في الامتحان. تريد أن تساعد لا أن تضخم الضوضاء."),
      prompt: t("Which move is the strongest corrective response?", "أي حركة هي أقوى استجابة تصحيحية؟"),
      objective: t("Reward verification before reassurance.", "كافئ التحقق قبل الطمأنة."),
      choices: [
        {
          id: "pov-school-1",
          label: t("Pause the thread, link the official channel, and say the rumor is unverified.", "أوقف السلسلة واربط القناة الرسمية واذكر أن الشائعة غير موثقة."),
          effectLabel: t("Hold + route", "توقيف + توجيه"),
          feedback: t("Correct: you lowered heat and redirected attention to a trustworthy route.", "صحيح: لقد خفضت الحرارة وأعدت التوجيه إلى مسار جدير بالثقة."),
          lesson: t("The best corrective move often starts with slowing the room down.", "أفضل حركة تصحيحية تبدأ كثيراً بإبطاء الغرفة."),
          scoreDelta: 3,
          correct: true,
          tags: ["hold", "routing"],
        },
        {
          id: "pov-school-2",
          label: t("Share your guess to reduce stress quickly.", "شارك تخمينك لتقليل التوتر بسرعة."),
          effectLabel: t("Speculation", "تخمين"),
          feedback: t("Guessing under pressure often creates a second rumor layer.", "التخمين تحت الضغط يصنع غالباً طبقة شائعة ثانية."),
          lesson: t("Helping fast is not the same as helping well.", "المساعدة بسرعة ليست هي نفسها المساعدة جيداً."),
          scoreDelta: 0,
          correct: false,
          tags: ["speculation", "stress"],
        },
        {
          id: "pov-school-3",
          label: t("Tell everyone not to worry without offering a source.", "قل للجميع ألا يقلقوا دون تقديم مصدر."),
          effectLabel: t("Unbacked reassurance", "طمأنة بلا سند"),
          feedback: t("Comfort without a route is fragile and easy to break.", "الراحة بلا مسار هشّة ويسهل كسرها."),
          lesson: t("Reassurance becomes stronger when anchored to a verifiable channel.", "الطمأنة تصبح أقوى عندما ترتكز إلى قناة قابلة للتحقق."),
          scoreDelta: 0,
          correct: false,
          tags: ["reassurance", "source"],
        },
      ],
    },
    {
      id: "pov-mh",
      title: t("Round 3: Mental-health advice online", "الجولة 3: نصيحة صحة نفسية على الإنترنت"),
      scene: t("Someone asks for help online. You want to respond safely without diagnosis theater.", "شخص يطلب المساعدة على الإنترنت. تريد أن ترد بأمان دون مسرحية تشخيص."),
      prompt: t("Which move is the safest and most credible?", "أي حركة هي الأكثر أماناً ومصداقية؟"),
      objective: t("Reward support plus boundary clarity.", "كافئ الدعم مع وضوح الحدود."),
      choices: [
        {
          id: "pov-mh-1",
          label: t("Acknowledge distress, avoid diagnosis, and route to trusted support or formal care by urgency.", "اعترف بالضيق وتجنب التشخيص ووجّه إلى دعم موثوق أو رعاية رسمية حسب الإلحاح."),
          effectLabel: t("Support + boundary", "دعم + حدود"),
          feedback: t("Correct: this keeps care, safety, and humility visible at the same time.", "صحيح: هذا يُبقي الرعاية والسلامة والتواضع ظاهرة في الوقت نفسه."),
          lesson: t("The strongest MH communication supports the person without pretending to be their clinician.", "أقوى تواصل في الصحة النفسية يدعم الشخص دون التظاهر بأنك طبيبه."),
          scoreDelta: 3,
          correct: true,
          tags: ["mh", "routing"],
        },
        {
          id: "pov-mh-2",
          label: t("Name a diagnosis quickly so they feel understood.", "سمِّ تشخيصاً بسرعة حتى يشعروا بأنك فهمتهم."),
          effectLabel: t("Diagnosis theater", "مسرحية التشخيص"),
          feedback: t("Rapid labeling may feel validating, but it raises error and role-confusion risk.", "التسمية السريعة قد تبدو داعمة، لكنها ترفع خطر الخطأ واختلاط الأدوار."),
          lesson: t("Understanding and diagnosing are not the same act.", "الفهم والتشخيص ليسا الفعل نفسه."),
          scoreDelta: 0,
          correct: false,
          tags: ["diagnosis", "validation"],
        },
        {
          id: "pov-mh-3",
          label: t("Offer motivational slogans only.", "قدّم شعارات تحفيزية فقط."),
          effectLabel: t("Motivation-only", "تحفيز فقط"),
          feedback: t("Encouragement helps, but on its own it can feel empty or minimizing.", "التشجيع مفيد، لكن بمفرده قد يبدو فارغاً أو مُقَلِّلاً من الضيق."),
          lesson: t("Support becomes credible when it includes a concrete next step.", "الدعم يصبح ذا مصداقية عندما يتضمن خطوة تالية واضحة."),
          scoreDelta: 0,
          correct: false,
          tags: ["motivation", "support"],
        },
      ],
    },
    {
      id: "pov-deepfake",
      title: t("Round 4: Suspicious clip", "الجولة 4: مقطع مشبوه"),
      scene: t("A clip looks authentic but something feels off. You want to guide the group responsibly.", "مقطع يبدو أصيلاً لكن هناك شيئاً غير مريح. تريد أن توجه المجموعة بصورة مسؤولة."),
      prompt: t("Which move models high-trust behavior best?", "أي حركة تمثل سلوكاً عالي الثقة بأفضل صورة؟"),
      objective: t("Reward traceable verification steps.", "كافئ خطوات التحقق القابلة للتتبع."),
      choices: [
        {
          id: "pov-deepfake-1",
          label: t("State that authenticity is not confirmed, then ask for the original upload and reverse-search route.", "اذكر أن الأصالة غير مؤكدة ثم اطلب الرفع الأصلي ومسار البحث العكسي."),
          effectLabel: t("Traceable verification", "تحقق قابل للتتبع"),
          feedback: t("Correct: you preserved uncertainty and gave the group a real next method.", "صحيح: حافظت على عدم اليقين وقدمت للمجموعة طريقة تالية حقيقية."),
          lesson: t("Credible correction is procedural, not just emotional.", "التصحيح الموثوق إجرائي لا عاطفي فقط."),
          scoreDelta: 3,
          correct: true,
          tags: ["deepfake", "reverse-search"],
        },
        {
          id: "pov-deepfake-2",
          label: t("Declare it fake immediately to stop the spread.", "أعلنه مزيفاً فوراً لإيقاف الانتشار."),
          effectLabel: t("Overclaiming", "مبالغة"),
          feedback: t("Fast rejection may feel protective, but overclaiming without proof damages trust.", "الرفض السريع قد يبدو وقائياً، لكن المبالغة بلا دليل تضر الثقة."),
          lesson: t("Anti-misinformation work still has to obey evidence limits.", "العمل ضد التضليل ما زال عليه أن يلتزم بحدود الدليل."),
          scoreDelta: 0,
          correct: false,
          tags: ["overclaim", "trust"],
        },
        {
          id: "pov-deepfake-3",
          label: t("Share it with a warning emoji and no method.", "شاركه مع رمز تحذير فقط ودون منهج."),
          effectLabel: t("Methodless warning", "تحذير بلا منهج"),
          feedback: t("Warning without process amplifies attention without improving judgment.", "التحذير بلا عملية يزيد الانتباه دون أن يحسن الحكم."),
          lesson: t("A warning works best when it includes a concrete verification path.", "التحذير يعمل بأفضل صورة عندما يتضمن مسار تحقق واضحاً."),
          scoreDelta: 0,
          correct: false,
          tags: ["warning", "method"],
        },
      ],
    },
  ],
};

export const DEEPREAL_GAME_MODES: DeepRealGameModeDefinition[] = [CLASSIC_MODE, EGY_MODE, POV_MODE, IMMUNITY_RUMORS_MODE, IMMUNITY_SCAMS_MODE, IMMUNITY_TIKTOK_MODE];

export function getDeepRealGameMode(modeId: DeepRealGameModeId) {
  return DEEPREAL_GAME_MODES.find((mode) => mode.id === modeId) ?? DEEPREAL_GAME_MODES[0];
}
