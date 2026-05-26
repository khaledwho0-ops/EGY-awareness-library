import { NextResponse } from "next/server";
import type { DeepRealGameModeId } from "@/data/research/deepreal-game";
import { answerDeepRealGameRound, getDeepRealGamePayload, resetDeepRealGame } from "@/lib/science/deepreal-game";

const MODES = new Set<DeepRealGameModeId>(["classic", "egy", "pov", "immunity-rumors", "immunity-scams", "immunity-tiktok"]);

function errorResponse(
  status: number,
  errorCode: string,
  messageAr: string,
  messageEn: string,
  recoveryAction?: string
) {
  return NextResponse.json(
    {
      ok: false,
      errorCode,
      message: messageAr,
      messageEn,
      recoveryAction: recoveryAction ?? null,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = (searchParams.get("mode") as DeepRealGameModeId | null) ?? "classic";

    if (!MODES.has(mode)) {
      return errorResponse(
        400,
        "UNKNOWN_GAME_MODE",
        "وضع اللعبة غير معروف. الأوضاع المتاحة: كلاسيك، مصري، المنظور الجديد.",
        "Unknown game mode. Available modes: classic, egy, pov.",
        "SHOW_MODE_SELECTOR"
      );
    }

    const payload = await getDeepRealGamePayload(mode);
    return NextResponse.json(payload);
  } catch (err) {
    console.error("[Game GET Error]", err);
    return errorResponse(
      500,
      "GAME_LOAD_FAILED",
      "تعذر تحميل الساحة. أعد المحاولة.",
      "Failed to load the arena. Please try again.",
      "RETRY"
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      action: "answer" | "reset";
      mode: DeepRealGameModeId;
      choiceId?: string;
    };

    if (!body.mode || !MODES.has(body.mode)) {
      return errorResponse(
        400,
        "UNKNOWN_GAME_MODE",
        "وضع اللعبة غير معروف. الأوضاع المتاحة: كلاسيك، مصري، المنظور الجديد.",
        "Unknown game mode.",
        "SHOW_MODE_SELECTOR"
      );
    }

    if (body.action === "reset") {
      const payload = await resetDeepRealGame(body.mode);
      return NextResponse.json(payload);
    }

    if (body.action !== "answer") {
      return errorResponse(
        400,
        "INVALID_ACTION",
        "إجراء غير صالح. الإجراءات المتاحة: answer، reset.",
        "Invalid action. Available actions: answer, reset."
      );
    }

    if (!body.choiceId) {
      return errorResponse(
        400,
        "MISSING_CHOICE",
        "لم يتم تحديد اختيار. اختر إجابة من الخيارات المتاحة.",
        "No choice selected. Pick an answer from the available options.",
        "SHOW_CHOICES"
      );
    }

    const payload = await answerDeepRealGameRound(body.mode, body.choiceId);
    if (!payload) {
      return errorResponse(
        404,
        "GAME_ROUND_NOT_FOUND",
        "تعذر العثور على الجولة الحالية. سنحاول فتح أول جولة متاحة.",
        "Current round not found. We will try to load the first available round.",
        "LOAD_FIRST_AVAILABLE_ROUND"
      );
    }

    return NextResponse.json(payload);
  } catch (err) {
    console.error("[Game POST Error]", err);
    return errorResponse(
      500,
      "GAME_ACTION_FAILED",
      "حدث خطأ أثناء معالجة إجابتك. أعد المحاولة.",
      "An error occurred while processing your answer. Please try again.",
      "RETRY"
    );
  }
}
