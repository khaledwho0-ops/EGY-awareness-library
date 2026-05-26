/**
 * DEPLOYMENT READINESS CHECKLIST — Q115
 * "Deployment Blocker" mechanism preventing launch without:
 * - 3 expert sign-offs
 * - API health checks
 * - Data freeze verification
 * - Accessibility audit pass
 * 
 * Framework: §23.1 — External readiness checklist
 */

export interface ReadinessCheck {
  id: string;
  category: 'expert' | 'technical' | 'data' | 'accessibility' | 'legal';
  label: string;
  description: string;
  isBlocking: boolean;
  status: 'pass' | 'fail' | 'pending' | 'skipped';
  checkedAt?: string;
  checkedBy?: string;
  notes?: string;
}

/**
 * Master readiness checklist
 * ALL blocking items must pass before deployment
 */
export function getReadinessChecklist(): ReadinessCheck[] {
  return [
    // Expert Sign-Offs
    {
      id: 'expert-media',
      category: 'expert',
      label: 'Media Literacy Expert Sign-Off',
      description: 'Dr. expert has reviewed and approved all 14 DeepReal exercises with CVI ≥ 0.78',
      isBlocking: true,
      status: 'pending',
    },
    {
      id: 'expert-mh',
      category: 'expert',
      label: 'Mental Health Expert Sign-Off',
      description: 'Clinical psychologist has verified safety protocols, crisis contacts, and non-diagnosis guardrails',
      isBlocking: true,
      status: 'pending',
    },
    {
      id: 'expert-religion',
      category: 'expert',
      label: 'Religion Domain Expert Sign-Off',
      description: 'Religion psychology expert has approved coping exercises and non-fatwa guardrails',
      isBlocking: true,
      status: 'pending',
    },

    // Technical Checks
    {
      id: 'api-factcheck',
      category: 'technical',
      label: 'Google Fact Check API Responds',
      description: 'Server-side proxy at /api/search/factcheck returns valid results',
      isBlocking: true,
      status: 'pending',
    },
    {
      id: 'api-evidence',
      category: 'technical',
      label: 'Evidence Search API Responds',
      description: 'OpenAlex/Crossref proxy at /api/search/evidence returns valid results',
      isBlocking: true,
      status: 'pending',
    },
    {
      id: 'build-clean',
      category: 'technical',
      label: 'Production Build: 0 Errors',
      description: 'npx next build completes with 0 TypeScript errors and 0 runtime errors',
      isBlocking: true,
      status: 'pending',
    },
    {
      id: 'pwa-offline',
      category: 'technical',
      label: 'PWA Offline Crisis Contacts',
      description: 'Service Worker caches crisis numbers (08008880700, 123) and serves them offline',
      isBlocking: true,
      status: 'pending',
    },
    {
      id: 'llm-fallback',
      category: 'technical',
      label: 'LLM Failover Chain Works',
      description: 'Claude → OpenAI → Llama → Static fallback chain tested end-to-end',
      isBlocking: false,
      status: 'pending',
    },

    // Data Integrity
    {
      id: 'data-42-exercises',
      category: 'data',
      label: '42 Exercises Loaded',
      description: 'All 42 exercises (14 per MVP) load correctly with all 13 template fields',
      isBlocking: true,
      status: 'pending',
    },
    {
      id: 'data-100-sources',
      category: 'data',
      label: '100 Sources Verified',
      description: 'All 100 trusted sources have valid URLs, trust bands, and freshness < 90 days',
      isBlocking: true,
      status: 'pending',
    },
    {
      id: 'data-keyhunter',
      category: 'data',
      label: '42 KeyHunter Entries Complete',
      description: 'Every exercise has a matching KeyHunter entry with 7 layers populated',
      isBlocking: true,
      status: 'pending',
    },
    {
      id: 'data-freeze',
      category: 'data',
      label: 'Scoring Logic Frozen',
      description: 'Git tag created, no modifications to scoring algorithms during data collection',
      isBlocking: true,
      status: 'pending',
    },

    // Accessibility
    {
      id: 'a11y-keyboard',
      category: 'accessibility',
      label: 'Full Keyboard Navigation',
      description: 'All interactive elements reachable via Tab, modals have focus traps, Escape closes overlays',
      isBlocking: true,
      status: 'pending',
    },
    {
      id: 'a11y-contrast',
      category: 'accessibility',
      label: 'WCAG 2.1 AA Contrast',
      description: 'All text meets 4.5:1 contrast ratio in both light and dark themes',
      isBlocking: false,
      status: 'pending',
    },
    {
      id: 'a11y-aria',
      category: 'accessibility',
      label: 'ARIA Labels Complete',
      description: 'All interactive elements have descriptive aria-labels, buttons have accessible names',
      isBlocking: false,
      status: 'pending',
    },

    // Legal/Ethics
    {
      id: 'ethics-irb',
      category: 'legal',
      label: 'IRB/Ethics Approval',
      description: 'University ethics board has approved the study protocol',
      isBlocking: true,
      status: 'pending',
    },
    {
      id: 'consent-form',
      category: 'legal',
      label: 'Informed Consent Form',
      description: 'Digital informed consent form displays before data collection begins',
      isBlocking: true,
      status: 'pending',
    },
  ];
}

/**
 * Check if deployment is blocked
 */
export function isDeploymentBlocked(): { blocked: boolean; blockers: string[] } {
  const checks = getReadinessChecklist();
  const blockers = checks
    .filter(c => c.isBlocking && c.status !== 'pass')
    .map(c => c.label);

  return {
    blocked: blockers.length > 0,
    blockers,
  };
}

/**
 * Get readiness summary for supervisor dashboard
 */
export function getReadinessSummary(): {
  total: number;
  passed: number;
  failed: number;
  pending: number;
  percentage: number;
  canDeploy: boolean;
} {
  const checks = getReadinessChecklist();
  const passed = checks.filter(c => c.status === 'pass').length;
  const failed = checks.filter(c => c.status === 'fail').length;
  const pending = checks.filter(c => c.status === 'pending').length;

  return {
    total: checks.length,
    passed,
    failed,
    pending,
    percentage: Math.round((passed / checks.length) * 100),
    canDeploy: !isDeploymentBlocked().blocked,
  };
}
