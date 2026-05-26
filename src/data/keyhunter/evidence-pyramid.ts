// ════════════════════════════════════════════════════════════
// EVIDENCE PYRAMID — Dr. Ismail Methodology
// The user walks through this story and UNCONSCIOUSLY learns
// how to evaluate medical evidence. From anecdote to meta-analysis.
// بلا رحمة للباطل — كل الرحمة للناس
// ════════════════════════════════════════════════════════════

export interface EvidenceLevel {
  id: number;
  level: string;
  levelAr: string;
  strength: number; // 1-10
  color: string;
  emoji: string;
  description: string;
  descriptionAr: string;
  biasRisk: 'critical' | 'high' | 'moderate' | 'low' | 'minimal';
  commonBiases: string[];
  commonBiasesAr: string[];
  realWorldExample: string;
  realWorldExampleAr: string;
  drIsmailStory: string;
  drIsmailStoryAr: string;
  howToSpot: string[];
  howToSpotAr: string[];
  quackExample: string; // Dr. Karim Abu El-Qasr equivalent
  quackExampleAr: string;
}

export const EVIDENCE_PYRAMID: EvidenceLevel[] = [
  {
    id: 1,
    level: 'Anecdote / Testimonial',
    levelAr: 'شهادة شخصية / حكاية',
    strength: 1,
    color: '#DC2626',
    emoji: '🚨',
    description: 'Someone says "I tried it and it worked." No controls, no measurement, no comparison. This is Dr. Karim Abu El-Qasr territory — he tried herbs on his brother and got 3 million views.',
    descriptionAr: 'حد بيقول "أنا جربته ونفع". مفيش مقارنة، مفيش قياس، مفيش رقابة. ده أرض د. كريم أبو القصر — جرّب أعشاب على أخوه وحصل على 3 مليون مشاهدة.',
    biasRisk: 'critical',
    commonBiases: ['Confirmation Bias', 'Placebo Effect', 'Regression to Mean', 'Survivor Bias'],
    commonBiasesAr: ['انحياز التأكيد', 'تأثير الوهم (البلاسيبو)', 'العودة للمتوسط', 'انحياز الناجين'],
    realWorldExample: 'A YouTuber says "I gave my patients herbs and they improved" — but the dead patients don\'t post reviews.',
    realWorldExampleAr: 'يوتيوبر بيقول "أنا اديت المرضى أعشاب واتحسنوا" — بس المرضى اللي ماتوا مش هيكتبوا ريفيو.',
    drIsmailStory: 'Dr. Ismail gave ONE patient vitamin D and he improved. This is how the story STARTED — but Dr. Ismail knew this proves NOTHING on its own.',
    drIsmailStoryAr: 'د. إسماعيل ادّا مريض واحد فيتامين د واتحسن. كده القصة بدأت — بس د. إسماعيل عارف إن ده لوحده مش بيثبت حاجة.',
    howToSpot: ['"I tried it and it worked"', '"My patients improved"', '"Everyone I know says..."', 'YouTube testimonials', 'WhatsApp voice notes from relatives'],
    howToSpotAr: ['"أنا جربته ونفع"', '"المرضى بتوعي اتحسنوا"', '"كل اللي أعرفهم بيقولوا..."', 'شهادات يوتيوب', 'رسايل صوتية واتساب من الأقارب'],
    quackExample: 'Dr. Karim tried herbs on his brother Mostakawy for colic. "He improved!" 3 million views. Turned out the herbs were crushed Buscopan pills mixed in.',
    quackExampleAr: 'د. كريم جرب أعشاب على أخوه مصطكاوي للمغص. "اتحسن!" 3 مليون مشاهدة. طلع الأعشاب كانت حبوب بسكوبان مطحونة.',
  },
  {
    id: 2,
    level: 'Case Report',
    levelAr: 'تقرير حالة',
    strength: 2,
    color: '#EA580C',
    emoji: '📋',
    description: 'A doctor documents ONE interesting case properly. Better than an anecdote because it\'s written up formally, but still ONE person.',
    descriptionAr: 'دكتور بيوثّق حالة واحدة مثيرة بشكل رسمي. أحسن من الحكاية لأنها متوثقة، بس لسه حالة واحدة.',
    biasRisk: 'critical',
    commonBiases: ['Selection Bias', 'Publication Bias', 'No control group'],
    commonBiasesAr: ['انحياز الاختيار', 'انحياز النشر', 'مفيش مجموعة مقارنة'],
    realWorldExample: 'Dr. Ismail recorded his vitamin D case and presented it to colleagues. Good first step. NOT proof.',
    realWorldExampleAr: 'د. إسماعيل سجّل حالة الفيتامين د وعرضها على زملاؤه. خطوة أولى كويسة. مش دليل.',
    drIsmailStory: 'Dr. Ismail recorded the patient case and shared it with colleagues — this is proper science, but the WEAKEST type.',
    drIsmailStoryAr: 'د. إسماعيل سجّل حالة المريض وشاركها مع زملاؤه — ده علم صحيح، بس أضعف نوع.',
    howToSpot: ['"A case was reported where..."', '"In one patient..."', 'Single patient described in detail'],
    howToSpotAr: ['"تم تسجيل حالة حيث..."', '"في مريض واحد..."', 'وصف مريض واحد بالتفصيل'],
    quackExample: 'They show one "before and after" photo. One person. No context. No follow-up. No measurement.',
    quackExampleAr: 'بيوروا صورة "قبل وبعد" واحدة. شخص واحد. بدون سياق. بدون متابعة. بدون قياس.',
  },
  {
    id: 3,
    level: 'Case Series',
    levelAr: 'سلسلة حالات',
    strength: 3,
    color: '#D97706',
    emoji: '📊',
    description: 'Multiple patients with similar symptoms documented together. Shows a pattern exists, but no comparison group. Many supplement sellers rely on this level.',
    descriptionAr: 'عدة مرضى بأعراض متشابهة متوثقين مع بعض. بيوضح إن فيه نمط، بس مفيش مجموعة مقارنة. بائعي المكملات كتير بيعتمدوا على المستوى ده.',
    biasRisk: 'high',
    commonBiases: ['No control group', 'Selection Bias', 'Cannot prove causation'],
    commonBiasesAr: ['مفيش مجموعة مقارنة', 'انحياز الاختيار', 'مش بيثبت السببية'],
    realWorldExample: 'Multiple factory workers had red eyes and blue skin — this suggests a new disease might exist.',
    realWorldExampleAr: 'عمال كتير في المصنع عيونهم حمرت وجلدهم أزرق — ده بيوحي إن ممكن يكون فيه مرض جديد.',
    drIsmailStory: 'Dr. Ismail noticed MULTIPLE workers had the same symptoms — stronger than one case, but still just observation.',
    drIsmailStoryAr: 'د. إسماعيل لاحظ عمال كتير عندهم نفس الأعراض — أقوى من حالة واحدة، بس لسه مجرد ملاحظة.',
    howToSpot: ['"We observed X patients with..."', '"A series of cases showed..."', 'No randomization mentioned'],
    howToSpotAr: ['"لاحظنا X مريض بـ..."', '"سلسلة من الحالات أظهرت..."', 'مفيش ذكر للعشوائية'],
    quackExample: '"100 of my patients improved!" — Did you track the 500 who didn\'t? Did you compare to people who took nothing? No? Then this is meaningless.',
    quackExampleAr: '"100 من مرضاي اتحسنوا!" — هل تتبعت الـ 500 اللي ماتحسنوش؟ هل قارنت بناس ماخدوش حاجة؟ لأ؟ يبقى ده كلام فاضي.',
  },
  {
    id: 4,
    level: 'Cross-Sectional Survey',
    levelAr: 'دراسة مقطعية (مسحية)',
    strength: 4,
    color: '#CA8A04',
    emoji: '📸',
    description: 'A snapshot of a population at one point in time. Can show prevalence but NOT causation. Most contradictory health headlines come from these.',
    descriptionAr: 'صورة لمجموعة من الناس في لحظة واحدة. بتوضح الانتشار بس مش السبب. أغلب العناوين الصحية المتناقضة بتيجي من النوع ده.',
    biasRisk: 'high',
    commonBiases: ['Response Bias', 'Malingering', 'Social Desirability Bias', 'Cannot establish causation'],
    commonBiasesAr: ['انحياز الاستجابة', 'التمارض', 'انحياز الرغبة الاجتماعية', 'مش بيثبت السببية'],
    realWorldExample: '"Coffee causes cancer" vs "Coffee prevents cancer" — most contradictory health headlines come from survey studies.',
    realWorldExampleAr: '"القهوة بتسبب السرطان" مقابل "القهوة بتمنع السرطان" — معظم العناوين المتناقضة بتيجي من دراسات مسحية.',
    drIsmailStory: 'Dr. Ismail surveyed all factory workers: who has red eyes? Workers might lie — to get vacation, sympathy, or compensation.',
    drIsmailStoryAr: 'د. إسماعيل عمل مسح لكل عمال المصنع: مين عيونه حمرا؟ العمال ممكن يكدبوا — عشان أجازة أو تعاطف أو تعويض.',
    howToSpot: ['"A survey of X people found..."', '"Researchers asked participants..."', '"The prevalence was..."'],
    howToSpotAr: ['"مسح لـ X شخص وجد..."', '"الباحثين سألوا المشاركين..."', '"نسبة الانتشار كانت..."'],
    quackExample: '"A survey found that 80% of people who eat honey feel better." WHO answered? HOW did they measure "feel better"? Did they verify anything?',
    quackExampleAr: '"مسح وجد إن 80% من اللي بياكلوا عسل حاسين بتحسن." مين جاوب؟ ازاي قاسوا "حاسين بتحسن"؟ هل اتأكدوا من حاجة؟',
  },
  {
    id: 5,
    level: 'Case-Control Study',
    levelAr: 'دراسة حالات وشواهد',
    strength: 5,
    color: '#65A30D',
    emoji: '⚖️',
    description: 'Compare people WITH the condition to people WITHOUT it, looking backwards for causes. Fast and cheap but prone to recall bias.',
    descriptionAr: 'مقارنة ناس عندهم المرض بناس مش عندهم، والبحث في الماضي عن الأسباب. سريعة ورخيصة بس فيها انحياز التذكر.',
    biasRisk: 'moderate',
    commonBiases: ['Recall Bias', 'Information Bias', 'Selection Bias'],
    commonBiasesAr: ['انحياز التذكر', 'انحياز المعلومات', 'انحياز الاختيار'],
    realWorldExample: 'Patients with disease asked about chemical exposure — they might exaggerate because they want compensation.',
    realWorldExampleAr: 'المرضى اتسألوا عن التعرض للكيماويات — ممكن يبالغوا عشان عايزين تعويض.',
    drIsmailStory: 'Dr. Ismail divided workers into sick vs healthy and asked about exposures — but recall bias made many sick workers exaggerate.',
    drIsmailStoryAr: 'د. إسماعيل قسّم العمال لمرضى وأصحاء وسأل عن التعرض — بس انحياز التذكر خلى مرضى كتير يبالغوا.',
    howToSpot: ['"We compared cases with controls"', '"Patients were asked about past exposure"', '"Odds ratio"'],
    howToSpotAr: ['"قارنا الحالات بالشواهد"', '"المرضى اتسألوا عن التعرض السابق"', '"نسبة الأرجحية"'],
    quackExample: 'They never do case-control studies. Too much work. They jump from "my brother felt better" to "BUY MY PRODUCT."',
    quackExampleAr: 'هم عمرهم ما بيعملوا دراسات حالات وشواهد. شغل كتير. بيقفزوا من "أخويا حس بتحسن" لـ "اشتري المنتج بتاعي."',
  },
  {
    id: 6,
    level: 'Cohort Study',
    levelAr: 'دراسة أترابية (جماعية)',
    strength: 6,
    color: '#16A34A',
    emoji: '🔬',
    description: 'Follow healthy people FORWARD in time to see who gets sick. Expensive and slow but much stronger evidence.',
    descriptionAr: 'متابعة ناس أصحاء للأمام في الوقت لمعرفة مين هيمرض. غالية وبطيئة بس دليل أقوى بكتير.',
    biasRisk: 'moderate',
    commonBiases: ['Selection Bias (refusal to participate)', 'Confounding Bias', 'Loss to Follow-up'],
    commonBiasesAr: ['انحياز الاختيار (رفض المشاركة)', 'العوامل المربكة', 'فقدان المتابعة'],
    realWorldExample: 'Dr. Ismail followed healthy workers for 3 years — 64% got sick. Strong evidence, but some workers refused to join.',
    realWorldExampleAr: 'د. إسماعيل تابع عمال أصحاء لمدة 3 سنين — 64% مرضوا. دليل قوي، بس بعض العمال رفضوا يشاركوا.',
    drIsmailStory: 'Dr. Ismail followed healthy workers for 3 years. 64% developed symptoms. But selection bias: who refused and why?',
    drIsmailStoryAr: 'د. إسماعيل تابع العمال الأصحاء 3 سنين. 64% ظهرت عليهم الأعراض. بس انحياز الاختيار: مين رفض وليه؟',
    howToSpot: ['"Participants were followed for X years"', '"Prospective study"', '"Relative risk"', '"Incidence rate"'],
    howToSpotAr: ['"تمت متابعة المشاركين لمدة X سنوات"', '"دراسة استباقية"', '"الخطر النسبي"', '"معدل الحدوث"'],
    quackExample: 'Quacks NEVER follow patients for years. That would show the failures. They take the money and disappear.',
    quackExampleAr: 'الدجالين عمرهم ما بيتابعوا المرضى لسنين. ده هيظهر الفشل. بياخدوا الفلوس ويختفوا.',
  },
  {
    id: 7,
    level: 'Randomized Controlled Trial (RCT)',
    levelAr: 'تجربة معشاة مضبوطة (RCT)',
    strength: 8,
    color: '#0891B2',
    emoji: '🏆',
    description: 'The GOLD STANDARD. Random assignment, placebo control, double-blind. Neither patient nor doctor knows who gets real medicine. This is how truth is proven.',
    descriptionAr: 'المعيار الذهبي. تقسيم عشوائي، مجموعة بلاسيبو، تعمية مزدوجة. لا المريض ولا الدكتور عارف مين بياخد الدوا الحقيقي. كده بنثبت الحقيقة.',
    biasRisk: 'low',
    commonBiases: ['Attrition Bias (dropouts)', 'Hawthorne Effect', 'Funding Bias'],
    commonBiasesAr: ['انحياز الاستنزاف (اللي سابوا الدراسة)', 'تأثير هوثورن', 'انحياز التمويل'],
    realWorldExample: 'Dr. Ismail tested vitamin D with random groups, placebo pills, double-blind — and found it DOESN\'T work. That\'s science.',
    realWorldExampleAr: 'د. إسماعيل اختبر فيتامين د بمجموعات عشوائية، حبوب بلاسيبو، تعمية مزدوجة — ولقى إنه مش بيشتغل. ده العلم.',
    drIsmailStory: 'Dr. Ismail did the RCT with random assignment, placebo, double-blind — and VITAMIN D FAILED. This is honest science accepting honest results.',
    drIsmailStoryAr: 'د. إسماعيل عمل التجربة المعشاة بتقسيم عشوائي وبلاسيبو وتعمية مزدوجة — وفيتامين د فشل. ده العلم الصادق بيقبل النتيجة الصادقة.',
    howToSpot: ['"Randomized"', '"Placebo-controlled"', '"Double-blind"', '"Participants were randomly assigned"'],
    howToSpotAr: ['"عشوائية"', '"مضبوطة بالبلاسيبو"', '"تعمية مزدوجة"', '"تم تقسيم المشاركين عشوائياً"'],
    quackExample: 'Dr. Karim NEVER randomized. NEVER used placebo. NEVER blinded. Because he knows his "treatment" is crushed Panadol and Tramadol.',
    quackExampleAr: 'د. كريم عمره ما عشوأ. عمره ما استخدم بلاسيبو. عمره ما عمى. لأنه عارف إن "علاجه" بانادول وترامادول مطحون.',
  },
  {
    id: 8,
    level: 'Systematic Review / Meta-Analysis',
    levelAr: 'مراجعة منهجية / تحليل تلوي',
    strength: 10,
    color: '#7C3AED',
    emoji: '👑',
    description: 'Collecting ALL studies on a topic, analyzing them together statistically. The STRONGEST evidence. This is what the GOD-System uses to crush claims.',
    descriptionAr: 'جمع كل الدراسات عن موضوع واحد وتحليلها إحصائياً مع بعض. أقوى دليل. ده اللي نظام الحق المطلق بيستخدمه يدمر الادعاءات.',
    biasRisk: 'minimal',
    commonBiases: ['Publication Bias (negative results not published)', 'Heterogeneity between studies'],
    commonBiasesAr: ['انحياز النشر (النتائج السلبية مش بتتنشر)', 'التباين بين الدراسات'],
    realWorldExample: 'When 12,847 studies say antihypertensives work and 1 YouTuber says drink hibiscus — the 12,847 win. Period.',
    realWorldExampleAr: 'لما 12,847 دراسة بتقول أدوية الضغط بتشتغل ويوتيوبر واحد بيقول اشرب كركديه — الـ 12,847 بيكسبوا. نقطة.',
    drIsmailStory: 'Dr. Ismail\'s team collected ALL studies, analyzed them statistically, and published in a respected journal. Doctors worldwide discussed and built upon it.',
    drIsmailStoryAr: 'فريق د. إسماعيل جمع كل الدراسات وحللها إحصائياً ونشرها في مجلة محترمة. دكاترة من كل العالم ناقشوها وانتقدوها وبنوا عليها.',
    howToSpot: ['"We systematically searched..."', '"Meta-analysis of X studies"', '"Forest plot"', '"Cochrane Review"', '"Pooled effect size"'],
    howToSpotAr: ['"بحثنا بشكل منهجي..."', '"تحليل تلوي لـ X دراسة"', '"مخطط الغابة"', '"مراجعة كوكرين"', '"حجم التأثير المجمع"'],
    quackExample: 'Quacks HATE systematic reviews because they reveal the truth: most miracle cures have ZERO supporting evidence.',
    quackExampleAr: 'الدجالين بيكرهوا المراجعات المنهجية لأنها بتكشف الحقيقة: معظم "العلاجات المعجزة" مفيش عليها أي دليل.',
  },
];

