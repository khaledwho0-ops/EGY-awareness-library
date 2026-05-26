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
      icon={<Sparkles size={24} style={{ color: "var(--accent-religionhub)" }} />}
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
      links={[
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
