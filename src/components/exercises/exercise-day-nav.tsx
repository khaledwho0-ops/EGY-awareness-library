"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { CheckCircle2, Lock, Trophy, ArrowRight, BarChart3 } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";

interface ExerciseDayNavProps {
  /** e.g. "deepreal" | "mental-health" | "religion-hub" */
  mvp: string;
  /** Current active day (1-14) */
  currentDay: number;
  /** Accent CSS color */
  accent: string;
}

interface DayStatus {
  day: number;
  completed: boolean;
  completedAt: string | null;
  score: number | null;
  maxScore: number | null;
  confPre: number | null;
  confPost: number | null;
}

function getDayStatuses(mvp: string): DayStatus[] {
  return Array.from({ length: 14 }, (_, i) => {
    const day = i + 1;
    const key = `day_${day}_completed`;
    const completedAt = typeof window !== "undefined" ? localStorage.getItem(key) : null;

    // Try to get score from progress entries
    let score: number | null = null;
    let maxScore: number | null = null;
    let confPre: number | null = null;
    let confPost: number | null = null;

    try {
      const progressKey = `eal-exercise-progress:${mvp}:${day}`;
      const raw = typeof window !== "undefined" ? localStorage.getItem(progressKey) : null;
      if (raw) {
        const p = JSON.parse(raw);
        score = p.score ?? null;
        maxScore = p.maxScore ?? null;
        confPre = p.confidencePre ?? null;
        confPost = p.confidencePost ?? null;
      }
    } catch { /* silent */ }

    return { day, completed: !!completedAt, completedAt, score, maxScore, confPre, confPost };
  });
}

