'use client';
/* ═══════════════════════════════════════════════════════════════
 * /layers/[id]/fight — Counter-Weapons Arsenal for each layer
 * Dynamic route: accepts layer ID 1-8
 * ═══════════════════════════════════════════════════════════════ */

import { use, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LAYERS, LAYER_8_PHASE_2_CASES } from '@/components/six-layers/data';
import { useRTL } from '@/components/shared/rtl-provider';

/* ── Counter-Weapons Data ─────────────────────────────────── */

interface Weapon {
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  stars: number;
}

const COUNTER_WEAPONS: Record<number, Weapon[]> = {
  1: [
    { name: 'Reverse Image Search', nameAr: 'البحث العكسي عن الصور', description: 'Drag-and-drop any image to trace its true origin across the web. Uses TinEye, Google Lens, and Yandex simultaneously to find the earliest occurrence and all modifications.', descriptionAr: 'اسحب أي صورة لتتبع أصلها الحقيقي عبر الإنترنت. يستخدم TinEye وGoogle Lens وYandex في وقت واحد للعثور على أقدم ظهور وجميع التعديلات.', stars: 5 },
    { name: 'AI Content Detector', nameAr: 'كاشف محتوى الذكاء الاصطناعي', description: 'Scans text for statistical patterns indicating machine generation. Detects perplexity anomalies, burstiness patterns, and stylometric signatures unique to LLMs.', descriptionAr: 'يمسح النصوص بحثاً عن أنماط إحصائية تدل على التوليد الآلي. يكشف شذوذات الحيرة وأنماط الانفجار والبصمات الأسلوبية الفريدة لنماذج اللغة.', stars: 4 },
    { name: 'Source DNA Tracer', nameAr: 'متتبع الحمض النووي للمصدر', description: 'Follows the viral trail of a claim back to patient zero. Maps every share, repost, and translation to find the original fabricator and their motive.', descriptionAr: 'يتتبع المسار الفيروسي لادعاء ما وصولاً إلى المريض صفر. يرسم كل مشاركة وإعادة نشر وترجمة للعثور على المُلفق الأصلي ودافعه.', stars: 5 },
    { name: 'Metadata Extractor', nameAr: 'مستخرج البيانات الوصفية', description: 'Reveals hidden EXIF data in images: camera model, exact date, GPS coordinates, and editing software. Exposes when a "current" photo was actually taken years ago.', descriptionAr: 'يكشف بيانات EXIF المخفية في الصور: طراز الكاميرا، التاريخ الدقيق، إحداثيات GPS، وبرنامج التحرير. يفضح عندما تكون صورة "حالية" قد التُقطت منذ سنوات.', stars: 4 },
    { name: 'Bot Scanner', nameAr: 'ماسح الحسابات الوهمية', description: 'Analyzes account age, posting patterns, follower/following ratios, and network behavior to detect automated bot accounts and coordinated inauthentic behavior.', descriptionAr: 'يحلل عمر الحساب وأنماط النشر ونسب المتابعين/المتابَعين وسلوك الشبكة لكشف الحسابات الآلية والسلوك المنسق غير الحقيقي.', stars: 3 },
  ],
  2: [
    { name: 'Multi-Source Comparison', nameAr: 'مقارنة المصادر المتعددة', description: 'Compare how 5+ outlets cover the same event side-by-side. Highlights what each source emphasizes and, critically, what each source omits.', descriptionAr: 'قارن كيف تغطي 5+ منافذ إعلامية نفس الحدث جنباً إلى جنب. يسلط الضوء على ما يؤكده كل مصدر، والأهم، ما يحذفه كل مصدر.', stars: 5 },
    { name: 'Cherry-Pick Detector', nameAr: 'كاشف الانتقاء', description: 'Identifies when data points are selectively presented to support a narrative. Cross-references cited statistics with their full datasets to find hidden context.', descriptionAr: 'يحدد متى يتم تقديم نقاط البيانات بشكل انتقائي لدعم رواية معينة. يقارن الإحصاءات المذكورة بمجموعات البيانات الكاملة لكشف السياق المخفي.', stars: 4 },
    { name: 'Statistical Framing Scanner', nameAr: 'ماسح التأطير الإحصائي', description: 'Detects misleading percentages, manipulated Y-axis scales, truncated graphs, and base-rate fallacies. Makes invisible statistical tricks visible.', descriptionAr: 'يكشف النسب المضللة، ومقاييس المحور Y المتلاعب بها، والرسوم البيانية المقطوعة، ومغالطات المعدل الأساسي. يجعل الحيل الإحصائية المخفية مرئية.', stars: 4 },
    { name: 'Publication Bias Scanner', nameAr: 'ماسح تحيز النشر', description: 'Cross-references published studies with trial registries (ClinicalTrials.gov) to find hidden failures. Reveals the "file drawer effect" in scientific publishing.', descriptionAr: 'يقارن الدراسات المنشورة مع سجلات التجارب (ClinicalTrials.gov) لكشف الإخفاقات المخفية. يكشف "تأثير درج الملفات" في النشر العلمي.', stars: 3 },
    { name: 'Angle Analyzer', nameAr: 'محلل الزاوية', description: 'Maps the editorial angle and funding sources behind any article. Traces ownership chains, donor networks, and ideological affiliations of publishers.', descriptionAr: 'يرسم الزاوية التحريرية ومصادر التمويل خلف أي مقال. يتتبع سلاسل الملكية وشبكات المانحين والانتماءات الأيديولوجية للناشرين.', stars: 5 },
  ],
  3: [
    { name: 'Original Context Finder', nameAr: 'مكتشف السياق الأصلي', description: 'Locates the full speech, article, or study from which a quote was extracted. Shows the surrounding paragraphs that completely change the meaning.', descriptionAr: 'يحدد الخطاب أو المقال أو الدراسة الكاملة التي استُخرج منها الاقتباس. يعرض الفقرات المحيطة التي تغير المعنى بالكامل.', stars: 5 },
    { name: 'Timeline Reconstructor', nameAr: 'معيد بناء الجدول الزمني', description: 'Rebuilds the complete chronological sequence of events around a claim. Reveals what happened before and after the cherry-picked moment.', descriptionAr: 'يعيد بناء التسلسل الزمني الكامل للأحداث حول ادعاء ما. يكشف ما حدث قبل وبعد اللحظة المنتقاة.', stars: 4 },
    { name: 'Quote Completion Tool', nameAr: 'أداة إكمال الاقتباس', description: 'Finds the full paragraph surrounding any viral quote snippet. Restores ellipses (...) with the actual words that were deliberately removed.', descriptionAr: 'يجد الفقرة الكاملة المحيطة بأي مقتطف اقتباس منتشر. يستعيد النقاط (...) بالكلمات الفعلية التي أُزيلت عمداً.', stars: 5 },
    { name: 'Geopolitical Injector', nameAr: 'حاقن السياق الجيوسياسي', description: 'Adds missing geopolitical context: who was at war, in debt, under sanctions, or facing elections when the claim was made. Context changes everything.', descriptionAr: 'يضيف السياق الجيوسياسي المفقود: من كان في حرب، مديون، تحت عقوبات، أو يواجه انتخابات عندما قُدم الادعاء. السياق يغير كل شيء.', stars: 3 },
    { name: 'Historical Cross-Reference', nameAr: 'المرجع التاريخي المتقاطع', description: 'Compares current claims against verified historical records, peer-reviewed archaeology, and primary source documents to expose anachronisms.', descriptionAr: 'يقارن الادعاءات الحالية بالسجلات التاريخية الموثقة وعلم الآثار المحكّم ووثائق المصادر الأولية لكشف المفارقات الزمنية.', stars: 4 },
  ],
  4: [
    { name: 'Publication Timing Analyzer', nameAr: 'محلل توقيت النشر', description: 'Maps when articles are released relative to political events, crises, and news cycles. Reveals suspiciously convenient timing patterns.', descriptionAr: 'يرسم خريطة توقيت نشر المقالات بالنسبة للأحداث السياسية والأزمات ودورات الأخبار. يكشف أنماط التوقيت المريبة والمريحة.', stars: 5 },
    { name: 'Cui Bono Mapper', nameAr: 'خريطة المستفيد', description: 'Systematically answers "Who benefits?" from the timing of a revelation. Maps power structures, financial gains, and political advantages.', descriptionAr: 'يجيب بشكل منهجي على سؤال "من المستفيد؟" من توقيت الكشف. يرسم هياكل السلطة والمكاسب المالية والمزايا السياسية.', stars: 5 },
    { name: 'News Cycle Correlator', nameAr: 'مُرتبط دورة الأخبار', description: 'Detects when stories are released specifically to bury other stories. Correlates publication timestamps with competing headlines.', descriptionAr: 'يكشف متى تُنشر القصص تحديداً لدفن قصص أخرى. يربط بين طوابع النشر الزمنية والعناوين المنافسة.', stars: 4 },
    { name: 'Distraction Detector', nameAr: 'كاشف الإلهاء', description: 'Identifies patterns of coordinated distraction campaigns. Flags when sudden viral content suspiciously coincides with important policy decisions.', descriptionAr: 'يحدد أنماط حملات الإلهاء المنسقة. يُنبه عندما يتزامن محتوى فيروسي مفاجئ بشكل مريب مع قرارات سياسية مهمة.', stars: 4 },
    { name: 'Coordinated Release Scanner', nameAr: 'ماسح النشر المنسق', description: 'Detects when multiple outlets publish suspiciously similar stories simultaneously. Identifies coordinated media campaigns and press release repackaging.', descriptionAr: 'يكشف متى تنشر عدة منافذ قصصاً متشابهة بشكل مريب في وقت واحد. يحدد الحملات الإعلامية المنسقة وإعادة تغليف البيانات الصحفية.', stars: 3 },
  ],
  5: [
    { name: 'Ethics Impact Assessment', nameAr: 'تقييم الأثر الأخلاقي', description: 'Systematic framework to evaluate moral implications of applied research. Scores potential for misuse across military, surveillance, and social control domains.', descriptionAr: 'إطار منهجي لتقييم التداعيات الأخلاقية للبحث التطبيقي. يقيّم احتمال سوء الاستخدام عبر المجالات العسكرية والمراقبة والسيطرة الاجتماعية.', stars: 5 },
    { name: 'Historical Evil-Application DB', nameAr: 'قاعدة بيانات التطبيقات الشريرة', description: 'Archive of historical cases where neutral knowledge was weaponized: from Nobel\'s dynamite to nuclear physics to social media algorithms.', descriptionAr: 'أرشيف للحالات التاريخية حيث تم تسليح المعرفة المحايدة: من ديناميت نوبل إلى الفيزياء النووية إلى خوارزميات التواصل الاجتماعي.', stars: 4 },
    { name: 'Dual-Use Scanner', nameAr: 'ماسح الاستخدام المزدوج', description: 'Flags research that has both beneficial and destructive applications. Rates the "weaponizability" of any scientific paper or technology.', descriptionAr: 'يُنبه للأبحاث التي لها تطبيقات مفيدة ومدمرة في آن. يقيّم "قابلية التسليح" لأي ورقة علمية أو تقنية.', stars: 4 },
    { name: 'Consent Verifier', nameAr: 'مُتحقق الموافقة', description: 'Checks if human subjects were properly informed and consented. Verifies IRB approvals, informed consent protocols, and participant rights compliance.', descriptionAr: 'يتحقق مما إذا تم إعلام المشاركين البشريين بشكل صحيح وموافقتهم. يتحقق من موافقات لجنة المراجعة المؤسسية وبروتوكولات الموافقة المستنيرة.', stars: 3 },
    { name: 'Harm-Benefit Calculator', nameAr: 'حاسبة الضرر والنفع', description: 'Quantifies potential harm vs. benefit of any applied technology. Uses historical precedent data to model likely outcomes across populations.', descriptionAr: 'يحسب كمياً الضرر المحتمل مقابل الفائدة لأي تقنية تطبيقية. يستخدم بيانات السوابق التاريخية لنمذجة النتائج المحتملة عبر السكان.', stars: 5 },
  ],
  6: [
    { name: 'BITE Model Analyzer', nameAr: 'محلل نموذج BITE', description: 'Evaluates Behavior, Information, Thought, and Emotional control tactics. Based on Steven Hassan\'s framework for identifying high-control groups.', descriptionAr: 'يقيّم تكتيكات السيطرة على السلوك والمعلومات والفكر والعاطفة. مبني على إطار ستيفن حسن لتحديد الجماعات عالية السيطرة.', stars: 5 },
    { name: 'Cult Rhetoric Detector', nameAr: 'كاشف خطاب الطوائف', description: 'Identifies manipulative language patterns used by high-control groups: thought-terminating clichés, loaded language, and us-vs-them framing.', descriptionAr: 'يحدد أنماط اللغة التلاعبية المستخدمة من قبل الجماعات عالية السيطرة: عبارات إنهاء التفكير، واللغة المحملة، وتأطير نحن مقابل هم.', stars: 4 },
    { name: 'Isolation Scanner', nameAr: 'ماسح العزل', description: 'Detects when a group systematically cuts members off from outside information, alternative viewpoints, family, and independent support systems.', descriptionAr: 'يكشف متى تقوم مجموعة بقطع أعضائها بشكل منهجي عن المعلومات الخارجية ووجهات النظر البديلة والعائلة وأنظمة الدعم المستقلة.', stars: 4 },
    { name: 'Counter-Fact Resistance Detector', nameAr: 'كاشف مقاومة الحقائق المضادة', description: 'Measures how resistant a group\'s members are to contradictory evidence. Higher resistance scores indicate deeper Matrix entrenchment.', descriptionAr: 'يقيس مدى مقاومة أعضاء المجموعة للأدلة المتناقضة. درجات المقاومة الأعلى تشير إلى ترسخ أعمق في المصفوفة.', stars: 3 },
    { name: 'Exit Pathway Generator', nameAr: 'مولد مسارات الخروج', description: 'Creates safe, step-by-step plans for individuals trapped in manipulation systems. Provides psychological safety protocols and support resources.', descriptionAr: 'يُنشئ خططاً آمنة خطوة بخطوة للأفراد المحاصرين في أنظمة التلاعب. يوفر بروتوكولات الأمان النفسي وموارد الدعم.', stars: 5 },
  ],
  7: [
    { name: 'Follow-the-Money Tracer', nameAr: 'متتبع مسار المال', description: 'Maps financial flows between corporations, lobbyists, and political entities. Traces dark money through shell companies and offshore accounts.', descriptionAr: 'يرسم التدفقات المالية بين الشركات والمُضغِطين والكيانات السياسية. يتتبع الأموال المظلمة عبر الشركات الوهمية والحسابات الخارجية.', stars: 5 },
    { name: 'Algorithmic Bias Auditor', nameAr: 'مدقق التحيز الخوارزمي', description: 'Tests how algorithms filter, rank, and suppress information. Sends identical queries from different profiles to expose personalization bias.', descriptionAr: 'يختبر كيف تُرشح الخوارزميات المعلومات وتُرتبها وتقمعها. يرسل استعلامات متطابقة من ملفات مختلفة لكشف تحيز التخصيص.', stars: 4 },
    { name: 'Media Ownership Mapper', nameAr: 'خريطة ملكية الإعلام', description: 'Visualizes who owns what media outlets and their interconnections. Reveals the illusion of choice when 6 corporations own 90% of media.', descriptionAr: 'يُصور من يملك أي منافذ إعلامية وترابطاتها. يكشف وهم الاختيار عندما تملك 6 شركات 90٪ من الإعلام.', stars: 5 },
    { name: 'Lobby Tracker', nameAr: 'متتبع اللوبي', description: 'Tracks lobbying expenditures and their correlation with policy changes. Quantifies the dollar-per-vote influence of corporate interests.', descriptionAr: 'يتتبع نفقات الضغط وارتباطها بتغييرات السياسات. يحسب تأثير دولار-لكل-صوت للمصالح المؤسسية.', stars: 4 },
    { name: 'Data Broker Exposer', nameAr: 'كاشف سماسرة البيانات', description: 'Reveals companies trading in personal data and their clients. Maps the invisible data supply chain from your phone to advertising networks.', descriptionAr: 'يكشف الشركات التي تتاجر بالبيانات الشخصية وعملائها. يرسم سلسلة توريد البيانات الخفية من هاتفك إلى شبكات الإعلان.', stars: 3 },
  ],
  8: [
    { name: 'Confidence Calibrator', nameAr: 'معاير الثقة', description: 'Helps assign appropriate confidence levels to claims based on available evidence quality. Prevents both overconfidence in weak evidence and dismissal of strong anomalies.', descriptionAr: 'يساعد في تعيين مستويات ثقة مناسبة للادعاءات بناءً على جودة الأدلة المتاحة. يمنع كلاً من الثقة المفرطة في الأدلة الضعيفة ورفض الشذوذات القوية.', stars: 4 },
    { name: 'Known-Unknown Mapper', nameAr: 'خريطة المعلوم والمجهول', description: 'Categorizes information into Known Knowns, Known Unknowns, and Unknown Unknowns. Based on the Rumsfeld Matrix for epistemological clarity.', descriptionAr: 'يصنف المعلومات إلى معلوم معروف، ومجهول معروف، ومجهول مجهول. مبني على مصفوفة رامسفيلد للوضوح المعرفي.', stars: 5 },
    { name: 'Epistemic Humility Score', nameAr: 'مؤشر التواضع المعرفي', description: 'Evaluates how honest a source is about the limits of its own knowledge. Sources that claim absolute certainty on unknowable topics score lowest.', descriptionAr: 'يقيّم مدى صدق المصدر حول حدود معرفته الخاصة. المصادر التي تدعي اليقين المطلق في مواضيع لا يمكن معرفتها تحصل على أدنى الدرجات.', stars: 5 },
    { name: 'Black Box Explainer', nameAr: 'مُفسر الصندوق الأسود', description: 'Attempts to make opaque AI decision-making processes transparent. Uses SHAP values and attention maps to explain why an AI made a specific decision.', descriptionAr: 'يحاول جعل عمليات اتخاذ القرار المعتمة للذكاء الاصطناعي شفافة. يستخدم قيم SHAP وخرائط الانتباه لتفسير لماذا اتخذ الذكاء الاصطناعي قراراً معيناً.', stars: 3 },
    { name: 'Anomaly Documenter', nameAr: 'موثق الشذوذ', description: 'Systematically records unexplained phenomena for future analysis. Creates structured dossiers with evidence grades, witness reliability, and reproducibility scores.', descriptionAr: 'يوثق بشكل منهجي الظواهر غير المفسرة للتحليل المستقبلي. ينشئ ملفات منظمة بدرجات الأدلة وموثوقية الشهود ودرجات قابلية التكرار.', stars: 4 },
  ],
};

