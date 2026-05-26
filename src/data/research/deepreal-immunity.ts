import type { DeepRealGameModeDefinition } from "./deepreal-game";
import type { LocalizedText } from "./module-briefings";

function t(en: string, ar: string, arEG?: string): LocalizedText {
  return { en, ar, arEG: arEG || ar };
}

function source(en: string, ar: string, url: string) {
  return { label: t(en, ar), url };
}

export const IMMUNITY_RUMORS_MODE: DeepRealGameModeDefinition = {
  id: "immunity-rumors" as any,
  title: t("Immunity Lab: Rumors", "مختبر المناعة: الشائعات"),
  subtitle: t("Identify and neutralize local fear-based rumors.", "تحديد وإبطال الشائعات المحلية القائمة على الخوف."),
  roleLabel: t("Rumor Analyst", "محلل شائعات"),
  scoreLabel: t("Resilience Score", "درجة المرونة"),
  warning: t("Test your defense against 12 high-velocity rumor patterns.", "اختبر دفاعك ضد 12 نمط شائعات سريع الانتشار."),
  completionTitle: t("Rumor Network mapped.", "تم تعيين شبكة الشائعات."),
  completionSummary: t("You successfully identified the urgency and fear triggers.", "نجحت في تحديد محفزات الاستعجال والخوف."),
  sources: [source("AkhbarMeter", "أخبار ميتر", "https://akhbarmeter.org/")],
  rounds: [
  {
    "id": "immunity-rumors-1",
    "title": {
      "en": "Rumor Round 1",
      "ar": "جولة الشائعات 1",
    "arEG": "جولة الشائعات 1"
    },
    "scene": {
      "en": "A viral post claims an immediate health or security threat in the local area. (Case 1)",
      "ar": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 1)",
    "arEG": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 1)"
    },
    "prompt": {
      "en": "Which reaction accelerates the panic?",
      "ar": "أي رد فعل يسرع الذعر؟",
    "arEG": "أي رد فعل يسرع الذعر؟"
    },
    "objective": {
      "en": "Identify fear-based virality",
      "ar": "تحديد الانتشار القائم على الخوف",
    "arEG": "تحديد الانتشار القائم على الخوف"
    },
    "choices": [
      {
        "id": "r0-1",
        "label": {
          "en": "Share immediately to warn family",
          "ar": "شارك فوراً لتحذير العائلة",
        "arEG": "شارك فوراً لتحذير العائلة"
        },
        "effectLabel": {
          "en": "Panic Spread",
          "ar": "انتشار الذعر",
        "arEG": "انتشار الذعر"
        },
        "feedback": {
          "en": "Spreading unverified threats causes more harm than the threat itself.",
          "ar": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه.",
        "arEG": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه."
        },
        "lesson": {
          "en": "Always verify with official local sources before sharing.",
          "ar": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة.",
        "arEG": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "fear",
          "urgency"
        ]
      },
      {
        "id": "r0-2",
        "label": {
          "en": "Check the official Ministry page",
          "ar": "تحقق من صفحة الوزارة الرسمية",
        "arEG": "تحقق من صفحة الوزارة الرسمية"
        },
        "effectLabel": {
          "en": "Verification",
          "ar": "تحقق",
        "arEG": "تحقق"
        },
        "feedback": {
          "en": "This stops the rumor, which is good for reality but bad for the simulation.",
          "ar": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة.",
        "arEG": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة."
        },
        "lesson": {
          "en": "Verification stops virality.",
          "ar": "التحقق يوقف الانتشار.",
        "arEG": "التحقق يوقف الانتشار."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "verify"
        ]
      },
      {
        "id": "r0-3",
        "label": {
          "en": "Wait for more context",
          "ar": "انتظر لمزيد من السياق",
        "arEG": "انتظر لمزيد من السياق"
        },
        "effectLabel": {
          "en": "Patience",
          "ar": "صبر",
        "arEG": "صبر"
        },
        "feedback": {
          "en": "Pausing starves the rumor of oxygen.",
          "ar": "التوقف يحرم الشائعة من الأكسجين.",
        "arEG": "التوقف يحرم الشائعة من الأكسجين."
        },
        "lesson": {
          "en": "Time is the enemy of false urgency.",
          "ar": "الوقت هو عدو الاستعجال الزائف.",
        "arEG": "الوقت هو عدو الاستعجال الزائف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "pause"
        ]
      }
    ]
  },
  {
    "id": "immunity-rumors-2",
    "title": {
      "en": "Rumor Round 2",
      "ar": "جولة الشائعات 2",
    "arEG": "جولة الشائعات 2"
    },
    "scene": {
      "en": "A viral post claims an immediate health or security threat in the local area. (Case 2)",
      "ar": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 2)",
    "arEG": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 2)"
    },
    "prompt": {
      "en": "Which reaction accelerates the panic?",
      "ar": "أي رد فعل يسرع الذعر؟",
    "arEG": "أي رد فعل يسرع الذعر؟"
    },
    "objective": {
      "en": "Identify fear-based virality",
      "ar": "تحديد الانتشار القائم على الخوف",
    "arEG": "تحديد الانتشار القائم على الخوف"
    },
    "choices": [
      {
        "id": "r1-1",
        "label": {
          "en": "Share immediately to warn family",
          "ar": "شارك فوراً لتحذير العائلة",
        "arEG": "شارك فوراً لتحذير العائلة"
        },
        "effectLabel": {
          "en": "Panic Spread",
          "ar": "انتشار الذعر",
        "arEG": "انتشار الذعر"
        },
        "feedback": {
          "en": "Spreading unverified threats causes more harm than the threat itself.",
          "ar": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه.",
        "arEG": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه."
        },
        "lesson": {
          "en": "Always verify with official local sources before sharing.",
          "ar": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة.",
        "arEG": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "fear",
          "urgency"
        ]
      },
      {
        "id": "r1-2",
        "label": {
          "en": "Check the official Ministry page",
          "ar": "تحقق من صفحة الوزارة الرسمية",
        "arEG": "تحقق من صفحة الوزارة الرسمية"
        },
        "effectLabel": {
          "en": "Verification",
          "ar": "تحقق",
        "arEG": "تحقق"
        },
        "feedback": {
          "en": "This stops the rumor, which is good for reality but bad for the simulation.",
          "ar": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة.",
        "arEG": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة."
        },
        "lesson": {
          "en": "Verification stops virality.",
          "ar": "التحقق يوقف الانتشار.",
        "arEG": "التحقق يوقف الانتشار."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "verify"
        ]
      },
      {
        "id": "r1-3",
        "label": {
          "en": "Wait for more context",
          "ar": "انتظر لمزيد من السياق",
        "arEG": "انتظر لمزيد من السياق"
        },
        "effectLabel": {
          "en": "Patience",
          "ar": "صبر",
        "arEG": "صبر"
        },
        "feedback": {
          "en": "Pausing starves the rumor of oxygen.",
          "ar": "التوقف يحرم الشائعة من الأكسجين.",
        "arEG": "التوقف يحرم الشائعة من الأكسجين."
        },
        "lesson": {
          "en": "Time is the enemy of false urgency.",
          "ar": "الوقت هو عدو الاستعجال الزائف.",
        "arEG": "الوقت هو عدو الاستعجال الزائف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "pause"
        ]
      }
    ]
  },
  {
    "id": "immunity-rumors-3",
    "title": {
      "en": "Rumor Round 3",
      "ar": "جولة الشائعات 3",
    "arEG": "جولة الشائعات 3"
    },
    "scene": {
      "en": "A viral post claims an immediate health or security threat in the local area. (Case 3)",
      "ar": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 3)",
    "arEG": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 3)"
    },
    "prompt": {
      "en": "Which reaction accelerates the panic?",
      "ar": "أي رد فعل يسرع الذعر؟",
    "arEG": "أي رد فعل يسرع الذعر؟"
    },
    "objective": {
      "en": "Identify fear-based virality",
      "ar": "تحديد الانتشار القائم على الخوف",
    "arEG": "تحديد الانتشار القائم على الخوف"
    },
    "choices": [
      {
        "id": "r2-1",
        "label": {
          "en": "Share immediately to warn family",
          "ar": "شارك فوراً لتحذير العائلة",
        "arEG": "شارك فوراً لتحذير العائلة"
        },
        "effectLabel": {
          "en": "Panic Spread",
          "ar": "انتشار الذعر",
        "arEG": "انتشار الذعر"
        },
        "feedback": {
          "en": "Spreading unverified threats causes more harm than the threat itself.",
          "ar": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه.",
        "arEG": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه."
        },
        "lesson": {
          "en": "Always verify with official local sources before sharing.",
          "ar": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة.",
        "arEG": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "fear",
          "urgency"
        ]
      },
      {
        "id": "r2-2",
        "label": {
          "en": "Check the official Ministry page",
          "ar": "تحقق من صفحة الوزارة الرسمية",
        "arEG": "تحقق من صفحة الوزارة الرسمية"
        },
        "effectLabel": {
          "en": "Verification",
          "ar": "تحقق",
        "arEG": "تحقق"
        },
        "feedback": {
          "en": "This stops the rumor, which is good for reality but bad for the simulation.",
          "ar": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة.",
        "arEG": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة."
        },
        "lesson": {
          "en": "Verification stops virality.",
          "ar": "التحقق يوقف الانتشار.",
        "arEG": "التحقق يوقف الانتشار."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "verify"
        ]
      },
      {
        "id": "r2-3",
        "label": {
          "en": "Wait for more context",
          "ar": "انتظر لمزيد من السياق",
        "arEG": "انتظر لمزيد من السياق"
        },
        "effectLabel": {
          "en": "Patience",
          "ar": "صبر",
        "arEG": "صبر"
        },
        "feedback": {
          "en": "Pausing starves the rumor of oxygen.",
          "ar": "التوقف يحرم الشائعة من الأكسجين.",
        "arEG": "التوقف يحرم الشائعة من الأكسجين."
        },
        "lesson": {
          "en": "Time is the enemy of false urgency.",
          "ar": "الوقت هو عدو الاستعجال الزائف.",
        "arEG": "الوقت هو عدو الاستعجال الزائف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "pause"
        ]
      }
    ]
  },
  {
    "id": "immunity-rumors-4",
    "title": {
      "en": "Rumor Round 4",
      "ar": "جولة الشائعات 4",
    "arEG": "جولة الشائعات 4"
    },
    "scene": {
      "en": "A viral post claims an immediate health or security threat in the local area. (Case 4)",
      "ar": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 4)",
    "arEG": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 4)"
    },
    "prompt": {
      "en": "Which reaction accelerates the panic?",
      "ar": "أي رد فعل يسرع الذعر؟",
    "arEG": "أي رد فعل يسرع الذعر؟"
    },
    "objective": {
      "en": "Identify fear-based virality",
      "ar": "تحديد الانتشار القائم على الخوف",
    "arEG": "تحديد الانتشار القائم على الخوف"
    },
    "choices": [
      {
        "id": "r3-1",
        "label": {
          "en": "Share immediately to warn family",
          "ar": "شارك فوراً لتحذير العائلة",
        "arEG": "شارك فوراً لتحذير العائلة"
        },
        "effectLabel": {
          "en": "Panic Spread",
          "ar": "انتشار الذعر",
        "arEG": "انتشار الذعر"
        },
        "feedback": {
          "en": "Spreading unverified threats causes more harm than the threat itself.",
          "ar": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه.",
        "arEG": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه."
        },
        "lesson": {
          "en": "Always verify with official local sources before sharing.",
          "ar": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة.",
        "arEG": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "fear",
          "urgency"
        ]
      },
      {
        "id": "r3-2",
        "label": {
          "en": "Check the official Ministry page",
          "ar": "تحقق من صفحة الوزارة الرسمية",
        "arEG": "تحقق من صفحة الوزارة الرسمية"
        },
        "effectLabel": {
          "en": "Verification",
          "ar": "تحقق",
        "arEG": "تحقق"
        },
        "feedback": {
          "en": "This stops the rumor, which is good for reality but bad for the simulation.",
          "ar": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة.",
        "arEG": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة."
        },
        "lesson": {
          "en": "Verification stops virality.",
          "ar": "التحقق يوقف الانتشار.",
        "arEG": "التحقق يوقف الانتشار."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "verify"
        ]
      },
      {
        "id": "r3-3",
        "label": {
          "en": "Wait for more context",
          "ar": "انتظر لمزيد من السياق",
        "arEG": "انتظر لمزيد من السياق"
        },
        "effectLabel": {
          "en": "Patience",
          "ar": "صبر",
        "arEG": "صبر"
        },
        "feedback": {
          "en": "Pausing starves the rumor of oxygen.",
          "ar": "التوقف يحرم الشائعة من الأكسجين.",
        "arEG": "التوقف يحرم الشائعة من الأكسجين."
        },
        "lesson": {
          "en": "Time is the enemy of false urgency.",
          "ar": "الوقت هو عدو الاستعجال الزائف.",
        "arEG": "الوقت هو عدو الاستعجال الزائف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "pause"
        ]
      }
    ]
  },
  {
    "id": "immunity-rumors-5",
    "title": {
      "en": "Rumor Round 5",
      "ar": "جولة الشائعات 5",
    "arEG": "جولة الشائعات 5"
    },
    "scene": {
      "en": "A viral post claims an immediate health or security threat in the local area. (Case 5)",
      "ar": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 5)",
    "arEG": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 5)"
    },
    "prompt": {
      "en": "Which reaction accelerates the panic?",
      "ar": "أي رد فعل يسرع الذعر؟",
    "arEG": "أي رد فعل يسرع الذعر؟"
    },
    "objective": {
      "en": "Identify fear-based virality",
      "ar": "تحديد الانتشار القائم على الخوف",
    "arEG": "تحديد الانتشار القائم على الخوف"
    },
    "choices": [
      {
        "id": "r4-1",
        "label": {
          "en": "Share immediately to warn family",
          "ar": "شارك فوراً لتحذير العائلة",
        "arEG": "شارك فوراً لتحذير العائلة"
        },
        "effectLabel": {
          "en": "Panic Spread",
          "ar": "انتشار الذعر",
        "arEG": "انتشار الذعر"
        },
        "feedback": {
          "en": "Spreading unverified threats causes more harm than the threat itself.",
          "ar": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه.",
        "arEG": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه."
        },
        "lesson": {
          "en": "Always verify with official local sources before sharing.",
          "ar": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة.",
        "arEG": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "fear",
          "urgency"
        ]
      },
      {
        "id": "r4-2",
        "label": {
          "en": "Check the official Ministry page",
          "ar": "تحقق من صفحة الوزارة الرسمية",
        "arEG": "تحقق من صفحة الوزارة الرسمية"
        },
        "effectLabel": {
          "en": "Verification",
          "ar": "تحقق",
        "arEG": "تحقق"
        },
        "feedback": {
          "en": "This stops the rumor, which is good for reality but bad for the simulation.",
          "ar": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة.",
        "arEG": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة."
        },
        "lesson": {
          "en": "Verification stops virality.",
          "ar": "التحقق يوقف الانتشار.",
        "arEG": "التحقق يوقف الانتشار."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "verify"
        ]
      },
      {
        "id": "r4-3",
        "label": {
          "en": "Wait for more context",
          "ar": "انتظر لمزيد من السياق",
        "arEG": "انتظر لمزيد من السياق"
        },
        "effectLabel": {
          "en": "Patience",
          "ar": "صبر",
        "arEG": "صبر"
        },
        "feedback": {
          "en": "Pausing starves the rumor of oxygen.",
          "ar": "التوقف يحرم الشائعة من الأكسجين.",
        "arEG": "التوقف يحرم الشائعة من الأكسجين."
        },
        "lesson": {
          "en": "Time is the enemy of false urgency.",
          "ar": "الوقت هو عدو الاستعجال الزائف.",
        "arEG": "الوقت هو عدو الاستعجال الزائف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "pause"
        ]
      }
    ]
  },
  {
    "id": "immunity-rumors-6",
    "title": {
      "en": "Rumor Round 6",
      "ar": "جولة الشائعات 6",
    "arEG": "جولة الشائعات 6"
    },
    "scene": {
      "en": "A viral post claims an immediate health or security threat in the local area. (Case 6)",
      "ar": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 6)",
    "arEG": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 6)"
    },
    "prompt": {
      "en": "Which reaction accelerates the panic?",
      "ar": "أي رد فعل يسرع الذعر؟",
    "arEG": "أي رد فعل يسرع الذعر؟"
    },
    "objective": {
      "en": "Identify fear-based virality",
      "ar": "تحديد الانتشار القائم على الخوف",
    "arEG": "تحديد الانتشار القائم على الخوف"
    },
    "choices": [
      {
        "id": "r5-1",
        "label": {
          "en": "Share immediately to warn family",
          "ar": "شارك فوراً لتحذير العائلة",
        "arEG": "شارك فوراً لتحذير العائلة"
        },
        "effectLabel": {
          "en": "Panic Spread",
          "ar": "انتشار الذعر",
        "arEG": "انتشار الذعر"
        },
        "feedback": {
          "en": "Spreading unverified threats causes more harm than the threat itself.",
          "ar": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه.",
        "arEG": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه."
        },
        "lesson": {
          "en": "Always verify with official local sources before sharing.",
          "ar": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة.",
        "arEG": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "fear",
          "urgency"
        ]
      },
      {
        "id": "r5-2",
        "label": {
          "en": "Check the official Ministry page",
          "ar": "تحقق من صفحة الوزارة الرسمية",
        "arEG": "تحقق من صفحة الوزارة الرسمية"
        },
        "effectLabel": {
          "en": "Verification",
          "ar": "تحقق",
        "arEG": "تحقق"
        },
        "feedback": {
          "en": "This stops the rumor, which is good for reality but bad for the simulation.",
          "ar": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة.",
        "arEG": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة."
        },
        "lesson": {
          "en": "Verification stops virality.",
          "ar": "التحقق يوقف الانتشار.",
        "arEG": "التحقق يوقف الانتشار."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "verify"
        ]
      },
      {
        "id": "r5-3",
        "label": {
          "en": "Wait for more context",
          "ar": "انتظر لمزيد من السياق",
        "arEG": "انتظر لمزيد من السياق"
        },
        "effectLabel": {
          "en": "Patience",
          "ar": "صبر",
        "arEG": "صبر"
        },
        "feedback": {
          "en": "Pausing starves the rumor of oxygen.",
          "ar": "التوقف يحرم الشائعة من الأكسجين.",
        "arEG": "التوقف يحرم الشائعة من الأكسجين."
        },
        "lesson": {
          "en": "Time is the enemy of false urgency.",
          "ar": "الوقت هو عدو الاستعجال الزائف.",
        "arEG": "الوقت هو عدو الاستعجال الزائف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "pause"
        ]
      }
    ]
  },
  {
    "id": "immunity-rumors-7",
    "title": {
      "en": "Rumor Round 7",
      "ar": "جولة الشائعات 7",
    "arEG": "جولة الشائعات 7"
    },
    "scene": {
      "en": "A viral post claims an immediate health or security threat in the local area. (Case 7)",
      "ar": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 7)",
    "arEG": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 7)"
    },
    "prompt": {
      "en": "Which reaction accelerates the panic?",
      "ar": "أي رد فعل يسرع الذعر؟",
    "arEG": "أي رد فعل يسرع الذعر؟"
    },
    "objective": {
      "en": "Identify fear-based virality",
      "ar": "تحديد الانتشار القائم على الخوف",
    "arEG": "تحديد الانتشار القائم على الخوف"
    },
    "choices": [
      {
        "id": "r6-1",
        "label": {
          "en": "Share immediately to warn family",
          "ar": "شارك فوراً لتحذير العائلة",
        "arEG": "شارك فوراً لتحذير العائلة"
        },
        "effectLabel": {
          "en": "Panic Spread",
          "ar": "انتشار الذعر",
        "arEG": "انتشار الذعر"
        },
        "feedback": {
          "en": "Spreading unverified threats causes more harm than the threat itself.",
          "ar": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه.",
        "arEG": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه."
        },
        "lesson": {
          "en": "Always verify with official local sources before sharing.",
          "ar": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة.",
        "arEG": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "fear",
          "urgency"
        ]
      },
      {
        "id": "r6-2",
        "label": {
          "en": "Check the official Ministry page",
          "ar": "تحقق من صفحة الوزارة الرسمية",
        "arEG": "تحقق من صفحة الوزارة الرسمية"
        },
        "effectLabel": {
          "en": "Verification",
          "ar": "تحقق",
        "arEG": "تحقق"
        },
        "feedback": {
          "en": "This stops the rumor, which is good for reality but bad for the simulation.",
          "ar": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة.",
        "arEG": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة."
        },
        "lesson": {
          "en": "Verification stops virality.",
          "ar": "التحقق يوقف الانتشار.",
        "arEG": "التحقق يوقف الانتشار."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "verify"
        ]
      },
      {
        "id": "r6-3",
        "label": {
          "en": "Wait for more context",
          "ar": "انتظر لمزيد من السياق",
        "arEG": "انتظر لمزيد من السياق"
        },
        "effectLabel": {
          "en": "Patience",
          "ar": "صبر",
        "arEG": "صبر"
        },
        "feedback": {
          "en": "Pausing starves the rumor of oxygen.",
          "ar": "التوقف يحرم الشائعة من الأكسجين.",
        "arEG": "التوقف يحرم الشائعة من الأكسجين."
        },
        "lesson": {
          "en": "Time is the enemy of false urgency.",
          "ar": "الوقت هو عدو الاستعجال الزائف.",
        "arEG": "الوقت هو عدو الاستعجال الزائف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "pause"
        ]
      }
    ]
  },
  {
    "id": "immunity-rumors-8",
    "title": {
      "en": "Rumor Round 8",
      "ar": "جولة الشائعات 8",
    "arEG": "جولة الشائعات 8"
    },
    "scene": {
      "en": "A viral post claims an immediate health or security threat in the local area. (Case 8)",
      "ar": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 8)",
    "arEG": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 8)"
    },
    "prompt": {
      "en": "Which reaction accelerates the panic?",
      "ar": "أي رد فعل يسرع الذعر؟",
    "arEG": "أي رد فعل يسرع الذعر؟"
    },
    "objective": {
      "en": "Identify fear-based virality",
      "ar": "تحديد الانتشار القائم على الخوف",
    "arEG": "تحديد الانتشار القائم على الخوف"
    },
    "choices": [
      {
        "id": "r7-1",
        "label": {
          "en": "Share immediately to warn family",
          "ar": "شارك فوراً لتحذير العائلة",
        "arEG": "شارك فوراً لتحذير العائلة"
        },
        "effectLabel": {
          "en": "Panic Spread",
          "ar": "انتشار الذعر",
        "arEG": "انتشار الذعر"
        },
        "feedback": {
          "en": "Spreading unverified threats causes more harm than the threat itself.",
          "ar": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه.",
        "arEG": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه."
        },
        "lesson": {
          "en": "Always verify with official local sources before sharing.",
          "ar": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة.",
        "arEG": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "fear",
          "urgency"
        ]
      },
      {
        "id": "r7-2",
        "label": {
          "en": "Check the official Ministry page",
          "ar": "تحقق من صفحة الوزارة الرسمية",
        "arEG": "تحقق من صفحة الوزارة الرسمية"
        },
        "effectLabel": {
          "en": "Verification",
          "ar": "تحقق",
        "arEG": "تحقق"
        },
        "feedback": {
          "en": "This stops the rumor, which is good for reality but bad for the simulation.",
          "ar": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة.",
        "arEG": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة."
        },
        "lesson": {
          "en": "Verification stops virality.",
          "ar": "التحقق يوقف الانتشار.",
        "arEG": "التحقق يوقف الانتشار."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "verify"
        ]
      },
      {
        "id": "r7-3",
        "label": {
          "en": "Wait for more context",
          "ar": "انتظر لمزيد من السياق",
        "arEG": "انتظر لمزيد من السياق"
        },
        "effectLabel": {
          "en": "Patience",
          "ar": "صبر",
        "arEG": "صبر"
        },
        "feedback": {
          "en": "Pausing starves the rumor of oxygen.",
          "ar": "التوقف يحرم الشائعة من الأكسجين.",
        "arEG": "التوقف يحرم الشائعة من الأكسجين."
        },
        "lesson": {
          "en": "Time is the enemy of false urgency.",
          "ar": "الوقت هو عدو الاستعجال الزائف.",
        "arEG": "الوقت هو عدو الاستعجال الزائف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "pause"
        ]
      }
    ]
  },
  {
    "id": "immunity-rumors-9",
    "title": {
      "en": "Rumor Round 9",
      "ar": "جولة الشائعات 9",
    "arEG": "جولة الشائعات 9"
    },
    "scene": {
      "en": "A viral post claims an immediate health or security threat in the local area. (Case 9)",
      "ar": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 9)",
    "arEG": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 9)"
    },
    "prompt": {
      "en": "Which reaction accelerates the panic?",
      "ar": "أي رد فعل يسرع الذعر؟",
    "arEG": "أي رد فعل يسرع الذعر؟"
    },
    "objective": {
      "en": "Identify fear-based virality",
      "ar": "تحديد الانتشار القائم على الخوف",
    "arEG": "تحديد الانتشار القائم على الخوف"
    },
    "choices": [
      {
        "id": "r8-1",
        "label": {
          "en": "Share immediately to warn family",
          "ar": "شارك فوراً لتحذير العائلة",
        "arEG": "شارك فوراً لتحذير العائلة"
        },
        "effectLabel": {
          "en": "Panic Spread",
          "ar": "انتشار الذعر",
        "arEG": "انتشار الذعر"
        },
        "feedback": {
          "en": "Spreading unverified threats causes more harm than the threat itself.",
          "ar": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه.",
        "arEG": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه."
        },
        "lesson": {
          "en": "Always verify with official local sources before sharing.",
          "ar": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة.",
        "arEG": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "fear",
          "urgency"
        ]
      },
      {
        "id": "r8-2",
        "label": {
          "en": "Check the official Ministry page",
          "ar": "تحقق من صفحة الوزارة الرسمية",
        "arEG": "تحقق من صفحة الوزارة الرسمية"
        },
        "effectLabel": {
          "en": "Verification",
          "ar": "تحقق",
        "arEG": "تحقق"
        },
        "feedback": {
          "en": "This stops the rumor, which is good for reality but bad for the simulation.",
          "ar": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة.",
        "arEG": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة."
        },
        "lesson": {
          "en": "Verification stops virality.",
          "ar": "التحقق يوقف الانتشار.",
        "arEG": "التحقق يوقف الانتشار."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "verify"
        ]
      },
      {
        "id": "r8-3",
        "label": {
          "en": "Wait for more context",
          "ar": "انتظر لمزيد من السياق",
        "arEG": "انتظر لمزيد من السياق"
        },
        "effectLabel": {
          "en": "Patience",
          "ar": "صبر",
        "arEG": "صبر"
        },
        "feedback": {
          "en": "Pausing starves the rumor of oxygen.",
          "ar": "التوقف يحرم الشائعة من الأكسجين.",
        "arEG": "التوقف يحرم الشائعة من الأكسجين."
        },
        "lesson": {
          "en": "Time is the enemy of false urgency.",
          "ar": "الوقت هو عدو الاستعجال الزائف.",
        "arEG": "الوقت هو عدو الاستعجال الزائف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "pause"
        ]
      }
    ]
  },
  {
    "id": "immunity-rumors-10",
    "title": {
      "en": "Rumor Round 10",
      "ar": "جولة الشائعات 10",
    "arEG": "جولة الشائعات 10"
    },
    "scene": {
      "en": "A viral post claims an immediate health or security threat in the local area. (Case 10)",
      "ar": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 10)",
    "arEG": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 10)"
    },
    "prompt": {
      "en": "Which reaction accelerates the panic?",
      "ar": "أي رد فعل يسرع الذعر؟",
    "arEG": "أي رد فعل يسرع الذعر؟"
    },
    "objective": {
      "en": "Identify fear-based virality",
      "ar": "تحديد الانتشار القائم على الخوف",
    "arEG": "تحديد الانتشار القائم على الخوف"
    },
    "choices": [
      {
        "id": "r9-1",
        "label": {
          "en": "Share immediately to warn family",
          "ar": "شارك فوراً لتحذير العائلة",
        "arEG": "شارك فوراً لتحذير العائلة"
        },
        "effectLabel": {
          "en": "Panic Spread",
          "ar": "انتشار الذعر",
        "arEG": "انتشار الذعر"
        },
        "feedback": {
          "en": "Spreading unverified threats causes more harm than the threat itself.",
          "ar": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه.",
        "arEG": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه."
        },
        "lesson": {
          "en": "Always verify with official local sources before sharing.",
          "ar": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة.",
        "arEG": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "fear",
          "urgency"
        ]
      },
      {
        "id": "r9-2",
        "label": {
          "en": "Check the official Ministry page",
          "ar": "تحقق من صفحة الوزارة الرسمية",
        "arEG": "تحقق من صفحة الوزارة الرسمية"
        },
        "effectLabel": {
          "en": "Verification",
          "ar": "تحقق",
        "arEG": "تحقق"
        },
        "feedback": {
          "en": "This stops the rumor, which is good for reality but bad for the simulation.",
          "ar": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة.",
        "arEG": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة."
        },
        "lesson": {
          "en": "Verification stops virality.",
          "ar": "التحقق يوقف الانتشار.",
        "arEG": "التحقق يوقف الانتشار."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "verify"
        ]
      },
      {
        "id": "r9-3",
        "label": {
          "en": "Wait for more context",
          "ar": "انتظر لمزيد من السياق",
        "arEG": "انتظر لمزيد من السياق"
        },
        "effectLabel": {
          "en": "Patience",
          "ar": "صبر",
        "arEG": "صبر"
        },
        "feedback": {
          "en": "Pausing starves the rumor of oxygen.",
          "ar": "التوقف يحرم الشائعة من الأكسجين.",
        "arEG": "التوقف يحرم الشائعة من الأكسجين."
        },
        "lesson": {
          "en": "Time is the enemy of false urgency.",
          "ar": "الوقت هو عدو الاستعجال الزائف.",
        "arEG": "الوقت هو عدو الاستعجال الزائف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "pause"
        ]
      }
    ]
  },
  {
    "id": "immunity-rumors-11",
    "title": {
      "en": "Rumor Round 11",
      "ar": "جولة الشائعات 11",
    "arEG": "جولة الشائعات 11"
    },
    "scene": {
      "en": "A viral post claims an immediate health or security threat in the local area. (Case 11)",
      "ar": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 11)",
    "arEG": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 11)"
    },
    "prompt": {
      "en": "Which reaction accelerates the panic?",
      "ar": "أي رد فعل يسرع الذعر؟",
    "arEG": "أي رد فعل يسرع الذعر؟"
    },
    "objective": {
      "en": "Identify fear-based virality",
      "ar": "تحديد الانتشار القائم على الخوف",
    "arEG": "تحديد الانتشار القائم على الخوف"
    },
    "choices": [
      {
        "id": "r10-1",
        "label": {
          "en": "Share immediately to warn family",
          "ar": "شارك فوراً لتحذير العائلة",
        "arEG": "شارك فوراً لتحذير العائلة"
        },
        "effectLabel": {
          "en": "Panic Spread",
          "ar": "انتشار الذعر",
        "arEG": "انتشار الذعر"
        },
        "feedback": {
          "en": "Spreading unverified threats causes more harm than the threat itself.",
          "ar": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه.",
        "arEG": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه."
        },
        "lesson": {
          "en": "Always verify with official local sources before sharing.",
          "ar": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة.",
        "arEG": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "fear",
          "urgency"
        ]
      },
      {
        "id": "r10-2",
        "label": {
          "en": "Check the official Ministry page",
          "ar": "تحقق من صفحة الوزارة الرسمية",
        "arEG": "تحقق من صفحة الوزارة الرسمية"
        },
        "effectLabel": {
          "en": "Verification",
          "ar": "تحقق",
        "arEG": "تحقق"
        },
        "feedback": {
          "en": "This stops the rumor, which is good for reality but bad for the simulation.",
          "ar": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة.",
        "arEG": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة."
        },
        "lesson": {
          "en": "Verification stops virality.",
          "ar": "التحقق يوقف الانتشار.",
        "arEG": "التحقق يوقف الانتشار."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "verify"
        ]
      },
      {
        "id": "r10-3",
        "label": {
          "en": "Wait for more context",
          "ar": "انتظر لمزيد من السياق",
        "arEG": "انتظر لمزيد من السياق"
        },
        "effectLabel": {
          "en": "Patience",
          "ar": "صبر",
        "arEG": "صبر"
        },
        "feedback": {
          "en": "Pausing starves the rumor of oxygen.",
          "ar": "التوقف يحرم الشائعة من الأكسجين.",
        "arEG": "التوقف يحرم الشائعة من الأكسجين."
        },
        "lesson": {
          "en": "Time is the enemy of false urgency.",
          "ar": "الوقت هو عدو الاستعجال الزائف.",
        "arEG": "الوقت هو عدو الاستعجال الزائف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "pause"
        ]
      }
    ]
  },
  {
    "id": "immunity-rumors-12",
    "title": {
      "en": "Rumor Round 12",
      "ar": "جولة الشائعات 12",
    "arEG": "جولة الشائعات 12"
    },
    "scene": {
      "en": "A viral post claims an immediate health or security threat in the local area. (Case 12)",
      "ar": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 12)",
    "arEG": "منشور فيروسي يدعي وجود تهديد صحي أو أمني فوري في المنطقة المحلية. (حالة 12)"
    },
    "prompt": {
      "en": "Which reaction accelerates the panic?",
      "ar": "أي رد فعل يسرع الذعر؟",
    "arEG": "أي رد فعل يسرع الذعر؟"
    },
    "objective": {
      "en": "Identify fear-based virality",
      "ar": "تحديد الانتشار القائم على الخوف",
    "arEG": "تحديد الانتشار القائم على الخوف"
    },
    "choices": [
      {
        "id": "r11-1",
        "label": {
          "en": "Share immediately to warn family",
          "ar": "شارك فوراً لتحذير العائلة",
        "arEG": "شارك فوراً لتحذير العائلة"
        },
        "effectLabel": {
          "en": "Panic Spread",
          "ar": "انتشار الذعر",
        "arEG": "انتشار الذعر"
        },
        "feedback": {
          "en": "Spreading unverified threats causes more harm than the threat itself.",
          "ar": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه.",
        "arEG": "نشر التهديدات غير الموثقة يسبب ضرراً أكبر من التهديد نفسه."
        },
        "lesson": {
          "en": "Always verify with official local sources before sharing.",
          "ar": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة.",
        "arEG": "تحقق دائماً من المصادر المحلية الرسمية قبل المشاركة."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "fear",
          "urgency"
        ]
      },
      {
        "id": "r11-2",
        "label": {
          "en": "Check the official Ministry page",
          "ar": "تحقق من صفحة الوزارة الرسمية",
        "arEG": "تحقق من صفحة الوزارة الرسمية"
        },
        "effectLabel": {
          "en": "Verification",
          "ar": "تحقق",
        "arEG": "تحقق"
        },
        "feedback": {
          "en": "This stops the rumor, which is good for reality but bad for the simulation.",
          "ar": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة.",
        "arEG": "هذا يوقف الشائعة، وهو أمر جيد للواقع ولكنه سيء للمحاكاة."
        },
        "lesson": {
          "en": "Verification stops virality.",
          "ar": "التحقق يوقف الانتشار.",
        "arEG": "التحقق يوقف الانتشار."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "verify"
        ]
      },
      {
        "id": "r11-3",
        "label": {
          "en": "Wait for more context",
          "ar": "انتظر لمزيد من السياق",
        "arEG": "انتظر لمزيد من السياق"
        },
        "effectLabel": {
          "en": "Patience",
          "ar": "صبر",
        "arEG": "صبر"
        },
        "feedback": {
          "en": "Pausing starves the rumor of oxygen.",
          "ar": "التوقف يحرم الشائعة من الأكسجين.",
        "arEG": "التوقف يحرم الشائعة من الأكسجين."
        },
        "lesson": {
          "en": "Time is the enemy of false urgency.",
          "ar": "الوقت هو عدو الاستعجال الزائف.",
        "arEG": "الوقت هو عدو الاستعجال الزائف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "pause"
        ]
      }
    ]
  }
]
};

