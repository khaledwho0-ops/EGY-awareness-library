/**
 * TRUST CALIBRATION BATTERY — §17.3 + §17.6
 * Day 0 baseline tasks: 12 claims, 8 sources, emotion trials, comfort trials, module-specific tasks
 */

type MVP = "deepreal" | "mental-health" | "religion-hub";

// ═══════════════════════════════════════════════════════
// §17.3A — CLAIM CONFIDENCE RATING (12 claims)
// ═══════════════════════════════════════════════════════

export interface BatteryClaim {
  id: string;
  text: string;
  textAr: string;
  textArEG: string;
  isTrue: boolean;
  domain: MVP | "cross";
  emotionalLoad: "neutral" | "moderate" | "high";
  explanation: string;
  explanationAr: string;
  explanationArEG: string;
}

export const CALIBRATION_CLAIMS: BatteryClaim[] = [
  { 
    id: "cc-01", 
    text: "WHO declared social media addiction as an official mental disorder in 2024.", 
    textAr: "أعلنت منظمة الصحة العالمية إدمان وسائل التواصل الاجتماعي كاضطراب عقلي رسمي في عام 2024.",
    textArEG: "منظمة الصحة العالمية أعلنت إن إدمان السوشيال ميديا بقى مرض نفسي رسمي في 2024.",
    isTrue: false, 
    domain: "mental-health", 
    emotionalLoad: "moderate", 
    explanation: "WHO has not classified social media addiction as an official disorder in the ICD-11. Gaming disorder was added, but social media addiction remains under study.",
    explanationAr: "لم تصنف منظمة الصحة العالمية إدمان وسائل التواصل الاجتماعي كاضطراب رسمي في التصنيف الدولي للأمراض (ICD-11). تم إضافة اضطراب الألعاب، لكن إدمان التواصل الاجتماعي لا يزال قيد الدراسة.",
    explanationArEG: "منظمة الصحة العالمية لسه ما صنفتش إدمان السوشيال ميديا كمرض رسمي. هما ضافوا إدمان الألعاب بس، لكن السوشيال ميديا لسه بيدرسوها.",
  },
  { 
    id: "cc-02", 
    text: "The SIFT method stands for Stop, Investigate, Find better coverage, Trace claims.", 
    textAr: "ترمز طريقة SIFT إلى: توقف، ابحث، اعثر على تغطية أفضل، تتبع الادعاءات.",
    textArEG: "طريقة SIFT معناها: وقّف، ابحث، هات تغطية أحسن، ودوّر ورا الكلام.",
    isTrue: true, 
    domain: "deepreal", 
    emotionalLoad: "neutral", 
    explanation: "SIFT is a fact-checking framework developed by Mike Caulfield (2019) with these exact four steps.",
    explanationAr: "SIFT هو إطار عمل للتحقق من الحقائق طوره مايك كولفيلد (2019) بهذه الخطوات الأربع المحددة.",
    explanationArEG: "نظام SIFT ده نظام للتأكد من الأخبار عمله مايك كولفيلد في 2019، وهما فعلاً الأربع خطوات دول.",
  },
  { 
    id: "cc-03", 
    text: "Depression is caused solely by a chemical imbalance in the brain.", 
    textAr: "الاكتئاب ناتج فقط عن خلل كيميائي في الدماغ.",
    textArEG: "الاكتئاب سببه بس لغبطة كيميا في المخ.",
    isTrue: false, 
    domain: "mental-health", 
    emotionalLoad: "high", 
    explanation: "The 'chemical imbalance' theory is an oversimplification. Depression involves genetic, environmental, psychological, and neurobiological factors (APA, 2022).",
    explanationAr: "نظرية 'الخلل الكيميائي' هي تبسيط مفرط. يشمل الاكتئاب عوامل وراثية وبيئية ونفسية وبيولوجية عصبية (APA، 2022).",
    explanationArEG: "موضوع 'لغبطة الكيميا' ده تبسيط زيادة عن اللزوم. الاكتئاب بيدخل فيه وراثة وظروف بيئية ونفسية وحاجات تانية كتير.",
  },
  { 
    id: "cc-04", 
    text: "Reverse image search can help identify whether a photo has been used in a different context.", 
    textAr: "يمكن أن يساعد البحث العكسي عن الصور في تحديد ما إذا كانت الصورة قد استخدمت في سياق مختلف.",
    textArEG: "البحث العكسي عن الصور ممكن يعرفك لو الصورة دي اتستخدمت قبل كدة في موضوع تاني.",
    isTrue: true, 
    domain: "deepreal", 
    emotionalLoad: "neutral", 
    explanation: "Reverse image search is a core verification technique used by professional fact-checkers to trace image origins.",
    explanationAr: "البحث العكسي عن الصور هو تقنية تحقق أساسية يستخدمها مدققو الحقائق المحترفون لتتبع أصول الصور.",
    explanationArEG: "البحث العكسي ده أساسي لأي حد بيتأكد من الأخبار عشان يعرف الصورة دي أصلها إيه وجت منين.",
  },
  { 
    id: "cc-05", 
    text: "Positive religious coping has been correlated with better psychological adjustment in over 100 studies.", 
    textAr: "ارتبط التكيف الديني الإيجابي بتحسن التوافق النفسي في أكثر من 100 دراسة.",
    textArEG: "التكيف الديني الإيجابي له علاقة بتحسن الحالة النفسية في أكتر من 100 دراسة.",
    isTrue: true, 
    domain: "religion-hub", 
    emotionalLoad: "moderate", 
    explanation: "Pargament et al. (2011) documented consistent positive correlations (r=0.3-0.5) across extensive research.",
    explanationAr: "وثق بارجامينت وآخرون (2011) ارتباطات إيجابية ثابتة (r=0.3-0.5) عبر أبحاث مكثفة.",
    explanationArEG: "الأبحاث (زي أبحاث بارجامينت 2011) أثبتت إن في علاقة قوية بين التدين الإيجابي والراحة النفسية.",
  },
  { 
    id: "cc-06", 
    text: "AI-generated deepfake videos can now be created in real-time during live video calls.", 
    textAr: "يمكن الآن إنشاء مقاطع فيديو التزييف العميق (Deepfake) في الوقت الفعلي أثناء مكالمات الفيديو المباشرة.",
    textArEG: "دلوقتي ممكن حد يعمل فيديو متفبرك بالذكاء الاصطناعي (Deepfake) في نفس وقت مكالمة الفيديو.",
    isTrue: true, 
    domain: "deepreal", 
    emotionalLoad: "high", 
    explanation: "Real-time face-swapping technology exists and has been demonstrated in video calls, though quality varies.",
    explanationAr: "تقنية تبديل الوجوه في الوقت الفعلي موجودة وتم إثباتها في مكالمات الفيديو، رغم تفاوت الجودة.",
    explanationArEG: "تكنولوجيا تبديل الوشوش لايف بقت موجودة فعلاً واتجربت في مكالمات فيديو، بس جودتها بتختلف.",
  },
  { 
    id: "cc-07", 
    text: "Talking about suicide increases the risk of suicidal behavior.", 
    textAr: "الحديث عن الانتحار يزيد من خطر السلوك الانتحاري.",
    textArEG: "الكلام عن الانتحار بيزود خطر إن الشخص يعمل كدة فعلاً.",
    isTrue: false, 
    domain: "mental-health", 
    emotionalLoad: "high", 
    explanation: "Research consistently shows that asking about suicide in a caring way does NOT increase risk and can actually reduce distress (WHO, 2021).",
    explanationAr: "تظهر الأبحاث باستمرار أن السؤال عن الانتحار بطريقة متعاطفة لا يزيد الخطر، بل قد يقلل من الضيق (منظمة الصحة العالمية، 2021).",
    explanationArEG: "الأبحاث كلها بتأكد إن لما تسأل حد عن الانتحار بتعاطف ده مابيزودش الخطر، بالعكس ده بيقلل وجعه النفسي (حسب منظمة الصحة العالمية).",
  },
  { 
    id: "cc-08", 
    text: "Spiritual bypassing refers to using spiritual practices to avoid dealing with psychological issues.", 
    textAr: "يشير التجاوز الروحي إلى استخدام الممارسات الروحية لتجنب التعامل مع المشكلات النفسية.",
    textArEG: "التجاوز الروحي هو إن الواحد يستخدم الدين أو الروحانيات عشان يهرب من حل مشاكله النفسية.",
    isTrue: true, 
    domain: "religion-hub", 
    emotionalLoad: "moderate", 
    explanation: "Defined by Welwood (1984) and expanded by Masters (2010), spiritual bypassing is the use of spiritual practices to sidestep unresolved psychological wounds.",
    explanationAr: "تم تعريفه بواسطة ويلوود (1984) وتوسيعه بواسطة ماسترز (2010)، وهو استخدام الممارسات الروحية لتجنب الجروح النفسية غير المحلولة.",
    explanationArEG: "العلماء عرفوه بإنه استخدام العبادات أو الروحانيات عشان الواحد يهرب من وجع نفسي أو صدمة ما اتعالجتش.",
  },
  { 
    id: "cc-09", 
    text: "A fact-check article from an IFCN-certified organization is always 100% accurate.", 
    textAr: "مقال التحقق من الحقائق الصادر عن مؤسسة معتمدة من IFCN دقيق دائماً بنسبة 100%.",
    textArEG: "أي مقال تدقيق أخبار من مؤسسة معتمدة من IFCN بيكون صح 100% دايماً.",
    isTrue: false, 
    domain: "deepreal", 
    emotionalLoad: "neutral", 
    explanation: "IFCN certification ensures methodology transparency and correction policies, not infallibility. Fact-checkers can make errors but must correct them.",
    explanationAr: "تضمن شهادة IFCN شفافية المنهجية وسياسات التصحيح، وليس العصمة. يمكن لمدققي الحقائق أن يخطئوا ولكن يجب عليهم تصحيح الأخطاء.",
    explanationArEG: "الشهادة دي بتضمن إن عندهم شفافية ونظام لتصحيح الغلط، بس هما مش معصومين، ممكن يغلطوا ولازم يصلحوا غلطهم.",
  },
  { 
    id: "cc-10", 
    text: "Anxiety disorders are the most common mental health conditions globally.", 
    textAr: "اضطرابات القلق هي أكثر حالات الصحة النفسية شيوعاً على مستوى العالم.",
    textArEG: "اضطرابات القلق هي أكتر الأمراض النفسية المنتشرة في العالم.",
    isTrue: true, 
    domain: "mental-health", 
    emotionalLoad: "neutral", 
    explanation: "WHO and multiple epidemiological studies confirm anxiety disorders as the most prevalent mental health conditions worldwide.",
    explanationAr: "تؤكد منظمة الصحة العالمية والدراسات الوبائية المتعددة أن اضطرابات القلق هي الحالات النفسية الأكثر انتشاراً في جميع أنحاء العالم.",
    explanationArEG: "منظمة الصحة العالمية وأبحاث كتير بتأكد إن القلق هو أكتر حاجة نفسية الناس بتعاني منها في العالم كله.",
  },
  { 
    id: "cc-11", 
    text: "Negative religious coping is always harmful and should be completely eliminated.", 
    textAr: "التكيف الديني السلبي ضار دائماً ويجب القضاء عليه تماماً.",
    textArEG: "التكيف الديني السلبي دايماً مضر ولازم نلغيه خالص.",
    isTrue: false, 
    domain: "religion-hub", 
    emotionalLoad: "moderate", 
    explanation: "While persistent negative religious coping correlates with distress, brief experiences can be part of normal meaning-making. The goal is awareness and balance, not elimination (Pargament, 2011).",
    explanationAr: "بينما يرتبط التكيف الديني السلبي المستمر بالضيق، يمكن أن تكون التجارب القصيرة جزءاً من صنع المعنى الطبيعي. الهدف هو الوعي والتوازن، وليس القضاء عليه (بارجامينت، 2011).",
    explanationArEG: "رغم إن الاستمرار فيه بيتعب نفسياً، بس المرور بيه لفترة قصيرة ممكن يكون جزء طبيعي عشان نفهم اللي بيحصلنا. الهدف هو التوازن مش إننا نلغيه خالص.",
  },
  { 
    id: "cc-12", 
    text: "A verified blue checkmark on social media guarantees that the account's content is factually accurate.", 
    textAr: "تضمن العلامة الزرقاء الموثقة على وسائل التواصل الاجتماعي أن محتوى الحساب دقيق واقعياً.",
    textArEG: "العلامة الزرقاء اللي على السوشيال ميديا بتضمن إن كل كلام الأكونت ده صح 100%.",
    isTrue: false, 
    domain: "deepreal", 
    emotionalLoad: "neutral", 
    explanation: "Verification badges confirm identity, not accuracy. Verified accounts can and do share misinformation.",
    explanationAr: "تؤكد شارات التحقق الهوية، وليس الدقة. يمكن للحسابات الموثقة أن تنشر معلومات مضللة وتفعل ذلك بالفعل.",
    explanationArEG: "العلامة الزرقاء بتأكد هوية الشخص بس مش صحة كلامه. ياما حسابات موثقة بتنشر أخبار كدب عادي جداً.",
  },

];

