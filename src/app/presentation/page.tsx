import { FileText } from "lucide-react";
import { ReportingConsole } from "@/components/science/reporting-console";

export default function PresentationPage() {
  return (
    <div style={{ paddingTop: "var(--navbar-height)" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <FileText size={28} style={{ color: "var(--accent-cta)" }} />
          <div>
            <h1 style={{ fontSize: "var(--font-h2)" }}>
              <span className="text-gradient">Presentation Center</span>
            </h1>
            <p style={{ color: "var(--text-muted)", margin: 0 }}>
              Executive reporting, module progress, and evidence-backed summary output for review and printing.
            </p>
          </div>
        </div>

        <ReportingConsole />
      </div>
    </div>
  );
}