export const IMMUNITY_SCAMS_MODE: DeepRealGameModeDefinition = {
  id: "immunity-scams" as any,
  title: t("Immunity Lab: Scams", "مختبر المناعة: الاحتيال"),
  subtitle: t("Detect financial and phishing scams designed for the MENA region.", "اكتشاف الاحتيال المالي والتصيد المصمم لمنطقة الشرق الأوسط وشمال أفريقيا."),
  roleLabel: t("Fraud Detector", "مكتشف الاحتيال"),
  scoreLabel: t("Resilience Score", "درجة المرونة"),
  warning: t("Scams evolve fast. Learn to spot the underlying pressure mechanics.", "عمليات الاحتيال تتطور بسرعة. تعلم اكتشاف آليات الضغط الأساسية."),
  completionTitle: t("Scam tactics exposed.", "تم كشف تكتيكات الاحتيال."),
  completionSummary: t("You disabled 12 scam architectures.", "لقد عطلت 12 بنية احتيال."),
  sources: [source("Central Bank of Egypt", "البنك المركزي المصري", "https://www.cbe.org.eg/")],
  rounds: [
  {
    "id": "immunity-scams-1",
    "title": {
      "en": "Scam Round 1",
      "ar": "جولة الاحتيال 1",
    "arEG": "جولة الاحتيال 1"
    },
    "scene": {
      "en": "A sponsored ad promises immediate financial returns or fake scholarships. (Case 1)",
      "ar": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 1)",
    "arEG": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 1)"
    },
    "prompt": {
      "en": "What makes this scam effective?",
      "ar": "ما الذي يجعل هذا الاحتيال فعالاً؟",
    "arEG": "ما الذي يجعل هذا الاحتيال فعالاً؟"
    },
    "objective": {
      "en": "Spot financial pressure tactics",
      "ar": "اكتشاف تكتيكات الضغط المالي",
    "arEG": "اكتشاف تكتيكات الضغط المالي"
    },
    "choices": [
      {
        "id": "s0-1",
        "label": {
          "en": "Adding a fake urgency timer (Ends in 5 mins!)",
          "ar": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)",
        "arEG": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)"
        },
        "effectLabel": {
          "en": "Urgency Trap",
          "ar": "فخ الاستعجال",
        "arEG": "فخ الاستعجال"
        },
        "feedback": {
          "en": "Scams rely on disabling your logical brain with artificial time pressure.",
          "ar": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع.",
        "arEG": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع."
        },
        "lesson": {
          "en": "Legitimate financial or academic processes do not force 5-minute decisions.",
          "ar": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق.",
        "arEG": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "scam",
          "timer"
        ]
      },
      {
        "id": "s0-2",
        "label": {
          "en": "Researching the URL domain",
          "ar": "البحث في نطاق الرابط",
        "arEG": "البحث في نطاق الرابط"
        },
        "effectLabel": {
          "en": "Technical Verification",
          "ar": "تحقق تقني",
        "arEG": "تحقق تقني"
        },
        "feedback": {
          "en": "Checking domains ruins the scammer’s illusion.",
          "ar": "التحقق من النطاقات يدمر وهم المحتال.",
        "arEG": "التحقق من النطاقات يدمر وهم المحتال."
        },
        "lesson": {
          "en": "Always check the real URL, not just the display name.",
          "ar": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض.",
        "arEG": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "domain",
          "verify"
        ]
      },
      {
        "id": "s0-3",
        "label": {
          "en": "Looking for official contact info",
          "ar": "البحث عن معلومات الاتصال الرسمية",
        "arEG": "البحث عن معلومات الاتصال الرسمية"
        },
        "effectLabel": {
          "en": "Institutional Check",
          "ar": "تحقق مؤسسي",
        "arEG": "تحقق مؤسسي"
        },
        "feedback": {
          "en": "Real institutions have traceable physical and digital footprints.",
          "ar": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع.",
        "arEG": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع."
        },
        "lesson": {
          "en": "Never pay via unknown links without verifying the host.",
          "ar": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف.",
        "arEG": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "institution"
        ]
      }
    ]
  },
  {
    "id": "immunity-scams-2",
    "title": {
      "en": "Scam Round 2",
      "ar": "جولة الاحتيال 2",
    "arEG": "جولة الاحتيال 2"
    },
    "scene": {
      "en": "A sponsored ad promises immediate financial returns or fake scholarships. (Case 2)",
      "ar": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 2)",
    "arEG": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 2)"
    },
    "prompt": {
      "en": "What makes this scam effective?",
      "ar": "ما الذي يجعل هذا الاحتيال فعالاً؟",
    "arEG": "ما الذي يجعل هذا الاحتيال فعالاً؟"
    },
    "objective": {
      "en": "Spot financial pressure tactics",
      "ar": "اكتشاف تكتيكات الضغط المالي",
    "arEG": "اكتشاف تكتيكات الضغط المالي"
    },
    "choices": [
      {
        "id": "s1-1",
        "label": {
          "en": "Adding a fake urgency timer (Ends in 5 mins!)",
          "ar": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)",
        "arEG": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)"
        },
        "effectLabel": {
          "en": "Urgency Trap",
          "ar": "فخ الاستعجال",
        "arEG": "فخ الاستعجال"
        },
        "feedback": {
          "en": "Scams rely on disabling your logical brain with artificial time pressure.",
          "ar": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع.",
        "arEG": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع."
        },
        "lesson": {
          "en": "Legitimate financial or academic processes do not force 5-minute decisions.",
          "ar": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق.",
        "arEG": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "scam",
          "timer"
        ]
      },
      {
        "id": "s1-2",
        "label": {
          "en": "Researching the URL domain",
          "ar": "البحث في نطاق الرابط",
        "arEG": "البحث في نطاق الرابط"
        },
        "effectLabel": {
          "en": "Technical Verification",
          "ar": "تحقق تقني",
        "arEG": "تحقق تقني"
        },
        "feedback": {
          "en": "Checking domains ruins the scammer’s illusion.",
          "ar": "التحقق من النطاقات يدمر وهم المحتال.",
        "arEG": "التحقق من النطاقات يدمر وهم المحتال."
        },
        "lesson": {
          "en": "Always check the real URL, not just the display name.",
          "ar": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض.",
        "arEG": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "domain",
          "verify"
        ]
      },
      {
        "id": "s1-3",
        "label": {
          "en": "Looking for official contact info",
          "ar": "البحث عن معلومات الاتصال الرسمية",
        "arEG": "البحث عن معلومات الاتصال الرسمية"
        },
        "effectLabel": {
          "en": "Institutional Check",
          "ar": "تحقق مؤسسي",
        "arEG": "تحقق مؤسسي"
        },
        "feedback": {
          "en": "Real institutions have traceable physical and digital footprints.",
          "ar": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع.",
        "arEG": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع."
        },
        "lesson": {
          "en": "Never pay via unknown links without verifying the host.",
          "ar": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف.",
        "arEG": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "institution"
        ]
      }
    ]
  },
  {
    "id": "immunity-scams-3",
    "title": {
      "en": "Scam Round 3",
      "ar": "جولة الاحتيال 3",
    "arEG": "جولة الاحتيال 3"
    },
    "scene": {
      "en": "A sponsored ad promises immediate financial returns or fake scholarships. (Case 3)",
      "ar": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 3)",
    "arEG": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 3)"
    },
    "prompt": {
      "en": "What makes this scam effective?",
      "ar": "ما الذي يجعل هذا الاحتيال فعالاً؟",
    "arEG": "ما الذي يجعل هذا الاحتيال فعالاً؟"
    },
    "objective": {
      "en": "Spot financial pressure tactics",
      "ar": "اكتشاف تكتيكات الضغط المالي",
    "arEG": "اكتشاف تكتيكات الضغط المالي"
    },
    "choices": [
      {
        "id": "s2-1",
        "label": {
          "en": "Adding a fake urgency timer (Ends in 5 mins!)",
          "ar": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)",
        "arEG": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)"
        },
        "effectLabel": {
          "en": "Urgency Trap",
          "ar": "فخ الاستعجال",
        "arEG": "فخ الاستعجال"
        },
        "feedback": {
          "en": "Scams rely on disabling your logical brain with artificial time pressure.",
          "ar": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع.",
        "arEG": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع."
        },
        "lesson": {
          "en": "Legitimate financial or academic processes do not force 5-minute decisions.",
          "ar": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق.",
        "arEG": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "scam",
          "timer"
        ]
      },
      {
        "id": "s2-2",
        "label": {
          "en": "Researching the URL domain",
          "ar": "البحث في نطاق الرابط",
        "arEG": "البحث في نطاق الرابط"
        },
        "effectLabel": {
          "en": "Technical Verification",
          "ar": "تحقق تقني",
        "arEG": "تحقق تقني"
        },
        "feedback": {
          "en": "Checking domains ruins the scammer’s illusion.",
          "ar": "التحقق من النطاقات يدمر وهم المحتال.",
        "arEG": "التحقق من النطاقات يدمر وهم المحتال."
        },
        "lesson": {
          "en": "Always check the real URL, not just the display name.",
          "ar": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض.",
        "arEG": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "domain",
          "verify"
        ]
      },
      {
        "id": "s2-3",
        "label": {
          "en": "Looking for official contact info",
          "ar": "البحث عن معلومات الاتصال الرسمية",
        "arEG": "البحث عن معلومات الاتصال الرسمية"
        },
        "effectLabel": {
          "en": "Institutional Check",
          "ar": "تحقق مؤسسي",
        "arEG": "تحقق مؤسسي"
        },
        "feedback": {
          "en": "Real institutions have traceable physical and digital footprints.",
          "ar": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع.",
        "arEG": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع."
        },
        "lesson": {
          "en": "Never pay via unknown links without verifying the host.",
          "ar": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف.",
        "arEG": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "institution"
        ]
      }
    ]
  },
  {
    "id": "immunity-scams-4",
    "title": {
      "en": "Scam Round 4",
      "ar": "جولة الاحتيال 4",
    "arEG": "جولة الاحتيال 4"
    },
    "scene": {
      "en": "A sponsored ad promises immediate financial returns or fake scholarships. (Case 4)",
      "ar": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 4)",
    "arEG": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 4)"
    },
    "prompt": {
      "en": "What makes this scam effective?",
      "ar": "ما الذي يجعل هذا الاحتيال فعالاً؟",
    "arEG": "ما الذي يجعل هذا الاحتيال فعالاً؟"
    },
    "objective": {
      "en": "Spot financial pressure tactics",
      "ar": "اكتشاف تكتيكات الضغط المالي",
    "arEG": "اكتشاف تكتيكات الضغط المالي"
    },
    "choices": [
      {
        "id": "s3-1",
        "label": {
          "en": "Adding a fake urgency timer (Ends in 5 mins!)",
          "ar": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)",
        "arEG": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)"
        },
        "effectLabel": {
          "en": "Urgency Trap",
          "ar": "فخ الاستعجال",
        "arEG": "فخ الاستعجال"
        },
        "feedback": {
          "en": "Scams rely on disabling your logical brain with artificial time pressure.",
          "ar": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع.",
        "arEG": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع."
        },
        "lesson": {
          "en": "Legitimate financial or academic processes do not force 5-minute decisions.",
          "ar": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق.",
        "arEG": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "scam",
          "timer"
        ]
      },
      {
        "id": "s3-2",
        "label": {
          "en": "Researching the URL domain",
          "ar": "البحث في نطاق الرابط",
        "arEG": "البحث في نطاق الرابط"
        },
        "effectLabel": {
          "en": "Technical Verification",
          "ar": "تحقق تقني",
        "arEG": "تحقق تقني"
        },
        "feedback": {
          "en": "Checking domains ruins the scammer’s illusion.",
          "ar": "التحقق من النطاقات يدمر وهم المحتال.",
        "arEG": "التحقق من النطاقات يدمر وهم المحتال."
        },
        "lesson": {
          "en": "Always check the real URL, not just the display name.",
          "ar": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض.",
        "arEG": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "domain",
          "verify"
        ]
      },
      {
        "id": "s3-3",
        "label": {
          "en": "Looking for official contact info",
          "ar": "البحث عن معلومات الاتصال الرسمية",
        "arEG": "البحث عن معلومات الاتصال الرسمية"
        },
        "effectLabel": {
          "en": "Institutional Check",
          "ar": "تحقق مؤسسي",
        "arEG": "تحقق مؤسسي"
        },
        "feedback": {
          "en": "Real institutions have traceable physical and digital footprints.",
          "ar": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع.",
        "arEG": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع."
        },
        "lesson": {
          "en": "Never pay via unknown links without verifying the host.",
          "ar": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف.",
        "arEG": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "institution"
        ]
      }
    ]
  },
  {
    "id": "immunity-scams-5",
    "title": {
      "en": "Scam Round 5",
      "ar": "جولة الاحتيال 5",
    "arEG": "جولة الاحتيال 5"
    },
    "scene": {
      "en": "A sponsored ad promises immediate financial returns or fake scholarships. (Case 5)",
      "ar": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 5)",
    "arEG": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 5)"
    },
    "prompt": {
      "en": "What makes this scam effective?",
      "ar": "ما الذي يجعل هذا الاحتيال فعالاً؟",
    "arEG": "ما الذي يجعل هذا الاحتيال فعالاً؟"
    },
    "objective": {
      "en": "Spot financial pressure tactics",
      "ar": "اكتشاف تكتيكات الضغط المالي",
    "arEG": "اكتشاف تكتيكات الضغط المالي"
    },
    "choices": [
      {
        "id": "s4-1",
        "label": {
          "en": "Adding a fake urgency timer (Ends in 5 mins!)",
          "ar": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)",
        "arEG": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)"
        },
        "effectLabel": {
          "en": "Urgency Trap",
          "ar": "فخ الاستعجال",
        "arEG": "فخ الاستعجال"
        },
        "feedback": {
          "en": "Scams rely on disabling your logical brain with artificial time pressure.",
          "ar": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع.",
        "arEG": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع."
        },
        "lesson": {
          "en": "Legitimate financial or academic processes do not force 5-minute decisions.",
          "ar": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق.",
        "arEG": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "scam",
          "timer"
        ]
      },
      {
        "id": "s4-2",
        "label": {
          "en": "Researching the URL domain",
          "ar": "البحث في نطاق الرابط",
        "arEG": "البحث في نطاق الرابط"
        },
        "effectLabel": {
          "en": "Technical Verification",
          "ar": "تحقق تقني",
        "arEG": "تحقق تقني"
        },
        "feedback": {
          "en": "Checking domains ruins the scammer’s illusion.",
          "ar": "التحقق من النطاقات يدمر وهم المحتال.",
        "arEG": "التحقق من النطاقات يدمر وهم المحتال."
        },
        "lesson": {
          "en": "Always check the real URL, not just the display name.",
          "ar": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض.",
        "arEG": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "domain",
          "verify"
        ]
      },
      {
        "id": "s4-3",
        "label": {
          "en": "Looking for official contact info",
          "ar": "البحث عن معلومات الاتصال الرسمية",
        "arEG": "البحث عن معلومات الاتصال الرسمية"
        },
        "effectLabel": {
          "en": "Institutional Check",
          "ar": "تحقق مؤسسي",
        "arEG": "تحقق مؤسسي"
        },
        "feedback": {
          "en": "Real institutions have traceable physical and digital footprints.",
          "ar": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع.",
        "arEG": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع."
        },
        "lesson": {
          "en": "Never pay via unknown links without verifying the host.",
          "ar": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف.",
        "arEG": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "institution"
        ]
      }
    ]
  },
  {
    "id": "immunity-scams-6",
    "title": {
      "en": "Scam Round 6",
      "ar": "جولة الاحتيال 6",
    "arEG": "جولة الاحتيال 6"
    },
    "scene": {
      "en": "A sponsored ad promises immediate financial returns or fake scholarships. (Case 6)",
      "ar": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 6)",
    "arEG": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 6)"
    },
    "prompt": {
      "en": "What makes this scam effective?",
      "ar": "ما الذي يجعل هذا الاحتيال فعالاً؟",
    "arEG": "ما الذي يجعل هذا الاحتيال فعالاً؟"
    },
    "objective": {
      "en": "Spot financial pressure tactics",
      "ar": "اكتشاف تكتيكات الضغط المالي",
    "arEG": "اكتشاف تكتيكات الضغط المالي"
    },
    "choices": [
      {
        "id": "s5-1",
        "label": {
          "en": "Adding a fake urgency timer (Ends in 5 mins!)",
          "ar": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)",
        "arEG": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)"
        },
        "effectLabel": {
          "en": "Urgency Trap",
          "ar": "فخ الاستعجال",
        "arEG": "فخ الاستعجال"
        },
        "feedback": {
          "en": "Scams rely on disabling your logical brain with artificial time pressure.",
          "ar": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع.",
        "arEG": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع."
        },
        "lesson": {
          "en": "Legitimate financial or academic processes do not force 5-minute decisions.",
          "ar": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق.",
        "arEG": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "scam",
          "timer"
        ]
      },
      {
        "id": "s5-2",
        "label": {
          "en": "Researching the URL domain",
          "ar": "البحث في نطاق الرابط",
        "arEG": "البحث في نطاق الرابط"
        },
        "effectLabel": {
          "en": "Technical Verification",
          "ar": "تحقق تقني",
        "arEG": "تحقق تقني"
        },
        "feedback": {
          "en": "Checking domains ruins the scammer’s illusion.",
          "ar": "التحقق من النطاقات يدمر وهم المحتال.",
        "arEG": "التحقق من النطاقات يدمر وهم المحتال."
        },
        "lesson": {
          "en": "Always check the real URL, not just the display name.",
          "ar": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض.",
        "arEG": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "domain",
          "verify"
        ]
      },
      {
        "id": "s5-3",
        "label": {
          "en": "Looking for official contact info",
          "ar": "البحث عن معلومات الاتصال الرسمية",
        "arEG": "البحث عن معلومات الاتصال الرسمية"
        },
        "effectLabel": {
          "en": "Institutional Check",
          "ar": "تحقق مؤسسي",
        "arEG": "تحقق مؤسسي"
        },
        "feedback": {
          "en": "Real institutions have traceable physical and digital footprints.",
          "ar": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع.",
        "arEG": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع."
        },
        "lesson": {
          "en": "Never pay via unknown links without verifying the host.",
          "ar": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف.",
        "arEG": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "institution"
        ]
      }
    ]
  },
  {
    "id": "immunity-scams-7",
    "title": {
      "en": "Scam Round 7",
      "ar": "جولة الاحتيال 7",
    "arEG": "جولة الاحتيال 7"
    },
    "scene": {
      "en": "A sponsored ad promises immediate financial returns or fake scholarships. (Case 7)",
      "ar": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 7)",
    "arEG": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 7)"
    },
    "prompt": {
      "en": "What makes this scam effective?",
      "ar": "ما الذي يجعل هذا الاحتيال فعالاً؟",
    "arEG": "ما الذي يجعل هذا الاحتيال فعالاً؟"
    },
    "objective": {
      "en": "Spot financial pressure tactics",
      "ar": "اكتشاف تكتيكات الضغط المالي",
    "arEG": "اكتشاف تكتيكات الضغط المالي"
    },
    "choices": [
      {
        "id": "s6-1",
        "label": {
          "en": "Adding a fake urgency timer (Ends in 5 mins!)",
          "ar": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)",
        "arEG": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)"
        },
        "effectLabel": {
          "en": "Urgency Trap",
          "ar": "فخ الاستعجال",
        "arEG": "فخ الاستعجال"
        },
        "feedback": {
          "en": "Scams rely on disabling your logical brain with artificial time pressure.",
          "ar": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع.",
        "arEG": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع."
        },
        "lesson": {
          "en": "Legitimate financial or academic processes do not force 5-minute decisions.",
          "ar": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق.",
        "arEG": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "scam",
          "timer"
        ]
      },
      {
        "id": "s6-2",
        "label": {
          "en": "Researching the URL domain",
          "ar": "البحث في نطاق الرابط",
        "arEG": "البحث في نطاق الرابط"
        },
        "effectLabel": {
          "en": "Technical Verification",
          "ar": "تحقق تقني",
        "arEG": "تحقق تقني"
        },
        "feedback": {
          "en": "Checking domains ruins the scammer’s illusion.",
          "ar": "التحقق من النطاقات يدمر وهم المحتال.",
        "arEG": "التحقق من النطاقات يدمر وهم المحتال."
        },
        "lesson": {
          "en": "Always check the real URL, not just the display name.",
          "ar": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض.",
        "arEG": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "domain",
          "verify"
        ]
      },
      {
        "id": "s6-3",
        "label": {
          "en": "Looking for official contact info",
          "ar": "البحث عن معلومات الاتصال الرسمية",
        "arEG": "البحث عن معلومات الاتصال الرسمية"
        },
        "effectLabel": {
          "en": "Institutional Check",
          "ar": "تحقق مؤسسي",
        "arEG": "تحقق مؤسسي"
        },
        "feedback": {
          "en": "Real institutions have traceable physical and digital footprints.",
          "ar": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع.",
        "arEG": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع."
        },
        "lesson": {
          "en": "Never pay via unknown links without verifying the host.",
          "ar": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف.",
        "arEG": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "institution"
        ]
      }
    ]
  },
  {
    "id": "immunity-scams-8",
    "title": {
      "en": "Scam Round 8",
      "ar": "جولة الاحتيال 8",
    "arEG": "جولة الاحتيال 8"
    },
    "scene": {
      "en": "A sponsored ad promises immediate financial returns or fake scholarships. (Case 8)",
      "ar": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 8)",
    "arEG": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 8)"
    },
    "prompt": {
      "en": "What makes this scam effective?",
      "ar": "ما الذي يجعل هذا الاحتيال فعالاً؟",
    "arEG": "ما الذي يجعل هذا الاحتيال فعالاً؟"
    },
    "objective": {
      "en": "Spot financial pressure tactics",
      "ar": "اكتشاف تكتيكات الضغط المالي",
    "arEG": "اكتشاف تكتيكات الضغط المالي"
    },
    "choices": [
      {
        "id": "s7-1",
        "label": {
          "en": "Adding a fake urgency timer (Ends in 5 mins!)",
          "ar": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)",
        "arEG": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)"
        },
        "effectLabel": {
          "en": "Urgency Trap",
          "ar": "فخ الاستعجال",
        "arEG": "فخ الاستعجال"
        },
        "feedback": {
          "en": "Scams rely on disabling your logical brain with artificial time pressure.",
          "ar": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع.",
        "arEG": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع."
        },
        "lesson": {
          "en": "Legitimate financial or academic processes do not force 5-minute decisions.",
          "ar": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق.",
        "arEG": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "scam",
          "timer"
        ]
      },
      {
        "id": "s7-2",
        "label": {
          "en": "Researching the URL domain",
          "ar": "البحث في نطاق الرابط",
        "arEG": "البحث في نطاق الرابط"
        },
        "effectLabel": {
          "en": "Technical Verification",
          "ar": "تحقق تقني",
        "arEG": "تحقق تقني"
        },
        "feedback": {
          "en": "Checking domains ruins the scammer’s illusion.",
          "ar": "التحقق من النطاقات يدمر وهم المحتال.",
        "arEG": "التحقق من النطاقات يدمر وهم المحتال."
        },
        "lesson": {
          "en": "Always check the real URL, not just the display name.",
          "ar": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض.",
        "arEG": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "domain",
          "verify"
        ]
      },
      {
        "id": "s7-3",
        "label": {
          "en": "Looking for official contact info",
          "ar": "البحث عن معلومات الاتصال الرسمية",
        "arEG": "البحث عن معلومات الاتصال الرسمية"
        },
        "effectLabel": {
          "en": "Institutional Check",
          "ar": "تحقق مؤسسي",
        "arEG": "تحقق مؤسسي"
        },
        "feedback": {
          "en": "Real institutions have traceable physical and digital footprints.",
          "ar": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع.",
        "arEG": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع."
        },
        "lesson": {
          "en": "Never pay via unknown links without verifying the host.",
          "ar": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف.",
        "arEG": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "institution"
        ]
      }
    ]
  },
  {
    "id": "immunity-scams-9",
    "title": {
      "en": "Scam Round 9",
      "ar": "جولة الاحتيال 9",
    "arEG": "جولة الاحتيال 9"
    },
    "scene": {
      "en": "A sponsored ad promises immediate financial returns or fake scholarships. (Case 9)",
      "ar": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 9)",
    "arEG": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 9)"
    },
    "prompt": {
      "en": "What makes this scam effective?",
      "ar": "ما الذي يجعل هذا الاحتيال فعالاً؟",
    "arEG": "ما الذي يجعل هذا الاحتيال فعالاً؟"
    },
    "objective": {
      "en": "Spot financial pressure tactics",
      "ar": "اكتشاف تكتيكات الضغط المالي",
    "arEG": "اكتشاف تكتيكات الضغط المالي"
    },
    "choices": [
      {
        "id": "s8-1",
        "label": {
          "en": "Adding a fake urgency timer (Ends in 5 mins!)",
          "ar": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)",
        "arEG": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)"
        },
        "effectLabel": {
          "en": "Urgency Trap",
          "ar": "فخ الاستعجال",
        "arEG": "فخ الاستعجال"
        },
        "feedback": {
          "en": "Scams rely on disabling your logical brain with artificial time pressure.",
          "ar": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع.",
        "arEG": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع."
        },
        "lesson": {
          "en": "Legitimate financial or academic processes do not force 5-minute decisions.",
          "ar": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق.",
        "arEG": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "scam",
          "timer"
        ]
      },
      {
        "id": "s8-2",
        "label": {
          "en": "Researching the URL domain",
          "ar": "البحث في نطاق الرابط",
        "arEG": "البحث في نطاق الرابط"
        },
        "effectLabel": {
          "en": "Technical Verification",
          "ar": "تحقق تقني",
        "arEG": "تحقق تقني"
        },
        "feedback": {
          "en": "Checking domains ruins the scammer’s illusion.",
          "ar": "التحقق من النطاقات يدمر وهم المحتال.",
        "arEG": "التحقق من النطاقات يدمر وهم المحتال."
        },
        "lesson": {
          "en": "Always check the real URL, not just the display name.",
          "ar": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض.",
        "arEG": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "domain",
          "verify"
        ]
      },
      {
        "id": "s8-3",
        "label": {
          "en": "Looking for official contact info",
          "ar": "البحث عن معلومات الاتصال الرسمية",
        "arEG": "البحث عن معلومات الاتصال الرسمية"
        },
        "effectLabel": {
          "en": "Institutional Check",
          "ar": "تحقق مؤسسي",
        "arEG": "تحقق مؤسسي"
        },
        "feedback": {
          "en": "Real institutions have traceable physical and digital footprints.",
          "ar": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع.",
        "arEG": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع."
        },
        "lesson": {
          "en": "Never pay via unknown links without verifying the host.",
          "ar": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف.",
        "arEG": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "institution"
        ]
      }
    ]
  },
  {
    "id": "immunity-scams-10",
    "title": {
      "en": "Scam Round 10",
      "ar": "جولة الاحتيال 10",
    "arEG": "جولة الاحتيال 10"
    },
    "scene": {
      "en": "A sponsored ad promises immediate financial returns or fake scholarships. (Case 10)",
      "ar": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 10)",
    "arEG": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 10)"
    },
    "prompt": {
      "en": "What makes this scam effective?",
      "ar": "ما الذي يجعل هذا الاحتيال فعالاً؟",
    "arEG": "ما الذي يجعل هذا الاحتيال فعالاً؟"
    },
    "objective": {
      "en": "Spot financial pressure tactics",
      "ar": "اكتشاف تكتيكات الضغط المالي",
    "arEG": "اكتشاف تكتيكات الضغط المالي"
    },
    "choices": [
      {
        "id": "s9-1",
        "label": {
          "en": "Adding a fake urgency timer (Ends in 5 mins!)",
          "ar": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)",
        "arEG": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)"
        },
        "effectLabel": {
          "en": "Urgency Trap",
          "ar": "فخ الاستعجال",
        "arEG": "فخ الاستعجال"
        },
        "feedback": {
          "en": "Scams rely on disabling your logical brain with artificial time pressure.",
          "ar": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع.",
        "arEG": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع."
        },
        "lesson": {
          "en": "Legitimate financial or academic processes do not force 5-minute decisions.",
          "ar": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق.",
        "arEG": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "scam",
          "timer"
        ]
      },
      {
        "id": "s9-2",
        "label": {
          "en": "Researching the URL domain",
          "ar": "البحث في نطاق الرابط",
        "arEG": "البحث في نطاق الرابط"
        },
        "effectLabel": {
          "en": "Technical Verification",
          "ar": "تحقق تقني",
        "arEG": "تحقق تقني"
        },
        "feedback": {
          "en": "Checking domains ruins the scammer’s illusion.",
          "ar": "التحقق من النطاقات يدمر وهم المحتال.",
        "arEG": "التحقق من النطاقات يدمر وهم المحتال."
        },
        "lesson": {
          "en": "Always check the real URL, not just the display name.",
          "ar": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض.",
        "arEG": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "domain",
          "verify"
        ]
      },
      {
        "id": "s9-3",
        "label": {
          "en": "Looking for official contact info",
          "ar": "البحث عن معلومات الاتصال الرسمية",
        "arEG": "البحث عن معلومات الاتصال الرسمية"
        },
        "effectLabel": {
          "en": "Institutional Check",
          "ar": "تحقق مؤسسي",
        "arEG": "تحقق مؤسسي"
        },
        "feedback": {
          "en": "Real institutions have traceable physical and digital footprints.",
          "ar": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع.",
        "arEG": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع."
        },
        "lesson": {
          "en": "Never pay via unknown links without verifying the host.",
          "ar": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف.",
        "arEG": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "institution"
        ]
      }
    ]
  },
  {
    "id": "immunity-scams-11",
    "title": {
      "en": "Scam Round 11",
      "ar": "جولة الاحتيال 11",
    "arEG": "جولة الاحتيال 11"
    },
    "scene": {
      "en": "A sponsored ad promises immediate financial returns or fake scholarships. (Case 11)",
      "ar": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 11)",
    "arEG": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 11)"
    },
    "prompt": {
      "en": "What makes this scam effective?",
      "ar": "ما الذي يجعل هذا الاحتيال فعالاً؟",
    "arEG": "ما الذي يجعل هذا الاحتيال فعالاً؟"
    },
    "objective": {
      "en": "Spot financial pressure tactics",
      "ar": "اكتشاف تكتيكات الضغط المالي",
    "arEG": "اكتشاف تكتيكات الضغط المالي"
    },
    "choices": [
      {
        "id": "s10-1",
        "label": {
          "en": "Adding a fake urgency timer (Ends in 5 mins!)",
          "ar": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)",
        "arEG": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)"
        },
        "effectLabel": {
          "en": "Urgency Trap",
          "ar": "فخ الاستعجال",
        "arEG": "فخ الاستعجال"
        },
        "feedback": {
          "en": "Scams rely on disabling your logical brain with artificial time pressure.",
          "ar": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع.",
        "arEG": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع."
        },
        "lesson": {
          "en": "Legitimate financial or academic processes do not force 5-minute decisions.",
          "ar": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق.",
        "arEG": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "scam",
          "timer"
        ]
      },
      {
        "id": "s10-2",
        "label": {
          "en": "Researching the URL domain",
          "ar": "البحث في نطاق الرابط",
        "arEG": "البحث في نطاق الرابط"
        },
        "effectLabel": {
          "en": "Technical Verification",
          "ar": "تحقق تقني",
        "arEG": "تحقق تقني"
        },
        "feedback": {
          "en": "Checking domains ruins the scammer’s illusion.",
          "ar": "التحقق من النطاقات يدمر وهم المحتال.",
        "arEG": "التحقق من النطاقات يدمر وهم المحتال."
        },
        "lesson": {
          "en": "Always check the real URL, not just the display name.",
          "ar": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض.",
        "arEG": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "domain",
          "verify"
        ]
      },
      {
        "id": "s10-3",
        "label": {
          "en": "Looking for official contact info",
          "ar": "البحث عن معلومات الاتصال الرسمية",
        "arEG": "البحث عن معلومات الاتصال الرسمية"
        },
        "effectLabel": {
          "en": "Institutional Check",
          "ar": "تحقق مؤسسي",
        "arEG": "تحقق مؤسسي"
        },
        "feedback": {
          "en": "Real institutions have traceable physical and digital footprints.",
          "ar": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع.",
        "arEG": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع."
        },
        "lesson": {
          "en": "Never pay via unknown links without verifying the host.",
          "ar": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف.",
        "arEG": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "institution"
        ]
      }
    ]
  },
  {
    "id": "immunity-scams-12",
    "title": {
      "en": "Scam Round 12",
      "ar": "جولة الاحتيال 12",
    "arEG": "جولة الاحتيال 12"
    },
    "scene": {
      "en": "A sponsored ad promises immediate financial returns or fake scholarships. (Case 12)",
      "ar": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 12)",
    "arEG": "إعلان ممول يعد بعوائد مالية فورية أو منح دراسية وهمية. (حالة 12)"
    },
    "prompt": {
      "en": "What makes this scam effective?",
      "ar": "ما الذي يجعل هذا الاحتيال فعالاً؟",
    "arEG": "ما الذي يجعل هذا الاحتيال فعالاً؟"
    },
    "objective": {
      "en": "Spot financial pressure tactics",
      "ar": "اكتشاف تكتيكات الضغط المالي",
    "arEG": "اكتشاف تكتيكات الضغط المالي"
    },
    "choices": [
      {
        "id": "s11-1",
        "label": {
          "en": "Adding a fake urgency timer (Ends in 5 mins!)",
          "ar": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)",
        "arEG": "إضافة مؤقت استعجال مزيف (ينتهي خلال 5 دقائق!)"
        },
        "effectLabel": {
          "en": "Urgency Trap",
          "ar": "فخ الاستعجال",
        "arEG": "فخ الاستعجال"
        },
        "feedback": {
          "en": "Scams rely on disabling your logical brain with artificial time pressure.",
          "ar": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع.",
        "arEG": "يعتمد الاحتيال على تعطيل العقل المنطقي من خلال ضغط الوقت المصطنع."
        },
        "lesson": {
          "en": "Legitimate financial or academic processes do not force 5-minute decisions.",
          "ar": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق.",
        "arEG": "العمليات المالية أو الأكاديمية المشروعة لا تفرض قرارات في 5 دقائق."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "scam",
          "timer"
        ]
      },
      {
        "id": "s11-2",
        "label": {
          "en": "Researching the URL domain",
          "ar": "البحث في نطاق الرابط",
        "arEG": "البحث في نطاق الرابط"
        },
        "effectLabel": {
          "en": "Technical Verification",
          "ar": "تحقق تقني",
        "arEG": "تحقق تقني"
        },
        "feedback": {
          "en": "Checking domains ruins the scammer’s illusion.",
          "ar": "التحقق من النطاقات يدمر وهم المحتال.",
        "arEG": "التحقق من النطاقات يدمر وهم المحتال."
        },
        "lesson": {
          "en": "Always check the real URL, not just the display name.",
          "ar": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض.",
        "arEG": "تحقق دائماً من الرابط الحقيقي، وليس فقط اسم العرض."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "domain",
          "verify"
        ]
      },
      {
        "id": "s11-3",
        "label": {
          "en": "Looking for official contact info",
          "ar": "البحث عن معلومات الاتصال الرسمية",
        "arEG": "البحث عن معلومات الاتصال الرسمية"
        },
        "effectLabel": {
          "en": "Institutional Check",
          "ar": "تحقق مؤسسي",
        "arEG": "تحقق مؤسسي"
        },
        "feedback": {
          "en": "Real institutions have traceable physical and digital footprints.",
          "ar": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع.",
        "arEG": "المؤسسات الحقيقية لها بصمات مادية ورقمية قابلة للتتبع."
        },
        "lesson": {
          "en": "Never pay via unknown links without verifying the host.",
          "ar": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف.",
        "arEG": "لا تدفع أبداً عبر روابط غير معروفة دون التحقق من المضيف."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "institution"
        ]
      }
    ]
  }
]
};

