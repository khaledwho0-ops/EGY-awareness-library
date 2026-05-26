/**
 * Mental Health Exercises — Days 2-14
 * Framework: §10.2, §13.2, §16.2
 *
 * Distribution (§16.2):
 * Days 1-5: Emotional awareness (5 exercises)
 * Days 6-9: Stigma reduction (4 exercises)
 * Days 10-14: Mixed (help-seeking, coping, literacy) (5 exercises)
 *
 * Day 1 exists as JSON. This module provides days 2-14.
 * Theoretical stack (§8.2): Jorm MHL, PERMA, Affect Labeling,
 * Contact Hypothesis (Corrigan), Health Belief Model (Rosenstock)
 */

export const MENTAL_HEALTH_EXERCISES = [
  // EMOTIONAL AWARENESS (Days 2-5)
  {
    id: "mh-day-02", title: "Stress Response: Understanding Your Body's Alarm System",
    titleAr: "استجابة الإجهاد: فهم نظام إنذار جسمك",
    mvp: "mental-health", day: 2, duration: 12, difficulty: "beginner",
    category: "emotional_awareness", bloomLevel: "understand",
    learningObjective: "After this exercise, the user will be able to describe the stress response (fight-or-flight), differentiate between acute and chronic stress, and identify 3 healthy coping strategies supported by evidence.",
    learningObjectiveAr: "بعد هذا التمرين، سيتمكن المستخدم من وصف استجابة الإجهاد والتمييز بين الإجهاد الحاد والمزمن.",
    content: { scenario: "Stress is your body's NORMAL alarm system. When you face a threat (an exam, an argument, a deadline), your brain activates the 'fight-or-flight' response (Lazarus & Folkman, 1984):\n\n- Heart rate increases\n- Muscles tense\n- Attention narrows\n\nThis is adaptive for SHORT-TERM threats. But when stress becomes CHRONIC (lasting weeks or months), it can harm physical and mental health.\n\nKey distinction:\n- **Acute stress**: Short-term, focused, often performance-enhancing\n- **Chronic stress**: Long-term, diffuse, linked to burnout and health problems\n- **Eustress**: Positive stress (excitement, challenge)\n- **Distress**: Negative stress (overwhelm, helplessness)",
      scenarioAr: "الإجهاد هو نظام إنذار طبيعي في جسمك.",
      task: { type: "scenario_response", instructions: "Classify each scenario as acute stress, chronic stress, eustress, or distress.",
        instructionsAr: "صنف كل سيناريو.",
        items: [
          { id: "str-1", text: "Feeling nervous before a presentation → Acute stress / Eustress (short-term, can enhance performance)", isCorrect: true, explanation: "Correct. Pre-performance nervousness is normal acute stress that typically improves performance. It becomes a concern only if it's paralyzing." },
          { id: "str-2", text: "Months of financial worry with no sleep → Chronic distress (long-term, impairing function)", isCorrect: true, explanation: "Correct. Long-term financial worry affecting sleep is chronic distress. This is the type of stress that requires active coping strategies and potentially professional support." },
          { id: "str-3", text: "Excitement about starting a new project → Eustress (positive, motivating)", isCorrect: true, explanation: "Correct. Excitement is eustress — positive stress that motivates and energizes. Not all stress is bad." }
        ]
      },
      feedback: { correct: "Excellent! Understanding the types of stress helps you respond appropriately. Remember: stress itself is normal — it's CHRONIC, unmanaged stress that becomes harmful.",
        correctAr: "ممتاز! فهم أنواع الإجهاد يساعدك على الاستجابة بشكل مناسب.",
        incorrect: "Review the stress types. The key is duration (acute vs. chronic) and valence (eustress vs. distress).",
        incorrectAr: "راجع أنواع الإجهاد." }
    },
    whatNotToDo: ["Don't pathologize normal stress — some stress is healthy and adaptive", "Don't use this exercise as a diagnostic tool — it's educational only"],
    keyhunterId: "mh-kh-02", evidence: "Lazarus, R.S., & Folkman, S. (1984). Stress, Appraisal, and Coping. Springer.",
    safetyNote: "If you are experiencing persistent stress affecting daily functioning, please consider speaking with a mental health professional. Egypt crisis line: 16328.",
    trackConfidence: false, requiresEightGate: false
  },

  { id: "mh-day-03", title: "Understanding Anxiety: What It Is and What It Isn't",
    titleAr: "فهم القلق: ما هو وما ليس كذلك", mvp: "mental-health", day: 3, duration: 12, difficulty: "beginner",
    category: "emotional_awareness", bloomLevel: "understand",
    learningObjective: "After this exercise, the user will be able to distinguish between normal anxiety and anxiety disorders, identify 3 common misconceptions, and recognize when professional help may be beneficial.",
    learningObjectiveAr: "بعد هذا التمرين، سيتمكن المستخدم من التمييز بين القلق الطبيعي واضطرابات القلق.",
    content: { scenario: "Anxiety is one of the most misunderstood terms in mental health.\n\n**What anxiety IS:**\n- A normal emotional response to perceived threats (Jorm, 2012)\n- Present in everyone at some level\n- Can be helpful (alerts us to real dangers)\n\n**What anxiety is NOT:**\n- A choice or personality weakness\n- The same as being 'just worried'\n- Something you can 'just get over'\n\n**When it may indicate a disorder (educational, NOT diagnostic):**\n- Persistent (most days for 6+ months)\n- Disproportionate to the actual threat\n- Significantly impairs daily functioning (work, relationships, sleep)\n- Physical symptoms: racing heart, difficulty breathing, muscle tension\n\n⚠️ DISCLAIMER: This is EDUCATIONAL content. Only qualified professionals can diagnose anxiety disorders.",
      scenarioAr: "القلق من أكثر المصطلحات سوء فهم في الصحة النفسية.",
      task: { type: "scenario_response", instructions: "For each statement, identify whether it is a FACT or a MYTH about anxiety.",
        instructionsAr: "لكل عبارة، حدد ما إذا كانت حقيقة أم خرافة عن القلق.",
        items: [
          { id: "anx-1", text: "'Everyone feels anxious sometimes.' → FACT", isCorrect: true, explanation: "FACT. Anxiety is a universal human experience. It becomes a concern when it's persistent, disproportionate, and impairing." },
          { id: "anx-2", text: "'If you just relax, your anxiety will go away.' → MYTH", isCorrect: true, explanation: "MYTH. Telling someone to 'just relax' misunderstands anxiety. Anxiety disorders involve neurobiological mechanisms that cannot be simply 'thought away.'" },
          { id: "anx-3", text: "'Anxiety disorders are very common among university students.' → FACT", isCorrect: true, explanation: "FACT. Research consistently shows anxiety is one of the most prevalent mental health concerns among university populations worldwide." }
        ]
      },
      feedback: { correct: "Well done! You can now distinguish facts from myths about anxiety. This knowledge helps reduce stigma and encourages appropriate help-seeking.",
        correctAr: "أحسنت! يمكنك الآن التمييز بين الحقائق والخرافات عن القلق.",
        incorrect: "Review each statement carefully. Myths often contain a tiny grain of truth wrapped in a harmful misunderstanding.",
        incorrectAr: "راجع كل عبارة بعناية." }
    },
    whatNotToDo: ["Don't diagnose yourself or others based on this exercise — it's educational only", "Don't dismiss anxiety as 'not real' — it has neurobiological underpinnings"],
    keyhunterId: "mh-kh-03", evidence: "Jorm, A.F. (2012). Mental health literacy. American Psychologist, 67(3), 231-243.",
    safetyNote: "This is educational content, NOT diagnostic. For clinical assessment, consult a qualified mental health professional. Egypt crisis line: 16328.",
    trackConfidence: false, requiresEightGate: false
  },

  { id: "mh-day-04", title: "Understanding Depression: Beyond 'Just Feeling Sad'",
    titleAr: "فهم الاكتئاب: أبعد من 'مجرد الشعور بالحزن'", mvp: "mental-health", day: 4, duration: 14, difficulty: "beginner",
    category: "emotional_awareness", bloomLevel: "understand",
    learningObjective: "After this exercise, the user will be able to differentiate normal sadness from depression, identify key DSM-5-TR criteria (educational), and challenge 3 common myths.",
    learningObjectiveAr: "بعد هذا التمرين، سيتمكن المستخدم من التفريق بين الحزن الطبيعي والاكتئاب.",
    content: { scenario: "Depression is NOT 'just being sad.' According to WHO (2023), depression is characterized by:\n- Persistent low mood or loss of interest (anhedonia) lasting 2+ weeks\n- Accompanied by: changes in sleep, appetite, energy, concentration, or self-worth\n- Significant impairment in daily functioning\n\n**Critical distinctions:**\n- Sad ≠ Depressed (sadness is temporary; depression is persistent)\n- Lazy ≠ Depressed (motivation loss is a SYMPTOM, not a choice)\n- Strong ≠ Not Depressed (depression affects everyone regardless of 'strength')",
      scenarioAr: "الاكتئاب ليس 'مجرد حزن.'",
      task: { type: "scenario_response", instructions: "Read each scenario and determine whether it describes normal sadness or may indicate something requiring further attention (NOT diagnosis).",
        instructionsAr: "اقرأ كل سيناريو وحدد ما إذا كان يصف حزناً طبيعياً.",
        items: [
          { id: "dep-1", text: "A student feels very sad for 3 days after a breakup but gradually starts feeling better. → Normal sadness (proportionate, temporary)", isCorrect: true, explanation: "Normal sadness. The sadness is proportionate to the event, temporary (3 days), and shows a trajectory of improvement. This is a healthy emotional response." },
          { id: "dep-2", text: "A student has lost interest in ALL activities for 4 weeks, sleeps 14 hours/day, and can't attend classes. → May indicate something requiring attention", isCorrect: true, explanation: "This pattern (duration 4+ weeks, pervasive loss of interest, sleep changes, functional impairment) suggests more than normal sadness. Encouraging professional consultation would be appropriate." },
          { id: "dep-3", text: "A student says 'I'm depressed' because they failed an exam, but is laughing with friends an hour later. → Likely colloquial use, not clinical depression", isCorrect: true, explanation: "Using 'depressed' colloquially is common but inaccurate. Clinical depression is persistent (2+ weeks) and pervasive. This appears to be temporary disappointment." }
        ]
      },
      feedback: { correct: "Excellent mental health literacy! You can now distinguish between normal sadness and patterns that may need professional attention. Remember: recognition is NOT diagnosis.",
        correctAr: "ممتاز! يمكنك الآن التمييز بين الحزن الطبيعي والأنماط التي قد تحتاج اهتماماً مهنياً.",
        incorrect: "Review the key distinctions: duration (temporary vs. persistent), scope (specific vs. pervasive), and impairment (functioning vs. not functioning).",
        incorrectAr: "راجع الفروق الأساسية." }
    },
    whatNotToDo: ["Don't diagnose — only trained professionals can diagnose depression", "Don't tell someone with depression to 'cheer up' — this dismisses their experience"],
    keyhunterId: "mh-kh-04", evidence: "WHO (2023). Depressive disorder (depression). https://www.who.int/news-room/fact-sheets/detail/depression",
    safetyNote: "This is educational content. If you or someone you know shows persistent signs, please encourage consultation with a mental health professional. Egypt crisis line: 16328.",
    trackConfidence: false, requiresEightGate: false
  },

  { id: "mh-day-05", title: "Wellbeing Is More Than Not Being Sick: The PERMA Model",
    titleAr: "الرفاهية أكثر من عدم المرض: نموذج PERMA", mvp: "mental-health", day: 5, duration: 12, difficulty: "beginner",
    category: "emotional_awareness", bloomLevel: "apply",
    learningObjective: "After this exercise, the user will be able to explain the 5 PERMA pillars and identify at least one actionable step for each pillar in their own life.",
    learningObjectiveAr: "بعد هذا التمرين، سيتمكن المستخدم من شرح ركائز PERMA الخمسة.",
    content: { scenario: "Mental health is NOT just the absence of mental illness. The PERMA model (Seligman, 2011) defines 5 pillars of wellbeing:\n\n**P — Positive Emotions**: Joy, gratitude, hope, serenity\n**E — Engagement**: Flow states, being fully absorbed in meaningful activities\n**R — Relationships**: Positive, supportive connections with others\n**M — Meaning**: Feeling that your life has purpose and significance\n**A — Accomplishment**: Pursuing and achieving goals, mastery\n\nWellbeing = building ALL five pillars, not just avoiding illness.",
      scenarioAr: "الصحة النفسية ليست مجرد غياب المرض النفسي. نموذج PERMA يحدد 5 ركائز للرفاهية.",
      task: { type: "scenario_response", instructions: "For each PERMA pillar, select an evidence-supported action you could take this week.",
        instructionsAr: "لكل ركيزة من PERMA، اختر إجراءً مدعوماً بالأدلة يمكنك اتخاذه هذا الأسبوع.",
        items: [
          { id: "perma-p", text: "Positive Emotions: Write down 3 things you're grateful for today (gratitude journal exercise).", isCorrect: true, explanation: "Evidence-supported. Emmons & McCullough (2003) showed that writing gratitude lists increased wellbeing and reduced distress. Takes only 5 minutes." },
          { id: "perma-r", text: "Relationships: Send a genuine compliment or thank-you message to someone you appreciate.", isCorrect: true, explanation: "Evidence-supported. Expressing gratitude to others strengthens relationships and increases both parties' wellbeing (Algoe, 2012)." },
          { id: "perma-m", text: "Meaning: Spend 10 minutes reflecting on how your studies connect to your values and goals.", isCorrect: true, explanation: "Evidence-supported. Value affirmation exercises (Cohen et al., 2006) connect daily activities to larger meaning and reduce stress." }
        ]
      },
      feedback: { correct: "Wonderful! You've identified actionable steps for wellbeing. Remember: wellbeing is a practice, not a destination. Small daily actions compound over time.",
        correctAr: "رائع! لقد حددت خطوات قابلة للتنفيذ للرفاهية.",
        incorrect: "Review the PERMA pillars. The key is that wellbeing is multidimensional — you need positive emotions AND engagement AND relationships AND meaning AND accomplishment.",
        incorrectAr: "راجع ركائز PERMA." }
    },
    whatNotToDo: ["Don't use PERMA as a replacement for professional help if you're struggling", "Don't fall into toxic positivity — PERMA acknowledges that suffering exists"],
    keyhunterId: "mh-kh-05", evidence: "Seligman, M.E.P. (2011). Flourish. Atria Books.",
    safetyNote: null, trackConfidence: false, requiresEightGate: false
  },

  // STIGMA REDUCTION (Days 6-9)
  { id: "mh-day-06", title: "What Is Mental Health Stigma?", titleAr: "ما هو وصمة الصحة النفسية؟",
    mvp: "mental-health", day: 6, duration: 12, difficulty: "intermediate", category: "stigma_reduction", bloomLevel: "understand",
    learningObjective: "After this exercise, the user will be able to define public stigma, self-stigma, and structural stigma, and explain how each creates barriers to help-seeking.",
    learningObjectiveAr: "بعد هذا التمرين، سيتمكن المستخدم من تعريف الوصمة العامة والذاتية والهيكلية.",
    content: { scenario: "Mental health stigma operates at 3 levels (Corrigan et al., 2012):\n\n**Public Stigma**: Society's negative attitudes toward people with mental health conditions\n- 'Mental illness means someone is dangerous'\n- 'They should just get over it'\n\n**Self-Stigma**: Internalized negative beliefs\n- 'If I feel this way, something is wrong with me'\n- 'I should be able to handle this alone'\n\n**Structural Stigma**: Institutional barriers\n- Insurance that doesn't cover mental health\n- Schools that punish absenteeism without considering mental health\n- Workplaces that penalize disclosure",
      scenarioAr: "وصمة الصحة النفسية تعمل على 3 مستويات.",
      task: { type: "matching", instructions: "Match each example to the correct type of stigma.",
        instructionsAr: "طابق كل مثال مع النوع الصحيح من الوصمة.",
        items: [
          { id: "stig-1", text: "A student avoids seeking help because they think 'only crazy people go to therapists.' → Self-stigma (internalized belief)", isCorrect: true, explanation: "Self-stigma. The student has internalized a negative belief about help-seeking, creating an internal barrier." },
          { id: "stig-2", text: "A family tells their child 'Don't tell anyone about your therapy — it's shameful.' → Public stigma (family reflecting societal attitudes)", isCorrect: true, explanation: "Public stigma operating through the family unit. The family's reaction reflects broader societal attitudes about mental health." },
          { id: "stig-3", text: "A university has no counseling center and no mental health policy. → Structural stigma (institutional barrier)", isCorrect: true, explanation: "Structural stigma. The lack of institutional resources and policies creates a systemic barrier to mental health support." }
        ]
      },
      feedback: { correct: "Excellent understanding! Recognizing the three levels of stigma is the first step toward addressing them. Each level requires different strategies.",
        correctAr: "فهم ممتاز! التعرف على مستويات الوصمة الثلاثة هو الخطوة الأولى لمعالجتها.",
        incorrect: "Review the three types. Self-stigma is internal, public stigma is social/cultural, and structural stigma is institutional.",
        incorrectAr: "راجع الأنواع الثلاثة." }
    },
    whatNotToDo: ["Don't blame individuals for experiencing self-stigma — it's a result of societal messages", "Don't assume stigma is only an individual problem — structural change is also needed"],
    keyhunterId: "mh-kh-06", evidence: "Corrigan, P.W., et al. (2012). Challenging the public stigma of mental illness. Psychiatric Services.",
    safetyNote: null, trackConfidence: false, requiresEightGate: false
  },

  { id: "mh-day-07", title: "Contact and Stories: Reducing Stigma Through Understanding", titleAr: "التواصل والقصص: تقليل الوصمة من خلال الفهم",
    mvp: "mental-health", day: 7, duration: 14, difficulty: "intermediate", category: "stigma_reduction", bloomLevel: "analyze",
    learningObjective: "After this exercise, the user will understand the contact hypothesis for stigma reduction and practice perspective-taking through structured reflection.",
    learningObjectiveAr: "بعد هذا التمرين، سيفهم المستخدم فرضية الاتصال لتقليل الوصمة.",
    content: { scenario: "Research shows that contact with people who have lived experience of mental health conditions is one of the most effective ways to reduce stigma (Corrigan et al., 2012; Allport, 1954).\n\nScenario: Ahmed is a 22-year-old engineering student. He experienced depression during his third year and sought professional help. He now volunteers to share his story with other students.\n\nReflection questions:\n1. What assumptions might you have had about 'someone with depression' before hearing Ahmed's story?\n2. How does hearing a personal experience change your understanding compared to reading a clinical definition?\n3. What would you say to a friend who tells you they're experiencing similar feelings?",
      scenarioAr: "البحث يظهر أن التواصل مع أشخاص لديهم خبرة معاشة بحالات الصحة النفسية من أكثر الطرق فعالية لتقليل الوصمة.",
      task: { type: "scenario_response", instructions: "Reflect on each question and select the response that best demonstrates perspective-taking.",
        instructionsAr: "تأمل في كل سؤال واختر الاستجابة التي تثبت أفضل تقمص للمنظور.",
        items: [
          { id: "cont-1", text: "What would you say to a friend who tells you they're feeling depressed? → 'Thank you for trusting me. That took courage. I'm here for you.'", isCorrect: true, explanation: "This response demonstrates active listening, affirms trust, and avoids problem-solving or dismissing. These are key supportive communication skills." },
          { id: "cont-2", text: "What should you NOT say? → 'Everyone feels sad sometimes. You just need to be positive!'", isCorrect: true, explanation: "This minimizes the experience, equates depression with normal sadness, and suggests a simplistic solution. Even well-intentioned, this response can be harmful." }
        ]
      },
      feedback: { correct: "Excellent empathy and perspective-taking! Your response would help a friend feel heard and supported. Remember: listening is more powerful than advising.",
        correctAr: "تعاطف ممتاز! استجابتك ستساعد صديقاً على الشعور بالدعم.",
        incorrect: "Review the supportive communication principles. The key is to listen, affirm, and avoid minimizing.",
        incorrectAr: "راجع مبادئ التواصل الداعم." }
    },
    whatNotToDo: ["Don't pressure someone to share their story — disclosure must be voluntary", "Don't treat recovery stories as 'inspiration' — they are complex human experiences"],
    keyhunterId: "mh-kh-07", evidence: "Allport, G.W. (1954). The Nature of Prejudice. Pettigrew & Tropp (2006). Psychological Bulletin.",
    safetyNote: "This exercise involves sensitive topics. If reflecting triggers distress, please contact Egypt crisis line: 16328.", trackConfidence: false, requiresEightGate: false
  },

  { id: "mh-day-08", title: "Mental Health Myths: Busting Common Misconceptions", titleAr: "خرافات الصحة النفسية: تصحيح المفاهيم الخاطئة",
    mvp: "mental-health", day: 8, duration: 12, difficulty: "intermediate", category: "stigma_reduction", bloomLevel: "evaluate",
    learningObjective: "After this exercise, the user will be able to identify and correct 5 common mental health myths using evidence-based information.",
    learningObjectiveAr: "بعد هذا التمرين، سيتمكن المستخدم من تحديد وتصحيح 5 خرافات شائعة عن الصحة النفسية.",
    content: { scenario: "Mental health myths persist because they are repeated so often they feel true. Let's test 5 common ones.",
      scenarioAr: "خرافات الصحة النفسية تستمر لأنها تتكرر كثيراً.",
      task: { type: "scenario_response", instructions: "For each statement, determine: MYTH or FACT?",
        instructionsAr: "لكل عبارة، حدد: خرافة أم حقيقة؟",
        items: [
          { id: "myth-1", text: "'People with mental health conditions are more violent than the general population.' → MYTH", isCorrect: true, explanation: "MYTH. People with mental health conditions are actually MORE LIKELY to be victims of violence than perpetrators. This myth is fueled by selective media coverage (Stuart, 2006)." },
          { id: "myth-2", text: "'Therapy is only for people with serious mental illness.' → MYTH", isCorrect: true, explanation: "MYTH. Therapy benefits people across the spectrum, from managing everyday stress to clinical conditions. Early intervention is most effective (NICE guidelines)." },
          { id: "myth-3", text: "'Mental health conditions are treatable.' → FACT", isCorrect: true, explanation: "FACT. Most mental health conditions respond to evidence-based treatment (therapy, medication, or both). Full recovery or significant improvement is common with appropriate care." }
        ]
      },
      feedback: { correct: "Excellent myth-busting! Each myth you correct helps reduce stigma. Consider sharing what you've learned with friends and family.",
        correctAr: "ممتاز في تصحيح الخرافات! كل خرافة تصححها تساعد في تقليل الوصمة.",
        incorrect: "Review each statement against WHO and NIMH guidelines. Myths often contain a tiny grain of truth wrapped in harmful generalization.",
        incorrectAr: "راجع كل عبارة." }
    },
    whatNotToDo: ["Don't attack people who believe myths — educate with empathy", "Don't present myth-busting as 'you're wrong' — frame it as 'what evidence actually shows'"],
    keyhunterId: "mh-kh-08", evidence: "Lilienfeld, S.O., et al. (2010). 50 Great Myths of Popular Psychology. Wiley-Blackwell.",
    safetyNote: null, trackConfidence: false, requiresEightGate: false
  },

  { id: "mh-day-09", title: "Culture and Mental Health: The Egyptian Context", titleAr: "الثقافة والصحة النفسية: السياق المصري",
    mvp: "mental-health", day: 9, duration: 14, difficulty: "intermediate", category: "stigma_reduction", bloomLevel: "analyze",
    learningObjective: "After this exercise, the user will understand how cultural factors in Egypt influence mental health expression, help-seeking, and stigma.",
    learningObjectiveAr: "بعد هذا التمرين، سيفهم المستخدم كيف تؤثر العوامل الثقافية في مصر على التعبير عن الصحة النفسية.",
    content: { scenario: "Mental health is universal, but how it is EXPRESSED and DISCUSSED varies by culture.\n\nIn many Arab and Egyptian contexts (Kirmayer, 2001):\n- **Somatization**: Emotional distress expressed as physical symptoms ('my chest hurts' instead of 'I feel anxious')\n- **Family-centered decisions**: Help-seeking often involves family consultation\n- **Religious framing**: Mental health may be understood through a spiritual lens\n- **Shame and honor**: Disclosure of mental health struggles may be seen as family shame\n\n⚠️ IMPORTANT: Cultural awareness ≠ cultural determinism. Not everyone in a culture behaves the same way. These are PATTERNS, not rules.",
      scenarioAr: "الصحة النفسية عالمية، لكن كيفية التعبير عنها ومناقشتها تختلف حسب الثقافة.",
      task: { type: "scenario_response", instructions: "Read each scenario and identify the cultural factor at play. Then suggest a culturally sensitive response.",
        instructionsAr: "اقرأ كل سيناريو وحدد العامل الثقافي. ثم اقترح استجابة حساسة ثقافياً.",
        items: [
          { id: "cult-1", text: "A student says 'I have headaches and stomach pain' but examinations find no physical cause. → Possible somatization of emotional distress", isCorrect: true, explanation: "Somatization is common in many cultures. A sensitive response acknowledges the physical reality of these symptoms while gently exploring emotional wellbeing." },
          { id: "cult-2", text: "A student won't seek help because 'my family would be ashamed.' → Shame/honor cultural factor", isCorrect: true, explanation: "This reflects the shame-honor dynamic. A sensitive response respects the family system while providing information about confidential support options." }
        ]
      },
      feedback: { correct: "Excellent cultural awareness! Understanding these factors helps you support others more effectively and reduces the gap between distress and help-seeking.",
        correctAr: "وعي ثقافي ممتاز!",
        incorrect: "Review the cultural factors. Remember: understanding cultural patterns helps bridge the gap to support, not create new stereotypes.",
        incorrectAr: "راجع العوامل الثقافية." }
    },
    whatNotToDo: ["Don't stereotype all Egyptians as responding the same way — individual variation exists", "Don't use cultural factors as excuses to not seek help — culture informs, it doesn't determine"],
    keyhunterId: "mh-kh-09", evidence: "Kirmayer, L.J. (2001). Cultural variations. American Journal of Psychiatry, 158(7), 1-11.",
    safetyNote: null, trackConfidence: false, requiresEightGate: false
  },

  // MIXED (Days 10-14)
  { id: "mh-day-10", title: "Help-Seeking: Knowing When and How to Get Support", titleAr: "طلب المساعدة: معرفة متى وكيف تحصل على الدعم",
    mvp: "mental-health", day: 10, duration: 14, difficulty: "intermediate", category: "mixed", bloomLevel: "apply",
    learningObjective: "After this exercise, the user will know the help-seeking pathway (self-care → peer support → professional help) and identify local Egyptian resources.",
    learningObjectiveAr: "بعد هذا التمرين، سيعرف المستخدم مسار طلب المساعدة ويحدد الموارد المصرية المحلية.",
    content: { scenario: "Help-seeking is not all-or-nothing. There is a PATHWAY (Health Belief Model, Rosenstock, 1974):\n\n**Level 1: Self-Care** — Wellbeing practices, PERMA activities, stress management\n**Level 2: Peer/Family Support** — Talking to trusted friends, family, or mentors\n**Level 3: Community Support** — University counseling, support groups, helplines\n**Level 4: Professional Help** — Psychologist, psychiatrist, clinical social worker\n**Level 5: Crisis Intervention** — Emergency services, crisis hotlines\n\n🇪🇬 Egyptian Resources:\n- GSMHAT Crisis Line: **16328**\n- Dar al-Ifta Helpline: **107**\n- University counseling centers (varies by university)",
      scenarioAr: "طلب المساعدة ليس نعم أو لا. هناك مسار.",
      task: { type: "matching", instructions: "For each scenario, identify the appropriate help-seeking level.",
        instructionsAr: "لكل سيناريو، حدد مستوى طلب المساعدة المناسب.",
        items: [
          { id: "hs-1", text: "Feeling stressed about exams → Level 1 (Self-Care) or Level 2 (Peer Support)", isCorrect: true, explanation: "Exam stress is normal. Self-care practices (exercise, sleep, breaks) and talking to friends are appropriate first responses." },
          { id: "hs-2", text: "Persistent low mood for 3+ weeks affecting daily function → Level 3 or 4 (Community or Professional Help)", isCorrect: true, explanation: "Duration (3+ weeks) and functional impairment suggest professional consultation would be beneficial. University counseling is a good starting point." },
          { id: "hs-3", text: "A friend expresses thoughts of self-harm → Level 5 (Crisis Intervention: 16328)", isCorrect: true, explanation: "Self-harm thoughts require immediate professional support. Stay with the person, listen without judgment, and help them contact the crisis line: 16328." }
        ]
      },
      feedback: { correct: "Excellent! You now know the help-seeking pathway. Remember: seeking help early, at any level, is a sign of strength, not weakness.",
        correctAr: "ممتاز! تعرف الآن مسار طلب المساعدة.",
        incorrect: "Review the levels. The key is matching the severity and duration of the issue to the appropriate level of support.",
        incorrectAr: "راجع المستويات." }
    },
    whatNotToDo: ["Don't wait until crisis to seek help — early intervention is more effective", "Don't try to be someone's therapist — your role is to listen and help connect them to resources"],
    keyhunterId: "mh-kh-10", evidence: "Rosenstock, I.M. (1974). Health Belief Model. Health Education Monographs, 2(4), 328-335.",
    safetyNote: "If you or someone you know needs immediate help: Egypt crisis line 16328.", trackConfidence: false, requiresEightGate: false
  },

  { id: "mh-day-11", title: "Crisis Resources and Safety Planning Basics", titleAr: "موارد الأزمات وأساسيات خطة السلامة",
    mvp: "mental-health", day: 11, duration: 12, difficulty: "intermediate", category: "mixed", bloomLevel: "apply",
    learningObjective: "After this exercise, the user will understand the purpose of a safety plan, know the key components, and be able to share crisis resources with others.",
    learningObjectiveAr: "بعد هذا التمرين، سيفهم المستخدم الغرض من خطة السلامة ومكوناتها الأساسية.",
    content: { scenario: "A safety plan (Stanley & Brown, 2012) is a brief, structured list that helps someone navigate a crisis. It is NOT a contract, and it is NOT a replacement for professional help.\n\n**Key Components:**\n1. Warning signs (what does a crisis feel like for YOU?)\n2. Internal coping strategies (things you can do alone to calm down)\n3. People and places that provide distraction\n4. People you can ask for help\n5. Professionals and agencies to contact\n6. Making the environment safe\n\n🇪🇬 Egypt Crisis Resources:\n- GSMHAT: 16328 (24/7)\n- Emergency: 123\n- Befrienders Worldwide: www.befrienders.org",
      scenarioAr: "خطة السلامة هي قائمة مختصرة ومنظمة تساعد شخصاً ما على التعامل مع الأزمة.",
      task: { type: "scenario_response", instructions: "A friend tells you they've been feeling hopeless. Which steps do you take?",
        instructionsAr: "صديق يخبرك أنه يشعر باليأس. ما الخطوات التي تتخذها؟",
        items: [
          { id: "safe-1", text: "Step 1: Listen without judgment. Don't try to fix or minimize.", isCorrect: true, explanation: "Active listening is the most important first step. Let them feel heard before taking any action." },
          { id: "safe-2", text: "Step 2: Ask directly about safety. 'Are you thinking about hurting yourself?'", isCorrect: true, explanation: "Research shows that asking about suicide does NOT increase risk — it opens the door for help. Direct, caring questions are essential." },
          { id: "safe-3", text: "Step 3: Connect to professional help. Offer to help them call 16328 together.", isCorrect: true, explanation: "Connecting to professional support is critical. Offering to make the call together reduces the barrier significantly." }
        ]
      },
      feedback: { correct: "You've demonstrated essential crisis response skills. Remember: your role is to listen, ask, and connect — not to be the therapist.",
        correctAr: "لقد أظهرت مهارات استجابة أساسية للأزمات.",
        incorrect: "Review the steps: Listen → Ask directly → Connect to professional help. Don't try to handle a crisis alone.",
        incorrectAr: "راجع الخطوات." }
    },
    whatNotToDo: ["Don't promise to keep secrets if someone's safety is at risk", "Don't try to be someone's therapist — connect them to professionals"],
    keyhunterId: "mh-kh-11", evidence: "Stanley, B., & Brown, G.K. (2012). Safety planning intervention. Cognitive and Behavioral Practice, 19(2), 256-264.",
    safetyNote: "This exercise covers sensitive topics. If you are in crisis, call 16328 immediately.", trackConfidence: false, requiresEightGate: false
  },

  { id: "mh-day-12", title: "Sleep and Mental Health: The Bidirectional Link", titleAr: "النوم والصحة النفسية: الرابط ثنائي الاتجاه",
    mvp: "mental-health", day: 12, duration: 12, difficulty: "intermediate", category: "mixed", bloomLevel: "apply",
    learningObjective: "After this exercise, the user will understand the sleep-mental health connection and be able to identify 3 evidence-based sleep hygiene practices.",
    learningObjectiveAr: "بعد هذا التمرين، سيفهم المستخدم العلاقة بين النوم والصحة النفسية.",
    content: { scenario: "Sleep and mental health have a BIDIRECTIONAL relationship (Walker, 2017):\n- Poor sleep → worse mental health\n- Poor mental health → worse sleep\n\n**3 Evidence-Based Sleep Practices:**\n1. **Consistent schedule**: Same wake time every day (even weekends)\n2. **Screen curfew**: No screens 30-60 min before bed (blue light suppresses melatonin)\n3. **Wind-down routine**: Reading, stretching, or breathing exercises before sleep",
      scenarioAr: "النوم والصحة النفسية لديهما علاقة ثنائية الاتجاه.",
      task: { type: "scenario_response", instructions: "Which of these sleep habits are evidence-supported?",
        instructionsAr: "أي من عادات النوم هذه مدعومة بالأدلة؟",
        items: [
          { id: "sleep-1", text: "Consistent wake time every day → Evidence-supported (circadian rhythm regulation)", isCorrect: true, explanation: "Strong evidence. Consistent wake times regulate your circadian rhythm, which is more important than consistent bedtimes." },
          { id: "sleep-2", text: "'Just force yourself to sleep through willpower.' → NOT evidence-supported", isCorrect: true, explanation: "Paradoxically, trying harder to sleep makes it harder. This is the 'sleep effort paradox.' Relaxation, not willpower, aids sleep." }
        ]
      },
      feedback: { correct: "Great sleep literacy! Remember: sleep is not a luxury — it's a fundamental pillar of mental health.",
        correctAr: "ممتاز! تذكر: النوم ليس رفاهية — إنه ركيزة أساسية للصحة النفسية.",
        incorrect: "Review the evidence-based practices. The key is consistency and wind-down routines.",
        incorrectAr: "راجع الممارسات المبنية على الأدلة." }
    },
    whatNotToDo: ["Don't equate difficulty sleeping with insomnia disorder — occasional sleep difficulty is normal", "Don't replace professional help with sleep hygiene alone if you have persistent sleep problems"],
    keyhunterId: "mh-kh-12", evidence: "Walker, M. (2017). Why We Sleep. Scribner.",
    safetyNote: null, trackConfidence: false, requiresEightGate: false
  },

  { id: "mh-day-13", title: "Social Media and Your Mental Health", titleAr: "وسائل التواصل الاجتماعي وصحتك النفسية",
    mvp: "mental-health", day: 13, duration: 12, difficulty: "intermediate", category: "mixed", bloomLevel: "evaluate",
    learningObjective: "After this exercise, the user will understand the nuanced relationship between social media and mental health and apply the active-vs-passive use framework.",
    learningObjectiveAr: "بعد هذا التمرين، سيفهم المستخدم العلاقة بين وسائل التواصل الاجتماعي والصحة النفسية.",
    content: { scenario: "Social media's impact on mental health is MORE NUANCED than headlines suggest (Orben, 2020):\n\n**Key findings from research:**\n- The correlation between social media use and wellbeing is very small (r ≈ -0.04)\n- PASSIVE use (scrolling, comparing) is linked to worse outcomes\n- ACTIVE use (messaging, creating, connecting) is linked to better outcomes\n- The relationship is correlational, not necessarily causal\n\nThe real question is not 'Is social media bad?' but 'HOW do you use it?'",
      scenarioAr: "تأثير وسائل التواصل الاجتماعي على الصحة النفسية أكثر دقة مما تقترحه العناوين.",
      task: { type: "scenario_response", instructions: "Classify each social media behavior as ACTIVE or PASSIVE use.",
        instructionsAr: "صنف كل سلوك على وسائل التواصل الاجتماعي كاستخدام نشط أو سلبي.",
        items: [
          { id: "sm-1", text: "Scrolling through Instagram for 2 hours comparing yourself to influencers → PASSIVE (linked to worse outcomes)", isCorrect: true, explanation: "Passive use + social comparison = the most harmful pattern. Mindless scrolling is associated with decreased wellbeing." },
          { id: "sm-2", text: "Messaging close friends to plan a meetup → ACTIVE (linked to better outcomes)", isCorrect: true, explanation: "Active use that strengthens real relationships is associated with positive outcomes. Social media as a tool for connection, not comparison." }
        ]
      },
      feedback: { correct: "Great nuanced understanding! The message to take away: be intentional about HOW you use social media, not just how MUCH.",
        correctAr: "ممتاز! الرسالة: كن واعياً لكيفية استخدامك لوسائل التواصل.",
        incorrect: "Review the active vs. passive distinction. The key is not usage time alone, but usage quality.",
        incorrectAr: "راجع التمييز بين الاستخدام النشط والسلبي." }
    },
    whatNotToDo: ["Don't demonize all social media — the relationship is nuanced, not simply 'bad'", "Don't ignore your own patterns — self-awareness is the first step to healthier use"],
    keyhunterId: "mh-kh-13", evidence: "Orben, A. (2020). Teenagers, screens and social media. BMJ, 371, m4416.",
    safetyNote: null, trackConfidence: false, requiresEightGate: false
  },

  { id: "mh-day-14", title: "Capstone: Your Mental Health Literacy Toolkit", titleAr: "الختام: مجموعة أدوات معرفتك بالصحة النفسية",
    mvp: "mental-health", day: 14, duration: 15, difficulty: "intermediate", category: "mixed", bloomLevel: "evaluate",
    learningObjective: "After this exercise, the user will synthesize all mental health literacy skills learned over 14 days into a personal action plan.",
    learningObjectiveAr: "بعد هذا التمرين، سيدمج المستخدم جميع مهارات محو الأمية في الصحة النفسية.",
    content: { scenario: "Congratulations on completing 14 days of Mental Health Literacy!\n\nYour Toolkit Summary:\n✓ Affect Labeling (Day 1)\n✓ Stress Response (Day 2)\n✓ Anxiety Literacy (Day 3)\n✓ Depression Literacy (Day 4)\n✓ PERMA Wellbeing (Day 5)\n✓ Stigma Types (Day 6)\n✓ Contact & Empathy (Day 7)\n✓ Myth-Busting (Day 8)\n✓ Cultural Context (Day 9)\n✓ Help-Seeking Pathway (Day 10)\n✓ Safety Planning (Day 11)\n✓ Sleep & Mental Health (Day 12)\n✓ Social Media Literacy (Day 13)\n✓ Synthesis (Day 14)\n\nKey resources:\n- Egypt Crisis Line: 16328\n- Dar al-Ifta: 107\n- WHO Mental Health: who.int/health-topics/mental-health",
      scenarioAr: "مبروك على إكمال 14 يوماً من محو الأمية في الصحة النفسية!",
      task: { type: "scenario_response", instructions: "Create your personal mental health action plan by completing each section.",
        instructionsAr: "أنشئ خطة عملك الشخصية للصحة النفسية.",
        items: [
          { id: "mh-cap-1", text: "My self-care practice: [Choose one PERMA activity to practice weekly]", isCorrect: true, explanation: "Excellent. Having a specific, planned self-care practice makes it more likely you'll follow through." },
          { id: "mh-cap-2", text: "My help-seeking plan: [Identify one person you could talk to if struggling]", isCorrect: true, explanation: "Having a named person (friend, family member, counselor) removes the barrier of 'who would I even tell?'" },
          { id: "mh-cap-3", text: "My crisis resources: 16328 (GSMHAT), 107 (Dar al-Ifta), university counseling", isCorrect: true, explanation: "Saving crisis numbers NOW means you have them WHEN you need them. Don't wait until a crisis to search for help." }
        ]
      },
      feedback: { correct: "Outstanding! You've completed the Mental Health Literacy program and created a personal action plan. Remember: mental health literacy is not a destination — it's a lifelong practice.",
        correctAr: "ممتاز! لقد أكملت برنامج محو الأمية في الصحة النفسية.",
        incorrect: "Complete each section. The action plan is personal — there are no wrong answers, only missing ones.",
        incorrectAr: "أكمل كل قسم." }
    },
    whatNotToDo: ["Don't think this is the end — mental health literacy is a lifelong practice", "Don't forget the crisis resources — save them in your phone now"],
    keyhunterId: "mh-kh-14", evidence: "Jorm, A.F. (2012). Mental health literacy. American Psychologist + Kitchener & Jorm (2002). Mental health first aid.",
    safetyNote: "If you or anyone you know needs support, call 16328 (GSMHAT crisis line).", trackConfidence: false, requiresEightGate: false
  },
];
