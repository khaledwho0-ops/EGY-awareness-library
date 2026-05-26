"use client";

import { useMemo, useState, useSyncExternalStore, type ChangeEvent } from "react";
import {
  Activity,
  BarChart3,
  Cpu,
  Download,
  FileUp,
  FileDown,
  Shield,
  ShieldCheck,
  Trash2,
  TrendingUp,
  AlertTriangle,
  Database,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { downloadDefensePack } from "@/lib/analytics/defense-pack";
import {
  buildSupervisorAnalytics,
  getCurrentParticipantSnapshot,
  getResearchCohort,
  importParticipantJsonText,
  removeParticipantSnapshot,
  upsertParticipantSnapshot,
  type ParticipantSnapshot,
} from "@/lib/research/research-ops";
import { getProviderStatuses } from "@/lib/ai/llm-provider";
import { ResearchGovernancePanel } from "@/components/admin/research-governance-panel";
import { ResearchProtocolPanel } from "@/components/admin/research-protocol-panel";
import { SourceCommandCenter } from "@/components/admin/source-command-center";
import { useRTL } from "@/components/shared/rtl-provider";

function SummaryCard({
  label,
  value,
  sublabel,
}: {
  label: string;
  value: string | number;
  sublabel: string;
}) {
  return (
    <div className="glass-card" style={{ padding: 20 }}>
      <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 34, fontWeight: 800, fontFamily: "'Clash Display', sans-serif" }}>{value}</div>
      <div style={{ fontSize: 11, color: "var(--text-caption)" }}>{sublabel}</div>
    </div>
  );
}

