import { BRAIN_EXERCISES, INSIDER_TRICKS, MYTH_LIBRARY, NEVER_DO_RULES, REAL_SCENARIOS, REVERSE_ENGINEERING_CASES } from "@/data/research/module-libraries";
import { MODULE_BRIEFINGS, type ComparisonMetric, type LocalizedText, type ModuleId, type WorkflowStep } from "@/data/research/module-briefings";
import { MODULE_GUIDES } from "@/data/research/module-guides";
import { BIAS_LIBRARY, COGNITIVE_COMMUNITIES, KEYHUNTER_V2, REALTIME_COGNITIVE_V2 } from "@/data/research/cognitive-knowledge";
import { AUTHORITY_ROUTES, RELIGION_REFERENCE_LIBRARY } from "@/data/research/authority-references";
import { getAllEvidenceOverviews, getEvidenceOverview } from "./evidence-store";
import { getScienceRefreshSummary, readWorkflowStore, type ModuleWorkflowState } from "./workflow-store";

export type JourneyTab = "exercises" | "rules" | "myths" | "scenarios" | "tricks" | "reverse";
const MODULE_IDS: ModuleId[] = ["deepreal", "mental-health", "religion-hub"];

export interface ModuleJourneySummary {
  module: ModuleId;
  href: string;
  title: LocalizedText;
  philosophy: LocalizedText;
  routeStatus: "guide-required" | "guided" | "in-progress" | "complete";
  activeEmotion: LocalizedText | null;
  emotionalNudge: LocalizedText;
  scientificReason: LocalizedText;
  nextStep: WorkflowStep;
  recommendedTab: JourneyTab;
  progress: {
    completedSteps: number;
    totalSteps: number;
    percentage: number;
  };
  comparisonFocus: ComparisonMetric;
}

function t(en: string, ar: string, arEG?: string): LocalizedText {
  return { en, ar, arEG: arEG || ar };
}

function dedupeBy<T>(items: T[], getKey: (item: T) => string) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = getKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getPriorityRank(priority?: "egypt-critical" | "global-critical" | "high-need") {
  if (priority === "egypt-critical") return 0;
  if (priority === "high-need") return 1;
  if (priority === "global-critical") return 2;
  return 3;
}

function getIntensityRank(intensity: "low" | "medium" | "high") {
  if (intensity === "high") return 0;
  if (intensity === "medium") return 1;
  return 2;
}

function prepareLibraryCollection<
  T extends {
    title: LocalizedText;
    summary: LocalizedText;
    action: LocalizedText;
    tags: string[];
    intensity: "low" | "medium" | "high";
    priority?: "egypt-critical" | "global-critical" | "high-need";
    contentOrigin?: "authored" | "generated";
  },
>(items: T[]) {
  return dedupeBy(
    items,
    (item) =>
      `${item.title.en.toLowerCase()}|${item.summary.en.toLowerCase()}|${item.action.en.toLowerCase()}|${item.tags.join(",").toLowerCase()}`
  ).sort((left, right) => {
    const originDelta =
      (left.contentOrigin === "authored" ? 0 : 1) -
      (right.contentOrigin === "authored" ? 0 : 1);
    if (originDelta !== 0) return originDelta;

    const priorityDelta = getPriorityRank(left.priority) - getPriorityRank(right.priority);
    if (priorityDelta !== 0) return priorityDelta;

    const intensityDelta = getIntensityRank(left.intensity) - getIntensityRank(right.intensity);
    if (intensityDelta !== 0) return intensityDelta;

    return left.title.en.localeCompare(right.title.en);
  });
}

function getModuleHref(module: ModuleId) {
  if (module === "deepreal") return "/deepreal";
  if (module === "mental-health") return "/mental-health";
  return "/religion-hub";
}

