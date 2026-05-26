"use client";
import { useState } from "react";
import { ChevronDown, HelpCircle, BookOpen, Monitor, Sparkles, Award, ExternalLink, Shield, HeartPulse, Star } from "lucide-react";
import { QA_ITEMS, THEORIES, VISUAL_MAP, UNIQUE_POINTS } from "@/data/defense-qa";

export default function DefenseQAPage() {
  const [openQ, setOpenQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"qa"|"script"|"theories"|"map">("qa");

  const tabs = [
    { id: "qa" as const, label: "الأسئلة والإجابات", icon: <HelpCircle size={16}/> },
    { id: "script" as const, label: "سكريبت العرض", icon: <BookOpen size={16}/> },
    { id: "theories" as const, label: "النظريات الثمانية", icon: <Sparkles size={16}/> },
    { id: "map" as const, label: "خريطة العرض المرئي", icon: <Monitor size={16}/> },
  ];

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", direction: "rtl", fontFamily: "'Noto Kufi Arabic','Cairo',sans-serif" }}>
      {/* Hero */}
      <section style={{ padding: "120px 0 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "30%", left: "20%", width: 400, height: 400, background: "var(--hero-orb-1)", pointerEvents: "none" }}/>
        <div style={{ position: "absolute", bottom: "20%", right: "15%", width: 350, height: 350, background: "var(--hero-orb-2)", pointerEvents: "none" }}/>
        <div className="container relative" style={{ zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, background: "var(--bg-secondary)", border: "1px solid var(--border-primary)", fontSize: 13, color: "var(--text-secondary)", marginBottom: 24 }}>
            <Award size={14} style={{ color: "var(--accent-cta)" }}/>
            4 أجزاء | عربي كامل | تعليمات المقدّم مدمجة
          </div>
          <h1 className="text-display" style={{ marginBottom: 16 }}>
            دفاع المشروع — <span className="text-gradient">الدليل الكامل</span>
          </h1>
          <p style={{ fontSize: 18, color: "var(--text-muted)", maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.8 }}>
            كل اللي محتاجه عشان تقدّم المشروع بثقة — الأسئلة المتوقعة، السكريبت الكامل، النظريات، وخريطة العرض
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://egyptian-awareness-library.vercel.app" target="_blank" rel="noopener" className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13 }}>
              <ExternalLink size={14}/> النسخة المستقرة
            </a>
            <a href="https://eal-v2-latest.vercel.app" target="_blank" rel="noopener" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13 }}>
              <ExternalLink size={14}/> النسخة V2 المحدّثة
            </a>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="container" style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 10,
              background: activeTab === t.id ? "var(--accent-cta)" : "var(--bg-secondary)",
              color: activeTab === t.id ? "#fff" : "var(--text-secondary)",
              border: activeTab === t.id ? "none" : "1px solid var(--border-primary)",
              cursor: "pointer", fontSize: 14, fontWeight: 600, transition: "all 0.2s"
            }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container" style={{ maxWidth: 900, paddingBottom: 80 }}>

        {/* ═══ TAB: Q&A ═══ */}
        {activeTab === "qa" && (
          <div>
            <h2 style={{ fontSize: 24, marginBottom: 24, textAlign: "center" }}>
              <span className="text-gradient">الأسئلة المتوقعة</span> وإجاباتها
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {QA_ITEMS.map((item, i) => (
                <div key={i} className="glass-card" style={{ overflow: "hidden", transition: "all 0.3s" }}>
                  <button onClick={() => setOpenQ(openQ === i ? null : i)} style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "18px 24px", background: "transparent", border: "none", cursor: "pointer",
                    color: "var(--text-primary)", fontSize: 16, fontWeight: 700, textAlign: "right",
                    fontFamily: "inherit", gap: 12
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ width: 32, height: 32, borderRadius: 8, background: openQ === i ? "var(--accent-cta)" : "var(--bg-elevated)", color: openQ === i ? "#fff" : "var(--text-caption)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0 }}>
                        {i + 1}
                      </span>
                      {item.q}
                    </div>
                    <ChevronDown size={18} style={{ color: "var(--text-muted)", transition: "transform 0.3s", transform: openQ === i ? "rotate(180deg)" : "rotate(0)", flexShrink: 0 }}/>
                  </button>
                  {openQ === i && (
                    <div style={{ padding: "0 24px 20px 24px", paddingRight: 68, fontSize: 15, lineHeight: 1.9, color: "var(--text-secondary)", borderTop: "1px solid var(--border-primary)", animation: "chatMsgFadeIn 0.3s ease" }}>
                      <div style={{ paddingTop: 16 }}>{item.a}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ TAB: SCRIPT ═══ */}
        {activeTab === "script" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <h2 style={{ fontSize: 24, textAlign: "center" }}>
              سكريبت العرض — <span className="text-gradient">4 أجزاء</span>
            </h2>

            {/* Part 1 */}
            <div className="glass-card" style={{ padding: 32, borderTop: "3px solid #EF4444" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(239,68,68,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Shield size={20} style={{ color: "#EF4444" }}/>
                </div>
                <div>
                  <h3 style={{ fontSize: 20, margin: 0 }}>📍 الجزء الأول: المشكلة</h3>
                  <span style={{ fontSize: 12, color: "var(--text-caption)" }}>⏱️ 5–7 دقائق | 🔒 الشاشة مقفولة</span>
                </div>
              </div>
              <div style={{ fontSize: 15, lineHeight: 2.2, color: "var(--text-secondary)" }}>
                <p style={{ fontWeight: 700, fontSize: 17, color: "var(--text-primary)", marginBottom: 8 }}>الافتتاحية:</p>
                <p style={{ background: "var(--bg-elevated)", padding: 16, borderRadius: 10, borderRight: "3px solid #EF4444" }}>
                  &quot;سؤال بسيط: مين فيكم شاف بوست أو فيديو في آخر أسبوع وكان مش متأكد هل ده حقيقي ولا فيك؟&quot;
                </p>
                <p style={{ fontWeight: 700, fontSize: 17, color: "var(--text-primary)", margin: "20px 0 8px" }}>الأرقام المصرية:</p>
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  <li style={{ background: "var(--bg-elevated)", padding: 14, borderRadius: 10 }}>🌐 <strong>89%</strong> من الشباب المصري أونلاين — من كل 10 واحد، 9 بيتعرضوا لمعلومات كل يوم</li>
                  <li style={{ background: "var(--bg-elevated)", padding: 14, borderRadius: 10 }}>📊 التضليل بيكلّف العالم <strong>78 مليار دولار</strong> سنوياً</li>
                  <li style={{ background: "var(--bg-elevated)", padding: 14, borderRadius: 10 }}>💚 واحد من كل <strong>4 مصريين</strong> هيعاني من مشكلة صحة نفسية — بس أغلبهم مش هيطلب مساعدة</li>
                  <li style={{ background: "var(--bg-elevated)", padding: 14, borderRadius: 10 }}>⚠️ الخطاب الديني بيتحول أحياناً من <strong>رسالة سلام لأداة سيطرة</strong></li>
                </ul>
                <p style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(139,92,246,0.08))", padding: 16, borderRadius: 10, marginTop: 16, fontWeight: 600, fontSize: 16 }}>
                  &quot;وإحنا بنينا أول منصة في العالم العربي بتحارب الثلاثة مع بعض.&quot;
                </p>
              </div>
            </div>

            {/* Part 2 */}
            <div className="glass-card" style={{ padding: 32, borderTop: "3px solid #3B82F6" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(59,130,246,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Monitor size={20} style={{ color: "#3B82F6" }}/>
                </div>
                <div>
                  <h3 style={{ fontSize: 20, margin: 0 }}>📍 الجزء الثاني: الحل</h3>
                  <span style={{ fontSize: 12, color: "var(--text-caption)" }}>⏱️ 7 دقائق | 🖥️ الشاشة مفتوحة</span>
                </div>
              </div>
              <div style={{ fontSize: 15, lineHeight: 2.2, color: "var(--text-secondary)" }}>
                <div style={{ display: "grid", gap: 12 }}>
                  {[
                    { icon: <Shield size={18}/>, title: "🛡️ DeepReal — محرك التحقق", color: "#F59E0B", desc: "SIFT: قف → مين المصدر → مصادر تانية → المصدر الأصلي. 14 تمرين عملي بسيناريوهات مصرية." },
                    { icon: <HeartPulse size={18}/>, title: "💚 الصحة النفسية — محرك التثبيت", color: "#10B981", desc: "تعليمي 100%. تسمية المشاعر، التفريق بين التوتر والاكتئاب، تخطي الوصمة. مبني على COM-B." },
                    { icon: <Star size={18}/>, title: "✨ المحور الديني — محرك الاعتدال", color: "#8B5CF6", desc: "التفريق بين الإيمان الصحي والمُستغَل. أنماط الإكراه الديني. المنصة لا تُصدر فتاوى." },
                  ].map((eng, i) => (
                    <div key={i} style={{ background: "var(--bg-elevated)", padding: 20, borderRadius: 12, borderRight: `3px solid ${eng.color}` }}>
                      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: eng.color }}>{eng.title}</div>
                      <div>{eng.desc}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 8 }}>
                  {["42 تمرين","27 نقطة API","6 مقاييس نفسية","8 نظريات سلوكية","55 صفحة","16 ثيم","بلغتين"].map((s,i) => (
                    <div key={i} style={{ background: "var(--bg-elevated)", padding: "10px 14px", borderRadius: 8, textAlign: "center", fontSize: 13, fontWeight: 600 }}>{s}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Part 3 */}
            <div className="glass-card" style={{ padding: 32, borderTop: "3px solid #10B981" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(16,185,129,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Sparkles size={20} style={{ color: "#10B981" }}/>
                </div>
                <div>
                  <h3 style={{ fontSize: 20, margin: 0 }}>📍 الجزء الثالث: الذكاء الاصطناعي</h3>
                  <span style={{ fontSize: 12, color: "var(--text-caption)" }}>⏱️ 5–7 دقائق | 🖥️ عروض حية</span>
                </div>
              </div>
              <div style={{ display: "grid", gap: 10, fontSize: 15, lineHeight: 2 }}>
                {[
                  { title: "🔬 محرك تحليل المشاعر NLP", desc: "تحليل مشاعر لحظي — درجة التلاعب، الكلمات المُثيرة، كشف أزمات نفسية" },
                  { title: "🔍 التحقق من الادعاءات", desc: "7 محركات: ClaimBuster، Google Fact Check، Semantic Scholar، OpenAlex، PubMed، MediaWiki، Internet Archive" },
                  { title: "📖 البحث الإسلامي الذكي", desc: "3 واجهات: بحث في القرآن، الأحاديث مع درجة الصحة، بحث دلالي بالمعنى" },
                  { title: "🎮 لعبة Bad News", desc: "أداة تطعيم نفسي من جامعة كامبريدج — بتقلل قابلية التصديق بنسبة 21%" },
                  { title: "🔬 الطب الشرعي الرقمي", desc: "6 أدوات: تحليل صور، فيديو، صوت، Metadata، C2PA، فحص صحة النظام" },
                  { title: "🤖 مساعد AI مدمج", desc: "مبني على Gemini — كل إجابة مربوطة بالمصادر. Verified AI" },
                ].map((ai, i) => (
                  <div key={i} style={{ background: "var(--bg-elevated)", padding: 16, borderRadius: 10 }}>
                    <strong style={{ color: "#10B981" }}>{ai.title}</strong><br/>{ai.desc}
                  </div>
                ))}
              </div>
            </div>

            {/* Part 4 */}
            <div className="glass-card" style={{ padding: 32, borderTop: "3px solid #8B5CF6" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(139,92,246,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Award size={20} style={{ color: "#8B5CF6" }}/>
                </div>
                <div>
                  <h3 style={{ fontSize: 20, margin: 0 }}>📍 الجزء الرابع: التفرّد والختام</h3>
                  <span style={{ fontSize: 12, color: "var(--text-caption)" }}>⏱️ 5 دقائق | 🔒 الشاشة مقفولة</span>
                </div>
              </div>
              <div style={{ fontSize: 15, lineHeight: 2 }}>
                <p style={{ fontWeight: 700, marginBottom: 12, color: "var(--text-primary)" }}>8 حاجات محدش عملها قبل كده:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {UNIQUE_POINTS.map((p, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "var(--bg-elevated)", padding: 14, borderRadius: 10 }}>
                      <span style={{ width: 28, height: 28, borderRadius: 8, background: "#8B5CF6", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{i+1}</span>
                      <span style={{ color: "var(--text-secondary)" }}>{p}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(59,130,246,0.1))", padding: 24, borderRadius: 12, marginTop: 24, textAlign: "center" }}>
                  <p style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", lineHeight: 2 }}>
                    &quot;في الآخر... إحنا مش بنينا موقع. إحنا بنينا درع.<br/>
                    درع ضد المعلومات المضللة. درع ضد الوصمة النفسية. درع ضد الاستغلال الديني.&quot;
                  </p>
                  <p style={{ fontSize: 15, color: "var(--text-muted)", marginTop: 12 }}>
                    42 تمرين · 3 محركات · 27 واجهة ذكاء اصطناعي · 8 نظريات · 6 مقاييس · 15 دقيقة/يوم · 14 يوم
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ TAB: THEORIES ═══ */}
        {activeTab === "theories" && (
          <div>
            <h2 style={{ fontSize: 24, marginBottom: 24, textAlign: "center" }}>
              النظريات <span className="text-gradient">الثمانية</span> — مرجع سريع
            </h2>
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}>
              {THEORIES.map(t => (
                <div key={t.num} className="glass-card" style={{ padding: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ width: 32, height: 32, borderRadius: 8, background: "var(--accent-cta)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>{t.num}</span>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>{t.name}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: 6 }}>
                    <div><strong>أين مُطبّقة:</strong> {t.where}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 11, color: "var(--text-caption)", background: "var(--bg-elevated)", padding: "6px 10px", borderRadius: 6 }}>{t.ref}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ TAB: VISUAL MAP ═══ */}
        {activeTab === "map" && (
          <div>
            <h2 style={{ fontSize: 24, marginBottom: 24, textAlign: "center" }}>
              خريطة العرض <span className="text-gradient">المرئي</span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {VISUAL_MAP.map((v, i) => (
                <div key={i} className="glass-card" style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "1fr 1fr 1.5fr", gap: 16, alignItems: "center" }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{v.time}</span>
                  <span style={{ fontSize: 13, color: v.screen.includes("مقفولة") ? "#EF4444" : "#10B981", fontWeight: 600 }}>{v.screen}</span>
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{v.reason}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes chatMsgFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}
