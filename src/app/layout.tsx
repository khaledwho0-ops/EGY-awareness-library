/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { RTLProvider } from "@/components/shared/rtl-provider";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { ExploreHub } from "@/components/shared/explore-hub";
import { AuthInit } from "@/components/shared/auth-init";
import { QuarantineProvider } from "@/components/science/quarantine-provider";

/*
 * UX De-Distraction: 6 overlay components REMOVED
 * ─────────────────────────────────────────────────
 * 1. ScrollProgress — competing top bar, visual noise
 * 2. AxeDevtools — dev-only tool, console noise in production
 * 3. NarratorGuide — auto-opening tooltips on every page visit
 * 4. EngagementLayer — 30 behavioral hooks (fake users, XP toasts, gamification FAB)
 * 5. LiveAutopilot — demo controller FAB in bottom-left corner
 * 6. AIAssistant — floating chat bubble competing for attention
 *
 * Philosophy: Full focus on content, logic, and backend functionality.
 * The user should see the platform's actual value, not be distracted by
 * overlays, popups, toasts, fake social proof, or gamification noise.
 */

/**
 * Mobile-native viewport — Expert Method #4 (safe area insets)
 * + Method #8 (viewport-fit=cover for notched devices)
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

/**
 * Root Layout — Framework §14.2 + §25.6
 * 
 * SEO metadata from the exact project title (§1.1).
 * Wraps entire app in Theme + RTL providers.
 * Scroll progress indicator always visible.
 */
export const metadata: Metadata = {
  title: "Egyptian Awareness Library",
  description:
    "An integrated digital platform for building misinformation resilience, mental health literacy, and positive religious coping through evidence-based daily exercises. N=84 quasi-experimental pilot study targeting Egyptian university students.",
  keywords: [
    "misinformation resilience",
    "mental health literacy",
    "religious coping",
    "Egyptian university students",
    "DeepReal",
    "SIFT method",
    "Brief RCOPE",
    "MHLS",
    "MIST-20",
    "inoculation theory",
    "digital literacy",
    "COM-B model",
    "behavior change",
    "quasi-experimental design",
    "media literacy",
  ],
  authors: [{ name: "Egyptian Awareness Library Research Team" }],
  openGraph: {
    title: "Egyptian Awareness Library",
    description: "Evidence-based platform for misinformation resilience, mental health literacy & positive religious coping. 42 exercises × 3 MVPs × 14 days.",
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_EG",
    siteName: "Egyptian Awareness Library",
  },
  twitter: {
    card: "summary_large_image",
    title: "Egyptian Awareness Library",
    description: "Digital intervention platform: DeepReal + Mental Health + Religion Hub. N=84 pilot study.",
  },
  other: {
    "citation_title": "Egyptian Awareness Library: An Integrated Digital Intervention for Misinformation Resilience",
    "citation_author": "Egyptian Awareness Library Research Team",
    "dc.type": "InteractiveResource",
    "dc.subject": "Digital Literacy; Mental Health; Religious Coping; Behavior Change",
    "dc.format": "text/html",
    "dc.language": "en; ar",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" data-theme="bloodline" className="dark" suppressHydrationWarning>
      <head>
        {/* Preconnect to font services for performance */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Font imports — DESIGN.txt §5.2: Clash Display + Satoshi + Noto Kufi Arabic */}
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700,800&display=swap" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@300;400;500;600;700;800&display=swap" />
        {/* Q57: Noto Naskh Arabic for RTL body text */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap" />
        {/* Premium font additions — color-theory paired typography */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap" />
        {/* Q101: PWA manifest for offline + home screen install */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0066FF" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <RTLProvider>
            <QuarantineProvider>
              {/* Skip to content — §23.1 #9 Accessibility */}
            <a href="#main-content" className="skip-to-content">
              Skip to main content
            </a>

            {/* Auth + Progress Auto-Save Init */}
            <AuthInit />

            {/* Sticky Frosted Navbar — DESIGN.txt §4.1 */}
            <Navbar />

            {/* Main Content */}
            <main id="main-content">
              {children}
            </main>

            {/* Footer with Crisis Contacts — §28.9 */}
            <Footer />

            {/* Explore Hub — Full-screen page directory + live verification tools */}
            <ExploreHub />

            {/* Offline Service Worker Registration (§23.1 Addition #8) — production only */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  if ('serviceWorker' in navigator && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
                    window.addEventListener('load', function() {
                      navigator.serviceWorker.register('/sw.js').then(function(registration) {
                        console.log('EAL Offline Worker registered with scope:', registration.scope);
                      }, function(err) {
                        console.error('ServiceWorker registration failed:', err);
                      });
                    });
                  } else if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.getRegistrations().then(function(registrations) {
                      registrations.forEach(function(r) { r.unregister(); });
                    });
                  }
                `,
              }}
            />
            </QuarantineProvider>
          </RTLProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
