"use client";

import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileImage, FileVideo, Loader2, ShieldCheck, AlertTriangle } from 'lucide-react';

export function DeepRealUploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFile = async (file: File) => {
    setFileName(file.name);
    setError(null);
    setResult(null);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/defense/deepreal/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setResult(data.analysis);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto font-sans">
      <motion.div 
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 p-8 flex flex-col items-center justify-center text-center backdrop-blur-xl shadow-2xl
          ${isDragging 
            ? 'border-green-500 bg-green-900/20' 
            : 'border-slate-600 bg-slate-900/50 hover:bg-slate-800/60 hover:border-slate-500'
          }`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange}
          accept="image/jpeg, image/png, image/webp, video/mp4, video/quicktime"
        />

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-4 text-green-400 py-6"
            >
              <Loader2 className="w-12 h-12 animate-spin" />
              <div>
                <p className="font-bold uppercase tracking-widest text-sm text-green-300 animate-pulse">Running DeepReal Protocol...</p>
                <p className="text-xs text-green-500/70 mt-1 font-mono">Uploading & analyzing {fileName}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-3 text-slate-400 py-4"
            >
              <div className="flex gap-4 mb-2">
                <FileImage className={`w-10 h-10 ${isDragging ? 'text-green-400 animate-bounce' : 'text-slate-500'}`} />
                <FileVideo className={`w-10 h-10 ${isDragging ? 'text-green-400 animate-bounce' : 'text-slate-500'}`} style={{ animationDelay: '0.1s' }} />
              </div>
              <h3 className="text-lg font-bold text-slate-200">
                {isDragging ? 'Deploy payload for forensic scan' : 'Drag & Drop Suspicious Media'}
              </h3>
              <p className="text-sm font-medium text-slate-500">
                or click to browse local files
              </p>
              <div className="mt-4 flex gap-2">
                <span className="text-[10px] uppercase tracking-wider bg-slate-800 border border-slate-700 px-2 py-1 rounded text-slate-400 font-mono">Max 10MB</span>
                <span className="text-[10px] uppercase tracking-wider bg-slate-800 border border-slate-700 px-2 py-1 rounded text-slate-400 font-mono">JPG, PNG, MP4</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {error && !isLoading && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-red-950/40 border border-red-900 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-red-400 font-bold text-sm uppercase tracking-wider mb-1">Scan Failed</h4>
                <p className="text-red-300/80 text-xs leading-relaxed">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {result && !isLoading && !error && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 bg-[#0f111a]/95 border border-green-900/50 rounded-xl shadow-[0_0_40px_rgba(0,255,0,0.1)] backdrop-blur-2xl">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-green-500" />
                <h4 className="text-green-400 font-bold text-sm uppercase tracking-widest">DeepReal ZKP Sybil Scan Complete</h4>
              </div>
              
              <div className="mb-4 flex gap-4">
                <div className="bg-slate-900/60 border border-slate-800 rounded p-3 flex-1">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-mono">Media Analyzed</div>
                  <div className="text-xs text-slate-300 font-mono truncate">{fileName}</div>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 rounded p-3 flex-1">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-mono">Synthetic Probability</div>
                  <div className="text-lg font-bold text-white tracking-wider">
                    {result.type?.synthetic ? (result.type.synthetic * 100).toFixed(1) + '%' : 'N/A'}
                  </div>
                </div>
              </div>

              <div className="bg-black/60 rounded-lg border border-slate-800 p-4 overflow-y-auto max-h-64 custom-scrollbar">
                <pre className="text-[11px] text-green-400/90 font-mono whitespace-pre-wrap break-all leading-relaxed">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
