import { NextResponse } from "next/server";
import { getModulePayload } from "@/lib/science/module-service";
import type { ModuleId } from "@/data/research/module-briefings";

const MODULES = new Set<ModuleId>(["deepreal", "mental-health", "religion-hub"]);

export async function GET(
  _request: Request,
  context: { params: Promise<{ module: string }> }
) {
  const { module } = await context.params;

  if (!MODULES.has(module as ModuleId)) {
    return NextResponse.json({ error: "Unknown module" }, { status: 404 });
  }

  const payload = await getModulePayload(module as ModuleId);
  return NextResponse.json(payload);
}
