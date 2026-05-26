/* ═══════════════════════════════════════════════════════════════
 * /six-layers layout — Immersive mode
 * ═══════════════════════════════════════════════════════════════ */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'هندسة الخداع — ٦ طبقات | The Architecture of Deception',
  description:
    'اكتشف ٦ طبقات الخداع المعلوماتي — من الكذب المطلق إلى مصفوفة التلاعب. تجربة تفاعلية ثلاثية الأبعاد.',
};

export default function SixLayersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="six-layers-immersive">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* ═══ IMMERSIVE MODE — NUCLEAR WIDTH FIX ═══ */
            html { background: #000 !important; }
            body {
              background: transparent !important;
              overflow-x: hidden !important;
              overflow-y: auto !important;
              height: auto !important;
              width: 100vw !important;
              max-width: 100vw !important;
              margin: 0 !important;
              padding: 0 !important;
            }

            /* FORCE every wrapper to be 100vw to prevent shrink-to-fit left-alignment */
            #main-content,
            main,
            .six-layers-immersive,
            .six-layers-immersive > * {
              width: 100vw !important;
              max-width: 100vw !important;
              display: block !important;
            }

            /* Legacy wrapper targeting just in case */
            body > div,
            body > div > div,
            body > div > main {
              width: 100vw !important;
              max-width: 100vw !important;
              display: block !important;
            }

            /* FORCE mx-auto to actually center */
            .six-layers-immersive .max-w-6xl {
              margin-left: auto !important;
              margin-right: auto !important;
              float: none !important;
            }

            /* Hide all chrome */
            header, nav, footer,
            .navbar, .footer, .skip-to-content,
            [class*="Navbar"], [class*="navbar"],
            [class*="Footer"], [class*="footer"],
            body > div > nav, body > div > header, body > div > footer,
            body > div > div > nav, body > div > div > header, body > div > div > footer {
              display: none !important;
              height: 0 !important;
              overflow: hidden !important;
              pointer-events: none !important;
            }

            /* Kill the ExploreHub button */
            [aria-label="Explore All Pages"],
            [aria-label*="استكشف"],
            button[aria-label*="Explore"] {
              display: none !important;
              visibility: hidden !important;
              pointer-events: none !important;
              width: 0 !important;
              height: 0 !important;
              overflow: hidden !important;
              position: absolute !important;
              z-index: -9999 !important;
            }

            /* Thin scrollbar */
            ::-webkit-scrollbar { width: 3px; }
            ::-webkit-scrollbar-track { background: transparent; }
            ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }
          `,
        }}
      />
      {children}
    </div>
  );
}
