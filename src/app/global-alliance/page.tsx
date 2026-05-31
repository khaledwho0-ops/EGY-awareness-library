'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Globe2, Shield, CheckCircle2 } from 'lucide-react';
import { organizations, type OrgCategory, type OrgRegion, type Organization } from '@/data/organizations';

/* ─────────────────────────────────────────────────────────
   COLOR SYSTEM
───────────────────────────────────────────────────────── */
const C = {
  bg: '#05010A',
  surface: '#110818',
  surfaceHigh: '#1A0F24',
  border: 'rgba(255,255,255,0.06)',
  primary: '#C2185B',
  primaryGlow: 'rgba(194,24,91,0.35)',
  primaryDeep: '#6B0F1A',
  violet: '#7B1FA2',
  violetGlow: 'rgba(123,31,162,0.3)',
  azure: '#1976D2',
  ice: '#80DEEA',
  success: '#26A69A',
  amber: '#FF8F00',
  textPrimary: '#F5EEF8',
  textMuted: '#9E8FA8',
  textSubtle: '#5C4A6B',
};

const CATEGORY_CONFIG: Record<OrgCategory, { color: string; label: string; emoji: string }> = {
  'fact-checking': { color: '#00BCD4', label: 'Fact-Checking', emoji: '✓' },
  'media-literacy': { color: '#FF9800', label: 'Media Literacy', emoji: '📰' },
  'ai-ethics': { color: '#E040FB', label: 'AI Ethics', emoji: '🤖' },
  'religious-literacy': { color: '#8BC34A', label: 'Religious Literacy', emoji: '📖' },
  'mental-health': { color: '#F44336', label: 'Mental Health', emoji: '🧠' },
  'osint': { color: '#448AFF', label: 'OSINT', emoji: '🔎' },
  'academic': { color: '#FFEB3B', label: 'Academic', emoji: '🎓' },
  'digital-rights': { color: '#26A69A', label: 'Digital Rights', emoji: '🔒' },
};

const REGION_CONFIG: Record<OrgRegion, { label: string; emoji: string }> = {
  'middle-east': { label: 'Middle East', emoji: '🌍' },
  'europe': { label: 'Europe', emoji: '🇪🇺' },
  'americas': { label: 'Americas', emoji: '🌎' },
  'asia': { label: 'Asia', emoji: '🌏' },
  'africa': { label: 'Africa', emoji: '🌍' },
  'global': { label: 'Global', emoji: '🌐' },
};

const COUNTRY_FLAGS: Record<string, string> = {
  'United States': '🇺🇸',
  'United Kingdom': '🇬🇧',
  'France': '🇫🇷',
  'Germany': '🇩🇪',
  'Netherlands': '🇳🇱',
  'Spain': '🇪🇸',
  'Portugal': '🇵🇹',
  'Egypt': '🇪🇬',
  'United Arab Emirates': '🇦🇪',
  'Jordan': '🇯🇴',
  'Syria': '🇸🇾',
  'Lebanon': '🇱🇧',
  'South Africa': '🇿🇦',
  'Nigeria': '🇳🇬',
  'India': '🇮🇳',
  'Pakistan': '🇵🇰',
  'Canada': '🇨🇦',
  'Australia': '🇦🇺',
};

const fBase = { fontFamily: "'Inter', system-ui, sans-serif" };
const fArabic = { fontFamily: "'IBM Plex Sans Arabic', 'Cairo', sans-serif" };

