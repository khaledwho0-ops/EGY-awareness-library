/**
 * FORENSIC ANALYSIS INTEGRATION — Q95
 * Architecture for OpenCV / FFmpeg / Whisper integration
 * Server-side processing to avoid draining user's browser
 * 
 * Framework: §23.1 — Forensic analysis libraries
 * Note: Actual ML models run on backend (FastAPI/Python)
 * This module provides the client-side API interface
 */

export type ForensicAnalysisType = 'deepfake_video' | 'deepfake_image' | 'audio_analysis' | 'metadata_extraction' | 'c2pa_verification';

export interface ForensicRequest {
  type: ForensicAnalysisType;
  mediaUrl?: string;
  mediaFile?: File;
  options?: {
    sensitivity?: 'low' | 'medium' | 'high';
    returnHeatmap?: boolean;
    language?: 'en' | 'ar';
  };
}

export interface ForensicResult {
  type: ForensicAnalysisType;
  confidence: number; // 0-100, how confident the analysis is
  isManipulated: boolean;
  findings: ForensicFinding[];
  processingTimeMs: number;
  model: string;
  disclaimer: string;
}

export interface ForensicEvidenceMap {
  rawExif?: Record<string, unknown>;
  rawManifest?: Record<string, unknown> | null;
}

export type ForensicResultExtended = ForensicResult & ForensicEvidenceMap;

export interface ForensicFinding {
  category: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  region?: { x: number; y: number; width: number; height: number };
}

// API endpoints for backend processing
const FORENSIC_ENDPOINTS: Record<ForensicAnalysisType, string> = {
  deepfake_video: '/api/forensic/video',
  deepfake_image: '/api/forensic/image',
  audio_analysis: '/api/forensic/audio',
  metadata_extraction: '/api/forensic/metadata',
  c2pa_verification: '/api/forensic/c2pa',
};

/**
 * Submit media for forensic analysis
 * Sends to server-side backend (Python FastAPI with OpenCV/FFmpeg/Whisper)
 */
export async function analyzeMedia(request: ForensicRequest): Promise<ForensicResultExtended> {
  const endpoint = FORENSIC_ENDPOINTS[request.type];

  try {
    const formData = new FormData();
    formData.append('type', request.type);
    if (request.mediaFile) {
      formData.append('file', request.mediaFile);
    } else if (request.mediaUrl) {
      formData.append('url', request.mediaUrl);
    }
    if (request.options) {
      formData.append('options', JSON.stringify(request.options));
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error(`Forensic API error: ${res.status}`);
    return await res.json();
  } catch {
    // Return educational fallback when backend is unavailable
    return getEducationalFallback(request.type);
  }
}

/**
 * Educational fallback when forensic backend is unavailable
 * Shows what the analysis WOULD check — useful for defense demonstrations
 */
function getEducationalFallback(type: ForensicAnalysisType): ForensicResultExtended {
  const fallbacks: Record<ForensicAnalysisType, ForensicResultExtended> = {
    deepfake_video: {
      type: 'deepfake_video',
      confidence: 0,
      isManipulated: false,
      findings: [
        { category: 'Face Consistency', description: 'OpenCV analyzes facial landmarks across frames for temporal inconsistencies', severity: 'info' },
        { category: 'Audio-Visual Sync', description: 'FFmpeg extracts audio track for lip-sync analysis against visual frames', severity: 'info' },
        { category: 'Compression Artifacts', description: 'Double-compression detection reveals re-encoding patterns typical of manipulation', severity: 'info' },
      ],
      processingTimeMs: 0,
      model: 'educational-fallback',
      disclaimer: 'Backend forensic service unavailable. Showing educational analysis framework. For real analysis, ensure the Python FastAPI backend is running.',
    },
    deepfake_image: {
      type: 'deepfake_image',
      confidence: 0,
      isManipulated: false,
      findings: [
        { category: 'ELA Analysis', description: 'Error Level Analysis detects areas that were edited at different compression levels', severity: 'info' },
        { category: 'Metadata Check', description: 'EXIF data reveals camera model, GPS, editing software, and modification timestamps', severity: 'info' },
        { category: 'GAN Detection', description: 'Neural network trained to detect GAN-generated faces checks for telltale artifacts', severity: 'info' },
      ],
      processingTimeMs: 0,
      model: 'educational-fallback',
      disclaimer: 'Backend forensic service unavailable. Showing educational analysis framework.',
    },
    audio_analysis: {
      type: 'audio_analysis',
      confidence: 0,
      isManipulated: false,
      findings: [
        { category: 'Voice Cloning Detection', description: 'Whisper transcription + spectral analysis checks for synthetic speech patterns', severity: 'info' },
        { category: 'Splicing Detection', description: 'Abrupt spectral changes indicate potential audio splicing or editing', severity: 'info' },
      ],
      processingTimeMs: 0,
      model: 'educational-fallback',
      disclaimer: 'Backend forensic service unavailable. Showing educational analysis framework.',
    },
    metadata_extraction: {
      type: 'metadata_extraction',
      confidence: 0,
      isManipulated: false,
      findings: [
        { category: 'EXIF Data', description: 'Camera make/model, creation date, GPS coordinates, and software used', severity: 'info' },
        { category: 'Digital Signature', description: 'C2PA/Content Credentials verification for authenticated media', severity: 'info' },
      ],
      processingTimeMs: 0,
      model: 'educational-fallback',
      disclaimer: 'Backend forensic service unavailable. Showing educational analysis framework.',
    },
    c2pa_verification: {
      type: 'c2pa_verification',
      confidence: 0,
      isManipulated: false,
      findings: [
        { category: 'Content credentials', description: 'C2PA checks whether the media includes signed provenance metadata from a trusted publisher or editing workflow.', severity: 'info' },
        { category: 'Manifest chain', description: 'A real verifier would inspect the assertion store, ingredient chain, and signature trust anchors.', severity: 'info' },
      ],
      processingTimeMs: 0,
      model: 'educational-fallback',
      disclaimer: 'Backend provenance verifier unavailable. Showing educational C2PA analysis framework.',
    },
  };

  return fallbacks[type];
}

/**
 * Check if forensic backend is available
 */
export async function isForensicBackendAvailable(): Promise<boolean> {
  try {
    const res = await fetch('/api/forensic/health', { method: 'GET' });
    return res.ok;
  } catch {
    return false;
  }
}