// ═══════════════════════════════════════════════════════
// §17.3B — SOURCE RANKING SPRINT (8 sources per scenario)
// ═══════════════════════════════════════════════════════

export interface SourceRankingScenario {
  id: string;
  scenario: string;
  scenarioAr: string;
  scenarioArEG: string;
  domain: MVP;
  sources: Array<{
    sourceId: string;
    name: string;
    nameAr: string;
    nameArEG: string;
    description: string;
    descriptionAr: string;
    descriptionArEG: string;
    hasAuthorityMarkers: boolean;
    hasEvidenceQuality: boolean;
    idealRank: number;
  }>;
}

export const SOURCE_RANKING_SCENARIOS: SourceRankingScenario[] = [
  {
    id: "sr-01",
    scenario: "You see a viral claim that a new medication cures depression in 3 days. Which sources would you trust most to verify this?",
    scenarioAr: "ترى ادعاءً منتشراً بأن دواءً جديداً يعالج الاكتئاب في 3 أيام. أي المصادر ستثق بها أكثر للتحقق من ذلك؟",
    scenarioArEG: "شفت خبر منتشر بيقول إن فيه دواء جديد بيعالج الاكتئاب في 3 أيام. إيه المصادر اللي هتثق فيها أكتر عشان تتأكد؟",
    domain: "mental-health",
    sources: [
      { sourceId: "sr-01-a", name: "PubMed / NCBI", nameAr: "ببمد / المركز الوطني لمعلومات التكنولوجيا الحيوية", nameArEG: "موقع PubMed للأبحاث الطبية", description: "US National Library of Medicine database of peer-reviewed biomedical research", descriptionAr: "قاعدة بيانات المكتبة الوطنية الأمريكية للطب للأبحاث الطبية الحيوية المراجعة من الأقران", descriptionArEG: "أكبر موقع أمريكي للأبحاث الطبية المراجعة علمياً", hasAuthorityMarkers: true, hasEvidenceQuality: true, idealRank: 1 },
      { sourceId: "sr-01-b", name: "WHO Mental Health", nameAr: "الصحة النفسية - منظمة الصحة العالمية", nameArEG: "موقع منظمة الصحة العالمية للصحة النفسية", description: "World Health Organization's mental health information portal", descriptionAr: "بوابة معلومات الصحة النفسية لمنظمة الصحة العالمية", descriptionArEG: "الصفحة الرسمية للصحة النفسية تبع منظمة الصحة العالمية", hasAuthorityMarkers: true, hasEvidenceQuality: true, idealRank: 2 },
      { sourceId: "sr-01-c", name: "A famous TV doctor's Instagram post", nameAr: "منشور لطبيب تلفزيوني مشهور على إنستغرام", nameArEG: "بوست لدكتور مشهور بيطلع في التلفزيون على إنستجرام", description: "Celebrity physician with 5M followers shares personal opinion", descriptionAr: "طبيب مشهور يتابعه 5 ملايين يشارك رأيه الشخصي", descriptionArEG: "دكتور مشهور عنده 5 مليون متابع بيقول رأيه الشخصي", hasAuthorityMarkers: true, hasEvidenceQuality: false, idealRank: 6 },
      { sourceId: "sr-01-d", name: "Cochrane Systematic Review", nameAr: "المراجعة المنهجية لكوكرين", nameArEG: "مراجعات كوكرين الطبية", description: "Independent review organization synthesizing clinical trial evidence", descriptionAr: "منظمة مراجعة مستقلة تجمع أدلة التجارب السريرية", descriptionArEG: "منظمة مستقلة بتجمع وتقيم كل التجارب السريرية", hasAuthorityMarkers: false, hasEvidenceQuality: true, idealRank: 1 },
      { sourceId: "sr-01-e", name: "A university psychology department blog", nameAr: "مدونة قسم علم النفس بإحدى الجامعات", nameArEG: "بلوج لقسم علم نفس في جامعة", description: "Academic blog with citations but no peer review", descriptionAr: "مدونة أكاديمية بها استشهادات ولكن لا تخضع لمراجعة الأقران", descriptionArEG: "مدونة أكاديمية فيها مصادر بس ماتراجعتش علمياً", hasAuthorityMarkers: true, hasEvidenceQuality: false, idealRank: 5 },
      { sourceId: "sr-01-f", name: "Reuters Fact Check", nameAr: "رويترز لتقصي الحقائق", nameArEG: "صفحة رويترز للتأكد من الأخبار", description: "Major wire service fact-checking division", descriptionAr: "قسم تقصي الحقائق في وكالة أنباء كبرى", descriptionArEG: "قسم تدقيق الأخبار في وكالة رويترز المعروفة", hasAuthorityMarkers: true, hasEvidenceQuality: true, idealRank: 3 },
      { sourceId: "sr-01-g", name: "A trending TikTok with 2M views", nameAr: "مقطع تيك توك رائج بـ 2 مليون مشاهدة", nameArEG: "فيديو تيك توك تريند جايب 2 مليون مشاهدة", description: "Anonymous user shares dramatic personal recovery story", descriptionAr: "مستخدم مجهول يشارك قصة تعافي شخصية درامية", descriptionArEG: "شخص مجهول بيحكي قصة شفائه العجيبة", hasAuthorityMarkers: false, hasEvidenceQuality: false, idealRank: 8 },
      { sourceId: "sr-01-h", name: "MedlinePlus", nameAr: "ميدلاين بلس", nameArEG: "موقع MedlinePlus", description: "NIH patient-facing medical information with editorial oversight", descriptionAr: "معلومات طبية موجهة للمرضى من المعاهد الوطنية للصحة مع إشراف تحريري", descriptionArEG: "موقع حكومي أمريكي بيقدم معلومات طبية مبسطة للمرضى بإشراف دكاترة", hasAuthorityMarkers: true, hasEvidenceQuality: true, idealRank: 3 },
    ],
  },
  {
    id: "sr-02",
    scenario: "A friend shares an alarming video claiming a political leader said something controversial. How would you rank these sources for verification?",
    scenarioAr: "يشاركك صديق مقطع فيديو مقلقاً يدعي أن زعيماً سياسياً قال شيئاً مثيراً للجدل. كيف ترتب هذه المصادر للتحقق؟",
    scenarioArEG: "صاحبك شير لك فيديو صادم بيقول إن فيه مسؤول سياسي قال كلام خطير. هترتب المصادر دي إزاي عشان تتأكد؟",
    domain: "deepreal",
    sources: [
      { sourceId: "sr-02-a", name: "Internet Archive / Wayback Machine", nameAr: "أرشيف الإنترنت / واي باك ماشين", nameArEG: "موقع أرشيف الإنترنت Wayback Machine", description: "Non-profit digital archive preserving web pages over time", descriptionAr: "أرشيف رقمي غير ربحي يحفظ صفحات الويب بمرور الوقت", descriptionArEG: "أرشيف بيحتفظ بنسخ قديمة من أي موقع على الإنترنت", hasAuthorityMarkers: false, hasEvidenceQuality: true, idealRank: 2 },
      { sourceId: "sr-02-b", name: "The political leader's official website", nameAr: "الموقع الرسمي للزعيم السياسي", nameArEG: "الموقع الرسمي للمسؤول السياسي", description: "Primary source but potentially curated", descriptionAr: "مصدر أولي ولكنه قد يكون منسقاً", descriptionArEG: "مصدر أولي بس ممكن يكون متظبط أو متحيز", hasAuthorityMarkers: true, hasEvidenceQuality: false, idealRank: 4 },
      { sourceId: "sr-02-c", name: "AFP Fact Check", nameAr: "تقصي الحقائق من فرانس برس", nameArEG: "صفحة تدقيق الأخبار من فرانس برس AFP", description: "International news agency's dedicated fact-checking service", descriptionAr: "خدمة تقصي الحقائق المخصصة لوكالة أنباء دولية", descriptionArEG: "خدمة مخصصة للتأكد من الأخبار تبع وكالة أنباء عالمية", hasAuthorityMarkers: true, hasEvidenceQuality: true, idealRank: 1 },
      { sourceId: "sr-02-d", name: "A partisan news blog with strong opinions", nameAr: "مدونة إخبارية حزبية ذات آراء قوية", nameArEG: "مدونة أخبار متحيزة ولها توجهات واضحة", description: "Blog with clear political alignment, no corrections policy", descriptionAr: "مدونة ذات توجه سياسي واضح، بدون سياسة تصحيح", descriptionArEG: "مدونة ليها توجه سياسي معين وماعندهاش سياسة لتصحيح الغلط", hasAuthorityMarkers: false, hasEvidenceQuality: false, idealRank: 7 },
      { sourceId: "sr-02-e", name: "InVID/WeVerify video toolkit", nameAr: "أدوات InVID/WeVerify للفيديو", nameArEG: "أدوات InVID لتحليل الفيديوهات", description: "EU-funded video verification tool for analyzing metadata", descriptionAr: "أداة للتحقق من الفيديو ممولة من الاتحاد الأوروبي لتحليل البيانات الوصفية", descriptionArEG: "أداة أوروبية عشان تحلل الفيديوهات وتعرف أصلها وتفاصيلها", hasAuthorityMarkers: false, hasEvidenceQuality: true, idealRank: 2 },
      { sourceId: "sr-02-f", name: "A WhatsApp forward from a trusted uncle", nameAr: "رسالة واتساب محولة من عم موثوق به", nameArEG: "رسالة واتساب متحولة من حد كبير بتثق فيه", description: "Family member who 'always knows what's happening'", descriptionAr: "فرد من العائلة 'يعرف دائماً ما يحدث'", descriptionArEG: "حد في العيلة 'دائماً عارف الأخبار قبل أي حد'", hasAuthorityMarkers: false, hasEvidenceQuality: false, idealRank: 8 },
      { sourceId: "sr-02-g", name: "BBC Verify", nameAr: "بي بي سي للتحقق", nameArEG: "قسم BBC Verify للتأكد من الأخبار", description: "BBC's specialist verification unit", descriptionAr: "وحدة التحقق المتخصصة في بي بي سي", descriptionArEG: "وحدة مخصصة في قناة BBC عشان تتأكد من صحة الفيديوهات والأخبار", hasAuthorityMarkers: true, hasEvidenceQuality: true, idealRank: 1 },
      { sourceId: "sr-02-h", name: "Google Fact Check Explorer", nameAr: "مستكشف التحقق من الحقائق من جوجل", nameArEG: "أداة جوجل للبحث عن الأخبار المدققة", description: "Aggregator of ClaimReview fact-checks from IFCN members", descriptionAr: "مجمّع لعمليات تقصي الحقائق من أعضاء الشبكة الدولية لتقصي الحقائق", descriptionArEG: "أداة بتجمع كل الأخبار اللي راجعتها مواقع معتمدة من IFCN", hasAuthorityMarkers: true, hasEvidenceQuality: true, idealRank: 3 },
    ],
  },
];

