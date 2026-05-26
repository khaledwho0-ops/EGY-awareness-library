import { NextResponse } from "next/server";
import { syncEvidenceSources } from "@/lib/science/evidence-store";
import { getScienceRefreshSummary, recordScienceRefresh } from "@/lib/science/workflow-store";

export async function GET() {
  const summary = await getScienceRefreshSummary();
  return NextResponse.json(summary);
}

export async function POST() {
  const sync = await syncEvidenceSources();
  const summary = await recordScienceRefresh("Manual source refresh triggered from the command center");

  return NextResponse.json({
    ...summary,
    sync,
  });
}
