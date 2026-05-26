const fs = require('fs');
const path = require('path');

const t = (en, ar) => ({ en, ar });
const source = (en, ar, url) => ({ label: t(en, ar), url });

const RUMORS = Array.from({ length: 12 }).map((_, i) => ({
  id: 'immunity-rumors-' + (i + 1),
  title: t('Rumor Round ' + (i + 1), 'جولة الشائعات ' + (i + 1)),
  scene: t('A viral post claims an immediate health or security threat in the local area. (Case ' + (i+1) + ')', 'منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة ' + (i+1) + ')'),
  prompt: t('Which reaction accelerates the panic?', 'أي رد فعل يسرع الذعر؟'),
  objective: t('Identify fear-based virality', 'تحديد الانتشار القائم على الخوف'),
  choices: [
    {
      id: 'r' + i + '-1',
      label: t('Share immediately to warn family', 'شارك فوراً لتحذير العائلة'),
      effectLabel: t('Panic Spread', 'انتشار الذعر'),
      feedback: t('Spreading unverified threats causes more harm than the threat itself.', 'نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه.'),
      lesson: t('Always verify with official local sources before sharing.', 'تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة.'),
      scoreDelta: 3,
      correct: true,
      tags: ['fear', 'urgency']
    },
    {
      id: 'r' + i + '-2',
      label: t('Check the official Ministry page', 'تحقق من صفحة الوزارة الرسمية'),
      effectLabel: t('Verification', 'تحقق'),
      feedback: t('This stops the rumor, which is good for reality but bad for the simulation.', 'هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة.'),
      lesson: t('Verification stops virality.', 'التحقق يوقف الانتشار.'),
      scoreDelta: 0,
      correct: false,
      tags: ['verify']
    },
    {
      id: 'r' + i + '-3',
      label: t('Wait for more context', 'انتظر لمزيد من السياق'),
      effectLabel: t('Patience', 'صبر'),
      feedback: t('Pausing starves the rumor of oxygen.', 'التوقف يحرم الشائعة من الأكسجين.'),
      lesson: t('Time is the enemy of false urgency.', 'الوقت هو عدو الاستعجال الزائف.'),
      scoreDelta: 0,
      correct: false,
      tags: ['pause']
    }
  ]
}));

const SCAMS = Array.from({ length: 12 }).map((_, i) => ({
  id: 'immunity-scams-' + (i + 1),
  title: t('Scam Round ' + (i + 1), 'جولة الاحتيال ' + (i + 1)),
  scene: t('A sponsored ad promises immediate financial returns or fake scholarships. (Case ' + (i+1) + ')', 'إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة ' + (i+1) + ')'),
  prompt: t('What makes this scam effective?', 'ما الذي يجعل هذا الاحتيال فعالاً؟'),
  objective: t('Spot financial pressure tactics', 'اكتشاف تكتيكات الضغط المالي'),
  choices: [
    {
      id: 's' + i + '-1',
      label: t('Adding a fake urgency timer (Ends in 5 mins!)', 'إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)'),
      effectLabel: t('Urgency Trap', 'فخ الاستعجال'),
      feedback: t('Scams rely on disabling your logical brain with artificial time pressure.', 'يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع.'),
      lesson: t('Legitimate financial or academic processes do not force 5-minute decisions.', 'العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق.'),
      scoreDelta: 3,
      correct: true,
      tags: ['scam', 'timer']
    },
    {
      id: 's' + i + '-2',
      label: t('Researching the URL domain', 'البحث في نطاق الرابط'),
      effectLabel: t('Technical Verification', 'تحقق تقني'),
      feedback: t('Checking domains ruins the scammer’s illusion.', 'التحقق من النطاقات يدمر وهم المحتال.'),
      lesson: t('Always check the real URL, not just the display name.', 'تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض.'),
      scoreDelta: 0,
      correct: false,
      tags: ['domain', 'verify']
    },
    {
      id: 's' + i + '-3',
      label: t('Looking for official contact info', 'البحث عن معلومات الاتصال الرسمية'),
      effectLabel: t('Institutional Check', 'تحقق مؤسسي'),
      feedback: t('Real institutions have traceable physical and digital footprints.', 'المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع.'),
      lesson: t('Never pay via unknown links without verifying the host.', 'لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف.'),
      scoreDelta: 0,
      correct: false,
      tags: ['institution']
    }
  ]
}));

