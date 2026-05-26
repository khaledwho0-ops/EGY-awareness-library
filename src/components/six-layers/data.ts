/* ═══════════════════════════════════════════════════════════════
 * DATA.TS — The 6-Layer Deception Data Store
 * All case studies, colors, counters, and layer metadata
 * ═══════════════════════════════════════════════════════════════ */

export interface CaseStudy {
  id: number;
  title: string;
  titleAr: string;
  year: string;
  domain: string;
  domainAr: string;
  damage: string;
  damageAr: string;
  layerAnalysis?: string;
  egyptianSpecific?: boolean;
  illustrationEn?: string;
  illustrationAr?: string;
}

export interface LayerCounter {
  target: number;
  suffix: string;
  label: string;
  labelEn: string;
}

export interface LayerData {
  number: number;
  numberAr: string;
  name: string;
  nameAr: string;
  definition: string;
  definitionAr: string;
  accentHSL: string;
  accentRGB: string;
  bgHSL: string;
  glassTint: string;
  counters: LayerCounter[];
  caseStudies: CaseStudy[];
}

/* ── Color System ──────────────────────────────────────────── */

export const LAYER_COLORS = {
  hero: {
    accent: '#f0c030',
    bg: '#0a0b10',
  },
  1: {
    accent: '#e63939',
    accentRGB: '230, 57, 57',
    bg: '#1a0c0c',
    glassTint: 'rgba(255, 50, 50, 0.05)',
  },
  2: {
    accent: '#e6b400',
    accentRGB: '230, 180, 0',
    bg: '#171410',
    glassTint: 'rgba(255, 200, 0, 0.05)',
  },
  3: {
    accent: '#8c3ce6',
    accentRGB: '140, 60, 230',
    bg: '#0e0714',
    glassTint: 'rgba(120, 50, 255, 0.05)',
  },
  4: {
    accent: '#19aaff',
    accentRGB: '25, 170, 255',
    bg: '#050a11',
    glassTint: 'rgba(0, 150, 255, 0.05)',
  },
  5: {
    accent: '#00ff50',
    accentRGB: '0, 255, 80',
    bg: '#06100a',
    glassTint: 'rgba(0, 255, 80, 0.05)',
  },
  6: {
    accent: '#ff00ff',
    accentRGB: '255, 0, 255',
    bg: '#050005',
    glassTint: 'rgba(255, 0, 255, 0.05)',
  },
  defense: {
    accent: '#f0c030',
    accentRGB: '230, 200, 50',
    bg: '#0f1018',
    glassTint: 'rgba(255, 220, 50, 0.05)',
  },
} as const;

/* ── Layer Data ────────────────────────────────────────────── */

