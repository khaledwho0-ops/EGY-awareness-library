"use client";

/*
 * WelcomeV2 — "قاعة الحق · The Hall of Truth" (opt-in via the compare-toggle).
 * ───────────────────────────────────────────────────────────────────────────
 * موثوق given a soul. The visitor enters the ancient Hall of Judgment, reimagined:
 *   • HERO       — Horus's winged-sun guardian in a hall of drifting gold dust;
 *                  the موثوق wordmark in monumental Kufi/Cinzel.
 *   • THE WEIGHING — the Scales of Ma'at: the signature promise, every claim weighed.
 *   • THE STORY  — four felt acts (threat → firewall → arsenal → immunity), each a
 *                  scene linking to a real hub.
 *   • THE ONE LAW — carved as an inscription: no claim without a real source.
 *
 * Identity (gold + guardian + motifs + display fonts) is the constant "flag";
 * page surfaces bind to theme tokens so it still lives in all 17 modes.
 * Bilingual (useRTL); entrances via CSS .reveal-stagger; every link is real.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, ScanSearch, Wrench, Brain, Scale, Compass, Wind } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { PageNavigation } from "@/components/shared/page-navigation";
import { HALL } from "./identity";
import FalconOfTruth from "./FalconOfTruth";
import ScalesOfMaat from "./ScalesOfMaat";
import ThothScribe from "./ThothScribe";
import HallDust from "./HallDust";
import HallEnvironment from "./HallEnvironment";
// HOME philosophy scenes — the 20-screen scrollytelling expansion:
import { SeparationPrinciple } from "@/components/home/SeparationPrinciple";
import { TheStakes } from "@/components/home/TheStakes";
import { EightLayers } from "@/components/home/EightLayers";
import { TheFirewall } from "@/components/home/TheFirewall";
import { VerificationDoctrine } from "@/components/home/VerificationDoctrine";
import { IslamicAuthenticity } from "@/components/home/IslamicAuthenticity";
import { CognitionCurriculum } from "@/components/home/CognitionCurriculum";
import { TheEngines } from "@/components/home/TheEngines";
import { TheArsenal } from "@/components/home/TheArsenal";
import { BilingualThemes } from "@/components/home/BilingualThemes";
import { TheTeam } from "@/components/home/TheTeam";
import { MostDissected } from "@/components/home/MostDissected";
import { TrustStrip } from "@/components/home/TrustStrip";

const AR_DISPLAY = `'Reem Kufi', 'Readex Pro', serif`;
const EN_DISPLAY = `'Cinzel', 'Space Grotesk', serif`;

/* Small gold divider with a central feather diamond — a glyph rule between acts. */
function GlyphRule() {
  return (
    <div aria-hidden style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, opacity: 0.8, margin: "0.5rem 0" }}>
      <span style={{ height: 1, width: 60, background: `linear-gradient(90deg, transparent, ${HALL.gold})` }} />
      <span style={{ width: 8, height: 8, transform: "rotate(45deg)", background: HALL.gold, boxShadow: `0 0 10px ${HALL.gold}` }} />
      <span style={{ height: 1, width: 60, background: `linear-gradient(90deg, ${HALL.gold}, transparent)` }} />
    </div>
  );
}

