import { anonymizeParticipantEntities } from "@/lib/research/anonymization";
import type { TrustCalibrationProfile } from "@/lib/scoring/trust-calibration";

export interface ParticipantRecord {
  participantId: string;
  groupAllocation: "intervention" | "waitlist";
  demographics: {
    age?: number;
    gender?: string;
    educationYear?: number;
    faculty?: string;
    priorDigitalLiteracy?: number;
    religiousAffiliation?: string;
  };
  assessments: {
    mist20Pre?: { total: number; realDetection: number; fakeDetection: number; naivete: number; distrust: number };
    mist20Post?: { total: number; realDetection: number; fakeDetection: number; naivete: number; distrust: number };
    mhlsPre?: { total: number; recognition: number; riskFactors: number; selfHelp: number; professionalHelp: number; attitudes: number };
    mhlsPost?: { total: number; recognition: number; riskFactors: number; selfHelp: number; professionalHelp: number; attitudes: number };
    rcoPre?: { positive: number; negative: number };
    rcoPost?: { positive: number; negative: number };
    ghsqPre?: { peMean: number; siMean: number };
    ghsqPost?: { peMean: number; siMean: number };
    susPost?: number;
    mcSdsPre?: number;
  };
  trustCalibration: {
    pre?: TrustCalibrationProfile;
    post?: TrustCalibrationProfile;
  };
  engagement: {
    exercisesCompleted: number;
    totalExercises: number;
    completionRate: number;
    averageTimePerExercise: number;
    totalTimeMinutes: number;
    streakDays: number;
    sourceClicks: number;
    promptUsage: number;
    verificationActions: number;
  };
  confidenceShifts: Array<{
    exerciseId: string;
    day: number;
    mvp: string;
    preConfidence: number;
    postConfidence: number;
    shift: number;
  }>;
  timestamps: {
    enrolled: string;
    preAssessmentCompleted?: string;
    postAssessmentCompleted?: string;
    lastActivity?: string;
  };
}

function csvEscape(value: string | number): string {
  const stringValue = String(value);
  return stringValue.includes(",") || stringValue.includes('"')
    ? `"${stringValue.replace(/"/g, '""')}"`
    : stringValue;
}

export async function generateResearchCSV(participants: ParticipantRecord[]): Promise<string> {
  const exportSafeParticipants = await anonymizeParticipantEntities(participants);
  const headers = [
    "participant_id", "group",
    "age", "gender", "education_year", "faculty", "prior_digital_literacy", "religious_affiliation",
    "mist20_pre_total", "mist20_pre_real", "mist20_pre_fake", "mist20_pre_naivete", "mist20_pre_distrust",
    "mist20_post_total", "mist20_post_real", "mist20_post_fake", "mist20_post_naivete", "mist20_post_distrust",
    "mhls_pre_total", "mhls_pre_recognition", "mhls_pre_risk", "mhls_pre_selfhelp", "mhls_pre_prof", "mhls_pre_attitudes",
    "mhls_post_total", "mhls_post_recognition", "mhls_post_risk", "mhls_post_selfhelp", "mhls_post_prof", "mhls_post_attitudes",
    "rcope_pre_positive", "rcope_pre_negative",
    "rcope_post_positive", "rcope_post_negative",
    "ghsq_pre_pe_mean", "ghsq_pre_si_mean",
    "ghsq_post_pe_mean", "ghsq_post_si_mean",
    "sus_post", "mcsds_pre",
    "tce_pre", "afs_pre", "aoi_pre", "ets_pre", "ctcs_pre",
    "tce_post", "afs_post", "aoi_post", "ets_post", "ctcs_post",
    "exercises_completed", "total_exercises", "completion_rate",
    "avg_time_per_exercise_min", "total_time_min", "streak_days",
    "source_clicks", "prompt_usage", "verification_actions",
    "avg_confidence_shift",
    "enrolled_at", "pre_assessment_at", "post_assessment_at", "last_activity_at",
  ];

  const rows = exportSafeParticipants.map((participant) => {
    const avgConfidenceShift = participant.confidenceShifts.length > 0
      ? participant.confidenceShifts.reduce((sum, entry) => sum + entry.shift, 0) / participant.confidenceShifts.length
      : "";

    return [
      participant.participantId, participant.groupAllocation,
      participant.demographics.age ?? "", participant.demographics.gender ?? "", participant.demographics.educationYear ?? "",
      participant.demographics.faculty ?? "", participant.demographics.priorDigitalLiteracy ?? "", participant.demographics.religiousAffiliation ?? "",
      participant.assessments.mist20Pre?.total ?? "", participant.assessments.mist20Pre?.realDetection ?? "",
      participant.assessments.mist20Pre?.fakeDetection ?? "", participant.assessments.mist20Pre?.naivete ?? "", participant.assessments.mist20Pre?.distrust ?? "",
      participant.assessments.mist20Post?.total ?? "", participant.assessments.mist20Post?.realDetection ?? "",
      participant.assessments.mist20Post?.fakeDetection ?? "", participant.assessments.mist20Post?.naivete ?? "", participant.assessments.mist20Post?.distrust ?? "",
      participant.assessments.mhlsPre?.total ?? "", participant.assessments.mhlsPre?.recognition ?? "",
      participant.assessments.mhlsPre?.riskFactors ?? "", participant.assessments.mhlsPre?.selfHelp ?? "",
      participant.assessments.mhlsPre?.professionalHelp ?? "", participant.assessments.mhlsPre?.attitudes ?? "",
      participant.assessments.mhlsPost?.total ?? "", participant.assessments.mhlsPost?.recognition ?? "",
      participant.assessments.mhlsPost?.riskFactors ?? "", participant.assessments.mhlsPost?.selfHelp ?? "",
      participant.assessments.mhlsPost?.professionalHelp ?? "", participant.assessments.mhlsPost?.attitudes ?? "",
      participant.assessments.rcoPre?.positive ?? "", participant.assessments.rcoPre?.negative ?? "",
      participant.assessments.rcoPost?.positive ?? "", participant.assessments.rcoPost?.negative ?? "",
      participant.assessments.ghsqPre?.peMean ?? "", participant.assessments.ghsqPre?.siMean ?? "",
      participant.assessments.ghsqPost?.peMean ?? "", participant.assessments.ghsqPost?.siMean ?? "",
      participant.assessments.susPost ?? "", participant.assessments.mcSdsPre ?? "",
      participant.trustCalibration.pre?.tce ?? "", participant.trustCalibration.pre?.afs ?? "",
      participant.trustCalibration.pre?.aoi ?? "", participant.trustCalibration.pre?.ets ?? "", participant.trustCalibration.pre?.ctcs ?? "",
      participant.trustCalibration.post?.tce ?? "", participant.trustCalibration.post?.afs ?? "",
      participant.trustCalibration.post?.aoi ?? "", participant.trustCalibration.post?.ets ?? "", participant.trustCalibration.post?.ctcs ?? "",
      participant.engagement.exercisesCompleted, participant.engagement.totalExercises, participant.engagement.completionRate,
      participant.engagement.averageTimePerExercise, participant.engagement.totalTimeMinutes, participant.engagement.streakDays,
      participant.engagement.sourceClicks, participant.engagement.promptUsage, participant.engagement.verificationActions,
      avgConfidenceShift,
      participant.timestamps.enrolled, participant.timestamps.preAssessmentCompleted ?? "",
      participant.timestamps.postAssessmentCompleted ?? "", participant.timestamps.lastActivity ?? "",
    ].map(csvEscape).join(",");
  });

  return [headers.join(","), ...rows].join("\n");
}

