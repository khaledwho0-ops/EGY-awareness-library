"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Brain, Activity, X, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';

export type ScannerType = 'deepreal' | 'mental-health' | 'religion-hub';

interface DefenseScannerOverlayProps {
  scannerType: ScannerType;
  contentToScan: string; // text, or URL for deepreal
  buttonText?: string;
}

export function DefenseScannerOverlay({ scannerType, contentToScan, buttonText }: DefenseScannerOverlayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const getScannerConfig = () => {
    switch (scannerType) {
      case 'deepreal':
        return {
          icon: <Activity className="w-4 h-4" />,
          title: 'DeepReal: ZKP Sybil Scan',
          color: 'text-green-400',
          bg: 'bg-green-500',
          apiRoute: '/api/defense/deepreal/analyze',
          payload: { imageUrl: contentToScan }, // assuming it's a URL for this demo
        };
      case 'mental-health':
        return {
          icon: <Brain className="w-4 h-4" />,
          title: 'Mental Health: Cognitive Load Scan',
          color: 'text-blue-400',
          bg: 'bg-blue-500',
          apiRoute: '/api/defense/mental-health/analyze',
          payload: { text: contentToScan },
        };
      case 'religion-hub':
        return {
          icon: <Shield className="w-4 h-4" />,
          title: 'Religion Hub: Ontological Anchor',
          color: 'text-purple-400',
          bg: 'bg-purple-500',
          apiRoute: '/api/defense/religion-hub/analyze',
          payload: { threatText: contentToScan },
        };
    }
  };

  const config = getScannerConfig();

  const handleScan = async () => {
    setIsOpen(true);
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(config.apiRoute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config.payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Analysis failed');

      setResult(data.analysis);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleScan}
        className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full border border-slate-700 bg-slate-900/50 hover:bg-slate-800 transition-colors shadow-sm ${config.color}`}
      >
        {config.icon}
        {buttonText || `Verify with ${scannerType}`}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop to close when clicking outside (mobile fallback) */}
            <div 
              className="fixed inset-0 z-40 sm:hidden" 
              onClick={() => setIsOpen(false)} 
            />

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 mt-2 right-0 w-[340px] p-5 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl bg-[#0f111a]/95 border border-slate-700 font-sans"
            >
              <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
                <div className={`flex items-center gap-2 font-bold ${config.color}`}>
                  {config.icon}
                  <span className="text-sm">{config.title}</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {isLoading && (
                <div className="flex flex-col items-center justify-center py-6 text-slate-400 gap-3">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <p className="text-xs font-medium animate-pulse">Running live forensic analysis...</p>
                </div>
              )}

              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-950/40 border border-red-900 rounded-lg text-red-400 text-xs leading-relaxed">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p><strong>Error:</strong> {error}</p>
                </div>
              )}

              {result && !isLoading && !error && (
                <div className="space-y-3">
                  <div className="flex items-start gap-2 p-3 bg-emerald-950/30 border border-emerald-900/50 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-300 leading-relaxed font-mono">
                      {scannerType === 'deepreal' && result.type?.synthetic ? "Synthetic Origin Detected." : "Analysis Complete."}
                      {scannerType === 'mental-health' && ` Load Score: ${result.cognitiveLoadScore}/100`}
                      {scannerType === 'religion-hub' && ` Shock Level: ${result.shockLevelDetected}/10`}
                    </p>
                  </div>

                  {scannerType === 'mental-health' && result.analysisSummary && (
                    <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                      <h4 className="text-[10px] uppercase text-slate-400 font-bold mb-1 tracking-wider">Summary</h4>
                      <p className="text-xs text-slate-200">{result.analysisSummary}</p>
                    </div>
                  )}

                  {scannerType === 'religion-hub' && result.groundingTruth && (
                    <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                      <h4 className="text-[10px] uppercase text-slate-400 font-bold mb-1 tracking-wider">Grounding Truth</h4>
                      <p className="text-xs text-slate-200">{result.groundingTruth}</p>
                    </div>
                  )}

                  {/* Fallback JSON view for raw data like Sightengine's deepreal */}
                  {scannerType === 'deepreal' && (
                    <div className="p-2 bg-black/60 rounded-lg border border-slate-800 max-h-32 overflow-y-auto">
                      <pre className="text-[10px] text-green-400 font-mono whitespace-pre-wrap break-all">
                        {JSON.stringify(result, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