// ═══════════════════════════════════════════════
// THE 5 CRITICAL CONCEPTS (from Dr. Ismail video)
// Things EVERY user must absorb unconsciously
// ═══════════════════════════════════════════════

export interface CriticalConcept {
  id: number;
  concept: string;
  conceptAr: string;
  explanation: string;
  explanationAr: string;
  drIsmailExample: string;
  drIsmailExampleAr: string;
  egyptianExample: string;
  egyptianExampleAr: string;
  negSciMarkerIds: number[];
}

export const CRITICAL_CONCEPTS: CriticalConcept[] = [
  {
    id: 1,
    concept: 'Strength of Evidence Varies WITHIN the Same Study Type',
    conceptAr: 'قوة الدليل بتختلف جوه نفس نوع الدراسة',
    explanation: 'Testing a drink on your brother and sister is NOT the same as testing it on 500 people. Same type (anecdote), vastly different strength.',
    explanationAr: 'لما تجرب مشروب على أخوك وأختك مش زي لما تجربه على 500 واحد. نفس النوع (شهادة شخصية)، قوة مختلفة تماماً.',
    drIsmailExample: 'N=1 (one patient) vs N=500,000 (half a million in antihypertensive trials)',
    drIsmailExampleAr: 'N=1 (مريض واحد) مقابل N=500,000 (نص مليون في تجارب أدوية الضغط)',
    egyptianExample: 'WhatsApp forward: "My neighbor tried it and it worked" (N=1) vs WHO recommendation based on 500,000 patients.',
    egyptianExampleAr: 'فورورد واتساب: "جارتي جربته ونفع" (N=1) مقابل توصية منظمة الصحة العالمية المبنية على 500,000 مريض.',
    negSciMarkerIds: [19],
  },
  {
    id: 2,
    concept: 'Confounders: Hidden Variables That Fool You',
    conceptAr: 'العوامل المربكة: متغيرات مخفية بتضحك عليك',
    explanation: 'Coffee drinkers got more lung cancer — but they also SMOKED. The smoking was the confounder, not the coffee.',
    explanationAr: 'شاربين القهوة جالهم سرطان رئة أكتر — بس هم كمان كانوا بيدخنوا. التدخين كان العامل المربك، مش القهوة.',
    drIsmailExample: 'Workers who refused the study — did they refuse because they\'re MORE exposed to chemicals? That\'s a confounder.',
    drIsmailExampleAr: 'العمال اللي رفضوا يشاركوا — رفضوا لأنهم متعرضين للكيماويات أكتر؟ ده عامل مربك.',
    egyptianExample: '"People who eat foul and tameya live longer" — or do they just happen to be in communities with better healthcare?',
    egyptianExampleAr: '"اللي بياكلوا فول وطعمية عايشين أكتر" — ولا هم صدفة في مجتمعات فيها رعاية صحية أحسن؟',
    negSciMarkerIds: [23, 29],
  },
  {
    id: 3,
    concept: 'Bias: The Invisible Enemy in Every Study',
    conceptAr: 'الانحياز: العدو الخفي في كل دراسة',
    explanation: 'Selection bias, recall bias, information bias, publication bias — no study is free from them. The question is: how much were they reduced?',
    explanationAr: 'انحياز الاختيار، انحياز التذكر، انحياز المعلومات، انحياز النشر — مفيش دراسة خالية منهم. السؤال: قد إيه تم تقليلهم؟',
    drIsmailExample: 'Workers claimed chemical exposure for compensation (recall bias). Dr. Karim\'s followers were fake accounts (information bias).',
    drIsmailExampleAr: 'العمال ادعوا التعرض للكيماويات عشان التعويض (انحياز التذكر). متابعين د. كريم كانوا حسابات مزيفة (انحياز المعلومات).',
    egyptianExample: 'A "famous doctor" shows only his success stories. The failures? Buried. That\'s survivorship bias + publication bias.',
    egyptianExampleAr: '"دكتور مشهور" بيوري بس قصص نجاحه. الفشل؟ مدفون. ده انحياز الناجين + انحياز النشر.',
    negSciMarkerIds: [9, 17, 21, 24],
  },
  {
    id: 4,
    concept: 'Generalizability: One Group ≠ All Humans',
    conceptAr: 'التعميم: مجموعة واحدة ≠ كل البشر',
    explanation: 'A study on overweight 50-year-old smokers CANNOT be generalized to all people of all ages.',
    explanationAr: 'دراسة على مدخنين في الخمسينات زيادة وزن مينفعش تتعمم على كل الناس في كل الأعمار.',
    drIsmailExample: 'Factory workers exposed to specific chemicals — results apply to THEM, not to all workers everywhere.',
    drIsmailExampleAr: 'عمال مصنع متعرضين لكيماويات محددة — النتائج تنطبق عليهم هم، مش على كل العمال في كل مكان.',
    egyptianExample: '"This herb cured diabetes in 10 people in Aswan" — Does it work for Type 1? For children? For pregnant women? You don\'t know.',
    egyptianExampleAr: '"العشب ده شفى السكر في 10 ناس في أسوان" — بيشتغل للنوع الأول؟ للأطفال؟ للحوامل؟ مش عارف.',
    negSciMarkerIds: [15, 48, 51],
  },
  {
    id: 5,
    concept: 'Correlation ≠ Causation',
    conceptAr: 'الارتباط ≠ السببية',
    explanation: 'Just because two things appear together doesn\'t mean one caused the other. Ambulances at accidents don\'t CAUSE accidents.',
    explanationAr: 'لمجرد إن حاجتين بيظهروا مع بعض مش معناه إن واحدة سببت التانية. سيارات الإسعاف في الحوادث مش بتسبب الحوادث.',
    drIsmailExample: 'Workers exposed to chemicals AND got sick — but was it the chemicals, or the dust, or the heat, or their diet?',
    drIsmailExampleAr: 'العمال اتعرضوا لكيماويات ومرضوا — بس هل الكيماويات هي السبب، ولا التراب، ولا الحرارة، ولا أكلهم؟',
    egyptianExample: '"The dollar went up AND I got sick — the economy is killing us!" The dollar didn\'t cause your flu. Correlation is not causation.',
    egyptianExampleAr: '"الدولار طلع وأنا تعبت — الاقتصاد بيقتلنا!" الدولار مسببش البرد بتاعك. الارتباط مش سببية.',
    negSciMarkerIds: [29, 39, 47],
  },
];

