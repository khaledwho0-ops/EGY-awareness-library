"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Loader2, Play, Globe2, ScanEye, Terminal, ChevronRight, CheckCircle2, ShieldAlert, Link as LinkIcon, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { useRTL } from "@/components/shared/rtl-provider";

interface OsintStep {
  type: "planner" | "scraping" | "scraped" | "synthesizer" | "error";
  data: any;
}

interface Source {
  id: number;
  url: string;
}

export function OsintTerminal() {
  const { isRTL } = useRTL();
  const [query, setQuery] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState<OsintStep[]>([]);
  const [report, setReport] = useState("");
  const [sources, setSources] = useState<Source[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [steps, report, isRunning]);

  const handleInvestigate = async () => {
    if (!query.trim()) return;

    setIsRunning(true);
    setSteps([]);
    setReport("");
    setSources([]);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/defense/osint-investigator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter(Boolean);
          
          for (const line of lines) {
            try {
              const payload = JSON.parse(line);
              if (payload.step === "error") {
                 setErrorMsg(payload.data);
                 setIsRunning(false);
                 return;
              }
              if (payload.step === "synthesizer") {
                setReport(payload.data.report);
                setSources(payload.data.sources || []);
              } else {
                setSteps((prev) => [...prev, { type: payload.step, data: payload.data }]);
              }
            } catch (e) {
              console.warn("Failed to parse OSINT stream chunk", line);
            }
          }
        }
      }
    } catch (error) {
      console.error("OSINT Execution Failed:", error);
      setErrorMsg("Failed to establish secure connection to OSINT Swarm.");
    } finally {
      setIsRunning(false);
    }
  };

  const getActiveStep = () => {
    if (report) return 3; // Done
    if (steps.some((s) => s.type === "scraping" || s.type === "scraped")) return 1;
    if (steps.length > 0) return 0;
    return 0;
  };

  const activeStep = getActiveStep();

  const progressLabels = [
    { en: "Analyzing the claim...", ar: "تحليل الادعاء..." },
    { en: "Scanning live web sources...", ar: "فحص مصادر الويب الحية..." },
    { en: "Synthesizing verified truth...", ar: "صياغة الحقيقة المؤكدة..." }
  ];

  // Map [1], [2] citations in the markdown into standard links
  const processedReport = report.replace(/\[(\d+)\]/g, (match, id) => {
    const source = sources.find(s => s.id === parseInt(id, 10));
    if (source) {
      return `[${match}](${source.url})`;
    }
    return match;
  });

  return (
    <motion.div 
      layout
      dir={isRTL ? "rtl" : "ltr"}
      className="flex w-full max-w-4xl flex-col gap-6 rounded-2xl border border-white/10 bg-black/60 p-6 sm:p-8 shadow-[0_0_40px_rgba(16,185,129,0.1)] backdrop-blur-2xl transition-all"
    >
      {/* Header section */}
      <motion.div layout className="flex items-center gap-4 border-b border-white/10 pb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner">
          <Terminal size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {isRTL ? "محقق الاستخبارات الحية (OSINT)" : "Autonomous OSINT Investigator"}
          </h2>
          <p className="text-sm font-medium text-slate-400 tracking-wide mt-1">
            {isRTL ? "عميل مستقل يفحص مصادر الويب الحية لاستخراج الحقائق الموثقة." : "Live Swarm extraction agent. Verified truth synthesis."}
          </p>
        </div>
      </motion.div>

      {/* Input section */}
      <motion.div layout className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/50" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isRTL ? "أدخل التهديد أو الادعاء للتحقيق..." : "Enter a threat, claim, or entity to investigate..."}
            className="w-full rounded-xl border border-white/10 bg-slate-950/80 py-4 pl-12 pr-4 text-[15px] font-medium text-white outline-none transition-colors focus:border-emerald-500/50 focus:bg-black focus:ring-1 focus:ring-emerald-500/50 placeholder:text-slate-500"
            onKeyDown={(e) => e.key === "Enter" && handleInvestigate()}
            disabled={isRunning}
          />
        </div>
        <button
          onClick={handleInvestigate}
          disabled={isRunning || !query.trim()}
          className="group relative overflow-hidden flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 font-bold tracking-wide text-white transition-all hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600 sm:w-auto"
        >
          {isRunning ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} className="transition-transform group-hover:scale-110" />}
          {isRTL ? "تحقيق" : "INITIATE"}
        </button>
      </motion.div>

      {/* Main content section */}
      <AnimatePresence mode="wait">
        {errorMsg && (
          <motion.div 
            key="error"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="rounded-xl bg-red-950/50 border border-red-500/30 p-5 text-sm font-medium text-red-400 backdrop-blur-sm flex items-start gap-3"
          >
            <AlertCircle className="mt-0.5 shrink-0" size={18} />
            <p>{errorMsg}</p>
          </motion.div>
        )}

        {(isRunning || report) && !errorMsg && (
          <motion.div 
            layout
            key="content"
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col gap-6 overflow-hidden pt-2"
          >
            {/* Stepper Phase (Only show if not finished, or while running) */}
            {(!report || isRunning) && (
              <motion.div layout className="flex flex-col gap-5 rounded-2xl bg-slate-950/80 p-6 sm:p-8 border border-white/5">
                <AnimatePresence>
                  {progressLabels.map((label, idx) => {
                    const isActive = idx === activeStep;
                    const isPast = idx < activeStep || report;
                    
                    if (!isActive && !isPast && !isRunning) return null;

                    return (
                      <motion.div 
                        key={idx} 
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        className={`flex items-center gap-5 transition-opacity duration-300 ${!isActive && !isPast ? "opacity-30 grayscale" : "opacity-100"}`}
                      >
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-500 ${
                          isPast ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400' : 
                          isActive ? 'border-cyan-400 bg-cyan-400/20 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 
                          'border-white/10 bg-transparent text-slate-600'
                        }`}>
                          {isPast ? <CheckCircle2 size={18} /> : 
                           isActive ? <Loader2 size={18} className="animate-spin" /> : 
                           <span className="text-sm font-bold">{idx + 1}</span>}
                        </div>
                        <span className={`text-[15px] font-semibold tracking-wide ${
                          isPast ? 'text-emerald-400' : 
                          isActive ? 'text-cyan-400' : 
                          'text-slate-500'
                        }`}>
                          {isRTL ? label.ar : label.en}
                        </span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Results Phase */}
            {report && (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col rounded-2xl border border-emerald-500/20 bg-slate-950/90 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
              >
                <div className="border-b border-white/10 bg-gradient-to-r from-emerald-950/50 to-slate-900 px-6 sm:px-8 py-5 flex items-center justify-between">
                  <h3 className="text-lg font-black tracking-wide text-white flex items-center gap-3">
                    <ScanEye className="text-emerald-400" size={20} />
                    {isRTL ? "ملف الاستخبارات النهائي" : "VERIFIED INTELLIGENCE DOSSIER"}
                  </h3>
                </div>
                
                {/* Scrollable container with custom sleek scrollbar */}
                <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
                  <div className="prose prose-invert prose-lg max-w-none prose-p:leading-relaxed prose-p:tracking-tight prose-headings:text-emerald-50 prose-a:text-cyan-400">
                    <ReactMarkdown
                      components={{
                        a: ({ href, children }) => {
                          const childText = children?.toString() || "";
                          const isCitation = /^\[\d+\]$/.test(childText);
                          
                          if (isCitation) {
                            return (
                              <a 
                                href={href} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center justify-center w-6 h-6 mx-1 text-[11px] font-black text-emerald-300 bg-emerald-950/50 border border-emerald-500/30 rounded-full hover:bg-emerald-900/80 transition-colors cursor-pointer no-underline translate-y-[-2px]"
                                title={href}
                              >
                                {childText.replace(/[\[\]]/g, "")}
                              </a>
                            );
                          }
                          return (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline decoration-cyan-500/30 underline-offset-4 hover:text-cyan-300 transition-colors">
                              {children}
                            </a>
                          );
                        }
                      }}
                    >
                      {processedReport}
                    </ReactMarkdown>
                  </div>
                </div>

                {sources.length > 0 && (
                  <div className="border-t border-white/5 bg-slate-950 p-6 sm:p-8">
                    <h4 className="mb-4 text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                      <LinkIcon size={14} />
                      {isRTL ? "المصادر المرجعية" : "REFERENCED SOURCES"}
                    </h4>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {sources.map((s) => (
                        <li key={s.id} className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:border-emerald-500/30 hover:bg-emerald-500/5">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-[11px] font-black text-emerald-500 shadow-inner group-hover:text-emerald-400 group-hover:bg-emerald-950">
                            {s.id}
                          </span>
                          <a href={s.url} target="_blank" rel="noopener noreferrer" className="truncate text-sm font-medium text-slate-400 group-hover:text-cyan-400 transition-colors">
                            {s.url}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={bottomRef} />
    </motion.div>
  );
}
