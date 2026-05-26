"use client";

import { PromptLab } from "@/components/shared/prompt-lab";
import { Lightbulb } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";

/**
 * Prompt Lab Page — Framework §20
 * Standalone page for browsing and building evidence-safe prompts.
 */
export default function PromptLabPage() {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  return (
    <div style={{ paddingTop: "var(--navbar-height)" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)" }}>
        <div className="flex items-center gap-3 mb-2">
          <Lightbulb size={28} style={{ color: "var(--accent-cta)" }} />
          <h1 style={{ fontSize: "var(--font-h2)" }}>
            <span className="text-gradient">{t({ en: "Prompt Lab", ar: "معمل الأوامر", arEG: "معمل الأوامر" })}</span>
          </h1>
        </div>
        <p style={{ color: "var(--text-muted)", marginBottom: "var(--space-xl)", maxWidth: 600, fontFamily: ff }}>
          {t({ en: "Pre-built, evidence-safe prompts with variable slots. Choose a goal, fill in your topic, and get a ready-to-use prompt that enforces uncertainty, evidence, and source citation.", ar: "أوامر مسبقة البناء وآمنة مع فتحات متغيرة. اختر هدفاً، أدخل موضوعك، واحصل على أمر جاهز للاستخدام.", arEG: "أوامر مسبقة البناء وآمنة مع فتحات متغيرة. اختر هدفاً، أدخل موضوعك، واحصل على أمر جاهز للاستخدام." })}
        </p>

        <PromptLab />
      </div>
    </div>
  );
}
