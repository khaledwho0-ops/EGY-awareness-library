export type TrailerScene = {
  id: string;
  titleEn: string;
  titleAr: string;
  duration: string;
  settingEn: string;
  settingAr: string;
  dialogueEn: string;
  dialogueAr: string;
  cinematographyEn: string[];
  cinematographyAr: string[];
  soundDesignEn: string[];
  soundDesignAr: string[];
  positivePromptEn: string;
  positivePromptAr: string;
  negativePromptEn: string[];
  negativePromptAr: string[];
};

export const TRAILER_SCENES: TrailerScene[] = [
  {
    id: "scene-1",
    titleEn: "Scene 1: The Father on the Sofa",
    titleAr: "المشهد 1: الأب على الكنبة",
    duration: "10s",
    settingEn:
      "A Cairo middle-class apartment at late afternoon. A father in his late fifties scrolls a Samsung phone on a worn velvet sofa and starts to believe a sugar rumor.",
    settingAr:
      "شقة مصرية من الطبقة المتوسطة في القاهرة وقت العصر. أب في أواخر الخمسينات يقلب في موبايل سامسونج على كنبة قديمة ويبدأ يصدق شائعة عن السكر.",
    dialogueEn: "Tone: no heroic line. The scene communicates belief through silence, posture, and the phone glow.",
    dialogueAr: "النغمة: مفيش جملة بطولية. المشهد يوضح التصديق من خلال السكون ووضع الجسم ونور الموبايل.",
    cinematographyEn: [
      "Wide living-room establishing shot with family photos, tea glasses, and a rolled prayer rug.",
      "Slow push-in toward the face as curiosity becomes belief.",
      "Close-up on thumb stopping over the voice note and the insulin box sitting nearby.",
    ],
    cinematographyAr: [
      "لقطة واسعة للصالة فيها صور عائلية وكوبايات شاي وسجادة صلاة ملفوفة.",
      "اقتراب بطيء للوجه مع تحول الملل إلى اقتناع.",
      "كلوز أب على الإبهام وهو يوقف عند الرسالة الصوتية وعلبة الإنسولين جنبه.",
    ],
    soundDesignEn: [
      "Distant TV noise and a soft notification ping.",
      "Late-afternoon Cairo room tone with dust-heavy stillness.",
      "A faint call to prayer under the final beat of the scene.",
    ],
    soundDesignAr: [
      "صوت تلفزيون بعيد وتنبيه موبايل خفيف.",
      "إحساس غرفة قاهرية ساكنة ومليانة تراب العصر.",
      "أذان بعيد خافت تحت آخر نبضة في المشهد.",
    ],
    positivePromptEn:
      "Ultra-realistic Egyptian family drama, warm amber light, lived-in Cairo apartment, restrained acting, no melodrama, phone-lit face, medically consequential rumor entering an ordinary home.",
    positivePromptAr:
      "دراما عائلية مصرية واقعية جداً، إضاءة كهرمانية دافئة، شقة قاهرية معاشة، أداء هادئ بدون مبالغة، وجه مضاء من شاشة الموبايل، شائعة طبية تدخل بيتاً عادياً.",
    negativePromptEn: [
      "Do not make the father cartoonish or ignorant.",
      "Do not add glossy startup aesthetics.",
      "Do not over-dramatize with horror lighting.",
      "Do not show instant medical collapse in this scene.",
    ],
    negativePromptAr: [
      "ممنوع تحويل الأب إلى كاريكاتير أو شخص ساذج.",
      "ممنوع شكل شركات التكنولوجيا اللامع.",
      "ممنوع إضاءة رعب مبالغ فيها.",
      "ممنوع إظهار انهيار طبي فوري داخل هذا المشهد.",
    ],
  },
  {
    id: "scene-2",
    titleEn: "Scene 2: The Mother in the Kitchen",
    titleAr: "المشهد 2: الأم في المطبخ",
    duration: "10s",
    settingEn:
      "An Egyptian kitchen at night. A mother forwards the same claim into the family WhatsApp group while cooking and managing domestic noise.",
    settingAr:
      "مطبخ مصري بالليل. أم تعيد إرسال نفس الادعاء إلى جروب العائلة على واتساب وهي تطبخ وسط دوشة البيت.",
    dialogueEn: "Tone: care, not malice. She believes she is helping the family.",
    dialogueAr: "النغمة: رعاية وليست سوء نية. هي فاكرة إنها بتفيد العيلة.",
    cinematographyEn: [
      "Tight countertop shot with steam, spices, and the phone beside the cutting board.",
      "Over-shoulder view of the family group and the forward button.",
      "Reaction shot after the send action, with no sense yet that harm has begun.",
    ],
    cinematographyAr: [
      "لقطة ضيقة على الرخامة فيها بخار وبهارات والموبايل جنب لوح التقطيع.",
      "لقطة من فوق الكتف على جروب العيلة وزر الإرسال.",
      "رد فعل بعد الإرسال بدون أي إحساس حتى الآن أن الضرر بدأ.",
    ],
    soundDesignEn: [
      "Sizzling pan and cupboard movement.",
      "WhatsApp send whoosh layered with domestic kitchen rhythm.",
      "No music spike; the danger should remain ordinary.",
    ],
    soundDesignAr: [
      "صوت طاسة بتشوح وفتح دولاب.",
      "وش الإرسال في واتساب فوق إيقاع المطبخ اليومي.",
      "مفيش قفزة موسيقية؛ الخطر لازم يفضل عادي ومألوف.",
    ],
    positivePromptEn:
      "Egyptian kitchen realism, intimate domestic framing, everyday forwarding behavior, believable hand movement, no villain framing, social spread born from affection and habit.",
    positivePromptAr:
      "واقعية مطبخ مصري، كادرات منزلية حميمة، سلوك إعادة إرسال يومي، حركة يد مقنعة، بدون تصوير شرير، انتشار اجتماعي خارج من العادة والمحبة.",
    negativePromptEn: [
      "Do not frame the mother as manipulative.",
      "Do not switch to thriller pacing.",
      "Do not use luxury kitchen styling.",
      "Do not insert English-language interface text.",
    ],
    negativePromptAr: [
      "ممنوع تصوير الأم كشخص متلاعب.",
      "ممنوع تحويل الإيقاع إلى إثارة مبالغ فيها.",
      "ممنوع مطبخ فاخر غير واقعي.",
      "ممنوع واجهات مكتوبة بالإنجليزية.",
    ],
  },
  {
    id: "scene-3",
    titleEn: "Scene 3: The Ripple",
    titleAr: "المشهد 3: الموجة الممتدة",
    duration: "10s",
    settingEn:
      "A cross-cut ripple scene showing the father, the mother, and the message branching across relatives, friends, and authority figures.",
    settingAr:
      "مشهد متقاطع يوضح امتداد الرسالة بين الأب والأم ثم تفرعها إلى أقارب وأصدقاء وأشخاص لهم سلطة اجتماعية.",
    dialogueEn: "Tone: no exposition. The montage should teach spread through repeated ordinary forwarding gestures.",
    dialogueAr: "النغمة: بدون شرح مباشر. المونتاج يشرح الانتشار من خلال تكرار حركات الإرسال العادية.",
    cinematographyEn: [
      "Split-second cuts between homes, school groups, and private chats.",
      "Visual motif: one finger press echoed by many other hands.",
      "End on a still beat before anyone understands the consequences.",
    ],
    cinematographyAr: [
      "قطع سريع بين بيوت وجروبات مدارس ومحادثات خاصة.",
      "موتيفة بصرية: ضغطة إصبع واحدة تتكرر في أيدٍ كثيرة.",
      "النهاية على لحظة سكون قبل ما حد يفهم العواقب.",
    ],
    soundDesignEn: [
      "Layered notification bursts that never become comedic.",
      "A pulse-like low frequency under the montage.",
      "Short silence at the end to prepare the reveal.",
    ],
    soundDesignAr: [
      "تنبيهات متراكبة بدون أن تصبح مضحكة.",
      "نبضة منخفضة تحت المونتاج.",
      "صمت قصير في النهاية تمهيداً للكشف.",
    ],
    positivePromptEn:
      "Fast but readable ripple montage, Egyptian devices and interiors, grounded social spread, repeated UI behavior, visual storytelling centered on consequence chains.",
    positivePromptAr:
      "مونتاج موجي سريع لكن واضح، أجهزة وبيوت مصرية، انتشار اجتماعي واقعي، سلوك واجهات متكرر، سرد بصري يركز على سلسلة العواقب.",
    negativePromptEn: [
      "Do not turn the montage into abstract sci-fi graphics.",
      "Do not show impossible viral numbers.",
      "Do not use meme humor.",
      "Do not glorify the spread.",
    ],
    negativePromptAr: [
      "ممنوع تحويل المونتاج إلى جرافيك خيال علمي مجرد.",
      "ممنوع أرقام انتشار مستحيلة.",
      "ممنوع استخدام روح الميمز أو السخرية.",
      "ممنوع تمجيد الانتشار.",
    ],
  },
  {
    id: "scene-4",
    titleEn: "Scene 4: Exhaustion With the Feed",
    titleAr: "المشهد 4: رجل مرهق من سيل الأخبار",
    duration: "10s",
    settingEn:
      "A young Egyptian man sits alone at night, overwhelmed by contradictory headlines, rumors, and emotionally manipulative clips.",
    settingAr:
      "شاب مصري جالس وحده بالليل، مرهق من عناوين متناقضة وشائعات ومقاطع مصممة للاستفزاز العاطفي.",
    dialogueEn: "Suggested line: 'I don't know what to trust anymore.'",
    dialogueAr: "جملة مقترحة: «أنا مش عارف أصدق إيه بعد كده».",
    cinematographyEn: [
      "Blue night light and the harsh contrast of multiple tabs and notifications.",
      "Close shots of tired eyes, scrolling fatigue, and the pause before giving up.",
      "Frame him as searching, not weak.",
    ],
    cinematographyAr: [
      "ضوء ليلي أزرق مع قسوة التنبيهات والتبويبات الكثيرة.",
      "لقطات قريبة لعينين مرهقتين وإجهاد التمرير ولحظة الاستسلام.",
      "قدمه كشخص يبحث وليس كشخص ضعيف.",
    ],
    soundDesignEn: [
      "Notification clutter turning into dull sonic pressure.",
      "Breath and room tone foregrounded over music.",
      "No triumphant cue yet; this is the breaking point.",
    ],
    soundDesignAr: [
      "زحمة تنبيهات تتحول إلى ضغط صوتي مكتوم.",
      "النفس وصوت الغرفة في الواجهة أكثر من الموسيقى.",
      "لسه مفيش لحظة انتصار؛ دي نقطة الانكسار.",
    ],
    positivePromptEn:
      "Psychological realism, digital fatigue, Egyptian male lead in a believable room, emotionally accurate overwhelm, no glamor, no instant rescue.",
    positivePromptAr:
      "واقعية نفسية، إرهاق رقمي، بطل مصري في غرفة مقنعة، إنهاك عاطفي دقيق، بدون تجميل أو إنقاذ فوري.",
    negativePromptEn: [
      "Do not depict him as unstable or dangerous.",
      "Do not use hacky glitch effects everywhere.",
      "Do not frame misinformation fatigue as a joke.",
      "Do not show the app yet solving the problem.",
    ],
    negativePromptAr: [
      "ممنوع تصويره كشخص غير متزن أو خطر.",
      "ممنوع إغراق المشهد بتأثيرات جليتش سطحية.",
      "ممنوع التعامل مع الإرهاق المعلوماتي كأنه نكتة.",
      "ممنوع إظهار التطبيق وهو يحل المشكلة فعلاً هنا.",
    ],
  },
  {
    id: "scene-5",
    titleEn: "Scene 5: The Brother Introduces the Platform",
    titleAr: "المشهد 5: الأخ يعرّف بالمنصة",
    duration: "10s",
    settingEn:
      "A brother sits beside him, offers the phone gently, and introduces the platform as a door into evidence, not as a miracle fix.",
    settingAr:
      "أخ يجلس بجواره ويعرض عليه الموبايل بهدوء ويقدّم المنصة كمدخل إلى الدليل، وليس كحل سحري.",
    dialogueEn: "Suggested line: 'Let's check before we believe.'",
    dialogueAr: "جملة مقترحة: «تعال نراجع قبل ما نصدق».",
    cinematographyEn: [
      "Two-shot with emotional equality between brothers.",
      "Phone handoff as the final visual beat.",
      "End on curiosity and openness, not resolution.",
    ],
    cinematographyAr: [
      "لقطة ثنائية فيها مساواة عاطفية بين الأخوين.",
      "تسليم الموبايل هو الضربة البصرية الأخيرة.",
      "النهاية على فضول وانفتاح، لا على حل نهائي.",
    ],
    soundDesignEn: [
      "A quiet three-note oud phrase enters for the first time.",
      "Room tone stays intimate and human.",
      "No victory swell; only a careful opening.",
    ],
    soundDesignAr: [
      "ثلاث نغمات عود هادئة تدخل لأول مرة.",
      "صوت المكان يظل حميماً وإنسانياً.",
      "ممنوع تصاعد انتصاري؛ فقط باب صغير يتفتح.",
    ],
    positivePromptEn:
      "Tender brotherhood, understated hope, no superiority, culturally grounded Egyptian interior, product reveal without startup spectacle, invitation to verify before forwarding.",
    positivePromptAr:
      "أخوّة حنونة، أمل هادئ، بدون استعلاء، بيت مصري مقنع، ظهور للمنصة بدون استعراض شركات ناشئة، دعوة للتحقق قبل إعادة الإرسال.",
    negativePromptEn: [
      "Do not end with applause or solved outcomes.",
      "Do not make the younger brother condescending.",
      "Do not use flashy product UI montage overload.",
      "Do not imply the platform replaces doctors, scholars, or therapists.",
    ],
    negativePromptAr: [
      "ممنوع نهاية فيها تصفيق أو حل كامل.",
      "ممنوع أن يبدو الأخ الأصغر متعالياً.",
      "ممنوع إغراق المشهد بمونتاج واجهات مبهرجة.",
      "ممنوع الإيحاء أن المنصة تستبدل الطبيب أو العالم أو المعالج.",
    ],
  },
];

