import type { LocalizedText, ModuleId } from "./module-briefings";
import {
  DAR_AL_IFTA_CONTACTS_URL,
  DAR_AL_IFTA_TELEPHONE_SERVICE_URL,
  MOHP_MENTAL_HEALTH_PLATFORM_URL,
  WHO_MENTAL_HEALTH_URL,
} from "@/data/directory/official-support";

export interface CognitiveSourceLink {
  label: LocalizedText;
  url: string;
}

export interface RealtimeCognitiveProtocol {
  id: string;
  module: ModuleId;
  title: LocalizedText;
  summary: LocalizedText;
  action: LocalizedText;
  whyItWorks: LocalizedText;
  sources: CognitiveSourceLink[];
}

function t(en: string, ar: string, arEG?: string): LocalizedText {
  return { en, ar, arEG: arEG || ar };
}

export const REALTIME_COGNITIVE_PROTOCOLS: RealtimeCognitiveProtocol[] = [
  {
    id: "rtc-dr-1",
    module: "deepreal",
    title: t("Pressure pause", "إيقاف ضغط السرعة"),
    summary: t("Interrupt urgency before your brain mistakes speed for truth.", "أوقف الاستعجال قبل أن يخلط دماغك بين السرعة والحقيقة."),
    action: t("Write the claim in one sentence, wait 30 seconds, then open one official and one research route.", "اكتب الادعاء في جملة واحدة، انتظر 30 ثانية، ثم افتح مساراً رسمياً ومساراً بحثياً."),
    whyItWorks: t("Prebunking and inoculation work by making manipulation techniques visible before belief hardens.", "التمنيع المعرفي يعمل لأنه يكشف أساليب التلاعب قبل أن يتصلب التصديق."),
    sources: [
      { label: t("Cambridge Bad News", "كامبريدج: Bad News"), url: "https://www.cam.ac.uk/research/news/fake-news-vaccine-works-pre-bunk-game-reduces-susceptibility-to-disinformation" },
      { label: t("Cambridge MIST", "كامبريدج: MIST"), url: "https://www.cam.ac.uk/stories/misinformation-susceptibility-test" },
    ],
  },
  {
    id: "rtc-dr-2",
    module: "deepreal",
    title: t("Claim distillation", "تقطير الادعاء"),
    summary: t("Reduce a viral post to the smallest checkable statement.", "اختزل المنشور الشائع إلى أصغر جملة قابلة للفحص."),
    action: t("Remove adjectives, outrage language, and commands. Keep only who-did-what-when.", "احذف الصفات ولغة الغضب والأوامر. أبق فقط على من فعل ماذا ومتى."),
    whyItWorks: t("Smaller, testable claims reduce narrative capture and improve evidence matching.", "الادعاءات الأصغر القابلة للاختبار تقلل أسر السرد وتُحسن مطابقة الأدلة."),
    sources: [
      { label: t("Digital Inquiry Group", "مجموعة الاستقصاء الرقمي"), url: "https://www.digitalinquirygroup.org/" },
      { label: t("News Literacy Project", "مشروع محو أمية الأخبار"), url: "https://newslit.org/" },
    ],
  },
  {
    id: "rtc-dr-3",
    module: "deepreal",
    title: t("Free-source triangulation", "تثليث المصادر المجانية"),
    summary: t("Compare an official source, a fact-check source, and an open research source before deciding.", "قارن بين مصدر رسمي ومصدر تحقق ومصدر بحثي مفتوح قبل اتخاذ القرار."),
    action: t("Do not stop at the first hit. Look for agreement across source classes.", "لا تتوقف عند أول نتيجة. ابحث عن الاتفاق عبر فئات المصادر."),
    whyItWorks: t("Triangulation lowers the chance that one blind spot, ideology, or business model controls your judgment.", "التثليث يقلل احتمال أن تتحكم نقطة عمياء واحدة أو أيديولوجيا أو نموذج ربحي في حكمك."),
    sources: [
      { label: t("OpenAlex", "OpenAlex"), url: "https://openalex.org/" },
      { label: t("Poynter IFCN", "بونتر IFCN"), url: "https://ifcncodeofprinciples.poynter.org/" },
    ],
  },
  {
    id: "rtc-dr-4",
    module: "deepreal",
    title: t("Manipulation log", "سجل التلاعب"),
    summary: t("Track which tactic hit you: urgency, authority, outrage, identity, or fear.", "سجل أي تكتيك أصابك: الاستعجال أو السلطة أو الغضب أو الهوية أو الخوف."),
    action: t("Name the tactic before you decide whether the claim deserves more time.", "سمّ التكتيك قبل أن تقرر هل يستحق الادعاء وقتاً إضافياً أم لا."),
    whyItWorks: t("Naming the tactic weakens its automatic pull and restores deliberate reasoning.", "تسمية التكتيك تضعف سحبه التلقائي وتعيد التفكير المتعمد."),
    sources: [
      { label: t("UNESCO MIL", "اليونسكو لمحو الأمية الإعلامية"), url: "https://www.unesco.org/en/media-information-literacy" },
      { label: t("InVID WeVerify", "InVID WeVerify"), url: "https://www.invid-project.eu/tools-and-services/" },
    ],
  },
  {
    id: "rtc-mh-1",
    module: "mental-health",
    title: t("Body-first check", "فحص يبدأ من الجسد"),
    summary: t("Start with breath, sleep, appetite, and tension before giving the feeling a story.", "ابدأ بالتنفس والنوم والشهية والتوتر قبل أن تمنح الشعور قصة كاملة."),
    action: t("Name one body cue, one emotion, and one urgent risk.", "سمّ إشارة جسدية واحدة، وشعوراً واحداً، وخطراً عاجلاً واحداً."),
    whyItWorks: t("Body-first labeling reduces overload and improves accurate support routing.", "البدء بالجسد يقلل الحمل الذهني ويحسن توجيه الدعم بدقة."),
    sources: [
      { label: t("WHO Mental Health", "الصحة النفسية - منظمة الصحة العالمية"), url: WHO_MENTAL_HEALTH_URL },
      { label: t("Egypt MoHP Platform", "منصة وزارة الصحة المصرية"), url: MOHP_MENTAL_HEALTH_PLATFORM_URL },
    ],
  },
  {
    id: "rtc-mh-2",
    module: "mental-health",
    title: t("Function over label", "الوظيفة قبل الملصق"),
    summary: t("Measure what changed in daily life before chasing a diagnosis label.", "قس ما الذي تغير في الحياة اليومية قبل مطاردة ملصق تشخيصي."),
    action: t("Rate study, work, sleep, and social function from 0 to 10.", "قيّم الدراسة والعمل والنوم والوظيفة الاجتماعية من 0 إلى 10."),
    whyItWorks: t("Function tracks severity more safely than viral self-diagnosis language.", "الوظيفة تتتبع الشدة بأمان أكبر من لغة التشخيص الذاتي المنتشرة."),
    sources: [
      { label: t("WHO Depression", "منظمة الصحة العالمية: الاكتئاب"), url: "https://www.who.int/en/news-room/fact-sheets/detail/depression" },
      { label: t("WHO Anxiety", "منظمة الصحة العالمية: اضطرابات القلق"), url: "https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders" },
    ],
  },
  {
    id: "rtc-mh-3",
    module: "mental-health",
    title: t("Trusted-person route", "مسار الشخص الموثوق"),
    summary: t("Choose a trusted human contact before isolation turns the feeling into a private echo chamber.", "اختر شخصاً موثوقاً قبل أن يحول العزل الشعور إلى غرفة صدى خاصة."),
    action: t("Write one name, one contact method, and one sentence asking for support.", "اكتب اسماً واحداً وطريقة تواصل واحدة وجملة واحدة لطلب الدعم."),
    whyItWorks: t("Fast social anchoring lowers paralysis and helps move from rumination to action.", "التثبيت الاجتماعي السريع يقلل الشلل ويساعد على الانتقال من الاجترار إلى الفعل."),
    sources: [
      { label: t("Egypt Mental Health Platform", "منصة الصحة النفسية المصرية"), url: MOHP_MENTAL_HEALTH_PLATFORM_URL },
      { label: t("WHO Suicide Prevention", "منظمة الصحة العالمية: الانتحار"), url: "https://www.who.int/news-room/fact-sheets/detail/suicide" },
    ],
  },
  {
    id: "rtc-mh-4",
    module: "mental-health",
    title: t("Misinformation shield", "درع ضد التضليل النفسي"),
    summary: t("Separate psychoeducation from diagnosis, miracle claims, and stigma content.", "افصل بين التثقيف النفسي وبين التشخيص والوعود المعجزة والمحتوى الوصمي."),
    action: t("Ask: is this teaching, diagnosing, shaming, or selling?", "اسأل: هل هذا يعلّم أم يشخّص أم يعيب أم يبيع؟"),
    whyItWorks: t("Naming the content function helps you reject manipulative or unsafe advice faster.", "تسمية وظيفة المحتوى تساعدك على رفض النصيحة المتلاعبة أو غير الآمنة بسرعة."),
    sources: [
      { label: t("WHO Mental Disorders", "منظمة الصحة العالمية: الاضطرابات النفسية"), url: "https://www.who.int/en/news-room/fact-sheets/detail/mental-disorders" },
      { label: t("MoHP Mental Health", "منصة وزارة الصحة المصرية"), url: MOHP_MENTAL_HEALTH_PLATFORM_URL },
    ],
  },
  {
    id: "rtc-rh-1",
    module: "religion-hub",
    title: t("Peace-or-control check", "فحص السلام أم السيطرة"),
    summary: t("Ask whether the message produces calm responsibility or fearful obedience.", "اسأل هل تنتج الرسالة مسؤولية هادئة أم طاعة خائفة."),
    action: t("Score the message on peace, coercion, shame, and respect for boundaries.", "قيّم الرسالة في السلام والقسر والعار واحترام الحدود."),
    whyItWorks: t("Moderation becomes visible when you test tone, pressure, and boundary respect together.", "يصبح الاعتدال مرئياً عندما تختبر النبرة والضغط واحترام الحدود معاً."),
    sources: [
      { label: t("Dar al-Ifta Contacts", "دار الإفتاء: تواصل"), url: DAR_AL_IFTA_CONTACTS_URL },
      { label: t("Dar al-Ifta Telephone Service", "دار الإفتاء: خدمة الهاتف"), url: DAR_AL_IFTA_TELEPHONE_SERVICE_URL },
    ],
  },
  {
    id: "rtc-rh-2",
    module: "religion-hub",
    title: t("Boundary split", "فصل الحدود"),
    summary: t("Separate spiritual reflection from medical, legal, and psychological claims.", "افصل بين التأمل الروحي وبين الادعاءات الطبية والقانونية والنفسية."),
    action: t("Mark which sentence is spiritual comfort and which sentence needs another authority.", "حدد أي جملة هي مواساة روحية وأي جملة تحتاج جهة اختصاص أخرى."),
    whyItWorks: t("Many harmful messages mix comfort with authority over domains they do not own.", "كثير من الرسائل الضارة تخلط المواساة بسلطة على مجالات لا تملكها."),
    sources: [
      { label: t("Dar al-Ifta Guidance Route", "دار الإفتاء: مسار التوجيه"), url: DAR_AL_IFTA_TELEPHONE_SERVICE_URL },
      { label: t("Egypt Mental Health Platform", "منصة الصحة النفسية المصرية"), url: MOHP_MENTAL_HEALTH_PLATFORM_URL },
    ],
  },
  {
    id: "rtc-rh-3",
    module: "religion-hub",
    title: t("Scrupulosity brake", "مكبح الوسوسة الدينية"),
    summary: t("Notice when guilt is becoming compulsion instead of healthy accountability.", "لاحظ متى يتحول الذنب إلى إلزام قهري بدلاً من محاسبة صحية."),
    action: t("Write the feared consequence, then ask whether it is evidence, pressure, or uncertainty.", "اكتب النتيجة المخيفة ثم اسأل: هل هي دليل أم ضغط أم عدم يقين؟"),
    whyItWorks: t("Slowing guilt language helps keep conscience from turning into panic or coercion.", "إبطاء لغة الذنب يساعد على منع الضمير من التحول إلى هلع أو قسر."),
    sources: [
      { label: t("WHO Mental Health", "الصحة النفسية - منظمة الصحة العالمية"), url: WHO_MENTAL_HEALTH_URL },
      { label: t("Dar al-Ifta Contacts", "دار الإفتاء: تواصل"), url: DAR_AL_IFTA_CONTACTS_URL },
    ],
  },
  {
    id: "rtc-rh-4",
    module: "religion-hub",
    title: t("Moderate-source routing", "توجيه إلى مصدر معتدل"),
    summary: t("Move from anonymous clips and pressure content to visible, accountable institutions.", "انتقل من المقاطع المجهولة والمحتوى الضاغط إلى مؤسسات ظاهرة خاضعة للمساءلة."),
    action: t("Do not answer from memory when the content escalates. Route it to an accountable source.", "لا تجب من الذاكرة عندما يصعد المحتوى. وجّهه إلى مصدر خاضع للمساءلة."),
    whyItWorks: t("Accountability and institutional traceability reduce the risk of manipulation disguised as certainty.", "المساءلة وإمكانية تتبع المؤسسة تقللان خطر التلاعب المتخفي في صورة يقين."),
    sources: [
      { label: t("Dar al-Ifta", "دار الإفتاء"), url: DAR_AL_IFTA_CONTACTS_URL },
      { label: t("Egypt Mental Health Platform", "منصة الصحة النفسية المصرية"), url: MOHP_MENTAL_HEALTH_PLATFORM_URL },
    ],
  },
];
