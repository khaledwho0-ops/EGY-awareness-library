"use client";

import { useEffect, useMemo, useState } from "react";
import { Compass, Heart, Sparkles } from "lucide-react";
import { FocusTrapModal } from "@/components/shared/focus-trap-modal";
import { useRTL } from "@/components/shared/rtl-provider";
import type { ModuleId } from "@/data/research/module-briefings";

type GuideOption = {
  id: string;
  emotion: { en: string; ar: string };
  validation: { en: string; ar: string };
  scientificReason: { en: string; ar: string };
  recommendation: { en: string; ar: string };
  caution: { en: string; ar: string };
  firstStepId: string;
  recommendedTab: "exercises" | "rules" | "myths" | "scenarios" | "tricks" | "reverse";
};

export function ModuleGuidePopup({
  module,
  options,
  isOpen,
  onClose,
  onApply,
}: {
  module: ModuleId;
  options: GuideOption[];
  isOpen: boolean;
  onClose: () => void;
  onApply: (option: GuideOption) => Promise<void> | void;
}) {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const [selectedId, setSelectedId] = useState<string>(options[0]?.id ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [dismissedLocally, setDismissedLocally] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDismissedLocally(false);
    }
  }, [isOpen]);

  // Defensive Esc fallback — fires even if focus trap misses the event
  useEffect(() => {
    if (!isOpen || dismissedLocally) return;
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        setDismissedLocally(true);
        onClose();
      }
    }
    document.addEventListener("keydown", handleEsc, { capture: true });
    return () => document.removeEventListener("keydown", handleEsc, { capture: true });
  }, [isOpen, dismissedLocally, onClose]);

  const selected = useMemo(
    () => options.find((option) => option.id === selectedId) ?? options[0],
    [options, selectedId]
  );

  const title =
    module === "deepreal"
      ? t({ en: "How should you use DeepReal right now?", ar: "كيف تستخدم DeepReal الآن؟", arEG: "تستخدم DeepReal إزاي دلوقتي؟" })
      : module === "mental-health"
        ? t({ en: "How should you use Mental Health right now?", ar: "كيف تستخدم Mental Health الآن؟", arEG: "تستخدم Mental Health إزاي دلوقتي؟" })
        : t({ en: "How should you use Religion Hub right now?", ar: "كيف تستخدم Religion Hub الآن؟", arEG: "تستخدم Religion Hub إزاي دلوقتي؟" });

  if (!isOpen || dismissedLocally) {
    return null;
  }

  function closeNow() {
    setDismissedLocally(true);
    onClose();
  }

  return (
    <FocusTrapModal isOpen={isOpen} onClose={closeNow} title={title} closeOnEscape closeOnOverlay showCloseButton maxWidth={640}>
      <div style={{ display: "grid", gap: 14, direction: a ? "rtl" : "ltr" }}>
        <div className="glass-card" style={{ padding: "var(--space-md)", background: "var(--bg-secondary)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Heart size={16} style={{ color: "var(--accent-cta)" }} />
            <strong>{t({ en: "Start from your state right now", ar: "ابدأ من حالتك الآن", arEG: "ابدأ من حالتك دلوقتي" })}</strong>
          </div>
          <p style={{ margin: 0, color: "var(--text-muted)", fontSize: 14 }}>
            {t({ en: "Choose the feeling that fits best. The system will point you to the first real step inside this module.", ar: "اختر العبارة الأقرب لما تشعر به. سيقترح لك النظام أول خطوة فعلية داخل هذا المحور.", arEG: "اختار الإحساس الأقرب ليك. النظام هيوجّهك لأول خطوة فعلية جوه المحور ده." })}
          </p>
        </div>

        <div className="grid gap-2">
          {options.map((option) => {
            const active = option.id === selectedId;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedId(option.id)}
                className={active ? "btn-primary" : "btn-secondary"}
                style={{ justifyContent: "flex-start", textAlign: a ? "right" : "left" }}
              >
                {t(option.emotion)}
              </button>
            );
          })}
        </div>

        {selected && (
          <div className="glass-card" style={{ padding: "var(--space-lg)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <Compass size={16} style={{ color: "var(--accent-cta)" }} />
              <strong>{t({ en: "Recommended direction", ar: "التوجيه المقترح", arEG: "التوجيه المقترح" })}</strong>
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              <GuideBlock
                label={t({ en: "What this means", ar: "قراءة حالتك", arEG: "ده معناه إيه" })}
                text={t(selected.validation)}
              />
              <GuideBlock
                label={t({ en: "Scientific reason", ar: "السبب العلمي", arEG: "السبب العلمي" })}
                text={t(selected.scientificReason)}
              />
              <GuideBlock
                label={t({ en: "Start here", ar: "ابدأ هنا", arEG: "ابدأ من هنا" })}
                text={t(selected.recommendation)}
              />
              <GuideBlock
                label={t({ en: "Do not do this", ar: "لا تفعل هذا", arEG: "متعملش كده" })}
                text={t(selected.caution)}
              />
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
              <span className="badge">
                {t({ en: "First step", ar: "الخطوة الأولى", arEG: "أول خطوة" })}: {selected.firstStepId}
              </span>
              <span className="badge">
                {t({ en: "Recommended tab", ar: "الواجهة المقترحة", arEG: "الواجهة المقترحة" })}: {selected.recommendedTab}
              </span>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 10, justifyContent: a ? "flex-start" : "flex-end", flexWrap: "wrap" }}>
          <button type="button" className="btn-secondary" onClick={closeNow}>
            {t({ en: "Later", ar: "لاحقاً", arEG: "بعدين" })}
          </button>
          <button
            type="button"
            className="btn-primary"
            disabled={!selected || submitting}
            onClick={async () => {
              if (!selected) return;
              setSubmitting(true);
              await onApply(selected);
              setSubmitting(false);
            }}
          >
            <Sparkles size={14} /> {t({ en: "Start with this path", ar: "ابدأ بالمسار المقترح", arEG: "ابدأ بالمسار ده" })}
          </button>
        </div>
      </div>
    </FocusTrapModal>
  );
}

function GuideBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: "var(--text-caption)", marginBottom: 4 }}>{label}</div>
      <div style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{text}</div>
    </div>
  );
}
