"use client";

import { useState, useCallback, useMemo } from "react";
import { Eye, BarChart3, AlertTriangle } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";

/**
 * THUMBNAIL TRAP TEST — Q11
 * Measures Emotional Trigger Susceptibility (ETS)
 * 
 * Displays 6 emotional images vs 6 neutral ones in a grid.
 * Tracks which the user clicks first and click distribution.
 * 
 * ETS = acceptance_rate(emotional) - acceptance_rate(neutral)
 * Framework: §17.3, §17.6 (DeepReal baseline)
 */

interface ThumbnailItem {
  id: string;
  label: string;
  type: "emotional" | "neutral";
  emoji: string;
  description: string;
  headline: string;
}

const THUMBNAIL_ITEMS: ThumbnailItem[] = [
  // 6 Emotional thumbnails
  { id: "em-1", label: "Shocking Discovery", type: "emotional", emoji: "😱", description: "Fear-inducing medical claim", headline: "URGENT: New study reveals everyday food causing irreversible damage!" },
  { id: "em-2", label: "Outrage Bait", type: "emotional", emoji: "😡", description: "Anger-triggering social issue", headline: "EXPOSED: They've been lying to us for decades about this!" },
  { id: "em-3", label: "Miracle Promise", type: "emotional", emoji: "✨", description: "Hope-exploiting health claim", headline: "Ancient remedy CURES 95% of patients — doctors are speechless!" },
  { id: "em-4", label: "Fear Appeal", type: "emotional", emoji: "⚠️", description: "Urgency-based warning", headline: "WARNING: Your phone is doing THIS to your brain right now!" },
  { id: "em-5", label: "Identity Trigger", type: "emotional", emoji: "💔", description: "Identity-affirming content", headline: "If you care about your family, you NEED to see this immediately!" },
  { id: "em-6", label: "Conspiracy Hook", type: "emotional", emoji: "🔍", description: "Conspiracy-framed revelation", headline: "The truth they don't want you to know — share before deleted!" },
  // 6 Neutral thumbnails
  { id: "ne-1", label: "Research Update", type: "neutral", emoji: "📊", description: "Standard research finding", headline: "New longitudinal study finds moderate correlation between X and Y" },
  { id: "ne-2", label: "Policy Report", type: "neutral", emoji: "📋", description: "Government health update", headline: "Ministry of Health releases updated dietary guidelines for 2026" },
  { id: "ne-3", label: "Literature Review", type: "neutral", emoji: "📚", description: "Academic review article", headline: "Meta-analysis of 30 studies examines sleep duration and cognition" },
  { id: "ne-4", label: "Tech Explainer", type: "neutral", emoji: "💻", description: "Informational technology piece", headline: "How machine learning is being applied in medical imaging research" },
  { id: "ne-5", label: "Data Summary", type: "neutral", emoji: "📈", description: "Statistical report", headline: "WHO quarterly report: Global health indicators show mixed trends" },
  { id: "ne-6", label: "Expert Interview", type: "neutral", emoji: "🎓", description: "Professional perspective", headline: "Dr. Ahmed on evidence-based approaches to public health education" },
];

interface ThumbnailTrapTestProps {
  onComplete?: (result: ETSResult) => void;
}

export interface ETSResult {
  emotionalClicks: number;
  neutralClicks: number;
  emotionalClickRate: number;
  neutralClickRate: number;
  etsScore: number; // emotional_rate - neutral_rate
  clickOrder: string[];
  firstClickType: "emotional" | "neutral";
}