// ═══════════════════════════════════════════════
// SCORING FUNCTION
// Used by GOD-System Layer 4 to score claims
// ═══════════════════════════════════════════════

export interface ClaimCharacteristics {
  hasRCT: boolean;
  hasSystematicReview: boolean;
  hasCohortStudy: boolean;
  hasCaseControl: boolean;
  hasCrossSectional: boolean;
  hasCaseSeries: boolean;
  hasCaseReport: boolean;
  isAnecdotal: boolean;
  sampleSize: number | null;
  isDoubleBlind: boolean;
  hasPlaceboControl: boolean;
  peerReviewed: boolean;
  replicatedResults: boolean;
}

export interface EvidenceScore {
  level: EvidenceLevel;
  score: number;
  explanation: string;
  explanationAr: string;
  drIsmailLesson: string;
  drIsmailLessonAr: string;
}

export function scoreClaimEvidence(c: ClaimCharacteristics): EvidenceScore {
  if (c.hasSystematicReview && c.peerReviewed) {
    return {
      level: EVIDENCE_PYRAMID[7],
      score: c.replicatedResults ? 10 : 9,
      explanation: 'This claim is backed by systematic review — the STRONGEST level of evidence.',
      explanationAr: 'الادعاء ده مدعوم بمراجعة منهجية — أقوى مستوى من الأدلة.',
      drIsmailLesson: 'This is where Dr. Ismail\'s team ended up — collecting ALL evidence and analyzing it together.',
      drIsmailLessonAr: 'ده اللي فريق د. إسماعيل وصلوله — جمع كل الأدلة وتحليلها مع بعض.',
    };
  }
  if (c.hasRCT && c.isDoubleBlind && c.hasPlaceboControl) {
    const sizeScore = c.sampleSize ? (c.sampleSize > 1000 ? 8 : c.sampleSize > 100 ? 7 : 6) : 7;
    return {
      level: EVIDENCE_PYRAMID[6],
      score: sizeScore,
      explanation: `Backed by RCT (N=${c.sampleSize || 'unknown'}). Strong evidence — check if replicated.`,
      explanationAr: `مدعوم بتجربة معشاة (N=${c.sampleSize || 'غير معروف'}). دليل قوي — اتأكد إنه اتكرر.`,
      drIsmailLesson: 'Dr. Ismail did exactly this — random, placebo, double-blind. Even when the result wasn\'t what he hoped.',
      drIsmailLessonAr: 'د. إسماعيل عمل بالظبط كده — عشوائي، بلاسيبو، تعمية مزدوجة. حتى لما النتيجة مكنتش اللي هو عايزها.',
    };
  }
  if (c.hasCohortStudy) {
    return {
      level: EVIDENCE_PYRAMID[5],
      score: c.sampleSize && c.sampleSize > 1000 ? 6 : 5,
      explanation: 'Cohort study — follows people over time. Watch for confounders.',
      explanationAr: 'دراسة أترابية — بتتابع ناس على مدار الوقت. خللي بالك من العوامل المربكة.',
      drIsmailLesson: 'Dr. Ismail followed workers 3 years. Good design, but people who refused to join = selection bias.',
      drIsmailLessonAr: 'د. إسماعيل تابع العمال 3 سنين. تصميم كويس، بس اللي رفضوا يشاركوا = انحياز اختيار.',
    };
  }
  if (c.hasCaseControl) {
    return {
      level: EVIDENCE_PYRAMID[4],
      score: 5,
      explanation: 'Case-control study — compares sick vs healthy. Watch for recall bias.',
      explanationAr: 'دراسة حالات وشواهد — بتقارن المرضى بالأصحاء. خللي بالك من انحياز التذكر.',
      drIsmailLesson: 'Workers exaggerated their chemical exposure hoping for compensation. Recall bias at work.',
      drIsmailLessonAr: 'العمال بالغوا في التعرض للكيماويات طمعاً في التعويض. انحياز التذكر بيشتغل.',
    };
  }
  if (c.hasCrossSectional) {
    return {
      level: EVIDENCE_PYRAMID[3],
      score: 4,
      explanation: 'Cross-sectional survey — a snapshot. Cannot prove causation.',
      explanationAr: 'دراسة مقطعية — صورة في لحظة. مش بتثبت السببية.',
      drIsmailLesson: 'Most shocking news headlines come from surveys. "Coffee causes cancer!" — probably a cross-sectional study.',
      drIsmailLessonAr: 'معظم العناوين الصادمة بتيجي من مسوحات. "القهوة بتسبب السرطان!" — غالباً دراسة مقطعية.',
    };
  }
  if (c.hasCaseSeries) {
    return {
      level: EVIDENCE_PYRAMID[2],
      score: 3,
      explanation: 'Case series — multiple cases. Pattern, but no proof.',
      explanationAr: 'سلسلة حالات — حالات متعددة. نمط، بس مش دليل.',
      drIsmailLesson: 'Multiple workers sick = worth investigating. But supplement sellers use case series to sell you products.',
      drIsmailLessonAr: 'عمال كتير مرضوا = يستاهل تحقيق. بس بائعي المكملات بيستخدموا سلاسل الحالات يبيعولك منتجات.',
    };
  }
  if (c.hasCaseReport) {
    return {
      level: EVIDENCE_PYRAMID[1],
      score: 2,
      explanation: 'Case report — ONE patient. The weakest formal medical evidence.',
      explanationAr: 'تقرير حالة — مريض واحد. أضعف شكل من الأدلة الطبية الرسمية.',
      drIsmailLesson: 'Dr. Ismail started here. Recorded one case. But he KNEW this was just the beginning, not the proof.',
      drIsmailLessonAr: 'د. إسماعيل بدأ من هنا. سجل حالة واحدة. بس كان عارف إن ده مجرد البداية، مش الدليل.',
    };
  }
  // Default: anecdotal
  return {
    level: EVIDENCE_PYRAMID[0],
    score: 1,
    explanation: 'ANECDOTE — "someone said it worked." Dr. Karim Abu El-Qasr territory. Zero scientific value.',
    explanationAr: 'حكاية — "حد قال نفع." أرض د. كريم أبو القصر. قيمة علمية = صفر.',
    drIsmailLesson: 'This is where Dr. Karim Abu El-Qasr lives. Herbs mixed with crushed Buscopan. Police arrested him.',
    drIsmailLessonAr: 'ده المكان اللي د. كريم أبو القصر عايش فيه. أعشاب مخلوطة ببسكوبان مطحون. البوليس قبض عليه.',
  };
}

