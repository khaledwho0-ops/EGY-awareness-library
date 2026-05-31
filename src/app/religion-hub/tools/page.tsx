'use client';
/* ═══════════════════════════════════════════════════════════════
 * /religion-hub/tools — Religious Verification Tools Landing
 * 
 * Beautiful landing page with Islamic geometric patterns (CSS-only),
 * showcasing 5 religious verification tools.
 * ═══════════════════════════════════════════════════════════════ */

import Link from 'next/link';
import { useRTL } from '@/components/shared/rtl-provider';

/* ── Tool Data ─────────────────────────────────────────────── */

interface ToolCard {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  href: string;
  iconEmoji: string;
  status: 'active' | 'coming-soon';
}

const TOOLS: ToolCard[] = [
  {
    id: 'hadith-check',
    nameEn: 'Hadith Authenticity Checker',
    nameAr: 'مدقق صحة الأحاديث',
    descriptionEn: 'Verify the authenticity of hadiths using AI-powered narrator chain analysis. Get classification (Sahih, Hasan, Da\'if, Mawdu\'), source books, and scholar opinions.',
    descriptionAr: 'تحقق من صحة الأحاديث باستخدام تحليل سلسلة الرواة المدعوم بالذكاء الاصطناعي. احصل على التصنيف (صحيح، حسن، ضعيف، موضوع)، ومصادر الكتب، وآراء العلماء.',
    href: '/religion-hub/tools/hadith-check',
    iconEmoji: '📜',
    status: 'active',
  },
  {
    id: 'fatwa-context',
    nameEn: 'Fatwa Context Analyzer',
    nameAr: 'محلل سياق الفتوى',
    descriptionEn: 'Analyze fatwas in their proper scholarly and historical context. Understand the conditions, school of thought, and time period behind each ruling.',
    descriptionAr: 'حلل الفتاوى في سياقها العلمي والتاريخي الصحيح. افهم الشروط والمذهب والحقبة الزمنية وراء كل حكم.',
    href: '/religion-hub/tools/fatwa-context',
    iconEmoji: '⚖️',
    status: 'coming-soon',
  },
  {
    id: 'quran-context',
    nameEn: 'Quranic Verse Context Restorer',
    nameAr: 'مُعيد سياق الآيات القرآنية',
    descriptionEn: 'Restore the full context of Quranic verses used out of context. See the surrounding verses, occasion of revelation (Asbab al-Nuzul), and scholarly tafsir.',
    descriptionAr: 'أعد السياق الكامل للآيات القرآنية المستخدمة خارج سياقها. شاهد الآيات المحيطة وسبب النزول والتفسير العلمي.',
    href: '/religion-hub/tools/quran-context',
    iconEmoji: '📖',
    status: 'coming-soon',
  },
  {
    id: 'sectarian-detector',
    nameEn: 'Sectarian Claim Detector',
    nameAr: 'كاشف الادعاءات الطائفية',
    descriptionEn: 'Identify claims designed to divide Muslims along sectarian lines. Detects loaded language, historical distortions, and manufactured outrage.',
    descriptionAr: 'حدد الادعاءات المصممة لتقسيم المسلمين على أسس طائفية. يكشف اللغة المحملة والتشوهات التاريخية والغضب المُصنَّع.',
    href: '/religion-hub/tools/sectarian-detector',
    iconEmoji: '🛡️',
    status: 'coming-soon',
  },
  {
    id: 'authority-verifier',
    nameEn: 'Religious Authority Verifier',
    nameAr: 'مُتحقق السلطة الدينية',
    descriptionEn: 'Verify the credentials and scholarly consensus of religious authorities. Check if a speaker is recognized by established institutions and peer scholars.',
    descriptionAr: 'تحقق من مؤهلات وإجماع العلماء الدينيين. تحقق مما إذا كان المتحدث معترفاً به من المؤسسات الراسخة وأقرانه من العلماء.',
    href: '/religion-hub/tools/authority-verifier',
    iconEmoji: '🎓',
    status: 'coming-soon',
  },
];

/* ── Main Page ─────────────────────────────────────────────── */

