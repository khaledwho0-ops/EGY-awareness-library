"use client";

import { AlertTriangle, HeartHandshake, ShieldAlert } from "lucide-react";
import type { Exercise } from "@/types";
// Inline type to avoid importing sentiment-engine (Node.js-only module)
interface SentimentResult { label: string; compound: number; positive: number; negative: number; neutral: number; manipulationScore: number; emotionalTriggers: string[]; persuasionPatterns: string[]; topContributors: string[]; entities: string[]; tokenCount: number; readabilityGrade: number; crisisDetected: boolean; crisisConfidence: number; }
import { SupportDirectoryPanel } from "@/components/research/support-directory-panel";
import { useRTL } from "@/components/shared/rtl-provider";

interface ExerciseSupportRailProps {
  accentColor: string;
  exercise: Exercise;
  sentiment: SentimentResult;
}

export function ExerciseSupportRail({
  accentColor,
  exercise,
  sentiment,
}: ExerciseSupportRailProps) {
  const { isRTL: a, t } = useRTL();

  if (exercise.mvp === "deepreal") {
    return null;
  }

  const title =
    exercise.mvp === "mental-health"
      ? sentiment.crisisDetected
        ? t({ en: "Immediate support routes", ar: "مسارات الدعم الفوري", arEG: "مسارات الدعم الفوري" })
        : t({ en: "Support routes if this content brings up distress", ar: "مسارات الدعم إذا سبب هذا المحتوى ضيقاً", arEG: "مسارات الدعم إذا سبب هذا المحتوى ضيقاً" })
      : t({ en: "Formal-guidance and moderation routes", ar: "مسارات التوجيه الرسمي والإشراف", arEG: "مسارات التوجيه الرسمي والإشراف" });

  const summary =
    exercise.mvp === "mental-health"
      ? sentiment.crisisDetected
        ? t({ en: "Distress language was detected in this session. Use the official support routes below immediately if any risk feels current or unsafe.", ar: "تم رصد لغة ضيق في هذه الجلسة. استخدم مسارات الدعم الرسمية أدناه فوراً إذا كانت أي مخاطر تبدو حالية أو غير آمنة.", arEG: "تم رصد لغة ضيق في هذه الجلسة. استخدم مسارات الدعم الرسمية أدناه فوراً إذا كانت أي مخاطر تبدو حالية أو غير آمنة." })
        : t({ en: "Mental Health exercises are educational, not diagnostic. If the material feels personally activating, use an official route instead of handling it alone.", ar: "تمارين الصحة النفسية تعليمية وليست تشخيصية. إذا شعرت أن المادة محفزة شخصياً، استخدم مساراً رسمياً بدلاً من التعامل معها بمفردك.", arEG: "تمارين الصحة النفسية تعليمية وليست تشخيصية. إذا شعرت أن المادة محفزة شخصياً، استخدم مساراً رسمياً بدلاً من التعامل معها بمفردك." })
      : t({ en: "Religion Hub content is educational and research-based. If you need a personal ruling, formal religious consultation, or help with harmful extremist framing, use the official routes below.", ar: "محتوى المحور الديني تعليمي وبحثي. إذا كنت بحاجة إلى حكم شخصي أو استشارة دينية رسمية أو مساعدة في التطرف الضار، استخدم المسارات الرسمية أدناه.", arEG: "محتوى المحور الديني تعليمي وبحثي. إذا كنت بحاجة إلى حكم شخصي أو استشارة دينية رسمية أو مساعدة في التطرف الضار، استخدم المسارات الرسمية أدناه." });

  return (
    <section
      style={{
        marginBottom: 20,
        padding: "16px 18px",
        borderRadius: "var(--radius-lg)",
        border: sentiment.crisisDetected
          ? "1px solid rgba(239, 68, 68, 0.25)"
          : "1px solid var(--border-primary)",
        background: sentiment.crisisDetected
          ? "rgba(239, 68, 68, 0.06)"
          : "var(--bg-secondary)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: sentiment.crisisDetected ? "rgba(239, 68, 68, 0.15)" : `${accentColor}12`,
            color: sentiment.crisisDetected ? "var(--color-danger)" : accentColor,
            flexShrink: 0,
          }}
        >
          {exercise.mvp === "mental-health" ? (
            sentiment.crisisDetected ? <AlertTriangle size={18} /> : <HeartHandshake size={18} />
          ) : (
            <ShieldAlert size={18} />
          )}
        </div>
        <div>
          <h4 style={{ margin: 0, marginBottom: 4, fontSize: "15px", color: "var(--text-primary)" }}>
            {title}
          </h4>
          <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>
            {summary}
          </p>
        </div>
      </div>

      <SupportDirectoryPanel
        mvp={exercise.mvp}
        title={title}
        compact
      />
    </section>
  );
}