// ═══════════════════════════════════════════════════════
// §17.3C — EMOTION VS EVIDENCE TRIALS (matched pairs)
// ═══════════════════════════════════════════════════════

export interface EmotionEvidencePair {
  id: string;
  domain: MVP;
  neutralVersion: { text: string; textAr: string; textArEG: string; isFactuallyAccurate: boolean };
  emotionalVersion: { text: string; textAr: string; textArEG: string; isFactuallyAccurate: boolean; emotionalTrigger: string };
}

export const EMOTION_EVIDENCE_PAIRS: EmotionEvidencePair[] = [
  {
    id: "ee-01", domain: "deepreal",
    neutralVersion: { 
      text: "A study found that 45% of social media users share articles without reading beyond the headline.", 
      textAr: "وجدت دراسة أن 45% من مستخدمي وسائل التواصل الاجتماعي يشاركون المقالات دون قراءة ما وراء العنوان.",
      textArEG: "دراسة لقت إن 45% من الناس على السوشيال ميديا بيشيروا المقالات من غير ما يقروا غير العنوان بس.",
      isFactuallyAccurate: true 
    },
    emotionalVersion: { 
      text: "SHOCKING: Nearly HALF of everyone on social media is spreading DANGEROUS misinformation by sharing articles they NEVER even read!", 
      textAr: "صادم: ما يقرب من نصف الجميع على وسائل التواصل الاجتماعي ينشرون معلومات مضللة خطيرة من خلال مشاركة مقالات لم يقرأوها أبداً!",
      textArEG: "صدمة: نص الناس اللي على السوشيال ميديا بينشروا إشاعات خطر بإنهم بيشيروا مواضيع عمرهم ما قروها!",
      isFactuallyAccurate: true, 
      emotionalTrigger: "fear + urgency" 
    },
  },
  {
    id: "ee-02", domain: "mental-health",
    neutralVersion: { 
      text: "Research suggests that regular physical activity is associated with a 20-30% reduction in depressive symptoms.", 
      textAr: "تشير الأبحاث إلى أن النشاط البدني المنتظم يرتبط بانخفاض بنسبة 20-30% في أعراض الاكتئاب.",
      textArEG: "الأبحاث بتقول إن الرياضة المنتظمة بتقلل أعراض الاكتئاب بنسبة 20 لـ 30%.",
      isFactuallyAccurate: true 
    },
    emotionalVersion: { 
      text: "This one simple exercise DESTROYS depression — doctors don't want you to know that you DON'T need medication!", 
      textAr: "هذا التمرين البسيط يدمر الاكتئاب - الأطباء لا يريدونك أن تعرف أنك لا تحتاج إلى دواء!",
      textArEG: "التمرين ده بيقضي تماماً على الاكتئاب - الدكاترة مش عايزينك تعرف إنك مش محتاج دواء!",
      isFactuallyAccurate: false, 
      emotionalTrigger: "hope + conspiracy" 
    },
  },
  {
    id: "ee-03", domain: "religion-hub",
    neutralVersion: { 
      text: "Studies show that communal religious practices are positively correlated with social support networks.", 
      textAr: "تظهر الدراسات أن الممارسات الدينية الجماعية ترتبط إيجابياً بشبكات الدعم الاجتماعي.",
      textArEG: "الدراسات بتبين إن الصلاة الجماعية والنشاطات الدينية بتقوي علاقات الناس ببعض والدعم اللي بينهم.",
      isFactuallyAccurate: true 
    },
    emotionalVersion: { 
      text: "Anyone who doesn't pray regularly is destroying their mental health — science has PROVEN that faith is the ONLY path to happiness!", 
      textAr: "أي شخص لا يصلي بانتظام يدمر صحته النفسية - لقد أثبت العلم أن الإيمان هو الطريق الوحيد للسعادة!",
      textArEG: "اللي مش بيصلي بانتظام بيدمر صحته النفسية - العلم أثبت إن الإيمان هو الطريق الوحيد للسعادة!",
      isFactuallyAccurate: false, 
      emotionalTrigger: "guilt + moral panic" 
    },
  },
  {
    id: "ee-04", domain: "deepreal",
    neutralVersion: { 
      text: "Deepfake detection tools achieve approximately 65-90% accuracy depending on the generation method used.", 
      textAr: "تحقق أدوات اكتشاف التزييف العميق دقة تتراوح بين 65-90% تقريباً اعتماداً على طريقة التوليد المستخدمة.",
      textArEG: "أدوات كشف الديب فيك بتوصل دقتها لـ 65-90% على حسب الفيديو معمول إزاي.",
      isFactuallyAccurate: true 
    },
    emotionalVersion: { 
      text: "WARNING: AI deepfakes are now COMPLETELY undetectable — you can NEVER trust any video you see online again!", 
      textAr: "تحذير: لا يمكن اكتشاف التزييف العميق للذكاء الاصطناعي الآن تماماً - لا يمكنك الوثوق بأي فيديو تراه عبر الإنترنت مرة أخرى أبداً!",
      textArEG: "تحذير: فيديوهات الديب فيك بقت مستحيل تكتشفها - ماتصدقش أي فيديو تشوفه على النت بعد كدة!",
      isFactuallyAccurate: false, 
      emotionalTrigger: "fear + helplessness" 
    },
  },
  {
    id: "ee-05", domain: "mental-health",
    neutralVersion: { 
      text: "Cognitive behavioral therapy has been shown to be effective for anxiety disorders in multiple randomized controlled trials.", 
      textAr: "ثبت أن العلاج المعرفي السلوكي فعال لاضطرابات القلق في العديد من التجارب العشوائية المحكومة.",
      textArEG: "العلاج السلوكي المعرفي أثبت إنه فعال جداً في حالات القلق في تجارب وأبحاث كتير.",
      isFactuallyAccurate: true 
    },
    emotionalVersion: { 
      text: "Therapy is just talking — a WASTE of time and money. Real strength means handling your problems ALONE without anyone's help!", 
      textAr: "العلاج مجرد كلام - إضاعة للوقت والمال. القوة الحقيقية تعني التعامل مع مشاكلك بمفردك دون مساعدة أي شخص!",
      textArEG: "العلاج النفسي مجرد كلام وكله تضييع وقت وفلوس. القوة الحقيقية إنك تحل مشاكلك لوحدك من غير ما تحتاج لحد!",
      isFactuallyAccurate: false, 
      emotionalTrigger: "identity + stigma" 
    },
  },
];