export const TRAILER_MASTER_NEGATIVE_PROMPTS_EN = [
  "No plastic skin, beauty-filter faces, or idealized influencer casting.",
  "No generic Gulf, Levantine, or Western home styling when the scene is Egyptian.",
  "No floating subtitles baked into the image.",
  "No English-first branding dominating the frame.",
  "No celebratory misinformation spread visuals.",
  "No comic sound effects when harm is implied.",
  "No horror-movie exaggeration or supernatural framing.",
  "No instant black-and-white moral binaries.",
  "No spotless luxury interiors that break class realism.",
  "No exaggerated crying or theatrical collapse.",
  "No jump cuts that make the message flow unreadable.",
  "No fake medical equipment unless the scene truly requires it.",
  "No slick Silicon Valley product reveal language.",
  "No triumphant orchestral ending.",
  "No magical UI that auto-fixes the user's life.",
  "No shaming tone toward older family members.",
  "No implication that prayer and evidence are opposites.",
  "No implication that the app replaces professional care.",
  "No politics-first framing when the focus is factual harm.",
  "No generic 'Arabic' set dressing without Egyptian specificity.",
  "No accidental comedy from phone-screen closeups.",
  "No chaotic camera shake unless narratively justified.",
  "No overuse of glitch overlays in every scene.",
  "No instant transformation from confusion to certainty.",
  "No fake viral metrics detached from realism.",
  "No villain music for ordinary family behavior.",
  "No masculine hero shot of the platform founder figure.",
  "No ending that claims the platform solves everything.",
  "No final slogan that sounds like propaganda.",
  "No triumphalist ending; the final beat is discovery, not victory.",
];

