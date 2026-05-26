"use client";

/**
 * USER PROGRESS BINDING
 * Namespaces all localStorage progress keys per user ID.
 * When a user logs in, their saved progress is restored.
 * When they log out, current progress is saved under their namespace and cleared.
 */

const PROGRESS_KEYS = [
  // Core progress
  "eal-progress",
  "eal-correction-ledger",
  "enrollment_date",
  // Gamification
  "eal_player_profile",
  // Day completions (1-14)
  ...Array.from({ length: 14 }, (_, i) => `day_${i + 1}_completed`),
  // Exercise scores per track per day
  ...["deepreal", "mental-health", "religion-hub"].flatMap(mvp =>
    Array.from({ length: 14 }, (_, i) => `eal-exercise-progress:${mvp}:${i + 1}`)
  ),
  // Report checkpoints
  "eal-report-checkpoint",
  // Research cohort
  "eal-research-cohort",
  // Dwell time
  "eal-dwell-session",
];

function canUseStorage(): boolean {
  return typeof window !== "undefined";
}

function userKey(userId: string, key: string): string {
  return `user:${userId}:${key}`;
}

let currentBoundUserId: string | null = null;

/**
 * Called on login/register/guest login.
 * Copies user-namespaced progress keys to unprefixed keys.
 */
export function bindUserProgress(userId: string): void {
  if (!canUseStorage()) return;

  try {
    // First, clear any existing unprefixed progress (from previous user)
    for (const key of PROGRESS_KEYS) {
      localStorage.removeItem(key);
    }

    // Restore this user's saved progress
    for (const key of PROGRESS_KEYS) {
      const saved = localStorage.getItem(userKey(userId, key));
      if (saved !== null) {
        localStorage.setItem(key, saved);
      }
    }

    currentBoundUserId = userId;
  } catch {
    /* silent — localStorage may be full or unavailable */
  }
}

/**
 * Called on logout.
 * Saves current unprefixed progress to user namespace, then clears it.
 */
export function unbindUserProgress(): void {
  if (!canUseStorage() || !currentBoundUserId) return;

  try {
    // Save current progress under user namespace
    saveCurrentProgress(currentBoundUserId);

    // Clear unprefixed keys
    for (const key of PROGRESS_KEYS) {
      localStorage.removeItem(key);
    }

    currentBoundUserId = null;
  } catch {
    /* silent */
  }
}

/**
 * Save current unprefixed progress keys to the user's namespace.
 * Called periodically and on beforeunload.
 */
export function saveCurrentProgress(userId: string): void {
  if (!canUseStorage()) return;

  try {
    for (const key of PROGRESS_KEYS) {
      const value = localStorage.getItem(key);
      if (value !== null) {
        localStorage.setItem(userKey(userId, key), value);
      }
    }
  } catch {
    /* silent */
  }
}

/**
 * Get the currently bound user ID.
 */
export function getBoundUserId(): string | null {
  return currentBoundUserId;
}

/**
 * Set the bound user ID without restoring progress.
 * Used on app init when session already exists.
 */
export function setBoundUserId(userId: string): void {
  currentBoundUserId = userId;
}

/**
 * Initialize auto-save on beforeunload.
 * Call once in the root layout or app init.
 */
export function initProgressAutoSave(): void {
  if (!canUseStorage()) return;

  const handleSave = () => {
    if (currentBoundUserId) {
      saveCurrentProgress(currentBoundUserId);
    }
  };

  window.addEventListener("beforeunload", handleSave);
  // Also save every 60 seconds
  setInterval(handleSave, 60_000);
}

export { PROGRESS_KEYS };
