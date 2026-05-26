import { NextResponse } from "next/server";
import { analyzeArabicText } from "@/lib/nlp/arabic-analysis";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const text = body?.text;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing 'text' in request body" }, { status: 400 });
    }

    if (text.length > 10000) {
      return NextResponse.json({ error: "Text exceeds maximum length of 10,000 characters" }, { status: 400 });
    }

    const result = await analyzeArabicText(text);

    // If risk flags are detected, add urgent header for client-side crisis panel
    if (result.riskFlags.length > 0) {
      return NextResponse.json(result, {
        headers: { "X-Risk-Detected": "true" },
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Arabic NLP route error:", error);
    return NextResponse.json({ error: "Arabic NLP analysis failed." }, { status: 500 });
  }
}
