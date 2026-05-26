"use client";

import {
  buildSupervisorAnalytics,
  getCurrentParticipantSnapshotForExport,
  getResearchCohort,
  type ParticipantSnapshot,
  type StatisticalResult,
} from "@/lib/research/research-ops";

export interface DefensePackData {
  metadata: {
    exportDate: string;
    platform: string;
    version: string;
    sampleSize: number;
    studyDesign: string;
    durationDays: number;
  };
  participantSnapshot: ParticipantSnapshot;
  cohortSummary: ReturnType<typeof buildSupervisorAnalytics>;
}

function formatStat(result: StatisticalResult, kind: "pre" | "post" | "shift" | "p" | "effect"): string {
  if (kind === "pre") return result.meanPre === null ? "N/A" : String(result.meanPre);
  if (kind === "post") return result.meanPost === null ? "N/A" : String(result.meanPost);
  if (kind === "shift") return result.meanShift === null ? "N/A" : String(result.meanShift);
  if (kind === "p") return result.pValue === null ? "N/A" : String(result.pValue);
  return result.effectSize === null ? "N/A" : String(result.effectSize);
}

export async function collectDefenseData(): Promise<DefensePackData> {
  const participantSnapshot = await getCurrentParticipantSnapshotForExport();
  const cohortSummary = buildSupervisorAnalytics(getResearchCohort());

  return {
    metadata: {
      exportDate: new Date().toISOString(),
      platform: "Egyptian Awareness Library",
      version: "2.0.0",
      sampleSize: cohortSummary.totalParticipants,
      studyDesign: "Client-side cohort aggregation from exported participant progress logs",
      durationDays: 14,
    },
    participantSnapshot,
    cohortSummary,
  };
}

export async function exportDefenseCSV(): Promise<string> {
  const data = await collectDefenseData();
  const lines: string[] = [];

  lines.push("EGYPTIAN AWARENESS LIBRARY - DEFENSE DATA EXPORT");
  lines.push(`Date,${data.metadata.exportDate}`);
  lines.push(`Version,${data.metadata.version}`);
  lines.push(`Sample Size,${data.metadata.sampleSize}`);
  lines.push(`Study Design,${data.metadata.studyDesign}`);
  lines.push(`Duration Days,${data.metadata.durationDays}`);
  lines.push("");

  lines.push("CURRENT PARTICIPANT SNAPSHOT");
  lines.push("participant_id,study_arm,language,exercises_completed,total_time_minutes,source_opens,verification_completed,verification_skipped,sus_post,composite_improvement");
  lines.push(
    [
      data.participantSnapshot.participantId,
      data.participantSnapshot.studyArm,
      data.participantSnapshot.languageProfile,
      data.participantSnapshot.exercisesCompleted,
      data.participantSnapshot.totalTimeMinutes,
      data.participantSnapshot.sourceOpens,
      data.participantSnapshot.verificationCompleted,
      data.participantSnapshot.verificationSkipped,
      data.participantSnapshot.assessments.susPost ?? "N/A",
      data.participantSnapshot.assessments.compositeImprovement ?? "N/A",
    ].join(","),
  );
  lines.push("");

  lines.push("COHORT ENGINE SUMMARY");
  lines.push("engine,active_participants,completed_participants,metric_1,metric_2,metric_3,metric_4,metric_5");
  lines.push(
    [
      "deepreal",
      data.cohortSummary.engines.deepreal.activeParticipants,
      data.cohortSummary.engines.deepreal.completedParticipants,
      data.cohortSummary.engines.deepreal.avgMistShift ?? "N/A",
      data.cohortSummary.engines.deepreal.avgVeracityShift ?? "N/A",
      data.cohortSummary.engines.deepreal.avgNaiveteShift ?? "N/A",
      data.cohortSummary.engines.deepreal.avgDistrustShift ?? "N/A",
      data.cohortSummary.engines.deepreal.avgCtcs ?? "N/A",
    ].join(","),
  );
  lines.push(
    [
      "mental_health",
      data.cohortSummary.engines.mentalHealth.activeParticipants,
      data.cohortSummary.engines.mentalHealth.completedParticipants,
      data.cohortSummary.engines.mentalHealth.avgMhlsShift ?? "N/A",
      data.cohortSummary.engines.mentalHealth.avgGhsqShift ?? "N/A",
      data.cohortSummary.engines.mentalHealth.avgCtcs ?? "N/A",
      data.cohortSummary.engines.mentalHealth.avgConfidenceShift ?? "N/A",
      "N/A",
    ].join(","),
  );
  lines.push(
    [
      "religion_hub",
      data.cohortSummary.engines.religionHub.activeParticipants,
      data.cohortSummary.engines.religionHub.completedParticipants,
      data.cohortSummary.engines.religionHub.avgPositiveCopingShift ?? "N/A",
      data.cohortSummary.engines.religionHub.avgNegativeCopingShift ?? "N/A",
      data.cohortSummary.engines.religionHub.avgCtcs ?? "N/A",
      data.cohortSummary.engines.religionHub.avgCorrectionEntries ?? "N/A",
      "N/A",
    ].join(","),
  );
  lines.push("");

  lines.push("HYPOTHESIS RESULTS");
  lines.push("id,label,n,mean_pre,mean_post,mean_shift,p_value,effect_size,significant,interpretation");
  data.cohortSummary.hypotheses.forEach((hypothesis) => {
    lines.push(
      [
        hypothesis.id,
        `"${hypothesis.label}"`,
        hypothesis.result.n,
        formatStat(hypothesis.result, "pre"),
        formatStat(hypothesis.result, "post"),
        formatStat(hypothesis.result, "shift"),
        formatStat(hypothesis.result, "p"),
        formatStat(hypothesis.result, "effect"),
        hypothesis.significant ? "YES" : "NO",
        `"${hypothesis.interpretation}"`,
      ].join(","),
    );
  });
  lines.push("");

  lines.push("SOURCE AND SUPPORT OPERATIONS");
  lines.push("registry_health,pinned_sources,admin_only_sources,missing_urls,missing_backups,directories_confirmed,directories_pending");
  lines.push(
    [
      data.cohortSummary.sourceOps.freshness.healthPercent,
      data.cohortSummary.sourceOps.pinnedSources,
      data.cohortSummary.sourceOps.adminOnlySources,
      data.cohortSummary.sourceOps.missingUrls,
      data.cohortSummary.sourceOps.missingBackups,
      data.cohortSummary.sourceOps.directoriesConfirmed,
      data.cohortSummary.sourceOps.directoriesPending,
    ].join(","),
  );

  return lines.join("\n");
}

export async function downloadDefensePack(): Promise<void> {
  const csv = await exportDefenseCSV();
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `defense_pack_${new Date().toISOString().slice(0, 10)}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function exportDefenseJSON(): Promise<string> {
  return JSON.stringify(await collectDefenseData(), null, 2);
}
