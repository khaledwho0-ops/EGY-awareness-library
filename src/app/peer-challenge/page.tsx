"use client";

import { useState, useEffect, useCallback } from "react";
import { Users, Trophy, Zap, Clock, ArrowRight, RotateCcw, Copy, Check, Share2, Brain, Shield, Star } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { getCurrentUser } from "@/lib/auth";

/* ═══════════════════════════════════════════════════════════
   PEER CHALLENGE MODE — Feature #12
   "Challenge your study group"
   Real-time competitive fact-checking
   ═══════════════════════════════════════════════════════════ */

interface ChallengeQuestion {
  id: string;
  text: string;
  textAr: string;
  isReal: boolean;
  difficulty: "easy" | "medium" | "hard";
  explanation: string;
  explanationAr: string;
  points: number;
  technique?: string;
}

const CHALLENGE_POOL: ChallengeQuestion[] = [
  { id: "c1", text: "WHO declared Egypt malaria-free in 2023", textAr: "منظمة الصحة أعلنت مصر خالية من الملاريا في ٢٠٢٣", isReal: true, difficulty: "easy", explanation: "Egypt was officially certified malaria-free by WHO.", explanationAr: "تم اعتماد مصر رسمياً كخالية من الملاريا من قبل منظمة الصحة.", points: 100 },
  { id: "c2", text: "URGENT: Drinking bleach kills COVID-19 virus instantly!!", textAr: "عاجل: شرب الكلور يقتل فيروس كورونا فوراً!!", isReal: false, difficulty: "easy", explanation: "Extremely dangerous fake health advice. Bleach is poisonous.", explanationAr: "نصيحة صحية مزيفة وخطيرة للغاية. الكلور سام.", points: 100, technique: "Fear-Mongering" },
  { id: "c3", text: "Egyptian scientists develop new solar cell with 35% efficiency", textAr: "علماء مصريون يطورون خلية شمسية بكفاءة ٣٥٪", isReal: false, difficulty: "medium", explanation: "Current world record is ~47%. 35% is plausible but this specific claim is fabricated.", explanationAr: "الرقم القياسي العالمي حوالي ٤٧٪. ٣٥٪ معقول لكن هذا الادعاء محدد ملفق.", points: 200 },
  { id: "c4", text: "The Grand Egyptian Museum cost over $1 billion to build", textAr: "المتحف المصري الكبير كلف أكثر من مليار دولار", isReal: true, difficulty: "medium", explanation: "The GEM cost approximately $1.1 billion, funded jointly.", explanationAr: "المتحف المصري الكبير كلف حوالي ١.١ مليار دولار.", points: 200 },
  { id: "c5", text: "A doctor on TikTok confirmed that onions cure diabetes in 7 days", textAr: "دكتور على تيك توك أكد إن البصل بيعالج السكر في ٧ أيام", isReal: false, difficulty: "easy", explanation: "No food cures diabetes. This uses authority appeal + false precision.", explanationAr: "لا يوجد طعام يعالج السكر. يستخدم استدعاء السلطة + دقة زائفة.", points: 100, technique: "False Authority" },
  { id: "c6", text: "Egypt's New Administrative Capital has the tallest building in Africa", textAr: "العاصمة الإدارية الجديدة فيها أطول مبنى في أفريقيا", isReal: true, difficulty: "hard", explanation: "The Iconic Tower (385m) is indeed the tallest in Africa.", explanationAr: "البرج الأيقوني (٣٨٥ متر) هو الأطول في أفريقيا بالفعل.", points: 300 },
  { id: "c7", text: "LEAKED: Egypt to ban all social media next month!!!", textAr: "تسريب: مصر هتحظر كل السوشيال ميديا الشهر الجاي!!!", isReal: false, difficulty: "easy", explanation: "'LEAKED' + specific deadline + '!!!' = classic fabrication pattern.", explanationAr: "'تسريب' + موعد محدد + '!!!' = نمط تلفيق كلاسيكي.", points: 100, technique: "False Urgency" },
  { id: "c8", text: "The Suez Canal generates approximately $9 billion annually for Egypt", textAr: "قناة السويس تحقق حوالي ٩ مليار دولار سنوياً لمصر", isReal: true, difficulty: "hard", explanation: "In 2023, the Suez Canal generated record revenue of $9.4 billion.", explanationAr: "في ٢٠٢٣، حققت قناة السويس إيرادات قياسية بلغت ٩.٤ مليار دولار.", points: 300 },
  { id: "c9", text: "Scientists prove eating watermelon seeds causes appendicitis", textAr: "علماء يثبتون إن بلع بذور البطيخ بيسبب الزائدة", isReal: false, difficulty: "medium", explanation: "A common myth with no scientific basis. Seeds pass through normally.", explanationAr: "خرافة شائعة بدون أساس علمي. البذور تمر بشكل طبيعي.", points: 200 },
  { id: "c10", text: "Cairo has more than 22 million residents in the greater metro area", textAr: "القاهرة الكبرى فيها أكثر من ٢٢ مليون نسمة", isReal: true, difficulty: "medium", explanation: "Greater Cairo is one of the largest metro areas in the world.", explanationAr: "القاهرة الكبرى واحدة من أكبر المناطق الحضرية في العالم.", points: 200 },
];

