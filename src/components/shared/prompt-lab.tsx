"use client";

import { useState, useMemo } from "react";
import {
  Lightbulb,
  Copy,
  Check,
  Wand2,
  Shield,
} from "lucide-react";
import type { MVP } from "@/types";
import { useRTL } from "@/components/shared/rtl-provider";
import {
  ALL_PROMPTS,
  getPromptsByMVP,
  fillPromptVariables,
  type PromptEntry,
} from "@/data/prompts";

/**
 * Prompt Lab — Framework §20
 *
 * Renders all 42 framework-specified prompts (24 DR + 9 MH + 9 RH).
 * NO prompts are fabricated — every entry is verbatim from §20.3-20.5.
 *
 * §20.6 UX Rule: "Never empty input box"
 * §20.1 Seven Prompt Safety Rules:
 * 1. Force model to state uncertainty
 * 2. Ask for evidence, not opinion
 * 3. Ask for source types
 * 4. Forbid diagnosis in MH mode
 * 5. Forbid fatwa/verdict in RH mode
 * 6. Ask for citations
 * 7. Include disclaimers
 */

export function PromptLab({ defaultMVP }: { defaultMVP?: MVP }) {
  const [selectedMVP, setSelectedMVP] = useState<MVP | "all">(defaultMVP || "all");
  const [selectedPrompt, setSelectedPrompt] = useState<PromptEntry | null>(null);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";

  const filteredPrompts = useMemo(() => {
    if (selectedMVP === "all") return ALL_PROMPTS;
    return getPromptsByMVP(selectedMVP);
  }, [selectedMVP]);

  const filledTemplate = useMemo(() => {
    if (!selectedPrompt) return "";
    return fillPromptVariables(selectedPrompt.prompt, variables);
  }, [selectedPrompt, variables]);

  const handleCopy = () => {
    navigator.clipboard.writeText(filledTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mvpColors: Record<string, string> = {
    deepreal: "var(--accent-deepreal)",
    "mental-health": "var(--accent-mentalhealth)",
    "religion-hub": "var(--accent-religionhub)",
  };

  const mvpLabels: Record<string, string> = {
    all: "All (42)",
    deepreal: "DeepReal (24)",
    "mental-health": "Mental Health (9)",
    "religion-hub": "Religion Hub (9)",
  };

  return (
    <div>
      {/* Safety Notice — §20.1 */}
      <div
        className="disclaimer-bar mb-4"
        style={{ display: "flex", alignItems: "flex-start", gap: 8 }}
      >
        <Shield size={14} style={{ color: "var(--accent-cta)", flexShrink: 0, marginTop: 2 }} />
        <span style={{ fontSize: "12px", fontFamily: ff }}>
          {t({ en: "All 42 prompts enforce uncertainty disclosure, evidence-over-opinion, and source citation. MH prompts forbid diagnosis. RH prompts forbid religious verdicts. (\u00a720.1)", ar: "جميع الأوامر الـ 42 تفرض الإفصاح عن عدم اليقين والأدلة والاستشهاد بالمصادر. (§20.1)", arEG: "جميع الأوامر الـ 42 تفرض الإفصاح عن عدم اليقين والأدلة والاستشهاد بالمصادر. (§20.1)" })}
        </span>
      </div>

      {/* MVP Filter */}
      <div className="flex gap-2 mb-4" style={{ flexWrap: "wrap" }}>
        {(["all", "deepreal", "mental-health", "religion-hub"] as const).map((mvp) => (
          <button
            key={mvp}
            onClick={() => { setSelectedMVP(mvp); setSelectedPrompt(null); }}
            style={{
              padding: "6px 14px",
              borderRadius: "var(--radius-full)",
              background: selectedMVP === mvp ? (mvp === "all" ? "var(--accent-cta)" : mvpColors[mvp]) + "20" : "var(--bg-secondary)",
              border: `1px solid ${selectedMVP === mvp ? (mvp === "all" ? "var(--accent-cta)" : mvpColors[mvp]) : "var(--border-primary)"}`,
              color: selectedMVP === mvp ? (mvp === "all" ? "var(--accent-cta)" : mvpColors[mvp]) : "var(--text-muted)",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Satoshi', sans-serif",
              transition: "all 0.15s ease",
            }}
          >
            {mvpLabels[mvp]}
          </button>
        ))}
      </div>

      {/* Prompt Cards */}
      {!selectedPrompt && (
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {filteredPrompts.map((prompt) => (
            <button
              key={prompt.id}
              onClick={() => {
                setSelectedPrompt(prompt);
                setVariables({});
              }}
              className="glass-card"
              style={{
                padding: "var(--space-lg)",
                textAlign: "left",
                cursor: "pointer",
                border: `1px solid var(--border-primary)`,
                borderLeft: `3px solid ${mvpColors[prompt.mvp]}`,
                fontFamily: "'Satoshi', sans-serif",
                color: "var(--text-primary)",
                transition: "all 0.2s ease",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={14} style={{ color: mvpColors[prompt.mvp] }} />
                <span className="badge" style={{
                  background: `${mvpColors[prompt.mvp]}15`,
                  color: mvpColors[prompt.mvp],
                  border: `1px solid ${mvpColors[prompt.mvp]}30`,
                }}>
                  {prompt.useCase}
                </span>
              </div>
              <h4 style={{ fontSize: "15px", marginBottom: 4 }}>{prompt.id}</h4>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5 }}>
                {prompt.prompt.substring(0, 80)}…
              </p>
              {prompt.variables.length > 0 && (
                <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: 4 }}>
                  {t({ en: "Variables: ", ar: "المتغيرات: ", arEG: "المتغيرات: " })}{prompt.variables.map(v => `{${v}}`).join(", ")}
                </p>
              )}
              {/* Strategy + Bloom + COM-B badges (Chunk 4 metadata) */}
              <div className="flex gap-1 mt-2" style={{ flexWrap: "wrap" }}>
                <span className="badge" style={{ fontSize: "9px", padding: "2px 6px", background: "rgba(99,102,241,0.1)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.2)" }}>
                  🎯 {prompt.strategy.replace(/_/g, " ")}
                </span>
                <span className="badge" style={{ fontSize: "9px", padding: "2px 6px", background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" }}>
                  🧠 {prompt.bloomLevel}
                </span>
                {prompt.comBTarget && (
                  <span className="badge" style={{ fontSize: "9px", padding: "2px 6px", background: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}>
                    ⚙ {prompt.comBTarget.split("/")[1]}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Prompt Builder */}
      {selectedPrompt && (
        <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wand2 size={18} style={{ color: mvpColors[selectedPrompt.mvp] }} />
              <h3 style={{ fontSize: "18px" }}>
                {selectedPrompt.id} — {selectedPrompt.useCase}
              </h3>
              <div className="flex gap-1 ml-2" style={{ flexWrap: "wrap" }}>
                <span className="badge" style={{ fontSize: "10px", padding: "2px 8px", background: "rgba(99,102,241,0.1)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.2)" }}>
                  Strategy: {selectedPrompt.strategy.replace(/_/g, " ")}
                </span>
                <span className="badge" style={{ fontSize: "10px", padding: "2px 8px", background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" }}>
                  Bloom: {selectedPrompt.bloomLevel}
                </span>
                {selectedPrompt.comBTarget && (
                  <span className="badge" style={{ fontSize: "10px", padding: "2px 8px", background: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}>
                    COM-B: {selectedPrompt.comBTarget}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => setSelectedPrompt(null)}
              className="btn-secondary"
              style={{ fontSize: "12px", padding: "4px 12px" }}
            >
              {t({ en: "\u2190 Back", ar: "رجوع \u2192", arEG: "رجوع \u2192" })}
            </button>
          </div>

          {/* Variable Inputs — §20.6: "Never empty" */}
          {selectedPrompt.variables.length > 0 && (
            <div className="mb-4">
              <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: 8 }}>
               {t({ en: "Fill in the variables below:", ar: "أدخل المتغيرات أدناه:", arEG: "أدخل المتغيرات أدناه:" })}
              </p>
              <div className="flex flex-col gap-2">
                {selectedPrompt.variables.map((v) => (
                  <div key={v}>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", textTransform: "capitalize" }}>
                      {v.replace(/_/g, " ")}
                    </label>
                    <input
                      type="text"
                      value={variables[v] || ""}
                      onChange={(e) => setVariables((prev) => ({ ...prev, [v]: e.target.value }))}
                      placeholder={`Enter ${v.replace(/_/g, " ")}...`}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "var(--radius-md)",
                        background: "var(--bg-secondary)",
                        border: "1px solid var(--border-primary)",
                        color: "var(--text-primary)",
                        fontSize: "14px",
                        fontFamily: "'Satoshi', sans-serif",
                        marginTop: 4,
                        outline: "none",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Generated Prompt */}
          <div
            style={{
              padding: "16px",
              borderRadius: "var(--radius-md)",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
              marginBottom: 16,
              fontSize: "14px",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              whiteSpace: "pre-wrap",
              maxHeight: 300,
              overflowY: "auto",
            }}
          >
            {filledTemplate}
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="btn-primary"
            style={{ width: "100%" }}
          >
            {copied ? (
              <><Check size={16} /> {t({ en: "Copied!", ar: "تم النسخ!", arEG: "تم النسخ!" })}</>
            ) : (
              <><Copy size={16} /> {t({ en: "Copy Prompt", ar: "نسخ الأمر", arEG: "نسخ الأمر" })}</>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
