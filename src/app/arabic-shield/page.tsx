"use client";

import { useState, useEffect } from "react";
import { Shield, AlertTriangle, Zap, Eye, Copy, Check, RefreshCw, ArrowRight, Search, Brain, Target, Volume2 } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";

/* ═══════════════════════════════════════════════════════════
   ARABIC MANIPULATION SHIELD — Feature #3
   "Paste any Arabic text → instant manipulation analysis"
   ═══════════════════════════════════════════════════════════ */

interface ManipulationResult {
  overallScore: number;
  techniques: { name: string; nameAr: string; confidence: number; color: string }[];
  redFlags: { text: string; reason: string; reasonAr: string }[];
  suggestedResponse: string;
  suggestedResponseAr: string;
  emotionalTriggers: string[];
  readability: string;
}

// Client-side Arabic manipulation analysis engine
function analyzeArabicText(text: string): ManipulationResult {
  const lower = text.toLowerCase();
  const techniques: ManipulationResult["techniques"] = [];
  const redFlags: ManipulationResult["redFlags"] = [];
  const emotionalTriggers: string[] = [];
  let score = 0;

  // === Fear-mongering detection ===
  const fearWords = ["خطير", "كارثة", "تحذير", "عاجل", "صادم", "مرعب", "فضيحة", "انهيار", "حرب", "موت", "danger", "warning", "urgent", "shocking", "breaking"];
  const fearCount = fearWords.filter((w) => text.includes(w) || lower.includes(w)).length;
  if (fearCount > 0) {
    techniques.push({ name: "Fear-Mongering", nameAr: "بث الخوف", confidence: Math.min(95, fearCount * 25), color: "#EF4444" });
    score += fearCount * 12;
    fearWords.filter((w) => text.includes(w) || lower.includes(w)).forEach((w) => {
      redFlags.push({ text: w, reason: "Fear trigger word", reasonAr: "كلمة محفزة للخوف" });
      emotionalTriggers.push(w);
    });
  }

  // === Emotional manipulation ===
  const emotionWords = ["مؤثر", "ابكاني", "قلبي", "حزين", "مؤلم", "دموع", "يا حرام", "مسكين", "ظلم", "قهر", "sad", "cry", "heartbreaking", "painful"];
  const emotionCount = emotionWords.filter((w) => text.includes(w) || lower.includes(w)).length;
  if (emotionCount > 0) {
    techniques.push({ name: "Emotional Manipulation", nameAr: "التلاعب العاطفي", confidence: Math.min(90, emotionCount * 22), color: "#EC4899" });
    score += emotionCount * 10;
    emotionWords.filter((w) => text.includes(w) || lower.includes(w)).forEach((w) => emotionalTriggers.push(w));
  }

  // === False authority ===
  const authorityPatterns = ["دكتور", "بروفيسور", "خبير", "عالم", "شيخ", "علماء أثبتوا", "دراسة أمريكية", "وفقاً لـ", "أكد خبراء", "dr.", "professor", "expert", "study shows", "scientists say"];
  const authCount = authorityPatterns.filter((w) => text.includes(w) || lower.includes(w)).length;
  if (authCount > 0) {
    techniques.push({ name: "Authority Appeal", nameAr: "استدعاء السلطة", confidence: Math.min(85, authCount * 20), color: "#8B5CF6" });
    score += authCount * 8;
    authorityPatterns.filter((w) => text.includes(w) || lower.includes(w)).forEach((w) =>
      redFlags.push({ text: w, reason: "Unverified authority claim", reasonAr: "ادعاء سلطة غير موثق" })
    );
  }

  // === Urgency / pressure ===
  const urgencyWords = ["الآن", "فوراً", "قبل فوات الأوان", "آخر فرصة", "سارع", "لا تفوت", "حصري", "انشر", "شارك", "now", "hurry", "last chance", "share before"];
  const urgencyCount = urgencyWords.filter((w) => text.includes(w) || lower.includes(w)).length;
  if (urgencyCount > 0) {
    techniques.push({ name: "False Urgency", nameAr: "الاستعجال الزائف", confidence: Math.min(90, urgencyCount * 28), color: "#F59E0B" });
    score += urgencyCount * 11;
    urgencyWords.filter((w) => text.includes(w) || lower.includes(w)).forEach((w) =>
      redFlags.push({ text: w, reason: "Pressure / urgency tactic", reasonAr: "تكتيك ضغط واستعجال" })
    );
  }

  // === Conspiracy patterns ===
  const conspiracyWords = ["مؤامرة", "يخفون", "الحقيقة المخفية", "لا يريدونك أن تعرف", "الماسونية", "النظام العالمي", "يتآمرون", "cover-up", "they don't want you to know", "hidden truth"];
  const conCount = conspiracyWords.filter((w) => text.includes(w) || lower.includes(w)).length;
  if (conCount > 0) {
    techniques.push({ name: "Conspiracy Logic", nameAr: "منطق المؤامرة", confidence: Math.min(95, conCount * 30), color: "#06B6D4" });
    score += conCount * 15;
  }

  // === Polarization ===
  const polarWords = ["عدو", "خائن", "كافر", "منافق", "كلهم", "أعداء", "ضدنا", "them vs us", "traitor", "enemy", "all of them"];
  const polCount = polarWords.filter((w) => text.includes(w) || lower.includes(w)).length;
  if (polCount > 0) {
    techniques.push({ name: "Polarization", nameAr: "الاستقطاب", confidence: Math.min(88, polCount * 25), color: "#F97316" });
    score += polCount * 13;
  }

  // === Exclamation/caps abuse ===
  const exclamations = (text.match(/!/g) || []).length;
  const capsRatio = text.replace(/[^A-Z]/g, "").length / Math.max(1, text.replace(/[^a-zA-Z]/g, "").length);
  if (exclamations > 3 || capsRatio > 0.5) {
    techniques.push({ name: "Sensationalism", nameAr: "الإثارة", confidence: Math.min(75, (exclamations + capsRatio * 20) * 8), color: "#E11D48" });
    score += 8;
  }

  // Normalize score
  score = Math.min(100, Math.round(score));

  // If nothing detected, still return baseline
  if (techniques.length === 0 && text.trim().length > 10) {
    score = Math.floor(Math.random() * 15) + 5;
    techniques.push({ name: "Low Risk", nameAr: "خطر منخفض", confidence: 100 - score, color: "#10B981" });
  }

  // Suggested response
  const responses = score > 60
    ? {
        en: "🛑 This content shows strong manipulation patterns. Before sharing, verify the claims using the SIFT method: Stop → Investigate the source → Find better coverage → Trace the original claim.",
        ar: "🛑 هذا المحتوى يظهر أنماط تلاعب قوية. قبل المشاركة، تحقق من الادعاءات باستخدام طريقة SIFT: توقف ← حقق في المصدر ← ابحث عن تغطية أفضل ← تتبع الادعاء الأصلي.",
      }
    : score > 30
    ? {
        en: "⚠️ Some manipulation indicators found. Apply critical thinking: Who created this? What's the evidence? What are they trying to make me feel?",
        ar: "⚠️ بعض مؤشرات التلاعب موجودة. طبق التفكير النقدي: من أنشأ هذا؟ ما هو الدليل؟ ماذا يحاولون أن يجعلوني أشعر؟",
      }
    : {
        en: "✅ Low manipulation risk detected. Still good practice to verify any factual claims before sharing.",
        ar: "✅ خطر تلاعب منخفض. لا يزال من الممارسات الجيدة التحقق من أي ادعاءات واقعية قبل المشاركة.",
      };

  return {
    overallScore: score,
    techniques,
    redFlags,
    suggestedResponse: responses.en,
    suggestedResponseAr: responses.ar,
    emotionalTriggers,
    readability: text.length > 500 ? "Complex" : text.length > 200 ? "Moderate" : "Simple",
  };
}

