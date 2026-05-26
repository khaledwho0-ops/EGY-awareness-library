export type PublishingPhase = {
  id: string;
  titleEn: string;
  titleAr: string;
  timingEn: string;
  timingAr: string;
  summaryEn: string;
  summaryAr: string;
  actionsEn: string[];
  actionsAr: string[];
};

export const PUBLISHING_PHASES: PublishingPhase[] = [
  {
    id: "publishing-github",
    titleEn: "Phase 1: GitHub",
    titleAr: "المرحلة 1: GitHub",
    timingEn: "Week 1",
    timingAr: "الأسبوع 1",
    summaryEn: "Prepare the project for transparent public collaboration immediately after the pilot or 14-day cycle closes.",
    summaryAr: "تجهيز المشروع للتعاون العام الشفاف مباشرة بعد إغلاق دورة الـ14 يوماً أو المرحلة التجريبية.",
    actionsEn: [
      "Publish a full open-source repository under MIT License.",
      "Use a monorepo structure covering frontend, backend, data, and research assets.",
      "Ship README documentation in Arabic and English.",
      "Add a contributing guide explaining how verified cases and evidence can be submitted.",
      "Publish static documentation through GitHub Pages.",
      "Run automated tests on every pull request through GitHub Actions.",
    ],
    actionsAr: [
      "نشر المستودع الكامل كمصدر مفتوح تحت رخصة MIT.",
      "اعتماد بنية monorepo تشمل الواجهة والخلفية والبيانات ومواد البحث.",
      "إطلاق README بالعربية والإنجليزية.",
      "إضافة دليل مساهمة يشرح كيف تُضاف الحالات الموثقة والأدلة.",
      "نشر التوثيق الثابت عبر GitHub Pages.",
      "تشغيل اختبارات آلية على كل Pull Request عبر GitHub Actions.",
    ],
  },
  {
    id: "publishing-pwa",
    titleEn: "Phase 2: Progressive Web App",
    titleAr: "المرحلة 2: تطبيق ويب تقدمي",
    timingEn: "Week 2",
    timingAr: "الأسبوع 2",
    summaryEn: "Turn the platform into an installable mobile-first product before native app packaging begins.",
    summaryAr: "تحويل المنصة إلى منتج قابل للتثبيت ومصمم للهاتف قبل البدء في تغليف التطبيقات الأصلية.",
    actionsEn: [
      "Enable full PWA installability, offline mode, and Arabic push notifications.",
      "Target Lighthouse 95+ performance and 100 accessibility.",
      "Optimize Arabic font loading with Cairo subsets and mobile-safe fallbacks.",
      "Verify caching rules for low-bandwidth Egyptian mobile conditions.",
      "Keep keyboard navigation and reduced-motion behavior intact in the installable shell.",
    ],
    actionsAr: [
      "تفعيل التثبيت الكامل كـPWA مع وضع عدم الاتصال وإشعارات عربية.",
      "استهداف 95+ في الأداء و100 في قابلية الوصول داخل Lighthouse.",
      "تحسين تحميل الخط العربي Cairo مع subsets وبدائل مناسبة للهاتف.",
      "التحقق من قواعد الكاش لظروف الاتصال الضعيف على الهواتف المصرية.",
      "الحفاظ على التنقل بلوحة المفاتيح ووضع تقليل الحركة داخل الغلاف القابل للتثبيت.",
    ],
  },
  {
    id: "publishing-android",
    titleEn: "Phase 3: Android",
    titleAr: "المرحلة 3: أندرويد",
    timingEn: "Month 2",
    timingAr: "الشهر 2",
    summaryEn: "Ship Android first because it is the dominant smartphone environment for the target audience.",
    summaryAr: "إطلاق أندرويد أولاً لأنه البيئة المسيطرة على هواتف الجمهور المستهدف.",
    actionsEn: [
      "Wrap the PWA through React Native Expo or Trusted Web Activity, depending maintenance cost.",
      "Prepare a Google Play listing in Arabic with Egypt-specific screenshots and copy.",
      "Request only necessary permissions such as camera and optional microphone for verification flows.",
      "Test upload, offline recovery, and notification behavior on low- to mid-range Android devices.",
      "Document why Android ships before iOS: target reach and device distribution in Egypt.",
    ],
    actionsAr: [
      "تغليف الـPWA عبر React Native Expo أو Trusted Web Activity حسب تكلفة الصيانة.",
      "تجهيز صفحة Google Play بالعربية مع لقطات وسرد بصري مصري.",
      "طلب الأذونات الضرورية فقط مثل الكاميرا والميكروفون الاختياري لمسارات التحقق.",
      "اختبار الرفع واستعادة العمل بدون إنترنت وسلوك الإشعارات على أجهزة أندرويد المتوسطة والمنخفضة.",
      "توثيق سبب إطلاق أندرويد قبل iOS: الوصول الأكبر وتوزيع الأجهزة في مصر.",
    ],
  },
  {
    id: "publishing-ios",
    titleEn: "Phase 4: iOS",
    titleAr: "المرحلة 4: iOS",
    timingEn: "Month 3",
    timingAr: "الشهر 3",
    summaryEn: "Reuse the mobile stack only after Android validation and prepare for App Store review risks early.",
    summaryAr: "إعادة استخدام مسار الهاتف بعد تثبيت أندرويد، مع التحضير المبكر لمخاطر مراجعة متجر أبل.",
    actionsEn: [
      "Reuse the same React Native or Expo mobile codebase where possible.",
      "Prepare Apple App Review notes for religious-content moderation and educational intent.",
      "Document content-policy boundaries for health, religion, and user-submitted claims before submission.",
      "Verify graceful degradation for vibration-dependent interactions on iOS.",
      "Do not prioritize iOS before Android in roadmap communication or engineering focus.",
    ],
    actionsAr: [
      "إعادة استخدام نفس قاعدة الشفرة الخاصة بالهاتف عبر React Native أو Expo قدر الإمكان.",
      "إعداد ملاحظات App Review الخاصة بأبل حول ضبط المحتوى الديني والطابع التعليمي.",
      "توثيق حدود سياسات المحتوى في الصحة والدين والادعاءات المرسلة من المستخدم قبل الإرسال.",
      "التحقق من التدرج السلس للتجارب التي تعتمد على الاهتزاز في iOS.",
      "عدم تقديم iOS على أندرويد في الخطاب التخطيطي أو التركيز الهندسي.",
    ],
  },
  {
    id: "publishing-partnerships",
    titleEn: "Phase 5: Partnerships",
    titleAr: "المرحلة 5: الشراكات",
    timingEn: "Months 4-6",
    timingAr: "الأشهر 4-6",
    summaryEn: "Use institutional partnerships to strengthen credibility, moderation quality, and sustainability after launch.",
    summaryAr: "استخدام الشراكات المؤسسية لتعزيز الموثوقية وجودة المراجعة والاستدامة بعد الإطلاق.",
    actionsEn: [
      "Apply to Google News Initiative funding.",
      "Apply to Meta Journalism Project or equivalent newsroom-support tracks.",
      "Pursue verification collaboration with Dar al-Iftaa on religious content.",
      "Pursue health-content collaboration with the Egyptian Medical Syndicate.",
      "Pursue academic backing and IRB pathways through Heliopolis University or similar institutions.",
      "Do not launch app-store builds before moderation policy and Egyptian data-protection review are in place.",
    ],
    actionsAr: [
      "التقديم إلى تمويل Google News Initiative.",
      "التقديم إلى Meta Journalism Project أو مسارات دعم مشابهة.",
      "السعي إلى تعاون تحقق مع دار الإفتاء في المحتوى الديني.",
      "السعي إلى تعاون في المحتوى الصحي مع نقابة الأطباء المصرية.",
      "السعي إلى غطاء أكاديمي ومسارات IRB عبر جامعة هليوبوليس أو مؤسسات مشابهة.",
      "عدم إطلاق نسخ المتاجر قبل اكتمال سياسة الإشراف ومراجعة قانون حماية البيانات المصري.",
    ],
  },
];

export const PUBLISHING_GUARDRAILS_EN = [
  "Do not plan iOS ahead of Android.",
  "Do not publish to app stores without Arabic moderation policy in place.",
  "Do not launch without review against Egyptian Personal Data Protection Law 151 of 2020.",
];

export const PUBLISHING_GUARDRAILS_AR = [
  "لا تخطط لـ iOS قبل أندرويد.",
  "لا تنشر على المتاجر قبل وجود سياسة إشراف عربية واضحة.",
  "لا تطلق قبل مراجعة الالتزام بقانون حماية البيانات الشخصية المصري 151 لسنة 2020.",
];
