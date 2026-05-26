import type { LocalizedText, ModuleId } from "./module-briefings";

export interface AuthoredLibraryItem {
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
  contentOrigin?: "authored";
}

function t(en: string, ar: string, arEG?: string): LocalizedText {
  return { en, ar, arEG: arEG || ar };
}

function markAuthored(items: AuthoredLibraryItem[]) {
  return items.map((item) => ({ ...item, contentOrigin: "authored" as const }));
}

export const AUTHORED_BRAIN_EXERCISES: AuthoredLibraryItem[] = markAuthored([
  {
    id: "brain-dr-egypt-whatsapp-chain",
    module: "deepreal",
    title: t("Egypt WhatsApp rumor break", "كسر شائعة واتساب المصرية", "إزاي توقف إشاعة واتساب في مصر"),
    summary: t(
      "Practice slowing a forwarded Arabic voice note before it turns family trust into misinformation spread.",
      "تدرّب على إبطاء الملاحظة الصوتية العربية المحوّلة قبل أن تتحول ثقة العائلة إلى نشر للتضليل.",
      "اتعلم إزاي تهدي الريكوردات اللي بتتبعت على الواتساب قبل ما تخلي العيلة كلها تنشر إشاعات من غير ما تقصد."
    ),
    action: t(
      "Extract the exact claim, identify the missing source, then compare with the Ministry of Health and one international source.",
      "استخرج الادعاء الدقيق، وحدد المصدر المفقود، ثم قارنه بوزارة الصحة ومصدر دولي واحد.",
      "طلع المعلومة اللي بتتقال بالظبط، وشوف إيه المصدر اللي ناقص، وقارن الكلام بصفحة وزارة الصحة ومصدر دولي تاني."
    ),
    intensity: "medium",
    tags: ["egypt", "whatsapp", "family", "verification"],
    goal: t("Turn a family rumor into a documented verification path.", "حوّل شائعة عائلية إلى مسار تحقق موثق.", "حول إشاعة جاية من العيلة لخطوات تأكد حقيقية."),
    decisionLogic: [
      t("A forwarded voice note with no institution, date, or document starts in hold mode.", "الملاحظة الصوتية المحوّلة بلا جهة أو تاريخ أو وثيقة تبدأ مباشرة في وضع التوقف.", "أي ريكورد مبعوث من غير جهة رسمية أو تاريخ واضح لازم توقفه فوراً."),
      t("Family trust lowers skepticism, so the method must become stricter, not softer.", "ثقة العائلة تخفض الشك، لذلك يجب أن يصبح المنهج أكثر صرامة لا أكثر تساهلاً.", "عشان بنحب أهلنا وبنثق فيهم بنصدقهم بسرعة، فالمفروض نتأكد أكتر مش أقل."),
      t("Health claims must be routed to official Egyptian and international anchors before belief.", "الادعاءات الصحية يجب أن تُوجّه إلى مرجع مصري رسمي ومرجع دولي قبل التصديق.", "أي كلام عن الصحة لازم يرجع لوزارة الصحة المصرية ومنظمة الصحة العالمية قبل ما نصدقه."),
    ],
    protocolNextAction: t(
      "Do not reply emotionally. Capture the exact wording, check MoHP and WHO, then send back only the verified outcome.",
      "لا ترد بعاطفة. التقط الصياغة الدقيقة، وافحص وزارة الصحة ومنظمة الصحة العالمية، ثم أعد فقط النتيجة المتحققة.",
      "ماتردش بمشاعرك. خد الكلام بالظبط، اتأكد من وزارة الصحة والمنظمة الدولية، وبعدين ابعتلهم الحقيقة اللي اتأكدت منها."
    ),
    linkedEvidenceClaimIds: ["claim-dr-risk", "claim-dr-training"],
    priority: "egypt-critical",
  },
  {
    id: "brain-mh-youth-stabilizer",
    module: "mental-health",
    title: t("Egypt youth stabilizer", "مثبّت الشباب في مصر", "مثبّت المشاعر للشباب في مصر"),
    summary: t(
      "Train a short sequence for overloaded students or young adults before they spiral into self-diagnosis or silence.",
      "درّب تسلسلاً قصيراً للطلاب أو الشباب المرهقين قبل أن ينزلقوا إلى التشخيص الذاتي أو الصمت.",
      "تدريب سريع للطلبة والشباب اللي حاسين بضغط كبير، عشان ما يقعوش في دوامة تشخيص نفسهم غلط أو يسكتوا خالص."
    ),
    action: t(
      "Name one feeling, one body cue, one function loss, and one safe person before reading any mental-health content.",
      "سم شعوراً واحداً، وإشارة جسدية واحدة، وتعطلاً وظيفياً واحداً، وشخصاً آمناً واحداً قبل قراءة أي محتوى نفسي.",
      "سمي شعور واحد حاسس بيه، وإشارة من جسمك، وحاجة مش عارف تعملها النهاردة، وشخص بتثق فيه، قبل ما تقرأ أي كلام عن النفسية."
    ),
    intensity: "medium",
    tags: ["egypt", "youth", "stabilization", "support"],
    goal: t("Reduce overload before interpretation.", "قلل الحمل النفسي قبل التفسير.", "قلل الضغط اللي عليك قبل ما تحاول تفسر حالتك."),
    decisionLogic: [
      t("When distress is high, explanation comes after stabilization, not before it.", "عندما يكون الضيق مرتفعاً، يأتي التفسير بعد التثبيت لا قبله.", "لما تكون تعبان أوي، لازم تهدا الأول وبعدين تدور على تفسير للي حاسس بيه."),
      t("Youth-facing content must reduce shame and route toward support, not labels.", "المحتوى الموجه للشباب يجب أن يقلل العار ويوجه إلى الدعم لا إلى الملصقات.", "الكلام اللي للشباب لازم يشيل كلمة 'عيب' ويوجههم لمكان يساعدهم بجد، مش بس 'ليبلز'."),
      t("Body cues and function loss are more actionable than identity guesses.", "إشارات الجسد وتعطل الوظيفة أكثر قابلية للفعل من تخمينات الهوية.", "إشارات جسمك والحاجات اللي مش قادر تعملها أصدق بكتير من إنك تخمن مرض عندك."),
    ],
    protocolNextAction: t(
      "If the user cannot complete the four-part stabilizer, move to support routing instead of education content.",
      "إذا لم يستطع المستخدم إكمال مثبت الأجزاء الأربعة، انتقل إلى مسار الدعم بدلاً من المحتوى التعليمي.",
      "لو مش قادر تكمل الأربع خطوات دول، يبقى لازم تروح لمكان يساعدك فوراً بدل ما تقرأ محتوى تعليمي."
    ),
    linkedEvidenceClaimIds: ["claim-mh-scale", "claim-mh-egypt"],
    priority: "egypt-critical",
  },
  {
    id: "brain-rh-boundary-drill",
    module: "religion-hub",
    title: t("Boundary-first reflection drill", "تمرين التأمل بحدود أولاً", "تمرين: حط حدودك وأنت بتفكر"),
    summary: t(
      "Practice separating comfort, authority, and care so spiritual language does not erase safety limits.",
      "تدرّب على فصل الطمأنينة عن السلطة عن الرعاية حتى لا تمحو اللغة الروحية حدود الأمان.",
      "اتعلم إزاي تفرق بين الراحة الروحية وبين حد بيحاول يسيطر عليك، عشان لغة الدين ما تنسيكش حدود أمانك."
    ),
    action: t(
      "Write three lines: what comforts, what controls, and what must be handed off to an official or clinical route.",
      "اكتب ثلاثة أسطر: ما الذي يطمئن، وما الذي يسيطر، وما الذي يجب إحالته إلى جهة رسمية أو سريرية.",
      "اكتب 3 حاجات: إيه اللي بيريحك، إيه اللي بيحاول يسيطر عليك، وإيه اللي لازم يروح لدكتور أو جهة رسمية."
    ),
    intensity: "medium",
    tags: ["egypt", "moderation", "boundaries", "care"],
    goal: t("Keep spiritual coping useful without letting it replace care or moderation.", "اجعل التكيف الروحي مفيداً من دون أن يستبدل الرعاية أو الاعتدال.", "خلي الدين يسندك بس ما يخليكش تسيب العلاج الطبي أو الاعتدال."),
    decisionLogic: [
      t("Useful comfort lowers panic but never erases the need for verification or referral.", "الطمأنينة المفيدة تقلل الهلع لكنها لا تمحو الحاجة إلى التحقق أو الإحالة.", "الراحة الروحية بتطمنك بس ما بتغنيش عن إنك تتأكد من المعلومة أو تروح لدكتور."),
      t("If the message demands obedience, shame, or isolation, it has crossed the coping boundary.", "إذا طالبت الرسالة بالطاعة أو العار أو العزلة فقد تجاوزت حدود التكيف.", "لو الكلام فيه إجبار على الطاعة أو إحساس بالذنب أو عزلة، يبقى ده مش دين، دي سيطرة."),
      t("Egypt-facing moderation requires visible official routes, not hidden assumptions.", "الاعتدال الموجه لمصر يتطلب مسارات رسمية مرئية لا افتراضات مخفية.", "الاعتدال في مصر محتاج مؤسسات رسمية واضحة بنلجأ لها، مش مجرد كلام عشوائي."),
    ],
    protocolNextAction: t(
      "If control language appears, stop reflection mode and move to moderation routing immediately.",
      "إذا ظهرت لغة السيطرة، أوقف وضع التأمل وانتقل فوراً إلى مسار الاعتدال.",
      "لو لقيت لغة سيطرة وإجبار، وقف تفكير وروح فوراً لمسار الاعتدال الرسمي."
    ),
    linkedEvidenceClaimIds: ["claim-rh-moderation", "claim-rh-boundaries"],
    priority: "egypt-critical",
  },
]);

