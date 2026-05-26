"use client";

import React from 'react';
import { DeepRealTripillarUI } from '@/components/science/deepreal-tripillar-ui';
import MentalHealthTripillarUI from '@/components/science/mental-health-tripillar-ui';
import { ReligionTripillarUI } from '@/components/science/religion-tripillar-ui';

export default function DefenseTestPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] px-4 pb-20 pt-32">
      <h1 className="text-3xl md:text-5xl font-black text-center mb-16 tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
        Tri-Pillar Defense Engines
      </h1>
      
      <div className="max-w-5xl mx-auto flex flex-col gap-16 w-full">
        
        {/* Layer 1-4 */}
        <div className="flex flex-col gap-4">
          <div className="bg-[var(--bg-elevated)] p-4 rounded-xl border border-[var(--border-primary)] shadow-lg">
            <h2 className="text-2xl font-bold text-green-400 mb-2">DeepReal Engine</h2>
            <p className="text-sm text-[var(--text-secondary)]">Tests rPPG Blood Flow Scan & ZKP Sybil Checks. Implements COM-B Cognitive Intercept.</p>
          </div>
          <DeepRealTripillarUI />
        </div>

        {/* Layer 5-6 */}
        <div className="flex flex-col gap-4">
          <div className="bg-[var(--bg-elevated)] p-4 rounded-xl border border-[var(--border-primary)] shadow-lg">
            <h2 className="text-2xl font-bold text-blue-400 mb-2">Mental Health Engine</h2>
            <p className="text-sm text-[var(--text-secondary)]">Tests Strategic Friction & Cognitive Firewall based on synthetic HRV drops.</p>
          </div>
          <MentalHealthTripillarUI />
        </div>

        {/* Layer 7-8 */}
        <div className="flex flex-col gap-4">
          <div className="bg-[var(--bg-elevated)] p-4 rounded-xl border border-[var(--border-primary)] shadow-lg">
            <h2 className="text-2xl font-bold text-purple-400 mb-2">Religion Hub Engine</h2>
            <p className="text-sm text-[var(--text-secondary)]">Tests Ontological Shock response and Trauma-Informed UI state machine.</p>
          </div>
          <ReligionTripillarUI />
        </div>

      </div>
    </div>
  );
}
