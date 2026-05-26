"use client";

/**
 * EMOTIONAL TRIGGER HIGHLIGHTER — Q85/Q86
 * 
 * Client-side NLP-lite: scans text for anger/fear/sadness/disgust trigger words
 * and wraps them with the existing CSS emotion classes:
 * - .emotion-anger (red underline gradient)
 * - .emotion-fear (amber underline gradient)
 * - .emotion-sadness (blue underline gradient)
 * - .emotion-disgust (purple underline gradient)
 * 
 * This teaches users to RECOGNIZE emotional manipulation in claims.
 * Used in ExerciseEngine scenario text and Myth Autopsy claims.
 */

import React from "react";

// Lexicons tuned for Egyptian media literacy context
const EMOTION_LEXICONS: Record<string, { className: string; words: string[] }> = {
  anger: {
    className: "emotion-anger",
    words: [
      "outrageous", "disgusting", "unacceptable", "shameful", "betrayal",
      "corrupt", "criminal", "attack", "destroy", "threat", "enemy",
      "shocking", "scandal", "exposed", "furious", "rage", "explode",
      "hate", "revenge", "extremist", "radical", "violent",
    ],
  },
  fear: {
    className: "emotion-fear",
    words: [
      "dangerous", "deadly", "warning", "urgent", "crisis", "emergency",
      "terrifying", "alarming", "catastrophe", "collapse", "panic",
      "epidemic", "invasion", "nightmare", "devastating", "doom",
      "lethal", "toxic", "fatal", "horrifying", "plague",
    ],
  },
  sadness: {
    className: "emotion-sadness",
    words: [
      "heartbreaking", "tragic", "devastating", "suffering", "hopeless",
      "victim", "abandoned", "helpless", "grief", "loss", "cry",
      "pain", "despair", "lonely", "dying", "miserable",
    ],
  },
  disgust: {
    className: "emotion-disgust",
    words: [
      "disgusting", "repulsive", "sickening", "vile", "filthy",
      "contaminated", "polluted", "perverted", "rotten", "corrupt",
      "depraved", "immoral", "abhorrent",
    ],
  },
};

// Build a single regex from all lexicons
const allWords = Object.values(EMOTION_LEXICONS).flatMap((l) => l.words);
const uniqueWords = [...new Set(allWords)].sort((a, b) => b.length - a.length);
const TRIGGER_REGEX = new RegExp(`\\b(${uniqueWords.join("|")})\\b`, "gi");

function getEmotionClass(word: string): string {
  const lower = word.toLowerCase();
  for (const [, lexicon] of Object.entries(EMOTION_LEXICONS)) {
    if (lexicon.words.includes(lower)) return lexicon.className;
  }
  return "";
}

/**
 * Highlight emotional trigger words in a text string.
 * Returns React elements with CSS-highlighted spans.
 */
export function highlightTriggers(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const regex = new RegExp(TRIGGER_REGEX.source, "gi");
  while ((match = regex.exec(text)) !== null) {
    // Push text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    // Push highlighted word
    const emotionClass = getEmotionClass(match[0]);
    parts.push(
      <span
        key={match.index}
        className={emotionClass}
        title={`Emotional trigger detected: ${Object.entries(EMOTION_LEXICONS).find(([, l]) => l.className === emotionClass)?.[0] || "unknown"}`}
      >
        {match[0]}
      </span>
    );
    lastIndex = regex.lastIndex;
  }

  // Push remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

/**
 * Component wrapper for highlighted text.
 * Use: <EmotionalHighlight text={scenario} />
 */
export function EmotionalHighlight({ text }: { text: string }) {
  return <>{highlightTriggers(text)}</>;
}
