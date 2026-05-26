"use client";

import { ExternalLink, Phone, ShieldAlert } from "lucide-react";
import { OFFICIAL_MENTAL_HEALTH_GUIDANCE } from "@/data/directory/official-support";
import {
  getSupportDirectoriesForMvp,
  SUPPORT_DIRECTORIES,
  type SupportDirectoryEntry,
} from "@/data/directory/support-registry";

interface SupportDirectoryPanelProps {
  mvp?: SupportDirectoryEntry["mvp"];
  title?: string;
  compact?: boolean;
}

export function SupportDirectoryPanel({
  mvp = "all",
  title = "Support and escalation routes",
  compact = false,
}: SupportDirectoryPanelProps) {
  const entries = mvp === "all" ? SUPPORT_DIRECTORIES : getSupportDirectoriesForMvp(mvp);
  const showGuidanceCards = mvp === "all" || mvp === "mental-health";

  return (
    <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <ShieldAlert size={18} style={{ color: "var(--color-warning)" }} />
        <div>
          <h3 style={{ marginBottom: 4 }}>{title}</h3>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>
            Structured routing from framework §28.10: phone, formal-guidance, and official web support entries with verification dates and intended escalation use.
          </p>
        </div>
      </div>

      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: compact ? "1fr" : "repeat(auto-fit, minmax(260px, 1fr))" }}
      >
        {entries.map((entry) => (
          <div
            key={entry.id}
            style={{
              padding: "14px 16px",
              borderRadius: "var(--radius-md)",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: "14px", marginBottom: 4 }}>{entry.name}</div>
                <div style={{ fontSize: "11px", color: "var(--text-caption)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {entry.type.replace("-", " ")} · {entry.jurisdiction}
                </div>
              </div>
              <span
                className="badge"
                style={{
                  background: entry.status === "confirmed" ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.12)",
                  color: entry.status === "confirmed" ? "var(--color-success)" : "var(--color-warning)",
                  border: `1px solid ${entry.status === "confirmed" ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)"}`,
                  height: "fit-content",
                }}
              >
                {entry.status}
              </span>
            </div>

            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 12 }}>
              {entry.escalationUse}
            </p>

            <div style={{ display: "grid", gap: 6, fontSize: "12px", color: "var(--text-muted)", marginBottom: 12 }}>
              <div><strong style={{ color: "var(--text-primary)" }}>Hours:</strong> {entry.hours}</div>
              <div><strong style={{ color: "var(--text-primary)" }}>Last verified:</strong> {entry.lastVerified}</div>
              <div><strong style={{ color: "var(--text-primary)" }}>Official source:</strong> {entry.officialSource}</div>
              <div><strong style={{ color: "var(--text-primary)" }}>Notes:</strong> {entry.notes}</div>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {entry.phone && (
                <a href={`tel:${entry.phone}`} className="btn-secondary" style={{ fontSize: "12px", padding: "8px 12px", textDecoration: "none" }}>
                  <Phone size={12} /> {entry.phone}
                </a>
              )}
              {entry.url && (
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ fontSize: "12px", padding: "8px 12px", textDecoration: "none" }}
                >
                  <ExternalLink size={12} /> Open official route
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {showGuidanceCards && (
        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Official guidance and evidence anchors
          </div>
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: compact ? "1fr" : "repeat(auto-fit, minmax(240px, 1fr))" }}
          >
            {OFFICIAL_MENTAL_HEALTH_GUIDANCE.map((entry) => (
              <a
                key={entry.id}
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
                style={{
                  display: "block",
                  padding: "14px 16px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-primary)",
                  color: "inherit",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                  <strong style={{ fontSize: "13px", color: "var(--text-primary)" }}>{entry.label}</strong>
                  <ExternalLink size={13} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                </div>
                <div
                  className="badge"
                  style={{
                    background: "rgba(16, 185, 129, 0.12)",
                    color: "var(--accent-mentalhealth)",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                    marginBottom: 8,
                  }}
                >
                  {entry.stat}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                  {entry.description}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
