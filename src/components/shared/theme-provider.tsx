"use client";

import { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";

export type Theme =
  | "bloodline"
  | "dark"
  | "light"
  | "terracotta"
  | "amethyst"
  | "olive-meadow"
  | "pearl-slate"
  | "core-wine"
  | "blush-energy"
  | "steel-azure"
  | "crimson-violet"
  | "deep-mocha"
  | "espresso-peony"
  | "raspberry-space"
  | "icy-gunmetal"
  | "lilac-cream"
  | "system";

export type ResolvedTheme = Exclude<Theme, "system">;
type ColorScheme = "dark" | "light";
export type ContrastMode = "normal" | "high";

export const THEME_OPTIONS: Array<{
  value: ResolvedTheme;
  label: string;
  description: string;
  scheme: ColorScheme;
}> = [
  {
    value: "bloodline",
    label: "Bloodline",
    description: "Scary, performative, high-drama awareness mode",
    scheme: "dark",
  },
  {
    value: "terracotta",
    label: "Terracotta Sunset",
    description: "Warm editorial tones with soft apricot contrast",
    scheme: "light",
  },
  {
    value: "amethyst",
    label: "Amethyst Geode",
    description: "Luminous violet depth with lavender fog",
    scheme: "dark",
  },
  {
    value: "dark",
    label: "Dark Luxury",
    description: "Original premium dark mode",
    scheme: "dark",
  },
  {
    value: "light",
    label: "Light Academic",
    description: "Warm, readable research surface",
    scheme: "light",
  },
  {
    value: "olive-meadow",
    label: "Olive Meadow",
    description: "Earthy nature mode with warm sage tones",
    scheme: "dark",
  },
  {
    value: "pearl-slate",
    label: "Pearl Slate",
    description: "Corporate cool with blue-gray steel tones",
    scheme: "dark",
  },
  {
    value: "core-wine",
    label: "Core Wine",
    description: "Dramatic wine on carbon black intensity",
    scheme: "dark",
  },
  {
    value: "blush-energy",
    label: "Blush Energy",
    description: "Warm coral bloom on soft cream canvas",
    scheme: "light",
  },
  {
    value: "steel-azure",
    label: "Steel Azure",
    description: "Industrial tech with steel-blue authority",
    scheme: "dark",
  },
  {
    value: "crimson-violet",
    label: "Crimson Violet",
    description: "Bold violet depth with chartreuse spark",
    scheme: "dark",
  },
  {
    value: "deep-mocha",
    label: "Deep Mocha",
    description: "Sophisticated espresso with thistle warmth",
    scheme: "dark",
  },
  {
    value: "espresso-peony",
    label: "Espresso Peony",
    description: "Elegant dark chocolate with soft pink bloom",
    scheme: "dark",
  },
  {
    value: "raspberry-space",
    label: "Raspberry Space",
    description: "Deep space navy with electric raspberry pop",
    scheme: "dark",
  },
  {
    value: "icy-gunmetal",
    label: "Icy Gunmetal",
    description: "Modern steel with powder-blue frost accent",
    scheme: "dark",
  },
  {
    value: "lilac-cream",
    label: "Lilac Cream",
    description: "Soft pastel violet on warm cream canvas",
    scheme: "light",
  },
];

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  resolvedScheme: ColorScheme;
  contrastMode: ContrastMode;
  isAutoCycling: boolean;
  setTheme: (theme: Theme) => void;
  setContrastMode: (mode: ContrastMode) => void;
  startAutoCycle: () => void;
  stopAutoCycle: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "bloodline",
  resolvedTheme: "bloodline",
  resolvedScheme: "dark",
  contrastMode: "normal",
  isAutoCycling: false,
  setTheme: () => {},
  setContrastMode: () => {},
  startAutoCycle: () => {},
  stopAutoCycle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function isTheme(value: string | null): value is Theme {
  return !!value && ["bloodline", "dark", "light", "terracotta", "amethyst", "olive-meadow", "pearl-slate", "core-wine", "blush-energy", "steel-azure", "crimson-violet", "deep-mocha", "espresso-peony", "raspberry-space", "icy-gunmetal", "lilac-cream", "system"].includes(value);
}

function getScheme(nextTheme: ResolvedTheme): ColorScheme {
  return THEME_OPTIONS.find((option) => option.value === nextTheme)?.scheme ?? "dark";
}

function resolveTheme(nextTheme: Theme): ResolvedTheme {
  if (nextTheme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return nextTheme;
}

/**
 * Theme Provider - DESIGN.txt 5.6, extended with art-directed visual modes.
 *
 * Modes:
 * - Bloodline: dramatic red-violet awareness mode
 * - Terracotta Sunset: warm editorial light palette
 * - Amethyst Geode: luminous violet dark palette
 * - Dark Luxury / Light Academic: original baselines
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("bloodline");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("bloodline");
  const [resolvedScheme, setResolvedScheme] = useState<ColorScheme>("dark");
  const [contrastMode, setContrastModeState] = useState<ContrastMode>("normal");
  const [isAutoCycling, setIsAutoCycling] = useState(false);
  const cycleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const shuffleQueueRef = useRef<ResolvedTheme[]>([]);
  const cycleIndexRef = useRef(0);

  /**
   * Expert Idea 1: Fisher-Yates Shuffle Queue
   * Every theme is seen exactly once before reshuffling.
   * Prevents the jarring repetition of true randomness.
   */
  function buildShuffleQueue(): ResolvedTheme[] {
    const themes = THEME_OPTIONS.map(t => t.value);
    for (let i = themes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [themes[i], themes[j]] = [themes[j], themes[i]];
    }
    return themes;
  }

  /**
   * Expert Idea 3: CSS Cross-fade transition
   * Adds a 1.5s opacity transition on the root element
   * so theme switches feel gentle — not jarring.
   */
  function enableCrossFade() {
    document.documentElement.classList.add("theme-crossfade");
  }
  function disableCrossFade() {
    document.documentElement.classList.remove("theme-crossfade");
  }

  function applyTheme(nextTheme: ResolvedTheme) {
    const root = document.documentElement;
    const nextScheme = getScheme(nextTheme);

    root.setAttribute("data-theme", nextTheme);
    root.style.setProperty("color-scheme", nextScheme);

    // Only add .dark class for the generic "dark" theme.
    // Named dark-scheme themes (olive-meadow, pearl-slate, etc.) must NOT
    // get .dark, otherwise the `.dark` CSS selector overrides their variables.
    if (nextTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem("eal-theme");
    const savedContrast = localStorage.getItem("eal-contrast");
    const safeSaved: Theme = isTheme(saved) ? saved : "bloodline";
    const initial = resolveTheme(safeSaved);
    const initialScheme = getScheme(initial);
    const initialContrast: ContrastMode = savedContrast === "high" ? "high" : "normal";

    applyTheme(initial);
    document.documentElement.setAttribute("data-contrast", initialContrast);

    queueMicrotask(() => {
      setThemeState(safeSaved);
      setResolvedTheme(initial);
      setResolvedScheme(initialScheme);
      setContrastModeState(initialContrast);
    });
  }, []);

  function setTheme(nextTheme: Theme) {
    // If user manually picks a theme, stop auto-cycling
    if (isAutoCycling) {
      stopAutoCycle();
    }
    const resolved = resolveTheme(nextTheme);
    const scheme = getScheme(resolved);

    setThemeState(nextTheme);
    setResolvedTheme(resolved);
    setResolvedScheme(scheme);
    localStorage.setItem("eal-theme", nextTheme);
    applyTheme(resolved);
  }

  /**
   * Expert Idea 2: Visibility API + Idle Detection
   * Only cycles when the browser tab is visible.
   * Pauses when hidden → saves battery + CPU.
   */
  const startAutoCycle = useCallback(() => {
    // Build initial shuffle queue
    shuffleQueueRef.current = buildShuffleQueue();
    cycleIndexRef.current = 0;
    setIsAutoCycling(true);
    enableCrossFade();

    // Apply first theme immediately
    const first = shuffleQueueRef.current[0];
    const firstScheme = getScheme(first);
    applyTheme(first);
    setResolvedTheme(first);
    setResolvedScheme(firstScheme);
    setThemeState(first);

    // Start interval: 8 seconds per theme (slow, eye-healthy)
    cycleTimerRef.current = setInterval(() => {
      // Only cycle if tab is visible (Visibility API)
      if (document.hidden) return;

      cycleIndexRef.current++;

      // If we exhausted the queue, reshuffle
      if (cycleIndexRef.current >= shuffleQueueRef.current.length) {
        shuffleQueueRef.current = buildShuffleQueue();
        cycleIndexRef.current = 0;
      }

      const next = shuffleQueueRef.current[cycleIndexRef.current];
      const nextScheme = getScheme(next);
      applyTheme(next);
      setResolvedTheme(next);
      setResolvedScheme(nextScheme);
      setThemeState(next);
    }, 8000);
  }, []);

  const stopAutoCycle = useCallback(() => {
    if (cycleTimerRef.current) {
      clearInterval(cycleTimerRef.current);
      cycleTimerRef.current = null;
    }
    setIsAutoCycling(false);
    disableCrossFade();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
    };
  }, []);

  function setContrastMode(nextMode: ContrastMode) {
    setContrastModeState(nextMode);
    localStorage.setItem("eal-contrast", nextMode);
    document.documentElement.setAttribute("data-contrast", nextMode);
  }

  return (
    <ThemeContext value={{ theme, resolvedTheme, resolvedScheme, contrastMode, isAutoCycling, setTheme, setContrastMode, startAutoCycle, stopAutoCycle }}>
      {children}
    </ThemeContext>
  );
}
