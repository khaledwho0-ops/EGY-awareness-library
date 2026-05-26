"use client";

import { useState } from "react";
import { MessageSquare, HeartPulse, ShieldCheck, Languages, GraduationCap, Link2, Settings, Plus, X, Clock, Trash2, ChevronDown, ChevronUp, Info, Globe, Search } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { ChatSession, MODE_INFO } from "./types";

interface SidebarProps {
  isRTL: boolean;
  activeMode: string;
  setActiveMode: (mode: string) => void;
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
  onDeleteSession: (id: string) => void;
  onClearAll: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const CHAT_MODES = [
  { id: "general", icon: <MessageSquare size={16} />, labelEn: "General AI", labelAr: "مساعد عام", color: "#3B82F6", category: "chat" },
  { id: "mental-health", icon: <HeartPulse size={16} />, labelEn: "Wellness", labelAr: "الصحة النفسية", color: "#10B981", category: "specialized" },
  { id: "claim", icon: <ShieldCheck size={16} />, labelEn: "Fact-Check", labelAr: "تحقق من ادعاء", color: "#EF4444", category: "specialized" },
  { id: "translation", icon: <Languages size={16} />, labelEn: "Translation", labelAr: "ترجمة دقيقة", color: "#F59E0B", category: "tools" },
  { id: "academic", icon: <GraduationCap size={16} />, labelEn: "Academic", labelAr: "أكاديمي/أبحاث", color: "#8B5CF6", category: "specialized" },
];

const SIDEBAR_SECTIONS = [
  { id: "chat", labelEn: "Chat", labelAr: "المحادثة" },
  { id: "specialized", labelEn: "Specialized", labelAr: "متخصص" },
  { id: "tools", labelEn: "Tools", labelAr: "أدوات" },
];

export function ChatSidebar({
  isRTL,
  activeMode,
  setActiveMode,
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  onDeleteSession,
  onClearAll,
  mobileOpen,
  setMobileOpen
}: SidebarProps) {
  const { t } = useRTL();
  
  const [expandedInfo, setExpandedInfo] = useState<string | null>(null);
  const [historyExpanded, setHistoryExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const currentModeObj = CHAT_MODES.find(m => m.id === activeMode) || CHAT_MODES[0];

  // Filter and group sessions by date
  const filtered = sessions.filter(s =>
    !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const todaySessions = filtered.filter(s => {
    const today = new Date();
    const sessionDate = new Date(s.updatedAt);
    return sessionDate.toDateString() === today.toDateString();
  });
  const olderSessions = filtered.filter(s => {
    const today = new Date();
    const sessionDate = new Date(s.updatedAt);
    return sessionDate.toDateString() !== today.toDateString();
  });

  return (
    <>
      {mobileOpen && (
        <div 
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 40, backdropFilter: "blur(4px)" }}
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div
        style={{
          width: 300,
          background: "var(--bg-secondary)",
          borderRight: t({ en: "1px solid var(--border-primary)", ar: "none", arEG: "none" }),
          borderLeft: isRTL ? "1px solid var(--border-primary)" : "none",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 50,
          height: "100%",
          overflow: "hidden",
        }}
        className={`fixed md:relative inset-y-0 ${t({ en: "left-0", ar: "right-0", arEG: "right-0" })} transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : t({ en: "-translate-x-full md:translate-x-0", ar: "translate-x-full md:translate-x-0", arEG: "translate-x-full md:translate-x-0" })
        }`}
      >
        {/* Header with close on mobile */}
        <div style={{ padding: "16px 16px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.15))",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <MessageSquare size={16} style={{ color: "var(--accent-cta)" }} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>
                {t({ en: "EAL Assistant", ar: "مساعد EAL", arEG: "مساعد EAL" })}
              </div>
              <div style={{ fontSize: 10, color: "var(--text-caption)" }}>
                {t({ en: "5 AI Models", ar: "5 نماذج ذكاء اصطناعي", arEG: "5 نماذج ذكاء اصطناعي" })}
              </div>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden"
            style={{
              background: "none", border: "none", color: "var(--text-muted)",
              cursor: "pointer", padding: 4, borderRadius: 6,
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* New Chat Button */}
        <div style={{ padding: "8px 16px 12px" }}>
          <button
            onClick={onNewSession}
            style={{
              width: "100%", padding: "10px 12px", borderRadius: 10,
              background: `linear-gradient(135deg, ${currentModeObj.color}15, ${currentModeObj.color}08)`,
              border: `1px solid ${currentModeObj.color}30`,
              color: currentModeObj.color, display: "flex", alignItems: "center",
              gap: 8, cursor: "pointer", fontSize: 13, fontWeight: 600,
              transition: "all 0.2s ease",
            }}
          >
            <Plus size={16} />
            {t({ en: "New Chat", ar: "محادثة جديدة", arEG: "محادثة جديدة" })}
          </button>
        </div>

        <div style={{ padding: "0 12px", overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Search sessions */}
          {sessions.length > 2 && (
            <div style={{
              position: "relative",
              display: "flex", alignItems: "center",
            }}>
              <Search size={12} style={{
                position: "absolute",
                [isRTL ? "right" : "left"]: 10,
                color: "var(--text-caption)",
                pointerEvents: "none",
              }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t({ en: "Search chats...", ar: "بحث في المحادثات...", arEG: "بحث في المحادثات..." })}
                style={{
                  width: "100%",
                  padding: "7px 10px",
                  paddingInlineStart: 30,
                  borderRadius: 8,
                  border: "1px solid var(--border-primary)",
                  background: "var(--bg-primary)",
                  color: "var(--text-primary)",
                  fontSize: 11,
                  outline: "none",
                  transition: "border-color 0.2s",
                  direction: isRTL ? "rtl" : "ltr",
                }}
              />
            </div>
          )}

          {/* Modes by Category */}
          {SIDEBAR_SECTIONS.map(section => {
            const sectionModes = CHAT_MODES.filter(m => m.category === section.id);
            if (sectionModes.length === 0) return null;
            return (
              <div key={section.id}>
                <div style={{
                  fontSize: 10, color: "var(--text-caption)", textTransform: "uppercase",
                  letterSpacing: "0.08em", marginBottom: 6,
                  paddingLeft: isRTL ? 0 : 10, paddingRight: isRTL ? 10 : 0,
                  fontWeight: 600,
                }}>
                  {isRTL ? section.labelAr : section.labelEn}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {sectionModes.map(mode => {
                    const isActive = activeMode === mode.id;
                    const info = MODE_INFO[mode.id];
                    const isInfoOpen = expandedInfo === mode.id;
                    return (
                      <div key={mode.id}>
                        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <button
                            onClick={() => {
                              setActiveMode(mode.id);
                              if (window.innerWidth < 768) setMobileOpen(false);
                            }}
                            style={{
                              flex: 1,
                              display: "flex", alignItems: "center", gap: 10,
                              padding: "9px 10px", borderRadius: 10,
                              background: isActive ? `${mode.color}15` : "transparent",
                              border: isActive ? `1px solid ${mode.color}25` : "1px solid transparent",
                              cursor: "pointer",
                              color: isActive ? mode.color : "var(--text-secondary)",
                              fontSize: 13, fontWeight: isActive ? 600 : 500,
                              transition: "all 0.2s",
                              textAlign: isRTL ? "right" : "left",
                            }}
                          >
                            <span style={{
                              width: 28, height: 28, borderRadius: 8,
                              background: isActive ? `${mode.color}20` : "var(--bg-elevated)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              flexShrink: 0,
                            }}>
                              {mode.icon}
                            </span>
                            <span>{isRTL ? mode.labelAr : mode.labelEn}</span>
                          </button>
                          {/* Info toggle */}
                          <button
                            onClick={() => setExpandedInfo(isInfoOpen ? null : mode.id)}
                            style={{
                              background: "none", border: "none", color: "var(--text-caption)",
                              cursor: "pointer", padding: 4, borderRadius: 6,
                              opacity: 0.5, transition: "opacity 0.2s",
                            }}
                            title={t({ en: "Tool details", ar: "تفاصيل الأداة", arEG: "تفاصيل الأداة" })}
                          >
                            <Info size={12} />
                          </button>
                        </div>
                        {/* Tool description panel */}
                        {isInfoOpen && info && (
                          <div style={{
                            margin: "4px 0 6px 10px",
                            padding: "10px 12px",
                            borderRadius: 10,
                            background: `${mode.color}08`,
                            border: `1px solid ${mode.color}15`,
                            fontSize: 11,
                            lineHeight: 1.6,
                            color: "var(--text-secondary)",
                            animation: "chatMsgFadeIn 0.2s ease-out",
                          }}>
                            <div style={{ fontWeight: 600, color: mode.color, marginBottom: 4 }}>
                              {t({ en: "What does it do?", ar: "ما هي الأداة؟", arEG: "ما هي الأداة؟" })}
                            </div>
                            <div style={{ marginBottom: 6 }}>{isRTL ? info.toolDescAr : info.toolDescEn}</div>
                            <div style={{ fontWeight: 600, color: mode.color, marginBottom: 4 }}>
                              {t({ en: "When to use?", ar: "متى تستخدمها؟", arEG: "متى تستخدمها؟" })}
                            </div>
                            <div style={{ marginBottom: 6 }}>{isRTL ? info.whenToUseAr : info.whenToUseEn}</div>
                            <div style={{ fontWeight: 600, color: mode.color, marginBottom: 4 }}>
                              {t({ en: "Expected output", ar: "ماذا تتوقع؟", arEG: "ماذا تتوقع؟" })}
                            </div>
                            <div>{isRTL ? info.outputAr : info.outputEn}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* History Section */}
          <div style={{ flex: 1, minHeight: 0 }}>
            <div
              onClick={() => setHistoryExpanded(!historyExpanded)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setHistoryExpanded(!historyExpanded); }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", padding: "6px 10px",
                background: "none", border: "none", cursor: "pointer",
                color: "var(--text-caption)", fontSize: 10,
                textTransform: "uppercase", letterSpacing: "0.08em",
                fontWeight: 600,
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Clock size={10} />
                {t({ en: "History", ar: "السجل", arEG: "السجل" })}
                <span style={{
                  background: "var(--bg-elevated)", padding: "1px 6px",
                  borderRadius: 8, fontSize: 9, color: "var(--text-muted)",
                }}>
                  {sessions.length}
                </span>
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {sessions.length > 0 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); if (confirm(t({ en: "Delete all chats?", ar: "حذف كل المحادثات؟", arEG: "حذف كل المحادثات؟" }))) onClearAll(); }}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: "var(--text-caption)", fontSize: 9, fontWeight: 500,
                      padding: "2px 6px", borderRadius: 4,
                      transition: "color 0.2s",
                    }}
                    title={t({ en: "Clear all", ar: "مسح الكل", arEG: "مسح الكل" })}
                  >
                    <Trash2 size={10} />
                  </button>
                )}
                {historyExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </div>
            </div>

            {historyExpanded && (
              <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 4 }}>
                {sessions.length === 0 ? (
                  <div style={{ fontSize: 12, color: "var(--text-muted)", padding: "8px 10px", textAlign: "center" }}>
                    {t({ en: "No previous chats.", ar: "لا يوجد محادثات سابقة.", arEG: "لا يوجد محادثات سابقة." })}
                  </div>
                ) : (
                  <>
                    {/* Today's sessions */}
                    {todaySessions.length > 0 && (
                      <>
                        <div style={{ fontSize: 9, color: "var(--text-caption)", padding: "4px 10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          {t({ en: "Today", ar: "اليوم", arEG: "اليوم" })}
                        </div>
                        {todaySessions.map(session => (
                          <SessionItem
                            key={session.id}
                            session={session}
                            isActive={activeSessionId === session.id}
                            isRTL={isRTL}
                            onSelect={() => {
                              onSelectSession(session.id);
                              if (window.innerWidth < 768) setMobileOpen(false);
                            }}
                            onDelete={() => onDeleteSession(session.id)}
                          />
                        ))}
                      </>
                    )}
                    {/* Older sessions */}
                    {olderSessions.length > 0 && (
                      <>
                        <div style={{ fontSize: 9, color: "var(--text-caption)", padding: "4px 10px", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 4 }}>
                          {t({ en: "Earlier", ar: "سابقاً", arEG: "سابقاً" })}
                        </div>
                        {olderSessions.map(session => (
                          <SessionItem
                            key={session.id}
                            session={session}
                            isActive={activeSessionId === session.id}
                            isRTL={isRTL}
                            onSelect={() => {
                              onSelectSession(session.id);
                              if (window.innerWidth < 768) setMobileOpen(false);
                            }}
                            onDelete={() => onDeleteSession(session.id)}
                          />
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Utilities Footer */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border-primary)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { id: "sources", icon: <Link2 size={14} />, labelEn: "Sources Library", labelAr: "مكتبة المصادر", href: "/sources" },
              { id: "language", icon: <Globe size={14} />, labelEn: "Language / اللغة", labelAr: "اللغة / Language", href: "/language-select" },
              { id: "settings", icon: <Settings size={14} />, labelEn: "Settings", labelAr: "الإعدادات" },
            ].map(u => (
              <button
                key={u.id}
                onClick={() => {
                  if (u.href) window.location.href = u.href;
                }}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "8px 10px", borderRadius: 8,
                  background: "transparent", border: "none", cursor: "pointer",
                  color: "var(--text-secondary)", fontSize: 12, fontWeight: 500,
                  transition: "background 0.2s",
                }}
                className="hover:bg-[var(--bg-elevated)] transition-colors"
              >
                {u.icon}
                {isRTL ? u.labelAr : u.labelEn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Session List Item ── */

function SessionItem({
  session,
  isActive,
  isRTL,
  onSelect,
  onDelete,
}: {
  session: ChatSession;
  isActive: boolean;
  isRTL: boolean;
  onSelect: () => void;
  onDelete: () => void;
}) {
  const { t } = useRTL();
  const modeObj = CHAT_MODES.find(m => m.id === session.mode);
  const modeColor = modeObj?.color || "#aaa";

  return (
    <div
      onClick={onSelect}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "8px 10px", borderRadius: 10,
        background: isActive ? "var(--bg-elevated)" : "transparent",
        border: isActive ? "1px solid var(--border-primary)" : "1px solid transparent",
        cursor: "pointer",
        color: "var(--text-secondary)",
        fontSize: 12, transition: "all 0.2s",
        gap: 6,
      }}
      className="group hover:bg-[var(--bg-elevated)]"
    >
      <div style={{ display: "flex", flexDirection: "column", overflow: "hidden", flex: 1, minWidth: 0 }}>
        <span style={{
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          color: isActive ? "var(--text-primary)" : "inherit",
          fontWeight: isActive ? 500 : 400,
        }}>
          {session.title}
        </span>
        <span style={{ fontSize: 10, color: "var(--text-caption)", display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: modeColor, flexShrink: 0 }} />
          <span>{isRTL ? (modeObj?.labelAr || session.mode) : (modeObj?.labelEn || session.mode)}</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>{session.messages.length} {t({ en: "msg", ar: "رسالة", arEG: "رسالة" })}</span>
        </span>
      </div>
      {/* X / Close button for each session */}
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        style={{
          background: "none", border: "none",
          color: "var(--text-muted)",
          padding: 4, cursor: "pointer",
          opacity: isActive ? 0.7 : 0,
          transition: "opacity 0.2s, color 0.2s",
          borderRadius: 6,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}
        className="group-hover:opacity-70 hover:!opacity-100 hover:!color-[#EF4444] transition-opacity"
        title={t({ en: "Delete chat", ar: "حذف المحادثة", arEG: "حذف المحادثة" })}
      >
        <X size={14} />
      </button>
    </div>
  );
}
