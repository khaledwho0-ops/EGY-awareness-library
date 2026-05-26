"use client";

import React, { FormEvent, useEffect, useRef } from 'react';
import { useCompletion } from '@ai-sdk/react';
import { Terminal, ShieldAlert, Cpu, Activity, AlertOctagon } from 'lucide-react';

export function LiveSwarmDebate() {
  const {
    completion,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
  } = useCompletion({
    api: '/api/defense/swarm',
  });

  // Auto-scroll to bottom of terminal output as it streams
  const terminalEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [completion]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    handleSubmit(e);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 font-mono">
      {/* Terminal Container */}
      <div className="bg-black border border-green-900 rounded-lg overflow-hidden shadow-[0_0_40px_rgba(0,255,0,0.1)]">
        
        {/* Terminal Header */}
        <div className="bg-zinc-950 border-b border-green-900/50 p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-green-500" />
            <h2 className="text-green-500 font-bold tracking-widest text-sm uppercase">Multi-Agent Swarm Command Center</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLoading ? 'bg-red-400' : 'bg-green-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isLoading ? 'bg-red-500' : 'bg-green-500'}`}></span>
            </span>
            <span className="text-xs text-green-700 uppercase tracking-widest">{isLoading ? 'ACTIVE_SCAN' : 'SYS_IDLE'}</span>
          </div>
        </div>

        {/* Output Display Area */}
        <div className="p-6 h-[400px] overflow-y-auto bg-black text-green-400 custom-scrollbar relative">
          {!completion && !isLoading && !error && (
            <div className="h-full flex flex-col items-center justify-center text-green-900/50 space-y-4">
              <ShieldAlert className="w-16 h-16" />
              <p className="uppercase tracking-widest text-sm">Awaiting Threat Injection...</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-950/20 border border-red-900 text-red-500 rounded flex items-start gap-3 mb-4">
              <AlertOctagon className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold uppercase tracking-wider text-sm mb-1">Fatal Exception</p>
                <p className="text-xs">{error.message}</p>
              </div>
            </div>
          )}

          {/* Stepped Loading Indication */}
          {isLoading && !completion && (
            <div className="text-green-500/70 mb-4 animate-pulse space-y-2">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 animate-spin" />
                <span>[DEEPSEEK-R1] Executing Red Team Psychological Analysis...</span>
              </div>
            </div>
          )}

          {/* Streaming Completion output */}
          {completion && (
            <div className="whitespace-pre-wrap leading-relaxed">
              <div className="text-green-600 mb-2 border-b border-green-900/50 pb-2 uppercase text-xs tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4" />
                [LLAMA-3.3-70B] Generating Counter-Narrative
              </div>
              <div className="text-green-400 text-sm">
                {completion}
                {isLoading && <span className="animate-pulse inline-block w-2 h-4 bg-green-500 ml-1 translate-y-1"></span>}
              </div>
            </div>
          )}
          <div ref={terminalEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-zinc-950 p-4 border-t border-green-900/50">
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <textarea
              className="w-full bg-black border border-green-900/50 rounded p-3 text-green-500 text-sm placeholder-green-900/50 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors resize-none h-24 custom-scrollbar"
              placeholder="Paste propagandist text, cognitive hazard, or existential threat here..."
              value={input}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`px-6 py-2 rounded font-bold uppercase tracking-widest text-sm transition-all duration-300 border
                  ${isLoading || !input.trim() 
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-600 cursor-not-allowed' 
                    : 'bg-green-950 border-green-500 text-green-400 hover:bg-green-900 hover:text-green-300 hover:shadow-[0_0_15px_rgba(0,255,0,0.2)]'
                  }
                `}
              >
                {isLoading ? 'Processing...' : 'Deploy Swarm'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