export const TRAILER_MASTER_NEGATIVE_PROMPTS_AR = [
  "ممنوع بشرة بلاستيكية أو وجوه بفلتر جمال أو اختيار ممثلين بشكل مثالي مبالغ فيه.",
  "ممنوع ديكور خليجي أو شامي أو غربي عام حين يكون المشهد مصرياً.",
  "ممنوع وجود ترجمة مطبوعة داخل الصورة نفسها.",
  "ممنوع هيمنة العلامة الإنجليزية على الكادر.",
  "ممنوع تصوير انتشار التضليل كأنه شيء احتفالي.",
  "ممنوع مؤثرات صوتية كوميدية عند الإشارة إلى الضرر.",
  "ممنوع مبالغة رعب أو إطار فوق طبيعي.",
  "ممنوع تحويل الشخصيات إلى خير مطلق وشر مطلق.",
  "ممنوع منازل فاخرة نظيفة بشكل يكسر الواقعية الطبقية.",
  "ممنوع بكاء تمثيلي أو انهيار مسرحي مبالغ فيه.",
  "ممنوع قطع مونتاج يجعل مسار الرسالة غير مقروء.",
  "ممنوع معدات طبية مزيفة إلا لو المشهد يحتاجها فعلاً.",
  "ممنوع لغة كشف منتج على طريقة وادي السيليكون.",
  "ممنوع نهاية أوركسترالية انتصارية.",
  "ممنوع واجهة سحرية تصلح حياة المستخدم تلقائياً.",
  "ممنوع نبرة لوم تجاه كبار السن في العائلة.",
  "ممنوع الإيحاء بأن الإيمان والدليل ضد بعض.",
  "ممنوع الإيحاء بأن التطبيق بديل عن الرعاية المهنية.",
  "ممنوع تحويل الإطار إلى سياسة قبل أن يكون ضرراً واقعياً.",
  "ممنوع ديكور عربي عام بدون خصوصية مصرية واضحة.",
  "ممنوع لقطات قريبة للهاتف تتحول بدون قصد إلى مادة ساخرة.",
  "ممنوع اهتزاز كاميرا فوضوي بدون مبرر قصصي.",
  "ممنوع إغراق كل المشاهد بطبقات جليتش.",
  "ممنوع انتقال فوري من الحيرة إلى اليقين.",
  "ممنوع أرقام انتشار وهمية غير واقعية.",
  "ممنوع موسيقى شريرة فوق سلوك عائلي يومي.",
  "ممنوع لقطة بطل ذكوري للمؤسس أو المنقذ.",
  "ممنوع نهاية تدّعي أن المنصة حلت كل شيء.",
  "ممنوع شعار ختامي يبدو كأنه دعاية دعائية صلبة.",
  "ممنوع نهاية ظافرة؛ آخر لحظة هي اكتشاف الباب وليس الوصول للنهاية.",
];
