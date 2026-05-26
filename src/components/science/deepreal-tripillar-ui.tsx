"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanFace, Fingerprint, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { ForensicEngine } from '@/lib/science/forensics/semafor-engine';
import { ZKPIdentityEngine } from '@/lib/science/forensics/zkp-identity';

export function DeepRealTripillarUI() {
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [showCognitivePrompt, setShowCognitivePrompt] = useState(false);
  const [userReflected, setUserReflected] = useState(false);

  const handleScan = () => {
    setScanning(true);
    // Simulate backend tool scan
    setTimeout(() => {
      setScanning(false);
      setShowCognitivePrompt(true); // Trigger Cognitive Pillar
    }, 2000);
  };

  const handleReflection = () => {
    setShowCognitivePrompt(false);
    setScanComplete(true);
  };

  return (
    <div className="p-6 bg-black text-green-500 rounded-xl border border-green-500/30 w-full font-mono relative overflow-hidden">
      
      {/* Background X-Ray Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff0011_1px,transparent_1px),linear-gradient(to_bottom,#00ff0011_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <ScanFace className="w-8 h-8 flex-shrink-0" />
        DeepReal: rPPG Forensic Scanner
      </h2>

      {/* Philosophy Pillar */}
      <div className="mb-6 p-4 bg-green-950/40 rounded-lg border border-green-500/20 text-sm">
        <div className="flex items-start gap-2 text-green-400">
          <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>
            <strong>The Burden of Truth:</strong> Truth is not an algorithmic output; it requires context and human responsibility before sharing.
          </p>
        </div>
      </div>

      {!scanComplete && !showCognitivePrompt && (
        <button
          onClick={handleScan}
          disabled={scanning}
          className="w-full py-4 bg-green-900/30 hover:bg-green-800/50 border border-green-500 rounded-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {scanning ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
              <Fingerprint className="w-6 h-6" />
            </motion.div>
          ) : (
            <ScanFace className="w-6 h-6" />
          )}
          {scanning ? "RUNNING rPPG MICRO-BLOOD FLOW ANALYSIS..." : "SCAN MEDIA (ZKP VERIFICATION)"}
        </button>
      )}

      {/* Cognitive Pillar Popup (COM-B) */}
      <AnimatePresence>
        {showCognitivePrompt && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 bg-yellow-950 border border-yellow-500 rounded-lg text-yellow-500"
          >
            <h3 className="text-xl font-bold mb-2">Cognitive Intercept</h3>
            <p className="mb-4">Before we reveal the forensic result, reflect on your own bias:</p>
            <p className="font-bold text-lg mb-6 italic">"Why did you want this media to be true?"</p>
            <div className="flex gap-4">
              <button onClick={handleReflection} className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/40 border border-yellow-500 rounded">
                It confirms my beliefs
              </button>
              <button onClick={handleReflection} className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/40 border border-yellow-500 rounded">
                I was emotionally hijacked
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Forensic Result (Tool Pillar) */}
      <AnimatePresence>
        {scanComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-red-950 border border-red-500 rounded-lg text-red-500 mt-4"
          >
            <h3 className="text-2xl font-bold flex items-center gap-2 mb-2">
              <ShieldAlert className="w-6 h-6 flex-shrink-0" />
              FORENSIC ALERT
            </h3>
            <p className="mb-2"><strong>ZKP Identity:</strong> RLN Failed. Detected Botnet Sybil Hash.</p>
            <p><strong>rPPG Biological Check:</strong> <span className="font-bold underline">CRITICAL FAILURE</span>. No cardiac micro-blood flow detected in subject's face. The media is a synthetic clone.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
