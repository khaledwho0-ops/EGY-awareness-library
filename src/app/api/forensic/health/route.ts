import { NextResponse } from "next/server";
import { hasForensicBackend } from "@/lib/ai/forensic-service";

const FORENSIC_BASE_URL = process.env.FORENSIC_BACKEND_URL;

export async function GET() {
  if (!hasForensicBackend() || !FORENSIC_BASE_URL) {
    return NextResponse.json({
      status: "ok",
      mode: "fallback",
      exiftool: "unavailable",
      c2patool: "unavailable",
    });
  }

  try {
    const response = await fetch(`${FORENSIC_BASE_URL.replace(/\/$/, "")}/health`, {
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      return NextResponse.json({
        status: "degraded",
        mode: "backend-unreachable",
        exiftool: "unknown",
        c2patool: "unknown",
      });
    }

    const data = await response.json();
    return NextResponse.json({
      status: "ok",
      mode: "backend",
      exiftool: data.exiftool ?? "unknown",
      c2patool: data.c2patool ?? "unknown",
    });
  } catch {
    return NextResponse.json({
      status: "degraded",
      mode: "backend-error",
      exiftool: "unknown",
      c2patool: "unknown",
    });
  }
}
