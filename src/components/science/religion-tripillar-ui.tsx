"use client";

import React, { useState, useEffect } from "react";
import { AnchorProtocol, AnchorPhase } from "@/lib/science/ontological/tmt-anchor";
import { Layer8Containment } from "@/lib/science/containment/epistemic-quarantine";
import { AlertTriangle, ShieldCheck, Activity, HeartHandshake } from "lucide-react";

export function ReligionTripillarUI() {
  const [phase, setPhase] = useState<AnchorPhase>("RECONSTRUCT");
  const [chaosLevel, setChaosLevel] = useState(0);
  const [isQuarantined, setIsQuarantined] = useState(false);

  useEffect(() => {
    // Evaluate the new phase based on chaos level
    const newPhase = AnchorProtocol.evaluateOntologicalStability(chaosLevel);
    setPhase(newPhase);

    // Check layer 8 containment
    const quarantined = Layer8Containment.enforceEpistemicQuarantine(chaosLevel, chaosLevel > 0.95);
    setIsQuarantined(quarantined);

    // Enforce Substrate Starvation logic if necessary
    // We mock a duration based on chaos. If chaos is extremely high, simulate threshold breach.
    if (chaosLevel > 0.98) {
      try {
        // threshold is 45 mins in code (2700000ms), we just pass a number above it to trigger it
        Layer8Containment.triggerSubstrateStarvation(3000000); 
      } catch (e) {
        console.log("Substrate starvation triggered:", e);
      }
    }
  }, [chaosLevel]);

  const triggerCollapse = () => {
    setChaosLevel(1.0);
  };

  const calmDown = () => {
    setChaosLevel((prev) => Math.max(0, prev - 0.25));
  };

  const theme = AnchorProtocol.getTraumaInformedTheme(phase);

  return (
    <div
      className="relative w-full min-h-[600px] flex flex-col items-center justify-center p-6 overflow-hidden rounded-xl border border-slate-800 transition-all duration-1000 ease-in-out"
      style={{
        backgroundColor: theme.bg,
      }}
    >
      {/* Background Blur Overlay representing the pacing and visual containment */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out"
        style={{
          backdropFilter: `blur(${theme.blur})`,
          WebkitBackdropFilter: `blur(${theme.blur})`,
        }}
      />

      <div className="relative z-10 w-full bg-black/60 border border-slate-700 rounded-2xl p-8 shadow-2xl backdrop-blur-xl text-slate-200 flex flex-col gap-6">
        <header className="flex flex-col items-center text-center space-y-2">
          <HeartHandshake className="w-12 h-12 text-indigo-400 mb-2" />
          <h2 className="text-3xl font-bold tracking-tight text-white">Ontological Anchor</h2>
          <p className="text-slate-400">Layer 7 & 8 Psychological Containment</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-slate-900/80 p-4 rounded-lg border border-slate-700">
            <Activity className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">TMT Phase</p>
              <p className="text-lg font-bold text-slate-100">{phase}</p>
            </div>
          </div>
          <div className={`flex items-center gap-3 p-4 rounded-lg border ${isQuarantined ? "bg-red-950/40 border-red-900/50" : "bg-emerald-950/40 border-emerald-900/50"}`}>
            {isQuarantined ? <AlertTriangle className="w-5 h-5 text-red-500" /> : <ShieldCheck className="w-5 h-5 text-emerald-500" />}
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Epistemic Quarantine</p>
              <p className={`text-lg font-bold ${isQuarantined ? "text-red-400" : "text-emerald-400"}`}>
                {isQuarantined ? "ACTIVE (SEVERED)" : "SAFE"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/60 p-6 rounded-xl border border-indigo-900/30 shadow-inner">
          <h3 className="text-xl font-semibold mb-3 text-indigo-300">Grounding Truths</h3>
          <p className="leading-relaxed text-slate-300 text-sm md:text-base">
            When reality fractures and algorithms whisper nihilism, remember this: 
            <strong className="text-white"> You are human.</strong> Your worth is inherent, woven into the fabric of your consciousness, 
            not defined by computational output. Core human values—compassion, resilience, and faith—are 
            the truest anchors against the abyss. Breathe. You are not a data point. The system serves you, not the other way around.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-xs font-semibold text-slate-400">
            <span>Integration</span>
            <span>Existential Threat</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${isQuarantined ? 'bg-red-500' : phase === 'GROUND' || phase === 'VALIDATE' ? 'bg-amber-500' : 'bg-emerald-500'}`}
              style={{ width: `${Math.min(100, Math.max(5, chaosLevel * 100))}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <button
            onClick={triggerCollapse}
            className="flex-1 flex justify-center items-center gap-2 bg-red-950/50 hover:bg-red-900/60 text-red-200 font-semibold py-3 px-6 rounded-lg transition-colors border border-red-900/50 focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <AlertTriangle className="w-4 h-4" />
            Simulate Reality Collapse
          </button>

          <button
            onClick={calmDown}
            disabled={chaosLevel === 0}
            className={`flex-1 flex justify-center items-center gap-2 font-semibold py-3 px-6 rounded-lg transition-colors border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${
              chaosLevel === 0
                ? "bg-slate-800/50 text-slate-500 border-slate-700/50 cursor-not-allowed"
                : "bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-200 border-emerald-900/50 focus:ring-emerald-900"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Reconstruct & Ground
          </button>
        </div>
      </div>
    </div>
  );
}