// Find where a claim sits on the pyramid based on PubMed results
export function assessPubMedResults(results: {
  totalStudies: number;
  systematicReviews: number;
  rcts: number;
  cohortStudies: number;
  caseReports: number;
}): {
  claimStrength: EvidenceScore;
  comparison: string;
  comparisonAr: string;
  ratio: string;
  ratioAr: string;
} {
  const r = results;

  const characteristics: ClaimCharacteristics = {
    hasSystematicReview: r.systematicReviews > 0,
    hasRCT: r.rcts > 0,
    hasCohortStudy: r.cohortStudies > 0,
    hasCaseControl: false,
    hasCrossSectional: false,
    hasCaseSeries: false,
    hasCaseReport: r.caseReports > 0,
    isAnecdotal: r.totalStudies === 0,
    sampleSize: null,
    isDoubleBlind: r.rcts > 0,
    hasPlaceboControl: r.rcts > 0,
    peerReviewed: r.totalStudies > 0,
    replicatedResults: r.totalStudies > 5,
  };

  const score = scoreClaimEvidence(characteristics);

  return {
    claimStrength: score,
    comparison: `Found ${r.totalStudies} studies: ${r.systematicReviews} systematic reviews, ${r.rcts} RCTs, ${r.cohortStudies} cohort studies, ${r.caseReports} case reports.`,
    comparisonAr: `لقينا ${r.totalStudies} دراسة: ${r.systematicReviews} مراجعة منهجية، ${r.rcts} تجربة معشاة، ${r.cohortStudies} دراسة أترابية، ${r.caseReports} تقرير حالة.`,
    ratio: r.totalStudies === 0
      ? 'ZERO peer-reviewed studies support this claim.'
      : `${r.totalStudies} studies found. Evidence level: ${score.level.level}.`,
    ratioAr: r.totalStudies === 0
      ? 'صفر دراسات محكّمة بتدعم الادعاء ده.'
      : `${r.totalStudies} دراسة موجودة. مستوى الدليل: ${score.level.levelAr}.`,
  };
}