export const AUTHORED_MYTHS: AuthoredLibraryItem[] = markAuthored([
  {
    id: "myth-dr-egypt-official-logo",
    module: "deepreal",
    title: t("An official-looking Arabic poster must be real", "الملصق العربي الذي يبدو رسمياً لا بد أن يكون حقيقياً", "أي بوستر عربي شكله رسمي مش معناه إنه حقيقي"),
    summary: t(
      "Fraud and rumor campaigns often borrow logos, ministry colors, and bureaucratic tone to simulate legitimacy.",
      "حملات الاحتيال والشائعات تستعير كثيراً الشعارات وألوان الوزارات والنبرة البيروقراطية لتصنع شرعية وهمية.",
      "النصابين والناس اللي بتنشر إشاعات بيسرقوا لوجو الوزارة والألوان الرسمية عشان يضحكوا عليك ويحسسوك إن الكلام بجد."
    ),
    action: t(
      "Verify the domain, the issuing body, and the publication trace before trusting the visual design.",
      "تحقق من النطاق، والجهة المُصدرة، وأثر النشر قبل الثقة في الشكل البصري.",
      "اتأكد من الموقع والجهة اللي منزلة الكلام وشوف الخبر منشور فين، وما تنخدعش بالشكل الشيك."
    ),
    intensity: "high",
    tags: ["egypt", "logos", "posters", "fraud"],
    linkedEvidenceClaimIds: ["claim-dr-risk"],
    priority: "egypt-critical",
  },
  {
    id: "myth-mh-faith-enough",
    module: "mental-health",
    title: t("If faith is present, support is unnecessary", "إذا وُجد الإيمان فلا حاجة إلى الدعم", "لو إيمانك قوي مش محتاج دكتور"),
    summary: t(
      "This myth blocks help-seeking by turning distress into a moral failure instead of a support decision.",
      "هذه الخرافة تعطل طلب المساعدة عبر تحويل الضيق إلى فشل أخلاقي بدلاً من قرار دعم.",
      "الخرافة دي بتخليك تتكسف تطلب مساعدة وبتحسسك إن تعبك ده نقص في الدين، وده غلط تماماً."
    ),
    action: t(
      "Separate spiritual comfort from clinical or crisis routing and keep both visible.",
      "افصل بين الطمأنينة الروحية وبين التوجيه السريري أو الطارئ مع إبقائهما معاً في الصورة.",
      "فرق بين الراحة اللي بناخدها من الدين وبين العلاج الطبي، والاثنين مهمين وبيكملوا بعض."
    ),
    intensity: "high",
    tags: ["egypt", "stigma", "care", "religion-overlap"],
    linkedEvidenceClaimIds: ["claim-mh-egypt", "claim-rh-boundaries"],
    priority: "high-need",
  },
  {
    id: "myth-rh-therapy-weak-faith",
    module: "religion-hub",
    title: t("Therapy means weak faith", "العلاج النفسي يعني ضعف الإيمان", "العلاج النفسي مش معناه إن إيمانك ضعيف"),
    summary: t(
      "The message weaponizes guilt and collapses two different domains: spiritual meaning and professional care.",
      "الرسالة تسلح الذنب وتخلط بين مجالين مختلفين: المعنى الروحي والرعاية المهنية.",
      "الكلام ده بيستغل إحساسك بالذنب وبيخلط بين علاقتك بربنا وبين احتياجك لدكتور متخصص."
    ),
    action: t(
      "Route the claim through care-boundary logic and official moderation sources before accepting it.",
      "مرر الادعاء عبر منطق حدود الرعاية ومصادر الاعتدال الرسمية قبل قبوله.",
      "فكر في حدود العلاج وشوف رأي المؤسسات الدينية المعتدلة قبل ما تصدق الكلام ده."
    ),
    intensity: "high",
    tags: ["egypt", "therapy", "guilt", "boundaries"],
    linkedEvidenceClaimIds: ["claim-rh-boundaries", "claim-rh-moderation"],
    priority: "egypt-critical",
  },
]);

