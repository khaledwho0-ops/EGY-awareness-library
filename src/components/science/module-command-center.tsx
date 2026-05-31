"use client";

import { useEffect, useState } from "react";
import { Activity, CheckCircle2, ChevronDown, Clock3, Database, RefreshCw, ShieldCheck } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import type { ModuleId } from "@/data/research/module-briefings";
import type { ProtocolKind } from "@/lib/science/protocol-engine";
import { ModuleGuidePopup } from "./module-guide-popup";
import { ModuleLabConsole } from "./module-lab-console";
import { ProtocolWorkbench } from "./protocol-workbench";
import { CognitiveCommandDeck } from "./cognitive-command-deck";
import { VisualClarityPanel } from "@/components/shared/visual-clarity-panel";

type JourneyTab = "exercises" | "rules" | "myths" | "scenarios" | "tricks" | "reverse";
type ItemFilter = "all" | "authored" | "egypt" | "high-intensity";

type LocalizedText = { en: string; ar: string };

type WorkflowState = {
  completedStepIds: string[];
  selectedRuleIds: string[];
  selectedScenarioIds: string[];
  selectedExerciseIds: string[];
  selectedMythIds: string[];
  selectedTrickIds: string[];
  selectedReverseIds: string[];
  guideSeenAt: string;
  guideEmotionKey: string;
  updatedAt: string;
};

type GuideOption = {
  id: string;
  emotion: LocalizedText;
  validation: LocalizedText;
  scientificReason: LocalizedText;
  recommendation: LocalizedText;
  caution: LocalizedText;
  firstStepId: string;
  recommendedTab: JourneyTab;
};

type Item = {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  action: LocalizedText;
  intensity: "low" | "medium" | "high";
  tags: string[];
  goal?: LocalizedText;
  priority?: "egypt-critical" | "global-critical" | "high-need";
  contentOrigin?: "authored" | "generated";
};

type CognitiveItem = {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  action: LocalizedText;
  whyItWorks: LocalizedText;
  sources: Array<{
    label: LocalizedText;
    url: string;
  }>;
};

type EvidenceSnapshot = {
  id: string;
  region: string;
  valueKind: string;
  valueNumeric: number | null;
  valueText: string;
  year: number | null;
  method: string;
  confidence: number;
  source: {
    sourceName: string;
    url: string;
    syncStatus: string;
  };
};

type ModulePayload = {
  module: ModuleId;
  briefing: {
    title: LocalizedText;
    subtitle: LocalizedText;
    mission: LocalizedText;
    workflow: Array<{
      id: string;
      order: number;
      title: LocalizedText;
      description: LocalizedText;
      when: LocalizedText;
      action: LocalizedText;
    }>;
  };
  workflowState: WorkflowState;
  guide: GuideOption[];
  lastRefreshAt: string | null;
  refreshSummary: {
    sourceCount: number;
    signalCount: number;
    updateMethodCount: number;
    history: Array<{
      triggeredAt: string;
      note: string;
    }>;
  };
  evidence: {
    claims: Array<{
      id: string;
      title: LocalizedText;
      summary: LocalizedText;
      metrics: Array<{
        id: string;
        label: LocalizedText;
        unit: string;
        snapshots: EvidenceSnapshot[];
      }>;
    }>;
    sourceHealth: {
      total: number;
      live: number;
      failed: number;
      seeded: number;
      stale: number;
    };
  };
  journey: {
    routeStatus: "guide-required" | "guided" | "in-progress" | "complete";
    activeEmotion: LocalizedText | null;
    emotionalNudge: LocalizedText;
    scientificReason: LocalizedText;
    nextStep: {
      id: string;
      order: number;
      title: LocalizedText;
      description: LocalizedText;
      when: LocalizedText;
      action: LocalizedText;
    };
    recommendedTab: JourneyTab;
    progress: {
      completedSteps: number;
      totalSteps: number;
      percentage: number;
    };
  };
  collections: {
    cognitive: CognitiveItem[];
    exercises: Item[];
    rules: Item[];
    myths: Item[];
    scenarios: Item[];
    tricks: Item[];
    reverse: Item[];
  };
  knowledge: {
    keyhunter: Array<{
      id: string;
      category: LocalizedText;
      title: LocalizedText;
      summary: LocalizedText;
      action: LocalizedText;
      whyItMatters: LocalizedText;
      tags: string[];
      coreKeywords: string[];
      expertKeywords: string[];
      hiddenTerms: string[];
      researchPhrases: string[];
      threatKeywords: string[];
      confusionWords: string[];
      promptSuggestions: string[];
      sources: Array<{ label: LocalizedText; url: string }>;
    }>;
    biases: Array<{
      id: string;
      family: "deepfake-fallacy" | "deepfake-bias" | "religious-bias";
      title: LocalizedText;
      summary: LocalizedText;
      manipulationUse: LocalizedText;
      defenseMove: LocalizedText;
      tags: string[];
      sources: Array<{ label: LocalizedText; url: string }>;
    }>;
    communities: Array<{
      id: string;
      title: LocalizedText;
      summary: LocalizedText;
      url: string;
      access: "free" | "community" | "official";
      scope: ModuleId | "shared";
      tags: string[];
    }>;
    authorities: Array<{
      id: string;
      title: LocalizedText;
      expertType: LocalizedText;
      useWhen: LocalizedText;
      whyTrusted: LocalizedText;
      verifyYourself: LocalizedText;
      doNotRelyIf: LocalizedText;
      proofSignals: string[];
      routes: Array<{
        label: LocalizedText;
        url: string;
        access: "free" | "official" | "community";
      }>;
    }>;
    references: Array<{
      id: string;
      tradition: "quran" | "hadith";
      title: LocalizedText;
      theme: LocalizedText;
      summary: LocalizedText;
      whyRelevant: LocalizedText;
      resolve: {
        type: "ayah" | "search";
        q: string;
      };
      sourceUrl?: string;
      tags: string[];
    }>;
  };
  counts: Record<JourneyTab, number>;
};

