import { NextResponse } from "next/server";
import type { ModuleId } from "@/data/research/module-briefings";
import { evaluateProtocol, getProtocolDefinition, type ProtocolKind } from "@/lib/science/protocol-engine";
import { ERR } from "@/lib/api/api-error";

const MODULES = new Set<ModuleId>(["deepreal", "mental-health", "religion-hub"]);
const KINDS = new Set<ProtocolKind>(["exercises", "rules", "myths", "scenarios", "tricks", "reverse"]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const module = searchParams.get("module") as ModuleId | null;
  const kind = searchParams.get("kind") as ProtocolKind | null;
  const id = searchParams.get("id");

  if (!module || !kind || !id || !MODULES.has(module) || !KINDS.has(kind)) {
    return ERR.invalidPayload();
  }

  const protocol = getProtocolDefinition(module, kind, id);
  if (!protocol) {
    return ERR.notFound("Protocol");
  }

  return NextResponse.json({ protocol });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    module: ModuleId;
    kind: ProtocolKind;
    id: string;
    inputs: Record<string, unknown>;
  };

  if (!MODULES.has(body.module) || !KINDS.has(body.kind) || !body.id) {
    return ERR.invalidPayload();
  }

  const protocol = getProtocolDefinition(body.module, body.kind, body.id);
  const evaluation = evaluateProtocol(body.module, body.kind, body.id, body.inputs ?? {});

  if (!protocol || !evaluation) {
    return ERR.notFound("Protocol");
  }

  return NextResponse.json({ protocol, evaluation });
}