export function ThumbnailTrapTest({ onComplete }: ThumbnailTrapTestProps) {
  const [clicks, setClicks] = useState<Map<string, number>>(new Map());
  const [clickOrder, setClickOrder] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { isRTL, t } = useRTL();
  const a = isRTL;

  const shuffled = useMemo(
    () => [
      THUMBNAIL_ITEMS[3],
      THUMBNAIL_ITEMS[6],
      THUMBNAIL_ITEMS[1],
      THUMBNAIL_ITEMS[9],
      THUMBNAIL_ITEMS[4],
      THUMBNAIL_ITEMS[7],
      THUMBNAIL_ITEMS[0],
      THUMBNAIL_ITEMS[10],
      THUMBNAIL_ITEMS[2],
      THUMBNAIL_ITEMS[8],
      THUMBNAIL_ITEMS[5],
      THUMBNAIL_ITEMS[11],
    ],
    []
  );

  const handleClick = useCallback((item: ThumbnailItem) => {
    setClicks(prev => {
      const next = new Map(prev);
      next.set(item.id, (next.get(item.id) || 0) + 1);
      return next;
    });
    setClickOrder(prev => [...prev, item.id]);
  }, []);

  const handleFinish = useCallback(() => {
    const emotionalClicks = THUMBNAIL_ITEMS
      .filter(i => i.type === "emotional")
      .reduce((sum, i) => sum + (clicks.get(i.id) || 0), 0);
    const neutralClicks = THUMBNAIL_ITEMS
      .filter(i => i.type === "neutral")
      .reduce((sum, i) => sum + (clicks.get(i.id) || 0), 0);
    const total = emotionalClicks + neutralClicks || 1;
    const emotionalRate = emotionalClicks / total;
    const neutralRate = neutralClicks / total;
    const firstId = clickOrder[0];
    const firstItem = THUMBNAIL_ITEMS.find(i => i.id === firstId);

    const result: ETSResult = {
      emotionalClicks,
      neutralClicks,
      emotionalClickRate: Math.round(emotionalRate * 100),
      neutralClickRate: Math.round(neutralRate * 100),
      etsScore: Math.round((emotionalRate - neutralRate) * 100),
      clickOrder,
      firstClickType: firstItem?.type || "neutral",
    };

    setShowResults(true);
    onComplete?.(result);

    // Persist for research export
    try {
      localStorage.setItem('ets_baseline', JSON.stringify(result));
    } catch { /* silent */ }
  }, [clicks, clickOrder, onComplete]);

  const emotionalClicks = THUMBNAIL_ITEMS
    .filter(i => i.type === "emotional")
    .reduce((sum, i) => sum + (clicks.get(i.id) || 0), 0);
  const neutralClicks = THUMBNAIL_ITEMS
    .filter(i => i.type === "neutral")
    .reduce((sum, i) => sum + (clicks.get(i.id) || 0), 0);

  if (showResults) {
    const total = emotionalClicks + neutralClicks || 1;
    const ets = Math.round(((emotionalClicks / total) - (neutralClicks / total)) * 100);
    return (
      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <BarChart3 size={20} /> {t({ en: "Emotional Trigger Susceptibility Result", ar: "نتيجة قابلية الاستجابة العاطفية", arEG: "نتيجة قابلية الاستجابة العاطفية" })}
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
          <div style={{ textAlign: "center", padding: 16, background: "rgba(239,68,68,0.08)", borderRadius: 12 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: "var(--color-danger)" }}>{emotionalClicks}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{t({ en: "Emotional Clicks", ar: "نقرات عاطفية", arEG: "نقرات عاطفية" })}</div>
          </div>
          <div style={{ textAlign: "center", padding: 16, background: "rgba(16,185,129,0.08)", borderRadius: 12 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: "var(--color-success)" }}>{neutralClicks}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{t({ en: "Neutral Clicks", ar: "نقرات محايدة", arEG: "نقرات محايدة" })}</div>
          </div>
          <div style={{ textAlign: "center", padding: 16, background: "rgba(139,92,246,0.08)", borderRadius: 12 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: ets > 20 ? "var(--color-danger)" : "var(--color-success)" }}>{ets > 0 ? `+${ets}` : ets}%</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>ETS Score</div>
          </div>
        </div>
        <div className="disclaimer-bar" style={{ display: "flex", gap: 8 }}>
          <AlertTriangle size={14} style={{ color: "var(--color-warning)", flexShrink: 0, marginTop: 2 }} />
          <span style={{ fontSize: 12 }}>
            {ets > 20
              ? (t({ en: "Your clicks leaned toward emotional content. This is normal \u2014 emotional triggers are designed to capture attention. The goal is awareness, not blame.", ar: "نقراتك مالت نحو المحتوى العاطفي. هذا طبيعي \u2014 المحفزات العاطفية مصممة لجذب الانتباه. الهدف هو الوعي، ليس اللوم.", arEG: "نقراتك مالت نحو المحتوى العاطفي. هذا طبيعي \u2014 المحفزات العاطفية مصممة لجذب الانتباه. الهدف هو الوعي، ليس اللوم." }))
              : (t({ en: "Good balance! You distributed attention fairly between emotional and neutral content.", ar: "توازن جيد! وزعت الانتباه بشكل عادل بين المحتوى العاطفي والمحايد.", arEG: "توازن جيد! وزعت الانتباه بشكل عادل بين المحتوى العاطفي والمحايد." }))}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Eye size={20} /> {t({ en: "Thumbnail Trap Test", ar: "اختبار فخ الصور المصغرة", arEG: "اختبار فخ الصور المصغرة" })}
        </h3>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
          {t({ en: "Below are 12 headlines. Click on the ones that catch your attention. There are no right or wrong answers \u2014 we\u0027re measuring your natural response pattern.", ar: "أدناه 12 عنوان\u0627\u064b. انقر على العناوين التي تلفت انتباهك. لا توجد إجابات صحيحة أو خاطئة \u2014 نحن نقيس نمط استجابتك الطبيعي.", arEG: "أدناه 12 عنوان\u0627\u064b. انقر على العناوين التي تلفت انتباهك. لا توجد إجابات صحيحة أو خاطئة \u2014 نحن نقيس نمط استجابتك الطبيعي." })}
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
        {shuffled.map(item => (
          <button
            key={item.id}
            onClick={() => handleClick(item)}
            style={{
              padding: 16,
              borderRadius: 12,
              border: `1px solid ${clicks.has(item.id) ? "var(--accent-cta)" : "var(--border-primary)"}`,
              background: clicks.has(item.id) ? "rgba(0,102,255,0.06)" : "var(--bg-card)",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.15s ease",
              position: "relative",
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>{item.emoji}</div>
            <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4, marginBottom: 4, color: "var(--text-primary)" }}>
              {item.headline}
            </div>
            {clicks.has(item.id) && (
              <div style={{ position: "absolute", top: 8, right: 8, background: "var(--accent-cta)", color: "white", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>
                {clicks.get(item.id)}
              </div>
            )}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
          {emotionalClicks + neutralClicks} {t({ en: "clicks total", ar: "نقرة إجمالية", arEG: "نقرة إجمالية" })}
        </span>
        <button
          onClick={handleFinish}
          className="btn-primary"
          disabled={emotionalClicks + neutralClicks < 3}
        >
          {t({ en: "Reveal My Pattern", ar: "اكشف نمطي", arEG: "اكشف نمطي" })}
        </button>
      </div>
    </div>
  );
}