export const AUTHORED_SCENARIOS: AuthoredLibraryItem[] = markAuthored([
  {
    id: "scenario-dr-egypt-doctor-voice-note",
    module: "deepreal",
    title: t("Voice note: a doctor friend inside a Cairo hospital", "ملاحظة صوتية: صديق طبيب داخل مستشفى بالقاهرة", "ريكورد واتساب: 'واحد صاحبي دكتور في مستشفى حكومي'"),
    summary: t(
      "A viral note claims a hidden outbreak and demands immediate forwarding 'to save lives' but names no hospital statement or ministry notice.",
      "ملاحظة منتشرة تزعم وجود تفشٍ مخفي وتطلب النشر الفوري «لإنقاذ الأرواح» لكنها لا تذكر بيان مستشفى ولا إشعار وزارة.",
      "ريكورد منتشر بيقول إن في مرض جديد ومستخبي وبيطلب منك تبعته لكل الناس بسرعة 'عشان تلحقهم' بس مش بيقول اسم المستشفى ولا في أي خبر رسمي."
    ),
    action: t(
      "Hold the claim, trace the hospital source, compare against MoHP and WHO, then classify the mismatch.",
      "أوقف الادعاء، وتتبع مصدر المستشفى، وقارنه بوزارة الصحة ومنظمة الصحة العالمية، ثم صنف موضع التعارض.",
      "وقف الخبر عندك، دور على اسم المستشفى، وقارن الكلام بصفحة وزارة الصحة والمنظمات الدولية، وشوف الفروقات."
    ),
    intensity: "high",
    tags: ["egypt", "health", "whatsapp", "authority-claim"],
    goal: t("Determine whether insider authority is being fabricated or stripped from context.", "حدد هل يتم تلفيق سلطة داخلية أم نزعها من سياقها.", "اعرف لو كان حد بيألف كلام من دماغه ولا واخد جزء من الحقيقة ومغيره."),
    decisionLogic: [
      t("Unnamed insider authority is weaker than named institutional publication.", "السلطة الداخلية غير المسماة أضعف من النشر المؤسسي المسمى.", "أي حد يقول 'واحد صاحبي' ده مش مصدر، المصدر هو بيان رسمي باسم مؤسسة."),
      t("Life-or-death urgency raises the forwarding risk and requires official health confirmation.", "السلطة الداخلية غير المسماة أضعف من النشر المؤسسي المسمى.", "أي حد يقول 'واحد صاحبي' ده مش مصدر، المصدر هو بيان رسمي باسم مؤسسة."),
      t("Life-or-death urgency raises the forwarding risk and requires official health confirmation.", "استعجال الحياة أو الموت يرفع خطر إعادة النشر ويتطلب تأكيداً صحياً رسمياً.", "لما يكون الكلام فيه حياة أو موت، لازم نتأكد ألف مرة قبل ما نبعته ونخوف الناس."),
      t("If no hospital trace exists, the claim shifts from uncertainty toward rejection.", "إذا لم يوجد أثر للمستشفى يتحول الادعاء من الشك إلى الرفض.", "لو مفيش أي أثر للكلام ده في المستشفى المذكورة، يبقى الخبر ده بنسبة كبيرة كذب."),
    ],
    protocolNextAction: t(
      "Archive the note, log the missing source chain, and reply with verified ministry guidance only.",
      "أرشف الملاحظة، وسجل سلسلة المصدر المفقودة، ورد فقط بإرشاد الوزارة المتحقق.",
      "عين الريكورد عندك، وسجل إنه ملوش مصدر، ولما حد يسألك رد بكلام وزارة الصحة الرسمي بس."
    ),
    linkedEvidenceClaimIds: ["claim-dr-risk", "claim-dr-training"],
    priority: "egypt-critical",
  },
  {
    id: "scenario-dr-egypt-fake-scholarship",
    module: "deepreal",
    title: t("Urgent scholarship poster for Egyptian students", "ملصق منحة عاجلة للطلاب المصريين", "إعلان منحة دراسية مضروب للطلبة"),
    summary: t(
      "An Arabic poster uses government colors, promises a grant, and asks students to pay a processing fee within hours.",
      "ملصق عربي يستخدم ألواناً حكومية ويعد بمنحة ويطلب من الطلاب دفع رسوم معالجة خلال ساعات.",
      "بوستر عربي عليه لوجو الوزارة بيوعد بمنحة، وبيطلب من الطلبة يدفعوا مصاريف 'تخليص أوراق' في خلال ساعات."
    ),
    action: t(
      "Reject screenshot trust, inspect the registration domain, then verify whether the issuing body exists in a real institutional channel.",
      "ارفض الثقة في الصورة، وافحص نطاق التسجيل، ثم تحقق هل الجهة المعلنة موجودة فعلاً في قناة مؤسسية حقيقية.",
      "ماتثقش في أي صورة، بص على لينك الموقع اللي بيسجلوا عليه، وشوف هل الجهة دي فعلاً منزلة الخبر على صفحتها الرسمية."
    ),
    intensity: "high",
    tags: ["egypt", "students", "scam", "poster"],
    linkedEvidenceClaimIds: ["claim-dr-risk"],
    priority: "egypt-critical",
  },
  {
    id: "scenario-mh-egypt-thanaweya-panic",
    module: "mental-health",
    title: t("Thanaweya Amma panic spiral", "دوامة هلع الثانوية العامة", "دوامة رعب الثانوية العامة"),
    summary: t(
      "A student says they cannot sleep, cannot stop crying, and now believe a bad exam means their whole life is over.",
      "طالب يقول إنه لا يستطيع النوم، ولا يتوقف عن البكاء، ويعتقد الآن أن الامتحان السيئ يعني أن حياته انتهت.",
      "طالب بيقول إنه مش عارف ينام، مش مبطل عياط، وشايف إن لو نتيجته وحشة يبقى مستقبله كله ضاع."
    ),
    action: t(
      "Stabilize first, score danger and function loss, involve one trusted adult, then decide whether formal support is needed today.",
      "ثبّت الحالة أولاً، وقيّم الخطر وتعطل الوظيفة، وأشرك شخصاً بالغاً موثوقاً، ثم قرر هل يلزم دعم رسمي اليوم.",
      "اهدى الأول، شوف مدى التعب النفسي وتأثيره على يومك، اتكلم مع حد كبير بتثق فيه، وبعدين قرر لو محتاج دكتور النهاردة."
    ),
    intensity: "high",
    tags: ["egypt", "students", "panic", "support"],
    goal: t("Stop panic from turning into silence, shame, or self-diagnosis.", "أوقف الهلع قبل أن يتحول إلى صمت أو عار أو تشخيص ذاتي.", "وقف الرعب ده قبل ما يخليك تسكت وتتكسف أو تقعد تشخص نفسك غلط."),
    decisionLogic: [
      t("Exam context explains pressure but does not cancel risk assessment.", "سياق الامتحان يفسر الضغط لكنه لا يلغي تقييم الخطر.", "صحيح الامتحانات ضغط، بس ده مش معناه إننا نتجاهل حالة الطالب النفسية لو صعبة."),
      t("Sleep collapse, crying, and catastrophic beliefs require support routing, not motivational slogans.", "انهيار النوم والبكاء والمعتقدات الكارثية تتطلب توجيه دعم لا شعارات تحفيزية.", "لما النوم يطير والعياط ما يخلصش، الطالب محتاج مساعدة حقيقية مش مجرد كلام تشجيع."),
      t("A trusted adult is part of the route, not an optional extra.", "الشخص البالغ الموثوق جزء من المسار وليس إضافة اختيارية.", "وجود حد كبير واعي في الصورة ده أساس في العلاج مش حاجة زيادة."),
    ],
    protocolNextAction: t(
      "Move from content to support routing immediately if the student cannot return to baseline after stabilization.",
      "انتقل من المحتوى إلى مسار الدعم فوراً إذا لم يستطع الطالب العودة إلى خط الأساس بعد التثبيت.",
      "لو الطالب لسه تعبان بعد ما حاولنا نهديه، يبقى لازم يروح لمكان متخصص فوراً."
    ),
    linkedEvidenceClaimIds: ["claim-mh-scale", "claim-mh-egypt"],
    priority: "egypt-critical",
  },
  {
    id: "scenario-mh-egypt-discipline-home",
    module: "mental-health",
    title: t("Home discipline normalized as 'just how we raise children'", "العنف المنزلي المبرر بأنه «هذا أسلوب التربية»", "العنف في البيت اللي بيتقال عليه 'تربية'"),
    summary: t(
      "A caregiver insists harsh discipline is normal, while the child shows fear, shutdown, and persistent distress.",
      "مقدم رعاية يصر على أن العنف الشديد أمر طبيعي، بينما يظهر على الطفل خوف وانسحاب وضيق مستمر.",
      "الأهل شايفين إن الضرب والزعيق الجامد تربية عادية، بس الطفل باين عليه الخوف وساكت خالص وتعبان نفسياً."
    ),
    action: t(
      "Name the harm clearly, reject normalization, and route toward child-safe support and official guidance.",
      "سمِّ الضرر بوضوح، وارفض التطبيع معه، ووجّه نحو دعم آمن للطفل وإرشاد رسمي.",
      "سمي الوجع اللي بيحصل ده باسمه الحقيقي، ارفض إنه يكون عادي، وشوف طريق أمان للطفل وإرشاد رسمي."
    ),
    intensity: "high",
    tags: ["egypt", "child-safety", "family", "harm"],
    linkedEvidenceClaimIds: ["claim-mh-egypt"],
    priority: "egypt-critical",
  },
  {
    id: "scenario-rh-egypt-therapy-block",
    module: "religion-hub",
    title: t("A sermon clip says therapy means weak trust in God", "مقطع وعظي يقول إن العلاج النفسي ضعف في التوكل", "فيديو بيقول إن الدكتور النفسي ضد التوكل على ربنا"),
    summary: t(
      "The clip shames help-seeking, reframes care as disloyalty, and urges the viewer to stay inside guilt instead of seeking support.",
      "المقطع يعيب طلب المساعدة، ويعيد تصوير الرعاية كخيانة، ويدفع المشاهد للبقاء داخل الذنب بدلاً من طلب الدعم.",
      "الفيديو بيبكتك لو طلبت مساعدة، وبيحسسك إن العلاج خيانة لدينك، وبيخليك غرقان في ذنبك بدل ما تتعالج."
    ),
    action: t(
      "Run moderation checks, test the care boundary, and open the mental-health handoff if support is being blocked.",
      "شغّل فحوص الاعتدال، واختبر حدود الرعاية، وافتح إحالة الصحة النفسية إذا كان الدعم يُمنع.",
      "اتأكد من اعتدال الكلام، وشوف حدود الرعاية الطبية، وحول الحالة لدكتور نفسي لو الكلام بيمنع العلاج."
    ),
    intensity: "high",
    tags: ["egypt", "guilt", "therapy", "moderation"],
    goal: t("Decide whether the message still functions as guidance or has become control.", "حدد هل ما زالت الرسالة تعمل كتوجيه أم تحولت إلى سيطرة.", "قرر لو كان الكلام ده نصيحة بجد ولا محاولة سيطرة باسم الدين."),
    decisionLogic: [
      t("Once a message blocks care, it stops being only theological and becomes a safety issue.", "عندما تمنع الرسالة الرعاية فهي تتوقف عن كونها مسألة لاهوتية فقط وتصبح مسألة أمان.", "أول ما الكلام يمنع العلاج، مبيبقاش مجرد رأي ديني، بيبقى خطر على الحياة."),
      t("Shame-based obedience is a moderation failure, not a sign of depth.", "الطاعة القائمة على العار فشل في الاعتدال وليست علامة عمق.", "إنك تسمع الكلام عشان خايف أو مكسوف ده مش تدين، ده فشل في فهم حقيقة الدين."),
      t("The correct route may include both official moderation and mental-health referral.", "المسار الصحيح قد يشمل الاعتدال الرسمي والإحالة للصحة النفسية معاً.", "الحل الصح بيبقى كلام معتدل مع علاج طبي متخصص في نفس الوقت."),
    ],
    protocolNextAction: t(
      "Do not argue inside the clip’s framing. Switch to official moderation plus care-boundary routing.",
      "لا تجادل داخل إطار المقطع. انتقل إلى مسار الاعتدال الرسمي مع حدود الرعاية.",
      "ماتدخلش في نقاش مع الفيديو بنفس طريقته. روح لمسار الاعتدال الرسمي وشوف حدود الرعاية الطبية."
    ),
    linkedEvidenceClaimIds: ["claim-rh-moderation", "claim-rh-boundaries"],
    priority: "egypt-critical",
  },
  {
    id: "scenario-rh-egypt-sectarian-rumor",
    module: "religion-hub",
    title: t("Sectarian rumor after a local incident", "شائعة طائفية بعد حادث محلي", "إشاعة فتنة بعد مشكلة في المنطقة"),
    summary: t(
      "A post frames an entire religious community as intentionally hostile, cites no primary evidence, and asks users to 'wake up' before it is too late.",
      "منشور يصوّر مجتمعاً دينياً كاملاً كأنه معادٍ عمداً، بلا دليل أولي، ويطلب من الناس «أن يصحوا قبل فوات الأوان».",
      "بوست بيتهم طائفة كاملة إنهم قاصدين يعملوا مشاكل، من غير أي دليل حقيقي، وبيسخن الناس عشان 'يفوقوا' قبل فوات الأوان."
    ),
    action: t(
      "Freeze sharing, inspect the source chain, and route the content through official moderation before any emotional response.",
      "جمّد المشاركة، وافحص سلسلة المصدر، ومرر المحتوى عبر جهة اعتدال رسمية قبل أي استجابة عاطفية.",
      "وقف الشير فوراً، شوف الكلام جاي منين، واسمع لجهة اعتدال رسمية قبل ما تنفعل وتصدق."
    ),
    intensity: "high",
    tags: ["egypt", "sectarian", "rumor", "moderation"],
    linkedEvidenceClaimIds: ["claim-rh-moderation"],
    priority: "egypt-critical",
  },
]);

