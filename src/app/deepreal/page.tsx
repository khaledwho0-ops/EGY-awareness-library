"use client";

import { ShieldCheck } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { ModuleOperatingShell } from "@/components/science/module-operating-shell";

export default function DeepRealPage() {
  const { isRTL, t } = useRTL();

  return (
    <ModuleOperatingShell
      module="deepreal"
      accent="var(--accent-deepreal)"
      icon={<ShieldCheck size={28} style={{ color: "var(--accent-deepreal)" }} />}
      title={t({ en: "DeepReal", ar: "ديب ريال", arEG: "ديب ريل" })}
      subtitle={t({
        en: "The operational verification engine: triage the claim, trace the source, compare evidence, then decide.",
        ar: "محرك التحقق العملي: فرّز الادعاء، تتبع المصدر، قارن الأدلة، ثم قرر.",
        arEG: "محرك التحقق العملي: صنّف الادعاء، تتبع المصدر، قارن الأدلة، وبعدين قرّر.",
      })}
      disclaimer={t({
        en: "This module is an educational and operational verification system, not a replacement for official, medical, or legal authorities when direct risk is present.",
        ar: "هذه الوحدة تعليمية وتشغيلية للتحقق من المعلومات، وليست بديلاً عن الجهات الرسمية أو الطبية أو القانونية عند وجود خطر مباشر.",
        arEG: "الوحدة دي تعليمية وعملية للتحقق من المعلومات، مش بديل عن الجهات الرسمية أو الطبية أو القانونية لو في خطر مباشر.",
      })}
      coreQuestion={t({
        en: "What is actually happening, and what can be proven right now?",
        ar: "ما الذي يحدث فعلاً، وما الذي يمكن إثباته الآن؟",
        arEG: "إيه اللي بيحصل فعلاً، وإيه اللي نقدر نثبته دلوقتي؟",
      })}
      coreQuestionSub={t({
        en: "Start in the lab, complete the next route step, then run protocols against scenarios and rules.",
        ar: "ابدأ بالمختبر، ثم نفّذ خطوة المسار، ثم شغّل البروتوكولات على السيناريوهات والقواعد.",
        arEG: "ابدأ بالمختبر، كمّل خطوة المسار الجاية، وبعدين شغّل البروتوكولات على السيناريوهات والقواعد.",
      })}
      heroPattern="topographic"
      heroGradient="linear-gradient(135deg, rgba(245,158,11,0.12), rgba(217,119,6,0.08))"
      tagline={t({ en: "Verify. Trace. Decide. | تحقق. تتبع. قرر.", ar: "تحقق. تتبع. قرر.", arEG: "تحقق. تتبع. قرر." })}
      titleGradientClass="text-gradient-gold"
      heroCTAs={[
        { href: "/deepreal/game", label: t({ en: "DeepReal Arena", ar: "ساحة DeepReal", arEG: "ساحة DeepReal" }) },
        { href: "/angry-debunkers", label: t({ en: "🔥 Angry Debunkers", ar: "🔥 المفنّدين الغاضبين", arEG: "🔥 المفنّدين الغاضبين" }), accent: "#C2185B" },
      ]}
      links={[
        {
          href: "/deepreal/game",
          title: t({ en: "DeepReal arena", ar: "ساحة DeepReal", arEG: "ساحة DeepReal" }),
          description: t({
            en: "Operational game lab: classic, Egypt, and good-signal POV.",
            ar: "مختبر لعب تشغيلي: كلاسيكي، مصري، ومنظور جيد.",
            arEG: "مختبر ألعاب عملي: كلاسيكي، مصري، ومنظور إيجابي.",
          }),
        },
        {
          href: "/deepreal-upload",
          title: t({ en: "DeepReal upload", ar: "رفع DeepReal", arEG: "رفع DeepReal" }),
          description: t({
            en: "Upload media for AI-powered deepfake detection analysis.",
            ar: "ارفع وسائط لتحليل التزييف العميق بالذكاء الاصطناعي.",
            arEG: "ارفع ميديا لتحليل التزييف بالذكاء الاصطناعي.",
          }),
        },
        {
          href: "/angry-debunkers",
          title: t({ en: "Angry Debunkers", ar: "المفنّدين الغاضبين", arEG: "المفنّدين الغاضبين" }),
          description: t({
            en: "Deploy your verification skills against real misinformation.",
            ar: "استخدم مهارات التحقق ضد معلومات مضللة حقيقية.",
            arEG: "استخدم مهاراتك في التحقق ضد معلومات مضللة حقيقية.",
          }),
        },
        {
          href: "/science",
          title: t({ en: "Science hub", ar: "مركز العلم", arEG: "مركز العلم" }),
          description: t({
            en: "Standards, flag families, and trusted-source logic.",
            ar: "المعايير، العائلات الحمراء، والمصادر الموثوقة.",
            arEG: "المعايير، العلامات الحمرا، ومنطق المصادر الموثوقة.",
          }),
        },
        {
          href: "/evidence",
          title: t({ en: "Evidence board", ar: "لوحة الأدلة", arEG: "لوحة الأدلة" }),
          description: t({
            en: "Inspect claims and metrics tied to their sources.",
            ar: "راجع المطالبات والأرقام المربوطة بمصادرها.",
            arEG: "راجع الادعاءات والأرقام المربوطة بمصادرها.",
          }),
        },
        {
          href: "/reverse",
          title: t({ en: "Reverse mode", ar: "الوضع العكسي", arEG: "الوضع العكسي" }),
          description: t({
            en: "See how manipulation is constructed before you trust it.",
            ar: "افهم كيف تُبنى الشائعة قبل أن تصدقها.",
            arEG: "افهم إزاي الشائعة بتتبني قبل ما تصدّقها.",
          }),
        },
      ]}
    />
  );
}
