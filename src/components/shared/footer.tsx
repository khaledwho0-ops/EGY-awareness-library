"use client";

import Link from "next/link";
import {
  Phone,
  Globe,
  AlertTriangle,
  ShieldCheck,
  HeartPulse,
  Sparkles,
  BookOpen,
  ExternalLink,
  Flame,
  Bot,
  Search,
} from "lucide-react";
import {
  EGYPT_CRISIS_CONTACTS,
  MOHP_MENTAL_HEALTH_PLATFORM_URL,
} from "@/data/directory/official-support";
import { useRTL } from "./rtl-provider";
import { NAV, FOOTER, s } from "@/data/i18n/site-strings";

export function Footer() {
  const { isRTL, language, t } = useRTL();
  const a = isRTL;
  const lang = language;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";

  return (
    <footer
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-primary)",
        padding: "var(--space-3xl) 0 var(--space-xl)",
        paddingBottom: "calc(var(--space-xl) + env(safe-area-inset-bottom))",
      }}
    >
      <div className="container">
        <div className="crisis-panel mb-8" id="crisis-contacts">
          <div className="flex items-start gap-3 mb-3">
            <AlertTriangle size={20} style={{ color: "var(--color-danger)", marginTop: 2, flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3, fontFamily: ff }}>
                {t({ en: "Emergency & Support Contacts", ar: "جهات اتصال الطوارئ والدعم", arEG: "جهات اتصال الطوارئ والدعم" })}
              </h4>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: 2, lineHeight: 1.5, fontFamily: ff }}>
                {t({ en: "If you or someone you know is in crisis, please reach out immediately.", ar: "إذا كنت أنت أو شخص تعرفه في أزمة، يرجى التواصل فوراً.", arEG: "لو إنت أو حد تعرفه في أزمة، تواصل فوراً." })}
              </p>
            </div>
          </div>
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            <div className="flex items-center gap-2" style={{ fontSize: "14px" }}>
              <Phone size={14} style={{ color: "var(--color-danger)" }} />
              <span style={{ color: "var(--text-secondary)" }}>{t({ en: "Mental Health Hotline:", ar: "خط الصحة النفسية:", arEG: "خط الصحة النفسية:" })}</span>
              <a href={`tel:${EGYPT_CRISIS_CONTACTS.mentalHealthShortCode}`} style={{ color: "var(--color-danger)", fontWeight: 700 }}>{EGYPT_CRISIS_CONTACTS.mentalHealthShortCode}</a>
            </div>
            <div className="flex items-center gap-2" style={{ fontSize: "14px" }}>
              <Phone size={14} style={{ color: "var(--color-danger)" }} />
              <span style={{ color: "var(--text-secondary)" }}>{t({ en: "Backup Hotline:", ar: "خط احتياطي:", arEG: "خط احتياطي:" })}</span>
              <a href={`tel:${EGYPT_CRISIS_CONTACTS.mentalHealthTollFree}`} style={{ color: "var(--color-danger)", fontWeight: 700 }}>{EGYPT_CRISIS_CONTACTS.mentalHealthTollFree}</a>
            </div>
            <div className="flex items-center gap-2" style={{ fontSize: "14px" }}>
              <Phone size={14} style={{ color: "var(--color-danger)" }} />
              <span style={{ color: "var(--text-secondary)" }}>{t({ en: "Ambulance:", ar: "الإسعاف:", arEG: "الإسعاف:" })}</span>
              <a href={`tel:${EGYPT_CRISIS_CONTACTS.ambulance}`} style={{ color: "var(--color-danger)", fontWeight: 700 }}>{EGYPT_CRISIS_CONTACTS.ambulance}</a>
            </div>
            <div className="flex items-center gap-2" style={{ fontSize: "14px" }}>
              <Globe size={14} style={{ color: "var(--color-danger)" }} />
              <span style={{ color: "var(--text-secondary)" }}>{t({ en: "MoHP Platform:", ar: "منصة وزارة الصحة:", arEG: "منصة وزارة الصحة:" })}</span>
              <a
                href={MOHP_MENTAL_HEALTH_PLATFORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-danger)", fontWeight: 700 }}
                className="flex items-center gap-1"
              >
                mentalhealth.mohp.gov.eg <ExternalLink size={11} />
              </a>
            </div>
            <div className="flex items-center gap-2" style={{ fontSize: "14px" }}>
              <Phone size={14} style={{ color: "var(--accent-religionhub)" }} />
              <span style={{ color: "var(--text-secondary)" }}>{t({ en: "Dar al-Ifta:", ar: "دار الإفتاء:", arEG: "دار الإفتاء:" })}</span>
              <a href={`tel:${EGYPT_CRISIS_CONTACTS.darAlIfta}`} style={{ color: "var(--accent-religionhub)", fontWeight: 700 }}>{EGYPT_CRISIS_CONTACTS.darAlIfta}</a>
            </div>
          </div>
        </div>

        <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={20} style={{ color: "var(--accent-cta)" }} />
              <span
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "var(--text-primary)",
                }}
              >
                {t({ en: "Egyptian Awareness Library", ar: "مكتبة الوعي المصرية", arEG: "مكتبة الوعي المصرية" })}
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, maxWidth: "280px", fontFamily: ff }}>
              {t({ en: "An integrated digital platform for building misinformation resilience, mental health literacy, and positive religious coping through evidence-based daily exercises.", ar: "منصة رقمية متكاملة لبناء مقاومة المعلومات المضللة ومحو الأمية في الصحة النفسية والتكيف الديني الإيجابي من خلال تمارين يومية قائمة على الأدلة.", arEG: "منصة رقمية متكاملة لبناء مقاومة المعلومات المضللة ومحو الأمية في الصحة النفسية والتكيف الديني الإيجابي من خلال تمارين يومية قائمة على الأدلة." })}
            </p>
          </div>

          <div>
            <h5 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "12px" }}>
              {s(FOOTER.engines, lang)}
            </h5>
            <div className="flex flex-col gap-2">
              <Link href="/deepreal" className="flex items-center gap-2 text-sm no-underline transition-colors duration-200" style={{ color: "var(--text-secondary)" }}>
                <ShieldCheck size={14} style={{ color: "var(--accent-deepreal)" }} /> {s(NAV.deepreal, lang)}
              </Link>
              <Link href="/mental-health" className="flex items-center gap-2 text-sm no-underline transition-colors duration-200" style={{ color: "var(--text-secondary)" }}>
                <HeartPulse size={14} style={{ color: "var(--accent-mentalhealth)" }} /> {s(NAV.mentalHealth, lang)}
              </Link>
              <Link href="/religion-hub" className="flex items-center gap-2 text-sm no-underline transition-colors duration-200" style={{ color: "var(--text-secondary)" }}>
                <Sparkles size={14} style={{ color: "var(--accent-religionhub)" }} /> {s(NAV.religionHub, lang)}
              </Link>
            </div>
          </div>

          <div>
            <h5 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "12px" }}>
              {t({ en: "Powers", ar: "الأسلحة", arEG: "الأسلحة" })}
            </h5>
            <div className="flex flex-col gap-2">
              <Link href="/angry-debunkers" className="flex items-center gap-2 text-sm no-underline transition-colors duration-200" style={{ color: "var(--text-secondary)" }}>
                <Flame size={14} style={{ color: "#C2185B" }} /> {t({ en: "Angry Debunkers", ar: "المفنّدون الغاضبون", arEG: "المفنّدون الغاضبون" })}
              </Link>
              <Link href="/ai-agents" className="flex items-center gap-2 text-sm no-underline transition-colors duration-200" style={{ color: "var(--text-secondary)" }}>
                <Bot size={14} style={{ color: "#1976D2" }} /> {t({ en: "AI Agents", ar: "فريق التحقيق", arEG: "فريق التحقيق" })}
              </Link>
              <Link href="/global-alliance" className="flex items-center gap-2 text-sm no-underline transition-colors duration-200" style={{ color: "var(--text-secondary)" }}>
                <Globe size={14} style={{ color: "#10B981" }} /> {t({ en: "Global Alliance", ar: "التحالف العالمي", arEG: "التحالف العالمي" })}
              </Link>
              <Link href="/religion-hub/tools" className="flex items-center gap-2 text-sm no-underline transition-colors duration-200" style={{ color: "var(--text-secondary)" }}>
                <Sparkles size={14} style={{ color: "#D4A843" }} /> {t({ en: "Islamic Verification", ar: "التحقق الإسلامي", arEG: "التحقق الإسلامي" })}
              </Link>
              <Link href="/osint-investigator" className="flex items-center gap-2 text-sm no-underline transition-colors duration-200" style={{ color: "var(--text-secondary)" }}>
                <Search size={14} style={{ color: "#78909C" }} /> {t({ en: "OSINT Investigator", ar: "محقق المصادر", arEG: "محقق المصادر" })}
              </Link>
            </div>
          </div>

          <div>
            <h5 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "12px" }}>
              {s(FOOTER.resources, lang)}
            </h5>
            <div className="flex flex-col gap-2">
              <Link href="/dashboard" className="text-sm no-underline" style={{ color: "var(--text-secondary)" }}>{s(NAV.dashboard, lang)}</Link>
              <Link href="/assessment" className="text-sm no-underline" style={{ color: "var(--text-secondary)" }}>{s(NAV.assessment, lang)}</Link>
              <Link href="/about" className="text-sm no-underline" style={{ color: "var(--text-secondary)" }}>{s(NAV.about, lang)}</Link>
            </div>
          </div>

          <div>
            <h5 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "12px" }}>
              {t({ en: "Important Notice", ar: "ملاحظة مهمة", arEG: "ملاحظة مهمة" })}
            </h5>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.6, fontFamily: ff }}>
              {a ? (
                <>هذه المنصة <strong>تعليمية فقط</strong>. لا تشخص أو تعالج أو تقدم نصائح طبية أو نفسية أو لاهوتية مهنية. لحالات الطوارئ، اتصل بالخدمات المذكورة أعلاه.</>
              ) : (
                <>This platform is <strong>educational only</strong>. It does not diagnose, treat, or provide professional medical, psychological, or theological advice. For emergencies, contact the services listed above.</>
              )}
            </p>
          </div>
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6"
          style={{
            borderTop: "1px solid var(--border-primary)",
            fontSize: "12px",
            color: "var(--text-caption)",
          }}
        >
          <span style={{ fontFamily: ff }}>© {new Date().getFullYear()} {t({ en: "Egyptian Awareness Library. Graduation Research Project.", ar: "مكتبة الوعي المصرية. مشروع بحث التخرج.", arEG: "مكتبة الوعي المصرية. مشروع بحث التخرج." })}</span>
          <span style={{ fontFamily: ff }}>{t({ en: "Built on source tracing, evidence audits, and reviewable operational routes.", ar: "مبني على تتبع المصادر، وتدقيق الأدلة، ومسارات تشغيلية قابلة للمراجعة.", arEG: "مبني على تتبع المصادر وتدقيق الأدلة ومسارات عملية تقدر تراجعها." })}</span>
        </div>
      </div>
    </footer>
  );
}
