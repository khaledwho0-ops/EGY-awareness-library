'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Loader2, Send, ShieldCheck, ShieldAlert, AlertTriangle,
  CheckCircle2, XCircle, HelpCircle, ChevronDown
} from 'lucide-react';
import { AGENT_PROFILES } from '@/lib/agents/profiles';
import type { AgentResult, InvestigationReport } from '@/lib/agents/types';

/* ─────────────────────────────────────────────────────────
   COLOR SYSTEM — Consistent with Angry Debunkers palette
───────────────────────────────────────────────────────── */
const C = {
  bg: '#05010A',
  surface: '#110818',
  surfaceHigh: '#1A0F24',
  border: 'rgba(255,255,255,0.06)',
  primary: '#C2185B',
  primaryGlow: 'rgba(194,24,91,0.35)',
  primaryDeep: '#6B0F1A',
  violet: '#7B1FA2',
  violetGlow: 'rgba(123,31,162,0.3)',
  azure: '#1976D2',
  ice: '#80DEEA',
  iceGlow: 'rgba(128,222,234,0.25)',
  success: '#26A69A',
  danger: '#E53935',
  amber: '#FF8F00',
  textPrimary: '#F5EEF8',
  textMuted: '#9E8FA8',
  textSubtle: '#5C4A6B',
};

const VERDICT_CONFIG: Record<string, { color: string; icon: React.ReactNode; label: string; labelAr: string }> = {
  TRUE: { color: C.success, icon: <CheckCircle2 size={28} />, label: 'VERIFIED TRUE', labelAr: 'حقيقي' },
  FALSE: { color: C.danger, icon: <XCircle size={28} />, label: 'FALSE', labelAr: 'كاذب' },
  MISLEADING: { color: C.amber, icon: <AlertTriangle size={28} />, label: 'MISLEADING', labelAr: 'مضلل' },
  UNVERIFIED: { color: C.textMuted, icon: <HelpCircle size={28} />, label: 'UNVERIFIED', labelAr: 'لم يتم التحقق' },
  PARTIALLY_TRUE: { color: C.azure, icon: <ShieldCheck size={28} />, label: 'PARTIALLY TRUE', labelAr: 'صحيح جزئياً' },
};

const AGENT_COLORS: Record<string, string> = {
  'source-hunter': '#00BCD4',
  'bias-detector': '#FF9800',
  'arabic-linguist': '#8BC34A',
  'timeline-builder': '#E040FB',
  'counter-narrative': '#448AFF',
};

/* ─── Font helpers ─── */
const fBase = { fontFamily: "'Inter', system-ui, sans-serif" };
const fArabic = { fontFamily: "'IBM Plex Sans Arabic', 'Cairo', sans-serif" };