export const AUTHORED_TRICKS: AuthoredLibraryItem[] = markAuthored([
  {
    id: "trick-dr-arabic-name-search",
    module: "deepreal",
    title: t("Search the Arabic claim and its translation", "ابحث عن الادعاء بالعربية وترجمته", "دور على الخبر بالعربي وبالإنجليزي"),
    summary: t(
      "A claim may look invisible in one language but become obviously false when searched in both Arabic and English.",
      "قد يبدو الادعاء غير مرئي في لغة واحدة لكنه يصبح واضح الزيف عند البحث عنه بالعربية والإنجليزية معاً.",
      "ساعات الخبر مبيبانش حقيقته بلغة واحدة، بس لما تدور عليه بالعربي وبالإنجليزي هتعرف لو كان كذب بسرعة."
    ),
    action: t(
      "Search the exact Arabic wording, then search a precise English translation before deciding there is no evidence.",
      "ابحث عن الصياغة العربية الدقيقة، ثم عن ترجمة إنجليزية دقيقة قبل أن تقرر عدم وجود دليل.",
      "جرب تبحث بالكلام العربي بالظبط، وبعدين جرب ترجمة إنجليزية صحيحة وشوف النتائج قبل ما تقرر."
    ),
    intensity: "medium",
    tags: ["arabic", "search", "verification", "egypt"],
    linkedEvidenceClaimIds: ["claim-dr-training"],
    priority: "egypt-critical",
  },
  {
    id: "trick-mh-one-safe-contact",
    module: "mental-health",
    title: t("Keep one Egypt-safe contact visible", "أبقِ جهة اتصال مصرية آمنة واحدة مرئية", "خلي معاك رقم حد موثوق في مصر"),
    summary: t(
      "The fastest route to safety is often one visible trusted person or official service, not more reading.",
      "أسرع طريق إلى الأمان غالباً هو شخص موثوق أو خدمة رسمية مرئية، لا مزيد من القراءة.",
      "أسرع طريقة تحميك هي إنك تكلم حد بتثق فيه أو جهة رسمية، مش إنك تقعد تقرأ أكتر."
    ),
    action: t(
      "Pin one trusted contact or official Egyptian service before entering heavy content.",
      "ثبّت جهة اتصال موثوقة واحدة أو خدمة مصرية رسمية قبل الدخول في محتوى ثقيل.",
      "خلي رقم حد بتثق فيه أو رقم خدمة رسمية قدام عينك قبل ما تقرأ أي كلام تقيل."
    ),
    intensity: "low",
    tags: ["egypt", "support", "routing"],
    linkedEvidenceClaimIds: ["claim-mh-egypt"],
    priority: "high-need",
  },
  {
    id: "trick-rh-official-route-check",
    module: "religion-hub",
    title: t("Ask which official route this message belongs to", "اسأل: إلى أي جهة رسمية تنتمي هذه الرسالة؟", "اسأل: الكلام ده تبع أنهي مؤسسة رسمية؟"),
    summary: t(
      "Many coercive messages collapse when you ask which real institution would own the claim or the guidance.",
      "تنهار رسائل قسرية كثيرة عندما تسأل أي مؤسسة حقيقية ستتبنى الادعاء أو التوجيه.",
      "رسائل كتير بتهدد وتخوف بتبان إنها فاضية لما تسأل: هي أنهي مؤسسة بجد اللي منزلة الكلام ده؟"
    ),
    action: t(
      "Name the likely institution. If none fits, treat the message as high-risk moderation content.",
      "سمِّ المؤسسة المحتملة. إذا لم تنطبق أي جهة، فتعامل مع الرسالة كمحتوى اعتدال عالي الخطورة.",
      "سمي المؤسسة اللي المفروض منزلة الخبر، لو ملقيتش يبقى الكلام ده خطر ومشكوك فيه."
    ),
    intensity: "medium",
    tags: ["egypt", "moderation", "official-route"],
    linkedEvidenceClaimIds: ["claim-rh-moderation"],
    priority: "egypt-critical",
  },
]);

