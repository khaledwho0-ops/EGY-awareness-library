"use client";

import { useState, useEffect } from "react";
import { Users, Download, MessageCircle, Copy, Check, Heart, Shield, ArrowRight, Share2, Printer, BookOpen } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { getCurrentUser } from "@/lib/auth";

/* ═══════════════════════════════════════════════════════════
   FAMILY PROTECTION KIT — Feature #4
   "My mom shared fake news again — now I can help her"
   ═══════════════════════════════════════════════════════════ */

interface QuickCheckCard {
  id: string;
  question: string;
  questionAr: string;
  emoji: string;
}

const QUICK_CHECKS: QuickCheckCard[] = [
  { id: "q1", question: "Who is the original source?", questionAr: "مين المصدر الأصلي؟", emoji: "🔍" },
  { id: "q2", question: "Is there a date and author name?", questionAr: "فيه تاريخ واسم كاتب؟", emoji: "📅" },
  { id: "q3", question: "Did you search for it on Google?", questionAr: "دورت عليه في جوجل؟", emoji: "🌐" },
  { id: "q4", question: "Does it make you angry or scared?", questionAr: "بيخليك تزعل أو تخاف؟", emoji: "😤" },
  { id: "q5", question: "Would you bet money it's true?", questionAr: "تراهن بفلوسك إنه صح؟", emoji: "💰" },
];

interface WhatsAppTemplate {
  id: string;
  title: string;
  titleAr: string;
  situation: string;
  situationAr: string;
  message: string;
  messageAr: string;
}

const WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    id: "health",
    title: "Health Misinformation",
    titleAr: "معلومات صحية خاطئة",
    situation: "Someone shares a dangerous health claim",
    situationAr: "حد شارك ادعاء صحي خطير",
    message: "Hi! 😊 I saw you shared this. I care about your health, so I checked — the Ministry of Health hasn't confirmed this. Let's be careful about what we share about health topics. Here's the official source: [link]",
    messageAr: "أهلاً! 😊 شفت البوست ده. أنا قلقان على صحتك فبحثت — وزارة الصحة مأكدتش الكلام ده. خلينا نبقى حريصين في المواضيع الصحية. ده المصدر الرسمي: [لينك]",
  },
  {
    id: "political",
    title: "Political Rumors",
    titleAr: "شائعات سياسية",
    situation: "Unverified political news is shared",
    situationAr: "خبر سياسي مش متأكد منه",
    message: "I saw this too, but I couldn't find it on any official news site. It might be just a rumor. Let's wait for confirmation before we share 🙏",
    messageAr: "أنا كمان شفت الخبر ده، بس مش لاقيه في أي موقع إخباري رسمي. ممكن تكون مجرد شائعة. نستنى التأكيد قبل ما نشاركه 🙏",
  },
  {
    id: "religious",
    title: "Misattributed Religious Quote",
    titleAr: "حديث أو قول ديني مغلوط",
    situation: "A fabricated hadith or religious quote",
    situationAr: "حديث مكذوب أو قول ديني مش صح",
    message: "Peace be upon you 🤲 This quote is beautiful but I checked on IslamWeb and it's not verified. Let's make sure we only share authentic knowledge. May Allah guide us all.",
    messageAr: "السلام عليكم 🤲 الكلام ده جميل بس بحثت في إسلام ويب ومش متأكد من صحته. خلينا نتأكد إننا بننشر علم صحيح. ربنا يهدينا جميعاً.",
  },
  {
    id: "scam",
    title: "Scam / Phishing",
    titleAr: "نصب / احتيال",
    situation: "A suspicious link or offer",
    situationAr: "لينك مشبوه أو عرض",
    message: "Be careful! ⚠️ This looks like a scam. Real companies never ask for your personal info through WhatsApp. Don't click any links. I care about your safety 💙",
    messageAr: "خلي بالك! ⚠️ ده شكله نصب. الشركات الحقيقية عمرها ما بتطلب بياناتك من واتساب. متضغطش على أي لينك. أنا قلقان على سلامتك 💙",
  },
  {
    id: "general",
    title: "General Fake News",
    titleAr: "أخبار كاذبة عامة",
    situation: "Any unverified viral content",
    situationAr: "أي محتوى منتشر مش متأكد منه",
    message: "Hey! Quick tip: before sharing posts like these, try searching the main claim on Google or checking fact-check sites. Many viral posts turn out to be false. Just looking out for you! 😊",
    messageAr: "أهلاً! نصيحة سريعة: قبل ما تشارك بوستات زي دي، جرب تدور على الادعاء الأساسي في جوجل أو مواقع التحقق. كتير من البوستات المنتشرة بتطلع غلط. بقولك كده عشان بهتم بيك! 😊",
  },
];