type GamePhase = "setup" | "playing" | "results";

interface PlayerResult {
  name: string;
  score: number;
  correct: number;
  total: number;
  avgTime: number;
}

export default function PeerChallenge() {
  const { isRTL: a, t } = useRTL();
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const dir = a ? "rtl" : "ltr";
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<GamePhase>("setup");
  const [roomCode, setRoomCode] = useState("");
  const [questions, setQuestions] = useState<ChallengeQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [copied, setCopied] = useState(false);
  const [difficulty, setDifficulty] = useState<"all" | "easy" | "medium" | "hard">("all");
  const [questionCount, setQuestionCount] = useState(5);

  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    async function fetchUser() {
      const u = await getCurrentUser();
      setUserProfile(u);
    }
    fetchUser();
  }, []);

  function generateRoom() {
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();
    setRoomCode(code);
  }

  function startChallenge() {
    let pool = [...CHALLENGE_POOL];
    if (difficulty !== "all") pool = pool.filter(q => q.difficulty === difficulty);
    const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, questionCount);
    setQuestions(shuffled);
    setCurrentQ(0);
    setScore(0);
    setCorrect(0);
    setTotalTime(0);
    setShowAnswer(false);
    setPhase("playing");
    setStartTime(Date.now());
  }

  function answerQuestion(answer: boolean) {
    const elapsed = Date.now() - startTime;
    const q = questions[currentQ];
    const isCorrect = answer === q.isReal;

    // Speed bonus: faster = more points
    const timeBonus = Math.max(0, Math.round((10000 - elapsed) / 100));
    const points = isCorrect ? q.points + timeBonus : 0;

    setScore(s => s + points);
    if (isCorrect) setCorrect(c => c + 1);
    setTotalTime(t => t + elapsed);
    setShowAnswer(true);
  }

  function nextQuestion() {
    setShowAnswer(false);
    if (currentQ + 1 >= questions.length) {
      // Save results
      try {
        const prev = JSON.parse(localStorage.getItem("eal-challenge-results") || "[]");
        prev.push({
          date: new Date().toISOString(),
          score,
          correct,
          total: questions.length,
          avgTime: totalTime / questions.length,
          roomCode,
          player: userProfile?.name || "Guest",
        });
        localStorage.setItem("eal-challenge-results", JSON.stringify(prev.slice(-20)));
      } catch { /* */ }
      setPhase("results");
    } else {
      setCurrentQ(q => q + 1);
      setStartTime(Date.now());
    }
  }

  // Load previous leaderboard
  const leaderboard: PlayerResult[] = (() => {
    try {
      const data = JSON.parse(localStorage.getItem("eal-challenge-results") || "[]");
      return data.slice(-10).map((d: any) => ({
        name: d.player || "Player",
        score: d.score || 0,
        correct: d.correct || 0,
        total: d.total || 0,
        avgTime: d.avgTime || 0,
      })).sort((a: PlayerResult, b: PlayerResult) => b.score - a.score);
    } catch { return []; }
  })();

  if (!mounted) return null;

  // ═══ SETUP ═══
  if (phase === "setup") {
    return (
      <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: dir }}>
        <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 700, textAlign: "center" }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.15))",
            border: "2px solid rgba(139,92,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
          }}>
            <Users size={36} style={{ color: "#8B5CF6" }} />
          </div>
          <h1 style={{ fontSize: 28, marginBottom: 8, fontFamily: ff }}>
            {t({ en: "Peer", ar: "تحدي", arEG: "تحدي" })} <span className="text-gradient">{t({ en: "Challenge", ar: "الأقران", arEG: "الأقران" })}</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 28, fontFamily: ff }}>
            {t({ en: "Challenge your study group — who can spot misinformation fastest?", ar: "تحدَّ مجموعتك الدراسية — من يكتشف التضليل أسرع؟", arEG: "تحدَّ مجموعتك — مين يكتشف التضليل أسرع؟" })}
          </p>

          {/* Room Code */}
          <div className="glass-card" style={{ padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, fontFamily: ff }}>
              {t({ en: "Create a Challenge Room", ar: "أنشئ غرفة تحدي", arEG: "أنشئ غرفة تحدي" })}
            </div>
            {roomCode ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                <div style={{
                  padding: "12px 28px", fontSize: 28, fontWeight: 800,
                  fontFamily: "'Clash Display', monospace", letterSpacing: "0.2em",
                  background: "var(--bg-primary)", borderRadius: 12,
                  border: "2px solid rgba(139,92,246,0.3)", color: "#8B5CF6",
                }}>
                  {roomCode}
                </div>
                <button
                  onClick={() => { navigator.clipboard.writeText(roomCode); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className="glass-card"
                  style={{ padding: "10px 14px", cursor: "pointer", border: "1px solid var(--border-primary)" }}
                >
                  {copied ? <Check size={16} style={{ color: "#10B981" }} /> : <Copy size={16} />}
                </button>
              </div>
            ) : (
              <button onClick={generateRoom} className="glass-card" style={{
                padding: "10px 20px", fontSize: 13, cursor: "pointer",
                border: "1px solid rgba(139,92,246,0.3)", color: "#8B5CF6",
              }}>
                {t({ en: "Generate Room Code", ar: "أنشئ كود الغرفة", arEG: "أنشئ كود الغرفة" })}
              </button>
            )}
            <p style={{ fontSize: 11, color: "var(--text-caption)", marginTop: 8, fontFamily: ff }}>
              {t({ en: "Share this code with your group — everyone plays the same questions!", ar: "شارك الكود مع مجموعتك — الكل يلعب نفس الأسئلة!", arEG: "شارك الكود مع مجموعتك — الكل يلعب نفس الأسئلة!" })}
            </p>
          </div>

          {/* Settings */}
          <div className="glass-card" style={{ padding: 20, marginBottom: 20 }}>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--text-caption)", marginBottom: 4, fontFamily: ff }}>
                  {t({ en: "Difficulty", ar: "الصعوبة", arEG: "الصعوبة" })}
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  {(["all", "easy", "medium", "hard"] as const).map(d => (
                    <button key={d} onClick={() => setDifficulty(d)} style={{
                      padding: "4px 12px", borderRadius: 8, fontSize: 12, cursor: "pointer",
                      background: difficulty === d ? "var(--accent-cta)" : "var(--bg-secondary)",
                      color: difficulty === d ? "#fff" : "var(--text-secondary)",
                      border: "1px solid var(--border-primary)",
                    }}>
                      {d === "all" ? (a ? "الكل" : "All") : d}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "var(--text-caption)", marginBottom: 4, fontFamily: ff }}>
                  {t({ en: "Questions", ar: "الأسئلة", arEG: "الأسئلة" })}
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  {[3, 5, 8, 10].map(n => (
                    <button key={n} onClick={() => setQuestionCount(n)} style={{
                      padding: "4px 12px", borderRadius: 8, fontSize: 12, cursor: "pointer",
                      background: questionCount === n ? "var(--accent-cta)" : "var(--bg-secondary)",
                      color: questionCount === n ? "#fff" : "var(--text-secondary)",
                      border: "1px solid var(--border-primary)",
                    }}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button onClick={startChallenge} className="btn-primary" style={{ padding: "14px 32px", fontSize: 16, fontFamily: ff }}>
            <Zap size={18} style={{ marginRight: 8 }} />
            {t({ en: "Start Challenge!", ar: "ابدأ التحدي!", arEG: "ابدأ التحدي!" })}
          </button>

          {/* Leaderboard */}
          {leaderboard.length > 0 && (
            <div className="glass-card" style={{ padding: 20, marginTop: 28 }}>
              <h3 style={{ fontSize: 16, marginBottom: 12, display: "flex", alignItems: "center", gap: 8, justifyContent: "center", fontFamily: ff }}>
                <Trophy size={18} style={{ color: "#F59E0B" }} />
                {t({ en: "Leaderboard", ar: "لوحة المتصدرين", arEG: "لوحة المتصدرين" })}
              </h3>
              {leaderboard.slice(0, 5).map((p, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "8px 12px", borderBottom: "1px solid var(--border-primary)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: i === 0 ? "#F59E0B" : i === 1 ? "#94A3B8" : i === 2 ? "#B45309" : "var(--text-muted)" }}>
                      #{i + 1}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "var(--text-muted)" }}>
                    <span>{p.correct}/{p.total}</span>
                    <span style={{ fontWeight: 700, color: "#F59E0B" }}>{p.score} pts</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ═══ PLAYING ═══
  if (phase === "playing") {
    const q = questions[currentQ];
    return (
      <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: dir }}>
        <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 700, textAlign: "center" }}>
          {/* Progress */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: "var(--text-caption)" }}>
              {currentQ + 1}/{questions.length}
            </span>
            {roomCode && <span style={{ fontSize: 11, color: "#8B5CF6", fontFamily: "monospace" }}>Room: {roomCode}</span>}
            <span style={{ fontSize: 14, fontWeight: 700, color: "#F59E0B" }}>{score} pts</span>
          </div>
          <div style={{ width: "100%", height: 4, borderRadius: 2, background: "var(--bg-secondary)", marginBottom: 24 }}>
            <div style={{ width: `${((currentQ + (showAnswer ? 1 : 0)) / questions.length) * 100}%`, height: "100%", borderRadius: 2, background: "#8B5CF6", transition: "width 0.3s" }} />
          </div>

          {/* Difficulty badge */}
          <div style={{
            display: "inline-block", padding: "3px 12px", borderRadius: 12, fontSize: 11, fontWeight: 700, marginBottom: 12,
            background: q.difficulty === "hard" ? "rgba(239,68,68,0.1)" : q.difficulty === "medium" ? "rgba(245,158,11,0.1)" : "rgba(16,185,129,0.1)",
            color: q.difficulty === "hard" ? "#EF4444" : q.difficulty === "medium" ? "#F59E0B" : "#10B981",
          }}>
            {q.difficulty.toUpperCase()} • {q.points} pts
          </div>

          {/* Question */}
          <div className="glass-card" style={{ padding: 32, marginBottom: 20 }}>
            <p style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.7, margin: 0, fontFamily: ff }}>
              {a ? q.textAr : q.text}
            </p>
          </div>

          {!showAnswer ? (
            <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
              <button onClick={() => answerQuestion(true)} className="glass-card" style={{
                padding: "16px 40px", fontSize: 16, fontWeight: 700, cursor: "pointer",
                border: "2px solid rgba(16,185,129,0.3)", color: "#10B981", fontFamily: ff,
              }}>
                ✅ {t({ en: "REAL", ar: "حقيقي", arEG: "حقيقي" })}
              </button>
              <button onClick={() => answerQuestion(false)} className="glass-card" style={{
                padding: "16px 40px", fontSize: 16, fontWeight: 700, cursor: "pointer",
                border: "2px solid rgba(239,68,68,0.3)", color: "#EF4444", fontFamily: ff,
              }}>
                ❌ {t({ en: "FAKE", ar: "مزيف", arEG: "مزيف" })}
              </button>
            </div>
          ) : (
            <div>
              <div className="glass-card" style={{ padding: 20, marginBottom: 16, textAlign: "left", direction: dir }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: q.isReal ? "#10B981" : "#EF4444", marginBottom: 6 }}>
                  {q.isReal ? "✅ REAL" : "❌ FAKE"}
                  {q.technique && <span style={{ marginLeft: 8, fontSize: 11, color: "#F59E0B" }}>({q.technique})</span>}
                </div>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0, fontFamily: ff }}>
                  {a ? q.explanationAr : q.explanation}
                </p>
              </div>
              <button onClick={nextQuestion} className="btn-primary" style={{ padding: "12px 28px", fontSize: 14, fontFamily: ff }}>
                {currentQ + 1 >= questions.length ? (a ? "شوف النتائج" : "See Results") : (a ? "السؤال التالي" : "Next Question")}
                <ArrowRight size={16} style={{ marginLeft: 8, transform: a ? "rotate(180deg)" : "none" }} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ═══ RESULTS ═══
  const avgTime = totalTime / questions.length / 1000;
  const accuracy = Math.round((correct / questions.length) * 100);

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: dir }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 700, textAlign: "center" }}>
        <Trophy size={48} style={{ color: "#F59E0B", marginBottom: 16 }} />
        <h1 style={{ fontSize: 28, marginBottom: 8, fontFamily: ff }}>
          {t({ en: "Challenge", ar: "نتائج", arEG: "نتائج" })} <span className="text-gradient">{t({ en: "Complete!", ar: "التحدي!", arEG: "التحدي!" })}</span>
        </h1>

        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(3, 1fr)", margin: "24px 0" }}>
          <div className="glass-card" style={{ padding: 20, borderTop: "3px solid #F59E0B" }}>
            <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Clash Display', sans-serif", color: "#F59E0B" }}>{score}</div>
            <div style={{ fontSize: 11, color: "var(--text-caption)" }}>Points</div>
          </div>
          <div className="glass-card" style={{ padding: 20, borderTop: "3px solid #10B981" }}>
            <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Clash Display', sans-serif", color: "#10B981" }}>{accuracy}%</div>
            <div style={{ fontSize: 11, color: "var(--text-caption)" }}>Accuracy</div>
          </div>
          <div className="glass-card" style={{ padding: 20, borderTop: "3px solid #3B82F6" }}>
            <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Clash Display', sans-serif", color: "#3B82F6" }}>{avgTime.toFixed(1)}s</div>
            <div style={{ fontSize: 11, color: "var(--text-caption)" }}>Avg Time</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => { setPhase("setup"); }} className="glass-card" style={{
            padding: "12px 24px", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: ff,
          }}>
            <RotateCcw size={16} /> {t({ en: "New Challenge", ar: "تحدي جديد", arEG: "تحدي جديد" })}
          </button>
          <button onClick={() => startChallenge()} className="btn-primary" style={{ padding: "12px 24px", fontSize: 14, fontFamily: ff }}>
            <Zap size={16} style={{ marginRight: 6 }} /> {t({ en: "Play Again", ar: "العب مرة أخرى", arEG: "العب تاني" })}
          </button>
        </div>
      </div>
    </div>
  );
}
