import { NextResponse } from "next/server";
import { runForensicAnalysis } from "@/lib/ai/forensic-service";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const url = formData.get("url");
    const file = formData.get("file");
    const options = formData.get("options");

    const result = await runForensicAnalysis({
      type: "metadata_extraction",
      url: typeof url === "string" ? url : undefined,
      file: file instanceof File ? file : undefined,
      options: typeof options === "string" ? JSON.parse(options) : undefined,
    });

    return NextResponse.json({
      ...result,
      // rawExif is passed through from the ExifTool backend when available
    });
  } catch (error) {
    console.error("Forensic metadata route error:", error);
    return NextResponse.json({ error: "Metadata extraction failed." }, { status: 500 });
  }
}