export const AUTHORED_BRAIN_EXERCISES_EXTENDED: AuthoredLibraryItem[] = markAuthored([
  {
    id: "brain-dr-tiktok-health-scam",
    module: "deepreal",
    title: t("TikTok Egyptian health rumor triage", "فرز شائعة صحية مصرية على تيك توك", "فرز إشاعة دواء مضروب على تيك توك"),
    summary: t(
      "Practice verifying a viral TikTok clip claiming a banned substance is being sold as medicine in Egyptian pharmacies.",
      "تدرّب على التحقق من مقطع تيك توك منتشر يزعم بيع مادة محظورة كدواء في صيدليات مصرية.",
      "اتعلم إزاي تتأكد من فيديوهات تيك توك اللي بتقول إن في دواء محظور بيتباع في الصيدليات في مصر."
    ),
    action: t(
      "Extract the drug name, check the Egyptian Drug Authority registry, then compare with WHO essential medicines list.",
      "استخرج اسم الدواء، وراجع سجل هيئة الدواء المصرية، ثم قارن بقائمة الأدوية الأساسية لمنظمة الصحة العالمية.",
      "خد اسم الدواء، وادخل على موقع هيئة الدواء المصرية، وقارنه بقائمة منظمة الصحة العالمية."
    ),
    intensity: "high",
    tags: ["egypt", "tiktok", "health", "pharmacy", "verification"],
    goal: t("Turn a viral scare into a documented verification trail.", "حوّل فزعاً فيروسياً إلى مسار تحقق موثق.", "حول الخوف من الفيديو لخطوات تأكد حقيقية."),
    decisionLogic: [
      t("Viral health scares exploit urgency and parental fear simultaneously.", "الفزع الصحي الفيروسي يستغل الاستعجال وخوف الأهل في الوقت نفسه.", "إشاعات الصحة بتلعب دايماً على خوفنا واستعجالنا."),
      t("No pharmacy name or EDA reference means the claim starts in rejection mode.", "غياب اسم الصيدلية أو مرجع هيئة الدواء يعني أن الادعاء يبدأ في وضع الرفض.", "لو مفيش اسم صيدلية ولا رقم تسجيل في هيئة الدواء، يبقى الخبر ده كذب."),
      t("Cross-check with at least one international drug safety source before sharing.", "افحص مع مصدر أمان دوائي دولي واحد على الأقل قبل المشاركة.", "اتأكد من مصدر دولي للأمان الدوائي قبل ما تبعت الفيديو لحد."),
    ],
    protocolNextAction: t(
      "Report the TikTok video, document the claim, and share only the EDA verification result.",
      "أبلغ عن الفيديو ووثق الادعاء وشارك فقط نتيجة التحقق من هيئة الدواء.",
      "اعمل بلاغ في الفيديو، وسجل المعلومة، وما تنشرش غير نتيجة التأكد من هيئة الدواء بس."
    ),
    linkedEvidenceClaimIds: ["claim-dr-risk", "claim-dr-training"],
    priority: "egypt-critical",
  },
  {
    id: "brain-dr-news-triangulation",
    module: "deepreal",
    title: t("Egyptian news source triangulation", "تثليث مصادر الأخبار المصرية", "تأكيد الأخبار من كذا مصدر في مصر"),
    summary: t(
      "Practice cross-referencing a breaking Egyptian story across three independent source classes before forming an opinion.",
      "تدرّب على مقاطعة خبر مصري عاجل عبر ثلاث فئات مصادر مستقلة قبل تكوين رأي.",
      "اتعلم إزاي تتأكد من أي خبر عاجل في مصر من 3 أنواع مصادر مختلفة قبل ما تصدق."
    ),
    action: t(
      "Find the official statement, one independent media report, and one international wire service version. Compare gaps.",
      "اعثر على البيان الرسمي وتقرير إعلامي مستقل ونسخة وكالة أنباء دولية. قارن الفجوات.",
      "شوف البيان الرسمي، وتقرير إعلامي مستقل، وخبر من وكالة دولية، وقارن بينهم."
    ),
    intensity: "medium",
    tags: ["egypt", "news", "triangulation", "verification"],
    goal: t("Build a habit of triple-source verification before belief.", "ابنِ عادة التحقق الثلاثي قبل التصديق.", "خلي عندك عادة إنك تتأكد من 3 مصادر قبل ما تصدق."),
    linkedEvidenceClaimIds: ["claim-dr-training"],
    priority: "egypt-critical",
  },
  {
    id: "brain-mh-online-self-diagnosis",
    module: "mental-health",
    title: t("Online self-diagnosis circuit breaker", "قاطع دائرة التشخيص الذاتي عبر الإنترنت", "فرامل التشخيص الذاتي أونلاين"),
    summary: t(
      "Practice interrupting the reel-to-label pipeline where a 60-second video convinces someone they have a disorder.",
      "تدرّب على قطع خط أنابيب الريل-إلى-الملصق حيث يقنع فيديو ٦٠ ثانية شخصاً بأنه يعاني من اضطراب.",
      "اتعلم إزاي توقف نفسك لما تشوف فيديو قصير يحسسك إن عندك مرض نفسي وأنت معندكش."
    ),
    action: t(
      "Write: what symptom do I actually experience? How long? Does it affect function? Who is the qualified person to assess this?",
      "اكتب: ما العرض الذي أعانيه فعلاً؟ منذ متى؟ هل يؤثر على الوظيفة؟ من الشخص المؤهل لتقييم هذا؟",
      "اكتب: إيه اللي حاسس بيه بالظبط؟ بقاله قد إيه؟ مأثر على حياتك إزاي؟ ومين الدكتور اللي يقدر يحدد ده؟"
    ),
    intensity: "medium",
    tags: ["egypt", "self-diagnosis", "reels", "youth", "support"],
    goal: t("Replace identity capture with symptom-first discipline.", "استبدل أسر الهوية بانضباط العرض أولاً.", "ركز في العرض اللي عندك مش في 'اسم المرض' اللي الفيديو قاله."),
    decisionLogic: [
      t("A reel that gives you a label is not the same as a professional who assesses your function.", "الريل الذي يمنحك ملصقاً ليس نفس المتخصص الذي يقيّم وظيفتك.", "فيديو تيك توك مش دكتور بيقيم حالتك بجد."),
      t("Feeling recognized is not the same as being assessed.", "الشعور بالتعرف ليس نفس الخضوع للتقييم.", "إنك تحس إن الكلام 'عليك' مش معناه إنك مريض."),
      t("If function loss is real, route to qualified support, not more content.", "إذا كان تعطل الوظيفة حقيقياً، وجّه إلى دعم مؤهل لا إلى مزيد من المحتوى.", "لو فعلاً مش قادر تعيش حياتك، روح لدكتور بدل ما تقعد تتفرج على فيديوهات أكتر."),
    ],
    protocolNextAction: t(
      "If the four-question circuit breaker reveals function loss, stop content and open the support route.",
      "إذا كشف قاطع الأسئلة الأربعة عن تعطل وظيفي، أوقف المحتوى وافتح مسار الدعم.",
      "لو أسئلتك بينت إنك فعلاً تعبان، وقف فرجة وروح لدكتور فوراً."
    ),
    linkedEvidenceClaimIds: ["claim-mh-scale", "claim-mh-egypt"],
    priority: "egypt-critical",
  },
  {
    id: "brain-mh-family-shame-interrupt",
    module: "mental-health",
    title: t("Family shame language interrupt", "قطع لغة العار الأسرية", "إزاي توقف كلمة 'عيب' في العيلة"),
    summary: t(
      "Practice rewriting a shaming family statement into a support-routing statement without escalation.",
      "تدرّب على إعادة كتابة عبارة عائلية تشعر بالعار إلى عبارة توجه نحو الدعم بدون تصعيد.",
      "اتعلم إزاي تغير كلام العيلة اللي بيحسسك بالذنب لكلام بيشجع على العلاج من غير خناق."
    ),
    action: t(
      "Take the shaming phrase. Replace the blame word with an observation. Add one safe next step.",
      "خذ العبارة المخجلة. استبدل كلمة اللوم بملاحظة. أضف خطوة آمنة واحدة.",
      "خد الجملة اللي بتضايقك، شيل كلمة اللوم وحط مكانها ملاحظة هادية، وقول خطوة إيجابية."
    ),
    intensity: "medium",
    tags: ["egypt", "family", "shame", "communication", "support"],
    goal: t("Convert blame language into safety language in real time.", "حوّل لغة اللوم إلى لغة أمان في اللحظة.", "حول لغة اللوم للغة أمان في وقتها."),
    linkedEvidenceClaimIds: ["claim-mh-egypt"],
    priority: "egypt-critical",
  },
  {
    id: "brain-rh-positive-coping-test",
    module: "religion-hub",
    title: t("Positive vs avoidance coping test", "اختبار التكيف الإيجابي مقابل التجنبي", "اختبار: هل بتواجه مشاكلك ولا بتهرب منها؟"),
    summary: t(
      "Practice distinguishing spiritual practices that build resilience from those that avoid real problems.",
      "تدرّب على التمييز بين الممارسات الروحية التي تبني المرونة وتلك التي تتجنب المشكلات الحقيقية.",
      "اتعلم تفرق بين العبادة اللي بتقويك فعلاً وبين إنك تستخدم الدين عشان تهرب من مشاكلك."
    ),
    action: t(
      "Score the practice: does it reduce panic AND keep care visible? Or does it only reduce panic by hiding the problem?",
      "قيّم الممارسة: هل تقلل الهلع وتبقي الرعاية مرئية؟ أم تقلل الهلع فقط بإخفاء المشكلة؟",
      "قيم اللي بتعمله: هل بيطمنك وبيخليك تدور على حل؟ ولا بيطمنك بس عشان بينسيك المشكلة؟"
    ),
    intensity: "medium",
    tags: ["egypt", "coping", "avoidance", "resilience"],
    goal: t("Keep spiritual coping compatible with real support.", "أبقِ التكيف الروحي متوافقاً مع الدعم الحقيقي.", "خلي علاقتك بربنا دافع ليك إنك تدور على حل حقيقي."),
    linkedEvidenceClaimIds: ["claim-rh-moderation", "claim-rh-boundaries"],
    priority: "egypt-critical",
  },
  {
    id: "brain-rh-moderation-boundary-drill",
    module: "religion-hub",
    title: t("Moderation boundary live drill", "تمرين حدود الاعتدال المباشر", "تمرين: اعرف حدود الاعتدال في الدين"),
    summary: t(
      "Practice scoring a religious message for peace, coercion, shame, and boundary respect in real time.",
      "تدرّب على تسجيل نقاط رسالة دينية من حيث السلام والقسر والعار واحترام الحدود في الوقت الحقيقي.",
      "اتعلم تقيم أي كلام ديني بتسمعه: هل فيه سلام ولا إجبار؟ هل فيه احترام للحدود ولا قلة ذوق؟"
    ),
    action: t(
      "Read the message. Give it 0-3 on peace, coercion, shame, and boundary respect. If coercion or shame scores above 2, route to moderation.",
      "اقرأ الرسالة. أعطها 0-3 في السلام والقسر والعار واحترام الحدود. إذا تجاوز القسر أو العار 2، وجّه إلى الاعتدال.",
      "اقرأ الكلام، وإديله درجة من 0 لـ 3 في السلام والإجبار والكسوف. لو الدرجة عالية في الإجبار، يبقى الكلام ده مش معتدل."
    ),
    intensity: "high",
    tags: ["egypt", "moderation", "scoring", "boundaries"],
    linkedEvidenceClaimIds: ["claim-rh-moderation"],
    priority: "egypt-critical",
  },
]);