interface FamilyTip {
  emoji: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
}

const FAMILY_TIPS: FamilyTip[] = [
  { emoji: "💬", title: "Don't embarrass them publicly", titleAr: "متحرجهمش قدام الناس", description: "Send a private message instead of commenting publicly. Saving face matters.", descriptionAr: "ابعت رسالة خاصة بدل ما تعلق قدام الكل. حفظ الكرامة مهم." },
  { emoji: "❤️", title: "Lead with care, not criticism", titleAr: "ابدأ بالاهتمام مش النقد", description: "Start with 'I care about you' not 'You're wrong'.", descriptionAr: "ابدأ بـ'أنا قلقان عليك' مش 'إنت غلطان'." },
  { emoji: "📱", title: "Show, don't tell", titleAr: "ورّي مش تقول", description: "Show them HOW to verify — open Google together, search together.", descriptionAr: "ورّيهم إزاي يتحققوا — افتح جوجل مع بعض، دوروا مع بعض." },
  { emoji: "🎓", title: "Teach the 5-second rule", titleAr: "علّمهم قاعدة الـ5 ثواني", description: "Before sharing: pause 5 seconds and ask 'Am I sure this is true?'", descriptionAr: "قبل المشاركة: توقف 5 ثواني واسأل 'أنا متأكد إن ده صح؟'" },
  { emoji: "🤝", title: "Make it a team effort", titleAr: "خلّيها مجهود جماعي", description: "Create a 'family fact-check' tradition — verify together!", descriptionAr: "اعمل تقليد 'التحقق العائلي' — اتحققوا مع بعض!" },
];

