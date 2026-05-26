"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Activity, CheckCircle } from 'lucide-react';

interface QuarantineContextType {
  isQuarantined: boolean;
  triggerQuarantine: (reason?: string) => void;
  releaseQuarantine: () => void;
}

const QuarantineContext = createContext<QuarantineContextType | undefined>(undefined);

export function useQuarantine() {
  const context = useContext(QuarantineContext);
  if (!context) {
    throw new Error('useQuarantine must be used within a QuarantineProvider');
  }
  return context;
}

export function QuarantineProvider({ children }: { children: React.ReactNode }) {
  const [isQuarantined, setIsQuarantined] = useState(false);
  const [reason, setReason] = useState<string>('Critical Toxicity/Shock Score Detected (>95/100)');
  const [breathingStep, setBreathingStep] = useState(0);

  const triggerQuarantine = (customReason?: string) => {
    if (customReason) setReason(customReason);
    setIsQuarantined(true);
    setBreathingStep(0);
  };

  const releaseQuarantine = () => {
    setIsQuarantined(false);
  };

  // Simple 4-7-8 breathing logic for the grounding exercise
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isQuarantined) {
      interval = setInterval(() => {
        setBreathingStep((prev) => (prev + 1) % 3);
      }, 4000); // cycle every 4 seconds for simplicity
    }
    return () => clearInterval(interval);
  }, [isQuarantined]);

  const breathingTexts = [
    "Inhale deeply (4s)...",
    "Hold your breath (7s)...",
    "Exhale slowly (8s)..."
  ];

  return (
    <QuarantineContext.Provider value={{ isQuarantined, triggerQuarantine, releaseQuarantine }}>
      {children}
      
      <AnimatePresence>
        {isQuarantined && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(40px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[99999] bg-black/90 flex flex-col items-center justify-center p-6 text-center overflow-hidden"
          >
            {/* Pulsing red background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />

            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative z-10 max-w-2xl w-full bg-zinc-950 border border-red-900/50 p-10 rounded-3xl shadow-[0_0_100px_rgba(255,0,0,0.2)]"
            >
              <div className="flex justify-center mb-6">
                <ShieldAlert className="w-20 h-20 text-red-500 animate-bounce" />
              </div>
              
              <h1 className="text-4xl font-black text-red-500 uppercase tracking-widest mb-4">
                Epistemic Quarantine
              </h1>
              
              <div className="bg-red-950/40 border border-red-900 text-red-400 px-6 py-3 rounded-lg mb-8 font-mono text-sm uppercase tracking-wider inline-block">
                Reason: {reason}
              </div>

              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-lg mx-auto">
                The content you just interacted with has triggered our cognitive fail-safe. 
                Your nervous system is currently under targeted algorithmic stress. You have been locked out of the interface until you complete a grounding protocol.
              </p>

              <div className="bg-black/50 border border-slate-800 rounded-2xl p-8 mb-10">
                <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center justify-center gap-3">
                  <Activity className="w-5 h-5 text-blue-400" />
                  Mandatory Grounding Exercise
                </h3>
                
                <div className="text-3xl font-light text-blue-400 tracking-widest min-h-[48px] transition-all duration-1000">
                  {breathingTexts[breathingStep]}
                </div>
                
                <div className="w-full bg-slate-900 h-2 mt-8 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-500 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
              </div>

              <button
                onClick={releaseQuarantine}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-100 text-slate-900 font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                <CheckCircle className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                I am grounded. Release Quarantine.
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </QuarantineContext.Provider>
  );
}