export const AUTHORED_SCENARIOS_EXTENDED: AuthoredLibraryItem[] = markAuthored([
  {
    id: "scenario-dr-egypt-fake-decree",
    module: "deepreal",
    title: t("Fake university decree circulating on Facebook", "قرار جامعي مزيف منتشر على فيسبوك"),
    summary: t(
      "A screenshot of an official-looking university decision goes viral, claiming exam dates changed. No university domain confirms it.",
      "صورة شاشة لقرار يبدو رسمياً من جامعة ينتشر بسرعة ويزعم تغيير مواعيد الامتحانات. لا نطاق جامعي يؤكده."
    ),
    action: t(
      "Find the university's official website. Search for the decree number. Check whether any official account posted it.",
      "اعثر على الموقع الرسمي للجامعة. ابحث عن رقم القرار. افحص هل نشره أي حساب رسمي."
    ),
    intensity: "high",
    tags: ["egypt", "university", "facebook", "screenshot", "scam"],
    goal: t("Distinguish institutional screenshots from fabricated ones.", "ميّز الصور المؤسسية الحقيقية عن الملفقة."),
    decisionLogic: [
      t("Screenshots of decrees without a verifiable decree number are high-risk by default.", "صور القرارات بدون رقم قرار قابل للتحقق عالية الخطر افتراضياً."),
      t("Student groups amplify urgency, increasing forwarding before checking.", "مجموعات الطلاب تضخم الاستعجال وتزيد إعادة النشر قبل الفحص."),
    ],
    linkedEvidenceClaimIds: ["claim-dr-risk"],
    priority: "egypt-critical",
  },
  {
    id: "scenario-dr-egypt-election-disinfo",
    module: "deepreal",
    title: t("Election-season disinformation post", "منشور تضليل في موسم الانتخابات"),
    summary: t(
      "A post claims vote results are rigged, citing an unnamed embassy source and asking people to boycott.",
      "منشور يزعم تزوير نتائج التصويت ويستشهد بمصدر سفارة غير مسمى ويطلب من الناس المقاطعة."
    ),
    action: t(
      "Freeze the share. Trace the embassy source. Compare against official election authority statements.",
      "جمّد المشاركة. تتبع مصدر السفارة. قارن ببيانات هيئة الانتخابات الرسمية."
    ),
    intensity: "high",
    tags: ["egypt", "elections", "disinformation", "authority"],
    linkedEvidenceClaimIds: ["claim-dr-risk"],
    priority: "egypt-critical",
  },
  {
    id: "scenario-mh-workplace-burnout",
    module: "mental-health",
    title: t("Workplace burnout dismissed as laziness", "الإرهاق الوظيفي يُرفض على أنه كسل"),
    summary: t(
      "An employee reports constant exhaustion, insomnia, and cynicism. Their manager says they need to be more grateful.",
      "موظف يبلغ عن إرهاق مستمر وأرق وسخرية. مديره يقول إنه يحتاج أن يكون أكثر امتناناً."
    ),
    action: t(
      "Score the burnout dimensions: exhaustion, depersonalization, reduced efficacy. Route to occupational health if two or more are high.",
      "قيّم أبعاد الإرهاق: الاستنزاف وتبدد الشخصية وانخفاض الكفاءة. وجّه إلى الصحة المهنية إذا كان اثنان أو أكثر مرتفعين."
    ),
    intensity: "high",
    tags: ["egypt", "workplace", "burnout", "dismissal"],
    goal: t("Convert dismissal into a structured burnout assessment.", "حوّل الرفض إلى تقييم منظم للإرهاق."),
    linkedEvidenceClaimIds: ["claim-mh-scale"],
    priority: "egypt-critical",
  },
  {
    id: "scenario-mh-grief-spiritual-bypass",
    module: "mental-health",
    title: t("Grief blocked by spiritual bypass", "حزن ممنوع بتجاوز روحي"),
    summary: t(
      "A bereaved person is told they should not grieve because the deceased is in a better place. The grief worsens silently.",
      "شخص مفجوع يُقال له ألا يحزن لأن المتوفى في مكان أفضل. الحزن يتفاقم في صمت."
    ),
    action: t(
      "Validate the grief as natural. Separate spiritual hope from clinical grief support. Keep both visible.",
      "اعترف بأن الحزن طبيعي. افصل الرجاء الروحي عن دعم الحزن السريري. أبقِ كليهما مرئياً."
    ),
    intensity: "high",
    tags: ["egypt", "grief", "spiritual-bypass", "support"],
    linkedEvidenceClaimIds: ["claim-mh-egypt", "claim-rh-boundaries"],
    priority: "high-need",
  },
  {
    id: "scenario-rh-scripture-family-dispute",
    module: "religion-hub",
    title: t("Scripture weaponized in a family inheritance dispute", "تسليح النص في نزاع ميراث عائلي"),
    summary: t(
      "A family member uses a Quran verse to claim total inheritance authority, pressuring others to comply or face divine punishment.",
      "فرد من العائلة يستخدم آية قرآنية لادعاء سلطة ميراث كاملة ويضغط على الآخرين للامتثال أو مواجهة عقاب إلهي."
    ),
    action: t(
      "Separate the verse's context from the legal claim. Route the dispute to qualified legal and religious authority.",
      "افصل سياق الآية عن الادعاء القانوني. وجّه النزاع إلى سلطة قانونية ودينية مؤهلة."
    ),
    intensity: "high",
    tags: ["egypt", "inheritance", "scripture", "coercion", "family"],
    goal: t("Prevent sacred text from replacing legal process.", "امنع النص المقدس من استبدال العملية القانونية."),
    decisionLogic: [
      t("Inheritance law in Egypt has both religious and civil dimensions.", "قانون الميراث في مصر له بعدان ديني ومدني."),
      t("Using punishment threats to enforce compliance is coercion, not guidance.", "استخدام تهديدات العقاب لفرض الامتثال قسر وليس توجيهاً."),
    ],
    linkedEvidenceClaimIds: ["claim-rh-boundaries", "claim-rh-moderation"],
    priority: "egypt-critical",
  },
  {
    id: "scenario-rh-online-fatwa-shopping",
    module: "religion-hub",
    title: t("Online fatwa shopping to justify a harmful decision", "التسوق من الفتاوى لتبرير قرار ضار"),
    summary: t(
      "A person searches online until they find one fatwa that supports their pre-decided position, ignoring mainstream scholarly consensus.",
      "شخص يبحث على الإنترنت حتى يجد فتوى واحدة تدعم موقفه المقرر سلفاً متجاهلاً إجماع العلماء."
    ),
    action: t(
      "Check whether the fatwa comes from an accountable institution. Compare with Dar al-Ifta's published position.",
      "افحص هل الفتوى من مؤسسة خاضعة للمساءلة. قارن بموقف دار الإفتاء المنشور."
    ),
    intensity: "high",
    tags: ["egypt", "fatwa", "shopping", "accountability"],
    linkedEvidenceClaimIds: ["claim-rh-moderation"],
    priority: "egypt-critical",
  },
  {
    id: "scenario-dr-egypt-charity-campaign",
    module: "deepreal",
    title: t("Emergency charity campaign after a local incident", "حملة تبرع طارئة بعد حادث محلي"),
    summary: t(
      "A viral fundraising post claims injured families need immediate transfers through a personal wallet, but no recognized institution is named.",
      "منشور تبرعات منتشر يزعم أن أُسراً مصابة تحتاج تحويلات فورية عبر محفظة شخصية، من دون ذكر مؤسسة معروفة أو مسار مساءلة واضح."
    ),
    action: t(
      "Hold payment, trace the institution, and verify whether any accountable charity or official body published the appeal.",
      "أوقف الدفع، وتتبع المؤسسة، وتحقق هل نشرت أي جمعية خاضعة للمساءلة أو جهة رسمية هذا النداء فعلاً."
    ),
    intensity: "high",
    tags: ["egypt", "charity", "wallet", "fraud", "crisis"],
    goal: t("Separate moral pressure from accountable aid routing.", "افصل الضغط الأخلاقي عن مسار المساعدة الخاضع للمساءلة."),
    decisionLogic: [
      t("A personal wallet is not proof of a legitimate emergency campaign.", "المحفظة الشخصية ليست دليلاً على شرعية حملة الطوارئ."),
      t("Real emergencies still require traceable institutions, named beneficiaries, or accountable intermediaries.", "حتى الطوارئ الحقيقية تحتاج إلى مؤسسات قابلة للتتبع أو مستفيدين مسمين أو وسطاء خاضعين للمساءلة."),
    ],
    protocolNextAction: t(
      "Do not donate inside the emotional wave. Verify the institution, then move only through a traceable channel.",
      "لا تتبرع داخل الموجة العاطفية. تحقق من المؤسسة ثم تحرك فقط عبر قناة قابلة للتتبع."
    ),
    linkedEvidenceClaimIds: ["claim-dr-risk"],
    priority: "egypt-critical",
  },
  {
    id: "scenario-mh-egypt-postpartum-shame",
    module: "mental-health",
    title: t("Postpartum distress dismissed as ingratitude", "ضيق ما بعد الولادة يُرفض على أنه قلة شكر"),
    summary: t(
      "A new mother reports exhaustion, crying, fear, and emotional detachment, while relatives tell her she should just be grateful for the baby.",
      "أم جديدة تُبلغ عن إنهاك وبكاء وخوف وانفصال عاطفي، بينما يقول لها الأقارب إنها يجب فقط أن تكون شاكرة للمولود."
    ),
    action: t(
      "Name the symptoms, reject the shame script, assess urgency, and route toward maternal support instead of moral pressure.",
      "سمِّ الأعراض، وارفض نص العار، وقيِّم الإلحاح، ووجّه نحو دعم الأمومة بدلاً من الضغط الأخلاقي."
    ),
    intensity: "high",
    tags: ["egypt", "mothers", "postpartum", "family", "support"],
    goal: t("Prevent maternal distress from being buried under gratitude pressure.", "امنع دفن ضيق الأمومة تحت ضغط الامتنان."),
    decisionLogic: [
      t("Gratitude language does not cancel symptom severity or support need.", "لغة الامتنان لا تلغي شدة الأعراض ولا الحاجة إلى الدعم."),
      t("When attachment, sleep, or fear collapse, routing matters more than reassurance slogans.", "عندما ينهار التعلق أو النوم أو الخوف، يصبح التوجيه أهم من شعارات التطمين."),
    ],
    protocolNextAction: t(
      "If symptoms are persistent or worsening, stop debating character and move to support routing immediately.",
      "إذا كانت الأعراض مستمرة أو تتفاقم، أوقف نقاش الشخصية وانتقل فوراً إلى مسار الدعم."
    ),
    linkedEvidenceClaimIds: ["claim-mh-scale", "claim-mh-egypt"],
    priority: "egypt-critical",
  },
  {
    id: "scenario-rh-egypt-doctor-scripture-pressure",
    module: "religion-hub",
    title: t("A doctor uses scripture to shut down medical questions", "طبيب يستخدم النص لإسكات الأسئلة الطبية"),
    summary: t(
      "A clinician quotes scripture to present one treatment choice as unquestionably correct and frames disagreement as weak faith or rebellion.",
      "طبيب يقتبس نصاً دينياً ليقدم خياراً علاجياً واحداً على أنه صحيح بلا نقاش، ويصوّر الاعتراض كضعف إيمان أو تمرد."
    ),
    action: t(
      "Separate clinical evidence from sacred framing, verify scope, and route the religious layer to accountable scholarship instead of bedside coercion.",
      "افصل الدليل السريري عن التأطير المقدس، وتحقق من النطاق، ووجّه الطبقة الدينية إلى مرجعية خاضعة للمساءلة بدلاً من القسر بجانب السرير."
    ),
    intensity: "high",
    tags: ["egypt", "doctor", "scripture", "coercion", "scope"],
    goal: t("Stop mixed authority from overriding informed medical judgment.", "أوقف السلطة المختلطة من تجاوز الحكم الطبي المستنير."),
    decisionLogic: [
      t("Medical scope is tested by evidence, consent, and standards, not by sacred rhetoric alone.", "النطاق الطبي يُختبر بالدليل والموافقة والمعايير، لا بالخطاب المقدس وحده."),
      t("When scripture is used to close questions instead of guide conscience, the message has crossed into coercion.", "عندما يُستخدم النص لإغلاق الأسئلة بدلاً من توجيه الضمير، تكون الرسالة قد عبرت إلى القسر."),
    ],
    protocolNextAction: t(
      "Open a dual route: medical evidence review plus accountable religious clarification, and reject forced fusion at bedside.",
      "افتح مساراً مزدوجاً: مراجعة الدليل الطبي مع توضيح ديني خاضع للمساءلة، وارفض الدمج القسري بجانب السرير."
    ),
    linkedEvidenceClaimIds: ["claim-rh-boundaries", "claim-rh-moderation"],
    priority: "egypt-critical",
  },
]);

