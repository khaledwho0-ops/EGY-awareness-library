/**
 * Religion Hub Exercises — Days 2-14
 * Framework: §10.2, §13.2, §16.2
 *
 * Distribution (§16.2):
 * Days 1-7: Positive religious coping (7 exercises, matching Brief RCOPE)
 * Days 8-11: Negative coping threats (4 exercises)
 * Days 12-14: Boundaries (3 exercises)
 *
 * Day 1 exists as JSON. This module provides days 2-14.
 * Theoretical stack (§8.3): Pargament Religious Coping, Brief RCOPE,
 * Psychology of Religion, Spiritual Bypassing, Moderation Theory
 */

export const RELIGION_HUB_EXERCISES = [
  // POSITIVE RELIGIOUS COPING (Days 2-7)
  { id: "rh-day-02", title: "Benevolent Reappraisal: Finding Meaning in Difficulty",
    titleAr: "إعادة التقييم الخيّر: إيجاد المعنى في الصعوبات",
    mvp: "religion-hub", day: 2, duration: 12, difficulty: "beginner",
    category: "positive_coping", bloomLevel: "understand",
    learningObjective: "After this exercise, the user will understand benevolent religious reappraisal as a positive coping strategy and distinguish it from denial or toxic positivity.",
    learningObjectiveAr: "بعد هذا التمرين، سيفهم المستخدم إعادة التقييم الديني الخيّر كاستراتيجية تكيف إيجابية.",
    content: { scenario: "Benevolent religious reappraisal (Pargament, 2011) is the process of finding positive meaning in difficult situations through a spiritual lens:\n\n- 'This difficulty is an opportunity for growth'\n- 'God is teaching me patience through this challenge'\n- 'I trust that there is wisdom in what I don't yet understand'\n\n**What it IS**: Actively seeking meaning while acknowledging pain\n**What it is NOT**: Denying that something is difficult, or dismissing your own emotions\n\nKey distinction: Reappraisal + acknowledging difficulty = healthy coping\nReappraisal + denying difficulty = spiritual bypassing (unhealthy)",
      scenarioAr: "إعادة التقييم الديني الخيّر هي عملية إيجاد معنى إيجابي في المواقف الصعبة.",
      task: { type: "scenario_response", instructions: "For each statement, identify: healthy benevolent reappraisal or spiritual bypassing?",
        instructionsAr: "لكل عبارة، حدد: إعادة تقييم صحية أم تجاوز روحي؟",
        items: [
          { id: "br-1", text: "'This illness is painful, but I believe I can find strength through patience and trust in God.' → Healthy reappraisal", isCorrect: true, explanation: "Healthy reappraisal. The person acknowledges the pain ('this is painful') while seeking meaning. Both emotions and faith coexist." },
          { id: "br-2", text: "'There's nothing wrong with me. God would never let me suffer. I don't need help.' → Spiritual bypassing", isCorrect: true, explanation: "Spiritual bypassing. The person denies the difficulty entirely and uses religion to avoid addressing the problem. This can delay necessary help-seeking." },
          { id: "br-3", text: "'I'm struggling, and I don't fully understand why. But I trust that this struggle has purpose, even if I can't see it now.' → Healthy reappraisal", isCorrect: true, explanation: "Healthy reappraisal with honesty. Acknowledging both the struggle AND uncertainty while maintaining trust. This is the healthiest form." }
        ]
      },
      feedback: { correct: "Excellent distinction! The key is that healthy reappraisal INCLUDES acknowledging difficulty, not replacing it. Faith and honest emotion can coexist.",
        correctAr: "ممتاز! المفتاح هو أن إعادة التقييم الصحية تتضمن الاعتراف بالصعوبة.",
        incorrect: "Review the distinction: reappraisal + acknowledging pain = healthy. Reappraisal + denying pain = bypassing.",
        incorrectAr: "راجع التمييز." }
    },
    whatNotToDo: ["Don't tell someone in pain 'everything happens for a reason' without first acknowledging their suffering", "Don't use spiritual language to dismiss legitimate distress"],
    keyhunterId: "rh-kh-02", evidence: "Park, C.L. (2010). Making sense of the meaning literature. Psychological Bulletin, 136(2), 257-301.",
    safetyNote: "⚠️ This is an academic psychology-of-religion perspective. It does NOT issue religious verdicts or fatwas.", trackConfidence: false, requiresEightGate: false
  },

  { id: "rh-day-03", title: "Seeking Spiritual Support: The Power of Community",
    titleAr: "طلب الدعم الروحي: قوة المجتمع", mvp: "religion-hub", day: 3, duration: 12, difficulty: "beginner",
    category: "positive_coping", bloomLevel: "understand",
    learningObjective: "After this exercise, the user will understand how religious community support functions as a positive coping resource and recognize when it becomes controlling.",
    learningObjectiveAr: "بعد هذا التمرين، سيفهم المستخدم كيف يعمل دعم المجتمع الديني كمورد تكيف إيجابي.",
    content: { scenario: "Religious communities can be powerful sources of support (Krause, 2008):\n\n**Positive functions:**\n- Emotional support during difficult times\n- Practical help (meals, childcare, financial aid)\n- Sense of belonging and identity\n- Shared meaning-making resources\n\n**Warning signs of unhealthy community dynamics:**\n- Pressure to conform without question\n- Shaming for doubt or independent thinking\n- Isolation from outside relationships\n- Using guilt to maintain control",
      scenarioAr: "المجتمعات الدينية يمكن أن تكون مصادر دعم قوية.",
      task: { type: "matching", instructions: "Classify each scenario as healthy community support or warning sign.",
        instructionsAr: "صنف كل سيناريو كدعم مجتمعي صحي أو علامة تحذيرية.",
        items: [
          { id: "comm-1", text: "A mosque organizes meals for a family dealing with illness → Healthy support", isCorrect: true, explanation: "Healthy community support. Practical help without conditions demonstrates genuine care and social capital." },
          { id: "comm-2", text: "A group leader says 'If you question our interpretation, you are leaving the faith.' → Warning sign", isCorrect: true, explanation: "Warning sign. Equating questioning with apostasy is a control mechanism, not healthy spiritual guidance. Healthy communities welcome thoughtful questions." },
          { id: "comm-3", text: "Friends from the community regularly check in during a stressful period → Healthy support", isCorrect: true, explanation: "Healthy support. Regular, non-intrusive check-ins demonstrate genuine concern and belonging." }
        ]
      },
      feedback: { correct: "Well done! You can distinguish healthy community support from controlling dynamics. Healthy communities support growth AND allow questions.",
        correctAr: "أحسنت! يمكنك التمييز بين الدعم المجتمعي الصحي والديناميكيات المسيطرة.",
        incorrect: "Review: healthy support empowers; controlling dynamics restrict. The key is whether the community encourages growth or demands conformity.",
        incorrectAr: "راجع: الدعم الصحي يمكّن؛ الديناميكيات المسيطرة تقيد." }
    },
    whatNotToDo: ["Don't demonize all religious communities — most provide genuine support", "Don't ignore warning signs of unhealthy dynamics"],
    keyhunterId: "rh-kh-03", evidence: "Krause, N. (2008). Aging in the Church. Templeton Foundation Press.",
    safetyNote: "⚠️ This is a psychology-of-religion perspective, NOT a theological ruling.", trackConfidence: false, requiresEightGate: false
  },

  { id: "rh-day-04", title: "Forgiveness: Letting Go Without Condoning", titleAr: "المسامحة: التخلي دون القبول",
    mvp: "religion-hub", day: 4, duration: 14, difficulty: "intermediate", category: "positive_coping", bloomLevel: "analyze",
    learningObjective: "After this exercise, the user will differentiate between decisional and emotional forgiveness and understand forgiveness as a coping strategy distinct from reconciliation.",
    learningObjectiveAr: "بعد هذا التمرين، سيميز المستخدم بين المسامحة القرارية والعاطفية.",
    content: { scenario: "Forgiveness is one of the most misunderstood concepts (Worthington, 2005):\n\n- Forgiveness ≠ Reconciliation (you can forgive without restoring the relationship)\n- Forgiveness ≠ Condoning (forgiving doesn't mean what happened was OK)\n- Forgiveness ≠ Forgetting (releasing resentment, not erasing memory)\n\nIn religious contexts, forgiveness is emphasized. But FORCED forgiveness can be harmful.\n\n**Healthy forgiveness**: A personal process of releasing resentment for YOUR wellbeing\n**Unhealthy pressure**: Others telling you to 'just forgive' before you're ready",
      scenarioAr: "المسامحة من أكثر المفاهيم سوء فهم.",
      task: { type: "scenario_response", instructions: "For each scenario, identify: healthy forgiveness process or unhealthy pressure?",
        instructionsAr: "لكل سيناريو: عملية مسامحة صحية أم ضغط غير صحي؟",
        items: [
          { id: "forg-1", text: "A person decides to release their resentment toward someone who hurt them, while maintaining boundaries. → Healthy forgiveness", isCorrect: true, explanation: "Healthy. They are choosing to release resentment for their own wellbeing while maintaining protective boundaries. This is the REACH model of forgiveness." },
          { id: "forg-2", text: "A community leader tells a domestic abuse survivor they MUST forgive their abuser immediately to be a good believer. → Unhealthy pressure", isCorrect: true, explanation: "Unhealthy and dangerous. Pressuring abuse survivors to forgive immediately can normalize harm and prevent necessary safety measures. Forgiveness, if it comes, must be on the person's own timeline." }
        ]
      },
      feedback: { correct: "Excellent understanding! Healthy forgiveness is a GIFT you give yourself — it is never an obligation imposed by others.",
        correctAr: "فهم ممتاز!",
        incorrect: "Review the distinction. Forgiveness is a personal process, not an externally imposed demand.",
        incorrectAr: "راجع التمييز." }
    },
    whatNotToDo: ["Don't pressure someone to forgive before they're ready", "Don't confuse forgiveness with excusing or enabling harmful behavior"],
    keyhunterId: "rh-kh-04", evidence: "Worthington, E.L., Jr. (2005). Handbook of Forgiveness. Routledge.",
    safetyNote: "⚠️ If you are in an abusive situation, forgiveness should NEVER be prioritized over safety. Contact help first.", trackConfidence: false, requiresEightGate: false
  },

  { id: "rh-day-05", title: "Prayer as Coping: Types and Boundaries", titleAr: "الصلاة كتكيف: أنواعها وحدودها",
    mvp: "religion-hub", day: 5, duration: 12, difficulty: "beginner", category: "positive_coping", bloomLevel: "understand",
    learningObjective: "After this exercise, the user will understand different types of prayer from a psychology perspective and recognize when prayer supports wellbeing versus when it may delay needed help.",
    learningObjectiveAr: "بعد هذا التمرين، سيفهم المستخدم أنواع الصلاة المختلفة من منظور نفسي.",
    content: { scenario: "Research on prayer and mental health (Masters & Spielmans, 2007) shows:\n\n**Positive forms:**\n- Meditative/contemplative prayer → similar benefits to meditation (stress reduction)\n- Gratitude-focused prayer → linked to wellbeing (Emmons & McCullough, 2003)\n- Conversational prayer → sense of connection, emotional processing\n\n**When prayer may NOT be enough alone:**\n- When used to REPLACE professional help for clinical conditions\n- When guilt from 'unanswered prayers' increases distress\n- When prayer becomes compulsive (possible scrupulosity)\n\nKey principle: Prayer AND professional help can coexist beautifully.",
      scenarioAr: "البحث عن الصلاة والصحة النفسية يظهر أنواعاً مختلفة.",
      task: { type: "scenario_response", instructions: "For each scenario, identify: prayer supporting wellbeing or prayer potentially delaying needed help?",
        instructionsAr: "لكل سيناريو: الصلاة تدعم الرفاهية أو تؤخر المساعدة المطلوبة؟",
        items: [
          { id: "pray-1", text: "A student prays for calm before exams and uses breathing techniques learned from prayer rituals. → Prayer supporting wellbeing", isCorrect: true, explanation: "Positive use. The meditative aspects of prayer naturally support stress management. This complements healthy coping." },
          { id: "pray-2", text: "A student with severe depression says 'I just need to pray harder' and refuses to see a counselor. → Prayer potentially delaying help", isCorrect: true, explanation: "Concerning pattern. While prayer can support recovery, using it to REPLACE professional help for clinical depression can delay critical treatment." }
        ]
      },
      feedback: { correct: "Well balanced! The healthiest approach recognizes prayer as a valuable support that complements, not replaces, professional help when needed.",
        correctAr: "متوازن! النهج الأصح يعترف بالصلاة كدعم قيم يكمل المساعدة المهنية.",
        incorrect: "Review: the key is not whether prayer helps (it often does), but whether it's being used to AVOID professional help when needed.",
        incorrectAr: "راجع: المفتاح ليس ما إذا كانت الصلاة تساعد، بل ما إذا كانت تُستخدم لتجنب المساعدة المهنية." }
    },
    whatNotToDo: ["Don't dismiss the psychological benefits of prayer — research supports them", "Don't use prayer as the ONLY response to clinical mental health conditions"],
    keyhunterId: "rh-kh-05", evidence: "Masters, K.S., & Spielmans, G.I. (2007). Prayer and health. Journal of Behavioral Medicine, 30(4), 329-338.",
    safetyNote: "⚠️ This is a psychology perspective. No theological claims are being made about the spiritual efficacy of prayer.", trackConfidence: false, requiresEightGate: false
  },

  { id: "rh-day-06", title: "Hope and Optimism Through a Spiritual Lens", titleAr: "الأمل والتفاؤل من منظور روحي",
    mvp: "religion-hub", day: 6, duration: 12, difficulty: "beginner", category: "positive_coping", bloomLevel: "apply",
    learningObjective: "After this exercise, the user will understand hope as a psychological construct with spiritual dimensions and differentiate active hope from passive wishful thinking.",
    learningObjectiveAr: "بعد هذا التمرين، سيفهم المستخدم الأمل كبناء نفسي ذو أبعاد روحية.",
    content: { scenario: "Hope has both a psychological and spiritual dimension (Snyder, 2002):\n\n**Psychological hope** (Snyder's Hope Theory):\n- Agency thinking: 'I CAN do something about this'\n- Pathways thinking: 'I CAN FIND a way to do it'\n\n**Spiritual hope**: Trust that meaning exists even when pathways are unclear\n\n**Healthy hope** = agency + pathways + trust\n**Passive wishful thinking** = waiting without action\n\nIn Islamic tradition: Tawakkul (trust in God) + amal (action/work) = healthy pattern\nTawakkul WITHOUT action = fatalism (not recommended in mainstream Islamic scholarship)",
      scenarioAr: "الأمل له بعد نفسي وروحي.",
      task: { type: "scenario_response", instructions: "Classify each response as active hope or passive wishful thinking.",
        instructionsAr: "صنف كل استجابة كأمل نشط أو تمنٍّ سلبي.",
        items: [
          { id: "hope-1", text: "'I'm facing a challenge, but I've identified 3 possible solutions and I trust that God will support my effort.' → Active hope", isCorrect: true, explanation: "Active hope: combines agency (identified solutions), pathways (3 options), and spiritual trust. This is the healthiest pattern." },
          { id: "hope-2", text: "'I'll just wait and see what happens. If it's meant to be, it will be.' → Passive wishful thinking", isCorrect: true, explanation: "Passive: no agency, no pathways, only waiting. This confuses tawakkul with fatalism. Mainstream Islamic scholarship emphasizes trust WITH action." }
        ]
      },
      feedback: { correct: "Excellent! Active hope combines three elements: agency (I CAN), pathways (I'll FIND a way), and trust. Together they create resilience.",
        correctAr: "ممتاز! الأمل النشط يجمع ثلاثة عناصر.",
        incorrect: "Review: active hope ≠ passive waiting. True hope involves action, planning, AND trust.",
        incorrectAr: "راجع: الأمل النشط ≠ الانتظار السلبي." }
    },
    whatNotToDo: ["Don't equate spiritual trust with passivity", "Don't dismiss hope as 'just wishful thinking' — it has strong empirical support"],
    keyhunterId: "rh-kh-06", evidence: "Snyder, C.R. (2002). Hope theory: Rainbows in the mind. Psychological Inquiry, 13(4), 249-275.",
    safetyNote: "⚠️ Academic perspective. No theological rulings are made.", trackConfidence: false, requiresEightGate: false
  },

  { id: "rh-day-07", title: "Gratitude and Sabr: Ancient Wisdom, Modern Evidence", titleAr: "الشكر والصبر: حكمة قديمة وأدلة حديثة",
    mvp: "religion-hub", day: 7, duration: 12, difficulty: "beginner", category: "positive_coping", bloomLevel: "apply",
    learningObjective: "After this exercise, the user will understand gratitude and patience as evidence-based wellbeing practices with spiritual roots and practice one gratitude exercise.",
    learningObjectiveAr: "بعد هذا التمرين، سيفهم المستخدم الشكر والصبر كممارسات رفاهية مبنية على الأدلة.",
    content: { scenario: "Gratitude and patience are both: (1) valued in spiritual traditions AND (2) supported by psychological research.\n\n**Gratitude** (Emmons & McCullough, 2003):\n- Writing 3 things you're grateful for each day improved wellbeing in RCTs\n- Gratitude shifts attention from what's missing to what's present\n- ≠ minimizing problems (acknowledging good doesn't erase difficulty)\n\n**Sabr (Patience)** in psychological terms:\n- Delayed gratification → associated with better long-term outcomes\n- Emotional regulation → tolerating discomfort without reactive behavior\n- ≠ Passivity (sabr includes active endurance, not just waiting)",
      scenarioAr: "الشكر والصبر كلاهما: (1) ذو قيمة في التقاليد الروحية و(2) مدعوم بالبحث النفسي.",
      task: { type: "scenario_response", instructions: "Practice: Write 3 specific things you are genuinely grateful for today. Be specific, not generic.",
        instructionsAr: "تدرب: اكتب 3 أشياء محددة أنت ممتن لها حقاً اليوم.",
        items: [
          { id: "grat-1", text: "My gratitude is specific (e.g., 'I'm grateful my friend called to check on me today') not generic ('I'm grateful for friends').", isCorrect: true, explanation: "Excellent. Specific gratitude is more effective than generic gratitude (Emmons, 2003). The more detailed, the more impactful." },
          { id: "grat-2", text: "I can hold gratitude AND acknowledge difficulty at the same time.", isCorrect: true, explanation: "This is the key insight. Gratitude doesn't erase difficulty. Holding both simultaneously is the most psychologically healthy pattern." }
        ]
      },
      feedback: { correct: "Wonderful! You've practiced evidence-based gratitude. Research shows that even 5 minutes of daily gratitude practice can improve wellbeing over time.",
        correctAr: "رائع! لقد تدربت على الشكر المبني على الأدلة.",
        incorrect: "Review: gratitude should be specific, and it should coexist with acknowledging difficulty.",
        incorrectAr: "راجع: الشكر يجب أن يكون محدداً ويتعايش مع الاعتراف بالصعوبة." }
    },
    whatNotToDo: ["Don't use gratitude to guilt-trip someone ('you should be grateful!')", "Don't confuse gratitude with dismissing legitimate pain"],
    keyhunterId: "rh-kh-07", evidence: "Emmons, R.A., & McCullough, M.E. (2003). Counting blessings vs. burdens. JPSP, 84(2), 377-389.",
    safetyNote: "⚠️ Academic perspective. If practicing gratitude triggers distressing feelings, that's OK — speak to a trusted person.", trackConfidence: false, requiresEightGate: false
  },

  // NEGATIVE COPING THREATS (Days 8-11)
  { id: "rh-day-08", title: "Spiritual Bypassing: When Faith Masks Pain", titleAr: "التجاوز الروحي: عندما يخفي الإيمان الألم",
    mvp: "religion-hub", day: 8, duration: 14, difficulty: "intermediate", category: "threat_awareness", bloomLevel: "evaluate",
    learningObjective: "After this exercise, the user will be able to define spiritual bypassing, recognize its patterns, and distinguish it from genuine faith-based resilience.",
    learningObjectiveAr: "بعد هذا التمرين، سيتمكن المستخدم من تعريف التجاوز الروحي والتمييز بينه وبين المرونة الإيمانية الحقيقية.",
    content: { scenario: "Spiritual Bypassing (Welwood, 2000; Cashwell et al., 2007) is using spiritual practices to AVOID dealing with emotional pain, unresolved trauma, or necessary action.\n\nExamples:\n- 'I don't need therapy — I just need to pray more'\n- 'If you truly had faith, you wouldn't feel depressed'\n- 'Don't question — just trust God'\n\nThis is NOT about doubting faith. It's about recognizing when spiritual language is used to AVOID rather than PROCESS difficulty.",
      scenarioAr: "التجاوز الروحي هو استخدام الممارسات الروحية لتجنب التعامل مع الألم العاطفي.",
      task: { type: "scenario_response", instructions: "Identify: spiritual bypassing or healthy coping?",
        instructionsAr: "حدد: تجاوز روحي أم تكيف صحي؟",
        items: [
          { id: "bypass-1", text: "'I acknowledge I'm struggling AND I find comfort in prayer.' → Healthy coping (acknowledges + seeks support)", isCorrect: true, explanation: "Healthy. Both acknowledgment of difficulty AND spiritual comfort are present. This is integration, not avoidance." },
          { id: "bypass-2", text: "'A true believer never feels anxious. If I had stronger faith, I wouldn't have these feelings.' → Spiritual bypassing", isCorrect: true, explanation: "Spiritual bypassing. This denies the reality of human emotions and creates guilt about natural feelings. Even the most devout people experience anxiety." },
          { id: "bypass-3", text: "'My friend is depressed but I told them to just read Quran more instead of seeing a therapist.' → Spiritual bypassing", isCorrect: true, explanation: "Spiritual bypassing AND potentially dangerous. Substituting professional help with religious practice alone when someone has a clinical condition can delay critical treatment." }
        ]
      },
      feedback: { correct: "Outstanding awareness! Recognizing spiritual bypassing protects both you and others from using faith as an avoidance mechanism. Faith and honesty about suffering can coexist.",
        correctAr: "وعي ممتاز! التعرف على التجاوز الروحي يحمي من استخدام الإيمان كآلية تجنب.",
        incorrect: "Review: the key test is whether the person ACKNOWLEDGES their difficulty or DENIES it using spiritual language.",
        incorrectAr: "راجع: الاختبار الأساسي هو ما إذا كان الشخص يعترف بصعوبته أو ينكرها." }
    },
    whatNotToDo: ["Don't use this concept to dismiss all religious coping — most is healthy", "Don't accuse others of spiritual bypassing without care and sensitivity"],
    keyhunterId: "rh-kh-08", evidence: "Welwood, J. (2000). Toward a Psychology of Awakening. Shambhala. Cashwell, C.S., et al. (2007). Counseling and Values.",
    safetyNote: "⚠️ Academic analysis. No theological judgments.", trackConfidence: false, requiresEightGate: false
  },

  { id: "rh-day-09", title: "Punitive Reappraisal: When God Seems Angry", titleAr: "إعادة التقييم العقابي: عندما يبدو الله غاضباً",
    mvp: "religion-hub", day: 9, duration: 14, difficulty: "intermediate", category: "threat_awareness", bloomLevel: "analyze",
    learningObjective: "After this exercise, the user will understand punitive religious reappraisal as a risk factor for mental health and distinguish accountability from shame-based thinking.",
    learningObjectiveAr: "بعد هذا التمرين، سيفهم المستخدم إعادة التقييم الديني العقابي كعامل خطر.",
    content: { scenario: "Punitive religious reappraisal (Pargament et al., 1998) occurs when someone interprets difficulty as divine punishment:\n\n- 'God is punishing me for my sins'\n- 'I deserve this suffering'\n- 'If I were a better person, this wouldn't happen'\n\nResearch consistently shows punitive religious coping is associated with WORSE mental health outcomes (more depression, anxiety, and distress).\n\nHealthier alternative: Accountability WITHOUT self-destruction\n- 'I can learn from my mistakes' ≠ 'I deserve suffering'\n- 'I seek God's guidance' ≠ 'God is angry with me'\n- 'Repentance' ≠ 'Self-hatred'",
      scenarioAr: "إعادة التقييم الديني العقابي يحدث عندما يفسر شخص الصعوبة كعقاب إلهي.",
      task: { type: "scenario_response", instructions: "Rewrite each punitive statement into a psychologically healthier alternative.",
        instructionsAr: "أعد صياغة كل عبارة عقابية إلى بديل أكثر صحة نفسياً.",
        items: [
          { id: "pun-1", text: "From: 'God is punishing me.' → To: 'I'm facing a challenge, and I trust that growth is possible through this difficulty.'", isCorrect: true, explanation: "Excellent reframing. Shifts from punishment to growth while maintaining spiritual trust. This is benevolent reappraisal instead of punitive." },
          { id: "pun-2", text: "From: 'I deserve to suffer.' → To: 'I can seek forgiveness and learn from my mistakes without destroying myself.'", isCorrect: true, explanation: "Excellent. Preserves accountability (learning from mistakes) while removing self-destructive element. Tawbah (repentance) in Islam is about returning, not self-punishment." }
        ]
      },
      feedback: { correct: "Excellent reframing! Moving from punitive to benevolent reappraisal is one of the most important shifts in religious coping.",
        correctAr: "إعادة صياغة ممتازة!",
        incorrect: "Review: the goal is to preserve accountability while removing self-destruction. Repentance ≠ self-hatred.",
        incorrectAr: "راجع: الهدف الحفاظ على المسؤولية مع إزالة تدمير الذات." }
    },
    whatNotToDo: ["Don't dismiss theological concepts — engage with them through a wellbeing lens", "Don't tell someone their suffering is punishment — this causes harm"],
    keyhunterId: "rh-kh-09", evidence: "Pargament, K.I., et al. (1998). Patterns of positive and negative religious coping. JSSR, 37(4), 710-724.",
    safetyNote: "⚠️ If punitive beliefs are causing you significant distress, please consider speaking with both a trusted moderate scholar and a mental health professional.", trackConfidence: false, requiresEightGate: false
  },

  { id: "rh-day-10", title: "Scrupulosity: When Devotion Becomes Distress", titleAr: "الوسوسة: عندما يصبح التقوى اضطراباً",
    mvp: "religion-hub", day: 10, duration: 14, difficulty: "intermediate", category: "threat_awareness", bloomLevel: "analyze",
    learningObjective: "After this exercise, the user will understand scrupulosity, distinguish it from healthy devotion, and know when professional help is appropriate.",
    learningObjectiveAr: "بعد هذا التمرين، سيفهم المستخدم الوسوسة ويميزها عن التقوى الصحية.",
    content: { scenario: "Scrupulosity (Abramowitz et al., 2002) is excessive, distressing worry about sin, purity, or religious practice:\n\n**Healthy devotion:**\n- Feels meaningful and connected\n- Allows for human imperfection\n- Brings peace, even during challenges\n\n**Scrupulosity (waswas in Islamic tradition):**\n- Persistent, unwanted doubt about religious adequacy\n- Excessive repetition of prayers/rituals despite 'proper' performance\n- Intense guilt disproportionate to the 'offense'\n- Distress that interferes with daily life\n\n**Important**: In Islamic scholarship, excessive waswas is recognized as a known problem, not a sign of weak faith.",
      scenarioAr: "الوسوسة هي قلق مفرط ومؤلم بشأن الخطيئة أو الطهارة أو الممارسة الدينية.",
      task: { type: "scenario_response", instructions: "Classify: healthy devotion or potential scrupulosity?",
        instructionsAr: "صنف: تقوى صحية أو وسوسة محتملة؟",
        items: [
          { id: "scrup-1", text: "A student repeats wudu 7+ times because they 'can't be sure it was perfect.' → Potential scrupulosity", isCorrect: true, explanation: "Potential scrupulosity. Excessive repetition despite proper performance and persistent doubt are hallmarks. Islamic scholars specifically address this as waswas." },
          { id: "scrup-2", text: "A student prays regularly and feels at peace, even though they occasionally make mistakes. → Healthy devotion", isCorrect: true, explanation: "Healthy devotion. Acceptance of human imperfection with a sense of peace is the hallmark of healthy religious practice." }
        ]
      },
      feedback: { correct: "Excellent understanding! Recognizing the difference between devotion and scrupulosity can help people get appropriate support. Both religious guidance AND professional help may be needed.",
        correctAr: "فهم ممتاز!",
        incorrect: "Review: healthy devotion brings peace; scrupulosity brings ongoing distress and compulsive behaviors.",
        incorrectAr: "راجع: التقوى الصحية تجلب السلام؛ الوسوسة تجلب ضيقاً مستمراً." }
    },
    whatNotToDo: ["Don't shame someone for scrupulosity — it's a recognized condition, not weak faith", "Don't diagnose — only professionals can determine if OCD is present"],
    keyhunterId: "rh-kh-10", evidence: "Abramowitz, J.S., et al. (2002). Religious obsessions and compulsions. Behaviour Research and Therapy, 40(7), 819-826.",
    safetyNote: "⚠️ If religious practices are causing significant distress, consider consulting both a trusted scholar and a mental health professional.", trackConfidence: false, requiresEightGate: false
  },

  { id: "rh-day-11", title: "Radicalization Awareness: Protecting Your Mind", titleAr: "الوعي بالتطرف: حماية عقلك",
    mvp: "religion-hub", day: 11, duration: 14, difficulty: "advanced", category: "threat_awareness", bloomLevel: "evaluate",
    learningObjective: "After this exercise, the user will understand psychological models of radicalization, identify early warning signs, and know the difference between strong faith and extremism.",
    learningObjectiveAr: "بعد هذا التمرين، سيفهم المستخدم النماذج النفسية للتطرف.",
    content: { scenario: "Radicalization is a PSYCHOLOGICAL process, not inherent to any religion (Moghaddam, 2005).\n\nMoghaddam's Staircase Model:\n1. Perceived injustice → feeling of being wronged\n2. Perceived options → feeling there are no legitimate solutions\n3. Moral engagement → anger becomes moral righteousness\n4. Us-vs-them → the world divides into good and evil\n5. Action → willingness to act on extreme beliefs\n\n**Strong faith ≠ Extremism:**\n- Strong faith: deep personal conviction + respect for others\n- Extremism: rigid thinking + dehumanization of others\n\nAl-Azhar Observatory actively monitors and counters extremist rhetoric.",
      scenarioAr: "التطرف عملية نفسية وليس متأصلاً في أي دين.",
      task: { type: "scenario_response", instructions: "Identify warning signs vs. normal religious engagement.",
        instructionsAr: "حدد علامات التحذير مقابل الانخراط الديني الطبيعي.",
        items: [
          { id: "rad-1", text: "Sudden isolation from friends, only engaging with a closed online group → Warning sign (Stage 2-3)", isCorrect: true, explanation: "Warning sign. Rapid social isolation combined with joining a closed group mirrors the radicalization pathway." },
          { id: "rad-2", text: "Studying religion seriously, attending lectures by recognized moderate scholars → Normal religious engagement", isCorrect: true, explanation: "Normal. Serious religious study from recognized, moderate sources is healthy engagement." },
          { id: "rad-3", text: "Expressing that 'anyone who disagrees with us is an enemy' → Warning sign (Stage 4 us-vs-them)", isCorrect: true, explanation: "Warning sign. Binary us-vs-them thinking is a hallmark of radicalization. Healthy faith allows for disagreement and diversity." }
        ]
      },
      feedback: { correct: "Excellent awareness! Understanding the psychological process of radicalization helps protect yourself and others. Remember: reporting concerns to trusted individuals can save lives.",
        correctAr: "وعي ممتاز!",
        incorrect: "Review: the key warning signs are isolation, us-vs-them thinking, and dehumanization of others.",
        incorrectAr: "راجع: علامات التحذير الأساسية." }
    },
    whatNotToDo: ["Don't equate being religious with being radical — most religious people are moderate", "Don't try to 'deradicalize' someone yourself — contact appropriate authorities (Al-Azhar Observatory, university counselors)"],
    keyhunterId: "rh-kh-11", evidence: "Moghaddam, F.M. (2005). The Staircase to Terrorism. American Psychologist, 60(2), 161-169.",
    safetyNote: "⚠️ If you are concerned about someone's radicalization, contact: Al-Azhar Observatory or university counseling services.", trackConfidence: false, requiresEightGate: true
  },

  // BOUNDARIES (Days 12-14)
  { id: "rh-day-12", title: "Healthy vs. Unhealthy Religious Engagement", titleAr: "الانخراط الديني الصحي مقابل غير الصحي",
    mvp: "religion-hub", day: 12, duration: 12, difficulty: "intermediate", category: "boundaries", bloomLevel: "evaluate",
    learningObjective: "After this exercise, the user will be able to identify criteria for healthy religious engagement and recognize patterns of unhealthy engagement.",
    learningObjectiveAr: "بعد هذا التمرين، سيتمكن المستخدم من تحديد معايير الانخراط الديني الصحي.",
    content: { scenario: "Allport & Ross (1967) identified two religious orientations:\n\n**Intrinsic**: Religion as an end in itself — lived, internalized values\n**Extrinsic**: Religion as a means to an end — social status, belonging, comfort\n\n**Healthy engagement criteria:**\n✓ Space for questions and doubt\n✓ Balance with other life areas\n✓ Respect for others' choices\n✓ Growth-oriented, not fear-driven\n✓ Professional help welcomed alongside spiritual support\n\n**Unhealthy patterns:**\n✗ No room for doubt → rigidity\n✗ Religious activity replacing all other life areas → imbalance\n✗ Condemning others' different paths → exclusivity\n✗ Fear-based motivation only → anxiety",
      scenarioAr: "أليورت وروس (1967) حددا توجهين دينيين.",
      task: { type: "matching", instructions: "Classify each scenario.",
        instructionsAr: "صنف كل سيناريو.",
        items: [
          { id: "hre-1", text: "A student balances religious study with academics, friendships, and self-care. → Healthy engagement (balanced)", isCorrect: true, explanation: "Healthy. Balance across life areas is a key indicator of healthy religious engagement." },
          { id: "hre-2", text: "A student drops all hobbies, avoids non-religious friends, and feels guilty about any non-religious activity. → Unhealthy pattern (imbalance, guilt-driven)", isCorrect: true, explanation: "Concerning. Dropping all non-religious activities and pervasive guilt suggests imbalanced, fear-driven engagement." }
        ]
      },
      feedback: { correct: "Well evaluated! Healthy engagement is balanced, growth-oriented, and makes room for human complexity. Faith should enhance life, not restrict it.",
        correctAr: "تقييم ممتاز!",
        incorrect: "Review: healthy engagement balances faith with other life areas; unhealthy patterns show rigidity, isolation, or guilt.",
        incorrectAr: "راجع." }
    },
    whatNotToDo: ["Don't use these criteria to judge others' religiosity level", "Don't assume that high religiosity = unhealthy — it's about quality, not quantity"],
    keyhunterId: "rh-kh-12", evidence: "Allport, G.W., & Ross, J.M. (1967). Personal religious orientation and prejudice. JPSP, 5(4), 432-443.",
    safetyNote: "⚠️ Psychology-of-religion perspective. Not a theological ruling.", trackConfidence: false, requiresEightGate: false
  },

  { id: "rh-day-13", title: "When to Seek a Scholar vs. a Therapist", titleAr: "متى تستشير عالماً مقابل معالجاً",
    mvp: "religion-hub", day: 13, duration: 12, difficulty: "intermediate", category: "boundaries", bloomLevel: "apply",
    learningObjective: "After this exercise, the user will understand the complementary roles of religious scholars and mental health professionals and know when each is appropriate.",
    learningObjectiveAr: "بعد هذا التمرين، سيفهم المستخدم الأدوار المتكاملة للعلماء والمتخصصين في الصحة النفسية.",
    content: { scenario: "Religious scholars and mental health professionals have DIFFERENT but COMPLEMENTARY roles:\n\n**Religious scholar (imam, sheikh):**\n- Spiritual guidance and religious questions\n- Ethical and moral reflection\n- Community support and belonging\n- Text interpretation and religious knowledge\n\n**Mental health professional:**\n- Clinical assessment and diagnosis\n- Evidence-based treatment (therapy, medication)\n- Crisis intervention\n- Mental health conditions (depression, anxiety, OCD, PTSD)\n\n**Best approach: Collaboration**, not competition\nMany forward-thinking communities are building bridge programs between imams and psychologists.\n\n🇪🇬 Resources:\n- Dar al-Ifta: 107\n- GSMHAT: 16328",
      scenarioAr: "العلماء والمتخصصون في الصحة النفسية لديهم أدوار مختلفة لكنها متكاملة.",
      task: { type: "matching", instructions: "For each scenario, who is the most appropriate primary resource?",
        instructionsAr: "لكل سيناريو، من المصدر الأنسب؟",
        items: [
          { id: "ref-1", text: "A student has a question about how Islamic ethics apply to a difficult life decision. → Religious scholar", isCorrect: true, explanation: "Correct. This is a religious/ethical question, which is the domain of qualified religious scholars." },
          { id: "ref-2", text: "A student has been experiencing intrusive thoughts, panic attacks, and cannot sleep for weeks. → Mental health professional", isCorrect: true, explanation: "Correct. These are potential symptoms of a clinical condition requiring professional assessment and treatment." },
          { id: "ref-3", text: "A student feels torn between spiritual beliefs and emotional struggles. → BOTH (collaborative approach)", isCorrect: true, explanation: "Correct. The intersection of faith and mental health often benefits from both perspectives working together." }
        ]
      },
      feedback: { correct: "Excellent! The key insight: religious guidance and professional help are COMPLEMENTARY, not competing. Both serve different but equally important needs.",
        correctAr: "ممتاز! التوجيه الديني والمساعدة المهنية متكاملان وليسا متنافسين.",
        incorrect: "Review: the question is not 'which is better' but 'which is appropriate for THIS specific need.'",
        incorrectAr: "راجع: السؤال ليس 'أيهما أفضل' بل 'أيهما مناسب لهذه الحاجة المحددة.'" }
    },
    whatNotToDo: ["Don't present religion and psychology as enemies — they can complement each other", "Don't suggest that someone only needs one approach when they might benefit from both"],
    keyhunterId: "rh-kh-13", evidence: "McMinn, M.R., & Dominguez, A.W. (2005). Psychology and the Church. Nova Science Publishers.",
    safetyNote: "⚠️ For immediate mental health support: call 16328. For religious guidance: call Dar al-Ifta 107.", trackConfidence: false, requiresEightGate: false
  },

  { id: "rh-day-14", title: "Capstone: Religion, Wellbeing, and Your Integrated Toolkit", titleAr: "الختام: الدين والرفاهية ومجموعة أدواتك المتكاملة",
    mvp: "religion-hub", day: 14, duration: 15, difficulty: "intermediate", category: "boundaries", bloomLevel: "evaluate",
    learningObjective: "After this exercise, the user will synthesize all 14 days of learning and create a personal wellbeing plan that integrates spiritual and psychological resources.",
    learningObjectiveAr: "بعد هذا التمرين، سيدمج المستخدم جميع الدروس المتعلمة في خطة رفاهية شخصية.",
    content: { scenario: "Congratulations on completing 14 days of Religion Hub!\n\nYour Toolkit Summary:\n✓ Positive Coping (Day 1) — Collaborative religious coping\n✓ Benevolent Reappraisal (Day 2) — Finding meaning\n✓ Community Support (Day 3) — Healthy vs. controlling\n✓ Forgiveness (Day 4) — Release without condoning\n✓ Prayer as Coping (Day 5) — Types and boundaries\n✓ Hope & Optimism (Day 6) — Active vs. passive\n✓ Gratitude & Patience (Day 7) — Evidence-based practices\n✓ Spiritual Bypassing (Day 8) — Faith masking pain\n✓ Punitive Reappraisal (Day 9) — God's 'punishment' belief\n✓ Scrupulosity (Day 10) — When devotion becomes distress\n✓ Radicalization Awareness (Day 11) — Protecting your mind\n✓ Healthy Engagement (Day 12) — Balance criteria\n✓ Scholar vs. Therapist (Day 13) — Complementary roles\n✓ Integration (Day 14) — Your personal plan",
      scenarioAr: "مبروك على إكمال 14 يوماً من Religion Hub!",
      task: { type: "scenario_response", instructions: "Create your personal wellbeing integration plan.",
        instructionsAr: "أنشئ خطة تكامل الرفاهية الشخصية.",
        items: [
          { id: "rh-cap-1", text: "My positive coping practices: [Choose 2 from Days 1-7]", isCorrect: true, explanation: "Having specific, named practices (e.g., daily gratitude + weekly community connection) makes them more likely to become habits." },
          { id: "rh-cap-2", text: "My warning signs to watch for: [Choose 2 from Days 8-11]", isCorrect: true, explanation: "Self-awareness of potential risks (e.g., spiritual bypassing, punitive thinking) is protective." },
          { id: "rh-cap-3", text: "My support resources: Scholar + Therapist + Crisis (16328)", isCorrect: true, explanation: "Having a mapped support network (spiritual + professional + emergency) is the most resilient configuration." }
        ]
      },
      feedback: { correct: "Outstanding! You've completed the Religion Hub program with a personal integration plan. Remember: faith and wellbeing work together, not against each other.",
        correctAr: "ممتاز! لقد أكملت برنامج Religion Hub مع خطة تكامل شخصية.",
        incorrect: "Complete all three sections. Your plan should include: positive practices, warning signs, and support resources.",
        incorrectAr: "أكمل جميع الأقسام الثلاثة." }
    },
    whatNotToDo: ["Don't think this is the end — wellbeing integration is a lifelong practice", "Don't forget: Dar al-Ifta (107) for religious guidance, GSMHAT (16328) for mental health support"],
    keyhunterId: "rh-kh-14", evidence: "VanderWeele, T.J. (2017). On the promotion of human flourishing. PNAS, 114(31), 8148-8156.",
    safetyNote: "⚠️ For support: GSMHAT 16328 | Dar al-Ifta 107 | Al-Azhar Observatory", trackConfidence: false, requiresEightGate: false
  },
];