/* ── Star Rating Component ─────────────────────────────────── */
function StarRating({ rating, accentColor }: { rating: number; accentColor: string }) {
  return (
    <div className="fight-stars" style={{ '--accent': accentColor } as React.CSSProperties}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`fight-star ${i <= rating ? 'fight-star--filled' : 'fight-star--empty'}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

/* ── Weapon Card Component ─────────────────────────────────── */
function WeaponCard({
  weapon,
  index,
  accentColor,
  accentRGB,
  isRTL,
  t,
}: {
  weapon: Weapon;
  index: number;
  accentColor: string;
  accentRGB: string;
  isRTL: boolean;
  t: (entry: { en: string; ar: string; arEG?: string }) => string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className={`fight-weapon-card ${expanded ? 'fight-weapon-card--expanded' : ''}`}
      style={{
        '--accent': accentColor,
        '--accent-rgb': accentRGB,
        animationDelay: `${index * 0.1}s`,
      } as React.CSSProperties}
    >
      <div className="fight-weapon-header">
        <div className="fight-weapon-icon-wrap">
          <span className="fight-weapon-number">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="fight-weapon-title-area">
          <h3 className="fight-weapon-name">
            {t({ en: weapon.name, ar: weapon.nameAr })}
          </h3>
          <StarRating rating={weapon.stars} accentColor={accentColor} />
        </div>
        <span className={`fight-chevron ${expanded ? 'fight-chevron--open' : ''}`}>
          ▾
        </span>
      </div>
      <div className={`fight-weapon-body ${expanded ? 'fight-weapon-body--visible' : ''}`}>
        <p className="fight-weapon-desc">
          {t({ en: weapon.description, ar: weapon.descriptionAr })}
        </p>
        <div className="fight-effectiveness">
          <span className="fight-effectiveness-label">
            {t({ en: 'Effectiveness', ar: 'الفعالية' })}
          </span>
          <div className="fight-effectiveness-bar">
            <div
              className="fight-effectiveness-fill"
              style={{ width: `${(weapon.stars / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </button>
  );
}

/* ── Main Fight Page ───────────────────────────────────────── */
export default function FightPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { isRTL, t } = useRTL();

  const layerId = parseInt(id, 10);
  if (isNaN(layerId) || layerId < 1 || layerId > 8) {
    notFound();
  }

  const layer = LAYERS.find((l) => l.number === layerId);
  if (!layer) notFound();

  const weapons = COUNTER_WEAPONS[layerId] || [];
  const accentColor = layer.accentHSL;
  const accentRGB = layer.accentRGB;

  // Combine case studies for Layer 8
  const caseStudies =
    layerId === 8
      ? [...layer.caseStudies, ...LAYER_8_PHASE_2_CASES]
      : layer.caseStudies;

  return (
    <div
      className="fight-page"
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        '--accent': accentColor,
        '--accent-rgb': accentRGB,
        '--bg': layer.bgHSL,
        '--glass-tint': layer.glassTint,
      } as React.CSSProperties}
    >
      {/* Ambient Background */}
      <div className="fight-ambient" />
      <div className="fight-ambient-orb fight-ambient-orb--1" />
      <div className="fight-ambient-orb fight-ambient-orb--2" />

      {/* Layer Number Watermark */}
      <div className="fight-watermark" aria-hidden="true">
        {t({ en: String(layerId), ar: layer.numberAr })}
      </div>

      {/* Navigation */}
      <nav className="fight-nav">
        <Link href="/six-layers" className="fight-back-link">
          <span className="fight-back-arrow">{isRTL ? '→' : '←'}</span>
          {t({ en: 'Back to Six Layers', ar: 'العودة إلى الطبقات' })}
        </Link>
      </nav>

      {/* Hero Header */}
      <header className="fight-header">
        <div className="fight-layer-badge">
          {t({ en: `LAYER ${layerId}`, ar: `الطبقة ${layer.numberAr}` })}
        </div>
        <h1 className="fight-title">
          {t({ en: layer.name, ar: layer.nameAr })}
        </h1>
        <p className="fight-definition">
          {t({ en: layer.definition, ar: layer.definitionAr })}
        </p>
      </header>

      {/* Counter-Weapons Arsenal */}
      <section className="fight-arsenal-section">
        <div className="fight-section-header">
          <div className="fight-section-line" />
          <h2 className="fight-section-title">
            {t({ en: '⚔ Counter-Weapons Arsenal', ar: '⚔ ترسانة الأسلحة المضادة' })}
          </h2>
          <div className="fight-section-line" />
        </div>
        <p className="fight-section-sub">
          {t({
            en: `${weapons.length} specialized tools to fight Layer ${layerId} deception`,
            ar: `${weapons.length} أدوات متخصصة لمحاربة خداع الطبقة ${layer.numberAr}`,
          })}
        </p>

        <div className="fight-weapons-grid">
          {weapons.map((weapon, i) => (
            <WeaponCard
              key={weapon.name}
              weapon={weapon}
              index={i}
              accentColor={accentColor}
              accentRGB={accentRGB}
              isRTL={isRTL}
              t={t}
            />
          ))}
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="fight-cases-section">
        <div className="fight-section-header">
          <div className="fight-section-line" />
          <h2 className="fight-section-title">
            {t({ en: '📋 Case Studies', ar: '📋 دراسات الحالة' })}
          </h2>
          <div className="fight-section-line" />
        </div>
        <p className="fight-section-sub">
          {t({
            en: `${caseStudies.length} documented cases of Layer ${layerId} deception`,
            ar: `${caseStudies.length} حالة موثقة لخداع الطبقة ${layer.numberAr}`,
          })}
        </p>

        <div className="fight-cases-grid">
          {caseStudies.slice(0, 6).map((cs, i) => (
            <div
              key={cs.id}
              className="fight-case-card"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="fight-case-top">
                <span className="fight-case-domain">
                  {t({ en: cs.domain, ar: cs.domainAr })}
                </span>
                <span className="fight-case-year">{cs.year}</span>
              </div>
              <h3 className="fight-case-title">
                {t({ en: cs.title, ar: cs.titleAr })}
              </h3>
              <p className="fight-case-damage">
                {t({ en: cs.damage, ar: cs.damageAr })}
              </p>
              {cs.egyptianSpecific && (
                <span className="fight-case-egy-badge">
                  {t({ en: '🇪🇬 Egyptian', ar: '🇪🇬 مصري' })}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <footer className="fight-footer">
        <Link href="/six-layers" className="fight-cta-btn">
          {t({ en: 'Explore All Layers', ar: 'استكشف جميع الطبقات' })}
        </Link>
      </footer>

      {/* Scoped Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        .fight-page {
          position: relative;
          min-height: 100vh;
          background: var(--bg, #050510);
          color: #e0e0e0;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
          padding-bottom: 4rem;
        }
        [dir="rtl"] .fight-page {
          font-family: 'IBM Plex Sans Arabic', 'Inter', sans-serif;
        }

        /* ── Ambient Background ─────────────────────────── */
        .fight-ambient {
          position: fixed; inset: 0;
          background: radial-gradient(ellipse at 30% 20%, rgba(var(--accent-rgb), 0.06) 0%, transparent 60%),
                      radial-gradient(ellipse at 70% 80%, rgba(var(--accent-rgb), 0.04) 0%, transparent 50%);
          pointer-events: none; z-index: 0;
        }
        .fight-ambient-orb {
          position: fixed; border-radius: 50%;
          filter: blur(80px); pointer-events: none; z-index: 0;
          background: rgba(var(--accent-rgb), 0.08);
        }
        .fight-ambient-orb--1 { width: 400px; height: 400px; top: 10%; left: 5%; animation: fight-float 12s ease-in-out infinite; }
        .fight-ambient-orb--2 { width: 300px; height: 300px; bottom: 20%; right: 10%; animation: fight-float 15s ease-in-out infinite reverse; }
        @keyframes fight-float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -20px); }
        }

        /* ── Watermark ──────────────────────────────────── */
        .fight-watermark {
          position: fixed;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(15rem, 35vw, 30rem);
          font-weight: 900;
          color: rgba(var(--accent-rgb), 0.03);
          pointer-events: none;
          z-index: 0;
          line-height: 1;
          user-select: none;
        }

        /* ── Navigation ─────────────────────────────────── */
        .fight-nav {
          position: relative; z-index: 10;
          padding: 1.5rem 2rem;
        }
        .fight-back-link {
          display: inline-flex; align-items: center; gap: 0.5rem;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: color 0.3s;
          letter-spacing: 0.05em;
        }
        .fight-back-link:hover { color: var(--accent); }
        .fight-back-arrow { font-size: 1.1rem; }

        /* ── Header ──────────────────────────────────────── */
        .fight-header {
          position: relative; z-index: 10;
          text-align: center;
          padding: 2rem 2rem 3rem;
          max-width: 800px;
          margin: 0 auto;
          animation: fight-fadeUp 0.8s ease-out;
        }
        .fight-layer-badge {
          display: inline-block;
          padding: 0.35rem 1.2rem;
          border: 1px solid rgba(var(--accent-rgb), 0.4);
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--accent);
          text-transform: uppercase;
          margin-bottom: 1rem;
          background: rgba(var(--accent-rgb), 0.08);
        }
        .fight-title {
          font-size: clamp(1.8rem, 5vw, 3rem);
          font-weight: 800;
          color: #fff;
          margin: 0 0 1rem;
          background: linear-gradient(135deg, #fff 40%, var(--accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
        }
        .fight-definition {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.6);
          max-width: 650px;
          margin: 0 auto;
        }

        /* ── Section Headers ─────────────────────────────── */
        .fight-arsenal-section, .fight-cases-section {
          position: relative; z-index: 10;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .fight-section-header {
          display: flex; align-items: center; gap: 1rem;
          margin-bottom: 0.75rem;
          padding-top: 2.5rem;
        }
        .fight-section-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(var(--accent-rgb), 0.3), transparent);
        }
        .fight-section-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--accent);
          white-space: nowrap;
          margin: 0;
        }
        .fight-section-sub {
          text-align: center;
          color: rgba(255,255,255,0.4);
          font-size: 0.9rem;
          margin-bottom: 2rem;
        }

        /* ── Weapons Grid ────────────────────────────────── */
        .fight-weapons-grid {
          display: grid;
          gap: 1rem;
        }

        /* ── Weapon Card ─────────────────────────────────── */
        .fight-weapon-card {
          display: block; width: 100%; text-align: start;
          background: rgba(var(--accent-rgb), 0.04);
          border: 1px solid rgba(var(--accent-rgb), 0.15);
          border-radius: 16px;
          padding: 1.25rem 1.5rem;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          animation: fight-fadeUp 0.6s ease-out backwards;
          font-family: inherit;
          color: inherit;
        }
        .fight-weapon-card:hover {
          border-color: rgba(var(--accent-rgb), 0.4);
          background: rgba(var(--accent-rgb), 0.08);
          box-shadow: 0 0 30px rgba(var(--accent-rgb), 0.1);
          transform: translateY(-2px);
        }
        .fight-weapon-card--expanded {
          border-color: rgba(var(--accent-rgb), 0.5);
          background: rgba(var(--accent-rgb), 0.1);
        }

        .fight-weapon-header {
          display: flex; align-items: center; gap: 1rem;
        }
        .fight-weapon-icon-wrap {
          width: 44px; height: 44px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(var(--accent-rgb), 0.12);
          border: 1px solid rgba(var(--accent-rgb), 0.2);
          flex-shrink: 0;
        }
        .fight-weapon-number {
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--accent);
          font-family: 'Inter', monospace;
        }
        .fight-weapon-title-area { flex: 1; min-width: 0; }
        .fight-weapon-name {
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
          margin: 0 0 0.25rem;
          line-height: 1.3;
        }

        /* Stars */
        .fight-stars { display: flex; gap: 2px; }
        .fight-star { font-size: 0.85rem; }
        .fight-star--filled { color: var(--accent); }
        .fight-star--empty { color: rgba(255,255,255,0.15); }

        /* Chevron */
        .fight-chevron {
          font-size: 1.2rem;
          color: rgba(255,255,255,0.3);
          transition: transform 0.3s;
          flex-shrink: 0;
        }
        .fight-chevron--open { transform: rotate(180deg); color: var(--accent); }

        /* Body / Expand */
        .fight-weapon-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s;
          padding-top: 0;
        }
        .fight-weapon-body--visible {
          max-height: 300px;
          padding-top: 1rem;
        }
        .fight-weapon-desc {
          font-size: 0.9rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.6);
          margin: 0 0 1rem;
        }

        /* Effectiveness Bar */
        .fight-effectiveness {
          display: flex; align-items: center; gap: 0.75rem;
        }
        .fight-effectiveness-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          white-space: nowrap;
        }
        .fight-effectiveness-bar {
          flex: 1; height: 6px;
          background: rgba(255,255,255,0.08);
          border-radius: 3px;
          overflow: hidden;
        }
        .fight-effectiveness-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent), rgba(var(--accent-rgb), 0.5));
          border-radius: 3px;
          transition: width 0.6s ease-out;
        }

        /* ── Case Studies ────────────────────────────────── */
        .fight-cases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }
        .fight-case-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(var(--accent-rgb), 0.1);
          border-radius: 14px;
          padding: 1.25rem;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: border-color 0.3s, transform 0.3s;
          animation: fight-fadeUp 0.6s ease-out backwards;
        }
        .fight-case-card:hover {
          border-color: rgba(var(--accent-rgb), 0.35);
          transform: translateY(-2px);
        }
        .fight-case-top {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 0.6rem;
        }
        .fight-case-domain {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent);
          background: rgba(var(--accent-rgb), 0.1);
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
        }
        .fight-case-year {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.35);
          font-family: 'Inter', monospace;
        }
        .fight-case-title {
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
          margin: 0 0 0.4rem;
          line-height: 1.3;
        }
        .fight-case-damage {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.45);
          margin: 0;
        }
        .fight-case-egy-badge {
          display: inline-block;
          margin-top: 0.5rem;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          background: rgba(255, 200, 50, 0.1);
          color: #f0c030;
          border: 1px solid rgba(255, 200, 50, 0.2);
        }

        /* ── Footer CTA ──────────────────────────────────── */
        .fight-footer {
          position: relative; z-index: 10;
          text-align: center;
          padding: 3rem 2rem;
        }
        .fight-cta-btn {
          display: inline-block;
          padding: 0.85rem 2.5rem;
          background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.2), rgba(var(--accent-rgb), 0.05));
          border: 1px solid rgba(var(--accent-rgb), 0.3);
          border-radius: 999px;
          color: var(--accent);
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.3s;
          letter-spacing: 0.03em;
        }
        .fight-cta-btn:hover {
          background: rgba(var(--accent-rgb), 0.2);
          box-shadow: 0 0 40px rgba(var(--accent-rgb), 0.2);
          transform: translateY(-2px);
        }

        /* ── Animations ──────────────────────────────────── */
        @keyframes fight-fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive ──────────────────────────────────── */
        @media (max-width: 640px) {
          .fight-header { padding: 1.5rem 1rem 2rem; }
          .fight-arsenal-section, .fight-cases-section { padding: 0 1rem; }
          .fight-weapon-card { padding: 1rem; }
          .fight-cases-grid { grid-template-columns: 1fr; }
          .fight-watermark { font-size: 10rem; }
        }
      `}</style>
    </div>
  );
}
