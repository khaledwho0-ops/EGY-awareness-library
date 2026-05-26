"use client";

import Link from "next/link";
import { AlertTriangle, ArrowUpRight, Film } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import {
  TRAILER_MASTER_NEGATIVE_PROMPTS_AR,
  TRAILER_MASTER_NEGATIVE_PROMPTS_EN,
  TRAILER_SCENES,
} from "@/data/trailer/trailer-scenes";

export default function TrailerPage() {
  const { isRTL } = useRTL();
  const negativeBank = isRTL ? TRAILER_MASTER_NEGATIVE_PROMPTS_AR : TRAILER_MASTER_NEGATIVE_PROMPTS_EN;

  return (
    <div style={{ paddingTop: "var(--navbar-height)" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)" }}>
        <section
          className="glass-card"
          style={{
            padding: "var(--space-2xl)",
            marginBottom: "var(--space-xl)",
            background: "radial-gradient(circle at top, rgba(59,130,246,0.14), rgba(7,12,24,0.98) 58%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <Film size={28} style={{ color: "var(--accent-cta)" }} />
            <div>
              <h1 style={{ fontSize: "var(--font-h2)", marginBottom: 6 }}>
                <span className="text-gradient">{isRTL ? "مركز التريلر السينمائي" : "Trailer Prompt Center"}</span>
              </h1>
              <p style={{ color: "var(--text-muted)", margin: 0, maxWidth: 820, lineHeight: 1.8 }}>
                {isRTL
                  ? "تنفيذ CHUNK 4 داخل المنصة: خمس مشاهد تريلر مع التكوين البصري والصوتي والبرومبتات الإيجابية والقيود السلبية."
                  : "In-app implementation of CHUNK 4: five trailer scenes with visual language, sound design, positive prompts, and negative constraints."}
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {TRAILER_SCENES.map((scene) => (
              <a key={scene.id} href={`#${scene.id}`} className="btn-secondary no-underline" style={{ padding: "10px 14px" }}>
                {isRTL ? scene.titleAr : scene.titleEn}
              </a>
            ))}
            <a href="#negative-bank" className="btn-secondary no-underline" style={{ padding: "10px 14px" }}>
              {isRTL ? "بنك النيغاتيف" : "Negative bank"}
            </a>
          </div>
        </section>

        <div style={{ display: "grid", gap: 16 }}>
          {TRAILER_SCENES.map((scene) => {
            const title = isRTL ? scene.titleAr : scene.titleEn;
            const setting = isRTL ? scene.settingAr : scene.settingEn;
            const dialogue = isRTL ? scene.dialogueAr : scene.dialogueEn;
            const cinematography = isRTL ? scene.cinematographyAr : scene.cinematographyEn;
            const soundDesign = isRTL ? scene.soundDesignAr : scene.soundDesignEn;
            const positivePrompt = isRTL ? scene.positivePromptAr : scene.positivePromptEn;
            const negativePrompt = isRTL ? scene.negativePromptAr : scene.negativePromptEn;

            return (
              <section
                id={scene.id}
                key={scene.id}
                className="glass-card"
                style={{ padding: "var(--space-xl)", scrollMarginTop: "calc(var(--navbar-height) + 20px)" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
                  <div>
                    <h2 style={{ marginBottom: 6 }}>{title}</h2>
                    <p style={{ color: "var(--text-muted)", margin: 0, maxWidth: 760, lineHeight: 1.8 }}>{setting}</p>
                  </div>
                  <div className="badge" style={{ alignSelf: "flex-start", background: "rgba(59,130,246,0.12)", color: "var(--accent-cta)", border: "1px solid rgba(59,130,246,0.22)" }}>
                    {scene.duration}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14, marginBottom: 14 }}>
                  <div className="glass-card" style={{ padding: "var(--space-lg)", background: "rgba(15,23,42,0.74)" }}>
                    <strong style={{ display: "block", marginBottom: 8 }}>{isRTL ? "التكوين البصري" : "Cinematography"}</strong>
                    <div style={{ display: "grid", gap: 8, color: "var(--text-muted)", lineHeight: 1.8 }}>
                      {cinematography.map((entry) => <div key={entry}>- {entry}</div>)}
                    </div>
                  </div>
                  <div className="glass-card" style={{ padding: "var(--space-lg)", background: "rgba(15,23,42,0.74)" }}>
                    <strong style={{ display: "block", marginBottom: 8 }}>{isRTL ? "تصميم الصوت" : "Sound design"}</strong>
                    <div style={{ display: "grid", gap: 8, color: "var(--text-muted)", lineHeight: 1.8 }}>
                      {soundDesign.map((entry) => <div key={entry}>- {entry}</div>)}
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
                  <div className="glass-card" style={{ padding: "var(--space-lg)", background: "rgba(16,185,129,0.08)" }}>
                    <div style={{ fontSize: 12, color: "var(--text-caption)", textTransform: "uppercase", marginBottom: 8 }}>
                      {isRTL ? "البرومبت الإيجابي" : "Positive prompt"}
                    </div>
                    <p style={{ margin: 0, lineHeight: 1.9 }}>{positivePrompt}</p>
                  </div>
                  <div className="glass-card" style={{ padding: "var(--space-lg)", background: "rgba(239,68,68,0.08)" }}>
                    <div style={{ fontSize: 12, color: "var(--text-caption)", textTransform: "uppercase", marginBottom: 8 }}>
                      {isRTL ? "القيود السلبية" : "Negative constraints"}
                    </div>
                    <div style={{ display: "grid", gap: 8, color: "var(--text-secondary)", lineHeight: 1.8 }}>
                      {negativePrompt.map((entry) => <div key={entry}>- {entry}</div>)}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 14, padding: "14px 16px", borderRadius: 16, background: "rgba(148,163,184,0.08)" }}>
                  <strong style={{ display: "block", marginBottom: 6 }}>{isRTL ? "النغمة أو الجملة المقترحة" : "Dialogue / tonal note"}</strong>
                  <span style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>{dialogue}</span>
                </div>
              </section>
            );
          })}
        </div>

        <section
          id="negative-bank"
          className="glass-card"
          style={{ padding: "var(--space-xl)", marginTop: "var(--space-xl)", scrollMarginTop: "calc(var(--navbar-height) + 20px)" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <AlertTriangle size={22} style={{ color: "#f59e0b" }} />
            <div>
              <h2 style={{ marginBottom: 4 }}>{isRTL ? "بنك النيغاتيف برومبت الموحّد" : "Master Negative Prompt Bank"}</h2>
              <p style={{ color: "var(--text-muted)", margin: 0, lineHeight: 1.8 }}>
                {isRTL
                  ? "30 قيداً عاماً تسبق أي مشهد حتى لا ينزلق التريلر إلى تمجيد أو تهويل أو صورة غير مصرية."
                  : "30 global constraints to prepend to any scene so the trailer stays sober, Egyptian, and non-triumphalist."}
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 10 }}>
            {negativeBank.map((entry, index) => (
              <div key={`${index}-${entry}`} className="glass-card" style={{ padding: "14px 16px", background: "rgba(239,68,68,0.06)" }}>
                <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 6 }}>
                  {isRTL ? `قيد ${index + 1}` : `Constraint ${index + 1}`}
                </div>
                <div style={{ lineHeight: 1.8 }}>{entry}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card" style={{ padding: "var(--space-xl)", marginTop: "var(--space-xl)", background: "rgba(59,130,246,0.08)" }}>
          <h2 style={{ marginBottom: 10 }}>{isRTL ? "الترابط مع بقية المنصة" : "Connected platform routes"}</h2>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 14 }}>
            {isRTL
              ? "التريلر مرتبط مباشرة بتجربة التفرع في Reverse Mode، ومسار التحقق النهائي يرتبط بـ DeepReal."
              : "The trailer ties directly into the branching experience in Reverse Mode and the final verification path in DeepReal."}
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/reverse#branching-visual" className="btn-secondary no-underline" style={{ padding: "12px 16px" }}>
              <ArrowUpRight size={14} />
              {isRTL ? "افتح تجربة التفرع" : "Open branching experience"}
            </Link>
            <Link href="/deepreal" className="btn-primary no-underline" style={{ padding: "12px 16px" }}>
              <ArrowUpRight size={14} />
              DeepReal
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