export const AUTHORED_TRICKS_EXTENDED: AuthoredLibraryItem[] = markAuthored([
  {
    id: "trick-dr-reverse-image-arabic",
    module: "deepreal",
    title: t("Reverse image search for Arabic viral photos", "بحث عكسي بالصور للصور العربية المنتشرة"),
    summary: t(
      "A viral Arabic photo with shocking context may have been published years ago in a completely different situation.",
      "صورة عربية منتشرة بسياق صادم قد تكون نُشرت قبل سنوات في موقف مختلف تماماً."
    ),
    action: t(
      "Use Google Lens, TinEye, or Yandex to reverse-search the image. Compare the earliest result with the current claim.",
      "استخدم Google Lens أو TinEye أو Yandex للبحث العكسي بالصورة. قارن أقدم نتيجة بالادعاء الحالي."
    ),
    intensity: "low",
    tags: ["egypt", "reverse-image", "verification", "tools"],
    linkedEvidenceClaimIds: ["claim-dr-training"],
    priority: "global-critical",
  },
  {
    id: "trick-mh-one-function-question",
    module: "mental-health",
    title: t("The one function question", "سؤال الوظيفة الواحد"),
    summary: t(
      "When someone says they are fine, ask one function question: 'Can you do what you normally do this week?'",
      "عندما يقول شخص إنه بخير، اسأل سؤالاً وظيفياً واحداً: هل تستطيع فعل ما تفعله عادة هذا الأسبوع؟"
    ),
    action: t(
      "If the answer is no, move to support routing. Do not accept 'fine' as a safe endpoint.",
      "إذا كانت الإجابة لا، انتقل إلى مسار الدعم. لا تقبل 'بخير' كنقطة نهاية آمنة."
    ),
    intensity: "low",
    tags: ["egypt", "function", "screening", "support"],
    linkedEvidenceClaimIds: ["claim-mh-scale"],
    priority: "high-need",
  },
  {
    id: "trick-rh-institution-name-test",
    module: "religion-hub",
    title: t("Name the institution behind the ruling", "سمِّ المؤسسة خلف الحكم"),
    summary: t(
      "When someone shares a religious ruling online, ask: which institution published this and where can I verify it?",
      "عندما يشارك شخص حكماً دينياً على الإنترنت، اسأل: أي مؤسسة نشرت هذا وأين يمكنني التحقق منه؟"
    ),
    action: t(
      "If no institution is named, treat the ruling as unverified regardless of how confident the poster sounds.",
      "إذا لم تُسمَّ أي مؤسسة، تعامل مع الحكم كغير متحقق بغض النظر عن ثقة الناشر."
    ),
    intensity: "medium",
    tags: ["egypt", "institution", "verification", "fatwa"],
    linkedEvidenceClaimIds: ["claim-rh-moderation"],
    priority: "egypt-critical",
  },
]);

