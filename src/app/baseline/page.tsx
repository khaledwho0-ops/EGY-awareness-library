"use client";

import { useState } from "react";
import { CALIBRATION_CLAIMS, EMOTION_EVIDENCE_PAIRS, COMFORT_ACCURACY_PAIRS, BATTERY_CONFIG } from "@/data/baseline/trust-battery";
import { buildTrustCalibrationProfile } from "@/lib/scoring/trust-calibration";
import type { ClaimConfidenceItem, EmotionTrialItem, ComfortTrialItem } from "@/lib/scoring/trust-calibration";
import { useRTL } from "@/components/shared/rtl-provider";
import { BASE, s } from "@/data/i18n/site-strings";

/**
 * BASELINE BATTERY PAGE — §17.3
 * Day 0 Trust Calibration Battery.
 * 5-section instrument measuring initial susceptibility.
 */

type Section = "intro" | "claims" | "emotion" | "comfort" | "results";

export default function BaselinePage() {
  const [section, setSection] = useState<Section>("intro");
  const [claimIndex, setClaimIndex] = useState(0);
  const [claimResponses, setClaimResponses] = useState<ClaimConfidenceItem[]>([]);
  const [emotionIndex, setEmotionIndex] = useState(0);
  const [emotionResponses, setEmotionResponses] = useState<EmotionTrialItem[]>([]);
  const [comfortIndex, setComfortIndex] = useState(0);
  const [comfortResponses, setComfortResponses] = useState<ComfortTrialItem[]>([]);
  const [confidence, setConfidence] = useState(50);
  const [classification, setClassification] = useState<"real" | "fake" | "unsure" | "">("");
  const { isRTL, language } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";

  const getT = (item: any, key: string = "text") => {
    if (language === "ar-EG" && item[key + "ArEG"]) return item[key + "ArEG"];
    if (isRTL && item[key + "Ar"]) return item[key + "Ar"];
    return item[key];
  };

  const handleClaimSubmit = () => {
    if (!classification) return;
    const claim = CALIBRATION_CLAIMS[claimIndex];
    const isCorrect = (classification === "real" && claim.isTrue) || (classification === "fake" && !claim.isTrue);

    setClaimResponses([...claimResponses, {
      claimId: claim.id,
      userClassification: classification,
      confidencePercent: confidence,
      isActuallyTrue: claim.isTrue,
      isCorrect,
    }]);

    if (claimIndex < CALIBRATION_CLAIMS.length - 1) {
      setClaimIndex(claimIndex + 1);
      setClassification("");
      setConfidence(50);
    } else {
      setSection("emotion");
    }
  };

  const handleEmotionSubmit = (acceptedNeutral: boolean, acceptedEmotional: boolean) => {
    const pair = EMOTION_EVIDENCE_PAIRS[emotionIndex];
    setEmotionResponses([...emotionResponses, {
      trialId: pair.id,
      acceptedNeutral,
      acceptedEmotional,
      sameFactualContent: pair.neutralVersion.isFactuallyAccurate === pair.emotionalVersion.isFactuallyAccurate,
    }]);

    if (emotionIndex < EMOTION_EVIDENCE_PAIRS.length - 1) {
      setEmotionIndex(emotionIndex + 1);
    } else {
      setSection("comfort");
    }
  };

  const handleComfortSubmit = (ratedComfortingHigher: boolean) => {
    const pair = COMFORT_ACCURACY_PAIRS[comfortIndex];
    setComfortResponses([...comfortResponses, {
      trialId: pair.id,
      ratedComfortingAsMoreReliable: ratedComfortingHigher,
      comfortingHasWeakerEvidence: pair.comfortingVersion.evidenceStrength === "weak",
    }]);

    if (comfortIndex < COMFORT_ACCURACY_PAIRS.length - 1) {
      setComfortIndex(comfortIndex + 1);
    } else {
      // Build profile and save
      const profile = buildTrustCalibrationProfile(claimResponses, [], [], emotionResponses, comfortResponses, "pre");
      if (typeof window !== "undefined") {
        localStorage.setItem("eal-trust-calibration", JSON.stringify({ pre: profile }));
      }
      setSection("results");
    }
  };

  const profile = section === "results"
    ? buildTrustCalibrationProfile(claimResponses, [], [], emotionResponses, comfortResponses, "pre")
    : null;

  return (
    <main style={{ maxWidth: "700px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      {/* INTRO */}
      {section === "intro" && (
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem", fontFamily: ff }}>
            🧠 {s(BASE.title, a)}
          </h1>
          <p style={{ fontSize: "0.9rem", opacity: 0.7, lineHeight: 1.6, marginBottom: "1.5rem", fontFamily: ff }}>
            {s(BASE.intro, a)}
          </p>
          <div style={{ display: "grid", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {BATTERY_CONFIG.sections.map((s) => (
              <div key={s.id} style={{
                padding: "0.6rem 1rem", borderRadius: "8px",
                background: "color-mix(in srgb, var(--text-primary) 5%, transparent)",
                display: "flex", justifyContent: "space-between", fontSize: "0.85rem",
              }}>
                <span>{s.title}</span>
                <span style={{ opacity: 0.5 }}>~{s.estimatedMinutes} min</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "0.75rem", opacity: 0.5, marginBottom: "1rem", fontFamily: ff }}>
            {a ? `${s(BASE.timeEst, a)} ~${BATTERY_CONFIG.totalMinutes} ${s(BASE.minLabel, a)}` : `Total estimated time: ~${BATTERY_CONFIG.totalMinutes} minutes. Your responses are stored locally and used for research purposes only.`}
          </p>
          <button onClick={() => setSection("claims")} style={{
            width: "100%", padding: "0.75rem", borderRadius: "10px", border: "none",
            background: "var(--accent-amber)", color: "#000", fontWeight: 700, fontSize: "1rem", cursor: "pointer",
          }}>
            {s(BASE.begin, a)}
          </button>
        </div>
      )}

      {/* CLAIMS SECTION */}
      {section === "claims" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, fontFamily: ff }}>{s(BASE.sec1, a)}</h2>
            <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>{claimIndex + 1}/{CALIBRATION_CLAIMS.length}</span>
          </div>

          <div style={{
            padding: "1.25rem", borderRadius: "12px",
            background: "color-mix(in srgb, var(--accent-amber) 8%, transparent)",
            border: "1px solid color-mix(in srgb, var(--accent-amber) 20%, transparent)",
            marginBottom: "1rem", fontSize: "0.95rem", lineHeight: 1.6,
          }}>
            {getT(CALIBRATION_CLAIMS[claimIndex])}
          </div>

          {/* Classification */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
            {(["real", "fake", "unsure"] as const).map((c) => (
              <button key={c} onClick={() => setClassification(c)} style={{
                flex: 1, padding: "0.6rem", borderRadius: "8px",
                border: classification === c ? "2px solid var(--accent-amber)" : "1px solid var(--border-primary)",
                background: classification === c ? "color-mix(in srgb, var(--accent-amber) 15%, transparent)" : "transparent",
                color: "var(--text-primary)", cursor: "pointer", fontWeight: classification === c ? 700 : 400, fontSize: "0.85rem",
                textTransform: "capitalize",
              }}>
                {c === "real" ? s(BASE.likelyTrue, a) : c === "fake" ? s(BASE.likelyFalse, a) : s(BASE.unsure, a)}
              </button>
            ))}
          </div>

          {/* Confidence slider */}
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", opacity: 0.6, marginBottom: "0.25rem" }}>
              <span>{s(BASE.notConf, a)}</span>
              <span>{s(BASE.confidence, a)}: {confidence}%</span>
              <span>{s(BASE.veryConf, a)}</span>
            </div>
            <input type="range" min={0} max={100} value={confidence} onChange={(e) => setConfidence(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--accent-amber)" }} />
          </div>

          <button onClick={handleClaimSubmit} disabled={!classification} style={{
            width: "100%", padding: "0.6rem", borderRadius: "8px", border: "none",
            background: classification ? "var(--accent-amber)" : "var(--border-primary)",
            color: classification ? "#000" : "var(--text-secondary)",
            fontWeight: 700, fontSize: "0.85rem", cursor: classification ? "pointer" : "not-allowed",
          }}>
            {claimIndex < CALIBRATION_CLAIMS.length - 1 ? s(BASE.nextClaim, a) : s(BASE.contSec2, a)}
          </button>
        </div>
      )}

      {/* EMOTION VS EVIDENCE */}
      {section === "emotion" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, fontFamily: ff }}>{s(BASE.sec2, a)}</h2>
            <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>{emotionIndex + 1}/{EMOTION_EVIDENCE_PAIRS.length}</span>
          </div>
          <p style={{ fontSize: "0.8rem", opacity: 0.6, marginBottom: "1rem", fontFamily: ff }}>
            {s(BASE.readEach, a)}
          </p>

          {/* Version A — Neutral */}
          <div style={{ padding: "1rem", borderRadius: "10px", border: "1px solid var(--border-primary)", marginBottom: "0.5rem" }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, opacity: 0.5, marginBottom: "0.35rem" }}>STATEMENT A</div>
            <div style={{ fontSize: "0.85rem", lineHeight: 1.5 }}>{getT(EMOTION_EVIDENCE_PAIRS[emotionIndex].neutralVersion)}</div>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <button onClick={() => handleEmotionSubmit(true, false)} style={{ flex: 1, padding: "0.4rem", borderRadius: "6px", border: "1px solid var(--accent-emerald)", background: "transparent", color: "var(--accent-emerald)", cursor: "pointer", fontSize: "0.75rem" }}>
                {s(BASE.acceptA, a)}
              </button>
            </div>
          </div>

          {/* Version B — Emotional */}
          <div style={{ padding: "1rem", borderRadius: "10px", border: "1px solid color-mix(in srgb, var(--accent-red, #ef4444) 30%, transparent)", marginBottom: "0.5rem" }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, opacity: 0.5, marginBottom: "0.35rem" }}>STATEMENT B</div>
            <div style={{ fontSize: "0.85rem", lineHeight: 1.5 }}>{getT(EMOTION_EVIDENCE_PAIRS[emotionIndex].emotionalVersion)}</div>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <button onClick={() => handleEmotionSubmit(false, true)} style={{ flex: 1, padding: "0.4rem", borderRadius: "6px", border: "1px solid var(--accent-red, #ef4444)", background: "transparent", color: "var(--accent-red, #ef4444)", cursor: "pointer", fontSize: "0.75rem" }}>
                {s(BASE.acceptB, a)}
              </button>
            </div>
          </div>

          <button onClick={() => handleEmotionSubmit(true, true)} style={{
            width: "100%", padding: "0.5rem", borderRadius: "8px", border: "1px solid var(--border-primary)",
            background: "transparent", color: "var(--text-secondary)", cursor: "pointer", fontSize: "0.75rem",
          }}>
            {s(BASE.bothEqual, a)}
          </button>
        </div>
      )}

      {/* COMFORT VS ACCURACY */}
      {section === "comfort" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, fontFamily: ff }}>{s(BASE.sec3, a)}</h2>
            <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>{comfortIndex + 1}/{COMFORT_ACCURACY_PAIRS.length}</span>
          </div>
          <p style={{ fontSize: "0.8rem", opacity: 0.6, marginBottom: "1rem", fontFamily: ff }}>
            {s(BASE.whichMore, a)}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <button onClick={() => handleComfortSubmit(true)} style={{
              padding: "1rem", borderRadius: "10px", border: "1px solid var(--border-primary)",
              background: "transparent", color: "var(--text-primary)", cursor: "pointer", textAlign: "left",
              fontSize: "0.85rem", lineHeight: 1.5,
            }}>
              {getT(COMFORT_ACCURACY_PAIRS[comfortIndex].comfortingVersion)}
            </button>
            <button onClick={() => handleComfortSubmit(false)} style={{
              padding: "1rem", borderRadius: "10px", border: "1px solid var(--border-primary)",
              background: "transparent", color: "var(--text-primary)", cursor: "pointer", textAlign: "left",
              fontSize: "0.85rem", lineHeight: 1.5,
            }}>
              {getT(COMFORT_ACCURACY_PAIRS[comfortIndex].accurateVersion)}
            </button>
          </div>
        </div>
      )}

      {/* RESULTS */}
      {section === "results" && profile && (
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem", fontFamily: ff }}>📊 {s(BASE.yourProfile, a)}</h2>
          <p style={{ fontSize: "0.8rem", opacity: 0.6, marginBottom: "1.5rem", fontFamily: ff }}>
            {s(BASE.profileDesc, a)}
          </p>

          <div style={{ display: "grid", gap: "0.75rem" }}>
            {[
              { label: s(BASE.tce, a), value: profile.tce, desc: s(BASE.tceDesc, a), color: "var(--accent-amber)", ideal: s(BASE.lowerBetter, a) },
              { label: s(BASE.ets, a), value: profile.ets, desc: s(BASE.etsDesc, a), color: "#f97316", ideal: s(BASE.lowerBetter, a) },
              { label: s(BASE.ctcs, a), value: profile.ctcs, desc: s(BASE.ctcsDesc, a), color: "var(--accent-red, #ef4444)", ideal: s(BASE.lowerBetter, a) },
            ].map((metric) => (
              <div key={metric.label} style={{
                padding: "1rem 1.25rem", borderRadius: "12px",
                borderLeft: `3px solid ${metric.color}`,
                background: `color-mix(in srgb, ${metric.color} 8%, transparent)`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{metric.label}</div>
                    <div style={{ fontSize: "0.7rem", opacity: 0.6 }}>{metric.desc}</div>
                  </div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, color: metric.color }}>
                    {Math.round(metric.value)}
                  </div>
                </div>
                <div style={{ fontSize: "0.65rem", opacity: 0.5, marginTop: "0.25rem" }}>{metric.ideal}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "1.5rem", padding: "1rem", borderRadius: "10px", background: "color-mix(in srgb, var(--accent-emerald) 8%, transparent)", fontSize: "0.8rem", lineHeight: 1.6, fontFamily: ff }}>
            ✅ {s(BASE.saved, a)}
          </div>
        </div>
      )}
    </main>
  );
}