/* ═══════════════════════════════════════════════════════════
   GLOBAL ALLIANCE PAGE
═══════════════════════════════════════════════════════════ */
export default function GlobalAlliancePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<OrgCategory | 'all'>('all');
  const [selectedRegion, setSelectedRegion] = useState<OrgRegion | 'all'>('all');

  // Compute stats
  const stats = useMemo(() => {
    const countries = new Set(organizations.map((o) => o.country));
    const categories = new Set(organizations.map((o) => o.category));
    return {
      total: organizations.length,
      countries: countries.size,
      categories: categories.size,
    };
  }, []);

  // Filter organizations
  const filteredOrgs = useMemo(() => {
    return organizations.filter((org) => {
      const matchesSearch =
        !searchQuery ||
        org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (org.nameAr && org.nameAr.includes(searchQuery)) ||
        org.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.country.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || org.category === selectedCategory;
      const matchesRegion = selectedRegion === 'all' || org.region === selectedRegion;

      return matchesSearch && matchesCategory && matchesRegion;
    });
  }, [searchQuery, selectedCategory, selectedRegion]);

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden relative"
      style={{
        ...fBase,
        background: `radial-gradient(ellipse 80% 50% at 50% -10%, ${C.violet}33 0%, transparent 70%), ${C.bg}`,
        color: C.textPrimary,
      }}
    >
      {/* ── Atmospheric Background ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[20%] -right-[15%] w-[60vw] h-[60vw] max-w-[900px] rounded-full"
          style={{ background: `radial-gradient(circle, ${C.azure}, transparent 70%)`, filter: 'blur(120px)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
          className="absolute -bottom-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[700px] rounded-full"
          style={{ background: `radial-gradient(circle, ${C.violet}, transparent 70%)`, filter: 'blur(100px)' }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-8 pt-16 pb-32">
        {/* ══ HERO SECTION ══ */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8"
            style={{
              background: `linear-gradient(135deg, ${C.azure}30, ${C.violet}40)`,
              border: `1px solid ${C.azure}40`,
              backdropFilter: 'blur(20px)',
              boxShadow: `0 0 24px ${C.violetGlow}`,
            }}
          >
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
              <Globe2 size={16} style={{ color: C.ice }} />
            </motion.div>
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: C.ice }}>
              {stats.total} Organizations Worldwide
            </span>
          </motion.div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-none mb-5"
            style={{
              letterSpacing: '-0.04em',
              background: `linear-gradient(135deg, ${C.textPrimary} 0%, ${C.azure} 40%, ${C.violet} 70%, ${C.ice} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: `drop-shadow(0 0 40px ${C.violetGlow})`,
            }}
          >
            Global Alliance
          </h1>
          <h2
            className="text-xl sm:text-2xl font-medium mb-4"
            style={{ color: `${C.textMuted}DD` }}
          >
            Against Misinformation
          </h2>
          <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: C.textMuted }}>
            A curated directory of verified organizations fighting misinformation, promoting media literacy,
            and defending truth around the world.
          </p>
          <p className="text-base mt-2" dir="rtl" style={{ ...fArabic, color: `${C.textMuted}90` }}>
            تحالف عالمي ضد المعلومات المضللة
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-10"
          >
            {[
              { value: stats.total, label: 'Organizations', icon: <Shield size={16} /> },
              { value: stats.countries, label: 'Countries', icon: <Globe2 size={16} /> },
              { value: stats.categories, label: 'Categories', icon: <CheckCircle2 size={16} /> },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span style={{ color: C.ice }}>{stat.icon}</span>
                  <span className="text-3xl sm:text-4xl font-black" style={{ color: C.textPrimary }}>
                    {stat.value}
                  </span>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.textSubtle }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.header>

        {/* ══ SEARCH BAR ══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: '20px',
              background: `linear-gradient(160deg, ${C.surfaceHigh}, ${C.surface})`,
              border: `1px solid ${C.border}`,
              backdropFilter: 'blur(40px)',
              boxShadow: `0 8px 32px rgba(0,0,0,0.4)`,
            }}
          >
            <div className="flex items-center gap-3 px-6 py-4">
              <Search size={20} style={{ color: C.textSubtle }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search organizations, countries, or topics..."
                dir="auto"
                className="flex-1 bg-transparent focus:outline-none text-base font-medium"
                style={{
                  fontFamily: searchQuery.match(/[\u0600-\u06FF]/)
                    ? "'IBM Plex Sans Arabic', sans-serif"
                    : "'Inter', sans-serif",
                  color: C.textPrimary,
                }}
              />
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ background: `${C.textSubtle}30`, color: C.textMuted }}
                >
                  Clear
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* ══ FILTER BUTTONS ══ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-10 space-y-5"
        >
          {/* Categories */}
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: C.textSubtle }}>
              Category
            </div>
            <div className="flex flex-wrap gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory('all')}
                className="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200"
                style={{
                  background: selectedCategory === 'all' ? `${C.primary}30` : `${C.surface}CC`,
                  border: `1px solid ${selectedCategory === 'all' ? C.primary + '60' : C.border}`,
                  color: selectedCategory === 'all' ? C.primary : C.textMuted,
                }}
              >
                All Categories
              </motion.button>
              {(Object.keys(CATEGORY_CONFIG) as OrgCategory[]).map((cat) => {
                const cfg = CATEGORY_CONFIG[cat];
                const isActive = selectedCategory === cat;
                return (
                  <motion.button
                    key={cat}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(isActive ? 'all' : cat)}
                    className="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200"
                    style={{
                      background: isActive ? `${cfg.color}25` : `${C.surface}CC`,
                      border: `1px solid ${isActive ? cfg.color + '60' : C.border}`,
                      color: isActive ? cfg.color : C.textMuted,
                    }}
                  >
                    {cfg.emoji} {cfg.label}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Regions */}
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: C.textSubtle }}>
              Region
            </div>
            <div className="flex flex-wrap gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedRegion('all')}
                className="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200"
                style={{
                  background: selectedRegion === 'all' ? `${C.azure}25` : `${C.surface}CC`,
                  border: `1px solid ${selectedRegion === 'all' ? C.azure + '60' : C.border}`,
                  color: selectedRegion === 'all' ? C.azure : C.textMuted,
                }}
              >
                All Regions
              </motion.button>
              {(Object.keys(REGION_CONFIG) as OrgRegion[]).map((reg) => {
                const cfg = REGION_CONFIG[reg];
                const isActive = selectedRegion === reg;
                return (
                  <motion.button
                    key={reg}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedRegion(isActive ? 'all' : reg)}
                    className="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200"
                    style={{
                      background: isActive ? `${C.azure}25` : `${C.surface}CC`,
                      border: `1px solid ${isActive ? C.azure + '60' : C.border}`,
                      color: isActive ? C.azure : C.textMuted,
                    }}
                  >
                    {cfg.emoji} {cfg.label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Results count ── */}
        <div className="mb-6 text-sm font-semibold" style={{ color: C.textSubtle }}>
          Showing {filteredOrgs.length} of {organizations.length} organizations
        </div>

        {/* ══ ORGANIZATION CARDS GRID ══ */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredOrgs.map((org) => (
              <OrgCard key={org.id} org={org} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredOrgs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2" style={{ color: C.textMuted }}>
              No organizations found
            </h3>
            <p className="text-sm" style={{ color: C.textSubtle }}>
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ORGANIZATION CARD COMPONENT
═══════════════════════════════════════════════════════════ */
function OrgCard({ org }: { org: Organization }) {
  const catCfg = CATEGORY_CONFIG[org.category];
  const flag = COUNTRY_FLAGS[org.country] || '🌐';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative rounded-[22px] overflow-hidden group"
      style={{
        background: `linear-gradient(160deg, ${C.surfaceHigh}, ${C.surface}ee)`,
        border: `1px solid ${catCfg.color}15`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)`,
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Top shimmer */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent 10%, ${catCfg.color}30, transparent 90%)` }}
      />

      {/* Hover glow */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${catCfg.color}10, transparent 70%)` }}
      />

      <div className="relative p-6">
        {/* Header row: flag + name + verified */}
        <div className="flex items-start gap-3 mb-4">
          <span className="text-2xl shrink-0">{flag}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold leading-snug truncate" style={{ color: C.textPrimary }}>
                {org.name}
              </h3>
              {org.isVerified && (
                <CheckCircle2
                  size={14}
                  className="shrink-0"
                  style={{ color: C.success }}
                />
              )}
            </div>
            {org.nameAr && (
              <p
                className="text-sm mt-0.5 truncate"
                dir="rtl"
                style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", color: `${C.textMuted}BB` }}
              >
                {org.nameAr}
              </p>
            )}
          </div>
        </div>

        {/* Category badge + country */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span
            className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{
              background: `${catCfg.color}15`,
              border: `1px solid ${catCfg.color}30`,
              color: catCfg.color,
            }}
          >
            {catCfg.emoji} {catCfg.label}
          </span>
          <span className="text-[11px] font-medium" style={{ color: C.textSubtle }}>
            {org.country}
          </span>
          {org.founded && (
            <span className="text-[11px]" style={{ color: C.textSubtle }}>
              · Est. {org.founded}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed mb-5" style={{ color: C.textMuted }}>
          {org.description}
        </p>

        {/* Languages */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {org.languages.map((lang) => (
            <span
              key={lang}
              className="px-2 py-0.5 rounded text-[10px] font-medium"
              style={{ background: `${C.textSubtle}20`, color: C.textSubtle }}
            >
              {lang}
            </span>
          ))}
        </div>

        {/* Website link */}
        <a
          href={org.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-200 group/link"
          style={{
            background: `${catCfg.color}10`,
            border: `1px solid ${catCfg.color}25`,
            color: catCfg.color,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `${catCfg.color}25`;
            e.currentTarget.style.borderColor = `${catCfg.color}50`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = `${catCfg.color}10`;
            e.currentTarget.style.borderColor = `${catCfg.color}25`;
          }}
        >
          <ExternalLink size={12} />
          Visit Website
        </a>
      </div>
    </motion.div>
  );
}