type ProtocolTarget = {
  id: string;
  title: LocalizedText;
  kind: ProtocolKind;
};

const TAB_LABELS: Array<{ id: JourneyTab; en: string; ar: string; arEG: string }> = [
  { id: "exercises", en: "Brain exercises", ar: "تمارين العقل", arEG: "تمارين العقل" },
  { id: "rules", en: "Never-do rules", ar: "قواعد لا تفعل", arEG: "حاجات متعملهاش" },
  { id: "myths", en: "Myths debunked", ar: "خرافات مفككة", arEG: "خرافات اتفنّدت" },
  { id: "scenarios", en: "Real scenarios", ar: "سيناريوهات واقعية", arEG: "سيناريوهات حقيقية" },
  { id: "tricks", en: "Insider tricks", ar: "حيل عملية", arEG: "حيل عملية" },
  { id: "reverse", en: "Reverse mode", ar: "الوضع العكسي", arEG: "الوضع العكسي" },
];

const EMPTY_WORKFLOW_STATE: WorkflowState = {
  completedStepIds: [],
  selectedRuleIds: [],
  selectedScenarioIds: [],
  selectedExerciseIds: [],
  selectedMythIds: [],
  selectedTrickIds: [],
  selectedReverseIds: [],
  guideSeenAt: "",
  guideEmotionKey: "",
  updatedAt: "",
};

function copy(text: LocalizedText, arabic: boolean) {
  return arabic ? text.ar : text.en;
}

function getReviewKind(tab: JourneyTab): ProtocolKind {
  if (tab === "rules") return "rules";
  if (tab === "myths") return "myths";
  if (tab === "scenarios") return "scenarios";
  if (tab === "tricks") return "tricks";
  if (tab === "reverse") return "reverse";
  return "exercises";
}

function getWorkflowKind(tab: JourneyTab): "rule" | "scenario" | "exercise" | "myth" | "trick" | "reverse" {
  if (tab === "rules") return "rule";
  if (tab === "myths") return "myth";
  if (tab === "scenarios") return "scenario";
  if (tab === "tricks") return "trick";
  if (tab === "reverse") return "reverse";
  return "exercise";
}

function getReviewedIds(tab: JourneyTab, state: WorkflowState) {
  if (tab === "rules") return state.selectedRuleIds;
  if (tab === "scenarios") return state.selectedScenarioIds;
  if (tab === "myths") return state.selectedMythIds;
  if (tab === "tricks") return state.selectedTrickIds;
  if (tab === "reverse") return state.selectedReverseIds;
  return state.selectedExerciseIds;
}

