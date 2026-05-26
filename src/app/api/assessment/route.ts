import { NextResponse } from "next/server";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { ERR, apiError } from "@/lib/api/api-error";
import { hashParticipantId } from "@/lib/research/anonymization";

/**
 * Assessment Data Persistence API
 * 
 * Implements the Day 0 → Day 15 comparative metrics required by the
 * N=84 research protocol (§5.3, §16.2).
 *
 * GET  — Retrieve all assessment records for a participant
 * POST — Submit a new assessment completion record
 *
 * Data is persisted to .runtime/assessments/ as anonymized JSON files.
 * Each participant gets one file keyed by hashed ID.
 */

const RUNTIME_DIR = path.join(process.cwd(), ".runtime", "assessments");

interface AssessmentRecord {
  instrumentId: string;
  phase: "pre" | "post";
  completedAt: string;
  scores: Record<string, number>;
  duration: number;
  participantHash: string;
  metadata?: {
    language: string;
    userAgent?: string;
  };
}

interface ParticipantAssessmentFile {
  participantHash: string;
  records: AssessmentRecord[];
  createdAt: string;
  updatedAt: string;
}

function ensureDir() {
  if (!existsSync(RUNTIME_DIR)) {
    mkdirSync(RUNTIME_DIR, { recursive: true });
  }
}

function getParticipantFilePath(hash: string) {
  return path.join(RUNTIME_DIR, `${hash}.json`);
}

function readParticipantFile(hash: string): ParticipantAssessmentFile {
  const filePath = getParticipantFilePath(hash);
  if (!existsSync(filePath)) {
    return {
      participantHash: hash,
      records: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch {
    return {
      participantHash: hash,
      records: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}

function writeParticipantFile(data: ParticipantAssessmentFile) {
  ensureDir();
  data.updatedAt = new Date().toISOString();
  writeFileSync(getParticipantFilePath(data.participantHash), JSON.stringify(data, null, 2), "utf8");
}

// ─── GET: Retrieve assessment records ───────────────────────────
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pid = searchParams.get("pid");

  if (!pid) {
    return ERR.invalidPayload();
  }

  const hash = hashParticipantId(pid);
  const file = readParticipantFile(hash);

  // Build Day 0 vs Day 15 comparison if both pre and post exist
  const preRecords = file.records.filter((r) => r.phase === "pre");
  const postRecords = file.records.filter((r) => r.phase === "post");

  const comparison: Record<string, { pre?: Record<string, number>; post?: Record<string, number>; delta?: Record<string, number> }> = {};

  for (const pre of preRecords) {
    comparison[pre.instrumentId] = { pre: pre.scores };
  }
  for (const post of postRecords) {
    if (!comparison[post.instrumentId]) {
      comparison[post.instrumentId] = {};
    }
    comparison[post.instrumentId].post = post.scores;

    // Calculate deltas if pre exists
    const preScores = comparison[post.instrumentId].pre;
    if (preScores) {
      const delta: Record<string, number> = {};
      for (const key of Object.keys(post.scores)) {
        if (key in preScores) {
          delta[key] = Number((post.scores[key] - preScores[key]).toFixed(2));
        }
      }
      comparison[post.instrumentId].delta = delta;
    }
  }

  return NextResponse.json({
    ok: true,
    participantHash: hash,
    recordCount: file.records.length,
    records: file.records,
    comparison,
    createdAt: file.createdAt,
    updatedAt: file.updatedAt,
  });
}

// ─── POST: Submit assessment record ─────────────────────────────
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      pid?: string;
      instrumentId?: string;
      phase?: "pre" | "post";
      scores?: Record<string, number>;
      duration?: number;
      language?: string;
    };

    if (!body.pid || !body.instrumentId || !body.phase || !body.scores || body.duration === undefined) {
      return ERR.invalidPayload();
    }

    const VALID_PHASES = new Set(["pre", "post"]);
    if (!VALID_PHASES.has(body.phase)) {
      return apiError(400, "INVALID_PHASE", "المرحلة غير صالحة. اختر قبلي أو بعدي.", "Invalid phase. Choose pre or post.");
    }

    const VALID_INSTRUMENTS = new Set(["mist20", "mhls", "brief-rcope", "ghsq", "sus", "mc-sds"]);
    if (!VALID_INSTRUMENTS.has(body.instrumentId)) {
      return apiError(400, "UNKNOWN_INSTRUMENT", "أداة القياس غير معروفة.", "Unknown assessment instrument.");
    }

    const hash = hashParticipantId(body.pid);
    const file = readParticipantFile(hash);

    const record: AssessmentRecord = {
      instrumentId: body.instrumentId,
      phase: body.phase,
      completedAt: new Date().toISOString(),
      scores: body.scores,
      duration: body.duration,
      participantHash: hash,
      metadata: {
        language: body.language ?? "english",
      },
    };

    // Replace existing record for same instrument+phase, or append
    const existingIndex = file.records.findIndex(
      (r) => r.instrumentId === body.instrumentId && r.phase === body.phase
    );

    if (existingIndex >= 0) {
      file.records[existingIndex] = record;
    } else {
      file.records.push(record);
    }

    writeParticipantFile(file);

    return NextResponse.json({
      ok: true,
      participantHash: hash,
      instrumentId: body.instrumentId,
      phase: body.phase,
      recordCount: file.records.length,
      message: "تم حفظ نتيجة التقييم بنجاح.",
      messageEn: "Assessment result saved successfully.",
    });
  } catch (err) {
    console.error("[Assessment POST Error]", err);
    return apiError(500, "ASSESSMENT_SAVE_FAILED", "حدث خطأ أثناء حفظ نتيجة التقييم.", "Failed to save assessment result.", "RETRY");
  }
}
