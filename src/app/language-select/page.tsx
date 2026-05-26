"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRTL } from "@/components/shared/rtl-provider";
import { Globe, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

type Lang = "ar" | "en" | "ar-EG";

export default function LanguageSelectPage() {
  const router = useRouter();
  const { isRTL, toggleDirection } = useRTL();
  const [selected, setSelected] = useState<Lang | null>(null);
  const [entering, setEntering] = useState(false);

  // Keep user on page if they land here - removed auto-redirect to avoid 'pounce back' loops
  // Users can now change language even if previously selected
  useEffect(() => {
    const prev = localStorage.getItem("eal-language-selected");
    // Only pre-select if it exists, but don't redirect
    if (prev === "true") {
      const lang = localStorage.getItem("eal-language") as Lang;
      if (lang) setSelected(lang);
    }
  }, []);

  const handleSelect = (lang: Lang) => {
    setSelected(lang);
    // Switch RTL if needed
    if ((lang === "ar" || lang === "ar-EG") && !isRTL) toggleDirection();
    if (lang === "en" && isRTL) toggleDirection();
  };

  const handleContinue = () => {
    if (!selected) return;
    setEntering(true);
    localStorage.setItem("eal-language-selected", "true");
    localStorage.setItem("eal-language", selected);
    setTimeout(() => router.push("/chatbot"), 600);
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "var(--bg-primary)", padding: 24, position: "relative", overflow: "hidden",
    }}>
      {/* Decorative orbs */}
      <div style={{ position: "absolute", top: "10%", left: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.08), transparent 70%)", pointerEvents: "none" }}/>
      <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.06), transparent 70%)", pointerEvents: "none" }}/>

      <div style={{
        maxWidth: 600, width: "100%", textAlign: "center", position: "relative", zIndex: 1,
        opacity: entering ? 0 : 1, transform: entering ? "scale(0.95)" : "scale(1)",
        transition: "all 0.5s ease",
      }}>
        {/* Logo */}
        <div style={{ width: 72, height: 72, borderRadius: 20, background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.15))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", border: "1px solid var(--border-primary)" }}>
          <Sparkles size={32} style={{ color: "var(--accent-cta)" }}/>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--text-primary)", marginBottom: 8, lineHeight: 1.4 }}>
          مكتبة الوعي المصرية
        </h1>
        <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 6 }}>
          Egyptian Awareness Library
        </p>
        <p style={{ fontSize: 13, color: "var(--text-caption)", marginBottom: 40 }}>
          اختر لغتك المفضلة · Choose your preferred language
        </p>

        {/* Language cards — 3 options */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 32 }}>
          {/* Arabic (Standard) */}
          <button onClick={() => handleSelect("ar")} style={{
            padding: "28px 16px", borderRadius: 16, cursor: "pointer", transition: "all 0.3s ease",
            background: selected === "ar" ? "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(139,92,246,0.05))" : "var(--bg-secondary)",
            border: selected === "ar" ? "2px solid rgba(139,92,246,0.5)" : "2px solid var(--border-primary)",
            boxShadow: selected === "ar" ? "0 4px 20px rgba(139,92,246,0.15)" : "none",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 36 }}>🌙</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)", fontFamily: "'Noto Kufi Arabic','Cairo',sans-serif" }}>العربية</span>
            <span style={{ fontSize: 11, color: "var(--text-caption)" }}>Arabic (Standard)</span>
          </button>

          {/* Egyptian Arabic */}
          <button onClick={() => handleSelect("ar-EG")} style={{
            padding: "28px 16px", borderRadius: 16, cursor: "pointer", transition: "all 0.3s ease",
            background: selected === "ar-EG" ? "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(245,158,11,0.05))" : "var(--bg-secondary)",
            border: selected === "ar-EG" ? "2px solid rgba(245,158,11,0.5)" : "2px solid var(--border-primary)",
            boxShadow: selected === "ar-EG" ? "0 4px 20px rgba(245,158,11,0.15)" : "none",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 36 }}>🇪🇬</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)", fontFamily: "'Noto Kufi Arabic','Cairo',sans-serif" }}>مصري</span>
            <span style={{ fontSize: 11, color: "var(--text-caption)" }}>Egyptian Arabic</span>
          </button>

          {/* English */}
          <button onClick={() => handleSelect("en")} style={{
            padding: "28px 16px", borderRadius: 16, cursor: "pointer", transition: "all 0.3s ease",
            background: selected === "en" ? "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(59,130,246,0.05))" : "var(--bg-secondary)",
            border: selected === "en" ? "2px solid rgba(59,130,246,0.5)" : "2px solid var(--border-primary)",
            boxShadow: selected === "en" ? "0 4px 20px rgba(59,130,246,0.15)" : "none",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 36 }}>🌐</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)" }}>English</span>
            <span style={{ fontSize: 11, color: "var(--text-caption)" }}>الإنجليزية</span>
          </button>
        </div>

        {/* Continue button */}
        <button onClick={handleContinue} disabled={!selected} style={{
          width: "100%", padding: "14px 24px", borderRadius: 12, border: "none", fontSize: 16, fontWeight: 700,
          cursor: selected ? "pointer" : "not-allowed",
          background: selected ? "var(--accent-cta)" : "var(--bg-elevated)",
          color: selected ? "#fff" : "var(--text-caption)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          transition: "all 0.3s",
          boxShadow: selected ? "0 4px 16px rgba(139,92,246,0.3)" : "none",
          fontFamily: (selected === "ar" || selected === "ar-EG") ? "'Noto Kufi Arabic','Cairo',sans-serif" : "inherit",
        }}>
          {selected === "ar" ? (
            <><ArrowLeft size={18}/> ابدأ الآن</>
          ) : selected === "ar-EG" ? (
            <><ArrowLeft size={18}/> يلا نبدأ</>
          ) : selected === "en" ? (
            <>Get Started <ArrowRight size={18}/></>
          ) : (
            <><Globe size={18}/> اختر لغة · Choose a language</>
          )}
        </button>

        <p style={{ fontSize: 11, color: "var(--text-caption)", marginTop: 16, lineHeight: 1.7 }}>
          يمكنك تغيير اللغة لاحقاً من الإعدادات · You can change the language later from settings
        </p>
      </div>
    </div>
  );
}
