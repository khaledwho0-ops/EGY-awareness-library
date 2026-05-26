import { Database } from "lucide-react";
import { EvidenceCommandBoard } from "@/components/science/evidence-command-board";

export default function EvidencePage() {
  return (
    <div style={{ paddingTop: "var(--navbar-height)" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <Database size={28} style={{ color: "var(--accent-cta)" }} />
          <div>
            <h1 style={{ fontSize: "var(--font-h2)" }}>
              <span className="text-gradient">Evidence Board</span>
            </h1>
            <p style={{ color: "var(--text-muted)", margin: 0 }}>
              Source-grounded claims, metrics, snapshots, sync health, and evidence traceability across all MVPs.
            </p>
          </div>
        </div>

        <EvidenceCommandBoard />
      </div>
    </div>
  );
}
