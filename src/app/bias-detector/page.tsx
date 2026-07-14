"use client";

/* BIAS DETECTOR — cognitive-bias scanner over VADER + NLP pattern matching.
 *
 * DESIGN SCHOOL: Liquid Glass + Claymorphism + Maximalism (rich, glossy, alive).
 * The scanner console and the report sit on translucent LIQUID-GLASS panels
 * (`.ds-liquid-glass`) with a real glossy top highlight and a cursor-following
 * sheen (feeds --mx/--my on mouse-move). Primary action is a puffy CLAY button
 * (`.btn--clay`). The hero is maximalist — big display type, an accent-word
 * device and the theme `--hero-glow` halo. Detected biases render as accent
 * `.card--tinted` tiles; the encyclopedia is a reveal-stagger grid of tinted
 * cards. Theme-token bound (17 modes), RTL-safe (logical props), reduced-motion
 * aware. Real /api/bias-detect + Arabic bilingual text preserved.
 * ONE-LAW: the report is STRUCTURED from real detector fields — no fabricated
 * numbers; the raw payload stays available in a collapsible <details>. */

import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

import React, { useState } from "react";
import { Scale, Sparkles, Shield, AlertTriangle, Brain, Eye, Target, TrendingUp, Search, Layers, Gauge } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { ConceptExplainer } from "@/components/shared/concept-explainer";
import ToolGuide from "@/components/ToolGuide";
import Link from "next/link";

const ACCENT = "var(--accent-indigo)"; // the bias-detector identity (theme-bound)