export default function ReligionToolsPage() {
  const { isRTL, t } = useRTL();

  return (
    <div className="rtools-page" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Geometric Pattern Background */}
      <div className="rtools-pattern-bg" aria-hidden="true">
        <div className="rtools-geo rtools-geo--1" />
        <div className="rtools-geo rtools-geo--2" />
        <div className="rtools-geo rtools-geo--3" />
        <div className="rtools-geo rtools-geo--4" />
      </div>

      {/* Ambient Glow */}
      <div className="rtools-ambient" />

      {/* Navigation */}
      <nav className="rtools-nav">
        <Link href="/religion-hub" className="rtools-back-link">
          <span className="rtools-back-arrow">{isRTL ? '→' : '←'}</span>
          {t({ en: 'Religion Hub', ar: 'المحور الديني' })}
        </Link>
      </nav>

      {/* Header */}
      <header className="rtools-header">
        <div className="rtools-header-icon">🕌</div>
        <h1 className="rtools-title">
          {t({ en: 'Religious Verification Tools', ar: 'أدوات التحقق الديني' })}
        </h1>
        <p className="rtools-subtitle">
          {t({
            en: 'AI-powered tools to protect Islamic knowledge from distortion, fabrication, and weaponized misinformation.',
            ar: 'أدوات مدعومة بالذكاء الاصطناعي لحماية المعرفة الإسلامية من التحريف والتلفيق والتضليل المُسلح.',
          })}
        </p>
        <div className="rtools-disclaimer">
          {t({
            en: '⚠ These tools use AI to assist research. Always verify with qualified scholars and established sources.',
            ar: '⚠ هذه الأدوات تستخدم الذكاء الاصطناعي للمساعدة في البحث. تحقق دائماً مع العلماء المؤهلين والمصادر الموثقة.',
          })}
        </div>
      </header>

      {/* Tools Grid */}
      <section className="rtools-grid">
        {TOOLS.map((tool, i) => (
          <Link
            key={tool.id}
            href={tool.href}
            className={`rtools-card ${tool.status === 'coming-soon' ? 'rtools-card--soon' : ''}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Geometric Corner Decorations */}
            <div className="rtools-card-corner rtools-card-corner--tl" />
            <div className="rtools-card-corner rtools-card-corner--br" />

            <div className="rtools-card-icon">{tool.iconEmoji}</div>
            <h2 className="rtools-card-name">
              {t({ en: tool.nameEn, ar: tool.nameAr })}
            </h2>
            <p className="rtools-card-desc">
              {t({ en: tool.descriptionEn, ar: tool.descriptionAr })}
            </p>
            <div className="rtools-card-footer">
              {tool.status === 'active' ? (
                <span className="rtools-status rtools-status--active">
                  {t({ en: '● Active', ar: '● مُفعّل' })}
                </span>
              ) : (
                <span className="rtools-status rtools-status--soon">
                  {t({ en: '◌ Coming Soon', ar: '◌ قريباً' })}
                </span>
              )}
              <span className="rtools-card-arrow">{isRTL ? '←' : '→'}</span>
            </div>
          </Link>
        ))}
      </section>

      {/* Bottom Ornament */}
      <div className="rtools-bottom-ornament" aria-hidden="true">
        ✦ ✦ ✦
      </div>

      {/* Scoped Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap');

        .rtools-page {
          position: relative;
          min-height: 100vh;
          background: #050510;
          color: #e0e0e0;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
          padding-bottom: 4rem;
        }
        [dir="rtl"] .rtools-page {
          font-family: 'IBM Plex Sans Arabic', 'Inter', sans-serif;
        }

        /* ── Geometric Pattern Background (CSS-only) ───── */
        .rtools-pattern-bg {
          position: fixed; inset: 0;
          pointer-events: none; z-index: 0;
          overflow: hidden;
        }
        .rtools-geo {
          position: absolute;
          border: 1px solid rgba(212, 168, 67, 0.06);
          transform: rotate(45deg);
        }
        .rtools-geo--1 {
          width: 300px; height: 300px;
          top: -50px; right: -50px;
          border-width: 2px;
          border-color: rgba(212, 168, 67, 0.08);
          animation: rtools-spin 60s linear infinite;
        }
        .rtools-geo--2 {
          width: 200px; height: 200px;
          top: 30%; left: -40px;
          border-color: rgba(16, 185, 129, 0.06);
          animation: rtools-spin 45s linear infinite reverse;
        }
        .rtools-geo--3 {
          width: 160px; height: 160px;
          bottom: 15%; right: 10%;
          border-color: rgba(212, 168, 67, 0.05);
          animation: rtools-spin 50s linear infinite;
        }
        .rtools-geo--4 {
          width: 400px; height: 400px;
          top: 50%; left: 50%;
          margin-left: -200px; margin-top: -200px;
          border-color: rgba(255, 255, 255, 0.02);
          animation: rtools-spin 80s linear infinite reverse;
        }
        /* Inner squares (pseudo-elements for 8-pointed star) */
        .rtools-geo--1::before, .rtools-geo--3::before {
          content: '';
          position: absolute;
          inset: 15%;
          border: 1px solid rgba(212, 168, 67, 0.04);
          transform: rotate(22.5deg);
        }
        .rtools-geo--1::after, .rtools-geo--3::after {
          content: '';
          position: absolute;
          inset: 30%;
          border: 1px solid rgba(212, 168, 67, 0.03);
          transform: rotate(45deg);
        }

        @keyframes rtools-spin {
          from { transform: rotate(45deg); }
          to { transform: rotate(405deg); }
        }

        /* ── Ambient Glow ───────────────────────────────── */
        .rtools-ambient {
          position: fixed; inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(212, 168, 67, 0.06) 0%, transparent 50%),
                      radial-gradient(ellipse at 20% 100%, rgba(16, 185, 129, 0.04) 0%, transparent 40%);
          pointer-events: none; z-index: 0;
        }

        /* ── Navigation ─────────────────────────────────── */
        .rtools-nav {
          position: relative; z-index: 10;
          padding: 1.5rem 2rem;
        }
        .rtools-back-link {
          display: inline-flex; align-items: center; gap: 0.5rem;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: color 0.3s;
        }
        .rtools-back-link:hover { color: #d4a843; }
        .rtools-back-arrow { font-size: 1.1rem; }

        /* ── Header ──────────────────────────────────────── */
        .rtools-header {
          position: relative; z-index: 10;
          text-align: center;
          padding: 1rem 2rem 2.5rem;
          max-width: 700px;
          margin: 0 auto;
          animation: rtools-fadeUp 0.8s ease-out;
        }
        .rtools-header-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          filter: drop-shadow(0 0 20px rgba(212, 168, 67, 0.3));
        }
        .rtools-title {
          font-size: clamp(1.8rem, 5vw, 2.5rem);
          font-weight: 800;
          color: #fff;
          margin: 0 0 1rem;
          background: linear-gradient(135deg, #fff 30%, #d4a843 70%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
        }
        .rtools-subtitle {
          font-size: 1rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.55);
          max-width: 580px;
          margin: 0 auto 1.5rem;
        }
        .rtools-disclaimer {
          display: inline-block;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.35);
          background: rgba(212, 168, 67, 0.06);
          border: 1px solid rgba(212, 168, 67, 0.12);
          border-radius: 8px;
          padding: 0.6rem 1rem;
          line-height: 1.5;
        }

        /* ── Tools Grid ──────────────────────────────────── */
        .rtools-grid {
          position: relative; z-index: 10;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 1.25rem;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* ── Tool Card ───────────────────────────────────── */
        .rtools-card {
          position: relative;
          display: block;
          text-decoration: none;
          color: inherit;
          background: rgba(212, 168, 67, 0.03);
          border: 1px solid rgba(212, 168, 67, 0.12);
          border-radius: 16px;
          padding: 1.75rem;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          overflow: hidden;
          animation: rtools-fadeUp 0.6s ease-out backwards;
        }
        .rtools-card:hover {
          border-color: rgba(212, 168, 67, 0.35);
          background: rgba(212, 168, 67, 0.07);
          box-shadow: 0 0 40px rgba(212, 168, 67, 0.08);
          transform: translateY(-4px);
        }
        .rtools-card--soon {
          opacity: 0.7;
        }
        .rtools-card--soon:hover {
          opacity: 0.85;
        }

        /* Corner decorations (Islamic geometric feel) */
        .rtools-card-corner {
          position: absolute;
          width: 24px; height: 24px;
          border: 1px solid rgba(212, 168, 67, 0.15);
          transform: rotate(45deg);
          pointer-events: none;
        }
        .rtools-card-corner--tl { top: -6px; left: -6px; }
        [dir="rtl"] .rtools-card-corner--tl { left: auto; right: -6px; }
        .rtools-card-corner--br { bottom: -6px; right: -6px; }
        [dir="rtl"] .rtools-card-corner--br { right: auto; left: -6px; }

        .rtools-card-icon {
          font-size: 2rem;
          margin-bottom: 0.75rem;
        }
        .rtools-card-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 0.6rem;
          line-height: 1.3;
        }
        .rtools-card-desc {
          font-size: 0.88rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.5);
          margin: 0 0 1rem;
        }
        .rtools-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* Status badges */
        .rtools-status {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        .rtools-status--active {
          color: #10b981;
        }
        .rtools-status--soon {
          color: rgba(255,255,255,0.3);
        }
        .rtools-card-arrow {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.2);
          transition: color 0.3s, transform 0.3s;
        }
        .rtools-card:hover .rtools-card-arrow {
          color: #d4a843;
          transform: translateX(4px);
        }
        [dir="rtl"] .rtools-card:hover .rtools-card-arrow {
          transform: translateX(-4px);
        }

        /* ── Bottom Ornament ──────────────────────────────── */
        .rtools-bottom-ornament {
          position: relative; z-index: 10;
          text-align: center;
          padding: 3rem 0;
          color: rgba(212, 168, 67, 0.15);
          font-size: 1.2rem;
          letter-spacing: 1rem;
        }

        /* ── Animations ──────────────────────────────────── */
        @keyframes rtools-fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive ──────────────────────────────────── */
        @media (max-width: 640px) {
          .rtools-grid { grid-template-columns: 1fr; padding: 0 1rem; }
          .rtools-header { padding: 1rem 1rem 2rem; }
          .rtools-card { padding: 1.25rem; }
        }
      `}</style>
    </div>
  );
}