function getModulePhilosophy(module: ModuleId) {
  if (module === "deepreal") {
    return t(
      "DeepReal is the truth-judgment engine: pause the reaction, verify the source, compare evidence, then decide.",
      "ديب ريال هو محرك الحكم على الحقيقة: أوقف رد الفعل، تحقق من المصدر، قارن الأدلة، ثم قرر."
    );
  }

  if (module === "mental-health") {
    return t(
      "Mental Health is the safety-first literacy engine: stabilize first, label carefully, then route to the safest support.",
      "الصحة النفسية هي محرك التوعية الآمن أولاً: ثبّت نفسك أولاً، سمِّ ما يحدث بدقة، ثم انتقل إلى الدعم الأكثر أماناً."
    );
  }

  return t(
    "Religion Hub is the moderation engine: protect meaning, block coercion, and keep boundaries visible before guidance.",
    "المحور الديني هو محرك الاعتدال: احمِ المعنى، امنع القهر، وأبقِ الحدود واضحة قبل أي توجيه."
  );
}

function getGuideRecommendation(state: ModuleWorkflowState, module: ModuleId) {
  const guide = MODULE_GUIDES[module].find((option) => option.id === state.guideEmotionKey);
  return guide ?? null;
}

function getNextStep(module: ModuleId, state: ModuleWorkflowState) {
  const briefing = MODULE_BRIEFINGS[module];
  const guide = getGuideRecommendation(state, module);

  if (!state.guideSeenAt) {
    return {
      routeStatus: "guide-required" as const,
      nextStep: briefing.workflow[0],
      recommendedTab: "exercises" as JourneyTab,
      activeEmotion: null,
      emotionalNudge: t(
        "Take 30 seconds to tell the system how you feel so it can route you safely instead of throwing you into the full library.",
        "خذ 30 ثانية لتخبر النظام بما تشعر به حتى يوجهك بأمان بدلاً من أن يرميك داخل المكتبة كاملة."
      ),
      scientificReason: t(
        "The first decision is not content volume. It is matching the right cognitive route to your current state.",
        "أول قرار ليس كمية المحتوى، بل اختيار المسار المعرفي المناسب لحالتك الحالية."
      ),
    };
  }

  if (guide && !state.completedStepIds.includes(guide.firstStepId)) {
    const guidedStep = briefing.workflow.find((step) => step.id === guide.firstStepId) ?? briefing.workflow[0];
    return {
      routeStatus: "guided" as const,
      nextStep: guidedStep,
      recommendedTab: guide.recommendedTab,
      activeEmotion: guide.emotion,
      emotionalNudge: guide.validation,
      scientificReason: guide.scientificReason,
    };
  }

  const remaining = briefing.workflow.find((step) => !state.completedStepIds.includes(step.id));
  if (remaining) {
    return {
      routeStatus: "in-progress" as const,
      nextStep: remaining,
      recommendedTab: "exercises" as JourneyTab,
      activeEmotion: guide?.emotion ?? null,
      emotionalNudge: t(
        "You already have enough context. The next gain comes from finishing the next step, not reading everything at once.",
        "لديك الآن سياق كافٍ. الفائدة التالية تأتي من إكمال الخطوة التالية، لا من قراءة كل شيء دفعة واحدة."
      ),
      scientificReason: t(
        "Stepwise progression reduces overload and improves retention better than open-ended browsing.",
        "التقدم خطوة بخطوة يقلل الحمل الذهني ويحسن التذكر أكثر من التصفح المفتوح."
      ),
    };
  }

  return {
    routeStatus: "complete" as const,
    nextStep: briefing.workflow[briefing.workflow.length - 1],
    recommendedTab: "scenarios" as JourneyTab,
    activeEmotion: guide?.emotion ?? null,
    emotionalNudge: t(
      "You completed the core route. Stay sharp by revisiting one scenario or exercise instead of passively rereading.",
      "لقد أكملت المسار الأساسي. حافظ على قوتك بمراجعة سيناريو أو تمرين واحد بدلاً من إعادة القراءة بشكل سلبي."
    ),
    scientificReason: t(
      "Maintenance works best through active rehearsal, not passive exposure.",
      "الصيانة المعرفية تعمل أفضل عبر الممارسة النشطة لا التعرض السلبي."
    ),
  };
}

