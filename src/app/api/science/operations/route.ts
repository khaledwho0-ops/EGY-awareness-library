import { NextResponse } from "next/server";
import type { ModuleId } from "@/data/research/module-briefings";
import { runModuleOperation } from "@/lib/science/module-operations";

const MODULES = new Set<ModuleId>(["deepreal", "mental-health", "religion-hub"]);

export async function POST(request: Request) {
  const body = (await request.json()) as {
    module: ModuleId;
    input: Record<string, unknown>;
  };

  if (!MODULES.has(body.module)) {
    return NextResponse.json({ error: "Unknown module" }, { status: 400 });
  }

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    result: runModuleOperation(body.module, body.input ?? {}),
  });
}
