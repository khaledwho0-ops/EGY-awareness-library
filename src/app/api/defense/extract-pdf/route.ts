import { NextResponse } from 'next/server';

export const runtime = 'edge';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

/**
 * POST /api/defense/extract-pdf
 *
 * Accepts: multipart/form-data with a single 'file' field (PDF only, ≤ 10 MB)
 * Returns: { base64, mimeType, fileName, sizeKb }
 *
 * The returned base64 string can be passed directly to the angry-debunkers
 * route as `pdfBase64` to enable multimodal Gemini analysis.
 */
export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') ?? '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Request must be multipart/form-data' },
        { status: 415 }
      );
    }

    let formData: FormData;
    try {
      formData = await req.formData();
    } catch {
      return NextResponse.json(
        { error: 'Failed to parse multipart form data' },
        { status: 400 }
      );
    }

    const fileField = formData.get('file');
    if (!fileField || typeof fileField === 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid "file" field in form data' },
        { status: 400 }
      );
    }

    const file = fileField as File;

    // ── Validate MIME type ──────────────────────────────────────────────────
    const mimeType = file.type || 'application/pdf';
    if (mimeType !== 'application/pdf') {
      return NextResponse.json(
        { error: `Unsupported file type: ${mimeType}. Only PDF files are accepted.` },
        { status: 422 }
      );
    }

    // ── Validate file size ──────────────────────────────────────────────────
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      return NextResponse.json(
        { error: `File too large: ${sizeMb} MB. Maximum allowed size is 10 MB.` },
        { status: 413 }
      );
    }

    // ── Read and encode ─────────────────────────────────────────────────────
    const arrayBuffer = await file.arrayBuffer();

    // Edge runtime does not have Buffer — use Uint8Array → btoa approach
    const uint8 = new Uint8Array(arrayBuffer);
    let binary = '';
    // Process in chunks to avoid call-stack overflow on large files
    const CHUNK = 8192;
    for (let i = 0; i < uint8.length; i += CHUNK) {
      binary += String.fromCharCode(...uint8.subarray(i, i + CHUNK));
    }
    const base64 = btoa(binary);

    return NextResponse.json({
      base64,
      mimeType,
      fileName: file.name,
      sizeKb: Math.round(file.size / 1024),
    });
  } catch (error: any) {
    console.error('[extract-pdf] Unexpected error:', error);
    return NextResponse.json(
      { error: error?.message ?? 'Internal Server Error' },
      { status: 500 }
    );
  }
}
