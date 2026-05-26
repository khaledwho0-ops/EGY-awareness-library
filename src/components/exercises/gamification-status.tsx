"use client";

import { useMemo } from "react";
import { Award, Flame, Shield, Sparkles, Trophy } from "lucide-react";
import type { Exercise } from "@/types";
import { useRTL } from "@/components/shared/rtl-provider";
import {
  getCohortStats,
  getLevelProgress,
  getMVPProgress,
  getPlayerProfile,
  type Badge,
} from "@/lib/gamification/xp-engine";

interface GamificationStatusProps {
  accentColor: string;
  currentMVP: Exercise["mvp"];
  refreshToken: number;
}

function getRecentBadges(badges: Badge[]): Badge[] {
  return badges
    .filter((badge) => badge.unlockedAt)
    .sort((left, right) => {
      const leftTime = new Date(left.unlockedAt ?? 0).getTime();
      const rightTime = new Date(right.unlockedAt ?? 0).getTime();
      return rightTime - leftTime;
    })
    .slice(0, 2);
}

export function GamificationStatus({
  accentColor,
  currentMVP,
  refreshToken,
}: GamificationStatusProps) {
  void refreshToken;
  const profile = getPlayerProfile();
  const progress = useMemo(() => getLevelProgress(profile), [profile]);
  const cohort = useMemo(() => getCohortStats(), []);
  const recentBadges = useMemo(() => getRecentBadges(profile.badges), [profile.badges]);
  const programProgress = useMemo(() => getMVPProgress(profile, currentMVP), [currentMVP, profile]);
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";

  return (
    <section
      style={{
        padding: "16px 18px",
        borderRadius: "var(--radius-lg)",
        background: "linear-gradient(135deg, rgba(15, 23, 42, 0.04), rgba(255, 255, 255, 0.02))",
        border: "1px solid var(--border-primary)",
        marginBottom: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 12,
        }}
      >
        <div>
          <div
            style={{
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              marginBottom: 4,
            }}
          >
            {t({ en: "Engagement Engine", ar: "محرك المشاركة", arEG: "محرك المشاركة" })}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <Trophy size={16} style={{ color: accentColor }} />
            <strong style={{ fontSize: "16px", color: "var(--text-primary)" }}>
              {profile.levelName}
            </strong>
            <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
              {profile.totalXP} XP
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span
            className="badge"
            style={{
              background: "rgba(245, 158, 11, 0.12)",
              color: "#d97706",
              border: "1px solid rgba(245, 158, 11, 0.18)",
            }}
          >
            <Flame size={11} style={{ marginRight: 4 }} />
            {profile.streakDays}{t({ en: "-day streak", ar: " يوم متواصل", arEG: " يوم متواصل" })}
          </span>
          <span
            className="badge"
            style={{
              background: `${accentColor}12`,
              color: accentColor,
              border: `1px solid ${accentColor}22`,
            }}
          >
            <Shield size={11} style={{ marginRight: 4 }} />
            {programProgress}/14 {t({ en: "in this track", ar: "في هذا المسار", arEG: "في هذا المسار" })}
          </span>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            color: "var(--text-muted)",
            marginBottom: 6,
          }}
        >
          <span>{t({ en: "Progress to next level", ar: "التقدم للمستوى التالي", arEG: "التقدم للمستوى التالي" })}</span>
          <span>{progress.progressPercent}%</span>
        </div>
        <div
          style={{
            height: 8,
            borderRadius: 999,
            background: "var(--bg-secondary)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress.progressPercent}%`,
              background: `linear-gradient(90deg, ${accentColor}, color-mix(in srgb, ${accentColor} 55%, white))`,
              borderRadius: 999,
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 10,
          marginBottom: recentBadges.length > 0 ? 12 : 0,
        }}
      >
        <div style={{ padding: 10, borderRadius: "var(--radius-md)", background: "var(--bg-secondary)" }}>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: 4 }}>{t({ en: "Badges unlocked", ar: "الشارات المفتوحة", arEG: "الشارات المفتوحة" })}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-primary)" }}>
            <Award size={14} style={{ color: accentColor }} />
            <strong>{profile.badges.filter((badge) => badge.unlockedAt).length}</strong>
          </div>
        </div>
        <div style={{ padding: 10, borderRadius: "var(--radius-md)", background: "var(--bg-secondary)" }}>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: 4 }}>{t({ en: "Synced cohort", ar: "المجموعة المتزامنة", arEG: "المجموعة المتزامنة" })}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-primary)" }}>
            <Sparkles size={14} style={{ color: accentColor }} />
            <strong>{cohort.participantsActive} {t({ en: "learners", ar: "متعلم", arEG: "متعلم" })}</strong>
          </div>
        </div>
        <div style={{ padding: 10, borderRadius: "var(--radius-md)", background: "var(--bg-secondary)" }}>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: 4 }}>{t({ en: "Track completion", ar: "إكمال المسار", arEG: "إكمال المسار" })}</div>
          <div style={{ color: "var(--text-primary)", fontWeight: 700 }}>{cohort.avgCompletion}% {t({ en: "average", ar: "متوسط", arEG: "متوسط" })}</div>
          <div style={{ fontSize: "11px", color: "var(--text-caption)" }}>
            {t({ en: "Top streak", ar: "أعلى تواصل", arEG: "أعلى تواصل" })}: {cohort.topStreakDays} {t({ en: "days", ar: "أيام", arEG: "أيام" })}
          </div>
        </div>
      </div>

      {recentBadges.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {recentBadges.map((badge) => (
            <span
              key={badge.id}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 10px",
                borderRadius: 999,
                background: `${accentColor}10`,
                border: `1px solid ${accentColor}18`,
                fontSize: "12px",
                color: "var(--text-primary)",
              }}
            >
              <span>{badge.icon}</span>
              <span>{badge.name}</span>
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