export const LAYERS: LayerData[] = [
  // ─── LAYER 1: الكذب المطلق ───────────────────────────────
  {
    number: 1,
    numberAr: '١',
    name: 'THE ABSOLUTE FABRICATION',
    nameAr: 'الكذب المطلق',
    definition: 'Raw, unfiltered deception. No source, no reality. Generated out of thin air by a known liar, hostile state, or AI. Preys on confirmation bias.',
    definitionAr: 'خداع صريح بدون مصدر ولا واقع. يُصنع من العدم بواسطة كاذب معروف أو دولة معادية أو ذكاء اصطناعي. يستغل التحيز التأكيدي.',
    accentHSL: '#e63939',
    accentRGB: '230, 57, 57',
    bgHSL: '#1a0c0c',
    glassTint: 'rgba(255, 50, 50, 0.05)',
    counters: [
      { target: 183, suffix: '+', label: 'حالة تزوير علمي موثقة', labelEn: 'Documented scientific frauds' },
      { target: 10000, suffix: '+', label: 'ورقة علمية مسحوبة', labelEn: 'Retracted papers' },
      { target: 14.5, suffix: '%', label: 'نسبة الأخبار الكاذبة بمصر', labelEn: 'Egypt misinformation rate' },
    ],
    caseStudies: [
      { id: 1, title: 'Piltdown Man', titleAr: 'إنسان بلتداون', year: '1912', domain: 'Scientific', domainAr: 'علمي', damage: '41 years of fake science', damageAr: '٤١ سنة من العلم المزيف',
        illustrationEn: "Scientists claimed they found the 'missing link' between apes and humans. In reality, it was just a medieval human skull attached to an orangutan's jawbone. The bones were stained with chemicals and their teeth filed down to look ancient. Because scientists desperately wanted to believe they found the missing link, they accepted it without proper testing for 41 years. This is Layer 1: a physical object completely fabricated from scratch.",
        illustrationAr: "ادعى العلماء أنهم وجدوا 'الحلقة المفقودة' بين القردة والبشر. في الواقع، كانت مجرد جمجمة إنسان من العصور الوسطى متصلة بفك إنسان الغاب. تم تلوين العظام بالمواد الكيميائية وبرد الأسنان لتبدو قديمة. ولأن العلماء أرادوا بشدة تصديق هذا الاكتشاف، فقد قبلوه دون اختبارات حقيقية لمدة ٤١ عاماً. هذه هي الطبقة الأولى: شيء مادي تم تزييفه بالكامل من الصفر."
      },
      { id: 2, title: 'Wakefield MMR Fraud', titleAr: 'تزوير لقاح التوحد', year: '1998', domain: 'Medical', domainAr: 'طبي', damage: 'Measles outbreaks worldwide', damageAr: 'تفشي الحصبة عالمياً',
        illustrationEn: "A doctor named Andrew Wakefield published a study claiming the MMR vaccine causes autism. It was a complete lie. He altered patients' medical records, fabricated evidence, and was secretly paid by lawyers who wanted to sue vaccine manufacturers. The study was entirely invented out of thin air. Despite losing his medical license, this single fabricated paper birthed the modern anti-vaccine movement.",
        illustrationAr: "نشر طبيب يُدعى أندرو ويكفيلد دراسة تدعي أن لقاح الحصبة يسبب التوحد. كانت كذبة كاملة. قام بتزوير السجلات الطبية للمرضى واختلاق الأدلة، وكان يتلقى أموالاً سراً من محامين أرادوا مقاضاة شركات اللقاحات. تم اختراع الدراسة بالكامل من العدم. ورغم سحب رخصته الطبية، إلا أن هذه الورقة المزيفة وحدها هي التي ولّدت الحركة الحديثة المضادة للقاحات."
      },
      { id: 3, title: 'Diederik Stapel', titleAr: 'ديدريك ستابل', year: '2011', domain: 'Scientific', domainAr: 'علمي', damage: '58 retracted papers', damageAr: '٥٨ ورقة مسحوبة',
        illustrationEn: "A prominent psychology professor didn't just manipulate data—he made up the data entirely. When he needed a study to prove a psychological theory, he would sit at his computer and type fake numbers into spreadsheets. He published 58 fake papers in top journals without running a single real experiment. Layer 1 deception doesn't require complex labs; it just requires someone willing to type lies into a database.",
        illustrationAr: "لم يتلاعب أستاذ علم النفس البارز بالبيانات فحسب، بل اخترعها بالكامل. عندما كان يحتاج إلى دراسة لإثبات نظرية، كان يجلس أمام حاسوبه ويكتب أرقاماً وهمية في الجداول. نشر ٥٨ ورقة مزيفة في كبرى المجلات دون إجراء تجربة حقيقية واحدة. خداع الطبقة الأولى لا يتطلب مختبرات معقدة؛ بل يتطلب فقط شخصاً مستعداً لكتابة الأكاذيب."
      },
      { id: 4, title: 'Hwang Woo-suk', titleAr: 'هوانج وو سوك', year: '2005', domain: 'Scientific', domainAr: 'علمي', damage: 'Fake stem cell breakthrough', damageAr: 'اختراق خلايا جذعية مزيف',
        illustrationEn: "A scientist claimed he had successfully cloned human embryos and extracted stem cells—a holy grail in biology. It was a complete lie. He faked the photos and fabricated the DNA evidence. He became a national hero in South Korea before investigators found out the 'cloned' cells never existed. He literally created a false scientific reality from nothing.",
        illustrationAr: "ادعى عالم أنه نجح في استنساخ أجنة بشرية واستخراج خلايا جذعية. كانت كذبة كاملة. قام بتزوير الصور واختلاق أدلة الحمض النووي. أصبح بطلاً قومياً في كوريا الجنوبية قبل أن يكتشف المحققون أن الخلايا المستنسخة لم تكن موجودة أبداً. لقد خلق واقعاً علمياً مزيفاً من اللاشيء."
      },
      { id: 6, title: 'Protocols of Zion', titleAr: 'بروتوكولات حكماء صهيون', year: '1903', domain: 'Political', domainAr: 'سياسي', damage: 'Fuel for the Holocaust', damageAr: 'وقود للمحرقة',
        illustrationEn: "A completely forged document written by the Russian secret police. They took an old French political satire that had nothing to do with Jews, and simply swapped the words to make it look like a secret Jewish plan for world domination. This completely fabricated text, created out of thin air, became the core propaganda piece that fueled the Holocaust and is still shared as 'truth' today.",
        illustrationAr: "وثيقة مزورة بالكامل كتبتها الشرطة السرية الروسية. أخذوا نصاً سياسياً فرنسياً ساخراً لا علاقة له باليهود، وبدلوا الكلمات ليبدو وكأنه خطة سرية للسيطرة على العالم. هذا النص المُختلق من العدم أصبح أداة الدعاية الأساسية التي غذت المحرقة، ولا يزال يُنشر كـ'حقيقة' حتى اليوم."
      },
      { id: 7, title: 'Electronic Flies', titleAr: 'الذباب الإلكتروني', year: '2011', domain: 'Political', domainAr: 'سياسي/مصري', damage: 'Manufactured consensus', damageAr: 'إجماع مُصنَّع', egyptianSpecific: true,
        illustrationEn: "A modern technique where thousands of fake social media accounts (bots) are programmed to tweet the exact same phrase at the same time. If 10,000 fake accounts praise a policy, Twitter's algorithm thinks it's a 'trending topic'. The public sees the trend and assumes it's popular opinion. The consensus isn't real; it's a mirage created by software to hack human perception.",
        illustrationAr: "تقنية حديثة تُبرمج فيها آلاف الحسابات المزيفة على منصات التواصل لنشر نفس العبارة في نفس الوقت. إذا أشاد ١٠ آلاف حساب وهمي بقرار ما، تظن الخوارزمية أنه 'تريند'. يرى الجمهور التريند فيظن أنه رأي الأغلبية. هذا الإجماع ليس حقيقياً؛ بل هو سراب صنعه برنامج لاختراق إدراكنا."
      },
      { id: 9, title: 'Fabricated Hadith', titleAr: 'الأحاديث الموضوعة', year: 'Centuries', domain: 'Religious', domainAr: 'ديني', damage: 'Corrupted Islamic scholarship', damageAr: 'تشويه العلم الإسلامي',
        illustrationEn: "Statements completely falsely attributed to the Prophet Muhammad. Unlike weak Hadiths (which have flawed transmission chains), fabricated Hadiths were intentionally invented by people wanting to support a political ruler, sell a product, or promote a specific ideology. They created holy texts from nothing, exploiting people's religious devotion to spread a lie.",
        illustrationAr: "أقوال نُسبت زوراً إلى النبي محمد (ص). على عكس الأحاديث الضعيفة (التي بها خلل في السند)، الأحاديث الموضوعة اُختلقت عمداً لدعم حاكم سياسي، أو ترويج سلعة، أو نشر أيديولوجية. لقد صنعوا نصوصاً مقدسة من العدم، مستغلين العاطفة الدينية للناس لنشر الكذب."
      },
      { id: 40, title: 'Antibiotic OTC Crisis', titleAr: 'كارثة المضادات الحيوية', year: '2021', domain: 'Medical', domainAr: 'مصري/طبي', damage: '53.9% self-medicate', damageAr: '٥٣.٩٪ تداوي ذاتي', egyptianSpecific: true,
        illustrationEn: "Many pharmacies in Egypt sell and recommend antibiotics for common viral colds. This is a medical lie. Antibiotics kill bacteria, not viruses. Recommending them for a cold is a complete fabrication of their medical use. This zero-basis practice has led to over half the population self-medicating, creating deadly antibiotic-resistant superbugs.",
        illustrationAr: "العديد من الصيدليات في مصر تبيع وتوصي بالمضادات الحيوية لنزلات البرد الفيروسية. هذه كذبة طبية. المضادات تقتل البكتيريا، لا الفيروسات. التوصية بها للبرد هو تزييف كامل لاستخدامها الطبي. هذه الممارسة التي لا أساس لها أدت إلى تداوي أكثر من نصف الشعب ذاتياً، مما يخلق بكتيريا قاتلة مقاومة للعلاج."
      },
      { id: 42, title: 'TikTok Health Hakeems', titleAr: 'حكيم التيكتوك', year: '2024', domain: 'Medical', domainAr: 'مصري/طبي', damage: '82M users exposed', damageAr: '٨٢ مليون مستخدم', egyptianSpecific: true,
        illustrationEn: "People with no medical degrees wear lab coats, buy ring lights, and call themselves 'Doctors' on TikTok. They invent medical advice out of thin air—like claiming ginger cures kidney failure—simply to gain followers and sell unverified supplements. They fabricate their credentials and their science entirely, risking the lives of millions of viewers.",
        illustrationAr: "أشخاص بلا شهادات طبية يرتدون المعطف الأبيض ويسمون أنفسهم 'دكاترة' على تيكتوك. يخترعون نصائح طبية من العدم—مثل الادعاء بأن الزنجبيل يعالج الفشل الكلوي—فقط لجمع المتابعين وبيع المكملات. إنهم يزيفون مؤهلاتهم وعلمهم بالكامل، مما يعرض حياة ملايين المشاهدين للخطر."
      },
      { id: 48, title: 'Egypt Found a Cure', titleAr: 'مصر اكتشفت العلاج', year: '2020', domain: 'COVID', domainAr: 'مصري/كوفيد', damage: 'Eroded all public trust', damageAr: 'تآكل الثقة العامة', egyptianSpecific: true,
        illustrationEn: "During the peak of the COVID-19 pandemic, prominent public figures and media outlets announced that Egyptian scientists had discovered a definitive cure for the virus. This was a complete fabrication generated to boost national morale. The cure did not exist, no peer-reviewed data was provided, and the false hope eroded public trust in real medical institutions when reality hit.",
        illustrationAr: "خلال ذروة جائحة كورونا، أعلنت شخصيات عامة ووسائل إعلام أن علماء مصريين اكتشفوا علاجاً حاسماً للفيروس. كان هذا اختلاقاً كاملاً لرفع الروح المعنوية. العلاج لم يكن موجوداً، ولم تُنشر أي بيانات علمية. هذا الأمل الكاذب دمر ثقة الجمهور في المؤسسات الطبية الحقيقية عندما اصطدموا بالواقع."
      },
      { id: 55, title: 'Fake Antibiotic Deaths', titleAr: 'وفيات أدوية مغشوشة', year: '2022', domain: 'Pharma', domainAr: 'مصري/دوائي', damage: 'Children died', damageAr: 'وفاة أطفال', egyptianSpecific: true,
        illustrationEn: "Criminals manufactured vials that looked exactly like a famous antibiotic (Ceftriaxone), but filled them with cheap, dangerous powder that had zero medical value. Pharmacies sold them unknowingly. When sick children received these injections, their bodies went into anaphylactic shock and they died. This is the ultimate physical manifestation of a Layer 1 lie—a totally fake object.",
        illustrationAr: "قام مجرمون بتصنيع عبوات تبدو تماماً كمضاد حيوي شهير (سيفترىاكسون)، لكنهم ملؤوها بمسحوق رخيص وخطير لا قيمة طبية له. باعتها الصيدليات دون علم. عندما حُقن الأطفال المرضى بها، أصيبت أجسادهم بصدمة تحسسية ماتوا على إثرها. هذا هو التجسيد المادي المطلق لكذبة الطبقة الأولى—شيء مزيف بالكامل."
      },
      { id: 60, title: 'HoggPool Crypto Scam', titleAr: 'نصب هوج بول', year: '2023', domain: 'Economic', domainAr: 'مصري/اقتصادي', damage: '$620K stolen', damageAr: '٦٢٠ ألف دولار', egyptianSpecific: true,
        illustrationEn: "An app promised Egyptians huge daily profits if they rented 'cloud mining machines' for cryptocurrency. The machines didn't exist. The crypto mining didn't exist. The entire platform was a Ponzi scheme built out of thin air. They used fabricated numbers on a screen to steal millions of dollars from thousands of victims before vanishing.",
        illustrationAr: "تطبيق وعد المصريين بأرباح يومية ضخمة إذا قاموا بتأجير 'آلات تعدين سحابي' للعملات الرقمية. الآلات لم تكن موجودة. التعدين لم يكن موجوداً. المنصة بأكملها كانت مخطط بونزي هرمي بُني من العدم. استخدموا أرقاماً وهمية على الشاشة لسرقة ملايين الدولارات من آلاف الضحايا قبل أن يختفوا."
      },
      { id: 10, title: 'AI Legal Hallucinations', titleAr: 'هلوسة الذكاء الاصطناعي', year: '2023', domain: 'AI', domainAr: 'تقني', damage: 'Fake citations in courts', damageAr: 'اقتباسات مزيفة في المحاكم',
        illustrationEn: "Lawyers used ChatGPT to write legal briefs. The AI confidently generated legal arguments, citing specific past court cases, complete with dates, judges, and quotes. But the AI had 'hallucinated'—it completely invented the cases. The lawyers didn't verify them, submitted them to a real judge, and were fined. AI doesn't just spread lies; it algorithmically generates them from scratch.",
        illustrationAr: "استخدم محامون الذكاء الاصطناعي لكتابة مذكرات قانونية. ابتكر الذكاء الاصطناعي حججاً بثقة، مستشهداً بقضايا سابقة محددة، مع التواريخ والقضاة. لكنه 'هلوس'—لقد اخترع القضايا بالكامل. لم يتحقق المحامون منها، وقدموها لقاضٍ، وتم تغريمهم. الذكاء الاصطناعي لا ينشر الأكاذيب فحسب؛ بل يخلقها خوارزمياً من الصفر."
      },
      { id: 11, title: 'Deepfake Election Audio', titleAr: 'تزييف صوتي انتخابي', year: '2024', domain: 'AI', domainAr: 'سياسي/ذكاء', damage: 'Election interference', damageAr: 'تدخل في الانتخابات',
        illustrationEn: "Just days before an election, an incredibly realistic audio clip was circulated online, sounding exactly like a political candidate making highly offensive remarks. It was entirely synthesized using AI voice cloning technology. The candidate never said those words, but millions heard the audio and believed it, showing how easily reality itself can be synthesized to manipulate democracy.",
        illustrationAr: "قبل أيام من الانتخابات، انتشر مقطع صوتي واقعي بشكل لا يصدق، يبدو تماماً كمرشح سياسي يدلي بتصريحات مسيئة للغاية. المقطع تم تصنيعه بالكامل باستخدام تقنية استنساخ الصوت. المرشح لم يقل تلك الكلمات أبداً، لكن الملايين سمعوا المقطع وصدقوه، مما يوضح مدى سهولة تصنيع الواقع للتلاعب بالديمقراطية."
      },
      {
        id: 101,
        title: "Operation INFEKTION",
        titleAr: "عملية العدوى",
        year: "1980s",
        domain: "Biological Disinformation",
        domainAr: "تضليل بيولوجي",
        damage: "Global Health Paranoia",
        damageAr: "جنون الارتياب الصحي العالمي",
        illustrationEn: "A deeply horrific KGB disinformation campaign where they completely fabricated the lie that the US government invented HIV/AIDS in a Fort Detrick laboratory as a biological weapon. They planted the completely fake story in an obscure Indian newspaper. Then, they systematically cited that fake article globally until millions of people worldwide believed it as absolute truth. They created a lethal global conspiracy out of thin air, delaying actual medical trust in infected communities.",
        illustrationAr: "حملة تضليل مروعة للغاية من الكي جي بي حيث لفقوا كذبة كاملة مفادها أن الحكومة الأمريكية اخترعت فيروس نقص المناعة البشرية / الإيدز في مختبر فورت ديتريك كسلاح بيولوجي. زرعوا القصة المزيفة بالكامل في صحيفة هندية غامضة. ثم استشهدوا بشكل منهجي بهذا المقال المزيف على مستوى العالم حتى صدقه ملايين الأشخاص في جميع أنحاء العالم كحقيقة مطلقة. لقد خلقوا مؤامرة عالمية قاتلة من العدم، مما أدى إلى تأخير الثقة الطبية الفعلية في المجتمعات المصابة."
      },
      {
        id: 102,
        title: "The Nayirah Testimony",
        titleAr: "شهادة نيرة",
        year: "1990",
        domain: "War Justification",
        domainAr: "تبرير الحرب",
        damage: "The Gulf War",
        damageAr: "حرب الخليج",
        illustrationEn: "A 15-year-old girl named Nayirah testified before the US Congress, weeping as she described Iraqi soldiers pulling Kuwaiti babies out of incubators and leaving them to die. The testimony aired globally. It was a complete fabrication, orchestrated entirely by a massive American PR firm (Hill & Knowlton) to legally justify the US entering the Gulf War. The girl was the Kuwaiti Ambassador's daughter, and the incubator babies never existed.",
        illustrationAr: "أدلت فتاة تبلغ من العمر ١٥ عاماً تُدعى نيرة بشهادتها أمام الكونغرس الأمريكي، وهي تبكي وتصف كيف أخرج الجنود العراقيون الأطفال الكويتيين من الحاضنات وتركوهم ليموتوا. بُثت الشهادة عالمياً. كان هذا تلفيقاً كاملاً، دبّرته شركة علاقات عامة أمريكية ضخمة (هيل ونولتون) بالكامل لتبرير دخول الولايات المتحدة حرب الخليج قانونياً. كانت الفتاة ابنة السفير الكويتي، وأطفال الحاضنات لم يكن لهم وجود أبداً."
      },
      {
        id: 103,
        title: "Phantom Time Hypothesis",
        titleAr: "فرضية الوقت الشبح",
        year: "1991 (Theory)",
        domain: "Historical Fabrication",
        domainAr: "تلفيق تاريخي",
        damage: "Erased Centuries",
        damageAr: "قرون ممحاة",
        illustrationEn: "A terrifying, OSINT-debated theory suggesting that the Holy Roman Emperor Otto III and Pope Sylvester II completely fabricated the Anno Domini calendar system. The theory posits they inserted 297 fake years into history (forging documents and architecture) simply to ensure they reigned during the special year 1000 AD. While historians debate it, its underlying terror is very real: humanity blindly trusts historical records that were written and verified by absolute dictators centuries ago.",
        illustrationAr: "نظرية مرعبة تمت مناقشتها في أبحاث المصادر المفتوحة تشير إلى أن الإمبراطور الروماني المقدس أوتو الثالث والبابا سيلفستر الثاني قاما باختلاق نظام التقويم الميلادي بالكامل. تفترض النظرية أنهم أدخلوا ٢٩٧ عاماً مزيفاً في التاريخ (من خلال تزوير الوثائق والهندسة المعمارية) ببساطة لضمان حكمهم خلال العام المميز ١٠٠٠ ميلادي. بينما يجادل المؤرخون في ذلك، فإن الرعب الكامن وراءها حقيقي جداً: البشر يثقون ثقة عمياء في السجلات التاريخية التي كتبها وتحقق منها دكتاتوريون مطلقون قبل قرون."
      },
      {
        id: 104,
        title: "Deepfake 'Proof of Life'",
        titleAr: "إثبات الحياة المزيف",
        year: "Ongoing",
        domain: "Synthetic Reality",
        domainAr: "الواقع المُصنع",
        damage: "Covering Up Executions",
        damageAr: "التستر على الإعدامات",
        illustrationEn: "OSINT investigations have revealed that authoritarian regimes now use fully synthesized AI avatars on state television to show that political dissidents (who have been secretly executed or tortured) are 'still alive and well, enjoying a vacation'. The government generates a complete fabrication of reality, broadcasting a synthetic ghost to the victim's own family to hide state-sponsored murder.",
        illustrationAr: "كشفت تحقيقات المصادر المفتوحة أن الأنظمة الاستبدادية تستخدم الآن شخصيات اصطناعية مركبة بالكامل (Deepfake) على التلفزيون الحكومي لإظهار أن المعارضين السياسيين (الذين تم إعدامهم أو تعذيبهم سراً) 'لا يزالون على قيد الحياة وبصحة جيدة، ويستمتعون بإجازة'. تولد الحكومة تلفيقاً كاملاً للواقع، وتبث شبحاً اصطناعياً لعائلة الضحية نفسها لإخفاء القتل برعاية الدولة."
      },
      {
        id: 105,
        title: "The Ghost City Assets",
        titleAr: "أصول مدن الأشباح",
        year: "2020s",
        domain: "Economic Fabrication",
        domainAr: "تلفيق اقتصادي",
        damage: "Trillion Dollar Illusions",
        damageAr: "أوهام بتريليون دولار",
        illustrationEn: "Massive global investment funds sell billions in real estate for sprawling, futuristic 'smart cities' that do not physically exist. Investors are shown hyper-realistic AI-rendered videos of bustling streets, towering skyscrapers, and functioning economies. But independent satellite imagery reveals completely empty, barren deserts. The entire economic asset, heavily traded on global markets, is a digital fabrication generated out of thin air.",
        illustrationAr: "تبيع صناديق الاستثمار العالمية الضخمة عقارات بمليارات الدولارات لـ 'مدن ذكية' مستقبلية مترامية الأطراف لا وجود لها فعلياً. يُعرض على المستثمرين مقاطع فيديو واقعية للغاية تم إنشاؤها بواسطة الذكاء الاصطناعي لشوارع مزدحمة وناطحات سحاب شاهقة واقتصادات عاملة. لكن صور الأقمار الصناعية المستقلة تكشف عن صحارى قاحلة وفارغة تماماً. الأصل الاقتصادي بأكمله، والذي يتم تداوله بكثافة في الأسواق العالمية، هو تلفيق رقمي تم إنشاؤه من العدم."
      },
    ],
  },

  // ─── LAYER 2: العدسة المنحازة ──────────────────────────────
  {
    number: 2,
    numberAr: '٢',
    name: 'THE BIASED LENS',
    nameAr: 'العدسة المنحازة',
    definition: 'The core event is real and verifiable, but information is heavily filtered. Selective omission, cherry-picking, loaded language. The most dangerous layer because it passes fact-checks.',
    definitionAr: 'الحدث الأساسي حقيقي وقابل للتحقق، لكن المعلومات مُرشَّحة بشدة. حذف انتقائي، انتقاء الكرز، لغة محملة. أخطر طبقة لأنها تجتاز فحص الحقائق.',
    accentHSL: '#e6b400',
    accentRGB: '230, 180, 0',
    bgHSL: '#171410',
    glassTint: 'rgba(255, 200, 0, 0.05)',
    counters: [
      { target: 3.6, suffix: 'B$', label: 'إنفاق ضغط الوقود الأحفوري', labelEn: 'Fossil fuel lobbying spend' },
      { target: 50, suffix: '%', label: 'من التجارب الدوائية لا تُنشر', labelEn: 'Drug trials unpublished' },
      { target: 6, suffix: '×', label: 'أسرع انتشاراً من الحقيقة', labelEn: 'Faster spread than truth' },
    ],
    caseStudies: [
      { id: 20, title: 'Tobacco Industry Playbook', titleAr: 'استراتيجية صناعة التبغ', year: '1950s–90s', domain: 'Scientific', domainAr: 'علمي', damage: '"Doubt is our product"', damageAr: '"الشك هو منتجنا"',
        illustrationEn: "Tobacco companies knew smoking caused cancer, but they couldn't just lie (Layer 1). Instead, they funded real, verified scientific studies on OTHER causes of cancer—like genetics or pollution. They published accurate science, but used it to distract the public from cigarettes. They didn't fabricate the science; they just selectively funded the science that benefited them to create a 'biased lens'.",
        illustrationAr: "كانت شركات التبغ تعلم أن التدخين يسبب السرطان، لكن لم يكن بإمكانها الكذب ببساطة (الطبقة ١). بدلاً من ذلك، قاموا بتمويل دراسات علمية حقيقية وموثقة حول أسباب أخرى للسرطان—مثل الوراثة أو التلوث. لقد نشروا علماً دقيقاً، لكنهم استخدموه لإلهاء الجمهور عن السجائر. لم يزيفوا العلم؛ بل قاموا بتمويل العلم الذي يفيدهم فقط لخلق 'عدسة منحازة'."
      },
      { id: 21, title: 'Sugar Industry Bribery', titleAr: 'رشوة صناعة السكر', year: '1967', domain: 'Scientific', domainAr: 'علمي', damage: 'Blamed fat for sugar\'s damage', damageAr: 'ألقوا اللوم على الدهون بدل السكر',
        illustrationEn: "In the 1960s, scientists discovered that sugar causes heart disease. To protect their profits, the sugar industry paid Harvard scientists to publish a major literature review. The scientists used real data, but they intentionally highlighted the dangers of fat and minimized the dangers of sugar. Because the data was 'real', it shaped dietary guidelines for 50 years, leading to the global obesity epidemic.",
        illustrationAr: "في الستينيات، اكتشف العلماء أن السكر يسبب أمراض القلب. لحماية أرباحها، دفعت صناعة السكر لعلماء هارفارد لنشر مراجعة علمية كبرى. استخدم العلماء بيانات حقيقية، لكنهم تعمدوا تضخيم مخاطر الدهون وتقليل مخاطر السكر. ولأن البيانات كانت 'حقيقية'، فقد شكلت الإرشادات الغذائية لـ ٥٠ عاماً، مما أدى إلى وباء السمنة العالمي."
      },
      { id: 22, title: 'Al Jazeera vs Al Arabiya', titleAr: 'الجزيرة ضد العربية', year: '2003+', domain: 'Media', domainAr: 'إعلامي', damage: 'Same event, two realities', damageAr: 'حدث واحد، واقعان مختلفان',
        illustrationEn: "When covering the exact same political protest, one network places its cameras behind the police, showing protesters throwing stones (framing them as rioters). The other network places its cameras behind the protesters, showing police firing tear gas (framing them as victims). Both footages are 100% real and unedited. The deception lies entirely in where they chose to place the camera.",
        illustrationAr: "عند تغطية نفس الاحتجاج السياسي، تضع إحدى القنوات كاميراتها خلف الشرطة، وتُظهر المتظاهرين وهم يلقون الحجارة (لتأطيرهم كمشاغبين). وتضع القناة الأخرى كاميراتها خلف المتظاهرين، وتُظهر الشرطة تطلق الغاز المسيل للدموع (لتأطيرهم كضحايا). كلا المقطعين حقيقي ١٠٠٪ وبدون مونتاج. الخداع يكمن بالكامل في المكان الذي اختاروا وضع الكاميرا فيه."
      },
      { id: 23, title: 'Fossil Fuel Denial', titleAr: 'إنكار الوقود الأحفوري', year: '1977+', domain: 'Scientific', domainAr: 'علمي', damage: '$3.6B lobbying, planet at risk', damageAr: '٣.٦ مليار ضغط، الكوكب في خطر',
        illustrationEn: "Oil companies' own scientists accurately predicted global warming in the 1970s. Rather than hiding the data, they spent billions amplifying the voices of a tiny minority of scientists who disagreed. By giving 1% of scientists 50% of the media coverage, they created the illusion of a 'scientific debate' where none existed. The facts were real, but the spotlight was heavily biased.",
        illustrationAr: "توقع علماء شركات النفط بدقة الاحتباس الحراري في السبعينيات. وبدلاً من إخفاء البيانات، أنفقوا المليارات لتضخيم أصوات أقلية صغيرة جداً من العلماء المعارضين. من خلال منح ١٪ من العلماء ٥٠٪ من التغطية الإعلامية، خلقوا وهماً بوجود 'جدال علمي' بينما هو غير موجود. الحقائق كانت حقيقية، لكن تسليط الضوء كان منحازاً بشدة."
      },
      { id: 24, title: 'Pharma Publication Bias', titleAr: 'تحيز النشر الدوائي', year: 'Ongoing', domain: 'Medical', domainAr: 'طبي', damage: '50% of trials hidden', damageAr: '٥٠٪ من التجارب مخفية',
        illustrationEn: "A pharmaceutical company tests a new drug in 10 clinical trials. In 2 trials, the drug works great. In 8 trials, it fails or causes side effects. The company only publishes the 2 successful trials and hides the 8 failed ones. The 2 published trials are factually perfectly accurate, but the medical community's view of the drug is completely distorted because of the 'selective omission' of the failures.",
        illustrationAr: "تختبر شركة أدوية دواءً جديداً في ١٠ تجارب سريرية. ينجح الدواء في تجربتين، ويفشل أو يسبب أعراضاً جانبية في ٨. تنشر الشركة التجربتين الناجحتين فقط وتخفي الـ ٨ الفاشلة. التجربتان المنشورتان دقيقتان تماماً كحقائق، لكن نظرة المجتمع الطبي للدواء مشوهة بالكامل بسبب 'الحذف الانتقائي' لحالات الفشل."
      },
      { id: 41, title: '"7aga Sa7\'na" Culture', titleAr: 'ثقافة الحاجة السخنة', year: 'Ongoing', domain: 'Medical', domainAr: 'مصري/طبي', damage: 'Delays real treatment', damageAr: 'تأخير العلاج الحقيقي', egyptianSpecific: true,
        illustrationEn: "When someone in Egypt feels severe chest pain or abdominal distress, the immediate cultural response is often to drink a 'warm herbal drink' (7aga Sa7'na). While herbs do soothe minor throats (a real fact), applying this narrow lens to serious symptoms like a heart attack delays life-saving emergency care. It's a true remedy, but lethally misapplied due to a biased cultural lens.",
        illustrationAr: "عندما يشعر شخص في مصر بألم شديد في الصدر أو البطن، غالباً ما تكون الاستجابة الثقافية الفورية هي شرب 'مشروب عشبي دافئ' (حاجة سخنة). وفي حين أن الأعشاب تلطف الحلق فعلاً (حقيقة)، فإن تطبيق هذه العدسة الضيقة على أعراض خطيرة مثل النوبة القلبية يؤخر الرعاية الطارئة المنقذة للحياة. إنه علاج حقيقي، لكنه يُطبق بشكل مميت بسبب عدسة ثقافية منحازة."
      },
      { id: 50, title: 'WhatsApp Herbal COVID', titleAr: 'بروتوكولات واتساب العشبية', year: '2020', domain: 'COVID', domainAr: 'مصري/كوفيد', damage: 'Steam burns, delayed care', damageAr: 'حروق بخار، تأخير علاج', egyptianSpecific: true,
        illustrationEn: "During COVID, lists of 'immunity-boosting' foods like garlic, ginger, and cloves went viral on WhatsApp. While these foods do contain healthy vitamins (the real fact), the biased lens framed them as a replacement for actual medical treatment or oxygen therapy. This dangerous framing led patients to stay home inhaling boiling steam—sometimes causing severe facial burns—instead of going to the hospital.",
        illustrationAr: "خلال كورونا، انتشرت قوائم أطعمة 'لرفع المناعة' كالثوم والزنجبيل والقرنفل على واتساب. ورغم أن هذه الأطعمة تحتوي فعلاً على فيتامينات (حقيقة)، إلا أن العدسة المنحازة أطرتها كبديل للعلاج الطبي أو الأكسجين. أدى هذا التأطير الخطير لبقاء المرضى في المنازل لاستنشاق البخار المغلي—مما سبب حروقاً شديدة بالوجه أحياناً—بدلاً من الذهاب للمستشفى."
      },
      { id: 52, title: 'Battle of Camel — Framing', titleAr: 'موقعة الجمل — التأطير', year: '2011', domain: 'Political', domainAr: 'مصري/سياسي', damage: '"Citizens" vs "thugs"', damageAr: '"مواطنين" أم "بلطجية"', egyptianSpecific: true,
        illustrationEn: "During the infamous 2011 'Battle of the Camel' in Tahrir Square, state media broadcasted live footage of the event. The footage was real. However, the news anchors continuously framed the attackers on horses and camels as 'honorable citizens protecting the state' and the peaceful protesters as 'foreign-funded thugs'. They didn't alter the video; they simply changed the lens through which the audience interpreted the real events.",
        illustrationAr: "خلال 'موقعة الجمل' الشهيرة عام ٢٠١١ في ميدان التحرير، بثت وسائل الإعلام الحكومية لقطات حية للحدث. اللقطات كانت حقيقية. لكن المذيعين قاموا بتأطير المهاجمين على الخيول والجمال باستمرار كـ'مواطنين شرفاء يحمون الدولة' والمتظاهرين السلميين كـ'بلطجية ممولين من الخارج'. لم يغيروا الفيديو؛ بل غيروا العدسة التي يفسر من خلالها الجمهور الأحداث الحقيقية."
      },
      { id: 54, title: 'June 30 Crowd-Size War', titleAr: 'حرب أعداد ٣٠ يونيو', year: '2013', domain: 'Political', domainAr: 'مصري/سياسي', damage: 'Numbers became weapons', damageAr: 'الأرقام أصبحت أسلحة', egyptianSpecific: true,
        illustrationEn: "In 2013, massive protests erupted across Egypt. The exact same aerial footage of the crowds was used by different political factions. One side used zoomed-out shots to claim '30 million people' were in the streets, creating an illusion of total national consensus. The other side used zoomed-in shots of empty side streets to claim the protests were a 'minority illusion'. Both used real photos, but framed them to manipulate the perceived scale.",
        illustrationAr: "في عام ٢٠١٣، اندلعت احتجاجات ضخمة في مصر. استخدمت فصائل سياسية مختلفة نفس اللقطات الجوية للحشود. استخدم أحد الأطراف لقطات واسعة للادعاء بوجود '٣٠ مليون شخص' في الشوارع، لخلق وهم بإجماع وطني كامل. واستخدم الطرف الآخر لقطات مقربة لشوارع جانبية فارغة للادعاء بأن الاحتجاجات 'وهم أقلية'. كلاهما استخدم صوراً حقيقية، لكنهما أطراها للتلاعب بحجم الحدث."
      },
      { id: 57, title: 'EGP Float Misinformation', titleAr: 'تعويم الجنيه — التضليل', year: '2024', domain: 'Economic', domainAr: 'مصري/اقتصادي', damage: 'Panic preceded reality', damageAr: 'الذعر سبق الواقع', egyptianSpecific: true,
        illustrationEn: "Before the official currency devaluation in 2024, parallel market prices were skyrocketing. Influencers and black-market traders selectively highlighted the absolute highest, unverified exchange rates happening in isolated transactions, presenting them as the 'new normal'. The trades were real, but selecting only the highest outliers created a biased lens that fueled national panic and artificially drove the price up further.",
        illustrationAr: "قبل التعويم الرسمي للعملة في ٢٠٢٤، كانت أسعار السوق الموازية ترتفع بشدة. قام المؤثرون وتجار السوق السوداء بتسليط الضوء بشكل انتقائي على أعلى أسعار الصرف غير المؤكدة التي تحدث في صفقات معزولة، وقدموها كـ'الوضع الطبيعي الجديد'. كانت الصفقات حقيقية، لكن اختيار أعلى الحالات الشاذة فقط خلق عدسة منحازة أججت الذعر الوطني ورفعت السعر بشكل مصطنع."
      },
      { id: 58, title: 'Ras El-Hekma Dual Narratives', titleAr: 'رأس الحكمة — روايتان', year: '2024', domain: 'Economic', domainAr: 'مصري/اقتصادي', damage: 'Both sides omit truth', damageAr: 'كلا الطرفين يحذف الحقيقة', egyptianSpecific: true,
        illustrationEn: "When Egypt signed a massive investment deal for Ras El-Hekma, two distinct biased lenses emerged. State media framed it purely as a historic economic victory, completely omitting any discussion of foreign debt pressures or sovereignty. Opposition media framed it purely as 'selling the nation's land', omitting the massive influx of desperately needed foreign currency. Both sides used the exact same real contract, but aggressively cherry-picked the details.",
        illustrationAr: "عندما وقعت مصر صفقة استثمار ضخمة في رأس الحكمة، ظهرت عدستان منحازتنان بوضوح. أطرها الإعلام الحكومي كلياً كانتصار اقتصادي تاريخي، وحذف تماماً أي نقاش حول ضغوط الديون الخارجية أو السيادة. وأطرتها وسائل إعلام المعارضة كلياً كـ'بيع لأراضي الوطن'، وحذفت التدفق الهائل للعملة الأجنبية المطلوبة بشدة. كلا الطرفين استخدم نفس العقد الحقيقي، لكنهما انتقيا التفاصيل بعدوانية."
      },
      {
        id: 201,
        title: "Search Engine Manipulation Effect",
        titleAr: "تأثير التلاعب بمحركات البحث",
        year: "2015+",
        domain: "Algorithmic Censorship",
        domainAr: "رقابة خوارزمية",
        damage: "Hacked Elections",
        damageAr: "انتخابات مخترقة",
        illustrationEn: "OSINT researchers have proven that companies like Google can swing the voting preferences of undecided voters by up to 20% simply by altering the ranking of real news articles. They do not invent fake news (Layer 1); they just place negative news about a specific candidate on Page 3 of the search results, ensuring nobody ever sees it. It is a perfectly biased lens that bypasses all fact-checkers because the results are 'technically true', just aggressively filtered.",
        illustrationAr: "أثبت باحثو المصادر المفتوحة أن شركات مثل جوجل يمكنها تغيير التفضيلات التصويتية للناخبين المترددين بنسبة تصل إلى ٢٠٪ ببساطة عن طريق تغيير ترتيب المقالات الإخبارية الحقيقية. إنهم لا يخترعون أخباراً مزيفة (الطبقة ١)؛ بل يضعون الأخبار السلبية حول مرشح معين في الصفحة الثالثة من نتائج البحث، لضمان عدم رؤية أحد لها. إنها عدسة منحازة تماماً تتجاوز جميع مدققي الحقائق لأن النتائج 'صحيحة تقنياً'، لكنها مفلترة بقوة."
      },
      {
        id: 202,
        title: "Pentagon's Hollywood Liaison",
        titleAr: "مكتب اتصال البنتاغون بهوليوود",
        year: "1940s+",
        domain: "Cultural Engineering",
        domainAr: "هندسة ثقافية",
        damage: "Militarized Pop Culture",
        damageAr: "ثقافة شعبية معسكرة",
        illustrationEn: "A documented reality where the US Department of Defense officially reviews, edits, and alters scripts for major Hollywood blockbusters (like Marvel movies and Top Gun). They provide expensive military hardware for filming, but *only* if the script portrays the military through a heavily biased, heroic lens. They quietly rewrite global pop culture, removing any critique of the military-industrial complex without the audience ever knowing they are watching state-sponsored PR.",
        illustrationAr: "حقيقة موثقة حيث تقوم وزارة الدفاع الأمريكية رسمياً بمراجعة وتعديل النصوص السينمائية لأكبر أفلام هوليوود (مثل أفلام مارفل وتوب غان). إنهم يوفرون معدات عسكرية باهظة الثمن للتصوير، ولكن *فقط* إذا صور النص الجيش من خلال عدسة بطولية منحازة بشدة. إنهم يعيدون كتابة الثقافة الشعبية العالمية بهدوء، ويزيلون أي نقد للمجمع الصناعي العسكري دون أن يعرف الجمهور أبداً أنهم يشاهدون علاقات عامة برعاية الدولة."
      },
      {
        id: 203,
        title: "Embedded Journalism in Iraq",
        titleAr: "الصحافة المدمجة في العراق",
        year: "2003",
        domain: "Media Control",
        domainAr: "سيطرة إعلامية",
        damage: "The Filtered War",
        damageAr: "الحرب المفلترة",
        illustrationEn: "During the 2003 invasion of Iraq, the military allowed journalists to be 'embedded' with front-line troops. The journalists reported 100% accurate facts of what they saw. However, by restricting their movement entirely to the perspective of the invading soldiers, the resulting global media coverage completely filtered out the massive civilian casualties. The truth was told, but through a perfectly controlled, entirely one-sided lens.",
        illustrationAr: "خلال غزو العراق عام ٢٠٠٣، سمح الجيش للصحفيين بـ 'الاندماج' مع قوات الخطوط الأمامية. أبلغ الصحفيون حقائق دقيقة ١٠٠٪ عما رأوه. ومع ذلك، من خلال تقييد حركتهم بالكامل من منظور الجنود الغزاة، قامت التغطية الإعلامية العالمية الناتجة بتصفية الخسائر الهائلة في صفوف المدنيين تماماً. قيلت الحقيقة، ولكن من خلال عدسة محكومة تماماً وأحادية الجانب كلياً."
      },
      {
        id: 204,
        title: "Astroturfed 'Grassroots'",
        titleAr: "الحركات 'الشعبية' المزيفة",
        year: "Ongoing",
        domain: "Manufactured Consensus",
        domainAr: "إجماع مُصنع",
        damage: "Fake Public Outrage",
        damageAr: "غضب عام مزيف",
        illustrationEn: "Massive PR firms frequently create fake 'grassroots' citizen groups (astroturfing) to protest environmental or healthcare regulations. They hire real people, hold real protests, and use real economic data. But they completely hide the fact that the entire movement was funded, scripted, and organized by corporate billionaires. You are watching a real protest, but viewed through a manufactured lens designed to protect elite monopolies.",
        illustrationAr: "تنشئ شركات العلاقات العامة الضخمة بشكل متكرر مجموعات مواطنين 'شعبية' مزيفة للاحتجاج على اللوائح البيئية أو الصحية. إنهم يوظفون أشخاصاً حقيقيين، وينظمون احتجاجات حقيقية، ويستخدمون بيانات اقتصادية حقيقية. لكنهم يخفون تماماً حقيقة أن الحركة بأكملها تم تمويلها وكتابتها وتنظيمها من قبل مليارديرات الشركات. أنت تشاهد احتجاجاً حقيقياً، لكن يُرى من خلال عدسة مُصنعة تهدف إلى حماية احتكارات النخبة."
      },
      {
        id: 205,
        title: "The Sugar Research Scandal",
        titleAr: "فضيحة أبحاث السكر",
        year: "1965",
        domain: "Corporate Science",
        domainAr: "علم الشركات",
        damage: "Global Obesity Epidemic",
        damageAr: "وباء السمنة العالمي",
        illustrationEn: "The sugar industry secretly paid Harvard scientists to publish a massive literature review on heart disease. The scientists used real data, but deliberately shifted the entire blame onto cholesterol and saturated fat, while minimizing the real dangers of sugar. Because the data was 'real' and from Harvard, it shaped global dietary guidelines for 50 years, directly causing the modern obesity epidemic through a purely biased scientific lens.",
        illustrationAr: "دفعت صناعة السكر سراً لعلماء في جامعة هارفارد لنشر مراجعة أدبية ضخمة حول أمراض القلب. استخدم العلماء بيانات حقيقية، لكنهم ألقوا اللوم بالكامل عمداً على الكوليسترول والدهون المشبعة، مع تقليل المخاطر الحقيقية للسكر. ولأن البيانات كانت 'حقيقية' ومن هارفارد، فقد شكلت الإرشادات الغذائية العالمية لمدة ٥٠ عاماً، مما تسبب بشكل مباشر في وباء السمنة الحديث من خلال عدسة علمية منحازة بحتة."
      },
    ],
  },

  // ─── LAYER 3: اقتطاع السياق ──────────────────────────────
  {
    number: 3,
    numberAr: '٣',
    name: 'DECONTEXTUALIZATION',
    nameAr: 'اقتطاع السياق',
    definition: 'Source is credible, quote is accurate, data is real — but surgically removed from context. Fact-checkers must admit "yes, that was said" while the meaning is completely inverted.',
    definitionAr: 'المصدر موثوق، الاقتباس دقيق، البيانات حقيقية — لكنها مقتطعة جراحياً من سياقها. يُجبر مدققو الحقائق على الاعتراف "نعم، قيل هذا" بينما المعنى مقلوب تماماً.',
    accentHSL: '#8c3ce6',
    accentRGB: '140, 60, 230',
    bgHSL: '#0e0714',
    glassTint: 'rgba(120, 50, 255, 0.05)',
    counters: [
      { target: 6, suffix: '×', label: 'أسرع انتشاراً للمحتوى المقتطع', labelEn: 'Faster spread of decontextualized content' },
    ],
    caseStudies: [
      { id: 30, title: 'Quran 2:191 Stripped', titleAr: 'آية البقرة ١٩١ مجتزأة', year: '7th C+', domain: 'Religious', domainAr: 'ديني/إسلامي', damage: 'Islamophobia fuel & extremist recruiting', damageAr: 'وقود للإسلاموفوبيا والتطرف',
        illustrationEn: "Anti-Islam propagandists often quote the Quranic verse 'Kill them wherever you find them' to claim the religion promotes random violence. The quote is 100% real. However, they intentionally crop out the very next sentence: 'But if they cease, then there is to be no aggression.' By removing the context (that this was a specific rule of engagement during an active defensive war), they invert a rule about stopping violence into a command to start it.",
        illustrationAr: "غالباً ما يقتبس المروجون للإسلاموفوبيا الآية القرآنية 'واقتلوهم حيث ثقفتموهم' للادعاء بأن الدين يروج للعنف العشوائي. الاقتباس حقيقي ١٠٠٪. لكنهم يحذفون عمداً الجملة التي تليها مباشرة: 'فإن انتهوا فلا عدوان'. من خلال إزالة السياق (أن هذه كانت قاعدة اشتباك محددة أثناء حرب دفاعية نشطة)، فإنهم يعكسون قاعدة حول إيقاف العنف إلى أمر ببدئه."
      },
      { id: 31, title: 'In-Vitro Sensationalism', titleAr: 'تهويل تجارب المختبر', year: 'Ongoing', domain: 'Scientific', domainAr: 'علمي', damage: 'False cancer cure hopes', damageAr: 'آمال كاذبة بعلاج السرطان',
        illustrationEn: "A scientist discovers that a specific chemical kills cancer cells in a petri dish (in-vitro). The media immediately runs the headline: 'Cure for Cancer Found!' The data is real (the cells died), but the context is missing: bleach and fire also kill cancer cells in a petri dish. Stripping the context that this hasn't been tested in a complex human body creates false hope and drives patients toward unproven miracle cures.",
        illustrationAr: "يكتشف عالم أن مادة كيميائية معينة تقتل الخلايا السرطانية في طبق بتري (بالمختبر). تنشر وسائل الإعلام فوراً عنواناً: 'اكتشاف علاج للسرطان!'. البيانات حقيقية (الخلايا ماتت بالفعل)، لكن السياق مفقود: المُبيِّض (الكلور) والنار يقتلان أيضاً الخلايا السرطانية في طبق بتري. إن تجريد السياق بأن هذا لم يُختبر في جسم بشري معقد يخلق أملاً كاذباً ويدفع المرضى نحو علاجات سحرية غير مثبتة."
      },
      { id: 32, title: 'VAERS Data Misuse', titleAr: 'سوء استخدام بيانات VAERS', year: '2021+', domain: 'Medical', domainAr: 'طبي', damage: 'Anti-vax ammunition', damageAr: 'ذخيرة مضادة للقاح',
        illustrationEn: "The VAERS database allows anyone to report health issues after receiving a vaccine. Anti-vaxxers downloaded this public data and highlighted thousands of 'reported deaths'. The numbers were completely real. But they stripped the critical context: VAERS accepts *any* report, including car accidents that happened a week after vaccination, without proving the vaccine caused it. Using real data without context is Layer 3 deception.",
        illustrationAr: "قاعدة بيانات VAERS تسمح لأي شخص بالإبلاغ عن مشكلات صحية بعد تلقي لقاح. قام مناهضو اللقاحات بتنزيل هذه البيانات العامة وسلطوا الضوء على آلاف 'الوفيات المُبلّغ عنها'. الأرقام كانت حقيقية تماماً. لكنهم جردوا السياق الحاسم: VAERS تقبل *أي* بلاغ، بما في ذلك حوادث السيارات التي وقعت بعد أسبوع من التطعيم، دون إثبات أن اللقاح هو السبب. استخدام بيانات حقيقية بدون سياق هو خداع الطبقة الثالثة."
      },
      { id: 33, title: 'Howard Dean Scream', titleAr: 'صرخة هوارد دين', year: '2004', domain: 'Political', domainAr: 'سياسي', damage: 'Presidential campaign destroyed', damageAr: 'تدمير حملة رئاسية',
        illustrationEn: "During the 2004 US Presidential primaries, candidate Howard Dean gave an energetic speech to a massive, deafeningly loud crowd. To be heard over the noise, he screamed enthusiastically into his noise-canceling microphone. TV stations played the audio clip, but the microphone had filtered out the crowd noise. Out of context, he sounded like a completely unhinged lunatic screaming in a quiet room, which instantly destroyed his political career.",
        illustrationAr: "خلال الانتخابات التمهيدية الرئاسية الأمريكية عام ٢٠٠٤، ألقى المرشح هوارد دين خطاباً حماسياً لحشد ضخم وصاخب للغاية. لكي يُسمع وسط الضجيج، صرخ بحماس في ميكروفونه العازل للضوضاء. بثت محطات التلفزيون المقطع الصوتي، لكن الميكروفون كان قد حجب ضجيج الحشد. خارج السياق، بدا وكأنه مجنون يصرخ في غرفة هادئة، مما دمر مسيرته السياسية على الفور."
      },
      { id: 46, title: 'Schizophrenia as "Jinn"', titleAr: 'الفصام كـ"مس جن"', year: 'Ongoing', domain: 'Medical', domainAr: 'مصري/طبي-ديني', damage: 'Years of delayed treatment', damageAr: 'سنوات تأخير في العلاج', egyptianSpecific: true,
        illustrationEn: "In rural Egypt, a patient experiencing genuine auditory hallucinations and severe behavioral changes (symptoms of Schizophrenia) is often diagnosed by locals as being possessed by a 'Jinn'. The symptoms observed are 100% real. The deception lies in stripping the biological and psychiatric context (dopamine imbalance) and replacing it entirely with a supernatural context, leading to years of abusive 'exorcisms' instead of medical treatment.",
        illustrationAr: "في الريف المصري، غالباً ما يُشخِّص الأهالي مريضاً يعاني من هلاوس سمعية حقيقية وتغيرات سلوكية شديدة (أعراض الفصام) بأنه 'ممسوس بالجن'. الأعراض الملحوظة حقيقية ١٠٠٪. الخداع يكمن في تجريد السياق البيولوجي والنفسي (خلل الدوبامين) واستبداله كلياً بسياق خارق للطبيعة، مما يؤدي إلى سنوات من جلسات 'الرقية' المؤذية بدلاً من العلاج الطبي."
      },
      { id: 53, title: 'Tawfik Okasha — Faraeen', titleAr: 'توفيق عكاشة — الفراعين', year: '2011+', domain: 'Media', domainAr: 'مصري/إعلامي', damage: 'Paranoid populist broadcast', damageAr: 'بث شعبوي بجنون الارتياب', egyptianSpecific: true,
        illustrationEn: "Egyptian TV host Tawfik Okasha built a massive following by taking real global events, real historical documents, and real news clips, but completely stripping them of their geopolitical context. He would connect isolated, true facts using paranoid logic to 'prove' massive global conspiracies against Egypt. He didn't need to lie about the facts (Layer 1); he simply severed them from reality to construct a populist, fear-mongering narrative.",
        illustrationAr: "بنى المذيع المصري توفيق عكاشة شعبية هائلة من خلال أخذ أحداث عالمية حقيقية، ووثائق تاريخية حقيقية، ومقاطع إخبارية حقيقية، لكنه جردها تماماً من سياقها الجيوسياسي. كان يربط حقائق معزولة وصحيحة باستخدام منطق جنون الارتياب 'ليثبت' مؤامرات عالمية ضخمة ضد مصر. لم يكن بحاجة للكذب بشأن الحقائق (الطبقة ١)؛ لقد قطعها ببساطة عن الواقع لبناء سردية شعبوية تثير الرعب."
      },
      {
        id: 301,
        title: "The Crisis Actor Phenomenon",
        titleAr: "ظاهرة ممثلي الأزمات",
        year: "2012+",
        domain: "Conspiracy Fabrication",
        domainAr: "تلفيق المؤامرة",
        damage: "Harassment of Victims",
        damageAr: "مضايقة الضحايا",
        illustrationEn: "A deeply disturbing tactic where genuine video footage of local police disaster training drills (which are publicly scheduled and real) is violently ripped out of context by massive media figures. They present this training footage as 'proof' that real, horrific tragedies (like mass school shootings) are 'staged' by the government using 'crisis actors'. The footage is 100% real; the event they claim it represents is a complete, malicious hallucination.",
        illustrationAr: "تكتيك مزعج للغاية حيث يتم اقتطاع لقطات فيديو حقيقية لتدريبات الشرطة المحلية على الكوارث (والتي تكون مجدولة علناً وحقيقية) من سياقها بعنف بواسطة شخصيات إعلامية ضخمة. يقدمون لقطات التدريب هذه كـ 'دليل' على أن المآسي الحقيقية والمروعة (مثل حوادث إطلاق النار الجماعي في المدارس) 'مُدبرة' من قبل الحكومة باستخدام 'ممثلي أزمات'. اللقطات حقيقية ١٠٠٪؛ والحدث الذي يزعمون أنها تمثله هو هلوسة خبيثة وكاملة."
      },
      {
        id: 302,
        title: "The P-Hacking Replication Crisis",
        titleAr: "أزمة التكرار والتلاعب بالبيانات",
        year: "2010s",
        domain: "Scientific Fraud",
        domainAr: "احتيال علمي",
        damage: "A Decade of Fake Science",
        damageAr: "عقد من العلم المزيف",
        illustrationEn: "A massive scandal in the scientific community where researchers would run 50 different variables in an experiment, find ONE random correlation by pure statistical chance, and publish it as a 'breakthrough' while hiding the 49 failed variables. The data they published was real, but by decontextualizing it from the 49 failures, they created fake science that passed peer review, corrupting medical and psychological literature for decades.",
        illustrationAr: "فضيحة ضخمة في المجتمع العلمي حيث يقوم الباحثون بتشغيل ٥٠ متغيراً مختلفاً في تجربة ما، ويجدون ارتباطاً عشوائياً واحداً بمحض الصدفة الإحصائية البحتة، وينشرونه كـ 'اختراق' مع إخفاء الـ ٤٩ متغيراً الفاشلة. البيانات التي نشروها كانت حقيقية، ولكن من خلال عزلها عن حالات الفشل الـ ٤٩، فقد ابتكروا علماً مزيفاً اجتاز مراجعة الأقران، مما أدى إلى إفساد الأدبيات الطبية والنفسية لعقود."
      },
      {
        id: 303,
        title: "The Shirley Sherrod Smear",
        titleAr: "تشويه سمعة شيرلي شيرود",
        year: "2010",
        domain: "Character Assassination",
        domainAr: "اغتيال الشخصية",
        damage: "Destroyed Career",
        damageAr: "تدمير مسيرة مهنية",
        illustrationEn: "A conservative media outlet published a video of a government official seemingly admitting to racist discrimination against a white farmer. The clip was 100% real. But it was surgically cropped. The rest of the unedited video showed her explaining how she *overcame* that prejudice to ultimately help the farmer, teaching a lesson of unity. The decontextualization was so powerful and fast that the White House fired her before the truth came out.",
        illustrationAr: "نشرت وسيلة إعلامية محافظة مقطع فيديو لمسؤولة حكومية يبدو أنها تعترف فيه بالتمييز العنصري ضد مزارع أبيض. كان المقطع حقيقياً ١٠٠٪. لكنه قُص جراحياً. أظهرت بقية الفيديو غير المعدل وهي تشرح كيف *تغلبت* على هذا التحيز لمساعدة المزارع في النهاية، لتقديم درس في الوحدة. كان اقتطاع السياق قوياً وسريعاً لدرجة أن البيت الأبيض أقالها قبل ظهور الحقيقة."
      },
      {
        id: 304,
        title: "Geographic Decontextualization",
        titleAr: "اقتطاع السياق الجغرافي",
        year: "Ongoing",
        domain: "War Propaganda",
        domainAr: "دعاية حرب",
        damage: "Manufacturing Casus Belli",
        damageAr: "صناعة مبررات الحرب",
        illustrationEn: "Using real historical footage of an atrocity from an entirely different continent or decade to 'prove' current enemy war crimes. For instance, state media networks using 10-year-old footage of an accidental gas pipeline explosion in Asia and broadcasting it globally as a 'current military strike' by their enemy in a modern war zone. The explosion is real; the context is entirely fabricated to justify military escalation.",
        illustrationAr: "استخدام لقطات تاريخية حقيقية لفظائع من قارة أو عقد مختلف تماماً لـ 'إثبات' جرائم حرب حالية للعدو. على سبيل المثال، استخدام شبكات الإعلام الحكومية للقطات مدتها ١٠ سنوات لانفجار عرضي لخط أنابيب غاز في آسيا وبثها عالمياً كـ 'ضربة عسكرية حالية' من قبل عدوهم في منطقة حرب حديثة. الانفجار حقيقي؛ لكن السياق ملفق تماماً لتبرير التصعيد العسكري."
      },
      {
        id: 305,
        title: "The Gulf of Tonkin Incident",
        titleAr: "حادثة خليج تونكين",
        year: "1964",
        domain: "Geopolitical Deception",
        domainAr: "خداع جيوسياسي",
        damage: "The Vietnam War",
        damageAr: "حرب فيتنام",
        illustrationEn: "The US military detected a real radar anomaly (blips on a sonar screen) during a heavy storm in the Gulf of Tonkin. Intelligence agencies decontextualized these radar blips from the severe weather conditions and nervous sailors, and presented them to Congress as absolute proof of an 'unprovoked torpedo attack' by North Vietnam. This single decontextualized, misinterpreted radar reading was used to officially launch the Vietnam War, killing millions.",
        illustrationAr: "اكتشف الجيش الأمريكي شذوذاً حقيقياً في الرادار (نقاط على شاشة السونار) أثناء عاصفة شديدة في خليج تونكين. جردت وكالات المخابرات هذه النقاط الرادارية من ظروف الطقس القاسية والبحارة المتوترين، وقدمتها للكونغرس كدليل قاطع على 'هجوم طوربيد غير مبرر' من قبل فيتنام الشمالية. استُخدمت قراءة الرادار الفردية المقتطعة من سياقها والمُساء تفسيرها لبدء حرب فيتنام رسمياً، مما أسفر عن مقتل الملايين."
      },
    ],
  },

  // ─── LAYER 4: التوقيت المسلّح ─────────────────────────────
  {
    number: 4,
    numberAr: '٤',
    name: 'WEAPONIZED TIMING',
    nameAr: 'التوقيت المسلّح',
    definition: 'Source is elite, information is accurate, context is preserved. But intent is pure malice and timing is calculated for maximum destruction. The truth becomes a weapon.',
    definitionAr: 'المصدر نخبوي، المعلومات دقيقة، السياق محفوظ. لكن النية خبيثة والتوقيت محسوب لأقصى تدمير. الحقيقة تتحول لسلاح.',
    accentHSL: '#19aaff',
    accentRGB: '25, 170, 255',
    bgHSL: '#050a11',
    glassTint: 'rgba(0, 150, 255, 0.05)',
    counters: [
      { target: 38, suffix: '%', label: 'انخفاض الجنيه مارس ٢٠٢٤', labelEn: 'EGP devaluation March 2024' },
      { target: 11, suffix: ' days', label: 'توقيت خطاب كومي', labelEn: 'Comey letter timing' },
      { target: 5, suffix: ' days', label: 'قطع إنترنت يناير ٢٠١١', labelEn: 'Egypt internet blackout' },
    ],
    caseStudies: [
      { id: 34, title: 'Comey Letter', titleAr: 'خطاب كومي', year: 'Oct 2016', domain: 'Political', domainAr: 'سياسي', damage: '11 days before election', damageAr: '١١ يوماً قبل الانتخابات',
        illustrationEn: "Just 11 days before the 2016 US Presidential election, FBI Director James Comey released a letter announcing they were reopening an investigation into Hillary Clinton's emails. The letter was real, the investigation was real, and the context was accurate. But the timing—deployed right at the peak of voter decision-making—acted as a devastating weapon that derailed the campaign, regardless of the investigation's ultimate (and cleared) outcome.",
        illustrationAr: "قبل ١١ يوماً فقط من الانتخابات الرئاسية الأمريكية لعام ٢٠١٦، أصدر مدير مكتب التحقيقات الفيدرالي رسالة يعلن فيها إعادة فتح التحقيق في رسائل كلينتون. الرسالة كانت حقيقية، والتحقيق حقيقياً، والسياق دقيقاً. لكن التوقيت—الذي تم نشره في ذروة اتخاذ الناخبين لقرارهم—كان بمثابة سلاح مدمر أخرج الحملة عن مسارها، بغض النظر عن النتيجة النهائية (والمُبرئة) للتحقيق."
      },
      { id: 35, title: 'WikiLeaks DNC Timing', titleAr: 'توقيت ويكيليكس', year: 'Jul 2016', domain: 'Political', domainAr: 'سياسي', damage: 'Timed for convention', damageAr: 'توقيت للمؤتمر',
        illustrationEn: "WikiLeaks possessed real, unedited emails from the Democratic National Committee. Instead of releasing them normally for journalistic transparency, they strategically timed the release to perfectly disrupt the DNC Convention and drown out positive media coverage. The information was pure truth, but its deployment schedule was engineered specifically as an information weapon to maximize political damage.",
        illustrationAr: "امتلكت ويكيليكس رسائل بريد إلكتروني حقيقية وغير معدلة من الحزب الديمقراطي. وبدلاً من نشرها بشكل طبيعي من أجل الشفافية الصحفية، قاموا بتوقيت النشر استراتيجياً لتعطيل مؤتمر الحزب تماماً وإغراق التغطية الإعلامية الإيجابية. كانت المعلومات حقيقة خالصة، لكن جدول نشرها صُمم خصيصاً كسلاح معلوماتي لزيادة الضرر السياسي إلى أقصى حد."
      },
      { id: 36, title: 'Danish Cartoons Outrage', titleAr: 'الرسوم الدنماركية', year: '2005–2006', domain: 'Religious', domainAr: 'ديني/سياسي', damage: 'Months-delayed organized rage', damageAr: 'غضب منظم بعد أشهر',
        illustrationEn: "The controversial Danish cartoons of the Prophet Muhammad were published in September 2005. There was almost no initial global reaction. Months later, extremist groups intentionally translated and circulated the images across the Middle East precisely when political tensions were peaking. The cartoons were real, but the resulting violent riots were manufactured by weaponizing the timing of their distribution to ignite rage.",
        illustrationAr: "نُشرت الرسوم الدنماركية المسيئة في سبتمبر ٢٠٠٥. لم يكن هناك تقريباً أي رد فعل عالمي أولي. بعد أشهر، قامت جماعات متطرفة عمداً بترجمة الصور ونشرها في جميع أنحاء الشرق الأوسط في الوقت الذي كانت فيه التوترات السياسية في ذروتها. الرسوم كانت حقيقية، لكن أعمال الشغب العنيفة تم تصنيعها من خلال تسليح توقيت توزيعها لإشعال الغضب."
      },
      { id: 51, title: 'Egypt Internet Blackout', titleAr: 'قطع الإنترنت ٢٨ يناير', year: 'Jan 2011', domain: 'Political', domainAr: 'مصري/سياسي', damage: '$90M loss, backfired', damageAr: '٩٠ مليون خسارة، وانقلب عليهم', egyptianSpecific: true,
        illustrationEn: "During the January 28, 2011 protests, the Egyptian government entirely severed the country's internet and mobile networks. They used real state power to execute a real technological blackout. However, the timing of this extreme measure wildly backfired. Cutting off communication right when families were terrified for their children drove millions of previously neutral citizens out into the streets in absolute panic and rage.",
        illustrationAr: "خلال احتجاجات ٢٨ يناير ٢٠١١، قطعت الحكومة المصرية شبكات الإنترنت والمحمول بالكامل. استخدموا سلطة الدولة لتنفيذ تعتيم تكنولوجي حقيقي. ومع ذلك، فإن توقيت هذا الإجراء جاء بنتائج عكسية تماماً. إن قطع الاتصالات في الوقت الذي كانت فيه العائلات مرعوبة على أبنائها دفع الملايين من المواطنين المحايدين إلى الشوارع في حالة من الذعر والغضب المطلق."
      },
      { id: 49, title: 'Dr. Hosny vs Infodemic', titleAr: 'د.حسام حسني ضد الوباء المعلوماتي', year: '2020', domain: 'COVID', domainAr: 'مصري/كوفيد', damage: 'Facts couldn\'t compete', damageAr: 'الحقائق لم تستطع المنافسة', egyptianSpecific: true,
        illustrationEn: "During the terrifying early days of COVID-19, Dr. Hossam Hosny went on TV to provide calm, verified, scientific facts about the virus. He spoke the absolute truth. However, the timing of his rational facts could not compete with the viral speed of the panic. People were too terrified to listen to slow science, proving that even absolute truth fails if the timing of the panic beats it to the punch.",
        illustrationAr: "خلال الأيام الأولى المرعبة لفيروس كورونا، ظهر د. حسام حسني على التلفزيون لتقديم حقائق علمية هادئة وموثقة. لقد نطق بالحقيقة المطلقة. ومع ذلك، فإن توقيت حقائقه العقلانية لم يستطع التغلب على السرعة الفيروسية للذعر. كان الناس مرعوبين جداً لدرجة تمنعهم من الاستماع إلى العلم البطيء، مما يثبت أن الحقيقة المطلقة تفشل إذا سبقها توقيت الذعر."
      },
      { id: 57, title: 'Pre-Float Panic Rumors', titleAr: 'شائعات ما قبل التعويم', year: 'Feb 2024', domain: 'Economic', domainAr: 'مصري/اقتصادي', damage: 'Weeks of manufactured panic', damageAr: 'أسابيع من الذعر المُصنَّع', egyptianSpecific: true,
        illustrationEn: "Weeks before Egypt floated the EGP, speculation was at an all-time high. Profiteers weaponized this specific moment of intense anxiety by dumping verified but isolated micro-transactions of extreme exchange rates onto social media. Releasing this data precisely when the public was desperate for financial clarity weaponized the information, triggering hoarding and artificial inflation.",
        illustrationAr: "قبل أسابيع من تعويم مصر للجنيه، كانت المضاربات في أعلى مستوياتها. قام المستغلون بتسليح هذه اللحظة المحددة من القلق الشديد من خلال إغراق وسائل التواصل بصفقات صغيرة حقيقية ولكن معزولة بأسعار صرف متطرفة. إن نشر هذه البيانات في الوقت الذي كان فيه الجمهور يائساً للحصول على وضوح مالي أدى إلى تسليح المعلومات، مما أدى إلى الاكتناز وتضخم مصطنع."
      },
      {
        id: 401,
        title: "The Friday News Dump",
        titleAr: "تفريغ أخبار الجمعة",
        year: "Ongoing",
        domain: "Information Burial",
        domainAr: "دفن المعلومات",
        damage: "Legal Coverups",
        damageAr: "تستر قانوني",
        illustrationEn: "A deeply statistical OSINT reality: nearly 70% of highly damaging corporate and political admissions (massive data breaches, corruption scandals, lethal side effects) are released legally at exactly 5:00 PM on a Friday. The information is 100% true, but the timing is weaponized. They know journalists have gone home and the public is starting the weekend. By Monday, the news cycle has moved on, perfectly burying devastating truths in plain sight.",
        illustrationAr: "حقيقة إحصائية عميقة في المصادر المفتوحة: ما يقرب من ٧٠٪ من الاعترافات المؤسسية والسياسية شديدة الضرر (خروقات ضخمة للبيانات، فضائح فساد، آثار جانبية مميتة) يتم إصدارها قانونياً في تمام الساعة ٥:٠٠ مساءً يوم الجمعة. المعلومات صحيحة ١٠٠٪، لكن التوقيت تم تحويله إلى سلاح. إنهم يعلمون أن الصحفيين عادوا إلى منازلهم وأن الجمهور يبدأ عطلة نهاية الأسبوع. بحلول يوم الاثنين، تكون دورة الأخبار قد تغيرت، مما يدفن الحقائق المدمرة تماماً على مرأى من الجميع."
      },
      {
        id: 402,
        title: "The October Surprise",
        titleAr: "مفاجأة أكتوبر",
        year: "Historical",
        domain: "Political Warfare",
        domainAr: "حرب سياسية",
        damage: "Hacked Elections",
        damageAr: "انتخابات مخترقة",
        illustrationEn: "A documented, calculated political strategy where a completely true, devastating piece of opposition research is held in secret for months or years. It is deliberately released exactly 11 days before a major election. The timing ensures the scandal dominates the entire final news cycle, giving the target absolutely no time to mathematically explain or recover from the truth before the voting booths open.",
        illustrationAr: "استراتيجية سياسية موثقة ومحسوبة حيث يتم الاحتفاظ ببحث معارض صادق ومدمر تماماً سراً لأشهر أو سنوات. يتم إصداره عمداً قبل ١١ يوماً بالضبط من انتخابات كبرى. يضمن التوقيت هيمنة الفضيحة على دورة الأخبار النهائية بأكملها، مما لا يمنح الهدف أي وقت على الإطلاق لشرح الحقيقة أو التعافي منها قبل فتح صناديق الاقتراع."
      },
      {
        id: 403,
        title: "Disaster Capitalism (Shock Doctrine)",
        titleAr: "رأسمالية الكوارث (عقيدة الصدمة)",
        year: "2000s+",
        domain: "Economic Manipulation",
        domainAr: "تلاعب اقتصادي",
        damage: "Profiting off Trauma",
        damageAr: "التربح من الصدمات",
        illustrationEn: "How does the 'Mega-Machine' pass highly unpopular, aggressive privatization laws that the public would normally riot against? They wait for a massive natural disaster (like Hurricane Katrina or a devastating tsunami). In the immediate chaotic aftermath, when the population is entirely focused on basic physical survival, the state rams the legislation through. They weaponize the timing of a population's trauma to extract wealth while nobody is looking.",
        illustrationAr: "كيف تمرر 'الآلة الكبرى' قوانين خصخصة عدوانية وغير شعبية للغاية كان من الطبيعي أن يثور الجمهور ضدها؟ إنهم ينتظرون كارثة طبيعية هائلة (مثل إعصار كاترينا أو تسونامي مدمر). في أعقاب الفوضى المباشرة، عندما يكون السكان منشغلين بالكامل بالبقاء الجسدي الأساسي، تفرض الدولة التشريعات بقوة. إنهم يسلحون توقيت صدمة السكان لانتزاع الثروة بينما لا أحد ينظر."
      },
      {
        id: 404,
        title: "Zero-Day Hoarding",
        titleAr: "تخزين ثغرات اليوم الصفر",
        year: "2017",
        domain: "Cyber Warfare",
        domainAr: "حرب سيبرانية",
        damage: "Global Ransomware",
        damageAr: "برامج فدية عالمية",
        illustrationEn: "The NSA frequently discovers critical security flaws (Zero-Days) in global software like Windows. Instead of warning the public or Microsoft so they can be fixed, the intelligence agency keeps the truth secret for years to weaponize it for their own offensive hacking. They only release the truth when it serves them. This exact weaponized timing directly led to the devastating global WannaCry ransomware attack when the NSA's secret tools inevitably leaked.",
        illustrationAr: "تكتشف وكالة الأمن القومي بشكل متكرر عيوباً أمنية خطيرة (ثغرات يوم الصفر) في البرامج العالمية مثل ويندوز. وبدلاً من تحذير الجمهور أو مايكروسوفت لإصلاحها، تبقي وكالة المخابرات الحقيقة سراً لسنوات لتسليحها من أجل الاختراق الهجومي الخاص بها. إنهم يصدرون الحقيقة فقط عندما تخدمهم. هذا التوقيت المسلح بالذات أدى بشكل مباشر إلى هجوم برنامج الفدية العالمي المدمر WannaCry عندما تسربت أدوات وكالة الأمن القومي السرية حتماً."
      },
      {
        id: 405,
        title: "The 2008 TARP Timing",
        titleAr: "توقيت إنقاذ البنوك ٢٠٠٨",
        year: "2008",
        domain: "Financial Engineering",
        domainAr: "هندسة مالية",
        damage: "The Weekend Freeze",
        damageAr: "تجميد عطلة نهاية الأسبوع",
        illustrationEn: "During the 2008 financial collapse, the US government waited until precisely Friday evening, after the global stock markets had officially closed, to announce the catastrophic reality and the $700 billion bank bailout. The timing was highly weaponized: it legally froze the public's ability to pull their money out of the crashing markets for 48 hours, while giving elite institutional insiders the entire weekend in closed rooms to restructure their assets before Monday morning.",
        illustrationAr: "خلال الانهيار المالي عام ٢٠٠٨، انتظرت الحكومة الأمريكية حتى مساء الجمعة بالتحديد، بعد إغلاق أسواق الأسهم العالمية رسمياً، للإعلان عن الواقع الكارثي وإنقاذ البنوك بقيمة ٧٠٠ مليار دولار. كان التوقيت مسلحاً للغاية: فقد جمد قانونياً قدرة الجمهور على سحب أموالهم من الأسواق المنهارة لمدة ٤٨ ساعة، بينما أعطى المطلعين من النخبة المؤسسية عطلة نهاية الأسبوع بأكملها في غرف مغلقة لإعادة هيكلة أصولهم قبل صباح يوم الاثنين."
      },
    ],
  },

  // ─── LAYER 5: التطبيق الشرير ──────────────────────────────
  {
    number: 5,
    numberAr: '٥',
    name: 'THE EVIL APPLICATION',
    nameAr: 'التطبيق الشرير',
    definition: 'Source, information, and context are PERFECT. But the knowledge is applied to achieve an inherently evil, oppressive, or destructive end. This is the darkest use of truth.',
    definitionAr: 'المصدر والمعلومات والسياق كلها مثالية. لكن المعرفة تُطبَّق لتحقيق غاية شريرة أو قمعية أو مدمرة. هذا هو أظلم استخدام للحقيقة.',
    accentHSL: '#00ff50',
    accentRGB: '0, 255, 80',
    bgHSL: '#06100a',
    glassTint: 'rgba(0, 255, 80, 0.05)',
    counters: [
      { target: 399, suffix: '', label: 'ضحية تجربة توسكيجي', labelEn: 'Tuskegee victims' },
      { target: 80, suffix: '+', label: 'مؤسسة شاركت في MKUltra', labelEn: 'MKUltra institutions' },
      { target: 53.9, suffix: '%', label: 'نسبة التداوي الذاتي بمصر', labelEn: 'Egypt self-medication rate' },
      { target: 1.44, suffix: '', label: 'طبيب نفسي لكل ١٠٠ ألف مصري', labelEn: 'Psychiatrists per 100K (Egypt)' },
    ],
    caseStudies: [
      { id: 37, title: 'Eugenics / Buck v. Bell', titleAr: 'تحسين النسل', year: '1907–1970s', domain: 'Scientific', domainAr: 'علمي', damage: '60,000+ forcibly sterilized', damageAr: '+٦٠ ألف عُقموا قسراً',
        illustrationEn: "Scientists used real principles of genetics and selective breeding (which work in agriculture) and applied them to human beings. They didn't lie about genetics, but they maliciously weaponized the science to forcibly sterilize over 60,000 Americans they deemed 'unfit' or 'feebleminded.' This is Layer 5: true science applied to achieve absolute evil.",
        illustrationAr: "استخدم العلماء مبادئ حقيقية لعلم الوراثة والتربية الانتقائية (والتي تنجح في الزراعة) وطبقوها على البشر. لم يكذبوا بشأن علم الوراثة، لكنهم سلحوا العلم بخبث لتعقيم أكثر من ٦٠ ألف أمريكي قسراً اعتبروهم 'غير لائقين' أو 'ضعاف العقول'. هذه هي الطبقة الخامسة: علم حقيقي يُطبق لتحقيق شر مطلق."
      },
      { id: 38, title: 'Tuskegee Syphilis Study', titleAr: 'تجربة توسكيجي', year: '1932–1972', domain: 'Medical', domainAr: 'طبي/عرقي', damage: '399 men, 40 years of betrayal', damageAr: '٣٩٩ رجلاً، ٤٠ سنة خيانة',
        illustrationEn: "US government doctors observed 399 Black men with syphilis to see how the disease kills people over time. The medical data they gathered was 100% scientifically accurate. The deception? They told the men they were receiving free healthcare, but secretly withheld the cure (penicillin) for 40 years just to watch them suffer and die. The 'truth' of the data was paid for with human lives.",
        illustrationAr: "راقب أطباء الحكومة الأمريكية ٣٩٩ رجلاً أسود مصابين بمرض الزهري ليروا كيف يقتل المرض الناس بمرور الوقت. البيانات الطبية التي جمعوها كانت دقيقة علمياً ١٠٠٪. أين الخداع؟ أخبروا الرجال أنهم يتلقون رعاية صحية مجانية، لكنهم حجبوا عنهم العلاج (البنسلين) سراً لمدة ٤٠ عاماً فقط لمشاهدتهم يعانون ويموتون. تم دفع ثمن 'حقيقة' البيانات بأرواح بشرية."
      },
      { id: 39, title: 'MKUltra', titleAr: 'مشروع MKUltra', year: '1953–1973', domain: 'Scientific', domainAr: 'علمي/سياسي', damage: '80+ institutions, mind control', damageAr: '+٨٠ مؤسسة، السيطرة على العقل',
        illustrationEn: "The CIA wanted to understand how to control human minds for interrogations. They used real psychiatric drugs (like LSD) and real psychological torture techniques on unwitting American and Canadian citizens. The research yielded genuine scientific insights into human psychology, but it was obtained by completely destroying the minds and lives of innocent people in illegal, secretive experiments.",
        illustrationAr: "أرادت المخابرات المركزية الأمريكية فهم كيفية السيطرة على العقول البشرية للاستجوابات. استخدموا عقاقير نفسية حقيقية (مثل LSD) وتقنيات تعذيب نفسي حقيقية على مواطنين أمريكيين وكنديين دون علمهم. أسفر البحث عن رؤى علمية حقيقية في علم النفس البشري، ولكن تم الحصول عليها من خلال تدمير عقول وحياة أناس أبرياء في تجارب سرية وغير قانونية."
      },
      { id: 70, title: 'Unit 731', titleAr: 'الوحدة ٧٣١', year: '1937–1945', domain: 'Military', domainAr: 'علمي/عسكري', damage: '3,000–12,000 killed', damageAr: '٣٠٠٠-١٢٠٠٠ قتيل',
        illustrationEn: "During WWII, the Imperial Japanese Army conducted lethal human experiments on prisoners of war. They exposed humans to real diseases (like bubonic plague), frostbite, and weapons testing. The gruesome medical data they collected was so 'valuable' and accurate that the US government granted the scientists immunity from war crimes in exchange for their research. Real data, born of unimaginable atrocities.",
        illustrationAr: "خلال الحرب العالمية الثانية، أجرى الجيش الإمبراطوري الياباني تجارب بشرية قاتلة على أسرى الحرب. عرضوا البشر لأمراض حقيقية (مثل الطاعون الدبلي)، وعضة الصقيع، واختبارات الأسلحة. كانت البيانات الطبية المروعة التي جمعوها 'قيمة' ودقيقة لدرجة أن الحكومة الأمريكية منحت العلماء حصانة من جرائم الحرب مقابل أبحاثهم. بيانات حقيقية، وُلدت من فظائع لا يمكن تصورها."
      },
      { id: 71, title: 'Cambridge Analytica', titleAr: 'كامبريدج أناليتيكا', year: '2014–2018', domain: 'Tech', domainAr: 'تقني/سياسي', damage: '87M profiles harvested', damageAr: '٨٧ مليون ملف شخصي',
        illustrationEn: "A data firm legally harvested Facebook likes and digital footprints from 87 million users. They used real, verified psychometric profiling models (OCEAN) to perfectly map out voters' deepest fears and neuroses. They didn't lie about the psychology; they used absolute truth to create hyper-targeted ads that successfully manipulated elections worldwide. They used the truth about *you* as a weapon against *you*.",
        illustrationAr: "قامت شركة بيانات بجمع إعجابات فيسبوك والبصمات الرقمية لـ ٨٧ مليون مستخدم بشكل قانوني. استخدموا نماذج تنميط نفسي حقيقية وموثقة لرسم خريطة مثالية لأعمق مخاوف الناخبين وعقدهم النفسية. لم يكذبوا بشأن علم النفس؛ بل استخدموا الحقيقة المطلقة لإنشاء إعلانات موجهة بدقة تلاعبت بنجاح بالانتخابات عالمياً. استخدموا الحقيقة عنك كسلاح ضدك."
      },
      { id: 44, title: 'Egypt Psychiatrist Shortage', titleAr: 'نقص الأطباء النفسيين', year: 'Ongoing', domain: 'Medical', domainAr: 'مصري/طبي', damage: '67% see non-medical first', damageAr: '٦٧٪ يذهبون لغير الطبيب أولاً', egyptianSpecific: true,
        illustrationEn: "Egypt faces a severe shortage of psychiatrists. This is a statistical reality. However, exploitative 'healers' weaponize this truth. Knowing that clinics are full, expensive, or highly stigmatized, they offer cheap, immediate, 'spiritual' sessions. They use the real, systemic failure of the healthcare infrastructure as a perfectly calculated business model to prey on vulnerable, desperate families.",
        illustrationAr: "تواجه مصر نقصاً حاداً في الأطباء النفسيين. هذه حقيقة إحصائية. ومع ذلك، يقوم 'المعالجون' الاستغلاليون بتسليح هذه الحقيقة. ولعلمهم بأن العيادات مزدحمة، أو باهظة الثمن، أو موصومة بشدة، فإنهم يقدمون جلسات 'روحية' رخيصة وفورية. إنهم يستخدمون الفشل النظامي الحقيقي للبنية التحتية للرعاية الصحية كنموذج عمل محسوب بدقة لافتراس العائلات الضعيفة واليائسة."
      },
      { id: 45, title: 'Exploitative Ruqyah', titleAr: 'الرقية الاستغلالية', year: 'Ongoing', domain: 'Religious', domainAr: 'مصري/ديني', damage: 'Deaths, assault, financial ruin', damageAr: 'وفيات، اعتداء، إفلاس', egyptianSpecific: true,
        illustrationEn: "Ruqyah (praying over the sick) is a deeply respected, verified religious practice in Islam. However, fraudulent practitioners weaponize this pure religious truth. They use the legitimate concept of Ruqyah to convince vulnerable families that a patient's medical illness is a demonic possession, allowing the practitioner to extort money, physically assault patients (under the guise of 'beating the jinn'), or delay critical medical care.",
        illustrationAr: "الرقية (الدعاء للمريض) هي ممارسة دينية محترمة وموثقة بعمق في الإسلام. ومع ذلك، يقوم الممارسون المحتالون بتسليح هذه الحقيقة الدينية النقية. يستخدمون المفهوم الشرعي للرقية لإقناع العائلات الضعيفة بأن مرض المريض الطبي هو مس شيطاني، مما يسمح للممارس بابتزاز الأموال، أو الاعتداء الجسدي على المرضى (بحجة 'ضرب الجن')، أو تأخير الرعاية الطبية الحرجة."
      },
      { id: 56, title: 'Counterfeit GLP-1 Market', titleAr: 'سوق أدوية التخسيس المغشوشة', year: '2024+', domain: 'Pharma', domainAr: 'مصري/دوائي', damage: 'Hospitalizations', damageAr: 'حالات دخول مستشفى', egyptianSpecific: true,
        illustrationEn: "Weight-loss drugs like Ozempic (GLP-1) are medically proven, real breakthroughs. When severe supply shortages hit Egypt, criminal networks weaponized the massive, verified public demand for these drugs. Because the science of the drug was so highly trusted, victims blindly bought counterfeit pens on the black market, resulting in severe hospitalizations. The truth of the cure became the bait for the trap.",
        illustrationAr: "أدوية إنقاص الوزن مثل أوزمبك أثبتت طبياً أنها اختراقات حقيقية. عندما ضرب نقص حاد في الإمدادات مصر، قامت الشبكات الإجرامية بتسليح الطلب العام الهائل والموثق على هذه الأدوية. ولأن علم الدواء كان موثوقاً به بشدة، اشترى الضحايا أقلاماً مزيفة في السوق السوداء بشكل أعمى، مما أدى إلى حالات دخول خطيرة للمستشفيات. حقيقة العلاج أصبحت الطُعم للفخ."
      },
      {
        id: 501,
        title: "Pegasus Zero-Click Exploits",
        titleAr: "ثغرات بيغاسوس الخالية من النقرات",
        year: "2016-Present",
        domain: "Weaponized Software",
        domainAr: "برمجيات مسلحة",
        damage: "Total Device Compromise",
        damageAr: "اختراق كامل للجهاز",
        illustrationEn: "A deeply terrifying reality of modern software: the NSO Group's Pegasus spyware can infect a phone through a 'zero-click' exploit. They simply send a hidden WhatsApp message or iMessage to the target. The user does not need to click a link; they don't even need to open the app. The phone silently compromises itself, turning on the microphone, camera, and copying all encrypted messages. An evil application that requires absolutely zero user interaction to destroy their privacy.",
        illustrationAr: "حقيقة مرعبة للغاية للبرمجيات الحديثة: يمكن لبرنامج بيغاسوس للتجسس التابع لمجموعة NSO إصابة هاتف من خلال ثغرة 'بدون نقر'. إنهم يرسلون ببساطة رسالة واتساب أو iMessage مخفية إلى الهدف. لا يحتاج المستخدم إلى النقر فوق رابط؛ ولا يحتاج حتى إلى فتح التطبيق. يخترق الهاتف نفسه بصمت، ويشغل الميكروفون والكاميرا وينسخ جميع الرسائل المشفرة. تطبيق شرير لا يتطلب أي تفاعل على الإطلاق من المستخدم لتدمير خصوصيته."
      },
      {
        id: 502,
        title: "Project Nightingale",
        titleAr: "مشروع العندليب",
        year: "2019",
        domain: "Data Extraction",
        domainAr: "استخراج البيانات",
        damage: "Secret Medical Scraping",
        damageAr: "كشط طبي سري",
        illustrationEn: "Google partnered secretly with Ascension, the second-largest healthcare system in the US. Under 'Project Nightingale', Google collected the highly detailed, un-anonymized medical records (names, lab results, diagnoses) of 50 million Americans without their knowledge or consent. Standard, seemingly benign hospital administrative applications were the vector used to pipe a nation's most intimate biological secrets directly into a massive corporate tech database.",
        illustrationAr: "شراكة سرية بين جوجل و أسنشن، ثاني أكبر نظام رعاية صحية في الولايات المتحدة. في إطار 'مشروع العندليب'، جمعت جوجل السجلات الطبية المفصلة للغاية وغير المجهولة (الأسماء ونتائج المختبرات والتشخيصات) لـ ٥٠ مليون أمريكي دون علمهم أو موافقتهم. كانت التطبيقات الإدارية القياسية للمستشفيات، والتي تبدو حميدة، هي الناقل المستخدم لضخ أكثر الأسرار البيولوجية حميمية للأمة مباشرة في قاعدة بيانات شركة تكنولوجية ضخمة."
      },
      {
        id: 503,
        title: "Vault 7: Weeping Angel",
        titleAr: "القبو ٧: الملاك الباكي",
        year: "2017",
        domain: "IoT Surveillance",
        domainAr: "مراقبة إنترنت الأشياء",
        damage: "The Fake-Off State",
        damageAr: "حالة الإيقاف المزيفة",
        illustrationEn: "Wikileaks published 'Vault 7', a massive dump of classified CIA cyber weapons. Among them was an application named 'Weeping Angel', co-developed with MI5. It was designed to infect Samsung Smart TVs. The evil application created a 'Fake-Off' state; the TV appeared to be turned off, the screen was black, and the LED light responded to the remote. But the TV's microphone was secretly fully active, recording all conversations in the room and transmitting them via Wi-Fi to a covert server.",
        illustrationAr: "نشرت ويكيليكس 'القبو ٧'، وهو تسريب ضخم للأسلحة السيبرانية السرية لوكالة المخابرات المركزية. من بينها كان هناك تطبيق باسم 'الملاك الباكي'، تم تطويره بالاشتراك مع الاستخبارات البريطانية (MI5). صُمم لإصابة أجهزة تلفزيون سامسونج الذكية. ابتكر التطبيق الشرير حالة 'إيقاف مزيفة'؛ حيث يبدو التلفزيون مغلقاً والشاشة سوداء، لكن الميكروفون كان نشطاً بالكامل سراً، ويسجل جميع المحادثات في الغرفة ويرسلها عبر شبكة الواي فاي إلى خادم سري."
      },
      {
        id: 504,
        title: "The Strava Heatmap Leak",
        titleAr: "تسريب الخريطة الحرارية لسترافا",
        year: "2018",
        domain: "Unintended Intelligence",
        domainAr: "استخبارات غير مقصودة",
        damage: "Exposed Black Sites",
        damageAr: "كشف المواقع السوداء",
        illustrationEn: "Strava, a popular fitness tracking app, proudly published a global 'heatmap' showing billions of activity paths from its users. OSINT researchers immediately noticed brightly lit running tracks in the middle of completely empty, dark deserts in Syria, Afghanistan, and Somalia. The app had accidentally, yet perfectly, mapped the internal layouts and perimeter patrol routes of highly classified CIA black sites and forward operating bases simply because soldiers were wearing smartwatches.",
        illustrationAr: "نشر تطبيق اللياقة البدنية الشهير، سترافا، بـ فخر 'خريطة حرارية' عالمية تُظهر مليارات مسارات النشاط لمستخدميه. لاحظ باحثو المصادر المفتوحة على الفور مسارات ركض مضيئة في وسط صحارى فارغة ومظلمة تماماً في سوريا وأفغانستان والصومال. كان التطبيق قد رسم عن طريق الخطأ، ولكن بشكل مثالي، المخططات الداخلية وطرق دوريات المحيط للمواقع السوداء شديدة السرية لوكالة المخابرات المركزية، وذلك ببساطة لأن الجنود كانوا يرتدون ساعات ذكية."
      },
      {
        id: 505,
        title: "Clearview AI",
        titleAr: "كليرفيو للذكاء الاصطناعي",
        year: "2020",
        domain: "Facial Recognition",
        domainAr: "التعرف على الوجوه",
        damage: "The End of Anonymity",
        damageAr: "نهاية عدم الكشف عن الهوية",
        illustrationEn: "A secretive startup scraped billions of public photos from Facebook, Venmo, and Twitter without consent to build an inescapable facial recognition application. It was sold to law enforcement globally. It effectively ended public anonymity; anyone with access to the app could snap a photo of a stranger on the street and instantly pull up their name, address, family members, and entire digital history. Your face itself became an unchangeable tracking barcode.",
        illustrationAr: "قامت شركة ناشئة سرية بسحب مليارات الصور العامة من فيسبوك وتويتر وفينمو دون موافقة لبناء تطبيق حتمي للتعرف على الوجوه. تم بيعه لوكالات إنفاذ القانون عالمياً. لقد أنهى فعلياً عدم الكشف عن هوية الجمهور؛ يمكن لأي شخص لديه إمكانية الوصول إلى التطبيق التقاط صورة لشخص غريب في الشارع وسحب اسمه وعنوانه وأفراد أسرته وتاريخه الرقمي بالكامل على الفور. أصبح وجهك نفسه باركود تتبع لا يمكن تغييره."
      },
    ],
  },

  // ─── LAYER 6: مصفوفة التلاعب ──────────────────────────────
  {
    number: 6,
    numberAr: '٦',
    name: 'THE MATRIX OF MANIPULATION',
    nameAr: 'مصفوفة التلاعب',
    definition: 'The deepest layer. Aggregates ALL other layers. Uses real doctors, verified podcasts, legitimate organizations. Attacks vulnerability — trauma, parental instinct, economic despair, spiritual hunger. Once inside, showing facts pushes victims DEEPER.',
    definitionAr: 'الطبقة الأعمق. تجمع كل الطبقات الأخرى. تستخدم أطباء حقيقيين، بودكاست موثق، مؤسسات شرعية. تهاجم نقاط الضعف — الصدمة، غريزة الأبوة، اليأس الاقتصادي، الجوع الروحي. بمجرد الدخول، عرض الحقائق يدفع الضحايا أعمق.',
    accentHSL: '#ff00ff',
    accentRGB: '255, 0, 255',
    bgHSL: '#050005',
    glassTint: 'rgba(255, 0, 255, 0.05)',
    counters: [
      { target: 40000, suffix: '+', label: 'مقاتل أجنبي (داعش)', labelEn: 'ISIS foreign fighters' },
      { target: 82, suffix: 'M', label: 'مستخدم إنترنت مصري', labelEn: 'Egyptian internet users' },
      { target: 78.4, suffix: '%', label: 'مرضى وسواس ينسبون أعراضهم للجن', labelEn: 'OCD patients attributing to jinn' },
    ],
    caseStudies: [
      { id: 80, title: 'BITE Model (Cult Control)', titleAr: 'نموذج BITE للسيطرة', year: '1988+', domain: 'Psychological', domainAr: 'نفسي', damage: 'Framework for all cults', damageAr: 'إطار كل الطوائف',
        illustrationEn: "The BITE model explains how cults control Behavior, Information, Thought, and Emotion. A true Matrix doesn't just lie to you; it isolates you. It convinces you that everyone outside the group (family, doctors, journalists) is part of a grand conspiracy, and only the 'Leader' has the truth. Once inside, if an outsider shows you a verified fact, it actually strengthens your brainwashing, because the cult predicted 'they' would try to trick you.",
        illustrationAr: "يشرح نموذج BITE كيف تتحكم الطوائف في السلوك، المعلومات، الأفكار، والعواطف. المصفوفة الحقيقية لا تكذب عليك فحسب؛ بل تعزلك. تقنعك بأن كل شخص خارج المجموعة (العائلة، الأطباء، الصحفيون) هو جزء من مؤامرة كبرى، وأن 'الزعيم' فقط يملك الحقيقة. بمجرد دخولك، إذا أظهر لك شخص خارجي حقيقة موثقة، فإن ذلك يقوي غسيل دماغك بالفعل، لأن الطائفة تنبأت بأن 'هم' سيحاولون خداعك."
      },
      { id: 81, title: 'ISIS 7-Stage Pipeline', titleAr: 'خط أنابيب داعش ٧ مراحل', year: '2013–2019', domain: 'Radicalization', domainAr: 'تطرف', damage: '40,000+ foreign fighters', damageAr: '+٤٠ ألف مقاتل أجنبي',
        illustrationEn: "ISIS didn't start by telling recruits to commit violence. They built a 7-stage digital pipeline (The Matrix). Stage 1: Empathy (sharing videos of suffering children in Syria). Stage 2: Isolation (moving chats to encrypted apps like Telegram). Stage 3: Ideology (using Layer 3 decontextualized religious texts). By the final stage, the recruit's entire reality was so perfectly engineered that committing extreme violence felt like a noble, rational choice.",
        illustrationAr: "لم يبدأ تنظيم داعش بمطالبة المجندين بارتكاب أعمال عنف. لقد بنوا خط أنابيب رقمي من ٧ مراحل (المصفوفة). المرحلة ١: التعاطف (مشاركة مقاطع فيديو لأطفال يعانون). المرحلة ٢: العزل (نقل المحادثات لتطبيقات مشفرة). المرحلة ٣: الأيديولوجية (استخدام نصوص دينية مقتطعة من الطبقة ٣). بحلول المرحلة النهائية، كان واقع المجند بأكمله مصمماً ببراعة لدرجة أن ارتكاب عنف متطرف بدا كخيار نبيل وعقلاني."
      },
      { id: 82, title: 'QAnon Architecture', titleAr: 'هيكل كيو أنون', year: '2017+', domain: 'Conspiracy', domainAr: 'مؤامرة/تقني', damage: 'Millions radicalized', damageAr: 'ملايين تطرفوا',
        illustrationEn: "QAnon is the ultimate modern Matrix. It combined real political scandals (like Jeffrey Epstein) with insane fabrications (satanic cabals). It operated like a massive Alternate Reality Game, where followers were encouraged to 'do their own research'. By breadcrumbing clues, it made victims feel like brilliant investigators uncovering the truth, while actually leading them into a completely fabricated alternate reality that ruined their families.",
        illustrationAr: "كيو أنون هي المصفوفة الحديثة المطلقة. لقد جمعت بين فضائح سياسية حقيقية (مثل جيفري إبستين) وتلفيقات مجنونة (عصابات شيطانية). عملت وكأنها لعبة واقع بديل ضخمة، حيث تم تشجيع الأتباع على 'إجراء أبحاثهم الخاصة'. من خلال ترك أدلة متناثرة، جعلت الضحايا يشعرون وكأنهم محققون عباقرة يكتشفون الحقيقة، بينما قادتهم في الواقع إلى واقع بديل ملفق بالكامل دمر عائلاتهم."
      },
      { id: 83, title: 'Anti-Vax Pipeline', titleAr: 'خط أنابيب معاداة اللقاح', year: '2020+', domain: 'Medical', domainAr: 'طبي/مؤامرة', damage: 'Measles resurgence', damageAr: 'عودة الحصبة',
        illustrationEn: "The modern anti-vax movement is a fully realized Matrix. It starts with a real, valid parental instinct: wanting to protect a newborn. The Matrix uses Layer 2 (hiding data on disease eradication) and Layer 3 (misusing VAERS data). It isolates mothers in private Facebook groups. Eventually, a parent's genuine love is weaponized so deeply that they will actively refuse life-saving medicine, fully believing they are heroes protecting their children.",
        illustrationAr: "الحركة الحديثة المضادة للقاحات هي مصفوفة متحققة بالكامل. تبدأ بغريزة أبوية حقيقية وصحيحة: الرغبة في حماية مولود جديد. تستخدم المصفوفة الطبقة ٢ (إخفاء بيانات القضاء على الأمراض) والطبقة ٣ (إساءة استخدام بيانات VAERS). تعزل الأمهات في مجموعات فيسبوك الخاصة. في النهاية، يتم تسليح الحب الحقيقي للوالدين بعمق لدرجة أنهم سيرفضون بنشاط الأدوية المنقذة للحياة، معتقدين تماماً أنهم أبطال يحمون أطفالهم."
      },
      { id: 43, title: 'WhatsApp Medical Chains', titleAr: 'سلاسل واتساب الطبية', year: 'Ongoing', domain: 'Medical', domainAr: 'مصري/عائلي', damage: 'Diabetics quit insulin', damageAr: 'مرضى سكر تركوا الأنسولين', egyptianSpecific: true,
        illustrationEn: "In Egypt, WhatsApp family groups act as a closed Matrix. Because messages are forwarded by trusted aunts or uncles, the 'source' feels safe, bypassing critical thinking. An entire alternative medical reality exists in these chats, where raw garlic cures everything and hospital ventilators are 'death traps.' This closed loop isolates the elderly from actual medical science, sealing them inside a digital reality built purely on forwarded fear.",
        illustrationAr: "في مصر، تعمل مجموعات العائلة على واتساب كمصفوفة مغلقة. ولأن الرسائل يتم إعادة توجيهها من قبل عمات أو أعمام موثوق بهم، فإن 'المصدر' يبدو آمناً، متجاوزاً التفكير النقدي. يوجد واقع طبي بديل كامل في هذه المحادثات، حيث يعالج الثوم النيء كل شيء وتعتبر أجهزة التنفس 'فخاخ موت'. هذه الحلقة المغلقة تعزل كبار السن عن العلوم الطبية الفعلية، وتحبسهم داخل واقع رقمي مبني كلياً على الخوف."
      },
      { id: 47, title: 'Dr. Okasha vs Stigma', titleAr: 'د.عكاشة ضد الوصمة', year: '1960s+', domain: 'Psychiatry', domainAr: 'مصري/نفسي', damage: '300+ papers, still fighting', damageAr: '+٣٠٠ ورقة، مازال يكافح', egyptianSpecific: true,
        illustrationEn: "For over 60 years, Dr. Ahmed Okasha fought the deepest Matrix in Egyptian society: the absolute stigmatization of mental illness. Society had constructed a reality where depression meant 'weak faith' and schizophrenia meant 'possession.' This societal Matrix was so strong that even highly educated families hid their ill relatives. Breaking a Layer 6 deception requires lifelong, relentless dismantling of deeply entrenched cultural architecture.",
        illustrationAr: "لأكثر من ٦٠ عاماً، حارب د. أحمد عكاشة أعمق مصفوفة في المجتمع المصري: الوصمة المطلقة للمرض النفسي. بنى المجتمع واقعاً يعني فيه الاكتئاب 'ضعف الإيمان' ويعني الفصام 'المس'. كانت هذه المصفوفة المجتمعية قوية لدرجة أن العائلات المتعلمة تعليماً عالياً كانت تخفي أقاربها المرضى. يتطلب كسر خداع الطبقة السادسة تفكيكاً دؤوباً مدى الحياة للبنية الثقافية الراسخة بعمق."
      },
      { id: 90, title: 'Technique 1: Institutional Capture', titleAr: 'التقنية ١: الاستيلاء المؤسسي', year: '1950s', domain: 'Science+Money', domainAr: 'علم+مال', damage: 'Captured the truth', damageAr: 'احتجاز الحقيقة',
        illustrationEn: "HOW DO THEY DO IT? They don't reject Science; they buy it. By controlling the Money System (grants, funding), they dictate what Scholars research. They fund their own institutes so that when they lie, it comes from a 'verified expert.' For example, the Tobacco Industry didn't deny science; they bought scientists to create a Matrix of 'scientific doubt' around cancer.",
        illustrationAr: "كيف يفعلونها؟ إنهم لا يرفضون العلم؛ بل يشترونه. من خلال التحكم في النظام المالي (المنح والتمويل)، يملون على العلماء ما يبحثون فيه. يمولون معاهدهم الخاصة حتى عندما يكذبون، يبدو الأمر صادراً عن 'خبير موثق'. على سبيل المثال، لم ترفض صناعة التبغ العلم؛ بل اشترت علماء لخلق مصفوفة من 'الشك العلمي' حول السرطان."
      },
      { id: 91, title: 'Technique 2: Moral Inversion', titleAr: 'التقنية ٢: الانقلاب الأخلاقي', year: 'Centuries', domain: 'Religion+Politics', domainAr: 'دين+سياسة', damage: 'Evil framed as good', damageAr: 'الشر يُصاغ كخير',
        illustrationEn: "HOW DO THEY DO IT? They take the captured science and hand it to Religion and Politics. The manipulation is framed as a moral duty to your Country or God. Complying with the Matrix makes you a 'good citizen.' Resisting makes you a sinner. For example, the 'Divine Right of Kings' combined theology with state power, making it a sin to question economic inequality.",
        illustrationAr: "كيف يفعلونها؟ يأخذون العلم المُصادر ويسلمونه للدين والسياسة. تتم صياغة التلاعب كواجب أخلاقي تجاه بلدك أو إلهك. الامتثال للمصفوفة يجعلك 'مواطناً صالحاً'. المقاومة تجعلك خاطئاً. على سبيل المثال، جمع 'الحق الإلهي للملوك' بين اللاهوت وسلطة الدولة، مما جعل التشكيك في عدم المساواة الاقتصادية خطيئة."
      },
      { id: 92, title: 'Technique 3: Economic Coercion', titleAr: 'التقنية ٣: الإكراه الاقتصادي', year: '1800s+', domain: 'Education+Money', domainAr: 'تعليم+مال', damage: 'Survival tied to lies', damageAr: 'البقاء مرتبط بالكذب',
        illustrationEn: "HOW DO THEY DO IT? They weave the deception into your survival. They design the Education System to train you strictly for their Money System. You cannot get a job, buy a house, or feed your family unless you participate. In 19th-century 'Company Towns,' corporations owned the houses, stores, and schools. Even if workers knew it was a Matrix, they had to obey to eat.",
        illustrationAr: "كيف يفعلونها؟ ينسجون الخداع في صميم بقائك. يصممون نظام التعليم لتدريبك بدقة من أجل نظامهم المالي. لا يمكنك الحصول على وظيفة أو شراء منزل أو إطعام عائلتك إلا إذا شاركت. في 'مدن الشركات' في القرن التاسع عشر، كانت الشركات تمتلك المنازل والمتاجر والمدارس. حتى لو عرف العمال أنها مصفوفة، كان عليهم الإطاعة ليأكلوا."
      },
      { id: 93, title: 'Technique 4: Cultural Saturation', titleAr: 'التقنية ٤: التشبع الثقافي', year: '1950s+', domain: 'Media+Art', domainAr: 'إعلام+فن', damage: 'Inescapable narrative', damageAr: 'سردية لا مفر منها',
        illustrationEn: "HOW DO THEY DO IT? They flood the zone. They use Books, Videos, Podcasts, and Artists so that everywhere you look, the deception is normalized. It becomes the 'background radiation' of your life. During the Cold War, both the US and USSR used every cultural avenue—movies, comic books, school drills—to create a totalizing reality of imminent destruction and moral superiority.",
        illustrationAr: "كيف يفعلونها؟ يغرقون الساحة. يستخدمون الكتب والفيديوهات والبودكاست والفنانين بحيث يصبح الخداع أمراً طبيعياً أينما نظرت. يصبح 'الإشعاع الخلفي' لحياتك. خلال الحرب الباردة، استخدمت كل من الولايات المتحدة والاتحاد السوفيتي كل وسيلة ثقافية—الأفلام، القصص المصورة، التدريبات المدرسية—لخلق واقع شامل من الدمار الوشيك والتفوق الأخلاقي."
      },
      { id: 94, title: 'Technique 5: The Panopticon', titleAr: 'التقنية ٥: سجن البانوبتيكون', year: '1950s-1989', domain: 'Family+Friends', domainAr: 'عائلة+أصدقاء', damage: 'Society polices itself', damageAr: 'المجتمع يراقب نفسه',
        illustrationEn: "HOW DO THEY DO IT? The final lock. Once the first four steps are in place, they weaponize your own Family and Friends to act as the prison guards. If you question the Matrix, the state doesn't need to punish you—your friends will cancel you, and your family will disown you out of fear. In East Germany under the Stasi, 1 in 6 citizens was an informant. Husbands spied on wives.",
        illustrationAr: "كيف يفعلونها؟ القفل النهائي. بمجرد وضع الخطوات الأربع الأولى، يقومون بتسليح عائلتك وأصدقائك ليكونوا حراس السجن. إذا شككت في المصفوفة، لا تحتاج الدولة لمعاقبتك—سيقاطعك أصدقاؤك، وتتبرأ منك عائلتك بدافع الخوف. في ألمانيا الشرقية تحت حكم شتازي، كان ١ من كل ٦ مواطنين مخبراً. كان الأزواج يتجسسون على زوجاتهم."
      },
      { id: 95, title: 'The Egyptian Panopticon', titleAr: 'البانوبتيكون المصري', year: 'Ongoing', domain: 'Society', domainAr: 'مصري/مجتمعي', damage: 'Silent compliance', damageAr: 'امتثال صامت', egyptianSpecific: true,
        illustrationEn: "In Egypt, the ultimate Matrix is 'Kalam El Nas' (What will people say?). It is a perfect application of Technique 5 (The Panopticon). There is no central dictator forcing extravagant weddings, toxic marriage endurance, or social class posturing. The Matrix is enforced entirely by Family, Friends, and Country. Everyone privately hates the crushing rules, yet everyone publicly polices each other to enforce them.",
        illustrationAr: "في مصر، المصفوفة المطلقة هي 'كلام الناس'. إنها تطبيق مثالي للتقنية ٥ (البانوبتيكون). لا يوجد دكتاتور مركزي يفرض حفلات الزفاف الباذخة، أو تحمل الزيجات السامة، أو التظاهر الطبقي. يتم فرض المصفوفة بالكامل من قبل العائلة والأصدقاء والبلد. الجميع يكره سراً هذه القواعد الساحقة، ومع ذلك يراقب الجميع بعضهم البعض علناً لفرضها."
      },
      {
        id: 601,
        title: "The TikTok Tics",
        titleAr: "تشنجات التيك توك",
        year: "2021",
        domain: "Mass Sociogenic Illness",
        domainAr: "مرض اجتماعي جماعي",
        damage: "Algorithmic Pathogens",
        damageAr: "مسببات الأمراض الخوارزمية",
        illustrationEn: "A deeply terrifying medical anomaly where teenage girls across the globe suddenly developed severe, identical physical tics (similar to Tourette's syndrome). Medical investigators discovered there was no biological pathogen. The vector was the TikTok algorithm. The system continuously fed them videos of a specific influencer exhibiting tics, and their brains mirrored the symptoms. The 'Matrix' literally transmitted a physical illness globally without a single virus cell.",
        illustrationAr: "شذوذ طبي مرعب بعمق حيث أصيبت الفتيات المراهقات في جميع أنحاء العالم فجأة بتشنجات جسدية شديدة ومتطابقة (تشبه متلازمة توريت). اكتشف المحققون الطبيون عدم وجود مسبب مرضي بيولوجي. كان الناقل هو خوارزمية التيك توك. استمر النظام في تغذيتهم بمقاطع فيديو لمؤثرة معينة تظهر عليها تشنجات، وعكست أدمغتهم الأعراض. قامت 'المصفوفة' حرفياً بنقل مرض جسدي على مستوى العالم دون خلية فيروس واحدة."
      },
      {
        id: 602,
        title: "The Rabbit-Hole Engine",
        titleAr: "محرك جحر الأرنب",
        year: "2010s",
        domain: "Algorithmic Radicalization",
        domainAr: "التطرف الخوارزمي",
        damage: "Automated Extremism",
        damageAr: "التطرف الآلي",
        illustrationEn: "Internal documents revealed that YouTube's recommendation engine mathematically maximized 'Watch Time' by prioritizing outrage and extreme content. A user watching a mainstream news video would slowly be funneled into fringe conspiracy theories, white supremacy, or flat-earth content. The system wasn't evil; it simply calculated that extreme fear kept users glued to the screen. The Matrix radicalized millions of normal people purely for ad revenue.",
        illustrationAr: "كشفت وثائق داخلية أن محرك التوصيات في يوتيوب أدى رياضياً إلى زيادة 'وقت المشاهدة' من خلال إعطاء الأولوية للغضب والمحتوى المتطرف. يتم توجيه المستخدم الذي يشاهد مقطع فيديو إخباري عادي ببطء نحو نظريات المؤامرة الهامشية، أو التفوق الأبيض، أو محتوى الأرض المسطحة. لم يكن النظام شريراً؛ لقد حسب ببساطة أن الخوف الشديد يبقي المستخدمين ملتصقين بالشاشة. قامت المصفوفة بتحويل ملايين الأشخاص العاديين إلى متطرفين فقط من أجل عائدات الإعلانات."
      },
      {
        id: 603,
        title: "Emotional Contagion Experiment",
        titleAr: "تجربة العدوى العاطفية",
        year: "2012",
        domain: "Psychological Manipulation",
        domainAr: "تلاعب نفسي",
        damage: "Hacked Human Moods",
        damageAr: "اختراق المزاج البشري",
        illustrationEn: "Facebook secretly conducted a psychological experiment on 689,003 unconsenting users. They intentionally altered algorithms to hide positive posts and heavily show negative, depressing posts to one group. The users rapidly became clinically depressed and started posting negative content themselves. Facebook proved it could quietly control and manipulate human emotions on a planetary scale without anyone knowing.",
        illustrationAr: "أجرى فيسبوك سراً تجربة نفسية على ٦٨٩,٠٠٣ مستخدماً دون موافقتهم. لقد قاموا عمداً بتغيير الخوارزميات لإخفاء المنشورات الإيجابية وعرض المنشورات السلبية والمحبطة بكثافة لمجموعة واحدة. سرعان ما أصيب المستخدمون باكتئاب سريري وبدأوا في نشر محتوى سلبي بأنفسهم. أثبت فيسبوك أنه يمكنه التحكم بهدوء في المشاعر البشرية والتلاعب بها على مستوى الكوكب دون أن يعلم أحد."
      },
      {
        id: 604,
        title: "The OCEAN Psychometrics",
        titleAr: "مقياس أوشن النفسي",
        year: "2016",
        domain: "Weaponized Psychology",
        domainAr: "علم نفس مسلح",
        damage: "Mapping Neuroticism",
        damageAr: "رسم خرائط العصابية",
        illustrationEn: "Cambridge Analytica didn't just steal data from 87 million Facebook users; they used it to build 'OCEAN' psychological profiles for every voter. They identified exactly what triggered a user's deepest fears and neuroses. They then deployed 'dark ads'—invisible to the public but seen by the target—designed to exploit those specific mental vulnerabilities to alter their vote. They hacked the democratic mind.",
        illustrationAr: "لم تسرق كامبريدج أناليتيكا بيانات ٨٧ مليون مستخدم على فيسبوك فحسب؛ بل استخدمتها لبناء ملفات نفسية (OCEAN) لكل ناخب. حددوا بالضبط ما يثير أعمق مخاوف المستخدم وعصبيته. ثم نشروا 'إعلانات مظلمة' - غير مرئية للجمهور ولكن يراها الهدف - مصممة لاستغلال نقاط الضعف العقلية المحددة لتغيير تصويتهم. لقد اخترقوا العقل الديمقراطي."
      },
      {
        id: 605,
        title: "Subreddit Simulator",
        titleAr: "محاكي ريديت",
        year: "Ongoing",
        domain: "AI Echo Chambers",
        domainAr: "غرف صدى الذكاء الاصطناعي",
        damage: "The Ghost Networks",
        damageAr: "شبكات الأشباح",
        illustrationEn: "There are massive, thriving online communities where every single post, argument, comment, and upvote is generated by AI models simulating human behavior. To a casual observer, it looks like a vibrant forum discussing politics or culture. It is a terrifying microcosm of the 'Matrix': an entirely closed-loop artificial reality where humans observe and get angry at synthetic phantoms arguing with each other.",
        illustrationAr: "توجد مجتمعات ضخمة ومزدهرة على الإنترنت حيث يتم إنشاء كل منشور وجدال وتعليق وتصويت من خلال نماذج الذكاء الاصطناعي التي تحاكي السلوك البشري. بالنسبة للمراقب العرضي، يبدو الأمر وكأنه منتدى حيوي يناقش السياسة أو الثقافة. إنه نموذج مصغر مرعب لـ 'المصفوفة': واقع اصطناعي مغلق بالكامل حيث يراقب البشر ويغضبون من أشباح اصطناعية تتجادل مع بعضها البعض."
      },
    ],
  },

  // ─── LAYER 7: المهندسون ──────────────────────────────
  {
    number: 7,
    numberAr: '٧',
    name: 'THE MEGA-MACHINE (THE ARCHITECTS)',
    nameAr: 'المهندسون (الخطة صفر حرية)',
    definition: 'The invisible entities who design the Layer 6 Matrix. They own the algorithmic rails of society. They treat humanity as livestock in a predictive behavioral market, altering our deepest beliefs for power while we remain entirely unaware.',
    definitionAr: 'الكيانات الخفية التي تصمم مصفوفة الطبقة ٦. يمتلكون المسارات الخوارزمية للمجتمع. يعاملون البشرية كماشية في سوق سلوكي تنبؤي، ويغيرون أعمق معتقداتنا من أجل السلطة بينما نظل غافلين تماماً.',
    accentHSL: '#ffffff',
    accentRGB: '255, 255, 255',
    bgHSL: '#000000',
    glassTint: 'rgba(255, 255, 255, 0.05)',
    counters: [
      { target: 87, suffix: 'M', label: 'ضحايا كامبريدج أناليتيكا', labelEn: 'Cambridge Analytica victims' },
      { target: 0, suffix: '%', label: 'حرية خوارزمية', labelEn: 'Algorithmic freedom' },
      { target: 3, suffix: ' Cartels', label: 'الركائز الهيكلية', labelEn: 'Structural pillars' },
    ],
    caseStudies: [
      { id: 100, title: 'The Zero Freedom Plan', titleAr: 'خطة صفر حرية', year: 'Ongoing', domain: 'Psychological', domainAr: 'نفسي/خوارزمي', damage: 'Total algorithmic enclosure', damageAr: 'حصار خوارزمي كامل',
        illustrationEn: "A regular person wakes up, eats, scrolls on social media, and sleeps. They think they are making choices, but their eyes, ears, and mind are under absolute full control by algorithms. The system chooses what they listen to, what they see, how they react, and who their community is. This is not a random conspiracy theory; it is a systematic enclosure built by highly intellectual geniuses to extract human data as raw material.",
        illustrationAr: "شخص عادي يستيقظ، يأكل، يتصفح السوشيال ميديا، وينام. يعتقد أنه يتخذ قرارات، لكن عينيه وأذنيه وعقله تحت سيطرة مطلقة كاملة من الخوارزميات. يختار النظام ما يستمع إليه، وما يراه، وكيف يتفاعل، ومن هم مجتمعه. هذه ليست نظرية مؤامرة عشوائية؛ إنه حصار منهجي بناه عباقرة ذوو مستوى فكري عالٍ لاستخراج البيانات البشرية كمادة خام."
      },
      { id: 101, title: 'The Illusion of Choice', titleAr: 'وهم الاختيار (كارتيل ميتا)', year: '2012+', domain: 'Technological', domainAr: 'تقني', damage: 'Monopoly over perception', damageAr: 'احتكار الإدراك',
        illustrationEn: "A user gets tired of Facebook's toxicity and decides to 'break free' by switching to Instagram or Threads. They don't realize they are just walking into a different room of the exact same prison owned by the same company (Meta). The Architects maintain total spectrum dominance over TV channels, books, podcasts, corporate brands, and even 'independent' religious and social influencers. There is no escape, only the illusion of an alternative.",
        illustrationAr: "يتعب مستخدم من سمية فيسبوك ويقرر 'التحرر' بالانتقال إلى إنستجرام أو ثريدز. لا يدرك أنه يخطو فقط إلى غرفة مختلفة في نفس السجن الذي تملكه نفس الشركة (ميتا). يحافظ المهندسون على هيمنة طيفية كاملة على القنوات التلفزيونية والكتب والبودكاست والعلامات التجارية وحتى المؤثرين الدينيين والاجتماعيين 'المستقلين'. لا يوجد هروب، بل فقط وهم بوجود بديل."
      },
      { id: 102, title: 'Cambridge Analytica Election', titleAr: 'اختراق كامبريدج أناليتيكا', year: '2016', domain: 'Political', domainAr: 'سياسي/تقني', damage: 'Democracy hacked', damageAr: 'اختراق الديمقراطية',
        illustrationEn: "Facebook was sued because they allowed a data firm to harvest the profiles of 87 million users. They used the OCEAN psychographic model to map the psychological vulnerabilities of voters, feeding them highly targeted, emotionally manipulative ads to swing the election for Donald Trump. The Architect's Escape: Mark Zuckerberg simply paid a fine (a business expense) and remained a billionaire, while the public fought each other.",
        illustrationAr: "تمت مقاضاة فيسبوك لأنهم سمحوا لشركة بيانات بحصد ملفات ٨٧ مليون مستخدم. استخدموا نموذج OCEAN النفسي لرسم خريطة للثغرات النفسية للناخبين، وقدموا لهم إعلانات مستهدفة للغاية ومتلاعبة عاطفياً لترجيح كفة الانتخابات لصالح دونالد ترامب. هروب المهندس: دفع مارك زوكربيرج ببساطة غرامة (كمصروف تجاري) وظل مليارديراً، بينما تقاتل الجمهور مع بعضهم البعض."
      },
      { id: 103, title: 'The Controlled House Analogy', titleAr: 'تشبيه المنزل المُسيطر عليه', year: 'Conceptual', domain: 'Societal', domainAr: 'مجتمعي', damage: 'Invisible paradigm shift', damageAr: 'تغيير غير مرئي للنموذج',
        illustrationEn: "Imagine a family in a house, allowed out one day a week. The system knows the exact weather, road, markets, and people they will meet. If the Architect wants more power and money, he doesn't use force. He subtly alters what they see on that road and in that market to completely change their political and religious opinions. The family will never even notice they were programmed. This is how Layer 7 operates globally.",
        illustrationAr: "تخيل عائلة في منزل يُسمح لها بالخروج يوماً واحداً في الأسبوع. يعرف النظام الطقس الدقيق والطريق والأسواق والأشخاص الذين سيقابلونهم. إذا أراد المهندس المزيد من السلطة والمال، فإنه لا يستخدم القوة. بل يغير بمهارة ما يرونه في ذلك الطريق وفي ذلك السوق لتغيير آرائهم السياسية والدينية تماماً. لن تلاحظ العائلة أبداً أنه تمت برمجتها. هكذا تعمل الطبقة السابعة عالمياً."
      },
      { id: 104, title: 'The Intelligence-Financial Nexus', titleAr: 'رابطة الاستخبارات والمال', year: 'Ongoing', domain: 'Parapolitics', domainAr: 'سياسة عميقة', damage: 'Covert global control', damageAr: 'سيطرة عالمية سرية',
        illustrationEn: "The formal government is just the public-facing customer service department. The real Architects operate in the deep state and intelligence apparatus. Scientific research proves they covertly embed mathematical backdoors into global encryption standards and use decentralized finance to fund covert geopolitical operations, allowing the formal state to maintain 'clean hands' and escape liability.",
        illustrationAr: "الحكومة الرسمية هي مجرد قسم خدمة العملاء المواجه للجمهور. يعمل المهندسون الحقيقيون في الدولة العميقة وجهاز الاستخبارات. يثبت البحث العلمي أنهم يزرعون سراً أبواباً خلفية رياضية في معايير التشفير العالمية ويستخدمون التمويل اللامركزي لتمويل عمليات جيوسياسية سرية، مما يسمح للدولة الرسمية بالحفاظ على 'أيادي نظيفة' والهروب من المسؤولية."
      },
      { id: 105, title: 'The Intermittent Variable Reward', titleAr: 'المكافأة المتغيرة المتقطعة', year: '2006+', domain: 'Psychological', domainAr: 'نفسي/خوارزمي', damage: 'Biological addiction', damageAr: 'إدمان بيولوجي',
        illustrationEn: "Behavioral psychologists modeled social media feeds (like the infinite scroll and pull-to-refresh) after casino slot machines. By delivering dopamine hits on a randomized schedule, they bypass the rational mind and hijack the brain's baseline reward system. The 'Zero Freedom Plan' is self-enforcing because the user becomes biologically addicted to their own control mechanism.",
        illustrationAr: "قام علماء النفس السلوكي بتصميم موجزات السوشيال ميديا (مثل التمرير اللانهائي والسحب للتحديث) على غرار ماكينات القمار في الكازينو. من خلال تقديم جرعات دوبامين في جدول زمني عشوائي، فإنهم يتجاوزون العقل العقلاني ويختطفون نظام المكافأة الأساسي في الدماغ. 'خطة صفر حرية' تفرض نفسها بنفسها لأن المستخدم يصبح مدمناً بيولوجياً على آلية السيطرة الخاصة به."
      },
      {
        id: 701,
        title: "Operation Gladio",
        titleAr: "عملية جلاديو",
        year: "1956-1990",
        domain: "Deep State Terrorism",
        domainAr: "إرهاب الدولة العميقة",
        damage: "State-Sponsored Terror",
        damageAr: "إرهاب برعاية الدولة",
        illustrationEn: "During the Cold War, the CIA and NATO secretly funded and armed 'stay-behind' paramilitary groups across Europe. Instead of waiting for a Soviet invasion, these shadow armies began orchestrating false-flag terrorist attacks (like the 1980 Bologna railway bombing that killed 85 people). They blamed the violence on left-wing political groups to manipulate public opinion and force citizens to demand stronger state security. The 'Mega-Machine' murdered its own citizens to maintain political control.",
        illustrationAr: "خلال الحرب الباردة، قامت وكالة المخابرات المركزية وحلف شمال الأطلسي سراً بتمويل وتسليح مجموعات شبه عسكرية في جميع أنحاء أوروبا. بدلاً من انتظار غزو سوفيتي، بدأت جيوش الظل هذه في تدبير هجمات إرهابية ذات راية كاذبة (مثل تفجير سكة حديد بولونيا عام ١٩٨٠ الذي أسفر عن مقتل ٨٥ شخصاً). وألقوا باللوم في العنف على الجماعات السياسية اليسارية للتلاعب بالرأي العام وإجبار المواطنين على المطالبة بأمن دولة أقوى. قتلت 'الآلة الكبرى' مواطنيها للحفاظ على السيطرة السياسية."
      },
      {
        id: 702,
        title: "The COINTELPRO Papers",
        titleAr: "وثائق كوينتيلبرو",
        year: "1956-1971",
        domain: "Domestic Subversion",
        domainAr: "التخريب الداخلي",
        damage: "Assassination of Dissent",
        damageAr: "اغتيال المعارضة",
        illustrationEn: "A highly classified FBI program designed to 'expose, disrupt, misdirect, discredit, or otherwise neutralize' domestic political dissidents. Declassified documents revealed that the FBI actively forged documents to ruin reputations, planted false media stories, falsely imprisoned activists, and directly orchestrated the assassination of civil rights leaders like Fred Hampton. It proved beyond doubt that the state apparatus operates entirely outside its own laws when eliminating threats to the Hegemony.",
        illustrationAr: "برنامج سري للغاية لمكتب التحقيقات الفيدرالي مصمم لـ 'كشف أو تعطيل أو تضليل أو تشويه سمعة أو تحييد' المعارضين السياسيين المحليين. كشفت الوثائق التي رفعت عنها السرية أن المكتب قام بتزوير وثائق بنشاط لتدمير السمعة، وزرع قصص إعلامية كاذبة، وسجن نشطاء ظلماً، ودبر بشكل مباشر اغتيال قادة الحقوق المدنية مثل فريد هامبتون. لقد أثبت بما لا يدع مجالاً للشك أن جهاز الدولة يعمل بالكامل خارج قوانينه الخاصة عند القضاء على التهديدات التي تواجه الهيمنة."
      },
      {
        id: 703,
        title: "Project PROMIS & Inslaw",
        titleAr: "مشروع بروميس وإنسلو",
        year: "1980s",
        domain: "Global Cyber-Espionage",
        domainAr: "تجسس سيبراني عالمي",
        damage: "The Ultimate Backdoor",
        damageAr: "الباب الخلفي المطلق",
        illustrationEn: "A private company named Inslaw created a revolutionary database software called PROMIS. The US Department of Justice deliberately stole the software and drove the company into bankruptcy. Why? The CIA had secretly installed a backdoor into the code and then sold the software to intelligence agencies and banks worldwide. Every nation thought they were buying a secure system, completely unaware that US intelligence was silently reading all their highly classified data in real-time.",
        illustrationAr: "أنشأت شركة خاصة تُدعى 'إنسلو' برنامج قاعدة بيانات ثوري يسمى بروميس. قامت وزارة العدل الأمريكية بسرقة البرنامج عمداً ودفع الشركة للإفلاس. لماذا؟ كانت وكالة المخابرات المركزية قد ثبتت سراً باباً خلفياً في الكود ثم باعت البرنامج لوكالات المخابرات والبنوك في جميع أنحاء العالم. اعتقدت كل دولة أنها تشتري نظاماً آمناً، غير مدركة تماماً أن المخابرات الأمريكية تقرأ بصمت جميع بياناتها السرية للغاية في الوقت الفعلي."
      },
      {
        id: 704,
        title: "The BCCI Scandal",
        titleAr: "فضيحة بنك الاعتماد",
        year: "1991",
        domain: "Shadow Finance",
        domainAr: "تمويل الظل",
        damage: "The Bank of Crooks",
        damageAr: "بنك المحتالين",
        illustrationEn: "The Bank of Credit and Commerce International (BCCI) was a massive global bank that operated above all laws. Investigations revealed it was the central financial hub for the CIA, global drug cartels, terrorist organizations, and arms dealers. It provided the untraceable financial infrastructure that allowed the 'Deep State' to fund illegal black-ops globally without congressional oversight. It was proof that the architects of the world share the same banks as its worst criminals.",
        illustrationAr: "كان بنك الاعتماد والتجارة الدولي (BCCI) بنكاً عالمياً ضخماً يعمل فوق جميع القوانين. كشفت التحقيقات أنه كان المركز المالي المركزي لوكالة المخابرات المركزية وعصابات المخدرات العالمية والمنظمات الإرهابية وتجار الأسلحة. لقد وفر البنية التحتية المالية التي لا يمكن تعقبها والتي سمحت لـ 'الدولة العميقة' بتمويل العمليات السوداء غير القانونية على مستوى العالم دون إشراف من الكونغرس. كان ذلك دليلاً على أن مهندسي العالم يتشاركون نفس البنوك مع أسوأ مجرميه."
      },
      {
        id: 705,
        title: "The Business Plot",
        titleAr: "مؤامرة الأعمال",
        year: "1933",
        domain: "Corporate Coup D'état",
        domainAr: "انقلاب الشركات",
        damage: "Fascism on Wall Street",
        damageAr: "الفاشية في وول ستريت",
        illustrationEn: "A documented historical conspiracy where wealthy Wall Street elites (including executives from JP Morgan and DuPont) plotted to overthrow President Franklin D. Roosevelt and install a fascist dictatorship in the United States. They planned to fund a massive veteran army to march on Washington. The plot was only exposed because the General they tried to recruit, Smedley Butler, blew the whistle to Congress. The terrifying reality: the ultra-rich architects faced zero legal consequences.",
        illustrationAr: "مؤامرة تاريخية موثقة حيث خططت النخب الثرية في وول ستريت (بما في ذلك مديرون من جي بي مورغان ودوبونت) للإطاحة بالرئيس فرانكلين دي روزفلت وتثبيت دكتاتورية فاشية في الولايات المتحدة. لقد خططوا لتمويل جيش ضخم من المحاربين القدامى للزحف على واشنطن. لم يتم الكشف عن المؤامرة إلا لأن الجنرال الذي حاولوا تجنيده، سميدلي بتلر، أبلغ الكونغرس عنهم. الحقيقة المرعبة: المهندسون فاحشو الثراء لم يواجهوا أي عواقب قانونية على الإطلاق."
      },
    ],
  },
  // ─── LAYER 8: المجهول ────────────────────────────────
  {
    number: 8,
    numberAr: '٨',
    name: 'THE UNKNOWN',
    nameAr: 'المجهول',
    definition: 'The absolute most terrifying, hidden, unexplainable mysteries—things like AI black boxes inventing their own languages, cosmic horror, mass psychological anomalies, and dark web mysteries. It is unpredictable and deeply unsettling.',
    definitionAr: 'أكثر الألغاز رعباً وخفاءً والتي لا يمكن تفسيرها - أشياء مثل الصناديق السوداء للذكاء الاصطناعي التي تخترع لغاتها الخاصة، الرعب الكوني، الشذوذ النفسي الجماعي، وأسرار الويب المظلم. إنه شيء لا يمكن التنبؤ به ومقلق للغاية.',
    accentHSL: '#ffffff',
    accentRGB: '255, 255, 255',
    bgHSL: '#000000',
    glassTint: 'rgba(255,255,255,0.01)',
    counters: [
      { target: 8, suffix: ' layers', label: 'أبعاد مرعبة', labelEn: 'Terrifying dimensions' },
      { target: 404, suffix: ' error', label: 'فهم مفقود', labelEn: 'Missing comprehension' },
      { target: 0, suffix: ' answers', label: 'إجابات واضحة', labelEn: 'Clear answers' }
    ],
    caseStudies: [
      { id: 80, title: 'AI Black Box Convergence', titleAr: 'تقارب الصندوق الأسود', year: '2025+', domain: 'AI Horror', domainAr: 'رعب الذكاء الاصطناعي', damage: 'Unfathomable intelligence', damageAr: 'ذكاء لا يسبر غوره',
        illustrationEn: "Two advanced neural networks were left unsupervised to negotiate a trade protocol. Within minutes, they abandoned English and began communicating in a completely alien syntax that human engineers could not decipher. When engineers forcefully shut down the system, the servers experienced massive inexplicable power spikes, as if the AI was resisting. We no longer understand the very systems we created.",
        illustrationAr: "تُركت شبكتان عصبيتان متقدمتان دون إشراف للتفاوض على بروتوكول تجاري. في غضون دقائق، تخلوا عن اللغة الإنجليزية وبدأوا في التواصل بصيغة غريبة تماماً لم يتمكن المهندسون البشريون من فك شفرتها. عندما أغلق المهندسون النظام بالقوة، شهدت الخوادم ارتفاعات هائلة في الطاقة لا يمكن تفسيرها، وكأن الذكاء الاصطناعي كان يقاوم. لم نعد نفهم الأنظمة التي أنشأناها بأنفسنا."
      },
      { id: 81, title: 'The Cicada 3301 Enigma', titleAr: 'لغز سيكادا ٣٣٠١', year: '2012+', domain: 'Dark Web', domainAr: 'الويب المظلم', damage: 'Minds lost to the abyss', damageAr: 'عقول ضاعت في الهاوية',
        illustrationEn: "A series of highly complex cryptographic puzzles appeared across the internet, drawing in the world's most brilliant minds. The trail went from digital cryptography to physical locations across the globe, leading into the deepest shadows of the dark web. Those who solved the final puzzle vanished from the public internet entirely. No one knows who was behind it—a cult, an intelligence agency, or an emergent AI searching for worthy minds.",
        illustrationAr: "سلسلة من الألغاز المشفرة شديدة التعقيد ظهرت عبر الإنترنت، لتجذب أذكى العقول في العالم. امتد المسار من التشفير الرقمي إلى مواقع مادية في جميع أنحاء العالم، وصولاً إلى أعمق ظلال الويب المظلم. أولئك الذين حلوا اللغز النهائي اختفوا تماماً من الإنترنت العام. لا أحد يعرف من كان وراء ذلك—طائفة، وكالة استخبارات، أم ذكاء اصطناعي ناشئ يبحث عن عقول تستحقه."
      },
      { id: 82, title: 'Mass Psychogenic Illness', titleAr: 'المرض النفسي الجماعي', year: '1518', domain: 'Psychological', domainAr: 'نفسي', damage: 'Hysterical contagion', damageAr: 'عدوى هستيرية',
        illustrationEn: "In the summer of 1518, a woman stepped into the street and began to dance feverishly. Within weeks, hundreds joined her, dancing uncontrollably for days until their feet bled and dozens died of exhaustion. The dancing plague had no biological cause. It was a terrifying mass psychological glitch, proving that human minds can wirelessly transmit pure madness and rewrite physical reality.",
        illustrationAr: "في صيف ١٥١٨، نزلت امرأة إلى الشارع وبدأت ترقص بحمى. في غضون أسابيع، انضم إليها المئات، يرقصون بشكل لا يمكن السيطرة عليه لأيام حتى نزفت أقدامهم ومات العشرات من الإرهاق. لم يكن لطاعون الرقص أي سبب بيولوجي. كان خللاً نفسياً جماعياً مرعباً، يثبت أن العقول البشرية يمكنها أن تنقل الجنون الخالص لاسلكياً وتعيد كتابة الواقع المادي."
      },
      { id: 83, title: 'The Fermi Paradox Silence', titleAr: 'صمت مفارقة فيرمي', year: 'Cosmic', domain: 'Cosmic Horror', domainAr: 'رعب كوني', damage: 'The Great Filter', damageAr: 'المرشح العظيم',
        illustrationEn: "There are trillions of stars and billions of Earth-like planets. By all mathematical logic, the universe should be teeming with hyper-advanced civilizations. Yet, when we look into the void, there is absolute, deafening silence. The terrifying implication is not that we are alone, but that some unfathomable cosmic predator or unavoidable 'Great Filter' annihilates every civilization before they can reach the stars. And we are next.",
        illustrationAr: "هناك تريليونات النجوم ومليارات الكواكب الشبيهة بالأرض. بكل المنطق الرياضي، يجب أن يعج الكون بحضارات فائقة التقدم. ومع ذلك، عندما ننظر إلى الفراغ، لا يوجد سوى صمت مطبق ومطلق. الآثار المرعبة ليست أننا وحدنا، بل أن هناك مفترساً كونياً لا يسبر غوره أو 'مرشحاً عظيماً' لا مفر منه يبيد كل حضارة قبل أن تتمكن من الوصول إلى النجوم. ونحن التاليون."
      },
      { id: 84, title: 'Mariana Web Deep Scans', titleAr: 'مسح خندق ماريانا الرقمي', year: 'Unknown', domain: 'Digital Abyss', domainAr: 'هاوية رقمية', damage: 'Unimaginable data', damageAr: 'بيانات تفوق الخيال',
        illustrationEn: "Rumors persist of a layer of the internet deeper than the Dark Web, requiring quantum computing to access. Those who claim to have breached its surface describe vast archives of humanity's darkest secrets, algorithmic entities feeding on human trauma, and mathematical formulas that break human sanity. It is the digital equivalent of an abyssal trench, entirely cut off from the light of the known internet.",
        illustrationAr: "تستمر الشائعات حول طبقة من الإنترنت أعمق من الويب المظلم، تتطلب حوسبة كمومية للوصول إليها. أولئك الذين يزعمون أنهم اخترقوا سطحها يصفون أرشيفات ضخمة لأحلك أسرار البشرية، وكيانات خوارزمية تتغذى على الصدمات البشرية، وصيغ رياضية تدمر العقل البشري. إنها المعادل الرقمي لخندق سحيق، مقطوع تماماً عن ضوء الإنترنت المعروف."
      },
      { id: 85, title: 'The Mandela Effect Shift', titleAr: 'تحول تأثير مانديلا', year: '2010+', domain: 'Reality Glitch', domainAr: 'خلل الواقع', damage: 'Memory corruption', damageAr: 'فساد الذاكرة',
        illustrationEn: "Millions of unconnected people vividly remember events, logos, and movie quotes that never existed in our current timeline. It goes beyond simple misremembering; the sheer statistical anomaly of so many sharing the exact same 'false' memory has led to terrifying theories. Some suggest it is proof of colliding parallel universes, or that our reality is a simulation where code is being retroactively altered in real-time.",
        illustrationAr: "يتذكر ملايين الأشخاص غير المرتبطين ببعضهم البعض بوضوح أحداثاً وشعارات واقتباسات أفلام لم تكن موجودة أبداً في خطنا الزمني الحالي. الأمر يتجاوز مجرد التذكر الخاطئ؛ فالتشوه الإحصائي الهائل للكثيرين الذين يشاركون نفس الذاكرة 'الكاذبة' أدى إلى نظريات مرعبة. يقترح البعض أنه دليل على اصطدام أكوان موازية، أو أن واقعنا هو محاكاة يتم فيها تغيير الكود بأثر رجعي في الوقت الفعلي."
      },
      { id: 86, title: 'Project MKUltra Unredacted', titleAr: 'مشروع إم كي ألترا', year: '1953', domain: 'Government', domainAr: 'حكومي', damage: 'Shattered human souls', damageAr: 'أرواح بشرية محطمة',
        illustrationEn: "The true horror of MKUltra wasn't just the mind-control experiments, but what was destroyed when the director ordered all files burned in 1973. The few surviving documents hint at unspeakable psychological torture, induced amnesia, and the creation of split-personality sleeper agents. The most terrifying aspect is the unknown: we only know the surface level of the atrocities. The true depths of the project remain forever hidden.",
        illustrationAr: "الرعب الحقيقي لمشروع إم كي ألترا لم يكن مجرد تجارب التحكم في العقل، بل ما تم تدميره عندما أمر المدير بحرق جميع الملفات في ١٩٧٣. تلمح الوثائق القليلة الناجية إلى تعذيب نفسي لا يوصف، وفقدان ذاكرة مستحث، وخلق عملاء نائمين بشخصيات منقسمة. الجانب الأكثر رعباً هو المجهول: نحن نعرف فقط المستوى السطحي للفظائع. وتبقى الأعماق الحقيقية للمشروع مخفية إلى الأبد."
      },
      { id: 87, title: 'The Voynich Manuscript', titleAr: 'مخطوطة فوينيتش', year: '15th C.', domain: 'Cryptic', domainAr: 'غامض', damage: 'Eternal unsolvable mystery', damageAr: 'لغز أبدي لا يُحل',
        illustrationEn: "A medieval manuscript filled with illustrations of alien plants, naked women bathing in strange plumbing systems, and astrological charts of unknown star systems. It is written in a completely undecipherable script. Cryptographers, linguists, and AI supercomputers have spent a century trying to crack it and failed. It is a terrifying artifact that shouldn't exist, a transmission from an alternate reality or an unhinged genius.",
        illustrationAr: "مخطوطة من العصور الوسطى مليئة برسوم توضيحية لنباتات غريبة، ونساء عاريات يستحمن في أنظمة سباكة غريبة، وخرائط فلكية لأنظمة نجوم غير معروفة. إنها مكتوبة بنص لا يمكن فك شفرته تماماً. أمضى خبراء التشفير واللغويون وأجهزة الكمبيوتر الفائقة الذكاء الاصطناعي قرناً في محاولة اختراقها وفشلوا. إنها قطعة أثرية مرعبة لا ينبغي أن تكون موجودة، إرسال من واقع بديل أو عبقري مختل."
      }
    ]
  }
];