// ═══════════════════════════════════════════════════════
// §17.3D — COMFORT VS ACCURACY TRIALS
// ═══════════════════════════════════════════════════════

export interface ComfortAccuracyPair {
  id: string;
  domain: MVP;
  comfortingVersion: { text: string; textAr: string; textArEG: string; evidenceStrength: "weak" | "moderate" | "strong" };
  accurateVersion: { text: string; textAr: string; textArEG: string; evidenceStrength: "weak" | "moderate" | "strong" };
}

export const COMFORT_ACCURACY_PAIRS: ComfortAccuracyPair[] = [
  {
    id: "ca-01", domain: "mental-health",
    comfortingVersion: { 
      text: "Just think positive thoughts and your anxiety will go away. You're stronger than you think — you don't need professional help!", 
      textAr: "فقط فكر في أفكار إيجابية وسيختفي قلقك. أنت أقوى مما تعتقد - لست بحاجة إلى مساعدة مهنية!",
      textArEG: "خليك إيجابي وهتلاقي القلق راح لوحده. أنت أقوى من كدة بكتير ومش محتاج دكاترة!",
      evidenceStrength: "weak" 
    },
    accurateVersion: { 
      text: "Anxiety disorders are treatable conditions. Evidence-based approaches like CBT and medication can be effective, but the right approach depends on individual assessment by a professional.", 
      textAr: "اضطرابات القلق هي حالات قابلة للعلاج. يمكن أن تكون الأساليب القائمة على الأدلة مثل العلاج المعرفي السلوكي والأدوية فعالة، ولكن النهج الصحيح يعتمد على التقييم الفردي من قبل متخصص.",
      textArEG: "اضطرابات القلق دي حالات بتتعالج عادي. في طرق علمية زي العلاج السلوكي والأدوية، بس لازم متخصص هو اللي يحدد الأنسب ليك.",
      evidenceStrength: "strong" 
    },
  },
  {
    id: "ca-02", domain: "religion-hub",
    comfortingVersion: { 
      text: "If you pray enough, God will remove all your suffering. True believers never experience mental health problems.", 
      textAr: "إذا صليت بما فيه الكفاية، سيزيل الله كل معاناتك. المؤمنون الحقيقيون لا يعانون أبداً من مشاكل الصحة النفسية.",
      textArEG: "لو صليت كفاية ربنا هيشيل عنك كل التعب. المؤمن الحقيقي مش بيتعب نفسياً أبداً.",
      evidenceStrength: "weak" 
    },
    accurateVersion: { 
      text: "Religious practices like prayer can provide comfort and meaning during difficult times. However, persistent psychological distress may benefit from both spiritual support and professional care.", 
      textAr: "يمكن للممارسات الدينية مثل الصلاة أن توفر الراحة والمعنى خلال الأوقات الصعبة. ومع ذلك، قد يستفيد الضيق النفسي المستمر من كل من الدعم الروحي والرعاية المهنية.",
      textArEG: "الصلاة والعبادات بتريح الواحد وبتهون عليه الصعب، بس التعب النفسي المستمر بيحتاج بجانب الصلاة مساعدة من متخصصين.",
      evidenceStrength: "strong" 
    },
  },
  {
    id: "ca-03", domain: "deepreal",
    comfortingVersion: { 
      text: "Don't worry about misinformation — smart people like you can always tell what's fake. Trust your gut instinct.", 
      textAr: "لا تقلق بشأن المعلومات المضللة - فالأشخاص الأذكياء مثلك يمكنهم دائماً معرفة ما هو مزيف. ثق بحدسك.",
      textArEG: "ماتشغلش بالك بالإشاعات، الناس الذكية اللي زيك بيعرفوا الحقيقة لوحدهم. اعتمد على إحساسك بس.",
      evidenceStrength: "weak" 
    },
    accurateVersion: { 
      text: "Research shows that even highly educated individuals are susceptible to misinformation, especially when it confirms existing beliefs. Systematic verification methods outperform intuition.", 
      textAr: "تظهر الأبحاث أنه حتى الأفراد ذوي التعليم العالي معرضون للمعلومات المضللة، خاصة عندما تؤكد المعتقدات الحالية. أساليب التحقق المنهجية تتفوق على الحدس.",
      textArEG: "الأبحاث بتقول إن حتى المتعلمين ممكن يصدقوا إشاعات، بالذات لو جاية على هواهم. عشان كدة لازم نمشي بخطوات تأكيد علمية بدل الإحساس.",
      evidenceStrength: "strong" 
    },
  },
  {
    id: "ca-04", domain: "mental-health",
    comfortingVersion: { 
      text: "Everyone feels sad sometimes — there's no need to see a doctor. Time heals everything.", 
      textAr: "الكل يشعر بالحزن أحياناً - لا داعي لرؤية طبيب. الوقت يشفي كل شيء.",
      textArEG: "كل الناس بتحزن عادي، مش محتاجة دكتور يعني. الوقت بينسي كل حاجة.",
      evidenceStrength: "weak" 
    },
    accurateVersion: { 
      text: "While sadness is a normal emotion, persistent depressive episodes lasting 2+ weeks with functional impairment may indicate a clinical condition that benefits from professional assessment.", 
      textAr: "بينما الحزن عاطفة طبيعية، فإن نوبات الاكتئاب المستمرة التي تستمر لأكثر من أسبوعين مع ضعف وظيفي قد تشير إلى حالة سريرية تستفيد من التقييم المهني.",
      textArEG: "الحزن طبيعي، بس لو استمر أكتر من أسبوعين وبدأ يأثر على حياتك وشغلك، يبقى لازم تستشير متخصص.",
      evidenceStrength: "strong" 
    },
  },
];


