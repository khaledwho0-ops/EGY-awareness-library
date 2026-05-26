/**
 * APPROACH 1: Centralized UI String Map — §23.1 Bilingual Support
 * Every user-visible label in the ExerciseEngine rendered in Arabic.
 */

export const UI = {
  // ── Metadata Strip ──
  bloomLevel: {
    remember:   { en: "Remember",   ar: "تذكر" },
    understand: { en: "Understand", ar: "فهم" },
    apply:      { en: "Apply",      ar: "تطبيق" },
    analyze:    { en: "Analyze",    ar: "تحليل" },
    evaluate:   { en: "Evaluate",   ar: "تقييم" },
    create:     { en: "Create",     ar: "إنشاء" },
  } as Record<string, { en: string; ar: string }>,

  difficulty: {
    beginner:     { en: "Beginner",     ar: "مبتدئ" },
    intermediate: { en: "Intermediate", ar: "متوسط" },
    advanced:     { en: "Advanced",     ar: "متقدم" },
  } as Record<string, { en: string; ar: string }>,

  mvpLabel: {
    deepreal:        { en: "DeepReal",        ar: "ديب ريل" },
    "mental-health": { en: "Mental Health",   ar: "الصحة النفسية" },
    "religion-hub":  { en: "Religion Hub",    ar: "المحور الديني" },
  } as Record<string, { en: string; ar: string }>,

  // ── Phase Titles & Headers ──
  learningObjective:    { en: "Learning Objective:", ar: "هدف التعلم:" },
  scientificFoundation: { en: "🔬 Scientific Foundation", ar: "🔬 الأساس العلمي" },
  safetyNote:           { en: "Safety Note", ar: "ملاحظة أمان" },
  taskType:             { en: "Task type:", ar: "نوع المهمة:" },
  anchoringSource:      { en: "Anchoring Source:", ar: "المصدر المرجعي:" },

  // ── Buttons ──
  beginExercise:        { en: "Begin Exercise",         ar: "ابدأ التمرين" },
  lockConfidence:       { en: "Lock Confidence & Begin", ar: "تثبيت الثقة والبدء" },
  submitAnswer:         { en: "Submit Answer",          ar: "إرسال الإجابة" },
  selectAtLeastOne:     { en: "Select at least one item", ar: "اختر عنصراً واحداً على الأقل" },
  verifyReveal:         { en: "Verify & Reveal Results", ar: "تحقق وكشف النتائج" },
  rateConfidencePost:   { en: "Rate Confidence Post-Exercise", ar: "قيّم ثقتك بعد التمرين" },
  completeExercise:     { en: "Complete Exercise",       ar: "أكمل التمرين" },
  reviewAgain:          { en: "Review Again",            ar: "مراجعة مرة أخرى" },
  exerciseComplete:     { en: "Exercise Complete!",      ar: "اكتمل التمرين!" },

  // ── Confidence Phases ──
  confidencePreTitle:   { en: "🎯 Before we begin, rate your confidence:", ar: "🎯 قبل أن نبدأ، قيّم ثقتك:" },
  confidencePreDesc:    { en: "How confident are you in your ability to handle the topic of this exercise?", ar: "ما مدى ثقتك في قدرتك على التعامل مع موضوع هذا التمرين؟" },
  confidencePostTitle:  { en: "🎯 Now rate your confidence again:", ar: "🎯 قيّم ثقتك الآن مجدداً:" },
  confidencePostDesc:   { en: "After completing this exercise, how confident do you feel?", ar: "بعد إتمام هذا التمرين، ما مدى ثقتك؟" },
  notConfident:         { en: "Not confident", ar: "غير واثق" },
  veryConfident:        { en: "Very confident", ar: "واثق جداً" },
  before:               { en: "Before", ar: "قبل" },
  after:                { en: "After", ar: "بعد" },

  // ── 8-Gate Check ──
  gateTitle:            { en: "Active Verification Loop (§17.5)", ar: "حلقة التحقق النشطة (§17.5)" },
  gateDesc:             { en: "The science of cognitive friction requires you to pause and articulate your reasoning. Complete the 5-Box Verification to proceed.", ar: "تتطلب منك علم الاحتكاك المعرفي التوقف والتعبير عن تفكيرك. أكمل التحقق من 5 صناديق للمتابعة." },
  gateBoxes: [
    { en: "Claim Box",      ar: "صندوق الادعاء",   phEn: "State the claim in one sentence...",                  phAr: "اذكر الادعاء في جملة واحدة..." },
    { en: "Evidence Box",    ar: "صندوق الأدلة",    phEn: "Paste or summarize the evidence...",                   phAr: "الصق الأدلة أو لخصها..." },
    { en: "Context Box",     ar: "صندوق السياق",    phEn: "When was this published? For whom?",                   phAr: "متى نُشر هذا؟ لمن؟" },
    { en: "Emotion Box",     ar: "صندوق المشاعر",   phEn: "How does this content make you feel right now?",       phAr: "كيف يجعلك هذا المحتوى تشعر الآن؟" },
    { en: "Consequence Box",  ar: "صندوق العواقب",   phEn: "What is the harm if this is wrong?",                   phAr: "ما الضرر إذا كان هذا خاطئاً؟" },
  ],

  // ── Feedback Phase ──
  whatNotToDo:          { en: "⚠️ What NOT To Do", ar: "⚠️ ما لا يجب فعله" },
  scienceApplied:       { en: "Science Applied Successfully", ar: "تم تطبيق العلم بنجاح" },
  scienceTrap:          { en: "Scientific Trap Detected", ar: "تم اكتشاف فخ علمي" },

  // ── TimeFrictionGate ──
  frictionLock:         { en: "Take a moment to review your selections before submitting...", ar: "خذ لحظة لمراجعة اختياراتك قبل الإرسال..." },
  frictionUnlock:       { en: "Submit Answer", ar: "إرسال الإجابة" },

  // ── AFS Score ──
  afsLabel:             { en: "Acceptance Friction Score:", ar: "درجة احتكاك القبول:" },
  afsHigh:              { en: "(High critical thinking)", ar: "(تفكير نقدي عالي)" },
  afsMod:               { en: "(Moderate friction)", ar: "(احتكاك معتدل)" },
  afsLow:               { en: "(Low friction — consider slowing down)", ar: "(احتكاك منخفض — فكر في التمهل)" },

  // ── Bias Reflection ──
  biasReflection:       { en: "🪞 Take a Bias Reflection Minute", ar: "🪞 خذ دقيقة للتأمل في التحيز" },

  // ── Breadcrumbs ──
  home:                 { en: "Home", ar: "الرئيسية" },

  // ── Completion ──
  dayCompleted:         { en: "You've completed Day", ar: "لقد أكملت اليوم" },

  // ── Enhancement 16: Sentiment Badge ──
  readingGrade:         { en: "Reading grade", ar: "مستوى القراءة" },
} as const;

/** Pick Arabic or English string from a UI entry */
export function uiStr(entry: { en: string; ar: string }, isAr: boolean): string {
  return isAr ? entry.ar : entry.en;
}
