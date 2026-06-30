import { NextRequest, NextResponse } from 'next/server';
import { nvidiaFirstGenerateJSON } from '@/lib/ai/nvidia-first';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * Paper Auditor API — NVIDIA NIM Scientific Paper Analysis
 * 
 * Analyzes research papers for:
 * - Statistical validity (p-hacking, multiple comparisons, effect sizes)
 * - Methodological quality (CONSORT, PRISMA compliance)
 * - Funding conflicts of interest
 * - Reproducibility signals
 * - Claim accuracy vs results
 * - Arabic summary for Egyptian audience
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { title, abstract, authors, journal, year } = body;
    const { doi, claims } = body;

    // If only a DOI was supplied, resolve real metadata from CrossRef before auditing.
    // Previously this 400'd, leaving the DOI-only path (the most common one) dead.
    if (!abstract && !title && doi) {
      try {
        const crossref = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, {
          headers: { 'User-Agent': 'EgyptianAwarenessLibrary/1.0 (mailto:contact@eal.org)' },
          signal: AbortSignal.timeout(8000),
        });
        if (crossref.ok) {
          const { message } = await crossref.json();
          title = title || message.title?.[0];
          abstract = abstract || (message.abstract || '').replace(/<[^>]+>/g, '').trim();
          authors = authors || message.author?.map((a: { given?: string; family?: string }) => `${a.given || ''} ${a.family || ''}`.trim());
          journal = journal || message['container-title']?.[0];
          year = year || message['published-print']?.['date-parts']?.[0]?.[0] || message['published-online']?.['date-parts']?.[0]?.[0];
        }
      } catch (e) {
        console.warn('[Paper Auditor] CrossRef DOI resolution failed:', e);
      }
    }

    if (!abstract && !title) {
      return NextResponse.json({ error: 'At least title, abstract, or a resolvable DOI is required' }, { status: 400 });
    }

    const paperInfo = `
Title: ${title || 'Not provided'}
Authors: ${Array.isArray(authors) ? authors.join(', ') : (authors || 'Not provided')}
Journal: ${journal || 'Not provided'}
Year: ${year || 'Not provided'}
DOI: ${doi || 'Not provided'}
Abstract: ${(abstract || '').substring(0, 2000)}
${claims ? `\nUser's specific claims to verify:\n${JSON.stringify(claims)}` : ''}`;

    const { data, provider } = await nvidiaFirstGenerateJSON(
      `You are a world-class scientific peer reviewer with expertise in biostatistics, research methodology, and scientific communication. Audit this research paper.\n\n${paperInfo}\n\nReturn ONLY valid JSON:\n{\n  "overallQualityScore": 0-100,\n  "qualityGrade": "A|B|C|D|F",\n  "qualityGradeAr": "ممتاز|جيد|مقبول|ضعيف|راسب",\n  "statisticalAudit": {\n    "pValueReported": true,\n    "effectSizeReported": true,\n    "sampleSizeAdequate": true,\n    "multipleComparisonsCorrected": true,\n    "powerAnalysisReported": true,\n    "statisticalIssues": ["issue1", "issue2"],\n    "statisticalStrengths": ["strength1"]\n  },\n  "methodologyAudit": {\n    "studyType": "RCT|Cohort|Case-Control|Cross-sectional|Meta-analysis|Other",\n    "evidenceLevel": 1-6,\n    "evidenceLevelName": "Expert Opinion|Case Report|Cohort Study|RCT|Systematic Review|Meta-analysis",\n    "blindingAdequate": true,\n    "randomizationReported": true,\n    "controlGroupPresent": true,\n    "prismaCompliant": true,\n    "consortCompliant": true,\n    "methodologyIssues": ["issue1"],\n    "methodologyStrengths": ["strength1"]\n  },\n  "conflictOfInterestAudit": {\n    "fundingDisclosed": true,\n    "industryFunded": false,\n    "potentialBias": "low|medium|high",\n    "conflictNotes": "Analysis of any funding or COI disclosed"\n  },\n  "reproductibilityScore": 0-100,\n  "openDataAvailable": true,\n  "preregistered": true,\n  "claimAccuracy": {\n    "abstractMatchesResults": true,\n    "overclaiming": false,\n    "overclaimingExamples": ["example if applicable"],\n    "headlines_match_findings": true\n  },\n  "fallaciesDetected": [\n    {"fallacy": "name", "fallacyAr": "الاسم بالعربية", "location": "abstract|methods|results|discussion", "severity": "low|medium|high"}\n  ],\n  "keyFindings_en": ["finding1", "finding2"],\n  "keyFindings_ar": ["الاستنتاج 1", "الاستنتاج 2"],\n  "summary_en": "2-3 sentence plain-language summary of what this paper actually proves",\n  "summary_ar": "ملخص بالعربية البسيطة لما تُثبته الدراسة فعلاً",\n  "egyptianContextNote_ar": "ملاحظة حول مدى انطباق هذه الدراسة على السياق المصري",\n  "shouldBeShared": true,\n  "sharingRecommendation_ar": "هل ينبغي مشاركة هذه الدراسة؟ ولماذا؟",\n  "redFlags": ["flag1"],\n  "greenFlags": ["strength1"],\n  "forwardDefenseScript_ar": "رسالة واتساب جاهزة تشرح نتائج الدراسة بأمانة"\n}`,
      {
        systemPrompt: 'You are an expert peer reviewer and scientific communicator. Audit research papers with precision and return ONLY valid JSON.',
        maxTokens: 2500,
        temperature: 0.15,
      }
    );

    if (!data) {
      // Graceful — never 500 when the AI is momentarily busy/unparseable.
      return NextResponse.json({
        audit: { overallQualityScore: null, qualityGrade: "—", summary_en: "Automated peer-review audit is temporarily unavailable (AI providers are busy). Please retry in a moment.", summary_ar: "تدقيق المراجعة العلمية الآلي غير متاح مؤقتًا (المزوّدون مشغولون). برجاء إعادة المحاولة بعد لحظات.", statisticalAudit: {}, methodologyAudit: {}, redFlags: [], greenFlags: [] },
        paperInfo: { title, doi, journal, year },
        provider: provider || "fallback",
        note: "ai_unavailable",
        disclaimer: 'This automated audit is educational. Independent expert review is recommended for clinical or policy decisions.',
      });
    }

    return NextResponse.json({
      audit: data,
      paperInfo: { title, doi, journal, year },
      provider,
      disclaimer: 'This automated audit is educational. Independent expert review is recommended for clinical or policy decisions.',
    });
  } catch (error: any) {
    console.error('[Paper Auditor API Error]', error);
    // Graceful — never 500 (e.g. the rotator is momentarily exhausted under load).
    return NextResponse.json({
      audit: { overallQualityScore: null, qualityGrade: "—", summary_en: "Automated peer-review audit could not complete right now (AI providers are busy). Please retry in a moment.", summary_ar: "تعذّر إكمال تدقيق المراجعة العلمية الآن (المزوّدون مشغولون). برجاء إعادة المحاولة بعد لحظات.", statisticalAudit: {}, methodologyAudit: {}, redFlags: [], greenFlags: [] },
      provider: "fallback",
      note: "ai_unavailable",
      disclaimer: 'This automated audit is educational. Independent expert review is recommended for clinical or policy decisions.',
    });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const doi = searchParams.get('doi');

  if (!doi) {
    return NextResponse.json({
      message: 'Paper Auditor API — NVIDIA NIM powered scientific paper analysis',
      usage: 'POST with { title, abstract, doi?, authors?, journal?, year?, claims? }',
      features: ['Statistical audit', 'Methodology assessment', 'COI analysis', 'Reproducibility score', 'Arabic summary', 'Egyptian context note'],
      provider: 'NVIDIA NIM → Gemini fallback',
    });
  }

  // Fetch paper metadata from CrossRef if DOI provided
  try {
    // Bound the external CrossRef fetch so a slow/unresponsive API can't hang the route.
    const crossref = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, {
      headers: { 'User-Agent': 'EgyptianAwarenessLibrary/1.0 (mailto:contact@eal.org)' },
      signal: AbortSignal.timeout(8000),
    });
    if (crossref.ok) {
      const { message } = await crossref.json();
      return NextResponse.json({
        title: message.title?.[0],
        authors: message.author?.map((a: any) => `${a.given || ''} ${a.family || ''}`),
        journal: message['container-title']?.[0],
        year: message['published-print']?.['date-parts']?.[0]?.[0],
        abstract: message.abstract,
        doi,
        crossrefScore: message.score,
      });
    }
  } catch { /* ignore */ }

  return NextResponse.json({ error: 'Could not fetch paper metadata' }, { status: 404 });
}