export const IMMUNITY_TIKTOK_MODE: DeepRealGameModeDefinition = {
  id: "immunity-tiktok" as any,
  title: t("Immunity Lab: TikTok Focus", "مختبر المناعة: تركيز تيك توك"),
  subtitle: t("Deconstruct algorithmic manipulation and short-form video bias.", "تفكيك التلاعب الخوارزمي وانحياز الفيديوهات القصيرة."),
  roleLabel: t("Algorithmic Auditor", "مدقق خوارزمي"),
  scoreLabel: t("Resilience Score", "درجة المرونة"),
  warning: t("Short video removes context by design. Rebuild it.", "الفيديو القصير يزيل السياق بالتصميم. أعد بناءه."),
  completionTitle: t("Algorithm manipulation understood.", "تم فهم التلاعب الخوارزمي."),
  completionSummary: t("You successfully navigated 12 algorithmic traps.", "نجحت في اجتياز 12 فخاً خوارزمياً."),
  sources: [source("Digital Inquiry Group", "مجموعة الاستقصاء الرقمي", "https://cor.stanford.edu/")],
  rounds: [
  {
    "id": "immunity-tiktok-1",
    "title": {
      "en": "TikTok Round 1",
      "ar": "جولة تيك توك 1",
    "arEG": "جولة تيك توك 1"
    },
    "scene": {
      "en": "A short-form video uses dramatic music to push a controversial out-of-context claim. (Case 1)",
      "ar": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 1)",
    "arEG": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 1)"
    },
    "prompt": {
      "en": "Which algorithmic move boosts it?",
      "ar": "أي حركة خوارزمية تعززه؟",
    "arEG": "أي حركة خوارزمية تعززه؟"
    },
    "objective": {
      "en": "Understand short-video engagement hacking",
      "ar": "فهم اختراق تفاعل الفيديوهات القصيرة",
    "arEG": "فهم اختراق تفاعل الفيديوهات القصيرة"
    },
    "choices": [
      {
        "id": "t0-1",
        "label": {
          "en": "Write an angry comment disagreeing with it",
          "ar": "كتابة تعليق غاضب يختلف معه",
        "arEG": "كتابة تعليق غاضب يختلف معه"
        },
        "effectLabel": {
          "en": "Rage Engagement",
          "ar": "تفاعل الغضب",
        "arEG": "تفاعل الغضب"
        },
        "feedback": {
          "en": "Algorithms do not distinguish between angry comments and supportive ones. Both boost reach.",
          "ar": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول.",
        "arEG": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول."
        },
        "lesson": {
          "en": "Do not feed the algorithm. Scroll past or report.",
          "ar": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه.",
        "arEG": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "algorithm",
          "rage"
        ]
      },
      {
        "id": "t0-2",
        "label": {
          "en": "Block the creator",
          "ar": "حظر صانع المحتوى",
        "arEG": "حظر صانع المحتوى"
        },
        "effectLabel": {
          "en": "Boundary Setting",
          "ar": "وضع الحدود",
        "arEG": "وضع الحدود"
        },
        "feedback": {
          "en": "Blocking protects your feed but doesn’t help the rumor go viral.",
          "ar": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار.",
        "arEG": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار."
        },
        "lesson": {
          "en": "Curating your feed is the first line of defense.",
          "ar": "تنظيم خلاصتك هو خط الدفاع الأول.",
        "arEG": "تنظيم خلاصتك هو خط الدفاع الأول."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "curation"
        ]
      },
      {
        "id": "t0-3",
        "label": {
          "en": "Search for the original unedited video",
          "ar": "البحث عن الفيديو الأصلي غير المعدل",
        "arEG": "البحث عن الفيديو الأصلي غير المعدل"
        },
        "effectLabel": {
          "en": "Context Hunting",
          "ar": "البحث عن السياق",
        "arEG": "البحث عن السياق"
        },
        "feedback": {
          "en": "Finding the source destroys the TikTok framing effect.",
          "ar": "العثور على المصدر يدمر تأثير التأطير في تيك توك.",
        "arEG": "العثور على المصدر يدمر تأثير التأطير في تيك توك."
        },
        "lesson": {
          "en": "Short-form video is designed to remove context. Hunt it down.",
          "ar": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه.",
        "arEG": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "context"
        ]
      }
    ]
  },
  {
    "id": "immunity-tiktok-2",
    "title": {
      "en": "TikTok Round 2",
      "ar": "جولة تيك توك 2",
    "arEG": "جولة تيك توك 2"
    },
    "scene": {
      "en": "A short-form video uses dramatic music to push a controversial out-of-context claim. (Case 2)",
      "ar": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 2)",
    "arEG": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 2)"
    },
    "prompt": {
      "en": "Which algorithmic move boosts it?",
      "ar": "أي حركة خوارزمية تعززه؟",
    "arEG": "أي حركة خوارزمية تعززه؟"
    },
    "objective": {
      "en": "Understand short-video engagement hacking",
      "ar": "فهم اختراق تفاعل الفيديوهات القصيرة",
    "arEG": "فهم اختراق تفاعل الفيديوهات القصيرة"
    },
    "choices": [
      {
        "id": "t1-1",
        "label": {
          "en": "Write an angry comment disagreeing with it",
          "ar": "كتابة تعليق غاضب يختلف معه",
        "arEG": "كتابة تعليق غاضب يختلف معه"
        },
        "effectLabel": {
          "en": "Rage Engagement",
          "ar": "تفاعل الغضب",
        "arEG": "تفاعل الغضب"
        },
        "feedback": {
          "en": "Algorithms do not distinguish between angry comments and supportive ones. Both boost reach.",
          "ar": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول.",
        "arEG": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول."
        },
        "lesson": {
          "en": "Do not feed the algorithm. Scroll past or report.",
          "ar": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه.",
        "arEG": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "algorithm",
          "rage"
        ]
      },
      {
        "id": "t1-2",
        "label": {
          "en": "Block the creator",
          "ar": "حظر صانع المحتوى",
        "arEG": "حظر صانع المحتوى"
        },
        "effectLabel": {
          "en": "Boundary Setting",
          "ar": "وضع الحدود",
        "arEG": "وضع الحدود"
        },
        "feedback": {
          "en": "Blocking protects your feed but doesn’t help the rumor go viral.",
          "ar": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار.",
        "arEG": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار."
        },
        "lesson": {
          "en": "Curating your feed is the first line of defense.",
          "ar": "تنظيم خلاصتك هو خط الدفاع الأول.",
        "arEG": "تنظيم خلاصتك هو خط الدفاع الأول."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "curation"
        ]
      },
      {
        "id": "t1-3",
        "label": {
          "en": "Search for the original unedited video",
          "ar": "البحث عن الفيديو الأصلي غير المعدل",
        "arEG": "البحث عن الفيديو الأصلي غير المعدل"
        },
        "effectLabel": {
          "en": "Context Hunting",
          "ar": "البحث عن السياق",
        "arEG": "البحث عن السياق"
        },
        "feedback": {
          "en": "Finding the source destroys the TikTok framing effect.",
          "ar": "العثور على المصدر يدمر تأثير التأطير في تيك توك.",
        "arEG": "العثور على المصدر يدمر تأثير التأطير في تيك توك."
        },
        "lesson": {
          "en": "Short-form video is designed to remove context. Hunt it down.",
          "ar": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه.",
        "arEG": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "context"
        ]
      }
    ]
  },
  {
    "id": "immunity-tiktok-3",
    "title": {
      "en": "TikTok Round 3",
      "ar": "جولة تيك توك 3",
    "arEG": "جولة تيك توك 3"
    },
    "scene": {
      "en": "A short-form video uses dramatic music to push a controversial out-of-context claim. (Case 3)",
      "ar": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 3)",
    "arEG": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 3)"
    },
    "prompt": {
      "en": "Which algorithmic move boosts it?",
      "ar": "أي حركة خوارزمية تعززه؟",
    "arEG": "أي حركة خوارزمية تعززه؟"
    },
    "objective": {
      "en": "Understand short-video engagement hacking",
      "ar": "فهم اختراق تفاعل الفيديوهات القصيرة",
    "arEG": "فهم اختراق تفاعل الفيديوهات القصيرة"
    },
    "choices": [
      {
        "id": "t2-1",
        "label": {
          "en": "Write an angry comment disagreeing with it",
          "ar": "كتابة تعليق غاضب يختلف معه",
        "arEG": "كتابة تعليق غاضب يختلف معه"
        },
        "effectLabel": {
          "en": "Rage Engagement",
          "ar": "تفاعل الغضب",
        "arEG": "تفاعل الغضب"
        },
        "feedback": {
          "en": "Algorithms do not distinguish between angry comments and supportive ones. Both boost reach.",
          "ar": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول.",
        "arEG": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول."
        },
        "lesson": {
          "en": "Do not feed the algorithm. Scroll past or report.",
          "ar": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه.",
        "arEG": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "algorithm",
          "rage"
        ]
      },
      {
        "id": "t2-2",
        "label": {
          "en": "Block the creator",
          "ar": "حظر صانع المحتوى",
        "arEG": "حظر صانع المحتوى"
        },
        "effectLabel": {
          "en": "Boundary Setting",
          "ar": "وضع الحدود",
        "arEG": "وضع الحدود"
        },
        "feedback": {
          "en": "Blocking protects your feed but doesn’t help the rumor go viral.",
          "ar": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار.",
        "arEG": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار."
        },
        "lesson": {
          "en": "Curating your feed is the first line of defense.",
          "ar": "تنظيم خلاصتك هو خط الدفاع الأول.",
        "arEG": "تنظيم خلاصتك هو خط الدفاع الأول."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "curation"
        ]
      },
      {
        "id": "t2-3",
        "label": {
          "en": "Search for the original unedited video",
          "ar": "البحث عن الفيديو الأصلي غير المعدل",
        "arEG": "البحث عن الفيديو الأصلي غير المعدل"
        },
        "effectLabel": {
          "en": "Context Hunting",
          "ar": "البحث عن السياق",
        "arEG": "البحث عن السياق"
        },
        "feedback": {
          "en": "Finding the source destroys the TikTok framing effect.",
          "ar": "العثور على المصدر يدمر تأثير التأطير في تيك توك.",
        "arEG": "العثور على المصدر يدمر تأثير التأطير في تيك توك."
        },
        "lesson": {
          "en": "Short-form video is designed to remove context. Hunt it down.",
          "ar": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه.",
        "arEG": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "context"
        ]
      }
    ]
  },
  {
    "id": "immunity-tiktok-4",
    "title": {
      "en": "TikTok Round 4",
      "ar": "جولة تيك توك 4",
    "arEG": "جولة تيك توك 4"
    },
    "scene": {
      "en": "A short-form video uses dramatic music to push a controversial out-of-context claim. (Case 4)",
      "ar": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 4)",
    "arEG": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 4)"
    },
    "prompt": {
      "en": "Which algorithmic move boosts it?",
      "ar": "أي حركة خوارزمية تعززه؟",
    "arEG": "أي حركة خوارزمية تعززه؟"
    },
    "objective": {
      "en": "Understand short-video engagement hacking",
      "ar": "فهم اختراق تفاعل الفيديوهات القصيرة",
    "arEG": "فهم اختراق تفاعل الفيديوهات القصيرة"
    },
    "choices": [
      {
        "id": "t3-1",
        "label": {
          "en": "Write an angry comment disagreeing with it",
          "ar": "كتابة تعليق غاضب يختلف معه",
        "arEG": "كتابة تعليق غاضب يختلف معه"
        },
        "effectLabel": {
          "en": "Rage Engagement",
          "ar": "تفاعل الغضب",
        "arEG": "تفاعل الغضب"
        },
        "feedback": {
          "en": "Algorithms do not distinguish between angry comments and supportive ones. Both boost reach.",
          "ar": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول.",
        "arEG": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول."
        },
        "lesson": {
          "en": "Do not feed the algorithm. Scroll past or report.",
          "ar": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه.",
        "arEG": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "algorithm",
          "rage"
        ]
      },
      {
        "id": "t3-2",
        "label": {
          "en": "Block the creator",
          "ar": "حظر صانع المحتوى",
        "arEG": "حظر صانع المحتوى"
        },
        "effectLabel": {
          "en": "Boundary Setting",
          "ar": "وضع الحدود",
        "arEG": "وضع الحدود"
        },
        "feedback": {
          "en": "Blocking protects your feed but doesn’t help the rumor go viral.",
          "ar": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار.",
        "arEG": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار."
        },
        "lesson": {
          "en": "Curating your feed is the first line of defense.",
          "ar": "تنظيم خلاصتك هو خط الدفاع الأول.",
        "arEG": "تنظيم خلاصتك هو خط الدفاع الأول."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "curation"
        ]
      },
      {
        "id": "t3-3",
        "label": {
          "en": "Search for the original unedited video",
          "ar": "البحث عن الفيديو الأصلي غير المعدل",
        "arEG": "البحث عن الفيديو الأصلي غير المعدل"
        },
        "effectLabel": {
          "en": "Context Hunting",
          "ar": "البحث عن السياق",
        "arEG": "البحث عن السياق"
        },
        "feedback": {
          "en": "Finding the source destroys the TikTok framing effect.",
          "ar": "العثور على المصدر يدمر تأثير التأطير في تيك توك.",
        "arEG": "العثور على المصدر يدمر تأثير التأطير في تيك توك."
        },
        "lesson": {
          "en": "Short-form video is designed to remove context. Hunt it down.",
          "ar": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه.",
        "arEG": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "context"
        ]
      }
    ]
  },
  {
    "id": "immunity-tiktok-5",
    "title": {
      "en": "TikTok Round 5",
      "ar": "جولة تيك توك 5",
    "arEG": "جولة تيك توك 5"
    },
    "scene": {
      "en": "A short-form video uses dramatic music to push a controversial out-of-context claim. (Case 5)",
      "ar": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 5)",
    "arEG": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 5)"
    },
    "prompt": {
      "en": "Which algorithmic move boosts it?",
      "ar": "أي حركة خوارزمية تعززه؟",
    "arEG": "أي حركة خوارزمية تعززه؟"
    },
    "objective": {
      "en": "Understand short-video engagement hacking",
      "ar": "فهم اختراق تفاعل الفيديوهات القصيرة",
    "arEG": "فهم اختراق تفاعل الفيديوهات القصيرة"
    },
    "choices": [
      {
        "id": "t4-1",
        "label": {
          "en": "Write an angry comment disagreeing with it",
          "ar": "كتابة تعليق غاضب يختلف معه",
        "arEG": "كتابة تعليق غاضب يختلف معه"
        },
        "effectLabel": {
          "en": "Rage Engagement",
          "ar": "تفاعل الغضب",
        "arEG": "تفاعل الغضب"
        },
        "feedback": {
          "en": "Algorithms do not distinguish between angry comments and supportive ones. Both boost reach.",
          "ar": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول.",
        "arEG": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول."
        },
        "lesson": {
          "en": "Do not feed the algorithm. Scroll past or report.",
          "ar": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه.",
        "arEG": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "algorithm",
          "rage"
        ]
      },
      {
        "id": "t4-2",
        "label": {
          "en": "Block the creator",
          "ar": "حظر صانع المحتوى",
        "arEG": "حظر صانع المحتوى"
        },
        "effectLabel": {
          "en": "Boundary Setting",
          "ar": "وضع الحدود",
        "arEG": "وضع الحدود"
        },
        "feedback": {
          "en": "Blocking protects your feed but doesn’t help the rumor go viral.",
          "ar": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار.",
        "arEG": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار."
        },
        "lesson": {
          "en": "Curating your feed is the first line of defense.",
          "ar": "تنظيم خلاصتك هو خط الدفاع الأول.",
        "arEG": "تنظيم خلاصتك هو خط الدفاع الأول."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "curation"
        ]
      },
      {
        "id": "t4-3",
        "label": {
          "en": "Search for the original unedited video",
          "ar": "البحث عن الفيديو الأصلي غير المعدل",
        "arEG": "البحث عن الفيديو الأصلي غير المعدل"
        },
        "effectLabel": {
          "en": "Context Hunting",
          "ar": "البحث عن السياق",
        "arEG": "البحث عن السياق"
        },
        "feedback": {
          "en": "Finding the source destroys the TikTok framing effect.",
          "ar": "العثور على المصدر يدمر تأثير التأطير في تيك توك.",
        "arEG": "العثور على المصدر يدمر تأثير التأطير في تيك توك."
        },
        "lesson": {
          "en": "Short-form video is designed to remove context. Hunt it down.",
          "ar": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه.",
        "arEG": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "context"
        ]
      }
    ]
  },
  {
    "id": "immunity-tiktok-6",
    "title": {
      "en": "TikTok Round 6",
      "ar": "جولة تيك توك 6",
    "arEG": "جولة تيك توك 6"
    },
    "scene": {
      "en": "A short-form video uses dramatic music to push a controversial out-of-context claim. (Case 6)",
      "ar": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 6)",
    "arEG": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 6)"
    },
    "prompt": {
      "en": "Which algorithmic move boosts it?",
      "ar": "أي حركة خوارزمية تعززه؟",
    "arEG": "أي حركة خوارزمية تعززه؟"
    },
    "objective": {
      "en": "Understand short-video engagement hacking",
      "ar": "فهم اختراق تفاعل الفيديوهات القصيرة",
    "arEG": "فهم اختراق تفاعل الفيديوهات القصيرة"
    },
    "choices": [
      {
        "id": "t5-1",
        "label": {
          "en": "Write an angry comment disagreeing with it",
          "ar": "كتابة تعليق غاضب يختلف معه",
        "arEG": "كتابة تعليق غاضب يختلف معه"
        },
        "effectLabel": {
          "en": "Rage Engagement",
          "ar": "تفاعل الغضب",
        "arEG": "تفاعل الغضب"
        },
        "feedback": {
          "en": "Algorithms do not distinguish between angry comments and supportive ones. Both boost reach.",
          "ar": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول.",
        "arEG": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول."
        },
        "lesson": {
          "en": "Do not feed the algorithm. Scroll past or report.",
          "ar": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه.",
        "arEG": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "algorithm",
          "rage"
        ]
      },
      {
        "id": "t5-2",
        "label": {
          "en": "Block the creator",
          "ar": "حظر صانع المحتوى",
        "arEG": "حظر صانع المحتوى"
        },
        "effectLabel": {
          "en": "Boundary Setting",
          "ar": "وضع الحدود",
        "arEG": "وضع الحدود"
        },
        "feedback": {
          "en": "Blocking protects your feed but doesn’t help the rumor go viral.",
          "ar": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار.",
        "arEG": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار."
        },
        "lesson": {
          "en": "Curating your feed is the first line of defense.",
          "ar": "تنظيم خلاصتك هو خط الدفاع الأول.",
        "arEG": "تنظيم خلاصتك هو خط الدفاع الأول."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "curation"
        ]
      },
      {
        "id": "t5-3",
        "label": {
          "en": "Search for the original unedited video",
          "ar": "البحث عن الفيديو الأصلي غير المعدل",
        "arEG": "البحث عن الفيديو الأصلي غير المعدل"
        },
        "effectLabel": {
          "en": "Context Hunting",
          "ar": "البحث عن السياق",
        "arEG": "البحث عن السياق"
        },
        "feedback": {
          "en": "Finding the source destroys the TikTok framing effect.",
          "ar": "العثور على المصدر يدمر تأثير التأطير في تيك توك.",
        "arEG": "العثور على المصدر يدمر تأثير التأطير في تيك توك."
        },
        "lesson": {
          "en": "Short-form video is designed to remove context. Hunt it down.",
          "ar": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه.",
        "arEG": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "context"
        ]
      }
    ]
  },
  {
    "id": "immunity-tiktok-7",
    "title": {
      "en": "TikTok Round 7",
      "ar": "جولة تيك توك 7",
    "arEG": "جولة تيك توك 7"
    },
    "scene": {
      "en": "A short-form video uses dramatic music to push a controversial out-of-context claim. (Case 7)",
      "ar": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 7)",
    "arEG": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 7)"
    },
    "prompt": {
      "en": "Which algorithmic move boosts it?",
      "ar": "أي حركة خوارزمية تعززه؟",
    "arEG": "أي حركة خوارزمية تعززه؟"
    },
    "objective": {
      "en": "Understand short-video engagement hacking",
      "ar": "فهم اختراق تفاعل الفيديوهات القصيرة",
    "arEG": "فهم اختراق تفاعل الفيديوهات القصيرة"
    },
    "choices": [
      {
        "id": "t6-1",
        "label": {
          "en": "Write an angry comment disagreeing with it",
          "ar": "كتابة تعليق غاضب يختلف معه",
        "arEG": "كتابة تعليق غاضب يختلف معه"
        },
        "effectLabel": {
          "en": "Rage Engagement",
          "ar": "تفاعل الغضب",
        "arEG": "تفاعل الغضب"
        },
        "feedback": {
          "en": "Algorithms do not distinguish between angry comments and supportive ones. Both boost reach.",
          "ar": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول.",
        "arEG": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول."
        },
        "lesson": {
          "en": "Do not feed the algorithm. Scroll past or report.",
          "ar": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه.",
        "arEG": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "algorithm",
          "rage"
        ]
      },
      {
        "id": "t6-2",
        "label": {
          "en": "Block the creator",
          "ar": "حظر صانع المحتوى",
        "arEG": "حظر صانع المحتوى"
        },
        "effectLabel": {
          "en": "Boundary Setting",
          "ar": "وضع الحدود",
        "arEG": "وضع الحدود"
        },
        "feedback": {
          "en": "Blocking protects your feed but doesn’t help the rumor go viral.",
          "ar": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار.",
        "arEG": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار."
        },
        "lesson": {
          "en": "Curating your feed is the first line of defense.",
          "ar": "تنظيم خلاصتك هو خط الدفاع الأول.",
        "arEG": "تنظيم خلاصتك هو خط الدفاع الأول."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "curation"
        ]
      },
      {
        "id": "t6-3",
        "label": {
          "en": "Search for the original unedited video",
          "ar": "البحث عن الفيديو الأصلي غير المعدل",
        "arEG": "البحث عن الفيديو الأصلي غير المعدل"
        },
        "effectLabel": {
          "en": "Context Hunting",
          "ar": "البحث عن السياق",
        "arEG": "البحث عن السياق"
        },
        "feedback": {
          "en": "Finding the source destroys the TikTok framing effect.",
          "ar": "العثور على المصدر يدمر تأثير التأطير في تيك توك.",
        "arEG": "العثور على المصدر يدمر تأثير التأطير في تيك توك."
        },
        "lesson": {
          "en": "Short-form video is designed to remove context. Hunt it down.",
          "ar": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه.",
        "arEG": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "context"
        ]
      }
    ]
  },
  {
    "id": "immunity-tiktok-8",
    "title": {
      "en": "TikTok Round 8",
      "ar": "جولة تيك توك 8",
    "arEG": "جولة تيك توك 8"
    },
    "scene": {
      "en": "A short-form video uses dramatic music to push a controversial out-of-context claim. (Case 8)",
      "ar": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 8)",
    "arEG": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 8)"
    },
    "prompt": {
      "en": "Which algorithmic move boosts it?",
      "ar": "أي حركة خوارزمية تعززه؟",
    "arEG": "أي حركة خوارزمية تعززه؟"
    },
    "objective": {
      "en": "Understand short-video engagement hacking",
      "ar": "فهم اختراق تفاعل الفيديوهات القصيرة",
    "arEG": "فهم اختراق تفاعل الفيديوهات القصيرة"
    },
    "choices": [
      {
        "id": "t7-1",
        "label": {
          "en": "Write an angry comment disagreeing with it",
          "ar": "كتابة تعليق غاضب يختلف معه",
        "arEG": "كتابة تعليق غاضب يختلف معه"
        },
        "effectLabel": {
          "en": "Rage Engagement",
          "ar": "تفاعل الغضب",
        "arEG": "تفاعل الغضب"
        },
        "feedback": {
          "en": "Algorithms do not distinguish between angry comments and supportive ones. Both boost reach.",
          "ar": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول.",
        "arEG": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول."
        },
        "lesson": {
          "en": "Do not feed the algorithm. Scroll past or report.",
          "ar": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه.",
        "arEG": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "algorithm",
          "rage"
        ]
      },
      {
        "id": "t7-2",
        "label": {
          "en": "Block the creator",
          "ar": "حظر صانع المحتوى",
        "arEG": "حظر صانع المحتوى"
        },
        "effectLabel": {
          "en": "Boundary Setting",
          "ar": "وضع الحدود",
        "arEG": "وضع الحدود"
        },
        "feedback": {
          "en": "Blocking protects your feed but doesn’t help the rumor go viral.",
          "ar": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار.",
        "arEG": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار."
        },
        "lesson": {
          "en": "Curating your feed is the first line of defense.",
          "ar": "تنظيم خلاصتك هو خط الدفاع الأول.",
        "arEG": "تنظيم خلاصتك هو خط الدفاع الأول."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "curation"
        ]
      },
      {
        "id": "t7-3",
        "label": {
          "en": "Search for the original unedited video",
          "ar": "البحث عن الفيديو الأصلي غير المعدل",
        "arEG": "البحث عن الفيديو الأصلي غير المعدل"
        },
        "effectLabel": {
          "en": "Context Hunting",
          "ar": "البحث عن السياق",
        "arEG": "البحث عن السياق"
        },
        "feedback": {
          "en": "Finding the source destroys the TikTok framing effect.",
          "ar": "العثور على المصدر يدمر تأثير التأطير في تيك توك.",
        "arEG": "العثور على المصدر يدمر تأثير التأطير في تيك توك."
        },
        "lesson": {
          "en": "Short-form video is designed to remove context. Hunt it down.",
          "ar": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه.",
        "arEG": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "context"
        ]
      }
    ]
  },
  {
    "id": "immunity-tiktok-9",
    "title": {
      "en": "TikTok Round 9",
      "ar": "جولة تيك توك 9",
    "arEG": "جولة تيك توك 9"
    },
    "scene": {
      "en": "A short-form video uses dramatic music to push a controversial out-of-context claim. (Case 9)",
      "ar": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 9)",
    "arEG": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 9)"
    },
    "prompt": {
      "en": "Which algorithmic move boosts it?",
      "ar": "أي حركة خوارزمية تعززه؟",
    "arEG": "أي حركة خوارزمية تعززه؟"
    },
    "objective": {
      "en": "Understand short-video engagement hacking",
      "ar": "فهم اختراق تفاعل الفيديوهات القصيرة",
    "arEG": "فهم اختراق تفاعل الفيديوهات القصيرة"
    },
    "choices": [
      {
        "id": "t8-1",
        "label": {
          "en": "Write an angry comment disagreeing with it",
          "ar": "كتابة تعليق غاضب يختلف معه",
        "arEG": "كتابة تعليق غاضب يختلف معه"
        },
        "effectLabel": {
          "en": "Rage Engagement",
          "ar": "تفاعل الغضب",
        "arEG": "تفاعل الغضب"
        },
        "feedback": {
          "en": "Algorithms do not distinguish between angry comments and supportive ones. Both boost reach.",
          "ar": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول.",
        "arEG": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول."
        },
        "lesson": {
          "en": "Do not feed the algorithm. Scroll past or report.",
          "ar": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه.",
        "arEG": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "algorithm",
          "rage"
        ]
      },
      {
        "id": "t8-2",
        "label": {
          "en": "Block the creator",
          "ar": "حظر صانع المحتوى",
        "arEG": "حظر صانع المحتوى"
        },
        "effectLabel": {
          "en": "Boundary Setting",
          "ar": "وضع الحدود",
        "arEG": "وضع الحدود"
        },
        "feedback": {
          "en": "Blocking protects your feed but doesn’t help the rumor go viral.",
          "ar": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار.",
        "arEG": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار."
        },
        "lesson": {
          "en": "Curating your feed is the first line of defense.",
          "ar": "تنظيم خلاصتك هو خط الدفاع الأول.",
        "arEG": "تنظيم خلاصتك هو خط الدفاع الأول."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "curation"
        ]
      },
      {
        "id": "t8-3",
        "label": {
          "en": "Search for the original unedited video",
          "ar": "البحث عن الفيديو الأصلي غير المعدل",
        "arEG": "البحث عن الفيديو الأصلي غير المعدل"
        },
        "effectLabel": {
          "en": "Context Hunting",
          "ar": "البحث عن السياق",
        "arEG": "البحث عن السياق"
        },
        "feedback": {
          "en": "Finding the source destroys the TikTok framing effect.",
          "ar": "العثور على المصدر يدمر تأثير التأطير في تيك توك.",
        "arEG": "العثور على المصدر يدمر تأثير التأطير في تيك توك."
        },
        "lesson": {
          "en": "Short-form video is designed to remove context. Hunt it down.",
          "ar": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه.",
        "arEG": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "context"
        ]
      }
    ]
  },
  {
    "id": "immunity-tiktok-10",
    "title": {
      "en": "TikTok Round 10",
      "ar": "جولة تيك توك 10",
    "arEG": "جولة تيك توك 10"
    },
    "scene": {
      "en": "A short-form video uses dramatic music to push a controversial out-of-context claim. (Case 10)",
      "ar": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 10)",
    "arEG": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 10)"
    },
    "prompt": {
      "en": "Which algorithmic move boosts it?",
      "ar": "أي حركة خوارزمية تعززه؟",
    "arEG": "أي حركة خوارزمية تعززه؟"
    },
    "objective": {
      "en": "Understand short-video engagement hacking",
      "ar": "فهم اختراق تفاعل الفيديوهات القصيرة",
    "arEG": "فهم اختراق تفاعل الفيديوهات القصيرة"
    },
    "choices": [
      {
        "id": "t9-1",
        "label": {
          "en": "Write an angry comment disagreeing with it",
          "ar": "كتابة تعليق غاضب يختلف معه",
        "arEG": "كتابة تعليق غاضب يختلف معه"
        },
        "effectLabel": {
          "en": "Rage Engagement",
          "ar": "تفاعل الغضب",
        "arEG": "تفاعل الغضب"
        },
        "feedback": {
          "en": "Algorithms do not distinguish between angry comments and supportive ones. Both boost reach.",
          "ar": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول.",
        "arEG": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول."
        },
        "lesson": {
          "en": "Do not feed the algorithm. Scroll past or report.",
          "ar": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه.",
        "arEG": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "algorithm",
          "rage"
        ]
      },
      {
        "id": "t9-2",
        "label": {
          "en": "Block the creator",
          "ar": "حظر صانع المحتوى",
        "arEG": "حظر صانع المحتوى"
        },
        "effectLabel": {
          "en": "Boundary Setting",
          "ar": "وضع الحدود",
        "arEG": "وضع الحدود"
        },
        "feedback": {
          "en": "Blocking protects your feed but doesn’t help the rumor go viral.",
          "ar": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار.",
        "arEG": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار."
        },
        "lesson": {
          "en": "Curating your feed is the first line of defense.",
          "ar": "تنظيم خلاصتك هو خط الدفاع الأول.",
        "arEG": "تنظيم خلاصتك هو خط الدفاع الأول."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "curation"
        ]
      },
      {
        "id": "t9-3",
        "label": {
          "en": "Search for the original unedited video",
          "ar": "البحث عن الفيديو الأصلي غير المعدل",
        "arEG": "البحث عن الفيديو الأصلي غير المعدل"
        },
        "effectLabel": {
          "en": "Context Hunting",
          "ar": "البحث عن السياق",
        "arEG": "البحث عن السياق"
        },
        "feedback": {
          "en": "Finding the source destroys the TikTok framing effect.",
          "ar": "العثور على المصدر يدمر تأثير التأطير في تيك توك.",
        "arEG": "العثور على المصدر يدمر تأثير التأطير في تيك توك."
        },
        "lesson": {
          "en": "Short-form video is designed to remove context. Hunt it down.",
          "ar": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه.",
        "arEG": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "context"
        ]
      }
    ]
  },
  {
    "id": "immunity-tiktok-11",
    "title": {
      "en": "TikTok Round 11",
      "ar": "جولة تيك توك 11",
    "arEG": "جولة تيك توك 11"
    },
    "scene": {
      "en": "A short-form video uses dramatic music to push a controversial out-of-context claim. (Case 11)",
      "ar": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 11)",
    "arEG": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 11)"
    },
    "prompt": {
      "en": "Which algorithmic move boosts it?",
      "ar": "أي حركة خوارزمية تعززه؟",
    "arEG": "أي حركة خوارزمية تعززه؟"
    },
    "objective": {
      "en": "Understand short-video engagement hacking",
      "ar": "فهم اختراق تفاعل الفيديوهات القصيرة",
    "arEG": "فهم اختراق تفاعل الفيديوهات القصيرة"
    },
    "choices": [
      {
        "id": "t10-1",
        "label": {
          "en": "Write an angry comment disagreeing with it",
          "ar": "كتابة تعليق غاضب يختلف معه",
        "arEG": "كتابة تعليق غاضب يختلف معه"
        },
        "effectLabel": {
          "en": "Rage Engagement",
          "ar": "تفاعل الغضب",
        "arEG": "تفاعل الغضب"
        },
        "feedback": {
          "en": "Algorithms do not distinguish between angry comments and supportive ones. Both boost reach.",
          "ar": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول.",
        "arEG": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول."
        },
        "lesson": {
          "en": "Do not feed the algorithm. Scroll past or report.",
          "ar": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه.",
        "arEG": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "algorithm",
          "rage"
        ]
      },
      {
        "id": "t10-2",
        "label": {
          "en": "Block the creator",
          "ar": "حظر صانع المحتوى",
        "arEG": "حظر صانع المحتوى"
        },
        "effectLabel": {
          "en": "Boundary Setting",
          "ar": "وضع الحدود",
        "arEG": "وضع الحدود"
        },
        "feedback": {
          "en": "Blocking protects your feed but doesn’t help the rumor go viral.",
          "ar": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار.",
        "arEG": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار."
        },
        "lesson": {
          "en": "Curating your feed is the first line of defense.",
          "ar": "تنظيم خلاصتك هو خط الدفاع الأول.",
        "arEG": "تنظيم خلاصتك هو خط الدفاع الأول."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "curation"
        ]
      },
      {
        "id": "t10-3",
        "label": {
          "en": "Search for the original unedited video",
          "ar": "البحث عن الفيديو الأصلي غير المعدل",
        "arEG": "البحث عن الفيديو الأصلي غير المعدل"
        },
        "effectLabel": {
          "en": "Context Hunting",
          "ar": "البحث عن السياق",
        "arEG": "البحث عن السياق"
        },
        "feedback": {
          "en": "Finding the source destroys the TikTok framing effect.",
          "ar": "العثور على المصدر يدمر تأثير التأطير في تيك توك.",
        "arEG": "العثور على المصدر يدمر تأثير التأطير في تيك توك."
        },
        "lesson": {
          "en": "Short-form video is designed to remove context. Hunt it down.",
          "ar": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه.",
        "arEG": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "context"
        ]
      }
    ]
  },
  {
    "id": "immunity-tiktok-12",
    "title": {
      "en": "TikTok Round 12",
      "ar": "جولة تيك توك 12",
    "arEG": "جولة تيك توك 12"
    },
    "scene": {
      "en": "A short-form video uses dramatic music to push a controversial out-of-context claim. (Case 12)",
      "ar": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 12)",
    "arEG": "فيديو قصير يستخدم موسيقى درامية لدفع ادعاء مثير للجدل خارج السياق. (حالة 12)"
    },
    "prompt": {
      "en": "Which algorithmic move boosts it?",
      "ar": "أي حركة خوارزمية تعززه؟",
    "arEG": "أي حركة خوارزمية تعززه؟"
    },
    "objective": {
      "en": "Understand short-video engagement hacking",
      "ar": "فهم اختراق تفاعل الفيديوهات القصيرة",
    "arEG": "فهم اختراق تفاعل الفيديوهات القصيرة"
    },
    "choices": [
      {
        "id": "t11-1",
        "label": {
          "en": "Write an angry comment disagreeing with it",
          "ar": "كتابة تعليق غاضب يختلف معه",
        "arEG": "كتابة تعليق غاضب يختلف معه"
        },
        "effectLabel": {
          "en": "Rage Engagement",
          "ar": "تفاعل الغضب",
        "arEG": "تفاعل الغضب"
        },
        "feedback": {
          "en": "Algorithms do not distinguish between angry comments and supportive ones. Both boost reach.",
          "ar": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول.",
        "arEG": "الخوارزميات لا تميز بين التعليقات الغاضبة والداعمة. كلاهما يعزز الوصول."
        },
        "lesson": {
          "en": "Do not feed the algorithm. Scroll past or report.",
          "ar": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه.",
        "arEG": "لا تغذي الخوارزمية. تجاوز الفيديو أو أبلغ عنه."
        },
        "scoreDelta": 3,
        "correct": true,
        "tags": [
          "algorithm",
          "rage"
        ]
      },
      {
        "id": "t11-2",
        "label": {
          "en": "Block the creator",
          "ar": "حظر صانع المحتوى",
        "arEG": "حظر صانع المحتوى"
        },
        "effectLabel": {
          "en": "Boundary Setting",
          "ar": "وضع الحدود",
        "arEG": "وضع الحدود"
        },
        "feedback": {
          "en": "Blocking protects your feed but doesn’t help the rumor go viral.",
          "ar": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار.",
        "arEG": "الحظر يحمي خلاصتك ولكنه لا يساعد الشائعة على الانتشار."
        },
        "lesson": {
          "en": "Curating your feed is the first line of defense.",
          "ar": "تنظيم خلاصتك هو خط الدفاع الأول.",
        "arEG": "تنظيم خلاصتك هو خط الدفاع الأول."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "curation"
        ]
      },
      {
        "id": "t11-3",
        "label": {
          "en": "Search for the original unedited video",
          "ar": "البحث عن الفيديو الأصلي غير المعدل",
        "arEG": "البحث عن الفيديو الأصلي غير المعدل"
        },
        "effectLabel": {
          "en": "Context Hunting",
          "ar": "البحث عن السياق",
        "arEG": "البحث عن السياق"
        },
        "feedback": {
          "en": "Finding the source destroys the TikTok framing effect.",
          "ar": "العثور على المصدر يدمر تأثير التأطير في تيك توك.",
        "arEG": "العثور على المصدر يدمر تأثير التأطير في تيك توك."
        },
        "lesson": {
          "en": "Short-form video is designed to remove context. Hunt it down.",
          "ar": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه.",
        "arEG": "الفيديو القصير مصمم لإزالة السياق. ابحث عنه."
        },
        "scoreDelta": 0,
        "correct": false,
        "tags": [
          "context"
        ]
      }
    ]
  }
]
};
