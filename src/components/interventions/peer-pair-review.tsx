"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Users, ArrowLeftRight } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";

/**
 * PEER PAIR REVIEW — Q50
 * Tab Navigation with sliding underline using transform:translateX()
 * Compare student's answer with peer's answer
 * 
 * Framework: §18 Mode 14 — Two-user comparison mode
 * role="tab" + aria-selected for accessibility (Q79)
 */

interface PeerPairReviewProps {
  userAnswer: string;
  peerAnswer: string;
  claimText: string;
  onComplete?: () => void;
}

export function PeerPairReview({ userAnswer, peerAnswer, claimText, onComplete }: PeerPairReviewProps) {
  const [activeTab, setActiveTab] = useState<"you" | "peer">("you");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({ you: null, peer: null });
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const { isRTL, t } = useRTL();
  const a = isRTL;

  const updateUnderline = useCallback(() => {
    const el = tabRefs.current[activeTab];
    if (el) {
      setUnderlineStyle({
        width: el.offsetWidth,
        left: el.offsetLeft,
      });
    }
  }, [activeTab]);

  useEffect(() => {
    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [updateUnderline]);

  return (
    <div style={{ border: "1px solid var(--border-primary)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "12px 18px", background: "var(--bg-secondary)", display: "flex", alignItems: "center", gap: 8 }}>
        <Users size={16} style={{ color: "var(--accent-cta)" }} />
        <span style={{ fontSize: 13, fontWeight: 600 }}>{t({ en: "Peer Pair Review", ar: "مراجعة الأقران", arEG: "مراجعة الأقران" })}</span>
        <ArrowLeftRight size={14} style={{ color: "var(--text-muted)", marginLeft: "auto" }} />
      </div>

      {/* Claim context */}
      <div style={{ padding: "10px 18px", fontSize: 12, color: "var(--text-muted)", borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-card)" }}>
        <strong>{t({ en: "Claim:", ar: "الادعاء:", arEG: "الادعاء:" })}</strong> {claimText.slice(0, 120)}{claimText.length > 120 ? "..." : ""}
      </div>

      {/* Tab Nav with sliding underline */}
      <div className="tab-nav" style={{ padding: "0 18px", position: "relative" }} role="tablist">
        <button
          ref={el => { tabRefs.current.you = el; }}
          role="tab"
          aria-selected={activeTab === "you"}
          onClick={() => setActiveTab("you")}
          className={`tab-nav-item ${activeTab === "you" ? "active" : ""}`}
        >
          {t({ en: "Your Answer", ar: "إجابتك", arEG: "إجابتك" })}
        </button>
        <button
          ref={el => { tabRefs.current.peer = el; }}
          role="tab"
          aria-selected={activeTab === "peer"}
          onClick={() => setActiveTab("peer")}
          className={`tab-nav-item ${activeTab === "peer" ? "active" : ""}`}
        >
          {t({ en: "Peer\u0027s Answer", ar: "إجابة الزميل", arEG: "إجابة الزميل" })}
        </button>
        {/* Sliding underline */}
        <div
          className="tab-nav-underline"
          style={{
            width: underlineStyle.width,
            transform: `translateX(${underlineStyle.left}px)`,
            left: 0,
          }}
        />
      </div>

      {/* Tab Panels */}
      <div style={{ padding: 18 }}>
        <div role="tabpanel" aria-labelledby={activeTab} style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-secondary)" }}>
          {activeTab === "you" ? (
            <div>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--accent-cta)", marginBottom: 8, fontWeight: 600 }}>
                {t({ en: "Your Reasoning", ar: "تفكيرك", arEG: "تفكيرك" })}
              </div>
              {userAnswer || <span style={{ color: "var(--text-caption)", fontStyle: "italic" }}>{t({ en: "You haven\u0027t answered yet.", ar: "لم تجب بعد.", arEG: "لم تجب بعد." })}</span>}
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--accent-mentalhealth)", marginBottom: 8, fontWeight: 600 }}>
                {t({ en: "Peer\u0027s Reasoning", ar: "تفكير الزميل", arEG: "تفكير الزميل" })}
              </div>
              {peerAnswer}
            </div>
          )}
        </div>
      </div>

      {onComplete && (
        <div style={{ padding: "0 18px 18px" }}>
          <button onClick={onComplete} className="btn-secondary" style={{ width: "100%", fontSize: 13 }}>
            {t({ en: "Done Comparing", ar: "انتهيت من المقارنة", arEG: "انتهيت من المقارنة" })}
          </button>
        </div>
      )}
    </div>
  );
}