const COGNITIVE_BIASES = [
  {
    id: "confirmation",
    en: "Confirmation Bias",
    ar: "انحياز التأكيد",
    descEn: "Tendency to search for information that confirms pre-existing beliefs — identified by Wason (1960) and expanded by Nickerson (1998).",
    descAr: "الميل للبحث عن معلومات تؤكد المعتقدات المسبقة — حددها واسون (1960) ووسّعها نيكرسون (1998).",
    egyptEn: "Egyptian social media users share health posts confirming folk remedies while ignoring WHO/CAPMAS clinical data.",
    egyptAr: "مستخدمو السوشيال ميديا في مصر يشاركون منشورات صحية تؤكد العلاجات الشعبية بينما يتجاهلون بيانات منظمة الصحة العالمية والجهاز المركزي.",
    color: "var(--accent-indigo)",
    icon: "🔍",
  },
  {
    id: "anchoring",
    en: "Anchoring Bias",
    ar: "انحياز الإرساء",
    descEn: "Over-relying on the first piece of information encountered — Tversky & Kahneman (1974), Judgment under Uncertainty.",
    descAr: "الاعتماد المفرط على أول معلومة — تفرسكي وكانمان (1974)، الحكم تحت الشك.",
    egyptEn: "A viral WhatsApp claim about food prices sets the 'anchor' — all subsequent corrections feel less believable.",
    egyptAr: "ادعاء فيروسي على واتساب عن أسعار الغذاء يضع 'المرساة' — كل التصحيحات اللاحقة تبدو أقل مصداقية.",
    color: "var(--accent-blue)",
    icon: "⚓",
  },
  {
    id: "availability",
    en: "Availability Heuristic",
    ar: "استدلال التوافر",
    descEn: "Judging probability by how easily examples come to mind — Tversky & Kahneman (1973).",
    descAr: "الحكم على الاحتمالية بناءً على سهولة استرجاع الأمثلة — تفرسكي وكانمان (1973).",
    egyptEn: "After a widely-shared shark attack video in Hurghada, Egyptians massively overestimate shark danger vs. road accidents (12,000+ deaths/yr, CAPMAS 2023).",
    egyptAr: "بعد فيديو هجوم قرش في الغردقة انتشر بشكل واسع، المصريون يبالغون في تقدير خطر القروش مقارنة بحوادث الطرق (12,000+ وفاة/سنة، الجهاز المركزي 2023).",
    color: "var(--accent-amber)",
    icon: "💭",
  },
  {
    id: "dunning-kruger",
    en: "Dunning-Kruger Effect",
    ar: "تأثير دانينج-كروجر",
    descEn: "Low-skilled individuals overestimate their competence — Kruger & Dunning (1999), Journal of Personality and Social Psychology.",
    descAr: "الأشخاص ذوو المهارات المنخفضة يبالغون في تقدير كفاءتهم — كروجر ودانينج (1999).",
    egyptEn: "Self-proclaimed 'health experts' on Egyptian Facebook share medical advice with zero clinical training.",
    egyptAr: "\"خبراء صحة\" مزعومون على فيسبوك مصر يشاركون نصائح طبية بدون أي تدريب سريري.",
    color: "var(--accent-red)",
    icon: "📊",
  },
  {
    id: "bandwagon",
    en: "Bandwagon Effect",
    ar: "تأثير العربة",
    descEn: "Adopting beliefs because many others hold them — Leibenstein (1950), Asch conformity experiments (1951).",
    descAr: "تبني المعتقدات لأن كثيرين يؤمنون بها — ليبنشتاين (1950)، تجارب أش للامتثال (1951).",
    egyptEn: "When a rumor gets 50K shares on Egyptian Twitter, it feels 'true' purely from social proof regardless of evidence.",
    egyptAr: "عندما يحصل إشاعة على 50 ألف مشاركة على تويتر مصر، تبدو 'حقيقية' فقط من الدليل الاجتماعي بغض النظر عن الأدلة.",
    color: "var(--accent-emerald)",
    icon: "🚂",
  },
  {
    id: "framing",
    en: "Framing Effect",
    ar: "تأثير الإطار",
    descEn: "Drawing different conclusions from the same data based on presentation — Tversky & Kahneman (1981), Prospect Theory.",
    descAr: "استخلاص استنتاجات مختلفة من نفس البيانات بناءً على طريقة العرض — تفرسكي وكانمان (1981).",
    egyptEn: "'95% of Egyptian youth are unemployed' vs '5% unemployment rate among graduates' — same data, different emotional impact.",
    egyptAr: "'95% من شباب مصر عاطلون' مقابل 'معدل بطالة 5% بين الخريجين' — نفس البيانات، تأثير عاطفي مختلف.",
    color: "var(--accent-indigo)",
    icon: "🖼️",
  },
  {
    id: "authority",
    en: "Authority Bias",
    ar: "انحياز السلطة",
    descEn: "Attributing greater accuracy to the opinion of an authority figure — Milgram (1963), Stanley Milgram obedience studies.",
    descAr: "نسب دقة أكبر لرأي شخصية ذات سلطة — ميلجرام (1963).",
    egyptEn: "A self-proclaimed sheikh's medical advice is trusted over actual physicians in Egyptian communities.",
    egyptAr: "نصيحة شيخ مزعوم طبياً تُصدَّق أكثر من الأطباء الحقيقيين في المجتمعات المصرية.",
    color: "var(--accent-purple)",
    icon: "👔",
  },
  {
    id: "sunk-cost",
    en: "Sunk Cost Fallacy",
    ar: "مغالطة التكلفة الغارقة",
    descEn: "Continuing a behavior due to previously invested resources — Arkes & Blumer (1985).",
    descAr: "الاستمرار في سلوك بسبب الموارد المستثمرة سابقاً — أركيس وبلومر (1985).",
    egyptEn: "Continuing to visit an expensive 'ruqyah healer' because you already paid — instead of seeking real psychiatric care.",
    egyptAr: "الاستمرار في زيارة 'معالج بالرقية' مكلف لأنك دفعت بالفعل — بدلاً من طلب رعاية نفسية حقيقية.",
    color: "var(--accent-amber)",
    icon: "💸",
  },
];

/* Feed the cursor position (%) into --mx/--my so the liquid-glass sheen
   tracks the pointer. Pure decoration; no effect on layout or a11y. */
function useGlassSheen() {
  return (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };
}