const TIKTOK = Array.from({ length: 12 }).map((_, i) => ({
  id: 'immunity-tiktok-' + (i + 1),
  title: t('TikTok Round ' + (i + 1), 'جولة تيك توك ' + (i + 1)),
  scene: t('A short-form video uses dramatic music to push a controversial out-of-context claim. (Case ' + (i+1) + ')', 'فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة ' + (i+1) + ')'),
  prompt: t('Which algorithmic move boosts it?', 'أي حركة خوارزمية تعززه؟'),
  objective: t('Understand short-video engagement hacking', 'فهم اختراق تفاعل الفيديوهات القصيرة'),
  choices: [
    {
      id: 't' + i + '-1',
      label: t('Write an angry comment disagreeing with it', 'كتابة تعليق غاضب يختلف معه'),
      effectLabel: t('Rage Engagement', 'تفاعل الغضب'),
      feedback: t('Algorithms do not distinguish between angry comments and supportive ones. Both boost reach.', 'الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول.'),
      lesson: t('Do not feed the algorithm. Scroll past or report.', 'لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه.'),
      scoreDelta: 3,
      correct: true,
      tags: ['algorithm', 'rage']
    },
    {
      id: 't' + i + '-2',
      label: t('Block the creator', 'حظر صانع المحتوى'),
      effectLabel: t('Boundary Setting', 'وضع الحدود'),
      feedback: t('Blocking protects your feed but doesn’t help the rumor go viral.', 'الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار.'),
      lesson: t('Curating your feed is the first line of defense.', 'تنظيم خلاصتك هو خط الدفاع الأول.'),
      scoreDelta: 0,
      correct: false,
      tags: ['curation']
    },
    {
      id: 't' + i + '-3',
      label: t('Search for the original unedited video', 'البحث عن الفيديو الأصلي غير المعدل'),
      effectLabel: t('Context Hunting', 'البحث عن السياق'),
      feedback: t('Finding the source destroys the TikTok framing effect.', 'العثور على المصدر يدمر تأثير التأطير في تيك توك.'),
      lesson: t('Short-form video is designed to remove context. Hunt it down.', 'الفيديو القصير مصمم لإزالة السياق. ابحث عنه.'),
      scoreDelta: 0,
      correct: false,
      tags: ['context']
    }
  ]
}));

const output = `import type { DeepRealGameModeDefinition } from "./deepreal-game";

function t(en: string, ar: string) {
  return { en, ar };
}

function source(en: string, ar: string, url: string) {
  return { label: t(en, ar), url };
}

export const IMMUNITY_RUMORS_MODE: DeepRealGameModeDefinition = {
  id: "immunity-rumors" as any,
  title: t("Immunity Lab: Rumors", "مختبر المناعة: الشائعات"),
  subtitle: t("Identify and neutralize local fear-based rumors.", "تحديد وإبطال الشائعات المحلية القائمة على الخوف."),
  roleLabel: t("Rumor Analyst", "محلل شائعات"),
  scoreLabel: t("Resilience Score", "درجة المرونة"),
  warning: t("Test your defense against 12 high-velocity rumor patterns.", "اختبر دفاعك ضد 12 نمط شائعات سريع الانتشار."),
  completionTitle: t("Rumor Network mapped.", "تم تعيين شبكة الشائعات."),
  completionSummary: t("You successfully identified the urgency and fear triggers.", "نجحت في تحديد محفزات الاستعجال والخوف."),
  sources: [source("AkhbarMeter", "أخبار ميتر", "https://akhbarmeter.org/")],
  rounds: ${JSON.stringify(RUMORS, null, 2)}
};

export const IMMUNITY_SCAMS_MODE: DeepRealGameModeDefinition = {
  id: "immunity-scams" as any,
  title: t("Immunity Lab: Scams", "مختبر المناعة: الاحتيال"),
  subtitle: t("Detect financial and phishing scams designed for the MENA region.", "اكتشاف الاحتيال المالي والتصيد المصمم لمنطقة الشرق الأوسط وشمال أفريقيا."),
  roleLabel: t("Fraud Detector", "مكتشف الاحتيال"),
  scoreLabel: t("Resilience Score", "درجة المرونة"),
  warning: t("Scams evolve fast. Learn to spot the underlying pressure mechanics.", "عمليات الاحتيال تتطور بسرعة. تعلم اكتشاف آليات الضغط الأساسية."),
  completionTitle: t("Scam tactics exposed.", "تم كشف تكتيكات الاحتيال."),
  completionSummary: t("You disabled 12 scam architectures.", "لقد عطلت 12 بنية احتيال."),
  sources: [source("Central Bank of Egypt", "البنك المركزي المصري", "https://www.cbe.org.eg/")],
  rounds: ${JSON.stringify(SCAMS, null, 2)}
};

export const IMMUNITY_TIKTOK_MODE: DeepRealGameModeDefinition = {
  id: "immunity-tiktok" as any,
  title: t("Immunity Lab: TikTok Focus", "مختبر المناعة: تركيز تيك توك"),
  subtitle: t("Deconstruct algorithmic manipulation and short-form video bias.", "تفكيك التلاعب الخوارزمي وانحياز الفيديوهات القصيرة."),
  roleLabel: t("Algorithmic Auditor", "مدقق خوارزمي"),
  scoreLabel: t("Resilience Score", "درجة المرونة"),
  warning: t("Short video removes context by design. Rebuild it.", "الفيديو القصير يزيل السياق بالتصميم. أعد بناءه."),
  completionTitle: t("Algorithm manipulation understood.", "تم فهم التلاعب الخوارزمي."),
  completionSummary: t("You successfully navigated 12 algorithmic traps.", "نجحت في اجتياز 12 فخاً خوارزمياً."),
  sources: [source("Digital Inquiry Group", "مجموعة الاستقصاء الرقمي", "https://cor.stanford.edu/")],
  rounds: ${JSON.stringify(TIKTOK, null, 2)}
};
`;

const outputPath = path.join(__dirname, '../src/data/research/deepreal-immunity.ts');
fs.writeFileSync(outputPath, output);
console.log('Immunity data generated successfully at', outputPath);
