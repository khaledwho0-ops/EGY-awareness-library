"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";

/**
 * EXPERT VOICE CAPSULE — Q47
 * Audio playback with waveform animation
 * Visual pulse indicator while audio plays
 * 
 * Framework: §18 Mode 4 — Expert Voice Capsule
 * 
 * When no audioSrc is provided, uses the Web Speech API
 * to synthesize the transcript text as spoken audio.
 */

interface ExpertVoiceCapsuleProps {
  expertName: string;
  expertRole: string;
  audioSrc?: string;
  transcript: string;
  duration?: string;
  accentColor?: string;
}

export function ExpertVoiceCapsule({
  expertName,
  expertRole,
  audioSrc,
  transcript,
  duration = "1:00",
  accentColor = "var(--accent-religionhub)",
}: ExpertVoiceCapsuleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isRTL, t } = useRTL();
  const a = isRTL;

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const togglePlay = useCallback(() => {
    // --- If real audio file is provided, use <audio> element ---
    if (audioSrc) {
      const audio = audioRef.current;
      if (audio) {
        if (isPlaying) {
          audio.pause();
        } else {
          audio.play().catch(() => {});
        }
      }
      setIsPlaying((p) => !p);
      return;
    }

    // --- Fallback: Web Speech API TTS ---
    if (typeof window === "undefined" || !window.speechSynthesis) {
      // If no speech synthesis available, just show transcript
      setShowTranscript(true);
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    // Cancel any previous speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(transcript);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Try to find an English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) => v.lang.startsWith("en") && v.name.includes("Google")
    ) || voices.find((v) => v.lang.startsWith("en"));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    utteranceRef.current = utterance;

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  }, [audioSrc, isPlaying, transcript]);

  const handleAudioEnded = useCallback(() => setIsPlaying(false), []);

  return (
    <div
      style={{
        padding: "16px 20px",
        borderRadius: "var(--radius-lg)",
        border: `1px solid ${isPlaying ? accentColor : "var(--border-primary)"}`,
        background: isPlaying ? `color-mix(in srgb, ${accentColor} 5%, var(--bg-card))` : "var(--bg-card)",
        transition: "all 0.3s ease",
      }}
    >
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          onEnded={handleAudioEnded}
        />
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {/* Play/Pause button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
          style={{
            width: 44, height: 44, borderRadius: "50%", border: "none",
            background: accentColor, color: "white", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
            boxShadow: isPlaying ? `0 0 20px color-mix(in srgb, ${accentColor} 40%, transparent)` : "none",
            transform: isPlaying ? "scale(1.05)" : "scale(1)",
          }}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
        </button>

        {/* Info + Waveform */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{expertName}</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
            {expertRole} • {duration}
            {!audioSrc && <span style={{ marginLeft: 6, fontSize: 9, opacity: 0.7 }}>🔊 TTS</span>}
          </div>
        </div>

        {/* Waveform bars */}
        <div className={`waveform-bars ${isPlaying ? "playing" : ""}`}>
          <div className="waveform-bar" style={{ background: accentColor }} />
          <div className="waveform-bar" style={{ background: accentColor }} />
          <div className="waveform-bar" style={{ background: accentColor }} />
          <div className="waveform-bar" style={{ background: accentColor }} />
          <div className="waveform-bar" style={{ background: accentColor }} />
        </div>

        <Volume2 size={16} style={{ color: isPlaying ? accentColor : "var(--text-caption)" }} />
      </div>

      {/* Transcript toggle */}
      <div style={{ marginTop: 10 }}>
        <button
          onClick={() => setShowTranscript((p) => !p)}
          style={{
            fontSize: 11, color: accentColor, fontWeight: 600,
            background: "none", border: "none", cursor: "pointer", padding: 0,
          }}
        >
          {showTranscript ? (t({ en: "Hide", ar: "إخفاء", arEG: "إخفاء" })) : (t({ en: "Show", ar: "عرض", arEG: "عرض" }))} {t({ en: "Transcript", ar: "النص", arEG: "النص" })}
        </button>
        {showTranscript && (
          <p style={{ fontSize: 12, lineHeight: 1.7, color: "var(--text-secondary)", marginTop: 8, padding: "10px 14px", background: "var(--bg-secondary)", borderRadius: 8 }}>
            {transcript}
          </p>
        )}
      </div>
    </div>
  );
}
