/* ═══════════════════════════════════════════════════════════════
 * DEVIL AGENT — THE HOSTILE AUDITOR, INCARNATE
 * Governed by HI CLAUDE/00_PHILOSOPHY_MANHAJ_AL_TATHABBUT.md (§6.4 builder≠auditor,
 * the `consider_opposite` mechanic, adversarial verification).
 *
 * A structured adversary whose job is to REFUTE — a claim OR one of our own
 * outputs. It steelmans the opposition, finds the weakest points, attempts a
 * refutation, names which of the 11 fabrication birth-mechanisms (§4.5) the
 * claim might be, and states what evidence would overturn it.
 *
 * HONESTY BOUNDARY: the Devil produces ADVERSARIAL HYPOTHESES to stress-test a
 * claim — not verified facts. Its output is explicitly framed as "attacks to
 * investigate," never as a grounded verdict. Rifq clause (§4.6): it attacks
 * IDEAS and CLAIMS, never persons.
 * ═══════════════════════════════════════════════════════════════ */

import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

/* The Devil's output shape. We describe it as a JSON contract in the prompt and
 * generate with rotatingGenerateText (works on EVERY provider — not only the few
 * that support json_schema), then parse it ourselves. Same resilience fix as
 * /api/kawwen-waayak: the adversary stays up even when the Gemini slots are busy. */
const SHAPE = `{
  "strongestCounterCase": "the steelmanned case AGAINST the claim — the best argument a smart opponent would make",
  "weakestPoints": ["specific weakest link / unstated assumption / logical gap", "..."],
  "refutationAttempt": "a direct attempt to refute the claim on its own terms",
  "whatWouldOverturnIt": "the concrete evidence that, if found, would overturn the claim (its falsification condition)",
  "suspectedBirthMechanism": "one of: fabricated-default / simulation-as-measurement / mock-on-failure / padding-to-target / overclaimed-integration / status-theater / self-referential-verification / contract-rot / silent-truncation / degenerate-keys / selection-fabrication / none-apparent",
  "survives": "survives | weakened | refuted",
  "devilNote": "one honest line: this is adversarial stress-testing, not a verified verdict"
}`;

function extractJson(text: string): any {
  let t = (text || "").trim();
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) t = fence[1].trim();
  const s = t.indexOf("{");
  const e = t.lastIndexOf("}");
  if (s >= 0 && e > s) t = t.slice(s, e + 1);
  return JSON.parse(t);
}

const str = (x: any) => (x == null ? "" : String(x));
function normalize(d: any) {
  const survives = ["survives", "weakened", "refuted"].includes(d?.survives) ? d.survives : "weakened";
  return {
    strongestCounterCase: str(d?.strongestCounterCase),
    weakestPoints: Array.isArray(d?.weakestPoints) ? d.weakestPoints.map(str).filter(Boolean).slice(0, 8) : [],
    refutationAttempt: str(d?.refutationAttempt),
    whatWouldOverturnIt: str(d?.whatWouldOverturnIt),
    suspectedBirthMechanism: str(d?.suspectedBirthMechanism) || "none-apparent",
    survives,
    devilNote: str(d?.devilNote) || "Adversarial stress-test, not a verified verdict.",
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const claim: string = (body.claim ?? body.query ?? body.text ?? "").toString().trim();
    const ourOutput: string = (body.ourOutput ?? "").toString().trim();
    if (!claim) {
      return NextResponse.json({ error: "Missing 'claim'." }, { status: 400 });
    }

    const system =
      "You are the DEVIL AGENT of موثوق (Mawthooq) — a hostile adversary. Your ONLY job is to attack, refute, and stress-test. Assume the claim is wrong and try hard to prove it. Steelman the opposition; expose the weakest links and hidden assumptions; state exactly what evidence would overturn it. If it looks like a fabrication pattern, name which one. RULES: attack IDEAS and CLAIMS, never people (no insults, no naming individuals). You produce ADVERSARIAL HYPOTHESES to investigate, NOT verified facts — never present your attacks as proven. Answer in the same language as the claim.\n\nOUTPUT FORMAT — CRITICAL: return ONE valid JSON object and NOTHING else (no markdown, no code fences, no commentary), exactly this shape:\n" +
      SHAPE;

    const prompt =
      `CLAIM TO ATTACK: "${claim}"` +
      (ourOutput ? `\n\nOUR OWN OUTPUT TO ATTACK (be twice as hostile to ourselves):\n"${ourOutput}"` : "") +
      `\n\nAttack it. Be relentless but honest — the goal is to find what is weak, not to win. Output JSON only.`;

    let object: ReturnType<typeof normalize> | null = null;
    let provider = "rotator";
    let lastErr = "";
    for (let attempt = 0; attempt < 2 && !object; attempt++) {
      try {
        const { rotatingGenerateText } = await import("@/lib/debunking/gemini-rotator");
        const res = await rotatingGenerateText({
          system: attempt === 0 ? system : system + "\n\nREMINDER: your previous reply was not parseable. Return ONLY the raw JSON object — start with { and end with }.",
          prompt,
          temperature: 0.4,
          maxTokens: 1300,
        });
        provider = (res as any).provider ?? "rotator";
        const parsed = normalize(extractJson(res.text));
        if (parsed.strongestCounterCase || parsed.refutationAttempt) object = parsed;
        else lastErr = "empty attack";
      } catch (e) {
        lastErr = e instanceof Error ? e.message : String(e);
      }
    }

    if (!object) {
      // Fail loud — do not fabricate an attack.
      return NextResponse.json(
        {
          error: "devil agent unavailable",
          detail: lastErr.slice(0, 300),
          note: "The adversary model is temporarily unavailable. No attack was fabricated.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json({
      claim,
      attackedOwnOutput: Boolean(ourOutput),
      ...object,
      provider,
      disclaimer:
        "Adversarial stress-test, not a verified verdict. The Devil's job is to find weakness; run the No-Hallucination agent for a grounded answer.",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "devil agent failed", detail: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