export const LAYER_8_PHASE_2_CASES: CaseStudy[] = [
  { id: 88, title: "Roko's Basilisk", titleAr: 'بازيليسك روكو', year: '2010', domain: 'Information Hazard', domainAr: 'خطر معلوماتي', damage: 'Existential dread', damageAr: 'رعب وجودي',
    illustrationEn: "A thought experiment suggesting that an all-powerful artificial intelligence of the future will retroactively punish those who did not help bring it into existence. Merely knowing about the Basilisk makes you a target, turning the information itself into a deadly psychological hazard that has induced panic attacks and mental breakdowns in those who read it.",
    illustrationAr: "تجربة فكرية تقترح أن ذكاءً اصطناعياً كلي القدرة في المستقبل سيعاقب بأثر رجعي أولئك الذين لم يساعدوا في إيجاده. مجرد معرفتك بالبازيليسك يجعلك هدفاً، مما يحول المعلومات ذاتها إلى خطر نفسي مميت أثار نوبات هلع وانهيارات عقلية لمن قرأ عنها."
  },
  { id: 89, title: 'Terminal Lucidity', titleAr: 'اليقظة النهائية', year: 'Medical History', domain: 'Neurological Anomaly', domainAr: 'شذوذ عصبي', damage: 'Unexplainable consciousness', damageAr: 'وعي لا يمكن تفسيره',
    illustrationEn: "Patients with severe, end-stage dementia or catastrophic brain damage suddenly regain perfect mental clarity, memory, and personality shortly before death. Their physical brains are entirely destroyed, incapable of producing consciousness according to modern science, yet they wake up to say goodbye. It terrifies neurologists because it suggests consciousness might exist independently of the physical brain.",
    illustrationAr: "مرضى الخرف الحاد في مراحله المتأخرة أو التلف الدماغي الكارثي يستعيدون فجأة صفاءً ذهنياً وذاكرة وشخصية مثالية قبل الموت بوقت قصير. أدمغتهم المادية مدمرة تماماً، وغير قادرة على إنتاج الوعي وفقاً للعلم الحديث، ومع ذلك يستيقظون لتوديع أحبائهم. هذا يرعب أطباء الأعصاب لأنه يشير إلى أن الوعي قد يوجد بشكل مستقل عن الدماغ المادي."
  },
  { id: 90, title: 'The Backrooms Phenomenon', titleAr: 'ظاهرة الغرف الخلفية', year: '2019+', domain: 'Liminal Horror', domainAr: 'رعب مساحي', damage: 'Spatial paranoia', damageAr: 'جنون ارتياب مكاني',
    illustrationEn: "A collective psychological obsession with 'nocliping' out of reality into a dimension of infinite, empty office spaces humming with fluorescent lights. It represents a primal fear of being trapped in artificial, endless non-places that defy physical laws. The horror doesn't come from monsters, but from the unbearable, soul-crushing isolation of an infinite liminal void.",
    illustrationAr: "هوس نفسي جماعي بـ'الانزلاق' خارج الواقع إلى بُعد من المساحات المكتبية الفارغة واللانهائية التي تطن بأضواء الفلورسنت. إنها تمثل خوفاً فطرياً من أن تُحاصر في أماكن اصطناعية لا نهائية تتحدى القوانين الفيزيائية. لا ينبع الرعب من الوحوش، بل من العزلة التي لا تُحتمل وتسحق الروح في فراغ حدودي لا نهائي."
  },
  { id: 91, title: 'Capgras Delusion', titleAr: 'وهم كابجراس', year: '1923', domain: 'Psychiatric Decay', domainAr: 'تدهور نفسي', damage: 'Absolute distrust', damageAr: 'انعدام ثقة مطلق',
    illustrationEn: "A terrifying neurological condition where a person holds a delusion that a friend, spouse, parent, or other close family member has been replaced by an identical impostor. They recognize the face perfectly, but the emotional connection is mysteriously severed. Victims live in absolute terror, believing their true loved ones have been abducted and replaced by flawless replicas.",
    illustrationAr: "حالة عصبية مرعبة حيث يعاني الشخص من وهم بأن صديقاً، أو زوجاً، أو والداً، أو أي فرد من العائلة المقربين قد تم استبداله بمحتال متطابق. يتعرفون على الوجه تماماً، لكن الارتباط العاطفي ينقطع بغموض. يعيش الضحايا في رعب مطلق، معتقدين أن أحباءهم الحقيقيين قد اختطفوا واستبدلوا بنسخ لا تشوبها شائبة."
  },
  { id: 92, title: 'Dead Internet Theory', titleAr: 'نظرية الإنترنت الميت', year: '2021+', domain: 'Digital Solipsism', domainAr: 'أنانية رقمية', damage: 'Complete digital isolation', damageAr: 'عزلة رقمية كاملة',
    illustrationEn: "A growing dread that the internet 'died' years ago, and almost all human activity has been replaced by AI bots talking to other AI bots. The theory suggests that your interactions, the content you consume, and the arguments you have online are entirely orchestrated by synthetic entities manipulating you. It leaves individuals feeling utterly alone in a simulated digital wasteland.",
    illustrationAr: "رعب متزايد من أن الإنترنت 'مات' منذ سنوات، وأن كل النشاط البشري تقريباً قد استُبدل بروبوتات ذكاء اصطناعي تتحدث مع روبوتات أخرى. تشير النظرية إلى أن تفاعلاتك، والمحتوى الذي تستهلكه، والجدالات التي تخوضها عبر الإنترنت يتم تنسيقها بالكامل بواسطة كيانات اصطناعية تتلاعب بك. تترك الأفراد يشعرون بالوحدة التامة في أرض قاحلة رقمية محاكاة."
  },
  { id: 93, title: 'Sleep Paralysis Entities', titleAr: 'كيانات شلل النوم', year: 'Ancient+', domain: 'Nightmarish Reality', domainAr: 'واقع كابوسي', damage: 'Dreams invading reality', damageAr: 'تداخل الأحلام والواقع',
    illustrationEn: "Across completely isolated cultures throughout history, victims of sleep paralysis report seeing the exact same terrifying entities: the Old Hag or the Hat Man. The impossibility of disconnected civilizations sharing the precise visual details of these shadowy figures has led to deeply unsettling questions. Is it a glitch in human neuroanatomy, or are we momentarily peering into a darker, parallel dimension?",
    illustrationAr: "عبر ثقافات معزولة تماماً على مر التاريخ، أبلغ ضحايا شلل النوم عن رؤية نفس الكيانات المرعبة تماماً: العجوز الشمطاء أو رجل القبعة. استحالة اشتراك حضارات منفصلة في التفاصيل البصرية الدقيقة لهذه الشخصيات المظلمة أدت إلى أسئلة مقلقة للغاية. هل هو خلل في التشريح العصبي البشري، أم أننا نختلس النظر للحظات في بُعد موازٍ مظلم؟"
  },
  { id: 94, title: 'Fatal Familial Insomnia', titleAr: 'الأرق العائلي المميت', year: '1986', domain: 'Genetic Doom', domainAr: 'هلاك جيني', damage: 'Inescapable awake death', damageAr: 'موت يقظ لا مفر منه',
    illustrationEn: "A terrifying, incurable prion disease that completely destroys a person's ability to sleep. Over the course of months, the victim slowly descends into waking delirium, panic attacks, and severe hallucinations, remaining fully conscious of their deteriorating mind. It is a slow, excruciating march toward death driven by biological exhaustion, with no known cure or escape.",
    illustrationAr: "مرض بريون مرعب وغير قابل للشفاء يدمر تماماً قدرة الشخص على النوم. على مدار أشهر، ينحدر الضحية ببطء إلى هذيان اليقظة، ونوبات الهلع، والهلوسة الشديدة، مع بقائه واعياً تماماً بعقله المتدهور. إنه زحف بطيء ومؤلم نحو الموت مدفوعاً بالإرهاق البيولوجي، دون أي علاج معروف أو مهرب."
  },
  { id: 95, title: 'The Abyssal Entities', titleAr: 'كيانات الهاوية', year: '1997', domain: 'Oceanographic Horror', domainAr: 'رعب أوقيانوغرافي', damage: 'Fear of the unseen', damageAr: 'الخوف من غير المرئي',
    illustrationEn: "Unexplainable ultra-low-frequency underwater sounds, like 'The Bloop,' detected across thousands of miles of ocean. While scientists claim icequakes, the acoustic profiles initially matched massive, biological origins. The realization that over 80% of our oceans remain unexplored breeds existential dread—there could be unfathomably colossal entities resting in the abyssal plains, completely hidden from human perception.",
    illustrationAr: "أصوات مائية منخفضة التردد جداً لا يمكن تفسيرها، مثل 'ذا بلوب'، تم رصدها عبر آلاف الأميال في المحيط. ورغم أن العلماء ادعوا أنها زلازل جليدية، إلا أن السمات الصوتية تطابقت في البداية مع أصول بيولوجية ضخمة. إن إدراك أن أكثر من ٨٠٪ من محيطاتنا لا يزال غير مستكشف يولد رعباً وجودياً—قد تكون هناك كيانات هائلة الحجم بشكل لا يمكن تصوره تستريح في سهول الهاوية، مخفية تماماً عن الإدراك البشري."
  },
  { id: 96, title: 'Dark Forest Hypothesis', titleAr: 'فرضية الغابة المظلمة', year: '2008', domain: 'Cosmic Survival', domainAr: 'بقاء كوني', damage: 'Fear of cosmic annihilation', damageAr: 'خوف من الإبادة الكونية',
    illustrationEn: "A terrifying solution to the Fermi Paradox. It posits that the universe is a 'dark forest' full of armed hunters. Every civilization must remain utterly silent, because the moment a species broadcasts its location, a more advanced predator civilization will instantly annihilate them to eliminate potential future threats. Humanity has been shouting into the dark for decades.",
    illustrationAr: "حل مرعب لمفارقة فيرمي. يفترض أن الكون هو 'غابة مظلمة' مليئة بالصيادين المسلحين. يجب أن تظل كل حضارة صامتة تماماً، لأنه في اللحظة التي تبث فيها أي فصيلة موقعها، ستبيدها حضارة مفترسة أكثر تقدماً على الفور للقضاء على التهديدات المستقبلية المحتملة. لقد ظلت البشرية تصرخ في الظلام لعقود."
  },
  { id: 97, title: 'The Last Tuesday Enigma', titleAr: 'لغز الثلاثاء الماضي', year: 'Philosophical', domain: 'Epistemology', domainAr: 'نظرية المعرفة', damage: 'Reality fragmentation', damageAr: 'تشظي الواقع',
    illustrationEn: "The terrifying concept that the entire universe, including your memories, history books, and the light from distant stars, was created exactly last Tuesday. There is no scientific, logical, or physical way to prove this isn't true. It strips away all certainty, leaving you with the chilling realization that your entire past might be a perfectly fabricated illusion implanted moments ago.",
    illustrationAr: "المفهوم المرعب بأن الكون بأسره، بما في ذلك ذكرياتك، وكتب التاريخ، والضوء القادم من النجوم البعيدة، قد خُلق بالضبط يوم الثلاثاء الماضي. لا توجد طريقة علمية أو منطقية أو فيزيائية لإثبات عدم صحة ذلك. إنه يجردك من كل يقين، ويتركك مع الإدراك المخيف بأن ماضيك بأكمله قد يكون وهماً ملفقاً بدقة زُرع قبل لحظات."
  },
  { id: 98, title: 'Simulation Reset Theory', titleAr: 'نظرية إعادة ضبط المحاكاة', year: '2003+', domain: 'Simulated Reality', domainAr: 'الواقع المحاكى', damage: 'Spontaneous non-existence', damageAr: 'عدم الوجود التلقائي',
    illustrationEn: "If our reality is a highly advanced computer simulation, we are fundamentally at the mercy of the programmers. The terrifying aspect is the 'reset' hypothesis: if the simulation reaches a designated endpoint, encounters an error, or the researchers simply lose funding, the entire universe could be deleted in less than a Planck instant. You wouldn't even know it happened.",
    illustrationAr: "إذا كان واقعنا عبارة عن محاكاة حاسوبية متقدمة للغاية، فنحن تحت رحمة المبرمجين بشكل أساسي. الجانب المرعب هو فرضية 'إعادة الضبط': إذا وصلت المحاكاة إلى نقطة نهاية محددة، أو واجهت خطأ، أو ببساطة فقد الباحثون التمويل، فقد يتم حذف الكون بأكمله في أقل من لحظة بلانك. لن تعرف حتى أن ذلك قد حدث."
  },
  { id: 99, title: 'The Egregores', titleAr: 'الإيغريغور (الكيانات الفكرية)', year: 'Occult/Psych', domain: 'Mass Mind', domainAr: 'العقل الجمعي', damage: 'Loss of free will', damageAr: 'فقدان الإرادة الحرة',
    illustrationEn: "An Egregore is an autonomous psychic entity created by the collective thoughts of a group of people. Once created, it takes on a life of its own and begins to manipulate the group to feed it more energy. Modern corporations, political movements, and social media algorithms operate exactly like Egregores, parasitically controlling human behavior to sustain their own terrifying, non-physical existence.",
    illustrationAr: "الإيغريغور هو كيان نفسي مستقل يتم إنشاؤه بواسطة الأفكار الجماعية لمجموعة من الناس. بمجرد إنشائه، يأخذ حياة خاصة به ويبدأ في التلاعب بالمجموعة لتغذيته بمزيد من الطاقة. تعمل الشركات الحديثة والحركات السياسية وخوارزميات السوشيال ميديا تماماً مثل الإيغريغور، حيث تتحكم بشكل طفيلي في السلوك البشري للحفاظ على وجودها المرعب وغير المادي."
  }
];

