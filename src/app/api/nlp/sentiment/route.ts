import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "text required" }, { status: 400 });
    }
    const { analyzeSentiment, getSentimentBadge } = await import("@/lib/nlp/sentiment-engine");
    const result = analyzeSentiment(text.trim().slice(0, 2000));
    const badge = getSentimentBadge(result);
    return NextResponse.json({ sentiment: result, badge });
  } catch (err) {
    console.error("[sentiment-api]", err);
    return NextResponse.json({
      sentiment: { label: "neutral", compound: 0, positive: 0, negative: 0, neutral: 1, manipulationScore: 0, emotionalTriggers: [], persuasionPatterns: [], topContributors: [], entities: [], tokenCount: 0, readabilityGrade: 0, crisisDetected: false, crisisConfidence: 0 },
      badge: { label: "Low emotional load", color: "var(--color-success)", bg: "rgba(16,185,129,0.12)", icon: "=" }
    });
  }
}
