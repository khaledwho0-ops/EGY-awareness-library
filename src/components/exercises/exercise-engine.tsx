"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useRTL } from "@/components/shared/rtl-provider";
import {
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Brain,
  BookOpen,
  ArrowRight,
  RefreshCw,
  Shield,
} from "lucide-react";
import type { Exercise } from "@/types";
import { getItemTranslation } from "@/data/exercises/translations";
import { UI, uiStr } from "@/data/i18n/ui-strings";
import { getKeyHunterEntry } from "@/data/keyhunter";
import { KeyHunterCard } from "@/components/shared/keyhunter-drawer";
import { SciencePanel } from "@/components/exercises/science-panel";
import { getScienceData } from "@/data/exercises/science-registry";
// ── Enhancement 1: Cognitive Friction (§17) ──
import { CognitiveFrictionOverlay } from "@/components/exercises/cognitive-friction-overlay";
// ── Enhancement 2: Theory Engine (§8) ──
import { getTheoriesForExercise } from "@/data/theory/theory-connections";
import { getCOMBForDay } from "@/data/theory/comb-mapping";
import { TheoryCard } from "@/components/shared/theory-card";
import { COMBVisualizer } from "@/components/shared/comb-visualizer";
// ── Enhancement 4: Intervention Modes (§18) ──
import { getModesForDay } from "@/data/interventions/intervention-schedule";
import { SourceOfDay } from "@/components/interventions/source-of-day";
import { EvidenceLadder } from "@/components/interventions/evidence-ladder";
import { MythAutopsy } from "@/components/interventions/myth-autopsy";
import { BiasReflection } from "@/components/interventions/behavior-modes";
import { MicroScenario } from "@/components/interventions/engagement-modes";
import { ExpertCapsule, SourceCompare } from "@/components/interventions/advanced-modes";
// ── Enhancement 5: Cross-MVP Router (§25.4) ──
import { detectHandoff } from "@/lib/routing/cross-mvp-router";
import { HandoffCard } from "@/components/shared/handoff-card";
// ── Enhancement 6: Evidence Provenance (§23.1) ──
import { ProvenanceBox } from "@/components/shared/provenance-box";
import { getProvenance } from "@/data/provenance/content-provenance";
// ── Enhancement 7: Dwell Time Tracker (Q5/Q14) ──
import { startDwellSession, recordDwellEvent, endDwellSession, calculateAFS } from "@/lib/tracking/dwell-time-tracker";
// ── Enhancement 8: Decision Tree (Q48) ──
import { DecisionTreeAccordion } from "@/components/interventions/decision-tree";
// ── Enhancement 9: Peer Pair Review (Q50) ──
import { PeerPairReview } from "@/components/interventions/peer-pair-review";
// ── Enhancement 10: Expert Voice Capsule (Q47) ──
import { ExpertVoiceCapsule } from "@/components/interventions/expert-voice-capsule";
// ── Enhancement 11: COM-B Time Friction (Q90) ──
import { TimeFrictionGate } from "@/components/interventions/time-friction-gate";
// ── Enhancement 12: Drip UI (Q92) ──
import { markDayCompleted } from "@/lib/progression/drip-ui";
import { recordCorrectionLedgerEntry } from "@/lib/progress/progress-service";
// ── Enhancement 13: Emotional Trigger Highlighting (Q85/Q86) ──
import { EmotionalHighlight } from "@/lib/ai/emotional-trigger-highlighter";
// ── Enhancement 14: Breadcrumbs (Q64-66) ──
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
// ── Enhancement 15: Gamification XP Engine (Chunk 5) ──
import { awardXP, getPlayerProfile, updateMVPProgress, getMVPProgress } from "@/lib/gamification/xp-engine";
import { celebrateProgress } from "@/lib/gamification/celebrations";
// ── Enhancement 16: NLP Sentiment Analysis (Chunk 3) ──
// NLP sentiment loaded lazily (wink-nlp is Node.js-only; dynamic import prevents browser crash)
type SentimentResult = { label: "positive" | "negative" | "neutral"; compound: number; positive: number; negative: number; neutral: number; manipulationScore: number; emotionalTriggers: string[]; persuasionPatterns: string[]; topContributors: string[]; entities: string[]; tokenCount: number; readabilityGrade: number; crisisDetected: boolean; crisisConfidence: number; };
type SentimentBadge = { label: string; color: string; bg: string; icon: string };
const NEUTRAL_SENTIMENT: SentimentResult = { label: "neutral", compound: 0, positive: 0, negative: 0, neutral: 1, manipulationScore: 0, emotionalTriggers: [], persuasionPatterns: [], topContributors: [], entities: [], tokenCount: 0, readabilityGrade: 0, crisisDetected: false, crisisConfidence: 0 };
const NEUTRAL_BADGE: SentimentBadge = { label: "Low emotional load", color: "var(--color-success)", bg: "rgba(16,185,129,0.12)", icon: "=" };
import { GamificationStatus } from "@/components/exercises/gamification-status";
import { VerificationConsole } from "@/components/exercises/verification-console";
import { ExerciseSupportRail } from "@/components/exercises/exercise-support-rail";
import { DeeprealForensicsConsole } from "@/components/exercises/deepreal-forensics-console";
import { ArabicAnalysisCard } from "@/components/exercises/arabic-analysis-card";
import { ExerciseOnboardingTour } from "@/components/exercises/exercise-onboarding-tour";
// ── Enhancement 17: Implement in Real Life (IRL) Button ──
import { ImplementIRLButton } from "@/components/shared/implement-irl-button";
// ── Enhancement 18: Day Navigator (all 14 days unlocked + final score) ──
import { ExerciseDayNav } from "@/components/exercises/exercise-day-nav";
import Link from "next/link";

interface ExerciseEngineProps {
  exercise: Exercise;
  onComplete?: (result: ExerciseResult) => void;
}

export interface ExerciseResult {
  exerciseId: string;
  score: number;
  maxScore: number;
  timeSpentSeconds: number;
  confidencePre?: number;
  confidencePost?: number;
  answers: Record<string, unknown>;
}

