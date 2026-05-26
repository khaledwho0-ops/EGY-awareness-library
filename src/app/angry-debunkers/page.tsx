"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ShieldAlert, Share2, Link as LinkIcon, Database, CheckCircle2, ScanSearch, Send, Bot, Shield, Fingerprint, Zap } from "lucide-react";

const GOD_SYSTEM_LAYERS = [
  "1. Stripping Emotion...",
  "2. Identifying Claim...",
  "3. Isolating Variables...",
  "4. Cross-Referencing 10 Global Databases...",
  "5. Verifying Context...",
  "6. Detecting Fallacies...",
  "7. Formatting Truth Sandwich..."
];

// MATERIAL DESIGN RIPPLE EFFECT (Google Animation)
function RippleButton({ children, onClick, className, disabled, type = "button" }: any) {
  const [ripples, setRipples] = useState<{ x: number, y: number, id: number }[]>([]);

  const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);
    if (onClick) onClick(e);
  };

  return (
    <motion.button
      type={type as any}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      onClick={addRipple}
      disabled={disabled}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      <AnimatePresence>
        {ripples.map(r => (
          <motion.span
            key={r.id}
            initial={{ top: r.y, left: r.x, width: 0, height: 0, opacity: 0.4 }}
            animate={{ width: 400, height: 400, top: r.y - 200, left: r.x - 200, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute rounded-full bg-white pointer-events-none mix-blend-overlay"
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
}

export default function AngryDebunkersWarRoom() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"IDLE" | "SCANNING" | "SYNTHESIZING" | "COMPLETE">("IDLE");
  const [result, setResult] = useState<any>(null);
  const [currentLayer, setCurrentLayer] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  // Custom Chat Engine State
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (status === "SCANNING" || status === "SYNTHESIZING") {
      setCurrentLayer(0);
      const interval = setInterval(() => {
        setCurrentLayer(prev => (prev < 6 ? prev + 1 : prev));
      }, 500); 
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleStrike = async () => {
    if (!query) return;
    setStatus("SCANNING");
    setResult(null);
    setMessages([]);

    setTimeout(() => {
      if (status !== "COMPLETE") setStatus("SYNTHESIZING");
    }, 2500);

    try {
      const res = await fetch("/api/defense/angry-debunkers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      
      setTimeout(() => {
        setResult(data);
        setStatus("COMPLETE");
      }, 1000);
    } catch (e) {
      console.error(e);
      setStatus("IDLE");
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input || isChatLoading) return;
    
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsChatLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          data: { factCheckContext: result?.data || null }
        })
      });

      if (!res.body) throw new Error("No stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantMsg = "";
      
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        assistantMsg += text;
        setMessages(prev => {
          const newM = [...prev];
          newM[newM.length - 1].content = assistantMsg;
          return newM;
        });
      }
    } catch (err) {
      console.error("Chat streaming error:", err);
    } finally {
      setIsChatLoading(false);
    }
  };

  const copyShareLink = () => {
    if (!result) return;
    const url = new URL(window.location.href);
    url.searchParams.set("q", btoa(encodeURIComponent(query)));
    navigator.clipboard.writeText(url.toString());
    alert("Viral Counter-Attack Link Copied!");
  };

  const ringVariants = {
    hidden: { strokeDasharray: "0, 100" },
    visible: (score: number) => ({
      strokeDasharray: `${score}, 100`,
      transition: { duration: 2, ease: "easeOut" }
    })
  };

  // Immersive Reveal Physics (Google Material M3 + iOS Elasticity)
  const containerReveal = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const cardReveal = {
    hidden: { opacity: 0, scale: 0.85, y: 40, rotateX: -10, filter: "blur(12px)" },
    show: { 
      opacity: 1, scale: 1, y: 0, rotateX: 0, filter: "blur(0px)",
      transition: { type: "spring", stiffness: 120, damping: 20, mass: 1 }
    }
  };

  // Explicit font overrides
  const fontBase = { fontFamily: "'Inter', system-ui, -apple-system, sans-serif" };
  const fontHeader = { fontFamily: "'Clash Display', 'Inter', sans-serif" };
  const fontArabic = { fontFamily: "'IBM Plex Sans Arabic', 'Cairo', 'Noto Kufi Arabic', sans-serif" };

  return (
    <div 
      className="min-h-screen w-full text-white selection:bg-[#0A84FF]/30 overflow-x-hidden relative flex flex-col items-center justify-start"
      style={{ 
        ...fontBase,
        backgroundColor: "#000000", // Apple Deep Black
        backgroundImage: "radial-gradient(circle at top, rgba(10,132,255,0.05) 0%, transparent 40%), radial-gradient(circle at bottom right, rgba(255,45,85,0.03) 0%, transparent 40%)",
        paddingTop: '8vh', 
        paddingBottom: '120px' 
      }}
    >
      {/* Cinematic Auroral Bleeds */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen">
        <motion.div animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[800px] bg-[#0A84FF]/10 blur-[180px] rounded-full" />
      </div>

      <div className="w-full max-w-[1100px] px-6 lg:px-8 flex flex-col gap-12 relative z-10 items-center justify-center text-center">
        
        {/* HERO SECTION */}
        <motion.header 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 bg-white/[0.05] border border-white/10 backdrop-blur-md shadow-sm">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <ShieldAlert size={16} className="text-[#0A84FF]" />
            </motion.div>
            <span className="text-white text-[13px] sm:text-sm font-semibold tracking-[0.05em]">Global Threat Defense Network</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white mb-6 drop-shadow-xl" 
              style={{ ...fontHeader, letterSpacing: "-0.04em" }}>
            The Angry Debunkers
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/80 drop-shadow-md" dir="rtl"
              style={{ ...fontArabic }}>
            العلم يقاتل <span className="opacity-30 mx-4 font-light">|</span> <span className="text-white/60" style={fontHeader}>Science Fights Back</span>
          </h2>
        </motion.header>

        {/* APPLE / MATERIAL STYLE INPUT CONSOLE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: status === "IDLE" ? 1 : 0.98, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative group z-20"
        >
          <div 
            className="relative w-full overflow-hidden transition-all duration-500"
            style={{ 
              borderRadius: '32px', // Apple hardware curve
              background: isFocused ? "rgba(28, 28, 30, 0.8)" : "rgba(28, 28, 30, 0.5)", // Apple Dark Mode Surface
              border: isFocused ? "1px solid rgba(10, 132, 255, 0.6)" : "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(60px)",
              WebkitBackdropFilter: "blur(60px)",
              boxShadow: isFocused 
                ? "0 12px 40px rgba(0,0,0,0.4), 0 0 0 4px rgba(10,132,255,0.15)" // Material M3 elevation + Apple Focus Ring
                : "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.05)", // Soft resting elevation
            }}
          >
            <div className="relative flex flex-col justify-center min-h-[200px] p-8 sm:p-12">
              <motion.div 
                animate={{ y: isFocused || query ? -20 : 0, scale: isFocused || query ? 0.9 : 1, opacity: isFocused || query ? 0 : 1 }}
                className="absolute inset-0 flex items-center px-12 text-[#8E8E93] pointer-events-none font-medium text-xl sm:text-2xl"
                style={{ ...fontBase, letterSpacing: "-0.01em" }}
              >
                Paste the rumor, medical myth, or religious fabrication here...
              </motion.div>

              <textarea
                className="w-full bg-transparent resize-none text-[#FFFFFF] text-2xl sm:text-4xl focus:outline-none text-left font-semibold leading-normal relative z-10 custom-scrollbar mt-4"
                rows={3}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                dir="auto"
                style={{ 
                  fontFamily: query.match(/[\u0600-\u06FF]/) ? "'IBM Plex Sans Arabic', 'Cairo', sans-serif" : "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                  paddingTop: query ? "10px" : "0px",
                  textShadow: query ? "0 0 8px #ffffff, 0 0 15px #0A84FF, 0 0 25px #0A84FF, 0 0 40px #0A84FF" : "none",
                }}
              />
            </div>

            {/* Apple Style Footer Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center p-6 sm:p-8 bg-[#1C1C1E]/80 border-t border-white/[0.05] gap-6 backdrop-blur-xl">
              <div className="text-[13px] sm:text-sm text-[#8E8E93] flex items-center gap-4 font-semibold tracking-wide">
                <div className="w-2.5 h-2.5 rounded-full bg-[#34C759] shadow-[0_0_8px_rgba(52,199,89,0.5)]" />
                Live Networks: <span className="text-white/90">OpenAlex, EuropePMC, AlQuran</span>
              </div>
              
              {status === "COMPLETE" ? (
                <RippleButton
                  onClick={() => {
                    setStatus("IDLE");
                    setQuery("");
                    setResult(null);
                    setMessages([]);
                  }}
                  className="bg-[#3A3A3C] hover:bg-[#48484A] text-white font-semibold py-4 px-10 rounded-full flex items-center justify-center gap-3 shadow-md text-sm sm:text-base w-full sm:w-auto"
                >
                  Clear Console
                </RippleButton>
              ) : (
                <RippleButton
                  onClick={handleStrike}
                  disabled={status !== "IDLE" || !query}
                  className="bg-[#0A84FF] text-white disabled:bg-[#1C1C1E] disabled:text-[#636366] font-semibold py-4 px-12 rounded-full flex items-center justify-center gap-3 shadow-[0_4px_14px_rgba(10,132,255,0.4)] disabled:shadow-none hover:shadow-[0_6px_20px_rgba(10,132,255,0.6)] text-base tracking-wide w-full sm:w-auto border border-transparent disabled:border-white/5"
                >
                  {status === "IDLE" ? (
                    <><span className="relative z-10 font-bold">Launch Strike</span> <Zap size={20} className="relative z-10 fill-white" /></>
                  ) : (
                    <><Loader2 className="animate-spin w-5 h-5 relative z-10" /> <span className="relative z-10 font-bold">Executing...</span></>
                  )}
                </RippleButton>
              )}
            </div>
          </div>
        </motion.div>

        {/* SUGGESTED PROMPTS */}
        {status === "IDLE" && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} 
                      className="w-full flex overflow-x-auto sm:flex-wrap sm:justify-center gap-4 sm:gap-5 pb-6 sm:pb-0 hide-scrollbar snap-x snap-mandatory px-4 sm:px-0">
            {["Vaccines contain microchips to track citizens.", "A new Hadith claims the world ends next Friday.", "Drinking boiled garlic cures all viruses."].map((example, i) => (
              <RippleButton key={i} onClick={() => setQuery(example)} 
                      className="group flex items-center gap-4 bg-[#1C1C1E]/80 hover:bg-[#2C2C2E] border border-white/5 hover:border-[#0A84FF]/50 text-[#8E8E93] hover:text-white text-sm sm:text-base px-6 py-4 rounded-full transition-all duration-300 flex-shrink-0 snap-center backdrop-blur-md shadow-md">
                <span className="font-medium" style={fontBase}>"{example}"</span>
                <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#0A84FF]">→</span>
              </RippleButton>
            ))}
          </motion.div>
        )}

        {/* LOADING MATRIX */}
        <AnimatePresence mode="wait">
          {(status === "SCANNING" || status === "SYNTHESIZING") && (
            <motion.div 
              key="loading-matrix"
              initial={{ opacity: 0, height: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
              exit={{ opacity: 0, height: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full backdrop-blur-3xl bg-[#1C1C1E]/80 border border-white/10 p-10 sm:p-20 rounded-[32px] shadow-2xl flex flex-col items-center justify-center gap-12 relative overflow-hidden"
            >
              <div className="relative z-10 flex flex-col items-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 sm:w-48 sm:h-48 border-4 border-dashed border-[#0A84FF]/50 rounded-full"
                />
                <ScanSearch className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#0A84FF] w-12 h-12 sm:w-16 sm:h-16" />
              </div>

              <div className="w-full max-w-lg space-y-5 bg-[#2C2C2E]/60 p-8 sm:p-10 rounded-[24px] border border-white/5 z-10 shadow-xl backdrop-blur-md">
                <div className="text-sm text-[#0A84FF] font-semibold text-center tracking-wide mb-6">Establishing Uplink...</div>
                {GOD_SYSTEM_LAYERS.map((layer, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: idx <= currentLayer ? 1 : 0.2, 
                      x: idx <= currentLayer ? 0 : -10,
                      color: idx === currentLayer ? "#0A84FF" : (idx < currentLayer ? "#8E8E93" : "#636366") 
                    }}
                    transition={{ duration: 0.4 }}
                    className={`text-sm tracking-wide flex items-center gap-4 ${idx === currentLayer ? 'animate-pulse font-bold' : 'font-medium'}`}
                  >
                    {idx === currentLayer && <ScanSearch size={18} className="text-[#0A84FF]" />}
                    {idx < currentLayer && <CheckCircle2 size={18} className="text-[#34C759]" />}
                    {idx > currentLayer && <div className="w-4 h-4" />}
                    {layer}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* IMMERSIVE REVEAL WAR ROOM */}
          {status === "COMPLETE" && result && result.type === "SYNTHESIS_COMPLETE" && (
            <motion.div 
              key="results"
              variants={containerReveal}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full z-10"
              style={{ perspective: "1500px" }}
            >
              
              {/* ANALYTICS COL (Left, spans 4 cols) */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                
                {/* Confidence Ring - Material M3 Card */}
                <motion.div 
                  variants={cardReveal}
                  className="backdrop-blur-3xl bg-[#1C1C1E]/80 border border-white/10 p-10 rounded-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center text-center relative overflow-hidden"
                >
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
                      <motion.path 
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                        fill="none" 
                        stroke="#0A84FF" 
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        variants={ringVariants as any}
                        custom={Math.round((Number(result?.data?.confidence_score) || 0) * 100)}
                        initial="hidden"
                        animate="visible"
                        style={{ filter: "drop-shadow(0 0 10px rgba(10,132,255,0.5))" }}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-5xl font-bold text-white tracking-tight" style={fontBase}>
                        {Math.round((Number(result?.data?.confidence_score) || 0) * 100)}<span className="text-2xl text-[#8E8E93] ml-1">%</span>
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-6 text-[#8E8E93] font-semibold text-sm" style={fontBase}>Verification Confidence</h3>
                </motion.div>

                {/* Threat Dashboards */}
                <motion.div 
                  variants={cardReveal}
                  className="bg-[#1C1C1E]/80 border border-white/10 p-6 sm:p-8 rounded-[28px] shadow-lg relative overflow-hidden flex items-start gap-5"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF3B30]" />
                  <Shield className="text-[#FF3B30] shrink-0 mt-1" size={28} />
                  <div className="text-left">
                    <h3 className="text-[#FF3B30] text-xs font-bold uppercase tracking-wider mb-2">Science Violation</h3>
                    <p className="text-white text-sm sm:text-base font-medium leading-relaxed">{result.data.negative_science_violation || result.data.logical_fallacy_detected}</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={cardReveal}
                  className="bg-[#1C1C1E]/80 border border-white/10 p-6 sm:p-8 rounded-[28px] shadow-lg relative overflow-hidden flex items-start gap-5"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#30D158]" />
                  <Fingerprint className="text-[#30D158] shrink-0 mt-1" size={28} />
                  <div className="text-left">
                    <h3 className="text-[#30D158] text-xs font-bold uppercase tracking-wider mb-2">Vector Hit</h3>
                    <p className="text-white text-sm sm:text-base font-medium leading-relaxed">{result.data.egyptian_vector_hit || result.data.egyptian_contextual_mapping}</p>
                  </div>
                </motion.div>
                
                <motion.div variants={cardReveal}>
                  <RippleButton 
                    onClick={copyShareLink} 
                    className="w-full bg-[#2C2C2E] hover:bg-[#3A3A3C] text-white font-semibold py-5 px-6 rounded-[20px] flex items-center justify-center gap-3 transition-colors shadow-md text-sm mt-2"
                  >
                    <Share2 size={20} />
                    <span>Copy Viral Defense Link</span>
                  </RippleButton>
                </motion.div>
              </div>

              {/* OUTPUT COL (Right, spans 8 cols) */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                
                {/* TRUTH SANDWICH - MATERIAL ELEVATED CONTAINER */}
                <motion.div 
                  variants={cardReveal}
                  className="backdrop-blur-3xl bg-[#1C1C1E]/90 border border-white/10 p-8 sm:p-12 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-16 opacity-[0.02] pointer-events-none mix-blend-screen">
                    <CheckCircle2 size={350} />
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-bold mb-10 text-white flex items-center gap-4" style={fontBase}>
                    <div className="p-3 bg-[#0A84FF]/10 rounded-2xl border border-[#0A84FF]/20 text-[#0A84FF]">
                      <CheckCircle2 size={28} />
                    </div>
                    Truth Sandwich Protocol
                  </h2>
                  
                  <div className="space-y-5 relative z-10" dir="rtl">
                    <div className="bg-[#2C2C2E]/60 border border-white/5 p-6 sm:p-8 rounded-[24px] shadow-sm backdrop-blur-md">
                      <span className="text-xs text-[#30D158] uppercase font-bold block mb-4 tracking-wider" style={fontArabic}>الحقيقة (الأساس)</span>
                      <p className="text-white text-lg sm:text-xl font-semibold leading-relaxed" style={fontArabic}>{result.data.truth_sandwich.fact_1}</p>
                    </div>
                    
                    <div className="bg-[#FF3B30]/10 border border-[#FF3B30]/20 p-6 sm:p-8 rounded-[24px] shadow-sm backdrop-blur-md">
                      <span className="text-xs text-[#FF3B30] uppercase font-bold block mb-4 tracking-wider" style={fontArabic}>الخرافة (التحذير)</span>
                      <p className="text-white/60 line-through decoration-[#FF3B30] decoration-[2px] text-lg sm:text-xl font-medium leading-relaxed" style={fontArabic}>{result.data.truth_sandwich.myth}</p>
                    </div>
                    
                    <div className="bg-[#2C2C2E]/60 border border-white/5 p-6 sm:p-8 rounded-[24px] shadow-sm backdrop-blur-md">
                      <span className="text-xs text-[#30D158] uppercase font-bold block mb-4 tracking-wider" style={fontArabic}>الحقيقة (التأكيد)</span>
                      <p className="text-white text-lg sm:text-xl font-semibold leading-relaxed" style={fontArabic}>{result.data.truth_sandwich.fact_2}</p>
                    </div>
                  </div>
                </motion.div>

                {/* CHAT TERMINAL - APPLE MESSAGES STYLE */}
                <motion.div
                  variants={cardReveal}
                  className="w-full bg-[#1C1C1E]/90 border border-white/10 rounded-[32px] overflow-hidden flex flex-col h-[600px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative"
                >
                  <div className="bg-[#2C2C2E]/80 p-5 sm:p-6 border-b border-white/5 flex items-center justify-between z-20 backdrop-blur-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#0A84FF] rounded-full flex items-center justify-center shadow-md">
                        <Bot className="text-white" size={20} />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-base" style={fontBase}>AI Interrogation</h3>
                        <p className="text-[#8E8E93] text-xs font-medium mt-0.5">Debate the evidence directly.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 flex flex-col custom-scrollbar relative z-10 bg-[#000000]/20">
                    {messages.length === 0 && (
                      <div className="text-center text-[#8E8E93] text-sm mt-8 font-medium">
                        System Online. Awaiting input.
                      </div>
                    )}
                    {messages.map((m, idx) => (
                      <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-[24px] px-6 py-4 shadow-sm ${
                          m.role === 'user' 
                            ? 'bg-[#0A84FF] text-white rounded-br-md' 
                            : 'bg-[#2C2C2E] text-white rounded-bl-md'
                        }`} dir={m.role === 'user' ? 'auto' : 'rtl'}>
                          <p className={`whitespace-pre-wrap ${m.role === 'user' ? 'font-medium text-base' : 'text-base leading-relaxed font-medium'}`}
                             style={m.role === 'assistant' ? fontArabic : fontBase}>
                            {m.content.replace(/\[SYSTEM:.*?\]/g, '').trim()}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isChatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-[#2C2C2E] rounded-[24px] rounded-bl-md px-6 py-4 flex items-center gap-3">
                          <Loader2 className="w-5 h-5 text-[#8E8E93] animate-spin" />
                          <span className="text-[#8E8E93] font-medium text-sm">Typing...</span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-5 sm:p-6 bg-[#1C1C1E] border-t border-white/5 z-20">
                    <form onSubmit={handleChatSubmit} className="flex gap-3 relative">
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="iMessage..."
                        className="flex-1 bg-[#2C2C2E] border border-transparent focus:border-[#0A84FF]/50 rounded-full pl-6 pr-14 py-3.5 text-white text-base font-medium focus:outline-none transition-all shadow-inner"
                        dir="auto"
                        style={fontBase}
                      />
                      <RippleButton
                        type="submit"
                        disabled={isChatLoading || !input}
                        className="absolute right-2 top-2 bottom-2 bg-[#0A84FF] hover:bg-[#007AFF] text-white w-10 rounded-full flex items-center justify-center disabled:opacity-50 transition-colors shadow-sm"
                      >
                        <Send size={18} className="fill-white mr-0.5" />
                      </RippleButton>
                    </form>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