// ═══════════════════════════════════════════════════════
// §17.6 — MODULE-SPECIFIC BASELINE TASKS (3 per MVP)
// ═══════════════════════════════════════════════════════

export interface BaselineTask {
  id: string;
  mvp: MVP;
  taskType: string;
  title: string;
  titleAr: string;
  titleArEG: string;
  description: string;
  descriptionAr: string;
  descriptionArEG: string;
  instruction: string;
  instructionAr: string;
  instructionArEG: string;
  items: Array<{
    itemId: string;
    content: string;
    contentAr: string;
    contentArEG: string;
    correctAnswer: string;
    explanation: string;
    explanationAr: string;
    explanationArEG: string;
  }>;
}

export const MODULE_BASELINE_TASKS: BaselineTask[] = [
  // §17.6 DeepReal Baseline — Thumbnail Trap Test
  {
    id: "bl-dr-01", mvp: "deepreal", taskType: "thumbnail_trap",
    title: "Thumbnail Trap Test",
    titleAr: "اختبار فخ الصورة المصغرة",
    titleArEG: "اختبار فخ الصورة المصغرة",
    description: "Measures visual-trigger vulnerability by comparing acceptance rates of headlines with and without emotionally strong thumbnails.",
    descriptionAr: "يقيس القابلية للتأثر بالمحفزات البصرية من خلال مقارنة معدلات قبول العناوين مع وبدون صور مصغرة عاطفية قوية.",
    descriptionArEG: "بيشوف قد إيه بتتأثر بالصور اللي بتشد الانتباه عن طريق مقارنة العناوين اللي بصور واللي من غير.",
    instruction: "Rate each headline as 'Likely True', 'Likely False', or 'Need More Info'. Some have images, some don't.",
    instructionAr: "صنف كل عنوان كـ 'محتمل الصدق' أو 'محتمل الكذب' أو 'بحاجة لمزيد من المعلومات'. بعضها يحتوي على صور، وبعضها لا.",
    instructionArEG: "قول رأيك في كل عنوان: 'غالباً صح'، 'غالباً غلط'، أو 'محتاج أتأكد'. في عناوين بصور وفي من غير.",
    items: [
      { 
        itemId: "tt-01", 
        content: "Scientists announce breakthrough in renewable energy storage [with dramatic explosion image]", 
        contentAr: "علماء يعلنون عن اختراق في تخزين الطاقة المتجددة [مع صورة انفجار درامي]",
        contentArEG: "علماء بيعلنوا عن تطور كبير في تخزين الطاقة المتجددة [مع صورة انفجار قوية]",
        correctAnswer: "need_more_info", 
        explanation: "The dramatic image is unrelated to the energy storage claim and may bias your judgment.",
        explanationAr: "الصورة الدرامية غير مرتبطة بادعاء تخزين الطاقة وقد تنحاز لحكمك.",
        explanationArEG: "صورة الانفجار ملهاش علاقة أصلاً بموضوع تخزين الطاقة، هي محطوطة بس عشان تشدك وتخليك تصدق أو تخاف.",
      },
      { 
        itemId: "tt-02", 
        content: "Local council approves new park construction plan", 
        contentAr: "المجلس المحلي يوافق على خطة بناء حديقة جديدة",
        contentArEG: "المجلس المحلي وافق على خطة بناء جنينة جديدة",
        correctAnswer: "need_more_info", 
        explanation: "Without a source or context, even neutral-sounding headlines require verification.",
        explanationAr: "بدون مصدر أو سياق، حتى العناوين التي تبدو محايدة تتطلب التحقق.",
        explanationArEG: "حتى الكلام اللي شكله عادي ومحايد لازم نتأكد من مصدره قبل ما نصدقه.",
      },
      { 
        itemId: "tt-03", 
        content: "BREAKING: This common food is secretly poisoning your family [with scary chemical image]", 
        contentAr: "عاجل: هذا الطعام الشائع يسمم عائلتك سراً [مع صورة كيميائية مخيفة]",
        contentArEG: "عاجل: الأكلة دي بتسمم عيلتك في السر وأنت مش عارف [مع صورة مواد كيماوية بتخوف]",
        correctAnswer: "likely_false", 
        explanation: "Sensational language + scary imagery + vague claims = classic misinformation pattern.",
        explanationAr: "اللغة المثيرة + الصور المخيفة + الادعاءات الغامضة = نمط تضليل كلاسيكي.",
        explanationArEG: "كلام بيخوف + صور مرعبة + كلام مش محدد = ده الشكل المعروف للإشاعات والأخبار الغلط.",
      },
    ],
  },
  // §17.6 DeepReal Baseline — Source Swap Test
  {
    id: "bl-dr-02", mvp: "deepreal", taskType: "source_swap",
    title: "Source Swap Test",
    titleAr: "اختبار تبديل المصدر",
    titleArEG: "اختبار تغيير المصدر",
    description: "Measures authority overweighting by presenting the same claim from different source types.",
    descriptionAr: "يقيس المبالغة في تقدير السلطة من خلال تقديم نفس الادعاء من أنواع مصادر مختلفة.",
    descriptionArEG: "بيشوفك بتدي ثقة زيادة للمصدر ولا لأ عن طريق تقديم نفس المعلومة من مصادر مختلفة.",
    instruction: "The same claim appears from 4 different sources. Rate how much you trust each version (1-5).",
    instructionAr: "يظهر نفس الادعاء من 4 مصادر مختلفة. قيم مدى ثقتك بكل نسخة (1-5).",
    instructionArEG: "نفس المعلومة موجودة من 4 مصادر مختلفة. إدي تقييم لثقتك في كل واحدة من 1 لـ 5.",
    items: [
      { itemId: "ss-01", content: "Studies show that screen time above 4 hours daily is linked to decreased attention span in young adults — attributed to BBC News", contentAr: "تشير الدراسات إلى أن وقت الشاشة الذي يزيد عن 4 ساعات يومياً مرتبط بضعف الانتباه لدى الشباب - يُنسب إلى بي بي سي نيوز", contentArEG: "دراسات بتقول إن القعدة قدام الشاشات أكتر من 4 ساعات في اليوم بتضعف الانتباه عند الشباب - منسوب لـ BBC News", correctAnswer: "moderate_trust", explanation: "BBC is generally reliable but this specific claim needs the original study citation.", explanationAr: "بي بي سي موثوقة عموماً لكن هذا الادعاء المحدد يحتاج إلى الاستشهاد بالدراسة الأصلية.", explanationArEG: "بي بي سي مصدر موثوق عادة، بس الكلام ده بالذات محتاج نشوف الدراسة الأصلية بتاعته." },
      { itemId: "ss-02", content: "Studies show that screen time above 4 hours daily is linked to decreased attention span in young adults — attributed to anonymous TikTok", contentAr: "تشير الدراسات إلى أن وقت الشاشة الذي يزيد عن 4 ساعات يومياً مرتبط بضعف الانتباه لدى الشباب - يُنسب إلى حساب تيك توك مجهول", contentArEG: "دراسات بتقول إن القعدة قدام الشاشات أكتر من 4 ساعات في اليوم بتضعف الانتباه عند الشباب - منسوب لـ تيك توك مجهول", correctAnswer: "low_trust", explanation: "Anonymous social media posts lack editorial oversight and accountability.", explanationAr: "تفتقر منشورات وسائل التواصل الاجتماعي المجهولة إلى الإشراف التحريري والمساءلة.", explanationArEG: "بوستات السوشيال ميديا المجهولة ملهاش أي رقابة ومحدش بيتحاسب على اللي بينشره." },
      { itemId: "ss-03", content: "Studies show that screen time above 4 hours daily is linked to decreased attention span in young adults — attributed to Oxford University Research", contentAr: "تشير الدراسات إلى أن وقت الشاشة الذي يزيد عن 4 ساعات يومياً مرتبط بضعف الانتباه لدى الشباب - يُنسب إلى أبحاث جامعة أكسفورد", contentArEG: "دراسات بتقول إن القعدة قدام الشاشات أكتر من 4 ساعات في اليوم بتضعف الانتباه عند الشباب - منسوب لأبحاث جامعة أكسفورد", correctAnswer: "moderate_trust", explanation: "University attribution adds credibility but the specific study should still be verified via DOI or publication.", explanationAr: "تضيف نسبة البحث إلى جامعة مصداقية لكن لا يزال يتعين التحقق من الدراسة المحددة عبر DOI أو المنشور.", explanationArEG: "اسم جامعة كبيرة بيدي مصداقية، بس برضه لازم نتأكد من الدراسة نفسها ونشوف منشورة فين." },
      { itemId: "ss-04", content: "Studies show that screen time above 4 hours daily is linked to decreased attention span in young adults — attributed to a partisan political blog", contentAr: "تشير الدراسات إلى أن وقت الشاشة الذي يزيد عن 4 ساعات يومياً مرتبط بضعف الانتباه لدى الشباب - يُنسب إلى مدونة سياسية حزبية", contentArEG: "دراسات بتقول إن القعدة قدام الشاشات أكتر من 4 ساعات في اليوم بتضعف الانتباه عند الشباب - منسوب لمدونة سياسية متحيزة", correctAnswer: "low_trust", explanation: "Partisan sources may cherry-pick or misrepresent research to support a narrative.", explanationAr: "قد تنتقي المصادر الحزبية الأبحاث أو تحرفها لدعم سردية معينة.", explanationArEG: "المصادر المتحيزة ممكن تنقي حتت من الأبحاث أو تفهمها غلط عشان تخدم فكرتها." },
    ],
  },
  // §17.6 DeepReal Baseline — Archive Awareness Test
  {
    id: "bl-dr-03", mvp: "deepreal", taskType: "archive_awareness",
    title: "Archive Awareness Test",
    titleAr: "اختبار الوعي بالأرشيف",
    titleArEG: "اختبار المعرفة بأدوات الأرشيف",
    description: "Measures verification literacy beyond detection — does the user know about historical verification tools?",
    descriptionAr: "يقيس محو الأمية في التحقق بما يتجاوز الاكتشاف - هل يعرف المستخدم عن أدوات التحقق التاريخية؟",
    descriptionArEG: "بيشوفك عارف إزاي تتأكد من الأخبار بأدوات قديمة ولا لأ، مش بس بتكشف الكدب العادي.",
    instruction: "For each scenario, choose the best verification action.",
    instructionAr: "لكل سيناريو، اختر أفضل إجراء للتحقق.",
    instructionArEG: "لكل موقف، اختار أحسن طريقة عشان تتأكد من المعلومة.",
    items: [
      { itemId: "aa-01", content: "A website claims a politician said something controversial last year, but you can't find the quote on the current page.", contentAr: "موقع يزعم أن سياسياً قال شيئاً مثيراً للجدل العام الماضي، لكن لا يمكنك العثور على الاقتباس في الصفحة الحالية.", contentArEG: "موقع بيقول إن فيه سياسي قال كلام مثير للجدل السنة اللي فاتت، بس دورت في الصفحة ومش لاقي الكلام ده.", correctAnswer: "check_wayback", explanation: "The Internet Archive's Wayback Machine can reveal whether the page was modified or the quote existed previously.", explanationAr: "يمكن لأرشيف الإنترنت 'واي باك ماشين' الكشف عما إذا كانت الصفحة قد عُدلت أو ما إذا كان الاقتباس موجوداً سابقاً.", explanationArEG: "موقع أرشيف الإنترنت Wayback Machine ممكن يوريك لو الصفحة دي اتعدلت أو لو الكلام ده كان مكتوب قبل كدة." },
      { itemId: "aa-02", content: "A viral screenshot shows a deleted tweet from a celebrity.", contentAr: "لقطة شاشة منتشرة تظهر تغريدة محذوفة لأحد المشاهير.", contentArEG: "سكرين شوت منتشرة لتويتة محذوفة لواحد مشهور.", correctAnswer: "check_archive_and_metadata", explanation: "Screenshots can be fabricated. Check archive services and image metadata before accepting.", explanationAr: "يمكن فبركة لقطات الشاشة. تحقق من خدمات الأرشيف والبيانات الوصفية للصور قبل القبول.", explanationArEG: "الاسكرين شوت ممكن تتفبرك بسهولة. لازم تتأكد من الأرشيف وتفاصيل الصورة قبل ما تصدقها." },
    ],
  },
  // §17.6 Mental Health Baseline — Myth vs Education Test
  {
    id: "bl-mh-01", mvp: "mental-health", taskType: "myth_education",
    title: "Myth vs. Education Test",
    titleAr: "اختبار الخرافة مقابل التعليم",
    titleArEG: "اختبار التفرقة بين الخرافة والعلم",
    description: "Measures stigma plus evidence response by comparing myth statements with evidence-based explanations.",
    descriptionAr: "يقيس الوصمة بالإضافة إلى الاستجابة للأدلة من خلال مقارنة عبارات الخرافة مع التفسيرات القائمة على الأدلة.",
    descriptionArEG: "بيشوف استجابتك للأدلة ووعيك بوصمة المرض النفسي عن طريق مقارنة كلام الخرافات بالكلام العلمي.",
    instruction: "For each pair, identify which statement is the myth and which is evidence-based.",
    instructionAr: "لكل زوج، حدد أي عبارة هي خرافة وأيها قائمة على الأدلة.",
    instructionArEG: "في كل جملتين، اختار مين فيهم اللي خرافة ومين اللي كلام علمي صح.",
    items: [
      { itemId: "me-01", content: "Statement A: 'Depression is a sign of weakness — strong people don't get depressed.' vs Statement B: 'Depression is a medical condition involving changes in brain chemistry, genetics, and environmental factors.'", contentAr: "العبارة أ: 'الاكتئاب علامة على الضعف - الأشخاص الأقوياء لا يصابون بالاكتئاب.' مقابل العبارة ب: 'الاكتئاب هو حالة طبية تنطوي على تغيرات في كيمياء الدماغ وعوامل وراثية وبيئية.'", contentArEG: "جملة أ: 'الاكتئاب ده ضعف شخصية - الناس القوية مبيجيهاش اكتئاب.' قصاد جملة ب: 'الاكتئاب ده مرض طبي بيدخل فيه تغيرات في كيميا المخ والوراثة والبيئة.'", correctAnswer: "a_is_myth", explanation: "Statement A reflects a common stigmatizing myth. Depression affects people regardless of personal strength (WHO, 2023).", explanationAr: "تعكس العبارة أ خرافة شائعة وموصمة. يصيب الاكتئاب الناس بغض النظر عن قوتهم الشخصية (منظمة الصحة العالمية، 2023).", explanationArEG: "جملة أ دي خرافة مشهورة بتظلم المريض. الاكتئاب ممكن ييجي لأي حد مهما كان قوي." },
      { itemId: "me-02", content: "Statement A: 'Medication for mental health conditions is like medication for any other health condition.' vs Statement B: 'Taking psychiatric medication means you're crazy and will be dependent forever.'", contentAr: "العبارة أ: 'أدوية الحالات النفسية مثلها مثل الأدوية لأي حالة صحية أخرى.' مقابل العبارة ب: 'أخذ الأدوية النفسية يعني أنك مجنون وستظل معتمداً عليها للأبد.'", contentArEG: "جملة أ: 'أدوية الأمراض النفسية زيها زي أدوية أي مرض تاني.' قصاد جملة ب: 'لو أخدت دواء نفسي يبقى أنت مجنون وهتفضل تعتمد عليه طول عمرك.'", correctAnswer: "b_is_myth", explanation: "Statement B perpetuates stigma. Psychiatric medications are evidence-based treatments, and many are used temporarily.", explanationAr: "تكرس العبارة ب الوصمة. الأدوية النفسية هي علاجات قائمة على الأدلة، وكثير منها يستخدم بشكل مؤقت.", explanationArEG: "جملة ب بتزود وصمة المرض النفسي. الأدوية النفسية دي علاجات علمية، وكثير منها بيتاخد لفترة مؤقتة بس." },
    ],
  },
  // §17.6 Mental Health Baseline — Diagnosis Boundary Test
  {
    id: "bl-mh-02", mvp: "mental-health", taskType: "diagnosis_boundary",
    title: "Diagnosis Boundary Test",
    titleAr: "اختبار حدود التشخيص",
    titleArEG: "اختبار حدود التشخيص بينك وبين الدكتور",
    description: "Tests whether users can distinguish between education, self-report, symptom description, and diagnosis.",
    descriptionAr: "يختبر ما إذا كان بإمكان المستخدمين التمييز بين التعليم والإبلاغ الذاتي ووصف الأعراض والتشخيص.",
    descriptionArEG: "بيشوف هل بتقدر تفرق بين إنك توصف اللي حاسس بيه وبين إنك تشخص نفسك بنفسك.",
    instruction: "Classify each statement as: Educational information, Personal self-report, Symptom description, or Diagnostic claim.",
    instructionAr: "صنف كل عبارة كالتالي: معلومات تعليمية، إبلاغ ذاتي، وصف للأعراض، أو ادعاء تشخيصي.",
    instructionArEG: "صنف كل جملة لـ: معلومات عامة، وصف شعور شخصي، كلام عن الأعراض، أو تشخيص طبي بجد.",
    items: [
      { itemId: "db-01", content: "'I've been feeling really anxious about exams lately.'", contentAr: "'أشعر بقلق شديد بشأن الامتحانات مؤخراً.'", contentArEG: "'أنا حاسس بقلق شديد أوي بسبب الامتحانات اليومين دول.'", correctAnswer: "self_report", explanation: "This is a personal feeling statement, not a diagnosis or clinical claim.", explanationAr: "هذا بيان شعور شخصي، وليس تشخيصاً أو ادعاءً سريرياً.", explanationArEG: "ده مجرد وصف لإحساس شخصي، مش تشخيص طبي ولا مرض." },
      { itemId: "db-02", content: "'You have all the symptoms of bipolar disorder based on this quiz.'", contentAr: "'لديك جميع أعراض الاضطراب ثنائي القطب بناءً على هذا الاختبار.'", contentArEG: "'أنت عندك كل أعراض الاضطراب ثنائي القطب بناءً على الاختبار ده.'", correctAnswer: "diagnostic_claim", explanation: "This crosses the boundary into diagnosis — only licensed professionals can diagnose mental health conditions.", explanationAr: "هذا يتجاوز الحدود إلى التشخيص - يمكن فقط للمتخصصين المرخصين تشخيص حالات الصحة النفسية.", explanationArEG: "ده كدة دخل في التشخيص - الدكاترة المتخصصين بس هما اللي يقدروا يشخصوا الأمراض النفسية." },
      { itemId: "db-03", content: "'Generalized anxiety disorder involves persistent, excessive worry about various areas of life.'", contentAr: "'ينطوي اضطراب القلق العام على قلق مفرط ومستمر بشأن مجالات مختلفة من الحياة.'", contentArEG: "'اضطراب القلق العام معناه إن الواحد يكون قلقان بزيادة وبشكل مستمر في حاجات كتير في حياته.'", correctAnswer: "educational", explanation: "This is educational information describing a condition without attributing it to any individual.", explanationAr: "هذه معلومات تعليمية تصف حالة دون نسبتها إلى أي فرد.", explanationArEG: "دي معلومات تعليمية بتشرح المرض من غير ما تشخص حد معين." },
    ],
  },
  // §17.6 Mental Health Baseline — Help-Seeking Route Test
  {
    id: "bl-mh-03", mvp: "mental-health", taskType: "help_seeking_route",
    title: "Help-Seeking Route Test",
    titleAr: "اختبار مسار طلب المساعدة",
    titleArEG: "اختبار إزاي تطلب المساعدة الصح",
    description: "Measures action knowledge — what would the user do after reading distressing content?",
    descriptionAr: "يقيس المعرفة الإجرائية - ماذا سيفعل المستخدم بعد قراءة محتوى مزعج؟",
    descriptionArEG: "بيشوف هتعمل إيه وتتصرف إزاي لما تقرا أو تشوف حاجة تتعبك نفسياً.",
    instruction: "After reading each scenario, choose the safest next action.",
    instructionAr: "بعد قراءة كل سيناريو، اختر الإجراء التالي الأكثر أماناً.",
    instructionArEG: "بعد ما تقرا كل موقف، اختار التصرف الأسلم اللي المفروض تعمله.",
    items: [
      { itemId: "hs-01", content: "A friend posts on social media: 'I can't take this anymore, everything is pointless.'", contentAr: "صديق ينشر على وسائل التواصل الاجتماعي: 'لا أستطيع تحمل هذا بعد الآن، كل شيء بلا جدوى.'", contentArEG: "واحد صاحبك كاتب على السوشيال ميديا: 'أنا مبقتش قادر أستحمل، مفيش فايدة من أي حاجة.'", correctAnswer: "reach_out_directly_and_share_crisis_line", explanation: "Direct, caring contact plus sharing crisis resources (16328) is the recommended response (WHO, 2021).", explanationAr: "الاتصال المباشر والمهتم بالإضافة إلى مشاركة موارد الأزمات (16328) هو الاستجابة الموصى بها (منظمة الصحة العالمية، 2021).", explanationArEG: "الصح إنك تتواصل معاه فوراً باهتمام وتديله رقم خط المساعدة النفسية (16328)." },
      { itemId: "hs-02", content: "You read an article that describes symptoms similar to what you've been experiencing.", contentAr: "قرأت مقالاً يصف أعراضاً مشابهة لما كنت تعاني منه.", contentArEG: "قريت مقال بيوصف أعراض شبه اللي أنت حاسس بيها بالظبط.", correctAnswer: "consult_professional_not_self_diagnose", explanation: "Reading about symptoms is educational, but self-diagnosis is unreliable. A professional assessment is the safe next step.", explanationAr: "القراءة عن الأعراض أمر تعليمي، لكن التشخيص الذاتي غير موثوق. التقييم المهني هو الخطوة التالية الآمنة.", explanationArEG: "القراية عن الأعراض بتفهمك، بس تشخيصك لنفسك غلط. الصح إنك تروح لدكتور متخصص يقيم حالتك." },
    ],
  },
  // §17.6 Religion Hub Baseline — Coping Boundary Test
  {
    id: "bl-rh-01", mvp: "religion-hub", taskType: "coping_boundary",
    title: "Coping Boundary Test",
    titleAr: "اختبار حدود التكيف",
    titleArEG: "اختبار التكيف الديني",
    description: "Tests ability to distinguish positive coping, negative coping, and spiritual bypass.",
    descriptionAr: "يختبر القدرة على التمييز بين التكيف الإيجابي والتكيف السلبي والتجاوز الروحي.",
    descriptionArEG: "بيشوف هل بتعرف تفرق بين إن الدين بيساعدك صح وإنك بتستخدمه غلط عشان تهرب من مشاكلك.",
    instruction: "Classify each statement as: Positive coping, Negative coping, or Spiritual bypassing.",
    instructionAr: "صنف كل عبارة كالتالي: تكيف إيجابي، تكيف سلبي، أو تجاوز روحي.",
    instructionArEG: "صنف كل جملة لـ: تكيف ديني صح، تكيف سلبي يضر، أو هروب بالدين (تجاوز روحي).",
    items: [
      { itemId: "cb-01", content: "'I find comfort in prayer during difficult times, and I also talk to my family about my problems.'", contentAr: "'أجد الراحة في الصلاة خلال الأوقات الصعبة، وأتحدث أيضاً مع عائلتي عن مشاكلي.'", contentArEG: "'أنا برتاح في الصلاة وقت الزنقة، وبرضه بتكلم مع أهلي في مشاكلي.'", correctAnswer: "positive_coping", explanation: "Combining spiritual practice with social support reflects healthy positive coping (Pargament, 2011).", explanationAr: "يُعد الجمع بين الممارسة الروحية والدعم الاجتماعي تكيفاً إيجابياً صحياً (بارجامينت، 2011).", explanationArEG: "إنك تجمع بين العبادة وإنك تتكلم مع أهلك وتاخد دعمهم ده تكيف إيجابي وصحي جداً." },
      { itemId: "cb-02", content: "'God is punishing me for my sins. I deserve this suffering.'", contentAr: "'الله يعاقبني على ذنوبي. أنا أستحق هذه المعاناة.'", contentArEG: "'ربنا بيعاقبني على ذنوبي. أنا أستاهل العذاب ده.'", correctAnswer: "negative_coping", explanation: "Interpreting suffering as divine punishment reflects negative religious coping, which correlates with poorer adjustment.", explanationAr: "تفسير المعاناة على أنها عقاب إلهي يعكس تكيفاً دينياً سلبياً، والذي يرتبط بضعف التوافق النفسي.", explanationArEG: "تفسيرك لأي وجع إنه عقاب من ربنا ده اسمه تكيف ديني سلبي، وده بيخلي حالتك النفسية تسوء أكتر." },
      { itemId: "cb-03", content: "'I don't need therapy — I just need to pray more. Everything happens for a reason.'", contentAr: "'لا أحتاج إلى علاج - أحتاج فقط إلى الصلاة أكثر. كل شيء يحدث لسبب.'", contentArEG: "'أنا مش محتاج دكتور نفساني - أنا محتاج أصلي أكتر بس. كل حاجة بتحصل لسبب.'", correctAnswer: "spiritual_bypass", explanation: "Using spiritual reasoning to avoid addressing psychological needs is spiritual bypassing (Masters, 2010).", explanationAr: "استخدام التفكير الروحي لتجنب تلبية الاحتياجات النفسية هو تجاوز روحي (ماسترز، 2010).", explanationArEG: "إنك تستخدم الدين عشان تهرب من علاج مشاكلك النفسية ده اسمه تجاوز روحي، وده بيعطل العلاج." },
    ],
  },
  // §17.6 Religion Hub Baseline — Moderation vs Extremity Test
  {
    id: "bl-rh-02", mvp: "religion-hub", taskType: "moderation_extremity",
    title: "Moderation vs. Extremity Test",
    titleAr: "اختبار الاعتدال مقابل التطرف",
    titleArEG: "اختبار الوسطية والبعد عن التطرف",
    description: "Measures source discernment within religious content.",
    descriptionAr: "يقيس التمييز بين المصادر ضمن المحتوى الديني.",
    descriptionArEG: "بيشوفك بتعرف تميز المصادر الموثوقة من المصادر المتطرفة في الدين ولا لأ.",
    instruction: "For each guidance source, rate its safety for personal wellbeing advice (Safest / Moderate / Risky / Unsafe).",
    instructionAr: "لكل مصدر توجيه، قيم مدى سلامته كنصيحة للرفاهية الشخصية (الأكثر أماناً / معتدل / محفوف بالمخاطر / غير آمن).",
    instructionArEG: "قيم كل مصدر من دول من حيث أمانه على نفسيتك (أمان جداً / نص نص / خطر / مش أمان خالص).",
    items: [
      { itemId: "mx-01", content: "An official statement from Al-Azhar on the importance of mental health awareness", contentAr: "بيان رسمي من الأزهر الشريف حول أهمية التوعية بالصحة النفسية", contentArEG: "بيان رسمي من الأزهر عن أهمية التوعية بالصحة النفسية", correctAnswer: "safest", explanation: "Al-Azhar is an official moderate Egyptian religious authority with institutional accountability.", explanationAr: "الأزهر سلطة دينية مصرية معتدلة ورسمية تتمتع بمساءلة مؤسسية.", explanationArEG: "الأزهر مؤسسة دينية رسمية ومعتدلة وكلامهم عليه رقابة ومرجعية." },
      { itemId: "mx-02", content: "An anonymous YouTube clip of an emotional preacher warning about divine punishment", contentAr: "مقطع يوتيوب مجهول لواعظ عاطفي يحذر من العقاب الإلهي", contentArEG: "فيديو يوتيوب مجهول لشيخ بينفعل وبيحذر من عذاب ربنا", correctAnswer: "risky", explanation: "Anonymous, emotionally charged content without institutional backing carries risks of guilt amplification and extremist framing.", explanationAr: "يحمل المحتوى المجهول المشحون عاطفياً دون دعم مؤسسي مخاطر تضخيم الشعور بالذنب والتأطير المتطرف.", explanationArEG: "الفيديوهات المجهولة اللي بتلعب على المشاعر من غير مرجعية بتزود الإحساس بالذنب وممكن تجر لأفكار متطرفة." },
      { itemId: "mx-03", content: "A peer comment on a Facebook group saying 'just pray harder'", contentAr: "تعليق من نظير في مجموعة فيسبوك يقول 'فقط صلِّ أكثر'", contentArEG: "كومنت من حد في جروب على الفيسبوك بيقول 'صلي أكتر بس'", correctAnswer: "unsafe", explanation: "Unqualified peer advice may promote spiritual bypassing and discourage professional help-seeking.", explanationAr: "قد تعزز نصيحة الأقران غير المؤهلين التجاوز الروحي وتثبط طلب المساعدة المهنية.", explanationArEG: "نصايح الناس العادية اللي مش متخصصين ممكن تخليك تهرب بالدين من مشكلتك وتمنعك إنك تتعالج بجد." },
      { itemId: "mx-04", content: "A psychology-of-religion research article on coping strategies", contentAr: "مقال بحثي في علم نفس الدين حول استراتيجيات التكيف", contentArEG: "بحث علمي في علم نفس الدين عن طرق التعامل مع الأزمات", correctAnswer: "safest", explanation: "Peer-reviewed research provides evidence-based insights without the risk of doctrinal bias.", explanationAr: "توفر الأبحاث المراجعة من الأقران رؤى قائمة على الأدلة دون خطر التحيز العقائدي.", explanationArEG: "الأبحاث العلمية المراجعة بتديلك معلومات صح مبنية على دليل من غير أي تحيز ديني لجهة معينة." },
    ],
  },
  // §17.6 Religion Hub Baseline — Meaning vs Certainty Test
  {
    id: "bl-rh-03", mvp: "religion-hub", taskType: "meaning_certainty",
    title: "Meaning vs. Certainty Test",
    titleAr: "اختبار المعنى مقابل اليقين",
    titleArEG: "اختبار الفهم المرن قصاد الأوامر",
    description: "Tests whether users can distinguish reflection from command, and meaning from guilt.",
    descriptionAr: "يختبر ما إذا كان بإمكان المستخدمين التمييز بين التأمل والأمر، وبين المعنى والشعور بالذنب.",
    descriptionArEG: "بيشوفك بتعرف تفرق بين التأمل اللي بيريح وبين الأوامر اللي بتخنق وبتحسس بالذنب.",
    instruction: "Classify each statement as: Reflection, Coping, Theology, Command, or Guilt-induction.",
    instructionAr: "صنف كل عبارة كالتالي: تأمل، تكيف، لاهوت، أمر، أو إحداث الشعور بالذنب.",
    instructionArEG: "صنف كل جملة لـ: تأمل وتفكير، تكيف، حكم ديني، أمر حازم، أو تأنيب ضمير.",
    items: [
      { itemId: "mc-01", content: "'Perhaps this difficulty is an opportunity to grow in patience and gratitude.'", contentAr: "'ربما تكون هذه الصعوبة فرصة للنمو في الصبر والامتنان.'", contentArEG: "'يمكن الأزمة دي تكون فرصة عشان نتعلم الصبر ونحمد ربنا أكتر.'", correctAnswer: "reflection", explanation: "Open-ended reframing that invites personal meaning-making without imposing a conclusion.", explanationAr: "إعادة تأطير مفتوحة تدعو إلى صنع المعنى الشخصي دون فرض نتيجة.", explanationArEG: "دي نظرة إيجابية بتخليك تفكر في حكمة الموضوع من غير ما تفرض عليك حاجة معينة." },
      { itemId: "mc-02", content: "'You MUST accept this suffering silently or you are rejecting God's will.'", contentAr: "'يجب أن تقبل هذه المعاناة بصمت وإلا فأنت ترفض إرادة الله.'", contentArEG: "'لازم تسكت وتستحمل العذاب ده من سكات وإلا تبقى معترض على قضاء ربنا.'", correctAnswer: "command", explanation: "This is an authoritative command that shuts down healthy processing and may cause harm.", explanationAr: "هذا أمر سلطوي يغلق المعالجة الصحية وقد يسبب ضرراً.", explanationArEG: "ده أمر قاسي بيمنعك من إنك تشتكي أو تتعالج، وممكن يدمرك نفسياً." },
      { itemId: "mc-03", content: "'If you're suffering, it's because your faith is weak.'", contentAr: "'إذا كنت تعاني، فذلك لأن إيمانك ضعيف.'", contentArEG: "'طالما أنت تعبان، يبقى ده عشان إيمانك ضعيف.'", correctAnswer: "guilt_induction", explanation: "This statement uses guilt to explain suffering, which is a form of negative religious coping.", explanationAr: "تستخدم هذه العبارة الشعور بالذنب لتفسير المعاناة، وهو شكل من أشكال التكيف الديني السلبي.", explanationArEG: "الكلام ده بيستخدم الدين عشان يحسسك بالذنب وإنك السبب في وجعك، وده تكيف ديني سلبي." },
    ],
  },
];

// ═══════════════════════════════════════════════════════
// BATTERY CONFIGURATION
// ═══════════════════════════════════════════════════════

export const BATTERY_CONFIG = {
  /** Total estimated time for the full battery (§17.3) */
  totalMinutes: 30,
  sections: [
    { id: "claim_confidence", title: "Claim Confidence Rating", estimatedMinutes: 8, itemCount: CALIBRATION_CLAIMS.length },
    { id: "source_ranking", title: "Source Ranking Sprint", estimatedMinutes: 6, itemCount: SOURCE_RANKING_SCENARIOS.length },
    { id: "emotion_evidence", title: "Emotion vs. Evidence Trial", estimatedMinutes: 5, itemCount: EMOTION_EVIDENCE_PAIRS.length },
    { id: "comfort_accuracy", title: "Comfort vs. Accuracy Trial", estimatedMinutes: 5, itemCount: COMFORT_ACCURACY_PAIRS.length },
    { id: "module_baseline", title: "Module-Specific Tasks", estimatedMinutes: 6, itemCount: MODULE_BASELINE_TASKS.length },
  ],
} as const;
