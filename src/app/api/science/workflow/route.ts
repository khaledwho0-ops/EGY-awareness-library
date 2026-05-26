import { NextResponse } from "next/server";
import type { ModuleId } from "@/data/research/module-briefings";
import { readWorkflowStore, recordScienceRefresh, updateModuleWorkflow } from "@/lib/science/workflow-store";

const MODULES = new Set<ModuleId>(["deepreal", "mental-health", "religion-hub"]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const module = searchParams.get("module") as ModuleId | null;
  const store = await readWorkflowStore();

  if (module && MODULES.has(module)) {
    return NextResponse.json(store.modules[module]);
  }

  return NextResponse.json(store);
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    module: ModuleId;
    kind: "step" | "rule" | "scenario" | "exercise" | "myth" | "trick" | "reverse" | "guide" | "refresh";
    id?: string;
    checked?: boolean;
  };

  if (!MODULES.has(body.module)) {
    return NextResponse.json({ error: "Unknown module" }, { status: 400 });
  }

  if (body.kind === "refresh") {
    const summary = await recordScienceRefresh(`Refresh requested from ${body.module}`);
    return NextResponse.json({ ok: true, lastRefreshAt: summary.lastRefreshAt });
  }

  if (body.kind === "guide") {
    const nextState = await updateModuleWorkflow(body.module, (state) => ({
      ...state,
      guideSeenAt: new Date().toISOString(),
      guideEmotionKey: body.id ?? state.guideEmotionKey,
    }));
    return NextResponse.json(nextState);
  }

  if (!body.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const itemId = body.id;

  const nextState = await updateModuleWorkflow(body.module, (state) => {
    const checked = body.checked ?? true;
    const listKey =
      body.kind === "step"
        ? "completedStepIds"
        : body.kind === "rule"
          ? "selectedRuleIds"
          : body.kind === "scenario"
            ? "selectedScenarioIds"
            : body.kind === "myth"
              ? "selectedMythIds"
              : body.kind === "trick"
                ? "selectedTrickIds"
                : body.kind === "reverse"
                  ? "selectedReverseIds"
                  : "selectedExerciseIds";

    const nextList = new Set(state[listKey]);
    if (checked) nextList.add(itemId);
    else nextList.delete(itemId);

    return {
      ...state,
      [listKey]: Array.from(nextList),
    };
  });

  return NextResponse.json(nextState);
}
