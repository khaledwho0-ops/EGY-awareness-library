export interface SelfTestPillar {
  id: string;
  title: string;
  titleAr: string;
  summary: string;
}

export interface SelfTestRouteStep {
  id: string;
  title: string;
  titleAr: string;
  timing: string;
  summary: string;
}

export interface SelfTestRisk {
  id: string;
  title: string;
  titleAr: string;
  problem: string;
  control: string;
}

export const SELF_TEST_PILLARS: SelfTestPillar[] = [
  {
    id: "baseline-first",
    title: "Baseline before instruction",
    titleAr: "قياس الأساس قبل التوجيه",
    summary:
      "The protocol measures how the participant already judges claims before the platform teaches anything, so improvement claims are not built on guesswork.",
  },
  {
    id: "multi-instrument",
    title: "Multiple instruments, not one score",
    titleAr: "أدوات متعددة لا درجة واحدة",
    summary:
      "Misinformation resilience, mental-health literacy, religious coping, help-seeking, usability, and social desirability are separated instead of being collapsed into one vague awareness number.",
  },
  {
    id: "gated-deployment",
    title: "Launch gates before participant exposure",
    titleAr: "بوابات إطلاق قبل تعريض المشاركين",
    summary:
      "Reviewer signoff, emergency-directory rechecks, language readiness, and source-policy confirmation are hard gates, not optional polish.",
  },
  {
    id: "failure-visible",
    title: "Failure conditions are explicit",
    titleAr: "شروط الفشل معلنة",
    summary:
      "The protocol names what counts as failure: non-significant change, harmful religious-coping drift, weak usability, or poor completion rates.",
  },
];

export const SELF_TEST_ROUTE_STEPS: SelfTestRouteStep[] = [
  {
    id: "day-0",
    title: "Day 0 baseline battery",
    titleAr: "بطارية الأساس في اليوم صفر",
    timing: "Before any 14-day intervention begins",
    summary:
      "Participants complete the trust-calibration battery plus the pre-test instrument set so the study captures initial vulnerability, confidence, and source-ranking behavior.",
  },
  {
    id: "days-1-14",
    title: "Daily intervention window",
    titleAr: "نافذة التدخل اليومي",
    timing: "Days 1 through 14",
    summary:
      "The app tracks exercise completion, time per session, and interaction data while the participant moves through the DeepReal, Mental Health, and Religion Hub exercises.",
  },
  {
    id: "day-15",
    title: "Day 15 post-test and usability check",
    titleAr: "اختبار اليوم الخامس عشر",
    timing: "After the intervention closes",
    summary:
      "The same outcome instruments run again, SUS is added, and qualitative feedback captures whether the platform actually held up as a usable learning system.",
  },
];

export const SELF_TEST_RISKS: SelfTestRisk[] = [
  {
    id: "arabic-gating",
    title: "Arabic battery is not uniformly launch-ready",
    titleAr: "الحزمة العربية ليست جاهزة بالكامل للإطلاق",
    problem:
      "The current readiness matrix explicitly blocks or conditions Arabic deployment for part of the assessment battery, so a full Arabic participant launch would overclaim validation.",
    control:
      "Keep participant language gated, document the blockers in the protocol, and freeze each localized form only after adaptation and review are complete.",
  },
  {
    id: "reviewer-signoff",
    title: "Expert signoff can be missing while UI still works",
    titleAr: "قد يكتمل الواجهة بدون توقيع الخبراء",
    problem:
      "A technically working assessment flow can still be methodologically unsafe if DeepReal, Mental Health, or Religion Hub reviewers have not approved the launch packet.",
    control:
      "The launch gate stays closed until all three reviewer signoffs are recorded in governance state.",
  },
  {
    id: "source-drift",
    title: "Hotlines and emergency references can drift",
    titleAr: "أرقام وخدمات الإحالة قد تتغير",
    problem:
      "If safety directories or support references age out, the protocol becomes misleading at the exact point where the user expects help routing.",
    control:
      "Emergency and referral directories are rechecked before each launch window and treated as blockers if stale.",
  },
  {
    id: "social-desirability",
    title: "Participants can answer to look good",
    titleAr: "المشارك قد يجيب ليبدو جيداً",
    problem:
      "Self-report outcomes can be inflated by the desire to appear informed, emotionally healthy, or religiously balanced.",
    control:
      "MC-SDS remains in the battery as a covariate so interpretation does not ignore impression-management bias.",
  },
];
