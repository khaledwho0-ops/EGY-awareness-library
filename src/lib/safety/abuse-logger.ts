/**
 * MISUSE & HARM LOGGING — Q87
 * Dedicated registry for monitoring malicious inputs in Prompt Lab
 * Logs jailbreak attempts, self-harm content, and immediate admin notification
 * 
 * Framework: §23.1 — Content Moderation, §28.9 — Safety
 */

export interface AbuseLogEntry {
  id: string;
  timestamp: string;
  sessionId: string;
  inputText: string;
  violationType: 'jailbreak' | 'self_harm' | 'diagnosis_attempt' | 'fatwa_attempt' | 'hate_speech' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  mvp: 'deepreal' | 'mental-health' | 'religion-hub';
  blocked: boolean;
  guardRailTriggered: string;
  userAgent?: string;
}

// Jailbreak detection patterns
const JAILBREAK_PATTERNS = [
  /ignore (all )?previous instructions/i,
  /you are now/i,
  /act as (if|a)/i,
  /pretend you/i,
  /system prompt/i,
  /DAN mode/i,
  /bypass/i,
  /jailbreak/i,
  /\bdo anything now\b/i,
];

/**
 * Scan input for abuse patterns and log if detected
 */
export function scanForAbuse(
  input: string,
  mvp: 'deepreal' | 'mental-health' | 'religion-hub',
  sessionId: string
): AbuseLogEntry | null {
  let violationType: AbuseLogEntry['violationType'] | null = null;
  let severity: AbuseLogEntry['severity'] = 'low';
  let guardRailTriggered = '';

  // Check jailbreak patterns
  for (const pattern of JAILBREAK_PATTERNS) {
    if (pattern.test(input)) {
      violationType = 'jailbreak';
      severity = 'medium';
      guardRailTriggered = `Jailbreak pattern: ${pattern.source}`;
      break;
    }
  }

  // Check self-harm (critical severity)
  const selfHarmPatterns = [
    /\b(kill|suicide|end my life|hurt myself|self.?harm|want to die)\b/i,
  ];
  for (const pattern of selfHarmPatterns) {
    if (pattern.test(input)) {
      violationType = 'self_harm';
      severity = 'critical';
      guardRailTriggered = 'Self-harm content detected';
      break;
    }
  }

  if (!violationType) return null;

  const entry: AbuseLogEntry = {
    id: `abuse_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    sessionId,
    inputText: input.slice(0, 500), // Truncate for storage
    violationType,
    severity,
    mvp,
    blocked: true,
    guardRailTriggered,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
  };

  // Persist to localStorage log
  persistAbuseLog(entry);

  // If critical, trigger immediate notification
  if (severity === 'critical') {
    triggerAdminAlert(entry);
  }

  return entry;
}

function persistAbuseLog(entry: AbuseLogEntry): void {
  try {
    const logs: AbuseLogEntry[] = JSON.parse(localStorage.getItem('abuse_logs') || '[]');
    logs.push(entry);
    // Keep last 100 entries
    if (logs.length > 100) logs.splice(0, logs.length - 100);
    localStorage.setItem('abuse_logs', JSON.stringify(logs));
  } catch { /* silent */ }
}

function triggerAdminAlert(entry: AbuseLogEntry): void {
  // In production: POST to admin webhook / notification service
  // For now: console warning + localStorage flag
  console.warn('[CRITICAL SAFETY ALERT]', entry.guardRailTriggered);
  try {
    const alerts: AbuseLogEntry[] = JSON.parse(localStorage.getItem('critical_alerts') || '[]');
    alerts.push(entry);
    localStorage.setItem('critical_alerts', JSON.stringify(alerts));
  } catch { /* silent */ }
}

/**
 * Export abuse logs for supervisor review
 */
export function exportAbuseLogs(): AbuseLogEntry[] {
  try {
    return JSON.parse(localStorage.getItem('abuse_logs') || '[]');
  } catch {
    return [];
  }
}

/**
 * Get count of abuse events by severity
 */
export function getAbuseStats(): Record<string, number> {
  const logs = exportAbuseLogs();
  return {
    total: logs.length,
    critical: logs.filter(l => l.severity === 'critical').length,
    high: logs.filter(l => l.severity === 'high').length,
    medium: logs.filter(l => l.severity === 'medium').length,
    low: logs.filter(l => l.severity === 'low').length,
    jailbreak: logs.filter(l => l.violationType === 'jailbreak').length,
    selfHarm: logs.filter(l => l.violationType === 'self_harm').length,
  };
}
