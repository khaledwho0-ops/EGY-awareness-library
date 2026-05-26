import { NextResponse } from "next/server";
import type { ModuleId } from "@/data/research/module-briefings";
import { getAllEvidenceOverviews, getEvidenceOverview, getEvidenceSourceDirectory } from "@/lib/science/evidence-store";

const MODULES = new Set<ModuleId>(["deepreal", "mental-health", "religion-hub"]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const module = searchParams.get("module") as ModuleId | null;
  const sourcesOnly = searchParams.get("sources") === "1";

  if (sourcesOnly) {
    const sources = await getEvidenceSourceDirectory();
    return NextResponse.json({ generatedAt: new Date().toISOString(), sources });
  }

  if (module && MODULES.has(module)) {
    return NextResponse.json(await getEvidenceOverview(module));
  }

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    modules: await getAllEvidenceOverviews(),
  });
}