export default function FamilyKit() {
  const { isRTL: a, t } = useRTL();
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const dir = a ? "rtl" : "ltr";
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [protectedCount, setProtectedCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setProtectedCount(parseInt(localStorage.getItem("eal-family-protected") || "0", 10));
    } catch { /* */ }
  }, []);

  const copyMessage = (id: string, msg: string) => {
    navigator.clipboard.writeText(msg);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const incrementProtected = () => {
    const next = protectedCount + 1;
    setProtectedCount(next);
    try { localStorage.setItem("eal-family-protected", String(next)); } catch { /* */ }
  };

  if (!mounted) return null;

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: dir }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 900 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(236,72,153,0.15), rgba(245,158,11,0.15))",
            border: "2px solid rgba(236,72,153,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px",
          }}>
            <Users size={36} style={{ color: "#EC4899" }} />
          </div>
          <h1 style={{ fontSize: 32, marginBottom: 8, fontFamily: ff }}>
            {t({ en: "Family Protection", ar: "حقيبة حماية", arEG: "حقيبة حماية" })} <span className="text-gradient">{t({ en: "Kit", ar: "العائلة", arEG: "العائلة" })}</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 520, margin: "0 auto", lineHeight: 1.7, fontFamily: ff }}>
            {t({
              en: "Help protect your family from misinformation. Ready-made WhatsApp responses, printable cards, and tips for Egyptian families.",
              ar: "ساعد في حماية عائلتك من المعلومات المضللة. ردود جاهزة للواتساب، كروت قابلة للطباعة، ونصائح للعائلات المصرية.",
              arEG: "ساعد في حماية عيلتك من المعلومات المضللة. ردود جاهزة للواتساب، كروت قابلة للطباعة، ونصايح للعيل المصرية.",
            })}
          </p>
          {/* Impact Counter */}
          <div className="glass-card" style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "10px 20px", marginTop: 16 }}>
            <Heart size={18} style={{ color: "#EC4899" }} />
            <span style={{ fontSize: 14, fontFamily: ff }}>
              {t({ en: "Family members protected:", ar: "أفراد العائلة المحميين:", arEG: "أفراد العيلة المحميين:" })}
            </span>
            <strong style={{ fontSize: 20, color: "#EC4899", fontFamily: "'Clash Display', sans-serif" }}>{protectedCount}</strong>
            <button onClick={incrementProtected} style={{
              padding: "4px 12px", borderRadius: 16, fontSize: 11, fontWeight: 700,
              background: "rgba(236,72,153,0.1)", color: "#EC4899", border: "1px solid rgba(236,72,153,0.3)",
              cursor: "pointer",
            }}>+1</button>
          </div>
        </div>

        {/* Quick Check Cards */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, marginBottom: 16, display: "flex", alignItems: "center", gap: 8, fontFamily: ff }}>
            <BookOpen size={20} style={{ color: "#F59E0B" }} />
            {t({ en: "5 Questions Before Sharing (Print & Give)", ar: "٥ أسئلة قبل المشاركة (اطبع ووزّع)", arEG: "٥ أسئلة قبل المشاركة (اطبع ووزّع)" })}
          </h2>
          <div className="glass-card" style={{ padding: 24, background: "linear-gradient(135deg, rgba(245,158,11,0.04), rgba(236,72,153,0.04))" }}>
            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
              {QUICK_CHECKS.map((qc, i) => (
                <div key={qc.id} style={{
                  padding: 16, borderRadius: 12, background: "var(--bg-secondary)", border: "1px solid var(--border-primary)",
                  display: "flex", alignItems: "center", gap: 12,
                }}>
                  <div style={{ fontSize: 28, minWidth: 40, textAlign: "center" }}>{qc.emoji}</div>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--text-caption)", fontWeight: 700 }}>#{i + 1}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, fontFamily: ff }}>
                      {a ? qc.questionAr : qc.question}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WhatsApp Templates */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, marginBottom: 16, display: "flex", alignItems: "center", gap: 8, fontFamily: ff }}>
            <MessageCircle size={20} style={{ color: "#25D366" }} />
            {t({ en: "Ready-Made WhatsApp Responses", ar: "ردود واتساب جاهزة", arEG: "ردود واتساب جاهزة" })}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {WHATSAPP_TEMPLATES.map((tmpl) => (
              <div key={tmpl.id} className="glass-card" style={{ padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, fontFamily: ff }}>{a ? tmpl.titleAr : tmpl.title}</div>
                    <div style={{ fontSize: 12, color: "var(--text-caption)", fontFamily: ff }}>
                      {a ? tmpl.situationAr : tmpl.situation}
                    </div>
                  </div>
                  <button
                    onClick={() => { copyMessage(tmpl.id, a ? tmpl.messageAr : tmpl.message); incrementProtected(); }}
                    className="glass-card"
                    style={{
                      padding: "6px 14px", fontSize: 12, cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 4,
                      border: copiedId === tmpl.id ? "1px solid #10B981" : "1px solid var(--border-primary)",
                      color: copiedId === tmpl.id ? "#10B981" : "var(--text-secondary)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {copiedId === tmpl.id ? <Check size={14} /> : <Copy size={14} />}
                    {copiedId === tmpl.id ? (a ? "تم!" : "Copied!") : (a ? "انسخ" : "Copy")}
                  </button>
                </div>
                <div style={{
                  padding: "12px 16px", borderRadius: 12,
                  background: "rgba(37,211,102,0.06)", border: "1px solid rgba(37,211,102,0.15)",
                  fontSize: 14, lineHeight: 1.8, color: "var(--text-secondary)",
                  fontFamily: "'Noto Kufi Arabic', sans-serif", direction: "rtl",
                }}>
                  {a ? tmpl.messageAr : tmpl.message}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Family Tips */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, marginBottom: 16, display: "flex", alignItems: "center", gap: 8, fontFamily: ff }}>
            <Heart size={20} style={{ color: "#EC4899" }} />
            {t({ en: "How to Talk to Family (Egyptian Edition)", ar: "إزاي تتكلم مع العيلة (النسخة المصرية)", arEG: "إزاي تتكلم مع العيلة (النسخة المصرية)" })}
          </h2>
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
            {FAMILY_TIPS.map((tip, i) => (
              <div key={i} className="glass-card" style={{ padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{tip.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, fontFamily: ff }}>
                  {a ? tip.titleAr : tip.title}
                </div>
                <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, margin: 0, fontFamily: ff }}>
                  {a ? tip.descriptionAr : tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
