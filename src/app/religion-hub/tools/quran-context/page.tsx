'use client';
/* ═══════════════════════════════════════════════════════════════
 * /religion-hub/tools/quran-context — Coming Soon
 * ═══════════════════════════════════════════════════════════════ */

import Link from 'next/link';
import { useRTL } from '@/components/shared/rtl-provider';

export default function QuranContextPage() {
  const { isRTL, t } = useRTL();

  return (
    <div className="rtool-soon-page" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="rtool-soon-ambient" />
      <nav className="rtool-soon-nav">
        <Link href="/religion-hub/tools" className="rtool-soon-back">
          <span>{isRTL ? '→' : '←'}</span>
          {t({ en: 'Back to Tools', ar: 'العودة إلى الأدوات' })}
        </Link>
      </nav>
      <div className="rtool-soon-content">
        <div className="rtool-soon-icon">📖</div>
        <h1 className="rtool-soon-title">
          {t({ en: 'Quranic Verse Context Restorer', ar: 'مُعيد سياق الآيات القرآنية' })}
        </h1>
        <p className="rtool-soon-desc">
          {t({
            en: 'Restore the full context of Quranic verses used out of context. See the surrounding verses, occasion of revelation (Asbab al-Nuzul), and scholarly tafsir.',
            ar: 'أعد السياق الكامل للآيات القرآنية المستخدمة خارج سياقها. شاهد الآيات المحيطة وسبب النزول والتفسير العلمي.',
          })}
        </p>
        <div className="rtool-soon-badge">
          {t({ en: '◌ Coming Soon', ar: '◌ قريباً' })}
        </div>
        <div className="rtool-soon-geo" aria-hidden="true" />
      </div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700&family=Inter:wght@400;600;700;800&display=swap');
        .rtool-soon-page { position: relative; min-height: 100vh; background: #050510; color: #e0e0e0; font-family: 'Inter', sans-serif; overflow: hidden; }
        [dir="rtl"] .rtool-soon-page { font-family: 'IBM Plex Sans Arabic', 'Inter', sans-serif; }
        .rtool-soon-ambient { position: fixed; inset: 0; background: radial-gradient(ellipse at 50% 30%, rgba(212, 168, 67, 0.04) 0%, transparent 50%); pointer-events: none; }
        .rtool-soon-nav { position: relative; z-index: 10; padding: 1.5rem 2rem; }
        .rtool-soon-back { display: inline-flex; align-items: center; gap: 0.5rem; color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.875rem; transition: color 0.3s; }
        .rtool-soon-back:hover { color: #d4a843; }
        .rtool-soon-content { position: relative; z-index: 10; text-align: center; max-width: 550px; margin: 10vh auto 0; padding: 0 2rem; animation: rtoolFadeUp 0.8s ease-out; }
        .rtool-soon-icon { font-size: 4rem; margin-bottom: 1.5rem; }
        .rtool-soon-title { font-size: clamp(1.5rem, 4vw, 2rem); font-weight: 800; color: #fff; margin: 0 0 1rem; background: linear-gradient(135deg, #fff 30%, #d4a843); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .rtool-soon-desc { font-size: 0.95rem; line-height: 1.8; color: rgba(255,255,255,0.45); margin: 0 0 2rem; }
        .rtool-soon-badge { display: inline-block; padding: 0.5rem 1.5rem; border: 1px solid rgba(212, 168, 67, 0.2); border-radius: 999px; color: rgba(212, 168, 67, 0.6); font-size: 0.85rem; font-weight: 600; }
        .rtool-soon-geo { position: absolute; width: 200px; height: 200px; top: 50%; left: 50%; margin: -100px 0 0 -100px; border: 1px solid rgba(212, 168, 67, 0.04); transform: rotate(45deg); pointer-events: none; animation: rtoolSpin 60s linear infinite; }
        .rtool-soon-geo::before { content: ''; position: absolute; inset: 20%; border: 1px solid rgba(212, 168, 67, 0.03); transform: rotate(22.5deg); }
        @keyframes rtoolFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes rtoolSpin { from { transform: rotate(45deg); } to { transform: rotate(405deg); } }
      `}</style>
    </div>
  );
}
