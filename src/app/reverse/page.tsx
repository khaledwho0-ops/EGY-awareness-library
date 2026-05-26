import Link from "next/link";
import { Cpu, ShieldCheck, HeartPulse, Sparkles } from "lucide-react";
import { BranchingVisualExperience } from "@/components/interactive/branching-visual-experience";
import { ModuleCommandCenter } from "@/components/science/module-command-center";

export default function ReversePage() {
  return (
    <div style={{ paddingTop: "var(--navbar-height)" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <Cpu size={28} style={{ color: "var(--accent-cta)" }} />
          <div>
            <h1 style={{ fontSize: "var(--font-h2)" }}>
              <span className="text-gradient">Reverse Engineering Mode</span>
            </h1>
            <p style={{ color: "var(--text-muted)", margin: 0 }}>
              Break down manipulation mechanics across truth, mental-health harm, and religious coercion before they capture judgment.
            </p>
          </div>
        </div>

        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginBottom: "var(--space-xl)" }}>
          <Link href="/deepreal" className="glass-card no-underline" style={{ padding: "var(--space-lg)", color: "inherit" }}>
            <ShieldCheck size={20} style={{ color: "var(--accent-deepreal)", marginBottom: 10 }} />
            <strong style={{ display: "block", marginBottom: 6 }}>DeepReal reverse</strong>
            <span style={{ color: "var(--text-muted)" }}>Map the tactic chain behind rumors, edited clips, and false certainty.</span>
          </Link>
          <Link href="/mental-health" className="glass-card no-underline" style={{ padding: "var(--space-lg)", color: "inherit" }}>
            <HeartPulse size={20} style={{ color: "var(--accent-mentalhealth)", marginBottom: 10 }} />
            <strong style={{ display: "block", marginBottom: 6 }}>Mental Health reverse</strong>
            <span style={{ color: "var(--text-muted)" }}>Expose identity capture, stigma loops, and support-blocking patterns.</span>
          </Link>
          <Link href="/religion-hub" className="glass-card no-underline" style={{ padding: "var(--space-lg)", color: "inherit" }}>
            <Sparkles size={20} style={{ color: "var(--accent-religionhub)", marginBottom: 10 }} />
            <strong style={{ display: "block", marginBottom: 6 }}>Religion Hub reverse</strong>
            <span style={{ color: "var(--text-muted)" }}>Track where moderation disappears and coercion enters the message.</span>
          </Link>
        </div>

        <div style={{ marginBottom: "var(--space-2xl)" }}>
          <BranchingVisualExperience />
        </div>

        <ModuleCommandCenter module="deepreal" initialTab="reverse" />
        <ModuleCommandCenter module="mental-health" initialTab="reverse" />
        <ModuleCommandCenter module="religion-hub" initialTab="reverse" />
      </div>
    </div>
  );
}
