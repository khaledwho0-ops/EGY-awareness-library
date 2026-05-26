"use client";

import { useState } from "react";
import { useRTL } from "@/components/shared/rtl-provider";
import { ONBOARDING, s } from "@/data/i18n/site-strings";
import { ArrowRight, ShieldCheck, HeartPulse, Sparkles, AlertTriangle, BookOpen, Microscope, BarChart3, Eye, Users, Brain, Zap, Search, Scale, Globe, MessageCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { ParallaxHero } from "@/components/shared/parallax-hero";

export default function OnboardingTour() {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const dir = a ? "rtl" : "ltr";

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: "crisis",
      icon: <AlertTriangle size={64} style={{ color: "var(--color-error)" }} />,
      title: s(ONBOARDING.step1Title, a),
      desc: s(ONBOARDING.step1Desc, a),
      visual: (
        <div className="relative w-full h-64 flex items-center justify-center rounded-xl overflow-hidden" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-primary)" }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, var(--color-error) 0%, transparent 60%)" }} />
          <div className="flex gap-4">
             <div className="glass-card p-4 animate-float" style={{ animationDelay: "0s" }}>
                <ShieldCheck className="text-error" size={32} />
             </div>
             <div className="glass-card p-4 animate-float" style={{ animationDelay: "0.2s" }}>
                <HeartPulse className="text-error" size={32} />
             </div>
             <div className="glass-card p-4 animate-float" style={{ animationDelay: "0.4s" }}>
                <Sparkles className="text-error" size={32} />
             </div>
          </div>
        </div>
      )
    },
    {
      id: "engines",
      icon: <BookOpen size={64} style={{ color: "var(--accent-cta)" }} />,
      title: s(ONBOARDING.step2Title, a),
      desc: s(ONBOARDING.step2Desc, a),
      visual: (
        <div className="w-full h-64 flex flex-col items-center justify-center gap-4 rounded-xl" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-primary)" }}>
          <div className="flex gap-4 w-full px-8">
            <div className="flex-1 glass-card p-4 flex flex-col items-center gap-2" style={{ borderTop: "3px solid var(--accent-deepreal)" }}>
              <ShieldCheck size={24} style={{ color: "var(--accent-deepreal)" }} />
              <span style={{ fontSize: "12px", fontFamily: ff }}>{s(ONBOARDING.deepreal, a)}</span>
            </div>
            <div className="flex-1 glass-card p-4 flex flex-col items-center gap-2" style={{ borderTop: "3px solid var(--accent-mentalhealth)" }}>
              <HeartPulse size={24} style={{ color: "var(--accent-mentalhealth)" }} />
              <span style={{ fontSize: "12px", fontFamily: ff }}>{s(ONBOARDING.mentalHealth, a)}</span>
            </div>
            <div className="flex-1 glass-card p-4 flex flex-col items-center gap-2" style={{ borderTop: "3px solid var(--accent-religionhub)" }}>
              <Sparkles size={24} style={{ color: "var(--accent-religionhub)" }} />
              <span style={{ fontSize: "12px", fontFamily: ff }}>{s(ONBOARDING.religionHub, a)}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "science",
      icon: <Microscope size={64} style={{ color: "var(--accent-mentalhealth)" }} />,
      title: s(ONBOARDING.step3Title, a),
      desc: s(ONBOARDING.step3Desc, a),
      visual: (
        <div className="relative w-full h-64 flex items-center justify-center rounded-xl" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-primary)" }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, var(--accent-mentalhealth) 0%, transparent 60%)" }} />
          <div className="flex flex-col gap-3 w-3/4">
            {['MIST-20', 'MHLS', 'Brief RCOPE'].map((scale, i) => (
              <div key={i} className="glass-card flex items-center justify-between p-3">
                <span style={{ fontFamily: ff, fontSize: "14px", fontWeight: "bold" }}>{scale}</span>
                <div className="h-2 rounded-full bg-accent-mentalhealth" style={{ width: "60%" }}></div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "roadmap",
      icon: <BarChart3 size={64} style={{ color: "var(--accent-religionhub)" }} />,
      title: s(ONBOARDING.step4Title, a),
      desc: s(ONBOARDING.step4Desc, a),
      visual: (
        <div className="w-full h-64 flex items-center justify-center rounded-xl relative" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-primary)", direction: dir }}>
          <div className="absolute top-1/2 left-8 right-8 h-1" style={{ background: "var(--border-subtle)", transform: "translateY(-50%)" }}></div>
          <div className="flex justify-between w-full px-8 relative z-10">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold" style={{ background: "var(--bg-primary)", border: "2px solid var(--accent-cta)", color: "var(--accent-cta)" }}>0</div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold" style={{ background: "var(--bg-primary)", border: "2px solid var(--accent-mentalhealth)", color: "var(--accent-mentalhealth)" }}>1-14</div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold" style={{ background: "var(--bg-primary)", border: "2px solid var(--accent-religionhub)", color: "var(--accent-religionhub)" }}>15</div>
          </div>
        </div>
      )
    },
    {
      id: "armor",
      icon: <Eye size={64} style={{ color: "var(--accent-cta)" }} />,
      title: s(ONBOARDING.step5Title, a),
      desc: s(ONBOARDING.step5Desc, a),
      visual: (
        <div className="w-full h-64 flex items-center justify-center rounded-xl overflow-hidden" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-primary)" }}>
          <div className="grid grid-cols-5 gap-2 px-4">
            {[
              { icon: <Zap size={18} />, color: 'var(--color-error)' },
              { icon: <Search size={18} />, color: 'var(--accent-deepreal)' },
              { icon: <Eye size={18} />, color: 'var(--accent-mentalhealth)' },
              { icon: <Scale size={18} />, color: 'var(--color-warning)' },
              { icon: <HeartPulse size={18} />, color: 'var(--accent-religionhub)' },
              { icon: <BarChart3 size={18} />, color: 'var(--accent-cta)' },
              { icon: <Brain size={18} />, color: 'var(--color-error)' },
              { icon: <Globe size={18} />, color: 'var(--accent-deepreal)' },
              { icon: <MessageCircle size={18} />, color: 'var(--accent-mentalhealth)' },
              { icon: <CheckCircle2 size={18} />, color: 'var(--color-success)' },
            ].map((l, i) => (
              <div key={i} className="glass-card p-2 flex flex-col items-center justify-center animate-float" style={{ animationDelay: `${i * 0.15}s`, minHeight: "52px" }}>
                <div style={{ color: l.color }}>{l.icon}</div>
                <span style={{ fontSize: "9px", color: "var(--text-muted)", marginTop: "2px" }}>#{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "community",
      icon: <Users size={64} style={{ color: "var(--color-warning)" }} />,
      title: s(ONBOARDING.step6Title, a),
      desc: s(ONBOARDING.step6Desc, a),
      visual: (
        <div className="w-full h-64 flex flex-col items-center justify-center rounded-xl relative overflow-hidden" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-primary)" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, var(--accent-deepreal), var(--accent-mentalhealth), var(--accent-religionhub))" }} />
          <div style={{ fontSize: "56px", fontWeight: "bold", color: "var(--accent-cta)", lineHeight: 1 }}>84</div>
          <div style={{ fontSize: "14px", fontFamily: ff, marginTop: "8px", color: "var(--text-primary)" }}>
            {a ? 'مشارك في الدراسة التجريبية' : 'Pilot Study Participants'}
          </div>
          <div className="flex gap-6 mt-6">
            <div className="glass-card px-4 py-2 text-center">
              <div style={{ fontWeight: "bold", color: "var(--accent-cta)" }}>42</div>
              <div style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: ff }}>{a ? 'المجموعة أ' : 'Group A'}</div>
            </div>
            <div className="glass-card px-4 py-2 text-center">
              <div style={{ fontWeight: "bold", color: "var(--text-muted)" }}>42</div>
              <div style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: ff }}>{a ? 'المجموعة ب' : 'Group B'}</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-primary)", paddingTop: "var(--navbar-height)", direction: dir }}>
      <ParallaxHero speed={0.2}>
        <div className="container flex-1 flex flex-col items-center justify-center" style={{ minHeight: "calc(100vh - var(--navbar-height))" }}>
          
          <div className="w-full max-w-4xl mx-auto glass-card p-8 md:p-12 relative overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 flex">
              {steps.map((_, i) => (
                <div key={i} className="flex-1 transition-all duration-500" style={{ background: i <= currentStep ? "var(--accent-cta)" : "transparent" }}></div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-8">
              <span style={{ fontSize: "14px", color: "var(--text-muted)", fontFamily: ff }}>{currentStep + 1} / {steps.length}</span>
              <Link href="/dashboard" className="text-sm font-medium no-underline hover:opacity-80 transition-opacity" style={{ color: "var(--text-muted)", fontFamily: ff }}>
                {s(ONBOARDING.skip, a)}
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center" style={{ minHeight: "350px" }}>
              
              {/* Content Column */}
              <div className="flex flex-col items-start gap-6 transition-all duration-500 transform translate-y-0 opacity-100" key={`content-${currentStep}`}>
                <div className="p-4 rounded-2xl mb-2" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}>
                  {steps[currentStep].icon}
                </div>
                <h2 className="text-display" style={{ fontSize: "36px", lineHeight: 1.2 }}>
                  {steps[currentStep].title}
                </h2>
                <p style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.6, fontFamily: ff }}>
                  {steps[currentStep].desc}
                </p>
              </div>

              {/* Visual Column */}
              <div className="w-full transition-all duration-500 transform translate-y-0 opacity-100" key={`visual-${currentStep}`}>
                {steps[currentStep].visual}
              </div>

            </div>

            <div className="mt-12 flex items-center justify-between pt-8 border-t" style={{ borderColor: "var(--border-subtle)" }}>
              <button 
                onClick={prevStep}
                disabled={currentStep === 0}
                className="btn-secondary"
                style={{ opacity: currentStep === 0 ? 0 : 1, pointerEvents: currentStep === 0 ? "none" : "auto", padding: "12px 24px", fontFamily: ff }}
              >
                {s(ONBOARDING.back, a)}
              </button>
              
              {currentStep < steps.length - 1 ? (
                <button 
                  onClick={nextStep}
                  className="btn-primary"
                  style={{ padding: "12px 32px", fontFamily: ff }}
                >
                  {s(ONBOARDING.next, a)} <ArrowRight className="ml-2 inline-block" size={18} style={{ transform: a ? "rotate(180deg)" : "none", marginLeft: a ? 0 : "8px", marginRight: a ? "8px" : 0 }} />
                </button>
              ) : (
                <Link 
                  href="/baseline"
                  className="btn-primary no-underline"
                  style={{ padding: "12px 32px", fontFamily: ff }}
                >
                  {s(ONBOARDING.start, a)} <ArrowRight className="ml-2 inline-block" size={18} style={{ transform: a ? "rotate(180deg)" : "none", marginLeft: a ? 0 : "8px", marginRight: a ? "8px" : 0 }} />
                </Link>
              )}
            </div>

          </div>
        </div>
      </ParallaxHero>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