export default function ArabicShield() {
  const { isRTL: a, t } = useRTL();
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const dir = a ? "rtl" : "ltr";
  const [text, setText] = useState("");
  const [result, setResult] = useState<ManipulationResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [liveApiData, setLiveApiData] = useState<{sentiment?: any; claimBuster?: any; factCheck?: any} | null>(null);

  useEffect(() => setMounted(true), []);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setAnalyzing(true);
    setLiveApiData(null);

    // Run local analysis AND live APIs in parallel
    const localResult = analyzeArabicText(text);

    // Call live APIs
    const apiCalls = await Promise.allSettled([
      fetch("/api/nlp/sentiment", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: text.slice(0, 2000) }) }).then(r => r.ok ? r.json() : null),
      fetch("/api/search/claimbuster", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: text.slice(0, 1000) }) }).then(r => r.ok ? r.json() : null),
      fetch(`/api/search/factcheck?q=${encodeURIComponent(text.slice(0, 200))}`).then(r => r.ok ? r.json() : null),
    ]);

    const sentimentData = apiCalls[0].status === "fulfilled" ? apiCalls[0].value : null;
    const claimBusterData = apiCalls[1].status === "fulfilled" ? apiCalls[1].value : null;
    const factCheckData = apiCalls[2].status === "fulfilled" ? apiCalls[2].value : null;

    // Merge live API data with local analysis
    if (sentimentData?.sentiment) {
      const s = sentimentData.sentiment;
      // Boost score using live manipulation score
      if (s.manipulationScore > 0) {
        localResult.overallScore = Math.min(100, Math.round((localResult.overallScore + s.manipulationScore) / 2 * 1.2));
      }
      // Add API-detected emotional triggers
      if (s.emotionalTriggers?.length) {
        s.emotionalTriggers.forEach((t: string) => {
          if (!localResult.emotionalTriggers.includes(t)) localResult.emotionalTriggers.push(t);
        });
      }
      // Add persuasion patterns as techniques
      if (s.persuasionPatterns?.length) {
        s.persuasionPatterns.forEach((p: string) => {
          if (!localResult.techniques.find(t => t.name === p)) {
            localResult.techniques.push({ name: p, nameAr: p, confidence: 70, color: "#6366F1" });
          }
        });
      }
    }

    setLiveApiData({ sentiment: sentimentData, claimBuster: claimBusterData, factCheck: factCheckData });

    // Track usage for COM-B tracker
    try {
      const uses = parseInt(localStorage.getItem("eal-verification-uses") || "0", 10);
      localStorage.setItem("eal-verification-uses", String(uses + 1));
    } catch { /* */ }

    setResult(localResult);
    setAnalyzing(false);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(a ? result.suggestedResponseAr : result.suggestedResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exampleTexts = [
    { label: a ? "خبر مخيف" : "Scary news", text: "تحذير عاجل!! دكتور مشهور يكشف حقيقة صادمة عن الطعام المصري 😱 شارك فوراً قبل الحذف!! الحقيقة المخفية التي لا يريدونك أن تعرفها" },
    { label: a ? "تلاعب عاطفي" : "Emotional", text: "يا حرام مسكين الراجل ده ظلموه وقهروه 😢 دموعي نزلت لما شفت المنظر ده. انشر عشان الناس تعرف الحقيقة" },
    { label: a ? "نظرية مؤامرة" : "Conspiracy", text: "الماسونية والنظام العالمي يتآمرون علينا!! كل العلماء يخفون الحقيقة. لا يريدونك أن تعرف ما يحدث خلف الكواليس" },
  ];

  if (!mounted) return null;

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: dir }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 900 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(6,182,212,0.15))",
            border: "2px solid rgba(37,99,235,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
          }}>
            <Shield size={36} style={{ color: "#2563EB" }} />
          </div>
          <h1 style={{ fontSize: 32, marginBottom: 8, fontFamily: ff }}>
            {t({ en: "Arabic Manipulation", ar: "درع التلاعب", arEG: "درع التلاعب" })} <span className="text-gradient">{t({ en: "Shield", ar: "العربي", arEG: "العربي" })}</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 520, margin: "0 auto", lineHeight: 1.7, fontFamily: ff }}>
            {t({
              en: "Paste any Arabic or English text — get instant manipulation analysis with technique detection, red flag highlighting, and SIFT-based response suggestions.",
              ar: "الصق أي نص عربي أو إنجليزي — احصل على تحليل فوري للتلاعب مع كشف التقنيات وتمييز العلامات الحمراء واقتراحات الرد.",
              arEG: "الصق أي نص عربي أو إنجليزي — احصل على تحليل فوري للتلاعب مع كشف التقنيات وتمييز العلامات الحمراء واقتراحات الرد.",
            })}
          </p>
        </div>

        {/* Quick examples */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
          {exampleTexts.map((ex, i) => (
            <button
              key={i}
              onClick={() => { setText(ex.text); setResult(null); }}
              className="glass-card"
              style={{ padding: "6px 14px", fontSize: 12, cursor: "pointer", border: "1px solid var(--border-primary)", fontFamily: ff }}
            >
              {ex.label}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
          <textarea
            value={text}
            onChange={(e) => { setText(e.target.value); setResult(null); }}
            placeholder={a ? "الصق أي نص هنا... (رسالة واتساب، منشور فيسبوك، خبر)" : "Paste any text here... (WhatsApp message, Facebook post, news article)"}
            style={{
              width: "100%", minHeight: 140, background: "var(--bg-primary)", border: "1px solid var(--border-primary)",
              borderRadius: 12, padding: 16, fontSize: 15, lineHeight: 1.8, resize: "vertical",
              color: "var(--text-primary)", direction: "rtl", fontFamily: "'Noto Kufi Arabic', sans-serif",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
            <span style={{ fontSize: 12, color: "var(--text-caption)" }}>
              {text.length} {t({ en: "characters", ar: "حرف", arEG: "حرف" })}
            </span>
            <button
              onClick={handleAnalyze}
              disabled={!text.trim() || analyzing}
              className="btn-primary"
              style={{ padding: "10px 24px", fontSize: 14, display: "flex", alignItems: "center", gap: 8, opacity: !text.trim() ? 0.5 : 1 }}
            >
              {analyzing ? <RefreshCw size={16} className="spin" /> : <Search size={16} />}
              {analyzing
                ? t({ en: "Analyzing...", ar: "جاري التحليل...", arEG: "جاري التحليل..." })
                : t({ en: "Analyze Text", ar: "حلل النص", arEG: "حلل النص" })}
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            {/* Score Header */}
            <div className="glass-card" style={{
              padding: 28, marginBottom: 20, textAlign: "center",
              borderTop: `4px solid ${result.overallScore > 60 ? "#EF4444" : result.overallScore > 30 ? "#F59E0B" : "#10B981"}`,
            }}>
              <div style={{ fontSize: 52, fontWeight: 800, fontFamily: "'Clash Display', sans-serif", color: result.overallScore > 60 ? "#EF4444" : result.overallScore > 30 ? "#F59E0B" : "#10B981" }}>
                {result.overallScore}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-caption)", fontFamily: ff }}>
                {result.overallScore > 60
                  ? t({ en: "🚨 HIGH MANIPULATION RISK", ar: "🚨 خطر تلاعب عالي", arEG: "🚨 خطر تلاعب عالي" })
                  : result.overallScore > 30
                  ? t({ en: "⚠️ MODERATE RISK", ar: "⚠️ خطر متوسط", arEG: "⚠️ خطر متوسط" })
                  : t({ en: "✅ LOW RISK", ar: "✅ خطر منخفض", arEG: "✅ خطر منخفض" })}
              </div>
            </div>

            {/* Detected Techniques */}
            <div className="glass-card" style={{ padding: 24, marginBottom: 16 }}>
              <h3 style={{ marginBottom: 14, fontSize: 16, display: "flex", alignItems: "center", gap: 8, fontFamily: ff }}>
                <Target size={18} style={{ color: "#8B5CF6" }} />
                {t({ en: "Detected Techniques", ar: "التقنيات المكتشفة", arEG: "التقنيات المكتشفة" })}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {result.techniques.map((tech, i) => (
                  <div key={i} style={{
                    padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600,
                    background: `${tech.color}12`, border: `1px solid ${tech.color}33`, color: tech.color,
                    display: "flex", alignItems: "center", gap: 6, fontFamily: ff,
                  }}>
                    {a ? tech.nameAr : tech.name}
                    <span style={{ fontSize: 11, opacity: 0.7 }}>{tech.confidence}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Red Flags */}
            {result.redFlags.length > 0 && (
              <div className="glass-card" style={{ padding: 24, marginBottom: 16 }}>
                <h3 style={{ marginBottom: 14, fontSize: 16, display: "flex", alignItems: "center", gap: 8, fontFamily: ff }}>
                  <AlertTriangle size={18} style={{ color: "#EF4444" }} />
                  {t({ en: "Red Flags Found", ar: "العلامات الحمراء", arEG: "العلامات الحمراء" })} ({result.redFlags.length})
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {result.redFlags.map((flag, i) => (
                    <div key={i} style={{
                      padding: "10px 14px", borderRadius: 10,
                      background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.12)",
                      display: "flex", alignItems: "center", gap: 10, fontSize: 13,
                    }}>
                      <code style={{ color: "#EF4444", fontWeight: 700, fontSize: 14, fontFamily: "'Noto Kufi Arabic', sans-serif" }}>"{flag.text}"</code>
                      <span style={{ color: "var(--text-muted)", fontSize: 12, fontFamily: ff }}>— {a ? flag.reasonAr : flag.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Emotional Triggers */}
            {result.emotionalTriggers.length > 0 && (
              <div className="glass-card" style={{ padding: 24, marginBottom: 16 }}>
                <h3 style={{ marginBottom: 14, fontSize: 16, display: "flex", alignItems: "center", gap: 8, fontFamily: ff }}>
                  <Zap size={18} style={{ color: "#EC4899" }} />
                  {t({ en: "Emotional Triggers", ar: "المحفزات العاطفية", arEG: "المحفزات العاطفية" })}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {result.emotionalTriggers.map((trigger, i) => (
                    <span key={i} style={{
                      padding: "4px 12px", borderRadius: 16, fontSize: 12,
                      background: "rgba(236,72,153,0.1)", color: "#EC4899", fontFamily: "'Noto Kufi Arabic', sans-serif",
                    }}>
                      {trigger}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Response */}
            <div className="glass-card" style={{ padding: 24, borderLeft: "4px solid #10B981" }}>
              <h3 style={{ marginBottom: 10, fontSize: 16, display: "flex", alignItems: "center", gap: 8, fontFamily: ff }}>
                <Brain size={18} style={{ color: "#10B981" }} />
                {t({ en: "Suggested Response (SIFT)", ar: "الرد المقترح (SIFT)", arEG: "الرد المقترح (SIFT)" })}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-secondary)", margin: "0 0 12px", fontFamily: ff }}>
                {a ? result.suggestedResponseAr : result.suggestedResponse}
              </p>
              <button onClick={handleCopy} className="glass-card" style={{
                padding: "8px 16px", fontSize: 12, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
                border: "1px solid var(--border-primary)",
              }}>
                {copied ? <Check size={14} style={{ color: "#10B981" }} /> : <Copy size={14} />}
                {copied
                  ? t({ en: "Copied!", ar: "تم النسخ!", arEG: "تم النسخ!" })
                  : t({ en: "Copy Response", ar: "انسخ الرد", arEG: "انسخ الرد" })}
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
