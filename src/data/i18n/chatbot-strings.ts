/**
 * Chatbot UI Trilingual Strings
 * Supports: English | Arabic (Fusha) | Egyptian Arabic (arEG)
 */

type T = { en: string; ar: string; arEG?: string };

export const CHAT_STRINGS: Record<string, T> = {
  // Header
  connected:       { en: "Connected", ar: "متصل", arEG: "متصل" },
  assistant:       { en: "EAL Assistant", ar: "مساعد EAL", arEG: "مساعد EAL" },
  
  // Onboarding
  welcome:         { en: "Welcome to EAL Assistant", ar: "مرحباً بك في مساعد EAL", arEG: "أهلاً بيك في مساعد EAL" },
  welcomeDesc:     { en: "Your AI-powered research companion for the Egyptian Awareness Library. Choose a mode and start exploring.", ar: "رفيقك البحثي المدعوم بالذكاء الاصطناعي لمكتبة الوعي المصرية. اختر وضعاً وابدأ الاستكشاف.", arEG: "رفيقك البحثي بالذكاء الاصطناعي لمكتبة الوعي المصرية. اختار موود وابدأ." },
  getStarted:      { en: "Get Started", ar: "ابدأ الآن", arEG: "يلا نبدأ" },
  quickTips:       { en: "💡 Quick Tips", ar: "💡 نصائح سريعة", arEG: "💡 نصائح سريعة" },
  tipEnter:        { en: "• Enter to send · Shift+Enter for new line", ar: "• Enter للإرسال · Shift+Enter لسطر جديد", arEG: "• Enter للإرسال · Shift+Enter لسطر جديد" },
  tipModels:       { en: "• Each model is specialized for a different task", ar: "• كل نموذج مخصص لمهمة مختلفة", arEG: "• كل موديل متخصص في حاجة مختلفة" },
  tipLang:         { en: "• You can write in Arabic, English, or mixed", ar: "• يمكنك الكتابة بالعربي والإنجليزي أو خليط", arEG: "• ممكن تكتب عربي أو إنجليزي أو خليط" },
  tipCopy:         { en: "• Copy button is beside every message", ar: "• زر 'نسخ' موجود بجانب كل رسالة", arEG: "• زر النسخ موجود جنب كل رسالة" },
  
  // Example section
  tryExample:      { en: "Try an example", ar: "أمثلة للتجربة", arEG: "جرب مثال" },
  
  // Notes per mode
  notePrefix:      { en: "Note: ", ar: "ملاحظة: ", arEG: "ملاحظة: " },
  noteAcademic:    { en: "Academic answers include original sources. Click 'Original / Source' to view references.", ar: "الإجابات الأكاديمية تتضمن المصادر الأصلية. اضغط 'أصل / المصدر' لعرض المراجع.", arEG: "الإجابات الأكاديمية فيها المصادر. دوس على 'المصدر' عشان تشوف المراجع." },
  noteClaim:       { en: "Paste any claim and it will be analyzed with confidence scores and red flags.", ar: "الصق أي ادعاء وسيتم تحليله مع درجة الثقة والأعلام الحمراء.", arEG: "الصق أي ادعاء وهيتحلل بدرجة الثقة والأعلام الحمرا." },
  noteTranslation: { en: "Supports MSA and Egyptian dialect. Write in any language and it will auto-translate.", ar: "يدعم العربية الفصحى والعامية المصرية. اكتب بأي لغة وسيتم الترجمة تلقائياً.", arEG: "بيدعم فصحى وعامية مصري. اكتب بأي لغة وهيترجم أوتوماتيك." },
  noteMH:          { en: "This is not therapy. For crisis call 08008880700.", ar: "هذا ليس علاج نفسي. للأزمات اتصل بـ 08008880700.", arEG: "ده مش علاج نفسي. لو في أزمة كلم 08008880700." },
  noteGeneral:     { en: "You can write in Arabic, English, or a mix of both.", ar: "يمكنك الكتابة بالعربي أو الإنجليزي أو خليط من الاتنين.", arEG: "ممكن تكتب عربي أو إنجليزي أو خليط من الاتنين." },
  
  // Loading states
  loadingClaim:    { en: "Fact-checking the claim...", ar: "جاري التحقق من الادعاء...", arEG: "بيتحقق من الادعاء..." },
  loadingTranslation: { en: "Translating...", ar: "جاري الترجمة...", arEG: "بيترجم..." },
  loadingAcademic: { en: "Searching academic sources...", ar: "جاري البحث في المصادر الأكاديمية...", arEG: "بيدور في المصادر الأكاديمية..." },
  loadingMH:       { en: "Analyzing with care...", ar: "جاري التحليل بحساسية...", arEG: "بيحلل بعناية..." },
  loadingGeneral:  { en: "Thinking...", ar: "جاري التفكير...", arEG: "بيفكر..." },
  
  // Actions
  scrollDown:      { en: "Scroll to bottom", ar: "انزل للأسفل", arEG: "نزّل لتحت" },
  downloadChat:    { en: "Download chat", ar: "تحميل المحادثة", arEG: "حمّل المحادثة" },
  exportBtn:       { en: "Export", ar: "تصدير", arEG: "تصدير" },
  
  // Placeholders
  placeholderClaim:    { en: "Paste a claim to fact-check...", ar: "الصق الادعاء هنا للتحقق منه...", arEG: "الصق الادعاء هنا عشان نتحقق منه..." },
  placeholderTranslation: { en: "Enter text to translate...", ar: "اكتب النص للترجمة...", arEG: "اكتب النص عشان يتترجم..." },
  placeholderAcademic: { en: "Ask your research question...", ar: "اكتب سؤالك الأكاديمي...", arEG: "اكتب سؤالك الأكاديمي..." },
  placeholderMH:       { en: "Ask about mental health...", ar: "اكتب سؤالك عن الصحة النفسية...", arEG: "اكتب سؤالك عن الصحة النفسية..." },
  placeholderGeneral:  { en: "Type your message...", ar: "اكتب رسالتك...", arEG: "اكتب رسالتك..." },
  
  // Error states
  errorOccurred:   { en: "⚠️ Sorry, an error occurred. Please try again.", ar: "⚠️ عذراً، حدث خطأ. حاول مرة أخرى.", arEG: "⚠️ معلش، حصل مشكلة. جرب تاني." },
  retryBtn:        { en: "🔄 Retry", ar: "🔄 إعادة المحاولة", arEG: "🔄 جرب تاني" },
};