function formatSnapshotValue(snapshot: EvidenceSnapshot, unit: string) {
  if (snapshot.valueNumeric === null) {
    return snapshot.valueText;
  }

  return unit === "signal" ? `${snapshot.valueNumeric}` : `${snapshot.valueNumeric} ${unit}`.trim();
}

const GUIDE_DISMISS_WINDOW_MS = 1000 * 60 * 60 * 24;

function getGuideDismissKey(module: ModuleId) {
  return `eal-guide-dismissed:${module}`;
}

function wasGuideDismissed(module: ModuleId) {
  if (typeof window === "undefined") return false;

  const storedValue = window.localStorage.getItem(getGuideDismissKey(module));
  if (!storedValue) return false;

  const timestamp = Number(storedValue);
  if (!Number.isFinite(timestamp)) return false;

  return Date.now() - timestamp < GUIDE_DISMISS_WINDOW_MS;
}

function rememberGuideDismissal(module: ModuleId) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getGuideDismissKey(module), `${Date.now()}`);
}

function clearGuideDismissal(module: ModuleId) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(getGuideDismissKey(module));
}

export function ModuleCommandCenter({
  module,
  initialTab,
}: {
  module: ModuleId;
  initialTab?: JourneyTab;
}) {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const [activeTab, setActiveTab] = useState<JourneyTab>(initialTab ?? "exercises");
  const [payload, setPayload] = useState<ModulePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [highlightStepId, setHighlightStepId] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [protocolTarget, setProtocolTarget] = useState<ProtocolTarget | null>(null);
  const [itemFilter, setItemFilter] = useState<ItemFilter>("all");
  const [evidenceOpen, setEvidenceOpen] = useState(false);

  useEffect(() => {
    setVisibleCount(activeTab === "scenarios" ? 18 : 12);
  }, [activeTab]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`/api/science/module/${module}`);
        if (!response.ok) {
          throw new Error(`module request failed: ${response.status}`);
        }
        const nextPayload = (await response.json()) as ModulePayload;
        if (!cancelled) {
          setPayload(nextPayload);
          setGuideOpen(!nextPayload.workflowState.guideSeenAt && !wasGuideDismissed(module));
          setActiveTab(initialTab ?? nextPayload.journey.recommendedTab);
        }
      } catch (caughtError) {
        if (!cancelled) {
          const message = caughtError instanceof Error ? caughtError.message : "Unknown module loading failure";
          setError(message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [initialTab, module]);

  async function refreshModule() {
    const response = await fetch(`/api/science/module/${module}`);
    if (!response.ok) {
      throw new Error(`module request failed: ${response.status}`);
    }
    const nextPayload = (await response.json()) as ModulePayload;
    setPayload(nextPayload);
    setError("");
  }

  async function toggleWorkflow(kind: "step" | "rule" | "scenario" | "exercise" | "myth" | "trick" | "reverse", id: string, checked: boolean) {
    const response = await fetch("/api/science/workflow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ module, kind, id, checked }),
    });
    const nextState = (await response.json()) as WorkflowState;
    setPayload((current) => (current ? { ...current, workflowState: nextState } : current));
  }

  async function refreshScience() {
    setRefreshing(true);
    try {
      const refreshResponse = await fetch("/api/science/refresh", { method: "POST" });
      if (!refreshResponse.ok) {
        throw new Error(`refresh failed: ${refreshResponse.status}`);
      }
      await refreshModule();
    } catch (caughtError) {
      const message = caughtError instanceof Error ? caughtError.message : "Unknown refresh failure";
      setError(message);
    } finally {
      setRefreshing(false);
    }
  }

  async function applyGuide(option: GuideOption) {
    const response = await fetch("/api/science/workflow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ module, kind: "guide", id: option.id }),
    });
    const nextState = (await response.json()) as WorkflowState;
    setPayload((current) => (current ? { ...current, workflowState: nextState } : current));
    clearGuideDismissal(module);
    setActiveTab(option.recommendedTab);
    setHighlightStepId(option.firstStepId);
    setGuideOpen(false);
  }

  function closeGuideTemporarily() {
    rememberGuideDismissal(module);
    setGuideOpen(false);
  }

  if (loading) {
    return (
      <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
        {t({ en: "Loading command center...", ar: "جارٍ تحميل مركز التشغيل...", arEG: "بيتحمّل مركز التشغيل..." })}
      </div>
    );
  }

  if (!payload) {
    return (
      <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
        <strong style={{ display: "block", marginBottom: 8 }}>
          {t({ en: "Command center failed to load", ar: "فشل تحميل مركز التشغيل", arEG: "مركز التشغيل مش اتحمّل" })}
        </strong>
        <p style={{ color: "var(--text-secondary)", marginTop: 0 }}>
          {error || t({ en: "The module payload did not arrive correctly.", ar: "لم تصل بيانات الوحدة بشكل صحيح.", arEG: "بيانات الوحدة موصلتش صح." })}
        </p>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            setLoading(true);
            setError("");
            void refreshModule().finally(() => setLoading(false));
          }}
        >
          {t({ en: "Retry", ar: "أعد المحاولة", arEG: "جرّب تاني" })}
        </button>
      </div>
    );
  }

    const workflowState = payload.workflowState ?? EMPTY_WORKFLOW_STATE;
  const currentItems = payload.collections[activeTab] ?? [];
  const filteredItems = currentItems.filter((item) => {
    if (itemFilter === "authored") return item.contentOrigin === "authored";
    if (itemFilter === "egypt") return item.priority === "egypt-critical";
    if (itemFilter === "high-intensity") return item.intensity === "high";
    return true;
  });
  const filterCounts: Record<ItemFilter, number> = {
    all: currentItems.length,
    authored: currentItems.filter((item) => item.contentOrigin === "authored").length,
    egypt: currentItems.filter((item) => item.priority === "egypt-critical").length,
    "high-intensity": currentItems.filter((item) => item.intensity === "high").length,
  };
  const reviewedIds = getReviewedIds(activeTab, workflowState);
  const nextStep = payload.journey.nextStep;
  const lastRefreshLabel = payload.lastRefreshAt
    ? new Date(payload.lastRefreshAt).toLocaleString(t({ en: "en-US", ar: "ar-EG", arEG: "ar-EG" }))
    : a
      ? "لم يتم التحديث بعد"
      : "Not refreshed yet";
  const evidenceClaims = payload.evidence.claims.slice(0, 2);

  return (
    <section className="glass-card" style={{ padding: "var(--space-xl)", marginBottom: "var(--space-xl)", direction: a ? "rtl" : "ltr" }}>
      {/* ── Dashboard Header: compact bar with progress pill ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
        <ShieldCheck size={18} style={{ color: "var(--accent-cta)", flexShrink: 0 }} />
        <h2 style={{ margin: 0, flex: "0 0 auto" }}>{copy(payload.briefing.title, a)}</h2>
        <div style={{ flex: 1, minWidth: 100 }}>
          <div className="progress-pill">
            <div
              className="progress-pill-fill"
              style={{ width: `${payload.journey.progress.percentage}%` }}
            />
          </div>
        </div>
        <span className="badge" style={{ flexShrink: 0 }}>
          {payload.journey.progress.completedSteps}/{payload.journey.progress.totalSteps} ({payload.journey.progress.percentage}%)
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          <button type="button" className="btn-secondary" onClick={refreshScience} disabled={refreshing} style={{ padding: "6px 10px", fontSize: 12 }}>
            <RefreshCw size={12} style={{ animation: refreshing ? "spin 1s linear infinite" : "none" }} />
            {refreshing ? t({ en: "Syncing", ar: "مزامنة", arEG: "بيزامن" }) : t({ en: "Sync", ar: "زامن", arEG: "زامن" })}
          </button>
          <button type="button" className="btn-secondary" onClick={() => setGuideOpen(true)} style={{ padding: "6px 10px", fontSize: 12 }}>
            {t({ en: "Guide", ar: "دليل", arEG: "دليل" })}
          </button>
        </div>
      </div>
      <p style={{ color: "var(--text-muted)", margin: "0 0 6px 0", fontSize: 13 }}>
        {copy(payload.briefing.subtitle, a)}
      </p>
      <p style={{ color: "var(--text-secondary)", margin: "0 0 6px 0", fontSize: 13 }}>
        {copy(payload.briefing.mission, a)}
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18, fontSize: 12, color: "var(--text-muted)" }}>
        <Clock3 size={12} />
        <span>{lastRefreshLabel}</span>
        <span>•</span>
        <span>{payload.evidence.sourceHealth.total} {t({ en: "sources", ar: "مصدر", arEG: "مصدر" })}</span>
        <span>•</span>
        <span>{payload.evidence.sourceHealth.live} {t({ en: "live", ar: "حي", arEG: "شغال" })}</span>
        {payload.evidence.sourceHealth.failed > 0 ? (
          <><span>•</span><span style={{ color: "var(--color-danger)" }}>{payload.evidence.sourceHealth.failed} {t({ en: "failed", ar: "فشل", arEG: "فشل" })}</span></>
        ) : null}
      </div>

      <VisualClarityPanel />

      {error ? (
        <div
          className="glass-card"
          style={{
            padding: "var(--space-md)",
            marginBottom: 16,
            border: "1px solid rgba(248, 113, 113, 0.35)",
            background: "rgba(127, 29, 29, 0.18)",
          }}
        >
          <strong style={{ display: "block", marginBottom: 4 }}>
            {t({ en: "A data problem needs review", ar: "يوجد خلل يحتاج مراجعة", arEG: "فيه مشكلة محتاجة مراجعة" })}
          </strong>
          <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>{error}</span>
        </div>
      ) : null}

      <div style={{ marginBottom: 20 }}>
        <ModuleLabConsole module={module} embedded />
      </div>
      <CognitiveCommandDeck
        protocols={payload.collections.cognitive}
        basics={payload.knowledge.keyhunter}
        biases={payload.knowledge.biases}
        communities={payload.knowledge.communities}
        authorities={payload.knowledge.authorities}
        references={payload.knowledge.references}
      />

      <div className="mcc-two-col-grid" style={{ marginBottom: 20 }}>
        <div className="glass-card" style={{ padding: "var(--space-lg)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Activity size={16} style={{ color: "var(--accent-cta)" }} />
            <strong>{t({ en: "What is happening now", ar: "ماذا يحدث الآن", arEG: "إيه اللي بيحصل دلوقتي" })}</strong>
          </div>
          <div className="grid gap-3">
            <div className="glass-card" style={{ padding: "var(--space-md)", background: "var(--bg-secondary)" }}>
              <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4 }}>
                {t({ en: "Route status", ar: "حالة المسار", arEG: "حالة المسار" })}
              </div>
              <strong>{copy(nextStep.title, a)}</strong>
              <p style={{ marginTop: 6, marginBottom: 6, color: "var(--text-secondary)" }}>
                {copy(payload.journey.emotionalNudge, a)}
              </p>
              <p style={{ marginTop: 0, marginBottom: 0, fontSize: 13, color: "var(--text-muted)" }}>
                {copy(payload.journey.scientificReason, a)}
              </p>
            </div>

            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
              <div className="glass-card" style={{ padding: "var(--space-md)", background: "var(--bg-secondary)" }}>
                <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4 }}>
                  {t({ en: "Progress", ar: "التقدم", arEG: "التقدم" })}
                </div>
                <strong>{payload.journey.progress.percentage}%</strong>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  {payload.journey.progress.completedSteps}/{payload.journey.progress.totalSteps}
                </div>
              </div>
              <div className="glass-card" style={{ padding: "var(--space-md)", background: "var(--bg-secondary)" }}>
                <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4 }}>
                  {t({ en: "Current focus", ar: "التركيز الحالي", arEG: "التركيز الحالي" })}
                </div>
                <strong>{t(TAB_LABELS.find((tab) => tab.id === payload.journey.recommendedTab) ?? TAB_LABELS[0])}</strong>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  {payload.journey.routeStatus}
                </div>
              </div>
            </div>

            {payload.briefing.workflow.map((step) => {
              const isDone = workflowState.completedStepIds.includes(step.id);
              const isHighlighted = highlightStepId === step.id || nextStep.id === step.id;

              return (
                <div
                  key={step.id}
                  className="glass-card"
                  style={{
                    padding: "var(--space-md)",
                    background: "var(--bg-secondary)",
                    borderInlineStart: isHighlighted ? "3px solid var(--accent-cta)" : "none",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}>
                    <div>
                      <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4 }}>
                        {t({ en: "Step", ar: "الخطوة", arEG: "الخطوة" })} {step.order}
                      </div>
                      <strong>{copy(step.title, a)}</strong>
                      <p style={{ marginTop: 6, marginBottom: 6, color: "var(--text-secondary)" }}>
                        {copy(step.description, a)}
                      </p>
                      <p style={{ marginTop: 0, marginBottom: 6, fontSize: 13 }}>
                        <strong>{t({ en: "When:", ar: "متى:", arEG: "إمتى:" })}</strong> {copy(step.when, a)}
                      </p>
                      <p style={{ margin: 0, fontSize: 13 }}>
                        <strong>{t({ en: "Action:", ar: "الإجراء:", arEG: "الخطوة:" })}</strong> {copy(step.action, a)}
                      </p>
                    </div>
                    <button
                      type="button"
                      className={isDone ? "btn-primary" : "btn-secondary"}
                      onClick={() => toggleWorkflow("step", step.id, !isDone)}
                    >
                      {isDone ? (t({ en: "Done", ar: "مكتمل", arEG: "خلاص" })) : t({ en: "Mark", ar: "علّمها", arEG: "علّمها" })}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Evidence: Collapsible Section ── */}
        <div>
          <button
            type="button"
            className="collapsible-trigger"
            aria-expanded={evidenceOpen}
            onClick={() => setEvidenceOpen((prev) => !prev)}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Database size={16} style={{ color: "var(--accent-cta)" }} />
              {t({ en: "Why we trust this", ar: "لماذا نثق بهذا", arEG: "ليه نثق بده" })}
              <span className="badge" style={{ fontSize: 11 }}>{evidenceClaims.length}</span>
            </span>
            <ChevronDown
              size={16}
              style={{
                transition: "transform 0.2s",
                transform: evidenceOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>
          {evidenceOpen ? (
            <div className="collapsible-content">
              <div className="grid gap-3">
                {evidenceClaims.map((claim) => (
                  <div key={claim.id} className="glass-card" style={{ padding: "var(--space-md)", background: "var(--bg-secondary)" }}>
                    <strong>{copy(claim.title, a)}</strong>
                    <p style={{ marginTop: 6, color: "var(--text-secondary)" }}>{copy(claim.summary, a)}</p>
                    <div className="grid gap-2">
                      {claim.metrics.slice(0, 2).map((metric) => (
                        <div key={metric.id}>
                          <div style={{ fontWeight: 600, marginBottom: 6 }}>{copy(metric.label, a)}</div>
                          <div className="grid gap-2">
                            {metric.snapshots.slice(0, 3).map((snapshot) => (
                              <a
                                key={snapshot.id}
                                href={snapshot.source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-card"
                                style={{ padding: "var(--space-sm)", background: "rgba(15,23,42,0.18)", textDecoration: "none", color: "inherit" }}
                              >
                                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                                  <div>
                                    <div style={{ fontWeight: 600 }}>{snapshot.region.toUpperCase()}</div>
                                    <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                                      {formatSnapshotValue(snapshot, metric.unit)}
                                    </div>
                                  </div>
                                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                                    {snapshot.year ?? "n/a"} • {snapshot.source.sourceName}
                                  </div>
                                </div>
                                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6 }}>
                                  {t({ en: "Method:", ar: "المنهج:", arEG: "المنهج:" })} {snapshot.method} • {t({ en: "Confidence:", ar: "الثقة:", arEG: "الثقة:" })} {Math.round(snapshot.confidence * 100)}%
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* ── Segmented Control Tabs ── */}
      <div className="module-tabs-container" style={{ marginBottom: 14 }}>
        {TAB_LABELS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`module-tab${activeTab === tab.id ? " active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {t(tab)}
            <span className="module-tab-count">{payload.counts[tab.id]}</span>
          </button>
        ))}
      </div>

      {/* ── Filter Pills ── */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {([
          { id: "all" as const, en: "All routes", ar: "كل المسارات", arEG: "كل المسارات", dotColor: "var(--text-muted)" },
          { id: "authored" as const, en: "Authored first", ar: "المحتوى المؤلف", arEG: "المحتوى المؤلف", dotColor: "#22c55e" },
          { id: "egypt" as const, en: "Egypt priority", ar: "أولوية مصر", arEG: "أولوية مصر", dotColor: "#f59e0b" },
          { id: "high-intensity" as const, en: "High intensity", ar: "شدة عالية", arEG: "شدة عالية", dotColor: "#ef4444" },
        ] as const).map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={`filter-pill${itemFilter === filter.id ? " active" : ""}`}
            onClick={() => {
              setItemFilter(filter.id);
              setVisibleCount(activeTab === "scenarios" ? 18 : 12);
            }}
          >
            <span className="filter-pill-dot" style={{ background: filter.dotColor }} />
            {t(filter)} {filterCounts[filter.id]}
          </button>
        ))}
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {filteredItems.slice(0, visibleCount).map((item) => {
          const isReviewed = reviewedIds.includes(item.id);
          const reviewKind = getWorkflowKind(activeTab);
          const protocolKind = getReviewKind(activeTab);

          return (
            <div key={item.id} className={`glass-card item-card-intensity item-card-intensity-${item.intensity}`} style={{ padding: "var(--space-lg)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                <strong>{copy(item.title, a)}</strong>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  {item.contentOrigin === "authored" ? (
                    <span className="badge" style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e" }}>
                      {t({ en: "Authored", ar: "مؤلف عملياً", arEG: "مؤلف عملي" })}
                    </span>
                  ) : null}
                  {item.priority ? (
                    <span className="badge" style={{ background: "rgba(245,158,11,0.12)", color: "var(--accent-cta)" }}>
                      {item.priority === "egypt-critical"
                        ? t({ en: "Egypt priority", ar: "أولوية مصر", arEG: "أولوية مصر" })
                        : item.priority === "high-need"
                          ? t({ en: "High need", ar: "احتياج عالٍ", arEG: "احتياج عالي" })
                          : t({ en: "Global priority", ar: "أولوية عالمية", arEG: "أولوية عالمية" })}
                    </span>
                  ) : null}
                  <span className="badge">{item.intensity}</span>
                </div>
              </div>
              <p style={{ color: "var(--text-secondary)", marginBottom: 10 }}>
                {copy(item.summary, a)}
              </p>
              {item.goal ? (
                <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 10 }}>
                  <strong>{t({ en: "Goal:", ar: "الهدف:", arEG: "الهدف:" })}</strong> {copy(item.goal, a)}
                </p>
              ) : null}
              <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 10 }}>
                <strong>{t({ en: "Action:", ar: "الإجراء:", arEG: "الخطوة:" })}</strong> {copy(item.action, a)}
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                {item.tags.map((tag) => (
                  <span key={tag} className="badge">{tag}</span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setProtocolTarget({ id: item.id, title: item.title, kind: protocolKind })}
                >
                  {t({ en: "Run protocol", ar: "شغّل البروتوكول", arEG: "شغّل البروتوكول" })}
                </button>
                <button
                  type="button"
                  className={isReviewed ? "btn-primary" : "btn-secondary"}
                  onClick={() => toggleWorkflow(reviewKind, item.id, !isReviewed)}
                >
                  {isReviewed ? (t({ en: "Reviewed", ar: "تمت المراجعة", arEG: "اتراجعت" })) : t({ en: "Mark reviewed", ar: "علّمها", arEG: "علّمها" })}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 ? (
        <div className="glass-card" style={{ padding: "var(--space-lg)", marginTop: 16 }}>
          <strong>{t({ en: "No items match this filter", ar: "لا توجد عناصر مطابقة لهذا الفلتر", arEG: "مفيش حاجات مطابقة للفلتر ده" })}</strong>
          <p style={{ color: "var(--text-secondary)", marginBottom: 0 }}>
            {t({ en: "Switch between all routes, authored content, Egypt priority, or high intensity to reach a different operational set.", ar: "بدّل بين كل المسارات أو المحتوى المؤلف أو أولوية مصر أو الشدة العالية للوصول إلى مجموعة مختلفة.", arEG: "بدّل بين كل المسارات أو المحتوى المؤلف أو أولوية مصر أو الشدة العالية للوصول إلى مجموعة مختلفة." })}
          </p>
        </div>
      ) : null}

      {visibleCount < filteredItems.length ? (
        <div style={{ marginTop: 16 }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setVisibleCount((current) => current + (activeTab === "scenarios" ? 18 : 12))}
          >
            {t({ en: "Load more", ar: "تحميل المزيد", arEG: "حمّل أكتر" })}
          </button>
        </div>
      ) : null}

      {protocolTarget ? (
        <ProtocolWorkbench
          module={module}
          kind={protocolTarget.kind}
          itemId={protocolTarget.id}
          itemTitle={protocolTarget.title}
          onClose={() => setProtocolTarget(null)}
        />
      ) : null}

      <ModuleGuidePopup
        module={module}
        options={payload.guide}
        isOpen={guideOpen}
        onClose={closeGuideTemporarily}
        onApply={applyGuide}
      />
    </section>
  );
}
