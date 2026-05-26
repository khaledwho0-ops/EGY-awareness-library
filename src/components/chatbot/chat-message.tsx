"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink, Bot, User, Clock, BookOpen, X, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";
import { MarkdownRenderer } from "./markdown-renderer";
import { useRTL } from "@/components/shared/rtl-provider";

export interface ChatMessageData {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  provider?: string;
  model?: string;
  latencyMs?: number;
  sources?: { title: string; url?: string; type?: string }[];
  mode?: string;
  isError?: boolean;
}

interface ChatMessageProps {
  message: ChatMessageData;
  isRTL: boolean;
  onDelete?: (id: string) => void;
  onRetry?: (content: string) => void;
}

export function ChatMessage({ message, isRTL, onDelete, onRetry }: ChatMessageProps) {
  const { t } = useRTL();
  const [copied, setCopied] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const [reaction, setReaction] = useState<"up" | "down" | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(`eal-reaction-${message.id}`);
    return stored as "up" | "down" | null;
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for mobile
      const textarea = document.createElement("textarea");
      textarea.value = message.content;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isUser = message.role === "user";
  const modeColors: Record<string, string> = {
    general: "#3B82F6",
    claim: "#EF4444",
    "mental-health": "#10B981",
    academic: "#8B5CF6",
    translation: "#F59E0B",
  };
  const modeColor = modeColors[message.mode || "general"] || "#3B82F6";

  // Parse source references from academic answers
  const hasAcademicSources = message.mode === "academic" && !isUser && message.content.includes("Source");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isUser
          ? isRTL ? "flex-start" : "flex-end"
          : isRTL ? "flex-end" : "flex-start",
        gap: 6,
        maxWidth: "100%",
        animation: "chatMsgFadeIn 0.3s ease-out",
        position: "relative",
      }}
    >
      {/* X / Close button */}
      {onDelete && (
        <button
          onClick={() => onDelete(message.id)}
          style={{
            position: "absolute",
            top: -4,
            [isUser ? (isRTL ? "left" : "right") : (isRTL ? "right" : "left")]: -4,
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-primary)",
            color: "var(--text-caption)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "opacity 0.2s, background 0.2s, color 0.2s",
            zIndex: 2,
            padding: 0,
          }}
          className="chat-msg-close-btn"
          title={t({ en: "Remove", ar: "حذف", arEG: "امسح" })}
        >
          <X size={12} />
        </button>
      )}

      {/* Avatar + name row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexDirection: isUser
            ? isRTL ? "row-reverse" : "row"
            : isRTL ? "row" : "row-reverse",
        }}
      >
        <span style={{ fontSize: 11, color: "var(--text-caption)", fontWeight: 500 }}>
          {isUser
            ? t({ en: "You", ar: "أنت", arEG: "إنت" })
            : t({ en: "EAL Assistant", ar: "مساعد EAL", arEG: "مساعد EAL" })}
        </span>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isUser ? `${modeColor}20` : "var(--bg-elevated)",
            border: `1px solid ${isUser ? `${modeColor}40` : "var(--border-primary)"}`,
            flexShrink: 0,
          }}
        >
          {isUser ? (
            <User size={14} style={{ color: modeColor }} />
          ) : (
            <Bot size={14} style={{ color: "var(--accent-cta)" }} />
          )}
        </div>
      </div>

      {/* Message bubble */}
      <div
        style={{
          maxWidth: "85%",
          padding: "14px 18px",
          borderRadius: isUser
            ? t({ en: "4px 16px 16px 16px", ar: "16px 4px 16px 16px", arEG: "16px 4px 16px 16px" })
            : t({ en: "16px 4px 16px 16px", ar: "4px 16px 16px 16px", arEG: "4px 16px 16px 16px" }),
          background: isUser
            ? `linear-gradient(135deg, ${modeColor}, ${modeColor}CC)`
            : message.isError ? "rgba(239,68,68,0.06)" : "var(--bg-elevated)",
          color: isUser ? "#fff" : "var(--text-primary)",
          fontSize: 14,
          lineHeight: 1.75,
          whiteSpace: isUser ? "pre-wrap" : "normal",
          wordBreak: "break-word",
          border: message.isError
            ? "1px solid rgba(239,68,68,0.25)"
            : isUser ? "none" : "1px solid var(--border-primary)",
          position: "relative",
          boxShadow: isUser
            ? `0 2px 12px ${modeColor}30`
            : "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        {isUser ? (
          message.content
        ) : (
          <MarkdownRenderer content={message.content} isRTL={isRTL} />
        )}
      </div>

      {/* Timestamp */}
      <span style={{
        fontSize: 9, color: "var(--text-caption)", opacity: 0.5,
        paddingInline: 4,
      }}>
        {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>

      {/* Action bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          paddingInline: 4,
          flexWrap: "wrap",
        }}
      >
        {/* Copy button */}
        <button
          onClick={handleCopy}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 10px",
            borderRadius: 8,
            background: copied ? "rgba(16,185,129,0.1)" : "transparent",
            border: `1px solid ${copied ? "rgba(16,185,129,0.3)" : "var(--border-primary)"}`,
            color: copied ? "#10B981" : "var(--text-caption)",
            fontSize: 11,
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          title={t({ en: "Copy", ar: "نسخ", arEG: "انسخ" })}
        >
          {copied ? (
            <>
              <Check size={12} />
              {t({ en: "Copied ✓", ar: "تم النسخ ✓", arEG: "اتنسخ ✓" })}
            </>
          ) : (
            <>
              <Copy size={12} />
              {t({ en: "Copy", ar: "نسخ", arEG: "انسخ" })}
            </>
          )}
        </button>

        {/* Reaction buttons — assistant only (for pilot study feedback) */}
        {!isUser && !message.isError && (
          <div style={{ display: "flex", gap: 2 }}>
            <button
              onClick={() => {
                const newR = reaction === "up" ? null : "up";
                setReaction(newR);
                if (newR) localStorage.setItem(`eal-reaction-${message.id}`, newR);
                else localStorage.removeItem(`eal-reaction-${message.id}`);
              }}
              style={{
                display: "flex", alignItems: "center", gap: 3,
                padding: "3px 8px", borderRadius: 6,
                background: reaction === "up" ? "rgba(16,185,129,0.1)" : "transparent",
                border: `1px solid ${reaction === "up" ? "rgba(16,185,129,0.3)" : "var(--border-primary)"}`,
                color: reaction === "up" ? "#10B981" : "var(--text-caption)",
                fontSize: 11, cursor: "pointer", transition: "all 0.2s",
              }}
              title={t({ en: "Helpful", ar: "مفيد", arEG: "مفيد" })}
            >
              <ThumbsUp size={11} />
            </button>
            <button
              onClick={() => {
                const newR = reaction === "down" ? null : "down";
                setReaction(newR);
                if (newR) localStorage.setItem(`eal-reaction-${message.id}`, newR);
                else localStorage.removeItem(`eal-reaction-${message.id}`);
              }}
              style={{
                display: "flex", alignItems: "center", gap: 3,
                padding: "3px 8px", borderRadius: 6,
                background: reaction === "down" ? "rgba(239,68,68,0.1)" : "transparent",
                border: `1px solid ${reaction === "down" ? "rgba(239,68,68,0.3)" : "var(--border-primary)"}`,
                color: reaction === "down" ? "#EF4444" : "var(--text-caption)",
                fontSize: 11, cursor: "pointer", transition: "all 0.2s",
              }}
              title={t({ en: "Not helpful", ar: "غير مفيد", arEG: "مش مفيد" })}
            >
              <ThumbsDown size={11} />
            </button>
          </div>
        )}

        {/* Original / Source button — for academic and fact-check modes */}
        {!isUser && (message.mode === "academic" || message.mode === "claim") && (
          <button
            onClick={() => setShowSource(!showSource)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 10px",
              borderRadius: 8,
              background: showSource ? "rgba(139,92,246,0.1)" : "transparent",
              border: `1px solid ${showSource ? "rgba(139,92,246,0.3)" : "var(--border-primary)"}`,
              color: showSource ? "#8B5CF6" : "var(--text-caption)",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            title={t({ en: "Original Source", ar: "المصدر الأصلي", arEG: "المصدر الأصلي" })}
          >
            <BookOpen size={12} />
            {t({ en: "Original / Source", ar: "أصل / المصدر", arEG: "الأصل / المصدر" })}
          </button>
        )}

        {/* Source badge — assistant only */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {message.sources.map((source, idx) => (
              <a
                key={idx}
                href={source.url || "#"}
                target={source.url ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "4px 10px",
                  borderRadius: 8,
                  background: "rgba(139,92,246,0.08)",
                  border: "1px solid rgba(139,92,246,0.2)",
                  color: "#8B5CF6",
                  fontSize: 11,
                  fontWeight: 600,
                  textDecoration: "none",
                  cursor: source.url ? "pointer" : "default",
                  transition: "all 0.2s",
                }}
              >
                <ExternalLink size={10} />
                {t({ en: "Source", ar: "المصدر", arEG: "المصدر" })}: {source.title}
              </a>
            ))}
          </div>
        )}

        {/* Provider info — assistant only */}
        {!isUser && message.provider && (
          <span
            style={{
              fontSize: 10,
              color: "var(--text-caption)",
              fontFamily: "monospace",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Clock size={10} />
            {message.provider} · {message.model}
            {message.latencyMs ? ` · ${message.latencyMs}ms` : ""}
          </span>
        )}

        {/* Retry button — error messages only */}
        {!isUser && message.isError && onRetry && (
          <button
            onClick={() => onRetry(message.content)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 12px",
              borderRadius: 8,
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              color: "#EF4444",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            title={t({ en: "Retry", ar: "إعادة المحاولة", arEG: "حاول تاني" })}
          >
            <RefreshCw size={12} />
            {t({ en: "Retry", ar: "إعادة المحاولة", arEG: "حاول تاني" })}
          </button>
        )}
      </div>

      {/* Source expansion panel */}
      {showSource && !isUser && (
        <div
          style={{
            maxWidth: "85%",
            padding: "12px 16px",
            borderRadius: 12,
            background: "rgba(139,92,246,0.05)",
            border: "1px solid rgba(139,92,246,0.15)",
            fontSize: 12,
            lineHeight: 1.7,
            color: "var(--text-secondary)",
            animation: "chatMsgFadeIn 0.2s ease-out",
          }}
        >
          <div style={{ fontWeight: 700, color: "#8B5CF6", marginBottom: 6, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {t({ en: "📖 Original Source", ar: "📖 المصدر الأصلي", arEG: "📖 المصدر الأصلي" })}
          </div>
          {message.sources && message.sources.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {message.sources.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <ExternalLink size={10} style={{ color: "#8B5CF6", flexShrink: 0 }} />
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: "#8B5CF6", textDecoration: "underline" }}>
                      {s.title}
                    </a>
                  ) : (
                    <span>{s.title}</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ margin: 0 }}>
              {message.mode === "academic"
                ? (t({ en: "Sources are cited within the answer text above. Look for the 'Sources' section in the response.", ar: "المصادر مذكورة في نص الإجابة أعلاه. ابحث عن قسم 'المصادر' أو 'Sources' في الرد.", arEG: "المصادر مذكورة في الإجابة فوق. دوّر على قسم 'المصادر' في الرد." }))
                : (t({ en: "Verified through the EAL Fact-Check Engine.", ar: "تم التحقق عبر محرك EAL للتحقق من الحقائق.", arEG: "اتأكدنا من خلال محرك EAL للتحقق." }))}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
