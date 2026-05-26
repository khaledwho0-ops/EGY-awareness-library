'use client';
/* ═══════════════════════════════════════════════════════════════
 * ScrollContext.tsx — Shared scroll state for the 6-Layer experience
 * Provides scroll progress, current layer, and mouse position
 * to both DOM and R3F components.
 * ═══════════════════════════════════════════════════════════════ */

import {
  createContext,
  useContext,
  useRef,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface ScrollState {
  /** 0-1 overall scroll progress */
  progress: number;
  /** 0=hero, 1-7=layers, 8=defense */
  currentLayer: number;
  /** 0-1 within the current layer */
  layerProgress: number;
  /** Normalized mouse position (-1 to 1) */
  mouseX: number;
  mouseY: number;
  /** Scroll velocity (pixels/frame) */
  velocity: number;
}

interface ScrollContextValue {
  /** Mutable ref — read in useFrame, no re-renders */
  stateRef: React.MutableRefObject<ScrollState>;
  /** Call from Lenis/ScrollTrigger callbacks */
  setProgress: (progress: number) => void;
  setCurrentLayer: (layer: number) => void;
  setLayerProgress: (progress: number) => void;
  setVelocity: (velocity: number) => void;
  setMouse: (x: number, y: number) => void;
  isAnimationsDisabled: boolean;
  setAnimationsDisabled: (val: boolean) => void;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [isAnimationsDisabled, setAnimationsDisabled] = useState(false);

  const stateRef = useRef<ScrollState>({
    progress: 0,
    currentLayer: 0,
    layerProgress: 0,
    mouseX: 0,
    mouseY: 0,
    velocity: 0,
  });

  // All setters mutate the ref — zero re-renders
  const setProgress = useCallback((p: number) => {
    stateRef.current.progress = p;
  }, []);

  const setCurrentLayer = useCallback((l: number) => {
    stateRef.current.currentLayer = l;
  }, []);

  const setLayerProgress = useCallback((p: number) => {
    stateRef.current.layerProgress = p;
  }, []);

  const setVelocity = useCallback((v: number) => {
    stateRef.current.velocity = v;
  }, []);

  const setMouse = useCallback((x: number, y: number) => {
    stateRef.current.mouseX = x;
    stateRef.current.mouseY = y;
  }, []);

  const value = useMemo(
    () => ({
      stateRef,
      setProgress,
      setCurrentLayer,
      setLayerProgress,
      setVelocity,
      setMouse,
      isAnimationsDisabled,
      setAnimationsDisabled,
    }),
    [setProgress, setCurrentLayer, setLayerProgress, setVelocity, setMouse, isAnimationsDisabled]
  );

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}

export function useScrollContext() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error('useScrollContext must be inside <ScrollProvider>');
  return ctx;
}
