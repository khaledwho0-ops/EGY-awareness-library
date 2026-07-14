/* ═══════════════════════════════════════════════════════════════
 * كوّن وعيك · BUILD YOUR AWARENESS — the generator engine.
 * Give it ANY subject or role → it forges a complete awareness map:
 * overview · mastery roadmap · core concepts · the strongest real tools ·
 * global standards · canonical books · online + offline communities ·
 * top websites · do's & don'ts · live-update feeds.
 *
 * Uses rotatingGenerateText (works on EVERY provider — not just the few
 * that support json_schema) and parses the JSON itself, so the engine
 * stays up even when the Gemini slots are rate-limited.
 *
 * One Law: names ONLY real, globally-recognised, resolvable sources —
 * real standards, real books & authors, real orgs & domains. It never
 * invents a source; a URL is emitted only when confident, else null.
 * ═══════════════════════════════════════════════════════════════ */

import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const SHAPE = `{
  "title": { "en": "Field name", "ar": "اسم المجال" },
  "overview": { "en": "2 sentences on what mastering this field means", "ar": "جملتين بالمصري" },
  "roadmap": [ { "label": {"en":"Beginner","ar":"مبتدئ"}, "focus": {"en":"one-line focus","ar":"سطر بالمصري"} } ],
  "concepts": [ {"en":"core concept","ar":"مفهوم بالمصري"} ],
  "tools": [ {"name":"real tool/tech","en":"why it matters","ar":"بالمصري","url":"official URL or null"} ],
  "standards": [ {"name":"real standard/law (e.g. ISO 27001)","en":"note","ar":"بالمصري","url":"URL or null"} ],
  "books": [ {"name":"real book title","en":"real Author — why","ar":"بالمصري","url":null} ],
  "online": [ {"name":"real community/org","en":"note","ar":"بالمصري","url":"URL or null"} ],
  "websites": [ {"name":"real top website","en":"note","ar":"بالمصري","url":"URL or null"} ],
  "offline": [ {"name":"real conference/community","en":"note","ar":"بالمصري","url":null} ],
  "dos": [ {"en":"a sharp do","ar":"بالمصري"} ],
  "donts": [ {"en":"a sharp don't","ar":"بالمصري"} ],
  "live": [ {"name":"real news/newsletter","en":"","ar":"","url":"URL or null"} ]
}`;

const SYSTEM = `You are كوّن وعيك (Build Your Awareness), the awareness-forging engine of موثوق.
Given a SUBJECT or ROLE, output a COMPLETE awareness dossier so a smart professional could go from zero to real command of the field.

ABSOLUTE RULES (the One Law):
- Name ONLY real, globally-recognised, verifiable references: real ISO/industry standard numbers, real book titles WITH their real authors, real organisations, real conferences, real websites.
- NEVER invent a book, author, standard number, org, or statistic. If unsure something exists, leave it out.
- Put a real official homepage in "url" ONLY when confident; otherwise null. Never guess a URL.
- Be specific to the field's true canon (what a real expert names), not generic filler.
- Every "ar" value = natural EGYPTIAN Arabic (spoken, warm), not stiff MSA.

OUTPUT FORMAT — CRITICAL:
- Return ONE valid JSON object and NOTHING else. No markdown, no code fences, no commentary.
- Follow EXACTLY this shape (fill each array with 3–6 rich, real entries):
${SHAPE}`;

// tolerant JSON extractor
function extractJson(text: string): any {
  let t = (text || "").trim();
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) t = fence[1].trim();
  const s = t.indexOf("{");
  const e = t.lastIndexOf("}");
  if (s >= 0 && e > s) t = t.slice(s, e + 1);
  return JSON.parse(t);
}

const arr = (x: any) => (Array.isArray(x) ? x : []);
const bl = (x: any) => ({ en: String(x?.en ?? x ?? ""), ar: String(x?.ar ?? x?.en ?? x ?? "") });
const item = (x: any) => ({ name: String(x?.name ?? ""), en: String(x?.en ?? ""), ar: String(x?.ar ?? x?.en ?? ""), url: x?.url && /^https?:\/\//.test(String(x.url)) ? String(x.url) : null });

function normalize(d: any) {
  return {
    title: bl(d?.title),
    overview: bl(d?.overview),
    roadmap: arr(d?.roadmap).slice(0, 5).map((r: any) => ({ label: bl(r?.label), focus: bl(r?.focus) })),
    concepts: arr(d?.concepts).slice(0, 8).map(bl),
    tools: arr(d?.tools).slice(0, 6).map(item),
    standards: arr(d?.standards).slice(0, 6).map(item),
    books: arr(d?.books).slice(0, 6).map(item),
    online: arr(d?.online).slice(0, 6).map(item),
    websites: arr(d?.websites).slice(0, 6).map(item),
    offline: arr(d?.offline).slice(0, 6).map(item),
    dos: arr(d?.dos).slice(0, 5).map(bl),
    donts: arr(d?.donts).slice(0, 5).map(bl),
    live: arr(d?.live).slice(0, 4).map(item).filter((x: any) => x.name),
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const subject: string = (body.subject ?? body.topic ?? body.text ?? "").toString().trim();
    if (!subject) return NextResponse.json({ error: "Missing 'subject'." }, { status: 400 });
    if (subject.length > 160) return NextResponse.json({ error: "Subject too long." }, { status: 400 });

    const { rotatingGenerateText } = await import("@/lib/debunking/gemini-rotator");
    const prompt = `SUBJECT / ROLE:\n"""${subject}"""\n\nForge the full awareness dossier as ONE JSON object exactly in the required shape. Real sources only. Output JSON only.`;

    let dossier: any = null;
    let lastErr = "";
    for (let attempt = 0; attempt < 2 && !dossier; attempt++) {
      try {
        const { text } = await rotatingGenerateText({
          system: attempt === 0 ? SYSTEM : SYSTEM + "\n\nREMINDER: your previous reply was not parseable. Return ONLY the raw JSON object — start with { and end with }.",
          prompt,
          temperature: 0.35,
          maxTokens: 3200,
        });
        dossier = normalize(extractJson(text));
        // sanity: require at least a title + a couple of populated sections
        const filled = ["tools", "standards", "books"].filter((k) => (dossier[k] || []).length > 0).length;
        if (!dossier.title.en && !dossier.title.ar) dossier = null;
        else if (filled < 2) { lastErr = "sparse dossier"; dossier = null; }
      } catch (e) {
        lastErr = e instanceof Error ? e.message : String(e);
      }
    }

    if (!dossier) return NextResponse.json({ error: "generator unavailable", detail: lastErr.slice(0, 300) }, { status: 503 });
    return NextResponse.json({ subject, dossier, grounded: true, note: "AI-curated real-world references — verify each before you rely on it." });
  } catch (err) {
    return NextResponse.json({ error: "generation failed", detail: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
