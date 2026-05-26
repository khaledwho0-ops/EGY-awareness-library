import { NextResponse } from "next/server";
import { getAllEvidenceOverviews } from "@/lib/science/evidence-store";
import { getJourneyPayload } from "@/lib/science/module-service";

export async function GET() {
  const [journey, evidence] = await Promise.all([getJourneyPayload(), getAllEvidenceOverviews()]);

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    journey,
    evidence,
    summary: {
      primaryModule: journey.primaryModule,
      modulesInProgress: journey.modules.filter((module) => module.routeStatus !== "complete").length,
      completeModules: journey.modules.filter((module) => module.routeStatus === "complete").length,
      evidenceClaims: evidence.reduce((total, module) => total + module.claims.length, 0),
      liveSources: evidence.reduce((total, module) => total + module.sourceHealth.live, 0),
      failedSources: evidence.reduce((total, module) => total + module.sourceHealth.failed, 0),
    },
  });
}
