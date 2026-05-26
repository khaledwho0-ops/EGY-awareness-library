/**
 * IRL KNOWLEDGE STORE
 * Maps micro-node keys to real-life application content.
 * Each entry has: steps, 3 scientific methods, and optional references.
 */

export interface IRLContent {
  titleEn: string;
  titleAr: string;
  steps: Array<{ en: string; ar: string }>;
  methods: Array<{
    nameEn: string;
    nameAr: string;
    descEn: string;
    descAr: string;
    exerciseEn: string;
    exerciseAr: string;
    source?: string;
  }>;
  sourceRef?: string;
}

const store: Record<string, IRLContent> = {
  // ═══ THEME PANEL ═══
  "theme-amethyst": {
    titleEn: "AMETHYST GEODE Theme",
    titleAr: "سمة AMETHYST GEODE",
    steps: [
      { en: "Activate AMETHYST GEODE theme for 3 consecutive days.", ar: "فعّل سمة AMETHYST GEODE لمدة 3 أيام متتالية." },
      { en: "Record reading duration and eye strain (1-10) before/after.", ar: "سجّل مدة القراءة وإجهاد العين (1-10) قبل وبعد." },
      { en: "Compare error count in a 10-minute reading task under pressure.", ar: "قارن عدد الأخطاء في مهمة قراءة 10 دقائق تحت الضغط." },
    ],
    methods: [
      { nameEn: "20-20-20 Eye Exercise", nameAr: "تمرين العين 20-20-20", descEn: "Every 20 min, look 20 feet away for 20 seconds while using this theme.", descAr: "كل 20 دقيقة، انظر لمسافة 20 قدم لمدة 20 ثانية أثناء استخدام السمة.", exerciseEn: "Set a timer. Track strain reduction over 1 week.", exerciseAr: "اضبط مؤقت. تتبع انخفاض الإجهاد خلال أسبوع.", source: "Sheppard & Wolffsohn, BMJ Open Ophthalmology (2018)" },
      { nameEn: "Contrast Sensitivity Calibration", nameAr: "معايرة حساسية التباين", descEn: "Use WebAIM Contrast Checker to measure the theme's contrast ratio.", descAr: "استخدم WebAIM Contrast Checker لقياس نسبة تباين السمة.", exerciseEn: "If ratio < 4.5:1, adjust brightness. Document findings.", exerciseAr: "إذا النسبة < 4.5:1، اضبط السطوع. وثّق النتائج.", source: "WCAG 2.1 Guidelines" },
      { nameEn: "Contextual Switching Drill", nameAr: "تمرين التبديل السياقي", descEn: "Read 10 min in AMETHYST, switch to high contrast, note cognitive load.", descAr: "اقرأ 10 دقائق بـ AMETHYST، بدّل للتباين العالي، لاحظ الحمل المعرفي.", exerciseEn: "Use NASA-TLX simple survey after each switch.", exerciseAr: "استخدم مسح NASA-TLX البسيط بعد كل تبديل.", source: "Hart, NASA-TLX (2006)" },
    ],
  },
  "theme-icy-gunmetal": {
    titleEn: "Icy Gunmetal Theme", titleAr: "سمة Icy Gunmetal",
    steps: [
      { en: "Apply Icy Gunmetal for low-light reading sessions.", ar: "طبّق Icy Gunmetal لجلسات القراءة في الإضاءة المنخفضة." },
      { en: "Track reading speed vs. comprehension accuracy.", ar: "تتبع سرعة القراءة مقابل دقة الفهم." },
      { en: "Compare with Light Academic after 3 days.", ar: "قارن مع Light Academic بعد 3 أيام." },
    ],
    methods: [
      { nameEn: "Dark Mode Adaptation", nameAr: "تكيف الوضع الداكن", descEn: "Dark themes reduce blue light exposure, potentially improving sleep quality.", descAr: "السمات الداكنة تقلل التعرض للضوء الأزرق وتحسّن النوم.", exerciseEn: "Use for 2 hours before sleep. Track sleep quality.", exerciseAr: "استخدمها ساعتين قبل النوم. تتبع جودة النوم.", source: "Harvard Health Publishing" },
      { nameEn: "Sustained Attention Test", nameAr: "اختبار الانتباه المستدام", descEn: "Read a 2000-word article and answer 5 comprehension questions.", descAr: "اقرأ مقال 2000 كلمة وأجب عن 5 أسئلة فهم.", exerciseEn: "Score yourself and compare across themes.", exerciseAr: "قيّم نفسك وقارن بين السمات.", source: "Cognitive Load Theory — Sweller (1988)" },
      { nameEn: "Preference Mapping", nameAr: "خريطة التفضيلات", descEn: "Rate comfort (1-10) for each theme across different tasks.", descAr: "قيّم الراحة (1-10) لكل سمة عبر مهام مختلفة.", exerciseEn: "Build a personal theme-task optimization matrix.", exerciseAr: "ابنِ مصفوفة تحسين شخصية بين السمة والمهمة." },
    ],
  },

  // ═══ PERCEPTION LAB ═══
  "lab-distress": {
    titleEn: "Distress Level Assessment", titleAr: "تقييم مستوى الضيق",
    steps: [
      { en: "Rate your current distress on a 0-10 scale honestly.", ar: "قيّم ضيقك الحالي على مقياس 0-10 بصدق." },
      { en: "Identify 3 specific triggers contributing to current distress.", ar: "حدد 3 محفزات محددة تساهم في الضيق الحالي." },
      { en: "Apply one calming technique and re-rate after 10 minutes.", ar: "طبّق تقنية تهدئة واحدة وأعد التقييم بعد 10 دقائق." },
    ],
    methods: [
      { nameEn: "Box Breathing (4-4-4-4)", nameAr: "التنفس المربع (4-4-4-4)", descEn: "Inhale 4s, hold 4s, exhale 4s, hold 4s. Repeat 4 cycles.", descAr: "شهيق 4 ثوانٍ، احبس 4، زفير 4، احبس 4. كرر 4 دورات.", exerciseEn: "Practice 3x daily for 1 week. Track distress before/after.", exerciseAr: "مارس 3 مرات يومياً لمدة أسبوع. تتبع الضيق قبل/بعد.", source: "Ma et al., Frontiers in Psychology (2017)" },
      { nameEn: "Progressive Muscle Relaxation", nameAr: "الاسترخاء العضلي التدريجي", descEn: "Tense each muscle group for 5s, release for 10s, systematic head-to-toe.", descAr: "شد كل مجموعة عضلية 5 ثوانٍ، ارخِ 10 ثوانٍ، من الرأس للقدم.", exerciseEn: "Do before sleep for 7 nights. Rate sleep quality.", exerciseAr: "افعل قبل النوم 7 ليالٍ. قيّم جودة النوم.", source: "Jacobson, Progressive Relaxation (1938)" },
      { nameEn: "Distress Tolerance Diary", nameAr: "يوميات تحمّل الضيق", descEn: "Log distress events with time, trigger, intensity, and response.", descAr: "سجّل أحداث الضيق بالوقت والمحفز والشدة والاستجابة.", exerciseEn: "After 2 weeks, identify your top 3 patterns.", exerciseAr: "بعد أسبوعين، حدد أبرز 3 أنماط لديك.", source: "Linehan, DBT Skills Manual (2014)" },
    ],
  },
  "lab-danger-now": {
    titleEn: "Immediate Danger Assessment", titleAr: "تقييم الخطر الفوري",
    steps: [
      { en: "If checked: Contact emergency services immediately (16328 in Egypt).", ar: "إذا محدد: اتصل بخدمات الطوارئ فوراً (16328 في مصر)." },
      { en: "Tell one trusted person about your situation right now.", ar: "أخبر شخص موثوق واحد عن وضعك الآن." },
      { en: "Remove yourself from the dangerous environment if safe to do so.", ar: "ابتعد عن البيئة الخطرة إذا كان آمناً." },
    ],
    methods: [
      { nameEn: "Safety Planning Intervention", nameAr: "تدخل خطة السلامة", descEn: "Create a written safety plan with warning signs, coping strategies, and contacts.", descAr: "أنشئ خطة سلامة مكتوبة بعلامات التحذير واستراتيجيات التأقلم وجهات الاتصال.", exerciseEn: "Fill out the Stanley-Brown Safety Plan template.", exerciseAr: "املأ نموذج خطة سلامة Stanley-Brown.", source: "Stanley & Brown, American J. of Psychiatry (2012)" },
      { nameEn: "TIPP Skills (DBT)", nameAr: "مهارات TIPP", descEn: "Temperature, Intense exercise, Paced breathing, Paired muscle relaxation.", descAr: "الحرارة، تمرين مكثف، تنفس بإيقاع، استرخاء عضلي مقترن.", exerciseEn: "Practice each element once when calm, so it's ready in crisis.", exerciseAr: "مارس كل عنصر مرة وأنت هادئ، ليكون جاهز وقت الأزمة.", source: "Linehan, DBT Skills (2014)" },
      { nameEn: "Grounding 5-4-3-2-1", nameAr: "التأريض 5-4-3-2-1", descEn: "Name 5 things you see, 4 hear, 3 touch, 2 smell, 1 taste.", descAr: "اذكر 5 أشياء تراها، 4 تسمعها، 3 تلمسها، 2 تشمها، 1 تتذوقها.", exerciseEn: "Practice daily for 2 min so it becomes automatic in crisis.", exerciseAr: "مارس يومياً دقيقتين ليصبح تلقائي وقت الأزمة.", source: "van der Kolk, The Body Keeps the Score (2014)" },
    ],
  },
  "lab-support-available": {
    titleEn: "Trusted Support Assessment", titleAr: "تقييم الدعم الموثوق",
    steps: [
      { en: "List 3 people you trust and their contact information.", ar: "اكتب 3 أشخاص تثق بهم ومعلومات اتصالهم." },
      { en: "Tell at least one of them that you may need support.", ar: "أخبر واحد منهم على الأقل أنك قد تحتاج دعم." },
      { en: "Agree on a signal or phrase that means 'I need help now'.", ar: "اتفقوا على إشارة أو عبارة تعني 'محتاج مساعدة دلوقتي'." },
    ],
    methods: [
      { nameEn: "Social Support Inventory", nameAr: "جرد الدعم الاجتماعي", descEn: "Map your support network: emotional, practical, informational support.", descAr: "ارسم خريطة شبكة دعمك: عاطفي، عملي، معلوماتي.", exerciseEn: "Complete a circles-of-support diagram this week.", exerciseAr: "أكمل مخطط دوائر الدعم هذا الأسبوع.", source: "Cohen & Wills, Psychological Bulletin (1985)" },
      { nameEn: "Active Listening Practice", nameAr: "تمرين الاستماع الفعال", descEn: "Practice paraphrasing, reflecting feelings, and asking open questions.", descAr: "مارس إعادة الصياغة، عكس المشاعر، وطرح أسئلة مفتوحة.", exerciseEn: "Have one 15-min conversation using only active listening.", exerciseAr: "أجرِ محادثة 15 دقيقة باستخدام الاستماع الفعال فقط.", source: "Rogers, Client-Centered Therapy (1951)" },
      { nameEn: "Help-Seeking Barrier Audit", nameAr: "تدقيق حواجز طلب المساعدة", descEn: "Identify what stops you from asking for help and challenge each barrier.", descAr: "حدد ما يمنعك من طلب المساعدة وتحدَّ كل حاجز.", exerciseEn: "Write 3 barriers and 3 counter-arguments for each.", exerciseAr: "اكتب 3 حواجز و3 حجج مضادة لكل منها.", source: "Wilson et al., GHSQ (2005)" },
    ],
  },

  // ═══ CONTENT LIST ITEMS ═══
  "reverse-engineering": {
    titleEn: "Reverse Engineering (الوضع العكسي)", titleAr: "الوضع العكسي",
    steps: [
      { en: "Take a viral claim from your social media feed today.", ar: "خذ ادعاء منتشر من سوشيال ميديا بتاعتك النهاردة." },
      { en: "Reverse-engineer how the rumor was constructed step by step.", ar: "فكّك كيف اتبنت الشائعة خطوة بخطوة." },
      { en: "Create a counter-narrative using verified facts.", ar: "أنشئ رواية مضادة باستخدام حقائق موثقة." },
    ],
    methods: [
      { nameEn: "Source Deconstruction", nameAr: "تفكيك المصدر", descEn: "Trace any claim back to its original source using lateral reading.", descAr: "تتبع أي ادعاء لمصدره الأصلي باستخدام القراءة الأفقية.", exerciseEn: "Fact-check 1 claim daily for 7 days using this method.", exerciseAr: "تحقق من ادعاء واحد يومياً لمدة 7 أيام بهذه الطريقة.", source: "Wineburg & McGrew, Stanford (2019)" },
      { nameEn: "Manipulation Technique Map", nameAr: "خريطة تقنيات التلاعب", descEn: "Identify which of the 6 DEPICT techniques was used.", descAr: "حدد أي من تقنيات DEPICT الست تم استخدامها.", exerciseEn: "Classify 5 viral posts using the DEPICT framework.", exerciseAr: "صنّف 5 منشورات منتشرة باستخدام إطار DEPICT.", source: "Roozenbeek & van der Linden (2022)" },
      { nameEn: "Pre-Mortem Analysis", nameAr: "تحليل ما قبل الوفاة", descEn: "Before sharing, imagine the claim is false. What damage would sharing cause?", descAr: "قبل المشاركة، تخيل الادعاء خاطئ. أي ضرر ستسببه المشاركة؟", exerciseEn: "Apply to 3 shareable posts this week. Note your decisions.", exerciseAr: "طبّق على 3 منشورات قابلة للمشاركة هذا الأسبوع.", source: "Klein, Sources of Power (1998)" },
    ],
  },
  "practical-tricks": {
    titleEn: "Practical Tricks (حيل عملية)", titleAr: "حيل عملية",
    steps: [
      { en: "Pick one practical trick from the library.", ar: "اختر حيلة عملية واحدة من المكتبة." },
      { en: "Apply it to a real situation within 24 hours.", ar: "طبّقها في موقف حقيقي خلال 24 ساعة." },
      { en: "Document the outcome and what you learned.", ar: "وثّق النتيجة وما تعلمته." },
    ],
    methods: [
      { nameEn: "Deliberate Practice", nameAr: "الممارسة المتعمدة", descEn: "Focus on one skill at a time with specific improvement targets.", descAr: "ركّز على مهارة واحدة بأهداف تحسين محددة.", exerciseEn: "Spend 15 min practicing one verification technique.", exerciseAr: "اقضِ 15 دقيقة في ممارسة تقنية تحقق واحدة.", source: "Ericsson, Peak (2016)" },
      { nameEn: "Spaced Repetition", nameAr: "التكرار المتباعد", descEn: "Review tricks at increasing intervals: 1 day, 3 days, 7 days.", descAr: "راجع الحيل بفترات متزايدة: يوم، 3 أيام، 7 أيام.", exerciseEn: "Create flashcards for your top 10 tricks.", exerciseAr: "أنشئ بطاقات استذكار لأفضل 10 حيل.", source: "Ebbinghaus, Memory (1885)" },
      { nameEn: "Teaching Effect", nameAr: "تأثير التدريس", descEn: "Explain the trick to someone else to deepen your understanding.", descAr: "اشرح الحيلة لشخص آخر لتعميق فهمك.", exerciseEn: "Teach 1 trick to a friend or family member this week.", exerciseAr: "علّم حيلة واحدة لصديق أو فرد من العائلة هذا الأسبوع.", source: "Nestojko et al., Memory & Cognition (2014)" },
    ],
  },
  "realistic-scenarios": {
    titleEn: "Realistic Scenarios (سيناريوهات واقعية)", titleAr: "سيناريوهات واقعية",
    steps: [
      { en: "Read the scenario carefully without jumping to conclusions.", ar: "اقرأ السيناريو بعناية بدون القفز للاستنتاجات." },
      { en: "Identify the cognitive bias or manipulation technique present.", ar: "حدد التحيز المعرفي أو تقنية التلاعب الموجودة." },
      { en: "Write your response strategy before checking the model answer.", ar: "اكتب استراتيجية ردك قبل مراجعة الإجابة النموذجية." },
    ],
    methods: [
      { nameEn: "Role-Play Simulation", nameAr: "محاكاة لعب الأدوار", descEn: "Act out the scenario with a partner, switching roles.", descAr: "مثّل السيناريو مع شريك وبدّلوا الأدوار.", exerciseEn: "Role-play 2 scenarios this week with different people.", exerciseAr: "مثّل سيناريوهين هذا الأسبوع مع أشخاص مختلفين.", source: "Kolb, Experiential Learning (1984)" },
      { nameEn: "Decision Journal", nameAr: "يوميات القرارات", descEn: "Record your reasoning process for each scenario response.", descAr: "سجّل عملية تفكيرك لكل استجابة سيناريو.", exerciseEn: "Review journal weekly. Look for reasoning pattern improvements.", exerciseAr: "راجع اليوميات أسبوعياً. ابحث عن تحسن أنماط التفكير.", source: "Kahneman, Thinking Fast and Slow (2011)" },
      { nameEn: "Real-World Transfer Test", nameAr: "اختبار النقل للواقع", descEn: "Find a real-world example matching the scenario pattern.", descAr: "أوجد مثال واقعي يطابق نمط السيناريو.", exerciseEn: "Collect 3 real examples that match scenarios you practiced.", exerciseAr: "اجمع 3 أمثلة واقعية تطابق سيناريوهات تدربت عليها.", source: "Perkins & Salomon, Transfer of Learning (1992)" },
    ],
  },
  "label-as-hypothesis": {
    titleEn: "Labels as Hypotheses", titleAr: "الملصقات كفرضيات",
    steps: [
      { en: "When you encounter a label (e.g., 'lazy'), write it down.", ar: "لما تقابل ملصق (مثل 'كسلان')، اكتبه." },
      { en: "Reframe: 'In which specific situations does this behavior appear?'", ar: "أعد الصياغة: 'في أي مواقف محددة يظهر هذا السلوك؟'" },
      { en: "Test the hypothesis by observing behavior in 3 different contexts.", ar: "اختبر الفرضية بملاحظة السلوك في 3 سياقات مختلفة." },
    ],
    methods: [
      { nameEn: "Cognitive Reframing", nameAr: "إعادة الإطار المعرفي", descEn: "Challenge automatic thoughts by examining evidence for and against.", descAr: "تحدَّ الأفكار التلقائية بفحص الأدلة المؤيدة والمعارضة.", exerciseEn: "Keep a thought record for 3 days. Challenge 1 label per day.", exerciseAr: "احتفظ بسجل أفكار 3 أيام. تحدَّ ملصقاً واحداً يومياً.", source: "Beck, Cognitive Therapy (2011)" },
      { nameEn: "Hypothesis Testing Table", nameAr: "جدول اختبار الفرضيات", descEn: "Create: Label → Hypothesis → Evidence For → Evidence Against → Conclusion.", descAr: "أنشئ: ملصق → فرضية → أدلة مؤيدة → أدلة معارضة → استنتاج.", exerciseEn: "Fill one table per week for personal labels you encounter.", exerciseAr: "املأ جدول واحد أسبوعياً للملصقات الشخصية التي تقابلها.", source: "Greenberger & Padesky, Mind Over Mood (2015)" },
      { nameEn: "Self-Monitoring Log", nameAr: "سجل المراقبة الذاتية", descEn: "Track when you label others and when others label you.", descAr: "تتبع متى تلصق ملصقات بالآخرين ومتى يلصقونها بك.", exerciseEn: "Note date, context, label, and your emotional response.", exerciseAr: "سجّل التاريخ والسياق والملصق واستجابتك العاطفية.", source: "Kazdin, Behavior Modification (2012)" },
    ],
  },

  // ═══ COGNITIVE COMMAND DECK — Category Entries ═══
  "resilience": {
    titleEn: "Resilience Protocol", titleAr: "بروتوكول المرونة",
    steps: [
      { en: "Identify one resilience protocol from the deck that resonates.", ar: "حدد بروتوكول مرونة واحد من المجموعة يناسبك." },
      { en: "Practice its action step in a real scenario this week.", ar: "مارس خطوة العمل في سيناريو حقيقي هذا الأسبوع." },
      { en: "Document what changed in your response to misinformation.", ar: "وثّق ما تغير في استجابتك للمعلومات المضللة." },
    ],
    methods: [
      { nameEn: "Inoculation Practice", nameAr: "ممارسة التلقيح", descEn: "Expose yourself to weakened misinformation arguments, then refute them.", descAr: "عرّض نفسك لحجج معلومات مضللة ضعيفة، ثم فنّدها.", exerciseEn: "Find 3 misleading headlines today and write refutations.", exerciseAr: "أوجد 3 عناوين مضللة اليوم واكتب تفنيدات.", source: "van der Linden, Nature Reviews Psychology (2023)" },
      { nameEn: "SIFT Method Drill", nameAr: "تمرين طريقة SIFT", descEn: "Stop, Investigate source, Find better coverage, Trace claims.", descAr: "توقف، تحقق من المصدر، ابحث عن تغطية أفضل، تتبع الادعاءات.", exerciseEn: "Apply SIFT to 5 social media posts this week.", exerciseAr: "طبّق SIFT على 5 منشورات سوشيال ميديا هذا الأسبوع.", source: "Caulfield, Web Literacy for Student Fact-Checkers (2017)" },
      { nameEn: "Prebunking Journal", nameAr: "يوميات ما قبل التفنيد", descEn: "Before reading news, predict what manipulation techniques might be used.", descAr: "قبل قراءة الأخبار، توقع ما هي تقنيات التلاعب المحتملة.", exerciseEn: "Write predictions for 3 trending topics, then verify.", exerciseAr: "اكتب توقعات لـ 3 مواضيع ترند، ثم تحقق.", source: "Roozenbeek & van der Linden (2022)" },
    ],
  },
  "keyhunter": {
    titleEn: "KeyHunter Verification", titleAr: "التحقق بمفتاح الصياد",
    steps: [
      { en: "Pick one keyword category from KeyHunter.", ar: "اختر فئة كلمة مفتاحية واحدة من مفتاح الصياد." },
      { en: "Search for that keyword in your social media feed.", ar: "ابحث عن الكلمة المفتاحية في موجز سوشيال ميديا بتاعك." },
      { en: "Classify each result: credible, suspicious, or manipulative.", ar: "صنّف كل نتيجة: موثوقة، مشبوهة، أو تلاعبية." },
    ],
    methods: [
      { nameEn: "Keyword Spotting Drill", nameAr: "تمرين رصد الكلمات", descEn: "Train your eye to spot emotional trigger words in headlines.", descAr: "درّب عينك على رصد كلمات المحفزات العاطفية في العناوين.", exerciseEn: "Highlight trigger words in 10 headlines. Count patterns.", exerciseAr: "ظلّل كلمات التحفيز في 10 عناوين. احسب الأنماط.", source: "Pennycook & Rand, Cognition (2019)" },
      { nameEn: "Source Triangulation", nameAr: "تثليث المصادر", descEn: "Verify any claim using 3 independent sources before believing it.", descAr: "تحقق من أي ادعاء باستخدام 3 مصادر مستقلة قبل تصديقه.", exerciseEn: "Pick 1 news story. Find 3 sources. Compare.", exerciseAr: "اختر خبر واحد. أوجد 3 مصادر. قارن.", source: "Wineburg & McGrew, Stanford (2019)" },
      { nameEn: "Red Flag Checklist", nameAr: "قائمة العلامات الحمراء", descEn: "Create a personal checklist of manipulation red flags.", descAr: "أنشئ قائمة شخصية بعلامات التلاعب الحمراء.", exerciseEn: "Write 10 red flags. Use them for 1 week. Refine.", exerciseAr: "اكتب 10 علامات حمراء. استخدمها أسبوع. حسّنها.", source: "First Draft News, Verification Handbook (2020)" },
    ],
  },
  "bias": {
    titleEn: "Bias Defense Training", titleAr: "تدريب الدفاع ضد التحيز",
    steps: [
      { en: "Name the specific bias you just learned about.", ar: "سمِّ التحيز المحدد اللي تعلمته للتو." },
      { en: "Recall one time this bias affected your own judgment.", ar: "تذكر مرة واحدة أثّر فيها هذا التحيز على حكمك." },
      { en: "Create an 'if-then' plan to counter it next time.", ar: "أنشئ خطة 'إذا-ثم' لمواجهته المرة القادمة." },
    ],
    methods: [
      { nameEn: "Bias Diary", nameAr: "يوميات التحيز", descEn: "Log every time you catch yourself falling for a cognitive bias.", descAr: "سجّل كل مرة تلاحظ نفسك تقع في تحيز معرفي.", exerciseEn: "Keep a bias diary for 7 days. Review patterns.", exerciseAr: "احتفظ بيوميات تحيز لـ 7 أيام. راجع الأنماط.", source: "Kahneman, Thinking Fast and Slow (2011)" },
      { nameEn: "Devil's Advocate", nameAr: "محامي الشيطان", descEn: "Deliberately argue the opposite of your initial reaction.", descAr: "جادل عمداً بعكس ردة فعلك الأولية.", exerciseEn: "For 3 decisions this week, write the opposing argument first.", exerciseAr: "لـ 3 قرارات هذا الأسبوع، اكتب الحجة المعارضة أولاً.", source: "Nemeth, In Defense of Troublemakers (2018)" },
      { nameEn: "Pre-Commitment Strategy", nameAr: "استراتيجية الالتزام المسبق", descEn: "Before evaluating info, write down your criteria for judgment.", descAr: "قبل تقييم المعلومات، اكتب معاييرك للحكم.", exerciseEn: "Write 3 criteria before reading any controversial article.", exerciseAr: "اكتب 3 معايير قبل قراءة أي مقال مثير للجدل.", source: "Ariely, Predictably Irrational (2008)" },
    ],
  },
  "forensics": {
    titleEn: "Digital Forensics Practice", titleAr: "ممارسة الطب الشرعي الرقمي",
    steps: [
      { en: "Download one suspicious image from social media.", ar: "حمّل صورة مشبوهة واحدة من سوشيال ميديا." },
      { en: "Run reverse image search (Google Images or TinEye).", ar: "شغّل بحث عكسي عن الصورة (Google Images أو TinEye)." },
      { en: "Check metadata using an online EXIF viewer.", ar: "تحقق من البيانات الوصفية باستخدام عارض EXIF." },
    ],
    methods: [
      { nameEn: "Reverse Image Search", nameAr: "البحث العكسي عن الصور", descEn: "Use Google Lens, TinEye, or Yandex to find original sources.", descAr: "استخدم Google Lens أو TinEye أو Yandex لإيجاد المصادر الأصلية.", exerciseEn: "Verify 3 viral images this week using reverse search.", exerciseAr: "تحقق من 3 صور منتشرة هذا الأسبوع بالبحث العكسي.", source: "Bellingcat, Digital Investigation Toolkit (2021)" },
      { nameEn: "Metadata Analysis", nameAr: "تحليل البيانات الوصفية", descEn: "Extract EXIF data to check date, location, and camera info.", descAr: "استخرج بيانات EXIF للتحقق من التاريخ والموقع ومعلومات الكاميرا.", exerciseEn: "Analyze metadata of 5 photos from your camera roll.", exerciseAr: "حلل البيانات الوصفية لـ 5 صور من معرض الصور.", source: "Hany Farid, Photo Forensics (2019)" },
      { nameEn: "Deepfake Detection Checklist", nameAr: "قائمة كشف التزييف العميق", descEn: "Check for: unnatural blinking, skin texture, lighting inconsistencies.", descAr: "تحقق من: رمش غير طبيعي، ملمس الجلد، تناقضات الإضاءة.", exerciseEn: "Watch 5 deepfake examples. List artifacts you spot.", exerciseAr: "شاهد 5 أمثلة تزييف عميق. اكتب التشوهات اللي لاحظتها.", source: "Chesney & Citron, J. International Affairs (2019)" },
    ],
  },
  "exercise": {
    titleEn: "Exercise Application", titleAr: "تطبيق التمرين",
    steps: [
      { en: "Identify the core skill this exercise trains.", ar: "حدد المهارة الأساسية اللي التمرين ده بيدربها." },
      { en: "Find one real-world situation where this skill applies today.", ar: "أوجد موقف واقعي واحد تنطبق فيه المهارة دي النهاردة." },
      { en: "Apply the skill and note the outcome.", ar: "طبّق المهارة وسجّل النتيجة." },
    ],
    methods: [
      { nameEn: "Transfer Training", nameAr: "تدريب النقل", descEn: "Practice the skill in progressively different contexts.", descAr: "مارس المهارة في سياقات مختلفة تدريجياً.", exerciseEn: "Apply in 3 different contexts this week.", exerciseAr: "طبّق في 3 سياقات مختلفة هذا الأسبوع.", source: "Perkins & Salomon, Transfer of Learning (1992)" },
      { nameEn: "Peer Teaching", nameAr: "تدريس الأقران", descEn: "Explain the exercise concept to someone who hasn't done it.", descAr: "اشرح مفهوم التمرين لشخص لم يعمله.", exerciseEn: "Teach 1 person this week. Note their questions.", exerciseAr: "علّم شخص واحد هذا الأسبوع. سجّل أسئلتهم.", source: "Nestojko et al., Memory & Cognition (2014)" },
      { nameEn: "Retrieval Practice", nameAr: "ممارسة الاسترجاع", descEn: "Without looking, write everything you learned from this exercise.", descAr: "بدون ما تبص، اكتب كل حاجة اتعلمتها من التمرين.", exerciseEn: "Do this within 1 hour of completing the exercise.", exerciseAr: "اعمل ده خلال ساعة من إنهاء التمرين.", source: "Karpicke & Blunt, Science (2011)" },
    ],
  },
  "assessment": {
    titleEn: "Assessment Application", titleAr: "تطبيق التقييم",
    steps: [
      { en: "Review your assessment scores honestly.", ar: "راجع درجات تقييمك بصدق." },
      { en: "Identify your weakest area from the results.", ar: "حدد أضعف منطقة من النتائج." },
      { en: "Create a 7-day improvement plan targeting that area.", ar: "أنشئ خطة تحسين 7 أيام تستهدف المنطقة دي." },
    ],
    methods: [
      { nameEn: "Gap Analysis", nameAr: "تحليل الفجوات", descEn: "Compare pre-test and post-test scores to identify growth areas.", descAr: "قارن درجات الاختبار القبلي والبعدي لتحديد مناطق النمو.", exerciseEn: "Chart your scores. Identify top 3 improvement areas.", exerciseAr: "ارسم مخطط لدرجاتك. حدد أعلى 3 مناطق تحسين.", source: "Bloom, Mastery Learning (1968)" },
      { nameEn: "Metacognitive Review", nameAr: "مراجعة ما وراء المعرفة", descEn: "Reflect on WHY you answered incorrectly, not just WHAT was wrong.", descAr: "فكّر في ليه إجابتك كانت غلط، مش بس إيه الغلط.", exerciseEn: "For each wrong answer, write the reasoning error.", exerciseAr: "لكل إجابة غلط، اكتب خطأ التفكير.", source: "Flavell, Metacognition (1979)" },
      { nameEn: "Spaced Retesting", nameAr: "إعادة الاختبار المتباعد", descEn: "Retake the assessment after 7 days to measure retention.", descAr: "أعد الاختبار بعد 7 أيام لقياس الاحتفاظ.", exerciseEn: "Schedule retake. Compare with first attempt.", exerciseAr: "جدول إعادة الاختبار. قارن مع المحاولة الأولى.", source: "Ebbinghaus, Memory (1885)" },
    ],
  },
  "authority": {
    titleEn: "Authority Verification", titleAr: "التحقق من السلطة",
    steps: [
      { en: "When someone cites an authority, verify their credentials.", ar: "لما حد يستشهد بسلطة، تحقق من مؤهلاتهم." },
      { en: "Check if the authority speaks within their field of expertise.", ar: "تحقق إذا السلطة بتتكلم في مجال تخصصها." },
      { en: "Cross-reference the authority's claims with peer-reviewed literature.", ar: "قارن ادعاءات السلطة مع الأدبيات المحكّمة." },
    ],
    methods: [
      { nameEn: "Credentials Check", nameAr: "فحص المؤهلات", descEn: "Verify degrees, affiliations, and publication record on Google Scholar.", descAr: "تحقق من الشهادات والانتماءات وسجل النشر على Google Scholar.", exerciseEn: "Look up 3 'experts' from social media. Verify credentials.", exerciseAr: "ابحث عن 3 'خبراء' من سوشيال ميديا. تحقق من مؤهلاتهم.", source: "Cialdini, Influence (2021)" },
      { nameEn: "Field-Match Test", nameAr: "اختبار تطابق المجال", descEn: "Is the expert speaking in their actual field, or outside it?", descAr: "هل الخبير بيتكلم في مجاله الفعلي، أم خارجه؟", exerciseEn: "For 5 expert opinions, check if they match the expert's field.", exerciseAr: "لـ 5 آراء خبراء، تحقق إذا بتطابق مجال الخبير.", source: "Tetlock, Expert Political Judgment (2005)" },
      { nameEn: "Consensus vs. Outlier", nameAr: "الإجماع مقابل الاستثناء", descEn: "Check if the expert's view matches scientific consensus or is an outlier.", descAr: "تحقق إذا رأي الخبير متوافق مع الإجماع العلمي أم استثنائي.", exerciseEn: "For 1 controversial claim, find the consensus position.", exerciseAr: "لادعاء مثير للجدل واحد، أوجد موقف الإجماع.", source: "Oreskes, Why Trust Science? (2019)" },
    ],
  },

  // ═══ GENERIC FALLBACK ═══
  "default": {
    titleEn: "Apply This Knowledge", titleAr: "طبّق هذه المعرفة",
    steps: [
      { en: "Identify one concept from this section that applies to your life.", ar: "حدد مفهوم واحد من هذا القسم ينطبق على حياتك." },
      { en: "Create a specific, measurable action plan to practice it.", ar: "أنشئ خطة عمل محددة وقابلة للقياس لممارسته." },
      { en: "Review your progress after 7 days and adjust.", ar: "راجع تقدمك بعد 7 أيام واضبط." },
    ],
    methods: [
      { nameEn: "Active Recall", nameAr: "الاستذكار النشط", descEn: "Close the app and write what you remember. Gaps reveal what to review.", descAr: "أغلق التطبيق واكتب ما تتذكره. الفجوات تكشف ما تحتاج مراجعته.", exerciseEn: "Practice active recall after each session for 1 week.", exerciseAr: "مارس الاستذكار النشط بعد كل جلسة لمدة أسبوع.", source: "Karpicke & Blunt, Science (2011)" },
      { nameEn: "Implementation Intentions", nameAr: "نوايا التنفيذ", descEn: "Format: 'When [situation], I will [action].' Be specific.", descAr: "صيغة: 'عندما [موقف]، سأفعل [إجراء].' كن محدداً.", exerciseEn: "Write 3 if-then plans for applying this knowledge.", exerciseAr: "اكتب 3 خطط إذا-ثم لتطبيق هذه المعرفة.", source: "Gollwitzer, American Psychologist (1999)" },
      { nameEn: "Reflection Journal", nameAr: "يوميات التأمل", descEn: "After applying, write: What worked? What didn't? What's next?", descAr: "بعد التطبيق، اكتب: ما نجح؟ ما لم ينجح؟ ما التالي؟", exerciseEn: "Spend 5 minutes journaling after each practice session.", exerciseAr: "اقضِ 5 دقائق في الكتابة بعد كل جلسة ممارسة.", source: "Gibbs, Reflective Cycle (1988)" },
    ],
  },
};

// Category prefixes for prefix-based matching
const CATEGORY_PREFIXES = ["resilience", "keyhunter", "bias", "forensics", "exercise", "assessment", "authority"];

/**
 * Get IRL content for a micro-node key.
 * Supports exact match first, then prefix-based category match, then default fallback.
 */
export function getIRLContent(key: string): IRLContent {
  // 1. Exact match
  if (store[key]) return store[key];
  // 2. Prefix match: "resilience-xyz" → "resilience"
  for (const prefix of CATEGORY_PREFIXES) {
    if (key.startsWith(prefix + "-") || key.startsWith(prefix + "_")) {
      if (store[prefix]) return store[prefix];
    }
  }
  // 3. Default fallback
  return store["default"];
}

/**
 * Get all available IRL keys
 */
export function getAllIRLKeys(): string[] {
  return Object.keys(store);
}

