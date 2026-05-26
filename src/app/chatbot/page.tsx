"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, Sparkles, Loader2, Globe, Info, ChevronRight, ArrowDown, Download } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { ChatMessage, ChatMessageData } from "@/components/chatbot/chat-message";
import { ChatInput } from "@/components/chatbot/chat-input";
import { ChatSidebar, CHAT_MODES } from "@/components/chatbot/sidebar";
import {
  ChatSession, loadSessions, saveSessions, createSession,
  MODE_EXAMPLES, MODE_INFO,
} from "@/components/chatbot/types";
import { CHAT_STRINGS as CS } from "@/data/i18n/chatbot-strings";

export default function ChatbotPage() {
  const { isRTL, t } = useRTL();

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState("general");
  const [loading, setLoading] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load sessions from localStorage on mount
  useEffect(() => {
    const loaded = loadSessions();
    setSessions(loaded);
    if (loaded.length > 0) {
      setActiveSessionId(loaded[0].id);
      setActiveMode(loaded[0].mode);
    }
    // Show onboarding if first visit
    const hasVisited = localStorage.getItem("eal-chatbot-onboarded");
    if (!hasVisited) setShowOnboarding(true);
  }, []);

  // Auto-scroll to bottom on new messages
  const activeSession = sessions.find(s => s.id === activeSessionId) || null;
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [activeSession?.messages.length]);

  const persistSessions = useCallback((updated: ChatSession[]) => {
    setSessions(updated);
    saveSessions(updated);
  }, []);

  const handleNewSession = useCallback(() => {
    const session = createSession(activeMode);
    const updated = [session, ...sessions];
    persistSessions(updated);
    setActiveSessionId(session.id);
  }, [activeMode, sessions, persistSessions]);

  const handleSelectSession = useCallback((id: string) => {
    setActiveSessionId(id);
    const s = sessions.find(x => x.id === id);
    if (s) setActiveMode(s.mode);
  }, [sessions]);

  const handleDeleteSession = useCallback((id: string) => {
    const updated = sessions.filter(s => s.id !== id);
    persistSessions(updated);
    if (activeSessionId === id) {
      setActiveSessionId(updated.length > 0 ? updated[0].id : null);
    }
  }, [sessions, activeSessionId, persistSessions]);

  const handleClearAll = useCallback(() => {
    persistSessions([]);
    setActiveSessionId(null);
  }, [persistSessions]);

  const handleDeleteMessage = useCallback((msgId: string) => {
    if (!activeSessionId) return;
    const updated = sessions.map(s => {
      if (s.id !== activeSessionId) return s;
      return { ...s, messages: s.messages.filter(m => m.id !== msgId) };
    });
    persistSessions(updated);
  }, [activeSessionId, sessions, persistSessions]);

  const handleModeChange = useCallback((mode: string) => {
    setActiveMode(mode);
    // If current session has no messages, change its mode
    if (activeSession && activeSession.messages.length === 0) {
      const updated = sessions.map(s =>
        s.id === activeSessionId ? { ...s, mode } : s
      );
      persistSessions(updated);
    }
  }, [activeSession, activeSessionId, sessions, persistSessions]);

  const handleSend = useCallback(async (text: string) => {
    let currentId = activeSessionId;
    let currentSessions = [...sessions];

    // Create session if none
    if (!currentId) {
      const newS = createSession(activeMode);
      currentSessions = [newS, ...currentSessions];
      currentId = newS.id;
      setActiveSessionId(currentId);
    }

    const userMsg: ChatMessageData = {
      id: `msg-${Date.now()}-u`,
      role: "user",
      content: text,
      timestamp: Date.now(),
      mode: activeMode,
    };

    // Add user message
    currentSessions = currentSessions.map(s => {
      if (s.id !== currentId) return s;
      const title = s.messages.length === 0 ? text.slice(0, 40) + (text.length > 40 ? "…" : "") : s.title;
      return { ...s, messages: [...s.messages, userMsg], title, updatedAt: Date.now(), mode: activeMode };
    });
    persistSessions(currentSessions);
    setLoading(true);

    try {
      // Build conversation history (last 10 messages for context)
      const currentSession = currentSessions.find(s => s.id === currentId);
      const history = (currentSession?.messages || []).slice(-10).map(m => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, mode: activeMode, history }),
      });
      const data = await res.json();

      if (data.ok) {
        const botMsg: ChatMessageData = {
          id: `msg-${Date.now()}-b`,
          role: "assistant",
          content: data.text,
          timestamp: Date.now(),
          provider: data.provider,
          model: data.model,
          latencyMs: data.latencyMs,
          mode: activeMode,
          sources: data.sources || undefined,
        };
        const final = currentSessions.map(s =>
          s.id === currentId ? { ...s, messages: [...s.messages, botMsg], updatedAt: Date.now() } : s
        );
        persistSessions(final);
      } else {
        // API responded but with error
        const errMsg: ChatMessageData = {
          id: `msg-${Date.now()}-e`,
          role: "assistant",
          content: isRTL
            ? `⚠️ حصل خطأ من الخادم.\n\n**التفاصيل:** ${data.error || "خطأ غير معروف"}\n\n${t(CS.retryBtn)}`
            : `⚠️ Server error.\n\n**Details:** ${data.error || "Unknown error"}\n\nYou can retry or try a different mode.`,
          timestamp: Date.now(),
          mode: activeMode,
          isError: true,
        };
        const final = currentSessions.map(s =>
          s.id === currentId ? { ...s, messages: [...s.messages, errMsg], updatedAt: Date.now() } : s
        );
        persistSessions(final);
      }
    } catch {
      const errMsg: ChatMessageData = {
        id: `msg-${Date.now()}-e`,
        role: "assistant",
        content: isRTL
          ? "⚠️ خطأ في الاتصال بالإنترنت.\n\n**الحل:** تأكد من اتصالك بالإنترنت وحاول مرة أخرى."
          : "⚠️ Network connection error.\n\n**Fix:** Check your internet connection and try again.",
        timestamp: Date.now(),
        mode: activeMode,
        isError: true,
      };
      const final = currentSessions.map(s =>
        s.id === currentId ? { ...s, messages: [...s.messages, errMsg], updatedAt: Date.now() } : s
      );
      persistSessions(final);
    }
    setLoading(false);
  }, [activeSessionId, activeMode, sessions, persistSessions, isRTL]);

  const currentModeObj = CHAT_MODES.find(m => m.id === activeMode) || CHAT_MODES[0];
  const modeColor = currentModeObj.color;
  const info = MODE_INFO[activeMode] || MODE_INFO.general;
  const examples = MODE_EXAMPLES[activeMode] || [];
  const msgs = activeSession?.messages || [];

  const handleDismissOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem("eal-chatbot-onboarded", "true");
  };

  return (
    <div style={{
      display: "flex",
      height: "calc(100vh - var(--navbar-height, 64px))",
      background: "var(--bg-primary)",
      direction: isRTL ? "rtl" : "ltr",
      overflow: "hidden",
    }}>
      {/* Sidebar */}
      <ChatSidebar
        isRTL={isRTL}
        activeMode={activeMode}
        setActiveMode={handleModeChange}
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
        onNewSession={handleNewSession}
        onDeleteSession={handleDeleteSession}
        onClearAll={handleClearAll}
        mobileOpen={mobileSidebar}
        setMobileOpen={setMobileSidebar}
      />

      {/* Main Chat Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top bar */}
        <div style={{
          padding: "10px 16px",
          borderBottom: "1px solid var(--border-primary)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "var(--bg-primary)",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => setMobileSidebar(true)}
              className="md:hidden"
              style={{ background: "none", border: "none", color: "var(--text-primary)", cursor: "pointer", padding: 4 }}
            >
              <Menu size={20} />
            </button>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: `${modeColor}12`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: modeColor, border: `1px solid ${modeColor}20`,
            }}>
              {currentModeObj.icon}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>
                {isRTL ? currentModeObj.labelAr : currentModeObj.labelEn}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-caption)", maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {isRTL ? info.descAr : info.descEn}
              </div>
            </div>
          </div>

          {/* Mode indicator badges */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              padding: "4px 10px", borderRadius: 20,
              background: `${modeColor}10`, border: `1px solid ${modeColor}20`,
              fontSize: 10, fontWeight: 600, color: modeColor,
              display: "flex", alignItems: "center", gap: 4,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: modeColor, animation: "pulse 2s infinite" }} />
              {t(CS.connected)}
            </div>
          </div>
        </div>

        {/* Onboarding overlay */}
        {showOnboarding && (
          <div style={{
            position: "absolute", inset: 0, zIndex: 30,
            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20,
          }}>
            <div style={{
              maxWidth: 520, width: "100%",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
              borderRadius: 20,
              padding: "32px 28px",
              animation: "chatMsgFadeIn 0.3s ease-out",
            }}>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.15))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px",
                }}>
                  <Sparkles size={24} style={{ color: "var(--accent-cta)" }} />
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>
                  {t(CS.welcome)}
                </h2>
                <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 400, margin: "0 auto" }}>
                  {t(CS.welcomeDesc)}
                </p>
              </div>

              {/* Feature cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 24 }}>
                {CHAT_MODES.map(mode => (
                  <div key={mode.id} style={{
                    padding: "12px",
                    borderRadius: 12,
                    background: `${mode.color}08`,
                    border: `1px solid ${mode.color}15`,
                    display: "flex", alignItems: "center", gap: 8,
                  }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 8,
                      background: `${mode.color}15`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: mode.color, flexShrink: 0,
                    }}>
                      {mode.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>
                        {isRTL ? mode.labelAr : mode.labelEn}
                      </div>
                      <div style={{ fontSize: 10, color: "var(--text-caption)" }}>
                        {isRTL
                          ? MODE_INFO[mode.id]?.toolDescAr?.slice(0, 40) + "..."
                          : MODE_INFO[mode.id]?.toolDescEn?.slice(0, 40) + "..."}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tips */}
              <div style={{
                padding: "12px 14px", borderRadius: 12,
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-primary)",
                marginBottom: 20,
                fontSize: 11, color: "var(--text-muted)", lineHeight: 1.7,
              }}>
                <div style={{ fontWeight: 600, marginBottom: 4, color: "var(--text-secondary)" }}>
                  {t(CS.quickTips)}
                </div>
                <div>{t(CS.tipEnter)}</div>
                <div>{t(CS.tipModels)}</div>
                <div>{t(CS.tipLang)}</div>
                <div>{t(CS.tipCopy)}</div>
              </div>

              <button
                onClick={handleDismissOnboarding}
                style={{
                  width: "100%", padding: "12px", borderRadius: 12,
                  background: "var(--accent-cta)", color: "#fff",
                  border: "none", fontSize: 14, fontWeight: 700,
                  cursor: "pointer", transition: "all 0.2s",
                  boxShadow: "0 4px 12px rgba(139,92,246,0.3)",
                }}
              >
                {t(CS.getStarted)} <ChevronRight size={16} style={{ display: "inline", verticalAlign: "middle" }} />
              </button>
            </div>
          </div>
        )}

        {/* Messages area */}
        <div
          ref={scrollRef}
          onScroll={() => {
            if (!scrollRef.current) return;
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 120);
          }}
          style={{
            flex: 1, overflowY: "auto",
            padding: "20px 16px",
            display: "flex", flexDirection: "column", gap: 20,
            position: "relative",
          }}
        >
          {msgs.length === 0 ? (
            <div style={{
              flex: 1, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: 20, padding: "32px 16px", textAlign: "center",
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 18,
                background: `${modeColor}10`,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: `1px solid ${modeColor}15`,
              }}>
                <Sparkles size={28} style={{ color: modeColor, opacity: 0.6 }} />
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
                  {isRTL ? currentModeObj.labelAr : currentModeObj.labelEn}
                </h3>
                <p style={{ fontSize: 13, color: "var(--text-muted)", maxWidth: 400, margin: "0 auto", lineHeight: 1.7 }}>
                  {isRTL ? info.descAr : info.descEn}
                </p>
              </div>

              {/* Example prompts */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", maxWidth: 480 }}>
                <div style={{ fontSize: 10, color: "var(--text-caption)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
                  {t(CS.tryExample)}
                </div>
                {examples.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(isRTL ? ex.textAr : ex.textEn)}
                    style={{
                      padding: "12px 16px", borderRadius: 12,
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-primary)",
                      color: "var(--text-secondary)", fontSize: 13,
                      textAlign: isRTL ? "right" : "left",
                      cursor: "pointer", transition: "all 0.2s",
                      fontFamily: isRTL ? "'Noto Kufi Arabic', sans-serif" : "inherit",
                      display: "flex", alignItems: "center", gap: 10,
                    }}
                  >
                    {ex.icon && <span style={{ fontSize: 16 }}>{ex.icon}</span>}
                    {isRTL ? ex.textAr : ex.textEn}
                  </button>
                ))}
              </div>

              {/* Mode-specific guidance */}
              <div style={{
                padding: "12px 16px", borderRadius: 12,
                background: `${modeColor}06`, border: `1px solid ${modeColor}12`,
                maxWidth: 480, width: "100%",
                fontSize: 11, color: "var(--text-caption)", lineHeight: 1.6,
                display: "flex", alignItems: "flex-start", gap: 8,
              }}>
                <Info size={14} style={{ color: modeColor, flexShrink: 0, marginTop: 2 }} />
                <div>
                  <span style={{ fontWeight: 600, color: modeColor }}>
                    {t(CS.notePrefix)}
                  </span>
                  {activeMode === "academic"
                    ? t(CS.noteAcademic)
                    : activeMode === "claim"
                    ? t(CS.noteClaim)
                    : activeMode === "translation"
                    ? t(CS.noteTranslation)
                    : activeMode === "mental-health"
                    ? t(CS.noteMH)
                    : t(CS.noteGeneral)}
                </div>
              </div>
            </div>
          ) : (
            msgs.map(msg => (
              <ChatMessage
                key={msg.id}
                message={msg}
                isRTL={isRTL}
                onDelete={handleDeleteMessage}
                onRetry={() => {
                  // Find the user message right before this error
                  const idx = msgs.findIndex(m => m.id === msg.id);
                  const prevUserMsg = idx > 0 ? msgs[idx - 1] : null;
                  if (prevUserMsg && prevUserMsg.role === "user") {
                    // Remove the error message, then resend
                    handleDeleteMessage(msg.id);
                    handleSend(prevUserMsg.content);
                  }
                }}
              />
            ))
          )}
          {loading && (
            <div style={{
              display: "flex", flexDirection: "column", gap: 6,
              alignItems: isRTL ? "flex-end" : "flex-start",
              animation: "chatMsgFadeIn 0.3s ease-out",
            }}>
              {/* Bot avatar row */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: "var(--bg-elevated)", border: "1px solid var(--border-primary)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Loader2 size={14} style={{ color: "var(--accent-cta)", animation: "spin 1s linear infinite" }} />
                </div>
                <span style={{ fontSize: 11, color: "var(--text-caption)", fontWeight: 500 }}>
                  {t(CS.assistant)}
                </span>
              </div>
              {/* Typing bubble */}
              <div style={{
                padding: "14px 20px",
                borderRadius: isRTL ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-primary)",
                display: "flex", alignItems: "center", gap: 10,
                maxWidth: "70%",
              }}>
                {/* Bouncing dots */}
                <div style={{ display: "flex", gap: 4 }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: 7, height: 7, borderRadius: "50%",
                      background: modeColor,
                      opacity: 0.7,
                      animation: `typingBounce 1.2s ease-in-out ${i * 0.15}s infinite`,
                    }} />
                  ))}
                </div>
                <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>
                  {activeMode === "claim"
                    ? t(CS.loadingClaim)
                    : activeMode === "translation"
                    ? t(CS.loadingTranslation)
                    : activeMode === "academic"
                    ? t(CS.loadingAcademic)
                    : activeMode === "mental-health"
                    ? t(CS.loadingMH)
                    : t(CS.loadingGeneral)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Scroll to bottom FAB */}
        {showScrollBtn && msgs.length > 0 && (
          <div style={{ display: "flex", justifyContent: "center", padding: "0 16px" }}>
            <button
              onClick={() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "6px 16px", borderRadius: 20,
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-primary)",
                color: "var(--text-secondary)", fontSize: 11, fontWeight: 500,
                cursor: "pointer", transition: "all 0.2s",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                animation: "chatMsgFadeIn 0.2s ease-out",
              }}
            >
              <ArrowDown size={12} />
              {t(CS.scrollDown)}
            </button>
          </div>
        )}

        {/* Export chat button — appears when there are messages */}
        {msgs.length > 2 && (
          <div style={{ display: "flex", justifyContent: isRTL ? "flex-start" : "flex-end", padding: "4px 16px 0" }}>
            <button
              onClick={() => {
                if (!activeSession) return;
                const modeLabel = CHAT_MODES.find(m => m.id === activeSession.mode)?.labelEn || activeSession.mode;
                let text = `EAL Chat Export — ${modeLabel}\n`;
                text += `Date: ${new Date(activeSession.createdAt).toLocaleDateString()}\n`;
                text += `${"─".repeat(50)}\n\n`;
                activeSession.messages.forEach(m => {
                  const time = new Date(m.timestamp).toLocaleTimeString();
                  text += `[${m.role === "user" ? "You" : "EAL"}] (${time}):\n${m.content}\n\n`;
                });
                text += `${"─".repeat(50)}\n`;
                text += `Powered by Egyptian Awareness Library — ${activeSession.messages.length} messages`;
                const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `eal-chat-${activeSession.id.slice(0, 8)}.txt`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              style={{
                display: "flex", alignItems: "center", gap: 4,
                padding: "3px 10px", borderRadius: 12,
                background: "transparent",
                border: "1px solid var(--border-primary)",
                color: "var(--text-caption)", fontSize: 10, fontWeight: 500,
                cursor: "pointer", transition: "all 0.2s",
              }}
              title={isRTL ? "تحميل المحادثة" : "Download chat"}
            >
              <Download size={10} />
              {t(CS.exportBtn)}
            </button>
          </div>
        )}

        {/* Input */}
        <ChatInput
          onSend={handleSend}
          loading={loading}
          isRTL={isRTL}
          modeColor={modeColor}
          placeholder={
            activeMode === "claim"
              ? t(CS.placeholderClaim)
              : activeMode === "translation"
              ? t(CS.placeholderTranslation)
              : activeMode === "academic"
              ? t(CS.placeholderAcademic)
              : activeMode === "mental-health"
              ? t(CS.placeholderMH)
              : t(CS.placeholderGeneral)
          }
        />
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes chatMsgFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes typingBounce { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-6px); } }

        /* X button hover on messages */
        .chat-msg-close-btn { opacity: 0 !important; }
        div:hover > .chat-msg-close-btn { opacity: 0.6 !important; }
        .chat-msg-close-btn:hover { opacity: 1 !important; background: rgba(239,68,68,0.1) !important; color: #EF4444 !important; }

        /* Focus state for input */
        .chat-input-container:focus-within {
          border-color: var(--accent-cta) !important;
          box-shadow: 0 0 0 3px rgba(139,92,246,0.1) !important;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .md\\:hidden { display: flex !important; }
          .md\\:relative { position: fixed !important; }
          .md\\:translate-x-0 { /* handled by conditional class */ }
        }
        @media (min-width: 769px) {
          .md\\:hidden { display: none !important; }
          .md\\:relative { position: relative !important; }
          .md\\:translate-x-0 { transform: translateX(0) !important; }
        }
      `}</style>
    </div>
  );
}
