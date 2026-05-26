"use client";

/**
 * DRIP UI — Q92 (MoSCoW Framework)
 * Prevents students from completing all 14 exercises in one day
 * Enforces time-gated content release (1 day = 1 set of exercises)
 * 
 * Framework: §18 — MoSCoW scope constraint
 * COM-B: Opportunity-Physical — controls when content is available
 */

/**
 * Check if a specific day's exercises are unlocked
 * Rule: Day N unlocks only after Day N-1 is completed OR 24h have passed since Day N-1 unlock
 */
export function isDayUnlocked(_day: number): boolean {
  // ═══ ALL DAYS UNLOCKED FOR PILOT STUDY / EVALUATION ═══
  // The 14-day time-gate has been disabled so that evaluators,
  // the supervisor (Dr. Wael Al-Hilali), and N=84 pilot participants
  // can access all exercises and tests immediately.
  //
  // To re-enable time-gating for production, restore the original logic:
  // if (day <= 1) return true;
  // const prevCompleted = localStorage.getItem(`day_${day - 1}_completed`);
  // if (prevCompleted) return true;
  // const enrollmentDate = localStorage.getItem('enrollment_date');
  // if (!enrollmentDate) return day <= 1;
  // const enrolled = new Date(enrollmentDate);
  // const now = new Date();
  // const hoursSinceEnrollment = (now.getTime() - enrolled.getTime()) / (1000 * 60 * 60);
  // return hoursSinceEnrollment >= (day - 1) * 24;
  return true;
}

/**
 * Mark a day as completed (unlocks the next day)
 */
export function markDayCompleted(day: number): void {
  try {
    localStorage.setItem(`day_${day}_completed`, new Date().toISOString());
    // If no enrollment date set, set it now
    if (!localStorage.getItem('enrollment_date')) {
      localStorage.setItem('enrollment_date', new Date().toISOString());
    }
  } catch { /* silent */ }
}

/**
 * Get the current unlock status for all 14 days
 */
export function getDripStatus(): Array<{
  day: number;
  unlocked: boolean;
  completed: boolean;
  completedAt: string | null;
}> {
  return Array.from({ length: 14 }, (_, i) => {
    const day = i + 1;
    const completedAt = typeof window !== 'undefined'
      ? localStorage.getItem(`day_${day}_completed`)
      : null;
    return {
      day,
      unlocked: isDayUnlocked(day),
      completed: !!completedAt,
      completedAt,
    };
  });
}

/**
 * Get hours until next day unlocks
 */
export function getHoursUntilUnlock(day: number): number {
  if (isDayUnlocked(day)) return 0;

  try {
    const enrollmentDate = localStorage.getItem('enrollment_date');
    if (!enrollmentDate) return 24;

    const enrolled = new Date(enrollmentDate);
    const unlockTime = new Date(enrolled.getTime() + (day - 1) * 24 * 60 * 60 * 1000);
    const now = new Date();
    
    return Math.max(0, Math.ceil((unlockTime.getTime() - now.getTime()) / (1000 * 60 * 60)));
  } catch {
    return 24;
  }
}

/**
 * Initialize enrollment (called on Day 0 Baseline completion)
 */
export function initializeEnrollment(): void {
  try {
    if (!localStorage.getItem('enrollment_date')) {
      localStorage.setItem('enrollment_date', new Date().toISOString());
    }
  } catch { /* silent */ }
}
