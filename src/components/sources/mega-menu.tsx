"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, ExternalLink, Shield, BookOpen, Heart, Globe } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";

/**
 * MEGA MENU — Q39
 * z-index: 9000, multi-column, translateY(-8px) → 0 animation
 * Contains Top 100 Sources divided into columns
 * 
 * + TRUSTED DIRECTORY QUICK ACCESS — Q78
 * Appears in Sticky Navbar, one click to WHO/Al-Azhar reference
 * 
 * Framework: §19, §18 Mode 11
 */

interface SourceEntry {
  name: string;
  url: string;
  category: "fact_check" | "health" | "religion" | "academic" | "government" | "crisis";
  trustBand: "A" | "B" | "C";
  description: string;
}

const TOP_SOURCES: SourceEntry[] = [
  // Fact-checking (A-tier)
  { name: "AFP Fact Check", url: "https://factcheck.afp.com", category: "fact_check", trustBand: "A", description: "AFP's dedicated fact-checking division" },
  { name: "Full Fact", url: "https://fullfact.org", category: "fact_check", trustBand: "A", description: "UK independent fact-checking charity" },
  { name: "Snopes", url: "https://snopes.com", category: "fact_check", trustBand: "A", description: "Oldest fact-checking site" },
  { name: "PolitiFact", url: "https://politifact.com", category: "fact_check", trustBand: "A", description: "Pulitzer Prize-winning fact-checker" },
  { name: "Misbar", url: "https://misbar.com", category: "fact_check", trustBand: "A", description: "Arabic fact-checking platform" },
  { name: "Fatabyyano", url: "https://fatabyyano.net", category: "fact_check", trustBand: "A", description: "MENA region fact-checker" },
  { name: "Cambridge Bad News", url: "https://www.cam.ac.uk/research/news/fake-news-vaccine-works-pre-bunk-game-reduces-susceptibility-to-disinformation", category: "academic", trustBand: "A", description: "Official Cambridge summary of the misinformation inoculation study" },
  { name: "Cambridge MIST", url: "https://www.cam.ac.uk/stories/misinformation-susceptibility-test", category: "academic", trustBand: "A", description: "Official Cambridge overview of the MIST assessment" },
  { name: "SIFT Method", url: "https://www.digitalinquirygroup.org/sift/", category: "academic", trustBand: "A", description: "Primary source for the SIFT verification workflow" },
  // Health (A-tier)
  { name: "WHO", url: "https://who.int", category: "health", trustBand: "A", description: "World Health Organization" },
  { name: "NHS", url: "https://nhs.uk", category: "health", trustBand: "A", description: "UK National Health Service" },
  { name: "Mayo Clinic", url: "https://mayoclinic.org", category: "health", trustBand: "A", description: "Top US medical institution" },
  { name: "NIMH", url: "https://nimh.nih.gov", category: "health", trustBand: "A", description: "National Institute of Mental Health" },
  { name: "Vezeeta", url: "https://vezeeta.com", category: "health", trustBand: "B", description: "Egypt's healthcare platform" },
  // Religion/Moderation
  { name: "Al-Azhar Observatory", url: "https://azhar.eg", category: "religion", trustBand: "A", description: "Al-Azhar's moderation center" },
  { name: "Dar al-Ifta", url: "https://dar-alifta.org", category: "religion", trustBand: "A", description: "Egypt's official fatwa institution" },
  // Academic
  { name: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov", category: "academic", trustBand: "A", description: "Biomedical literature database" },
  { name: "Google Scholar", url: "https://scholar.google.com", category: "academic", trustBand: "A", description: "Academic paper search" },
  { name: "OpenAlex", url: "https://openalex.org", category: "academic", trustBand: "A", description: "Open scholarly metadata" },
  { name: "Crossref", url: "https://crossref.org", category: "academic", trustBand: "A", description: "DOI registration agency" },
  // Crisis
  { name: "Egypt Mental Health Hotline", url: "tel:08008880700", category: "crisis", trustBand: "A", description: "08008880700 — Free, 24/7" },
  { name: "Emergency Services", url: "tel:123", category: "crisis", trustBand: "A", description: "123 — Egyptian emergency" },
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  fact_check: <Shield size={14} />,
  health: <Heart size={14} />,
  religion: <BookOpen size={14} />,
  academic: <Globe size={14} />,
  government: <Shield size={14} />,
  crisis: <Heart size={14} />,
};

const CATEGORY_LABELS: Record<string, string> = {
  fact_check: "Fact-Checking",
  health: "Health & Mental Health",
  religion: "Religious Moderation",
  academic: "Academic Databases",
  crisis: "Crisis Resources",
};

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const [search, setSearch] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const filtered = search
    ? TOP_SOURCES.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()))
    : TOP_SOURCES;

  const grouped = filtered.reduce<Record<string, SourceEntry[]>>((acc, s) => {
    (acc[s.category] = acc[s.category] || []).push(s);
    return acc;
  }, {});

  return (
    <div
      ref={menuRef}
      className={`mega-menu ${isOpen ? "open" : ""}`}
      role="menu"
      aria-label="Trusted Sources Directory"
    >
      {/* Search */}
      <div style={{ marginBottom: 16, position: "relative" }}>
        <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
        <input
          type="text"
      placeholder={"Search sources... / ابحث في المصادر"}
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", padding: "10px 12px 10px 36px",
            borderRadius: "var(--radius-md)", border: "1px solid var(--border-primary)",
            background: "var(--bg-secondary)", fontSize: 14,
          }}
        />
      </div>

      {/* Columns */}
      <div className="mega-menu-columns">
        {Object.entries(grouped).map(([cat, sources]) => (
          <div key={cat}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>
              {CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat] || cat}
            </div>
            {sources.map(s => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "8px 10px", borderRadius: 8, fontSize: 13,
                  color: "var(--text-primary)", textDecoration: "none",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-secondary)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <span className={`badge trust-band-${s.trustBand.toLowerCase()}`} style={{ fontSize: 9, padding: "1px 6px" }}>{s.trustBand}</span>
                <span style={{ flex: 1 }}>{s.name}</span>
                <ExternalLink size={12} style={{ color: "var(--text-caption)" }} />
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * TRUSTED DIRECTORY QUICK ACCESS — Q78
 * Compact version for navbar — one-click access
 */
export function TrustedQuickAccess() {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen(p => !p), []);
  const { isRTL, t } = useRTL();
  const a = isRTL;

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={toggle}
        aria-expanded={open}
        aria-label="Quick access to trusted sources"
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "6px 12px", borderRadius: "var(--radius-full)",
          border: "1px solid var(--border-primary)", background: "transparent",
          cursor: "pointer", fontSize: 12, fontWeight: 600, color: "var(--text-secondary)",
        }}
      >
        <Shield size={14} /> {t({ en: "Sources", ar: "المصادر", arEG: "المصادر" })}
      </button>
      {open && <MegaMenu isOpen={open} onClose={() => setOpen(false)} />}
    </div>
  );
}
