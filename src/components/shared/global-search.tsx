"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { SITE_CONTENT_TAGS } from "@/data/navigation/global-search-tags";
import { useTheme } from "./theme-provider";
import { useRTL } from "./rtl-provider";

export function GlobalSearch({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const { resolvedScheme } = useTheme();
  const { isRTL } = useRTL();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      window.setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTags = SITE_CONTENT_TAGS.filter((tag) => {
    if (!query.trim()) return true;
    const searchLower = query.toLowerCase();
    const matchesLabel = tag.label.toLowerCase().includes(searchLower);
    const matchesLabelAr = tag.labelAr?.toLowerCase().includes(searchLower);
    const matchesKeywords = tag.keywords.some((keyword) =>
      keyword.toLowerCase().includes(searchLower),
    );
    return matchesLabel || matchesLabelAr || matchesKeywords;
  });

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
      style={{ background: "rgba(0, 0, 0, 0.4)", backdropFilter: "blur(8px)" }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div
        className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl animate-scale-in"
        style={{
          background:
            resolvedScheme === "dark"
              ? "rgba(20, 20, 30, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
          border:
            resolvedScheme === "dark"
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <div
          className="flex items-center px-4 py-3 border-b"
          style={{
            borderColor:
              resolvedScheme === "dark"
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.06)",
          }}
        >
          <Search size={22} className="text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder={isRTL ? "ابحث عن أي شيء في المنصة..." : "Search all EAL content..."}
            className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-lg font-medium"
            style={{ color: "var(--text-primary)" }}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label={isRTL ? "إغلاق البحث" : "Close search"}
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {filteredTags.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {filteredTags.map((tag) => (
                <button
                  key={`${tag.href}-${tag.label}`}
                  type="button"
                  onClick={() => handleSelect(tag.href)}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5"
                  style={{
                    background:
                      resolvedScheme === "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.04)",
                    color: "var(--text-primary)",
                    border:
                      resolvedScheme === "dark"
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "1px solid rgba(0,0,0,0.08)",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.background =
                      "var(--accent-cta-glow, rgba(139,92,246,0.15))";
                    event.currentTarget.style.borderColor =
                      "var(--accent-cta, #8B5CF6)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.background =
                      resolvedScheme === "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.04)";
                    event.currentTarget.style.borderColor =
                      resolvedScheme === "dark"
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.08)";
                  }}
                >
                  {isRTL && tag.labelAr ? tag.labelAr : tag.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-10" style={{ color: "var(--text-muted)" }}>
              <Search size={40} className="mx-auto mb-4 opacity-20" />
              <p>{isRTL ? "لم يتم العثور على نتائج." : "No results found for your search."}</p>
            </div>
          )}
        </div>

        <div
          className="px-6 py-3 border-t text-xs flex justify-between items-center"
          style={{
            borderColor:
              resolvedScheme === "dark"
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.06)",
            color: "var(--text-muted)",
          }}
        >
          <span>{filteredTags.length} {isRTL ? "عناصر" : "results"}</span>
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono">ESC</span>
            {isRTL ? "للإغلاق" : "to close"}
          </div>
        </div>
      </div>
    </div>
  );
}