function MetricList({
  title,
  rows,
}: {
  title: string;
  rows: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
      <h3 style={{ marginBottom: 12 }}>{title}</h3>
      <div style={{ display: "grid", gap: 10 }}>
        {rows.map((row) => (
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", gap: 16, fontSize: 13 }}>
            <span style={{ color: "var(--text-muted)" }}>{row.label}</span>
            <strong>{row.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SupervisorDashboard() {
  const [cohort, setCohort] = useState<ParticipantSnapshot[]>(() => getResearchCohort());
  const [activeSection, setActiveSection] = useState("overview");
  const [importError, setImportError] = useState<string | null>(null);
  const chartsReady = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const analytics = useMemo(() => buildSupervisorAnalytics(cohort), [cohort]);
  const { isRTL, t } = useRTL();
  const a = isRTL;

  const sections = [
    { id: "overview", label: "Overview", icon: <BarChart3 size={16} /> },
    { id: "protocol", label: "Protocol", icon: <FileDown size={16} /> },
    { id: "cohort", label: "Cohort Ops", icon: <Database size={16} /> },
    { id: "engines", label: "Engine Analytics", icon: <Activity size={16} /> },
    { id: "hypotheses", label: "Hypothesis Tests", icon: <TrendingUp size={16} /> },
    { id: "governance", label: "Governance", icon: <ShieldCheck size={16} /> },
    { id: "sources", label: "Source Ops", icon: <Shield size={16} /> },
    { id: "exports", label: "Exports & Systems", icon: <FileDown size={16} /> },
  ];

  const handleSaveCurrentBrowser = () => {
    const updated = upsertParticipantSnapshot(getCurrentParticipantSnapshot());
    setCohort([...updated]);
    setImportError(null);
  };

  const handleFilesImported = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) {
      return;
    }

    try {
      const payloads = await Promise.all(files.map((file) => file.text()));
      let updated = cohort;

      payloads.forEach((payload) => {
        const snapshots = importParticipantJsonText(payload);
        snapshots.forEach((snapshot) => {
          updated = upsertParticipantSnapshot(snapshot);
        });
      });

      setCohort([...updated]);
      setImportError(null);
    } catch (error) {
      setImportError(error instanceof Error ? error.message : "Import failed.");
    } finally {
      event.target.value = "";
    }
  };

  const handleRemoveParticipant = (participantId: string) => {
    const updated = removeParticipantSnapshot(participantId);
    setCohort([...updated]);
  };

  const engineChartData = [
    {
      name: "DeepReal",
      active: analytics.engines.deepreal.activeParticipants,
      completed: analytics.engines.deepreal.completedParticipants,
    },
    {
      name: "Mental Health",
      active: analytics.engines.mentalHealth.activeParticipants,
      completed: analytics.engines.mentalHealth.completedParticipants,
    },
    {
      name: "Religion Hub",
      active: analytics.engines.religionHub.activeParticipants,
      completed: analytics.engines.religionHub.completedParticipants,
    },
  ];

  const interventionChartData = [
    { name: "Source opens", value: analytics.interventions.sourceOpens, color: "#0f766e" },
    { name: "Prompt uses", value: analytics.interventions.promptUses, color: "#2563eb" },
    { name: "Verified", value: analytics.interventions.verificationCompleted, color: "#16a34a" },
    { name: "Skipped", value: analytics.interventions.verificationSkipped, color: "#f59e0b" },
  ];

  return (
    <div className="layout-shell">
      <aside className="layout-sidebar" style={{ paddingTop: 80 }}>
        <div style={{ padding: "var(--space-lg)" }}>
          <h4 style={{ fontSize: 14, marginBottom: 16, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {t({ en: "Research Ops", ar: "عمليات البحث", arEG: "عمليات البحث" })}
          </h4>
          <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "none",
                  background: activeSection === section.id ? "var(--accent-cta)" : "transparent",
                  color: activeSection === section.id ? "white" : "var(--text-secondary)",
                  fontSize: 13,
                  fontWeight: activeSection === section.id ? 600 : 400,
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                {section.icon}
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="layout-content" style={{ padding: "var(--space-xl)" }}>
        {activeSection === "overview" && (
          <div>
            <h2 style={{ marginBottom: 24 }}>{t({ en: "Research overview", ar: "نظرة عامة على البحث", arEG: "نظرة عامة على البحث" })}</h2>
            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", marginBottom: 24 }}>
              <SummaryCard label="Participants in cohort" value={analytics.totalParticipants} sublabel="Imported or saved participant snapshots" />
              <SummaryCard label="Completion rate" value={`${analytics.completionRate}%`} sublabel="Participants who completed all 42 exercises" />
              <SummaryCard label="Average SUS" value={analytics.avgSUS ?? "N/A"} sublabel="Post-test usability average" />
              <SummaryCard label="SUS pass rate" value={analytics.susPassRate !== null ? `${analytics.susPassRate}%` : "N/A"} sublabel="Participants at or above SUS 68" />
            </div>

            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
              <MetricList
                title="Matched pre/post pairs"
                rows={[
                  { label: "MIST-20", value: String(analytics.matchedPairCounts.mist) },
                  { label: "MHLS", value: String(analytics.matchedPairCounts.mhls) },
                  { label: "GHSQ", value: String(analytics.matchedPairCounts.ghsq) },
                  { label: "Brief RCOPE", value: String(analytics.matchedPairCounts.rcope) },
                  { label: "SUS post-tests", value: String(analytics.matchedPairCounts.sus) },
                ]}
              />
              <MetricList
                title="Intervention activity"
                rows={[
                  { label: "Source opens", value: String(analytics.interventions.sourceOpens) },
                  { label: "Prompt uses", value: String(analytics.interventions.promptUses) },
                  { label: "Verification completed", value: String(analytics.interventions.verificationCompleted) },
                  { label: "Verification skipped", value: String(analytics.interventions.verificationSkipped) },
                  { label: "Correction entries", value: String(analytics.interventions.correctionEntries) },
                ]}
              />
            </div>

            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", marginTop: 24 }}>
              <div className="glass-card" style={{ padding: "var(--space-xl)", minHeight: 320, minWidth: 0 }}>
                <h3 style={{ marginBottom: 12 }}>Engine completion picture</h3>
                <div style={{ height: 240 }}>
                  {chartsReady ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={engineChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" />
                        <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                        <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="active" fill="#2563eb" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="completed" fill="#16a34a" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div style={{ color: "var(--text-muted)", fontSize: 13 }}>Chart loading…</div>
                  )}
                </div>
              </div>

              <div className="glass-card" style={{ padding: "var(--space-xl)", minHeight: 320, minWidth: 0 }}>
                <h3 style={{ marginBottom: 12 }}>Intervention load mix</h3>
                <div style={{ height: 240 }}>
                  {chartsReady ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={interventionChartData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={48}
                          outerRadius={84}
                          paddingAngle={2}
                        >
                          {interventionChartData.map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div style={{ color: "var(--text-muted)", fontSize: 13 }}>Chart loading…</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "protocol" && (
          <div>
            <h2 style={{ marginBottom: 20 }}>{t({ en: "Research protocol", ar: "بروتوكول البحث", arEG: "بروتوكول البحث" })}</h2>
            <ResearchProtocolPanel />
          </div>
        )}

        {activeSection === "cohort" && (
          <div>
            <h2 style={{ marginBottom: 20 }}>{t({ en: "Cohort operations", ar: "عمليات الفوج", arEG: "عمليات الفوج" })}</h2>
            <div className="glass-card" style={{ padding: "var(--space-xl)", marginBottom: 20 }}>
              <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 16 }}>
                The dashboard now aggregates real participant exports. Import JSON files exported from the Dashboard page, or save the current browser&apos;s progress snapshot into the cohort store for local pilot analysis.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="btn-secondary" onClick={handleSaveCurrentBrowser}>
                  <Download size={14} /> Save current browser as participant
                </button>
                <label className="btn-secondary" style={{ cursor: "pointer" }}>
                  <FileUp size={14} /> Import participant JSON
                  <input type="file" accept=".json" multiple hidden onChange={handleFilesImported} />
                </label>
              </div>
              {importError && (
                <div className="disclaimer-bar disclaimer-bar-warning" style={{ marginTop: 16 }}>
                  <AlertTriangle size={14} style={{ color: "var(--color-warning)", flexShrink: 0 }} />
                  {importError}
                </div>
              )}
            </div>

            <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
              <h3 style={{ marginBottom: 12 }}>Participant snapshots ({cohort.length})</h3>
              {cohort.length === 0 ? (
                <p style={{ color: "var(--text-muted)" }}>
                  No participant exports imported yet. Start by exporting JSON from the Dashboard page or saving the current browser state.
                </p>
              ) : (
                <div style={{ display: "grid", gap: 10 }}>
                  {cohort.map((participant) => (
                    <div
                      key={participant.participantId}
                      style={{
                        padding: "12px 14px",
                        borderRadius: "var(--radius-md)",
                        background: "var(--bg-secondary)",
                        border: "1px solid var(--border-primary)",
                        display: "grid",
                        gap: 8,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                        <div>
                          <strong>{participant.participantId}</strong>
                          <div style={{ fontSize: 12, color: "var(--text-caption)" }}>
                            {participant.studyArm} · {participant.languageProfile} · captured {participant.capturedAt.slice(0, 10)}
                          </div>
                        </div>
                        <button className="btn-secondary" style={{ fontSize: 12 }} onClick={() => handleRemoveParticipant(participant.participantId)}>
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 12, color: "var(--text-secondary)" }}>
                        <span>Exercises: {participant.exercisesCompleted}</span>
                        <span>Time: {participant.totalTimeMinutes} min</span>
                        <span>MIST shift: {participant.assessments.mistShift ?? "N/A"}</span>
                        <span>MHLS shift: {participant.assessments.mhlsShift ?? "N/A"}</span>
                        <span>RCOPE+ shift: {participant.assessments.rcopePositiveShift ?? "N/A"}</span>
                        <span>SUS: {participant.assessments.susPost ?? "N/A"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeSection === "engines" && (
          <div>
            <h2 style={{ marginBottom: 20 }}>{t({ en: "Engine analytics", ar: "تحليلات المحرك", arEG: "تحليلات المحرك" })}</h2>
            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
              <MetricList
                title="DeepReal"
                rows={[
                  { label: "Active participants", value: String(analytics.engines.deepreal.activeParticipants) },
                  { label: "Completed participants", value: String(analytics.engines.deepreal.completedParticipants) },
                  { label: "Average MIST shift", value: String(analytics.engines.deepreal.avgMistShift ?? "N/A") },
                  { label: "Average veracity shift", value: String(analytics.engines.deepreal.avgVeracityShift ?? "N/A") },
                  { label: "Average naivete shift", value: String(analytics.engines.deepreal.avgNaiveteShift ?? "N/A") },
                  { label: "Average distrust shift", value: String(analytics.engines.deepreal.avgDistrustShift ?? "N/A") },
                ]}
              />
              <MetricList
                title="Mental Health"
                rows={[
                  { label: "Active participants", value: String(analytics.engines.mentalHealth.activeParticipants) },
                  { label: "Completed participants", value: String(analytics.engines.mentalHealth.completedParticipants) },
                  { label: "Average MHLS shift", value: String(analytics.engines.mentalHealth.avgMhlsShift ?? "N/A") },
                  { label: "Average GHSQ shift", value: String(analytics.engines.mentalHealth.avgGhsqShift ?? "N/A") },
                  { label: "Average CTCS", value: String(analytics.engines.mentalHealth.avgCtcs ?? "N/A") },
                  { label: "Average confidence shift", value: String(analytics.engines.mentalHealth.avgConfidenceShift ?? "N/A") },
                ]}
              />
              <MetricList
                title="Religion Hub"
                rows={[
                  { label: "Active participants", value: String(analytics.engines.religionHub.activeParticipants) },
                  { label: "Completed participants", value: String(analytics.engines.religionHub.completedParticipants) },
                  { label: "Average RCOPE+ shift", value: String(analytics.engines.religionHub.avgPositiveCopingShift ?? "N/A") },
                  { label: "Average RCOPE- shift", value: String(analytics.engines.religionHub.avgNegativeCopingShift ?? "N/A") },
                  { label: "Average CTCS", value: String(analytics.engines.religionHub.avgCtcs ?? "N/A") },
                  { label: "Average correction entries", value: String(analytics.engines.religionHub.avgCorrectionEntries ?? "N/A") },
                ]}
              />
            </div>
          </div>
        )}

        {activeSection === "hypotheses" && (
          <div>
            <h2 style={{ marginBottom: 20 }}>{t({ en: "Hypothesis testing", ar: "اختبار الفرضيات", arEG: "اختبار الفرضيات" })}</h2>
            <div className="disclaimer-bar disclaimer-bar-warning" style={{ marginBottom: 16 }}>
              <AlertTriangle size={14} style={{ color: "var(--color-warning)", flexShrink: 0 }} />
              Results are now derived from imported participant snapshots. Bonferroni-adjusted significance is evaluated at p &lt; 0.01 when enough matched data exists.
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {analytics.hypotheses.map((hypothesis) => (
                <div key={hypothesis.id} className="glass-card" style={{ padding: "var(--space-xl)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4 }}>{hypothesis.id}</div>
                      <strong>{hypothesis.label}</strong>
                    </div>
                    <span className="badge" style={{ background: hypothesis.significant ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.12)", color: hypothesis.significant ? "var(--color-success)" : "var(--color-warning)" }}>
                      {hypothesis.significant ? "Significant" : "Needs more data / not significant"}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 18, flexWrap: "wrap", fontSize: 13, color: "var(--text-secondary)", marginBottom: 8 }}>
                    <span>n = {hypothesis.result.n}</span>
                    <span>pre = {hypothesis.result.meanPre ?? "N/A"}</span>
                    <span>post = {hypothesis.result.meanPost ?? "N/A"}</span>
                    <span>shift = {hypothesis.result.meanShift ?? "N/A"}</span>
                    <span>p = {hypothesis.result.pValue ?? "N/A"}</span>
                    <span>d = {hypothesis.result.effectSize ?? "N/A"}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{hypothesis.interpretation}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "governance" && (
          <div>
            <h2 style={{ marginBottom: 20 }}>{t({ en: "Governance and launch gating", ar: "الحوكمة وبوابة الإطلاق", arEG: "الحوكمة وبوابة الإطلاق" })}</h2>
            <ResearchGovernancePanel />
          </div>
        )}

        {activeSection === "sources" && (
          <div>
            <h2 style={{ marginBottom: 20 }}>{t({ en: "Source command center", ar: "مركز قيادة المصادر", arEG: "مركز قيادة المصادر" })}</h2>
            <SourceCommandCenter />
          </div>
        )}

        {activeSection === "exports" && (
          <div>
            <h2 style={{ marginBottom: 20 }}>{t({ en: "Exports and systems", ar: "التصديرات والأنظمة", arEG: "التصديرات والأنظمة" })}</h2>
            <div className="glass-card" style={{ padding: "var(--space-xl)", marginBottom: 20 }}>
              <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
                The defense pack now exports real participant and cohort-derived analytics instead of simulated values.
              </p>
              <button className="btn-export" onClick={downloadDefensePack}>
                <FileDown size={14} /> Download defense pack
              </button>
            </div>

            <div className="glass-card" style={{ padding: "var(--space-xl)" }}>
              <h3 style={{ marginBottom: 12 }}>LLM provider status</h3>
              <div style={{ display: "grid", gap: 8 }}>
                {getProviderStatuses().map((provider) => (
                  <div
                    key={provider.provider}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      padding: "10px 0",
                      borderBottom: "1px solid var(--border-subtle)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Cpu size={14} style={{ color: "var(--text-muted)" }} />
                      <strong style={{ fontSize: 13 }}>{provider.provider}</strong>
                      <span style={{ fontSize: 11, color: "var(--text-caption)" }}>{provider.model}</span>
                    </div>
                    <span className={`provider-status ${provider.available ? "provider-active" : "provider-inactive"}`}>
                      {provider.available ? "Online" : "Offline"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
