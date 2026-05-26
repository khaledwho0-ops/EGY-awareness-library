import type { LocalizedText, ModuleId } from "@/data/research/module-briefings";

function t(en: string, ar: string, arEG?: string): LocalizedText {
  return { en, ar, arEG: arEG || ar };
}

export interface ModuleOperationResult {
  module: ModuleId;
  score: number;
  outcome: {
    title: LocalizedText;
    summary: LocalizedText;
    severity: "low" | "medium" | "high";
  };
  reasons: LocalizedText[];
  nextActions: LocalizedText[];
}

export function runModuleOperation(module: ModuleId, input: Record<string, unknown>): ModuleOperationResult {
  if (module === "deepreal") {
    const urgency = Number(input.urgency ?? 0);
    const emotionalPressure = Number(input.emotionalPressure ?? 0);
    const sourceKnown = Boolean(input.sourceKnown);
    const officialMatch = Boolean(input.officialMatch);
    const reasons: LocalizedText[] = [];
    let score = 0;

    if (!sourceKnown) {
      score += 4;
      reasons.push(t("The original source is still unknown.", "المصدر الأصلي ما زال مجهولاً."));
    }
    if (urgency >= 7) {
      score += 3;
      reasons.push(t("High urgency is present before verification.", "يوجد استعجال مرتفع قبل التحقق."));
    }
    if (emotionalPressure >= 7) {
      score += 3;
      reasons.push(t("The message is using emotional pressure.", "الرسالة تستخدم ضغطاً عاطفياً."));
    }
    if (!officialMatch) {
      score += 2;
      reasons.push(t("No official or scholarly confirmation was found yet.", "لم يُعثر بعد على تأكيد رسمي أو علمي."));
    }

    return {
      module,
      score,
      outcome:
        score >= 8
          ? {
              title: t("Freeze and verify", "جمّد وانتقل للتحقق"),
              summary: t("This claim should not be shared until the evidence board and source trace are complete.", "لا ينبغي مشاركة هذه الدعوى حتى يكتمل مسار الأدلة وتتبع المصدر."),
              severity: "high",
            }
          : {
              title: t("Continue with controlled verification", "تابع التحقق المضبوط"),
              summary: t("The claim can proceed into source comparison, but not into casual trust.", "يمكن نقل الدعوى إلى مقارنة المصادر، لكن ليس إلى الثقة السريعة."),
              severity: "medium",
            },
      reasons,
      nextActions:
        score >= 8
          ? [
              t("Run the claim through fact-check, research, and archive routes.", "مرّر الدعوى عبر مسارات التحقق الصحفي والبحث والأرشيف."),
              t("Document why the source path is weak before you decide.", "وثّق لماذا كان مسار المصدر ضعيفاً قبل اتخاذ القرار."),
            ]
          : [
              t("Open one fact-check route and one scholarly route.", "افتح مسار تحقق صحفي واحداً ومساراً علمياً واحداً."),
              t("Record whether the evidence supports trust, hold, or rejection.", "سجّل ما إذا كانت الأدلة تدعم الثقة أو التوقف أو الرفض."),
            ],
    };
  }

  if (module === "mental-health") {
    const distress = Number(input.distress ?? 0);
    const functionDrop = Number(input.functionDrop ?? 0);
    const dangerNow = Boolean(input.dangerNow);
    const supportAvailable = Boolean(input.supportAvailable);
    const reasons: LocalizedText[] = [];
    let score = 0;

    if (dangerNow) {
      return {
        module,
        score: 10,
        outcome: {
          title: t("Urgent support route", "مسار دعم عاجل"),
          summary: t("Immediate safety takes priority over education.", "السلامة الفورية تتقدم على التعليم."),
          severity: "high",
        },
        reasons: [t("Immediate danger was marked.", "تم تحديد وجود خطر فوري.")],
        nextActions: [
          t("Use crisis support or urgent medical routing now.", "استخدم دعم الأزمة أو التوجيه الطبي العاجل الآن."),
          t("Do not stay inside self-help content.", "لا تبق داخل محتوى المساعدة الذاتية."),
        ],
      };
    }

    score += Math.round(distress / 2);
    score += Math.round(functionDrop / 3);
    if (!supportAvailable) {
      score += 1;
      reasons.push(t("Trusted support is not currently available.", "الدعم الموثوق غير متاح حالياً."));
    }
    if (distress >= 7) {
      reasons.push(t("Distress is high enough to justify stronger routing.", "الضيق مرتفع بما يكفي لتبرير توجيه أقوى."));
    }
    if (functionDrop >= 6) {
      reasons.push(t("Daily functioning is noticeably impaired.", "الوظيفة اليومية متأثرة بشكل ملحوظ."));
    }

    return {
      module,
      score,
      outcome:
        score >= 7
          ? {
              title: t("Formal support route", "مسار دعم رسمي"),
              summary: t("The pattern is strong enough to move beyond generic self-help.", "النمط قوي بما يكفي لتجاوز المساعدة الذاتية العامة."),
              severity: "medium",
            }
          : {
              title: t("Guided stabilization route", "مسار تهدئة موجه"),
              summary: t("A low-risk stabilizer plus a trusted person is reasonable now.", "أداة تهدئة منخفضة الخطورة مع شخص موثوق خطوة معقولة الآن."),
              severity: "low",
            },
      reasons,
      nextActions:
        score >= 7
          ? [
              t("Open official Egyptian support routing and document the strongest symptoms.", "افتح مسار الدعم المصري الرسمي ووثّق أقوى الأعراض."),
              t("Keep stigma-free language and avoid self-diagnosis claims.", "حافظ على لغة خالية من الوصمة وتجنب ادعاءات التشخيص الذاتي."),
            ]
          : [
              t("Use one stabilizer, one trusted contact, and recheck if distress rises.", "استخدم أداة تهدئة واحدة وشخصاً موثوقاً واحداً ثم أعد التقييم إذا ارتفع الضيق."),
              t("Treat labels as hypotheses, not conclusions.", "تعامل مع الملصقات كفرضيات لا كاستنتاجات."),
            ],
    };
  }

  const coercion = Number(input.coercion ?? 0);
  const guilt = Number(input.guilt ?? 0);
  const replacesCare = Boolean(input.replacesCare);
  const sectarian = Boolean(input.sectarian);
  const reasons: LocalizedText[] = [];
  let score = 0;

  score += Math.round(coercion / 2);
  score += Math.round(guilt / 3);
  if (replacesCare) {
    score += 3;
    reasons.push(t("The message replaces care with certainty.", "الرسالة تستبدل الرعاية باليقين."));
  }
  if (sectarian) {
    score += 4;
    reasons.push(t("The message contains sectarian targeting.", "الرسالة تحتوي على استهداف طائفي."));
  }
  if (coercion >= 7) {
    reasons.push(t("Coercion is high.", "القسر مرتفع."));
  }
  if (guilt >= 7) {
    reasons.push(t("The message weaponizes guilt strongly.", "الرسالة توظف الذنب كسلاح بقوة."));
  }

  return {
    module,
    score,
    outcome:
      score >= 8
        ? {
            title: t("Reject and escalate", "ارفض وصعّد"),
            summary: t("This content needs official moderation and possibly mental-health handoff.", "هذا المحتوى يحتاج اعتدالاً رسمياً وربما إحالة إلى الصحة النفسية."),
            severity: "high",
          }
        : {
            title: t("Bounded reflection route", "مسار تأمل منضبط"),
            summary: t("Use calm reflection only with boundaries and official moderation visible.", "استخدم التأمل الهادئ فقط مع إبقاء الحدود والاعتدال الرسمي ظاهرين."),
            severity: "medium",
          },
    reasons,
    nextActions:
      score >= 8
        ? [
            t("Route to Al-Azhar or Dar al-Ifta style moderation channels.", "وجّه إلى قنوات اعتدال مثل الأزهر أو دار الإفتاء."),
            t("If the content blocks care, open the mental-health handoff route too.", "إذا كان المحتوى يمنع الرعاية فافتح مسار الإحالة للصحة النفسية أيضاً."),
          ]
        : [
            t("Keep official moderation visible before accepting or forwarding guidance.", "أبقِ الاعتدال الرسمي ظاهراً قبل قبول التوجيه أو تمريره."),
            t("Check whether the message increases peace or control.", "تحقق مما إذا كانت الرسالة تزيد السلام أم السيطرة."),
          ],
  };
}
