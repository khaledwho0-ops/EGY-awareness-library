"use client";

import { HeartPulse } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { ModuleOperatingShell } from "@/components/science/module-operating-shell";

export default function MentalHealthPage() {
  const { isRTL, t } = useRTL();

  return (
    <ModuleOperatingShell
      module="mental-health"
      accent="var(--accent-mentalhealth)"
      icon={<HeartPulse size={24} style={{ color: "var(--accent-mentalhealth)" }} />}
      title={t({ en: "Mental Health", ar: "الصحة النفسية", arEG: "الصحة النفسية" })}
      subtitle={t({
        en: "The safety-first engine: stabilize, separate symptoms from diagnosis, then route support with the least harm.",
        ar: "محرك الأمان أولاً: ثبّت نفسك، افصل الأعراض عن التشخيص، ثم وجّه الدعم بأقل ضرر.",
        arEG: "محرك الأمان الأول: ثبّت نفسك، افصل الأعراض عن التشخيص، وبعدين وجّه الدعم بأقل ضرر.",
      })}
      disclaimer={t({
        en: "This module is educational and not a diagnosis or treatment service. If there is immediate danger or self-harm risk, use official support and emergency care immediately.",
        ar: "هذه الوحدة تعليمية وليست تشخيصاً أو علاجاً. عند وجود خطر فوري أو أفكار إيذاء يجب الرجوع للدعم الرسمي والطوارئ فوراً.",
        arEG: "الوحدة دي تعليمية مش تشخيص أو علاج. لو في خطر فوري أو أفكار إيذاء، لازم تتواصل مع الدعم الرسمي والطوارئ فوراً. خط نجدة الصحة النفسية: 08008880700",
      })}
      coreQuestion={t({
        en: "What am I dealing with, and what is the safest next route right now?",
        ar: "ما هذا الذي أشعر به، وما هو أكثر مسار آمن الآن؟",
        arEG: "إيه اللي بيحصل معايا، وإيه أأمن خطوة ممكن أعملها دلوقتي؟",
      })}
      coreQuestionSub={t({
        en: "Start with operational triage, complete the next route step, then run protocols against scenarios and myths.",
        ar: "ابدأ بالفرز التشغيلي، ثم أكمل خطوة المسار التالية، ثم نفّذ البروتوكولات على السيناريوهات والخرافات.",
        arEG: "ابدأ بالفرز العملي، كمّل خطوة المسار الجاية، وبعدين شغّل البروتوكولات على السيناريوهات والخرافات.",
      })}
      links={[
        {
          href: "/sources",
          title: t({ en: "Support sources", ar: "مصادر الدعم", arEG: "مصادر الدعم" }),
          description: t({
            en: "Official directories and trusted support references.",
            ar: "المصادر الرسمية والدلائل الموثوقة.",
            arEG: "المصادر الرسمية والدلائل الموثوقة في مصر.",
          }),
        },
        {
          href: "/evidence",
          title: t({ en: "Evidence board", ar: "لوحة الأدلة", arEG: "لوحة الأدلة" }),
          description: t({
            en: "Inspect the mental-health claims and metrics.",
            ar: "افحص الأرقام والمطالبات الخاصة بالصحة النفسية.",
            arEG: "راجع الأرقام والادعاءات الخاصة بالصحة النفسية.",
          }),
        },
        {
          href: "/presentation",
          title: t({ en: "Reporting center", ar: "مركز التقرير", arEG: "مركز التقرير" }),
          description: t({
            en: "A printable executive summary based on progress and evidence.",
            ar: "ملخص تنفيذي قابل للطباعة مبني على التقدم والأدلة.",
            arEG: "ملخص تنفيذي تقدر تطبعه مبني على تقدمك والأدلة.",
          }),
        },
      ]}
    />
  );
}