export default function BiasDetectorPage() {
  const { isRTL, t } = useRTL();
  const onGlassSheen = useGlassSheen();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [expandedBias, setExpandedBias] = useState<string | null>(null);

  const handleAnalyze = async (override?: string) => {
    const payloadText = typeof override === "string" ? override : text;
    if (!payloadText.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/bias-detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: payloadText }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
      setResult({ error: "Failed to connect to Bias Detector." });
    }
    setLoading(false);
  };

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      style={{ ['--accent-cta' as string]: ACCENT, paddingTop: "var(--navbar-height)", minHeight: "100vh", background: "var(--bg-page)", color: "var(--text-primary)" }}
    >
      {/* HERO — maximalist: big display type, accent-word, glowing halo, glass stat strip */}
      <div className="container" style={{ padding: "var(--space-2xl) var(--space-lg) var(--space-lg)", position: "relative", maxWidth: 960 }}>
        <div aria-hidden style={{ position: "absolute", inset: "-20% -10% auto -10%", height: "200%", background: "var(--hero-glow)", pointerEvents: "none", zIndex: 0, filter: "blur(6px)" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative", zIndex: 1 }}>
          <div className="t-label" style={{ color: "var(--accent-cta)", display: "flex", alignItems: "center", gap: 8 }}>
            <Scale size={15} /> {t({ en: "VADER sentiment • 15+ cognitive biases", ar: "تحليل VADER • أكثر من 15 انحيازاً معرفياً" })}
          </div>

          <h1 className="t-display" style={{ margin: 0, maxWidth: "17ch", lineHeight: 1.02 }}>
            {isRTL ? (
              <>كاشف <span className="t-accent-word">التحيّز</span> المعرفي</>
            ) : (
              <>The <span className="t-accent-word">Bias</span> Detector</>
            )}
          </h1>

          <p className="t-body" style={{ margin: 0, maxWidth: "60ch", fontSize: "1.15rem" }}>
            {t({
              en: "Paste any 'convincing' WhatsApp argument and see WHY it feels true even when it isn't. The scanner reads the wording with VADER sentiment analysis and NLP pattern matching, then names the cognitive biases the argument leans on — built on Kahneman & Tversky's heuristics framework.",
              ar: "الصق أي حجة «مقنعة» من واتساب وشوف ليه بتبان صح حتى لو غلط. الماسح بيقرأ الصياغة بتحليل مشاعر VADER ومطابقة أنماط اللغة الطبيعية، وبعدين بيسمّي الانحيازات المعرفية اللي الحجة بتعتمد عليها — مبني على إطار كانمان وتفرسكي للاستدلالات.",
            })}
          </p>

          {/* Concept chips inline with the lede */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", color: "var(--text-muted)" }}>
            <ConceptExplainer term={t({ en: "Cognitive Bias", ar: "الانحياز المعرفي" })} explanation={t({ en: "Systematic pattern of deviation from rational judgment, as catalogued in Kahneman's 'Thinking, Fast and Slow' (2011). Over 180 biases have been identified in psychological literature.", ar: "نمط منهجي من الانحراف عن الحكم العقلاني، كما صنّفه كانمان في 'التفكير، السريع والبطيء' (2011). تم تحديد أكثر من 180 انحيازاً في الأدبيات النفسية." })} type="scientific" />
            <ConceptExplainer term="VADER" explanation={t({ en: "Valence Aware Dictionary and sEntiment Reasoner — a lexicon and rule-based sentiment analysis tool by Hutto & Gilbert (2014), specifically attuned to social media expressions.", ar: "أداة تحليل مشاعر قائمة على القاموس والقواعد من هوتو وجيلبرت (2014)، مضبوطة خصيصاً لتعبيرات وسائل التواصل الاجتماعي." })} type="scientific" />
          </div>

          {/* Glass stat strip — three anchors of authority at a glance */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 4 }}>
            {[
              { icon: <Layers size={20} />, num: "15+", label: t({ en: "cognitive biases", ar: "انحياز معرفي" }) },
              { icon: <Gauge size={20} />, num: "VADER", label: t({ en: "sentiment engine", ar: "محرّك المشاعر" }) },
              { icon: <Brain size={20} />, num: "🇪🇬", label: t({ en: "Egyptian examples", ar: "أمثلة مصرية" }) },
            ].map((s, i) => (
              <div
                key={i}
                className="ds-liquid-glass"
                onMouseMove={onGlassSheen}
                style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 20px", minWidth: 180 }}
              >
                <span style={{ position: "relative", zIndex: 2, color: "var(--accent-cta)", display: "flex" }}>{s.icon}</span>
                <div style={{ position: "relative", zIndex: 2 }}>
                  <div className="t-h3" style={{ margin: 0, color: "var(--text-primary)", lineHeight: 1 }}>{s.num}</div>
                  <div className="t-label" style={{ marginTop: 4 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "0 var(--space-lg) var(--space-2xl)", display: "flex", gap: 32, flexDirection: "column", maxWidth: 960 }}>

        {/* How to use — guide + ready Egyptian examples wired to the scanner */}
        <ToolGuide
          titleEn="How to use the Bias Detector"
          titleAr="كيفية استخدام كاشف التحيز"
          lang={isRTL ? "ar" : "en"}
          accent="#8B5CF6"
          whoBenefits={{
            en: "Anyone who gets forwarded a 'convincing' WhatsApp argument and wants to see WHY it feels true even when it isn't — students, parents checking health claims, and anyone arguing with a relative who 'just knows'.",
            ar: "أي حد بيوصله كلام مقنع على واتساب وعايز يفهم ليه بيبان صح حتى لما يكون غلط — طلبة، وأهل بيتأكدوا من ادعاءات صحية، وأي حد بيتناقش مع قريب «هو عارف وبس».",
          }}
          steps={[
            {
              en: "Copy the argument or claim you received (a WhatsApp message, a Facebook comment, a forwarded voice-note transcript) and paste it into the box below.",
              ar: "انسخ الحجة أو الادعاء اللي وصلك (رسالة واتساب، تعليق فيسبوك، نص فويس نوت) والصقه في الصندوق تحت.",
            },
            {
              en: "Press 'Scan for Biases'. The tool reads the wording and flags which cognitive biases the argument leans on.",
              ar: "اضغط «البحث عن الانحيازات». الأداة تقرأ الصياغة وتحدد الانحيازات المعرفية اللي الحجة بتعتمد عليها.",
            },
            {
              en: "Read the report: each detected bias is named in Arabic and English so you can see the trick instead of the feeling.",
              ar: "اقرأ التقرير: كل انحياز متكشف بيتسمى بالعربي والإنجليزي عشان تشوف الحيلة مش الإحساس.",
            },
            {
              en: "Not sure where to start? Tap a ready example below — it loads a real Egyptian argument and runs the scan for you.",
              ar: "مش عارف تبدأ منين؟ اضغط مثال جاهز تحت — هيحمّل حجة مصرية حقيقية ويشغّل الفحص لك.",
            },
          ]}
          scenarios={[
            {
              label: "'Natural is always safer' herbal claim",
              labelAr: "ادعاء «الطبيعي دايمًا أأمن»",
              tag: "health",
              input:
                "الأعشاب الطبيعية أأمن من الأدوية الكيميائية دايمًا، لأنها من ربنا ومن الأرض. جدتي عاشت 90 سنة على الأعشاب من غير ما تروح لدكتور ولا مرة. الكيماويات بس هي اللي بتعمل سرطان. أي حاجة طبيعية مستحيل تضر.",
            },
            {
              label: "Confirmation-bias health rant",
              labelAr: "كلام انحياز التأكيد الصحي",
              tag: "health",
              input:
                "أنا متأكد إن الأكل اللي في السوبر ماركت كله مسرطن. كل ما أشوف بوست بيقول كده بشيره فورًا، وأي دكتور بيقول العكس يبقى مدفوع من الشركات. مش هصدق أي دراسة بتطمّن، دي كلها مدفوعة، بس البوستات اللي بتحذر دي هي الصح.",
            },
            {
              label: "Sunk-cost 'I already paid the healer'",
              labelAr: "تكلفة غارقة «أنا دفعت للمعالج»",
              tag: "money",
              input:
                "أنا صرفت أكتر من عشرة آلاف جنيه على جلسات المعالج الشعبي ده لحد دلوقتي، فمش معقول أوقف وأروح لدكتور نفسي. لو وقفت يبقى الفلوس اللي دفعتها راحت على الفاضي، فالأحسن أكمل معاه لحد ما يشفيني حتى لو مفيش أي تحسن لغاية دلوقتي.",
            },
            {
              label: "Bandwagon '50K shares = true'",
              labelAr: "عربة «50 ألف مشاركة = حقيقة»",
              tag: "viral",
              input:
                "الخبر ده اتشارك أكتر من 50 ألف مرة على فيسبوك والكل بيقوله، يبقى أكيد حقيقي. مش معقول كل الناس دي تكون غلطانة. لو كان كذب كانوا حذفوه زمان. طالما منتشر كده يبقى لازم نصدقه وننشره إحنا كمان.",
            },
          ]}
          onTry={(input) => {
            setText(input);
            handleAnalyze(input);
          }}
        />

        {/* SCANNER CONSOLE — liquid-glass panel */}
        <div
          className="ds-liquid-glass"
          onMouseMove={onGlassSheen}
          style={{ ['--accent-cta' as string]: ACCENT, padding: "var(--space-lg)" }}
        >
          <div style={{ position: "relative", zIndex: 2 }}>
            <div className="t-label" style={{ marginBottom: 14, display: "flex", alignItems: "center", gap: 8, color: "var(--accent-cta)" }}>
              <Sparkles size={15} /> {t({ en: "Live Bias Scanner", ar: "ماسح الانحياز المباشر" })}
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t({ en: "Enter a statement to check for cognitive biases...\n\nExample: 'Everyone knows that natural remedies are always better than medicine — my grandmother lived to 90 without ever seeing a doctor!'", ar: "أدخل عبارة للتحقق من الانحياز المعرفي...\n\nمثال: 'الكل يعرف إن العلاجات الطبيعية أحسن من الأدوية — جدتي عاشت 90 سنة من غير ما تروح دكتور!'" })}
              style={{
                width: "100%",
                minHeight: 130,
                padding: 16,
                borderRadius: 16,
                background: "color-mix(in srgb, var(--bg-page) 55%, transparent)",
                color: "var(--text-primary)",
                border: "1px solid color-mix(in srgb, var(--text-primary) 16%, transparent)",
                outline: "none",
                resize: "vertical",
                fontSize: "1.05rem",
                lineHeight: 1.6,
                marginBottom: 16,
                boxShadow: "inset 0 2px 6px rgba(0,0,0,0.18)",
                boxSizing: "border-box",
              }}
            />
            <button
              onClick={() => handleAnalyze()}
              className="btn--clay"
              disabled={loading || !text.trim()}
              aria-disabled={loading || !text.trim() || undefined}
              style={{ width: "100%", fontSize: "1.05rem" }}
            >
              {loading
                ? <><span className="spinner" style={{ width: 20, height: 20, border: "2px solid currentColor", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "spin 1s linear infinite" }} /> {t({ en: "Scanning...", ar: "جارٍ الفحص..." })}</>
                : <><Search size={20} /> {t({ en: "Scan for Biases", ar: "البحث عن الانحيازات" })}</>}
            </button>
          </div>
        </div>

        {/* REPORT — structured, liquid-glass. Raw JSON kept only in <details>. */}
        {result && (
          <div
            className="ds-liquid-glass"
            onMouseMove={onGlassSheen}
            style={{ ['--accent-cta' as string]: result.error ? "var(--accent-red)" : ACCENT, padding: "var(--space-lg)" }}
          >
            <div style={{ position: "relative", zIndex: 2 }}>
              <h3 className="t-h3" style={{ margin: "0 0 16px", display: "flex", alignItems: "center", gap: 10 }}>
                <Shield size={22} style={{ color: result.error ? "var(--accent-red)" : "var(--accent-emerald)" }} /> {t({ en: "Bias Report", ar: "تقرير الانحياز" })}
              </h3>

              {result.error ? (
                <div style={{ padding: 16, borderRadius: 12, background: "color-mix(in srgb, var(--accent-red) 8%, transparent)", border: "1px solid color-mix(in srgb, var(--accent-red) 45%, transparent)", display: "flex", alignItems: "center", gap: 10 }}>
                  <AlertTriangle size={20} style={{ color: "var(--accent-red)" }} />
                  <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>
                    {t({ en: "Could not complete the analysis. Please try again.", ar: "تعذّر إكمال التحليل. من فضلك حاول مرة أخرى." })}
                  </span>
                </div>
              ) : (
                <>
                  {/* Summary line — real counts from the detector, no fabricated numbers */}
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
                    <div style={{ padding: "10px 16px", borderRadius: 14, background: "color-mix(in srgb, var(--accent-cta) 12%, var(--bg-elevated))", border: "1px solid color-mix(in srgb, var(--accent-cta) 42%, transparent)", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
                      <strong style={{ color: "var(--accent-cta)", fontSize: 20 }}>{result.totalDetected ?? (result.biases?.length ?? 0)}</strong>
                      <span style={{ color: "var(--text-secondary)" }}>{t({ en: "biases detected", ar: "انحياز مكتشف" })}</span>
                    </div>
                    {typeof result.totalKnown === "number" && (
                      <div style={{ padding: "10px 16px", borderRadius: 14, background: "color-mix(in srgb, var(--bg-page) 45%, transparent)", border: "1px solid color-mix(in srgb, var(--text-primary) 12%, transparent)", fontSize: 13, color: "var(--text-muted)", display: "flex", alignItems: "center" }}>
                        {t({ en: `checked against ${result.totalKnown} known biases`, ar: `تم الفحص مقابل ${result.totalKnown} انحيازاً معروفاً` })}
                      </div>
                    )}
                    {typeof result.processingTimeMs === "number" && (
                      <div className="t-mono" style={{ padding: "10px 16px", borderRadius: 14, background: "color-mix(in srgb, var(--bg-page) 45%, transparent)", border: "1px solid color-mix(in srgb, var(--text-primary) 12%, transparent)", fontSize: 13, color: "var(--text-muted)", display: "flex", alignItems: "center" }}>
                        {result.processingTimeMs} ms
                      </div>
                    )}
                  </div>

                  {/* Detected biases — accent tinted cards; honest empty state when none */}
                  {Array.isArray(result.biases) && result.biases.length > 0 ? (
                    <div className="reveal-stagger" style={{ display: "grid", gap: 12, marginBottom: result.aiEnhancement ? 20 : 0 }}>
                      {result.biases.map((d: any, i: number) => {
                        const b = d.bias ?? d;
                        const conf = typeof d.confidence === "number" ? Math.round(d.confidence * 100) : null;
                        const evidence = isRTL ? (d.evidenceAr || d.evidence) : (d.evidence || d.evidenceAr);
                        return (
                          <div
                            key={b?.id ?? i}
                            className="card card--tinted"
                            style={{ ['--card-accent' as string]: ACCENT, padding: 18 }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: conf != null || evidence ? 10 : 0, flexWrap: "wrap" }}>
                              <strong style={{ color: "var(--accent-cta)", fontSize: 16, fontWeight: 800 }}>{b?.name ?? t({ en: "Detected bias", ar: "انحياز مكتشف" })}</strong>
                              {conf != null && (
                                <span style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}>
                                  {t({ en: "confidence", ar: "الثقة" })}
                                  <span style={{ display: "inline-block", width: 72, height: 7, borderRadius: 4, background: "color-mix(in srgb, var(--text-primary) 12%, transparent)", overflow: "hidden", verticalAlign: "middle" }}>
                                    <span style={{ display: "block", height: "100%", width: `${conf}%`, background: "var(--accent-cta)", borderRadius: 4 }} />
                                  </span>
                                  <strong style={{ color: "var(--text-secondary)" }}>{conf}%</strong>
                                </span>
                              )}
                            </div>
                            {b?.description && (
                              <p style={{ fontSize: 13.5, color: "var(--text-secondary)", margin: "0 0 10px 0", lineHeight: 1.65 }}>{b.description}</p>
                            )}
                            {evidence && (
                              <div style={{ fontSize: 12.5, color: "var(--text-secondary)", background: "color-mix(in srgb, var(--bg-page) 45%, transparent)", borderRadius: 10, padding: "10px 12px", lineHeight: 1.6, borderInlineStart: "3px solid var(--accent-cta)" }}>
                                <span style={{ fontWeight: 700, color: "var(--accent-cta)" }}>{t({ en: "Signal: ", ar: "الدليل: " })}</span>
                                {evidence}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ padding: 24, borderRadius: 16, background: "color-mix(in srgb, var(--bg-page) 45%, transparent)", border: "1px dashed color-mix(in srgb, var(--text-primary) 20%, transparent)", textAlign: "center" }}>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
                      <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
                        {t({ en: "No strong cognitive-bias signals were detected in this text. That does not guarantee it is unbiased — read critically.", ar: "لم يتم رصد إشارات قوية لانحياز معرفي في هذا النص. هذا لا يضمن خلوّه من الانحياز — اقرأ بعين ناقدة." })}
                      </p>
                    </div>
                  )}

                  {/* Optional AI deepening — only shown when the model returned it */}
                  {result.aiEnhancement && (
                    <div style={{ marginTop: 20, padding: 18, borderRadius: 16, background: "color-mix(in srgb, var(--accent-cta) 8%, transparent)", border: "1px solid color-mix(in srgb, var(--accent-cta) 28%, transparent)" }}>
                      <div className="t-label" style={{ color: "var(--accent-cta)", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
                        <Sparkles size={16} /> {t({ en: "Deeper Analysis", ar: "تحليل أعمق" })}
                      </div>
                      {(isRTL ? result.aiEnhancement.dominantBiasAr : result.aiEnhancement.dominantBias) && (
                        <p style={{ fontSize: 13.5, color: "var(--text-secondary)", margin: "0 0 8px 0" }}>
                          <strong style={{ color: "var(--text-primary)" }}>{t({ en: "Dominant bias: ", ar: "الانحياز الغالب: " })}</strong>
                          {isRTL ? (result.aiEnhancement.dominantBiasAr || result.aiEnhancement.dominantBias) : result.aiEnhancement.dominantBias}
                        </p>
                      )}
                      {(isRTL ? result.aiEnhancement.impactAssessmentAr : result.aiEnhancement.impactAssessment) && (
                        <p style={{ fontSize: 13.5, color: "var(--text-secondary)", margin: "0 0 8px 0", lineHeight: 1.65 }}>
                          {isRTL ? (result.aiEnhancement.impactAssessmentAr || result.aiEnhancement.impactAssessment) : result.aiEnhancement.impactAssessment}
                        </p>
                      )}
                      {Array.isArray(isRTL ? result.aiEnhancement.debisingStepsAr : result.aiEnhancement.debisingSteps) && (
                        <div>
                          <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>{t({ en: "Debiasing steps", ar: "خطوات تقليل الانحياز" })}</div>
                          <ul style={{ margin: 0, paddingInlineStart: 20, paddingInlineEnd: 0, fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                            {(isRTL ? result.aiEnhancement.debisingStepsAr : result.aiEnhancement.debisingSteps).map((s: string, i: number) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {result.disclaimer && (
                    <p style={{ fontSize: 11.5, color: "var(--text-caption)", marginTop: 16, lineHeight: 1.6, fontStyle: "italic" }}>
                      {result.disclaimer}
                    </p>
                  )}

                  {/* Raw payload kept available but collapsed for transparency — NOT rendered by default */}
                  <details style={{ marginTop: 16 }}>
                    <summary className="t-mono" style={{ fontSize: 12, color: "var(--text-muted)", cursor: "pointer" }}>{t({ en: "View raw analysis data", ar: "عرض البيانات الخام للتحليل" })}</summary>
                    <pre className="t-mono" style={{ background: "color-mix(in srgb, var(--bg-page) 70%, #000)", padding: 16, borderRadius: 12, overflowX: "auto", fontSize: 12, color: "var(--accent-emerald)", border: "1px solid color-mix(in srgb, var(--text-primary) 12%, transparent)", marginTop: 8 }}>
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </details>
                </>
              )}
            </div>
          </div>
        )}

        {/* Cognitive Biases Encyclopedia — reveal-stagger grid of tinted cards */}
        <div>
          <h2 className="t-h2" style={{ margin: "0 0 8px", display: "flex", alignItems: "center", gap: 10 }}>
            <Brain size={28} style={{ color: "var(--accent-cta)" }} />
            {t({ en: "Cognitive Bias Encyclopedia — Egyptian Context", ar: "موسوعة الانحيازات المعرفية — السياق المصري" })}
          </h2>
          <p className="t-body" style={{ margin: "0 0 20px", fontSize: 14 }}>
            {t({
              en: "Based on Kahneman & Tversky's foundational research. Each bias includes real Egyptian examples from CAPMAS data and local misinformation patterns.",
              ar: "مبني على أبحاث كانمان وتفرسكي التأسيسية. كل انحياز يتضمن أمثلة مصرية حقيقية من بيانات الجهاز المركزي وأنماط المعلومات المضللة المحلية.",
            })}
          </p>
          <div className="reveal-stagger" style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {COGNITIVE_BIASES.map((bias) => {
              const armed = expandedBias === bias.id;
              return (
                <button
                  key={bias.id}
                  onClick={() => setExpandedBias(armed ? null : bias.id)}
                  className="card card--tinted lift"
                  data-armed={armed ? "true" : undefined}
                  style={{ ['--card-accent' as string]: bias.color, cursor: "pointer", width: "100%", textAlign: "start" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 24 }}>{bias.icon}</span>
                    <strong style={{ color: bias.color, fontSize: 16, fontWeight: 800 }}>
                      {t({ en: bias.en, ar: bias.ar })}
                    </strong>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
                    {t({ en: bias.descEn, ar: bias.descAr })}
                  </p>
                  {armed && (
                    <div style={{ marginTop: 12, padding: 12, borderRadius: 12, background: `color-mix(in srgb, ${bias.color} 10%, transparent)`, border: `1px dashed color-mix(in srgb, ${bias.color} 30%, transparent)` }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: bias.color, marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                        <Target size={14} /> {t({ en: "🇪🇬 Egyptian Example", ar: "🇪🇬 مثال مصري" })}
                      </div>
                      <p style={{ fontSize: 13, margin: 0, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                        {t({ en: bias.egyptEn, ar: bias.egyptAr })}
                      </p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Related Tools — glass panel with clay-ish links */}
        <div className="ds-liquid-glass" onMouseMove={onGlassSheen} style={{ padding: "var(--space-lg)" }}>
          <div style={{ position: "relative", zIndex: 2 }}>
            <div className="t-label" style={{ marginBottom: 14, color: "var(--accent-cta)" }}>
              {t({ en: "Related Tools", ar: "أدوات ذات صلة" })}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                { href: "/fallacy-engine", icon: <Brain size={16} />, color: "var(--accent-red)", label: t({ en: "Fallacy Engine", ar: "محرك المغالطات" }) },
                { href: "/god-system", icon: <Eye size={16} />, color: "var(--accent-purple)", label: t({ en: "GOD System", ar: "نظام التحقق الشامل" }) },
                { href: "/sources", icon: <TrendingUp size={16} />, color: "var(--accent-emerald)", label: t({ en: "Sources", ar: "المصادر" }) },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{ padding: "10px 18px", borderRadius: 12, background: "color-mix(in srgb, var(--bg-page) 45%, transparent)", border: "1px solid color-mix(in srgb, var(--text-primary) 12%, transparent)", color: "var(--text-primary)", textDecoration: "none", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}
                >
                  <span style={{ color: l.color, display: "flex" }}>{l.icon}</span> {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <PageNavigation currentPath="/bias-detector" />
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <PageAIChatbot
        pageTitle="Bias Detector — كاشف التحيز"
        pageContext="Egyptian Awareness Library - Bias Detector: AI-powered tool that identifies cognitive biases in text. Analyzes arguments and content for confirmation bias, anchoring, authority bias, and 20+ other cognitive distortions."
        systemPrompt={`You are the EAL Bias Detector AI. You identify and explain cognitive biases in text and reasoning.

BIASES YOU DETECT:
1. Confirmation Bias (Wason 1960, Nickerson 1998): Favoring info that confirms existing beliefs
2. Anchoring Bias: Over-relying on first piece of information
3. Authority Bias: Accepting claims because of who said them
4. In-Group Bias: Favoriting members of own group
5. Availability Heuristic (Tversky & Kahneman 1973): Judging frequency by ease of recall
6. Dunning-Kruger Effect: Overestimating own competence
7. Sunk Cost Fallacy: Continuing bad decisions due to past investment
8. Bandwagon Effect: Believing things because many others do

EGYPTIAN EXAMPLES FOR EACH BIAS.

DEBIASING TECHNIQUES:
- Perspective-taking
- Seeking disconfirming evidence
- Pre-mortem analysis
- Slow thinking (System 2 activation)

For each bias detected: name it in Arabic and English, explain the mechanism, provide an Egyptian example.`}
        suggestedQuestions={[
          'ما هو التحيز الأكثر تأثيراً في مصر؟',
          'كيف أقلل من تحيز التأكيد؟',
          'What is the most dangerous bias for misinformation spread?',
          'How do I detect bias in news articles?',
        ]}
        accentColor="#8b5cf6"
        accentColorRgb="139,92,246"
      />
    </div>
  );
}
