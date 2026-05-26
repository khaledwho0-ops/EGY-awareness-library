import { NextResponse } from "next/server";
import { runForensicAnalysis } from "@/lib/ai/forensic-service";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const url = formData.get("url");
    const file = formData.get("file");
    const options = formData.get("options");

    const result = await runForensicAnalysis({
      type: "audio_analysis",
      url: typeof url === "string" ? url : undefined,
      file: file instanceof File ? file : undefined,
      options: typeof options === "string" ? JSON.parse(options) : undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Forensic audio route error:", error);
    return NextResponse.json({ error: "Audio forensic analysis failed." }, { status: 500 });
  }
}
