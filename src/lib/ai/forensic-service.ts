import type { ForensicAnalysisType, ForensicFinding, ForensicResultExtended } from "@/lib/ai/forensic-analysis";

interface ForensicBackendResponse {
  confidence?: number;
  isManipulated?: boolean;
  findings?: ForensicFinding[];
  processingTimeMs?: number;
  model?: string;
  disclaimer?: string;
  /** Raw EXIF JSON returned by ExifTool (metadata_extraction only) */
  rawExif?: Record<string, unknown>;
  /** Raw C2PA manifest returned by c2patool (c2pa_verification only) */
  rawManifest?: Record<string, unknown> | null;
}

interface ForensicRequestPayload {
  type: ForensicAnalysisType;
  url?: string;
  file?: File;
  options?: unknown;
}

const FORENSIC_BASE_URL = process.env.FORENSIC_BACKEND_URL;
const FORENSIC_TOKEN = process.env.FORENSIC_BACKEND_TOKEN;

function buildFallback(type: ForensicAnalysisType, hint?: string): ForensicResultExtended {
  const suspiciousHint = hint?.match(/edit|photoshop|deepfake|viral|breaking|urgent/i);
  const confidence = suspiciousHint ? 41 : 18;
  const findings: Record<ForensicAnalysisType, ForensicFinding[]> = {
    deepfake_image: [
      {
        category: "ELA analysis",
        description: "Fallback mode highlights where compression-level differences would be checked once the Python forensic backend is attached.",
        severity: suspiciousHint ? "warning" : "info",
      },
      {
        category: "Manipulation cues",
        description: suspiciousHint
          ? "The submitted filename or URL contains edit-oriented terms, so this sample should be prioritized for deeper analysis."
          : "No filename-level manipulation cue detected in fallback mode.",
        severity: suspiciousHint ? "warning" : "info",
      },
    ],
    metadata_extraction: [
      {
        category: "EXIF extraction",
        description: "Fallback mode is active. The Python backend with ExifTool will extract capture device, timestamps, GPS, and editing software when connected.",
        severity: "info",
      },
      {
        category: "Content authenticity",
        description: "Connect the analysis-backend Docker service to enable real EXIF metadata extraction via ExifTool.",
        severity: "info",
      },
    ],
    c2pa_verification: [
      {
        category: "Content credentials",
        description: "Fallback mode is active. The Python backend with c2patool will inspect signed C2PA manifests and ingredient chains when connected.",
        severity: "info",
      },
      {
        category: "Publisher trust",
        description: suspiciousHint
          ? "This media should be prioritized for provenance checks because the URL or filename contains edit-oriented cues."
          : "No filename-level provenance cue detected in fallback mode.",
        severity: suspiciousHint ? "warning" : "info",
      },
    ],
    deepfake_video: [
      {
        category: "Frame consistency",
        description: "Fallback mode would normally inspect frame-level face consistency, blink artifacts, and motion boundaries.",
        severity: "info",
      },
      {
        category: "Lip-sync / audio sync",
        description: "Connect the Python backend to perform temporal sync checks and compression-artifact analysis.",
        severity: "info",
      },
    ],
    audio_analysis: [
      {
        category: "Spectral integrity",
        description: "Fallback mode would normally inspect spectral breaks, cloned-voice cues, and unnatural pauses.",
        severity: "info",
      },
      {
        category: "Speaker trust",
        description: "Attach Whisper or another backend model to compare transcript and acoustic consistency.",
        severity: "info",
      },
    ],
  };

  return {
    type,
    confidence,
    isManipulated: Boolean(suspiciousHint),
    findings: findings[type],
    processingTimeMs: 0,
    model: "forensic-fallback",
    disclaimer: FORENSIC_BASE_URL
      ? "Configured backend did not return a valid result. Fallback educational analysis was used instead."
      : "No forensic backend is configured yet. Set FORENSIC_BACKEND_URL to connect to the analysis-backend Docker service.",
  };
}

export function hasForensicBackend(): boolean {
  return Boolean(FORENSIC_BASE_URL);
}

export async function runForensicAnalysis(payload: ForensicRequestPayload): Promise<ForensicResultExtended> {
  const hint = payload.url ?? payload.file?.name;

  if (!FORENSIC_BASE_URL) {
    return buildFallback(payload.type, hint);
  }

  try {
    const formData = new FormData();
    if (payload.url) {
      formData.append("url", payload.url);
    }
    if (payload.file) {
      formData.append("file", payload.file);
    }
    if (payload.options !== undefined) {
      formData.append("options", JSON.stringify(payload.options));
    }

    const response = await fetch(`${FORENSIC_BASE_URL.replace(/\/$/, "")}/${payload.type}`, {
      method: "POST",
      headers: FORENSIC_TOKEN ? { Authorization: `Bearer ${FORENSIC_TOKEN}` } : undefined,
      body: formData,
    });

    if (!response.ok) {
      console.error(`Forensic backend returned ${response.status} for ${payload.type}`);
      return buildFallback(payload.type, hint);
    }

    const data = (await response.json()) as ForensicBackendResponse;

    return {
      type: payload.type,
      confidence: typeof data.confidence === "number" ? data.confidence : 0,
      isManipulated: Boolean(data.isManipulated),
      findings: Array.isArray(data.findings) ? data.findings : [],
      processingTimeMs: typeof data.processingTimeMs === "number" ? data.processingTimeMs : 0,
      model: data.model ?? "forensic-backend",
      disclaimer: data.disclaimer ?? "External forensic backend response.",
      rawExif: data.rawExif,
      rawManifest: data.rawManifest,
    };
  } catch (error) {
    console.error(`Forensic backend connection failed for ${payload.type}:`, error);
    return buildFallback(payload.type, hint);
  }
}
