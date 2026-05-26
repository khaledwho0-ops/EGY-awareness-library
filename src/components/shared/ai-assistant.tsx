"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Sparkles, Loader2, Shield, HeartPulse, Brain } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";

type Mode = "general" | "claim" | "mental-health";

interface Message {
  role: "user" | "assistant";
  content: string;
  provider?: string;
  model?: string;
  latencyMs?: number;
}

const MODES: { id: Mode; icon: React.ReactNode; labelEn: string; labelAr: string; color: string }[] = [
  { id: "general", icon: <Bot size={14} />, labelEn: "General", labelAr: "عام", color: "#3B82F6" },
  { id: "claim", icon: <Shield size={14} />, labelEn: "Fact-Check", labelAr: "تحقق", color: "#EF4444" },
  { id: "mental-health", icon: <HeartPulse size={14} />, labelEn: "Wellness", labelAr: "صحة نفسية", color: "#10B981" },
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("general");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { isRTL, t } = useRTL();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content, mode }),
      });
      const data = await res.json();

      if (data.ok) {
        setMessages(prev => [...prev, {
          role: "assistant",
          content: data.text,
          provider: data.provider,
          model: data.model,
          latencyMs: data.latencyMs,
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: "assistant",
          content: isRTL
            ? "⚠️ مفيش مفاتيح AI متوفرة. أضف مفتاح واحد على الأقل (Gemini/Groq/GitHub/HuggingFace) في ملف .env وأعد التشغيل."
            : "⚠️ No AI keys configured. Add at least one API key (Gemini/Groq/GitHub/HuggingFace) to your .env file and restart.",
        }]);
      }
    } catch {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: isRTL ? "⚠️ خطأ في الاتصال. تأكد من الاتصال بالإنترنت." : "⚠️ Connection error. Check your internet.",
      }]);
    }
    setLoading(false);
  };

  const a = isRTL;
  const currentMode = MODES.find(m => m.id === mode)!;

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 9998,
          width: 56, height: 56, borderRadius: "50%",
          background: "linear-gradient(135deg, #8B5CF6, #3B82F6)",
          border: "none", cursor: "pointer", display: "flex",
          alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(139,92,246,0.4)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        <Sparkles size={24} color="#fff" />
      </button>
    );
  }

  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 9998,
      width: 380, height: 520, display: "flex", flexDirection: "column",
      background: "var(--bg-elevated)", border: "1px solid var(--border-primary)",
      borderRadius: 16, boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
      overflow: "hidden", direction: a ? "rtl" : "ltr",
    }}>
      {/* Header */}
      <div style={{
        padding: "12px 16px", display: "flex", alignItems: "center", gap: 10,
        background: `linear-gradient(135deg, ${currentMode.color}22, transparent)`,
        borderBottom: "1px solid var(--border-primary)",
      }}>
        <Brain size={20} color={currentMode.color} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>
            {t({ en: "EAL AI Assistant", ar: "مساعد EAL الذكي", arEG: "مساعد EAL الذكي" })}
          </div>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
            Gemini → Groq → GitHub → HuggingFace
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 4 }}>
          <X size={18} />
        </button>
      </div>

      {/* Mode Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--border-primary)" }}>
        {MODES.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            style={{
              flex: 1, padding: "8px 0", display: "flex", alignItems: "center",
              justifyContent: "center", gap: 4, fontSize: 12, fontWeight: mode === m.id ? 700 : 400,
              background: mode === m.id ? `${m.color}15` : "transparent",
              borderBottom: mode === m.id ? `2px solid ${m.color}` : "2px solid transparent",
              color: mode === m.id ? m.color : "var(--text-muted)",
              border: "none", cursor: "pointer", transition: "all 0.2s",
            }}
          >
            {m.icon} {a ? m.labelAr : m.labelEn}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-muted)", fontSize: 13 }}>
            <Sparkles size={32} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
            <div>{t({ en: "Ask about misinformation, mental health, or verify a claim", ar: "اسأل أي سؤال عن التضليل، الصحة النفسية، أو تحقق من ادعاء", arEG: "اسأل أي سؤال عن التضليل، الصحة النفسية، أو تحقق من ادعاء" })}</div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{
            alignSelf: msg.role === "user" ? (a ? "flex-start" : "flex-end") : (a ? "flex-end" : "flex-start"),
            maxWidth: "85%",
          }}>
            <div style={{
              padding: "10px 14px", borderRadius: 12, fontSize: 13, lineHeight: 1.6,
              background: msg.role === "user" ? currentMode.color : "var(--bg-secondary)",
              color: msg.role === "user" ? "#fff" : "var(--text-primary)",
              whiteSpace: "pre-wrap", wordBreak: "break-word",
            }}>
              {msg.content}
            </div>
            {msg.provider && (
              <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 4, fontFamily: "monospace" }}>
                {msg.provider} · {msg.model} · {msg.latencyMs}ms
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 10, color: "var(--text-muted)", fontSize: 13 }}>
            <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
            {t({ en: "Analyzing...", ar: "جاري التحليل...", arEG: "جاري التحليل..." })}
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ padding: 12, borderTop: "1px solid var(--border-primary)", display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
          placeholder={t({ en: "Type your message...", ar: "اكتب رسالتك...", arEG: "اكتب رسالتك..." })}
          style={{
            flex: 1, padding: "10px 14px", borderRadius: 10, fontSize: 13,
            background: "var(--bg-secondary)", border: "1px solid var(--border-primary)",
            color: "var(--text-primary)", outline: "none", fontFamily: "inherit",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{
            width: 40, height: 40, borderRadius: 10, border: "none",
            background: currentMode.color, color: "#fff", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: loading || !input.trim() ? 0.5 : 1,
          }}
        >
          <Send size={16} />
        </button>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