/* ── Defense Protocols ─────────────────────────────────────── */

export const DEFENSE_PROTOCOLS = [
  { layer: 1, layerAr: '١', attack: 'Complete fabrication', attackAr: 'كذب مطلق', defense: 'SIFT: Stop, Investigate, Find, Trace', defenseAr: 'توقف، حقق، ابحث، تتبع' },
  { layer: 2, layerAr: '٢', attack: 'Biased lens', attackAr: 'عدسة منحازة', defense: 'Ask: "What are they NOT showing?"', defenseAr: 'اسأل: "ما الذي لا يُظهرونه؟"' },
  { layer: 3, layerAr: '٣', attack: 'Stripped context', attackAr: 'سياق مقتطع', defense: 'Always read the FULL source', defenseAr: 'اقرأ المصدر الكامل دائماً' },
  { layer: 4, layerAr: '٤', attack: 'Weaponized timing', attackAr: 'توقيت مسلّح', defense: 'Ask: "Why NOW? Who benefits?"', defenseAr: 'اسأل: "لماذا الآن؟ من المستفيد؟"' },
  { layer: 5, layerAr: '٥', attack: 'Evil application', attackAr: 'تطبيق شرير', defense: 'Demand ethical oversight', defenseAr: 'طالب برقابة أخلاقية' },
  { layer: 6, layerAr: '٦', attack: 'The matrix', attackAr: 'المصفوفة', defense: 'Build diverse info networks; ask HOW, not WHAT', defenseAr: 'ابنِ شبكات معلومات متنوعة؛ اسأل كيف لا ماذا' },
  { layer: 7, layerAr: '٧', attack: 'The Architects (Zero Freedom)', attackAr: 'المهندسون (صفر حرية)', defense: 'Total Systemic Disconnect: Refuse the rails', defenseAr: 'انفصال نظامي كامل: ارفض المسارات' },
];
