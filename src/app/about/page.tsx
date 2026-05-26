"use client";

import { useState } from "react";
import { EvidenceDisambiguation } from "@/components/shared/provenance-box";
import { DefenseLibrary } from "@/components/shared/defense-library";
import { FrameworkCoverage } from "@/components/shared/framework-coverage";
import { useRTL } from "@/components/shared/rtl-provider";
import { ABOUT, s } from "@/data/i18n/site-strings";

/**
 * ABOUT PAGE — §9 (Competitive Analysis), §12 (Original Contribution), §25 (MVP Identity)
 * Surfaces academic rigor, competitive positioning, and evidence types.
 */

// §1.0 Team & Institution Identity
const TEAM_MEMBERS = [
  { code: "12025037", name: "زیاد فطین کمال", nameEn: "Ziad Fatein Kamal", department: "IT", role: { en: "Lead Developer & System Architect", ar: "المطور الرئيسي ومهندس النظام" } },
  { code: "12025119", name: "ياسمين محمد العربي", nameEn: "Yasmine Mohamed El-Araby", department: "IT", role: { en: "Research & Content Design", ar: "البحث وتصميم المحتوى" } },
  { code: "12025131", name: "خالد سید حامد", nameEn: "Khaled Sayed Hamed", department: "IT", role: { en: "Data & Assessment Integration", ar: "البيانات وتكامل التقييم" } },
  { code: "12025033", name: "دنيا علي شرابي", nameEn: "Donia Ali Sharaby", department: "IT", role: { en: "UX Design & Localization", ar: "تصميم تجربة المستخدم والتعريب" } },
  { code: "", name: "محمد شریف", nameEn: "Mohamed Sherif", department: "IT", role: { en: "Quality Assurance & Testing", ar: "ضمان الجودة والاختبار" } },
];

const INSTITUTION = {
  nameAr: "المعهد التكنولوجي العالي بهليوبوليس الجديدة",
  nameEn: "Higher Technology Institute in New Heliopolis",
  ministryAr: "وزارة التعليم العالي والبحث العلمي",
  ministryEn: "Ministry of Higher Education and Scientific Research",
  courseAr: "مادة ريادة الأعمال",
  courseEn: "Entrepreneurship Course",
  supervisorAr: "د. وائل الهلالي",
  supervisorEn: "Dr. Wael Al-Hilali",
  email: "info@eal.edu.eg",
  phone: "+20 1200009061",
  address: { en: "New Heliopolis, North 3rd District, Service Area (A), Plot 2", ar: "هليوبوليس الجديدة، شمال الحي الثالث خدمات (A) قطعة 2" },
  platforms: [
    { label: "EAL v2 (Latest)", url: "https://eal-v2-latest.vercel.app" },
    { label: "Egyptian Awareness Library", url: "https://egyptian-awareness-library.vercel.app" },
  ],
};

