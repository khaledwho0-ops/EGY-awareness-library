import Link from "next/link";
import { BrainCircuit, Microscope } from "lucide-react";
import { EvidenceCommandBoard } from "@/components/science/evidence-command-board";
import { ScientificIntelligenceCenter } from "@/components/research/scientific-intelligence-center";

export default function SciencePage() {
  return (
    <div style={{ paddingTop: "var(--navbar-height)" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <Microscope size={28} style={{ color: "var(--accent-cta)" }} />
          <div>
            <h1 style={{ fontSize: "var(--font-h2)" }}>
              <span className="text-gradient">Science Hub</span>
            </h1>
            <p style={{ color: "var(--text-muted)", margin: 0 }}>
              Egypt-facing evidence, trust logic, risk audiences, flag families, update methods, and a concrete awareness standard.
            </p>
          </div>
        </div>

        <section
          style={{
            marginBottom: 24,
            border: "1px solid var(--border-primary)",
            borderRadius: 24,
            padding: 24,
            background:
              "radial-gradient(circle at top right, color-mix(in srgb, var(--accent-cta) 14%, transparent) 0%, transparent 32%), linear-gradient(180deg, color-mix(in srgb, var(--bg-elevated) 95%, white 5%) 0%, color-mix(in srgb, var(--bg-card) 98%, transparent) 100%)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <BrainCircuit size={22} style={{ color: "var(--accent-cta)" }} />
            <strong>Project Vision & Cognition Framework</strong>
          </div>
          <p style={{ margin: "0 0 14px", color: "var(--text-secondary)", lineHeight: 1.75 }}>
            The full CHUNK 7 route now lives here: 14 named cognitive biases, Egyptian misinformation patterns, and
            the verified quote set used to frame the project’s awareness logic.
          </p>
          <Link
            href="/project-vision"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 18px",
              borderRadius: 999,
              background: "var(--accent-cta)",
              color: "var(--text-inverse)",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Open the framework
          </Link>
        </section>

        <EvidenceCommandBoard />
        <ScientificIntelligenceCenter />
      </div>
    </div>
  );
}
