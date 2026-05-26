import { NextResponse } from "next/server";
import { runForensicAnalysis } from "@/lib/ai/forensic-service";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const url = formData.get("url");
    const file = formData.get("file");
    const options = formData.get("options");

    const result = await runForensicAnalysis({
      type: "c2pa_verification",
      url: typeof url === "string" ? url : undefined,
      file: file instanceof File ? file : undefined,
      options: typeof options === "string" ? JSON.parse(options) : undefined,
    });

    return NextResponse.json({
      ...result,
      // rawManifest is passed through from the c2patool backend when available
    });
  } catch (error) {
    console.error("Forensic C2PA route error:", error);
    return NextResponse.json({ error: "C2PA verification failed." }, { status: 500 });
  }
}