// §9.1 Competitive analysis data
const COMPETITORS = [
  { name: "Bad News Game", domain: { en: "Misinformation", ar: "المعلومات المضللة" }, strengths: { en: "Scientifically validated, engaging, free", ar: "مُحقق علمياً، جذاب، مجاني" }, weaknesses: { en: "Single-session only, no daily structure, no Arabic", ar: "جلسة واحدة فقط، لا بنية يومية، لا عربي" }, gap: { en: "Sustained daily practice + Arabic + multi-domain", ar: "ممارسة يومية مستدامة + عربي + متعدد المجالات" } },
  { name: "Go Viral!", domain: { en: "COVID misinfo", ar: "معلومات كوفيد المضللة" }, strengths: { en: "Quick, validated", ar: "سريع، مُحقق" }, weaknesses: { en: "COVID-specific only, not generalizable", ar: "خاص بكوفيد فقط، غير قابل للتعميم" }, gap: { en: "Broader misinformation coverage", ar: "تغطية أوسع للمعلومات المضللة" } },
  { name: "Google Prebunking", domain: { en: "Misinfo resilience", ar: "مقاومة المعلومات المضللة" }, strengths: { en: "Massive scale, backed by Google", ar: "نطاق ضخم، مدعوم من جوجل" }, weaknesses: { en: "Passive (video), no active exercises, no tracking", ar: "سلبي (فيديو)، لا تمارين نشطة، لا تتبع" }, gap: { en: "Active exercise-based learning with outcomes", ar: "تعلم نشط قائم على التمارين مع نتائج" } },
  { name: "Headspace / Calm", domain: { en: "Mental health", ar: "الصحة النفسية" }, strengths: { en: "High quality, well designed", ar: "جودة عالية، تصميم جيد" }, weaknesses: { en: "NOT literacy; focuses on relaxation, not knowledge", ar: "ليس محو أمية؛ يركز على الاسترخاء لا المعرفة" }, gap: { en: "Mental health LITERACY, not mindfulness", ar: "محو أمية الصحة النفسية، ليس التأمل" } },
  { name: "Wysa / Woebot", domain: { en: "Mental health", ar: "الصحة النفسية" }, strengths: { en: "Accessible, 24/7", ar: "متاح، 24/7" }, weaknesses: { en: "NOT literacy; therapy-lite; safety concerns", ar: "ليس محو أمية؛ علاج مخفف؛ مخاوف سلامة" }, gap: { en: "Educational focus with clear boundaries", ar: "تركيز تعليمي بحدود واضحة" } },
  { name: "Faithlife / Muslim Pro", domain: { en: "Religion", ar: "الدين" }, strengths: { en: "Functional, widely used", ar: "عملي، مستخدم على نطاق واسع" }, weaknesses: { en: "NOT wellbeing or coping; no evidence-based exercises", ar: "ليس رفاهية أو تكيف؛ لا تمارين قائمة على الأدلة" }, gap: { en: "Religion as WELLBEING resource", ar: "الدين كمورد للرفاهية" } },
  { name: { en: "iCBT platforms", ar: "منصات iCBT" }, domain: { en: "Mental health", ar: "الصحة النفسية" }, strengths: { en: "Evidence-based", ar: "قائم على الأدلة" }, weaknesses: { en: "ARE therapy; inappropriate for education-only", ar: "هي علاج؛ غير مناسبة للتعليم فقط" }, gap: { en: "Clear education-only scope", ar: "نطاق تعليمي واضح فقط" } },
];