export async function generateResearchJSON(participants: ParticipantRecord[]): Promise<string> {
  const exportSafeParticipants = await anonymizeParticipantEntities(participants);

  return JSON.stringify({
    exportVersion: "1.1",
    exportedAt: new Date().toISOString(),
    framework: "Egyptian Awareness Library Master Framework §5.3",
    softwareCompatibility: ["SPSS v28", "R", "Python/pandas"],
    participantCount: exportSafeParticipants.length,
    variables: 52,
    anonymized: true,
    data: exportSafeParticipants,
  }, null, 2);
}

export function collectCurrentParticipantData(): Partial<ParticipantRecord> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const progress = JSON.parse(localStorage.getItem("eal-progress") || "{}");
    const assessments = JSON.parse(localStorage.getItem("eal-assessments") || "{}");
    const trustCal = JSON.parse(localStorage.getItem("eal-trust-calibration") || "{}");
    const confidence = JSON.parse(localStorage.getItem("eal-confidence-shifts") || "[]");
    const analytics = JSON.parse(localStorage.getItem("eal-analytics") || "{}");

    return {
      participantId: localStorage.getItem("eal-participant-id") || `P-${Date.now()}`,
      groupAllocation: "intervention",
      assessments,
      trustCalibration: trustCal,
      engagement: {
        exercisesCompleted: progress.completedCount || 0,
        totalExercises: 42,
        completionRate: ((progress.completedCount || 0) / 42) * 100,
        averageTimePerExercise: analytics.avgTimePerExercise || 0,
        totalTimeMinutes: analytics.totalTimeMinutes || 0,
        streakDays: progress.streak || 0,
        sourceClicks: analytics.sourceClicks || 0,
        promptUsage: analytics.promptUsage || 0,
        verificationActions: analytics.verificationActions || 0,
      },
      confidenceShifts: confidence,
      timestamps: {
        enrolled: progress.enrolledAt || new Date().toISOString(),
        lastActivity: progress.lastActivity,
      },
    };
  } catch {
    return {};
  }
}

export function buildCurrentParticipantRecord(): ParticipantRecord {
  const partial = collectCurrentParticipantData();

  return {
    participantId: partial.participantId ?? `P-${Date.now()}`,
    groupAllocation: partial.groupAllocation ?? "intervention",
    demographics: partial.demographics ?? {},
    assessments: partial.assessments ?? {},
    trustCalibration: partial.trustCalibration ?? {},
    engagement: partial.engagement ?? {
      exercisesCompleted: 0,
      totalExercises: 42,
      completionRate: 0,
      averageTimePerExercise: 0,
      totalTimeMinutes: 0,
      streakDays: 0,
      sourceClicks: 0,
      promptUsage: 0,
      verificationActions: 0,
    },
    confidenceShifts: (partial.confidenceShifts ?? []).map((entry) => ({
      exerciseId: entry.exerciseId,
      day: entry.day,
      mvp: entry.mvp,
      preConfidence: "preConfidence" in entry ? entry.preConfidence : (entry as { preCOnfidence?: number }).preCOnfidence ?? 0,
      postConfidence: entry.postConfidence,
      shift: entry.shift,
    })),
    timestamps: {
      enrolled: partial.timestamps?.enrolled ?? new Date().toISOString(),
      preAssessmentCompleted: partial.timestamps?.preAssessmentCompleted,
      postAssessmentCompleted: partial.timestamps?.postAssessmentCompleted,
      lastActivity: partial.timestamps?.lastActivity,
    },
  };
}
