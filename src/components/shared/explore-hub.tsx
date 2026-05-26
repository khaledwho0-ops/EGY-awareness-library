"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRTL } from "@/components/shared/rtl-provider";
import {
  Map, X, Search, Loader2, ChevronRight, ExternalLink,
  ShieldCheck, HeartPulse, BookOpen, Brain, BarChart3,
  Bot, Sparkles, Globe, FileText, Eye, Zap,
  Target, Users, Microscope, Gamepad2, Compass, Award,
  ClipboardCheck, Presentation, GraduationCap, Lightbulb,
  MessageCircle, Shield, CheckCircle2, AlertTriangle,
  Copy, ArrowRight, Layers, Cpu, BookMarked,
  Fingerprint, ScanEye, Languages, History, Scale,
  Image as ImageIcon, Syringe, Heart, Activity, ArrowLeftRight, Timer, FlaskConical, MapPin, Flame
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   EXPLORE HUB — Full-Screen Command Center
   ═══════════════════════════════════════════════════════════ */

// ── ALL PAGES (38 routes, 0 skipped) ──
const ALL_PAGES = [
  // Core Platform
  { href: "/", label: "Home", labelAr: "الرئيسية", icon: <Globe size={16} />, category: "core" },
  { href: "/welcome", label: "Project Anatomy", labelAr: "تشريح المشروع", icon: <Layers size={16} />, category: "core" },
  { href: "/dashboard", label: "Dashboard", labelAr: "لوحة التحكم", icon: <BarChart3 size={16} />, category: "core" },
  { href: "/guide", label: "Guide", labelAr: "الدليل", icon: <Compass size={16} />, category: "core" },
  { href: "/onboarding", label: "Tour / Onboarding", labelAr: "الجولة التمهيدية", icon: <Sparkles size={16} />, category: "core" },
  { href: "/language-select", label: "Language Select", labelAr: "اختيار اللغة", icon: <Languages size={16} />, category: "core" },

  // DeepReal Track
  { href: "/deepreal", label: "DeepReal Hub", labelAr: "مركز ديب ريل", icon: <ShieldCheck size={16} />, category: "deepreal" },
  ...Array.from({ length: 14 }, (_, i) => ({
    href: `/deepreal/exercise/${i + 1}`, label: `DeepReal — Day ${i + 1}`, labelAr: `ديب ريل — اليوم ${i + 1}`, icon: <Target size={16} />, category: "deepreal" as const,
  })),
  { href: "/deepreal/game", label: "DeepReal Game", labelAr: "لعبة ديب ريل", icon: <Gamepad2 size={16} />, category: "deepreal" },
  { href: "/bad-news", label: "Bad News Game", labelAr: "لعبة الأخبار السيئة", icon: <Gamepad2 size={16} />, category: "deepreal" },
  { href: "/fight-back", label: "Fight Back", labelAr: "المواجهة", icon: <Shield size={16} />, category: "deepreal" },
  { href: "/reverse", label: "Reverse Mode", labelAr: "الوضع العكسي", icon: <Eye size={16} />, category: "deepreal" },

  // Mental Health Track
  { href: "/mental-health", label: "Mental Health Hub", labelAr: "مركز الصحة النفسية", icon: <HeartPulse size={16} />, category: "mentalhealth" },
  ...Array.from({ length: 14 }, (_, i) => ({
    href: `/mental-health/exercise/${i + 1}`, label: `Mental Health — Day ${i + 1}`, labelAr: `الصحة النفسية — اليوم ${i + 1}`, icon: <Target size={16} />, category: "mentalhealth" as const,
  })),

  // Religion Hub Track
  { href: "/religion-hub", label: "Religion Hub", labelAr: "المحور الديني", icon: <BookOpen size={16} />, category: "religionhub" },
  ...Array.from({ length: 14 }, (_, i) => ({
    href: `/religion-hub/exercise/${i + 1}`, label: `Religion Hub — Day ${i + 1}`, labelAr: `المحور الديني — اليوم ${i + 1}`, icon: <Target size={16} />, category: "religionhub" as const,
  })),

  // Assessment & Research
  { href: "/assessment", label: "Assessment (MIST-20)", labelAr: "التقييم (MIST-20)", icon: <ClipboardCheck size={16} />, category: "research" },
  { href: "/baseline", label: "Baseline Assessment", labelAr: "التقييم القبلي", icon: <Brain size={16} />, category: "research" },
  { href: "/self-test-protocol", label: "Self-Test Protocol", labelAr: "بروتوكول الاختبار الذاتي", icon: <CheckCircle2 size={16} />, category: "research" },

  // Science & Evidence
  { href: "/science", label: "Science Hub", labelAr: "مركز العلم", icon: <Microscope size={16} />, category: "science" },
  { href: "/evidence", label: "Evidence Library", labelAr: "مكتبة الأدلة", icon: <FileText size={16} />, category: "science" },
  { href: "/sources", label: "Sources Registry", labelAr: "سجل المصادر", icon: <BookMarked size={16} />, category: "science" },
  { href: "/philosophy", label: "Philosophy", labelAr: "الفلسفة", icon: <Lightbulb size={16} />, category: "science" },
  { href: "/ux-science", label: "UX Science", labelAr: "علم التجربة", icon: <Zap size={16} />, category: "science" },

  // AI & Tools
  { href: "/chatbot", label: "AI Chatbot", labelAr: "الشات الذكي", icon: <Bot size={16} />, category: "tools" },
  { href: "/prompt-lab", label: "Prompt Lab", labelAr: "معمل الأوامر", icon: <Cpu size={16} />, category: "tools" },

  // Presentation & Reports
  { href: "/presentation", label: "Presentation / Report", labelAr: "العرض / التقرير", icon: <Presentation size={16} />, category: "presentation" },
  { href: "/report", label: "Report Dashboard", labelAr: "لوحة التقارير", icon: <FileText size={16} />, category: "presentation" },
  { href: "/supervisor", label: "Supervisor View", labelAr: "عرض المشرف", icon: <Users size={16} />, category: "presentation" },
  { href: "/pricing-presentation", label: "Pricing Presentation", labelAr: "عرض الأسعار", icon: <Award size={16} />, category: "presentation" },
  { href: "/project-vision", label: "Project Vision", labelAr: "رؤية المشروع", icon: <Eye size={16} />, category: "presentation" },
  { href: "/publishing-plan", label: "Publishing Plan", labelAr: "خطة النشر", icon: <FileText size={16} />, category: "presentation" },
  { href: "/trailer", label: "Trailer", labelAr: "الإعلان", icon: <Eye size={16} />, category: "presentation" },
  { href: "/about", label: "About", labelAr: "عن المشروع", icon: <GraduationCap size={16} />, category: "presentation" },

  // Defense & Strategy
  { href: "/defense-main-plan", label: "Defense Main Plan", labelAr: "خطة الدفاع الرئيسية", icon: <Shield size={16} />, category: "defense" },
  { href: "/defense-pages-map", label: "Defense Pages Map", labelAr: "خريطة صفحات الدفاع", icon: <Map size={16} />, category: "defense" },
  { href: "/defense-qa", label: "Defense Q&A", labelAr: "أسئلة وأجوبة الدفاع", icon: <MessageCircle size={16} />, category: "defense" },

  // Innovation Lab — Unique Features
  { href: "/bias-fingerprint", label: "Cognitive Bias Fingerprint", labelAr: "بصمة الانحياز المعرفي", icon: <Fingerprint size={16} />, category: "innovation" },
  { href: "/inoculation-passport", label: "Inoculation Passport", labelAr: "جواز التلقيح", icon: <Syringe size={16} />, category: "innovation" },
  { href: "/arabic-shield", label: "Arabic Manipulation Shield 🛡️", labelAr: "درع التلاعب العربي 🛡️", icon: <Shield size={16} />, category: "innovation" },
  { href: "/family-kit", label: "Family Protection Kit", labelAr: "حقيبة حماية العائلة", icon: <Heart size={16} />, category: "innovation" },
  { href: "/reaction-test", label: "Reaction Speed Test", labelAr: "اختبار سرعة رد الفعل", icon: <Timer size={16} />, category: "innovation" },
  { href: "/certificate", label: "Awareness Certificate", labelAr: "شهادة الوعي", icon: <Award size={16} />, category: "innovation" },
  { href: "/transformation", label: "Before → After", labelAr: "قبل ← بعد", icon: <ArrowLeftRight size={16} />, category: "innovation" },
  { href: "/comb-tracker", label: "COM-B Behavior Tracker", labelAr: "متتبع السلوك COM-B", icon: <Activity size={16} />, category: "innovation" },
  { href: "/threat-briefing", label: "Daily Threat Briefing", labelAr: "إحاطة التهديد اليومية", icon: <Globe size={16} />, category: "innovation" },
  { href: "/misinfo-atlas", label: "Egyptian Misinfo Atlas", labelAr: "أطلس المعلومات المضللة", icon: <MapPin size={16} />, category: "innovation" },
  { href: "/effect-dashboard", label: "Effect Size Dashboard", labelAr: "لوحة حجم التأثير", icon: <BarChart3 size={16} />, category: "innovation" },
  { href: "/peer-challenge", label: "Peer Challenge Mode", labelAr: "تحدي الأقران", icon: <Users size={16} />, category: "innovation" },
  { href: "/angry-debunkers", label: "The Angry Debunkers 🔥 (Powerful)", labelAr: "المُفنِّدون الغاضبون 🔥", icon: <Flame size={16} />, category: "innovation" },
  { href: "/bad-news", label: "Bad News Game 🌟 (Special)", labelAr: "لعبة الأخبار السيئة 🌟", icon: <Gamepad2 size={16} />, category: "innovation" },
  { href: "/osint-investigator", label: "Live OSINT Investigator ⚡ (New)", labelAr: "محقق الـ OSINT الحي ⚡", icon: <Search size={16} />, category: "innovation" },
  { href: "/deepreal-upload", label: "DeepReal Media Forensics 👁️ (New)", labelAr: "تحليل ديب ريل للوسائط 👁️", icon: <ScanEye size={16} />, category: "innovation" },
];

const CATEGORIES = [
  { id: "core", label: "Core Platform", labelAr: "المنصة الأساسية", color: "#6366f1", icon: <Globe size={14} /> },
  { id: "deepreal", label: "DeepReal Track", labelAr: "مسار ديب ريل", color: "#EF4444", icon: <ShieldCheck size={14} /> },
  { id: "mentalhealth", label: "Mental Health", labelAr: "الصحة النفسية", color: "#10B981", icon: <HeartPulse size={14} /> },
  { id: "religionhub", label: "Religion Hub", labelAr: "المحور الديني", color: "#F59E0B", icon: <BookOpen size={14} /> },
  { id: "research", label: "Assessment & Research", labelAr: "التقييم والبحث", color: "#8B5CF6", icon: <Brain size={14} /> },
  { id: "science", label: "Science & Evidence", labelAr: "العلم والأدلة", color: "#3B82F6", icon: <Microscope size={14} /> },
  { id: "tools", label: "AI & Tools", labelAr: "الذكاء الاصطناعي", color: "#EC4899", icon: <Bot size={14} /> },
  { id: "presentation", label: "Presentations", labelAr: "العروض", color: "#14B8A6", icon: <Presentation size={14} /> },
  { id: "defense", label: "Defense Strategy", labelAr: "استراتيجية الدفاع", color: "#F97316", icon: <Shield size={14} /> },
  { id: "innovation", label: "Innovation Lab", labelAr: "معمل الابتكار", color: "#E11D48", icon: <FlaskConical size={14} /> },
];

// ── VERIFICATION STEPS ──
const VERIFICATION_STEPS = [
  { num: 1, title: "Receive Claim", titleAr: "استلام الادعاء", desc: "Enter any claim — text, image, or link.", descAr: "أدخل أي ادعاء — نص أو صورة أو رابط.", icon: <FileText size={20} />, color: "#6366f1" },
  { num: 2, title: "Trace Source", titleAr: "تتبع المصدر", desc: "System identifies origin and publication date.", descAr: "النظام يحدد الأصل وتاريخ النشر.", icon: <ScanEye size={20} />, color: "#3B82F6" },
  { num: 3, title: "Multi-Layer Check", titleAr: "فحص متعدد الطبقات", desc: "Checked against 7+ live databases simultaneously.", descAr: "فحص مقابل 7+ قواعد بيانات حية في وقت واحد.", icon: <Layers size={20} />, color: "#10B981" },
  { num: 4, title: "Language Analysis", titleAr: "تحليل اللغة", desc: "Detect manipulation and emotional triggers in AR/EN.", descAr: "كشف التلاعب والمحفزات العاطفية بالعربية والإنجليزية.", icon: <Languages size={20} />, color: "#F59E0B" },
  { num: 5, title: "Verdict", titleAr: "الحكم", desc: "Final judgment with confidence score and evidence trail.", descAr: "حكم نهائي مع درجة ثقة ومسار أدلة.", icon: <Scale size={20} />, color: "#EF4444" },
  { num: 6, title: "You Decide", titleAr: "أنت تقرر", desc: "We provide evidence — you make the call.", descAr: "نحن نقدم الأدلة — أنت تتخذ القرار.", icon: <Fingerprint size={20} />, color: "#8B5CF6" },
];

// ── LIVE TOOLS CONFIG ──
interface ToolConfig {
  id: string;
  title: string;
  titleAr: string;
  desc: string;
  descAr: string;
  output: string;
  outputAr: string;
  icon: React.ReactNode;
  color: string;
  apiEndpoint: string;
  method: "GET" | "POST";
  buildParams: (query: string) => string | Record<string, string>;
  parseResponse: (data: any) => { summary: string; details: any[] };
}

const LIVE_TOOLS: ToolConfig[] = [
  {
    id: "factcheck", title: "Google Fact Check", titleAr: "فحص حقائق جوجل",
    desc: "Search the global fact-check database directly", descAr: "بحث في قاعدة بيانات التحقق العالمية مباشرة",
    output: "📋 title + verdict + source URL", outputAr: "📋 العنوان + الحكم + رابط المصدر",
    icon: <CheckCircle2 size={18} />, color: "#4285F4",
    apiEndpoint: "/api/search/factcheck", method: "GET",
    buildParams: (q) => `?q=${encodeURIComponent(q)}`,
    parseResponse: (d) => ({
      summary: d.results?.length ? `${d.results.length} fact-checks found` : "No results",
      details: (d.results || []).slice(0, 5).map((r: any) => ({
        title: r.title || r.claimReview?.[0]?.title || "Claim",
        verdict: r.rating || r.claimReview?.[0]?.textualRating || "Unknown",
        url: r.url || r.claimReview?.[0]?.url || "",
      }))
    })
  },
  {
    id: "pubmed", title: "PubMed / NCBI", titleAr: "PubMed / NCBI",
    desc: "Search peer-reviewed medical research", descAr: "بحث في الأبحاث الطبية المحكمة",
    output: "📋 research list with title, abstract, year", outputAr: "📋 قائمة أبحاث بالعنوان والملخص والسنة",
    icon: <Microscope size={18} />, color: "#10B981",
    apiEndpoint: "/api/search/ncbi", method: "GET",
    buildParams: (q) => `?q=${encodeURIComponent(q)}`,
    parseResponse: (d) => ({
      summary: d.results?.length ? `${d.results.length} papers found` : "No results",
      details: (d.results || []).slice(0, 5).map((r: any) => ({
        title: r.title || "Paper",
        year: r.year || r.pubDate || "",
        url: r.url || r.link || "",
      }))
    })
  },
  {
    id: "openalex", title: "OpenAlex", titleAr: "OpenAlex",
    desc: "Academic search across millions of papers", descAr: "بحث أكاديمي عبر ملايين الأوراق",
    output: "📋 papers with citation count", outputAr: "📋 أوراق بعدد الاستشهادات",
    icon: <BookMarked size={18} />, color: "#3B82F6",
    apiEndpoint: "/api/search/openalex", method: "GET",
    buildParams: (q) => `?q=${encodeURIComponent(q)}`,
    parseResponse: (d) => ({
      summary: d.results?.length ? `${d.results.length} papers found` : "No results",
      details: (d.results || []).slice(0, 5).map((r: any) => ({
        title: r.title || "Paper",
        citations: r.citedByCount || r.cited_by_count || 0,
        year: r.year || r.publication_year || "",
        url: r.url || r.doi || "",
      }))
    })
  },
  {
    id: "semantic-scholar", title: "Semantic Scholar", titleAr: "Semantic Scholar",
    desc: "AI-powered scholarly reference search", descAr: "بحث مراجع أكاديمي مدعوم بالذكاء الاصطناعي",
    output: "📋 papers + influential citations", outputAr: "📋 أوراق + استشهادات مؤثرة",
    icon: <Brain size={18} />, color: "#8B5CF6",
    apiEndpoint: "/api/search/semantic-scholar", method: "GET",
    buildParams: (q) => `?q=${encodeURIComponent(q)}`,
    parseResponse: (d) => ({
      summary: d.results?.length ? `${d.results.length} papers found` : "No results",
      details: (d.results || []).slice(0, 5).map((r: any) => ({
        title: r.title || "Paper",
        citations: r.citationCount || 0,
        year: r.year || "",
        url: r.url || "",
      }))
    })
  },
  {
    id: "wikipedia", title: "Wikipedia / MediaWiki", titleAr: "ويكيبيديا",
    desc: "Fast encyclopedic search with sources", descAr: "بحث موسوعي سريع مع مصادر",
    output: "📋 encyclopedia excerpts", outputAr: "📋 مقتطفات موسوعية",
    icon: <Globe size={18} />, color: "#636363",
    apiEndpoint: "/api/search/mediawiki", method: "GET",
    buildParams: (q) => `?q=${encodeURIComponent(q)}`,
    parseResponse: (d) => ({
      summary: d.results?.length ? `${d.results.length} articles found` : "No results",
      details: (d.results || []).slice(0, 5).map((r: any) => ({
        title: r.title || "Article",
        snippet: r.snippet || r.extract || "",
        url: r.url || "",
      }))
    })
  },
  {
    id: "archive", title: "Internet Archive", titleAr: "أرشيف الإنترنت",
    desc: "Historical web archive search", descAr: "بحث أرشيف الويب التاريخي",
    output: "📋 archived pages with save dates", outputAr: "📋 صفحات مؤرشفة بتواريخ الحفظ",
    icon: <History size={18} />, color: "#F59E0B",
    apiEndpoint: "/api/search/archive", method: "GET",
    buildParams: (q) => `?q=${encodeURIComponent(q)}`,
    parseResponse: (d) => ({
      summary: d.results?.length ? `${d.results.length} archives found` : "No results",
      details: (d.results || []).slice(0, 5).map((r: any) => ({
        title: r.title || "Archived Page",
        date: r.timestamp || r.date || "",
        url: r.url || "",
      }))
    })
  },
  {
    id: "claimbuster", title: "ClaimBuster", titleAr: "ClaimBuster",
    desc: "Score each sentence's check-worthiness", descAr: "تقييم جدارة كل جملة بالتحقق",
    output: "📋 score 0–1. Above 0.5 = worth checking", outputAr: "📋 درجة 0–1. فوق 0.5 = يستحق التحقق",
    icon: <AlertTriangle size={18} />, color: "#EF4444",
    apiEndpoint: "/api/search/claimbuster", method: "POST",
    buildParams: (q) => ({ text: q }),
    parseResponse: (d) => ({
      summary: d.score !== undefined ? `Check-worthiness: ${(d.score * 100).toFixed(0)}%` : d.results?.length ? `${d.results.length} claims scored` : "No score",
      details: (d.results || (d.score !== undefined ? [{ text: "Input claim", score: d.score }] : [])).slice(0, 5).map((r: any) => ({
        text: r.text || "Claim",
        score: typeof r.score === "number" ? `${(r.score * 100).toFixed(0)}%` : "N/A",
      }))
    })
  },
  {
    id: "veracity", title: "Veracity Engine", titleAr: "محرك التحقق",
    desc: "Full verification against Egyptian misinfo patterns", descAr: "تحقق كامل ضد أنماط التضليل المصرية",
    output: "📋 verdict + confidence % + evidence", outputAr: "📋 حكم + نسبة ثقة + أدلة",
    icon: <ShieldCheck size={18} />, color: "#6366f1",
    apiEndpoint: "/api/search/veracity", method: "POST",
    buildParams: (q) => ({ claim: q }),
    parseResponse: (d) => {
      const r = d.result || d;
      return {
        summary: r.verdict ? `${r.verdict} (${r.confidence || "N/A"}%)` : "Processing...",
        details: r.evidence ? [{ verdict: r.verdict, confidence: `${r.confidence}%`, evidence: r.evidence }] : r.explanation ? [{ verdict: r.verdict, confidence: `${r.confidence}%`, text: r.explanation }] : []
      };
    }
  },
  {
    id: "reverse-image", title: "Reverse Image Search", titleAr: "بحث صور عكسي",
    desc: "Find image origins via Google Lens", descAr: "اعثر على أصول الصور عبر Google Lens",
    output: "📋 similar images with original sources", outputAr: "📋 صور مشابهة مع المصادر الأصلية",
    icon: <ImageIcon size={18} />, color: "#14B8A6",
    apiEndpoint: "/api/search/reverse-image", method: "POST",
    buildParams: (q) => ({ imageUrl: q }),
    parseResponse: (d) => ({
      summary: d.results?.length ? `${d.results.length} matches found` : d.message || "Paste image URL to search",
      details: (d.results || []).slice(0, 5).map((r: any) => ({
        title: r.title || "Image match",
        url: r.url || r.link || "",
      }))
    })
  },
  {
    id: "nlp-sentiment", title: "NLP Sentiment", titleAr: "تحليل المشاعر",
    desc: "Sentiment analysis and manipulation detection", descAr: "تحليل المشاعر وكشف التلاعب",
    output: "📋 sentiment + manipulation score", outputAr: "📋 المشاعر + درجة التلاعب",
    icon: <Brain size={18} />, color: "#EC4899",
    apiEndpoint: "/api/nlp/sentiment", method: "POST",
    buildParams: (q) => ({ text: q }),
    parseResponse: (d) => {
      const s = d.sentiment;
      const label = typeof s === "string" ? s : s?.label || "unknown";
      const manip = s?.manipulationScore ?? d.manipulationScore ?? d.manipulation_score ?? "N/A";
      const triggers = Array.isArray(s?.emotionalTriggers) && s.emotionalTriggers.length > 0 ? s.emotionalTriggers.join(", ") : "none";
      return {
        summary: `Sentiment: ${label} | Manipulation: ${manip}`,
        details: [{
          title: `Sentiment: ${label} (compound: ${s?.compound ?? "N/A"})`,
          text: `Manipulation: ${manip} | Triggers: ${triggers} | Tokens: ${s?.tokenCount ?? "N/A"} | Readability: Grade ${s?.readabilityGrade ?? "N/A"}`,
        }]
      };
    }
  },
  {
    id: "nlp-arabic", title: "Arabic NLP", titleAr: "تحليل عربي",
    desc: "Egyptian dialect analysis and trigger detection", descAr: "تحليل اللهجة المصرية وكشف المحفزات",
    output: "📋 dialect + triggers + persuasion patterns", outputAr: "📋 اللهجة + المحفزات + أنماط الإقناع",
    icon: <Languages size={18} />, color: "#F97316",
    apiEndpoint: "/api/nlp/arabic", method: "POST",
    buildParams: (q) => ({ text: q }),
    parseResponse: (d) => {
      const dialect = d.dialectHint || d.dialect || d.language || "unknown";
      const sentLabel = typeof d.sentiment === "string" ? d.sentiment : d.sentiment?.label || "N/A";
      const triggerList = Array.isArray(d.emotionalTriggers) && d.emotionalTriggers.length > 0 ? d.emotionalTriggers.join(", ") : "none";
      const riskList = Array.isArray(d.riskFlags) && d.riskFlags.length > 0 ? d.riskFlags.join(", ") : "none";
      return {
        summary: `Dialect: ${dialect} | Sentiment: ${sentLabel}`,
        details: [{
          title: `Dialect: ${dialect}`,
          text: `Sentiment: ${sentLabel} | Triggers: ${triggerList} | Risk flags: ${riskList}`,
        }]
      };
    }
  },
  {
    id: "ai-chat", title: "AI Chat (Multi-Provider)", titleAr: "دردشة ذكية (متعدد المزودين)",
    desc: "Multi-fallback AI (Gemini → Groq → GitHub → HF)", descAr: "ذكاء اصطناعي متعدد (Gemini → Groq → GitHub → HF)",
    output: "📋 AI response with sources", outputAr: "📋 رد الذكاء الاصطناعي مع مصادر",
    icon: <Bot size={18} />, color: "#8B5CF6",
    apiEndpoint: "/api/ai/chat", method: "POST",
    buildParams: (q) => ({ message: q, mode: "claim" }),
    parseResponse: (d) => ({
      summary: d.text ? d.text.slice(0, 200) + (d.text.length > 200 ? "..." : "") : d.error || "No response",
      details: d.provider ? [{ provider: d.provider, model: d.model, latency: d.latencyMs }] : []
    })
  },
  {
    id: "osint-investigator", title: "OSINT Investigator ⚡", titleAr: "محقق الـ OSINT الحي ⚡",
    desc: "Autonomous agent searching the live internet & scraping pages", descAr: "عميل مستقل يبحث في الإنترنت الحي ويحلل الصفحات",
    output: "📋 Intelligence dossier", outputAr: "📋 ملف استخباراتي",
    icon: <Search size={18} />, color: "#E11D48",
    apiEndpoint: "/api/defense/osint-investigator", method: "POST",
    buildParams: (q) => ({ query: q }),
    parseResponse: (d) => {
      // Handle Vercel AI SDK text stream or basic JSON
      return {
        summary: "Live investigation completed.",
        details: [{ title: "Dossier", text: d.text || "See response in console." }]
      };
    }
  },
];

// ── CORE MODULES ──
const CORE_MODULES = [
  { title: "DeepReal", titleAr: "ديب ريل", desc: "Misinformation verification engine — 14 daily drills", descAr: "محرك التحقق من التضليل — 14 تمريناً يومياً", href: "/deepreal", icon: <ShieldCheck size={22} />, color: "#EF4444" },
  { title: "Mental Health", titleAr: "الصحة النفسية", desc: "Mental health literacy — stabilization and support drills", descAr: "محو أمية الصحة النفسية — تمارين استقرار ودعم", href: "/mental-health", icon: <HeartPulse size={22} />, color: "#10B981" },
  { title: "Religion Hub", titleAr: "المحور الديني", desc: "Handling coercive religious discourse — evidence-based moderation", descAr: "التعامل مع الخطاب الديني القسري — اعتدال قائم على الأدلة", href: "/religion-hub", icon: <BookOpen size={22} />, color: "#F59E0B" },
  { title: "AI Assistant", titleAr: "المساعد الذكي", desc: "Fact-check, translate, academic search, and wellness via AI", descAr: "تحقق، ترجمة، بحث أكاديمي، وعافية عبر الذكاء الاصطناعي", href: "/chatbot", icon: <Bot size={22} />, color: "#8B5CF6" },
  { title: "Assessment (MIST-20)", titleAr: "التقييم (MIST-20)", desc: "Measure misinformation resilience with validated instruments", descAr: "قياس مرونة التضليل بأدوات موثوقة", href: "/assessment", icon: <ClipboardCheck size={22} />, color: "#3B82F6" },
  { title: "Sources Library", titleAr: "مكتبة المصادر", desc: "All scientific references and sources used", descAr: "جميع المراجع والمصادر العلمية المستخدمة", href: "/sources", icon: <BookMarked size={22} />, color: "#14B8A6" },
];

// ── Tab definitions ──
type TabId = "pages" | "verification" | "tools" | "modules";

export function ExploreHub() {
  const { isRTL, t } = useRTL();
  const pathname = usePathname();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("pages");
  const [searchQuery, setSearchQuery] = useState("");
  const [toolQuery, setToolQuery] = useState("");
  const [toolResults, setToolResults] = useState<Record<string, { summary: string; details: any[] }>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedTools, setSelectedTools] = useState<Set<string>>(new Set(LIVE_TOOLS.map(t => t.id)));
  const [runningTools, setRunningTools] = useState<Set<string>>(new Set());
  const overlayRef = useRef<HTMLDivElement>(null);

  // ESC to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  // Listen for external open events (e.g. from welcome page button)
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.tab) setActiveTab(detail.tab as TabId);
      setIsOpen(true);
    };
    window.addEventListener("explore-hub:open", handleOpen);
    return () => window.removeEventListener("explore-hub:open", handleOpen);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Filter pages
  const filteredPages = ALL_PAGES.filter(p => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return p.label.toLowerCase().includes(q) || p.labelAr.includes(q) || p.href.includes(q);
  });

  // Run single verification tool
  const runTool = useCallback(async (tool: ToolConfig, query: string) => {
    if (!query.trim()) return;
    setRunningTools(prev => new Set(prev).add(tool.id));
    try {
      let res: Response;
      if (tool.method === "GET") {
        const params = tool.buildParams(query) as string;
        res = await fetch(`${tool.apiEndpoint}${params}`);
      } else {
        const body = tool.buildParams(query) as Record<string, string>;
        res = await fetch(tool.apiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }
      const data = await res.json();
      const parsed = tool.parseResponse(data);
      setToolResults(prev => ({ ...prev, [tool.id]: parsed }));
    } catch (err) {
      setToolResults(prev => ({ ...prev, [tool.id]: { summary: "⚠️ Error connecting to API", details: [] } }));
    }
    setRunningTools(prev => { const n = new Set(prev); n.delete(tool.id); return n; });
  }, []);

  // Run selected tools
  const runSelectedTools = useCallback(async (query: string) => {
    if (!query.trim() || selectedTools.size === 0) return;
    // Clear previous results for selected tools
    setToolResults(prev => {
      const next = { ...prev };
      selectedTools.forEach(id => delete next[id]);
      return next;
    });
    for (const tool of LIVE_TOOLS) {
      if (selectedTools.has(tool.id)) {
        runTool(tool, query);
      }
    }
  }, [runTool, selectedTools]);

  // Toggle single tool selection
  const toggleTool = useCallback((id: string) => {
    setSelectedTools(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  // Select all / deselect all
  const selectAllTools = useCallback(() => setSelectedTools(new Set(LIVE_TOOLS.map(t => t.id))), []);
  const deselectAllTools = useCallback(() => setSelectedTools(new Set()), []);

  // Copy to clipboard
  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const TABS: { id: TabId; label: string; labelAr: string; icon: React.ReactNode }[] = [
    { id: "pages", label: `All Pages (${ALL_PAGES.length})`, labelAr: `كل الصفحات (${ALL_PAGES.length})`, icon: <Map size={16} /> },
    { id: "verification", label: "How It Works (6 Steps)", labelAr: "كيف يعمل (6 خطوات)", icon: <Layers size={16} /> },
    { id: "tools", label: "Live Tools (12)", labelAr: "أدوات حية (12)", icon: <Zap size={16} /> },
    { id: "modules", label: "Core Modules (6)", labelAr: "الوحدات الأساسية (6)", icon: <Cpu size={16} /> },
  ];

  // ── FLOATING BUTTON ──
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Explore All Pages"
        style={{
          position: "fixed",
          bottom: 90,
          right: a ? "auto" : 24,
          left: a ? 24 : "auto",
          zIndex: 9990,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 20px",
          borderRadius: 50,
          border: "1px solid rgba(139, 92, 246, 0.4)",
          background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          color: "#fff",
          cursor: "pointer",
          fontFamily: ff,
          fontSize: 13,
          fontWeight: 700,
          boxShadow: "0 4px 24px rgba(99,102,241,0.3), 0 0 0 1px rgba(255,255,255,0.05) inset",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          animation: "explore-fab-pulse 3s ease-in-out infinite",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "scale(1.06)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(99,102,241,0.5), 0 0 0 1px rgba(255,255,255,0.1) inset";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 24px rgba(99,102,241,0.3), 0 0 0 1px rgba(255,255,255,0.05) inset";
        }}
      >
        <Map size={16} />
        {a ? `استكشف كل الصفحات (${ALL_PAGES.length}+)` : `Explore All Pages (${ALL_PAGES.length}+)`}
        <ChevronRight size={14} style={{ transform: a ? "rotate(180deg)" : "none" }} />

        <style>{`
          @keyframes explore-fab-pulse {
            0%, 100% { box-shadow: 0 4px 24px rgba(99,102,241,0.3), 0 0 0 1px rgba(255,255,255,0.05) inset; }
            50% { box-shadow: 0 4px 32px rgba(139,92,246,0.5), 0 0 0 1px rgba(255,255,255,0.08) inset; }
          }
        `}</style>
      </button>
    );
  }

  // ── FULL-SCREEN OVERLAY ──
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        style={{
          position: "fixed", inset: 0, zIndex: 9990,
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          animation: "explore-fade-in 0.3s ease",
        }}
      />

      {/* Main Panel */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          top: 0, right: 0, bottom: 0,
          width: "min(960px, 100vw)",
          zIndex: 9991,
          background: "var(--bg-primary)",
          borderLeft: a ? "none" : "1px solid var(--border-primary)",
          borderRight: a ? "1px solid var(--border-primary)" : "none",
          display: "flex",
          flexDirection: "column",
          animation: "explore-slide-in 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          direction: a ? "rtl" : "ltr",
          fontFamily: ff,
        }}
      >
        {/* ── HEADER ── */}
        <div style={{
          padding: "16px 24px",
          borderBottom: "1px solid var(--border-primary)",
          background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.05), transparent)",
          display: "flex", alignItems: "center", gap: 12,
          flexShrink: 0,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: "linear-gradient(135deg, #6366f1, #8B5CF6)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Map size={20} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)" }}>
              {a ? "مركز الاستكشاف" : "Explore Hub"}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
              {a ? `${ALL_PAGES.length} صفحة · 12 أداة حية · 6 وحدات` : `${ALL_PAGES.length} pages · 12 live tools · 6 modules`}
            </div>
          </div>
          <div style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, background: "rgba(255,255,255,0.06)", border: "1px solid var(--border-primary)", color: "var(--text-muted)" }}>
            ESC
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: "rgba(255,255,255,0.06)", border: "1px solid var(--border-primary)",
              color: "var(--text-muted)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.color = "#EF4444"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "var(--text-muted)"; }}
          >
            <X size={18} />
          </button>
        </div>

        {/* ── TABS ── */}
        <div style={{
          display: "flex", gap: 0, borderBottom: "1px solid var(--border-primary)",
          background: "var(--bg-secondary)", flexShrink: 0,
          overflowX: "auto",
        }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, minWidth: 140,
                padding: "12px 16px",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                fontSize: 13, fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? "var(--accent-cta)" : "var(--text-muted)",
                background: activeTab === tab.id ? "rgba(99,102,241,0.08)" : "transparent",
                borderTop: "none", borderLeft: "none", borderRight: "none",
                borderBottom: activeTab === tab.id ? "2px solid var(--accent-cta)" : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: ff,
                whiteSpace: "nowrap",
              }}
            >
              {tab.icon}
              {a ? tab.labelAr : tab.label}
            </button>
          ))}
        </div>

        {/* ── CONTENT ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: 0 }}>

          {/* ═══ TAB 1: ALL PAGES ═══ */}
          {activeTab === "pages" && (
            <div style={{ padding: 24 }}>
              {/* Search */}
              <div style={{ position: "relative", marginBottom: 24 }}>
                <Search size={16} style={{ position: "absolute", top: 12, [a ? "right" : "left"]: 14, color: "var(--text-muted)" }} />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={a ? "ابحث في الصفحات..." : "Search pages..."}
                  style={{
                    width: "100%", padding: "10px 14px 10px 40px",
                    borderRadius: 12, fontSize: 14,
                    background: "var(--bg-secondary)", border: "1px solid var(--border-primary)",
                    color: "var(--text-primary)", outline: "none", fontFamily: ff,
                  }}
                />
              </div>

              {/* Categories */}
              {CATEGORIES.map(cat => {
                const catPages = filteredPages.filter(p => p.category === cat.id);
                if (catPages.length === 0) return null;
                return (
                  <div key={cat.id} style={{ marginBottom: 28 }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8,
                      marginBottom: 12, fontSize: 12, fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.06em",
                      color: cat.color,
                    }}>
                      {cat.icon}
                      {a ? cat.labelAr : cat.label}
                      <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 6, background: `${cat.color}18`, color: cat.color }}>{catPages.length}</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 8 }}>
                      {catPages.map(page => {
                        const isActive = pathname === page.href;
                        return (
                          <Link
                            key={page.href}
                            href={page.href}
                            onClick={() => setIsOpen(false)}
                            style={{
                              display: "flex", alignItems: "center", gap: 10,
                              padding: "10px 14px", borderRadius: 10,
                              background: isActive ? `${cat.color}15` : "var(--bg-secondary)",
                              border: `1px solid ${isActive ? `${cat.color}40` : "var(--border-primary)"}`,
                              textDecoration: "none", color: "var(--text-primary)",
                              fontSize: 13, fontWeight: isActive ? 600 : 400,
                              transition: "all 0.2s",
                              fontFamily: ff,
                            }}
                          >
                            <span style={{ color: cat.color, flexShrink: 0 }}>{page.icon}</span>
                            <span style={{ flex: 1 }}>{a ? page.labelAr : page.label}</span>
                            {isActive && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: `${cat.color}25`, color: cat.color, fontWeight: 700 }}>{a ? "أنت هنا" : "HERE"}</span>}
                            <ExternalLink size={12} style={{ color: "var(--text-caption)", flexShrink: 0 }} />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ═══ TAB 2: VERIFICATION STEPS ═══ */}
          {activeTab === "verification" && (
            <div style={{ padding: 24 }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, color: "var(--text-primary)", fontFamily: ff }}>
                {a ? "كيف يعمل التحقق — 6 خطوات" : "How Verification Works — 6 Steps"}
              </h3>
              <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 28, fontFamily: ff }}>
                {a ? "نظام تحقق متعدد الطبقات يعمل في الوقت الفعلي" : "A multi-layer verification system operating in real-time"}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative" }}>
                {/* Connecting line */}
                <div style={{
                  position: "absolute",
                  top: 28, bottom: 28,
                  [a ? "right" : "left"]: 27,
                  width: 2,
                  background: "linear-gradient(180deg, #6366f1, #3B82F6, #10B981, #F59E0B, #EF4444, #8B5CF6)",
                  borderRadius: 1, opacity: 0.3,
                }} />

                {VERIFICATION_STEPS.map((step, i) => (
                  <div
                    key={step.num}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: 16,
                      padding: "20px 0",
                      animation: `explore-fade-in 0.4s ease ${i * 0.08}s both`,
                    }}
                  >
                    {/* Step number circle */}
                    <div style={{
                      width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                      background: `${step.color}15`,
                      border: `2px solid ${step.color}40`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: step.color,
                      position: "relative", zIndex: 1,
                    }}>
                      {step.icon}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: step.color, fontFamily: "monospace" }}>STEP {step.num}</span>
                      </div>
                      <div style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4, fontFamily: ff }}>
                        {a ? step.titleAr : step.title}
                      </div>
                      <div style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6, fontFamily: ff }}>
                        {a ? step.descAr : step.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ TAB 3: LIVE TOOLS ═══ */}
          {activeTab === "tools" && (
            <div style={{ padding: 24 }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, color: "var(--text-primary)", fontFamily: ff }}>
                {a ? "أدوات التحقق الحية — 12 مصدر بيانات" : "Live Verification Tools — 12 Data Sources"}
              </h3>
              <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 12, fontFamily: ff }}>
                {a ? "اختر الأدوات التي تريد استخدامها ثم أدخل ادعاء للتحقق" : "Select tools you want to use, then enter a claim to verify"}
              </p>

              {/* ── Selection toolbar ── */}
              <div style={{
                display: "flex", alignItems: "center", gap: 8, marginBottom: 16,
                padding: "10px 14px", borderRadius: 12,
                background: "var(--bg-secondary)", border: "1px solid var(--border-primary)",
                flexWrap: "wrap",
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", fontFamily: ff }}>
                  {a ? `${selectedTools.size} / ${LIVE_TOOLS.length} مختار` : `${selectedTools.size} / ${LIVE_TOOLS.length} selected`}
                </span>
                <div style={{ width: 1, height: 16, background: "var(--border-primary)" }} />
                <button
                  onClick={selectAllTools}
                  style={{
                    padding: "4px 12px", borderRadius: 6, fontSize: 11, fontWeight: 600,
                    background: selectedTools.size === LIVE_TOOLS.length ? "rgba(99,102,241,0.15)" : "transparent",
                    border: "1px solid var(--border-primary)", color: "var(--accent-cta)",
                    cursor: "pointer", fontFamily: ff,
                  }}
                >
                  {a ? "اختر الكل" : "Select All"}
                </button>
                <button
                  onClick={deselectAllTools}
                  style={{
                    padding: "4px 12px", borderRadius: 6, fontSize: 11, fontWeight: 600,
                    background: selectedTools.size === 0 ? "rgba(239,68,68,0.1)" : "transparent",
                    border: "1px solid var(--border-primary)", color: "var(--text-muted)",
                    cursor: "pointer", fontFamily: ff,
                  }}
                >
                  {a ? "إلغاء الكل" : "Deselect All"}
                </button>
                <div style={{ flex: 1 }} />
                {/* Quick-pick chips */}
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {LIVE_TOOLS.map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => toggleTool(tool.id)}
                      title={tool.title}
                      style={{
                        width: 28, height: 28, borderRadius: 6,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: selectedTools.has(tool.id) ? `${tool.color}20` : "transparent",
                        border: `1.5px solid ${selectedTools.has(tool.id) ? tool.color : "var(--border-primary)"}`,
                        color: selectedTools.has(tool.id) ? tool.color : "var(--text-caption)",
                        cursor: "pointer", transition: "all 0.15s",
                        opacity: selectedTools.has(tool.id) ? 1 : 0.4,
                      }}
                    >
                      {tool.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Query input + Run button ── */}
              <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <Search size={16} style={{ position: "absolute", top: 12, [a ? "right" : "left"]: 14, color: "var(--text-muted)" }} />
                  <input
                    value={toolQuery}
                    onChange={e => setToolQuery(e.target.value)}
                    placeholder={a ? "أدخل ادعاء للتحقق..." : "Enter a claim to verify..."}
                    onKeyDown={e => { if (e.key === "Enter") runSelectedTools(toolQuery); }}
                    style={{
                      width: "100%", padding: "10px 14px 10px 40px",
                      borderRadius: 12, fontSize: 14,
                      background: "var(--bg-secondary)", border: "1px solid var(--border-primary)",
                      color: "var(--text-primary)", outline: "none", fontFamily: ff,
                    }}
                  />
                </div>
                <button
                  onClick={() => runSelectedTools(toolQuery)}
                  disabled={!toolQuery.trim() || selectedTools.size === 0}
                  style={{
                    padding: "10px 20px", borderRadius: 12,
                    background: (toolQuery.trim() && selectedTools.size > 0) ? "linear-gradient(135deg, #6366f1, #8B5CF6)" : "var(--bg-secondary)",
                    border: "none", color: "#fff", fontWeight: 700,
                    cursor: (toolQuery.trim() && selectedTools.size > 0) ? "pointer" : "default",
                    fontSize: 13, display: "flex", alignItems: "center", gap: 6,
                    opacity: (toolQuery.trim() && selectedTools.size > 0) ? 1 : 0.5,
                    fontFamily: ff, whiteSpace: "nowrap",
                  }}
                >
                  <Zap size={14} /> {selectedTools.size === LIVE_TOOLS.length
                    ? (a ? "تحقق الكل" : "Verify All")
                    : (a ? `تحقق (${selectedTools.size})` : `Verify (${selectedTools.size})`)}
                </button>
              </div>

              {/* Tool cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
                {LIVE_TOOLS.map(tool => {
                  const result = toolResults[tool.id];
                  return (
                    <div
                      key={tool.id}
                      style={{
                        borderRadius: 14, overflow: "hidden",
                        background: "var(--bg-secondary)",
                        border: `1px solid ${selectedTools.has(tool.id) ? (result ? `${tool.color}40` : `${tool.color}25`) : "var(--border-primary)"}`,
                        transition: "all 0.3s",
                        opacity: selectedTools.has(tool.id) ? 1 : 0.45,
                      }}
                    >
                      {/* Tool header */}
                      <div style={{
                        padding: "12px 14px",
                        borderBottom: "1px solid var(--border-primary)",
                        display: "flex", alignItems: "center", gap: 10,
                        background: `${tool.color}08`,
                      }}>
                        {/* Checkbox */}
                        <button
                          onClick={() => toggleTool(tool.id)}
                          style={{
                            width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                            border: `2px solid ${selectedTools.has(tool.id) ? tool.color : "var(--border-primary)"}`,
                            background: selectedTools.has(tool.id) ? `${tool.color}` : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", transition: "all 0.15s", padding: 0,
                            color: "#fff",
                          }}
                        >
                          {selectedTools.has(tool.id) && <CheckCircle2 size={12} />}
                        </button>
                        <div style={{
                          width: 32, height: 32, borderRadius: 8,
                          background: `${tool.color}20`, color: tool.color,
                          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                        }}>
                          {tool.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", fontFamily: ff }}>
                            {a ? tool.titleAr : tool.title}
                          </div>
                          <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: ff }}>
                            {a ? tool.descAr : tool.desc}
                          </div>
                        </div>
                        <button
                          onClick={() => runTool(tool, toolQuery)}
                          disabled={!toolQuery.trim() || runningTools.has(tool.id)}
                          title={a ? "تشغيل هذه الأداة فقط" : "Run this tool only"}
                          style={{
                            width: 28, height: 28, borderRadius: 6,
                            background: toolQuery.trim() ? `${tool.color}20` : "transparent",
                            border: `1px solid ${tool.color}30`,
                            color: tool.color, cursor: toolQuery.trim() ? "pointer" : "default",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            opacity: toolQuery.trim() ? 1 : 0.3,
                          }}
                        >
                          {runningTools.has(tool.id) ? <Loader2 size={12} style={{ animation: "spin 1s linear infinite" }} /> : <ArrowRight size={12} />}
                        </button>
                      </div>

                      {/* Output info */}
                      <div style={{ padding: "8px 14px", fontSize: 11, color: "var(--text-caption)", fontFamily: ff }}>
                        {a ? tool.outputAr : tool.output}
                      </div>

                      {/* Results */}
                      {result && (
                        <div style={{
                          padding: "8px 14px 12px",
                          borderTop: "1px solid var(--border-primary)",
                          background: `${tool.color}05`,
                        }}>
                          <div style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            marginBottom: 8,
                          }}>
                            <span style={{ fontSize: 12, fontWeight: 600, color: tool.color, fontFamily: ff }}>
                              {result.summary}
                            </span>
                            <button
                              onClick={() => copyText(JSON.stringify(result, null, 2), tool.id)}
                              style={{
                                background: "none", border: "none", cursor: "pointer",
                                color: copiedId === tool.id ? "#10B981" : "var(--text-caption)",
                                display: "flex", alignItems: "center", gap: 4, fontSize: 10,
                              }}
                            >
                              <Copy size={10} /> {copiedId === tool.id ? "✓" : "Copy"}
                            </button>
                          </div>
                          {result.details.slice(0, 3).map((d, i) => (
                            <div key={i} style={{
                              fontSize: 11, color: "var(--text-muted)", padding: "4px 0",
                              borderTop: i > 0 ? "1px solid var(--border-primary)" : "none",
                              fontFamily: ff,
                            }}>
                              {typeof d.title === "string" && <div style={{ fontWeight: 600, color: "var(--text-secondary)" }}>{d.title}</div>}
                              {typeof d.verdict === "string" && <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 4, background: "#EF444420", color: "#EF4444", fontWeight: 600 }}>{d.verdict}</span>}
                              {typeof d.citations === "number" && <span> · {d.citations} citations</span>}
                              {typeof d.year === "string" && d.year && <span> · {d.year}</span>}
                              {typeof d.score === "string" && <span> · Score: {d.score}</span>}
                              {typeof d.confidence === "string" && <span> · Confidence: {d.confidence}</span>}
                              {typeof d.text === "string" && <div style={{ marginTop: 2, fontSize: 11, lineHeight: 1.5, color: "var(--text-secondary)" }}>{d.text.slice(0, 200)}{d.text.length > 200 ? "..." : ""}</div>}
                              {typeof d.snippet === "string" && d.snippet && <div style={{ marginTop: 2, fontSize: 11, lineHeight: 1.4 }}>{d.snippet.slice(0, 100)}...</div>}
                              {typeof d.provider === "string" && <span> · Provider: {d.provider}</span>}
                              {typeof d.model === "string" && <span> · Model: {d.model}</span>}
                              {typeof d.url === "string" && d.url && (
                                <a href={d.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, color: tool.color, textDecoration: "none", display: "block", marginTop: 2 }}>
                                  {d.url.slice(0, 60)}{d.url.length > 60 ? "..." : ""} ↗
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═══ TAB 4: CORE MODULES ═══ */}
          {activeTab === "modules" && (
            <div style={{ padding: 24 }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, color: "var(--text-primary)", fontFamily: ff }}>
                {a ? "وحدات المنصة الأساسية" : "Core Platform Modules"}
              </h3>
              <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 28, fontFamily: ff }}>
                {a ? "ستة محركات متخصصة — كل منها يحل مشكلة محددة" : "Six specialized engines — each solving a specific problem"}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                {CORE_MODULES.map((mod, i) => (
                  <Link
                    key={mod.href}
                    href={mod.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: "flex", flexDirection: "column", gap: 12,
                      padding: 20, borderRadius: 16,
                      background: `linear-gradient(135deg, ${mod.color}10, ${mod.color}05)`,
                      border: `1px solid ${mod.color}25`,
                      textDecoration: "none", color: "var(--text-primary)",
                      transition: "all 0.3s",
                      animation: `explore-fade-in 0.4s ease ${i * 0.08}s both`,
                      fontFamily: ff,
                    }}
                  >
                    <div style={{
                      width: 48, height: 48, borderRadius: 14,
                      background: `${mod.color}18`, color: mod.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {mod.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>
                        {a ? mod.titleAr : mod.title}
                      </div>
                      <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
                        {a ? mod.descAr : mod.desc}
                      </div>
                    </div>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 4,
                      fontSize: 12, fontWeight: 600, color: mod.color,
                      marginTop: "auto",
                    }}>
                      {a ? "افتح" : "Open"} <ArrowRight size={12} style={{ transform: a ? "rotate(180deg)" : "none" }} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── ANIMATIONS ── */}
      <style>{`
        @keyframes explore-fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes explore-slide-in { from { transform: translateX(${a ? "-100%" : "100%"}); opacity: 0.8; } to { transform: translateX(0); opacity: 1; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