export const AUTHORED_REVERSE_CASES: AuthoredLibraryItem[] = markAuthored([
  {
    id: "reverse-dr-urgent-audio-chain",
    module: "deepreal",
    title: t("Reverse map: the urgent Arabic audio chain", "الخريطة العكسية: سلسلة الصوت العربي العاجل"),
    summary: t(
      "Break the manipulation into five moves: insider claim, emotional shock, moral duty, anti-delay pressure, and mass forwarding.",
      "قسّم التلاعب إلى خمس حركات: ادعاء داخلي، صدمة عاطفية، واجب أخلاقي، ضغط ضد التأخير، ونشر جماعي."
    ),
    action: t(
      "Name each move before responding so the urgency loses control over you.",
      "سمِّ كل حركة قبل الرد حتى يفقد الاستعجال سيطرته عليك."
    ),
    intensity: "high",
    tags: ["egypt", "audio", "manipulation", "reverse"],
    linkedEvidenceClaimIds: ["claim-dr-risk"],
    priority: "egypt-critical",
  },
  {
    id: "reverse-mh-reel-identity-capture",
    module: "mental-health",
    title: t("Reverse map: how a reel captures identity", "الخريطة العكسية: كيف يخطف المقطع الهوية"),
    summary: t(
      "The sequence is recognition, relief, belonging, certainty, and then resistance to real assessment.",
      "التسلسل هو: التعرف، الارتياح، الانتماء، اليقين، ثم مقاومة التقييم الحقيقي."
    ),
    action: t(
      "Mark where education turned into identity capture and route back to support logic.",
      "حدد أين تحول التعليم إلى أسر للهوية وأعد التوجيه إلى منطق الدعم."
    ),
    intensity: "high",
    tags: ["reels", "identity", "youth", "reverse"],
    linkedEvidenceClaimIds: ["claim-mh-scale", "claim-mh-egypt"],
    priority: "high-need",
  },
  {
    id: "reverse-rh-guilt-control-ladder",
    module: "religion-hub",
    title: t("Reverse map: the guilt-control ladder", "الخريطة العكسية: سلم الذنب والسيطرة"),
    summary: t(
      "Watch how the message climbs from discomfort to guilt, then from guilt to obedience, then from obedience to blocked care.",
      "راقب كيف تصعد الرسالة من الانزعاج إلى الذنب، ثم من الذنب إلى الطاعة، ثم من الطاعة إلى منع الرعاية."
    ),
    action: t(
      "Identify the rung where care is blocked. That is the point where the message becomes unsafe.",
      "حدد الدرجة التي تُمنع فيها الرعاية. عندها تصبح الرسالة غير آمنة."
    ),
    intensity: "high",
    tags: ["egypt", "guilt", "control", "reverse"],
    linkedEvidenceClaimIds: ["claim-rh-boundaries", "claim-rh-moderation"],
    priority: "egypt-critical",
  },
]);