/* ═══════════════════════════════════════════════════════════
   MAIN AI AGENTS PAGE
═══════════════════════════════════════════════════════════ */
export default function AIAgentsPage() {
  const [claim, setClaim] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'INVESTIGATING' | 'COMPLETE'>('IDLE');
  const [report, setReport] = useState<InvestigationReport | null>(null);
  const [agentStatuses, setAgentStatuses] = useState<Record<string, 'idle' | 'working' | 'done' | 'error'>>({});
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Simulate agent progress
  useEffect(() => {
    if (status !== 'INVESTIGATING') return;

    const initStatuses: Record<string, 'idle' | 'working' | 'done' | 'error'> = {};
    AGENT_PROFILES.forEach((a) => (initStatuses[a.id] = 'idle'));
    setAgentStatuses(initStatuses);

    // Stagger agent activation
    const timers: ReturnType<typeof setTimeout>[] = [];
    AGENT_PROFILES.forEach((agent, i) => {
      timers.push(
        setTimeout(() => {
          setAgentStatuses((prev) => ({ ...prev, [agent.id]: 'working' }));
        }, i * 400 + 200)
      );
    });

    return () => timers.forEach(clearTimeout);
  }, [status]);

  // When report arrives, mark agents done
  useEffect(() => {
    if (!report) return;
    const updates: Record<string, 'idle' | 'working' | 'done' | 'error'> = {};
    report.agents.forEach((a) => {
      updates[a.agentId] = a.confidence > 0 ? 'done' : 'error';
    });
    setAgentStatuses((prev) => ({ ...prev, ...updates }));
  }, [report]);

  const handleInvestigate = async () => {
    if (!claim.trim()) return;
    setStatus('INVESTIGATING');
    setReport(null);
    setError(null);
    setExpandedAgent(null);

    try {
      const res = await fetch('/api/agents/investigate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claim: claim.trim() }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${res.status}`);
      }

      const data: InvestigationReport = await res.json();
      setReport(data);
      setStatus('COMPLETE');
    } catch (err) {
      console.error(err);
      setError((err as Error).message || 'Investigation failed');
      setStatus('IDLE');
    }
  };

  const getAgentResult = (agentId: string): AgentResult | undefined =>
    report?.agents.find((a) => a.agentId === agentId);

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden relative"
      style={{
        ...fBase,
        background: `radial-gradient(ellipse 80% 50% at 50% -10%, ${C.primaryDeep}55 0%, transparent 70%), ${C.bg}`,
        color: C.textPrimary,
      }}
    >
      {/* ── Atmospheric Background ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[20%] -left-[15%] w-[60vw] h-[60vw] max-w-[900px] rounded-full"
          style={{ background: `radial-gradient(circle, ${C.violet}, transparent 70%)`, filter: 'blur(100px)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.14, 0.06] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          className="absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] max-w-[700px] rounded-full"
          style={{ background: `radial-gradient(circle, ${C.primary}, transparent 70%)`, filter: 'blur(120px)' }}
        />
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-5 lg:px-8 pt-16 pb-32">
        {/* ══ HERO ══ */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8"
            style={{
              background: `linear-gradient(135deg, ${C.primaryDeep}80, ${C.violet}60)`,
              border: `1px solid ${C.primary}40`,
              backdropFilter: 'blur(20px)',
              boxShadow: `0 0 24px ${C.primaryGlow}`,
            }}
          >
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
              <ShieldAlert size={16} style={{ color: C.primary }} />
            </motion.div>
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: C.ice }}>
              AI Agent Network
            </span>
          </motion.div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-none mb-4"
            style={{
              letterSpacing: '-0.04em',
              background: `linear-gradient(135deg, ${C.textPrimary} 0%, ${C.primary} 40%, ${C.violet} 70%, ${C.ice} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: `drop-shadow(0 0 40px ${C.primaryGlow})`,
            }}
          >
            Intelligence Network
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: C.textMuted }}>
            Five specialized AI agents working in parallel to investigate, verify, and debunk claims
            with surgical precision.
          </p>
          <p className="text-base mt-2" dir="rtl" style={{ ...fArabic, color: `${C.textMuted}90` }}>
            شبكة استخباراتية من ٥ وكلاء ذكاء اصطناعي متخصصين
          </p>
        </motion.header>

        {/* ══ CLAIM INPUT ══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-14"
        >
          <div
            className="relative overflow-hidden transition-all duration-500"
            style={{
              borderRadius: '28px',
              background: `linear-gradient(160deg, ${C.surfaceHigh} 0%, ${C.surface} 100%)`,
              border: `1px solid ${C.border}`,
              backdropFilter: 'blur(40px)',
              boxShadow: `0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`,
            }}
          >
            <div className="p-6 sm:p-8">
              <textarea
                className="w-full bg-transparent resize-none focus:outline-none font-semibold leading-relaxed"
                rows={3}
                value={claim}
                onChange={(e) => setClaim(e.target.value)}
                placeholder="Enter a claim to investigate..."
                dir="auto"
                style={{
                  fontFamily: claim.match(/[\u0600-\u06FF]/)
                    ? "'IBM Plex Sans Arabic', 'Cairo', sans-serif"
                    : "'Inter', sans-serif",
                  fontSize: 'clamp(18px, 2.5vw, 28px)',
                  color: C.textPrimary,
                }}
              />
            </div>

            <div
              className="flex justify-between items-center px-6 sm:px-8 py-4"
              style={{
                borderTop: `1px solid ${C.border}`,
                background: `${C.surface}CC`,
              }}
            >
              <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: C.textSubtle }}>
                <motion.div
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full"
                  style={{ background: C.success, boxShadow: `0 0 6px ${C.success}` }}
                />
                5 Agents Ready
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={status === 'COMPLETE' ? () => { setStatus('IDLE'); setReport(null); setClaim(''); } : handleInvestigate}
                disabled={status === 'INVESTIGATING' || (!claim.trim() && status !== 'COMPLETE')}
                className="flex items-center gap-2.5 px-8 py-3 rounded-full font-bold text-sm transition-all duration-300"
                style={{
                  background:
                    status === 'COMPLETE'
                      ? `linear-gradient(135deg, ${C.surface}, ${C.surfaceHigh})`
                      : status === 'INVESTIGATING' || !claim.trim()
                      ? C.surfaceHigh
                      : `linear-gradient(135deg, ${C.primary}, ${C.violet})`,
                  color:
                    status === 'COMPLETE'
                      ? C.textMuted
                      : status === 'INVESTIGATING' || !claim.trim()
                      ? C.textSubtle
                      : '#fff',
                  border: `1px solid ${status === 'COMPLETE' ? C.border : 'transparent'}`,
                  boxShadow:
                    status === 'INVESTIGATING' || !claim.trim() || status === 'COMPLETE'
                      ? 'none'
                      : `0 4px 20px ${C.primaryGlow}`,
                }}
              >
                {status === 'INVESTIGATING' ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    <span>Investigating...</span>
                  </>
                ) : status === 'COMPLETE' ? (
                  <span>New Investigation</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Launch Investigation</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Suggested claims */}
          {status === 'IDLE' && !claim && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3 mt-5 justify-center"
            >
              {[
                'شرب الماء الساخن يعالج السرطان',
                'The pyramids were built by aliens',
                'WiFi signals cause autism in children',
              ].map((example, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setClaim(example)}
                  className="px-5 py-3 rounded-2xl text-sm font-medium transition-all duration-200"
                  style={{
                    background: `${C.surface}DD`,
                    border: `1px solid ${C.border}`,
                    color: C.textMuted,
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  &quot;{example}&quot;
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* ══ ERROR MESSAGE ══ */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-8 p-5 rounded-2xl text-center"
              style={{ background: `${C.danger}15`, border: `1px solid ${C.danger}30`, color: C.danger }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══ VERDICT BANNER ══ */}
        <AnimatePresence>
          {status === 'COMPLETE' && report && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              className="mb-10 p-8 rounded-[28px] text-center"
              style={{
                background: `linear-gradient(160deg, ${C.surfaceHigh}, ${C.surface})`,
                border: `1px solid ${VERDICT_CONFIG[report.overallVerdict]?.color || C.textMuted}40`,
                boxShadow: `0 0 60px ${VERDICT_CONFIG[report.overallVerdict]?.color || C.textMuted}15, 0 8px 40px rgba(0,0,0,0.4)`,
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
                style={{
                  background: `${VERDICT_CONFIG[report.overallVerdict]?.color || C.textMuted}20`,
                  border: `2px solid ${VERDICT_CONFIG[report.overallVerdict]?.color || C.textMuted}50`,
                  color: VERDICT_CONFIG[report.overallVerdict]?.color || C.textMuted,
                }}
              >
                {VERDICT_CONFIG[report.overallVerdict]?.icon}
              </motion.div>
              <h2 className="text-3xl sm:text-4xl font-black mb-2" style={{ color: VERDICT_CONFIG[report.overallVerdict]?.color || C.textMuted }}>
                {VERDICT_CONFIG[report.overallVerdict]?.label || report.overallVerdict}
              </h2>
              <p className="text-xl mb-4" dir="rtl" style={{ ...fArabic, color: `${VERDICT_CONFIG[report.overallVerdict]?.color || C.textMuted}90` }}>
                {VERDICT_CONFIG[report.overallVerdict]?.labelAr}
              </p>
              <p className="text-base max-w-3xl mx-auto leading-relaxed" style={{ color: C.textMuted }}>
                {report.verdictExplanation}
              </p>
              {report.layers_detected.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center mt-6">
                  {report.layers_detected.map((layer, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full text-xs font-bold"
                      style={{
                        background: `${C.primary}15`,
                        border: `1px solid ${C.primary}30`,
                        color: C.primary,
                      }}
                    >
                      {layer}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══ AGENT CARDS GRID ══ */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
        >
          {AGENT_PROFILES.map((agent) => {
            const agentColor = AGENT_COLORS[agent.id] || C.primary;
            const agentStatus = agentStatuses[agent.id] || 'idle';
            const result = getAgentResult(agent.id);
            const isExpanded = expandedAgent === agent.id;

            return (
              <motion.div
                key={agent.id}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 } },
                }}
                layout
                className="relative rounded-[22px] overflow-hidden cursor-pointer group"
                onClick={() => result && setExpandedAgent(isExpanded ? null : agent.id)}
                style={{
                  background: `linear-gradient(160deg, ${C.surfaceHigh}, ${C.surface}ee)`,
                  border: `1px solid ${agentStatus === 'working' ? agentColor : C.border}${agentStatus === 'working' ? '60' : ''}`,
                  boxShadow:
                    agentStatus === 'working'
                      ? `0 0 40px ${agentColor}20, 0 8px 32px rgba(0,0,0,0.5)`
                      : agentStatus === 'done'
                      ? `0 0 30px ${agentColor}10, 0 8px 32px rgba(0,0,0,0.5)`
                      : `0 8px 32px rgba(0,0,0,0.4)`,
                  backdropFilter: 'blur(20px)',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
              >
                {/* Top shimmer */}
                <div
                  className="absolute top-0 left-0 right-0 h-[1px]"
                  style={{ background: `linear-gradient(90deg, transparent 10%, ${agentColor}40, transparent 90%)` }}
                />

                {/* Working animation pulse */}
                {agentStatus === 'working' && (
                  <motion.div
                    animate={{ opacity: [0.05, 0.15, 0.05] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 rounded-[22px]"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${agentColor}30, transparent 70%)` }}
                  />
                )}

                <div className="relative p-6">
                  {/* Avatar & Status */}
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      animate={agentStatus === 'working' ? { scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] } : {}}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="text-4xl"
                    >
                      {agent.avatar}
                    </motion.div>
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={
                          agentStatus === 'working'
                            ? { scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }
                            : {}
                        }
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          background:
                            agentStatus === 'done'
                              ? C.success
                              : agentStatus === 'working'
                              ? agentColor
                              : agentStatus === 'error'
                              ? C.danger
                              : C.textSubtle,
                          boxShadow:
                            agentStatus === 'working'
                              ? `0 0 8px ${agentColor}`
                              : agentStatus === 'done'
                              ? `0 0 6px ${C.success}`
                              : 'none',
                        }}
                      />
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest"
                        style={{
                          color:
                            agentStatus === 'done'
                              ? C.success
                              : agentStatus === 'working'
                              ? agentColor
                              : agentStatus === 'error'
                              ? C.danger
                              : C.textSubtle,
                        }}
                      >
                        {agentStatus === 'working' ? 'Analyzing' : agentStatus === 'done' ? 'Complete' : agentStatus === 'error' ? 'Error' : 'Standby'}
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-bold mb-1" style={{ color: C.textPrimary }}>
                    {agent.name}
                  </h3>
                  <p className="text-sm mb-3" dir="rtl" style={{ ...fArabic, color: `${agentColor}cc` }}>
                    {agent.nameAr}
                  </p>

                  {/* Specialty */}
                  <p className="text-xs leading-relaxed mb-4" style={{ color: C.textMuted }}>
                    {agent.specialty.slice(0, 100)}
                    {agent.specialty.length > 100 ? '...' : ''}
                  </p>

                  {/* Confidence bar */}
                  {result && (
                    <div className="mb-3">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                        <span style={{ color: C.textSubtle }}>Confidence</span>
                        <span style={{ color: agentColor }}>{Math.round(result.confidence * 100)}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: `${C.textSubtle}30` }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence * 100}%` }}
                          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${agentColor}, ${agentColor}AA)` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Expand indicator */}
                  {result && (
                    <div className="flex items-center justify-center pt-2">
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={16} style={{ color: C.textSubtle }} />
                      </motion.div>
                    </div>
                  )}

                  {/* Loading spinner */}
                  {agentStatus === 'working' && (
                    <div className="flex items-center justify-center pt-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      >
                        <Loader2 size={20} style={{ color: agentColor }} />
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* ── Expanded Findings ── */}
                <AnimatePresence>
                  {isExpanded && result && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="px-6 pb-6 pt-2"
                        style={{ borderTop: `1px solid ${C.border}` }}
                      >
                        <div className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: agentColor }}>
                          Findings
                        </div>
                        <div
                          className="text-xs leading-relaxed whitespace-pre-wrap"
                          style={{ color: C.textMuted }}
                        >
                          {result.findings}
                        </div>
                        {result.sources.length > 0 && (
                          <div className="mt-4">
                            <div className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: C.textSubtle }}>
                              Sources / References
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {result.sources.slice(0, 5).map((src, i) => (
                                <span
                                  key={i}
                                  className="px-2.5 py-1 rounded-full text-[10px] font-medium"
                                  style={{
                                    background: `${agentColor}10`,
                                    border: `1px solid ${agentColor}25`,
                                    color: `${agentColor}CC`,
                                  }}
                                >
                                  {src.length > 50 ? src.slice(0, 50) + '...' : src}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ══ AGENT TOOLS SECTION ══ */}
        {status === 'IDLE' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <h3 className="text-center text-sm font-bold uppercase tracking-widest mb-8" style={{ color: C.textSubtle }}>
              Agent Arsenal
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {AGENT_PROFILES.map((agent) => (
                <div
                  key={agent.id}
                  className="p-5 rounded-2xl"
                  style={{
                    background: `${C.surface}CC`,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <div className="text-2xl mb-3">{agent.avatar}</div>
                  <div className="text-xs font-bold mb-3" style={{ color: AGENT_COLORS[agent.id] || C.primary }}>
                    {agent.name}
                  </div>
                  <div className="space-y-1.5">
                    {agent.tools.map((tool, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-[11px]"
                        style={{ color: C.textMuted }}
                      >
                        <div
                          className="w-1 h-1 rounded-full shrink-0"
                          style={{ background: AGENT_COLORS[agent.id] || C.primary }}
                        />
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
