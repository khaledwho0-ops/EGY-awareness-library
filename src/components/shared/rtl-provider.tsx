"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

type Direction = "ltr" | "rtl";
type Language = "en" | "ar" | "ar-EG";

interface RTLContextType {
  direction: Direction;
  language: Language;
  toggleDirection: () => void;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  /** Shorthand — true when language is ar or ar-EG */
  isArabic: boolean;
  /** True only when Egyptian dialect is active */
  isEgyptian: boolean;
  /** Get text from a trilingual object {en, ar, arEG?} */
  t: (entry: { en: string; ar: string; arEG?: string }) => string;
}

const RTLContext = createContext<RTLContextType>({
  direction: "ltr",
  language: "en",
  toggleDirection: () => {},
  setLanguage: () => {},
  isRTL: false,
  isArabic: false,
  isEgyptian: false,
  t: (entry) => entry.en,
});

export function useRTL() {
  return useContext(RTLContext);
}

/**
 * RTL Provider — Framework §23.1 #9 (Accessibility)
 * 
 * Supports trilingual: English / Arabic Fusha / Egyptian Arabic
 * - dir attribute on html element
 * - Font family swap (Noto Kufi Arabic for RTL)
 * - Layout mirroring for all border/margin/padding
 * - localStorage persistence so language choice survives navigation & refresh
 */
export function RTLProvider({ children }: { children: React.ReactNode }) {
  const [direction, setDirection] = useState<Direction>("ltr");
  const [language, setLang] = useState<Language>("en");

  // On mount, read saved preference from localStorage
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("eal-language") as Language | null;
      if (savedLang === "ar" || savedLang === "ar-EG") {
        setDirection("rtl");
        setLang(savedLang);
        document.documentElement.setAttribute("dir", "rtl");
        document.documentElement.setAttribute("lang", savedLang === "ar-EG" ? "ar-EG" : "ar");
      } else {
        // Fallback to old direction key
        const saved = localStorage.getItem("eal-direction");
        if (saved === "rtl") {
          setDirection("rtl");
          setLang("ar");
          document.documentElement.setAttribute("dir", "rtl");
          document.documentElement.setAttribute("lang", "ar");
        }
      }
    } catch { /* storage error — ignore */ }
  }, []);

  // Sync direction changes to DOM and localStorage
  useEffect(() => {
    document.documentElement.setAttribute("dir", direction);
    document.documentElement.setAttribute("lang", language === "ar-EG" ? "ar-EG" : language === "ar" ? "ar" : "en");
    try {
      localStorage.setItem("eal-direction", direction);
      localStorage.setItem("eal-language", language);
    } catch { /* storage full — ignore */ }
  }, [direction, language]);

  const toggleDirection = useCallback(() => {
    setDirection((prev) => {
      const next = prev === "rtl" ? "ltr" : "rtl";
      setLang(next === "rtl" ? "ar" : "en");
      return next;
    });
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLang(lang);
    setDirection(lang === "en" ? "ltr" : "rtl");
  }, []);

  /** Pick text from trilingual object */
  const t = useCallback(
    (entry: { en: string; ar: string; arEG?: string }) => {
      if (language === "ar-EG" && entry.arEG) return entry.arEG;
      if (language === "ar" || language === "ar-EG") return entry.ar;
      return entry.en;
    },
    [language]
  );

  return (
    <RTLContext.Provider value={{
      direction,
      language,
      toggleDirection,
      setLanguage,
      isRTL: direction === "rtl",
      isArabic: language === "ar" || language === "ar-EG",
      isEgyptian: language === "ar-EG",
      t,
    }}>
      {children}
    </RTLContext.Provider>
  );
}
