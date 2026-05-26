"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Loader2 } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";

interface ChatInputProps {
  onSend: (message: string) => void;
  loading: boolean;
  isRTL: boolean;
  modeColor: string;
  placeholder?: string;
}

export function ChatInput({ onSend, loading, isRTL, modeColor, placeholder }: ChatInputProps) {
  const { t } = useRTL();
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, []);

  useEffect(() => { adjustHeight(); }, [value, adjustHeight]);

  // Auto-focus on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || loading) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
    // Shift+Enter naturally creates a new line (default textarea behavior)
  };

  const hasArabic = /[\u0600-\u06FF]/.test(value);
  const inputDir = hasArabic ? "rtl" : isRTL ? "rtl" : "ltr";

  return (
    <div style={{
      padding: "12px 16px",
      borderTop: "1px solid var(--border-primary)",
      background: "var(--bg-primary)",
    }}>
      {/* Keyboard shortcut hint */}
      <div style={{
        fontSize: 10,
        color: "var(--text-caption)",
        marginBottom: 8,
        textAlign: isRTL ? "right" : "left",
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
      }}>
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          background: "var(--bg-secondary)",
          padding: "2px 8px",
          borderRadius: 6,
          border: "1px solid var(--border-primary)",
        }}>
          <kbd style={{ fontFamily: "monospace", fontWeight: 600 }}>Enter</kbd>
          {t({ en: " to send", ar: " للإرسال", arEG: " للإرسال" })}
        </span>
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          background: "var(--bg-secondary)",
          padding: "2px 8px",
          borderRadius: 6,
          border: "1px solid var(--border-primary)",
        }}>
          <kbd style={{ fontFamily: "monospace", fontWeight: 600 }}>Shift+Enter</kbd>
          {t({ en: " for new line", ar: " لسطر جديد", arEG: " لسطر جديد" })}
        </span>
      </div>

      {/* Input area */}
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "flex-end",
          background: "var(--bg-secondary)",
          borderRadius: 16,
          border: "1px solid var(--border-primary)",
          padding: "10px 14px",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        className="chat-input-container"
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || (t({ en: "Type your message here...", ar: "اكتب رسالتك هنا...", arEG: "اكتب رسالتك هنا..." }))}
          rows={1}
          dir={inputDir}
          style={{
            flex: 1,
            border: "none",
            background: "transparent",
            color: "var(--text-primary)",
            fontSize: 14,
            lineHeight: 1.6,
            resize: "none",
            outline: "none",
            fontFamily: hasArabic ? "'Noto Kufi Arabic', 'Cairo', sans-serif" : "inherit",
            padding: "6px 4px",
            minHeight: 24,
            maxHeight: 200,
            overflowY: "auto",
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading || !value.trim()}
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            border: "none",
            background: loading || !value.trim()
              ? "var(--bg-elevated)"
              : `linear-gradient(135deg, ${modeColor}, ${modeColor}CC)`,
            color: loading || !value.trim() ? "var(--text-caption)" : "#fff",
            cursor: loading || !value.trim() ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.2s ease",
            boxShadow: loading || !value.trim()
              ? "none"
              : `0 2px 8px ${modeColor}40`,
          }}
          title={t({ en: "Send", ar: "إرسال", arEG: "إرسال" })}
        >
          {loading ? (
            <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
          ) : (
            <Send size={18} style={{ transform: isRTL ? "scaleX(-1)" : "none" }} />
          )}
        </button>
      </div>
    </div>
  );
}
