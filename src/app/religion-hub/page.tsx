"use client";

import { Sparkles } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { ModuleOperatingShell } from "@/components/science/module-operating-shell";

export default function ReligionHubPage() {
  const { isRTL, t } = useRTL();

  return (
    <ModuleOperatingShell
      module="religion-hub"
      accent="var(--accent-religionhub)"
      icon={<Sparkles size={28} style={{ color: "var(--accent-religionhub)" }} />}
      title={t({ en: "Religion Hub", ar: "المحور الديني", arEG: "المحور الديني" })}
      subtitle={t({
        en: "The moderation engine: protect meaning, block coercion, and keep care handoff visible.",
        ar: "محرك الاعتدال: احمِ المعنى، امنع القهر، وأبقِ الإحالة والرعاية مرئية.",
        arEG: "محرك الاعتدال: احمي المعنى، امنع القهر، وخلّي الإحالة والرعاية واضحة.",
      })}
      disclaimer={t({
        en: "This module studies religion and wellbeing through a scientific and applied lens. It does not replace qualified theological guidance.",
        ar: "هذه الوحدة تبحث العلاقة بين الدين والرفاه من منظور علمي وتطبيقي، ولا تمثل فتوى أو توجيهاً لاهوتياً بديلاً عن الجهات المؤهلة.",
        arEG: "الوحدة دي بتدرس العلاقة بين الدين والرفاهية من منظور علمي وتطبيقي. مش فتوى ومش بديل عن المشايخ والعلماء المؤهلين.",
      })}
      coreQuestion={t({
        en: "Does this message build peace and boundaries, or does it build control and guilt?",
        ar: "هل هذه الرسالة تبني سلاماً وحدوداً، أم تبني سيطرة وذنباً؟",
        arEG: "الرسالة دي بتبني سلام وحدود، ولا بتبني سيطرة وإحساس بالذنب؟",
      })}
      coreQuestionSub={t({
        en: "Start in the lab, examine coercion, guilt, and care handoff, then run protocols across scenarios and reverse mode.",
        ar: "ابدأ بالمختبر، ثم راقب الإكراه والذنب والإحالة، ثم شغّل البروتوكولات على السيناريوهات والوضع العكسي.",
        arEG: "ابدأ بالمختبر، راقب الإكراه والذنب والإحالة، وبعدين شغّل البروتوكولات على السيناريوهات والوضع العكسي.",
      })}
      heroPattern="geometric"
      heroGradient="linear-gradient(135deg, rgba(139,92,246,0.12), rgba(109,40,217,0.08))"
      tagline={t({ en: "Protect. Verify. Moderate. | احمِ. تحقق. اعتدل.", ar: "احمِ. تحقق. اعتدل.", arEG: "احمِ. تحقق. اعتدل." })}
      titleGradientClass="text-gradient-violet"
      heroCTAs={[
        { href: "/religion-hub/tools", label: t({ en: "Islamic Tools Suite", ar: "أدوات إسلامية", arEG: "أدوات إسلامية" }) },
        { href: "/angry-debunkers", label: t({ en: "🔥 Angry Debunkers", ar: "🔥 المفنّدين الغاضبين", arEG: "🔥 المفنّدين الغاضبين" }), accent: "#C2185B" },
      ]}
      links={[
        {
          href: "/religion-hub/tools",
          title: t({ en: "Islamic Tools Suite", ar: "مجموعة الأدوات الإسلامية", arEG: "مجموعة الأدوات الإسلامية" }),
          description: t({
            en: "Complete toolkit: Quran reader, Hadith search, Tafsir, and more.",
            ar: "مجموعة أدوات كاملة: قارئ القرآن، بحث الحديث، التفسير، وأكثر.",
            arEG: "مجموعة أدوات كاملة: قارئ القرآن، بحث الحديث، التفسير، وأكتر.",
          }),
        },
        {
          href: "/religion-hub/tools/quran",
          title: t({ en: "Quran reader", ar: "قارئ القرآن", arEG: "قارئ القرآن" }),
          description: t({
            en: "Browse and search the Quran with tafsir context.",
            ar: "تصفح وابحث في القرآن مع سياق التفسير.",
            arEG: "تصفح وابحث في القرآن مع سياق التفسير.",
          }),
        },
        {
          href: "/religion-hub/tools/hadith",
          title: t({ en: "Hadith search", ar: "بحث الحديث", arEG: "بحث الحديث" }),
          description: t({
            en: "Search authenticated Hadith collections by keyword or reference.",
            ar: "ابحث في مجموعات الحديث الموثقة بالكلمة أو المرجع.",
            arEG: "ابحث في مجموعات الحديث الموثقة بالكلمة أو المرجع.",
          }),
        },
        {
          href: "/religion-hub/tools/tafsir",
          title: t({ en: "Tafsir browser", ar: "متصفح التفسير", arEG: "متصفح التفسير" }),
          description: t({
            en: "Compare classical and contemporary interpretations.",
            ar: "قارن بين التفاسير الكلاسيكية والمعاصرة.",
            arEG: "قارن بين التفاسير الكلاسيكية والمعاصرة.",
          }),
        },
        {
          href: "/religion-hub/tools/prayer",
          title: t({ en: "Prayer times", ar: "مواقيت الصلاة", arEG: "مواقيت الصلاة" }),
          description: t({
            en: "Accurate prayer times based on your location.",
            ar: "مواقيت صلاة دقيقة بناءً على موقعك.",
            arEG: "مواقيت صلاة دقيقة حسب موقعك.",
          }),
        },
        {
          href: "/religion-hub/tools/names",
          title: t({ en: "Names of Allah", ar: "أسماء الله الحسنى", arEG: "أسماء الله الحسنى" }),
          description: t({
            en: "Browse and reflect on the 99 names with meanings.",
            ar: "تصفح وتأمل في أسماء الله الـ ٩٩ مع المعاني.",
            arEG: "تصفح وتأمل في أسماء الله الـ ٩٩ مع المعاني.",
          }),
        },
        {
          href: "/science",
          title: t({ en: "Science hub", ar: "مركز العلم", arEG: "مركز العلم" }),
          description: t({
            en: "Scientific grounding and local/global reference authorities.",
            ar: "الأساس العلمي والجهات المرجعية المحلية والعالمية.",
            arEG: "الأساس العلمي والمراجع المحلية والعالمية.",
          }),
        },
        {
          href: "/reverse",
          title: t({ en: "Reverse mode", ar: "الوضع العكسي", arEG: "الوضع العكسي" }),
          description: t({
            en: "Analyze how coercion and sectarian pressure enter the message.",
            ar: "حلّل كيف تدخل السيطرة والطائفية إلى الرسالة.",
            arEG: "حلّل إزاي السيطرة والطائفية بتدخل في الرسالة.",
          }),
        },
        {
          href: "/presentation",
          title: t({ en: "Reporting center", ar: "مركز التقرير", arEG: "مركز التقرير" }),
          description: t({
            en: "Produce an executive summary for moderation and evidence.",
            ar: "استخرج عرضاً تنفيذياً لمسار الاعتدال والأدلة.",
            arEG: "طلّع ملخص تنفيذي لمسار الاعتدال والأدلة.",
          }),
        },
      ]}
    />
  );
}