export function WelcomeV2() {
  const { isRTL } = useRTL();
  const t = (en: string, ar: string) => (isRTL ? ar : en);
  const dir: "rtl" | "ltr" = isRTL ? "rtl" : "ltr";
  const arrow = { transform: isRTL ? "rotate(180deg)" : "none" } as const;
  const [weighed, setWeighed] = useState<string | null>(null);

  // Cursor parallax — the hall breathes with the pointer (depth, not eye-tracking).
  const heroRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty("--hx", cx.toFixed(3));
      el.style.setProperty("--hy", cy.toFixed(3));
      raf = Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
      ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll cinematic — as you descend past the hero, the content lifts & fades
  // while the guardian/columns stay; sets --sy (0→1) on the hero root.
  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let scroller: HTMLElement | Window = window;
    for (let p = el.parentElement; p; p = p.parentElement) {
      const s = getComputedStyle(p);
      if (/(auto|scroll)/.test(s.overflowY) && p.scrollHeight > p.clientHeight + 4) {
        scroller = p;
        break;
      }
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const h = r.height || 1;
      const p = Math.max(0, Math.min(1, -r.top / (h * 0.85)));
      el.style.setProperty("--sy", p.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    if (scroller !== window) window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const goldBtn: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.55rem",
    padding: "0.85rem 1.5rem",
    borderRadius: 14,
    fontWeight: 700,
    fontSize: "1rem",
    textDecoration: "none",
    color: HALL.ink,
    background: `linear-gradient(135deg, ${HALL.goldBright}, ${HALL.gold} 55%, ${HALL.goldDeep})`,
    boxShadow: `0 10px 30px -10px ${HALL.gold}, inset 0 1px 0 rgba(255,255,255,0.5)`,
    border: `1px solid ${HALL.goldBright}`,
  };
  const ghostBtn: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.55rem",
    padding: "0.85rem 1.5rem",
    borderRadius: 14,
    fontWeight: 600,
    fontSize: "1rem",
    textDecoration: "none",
    color: "var(--text-primary)",
    background: "color-mix(in srgb, var(--text-primary) 6%, transparent)",
    border: `1px solid color-mix(in srgb, ${HALL.gold} 55%, transparent)`,
  };

  const acts = [
    {
      icon: ScanSearch,
      accent: HALL.carnelian,
      kicker: t("The threat", "الخطر"),
      line: t("Every day, thousands of claims slip past your judgment.", "كل يوم، آلاف الادّعاءات بتعدّي على عقلك من غير ما تحس."),
      sub: t("Rumors, doctored images, half-truths — engineered to feel true.", "شائعات، صور مفبركة، أنصاف حقائق — متصمّمة إنها تبان صح."),
      href: "/six-layers",
      cta: t("See the 8 layers of deception", "شوف طبقات الخداع الـ8"),
    },
    {
      icon: ShieldCheck,
      accent: HALL.turquoise,
      kicker: t("The firewall", "الجدار"),
      line: t("موثوق separates evidence from illusion — with a real source, always.", "موثوق بيفصل الدليل عن الوهم — بمصدر حقيقي، دايمًا."),
      sub: t("No verdict reaches you without a resolvable source behind it.", "ولا حُكم بيوصلك من غير مصدر تقدر ترجعله."),
      href: "/claimdebunker",
      cta: t("Open the verification console", "افتح كونسول التحقّق"),
    },
    {
      icon: Wrench,
      accent: HALL.gold,
      kicker: t("The arsenal", "الترسانة"),
      line: t("40+ engines — from hadith to medicine to a faked photo.", "أكتر من 40 محرك — من الحديث للدواء للصورة المفبركة."),
      sub: t("One toolkit for claims, images, sources, and Arabic text.", "أدوات واحدة للادّعاءات، الصور، المصادر، والنص العربي."),
      href: "/tools",
      cta: t("Explore every tool", "استكشف كل الأدوات"),
    },
    {
      icon: Brain,
      accent: HALL.lapis,
      kicker: t("The immunity", "المناعة"),
      line: t("You don't just detect manipulation — you train to resist it.", "مش بس بتكشف التضليل — بتتدرّب تقاومه."),
      sub: t("Inoculation drills that build lasting cognitive defense.", "تمارين تحصين بتبني دفاع ذهني بيدوم."),
      href: "/mind-gym",
      cta: t("Enter the mind gym", "ادخل صالة العقل"),
    },
  ];

  const facts = [
    { n: "40+", label: t("verification engines", "محرك تحقّق") },
    { n: "8", label: t("layers of deception", "طبقات خداع") },
    { n: t("0", "٠"), label: t("claims without a source", "ادّعاء بلا مصدر") },
  ];

  const trinity = [
    {
      node: <FalconOfTruth />,
      accent: HALL.gold,
      kicker: t("Horus · The Guardian", "حورس · الحارس"),
      name: t("Sees the deception", "يرى الخداع"),
      line: t("The winged sun that spots manipulation before it ever reaches you.", "الشمس المجنّحة اللي بتكشف التلاعب قبل ما يوصلك."),
    },
    {
      node: <ThothScribe />,
      accent: HALL.turquoise,
      kicker: t("Thoth · The Scribe", "تحوت · الكاتب"),
      name: t("Records the verdict", "يسجّل الحكم"),
      line: t("Every claim written into the record — with a source you can trace.", "كل ادّعاء متسجّل في السِّجل — بمصدر تقدر ترجعله."),
    },
    {
      node: <ScalesOfMaat />,
      accent: HALL.carnelian,
      kicker: t("Ma'at · The Judge", "ماعت · الحَكَم"),
      name: t("Weighs the truth", "يوزن الحقيقة"),
      line: t("The scale that weighs each claim against the feather of truth.", "الميزان اللي بيوزن كل ادّعاء في كفّة الحق."),
    },
  ];

  const claims = [
    t("This supplement cures cancer", "المكمّل ده بيشفي السرطان"),
    t("This viral photo is 100% real", "الصورة المنتشرة دي حقيقية"),
    t("This hadith is authentic", "الحديث ده صحيح"),
  ];

  const strongest = [
    {
      icon: Brain,
      accent: HALL.turquoise,
      title: t("Sharpest cognition", "أقوى تدريب للعقل"),
      items: [
        { href: "/kawwen-waayak", name: t("Build Your Awareness · كوّن وعيك", "كوّن وعيك"), desc: t("Master any field — real tools, standards, books & communities", "اتقن أي مجال — أدوات ومعايير وكتب ومجتمعات حقيقية") },
        { href: "/mind-gym", name: t("The Mind Gym", "صالة العقل"), desc: t("Every mind-training drill in one place", "كل تمارين تدريب العقل في مكان واحد") },
        { href: "/dashboard", name: t("The 14-day program", "برنامج الـ14 يوم"), desc: t("Structured cognitive defense + baseline", "دفاع ذهني منظّم + قياس مبدئي") },
        { href: "/inoculation-passport", name: t("Inoculation Passport", "جواز التحصين"), desc: t("Build lasting resistance to manipulation", "ابنِ مقاومة تدوم ضد التلاعب") },
      ],
    },
    {
      icon: Wrench,
      accent: HALL.gold,
      title: t("Strongest tools", "أقوى الأدوات"),
      items: [
        { href: "/claimdebunker", name: t("ClaimDebunker", "كاشف الادّعاء"), desc: t("40+ engines, one control deck", "40+ محرك في لوحة قيادة واحدة") },
        { href: "/firewall", name: t("The Firewall", "الجدار الناري"), desc: t("Separate & verify any claim", "افصل وتحقّق من أيّ ادّعاء") },
        { href: "/deepreal", name: t("DeepReal Forensics", "تحليل ديب-ريل"), desc: t("Detect manipulated media", "اكشف الوسائط المفبركة") },
      ],
    },
  ];

  return (
    <div dir={dir} style={{ background: "var(--bg-page, #0a0e14)", color: "var(--text-primary, #e8eef7)", overflowX: "hidden" }}>
      <style>{`
        @keyframes hall-shimmer { 0% { background-position: 0% 50%; } 100% { background-position: -220% 50%; } }
        .hall-wordmark {
          display: block; font-family: ${AR_DISPLAY}; font-weight: 700; line-height: 1;
          background: linear-gradient(100deg, ${HALL.goldDeep} 0%, ${HALL.gold} 18%, ${HALL.goldBright} 34%, #fff 45%, ${HALL.goldBright} 56%, ${HALL.gold} 74%, ${HALL.goldDeep} 100%);
          background-size: 220% auto;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent; color: transparent;
          filter: drop-shadow(0 6px 30px color-mix(in srgb, ${HALL.gold} 50%, transparent));
          animation: hall-shimmer 5.5s linear infinite;
        }
        .hall-plax { will-change: transform; }
        .hall-cta { transition: transform .25s var(--ease-out-quart, cubic-bezier(.25,1,.5,1)), box-shadow .25s ease, filter .25s ease; }
        .hall-cta:hover { transform: translateY(-2px); filter: brightness(1.06); box-shadow: 0 18px 44px -12px ${HALL.gold}, inset 0 1px 0 rgba(255,255,255,.6); }
        .hall-cta:active { transform: translateY(0); }
        .hall-ghost { transition: transform .25s ease, border-color .25s ease, background .25s ease; }
        .hall-ghost:hover { transform: translateY(-2px); border-color: ${HALL.gold}; background: color-mix(in srgb, ${HALL.gold} 12%, transparent); }
        /* Living welcome: the Hall IS the entry point — stand down the global "doors" grid so the hero leads. */
        section[aria-label="Main entry points"] { display: none !important; }
        .hall-scroll { will-change: transform, opacity; }
        @media (prefers-reduced-motion: reduce) { .hall-wordmark { animation: none; } .hall-plax, .hall-scroll { transform: none !important; opacity: 1 !important; } .hall-cta:hover, .hall-ghost:hover { transform: none; } }
      `}</style>
      {/* ── HERO — the guardian in the hall ─────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "clamp(640px, 100vh, 1040px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          paddingInline: "clamp(1rem, 4vw, 2.5rem)",
          paddingBlock: "clamp(2rem, 5vh, 4rem)",
          overflow: "hidden",
          // A dark chamber on EVERY theme so the gold guardian always glows (no light-theme wash-out),
          // BUT tinted by the active theme's accent so the stage visibly changes hue per palette
          // (bloodline→oxblood, orchid-noir→wine, eden→crimson, solar→warm-gold, …). The accent is
          // mixed heavily into HALL.night so it stays dark enough for the gold to read on all 21 themes.
          background: `radial-gradient(130% 100% at 50% 32%, color-mix(in srgb, var(--accent-cta) 26%, ${HALL.night}) 0%, color-mix(in srgb, var(--accent-cta) 9%, ${HALL.night}) 55%, color-mix(in srgb, ${HALL.night} 80%, #000) 100%)`,
        }}
      >
        {/* temple architecture — far parallax layer */}
        <div className="hall-plax" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", transform: "translate3d(calc(var(--hx,0) * 3px), calc(var(--hy,0) * 3px), 0)" }}>
          <HallEnvironment />
        </div>
        {/* ambient dust + gold light shaft (parallax layers) */}
        <div className="hall-plax" style={{ position: "absolute", inset: -30, zIndex: 0, pointerEvents: "none", transform: "translate3d(calc(var(--hx,0) * 6px), calc(var(--hy,0) * 6px), 0)" }}>
          <HallDust />
        </div>
        <div
          aria-hidden
          className="hall-plax"
          style={{
            position: "absolute",
            inset: -30,
            zIndex: 0,
            pointerEvents: "none",
            transform: "translate3d(calc(var(--hx,0) * 11px), calc(var(--hy,0) * 11px), 0)",
            background: `radial-gradient(60% 42% at 50% 30%, color-mix(in srgb, ${HALL.gold} 22%, transparent), transparent 70%)`,
          }}
        />

        <div className="hall-scroll" style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", justifyContent: "center", transform: "translateY(calc(var(--sy,0) * -50px))", opacity: "calc(1 - var(--sy,0) * 0.85)" }}>
        <div className="reveal-stagger" style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 960 }}>
          <span style={{ fontFamily: EN_DISPLAY, letterSpacing: "0.34em", fontSize: "0.8rem", color: HALL.gold, textTransform: "uppercase", marginBottom: "0.4rem" }}>
            {t("The Hall of Truth", "قاعة الحقيقة")}
          </span>

          {/* Guardian + floor reflection */}
          <div
            className="hall-plax"
            style={{
              position: "relative",
              width: "min(620px, 94vw)",
              height: "clamp(240px, 40vh, 400px)",
              pointerEvents: "none",
              transform: "translate3d(calc(var(--hx,0) * 18px), calc(var(--hy,0) * 12px), 0)",
            }}
          >
            <FalconOfTruth />
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: "78%",
                left: 0,
                width: "100%",
                height: "62%",
                transform: "scaleY(-1)",
                opacity: 0.15,
                filter: "blur(1.2px)",
                WebkitMaskImage: "linear-gradient(to bottom, #000, transparent 70%)",
                maskImage: "linear-gradient(to bottom, #000, transparent 70%)",
              }}
            >
              <FalconOfTruth />
            </div>
          </div>

          {/* Wordmark */}
          <h1 style={{ margin: "0.2rem 0 0", lineHeight: 1 }}>
            <span className="hall-wordmark" style={{ fontSize: "clamp(3.6rem, 12vw, 8rem)" }}>
              موثوق
            </span>
            <span style={{ display: "block", fontFamily: EN_DISPLAY, letterSpacing: "0.5em", fontSize: "clamp(0.7rem, 2.4vw, 1.05rem)", color: "rgba(245,238,222,0.72)", marginTop: "0.6rem", paddingInlineStart: "0.5em" }}>
              MAWTHOOQ
            </span>
          </h1>

          <p className="t-body" style={{ margin: "1.4rem auto 0", maxWidth: 600, color: "rgba(245,238,222,0.88)", fontSize: "clamp(1.05rem, 2.6vw, 1.35rem)", lineHeight: 1.6 }}>
            {t(
              "Where every claim is weighed against the truth — traced back to a real, resolvable source.",
              "حيث يُوزَن كل ادّعاء في ميزان الحقيقة — مرجوعًا لمصدرٍ حقيقيٍّ تقدر تتأكد منه بنفسك.",
            )}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.9rem", justifyContent: "center", marginTop: "1.9rem" }}>
            <Link href="/claimdebunker" className="hall-cta" style={goldBtn}>
              {t("Start verifying", "ابدأ التحقّق")}
              <ArrowRight size={18} style={arrow} />
            </Link>
            <Link href="/tools" className="hall-ghost" style={ghostBtn}>
              {t("Explore the defenses", "استكشف الدفاعات")}
            </Link>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(1.4rem, 5vw, 3.4rem)", justifyContent: "center", marginTop: "2.8rem" }}>
            {facts.map((f, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: EN_DISPLAY, fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: HALL.gold, lineHeight: 1 }}>{f.n}</div>
                <div className="t-label" style={{ color: "rgba(245,238,222,0.6)", marginTop: "0.4rem" }}>{f.label}</div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* ── THE THREE GUARDIANS — the trinity of truth ─────────────── */}
      <section style={{ maxWidth: 1120, marginInline: "auto", paddingInline: "clamp(1rem, 4vw, 2.5rem)", paddingBlock: "clamp(2.5rem, 7vh, 4.5rem)" }}>
        <GlyphRule />
        <div className="reveal-stagger" style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span style={{ fontFamily: EN_DISPLAY, letterSpacing: "0.28em", fontSize: "0.78rem", color: HALL.gold, textTransform: "uppercase" }}>
            {t("The Three Guardians of Truth", "حُرّاس الحقيقة الثلاثة")}
          </span>
          <p className="t-body" style={{ margin: "0.8rem auto 0", maxWidth: 620, color: "var(--text-secondary)" }}>
            {t(
              "One hall, three powers — a guardian to see, a scribe to record, a judge to weigh.",
              "قاعةٌ واحدة، ثلاث قوى — حارسٌ يرى، وكاتبٌ يسجّل، وحَكَمٌ يزن.",
            )}
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "clamp(1.5rem, 4vw, 3rem)" }}>
          {trinity.map((m, i) => (
            <div key={i} className="reveal-stagger" style={{ textAlign: "center" }}>
              <div style={{ width: "clamp(140px, 22vw, 190px)", height: "clamp(140px, 22vw, 190px)", margin: "0 auto 0.6rem", position: "relative" }}>
                {m.node}
              </div>
              <div style={{ fontFamily: EN_DISPLAY, letterSpacing: "0.16em", textTransform: "uppercase", fontSize: "0.78rem", color: `color-mix(in srgb, ${m.accent} 72%, var(--text-primary))` }}>{m.kicker}</div>
              <div style={{ fontFamily: AR_DISPLAY, fontSize: "clamp(1.15rem, 3vw, 1.5rem)", color: "var(--text-primary)", margin: "0.2rem 0 0.35rem" }}>{m.name}</div>
              <p className="t-body" style={{ margin: "0 auto", color: "var(--text-secondary)", maxWidth: 270 }}>{m.line}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE SCRIBE (Thoth) ─────────────────────────────────────── */}
      <section style={{ maxWidth: 1040, marginInline: "auto", paddingInline: "clamp(1rem, 4vw, 2.5rem)", paddingBlock: "clamp(2rem, 6vh, 4rem)" }}>
        <div
          className="reveal-stagger"
          style={{ display: "grid", gridTemplateColumns: "1fr min(340px, 42vw)", gap: "clamp(1.5rem, 5vw, 3.5rem)", alignItems: "center", justifyItems: "center", direction: dir }}
        >
          <div style={{ textAlign: isRTL ? "right" : "left" }}>
            <span style={{ fontFamily: EN_DISPLAY, letterSpacing: "0.28em", fontSize: "0.78rem", color: HALL.turquoise, textTransform: "uppercase" }}>
              {t("Thoth · The Scribe", "تحوت · الكاتب")}
            </span>
            <h2 style={{ fontFamily: AR_DISPLAY, margin: "0.6rem 0 0.8rem", fontSize: "clamp(1.6rem, 4.5vw, 2.6rem)", lineHeight: 1.25, color: "var(--text-primary)" }}>
              {t("No verdict is forgotten — all of it recorded, with its source.", "ولا حُكم بيتنسى — كله متسجّل، بمصدره.")}
            </h2>
            <p className="t-body" style={{ margin: 0, color: "var(--text-secondary)", maxWidth: 460 }}>
              {t(
                "Thoth writes every verification into the record: the claim, the ruling, and the resolvable source behind it. Full transparency — موثوق is no black box.",
                "تحوت بيكتب كل تحقّق في السِّجل: الادّعاء، الحُكم، والمصدر اللي تقدر ترجعله. شفافية كاملة — موثوق مش صندوق أسود.",
              )}
            </p>
            <Link href="/sources" className="hall-ghost" style={{ ...ghostBtn, marginTop: "1.4rem" }}>
              {t("See the record of sources", "شوف سِجلّ المصادر")}
              <ArrowRight size={16} style={arrow} />
            </Link>
          </div>
          <div style={{ width: "100%", maxWidth: 340, aspectRatio: "1 / 1" }}>
            <ThothScribe />
          </div>
        </div>
      </section>

      {/* ── THE WEIGHING — signature ────────────────────────────────── */}
      <section style={{ maxWidth: 1040, marginInline: "auto", paddingInline: "clamp(1rem, 4vw, 2.5rem)", paddingBlock: "clamp(3rem, 8vh, 5.5rem)" }}>
        <GlyphRule />
        <div
          className="reveal-stagger"
          style={{
            display: "grid",
            gridTemplateColumns: "min(320px, 40vw) 1fr",
            gap: "clamp(1.5rem, 5vw, 3.5rem)",
            alignItems: "center",
            justifyItems: "center",
            direction: dir,
          }}
        >
          <div style={{ width: "100%", maxWidth: 320, aspectRatio: "13 / 11" }}>
            <ScalesOfMaat weighing={!!weighed} />
          </div>
          <div style={{ textAlign: isRTL ? "right" : "left", width: "100%" }}>
            <span style={{ fontFamily: EN_DISPLAY, letterSpacing: "0.28em", fontSize: "0.78rem", color: `color-mix(in srgb, ${HALL.carnelian} 72%, var(--text-primary))`, textTransform: "uppercase" }}>
              {t("The Weighing", "الميزان")}
            </span>
            <h2 style={{ fontFamily: AR_DISPLAY, margin: "0.6rem 0 0.8rem", fontSize: "clamp(1.6rem, 4.5vw, 2.6rem)", lineHeight: 1.25, color: "var(--text-primary)" }}>
              {t("Put a claim on the scale.", "حُطّ ادّعاء في الميزان.")}
            </h2>
            <p className="t-body" style={{ margin: 0, color: "var(--text-secondary)", maxWidth: 460 }}>
              {t(
                "Ma'at weighs every claim against the feather of truth. Pick one — watch the unsourced claim tip the scale, then weigh it for real.",
                "ماعت بتوزن كل ادّعاء في كفّة الحق. اختر واحد — شوف الادّعاء بلا مصدر بيميّل الميزان، وبعدين وزنه بجدّ.",
              )}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "1.2rem", justifyContent: isRTL ? "flex-end" : "flex-start" }}>
              {claims.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setWeighed(c)}
                  className="hall-ghost"
                  style={{
                    appearance: "none",
                    cursor: "pointer",
                    padding: "0.5rem 0.95rem",
                    borderRadius: 999,
                    fontFamily: "inherit",
                    fontSize: "0.85rem",
                    color: "var(--text-primary)",
                    background: weighed === c ? `color-mix(in srgb, ${HALL.carnelian} 22%, transparent)` : "color-mix(in srgb, var(--text-primary) 5%, transparent)",
                    border: `1px solid ${weighed === c ? HALL.carnelian : `color-mix(in srgb, ${HALL.gold} 40%, transparent)`}`,
                  }}
                >
                  {c}
                </button>
              ))}
            </div>

            {weighed && (
              <div className="ds-liquid-glass reveal-stagger" style={{ padding: "1.1rem 1.3rem", marginTop: "1.2rem", borderInlineStart: `3px solid ${HALL.carnelian}` }}>
                <div style={{ position: "relative", zIndex: 2 }}>
                  <div className="t-label" style={{ color: HALL.carnelian }}>{t("Heavy — needs a source", "ثقيل — محتاج مصدر")}</div>
                  <p className="t-body" style={{ margin: "0.4rem 0 0", color: "var(--text-secondary)" }}>
                    {t(
                      "A claim on its own can't pass the feather. Weigh it against real, resolvable evidence in the console.",
                      "الادّعاء لوحده ما بيعدّيش الريشة. وزنه بدليل حقيقي تقدر ترجعله في الكونسول.",
                    )}
                  </p>
                  <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginTop: "0.9rem" }}>
                    <Link href="/claimdebunker" className="hall-cta" style={{ ...goldBtn, padding: "0.7rem 1.2rem", fontSize: "0.92rem" }}>
                      {t("Weigh it for real", "وزنه بجدّ")}
                      <ArrowRight size={15} style={arrow} />
                    </Link>
                    <button type="button" onClick={() => setWeighed(null)} className="hall-ghost" style={{ ...ghostBtn, appearance: "none", cursor: "pointer", padding: "0.7rem 1.2rem", fontSize: "0.92rem" }}>
                      {t("Try another", "جرّب تاني")}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── THE STORY — four acts ───────────────────────────────────── */}
      <section style={{ maxWidth: 1000, marginInline: "auto", paddingInline: "clamp(1rem, 4vw, 2.5rem)", paddingBlock: "clamp(1rem, 3vh, 2rem)", display: "flex", flexDirection: "column", gap: "clamp(1.1rem, 3vw, 1.7rem)" }}>
        <div className="reveal-stagger" style={{ textAlign: "center", marginBottom: "0.4rem" }}>
          <span style={{ fontFamily: EN_DISPLAY, letterSpacing: "0.28em", fontSize: "0.78rem", color: HALL.gold, textTransform: "uppercase" }}>
            {t("How موثوق defends you", "إزاي موثوق بيحميك")}
          </span>
        </div>

        {acts.map((act, i) => {
          const Icon = act.icon;
          return (
            <Link
              key={i}
              href={act.href}
              className="ds-liquid-glass reveal-stagger lift"
              style={{ display: "flex", alignItems: "center", gap: "clamp(1rem, 3vw, 1.8rem)", padding: "clamp(1.2rem, 3vw, 2rem)", textDecoration: "none", color: "inherit", flexDirection: isRTL ? "row-reverse" : "row" }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: "clamp(54px, 9vw, 74px)",
                  height: "clamp(54px, 9vw, 74px)",
                  borderRadius: 18,
                  display: "grid",
                  placeItems: "center",
                  background: `color-mix(in srgb, ${act.accent} 20%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${act.accent} 45%, transparent)`,
                  color: act.accent,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <Icon size={28} />
              </div>
              <div style={{ flex: 1, minWidth: 0, position: "relative", zIndex: 2, textAlign: isRTL ? "right" : "left" }}>
                <div style={{ fontFamily: EN_DISPLAY, letterSpacing: "0.14em", fontSize: "0.72rem", textTransform: "uppercase", color: act.accent, marginBottom: "0.35rem" }}>
                  {String(i + 1).padStart(2, "0")} · {act.kicker}
                </div>
                <div style={{ fontFamily: AR_DISPLAY, margin: 0, fontSize: "clamp(1.15rem, 3vw, 1.6rem)", lineHeight: 1.3, color: "var(--text-primary)" }}>{act.line}</div>
                <p className="t-body" style={{ margin: "0.5rem 0 0", color: "var(--text-secondary)" }}>{act.sub}</p>
                <span className="t-label" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", marginTop: "0.8rem", color: HALL.gold }}>
                  {act.cta}
                  <ArrowRight size={15} style={arrow} />
                </span>
              </div>
            </Link>
          );
        })}
      </section>

      {/* ── THE STRONGEST — flagship cognition + tools ─────────────── */}
      <section style={{ maxWidth: 1080, marginInline: "auto", paddingInline: "clamp(1rem, 4vw, 2.5rem)", paddingBlock: "clamp(2.5rem, 7vh, 4.5rem)" }}>
        <GlyphRule />
        <div className="reveal-stagger" style={{ textAlign: "center", marginBottom: "1.6rem" }}>
          <span style={{ fontFamily: EN_DISPLAY, letterSpacing: "0.28em", fontSize: "0.78rem", color: HALL.gold, textTransform: "uppercase" }}>
            {t("The Strongest of موثوق", "أقوى ما في موثوق")}
          </span>
          <p className="t-body" style={{ margin: "0.7rem auto 0", maxWidth: 600, color: "var(--text-secondary)" }}>
            {t("The flagship drills that sharpen your mind, and the tools that do the heaviest verification.", "أقوى التمارين اللي بتشحذ عقلك، وأقوى الأدوات اللي بتعمل أثقل تحقّق.")}
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(1.2rem, 3vw, 2rem)" }}>
          {strongest.map((group, gi) => {
            const Icon = group.icon;
            return (
              <div key={gi} className="ds-liquid-glass reveal-stagger" style={{ padding: "clamp(1.3rem, 3vw, 2rem)" }}>
                <div style={{ position: "relative", zIndex: 2 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem", flexDirection: isRTL ? "row-reverse" : "row" }}>
                    <Icon size={22} style={{ color: group.accent }} />
                    <span style={{ fontFamily: AR_DISPLAY, fontSize: "clamp(1.2rem, 3vw, 1.5rem)", color: "var(--text-primary)" }}>{group.title}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                    {group.items.map((it, ii) => (
                      <Link
                        key={ii}
                        href={it.href}
                        className="lift"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "0.8rem",
                          padding: "0.8rem 1rem",
                          borderRadius: 14,
                          textDecoration: "none",
                          color: "inherit",
                          background: `color-mix(in srgb, ${group.accent} 9%, transparent)`,
                          border: `1px solid color-mix(in srgb, ${group.accent} 30%, transparent)`,
                          flexDirection: isRTL ? "row-reverse" : "row",
                        }}
                      >
                        <div style={{ textAlign: isRTL ? "right" : "left", minWidth: 0 }}>
                          <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>{it.name}</div>
                          <div className="t-body" style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{it.desc}</div>
                        </div>
                        <ArrowRight size={16} style={{ ...arrow, color: group.accent, flexShrink: 0 }} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SISTER PLATFORMS — one library, three platforms ─────────── */}
      <section style={{ maxWidth: 1080, marginInline: "auto", paddingInline: "clamp(1rem, 4vw, 2.5rem)", paddingBlock: "clamp(2.5rem, 7vh, 4.5rem)" }}>
        <GlyphRule />
        <div className="reveal-stagger" style={{ textAlign: "center", marginBottom: "1.8rem" }}>
          <span style={{ fontFamily: EN_DISPLAY, letterSpacing: "0.28em", fontSize: "0.78rem", color: HALL.gold, textTransform: "uppercase" }}>
            {t("One Library · Three Platforms", "مكتبة واحدة · ثلاث منصّات")}
          </span>
          <p className="t-body" style={{ margin: "0.7rem auto 0", maxWidth: 640, color: "var(--text-secondary)" }}>
            {t("موثوق verifies the world. Its two sister platforms prepare you for it — and help you understand yourself.", "موثوق بيتحقّق من العالم. ومنصّتينه الشقيقتين بيجهّزوك ليه — وبيساعدوك تفهم نفسك.")}
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(1.2rem, 3vw, 1.8rem)" }}>
          {/* مستعد — preparedness · compass · teal */}
          <a
            href="https://khaledwho0-ops.github.io/mawthooq-defense/mostaed/"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal-stagger lift"
            style={{
              display: "block", textDecoration: "none", color: "inherit",
              padding: "clamp(1.5rem, 3.5vw, 2.2rem)", borderRadius: 22,
              background: `linear-gradient(160deg, color-mix(in srgb, ${HALL.turquoise} 18%, var(--bg-card, #10161c)), var(--bg-card, #0d1319))`,
              border: `1px solid color-mix(in srgb, ${HALL.turquoise} 48%, transparent)`,
              boxShadow: `inset 0 1px 0 color-mix(in srgb, ${HALL.turquoise} 24%, transparent)`,
              textAlign: isRTL ? "right" : "left", position: "relative", overflow: "hidden",
            }}
          >
            <div style={{ display: "inline-grid", placeItems: "center", width: 66, height: 66, borderRadius: 18, marginBottom: "1rem", color: HALL.turquoise, background: `color-mix(in srgb, ${HALL.turquoise} 18%, transparent)`, border: `1px solid color-mix(in srgb, ${HALL.turquoise} 45%, transparent)`, boxShadow: `0 0 44px -10px ${HALL.turquoise}` }}>
              <Compass size={34} />
            </div>
            <div style={{ fontFamily: EN_DISPLAY, letterSpacing: "0.16em", textTransform: "uppercase", fontSize: "0.74rem", color: `color-mix(in srgb, ${HALL.turquoise} 78%, var(--text-primary))` }}>
              {t("مستعد · Mosta'ed · Preparedness", "مستعد · جاهزيّة")}
            </div>
            <div style={{ fontFamily: AR_DISPLAY, fontSize: "clamp(1.6rem, 4.5vw, 2.2rem)", color: "var(--text-primary)", margin: "0.15rem 0 0.5rem" }}>
              {t("Ready before it happens", "جاهز قبل ما يحصل")}
            </div>
            <p className="t-body" style={{ margin: 0, color: "var(--text-secondary)", maxWidth: 420 }}>
              {t("Source-verified first-aid for the first minutes of an emergency — the right steps, and the right Egyptian number.", "إسعافات موثّقة من مصدر رسمي لأول دقايق الطوارئ — الخطوات الصح، والرقم المصري الصح.")}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "1rem 0 1.1rem", justifyContent: isRTL ? "flex-end" : "flex-start" }}>
              {[t("L1–L5 severity", "خطورة L1–L5"), t("Gate 6", "البوابة 6"), "123"].map((c, i) => (
                <span key={i} className="t-label" style={{ padding: "0.28rem 0.7rem", borderRadius: 999, fontSize: "0.72rem", color: `color-mix(in srgb, ${HALL.turquoise} 85%, var(--text-primary))`, background: `color-mix(in srgb, ${HALL.turquoise} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${HALL.turquoise} 32%, transparent)` }}>{c}</span>
              ))}
            </div>
            <span className="t-label" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: HALL.turquoise, fontWeight: 700 }}>
              {t("Enter مستعد", "ادخل مستعد")}
              <ArrowRight size={16} style={arrow} />
            </span>
          </a>

          {/* متزن — psychological literacy · breath · sage */}
          <a
            href="https://khaledwho0-ops.github.io/mawthooq-defense/motazen/"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal-stagger lift"
            style={{
              display: "block", textDecoration: "none", color: "inherit",
              padding: "clamp(1.5rem, 3.5vw, 2.2rem)", borderRadius: 22,
              background: "linear-gradient(160deg, color-mix(in srgb, #7CB09A 20%, var(--bg-card, #10161c)), var(--bg-card, #0d1319))",
              border: "1px solid color-mix(in srgb, #7CB09A 48%, transparent)",
              boxShadow: "inset 0 1px 0 color-mix(in srgb, #7CB09A 24%, transparent)",
              textAlign: isRTL ? "right" : "left", position: "relative", overflow: "hidden",
            }}
          >
            <div style={{ display: "inline-grid", placeItems: "center", width: 66, height: 66, borderRadius: 18, marginBottom: "1rem", color: "#8FC7AC", background: "color-mix(in srgb, #7CB09A 18%, transparent)", border: "1px solid color-mix(in srgb, #7CB09A 45%, transparent)", boxShadow: "0 0 44px -10px #7CB09A" }}>
              <Wind size={34} />
            </div>
            <div style={{ fontFamily: EN_DISPLAY, letterSpacing: "0.16em", textTransform: "uppercase", fontSize: "0.74rem", color: "color-mix(in srgb, #8FC7AC 82%, var(--text-primary))" }}>
              {t("متزن · Motazen · Literacy", "متزن · وعي نفسي")}
            </div>
            <div style={{ fontFamily: AR_DISPLAY, fontSize: "clamp(1.6rem, 4.5vw, 2.2rem)", color: "var(--text-primary)", margin: "0.15rem 0 0.5rem" }}>
              {t("Balance, with full honesty", "اتزان، بأمانة كاملة")}
            </div>
            <p className="t-body" style={{ margin: 0, color: "var(--text-secondary)", maxWidth: 420 }}>
              {t("How to think about your mind — 118 sourced claims, each labeled established, contested, debunked, or unknown.", "إزّاي تفكّر في نفسيتك — 118 معلومة موثّقة، كل واحدة عليها لافتة: مؤكَّد، متنازَع عليه، مدحوض، أو مش معروف.")}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "1rem 0 1.1rem", justifyContent: isRTL ? "flex-end" : "flex-start" }}>
              {[t("118 claims", "118 معلومة"), t("4 honesty states", "4 حالات أمانة"), t("WEIRD flag", "لافتة WEIRD")].map((c, i) => (
                <span key={i} className="t-label" style={{ padding: "0.28rem 0.7rem", borderRadius: 999, fontSize: "0.72rem", color: "color-mix(in srgb, #8FC7AC 88%, var(--text-primary))", background: "color-mix(in srgb, #7CB09A 12%, transparent)", border: "1px solid color-mix(in srgb, #7CB09A 32%, transparent)" }}>{c}</span>
              ))}
            </div>
            <span className="t-label" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "#8FC7AC", fontWeight: 700 }}>
              {t("Enter متزن", "ادخل متزن")}
              <ArrowRight size={16} style={arrow} />
            </span>
          </a>
        </div>
      </section>

      {/* ══ PHILOSOPHY ARC · the defense narrative, cumulative → the One Law ══ */}
      <TheStakes />
      <EightLayers />
      <TheFirewall />
      <VerificationDoctrine />
      <IslamicAuthenticity />
      <SeparationPrinciple />

      {/* ── THE ONE LAW — inscription ───────────────────────────────── */}
      <section style={{ maxWidth: 860, marginInline: "auto", paddingInline: "clamp(1rem, 4vw, 2.5rem)", paddingBlock: "clamp(3rem, 8vh, 5rem)" }}>
        <div
          className="reveal-stagger"
          style={{
            padding: "clamp(2rem, 6vw, 3.4rem)",
            textAlign: "center",
            borderRadius: 24,
            background: `linear-gradient(160deg, color-mix(in srgb, ${HALL.lapisDeep} 34%, var(--bg-card, #12121a)), var(--bg-card, #12121a))`,
            border: `1px solid color-mix(in srgb, ${HALL.gold} 40%, transparent)`,
            boxShadow: `inset 0 1px 0 color-mix(in srgb, ${HALL.gold} 30%, transparent), 0 30px 70px -30px rgba(0,0,0,0.6)`,
          }}
        >
          <Scale size={30} style={{ color: HALL.gold, marginBottom: "0.7rem" }} />
          <div style={{ fontFamily: EN_DISPLAY, letterSpacing: "0.3em", fontSize: "0.76rem", textTransform: "uppercase", color: HALL.gold }}>
            {t("The One Law", "القانون الوحيد")}
          </div>
          <p style={{ fontFamily: AR_DISPLAY, margin: "0.8rem 0 0", fontSize: "clamp(1.35rem, 4.2vw, 2.1rem)", lineHeight: 1.5, color: "var(--text-primary)" }}>
            {t("No claim reaches you without a real, resolvable source.", "ولا ادّعاء يوصلك من غير مصدرٍ حقيقيٍّ تقدر ترجعله.")}
          </p>
        </div>
      </section>

      {/* ══ FEATURE · train the reflex — the product, after the law ══ */}
      <CognitionCurriculum />

      {/* ══ FEATURES + TEAM · the arsenal & the people, before the CTA ══ */}
      <TheEngines />
      <TheArsenal />
      <BilingualThemes />
      <TheTeam />

      {/* ══ PROOF · real dissected claims + the honest trust method (added, not a redesign) ══ */}
      <div style={{ maxWidth: 1120, marginInline: "auto", paddingInline: "clamp(1rem, 4vw, 2.5rem)", paddingBlock: "clamp(2rem, 6vh, 3.5rem)", display: "flex", flexDirection: "column", gap: "clamp(2.5rem, 7vh, 4.5rem)" }}>
        <GlyphRule />
        <MostDissected />
        <TrustStrip />
      </div>

      {/* ── FINAL CTA ───────────────────────────────────────────────── */}
      <section style={{ textAlign: "center", paddingInline: "clamp(1rem, 4vw, 2.5rem)", paddingBlock: "clamp(2.5rem, 7vh, 5rem)" }}>
        <div className="reveal-stagger" style={{ maxWidth: 680, marginInline: "auto" }}>
          <GlyphRule />
          <p style={{ fontFamily: AR_DISPLAY, color: HALL.gold, fontSize: "clamp(1.05rem, 3vw, 1.4rem)", margin: "0.4rem 0 0.6rem", lineHeight: 1.6 }}>
            {t("The Guardian sees it. The Scribe records it. The Judge weighs it.", "الحارس يراه. الكاتب يسجّله. الحَكَم يزنه.")}
          </p>
          <h2 style={{ fontFamily: AR_DISPLAY, margin: "0 0 0", fontSize: "clamp(2rem, 6vw, 3.4rem)", lineHeight: 1.2, color: "var(--text-primary)" }}>
            {t("Now it's your turn.", "دلوقتي جه دورك.")}
          </h2>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "1.7rem" }}>
            <Link href="/tools" className="hall-cta" style={{ ...goldBtn, fontSize: "1.08rem", padding: "0.95rem 1.8rem" }}>
              {t("Enter the Hall", "ادخل القاعة")}
              <ArrowRight size={19} style={arrow} />
            </Link>
          </div>
        </div>
      </section>

      <PageNavigation currentPath="/" />
    </div>
  );
}

export default WelcomeV2;
