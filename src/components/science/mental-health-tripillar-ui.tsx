'use client';

import React, { useState, useEffect } from 'react';
import { CognitiveFirewall, BiometricState } from '@/lib/science/cogsec/strategic-friction';
import { Brain, Activity, ShieldAlert, HeartPulse, Smartphone, MousePointer2 } from 'lucide-react';

export default function MentalHealthTripillarUI() {
  const [biometrics, setBiometrics] = useState<BiometricState>({
    heartRateVariability: 60,
    screenTimeMinutes: 30,
    scrollVelocity: 500,
  });

  const [cognitiveLoad, setCognitiveLoad] = useState(0);
  const [frictionDelay, setFrictionDelay] = useState(0);
  const [isBreakerActive, setIsBreakerActive] = useState(false);
  const [contentOpacity, setContentOpacity] = useState(1);

  useEffect(() => {
    const load = CognitiveFirewall.assessCognitiveLoad(biometrics);
    const delay = CognitiveFirewall.calculateFrictionDelay(load);
    setCognitiveLoad(load);
    
    if (delay > 0) {
      setFrictionDelay(delay);
      setIsBreakerActive(true);
      setContentOpacity(0.3); // Simulate physical slowdown / fading
    } else {
      setIsBreakerActive(false);
      setContentOpacity(1);
    }
  }, [biometrics]);

  const acknowledgeLoop = () => {
    // Reset biometrics to healthy levels after acknowledgment
    setBiometrics({
      heartRateVariability: 60,
      screenTimeMinutes: 30,
      scrollVelocity: 500,
    });
  };

  return (
    <div className="relative p-6 w-full font-sans bg-slate-900 text-slate-100 min-h-[600px] rounded-xl overflow-hidden shadow-2xl border border-slate-700">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 border-b border-slate-700 pb-4">
        <Brain className="w-8 h-8 text-indigo-400" />
        <h2 className="text-2xl font-bold tracking-tight">Cognitive Security Monitor</h2>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ opacity: contentOpacity, transition: 'opacity 1s ease-in-out' }}>
        
        {/* Simulator Panel */}
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-inner">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Activity className="text-emerald-400" />
            Biometric Telemetry
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="flex justify-between text-sm text-slate-400 mb-2">
                <span className="flex items-center gap-1"><HeartPulse size={16} /> Heart Rate Variability (HRV)</span>
                <span>{biometrics.heartRateVariability} ms</span>
              </label>
              <input 
                type="range" 
                min="20" max="100" 
                value={biometrics.heartRateVariability}
                onChange={(e) => setBiometrics({...biometrics, heartRateVariability: Number(e.target.value)})}
                className="w-full accent-emerald-500"
              />
              <p className="text-xs text-slate-500 mt-1">Lower HRV = Higher Stress</p>
            </div>

            <div>
              <label className="flex justify-between text-sm text-slate-400 mb-2">
                <span className="flex items-center gap-1"><MousePointer2 size={16} /> Scroll Velocity</span>
                <span>{biometrics.scrollVelocity} px/s</span>
              </label>
              <input 
                type="range" 
                min="100" max="2500" step="100"
                value={biometrics.scrollVelocity}
                onChange={(e) => setBiometrics({...biometrics, scrollVelocity: Number(e.target.value)})}
                className="w-full accent-blue-500"
              />
            </div>

            <div>
              <label className="flex justify-between text-sm text-slate-400 mb-2">
                <span className="flex items-center gap-1"><Smartphone size={16} /> Screen Time</span>
                <span>{biometrics.screenTimeMinutes} mins</span>
              </label>
              <input 
                type="range" 
                min="0" max="180" step="15"
                value={biometrics.screenTimeMinutes}
                onChange={(e) => setBiometrics({...biometrics, screenTimeMinutes: Number(e.target.value)})}
                className="w-full accent-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Philosophy & Metrics */}
        <div className="flex flex-col gap-6">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold mb-2">Cognitive Load: <span className={cognitiveLoad > 50 ? 'text-rose-400' : 'text-emerald-400'}>{cognitiveLoad} / 100</span></h3>
            <div className="w-full bg-slate-700 rounded-full h-2.5 mt-2">
              <div 
                className={`h-2.5 rounded-full transition-all duration-500 ${cognitiveLoad > 75 ? 'bg-rose-500' : cognitiveLoad > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                style={{ width: `${Math.min(cognitiveLoad, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-indigo-900/30 p-6 rounded-lg border border-indigo-500/30">
            <h3 className="text-xl font-bold text-indigo-300 mb-3">Cognitive Sovereignty</h3>
            <p className="text-indigo-100/80 text-sm leading-relaxed mb-4">
              Your attention is the most valuable resource in the digital economy. Algorithms are weaponized to hijack dopamine loops. 
              By deploying Strategic Algorithmic Friction, we return un-computability to the human mind, breaking the stimulus-response cycle and protecting your sovereignty.
            </p>
          </div>
        </div>

      </div>

      {/* Circuit Breaker Overlay */}
      {isBreakerActive && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center z-50 p-8 text-center transition-all duration-1000">
          <ShieldAlert className="w-20 h-20 text-rose-500 mb-6 animate-pulse" />
          <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Circuit Breaker Triggered</h2>
          <p className="text-xl text-rose-200 mb-8 max-w-lg">
            High cognitive load detected. You are entering a doomscrolling loop.
            UI rendering is artificially delayed by {frictionDelay}ms to break operant conditioning.
          </p>
          
          <button 
            onClick={acknowledgeLoop}
            className="px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-bold text-lg shadow-[0_0_20px_rgba(225,29,72,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            I Acknowledge My Loop (Regain Control)
          </button>
        </div>
      )}
    </div>
  );
}