/**
 * Exercise Engine — Framework §13.2 (EXACT 13-field template)
 *
 * Renders any exercise from the 42-item library:
 * 1. Title + metadata strip (MVP, day, difficulty, Bloom's level)
 * 2. Learning objective
 * 3. Scenario text
 * 4. Interactive task (ranking, matching, MC, T/F, scenario, etc.)
 * 5. Feedback (correct/incorrect)
 * 6. "What Not To Do" box
 * 7. Evidence citation
 * 8. Safety note (if present)
 * 9. Confidence tracking (pre/post)
 * 10. 8-Gate Check (if required)
 */
export function ExerciseEngine({ exercise, onComplete }: ExerciseEngineProps) {
  // ── Arabic/RTL Support — §23.1 ──
  const { language, isRTL } = useRTL();
  const isAr = language === "ar";

  // Helper: pick Arabic text if available and language is Arabic, else English
  const t = useCallback(
    (en: string, ar?: string) => (isAr && ar ? ar : en),
    [isAr]
  );

  // Helper: get item text using inline textAr → registry → English fallback chain
  const itemText = useCallback(
    (item: { id: string; text: string; textAr?: string }) => {
      if (!isAr) return item.text;
      if (item.textAr) return item.textAr;
      const reg = getItemTranslation(item.id);
      return reg?.textAr ?? item.text;
    },
    [isAr]
  );

  // Helper: get explanation using inline explanationAr → registry → English fallback chain
  const itemExplanation = useCallback(
    (item: { id: string; explanation?: string; explanationAr?: string }) => {
      if (!isAr) return item.explanation ?? "";
      if (item.explanationAr) return item.explanationAr;
      const reg = getItemTranslation(item.id);
      return reg?.explanationAr ?? item.explanation ?? "";
    },
    [isAr]
  );

  const [phase, setPhase] = useState<"intro" | "confidence-pre" | "task" | "eight-gate" | "feedback" | "confidence-post" | "complete">("intro");
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [gateChecks, setGateChecks] = useState<boolean[]>(new Array(5).fill(false));
  const [confidencePre, setConfidencePre] = useState(50);
  const [confidencePost, setConfidencePost] = useState(50);
  const [startTime] = useState(() => Date.now());
  const [showResults, setShowResults] = useState(false);
  const [frictionCompleted, setFrictionCompleted] = useState(false);
  const [showBiasReflection, setShowBiasReflection] = useState(false);
  const [handoffDismissed, setHandoffDismissed] = useState(false);
  const [dwellAFS, setDwellAFS] = useState<number | null>(null);
  const [gamificationRefreshToken, setGamificationRefreshToken] = useState(0);

  // ── Science Panel Data — §8.1/8.2/8.3 ──
  const scienceData = useMemo(() => getScienceData(exercise.id), [exercise.id]);

  // ── Enhancement 2: Theory connections for this exercise ──
  const theories = useMemo(
    () => getTheoriesForExercise(exercise.mvp as "deepreal" | "mental-health" | "religion-hub", exercise.day),
    [exercise.mvp, exercise.day]
  );
  const combEntries = useMemo(
    () => getCOMBForDay(exercise.mvp as "deepreal" | "mental-health" | "religion-hub", exercise.day),
    [exercise.mvp, exercise.day]
  );

  // ── Enhancement 4: Active intervention modes for this day ──
  const activeModes = useMemo(
    () => getModesForDay(exercise.day, exercise.mvp as "deepreal" | "mental-health" | "religion-hub"),
    [exercise.day, exercise.mvp]
  );
  const hasMode = (id: number) => activeModes.some((m) => m.id === id);

  // ── Enhancement 5: Cross-MVP handoff detection ──
  const handoffs = useMemo(
    () => detectHandoff(
      exercise.mvp as "deepreal" | "mental-health" | "religion-hub",
      exercise.content.scenario + " " + exercise.title,
    ),
    [exercise.mvp, exercise.content.scenario, exercise.title]
  );

  // ── Enhancement 6: Provenance data for this exercise ──
  const provenance = useMemo(
    () => getProvenance(exercise.mvp, exercise.day),
    [exercise.mvp, exercise.day]
  );

  const items = exercise.content.task.items;

  // Real score calculation
  const calculatedScore = useMemo(() => {
    let s = 0;
    items.forEach((item) => {
      const isSelected = selectedItems.has(item.id);
      if (item.isCorrect !== undefined && isSelected === item.isCorrect) s++;
      else if (item.isCorrect === undefined && isSelected) s++;
    });
    return s;
  }, [items, selectedItems]);

  const hasSelectedIncorrect = useMemo(() => {
    for (const itemId of Array.from(selectedItems)) {
      const item = items.find((i) => i.id === itemId);
      if (item && item.isCorrect === false) return true;
    }
    return false;
  }, [items, selectedItems]);

  const isSuccess = calculatedScore > (items.length / 2) && !hasSelectedIncorrect;

  const mvpAccent: Record<string, string> = {
    deepreal: "var(--accent-deepreal)",
    "mental-health": "var(--accent-mentalhealth)",
    "religion-hub": "var(--accent-religionhub)",
  };

  const accent = mvpAccent[exercise.mvp] || "var(--accent-cta)";

  const bloomLabels: Record<string, string> = Object.fromEntries(
    Object.entries(UI.bloomLevel).map(([k, v]) => [k, isAr ? v.ar : v.en])
  );

  const handleItemToggle = useCallback((itemId: string) => {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
  }, []);

  const handleSubmit = () => {
    if (exercise.requiresEightGate && !gateChecks.every(Boolean)) {
      setPhase("eight-gate");
      return;
    }
    // Record dwell event on submit
    recordDwellEvent('accept_click');
    setDwellAFS(calculateAFS());
    const session = endDwellSession();
    if (session) {
      console.log(`[AFS] Score: ${calculateAFS()}, Dwell: ${session.totalDwellMs}ms, Sources: ${session.sourceOpens}`);
    }
    setShowResults(true);
    setPhase("feedback");
  };

  const handleComplete = () => {
    if (!isSuccess) {
      recordCorrectionLedgerEntry({
        exerciseId: exercise.id,
        claim: exercise.title,
        correction: exercise.content.feedback.correct,
        date: new Date().toISOString(),
      });
    }

    // ── Enhancement 15: Award XP on exercise completion ──
    const wasCompletedAlready = getPlayerProfile().completedExercises.includes(exercise.id);
    const xpResult = awardXP(
      "exercise_complete",
      exercise.id,
      `Completed: ${exercise.title}`,
      `exercise_complete:${exercise.id}`
    );
    if (isSuccess) {
      awardXP(
        "gate_verified",
        exercise.id,
        "Correct answer verified",
        `gate_verified:${exercise.id}`
      );
    }
    console.log(`[XP] +${100} XP → Total: ${xpResult.profile.totalXP} | Level: ${xpResult.profile.levelName}`);
    updateMVPProgress(exercise.mvp);
    const updatedProfile = getPlayerProfile();
    const currentTrackProgress = getMVPProgress(updatedProfile, exercise.mvp);
    const trackCompleted = !wasCompletedAlready && currentTrackProgress >= 14;
    if (trackCompleted) {
      awardXP(
        "mvp_complete",
        exercise.id,
        `Completed all ${exercise.mvp} exercises`,
        `mvp_complete:${exercise.mvp}`
      );
    }
    setGamificationRefreshToken((current) => current + 1);
    void celebrateProgress({
      badgeCount: xpResult.newBadges.length,
      leveledUp: xpResult.leveledUp,
      trackCompleted,
    });
    if (xpResult.newBadges.length > 0) {
      console.log(`[BADGE] Unlocked: ${xpResult.newBadges.map(b => b.name).join(", ")}`);
    }

    const result: ExerciseResult = {
      exerciseId: exercise.id,
      score: calculatedScore,
      maxScore: items.length,
      timeSpentSeconds: Math.round((Date.now() - startTime) / 1000),
      confidencePre: exercise.trackConfidence ? confidencePre : undefined,
      confidencePost: exercise.trackConfidence ? confidencePost : undefined,
      answers: Object.fromEntries(
        Array.from(selectedItems).map((id) => [id, true])
      ),
    };
    onComplete?.(result);
    markDayCompleted(exercise.day);
    // Save scores to localStorage for the day navigator final score panel
    try {
      localStorage.setItem(`eal-exercise-progress:${exercise.mvp}:${exercise.day}`, JSON.stringify({
        score: calculatedScore,
        maxScore: items.length,
        confidencePre: exercise.trackConfidence ? confidencePre : null,
        confidencePost: exercise.trackConfidence ? confidencePost : null,
        completedAt: new Date().toISOString(),
      }));
    } catch { /* silent */ }
    setPhase("complete");
  };

  // ── Enhancement 16: Sentiment — fetched from server API (wink-nlp is Node.js-only) ──
  const [scenarioSentiment, setScenarioSentiment] = useState<SentimentResult>(NEUTRAL_SENTIMENT);
  const [sentimentBadge, setSentimentBadge] = useState<SentimentBadge>(NEUTRAL_BADGE);
  useEffect(() => {
    let cancelled = false;
    fetch("/api/nlp/sentiment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: exercise.content.scenario }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.sentiment) setScenarioSentiment(data.sentiment as SentimentResult);
        if (data.badge) setSentimentBadge(data.badge as SentimentBadge);
      })
      .catch(() => { /* keep neutral */ });
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise.content.scenario]);

  const handleVerificationReward = useCallback((activityKey: string) => {
    awardXP(
      "source_verified",
      exercise.id,
      `Verification activity: ${activityKey}`,
      `source_verified:${exercise.id}:${activityKey}`
    );
    setGamificationRefreshToken((current) => current + 1);
  }, [exercise.id]);

  return (
    <>
    {/* Day Navigator — all 14 days accessible */}
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <ExerciseDayNav
        mvp={exercise.mvp}
        currentDay={exercise.day}
        accent={accent}
      />
    </div>
    <div
      className="glass-card"
      style={{
        maxWidth: 800,
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <ExerciseOnboardingTour
        accentColor={accent}
        includeForensicsStep={exercise.mvp === "deepreal"}
        includeSupportStep={exercise.mvp !== "deepreal"}
        mvp={exercise.mvp}
        visible={phase === "intro"}
      />
      {/* ── Header Strip ── */}
      <div
        style={{
          padding: "12px 16px",
          background: `${accent}15`,
          borderBottom: `2px solid ${accent}`,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span className="badge" style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}40` }}>
          {isAr ? `اليوم ${exercise.day}` : `Day ${exercise.day}`}
        </span>
        <span className="badge" style={{ background: "var(--bg-secondary)", color: "var(--text-muted)", border: "1px solid var(--border-primary)" }}>
          <Clock size={10} style={{ marginRight: 3 }} /> {exercise.duration} {isAr ? "دقيقة" : "min"}
        </span>
        <span className="badge" style={{ background: "var(--bg-secondary)", color: "var(--text-muted)", border: "1px solid var(--border-primary)" }}>
          <Brain size={10} style={{ marginRight: 3 }} /> {bloomLabels[exercise.bloomLevel]}
        </span>
        <span className="badge" style={{ background: "var(--bg-secondary)", color: "var(--text-muted)", border: "1px solid var(--border-primary)" }}>
          {UI.difficulty[exercise.difficulty] ? uiStr(UI.difficulty[exercise.difficulty], isAr) : exercise.difficulty}
        </span>
        {/* COM-B Target Badge (Chunk 9) */}
        {(() => {
          const comBTarget = (exercise as Record<string, unknown>).com_b_target;
          if (!comBTarget) return null;
          const segment = String(comBTarget).split("/")[1] || String(comBTarget);
          return (
            <span className="badge" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)", fontSize: "10px" }}>
              ⚙ {segment}
            </span>
          );
        })()}
        {/* Enhancement 16: NLP Sentiment/Manipulation Badge */}
        <span className="badge" style={{ background: sentimentBadge.bg, color: sentimentBadge.color, border: `1px solid ${sentimentBadge.color}30`, marginLeft: "auto" }}>
          {sentimentBadge.icon} {sentimentBadge.label} ({scenarioSentiment.compound})
        </span>
        <span className="badge" style={{ background: "var(--bg-secondary)", color: "var(--text-muted)", border: "1px solid var(--border-primary)" }}>
          {uiStr(UI.readingGrade, isAr)} {scenarioSentiment.readabilityGrade}
        </span>
      </div>

      {/* ── Main Content ── */}
      <div style={{ padding: "16px" }}>
        {/* Q64-66: Breadcrumbs with schema.org */}
        <Breadcrumbs items={[
          { label: uiStr(UI.home, isAr), href: "/" },
          { label: UI.mvpLabel[exercise.mvp] ? uiStr(UI.mvpLabel[exercise.mvp], isAr) : exercise.mvp, href: `/${exercise.mvp}` },
          { label: isAr ? `اليوم ${exercise.day}: ${exercise.titleAr || exercise.title}` : `Day ${exercise.day}: ${exercise.title}` },
        ]} />
        {/* Title */}
        <h2 style={{ fontSize: "var(--font-h3)", marginBottom: 8, direction: isRTL ? "rtl" : "ltr", fontFamily: isRTL ? "'Noto Kufi Arabic', 'Satoshi', sans-serif" : "'Clash Display', sans-serif" }}>
          {t(exercise.title, exercise.titleAr)}
        </h2>

        {/* Learning Objective — §13.2 */}
        <div
          style={{
            padding: "12px 16px",
            borderRadius: "var(--radius-md)",
            background: "var(--bg-secondary)",
            marginBottom: 20,
            borderLeft: `3px solid ${accent}`,
          }}
        >
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0, direction: isRTL ? "rtl" : "ltr", fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "inherit" }}>
            <strong style={{ color: "var(--text-primary)" }}>{isAr ? "هدف التعلم:" : "Learning Objective:"}</strong> {t(exercise.learningObjective, exercise.learningObjectiveAr)}
          </p>
        </div>
        <div id="exercise-gamification">
          <GamificationStatus
            accentColor={accent}
            currentMVP={exercise.mvp}
            refreshToken={gamificationRefreshToken}
          />
        </div>
        <div id="exercise-verification">
          <VerificationConsole
            accentColor={accent}
            exercise={exercise}
            onVerificationReward={handleVerificationReward}
          />
        </div>
        <div id="exercise-support">
          <ExerciseSupportRail
            accentColor={accent}
            exercise={exercise}
            sentiment={scenarioSentiment}
          />
        </div>
        {exercise.mvp === "deepreal" && (
          <div id="exercise-forensics">
            <DeeprealForensicsConsole accentColor={accent} />
          </div>
        )}
        {exercise.content.scenarioAr && (
          <ArabicAnalysisCard
            accentColor={accent}
            text={exercise.content.scenarioAr}
          />
        )}

        {/* ═══ SCIENCE PANEL — §8.1/8.2/8.3: Applied Positive + Negative Science ═══ */}
        {scienceData && (
          <SciencePanel
            science={scienceData}
            accentColor={accent}
            mvp={exercise.mvp}
            mode="theory-only" /* Show theory up front, apply consequences later */
          />
        )}

        {/* Safety Note — §6.3 */}
        {exercise.safetyNote && (
          <div
            className="disclaimer-bar mb-4"
            style={{ display: "flex", alignItems: "flex-start", gap: 8 }}
          >
            <AlertTriangle size={14} style={{ color: "var(--color-warning)", flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: "12px", color: "var(--text-muted)", direction: isRTL ? "rtl" : "ltr", fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "inherit" }}>{isAr && exercise.safetyNoteAr ? exercise.safetyNoteAr : exercise.safetyNote}</span>
          </div>
        )}

        {/* ═══ INTRO PHASE ═══ */}
        {phase === "intro" && (
          <div className="animate-fade-in-up">
            {/* §18 Mode 1: Source-of-the-Day */}
            {hasMode(1) && <SourceOfDay day={exercise.day} />}

            {/* §18 Mode 9: Expert Capsule (days 10+) */}
            {hasMode(9) && <ExpertCapsule mvp={exercise.mvp as "deepreal" | "mental-health" | "religion-hub"} />}

            <div id="exercise-scenario" style={{ marginBottom: 24 }}>
              <div
                style={{
                  padding: "20px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-secondary)",
                  lineHeight: 1.8,
                  fontSize: "15px",
                  color: "var(--text-secondary)",
                  whiteSpace: "pre-wrap",
                }}
              >
                <EmotionalHighlight text={t(exercise.content.scenario, exercise.content.scenarioAr)} />
              </div>
            </div>

            {/* §8: Theory connections — "Why This Exercise Works" */}
            {theories.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <h5 style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: 10, direction: isRTL ? "rtl" : "ltr" }}>
                  {uiStr(UI.scientificFoundation, isAr)}
                </h5>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {theories.slice(0, 2).map((theory) => (
                    <TheoryCard key={theory.id} theory={theory} />
                  ))}
                </div>
              </div>
            )}

            {/* §15.1: COM-B barriers targeted today */}
            {combEntries.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <COMBVisualizer
                  entries={combEntries}
                  mvp={exercise.mvp as "deepreal" | "mental-health" | "religion-hub"}
                  currentDay={exercise.day}
                />
              </div>
            )}

            {/* §18 Mode 9: Expert Voice Capsule (Q47 — days 10+, MH/RH) */}
            {hasMode(9) && (exercise.mvp === 'mental-health' || exercise.mvp === 'religion-hub') && exercise.day >= 10 && (
              <div style={{ marginBottom: 16 }}>
                <ExpertVoiceCapsule
                  expertName={exercise.mvp === 'mental-health' ? 'Dr. Ahmad Hassan' : 'Prof. Mohamed Ali'}
                  expertRole={exercise.mvp === 'mental-health' ? 'Clinical Psychologist' : 'Psychology of Religion'}
                  transcript={`Expert insight on Day ${exercise.day}: ${exercise.learningObjective}`}
                  duration="0:45"
                  accentColor={accent}
                />
              </div>
            )}

            <button
              onClick={() => {
                startDwellSession(exercise.id);
                setPhase(exercise.trackConfidence ? "confidence-pre" : "task");
              }}
              className="btn-primary"
              style={{ width: "100%", direction: isRTL ? "rtl" : "ltr" }}
            >
              {isAr ? "ابدأ التمرين" : "Begin Exercise"} <ArrowRight size={16} style={{ transform: isRTL ? "rotate(180deg)" : "none" }} />
            </button>
          </div>
        )}

        {/* ═══ CONFIDENCE PRE — Q3: Range Slider for TCE §17.7 ═══ */}
        {phase === "confidence-pre" && (
          <div>
            <h4 style={{ marginBottom: 12, direction: isRTL ? "rtl" : "ltr" }}>{isAr ? "🎯 قبل أن نبدأ، قيّم ثقتك:" : "🎯 Before we begin, rate your confidence:"}</h4>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: 16, direction: isRTL ? "rtl" : "ltr" }}>
              {isAr ? "ما مدى ثقتك في قدرتك على التعامل مع موضوع هذا التمرين؟" : "How confident are you in your ability to handle the topic of this exercise?"}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
              <span style={{ fontSize: "12px", color: "var(--color-danger)", fontWeight: 600 }}>0%</span>
              <input
                type="range"
                min={0}
                max={100}
                value={confidencePre}
                onChange={(e) => setConfidencePre(Number(e.target.value))}
                className="confidence-slider"
                style={{ flex: 1 }}
                aria-label="Pre-exercise confidence level"
              />
              <span style={{ fontSize: "12px", color: "var(--color-success)", fontWeight: 600 }}>100%</span>
            </div>
            <div style={{
              textAlign: "center", marginBottom: 16,
              fontSize: "32px", fontWeight: 800,
              fontFamily: "'Clash Display', sans-serif",
              color: confidencePre < 30 ? "var(--color-danger)" : confidencePre < 70 ? "var(--color-warning)" : "var(--color-success)",
            }}>
              {confidencePre}%
            </div>
            <button onClick={() => setPhase("task")} className="btn-primary" style={{ width: "100%", direction: isRTL ? "rtl" : "ltr" }}>
              {isAr ? "تثبيت الثقة والبدء" : "Lock Confidence & Begin"} <ArrowRight size={16} style={{ transform: isRTL ? "rotate(180deg)" : "none" }} />
            </button>
          </div>
        )}

        {/* ═══ TASK PHASE ═══ */}
        {phase === "task" && (
          <div className="animate-fade-in-up">
            <h4 style={{ marginBottom: 8, direction: isRTL ? "rtl" : "ltr", fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "inherit" }}>
              {t(exercise.content.task.instructions, exercise.content.task.instructionsAr)}
            </h4>
            <p style={{ fontSize: "12px", color: "var(--text-caption)", marginBottom: 16, direction: isRTL ? "rtl" : "ltr" }}>
              {uiStr(UI.taskType, isAr)} {exercise.content.task.type.replace(/_/g, " ")}
            </p>

            <div className="flex flex-col gap-3 mb-6">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemToggle(item.id)}
                  style={{
                    padding: "16px 18px",
                    borderRadius: "var(--radius-md)",
                    background: selectedItems.has(item.id) ? `${accent}15` : "var(--bg-secondary)",
                    border: `2px solid ${selectedItems.has(item.id) ? accent : "var(--border-primary)"}`,
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: "15px",
                    color: "var(--text-primary)",
                    lineHeight: 1.5,
                    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    minHeight: 52,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      border: `2px solid ${selectedItems.has(item.id) ? accent : "var(--border-secondary)"}`,
                      background: selectedItems.has(item.id) ? accent : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 2,
                      transition: "all 0.15s ease",
                    }}
                  >
                    {selectedItems.has(item.id) && (
                      <CheckCircle2 size={12} style={{ color: "white" }} />
                    )}
                  </div>
                  <span style={{ direction: isRTL ? "rtl" : "ltr", fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "inherit" }}>
                    {itemText(item as { id: string; text: string; textAr?: string })}
                  </span>
                </button>
              ))}
            </div>

            {/* COM-B Time Friction (Q90) — 5s pause before submitting */}
            {selectedItems.size > 0 && (
              <div style={{ marginBottom: 12 }}>
                <TimeFrictionGate
                  delaySec={5}
                  lockMessage={uiStr(UI.frictionLock, isAr)}
                  unlockMessage={uiStr(UI.frictionUnlock, isAr)}
                  contentId={exercise.id}
                  accentColor={accent}
                  onAccept={handleSubmit}
                />
              </div>
            )}
            {selectedItems.size === 0 && (
              <button
                className="btn-primary"
                style={{ width: "100%", opacity: 0.5 }}
                disabled
              >
                {isAr ? "اختر عنصراً واحداً على الأقل" : "Select at least one item"} <ChevronRight size={16} />
              </button>
            )}
          </div>
        )}

        {/* ═══ 8-GATE CHECK — §17.4 ═══ */}
        {phase === "eight-gate" && (
          <div>
            <h4 style={{ marginBottom: 12, direction: isRTL ? "rtl" : "ltr" }}>
              <Shield size={18} style={{ display: "inline", marginRight: 6, color: accent }} />
              {isAr ? "حلقة التحقق النشطة (§17.5)" : "Active Verification Loop (§17.5)"}
            </h4>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: 20, direction: isRTL ? "rtl" : "ltr" }}>
              {isAr ? "تتطلب منك علم الاحتكاك المعرفي التوقف والتعبير عن تفكيرك. أكمل التحقق من 5 صناديق للمتابعة." : "The science of cognitive friction requires you to pause and articulate your reasoning. Complete the 5-Box Verification to proceed."}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { en: "Claim Box", ar: "صندوق الادعاء", ph: isAr ? "اذكر الادعاء في جملة واحدة..." : "State the claim in one sentence...", type: "input" },
                { en: "Evidence Box", ar: "صندوق الأدلة", ph: isAr ? "الصق الأدلة أو لخصها..." : "Paste or summarize the evidence...", type: "textarea" },
                { en: "Context Box", ar: "صندوق السياق", ph: isAr ? "متى نُشر هذا؟ لمن؟" : "When was this published? For whom?", type: "input" },
                { en: "Emotion Box", ar: "صندوق المشاعر", ph: isAr ? "كيف يجعلك هذا المحتوى تشعر الآن؟" : "How does this content make you feel right now?", type: "input" },
                { en: "Consequence Box", ar: "صندوق العواقب", ph: isAr ? "ما الضرر إذا كان هذا خاطئاً؟" : "What is the harm if this is wrong?", type: "input" },
              ].map((box, i) => (
                <div key={i} style={{ background: "var(--bg-secondary)", padding: 16, borderRadius: "var(--radius-md)", border: "1px solid var(--border-primary)" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: 8, direction: isRTL ? "rtl" : "ltr" }}>
                    {i + 1}. {isAr ? box.ar : box.en}
                  </label>
                  {box.type === "textarea" ? (
                    <textarea placeholder={box.ph} rows={2} onChange={(e) => {
                      const next = [...gateChecks]; next[i] = !!e.target.value.trim(); setGateChecks(next);
                    }} style={{ width: "100%", padding: 10, borderRadius: "var(--radius-sm)", border: "1px solid var(--border-secondary)", background: "var(--bg-primary)", direction: isRTL ? "rtl" : "ltr" }} />
                  ) : (
                    <input type="text" placeholder={box.ph} onChange={(e) => {
                      const next = [...gateChecks]; next[i] = !!e.target.value.trim(); setGateChecks(next);
                    }} style={{ width: "100%", padding: 10, borderRadius: "var(--radius-sm)", border: "1px solid var(--border-secondary)", background: "var(--bg-primary)", direction: isRTL ? "rtl" : "ltr" }} />
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => { setShowResults(true); setPhase("feedback"); }}
              className="btn-primary mt-6"
              style={{ width: "100%", direction: isRTL ? "rtl" : "ltr" }}
              disabled={gateChecks.filter(Boolean).length < 5}
            >
              {isAr ? "تحقق وكشف النتائج" : "Verify & Reveal Results"} <CheckCircle2 size={16} />
            </button>
          </div>
        )}

        {/* ═══ FEEDBACK PHASE ═══ */}
        {phase === "feedback" && showResults && (
          <div className="animate-fade-in-up">
            {/* Per-item feedback */}
            <div className="flex flex-col gap-3 mb-6">
              {items.map((item) => {
                const wasSelected = selectedItems.has(item.id);
                return (
                  <div
                    key={item.id}
                    style={{
                      padding: "14px 18px",
                      borderRadius: "var(--radius-md)",
                      border: `1px solid ${wasSelected ? "rgba(16,185,129,0.3)" : "var(--border-primary)"}`,
                      background: wasSelected ? "rgba(16,185,129,0.06)" : "var(--bg-secondary)",
                    }}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      {wasSelected ? (
                        <CheckCircle2 size={16} style={{ color: "var(--color-success)", marginTop: 2 }} />
                      ) : (
                        <XCircle size={16} style={{ color: "var(--text-muted)", marginTop: 2 }} />
                      )}
                      <span style={{ fontSize: "14px", fontWeight: 600, direction: isRTL ? "rtl" : "ltr", fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "inherit" }}>
                        {itemText(item as { id: string; text: string; textAr?: string })}
                      </span>
                    </div>
                    {item.explanation && (
                      <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, paddingLeft: 24, direction: isRTL ? "rtl" : "ltr", fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "inherit" }}>
                        {itemExplanation(item as { id: string; explanation?: string; explanationAr?: string })}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Overall feedback */}
            <div
              style={{
                padding: "16px 20px",
                borderRadius: "var(--radius-md)",
                background: isSuccess ? "rgba(16,185,129,0.08)" : "rgba(239, 68, 68, 0.08)",
                border: `1px solid ${isSuccess ? "rgba(16,185,129,0.2)" : "rgba(239, 68, 68, 0.2)"}`,
                marginBottom: 16,
              }}
            >
              <p style={{ fontSize: "14px", color: "var(--text-primary)", lineHeight: 1.6, margin: 0, direction: isRTL ? "rtl" : "ltr", fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "inherit" }}>
                {isSuccess
                  ? t(exercise.content.feedback.correct, exercise.content.feedback.correctAr)
                  : t(exercise.content.feedback.incorrect, exercise.content.feedback.incorrectAr)}
              </p>
            </div>

            {/* ═══ APPLIED SCIENCE FEEDBACK ═══ */}
            {scienceData && (
              <div style={{ marginBottom: 20 }}>
                <h5 style={{ fontSize: "13px", fontWeight: 700, color: isSuccess ? "var(--color-success)" : "var(--color-danger)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em", direction: isRTL ? "rtl" : "ltr" }}>
                  {isAr ? (isSuccess ? "تم تطبيق العلم بنجاح" : "تم اكتشاف فخ علمي") : (isSuccess ? "Science Applied Successfully" : "Scientific Trap Detected")}
                </h5>
                <SciencePanel
                  science={scienceData}
                  accentColor={accent}
                  mvp={exercise.mvp}
                  mode={isSuccess ? "positive-only" : "negative-only"}
                />
              </div>
            )}

            {/* What Not To Do — §13.2 */}
            <div
              style={{
                padding: "16px 20px",
                borderRadius: "var(--radius-md)",
                background: "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.15)",
                marginBottom: 16,
              }}
            >
              <h5 style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-danger)", marginBottom: 8, direction: isRTL ? "rtl" : "ltr" }}>
                {isAr ? "⚠️ ما لا يجب فعله" : "⚠️ What NOT To Do"}
              </h5>
              {(isAr && exercise.whatNotToDoAr && exercise.whatNotToDoAr.length > 0
                ? exercise.whatNotToDoAr
                : exercise.whatNotToDo
              ).map((item, i) => (
                <p key={i} style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: 4, direction: isRTL ? "rtl" : "ltr", fontFamily: isRTL && exercise.whatNotToDoAr ? "'Noto Kufi Arabic', sans-serif" : "inherit" }}>
                  • {item}
                </p>
              ))}
            </div>

            {/* ═══ IMPLEMENT IN REAL LIFE — Enhancement 17 ═══ */}
            <div style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <ImplementIRLButton
                irlKey={exercise.mvp === "deepreal" ? "reverse-engineering" : exercise.mvp === "mental-health" ? "lab-distress" : "default"}
                accent={accent}
              />
              <span style={{ fontSize: 11, color: "var(--text-caption)" }}>
                {isAr ? "طبّق ما تعلمته في الحياة الواقعية" : "Apply what you learned in real life"}
              </span>
            </div>

            {/* KeyHunter Card — §7.6 */}
            {exercise.keyhunterId && (() => {
              const khEntry = getKeyHunterEntry(exercise.keyhunterId);
              return khEntry ? (
                <div style={{ marginBottom: 16 }}>
                  <KeyHunterCard entry={khEntry} />
                </div>
              ) : null;
            })()}

            {/* ═══ EVIDENCE PROVENANCE — §23.1 #2 + §19.5 (3-source chain) ═══ */}
            {provenance ? (
              <div style={{ marginBottom: 20 }}>
                <ProvenanceBox
                  exerciseTitle={exercise.title}
                  lastReviewDate={provenance.contentReviewDate}
                  reviewStatus={provenance.reviewStatus}
                  reviewer={exercise.reviewedBy || "Dr. Supervisor"}
                  sources={[
                    { name: provenance.primarySource.name, role: "primary", type: "peer_reviewed", trustBand: "A" },
                    { name: provenance.comparativeSource.name, role: "comparative", type: "peer_reviewed", trustBand: "A" },
                    { name: provenance.methodologicalSource.name, role: "methodological", type: "peer_reviewed", trustBand: "A" },
                  ]}
                  evidenceTier={provenance.evidenceTier === "quasi_experiment" ? "observational" : provenance.evidenceTier}
                />
              </div>
            ) : (
              <div
                style={{
                  padding: "16px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-primary)",
                  marginBottom: 20,
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "13px", color: "var(--text-primary)" }}>
                  <BookOpen size={14} style={{ color: accent, flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <span style={{ fontWeight: 600, direction: isRTL ? "rtl" : "ltr" }}>{uiStr(UI.anchoringSource, isAr)}</span> {exercise.evidence}
                  </div>
                </div>
              </div>
            )}

            {/* §17.4: Cognitive Friction Overlay — inline 8-Gate during feedback */}
            {exercise.requiresEightGate && !frictionCompleted && (
              <CognitiveFrictionOverlay
                claimText={exercise.content.scenario}
                mvp={exercise.mvp as "deepreal" | "mental-health" | "religion-hub"}
                onComplete={() => setFrictionCompleted(true)}
                onSkip={() => setFrictionCompleted(true)}
              />
            )}

            {/* §18 Mode 5: Evidence Ladder (days 4+) */}
            {hasMode(5) && (
              <div style={{ marginBottom: 16 }}>
                <EvidenceLadder compact contextLabel={`For: ${exercise.title}`} />
              </div>
            )}

            {/* §18 Mode 6: Source Compare (days 4+) */}
            {hasMode(6) && exercise.day % 3 === 1 && (
              <div style={{ marginBottom: 16 }}>
                <SourceCompare mvp={exercise.mvp as "deepreal" | "mental-health" | "religion-hub"} />
              </div>
            )}

            {/* §18 Mode 8: Myth Autopsy (days 7+) */}
            {hasMode(8) && exercise.day % 2 === 1 && (
              <div style={{ marginBottom: 16 }}>
                <MythAutopsy mvp={exercise.mvp as "deepreal" | "mental-health" | "religion-hub"} day={exercise.day} />
              </div>
            )}

            {/* §18 Mode 12: Bias Reflection (days 4+) */}
            {hasMode(12) && !showBiasReflection && (
              <button
                onClick={() => setShowBiasReflection(true)}
                style={{
                  width: "100%", padding: "0.5rem", borderRadius: "8px",
                  border: "1px solid color-mix(in srgb, var(--accent-purple, #8b5cf6) 30%, transparent)",
                  background: "transparent", color: "var(--text-secondary)",
                  cursor: "pointer", fontSize: "0.75rem", marginBottom: 12,
                }}
              >
                {uiStr(UI.biasReflection, isAr)}
              </button>
            )}
            {showBiasReflection && (
              <BiasReflection onComplete={() => setShowBiasReflection(false)} />
            )}

            {/* §18 Mode 15: Micro-Scenario (days 10+) */}
            {hasMode(15) && (
              <MicroScenario mvp={exercise.mvp as "deepreal" | "mental-health" | "religion-hub"} index={exercise.day} />
            )}

            {/* §18 Mode 10: Decision Tree (Q48 — MH/RH only) */}
            {(exercise.mvp === 'mental-health' || exercise.mvp === 'religion-hub') && (
              <div style={{ marginBottom: 16 }}>
                <DecisionTreeAccordion
                  mvp={exercise.mvp as "mental-health" | "religion-hub"}
                />
              </div>
            )}

            {/* §18 Mode 14: Peer Pair Review (Q50 — days 5+) */}
            {exercise.day >= 5 && (
              <div style={{ marginBottom: 16 }}>
                <PeerPairReview
                  userAnswer={Array.from(selectedItems).join(', ') || 'No selection made'}
                  peerAnswer="Peer used lateral reading to verify the claim through 3 independent sources before accepting. Applied the SIFT method: Stop, Investigate, Find better coverage, Trace the claim."
                  claimText={exercise.content.scenario}
                />
              </div>
            )}

            {/* AFS Score Readout (Q5) */}
            {dwellAFS !== null && (
              <div style={{
                padding: '12px 16px', borderRadius: 'var(--radius-md)',
                background: 'rgba(0,102,255,0.06)', border: '1px solid rgba(0,102,255,0.15)',
                marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12, fontSize: 13,
              }}>
                <span style={{ color: 'var(--text-muted)' }}>{uiStr(UI.afsLabel, isAr)}</span>
                <span style={{ fontWeight: 700, fontFamily: "'Clash Display'", color: dwellAFS > 50 ? 'var(--color-success)' : 'var(--color-warning)' }}>
                  {dwellAFS.toFixed(1)}
                </span>
                <span style={{ fontSize: 11, color: 'var(--text-caption)' }}>
                  {dwellAFS > 70 ? uiStr(UI.afsHigh, isAr) : dwellAFS > 40 ? uiStr(UI.afsMod, isAr) : uiStr(UI.afsLow, isAr)}
                </span>
              </div>
            )}

            <button
              onClick={() => {
                if (exercise.trackConfidence) {
                  setPhase("confidence-post");
                  return;
                }

                handleComplete();
              }}
              className="btn-primary"
              style={{ width: "100%", direction: isRTL ? "rtl" : "ltr" }}
            >
              {exercise.trackConfidence
                ? (isAr ? "قيّم ثقتك بعد التمرين" : "Rate Confidence Post-Exercise")
                : (isAr ? "أكمل التمرين" : "Complete Exercise")
              } <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* ═══ CONFIDENCE POST — §18 Mode 3 ═══ */}
        {phase === "confidence-post" && (
          <div>
            <h4 style={{ marginBottom: 12, direction: isRTL ? "rtl" : "ltr" }}>{isAr ? "🎯 قيّم ثقتك الآن مجدداً:" : "🎯 Now rate your confidence again:"}</h4>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: 16, direction: isRTL ? "rtl" : "ltr" }}>
              {isAr ? "بعد إتمام هذا التمرين، ما مدى ثقتك؟" : "After completing this exercise, how confident do you feel?"}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{isAr ? "غير واثق" : "Not confident"}</span>
              <input
                type="range"
                min={0}
                max={100}
                value={confidencePost}
                onChange={(e) => setConfidencePost(Number(e.target.value))}
                style={{ flex: 1, accentColor: accent }}
              />
              <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{isAr ? "واثق جداً" : "Very confident"}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 24 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{isAr ? "قبل" : "Before"}</div>
                <div style={{ fontSize: "24px", fontWeight: 700, fontFamily: "'Clash Display', sans-serif", color: "var(--text-muted)" }}>
                  {confidencePre}%
                </div>
              </div>
              <ArrowRight size={20} style={{ color: "var(--text-caption)" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "12px", color: accent }}>{isAr ? "بعد" : "After"}</div>
                <div style={{ fontSize: "24px", fontWeight: 700, fontFamily: "'Clash Display', sans-serif", color: accent }}>
                  {confidencePost}%
                </div>
              </div>
            </div>
            <button onClick={handleComplete} className="btn-primary" style={{ width: "100%", direction: isRTL ? "rtl" : "ltr" }}>
              {isAr ? "أكمل التمرين" : "Complete Exercise"} <CheckCircle2 size={16} />
            </button>
          </div>
        )}

        {/* ═══ COMPLETE ═══ */}
        {phase === "complete" && (
          <div style={{ padding: "20px 0" }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <CheckCircle2 size={48} style={{ color: "var(--color-success)", marginBottom: 16 }} />
              <h3 style={{ marginBottom: 8 }}>{isAr ? "اكتمل التمرين!" : "Exercise Complete!"}</h3>
              <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: 12, direction: isRTL ? "rtl" : "ltr", fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "inherit" }}>
                {isAr ? `لقد أكملت اليوم ${exercise.day}: ${exercise.titleAr || exercise.title}` : `You've completed Day ${exercise.day}: ${exercise.title}`}
              </p>
            </div>

            {/* Score Summary Card */}
            <div style={{
              padding: 20, borderRadius: 12, marginBottom: 16,
              background: `${accent}08`, border: `1px solid ${accent}20`,
            }}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: 8, marginBottom: 16 }}>
                <span style={{ fontSize: 36, fontWeight: 800, fontFamily: "'Clash Display', sans-serif", color: accent }}>
                  {calculatedScore}
                </span>
                <span style={{ fontSize: 16, color: "var(--text-muted)" }}>/ {items.length}</span>
              </div>
              {/* Before / After Confidence */}
              {exercise.trackConfidence && (
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "center",
                  padding: 12, borderRadius: 8, background: "var(--bg-secondary)",
                }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "inherit" }}>
                      {isAr ? "قبل" : "Before"}
                    </div>
                    <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "'Clash Display', sans-serif", color: "var(--text-muted)" }}>
                      {confidencePre}%
                    </div>
                  </div>
                  <ArrowRight size={18} style={{ color: accent, transform: isRTL ? "rotate(180deg)" : "none" }} />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: accent, fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "inherit" }}>
                      {isAr ? "بعد" : "After"}
                    </div>
                    <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "'Clash Display', sans-serif", color: accent }}>
                      {confidencePost}%
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* §25.4: Cross-MVP Handoff — if relevant connection detected */}
            {handoffs.length > 0 && !handoffDismissed && (
              <HandoffCard
                scenario={handoffs[0]}
                onDismiss={() => setHandoffDismissed(true)}
              />
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
              <button
                onClick={() => {
                  setPhase("intro");
                  setSelectedItems(new Set());
                  setShowResults(false);
                  setGateChecks(new Array(5).fill(false));
                  setFrictionCompleted(false);
                  setShowBiasReflection(false);
                  setHandoffDismissed(false);
                }}
                className="btn-secondary"
                style={{ flex: 1 }}
              >
                <RefreshCw size={14} /> {isAr ? "مراجعة مرة أخرى" : "Review Again"}
              </button>
              {exercise.day < 14 && (
                <Link
                  href={`/${exercise.mvp}/exercise/${exercise.day + 1}`}
                  className="btn-primary no-underline"
                  style={{ flex: 1, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                >
                  {isAr ? `اليوم ${exercise.day + 1}` : `Day ${exercise.day + 1}`}
                  <ArrowRight size={14} style={{ transform: isRTL ? "rotate(180deg)" : "none" }} />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