function buildJourneySummary(module: ModuleId, state: ModuleWorkflowState): ModuleJourneySummary {
  const briefing = MODULE_BRIEFINGS[module];
  const route = getNextStep(module, state);

  return {
    module,
    href: getModuleHref(module),
    title: briefing.title,
    philosophy: getModulePhilosophy(module),
    routeStatus: route.routeStatus,
    activeEmotion: route.activeEmotion,
    emotionalNudge: route.emotionalNudge,
    scientificReason: route.scientificReason,
    nextStep: route.nextStep,
    recommendedTab: route.recommendedTab,
    progress: {
      completedSteps: state.completedStepIds.length,
      totalSteps: briefing.workflow.length,
      percentage: Math.round((state.completedStepIds.length / briefing.workflow.length) * 100),
    },
    comparisonFocus: briefing.metrics[0],
  };
}

export async function getModulePayload(module: ModuleId) {
  const store = await readWorkflowStore();
  const [refreshSummary, evidence] = await Promise.all([
    getScienceRefreshSummary(),
    getEvidenceOverview(module),
  ]);
  const collections = {
    cognitive: dedupeBy(
      REALTIME_COGNITIVE_V2.filter((item) => item.module === module),
      (item) => `${item.module}:${item.title.en.toLowerCase()}:${item.action.en.toLowerCase()}`
    ),
    exercises: prepareLibraryCollection(BRAIN_EXERCISES.filter((item) => item.module === module)),
    rules: prepareLibraryCollection(NEVER_DO_RULES.filter((item) => item.module === module)),
    myths: prepareLibraryCollection(MYTH_LIBRARY.filter((item) => item.module === module)),
    scenarios: prepareLibraryCollection(REAL_SCENARIOS.filter((item) => item.module === module)),
    tricks: prepareLibraryCollection(INSIDER_TRICKS.filter((item) => item.module === module)),
    reverse: prepareLibraryCollection(REVERSE_ENGINEERING_CASES.filter((item) => item.module === module)),
  };

  return {
    module,
    briefing: MODULE_BRIEFINGS[module],
    guide: MODULE_GUIDES[module],
    workflowState: store.modules[module],
    lastRefreshAt: store.lastRefreshAt,
    refreshSummary,
    evidence,
    journey: buildJourneySummary(module, store.modules[module]),
    collections,
    knowledge: {
      keyhunter: KEYHUNTER_V2.filter((item) => item.module === module),
      biases: dedupeBy(BIAS_LIBRARY, (item) => `${item.family}:${item.title.en.toLowerCase()}`),
      communities: dedupeBy(
        COGNITIVE_COMMUNITIES.filter((item) => item.scope === "shared" || item.scope === module),
        (item) => item.url.toLowerCase()
      ),
      authorities: AUTHORITY_ROUTES.filter((item) => item.module === module),
      references: RELIGION_REFERENCE_LIBRARY.filter((item) => item.module === module),
    },
    counts: {
      exercises: collections.exercises.length,
      rules: collections.rules.length,
      myths: collections.myths.length,
      scenarios: collections.scenarios.length,
      tricks: collections.tricks.length,
      reverse: collections.reverse.length,
    },
  };
}

export async function getJourneyPayload() {
  const store = await readWorkflowStore();
  const [refreshSummary, evidence] = await Promise.all([
    getScienceRefreshSummary(),
    getAllEvidenceOverviews(),
  ]);
  const modules = MODULE_IDS.map((module) => buildJourneySummary(module, store.modules[module]));
  const primary =
    modules.find((module) => module.routeStatus === "guide-required") ??
    modules.find((module) => module.routeStatus === "guided") ??
    modules.find((module) => module.routeStatus === "in-progress") ??
    modules[0];

  return {
    generatedAt: new Date().toISOString(),
    primaryModule: primary.module,
    modules,
    refreshSummary,
    evidence,
  };
}
