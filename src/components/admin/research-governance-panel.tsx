"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Lock } from "lucide-react";
import { INSTRUMENT_READINESS } from "@/data/research/instrument-readiness";
import {
  getParticipantLaunchGate,
  getResearchGovernance,
  saveResearchGovernance,
  type ResearchGovernanceState,
} from "@/lib/research/research-governance";

export function ResearchGovernancePanel() {
  const [state, setState] = useState<ResearchGovernanceState>(() => getResearchGovernance());

  useEffect(() => {
    saveResearchGovernance(state);
  }, [state]);

  const launchGate = getParticipantLaunchGate(state);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          {launchGate.ready ? (
            <CheckCircle2 size={18} style={{ color: "var(--color-success)" }} />
          ) : (
            <Lock size={18} style={{ color: "var(--color-warning)" }} />
          )}
          <div>
            <h3 style={{ marginBottom: 4 }}>Participant launch gate</h3>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>
              Runtime enforcement of framework §28.8-§28.12. The app now stores reviewer approval, directory rechecks, and the active participant language profile before launch.
            </p>
          </div>
        </div>

        <div
          className="glass-card"
          style={{
            padding: "var(--space-lg)",
            background: launchGate.ready ? "rgba(16,185,129,0.08)" : "rgba(245,158,11,0.08)",
            border: `1px solid ${launchGate.ready ? "rgba(16,185,129,0.25)" : "rgba(245,158,11,0.25)"}`,
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 8 }}>
            {launchGate.ready ? "Ready for participant launch" : "Launch is still gated"}
          </div>
          {!launchGate.ready && (
            <div style={{ display: "grid", gap: 6, fontSize: "13px", color: "var(--text-secondary)" }}>
              {launchGate.blockers.map((blocker) => (
                <div key={blocker}>• {blocker}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
        <h3 style={{ marginBottom: 12 }}>Participant language profile</h3>
        <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: 12 }}>
          Assessment launch buttons now respect this setting. Selecting Arabic immediately locks instruments whose Arabic path is still blocked in the framework.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {(["english", "arabic"] as const).map((language) => (
            <button
              key={language}
              onClick={() => setState((current) => ({ ...current, participantLanguage: language }))}
              className="btn-secondary"
              style={{
                fontSize: "13px",
                background: state.participantLanguage === language ? "var(--accent-cta)" : undefined,
                color: state.participantLanguage === language ? "white" : undefined,
              }}
            >
              {language === "english" ? "English validated path" : "Arabic deployment path"}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
        <h3 style={{ marginBottom: 12 }}>Reviewer signoff records</h3>
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {([
            ["deepreal", "DeepReal reviewer"],
            ["mentalHealth", "Mental Health reviewer"],
            ["religionHub", "Religion Hub reviewer"],
          ] as const).map(([key, label]) => {
            const reviewer = state.reviewerSignoffs[key];
            return (
              <div
                key={key}
                style={{
                  padding: "14px 16px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-primary)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 10 }}>
                  <strong>{label}</strong>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "12px" }}>
                    <input
                      type="checkbox"
                      checked={reviewer.approved}
                      onChange={(event) =>
                        setState((current) => ({
                          ...current,
                          reviewerSignoffs: {
                            ...current.reviewerSignoffs,
                            [key]: {
                              ...current.reviewerSignoffs[key],
                              approved: event.target.checked,
                              signedAt: event.target.checked
                                ? current.reviewerSignoffs[key].signedAt || new Date().toISOString().slice(0, 10)
                                : "",
                            },
                          },
                        }))
                      }
                    />
                    Approved
                  </label>
                </div>
                <div style={{ display: "grid", gap: 8 }}>
                  <input
                    value={reviewer.reviewerName}
                    onChange={(event) =>
                      setState((current) => ({
                        ...current,
                        reviewerSignoffs: {
                          ...current.reviewerSignoffs,
                          [key]: { ...current.reviewerSignoffs[key], reviewerName: event.target.value },
                        },
                      }))
                    }
                    placeholder="Reviewer name"
                    style={{ padding: "10px 12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-primary)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                  />
                  <input
                    value={reviewer.affiliation}
                    onChange={(event) =>
                      setState((current) => ({
                        ...current,
                        reviewerSignoffs: {
                          ...current.reviewerSignoffs,
                          [key]: { ...current.reviewerSignoffs[key], affiliation: event.target.value },
                        },
                      }))
                    }
                    placeholder="Affiliation / institution"
                    style={{ padding: "10px 12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-primary)", background: "var(--bg-primary)", color: "var(--text-primary)" }}
                  />
                  <textarea
                    value={reviewer.notes}
                    onChange={(event) =>
                      setState((current) => ({
                        ...current,
                        reviewerSignoffs: {
                          ...current.reviewerSignoffs,
                          [key]: { ...current.reviewerSignoffs[key], notes: event.target.value },
                        },
                      }))
                    }
                    placeholder="Reviewer notes / signed conditions"
                    rows={3}
                    style={{ padding: "10px 12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-primary)", background: "var(--bg-primary)", color: "var(--text-primary)", resize: "vertical" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
        <h3 style={{ marginBottom: 12 }}>Directory recheck checklist</h3>
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {([
            ["hotline16328", "16328 hotline"],
            ["ambulance123", "Ambulance 123"],
            ["mohpPlatform", "MoHP platform"],
            ["darAlIfta107", "Dar al-Ifta 107"],
          ] as const).map(([key, label]) => (
            <label
              key={key}
              className="glass-card"
              style={{ padding: "var(--space-md)", display: "flex", alignItems: "center", gap: 10 }}
            >
              <input
                type="checkbox"
                checked={state.directoriesRechecked[key]}
                onChange={(event) =>
                  setState((current) => ({
                    ...current,
                    directoriesRechecked: {
                      ...current.directoriesRechecked,
                      [key]: event.target.checked,
                    },
                  }))
                }
              />
              <span style={{ fontSize: "13px" }}>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
        <h3 style={{ marginBottom: 12 }}>Instrument readiness matrix</h3>
        <div style={{ display: "grid", gap: 10 }}>
          {Object.values(INSTRUMENT_READINESS).map((instrument) => (
            <div
              key={instrument.instrumentId}
              style={{
                padding: "14px 16px",
                borderRadius: "var(--radius-md)",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
                <strong>{instrument.instrumentName}</strong>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span className="badge">EN: {instrument.english}</span>
                  <span className="badge">AR: {instrument.arabic}</span>
                  <span className="badge">Permission: {instrument.permissionStatus}</span>
                </div>
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                <div><strong style={{ color: "var(--text-primary)" }}>Rule:</strong> {instrument.deploymentRule}</div>
                <div><strong style={{ color: "var(--text-primary)" }}>Why:</strong> {instrument.why}</div>
                <div><strong style={{ color: "var(--text-primary)" }}>Next action:</strong> {instrument.nextAction}</div>
              </div>
            </div>
          ))}
        </div>

        {state.participantLanguage === "arabic" && (
          <div className="disclaimer-bar disclaimer-bar-warning" style={{ marginTop: 16 }}>
            <AlertTriangle size={14} style={{ color: "var(--color-warning)", flexShrink: 0 }} />
            Arabic participant mode is intentionally blocked for parts of the battery until the adaptation gates are closed.
          </div>
        )}
      </div>
    </div>
  );
}
