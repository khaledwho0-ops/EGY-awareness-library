import type { LocalizedText, ModuleId } from "./module-briefings";

export interface ModuleGuideOption {
  id: string;
  module: ModuleId;
  emotion: LocalizedText;
  validation: LocalizedText;
  scientificReason: LocalizedText;
  recommendation: LocalizedText;
  caution: LocalizedText;
  firstStepId: string;
  recommendedTab: "exercises" | "rules" | "myths" | "scenarios" | "tricks" | "reverse";
}

const t = (en: string, ar: string, arEG?: string): LocalizedText => ({ en, ar, arEG: arEG || ar });

export const MODULE_GUIDES: Record<ModuleId, ModuleGuideOption[]> = {
  deepreal: [
    {
      id: "rushed",
      module: "deepreal",
      emotion: t("I feel rushed and I need a fast answer", "أنا مستعجل وأحتاج إجابة سريعة"),
      validation: t("Speed pressure is exactly when misinformation wins.", "ضغط السرعة هو اللحظة التي ينتصر فيها التضليل."),
      scientificReason: t("Urgency reduces source checking and increases belief-by-forwarding.", "الاستعجال يقلل فحص المصدر ويزيد التصديق بالمشاركة."),
      recommendation: t("Start with claim triage, then open real scenarios.", "ابدأ بفرز الادعاء ثم افتح السيناريوهات الواقعية."),
      caution: t("Do not share anything before you locate the original source.", "لا تشارك أي شيء قبل الوصول إلى المصدر الأصلي."),
      firstStepId: "triage",
      recommendedTab: "scenarios",
    },
    {
      id: "angry",
      module: "deepreal",
      emotion: t("I feel angry and I want to expose something", "أنا غاضب وأريد فضح شيء ما"),
      validation: t("Anger can sharpen attention but it also narrows verification.", "الغضب قد يزيد الانتباه لكنه يضيق التحقق."),
      scientificReason: t("Emotion-heavy content often tricks users into skipping context.", "المحتوى المشحون عاطفياً يخدع المستخدم ليتجاوز السياق."),
      recommendation: t("Start with cross-checking and myth autopsy.", "ابدأ بمقارنة الأدلة وتشريح الخرافة."),
      caution: t("Do not confuse moral intensity with evidence quality.", "لا تخلط بين شدة الموقف الأخلاقي وجودة الدليل."),
      firstStepId: "cross-check",
      recommendedTab: "myths",
    },
    {
      id: "confused",
      module: "deepreal",
      emotion: t("I feel confused and I do not know what is real", "أنا مرتبك ولا أعرف ما الحقيقي"),
      validation: t("Confusion is not failure. It is the correct moment to slow down.", "الارتباك ليس فشلاً، بل هو اللحظة الصحيحة للإبطاء."),
      scientificReason: t("Source tracing restores structure when claims feel chaotic.", "تتبع المصدر يعيد الهيكل عندما تبدو الادعاءات فوضوية."),
      recommendation: t("Start with source tracing, then insider tricks.", "ابدأ بتتبع المصدر ثم الحيل العملية."),
      caution: t("Do not treat confidence as proof.", "لا تعامل الثقة على أنها دليل."),
      firstStepId: "trace",
      recommendedTab: "tricks",
    },
  ],
  "mental-health": [
    {
      id: "overwhelmed",
      module: "mental-health",
      emotion: t("I feel overwhelmed and I need calm first", "أنا غارق وأحتاج الهدوء أولاً"),
      validation: t("When distress is high, education must start with stabilization.", "عندما يرتفع الضيق يجب أن يبدأ التعليم بالتثبيت."),
      scientificReason: t("A dysregulated state makes labels and advice harder to use safely.", "الحالة غير المنظمة تجعل استخدام التسميات والنصائح أقل أماناً."),
      recommendation: t("Start with stabilize-the-moment, then a low-intensity exercise.", "ابدأ بتثبيت اللحظة ثم تمرين منخفض الشدة."),
      caution: t("Do not force yourself into self-diagnosis while distressed.", "لا تدفع نفسك إلى التشخيص الذاتي وأنت في حالة ضيق."),
      firstStepId: "stabilize",
      recommendedTab: "exercises",
    },
    {
      id: "ashamed",
      module: "mental-health",
      emotion: t("I feel ashamed that I might need help", "أشعر بالعار لأنني قد أحتاج إلى مساعدة"),
      validation: t("Shame is common, but it is a bad guide for support decisions.", "العار شائع لكنه دليل سيئ لاتخاذ قرارات الدعم."),
      scientificReason: t("Stigma delays help-seeking and increases risk over time.", "الوصمة تؤخر طلب المساعدة وتزيد الخطر مع الوقت."),
      recommendation: t("Start with choosing the safest route, then review the never-do rules.", "ابدأ باختيار المسار الأكثر أماناً ثم راجع قواعد لا تفعل."),
      caution: t("Do not translate need into weakness.", "لا تترجم الحاجة إلى ضعف."),
      firstStepId: "navigate",
      recommendedTab: "rules",
    },
    {
      id: "curious",
      module: "mental-health",
      emotion: t("I want to understand what this feeling means", "أريد أن أفهم معنى هذا الشعور"),
      validation: t("Curiosity is useful when it stays disciplined and safe.", "الفضول مفيد عندما يبقى منضبطاً وآمناً."),
      scientificReason: t("Clear definitions reduce panic and reduce over-diagnosis.", "التعريفات الواضحة تقلل الهلع وتقلل الإفراط في التشخيص."),
      recommendation: t("Start with labeling what this is, then compare myths and scenarios.", "ابدأ بتسمية ما يحدث ثم قارن الخرافات والسيناريوهات."),
      caution: t("Do not let recognition become instant diagnosis.", "لا تجعل التعرف يتحول إلى تشخيص فوري."),
      firstStepId: "label",
      recommendedTab: "myths",
    },
  ],
  "religion-hub": [
    {
      id: "guilty",
      module: "religion-hub",
      emotion: t("I feel guilty and I need clarity", "أشعر بالذنب وأحتاج إلى وضوح"),
      validation: t("Guilt can be sincere, but it can also be manipulated.", "الذنب قد يكون صادقاً لكنه قد يُستغل أيضاً."),
      scientificReason: t("Shame-based religious messaging often bypasses calm reasoning.", "الرسائل الدينية القائمة على العار تتجاوز التفكير الهادئ كثيراً."),
      recommendation: t("Start by framing the question safely, then open reverse mode.", "ابدأ بوضع السؤال في إطار آمن ثم افتح وضع الهندسة العكسية."),
      caution: t("Do not assume a painful feeling is automatic proof.", "لا تفترض أن الشعور المؤلم دليل تلقائي."),
      firstStepId: "frame",
      recommendedTab: "reverse",
    },
    {
      id: "angry",
      module: "religion-hub",
      emotion: t("I feel angry about something religious I saw", "أنا غاضب من شيء ديني رأيته"),
      validation: t("Religious anger needs moderation before interpretation.", "الغضب الديني يحتاج إلى اعتدال قبل التفسير."),
      scientificReason: t("Identity-linked anger increases polarization and lowers verification quality.", "الغضب المرتبط بالهوية يزيد الاستقطاب ويخفض جودة التحقق."),
      recommendation: t("Start with moderation checks, then real scenarios.", "ابدأ بفحوص الاعتدال ثم السيناريوهات الواقعية."),
      caution: t("Do not let identity humiliation become evidence.", "لا تجعل إذلال الهوية يتحول إلى دليل."),
      firstStepId: "moderate",
      recommendedTab: "scenarios",
    },
    {
      id: "seeking-peace",
      module: "religion-hub",
      emotion: t("I want peace, not argument", "أريد السلام لا الجدال"),
      validation: t("That is the right instinct for this module.", "هذا هو الدافع الصحيح لهذا المحور."),
      scientificReason: t("Positive coping works best when boundaries and routing stay visible.", "التكيف الإيجابي يعمل أفضل عندما تبقى الحدود ومسارات الإحالة مرئية."),
      recommendation: t("Start with peaceful coping, then the practical exercises.", "ابدأ بالتكيف السلمي ثم التمارين العملية."),
      caution: t("Do not let peace language hide harmful advice.", "لا تدع لغة السلام تخفي نصيحة ضارة."),
      firstStepId: "practice",
      recommendedTab: "exercises",
    },
  ],
};
