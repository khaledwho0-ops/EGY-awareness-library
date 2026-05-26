/**
 * DeepReal Exercises — Days 4-14
 * Framework: §10.2, §13.2, §16.2
 *
 * Distribution (§16.2):
 * Days 1-5: Source credibility (5 exercises)
 * Days 6-10: Detection (5 exercises)
 * Days 11-14: Bias identification (4 exercises)
 *
 * Days 1-3 already exist as JSON files.
 * This module provides days 4-14.
 */

export const DEEPREAL_EXERCISES = [
  // ═══════════════════════════════════════════
  // Day 4: Source Credibility — IFCN Code of Principles
  // ═══════════════════════════════════════════
  {
    id: "dr-day-04",
    title: "Evaluating Fact-Checkers: The IFCN Code",
    titleAr: "تقييم مدققي الحقائق: مبادئ IFCN",
    mvp: "deepreal",
    day: 4,
    duration: 12,
    difficulty: "beginner",
    category: "source_credibility",
    learningObjective: "After this exercise, the user will be able to list the 5 IFCN Code of Principles and evaluate whether a fact-checking organization meets these standards.",
    learningObjectiveAr: "بعد هذا التمرين، سيتمكن المستخدم من سرد مبادئ IFCN الخمسة وتقييم ما إذا كانت منظمة تدقيق الحقائق تستوفي هذه المعايير.",
    bloomLevel: "evaluate",
    content: {
      scenario: "Not all fact-checkers are created equal. The International Fact-Checking Network (IFCN) at Poynter has established 5 principles that verified fact-checkers must follow:\n\n1. **Nonpartisanship and Fairness** — Fact-check claims from all sides, not just political opponents.\n2. **Transparency of Sources** — All sources used in each fact-check must be identified so readers can replicate the findings.\n3. **Transparency of Funding & Organization** — Who funds the organization? Who runs it?\n4. **Transparency of Methodology** — A clear, accessible methodology statement explaining their process.\n5. **Open and Honest Corrections** — Published correction policy applied to their own errors.\n\nYour task: You have been given 3 fact-checking organizations. Evaluate each against the 5 principles.",
      scenarioAr: "ليس كل مدققي الحقائق متساوين. وضعت الشبكة الدولية لتدقيق الحقائق (IFCN) في بوينتر 5 مبادئ يجب على مدققي الحقائق المعتمدين اتباعها.",
      task: {
        type: "ranking",
        instructions: "Rank these 3 organizations from MOST to LEAST compliant with IFCN principles based on the information provided.",
        instructionsAr: "رتب هذه المنظمات الثلاث من الأكثر إلى الأقل امتثالاً لمبادئ IFCN.",
        items: [
          { id: "org-a", text: "Organization A: Publishes methodology, names all sources, has a corrections page, discloses all funders, checks claims across political spectrum.", textAr: "المنظمة أ: تنشر المنهجية وتسمي جميع المصادر ولديها صفحة تصحيحات وتكشف عن جميع الممولين وتتحقق من الادعاءات عبر الطيف السياسي.", isCorrect: true, explanation: "Organization A meets all 5 IFCN criteria. This is what a credible fact-checker looks like.", explanationAr: "المنظمة أ تستوفي جميع معايير IFCN الخمسة. هذا هو شكل مدقق الحقائق الموثوق." },
          { id: "org-b", text: "Organization B: Has professional design, viral reach, and famous contributors, but no methodology page, anonymous funding, and only checks opposition claims.", textAr: "المنظمة ب: لديها تصميم احترافي وانتشار فيروسي ومساهمون مشهورون، لكن بدون صفحة منهجية أو تمويل مجهول وتتحقق فقط من ادعاءات المعارضة.", isCorrect: false, explanation: "Organization B fails on transparency (no methodology, anonymous funding) and nonpartisanship (one-sided checking). Professional appearance ≠ credibility.", explanationAr: "المنظمة ب تفشل في الشفافية (بدون منهجية أو تمويل مجهول) وعدم الحياد (تحقق من جانب واحد). المظهر الاحترافي ≠ المصداقية." },
          { id: "org-c", text: "Organization C: Provides sources for most checks, has a vague corrections policy, discloses some funders, but has no methodology page.", textAr: "المنظمة ج: توفر مصادر لمعظم الفحوصات ولديها سياسة تصحيحات غامضة وتكشف عن بعض الممولين، لكن بدون صفحة منهجية.", isCorrect: false, explanation: "Organization C is partially compliant but missing critical transparency (methodology, full funding disclosure). Partial compliance is better than none, but still not IFCN-ready.", explanationAr: "المنظمة ج ممتثلة جزئياً لكنها تفتقر إلى الشفافية الحرجة (المنهجية، الكشف الكامل عن التمويل). الامتثال الجزئي أفضل من لا شيء، لكنها لا تزال غير جاهزة لـ IFCN." }
        ]
      },
      feedback: {
        correct: "Well done! You've identified that credibility comes from verifiable transparency, not from appearance or popularity. IFCN signatory status is currently the strongest shortcut for evaluating fact-checkers.",
        correctAr: "أحسنت! لقد حددت أن المصداقية تأتي من الشفافية القابلة للتحقق، وليس من المظهر أو الشعبية.",
        incorrect: "Look more carefully at the 5 IFCN criteria. A professional appearance doesn't mean credibility — check for methodology, funding disclosure, and correction policies.",
        incorrectAr: "انظر بعناية أكبر إلى معايير IFCN الخمسة. المظهر الاحترافي لا يعني المصداقية."
      }
    },
    whatNotToDo: [
      "Don't assume a well-designed website means a credible fact-checker",
      "Don't rely on popularity or follower count to judge fact-checker quality"
    ],
    whatNotToDoAr: [
      "لا تفترض أن موقع ويب ذا تصميم جيد يعني مدقق حقائق موثوقاً",
      "لا تعتمد على الشعبية أو عدد المتابعين للحكم على جودة مدقق الحقائق"
    ],
    keyhunterId: "dr-kh-04",
    evidence: "Poynter Institute. IFCN Code of Principles. https://ifcncodeofprinciples.poynter.org/",
    safetyNote: null,
    trackConfidence: true,
    requiresEightGate: false
  },

  // Day 5: Source Credibility — Evidence Hierarchy
  {
    id: "dr-day-05",
    title: "The Evidence Pyramid: Not All Sources Are Equal",
    titleAr: "هرم الأدلة: ليست كل المصادر متساوية",
    mvp: "deepreal",
    day: 5,
    duration: 14,
    difficulty: "intermediate",
    category: "source_credibility",
    learningObjective: "After this exercise, the user will be able to classify evidence sources into tiers (systematic review → RCT → observational → expert opinion → anecdote) and identify when a claim overstates its evidence level.",
    learningObjectiveAr: "بعد هذا التمرين، سيتمكن المستخدم من تصنيف مصادر الأدلة إلى مستويات وتحديد متى يبالغ ادعاء ما في مستوى أدلته.",
    bloomLevel: "analyze",
    content: {
      scenario: "Evidence comes in different strengths. A single anecdote ('my uncle tried this and it worked') is NOT the same as a systematic review of 50 randomized controlled trials.\n\nEvidence Quality Ladder:\n1. **Systematic Reviews / Meta-Analyses** — Combine results from multiple studies\n2. **Randomized Controlled Trials (RCTs)** — Gold standard experiments\n3. **Cohort / Case-Control Studies** — Observational evidence\n4. **Expert Opinion / Guidelines** — Professional judgment\n5. **Anecdotes / Testimonials** — Individual stories (weakest evidence)\n\nImportant: Something can be TRUE but poorly supported. And something can SEEM well-supported but be from a single cherry-picked study.",
      scenarioAr: "الأدلة تأتي بقوى مختلفة. حكاية واحدة ('عمي جرب هذا ونجح') ليست مثل مراجعة منهجية لـ 50 تجربة عشوائية محكومة.",
      task: {
        type: "matching",
        instructions: "For each claim below, identify the EVIDENCE TIER that is actually supporting it. Be careful — the claim may sound scientific but the evidence behind it may be weak.",
        instructionsAr: "لكل ادعاء أدناه، حدد مستوى الأدلة الذي يدعمه فعلياً.",
        items: [
          { id: "ev-1", text: "'A meta-analysis of 30 studies found that this intervention reduces anxiety by 25%.' → TIER: Systematic Review (Tier 1)", textAr: "'أظهر تحليل تلوي لـ 30 دراسة أن هذا التدخل يقلل القلق بنسبة 25٪.' → المستوى: المراجعة المنهجية (المستوى 1)", isCorrect: true, explanation: "Correct. A meta-analysis of 30 studies is top-tier evidence — but you should still check the source journal, publication date, and whether the studies are high-quality.", explanationAr: "صحيح. التحليل التلوي لـ 30 دراسة هو أدلة من المستوى الأعلى — لكن يجب التحقق من المجلة المصدر وتاريخ النشر وجودة الدراسات." },
          { id: "ev-2", text: "'A famous doctor on TV recommends this supplement for better sleep.' → TIER: Expert Opinion (Tier 4)", textAr: "'طبيب مشهور على التلفزيون يوصي بهذا المكمل الغذائي لنوم أفضل.' → المستوى: رأي الخبير (المستوى 4)", isCorrect: true, explanation: "Correct. Even a famous doctor's opinion is Tier 4 — expert opinion. Fame does not upgrade evidence quality. Always ask: where is the peer-reviewed study?", explanationAr: "صحيح. حتى رأي طبيب مشهور هو المستوى 4 — رأي الخبير. الشهرة لا ترقي جودة الأدلة. اسأل دائماً: أين الدراسة المحكّمة؟" },
          { id: "ev-3", text: "'My friend tried cold showers and her depression went away.' → TIER: Anecdote (Tier 5)", textAr: "'صديقتي جربت الاستحمام بالماء البارد وزال اكتئابها.' → المستوى: قصة شخصية (المستوى 5)", isCorrect: true, explanation: "Correct. This is an anecdote (Tier 5). It may be sincere but proves nothing about the general population. Anecdotes are starting points for hypotheses, not conclusions.", explanationAr: "صحيح. هذه قصة شخصية (المستوى 5). قد تكون صادقة لكنها لا تثبت شيئاً عن عامة السكان. القصص الشخصية نقاط بداية للفرضيات، ليست استنتاجات." },
          { id: "ev-4", text: "'A study in a peer-reviewed journal found X.' → Could be Tier 2 OR Tier 3, depending on study design", textAr: "'وجدت دراسة في مجلة محكّمة X.' → يمكن أن يكون المستوى 2 أو 3، حسب تصميم الدراسة", isCorrect: true, explanation: "Correct! 'A study' could be an RCT (Tier 2) or observational (Tier 3). The word 'study' alone tells you very little. Always check: was it randomized? How many participants? Was it replicated?", explanationAr: "صحيح! 'دراسة' يمكن أن تكون تجربة عشوائية (المستوى 2) أو رصدية (المستوى 3). كلمة 'دراسة' وحدها تخبرك القليل جداً. تحقق دائماً: هل كانت عشوائية؟ كم عدد المشاركين؟ هل تكررت؟" }
        ]
      },
      feedback: {
        correct: "Excellent evidence literacy! The key insight: the level of evidence matters more than how convincing something sounds. Always ask: what TYPE of study supports this claim?",
        correctAr: "ممتاز! النقطة الأساسية: مستوى الأدلة أهم من مدى إقناع الادعاء. دائماً اسأل: ما نوع الدراسة التي تدعم هذا الادعاء؟",
        incorrect: "Review the evidence quality ladder. Remember: something can sound impressive ('a study found...') but actually be based on weak evidence.",
        incorrectAr: "راجع سلم جودة الأدلة. تذكر: شيء قد يبدو مثيراً للإعجاب ('وجدت دراسة...') لكنه مبني على أدلة ضعيفة."
      }
    },
    whatNotToDo: [
      "Don't assume 'a study says' means strong evidence — check the study design",
      "Don't confuse the authority of the speaker with the quality of the evidence"
    ],
    whatNotToDoAr: [
      "لا تفترض أن 'تقول دراسة' يعني أدلة قوية — تحقق من تصميم الدراسة",
      "لا تخلط بين سلطة المتحدث وجودة الأدلة"
    ],
    keyhunterId: "dr-kh-05",
    evidence: "Murad, M.H., et al. (2016). New evidence pyramid. BMJ Evidence-Based Medicine, 21(4), 125-127.",
    safetyNote: null,
    trackConfidence: true,
    requiresEightGate: false
  },

  // Day 6: Detection — Reverse Image Search
  {
    id: "dr-day-06",
    title: "Reverse Image Search: When Pictures Lie",
    titleAr: "البحث العكسي عن الصور: عندما تكذب الصور",
    mvp: "deepreal",
    day: 6,
    duration: 12,
    difficulty: "intermediate",
    category: "detection",
    learningObjective: "After this exercise, the user will be able to perform a reverse image search workflow and identify when an image has been taken out of context, recycled, or manipulated.",
    learningObjectiveAr: "بعد هذا التمرين، سيتمكن المستخدم من إجراء بحث عكسي عن الصور وتحديد متى تم استخدام صورة خارج سياقها أو إعادة تدويرها أو التلاعب بها.",
    bloomLevel: "apply",
    content: {
      scenario: "A viral post shows a dramatic photograph with the caption: 'This explosion happened today in Cairo!' It has thousands of shares. But is the image real? Is it from today? Is it from Cairo?\n\nReverse Image Search Workflow:\n1. **Right-click → Search image** (Google, TinEye, Yandex)\n2. **Check earliest occurrence** — When was this image first published online?\n3. **Check context** — Was it originally from a different country, year, or event?\n4. **Check metadata** — Can you access EXIF data (date, camera, GPS)?\n5. **Check modifications** — Are there signs of cropping, splicing, or editing?\n\nTools: Google Lens, TinEye.com, Yandex Images, InVID/WeVerify plugin",
      scenarioAr: "منشور فيروسي يعرض صورة مثيرة مع تعليق: 'هذا الانفجار حدث اليوم في القاهرة!' حصل على آلاف المشاركات. لكن هل الصورة حقيقية؟",
      task: {
        type: "scenario_response",
        instructions: "You performed a reverse image search on the 'Cairo explosion' photo. Here are the results. What do they tell you?",
        instructionsAr: "أجريت بحثاً عكسياً عن صورة 'انفجار القاهرة'. إليك النتائج. ماذا تخبرك؟",
        items: [
          { id: "ris-1", text: "Result: The SAME image appears in a 2019 news report about a gas cylinder explosion in Beirut.", isCorrect: true, explanation: "This image is RECYCLED. It's from a different country (Lebanon, not Egypt) and a different year (2019, not today). This is called 'context stripping' — using a real image with a false caption." },
          { id: "ris-2", text: "What should you conclude about the viral post?", isCorrect: true, explanation: "Conclusion: The explosion may or may not have happened in Cairo today, but THIS IMAGE does not prove it. The post used a recycled image to make the claim more convincing. This is one of the most common visual misinformation techniques." },
          { id: "ris-3", text: "What should you do next?", isCorrect: true, explanation: "Next steps: (1) Do NOT share the post. (2) Search news agencies (AP, Reuters, AFP) for reports of a Cairo explosion today. (3) Check official Egyptian sources. (4) Report the misleading post if your platform allows it." }
        ]
      },
      feedback: {
        correct: "Outstanding! You've identified a recycled image — one of the most common visual misinformation techniques. A real image attached to a false claim is far more convincing than an obviously fake image.",
        correctAr: "ممتاز! لقد حددت صورة معاد تدويرها — واحدة من أكثر تقنيات التضليل البصري شيوعاً.",
        incorrect: "Remember: a real image can be used to support a false claim by changing its context. Always check WHEN and WHERE an image was first used.",
        incorrectAr: "تذكر: يمكن استخدام صورة حقيقية لدعم ادعاء كاذب عن طريق تغيير سياقها."
      }
    },
    whatNotToDo: [
      "Don't assume a real-looking image proves a claim — real images are frequently recycled with false captions",
      "Don't rely on a single search engine for reverse image search — use at least 2 (Google + TinEye or Yandex)"
    ],
    keyhunterId: "dr-kh-06",
    evidence: "Wardle, C., & Derakhshan, H. (2017). Information Disorder. Council of Europe. + InVID/WeVerify Project.",
    safetyNote: "This exercise uses a fictional scenario for educational purposes. No real event is being referenced.",
    trackConfidence: true,
    requiresEightGate: true
  },

  // Day 7: Detection — Health Misinformation
  {
    id: "dr-day-07",
    title: "Health Misinformation: When Claims Can Harm",
    titleAr: "التضليل الصحي: عندما تصبح الادعاءات ضارة",
    mvp: "deepreal",
    day: 7,
    duration: 14,
    difficulty: "intermediate",
    category: "detection",
    learningObjective: "After this exercise, the user will be able to identify 5 red flags of health misinformation and distinguish between legitimate health information and misleading health content.",
    learningObjectiveAr: "بعد هذا التمرين، سيتمكن المستخدم من تحديد 5 علامات تحذيرية للتضليل الصحي والتمييز بين المعلومات الصحية المشروعة والمحتوى الصحي المضلل.",
    bloomLevel: "evaluate",
    content: {
      scenario: "Health misinformation is among the most dangerous types because it can directly harm people. The WHO calls it an 'infodemic.'\n\n5 Red Flags of Health Misinformation:\n1. **Miracle cure language** — 'cures all,' 'guaranteed,' '100% effective'\n2. **Conspiracy framing** — 'doctors don't want you to know,' 'big pharma is hiding this'\n3. **Single study overreach** — One study ≠ scientific consensus\n4. **Testimonials over data** — Personal stories replacing systematic evidence\n5. **No author credentials** — Who wrote this? Are they qualified in this field?",
      scenarioAr: "التضليل الصحي من أخطر الأنواع لأنه يمكن أن يضر الناس مباشرة. تسميه منظمة الصحة العالمية 'وباء المعلومات'.",
      task: {
        type: "scenario_response",
        instructions: "Read each health claim below and identify which red flags it triggers (there may be more than one per claim).",
        instructionsAr: "اقرأ كل ادعاء صحي أدناه وحدد العلامات التحذيرية التي يثيرها.",
        items: [
          { id: "hm-1", text: "'This ancient herb cures diabetes, heart disease, and cancer — Big Pharma doesn't want you to know!'", isCorrect: true, explanation: "Red flags: (1) Miracle cure language – 'cures' three major diseases. (2) Conspiracy framing – 'Big Pharma doesn't want you to know.' (3) No citations or evidence tier mentioned." },
          { id: "hm-2", text: "'A new randomized controlled trial published in The Lancet found that intervention X reduced symptom Y by 15% compared to placebo.'", isCorrect: true, explanation: "This is legitimate reporting. It names the journal (The Lancet), the study type (RCT), the specific effect size (15%), and the comparison (placebo). However, one study alone requires replication." },
          { id: "hm-3", text: "'My neighbor took this supplement and her arthritis completely disappeared in 3 days. You should try it too!'", isCorrect: true, explanation: "Red flags: (1) Testimonial replacing data. (2) Miracle cure implication ('completely disappeared in 3 days'). (3) No professional recommendation or evidence citation." }
        ]
      },
      feedback: {
        correct: "Excellent! You can now spot health misinformation red flags. Remember: for health decisions, always consult qualified healthcare professionals and look for peer-reviewed evidence, not testimonials.",
        correctAr: "ممتاز! يمكنك الآن اكتشاف علامات التضليل الصحي. تذكر: لقرارات صحية، استشر دائماً متخصصين مؤهلين.",
        incorrect: "Review the 5 red flags. The key distinction is between evidence-based claims (with citations, study design, specific effects) and misleading claims (miracle language, conspiracy, testimonials).",
        incorrectAr: "راجع العلامات التحذيرية الخمسة. التمييز الأساسي بين الادعاءات المبنية على الأدلة والادعاءات المضللة."
      }
    },
    whatNotToDo: [
      "Don't dismiss all health information online — some sources (WHO, NIMH, NHS) are highly reliable",
      "Don't use this exercise as a substitute for professional medical advice"
    ],
    keyhunterId: "dr-kh-07",
    evidence: "WHO (2020). Managing the COVID-19 infodemic. https://www.who.int/news/item/23-09-2020",
    safetyNote: "This exercise is for educational purposes only. For health decisions, consult a qualified healthcare professional.",
    trackConfidence: true,
    requiresEightGate: true
  },

  // Day 8: Detection — Audio Deepfakes
  {
    id: "dr-day-08",
    title: "Audio Deepfakes: Can You Trust What You Hear?",
    titleAr: "التزييف الصوتي العميق: هل يمكنك الوثوق بما تسمعه؟",
    mvp: "deepreal",
    day: 8,
    duration: 12,
    difficulty: "intermediate",
    category: "detection",
    learningObjective: "After this exercise, the user will be able to identify at least 3 indicators of AI-generated or cloned audio and understand the verification steps for audio content.",
    learningObjectiveAr: "بعد هذا التمرين، سيتمكن المستخدم من تحديد 3 مؤشرات على الأقل للصوت المولد بالذكاء الاصطناعي.",
    bloomLevel: "analyze",
    content: {
      scenario: "Voice cloning technology now allows anyone to create realistic imitations of a person's voice with just a few minutes of sample audio. This is used for fraud, political manipulation, and impersonation.\n\nKey Detection Indicators:\n1. **Unnatural pauses or pacing** — AI speech may have odd rhythm\n2. **Missing breath sounds** — Real speech includes breathing; AI often doesn't\n3. **Flat prosody** — Monotone emotional expression or exaggerated emphasis in wrong places\n4. **Background inconsistency** — Mismatch between claimed setting and audio environment\n5. **Verification question** — Can you confirm through a second channel (call the person directly)?",
      scenarioAr: "تسمح تقنية استنساخ الصوت الآن لأي شخص بإنشاء تقليد واقعي لصوت شخص ما.",
      task: {
        type: "scenario_response",
        instructions: "A voice message is circulating claiming to be from a university official announcing exam cancellations. Apply the audio verification checklist.",
        instructionsAr: "رسالة صوتية متداولة تدعي أنها من مسؤول جامعي يعلن إلغاء الامتحانات. طبق قائمة التحقق من الصوت.",
        items: [
          { id: "aud-1", text: "Check: Does the audio have natural breathing patterns between sentences?", isCorrect: true, explanation: "Essential check. AI-generated audio often lacks natural breathing patterns. Real speech includes inhales, especially between longer sentences." },
          { id: "aud-2", text: "Check: Can you verify through the university's official communication channels?", isCorrect: true, explanation: "Most important step. Never rely solely on audio. Check the university's official website, email, or hotline to confirm any announcement." },
          { id: "aud-3", text: "Check: Does the emotional tone match the content and situation?", isCorrect: true, explanation: "Important. An official announcement about exam cancellations would likely be measured and formal, not panicked or overly casual. Mismatched tone is a red flag." }
        ]
      },
      feedback: {
        correct: "Great awareness! Audio deepfakes are becoming increasingly sophisticated. The most reliable defense is always cross-verification through official channels, not relying on audio alone.",
        correctAr: "وعي ممتاز! التزييف الصوتي العميق يزداد تطوراً. الدفاع الأكثر موثوقية هو التحقق المتبادل عبر القنوات الرسمية.",
        incorrect: "Remember: when audio seems suspicious, the strongest check is always verifying through a separate, official channel. Technology alone cannot catch all deepfakes.",
        incorrectAr: "تذكر: عندما يبدو الصوت مشبوهاً، أقوى فحص هو التحقق عبر قناة رسمية منفصلة."
      }
    },
    whatNotToDo: [
      "Don't forward voice messages without verification — especially those announcing official decisions",
      "Don't assume 'it sounds real' means it IS real — AI voice cloning is highly convincing"
    ],
    keyhunterId: "dr-kh-08",
    evidence: "Yi, J., et al. (2023). Audio deepfake detection: A survey. arXiv:2308.14970.",
    safetyNote: "This exercise uses a fictional scenario. Always verify official announcements through institutional channels.",
    trackConfidence: true,
    requiresEightGate: false
  },

  // Day 9: Detection — Inoculation/Prebunking
  {
    id: "dr-day-09",
    title: "Inoculation: Building Immunity to Manipulation",
    titleAr: "التلقيح: بناء مناعة ضد التلاعب",
    mvp: "deepreal",
    day: 9,
    duration: 14,
    difficulty: "intermediate",
    category: "detection",
    learningObjective: "After this exercise, the user will be able to explain inoculation theory as a psychological vaccination against misinformation and recognize 3 common manipulation techniques (emotional language, false authority, conspiracy logic).",
    learningObjectiveAr: "بعد هذا التمرين، سيتمكن المستخدم من شرح نظرية التلقيح كتطعيم نفسي ضد التضليل وتمييز 3 تقنيات تلاعب شائعة.",
    bloomLevel: "understand",
    content: {
      scenario: "Inoculation Theory (McGuire, 1961; van der Linden, 2022) works like a vaccine:\n\n1. **Warn** — Alert the person that a manipulation attempt is coming\n2. **Expose** — Show a weakened version of the manipulation technique\n3. **Refute** — Practice identifying and countering the technique\n\nThis builds 'psychological antibodies' — the ability to recognize manipulation before it works.\n\n3 Common Manipulation Techniques:\n- **Emotional Language**: Using fear, outrage, or urgency to bypass critical thinking\n- **False Authority**: Citing fake experts or misusing credentials\n- **Conspiracy Logic**: 'They don't want you to know' + unfalsifiable claims",
      scenarioAr: "نظرية التلقيح (ماكغواير، 1961؛ فان دير ليندن، 2022) تعمل مثل اللقاح.",
      task: {
        type: "scenario_response",
        instructions: "For each example below, identify which manipulation technique is being used.",
        instructionsAr: "لكل مثال أدناه، حدد تقنية التلاعب المستخدمة.",
        items: [
          { id: "inoc-1", text: "'URGENT! Share this before it gets deleted! Your family's safety depends on it!' → Technique: Emotional Language (urgency + fear)", isCorrect: true, explanation: "Correct. 'URGENT', 'before it gets deleted', and 'your family's safety' are emotional triggers designed to make you share before thinking. The SIFT 'Stop' step is your defense." },
          { id: "inoc-2", text: "'Dr. James Smith, PhD, Nobel Prize nominee, confirms this product works.' → Technique: False Authority", isCorrect: true, explanation: "Correct. 'Nobel Prize nominee' sounds impressive but is meaningless (nominations are not public). Always verify: what is their actual field? Is their claim supported by peer-reviewed evidence?" },
          { id: "inoc-3", text: "'The mainstream media won't tell you this. The real truth is being suppressed.' → Technique: Conspiracy Logic", isCorrect: true, explanation: "Correct. 'The real truth is being suppressed' is unfalsifiable — any counter-evidence is treated as proof of the conspiracy. This technique self-seals: doubting it becomes evidence of the conspiracy." }
        ]
      },
      feedback: {
        correct: "You've been successfully inoculated against these 3 techniques! Research shows that prebunking (learning to spot techniques before encountering them) is more effective than debunking (correcting after exposure).",
        correctAr: "تم تلقيحك بنجاح ضد هذه التقنيات الثلاث! البحث يظهر أن التلقيح المسبق أكثر فعالية من التصحيح بعد التعرض.",
        incorrect: "Review each technique carefully. The key is to recognize the PATTERN, not just the content. These techniques appear across many different topics.",
        incorrectAr: "راجع كل تقنية بعناية. المفتاح هو التعرف على النمط، وليس المحتوى فقط."
      }
    },
    whatNotToDo: [
      "Don't confuse skepticism with cynicism — inoculation builds critical thinking, not blanket distrust",
      "Don't assume you are immune — even trained people can be manipulated under emotional stress"
    ],
    keyhunterId: "dr-kh-09",
    evidence: "van der Linden, S. (2022). Foolproof: Why Misinformation Infects Our Minds and How to Build Immunity. Norton.",
    safetyNote: null,
    trackConfidence: true,
    requiresEightGate: false
  },

  // Day 10: Detection — Manipulated Statistics
  {
    id: "dr-day-10",
    title: "When Numbers Lie: Spotting Manipulated Statistics",
    titleAr: "عندما تكذب الأرقام: اكتشاف الإحصائيات المتلاعب بها",
    mvp: "deepreal",
    day: 10,
    duration: 14,
    difficulty: "advanced",
    category: "detection",
    learningObjective: "After this exercise, the user will be able to identify 4 common statistical manipulation techniques (truncated axes, cherry-picking, denominator tricks, relative vs. absolute risk) and correctly interpret the underlying data.",
    learningObjectiveAr: "بعد هذا التمرين، سيتمكن المستخدم من تحديد 4 تقنيات شائعة للتلاعب بالإحصائيات.",
    bloomLevel: "evaluate",
    content: {
      scenario: "Statistics can be technically true but deeply misleading. Here are 4 tricks to watch for:\n\n1. **Truncated Y-Axis**: A bar chart that doesn't start at zero can make a 2% difference look like a 200% difference\n2. **Cherry-Picking**: Selecting only data points that support a narrative while ignoring contradictory ones\n3. **Denominator Tricks**: 'Crime doubled!' (from 2 cases to 4 in a city of 1 million)\n4. **Relative vs. Absolute Risk**: 'Risk increased by 50%!' (from 2 in 10,000 to 3 in 10,000 — the ABSOLUTE increase is 0.01%)",
      scenarioAr: "الإحصائيات يمكن أن تكون صحيحة تقنياً لكنها مضللة بشدة.",
      task: {
        type: "scenario_response",
        instructions: "For each claim, identify which statistical manipulation technique is being used and explain what the real data shows.",
        instructionsAr: "لكل ادعاء، حدد تقنية التلاعب الإحصائي المستخدمة.",
        items: [
          { id: "stat-1", text: "'Our product's effectiveness increased by 300%!' (from 1% to 4%)", isCorrect: true, explanation: "Relative risk manipulation. While 300% sounds dramatic, the absolute improvement is only 3 percentage points. Always ask: 'What are the ACTUAL NUMBERS?'" },
          { id: "stat-2", text: "A graph shows GDP growing dramatically, but the Y-axis starts at 98% instead of 0%.", isCorrect: true, explanation: "Truncated Y-axis. Starting at 98% makes a tiny fluctuation look like massive growth. Always check where the axis starts." },
          { id: "stat-3", text: "'Data clearly shows the trend is going up!' — but only 3 of 20 data points are shown.", isCorrect: true, explanation: "Cherry-picking. Showing only selected data points hides the full picture. Always ask: 'What does the COMPLETE dataset show?'" }
        ]
      },
      feedback: {
        correct: "Excellent statistical literacy! You can now see through numerical manipulation. The core lesson: always ask for the ABSOLUTE numbers, the FULL dataset, and the COMPLETE context.",
        correctAr: "ممتاز! يمكنك الآن رؤية ما وراء التلاعب الرقمي.",
        incorrect: "Review each technique. The key question is always: 'What is the full context that makes this statistic misleading?'",
        incorrectAr: "راجع كل تقنية. السؤال الأساسي دائماً: 'ما السياق الكامل الذي يجعل هذا الإحصاء مضللاً؟'"
      }
    },
    whatNotToDo: [
      "Don't ignore statistics entirely — they are essential, just require careful interpretation",
      "Don't assume a percentage increase is automatically meaningful — always ask for the base numbers"
    ],
    keyhunterId: "dr-kh-10",
    evidence: "Huff, D. (1954/2010). How to Lie with Statistics. Norton. + Cairo, A. (2019). How Charts Lie. Norton.",
    safetyNote: null,
    trackConfidence: true,
    requiresEightGate: true
  },

  // Day 11: Bias — Confirmation Bias
  {
    id: "dr-day-11",
    title: "Confirmation Bias: Why We Believe What We Already Think",
    titleAr: "تحيز التأكيد: لماذا نصدق ما نعتقده بالفعل",
    mvp: "deepreal",
    day: 11,
    duration: 14,
    difficulty: "advanced",
    category: "bias",
    learningObjective: "After this exercise, the user will be able to explain confirmation bias, identify it in their own information consumption, and apply at least 2 debiasing strategies.",
    learningObjectiveAr: "بعد هذا التمرين، سيتمكن المستخدم من شرح تحيز التأكيد وتحديده في استهلاكه للمعلومات.",
    bloomLevel: "evaluate",
    content: {
      scenario: "Confirmation Bias (Kahneman, 2011) is the tendency to:\n- **Search for** information that confirms existing beliefs\n- **Interpret** ambiguous evidence as supporting your position\n- **Remember** information that confirms your view while forgetting contradictory evidence\n\nThis is not stupidity — it's how ALL human brains work. Even experts suffer from confirmation bias.\n\nDebiasing Strategies:\n1. **Pre-commitment**: Before searching, write down what would CHANGE your mind\n2. **Steel-manning**: Construct the STRONGEST version of the opposing argument\n3. **Disconfirmation search**: Actively search for evidence AGAINST your current belief",
      scenarioAr: "تحيز التأكيد (كانيمان، 2011) هو الميل للبحث عن معلومات تؤكد المعتقدات الحالية.",
      task: {
        type: "scenario_response",
        instructions: "You strongly believe 'social media is destroying mental health.' Apply the debiasing strategies before concluding.",
        instructionsAr: "أنت تؤمن بشدة أن 'وسائل التواصل الاجتماعي تدمر الصحة النفسية.' طبق استراتيجيات إزالة التحيز.",
        items: [
          { id: "cb-1", text: "Pre-commitment: What evidence would make you change your mind?", isCorrect: true, explanation: "Good start. You might write: 'I would change my mind if meta-analyses show the effect size is negligible, or if the relationship is more nuanced than a simple causal claim.'" },
          { id: "cb-2", text: "Steel-manning: What is the strongest argument that social media is NOT destroying mental health?", isCorrect: true, explanation: "Strong steel-man: 'The largest meta-analyses (Orben, 2020) show the correlation between social media and wellbeing is very small (r ≈ -0.04), active use differs from passive use, and many studies are correlational, not causal.'" },
          { id: "cb-3", text: "Disconfirmation search: Search for 'social media mental health exaggerated' or 'screen time effect size small'", isCorrect: true, explanation: "Excellent. Searching for disconfirming evidence is the hardest but most powerful debiasing technique. It fights the natural pull toward confirmation." }
        ]
      },
      feedback: {
        correct: "Impressive critical thinking! Confirmation bias is one of the hardest biases to overcome because it feels natural. These three strategies make you a more honest information consumer.",
        correctAr: "تفكير نقدي مثير للإعجاب! تحيز التأكيد أحد أصعب التحيزات للتغلب عليها.",
        incorrect: "Confirmation bias is subtle. The key is to actively practice searching for evidence against your own beliefs — this is uncomfortable but essential for accurate thinking.",
        incorrectAr: "تحيز التأكيد خفي. المفتاح هو البحث بنشاط عن أدلة ضد معتقداتك — هذا غير مريح لكنه ضروري."
      }
    },
    whatNotToDo: [
      "Don't assume only 'other people' have confirmation bias — everyone does, including experts",
      "Don't confuse having a strong opinion with being wrong — the issue is whether you sought disconfirming evidence"
    ],
    keyhunterId: "dr-kh-11",
    evidence: "Kahneman, D. (2011). Thinking, Fast and Slow. Farrar, Straus and Giroux.",
    safetyNote: null,
    trackConfidence: true,
    requiresEightGate: true
  },

  // Day 12: Bias — Emotional Manipulation
  {
    id: "dr-day-12",
    title: "Outrage Machines: How Emotions Override Evidence",
    titleAr: "آلات الغضب: كيف تتغلب العواطف على الأدلة",
    mvp: "deepreal",
    day: 12,
    duration: 12,
    difficulty: "advanced",
    category: "bias",
    learningObjective: "After this exercise, the user will be able to identify emotional manipulation patterns in content (fear, outrage, urgency, identity) and practice the 'emotion audit' before forming judgments.",
    learningObjectiveAr: "بعد هذا التمرين، سيتمكن المستخدم من تحديد أنماط التلاعب العاطفي في المحتوى.",
    bloomLevel: "analyze",
    content: {
      scenario: "Research shows moral-emotional content spreads 20% more per word on social media (Brady et al., 2017). Misinformation exploits this by triggering:\n\n- **Fear**: 'Your children are in danger!'\n- **Outrage**: 'They are destroying our values!'\n- **Urgency**: 'Act NOW before it's too late!'\n- **Identity**: 'REAL [identity] would never accept this!'\n\nThe Emotion Audit (§17.4, Gate 7):\nBefore forming a judgment about ANY claim, ask yourself:\n'How does this content make me FEEL right now? Is that feeling helping me think clearly, or is it pushing me toward a quick reaction?'",
      scenarioAr: "البحث يظهر أن المحتوى العاطفي الأخلاقي ينتشر بنسبة 20% أكثر لكل كلمة على وسائل التواصل الاجتماعي.",
      task: {
        type: "scenario_response",
        instructions: "Read each post and identify which emotional trigger it uses and why that matters.",
        instructionsAr: "اقرأ كل منشور وحدد المحفز العاطفي المستخدم.",
        items: [
          { id: "em-1", text: "'WARNING! They are coming for your children's minds through the school curriculum! Share this to every parent you know RIGHT NOW!'", isCorrect: true, explanation: "Triple trigger: (1) Fear ('your children'), (2) Urgency ('RIGHT NOW'), (3) Identity ('every parent'). This combination is designed to bypass analytical thinking and provoke immediate sharing." },
          { id: "em-2", text: "Practice the Emotion Audit: Rate your emotional state (calm-angry, 1-10) BEFORE evaluating the claim above.", isCorrect: true, explanation: "The Emotion Audit creates a pause between feeling and action. If your number is above 6, you should wait before evaluating the claim's content — your emotions are likely interfering with your judgment." }
        ]
      },
      feedback: {
        correct: "Well done! The Emotion Audit is one of your most powerful tools. Remember: strong emotions are not wrong, but they CAN override your critical thinking if you don't pause.",
        correctAr: "أحسنت! التدقيق العاطفي أحد أقوى أدواتك. تذكر: المشاعر القوية ليست خاطئة، لكنها يمكن أن تتغلب على تفكيرك النقدي.",
        incorrect: "Review the emotional triggers. The key insight: the STRONGER your emotional reaction, the MORE likely you should PAUSE before judging.",
        incorrectAr: "راجع المحفزات العاطفية. كلما كان رد فعلك العاطفي أقوى، كلما كان عليك التوقف أكثر قبل إصدار حكم."
      }
    },
    whatNotToDo: [
      "Don't assume 'emotional' means 'false' — some true stories are emotional; the issue is when emotions replace evidence",
      "Don't suppress emotions — simply acknowledge them before evaluating the claim"
    ],
    keyhunterId: "dr-kh-12",
    evidence: "Brady, W.J., et al. (2017). Emotion shapes the diffusion of moralized content in social networks. PNAS, 114(28), 7313-7318.",
    safetyNote: null,
    trackConfidence: true,
    requiresEightGate: true
  },

  // Day 13: Bias — Authority Bias
  {
    id: "dr-day-13",
    title: "Authority Bias: When Credentials Deceive",
    titleAr: "تحيز السلطة: عندما تخدع الشهادات",
    mvp: "deepreal",
    day: 13,
    duration: 12,
    difficulty: "advanced",
    category: "bias",
    learningObjective: "After this exercise, the user will be able to distinguish legitimate authority from false authority and evaluate whether a claimed expert is speaking within their actual domain of expertise.",
    learningObjectiveAr: "بعد هذا التمرين، سيتمكن المستخدم من التمييز بين السلطة المشروعة والسلطة الزائفة.",
    bloomLevel: "evaluate",
    content: {
      scenario: "Authority Bias: We tend to accept claims more readily when they come from perceived authority figures — even when those figures are speaking outside their expertise.\n\nKey Questions to Ask:\n1. **Domain check**: Is this expert qualified in THIS specific field?\n2. **Consensus check**: Do other experts in the same field agree?\n3. **Conflict check**: Does this expert have financial or ideological conflicts of interest?\n4. **Evidence check**: Is the expert citing evidence, or just giving opinions?\n\nRemember: A Nobel Prize in physics does NOT make someone an expert on vaccines.",
      scenarioAr: "تحيز السلطة: نميل لقبول الادعاءات بسهولة أكبر عندما تأتي من شخصيات سلطوية متصورة.",
      task: {
        type: "scenario_response",
        instructions: "Evaluate each 'expert claim' below using the 4-question authority check.",
        instructionsAr: "قيم كل 'ادعاء خبير' أدناه باستخدام فحص السلطة المكون من 4 أسئلة.",
        items: [
          { id: "auth-1", text: "A famous TV presenter with millions of followers shares health advice. Domain: entertainment, not medicine.", isCorrect: true, explanation: "Authority bias alert. Fame and large followings do not equal medical expertise. Always check: what is their actual training? Are they citing peer-reviewed evidence or just sharing opinions?" },
          { id: "auth-2", text: "A professor of psychology publishes a paper about cognitive biases in a top-tier journal. Domain: matched.", isCorrect: true, explanation: "Legitimate authority. The expertise domain matches, the publication venue is appropriate, and the claim can be verified through the peer-review record. This is how credible expertise works." },
          { id: "auth-3", text: "An engineer with a PhD writes social media posts debunking climate science. Domain: engineering, not climate science.", isCorrect: true, explanation: "Domain mismatch. A PhD in engineering does not make someone a climate scientist. Always check whether the expert is speaking within their actual field of expertise." }
        ]
      },
      feedback: {
        correct: "Well done! You can now distinguish real expertise from authority theater. The 4-question check (domain, consensus, conflict, evidence) is your strongest tool.",
        correctAr: "أحسنت! يمكنك الآن التمييز بين الخبرة الحقيقية وسلطة المظهر.",
        incorrect: "Review the 4-question check. The most important question is always: 'Is this person speaking within their actual domain of expertise?'",
        incorrectAr: "راجع فحص الأسئلة الأربعة. السؤال الأهم: 'هل يتحدث هذا الشخص ضمن مجال خبرته الفعلي؟'"
      }
    },
    whatNotToDo: [
      "Don't dismiss all experts — the solution is not anti-intellectualism but domain-specific evaluation",
      "Don't assume malice — experts outside their domain may genuinely believe they are correct"
    ],
    keyhunterId: "dr-kh-13",
    evidence: "Cialdini, R.B. (2021). Influence: The Psychology of Persuasion (New and Expanded Edition). Harper Business.",
    safetyNote: null,
    trackConfidence: true,
    requiresEightGate: false
  },

  // Day 14: Bias — Availability Heuristic (Capstone)
  {
    id: "dr-day-14",
    title: "Capstone: The Availability Trap and Your Verification Toolkit",
    titleAr: "الختام: فخ التوافر وأدواتك للتحقق",
    mvp: "deepreal",
    day: 14,
    duration: 15,
    difficulty: "advanced",
    category: "bias",
    learningObjective: "After this exercise, the user will be able to explain the availability heuristic, recognize when memorable examples are distorting their risk perception, and synthesize all learned skills (SIFT, lateral reading, evidence hierarchy, emotional audit, debiasing) into a unified verification practice.",
    learningObjectiveAr: "بعد هذا التمرين، سيتمكن المستخدم من شرح أساليب التحقق المتعلمة وتطبيقها معاً.",
    bloomLevel: "evaluate",
    content: {
      scenario: "The Availability Heuristic (Tversky & Kahneman, 1973): We judge how likely something is based on how easily examples come to mind — NOT on actual statistics.\n\n- Seeing many airplane crash stories → 'Flying is dangerous' (but driving is statistically riskier)\n- Seeing viral crime videos → 'Crime is everywhere' (but crime rates may be declining)\n\nThis is your FINAL exercise. Let's put EVERYTHING together:\n\nYour Verification Toolkit (14-Day Summary):\n✓ SIFT Method (Days 1-3)\n✓ IFCN Evaluation (Day 4)\n✓ Evidence Hierarchy (Day 5)\n✓ Reverse Image Search (Day 6)\n✓ Health Misinfo Red Flags (Day 7)\n✓ Audio Deepfake Detection (Day 8)\n✓ Inoculation/Prebunking (Day 9)\n✓ Statistical Literacy (Day 10)\n✓ Confirmation Bias Debiasing (Day 11)\n✓ Emotion Audit (Day 12)\n✓ Authority Check (Day 13)\n✓ Availability Heuristic (Day 14)",
      scenarioAr: "أسلوب التوافر (تفرسكي وكانيمان، 1973): نحكم على احتمالية شيء ما بناءً على مدى سهولة تذكر الأمثلة.",
      task: {
        type: "scenario_response",
        instructions: "A friend sends you a viral post with shocking health claims, emotional language, a 'doctor's' endorsement, and alarming statistics. Apply your full verification toolkit.",
        instructionsAr: "صديق يرسل لك منشوراً فيروسياً بادعاءات صحية صادمة. طبق أدواتك الكاملة للتحقق.",
        items: [
          { id: "cap-1", text: "Step 1: STOP (SIFT). Don't share yet. Acknowledge your emotional reaction.", isCorrect: true, explanation: "Correct first step. The S in SIFT is your starting point for EVERYTHING. Pause, breathe, recognize the urge to react." },
          { id: "cap-2", text: "Step 2: Check the 'doctor' (Authority Check). Is this a real doctor? In this field? Any conflicts?", isCorrect: true, explanation: "Applying Day 13. Check their actual credentials, domain match, and potential conflicts of interest." },
          { id: "cap-3", text: "Step 3: Emotion Audit. Rate your emotional reaction (1-10). If above 6, proceed with extra caution.", isCorrect: true, explanation: "Applying Day 12. Your emotional state affects your judgment quality. High emotion = slower, more careful evaluation needed." },
          { id: "cap-4", text: "Step 4: Check the statistics (Statistical Literacy). Are they using absolute or relative numbers? Is the full data shown?", isCorrect: true, explanation: "Applying Day 10. Always ask for base numbers, full datasets, and adequate context." },
          { id: "cap-5", text: "Step 5: Find better coverage (SIFT-F). Search for the same claim from independent sources.", isCorrect: true, explanation: "Applying Days 1-5. If only one source reports it, be cautious. Look for WHO, NHS, or IFCN-verified fact-check reports." }
        ]
      },
      feedback: {
        correct: "Congratulations! You have completed all 14 DeepReal exercises. You now have a complete verification toolkit. Remember: the goal is not to distrust everything, but to trust WISELY — based on evidence, not emotion, authority, or availability.",
        correctAr: "مبروك! لقد أكملت جميع تمارين DeepReal الأربعة عشر. لديك الآن مجموعة أدوات تحقق كاملة.",
        incorrect: "You're very close! Review the synthesis. The key is applying ALL the tools together, not just one at a time.",
        incorrectAr: "أنت قريب جداً! راجع التوليف. المفتاح هو تطبيق جميع الأدوات معاً."
      }
    },
    whatNotToDo: [
      "Don't become a cynical non-believer — the goal is calibrated trust, not blanket distrust",
      "Don't forget that these skills need practice — verification is a habit, not a one-time lesson"
    ],
    keyhunterId: "dr-kh-14",
    evidence: "Tversky, A., & Kahneman, D. (1973). Availability: A heuristic for judging frequency and probability. Cognitive Psychology, 5(2), 207-232.",
    safetyNote: null,
    trackConfidence: true,
    requiresEightGate: true
  },
];