// §12.1 Original contributions
const CONTRIBUTIONS = [
  { id: 1, type: { en: "Artifact", ar: "منتج" }, title: { en: "Egyptian Awareness Library", ar: "مكتبة الوعي المصرية" }, description: { en: "The first integrated digital platform combining misinformation resilience, mental health literacy, and positive religious coping in a single system.", ar: "أول منصة رقمية متكاملة تجمع بين مقاومة المعلومات المضللة ومحو الأمية في الصحة النفسية والتكيف الديني الإيجابي في نظام واحد." }, icon: "🏛️", color: "var(--accent-amber)" },
  { id: 2, type: { en: "Framework", ar: "إطار عمل" }, title: { en: "KeyHunter System", ar: "نظام KeyHunter" }, description: { en: "A novel 7-layer expert vocabulary taxonomy embedding professional-level terminology into educational exercises.", ar: "تصنيف مفردات خبراء مبتكر من 7 طبقات يدمج المصطلحات المهنية في التمارين التعليمية." }, icon: "🔑", color: "var(--accent-emerald)" },
  { id: 3, type: { en: "Empirical", ar: "تجريبي" }, title: { en: "First Multi-Domain Evaluation", ar: "أول تقييم متعدد المجالات" }, description: { en: "First empirical evaluation of combined misinformation + mental health + religious coping training targeting Egyptian university students.", ar: "أول تقييم تجريبي لتدريب مشترك على المعلومات المضللة + الصحة النفسية + التكيف الديني يستهدف طلاب الجامعات المصرية." }, icon: "📊", color: "var(--accent-indigo)" },
  { id: 4, type: { en: "Design Knowledge", ar: "معرفة التصميم" }, title: { en: "Reusable Design Framework", ar: "إطار تصميم قابل لإعادة الاستخدام" }, description: { en: "A reusable design framework for building evidence-based awareness platforms adaptable to other cultural contexts.", ar: "إطار تصميم قابل لإعادة الاستخدام لبناء منصات وعي قائمة على الأدلة قابلة للتكيف مع سياقات ثقافية أخرى." }, icon: "📐", color: "var(--accent-blue, #3b82f6)" },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"mission" | "team" | "competitive" | "evidence" | "contributions" | "defense" | "framework">("mission");
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const dir = a ? "rtl" : "ltr";

  const pick = (v: string | { en: string; ar: string }) => typeof v === "string" ? v : (a ? v.ar : v.en);

  const mvpData = [
    { name: "DeepReal", icon: "🔍", object: s(ABOUT.drObj, a), skill: s(ABOUT.drSkill, a), risk: s(ABOUT.drRisk, a), color: "var(--accent-amber)" },
    { name: t({ en: "Mental Health", ar: "الصحة النفسية", arEG: "الصحة النفسية" }), icon: "💚", object: s(ABOUT.mhObj, a), skill: s(ABOUT.mhSkill, a), risk: s(ABOUT.mhRisk, a), color: "var(--accent-emerald)" },
    { name: t({ en: "Religion Hub", ar: "المحور الديني", arEG: "المحور الديني" }), icon: "🕊️", object: s(ABOUT.rhObj, a), skill: s(ABOUT.rhSkill, a), risk: s(ABOUT.rhRisk, a), color: "var(--accent-indigo)" },
  ];

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem", direction: dir, fontFamily: ff }}>
        {s(ABOUT.title, a)}
      </h1>
      <p style={{ fontSize: "0.9rem", opacity: 0.7, marginBottom: "2rem", lineHeight: 1.6, direction: dir, fontFamily: ff }}>
        {s(ABOUT.subtitle, a)}
      </p>

      {/* Tab navigation */}
      <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {([
          { key: "mission", label: s(ABOUT.tabMission, a) },
          { key: "team", label: t({ en: "Team & Institution", ar: "الفريق والمؤسسة", arEG: "الفريق والمؤسسة" }) },
          { key: "contributions", label: s(ABOUT.tabContrib, a) },
          { key: "competitive", label: s(ABOUT.tabCompete, a) },
          { key: "evidence", label: s(ABOUT.tabEvidence, a) },
          { key: "defense", label: t({ en: "Defense Library", ar: "مكتبة الدفاع", arEG: "مكتبة الدفاع" }) },
          { key: "framework", label: t({ en: "Framework Map", ar: "خريطة الإطار", arEG: "خريطة الإطار" }) },
        ] as const).map(({ key, label }) => (
          <button key={key} onClick={() => setActiveTab(key)}
            style={{
              padding: "0.5rem 1rem", borderRadius: "8px", border: "none", cursor: "pointer",
              background: activeTab === key ? "var(--accent-amber)" : "color-mix(in srgb, var(--text-primary) 8%, transparent)",
              color: activeTab === key ? "#000" : "var(--text-primary)",
              fontWeight: activeTab === key ? 700 : 400, fontSize: "0.8rem", transition: "all 0.2s",
              fontFamily: ff,
            }}>
            {label}
          </button>
        ))}
      </div>

      {/* §25.5 Mission & Identity */}
      {activeTab === "mission" && (
        <div>
          <div style={{
            padding: "1.5rem",
            borderRadius: "14px",
            background: "linear-gradient(135deg, color-mix(in srgb, var(--accent-amber) 10%, transparent), var(--glass-bg))",
            border: "1px solid color-mix(in srgb, var(--accent-amber) 20%, transparent)",
            marginBottom: "1.5rem",
            lineHeight: 1.7,
            fontSize: "0.9rem",
            direction: dir,
            fontFamily: ff,
          }}>
            {s(ABOUT.missionText, a)}
          </div>

          {/* §25.3 Why not redundant */}
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem", fontFamily: ff, direction: dir }}>{s(ABOUT.threeEngines, a)}</h2>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            {mvpData.map((mvp) => (
              <div key={mvp.name} style={{
                padding: "1rem 1.25rem", borderRadius: "12px",
                borderLeft: `3px solid ${mvp.color}`,
                background: `color-mix(in srgb, ${mvp.color} 6%, transparent)`,
                direction: dir,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "1.25rem" }}>{mvp.icon}</span>
                  <span style={{ fontWeight: 700, color: mvp.color }}>{mvp.name}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0.25rem 0.75rem", fontSize: "0.8rem", fontFamily: ff }}>
                  <span style={{ opacity: 0.5 }}>{s(ABOUT.judges, a)}</span><span>{mvp.object}</span>
                  <span style={{ opacity: 0.5 }}>{s(ABOUT.trains, a)}</span><span>{mvp.skill}</span>
                  <span style={{ opacity: 0.5 }}>{s(ABOUT.reduces, a)}</span><span>{mvp.risk}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team & Institution Identity */}
      {activeTab === "team" && (
        <div style={{ direction: dir }}>
          {/* Institution Header */}
          <div style={{
            padding: "1.5rem",
            borderRadius: "14px",
            background: "linear-gradient(135deg, color-mix(in srgb, var(--accent-cta) 10%, transparent), var(--glass-bg))",
            border: "1px solid color-mix(in srgb, var(--accent-cta) 20%, transparent)",
            marginBottom: "1rem",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.6, marginBottom: "0.5rem", fontFamily: ff }}>
              {a ? INSTITUTION.ministryAr : INSTITUTION.ministryEn}
            </div>
            <div style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.25rem", fontFamily: ff }}>
              {a ? INSTITUTION.nameAr : INSTITUTION.nameEn}
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--accent-cta)", fontWeight: 600, fontFamily: ff }}>
              {a ? INSTITUTION.courseAr : INSTITUTION.courseEn}
            </div>
          </div>

          {/* Supervisor */}
          <div style={{
            padding: "1rem 1.25rem",
            borderRadius: "12px",
            background: "linear-gradient(135deg, color-mix(in srgb, var(--accent-religionhub) 8%, transparent), var(--glass-bg))",
            border: "1px solid color-mix(in srgb, var(--accent-religionhub) 20%, transparent)",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}>
            <span style={{ fontSize: "2rem" }}>🎓</span>
            <div>
              <div style={{ fontSize: "0.7rem", textTransform: "uppercase", opacity: 0.5, fontFamily: ff }}>
                {a ? "المشرف الأكاديمي" : "Academic Supervisor"}
              </div>
              <div style={{ fontWeight: 700, fontSize: "1.05rem", fontFamily: ff }}>
                {a ? INSTITUTION.supervisorAr : INSTITUTION.supervisorEn}
              </div>
            </div>
          </div>

          {/* Team Members */}
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem", fontFamily: ff }}>
            {a ? "أعضاء الفريق" : "Team Members"}
          </h2>
          <div style={{ display: "grid", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {TEAM_MEMBERS.map((member, i) => (
              <div key={i} style={{
                padding: "1rem 1.25rem",
                borderRadius: "12px",
                border: "1px solid var(--border-primary)",
                background: "var(--glass-bg)",
                display: "grid",
                gridTemplateColumns: member.code ? "auto 1fr auto" : "1fr auto",
                alignItems: "center",
                gap: "1rem",
              }}>
                {member.code && (
                  <span style={{
                    fontFamily: "monospace",
                    fontSize: "0.75rem",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    background: "color-mix(in srgb, var(--accent-cta) 12%, transparent)",
                    color: "var(--accent-cta)",
                    fontWeight: 600,
                  }}>
                    {member.code}
                  </span>
                )}
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", fontFamily: ff }}>{a ? member.name : member.nameEn}</div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.6, fontFamily: ff }}>{a ? member.role.ar : member.role.en}</div>
                </div>
                <span style={{
                  fontSize: "0.65rem",
                  padding: "3px 8px",
                  borderRadius: "999px",
                  background: "color-mix(in srgb, var(--accent-emerald) 12%, transparent)",
                  color: "var(--accent-emerald)",
                  fontWeight: 600,
                }}>
                  {member.department}
                </span>
              </div>
            ))}
          </div>

          {/* Contact & Platforms */}
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem", fontFamily: ff }}>
            {a ? "التواصل والمنصات" : "Contact & Platforms"}
          </h2>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <div style={{ padding: "0.75rem 1rem", borderRadius: "10px", background: "var(--glass-bg)", border: "1px solid var(--border-primary)", display: "flex", alignItems: "center", gap: "0.75rem", fontFamily: ff }}>
              <span>✉️</span>
              <a href={`mailto:${INSTITUTION.email}`} style={{ color: "var(--accent-cta)", textDecoration: "none" }}>{INSTITUTION.email}</a>
            </div>
            <div style={{ padding: "0.75rem 1rem", borderRadius: "10px", background: "var(--glass-bg)", border: "1px solid var(--border-primary)", display: "flex", alignItems: "center", gap: "0.75rem", fontFamily: ff }}>
              <span>📞</span>
              <a href={`tel:${INSTITUTION.phone.replace(/\s/g, "")}`} style={{ color: "var(--accent-cta)", textDecoration: "none" }}>{INSTITUTION.phone}</a>
            </div>
            <div style={{ padding: "0.75rem 1rem", borderRadius: "10px", background: "var(--glass-bg)", border: "1px solid var(--border-primary)", display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.85rem", fontFamily: ff }}>
              <span>📍</span>
              <span>{a ? INSTITUTION.address.ar : INSTITUTION.address.en}</span>
            </div>
            {INSTITUTION.platforms.map((p) => (
              <div key={p.url} style={{ padding: "0.75rem 1rem", borderRadius: "10px", background: "var(--glass-bg)", border: "1px solid var(--border-primary)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span>🌐</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.85rem", fontFamily: ff }}>{p.label}</div>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-cta)", textDecoration: "none", fontSize: "0.8rem" }}>{p.url}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* §12.1 Original Contributions */}
      {activeTab === "contributions" && (
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {CONTRIBUTIONS.map((c) => (
            <div key={c.id} style={{
              padding: "1.25rem",
              borderRadius: "14px",
              border: `1px solid color-mix(in srgb, ${c.color} 30%, transparent)`,
              background: `linear-gradient(135deg, color-mix(in srgb, ${c.color} 8%, transparent), var(--glass-bg))`,
              direction: dir,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "1.5rem" }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: "0.6rem", textTransform: "uppercase", fontWeight: 700, color: c.color, letterSpacing: "0.5px", fontFamily: ff }}>
                    {s(ABOUT.contribN, a)} {c.id} — {pick(c.type)}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: "1rem", fontFamily: ff }}>{pick(c.title)}</div>
                </div>
              </div>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.6, margin: 0, opacity: 0.85, fontFamily: ff }}>{pick(c.description)}</p>
            </div>
          ))}
        </div>
      )}

      {/* §9.1 Competitive Analysis */}
      {activeTab === "competitive" && (
        <div style={{ direction: dir }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem", fontFamily: ff }}>{s(ABOUT.howCompare, a)}</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border-primary)" }}>
                  {[s(ABOUT.product, a), s(ABOUT.domain, a), s(ABOUT.strengths, a), s(ABOUT.weaknesses, a), s(ABOUT.gapFill, a)].map((h) => (
                    <th key={h} style={{ padding: "0.75rem 0.5rem", textAlign: a ? "right" : "left", fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase", opacity: 0.6, fontFamily: ff }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPETITORS.map((c, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border-primary)" }}>
                    <td style={{ padding: "0.6rem 0.5rem", fontWeight: 600, fontFamily: ff }}>{pick(c.name)}</td>
                    <td style={{ padding: "0.6rem 0.5rem", opacity: 0.7, fontFamily: ff }}>{pick(c.domain)}</td>
                    <td style={{ padding: "0.6rem 0.5rem", color: "var(--accent-emerald)", fontSize: "0.75rem", fontFamily: ff }}>{pick(c.strengths)}</td>
                    <td style={{ padding: "0.6rem 0.5rem", color: "var(--accent-red, #ef4444)", fontSize: "0.75rem", fontFamily: ff }}>{pick(c.weaknesses)}</td>
                    <td style={{ padding: "0.6rem 0.5rem", color: "var(--accent-amber)", fontWeight: 600, fontSize: "0.75rem", fontFamily: ff }}>{pick(c.gap)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* §9.3 Unique Differentiation */}
          <div style={{
            marginTop: "1.5rem", padding: "1.25rem", borderRadius: "14px",
            background: "linear-gradient(135deg, color-mix(in srgb, var(--accent-amber) 12%, transparent), var(--glass-bg))",
            border: "1px solid color-mix(in srgb, var(--accent-amber) 25%, transparent)",
          }}>
            <div style={{ fontWeight: 700, marginBottom: "0.5rem", fontFamily: ff }}>{s(ABOUT.uniqueDiff, a)}</div>
            <ol style={{ margin: 0, paddingLeft: a ? 0 : "1.25rem", paddingRight: a ? "1.25rem" : 0, fontSize: "0.85rem", lineHeight: 1.8, fontFamily: ff }}>
              <li><strong>{s(ABOUT.diff1, a).split("—")[0]}</strong>{'—'}{s(ABOUT.diff1, a).split("—")[1]}</li>
              <li><strong>{s(ABOUT.diff2, a).split("—")[0]}</strong></li>
              <li><strong>{s(ABOUT.diff3, a).split("—")[0]}</strong>{'—'}{s(ABOUT.diff3, a).split("—")[1]}</li>
              <li><strong>{s(ABOUT.diff4, a).split("—")[0]}</strong>{'—'}{s(ABOUT.diff4, a).split("—")[1]}</li>
              <li><strong>{s(ABOUT.diff5, a).split("—")[0]}</strong></li>
            </ol>
          </div>
        </div>
      )}

      {/* §2.3 Evidence Disambiguation */}
      {activeTab === "evidence" && <EvidenceDisambiguation />}

      {activeTab === "defense" && <DefenseLibrary />}

      {activeTab === "framework" && <FrameworkCoverage />}
    </main>
  );
}
