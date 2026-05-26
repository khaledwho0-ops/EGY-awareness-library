"use client";

import React from 'react';
import { DefenseScannerOverlay } from '@/components/science/defense-scanner-overlay';
import { Share2, Bookmark, AlertOctagon } from 'lucide-react';

interface MisinfoCardIntegratedProps {
  title: string;
  excerpt: string;
  sourceUrl: string;
  imageUrl: string;
  contentId: string;
}

export function MisinfoCardIntegrated({ title, excerpt, sourceUrl, imageUrl, contentId }: MisinfoCardIntegratedProps) {
  return (
    <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
      
      {/* Fake Image Placeholder with DeepReal Scanner */}
      <div className="relative w-full h-48 bg-slate-800 border-b border-slate-800 flex flex-col justify-end p-3" style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
        
        {/* Opt-in Defense Scanner for Images */}
        <div className="relative z-10 self-end">
          <DefenseScannerOverlay 
            scannerType="deepreal" 
            contentToScan={imageUrl} 
            buttonText="DeepReal Scan"
          />
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <AlertOctagon className="w-3 h-3" /> Suspicious
            </span>
            <span className="text-slate-500 text-xs font-mono">{sourceUrl}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-200 leading-tight mb-2">{title}</h3>
          <p className="text-sm text-slate-400 line-clamp-3">{excerpt}</p>
        </div>

        {/* Opt-in Cognitive & Ontological Scanners for Text */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800">
          <DefenseScannerOverlay 
            scannerType="mental-health" 
            contentToScan={excerpt} 
            buttonText="Check Bias"
          />
          <DefenseScannerOverlay 
            scannerType="religion-hub" 
            contentToScan={title + " " + excerpt} 
            buttonText="Ontological Anchor"
          />
        </div>
      </div>

      <div className="bg-slate-950 px-5 py-3 flex justify-between items-center text-slate-500">
        <button className="hover:text-white transition-colors"><Share2 className="w-4 h-4" /></button>
        <button className="hover:text-white transition-colors"><Bookmark className="w-4 h-4" /></button>
      </div>

    </div>
  );
}