export function ExerciseDayNav({ mvp, currentDay, accent }: ExerciseDayNavProps) {
  const { isRTL } = useRTL();
  const a = isRTL;
  const [statuses, setStatuses] = useState<DayStatus[]>([]);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    setStatuses(getDayStatuses(mvp));
  }, [mvp]);

  const completedCount = useMemo(() => statuses.filter(s => s.completed).length, [statuses]);
  const avgConfPre = useMemo(() => {
    const vals = statuses.filter(s => s.confPre !== null).map(s => s.confPre!);
    return vals.length > 0 ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
  }, [statuses]);
  const avgConfPost = useMemo(() => {
    const vals = statuses.filter(s => s.confPost !== null).map(s => s.confPost!);
    return vals.length > 0 ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
  }, [statuses]);
  const totalScore = useMemo(() => {
    const scored = statuses.filter(s => s.score !== null);
    return scored.length > 0
      ? { score: scored.reduce((a, s) => a + (s.score || 0), 0), max: scored.reduce((a, s) => a + (s.maxScore || 0), 0), count: scored.length }
      : null;
  }, [statuses]);

  const basePath = `/${mvp}/exercise`;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "'Satoshi', sans-serif";

  return (
    <div style={{ marginBottom: 16 }}>
      {/* Day Pills Nav */}
      <div style={{
        display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap",
        padding: "12px 16px", borderRadius: 12,
        background: "var(--bg-secondary)", border: "1px solid var(--border-primary)",
        marginBottom: 10,
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", fontFamily: ff, marginRight: 4 }}>
          {a ? "الأيام:" : "Days:"}
        </span>
        {Array.from({ length: 14 }, (_, i) => {
          const day = i + 1;
          const s = statuses[i];
          const isCurrent = day === currentDay;
          const isCompleted = s?.completed;

          return (
            <Link
              key={day}
              href={`${basePath}/${day}`}
              style={{
                width: 36, height: 36, borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: isCurrent ? 800 : 600,
                textDecoration: "none",
                background: isCurrent
                  ? accent
                  : isCompleted
                    ? `${accent}20`
                    : "var(--bg-primary)",
                color: isCurrent
                  ? "#fff"
                  : isCompleted
                    ? accent
                    : "var(--text-muted)",
                border: isCurrent
                  ? `2px solid ${accent}`
                  : isCompleted
                    ? `2px solid ${accent}50`
                    : "1px solid var(--border-primary)",
                transition: "all 0.2s ease",
                position: "relative",
                fontFamily: "'Clash Display', sans-serif",
              }}
            >
              {day}
              {isCompleted && !isCurrent && (
                <CheckCircle2
                  size={10}
                  style={{
                    position: "absolute", top: -3, right: -3,
                    color: "#10B981", background: "var(--bg-primary)",
                    borderRadius: "50%",
                  }}
                />
              )}
            </Link>
          );
        })}

        {/* Score Button */}
        <button
          onClick={() => setShowScore(prev => !prev)}
          style={{
            marginLeft: "auto", padding: "6px 12px", borderRadius: 8,
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 12, fontWeight: 700,
            background: completedCount >= 14 ? `linear-gradient(135deg, ${accent}, #F59E0B)` : `${accent}15`,
            color: completedCount >= 14 ? "#fff" : accent,
            border: "none", cursor: "pointer",
            fontFamily: ff,
          }}
        >
          {completedCount >= 14 ? <Trophy size={14} /> : <BarChart3 size={14} />}
          {a ? `${completedCount}/14` : `${completedCount}/14`}
        </button>
      </div>

      {/* Final Score Panel */}
      {showScore && (
        <div style={{
          padding: 20, borderRadius: 14,
          background: "linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))",
          border: `2px solid ${accent}30`,
          marginBottom: 12,
          animation: "fadeInUp 0.3s ease",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Trophy size={20} style={{ color: accent }} />
            <h4 style={{ margin: 0, fontSize: 16, fontFamily: ff }}>
              {a ? "النتيجة النهائية" : "Final Score Summary"}
            </h4>
          </div>

          {/* Progress Bar */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, fontFamily: ff }}>
              <span style={{ color: "var(--text-muted)" }}>{a ? "التقدم" : "Progress"}</span>
              <span style={{ fontWeight: 700, color: accent }}>{completedCount}/14 ({Math.round((completedCount / 14) * 100)}%)</span>
            </div>
            <div style={{ height: 8, borderRadius: 4, background: "var(--bg-primary)", overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 4,
                width: `${(completedCount / 14) * 100}%`,
                background: `linear-gradient(90deg, ${accent}, #F59E0B)`,
                transition: "width 0.6s ease",
              }} />
            </div>
          </div>

          {/* Before / After Comparison */}
          {(avgConfPre !== null || avgConfPost !== null) && (
            <div style={{
              display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 16, alignItems: "center",
              padding: 16, borderRadius: 10, background: `${accent}08`, marginBottom: 16,
            }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4, fontFamily: ff }}>
                  {a ? "الثقة — قبل" : "Confidence — Before"}
                </div>
                <div style={{
                  fontSize: 32, fontWeight: 800, fontFamily: "'Clash Display', sans-serif",
                  color: "var(--text-muted)",
                }}>
                  {avgConfPre ?? "—"}%
                </div>
              </div>
              <ArrowRight size={24} style={{ color: accent, opacity: 0.5, transform: a ? "rotate(180deg)" : "none" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: accent, marginBottom: 4, fontFamily: ff }}>
                  {a ? "الثقة — بعد" : "Confidence — After"}
                </div>
                <div style={{
                  fontSize: 32, fontWeight: 800, fontFamily: "'Clash Display', sans-serif",
                  color: accent,
                }}>
                  {avgConfPost ?? "—"}%
                </div>
              </div>
            </div>
          )}

          {/* Total Score */}
          {totalScore && (
            <div style={{
              display: "flex", justifyContent: "center", alignItems: "baseline", gap: 6,
              padding: 12, borderRadius: 8, background: `${accent}10`, marginBottom: 12,
            }}>
              <span style={{ fontSize: 28, fontWeight: 800, fontFamily: "'Clash Display', sans-serif", color: accent }}>
                {totalScore.score}
              </span>
              <span style={{ fontSize: 14, color: "var(--text-muted)" }}>/ {totalScore.max}</span>
              <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: 8 }}>
                ({a ? `${totalScore.count} تمرين` : `${totalScore.count} exercises`})
              </span>
            </div>
          )}

          {/* Per-day breakdown */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
            {statuses.map(s => (
              <Link
                key={s.day}
                href={`${basePath}/${s.day}`}
                style={{
                  padding: "6px 4px", borderRadius: 6, textAlign: "center",
                  fontSize: 10, textDecoration: "none",
                  background: s.completed ? `${accent}15` : "var(--bg-primary)",
                  border: s.day === currentDay ? `2px solid ${accent}` : "1px solid var(--border-primary)",
                  color: s.completed ? accent : "var(--text-muted)",
                }}
              >
                <div style={{ fontWeight: 700 }}>D{s.day}</div>
                {s.completed && <CheckCircle2 size={10} style={{ color: "#10B981" }} />}
                {s.score !== null && (
                  <div style={{ fontSize: 9, fontWeight: 600 }}>{s.score}/{s.maxScore}</div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
