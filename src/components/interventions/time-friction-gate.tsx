"use client";

import { useState, useEffect, useCallback } from "react";
import { useRTL } from "@/components/shared/rtl-provider";

/**
 * COM-B TIME FRICTION — Q90
 * Delays the "Accept" / "Follow" / "Share" button by N seconds
 * Forces users to PAUSE before accepting claims
 * 
 * COM-B Model: Capability (cognitive) + Motivation (reflective)
 * Framework: §15.1 — Anti-acceptance friction barrier
 * 
 * Usage: Wrap any CTA with <TimeFrictionGate> to enforce delay
 */

interface TimeFrictionGateProps {
  /** Delay in seconds before button becomes active */
  delaySec?: number;
  /** Text shown while locked */
  lockMessage?: string;
  /** Text shown when unlocked */
  unlockMessage?: string;
  /** Callback when user clicks after unlock */
  onAccept: () => void;
  /** What was the claim/content? Used for dwell tracking */
  contentId?: string;
  /** Accent color */
  accentColor?: string;
}

export function TimeFrictionGate({
  delaySec = 5,
  lockMessage = "Take a moment to think critically before accepting...",
  unlockMessage = "Ready to proceed",
  onAccept,
  contentId,
  accentColor = "var(--accent-cta)",
}: TimeFrictionGateProps) {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const resolvedLockMsg = lockMessage || (t({ en: "Take a moment to think critically before accepting...", ar: "خذ لحظة للتفكير النقدي قبل القبول...", arEG: "خذ لحظة للتفكير النقدي قبل القبول..." }));
  const resolvedUnlockMsg = unlockMessage || (t({ en: "Ready to proceed", ar: "جاهز للمتابعة", arEG: "جاهز للمتابعة" }));
  const [secondsLeft, setSecondsLeft] = useState(delaySec);
  const isUnlocked = secondsLeft <= 0;

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }
    const timer = setTimeout(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const handleClick = useCallback(() => {
    if (!isUnlocked) return;
    // Log the friction event
    try {
      const events = JSON.parse(localStorage.getItem('friction_events') || '[]');
      events.push({
        contentId,
        delaySec,
        timestamp: new Date().toISOString(),
        actualWaitSec: delaySec,
      });
      localStorage.setItem('friction_events', JSON.stringify(events));
    } catch { /* silent */ }
    onAccept();
  }, [isUnlocked, onAccept, contentId, delaySec]);

  const progress = ((delaySec - secondsLeft) / delaySec) * 100;

  return (
    <div style={{
      padding: "14px 18px",
      borderRadius: "var(--radius-md)",
      border: `1px solid ${isUnlocked ? accentColor : "var(--border-primary)"}`,
      background: isUnlocked ? `color-mix(in srgb, ${accentColor} 5%, var(--bg-card))` : "var(--bg-secondary)",
      transition: "all 0.4s ease",
    }}>
      {!isUnlocked ? (
        <>
          {/* Progress bar */}
          <div style={{
            width: "100%", height: 4, borderRadius: 2,
            background: "var(--bg-elevated)", marginBottom: 10,
            overflow: "hidden",
          }}>
            <div style={{
              width: `${progress}%`,
              height: "100%",
              background: accentColor,
              borderRadius: 2,
              transition: "width 1s linear",
            }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              border: `2px solid ${accentColor}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 700, fontFamily: "'Clash Display'",
              color: accentColor,
            }}>
              {secondsLeft}
            </div>
            <span style={{ fontSize: 13, color: "var(--text-muted)", flex: 1 }}>
              {resolvedLockMsg}
            </span>
          </div>
        </>
      ) : (
        <button
          onClick={handleClick}
          className="btn-primary"
          style={{
            width: "100%", fontSize: 13,
            animation: "fadeInUp 0.3s ease",
          }}
        >
          ✓ {resolvedUnlockMsg}
        </button>
      )}
    </div>
  );
}
