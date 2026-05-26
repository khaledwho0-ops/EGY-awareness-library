/**
 * GAMIFICATION XP ENGINE — Chunk 5.1/5.2/5.3
 * 
 * Scientific basis:
 * - Deterding et al. (2012): Gamification framework for non-game contexts
 * - Deci & Ryan (2000): Self-Determination Theory (autonomy, competence, relatedness)
 * - Fogg (2009): Behavior Model (B=MAT: Motivation × Ability × Trigger)
 * - Hamari et al. (2014): Meta-analysis showing 60-80% engagement increase
 * 
 * Architecture: localStorage-based (no backend needed for pilot).
 * Tracks XP, levels, badges, streaks, and completion across all 3 MVPs.
 */

// ════════════════════════════════════════════════════════════════
// TYPES
// ════════════════════════════════════════════════════════════════

export interface PlayerProfile {
  participantId: string;
  totalXP: number;
  level: number;
  levelName: string;
  badges: Badge[];
  streakDays: number;
  lastActiveDate: string; // ISO date
  completedExercises: string[]; // exercise IDs
  mvpProgress: {
    deepreal: number;   // 0-14
    mentalHealth: number;
    religionHub: number;
  };
  xpHistory: XPEvent[];
  awardedKeys: string[];
}

export interface XPEvent {
  timestamp: string;
  amount: number;
  source: XPSource;
  exerciseId?: string;
  description: string;
}

export type XPSource =
  | "exercise_complete"
  | "gate_verified"
  | "streak_bonus"
  | "badge_unlock"
  | "assessment_complete"
  | "source_verified"
  | "mvp_complete"
  | "perfect_score";

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  mvp: "deepreal" | "mental-health" | "religion-hub" | "global";
  unlockedAt: string | null;
  requirement: string;
}

// ════════════════════════════════════════════════════════════════
// XP REWARDS TABLE (Balanced for 14-day engagement)
// ════════════════════════════════════════════════════════════════

export const XP_REWARDS: Record<XPSource, number> = {
  exercise_complete: 100,
  gate_verified: 50,        // 8-Gate Check passed
  streak_bonus: 200,        // 3+ day streak
  badge_unlock: 150,
  assessment_complete: 300,  // Completing a psychometric instrument
  source_verified: 25,      // Each source clicked and verified
  mvp_complete: 1000,       // All 14 exercises in one MVP
  perfect_score: 500,       // 100% on any assessment
};

// ════════════════════════════════════════════════════════════════
// LEVEL SYSTEM (SDT: Competence through visible progression)
// ════════════════════════════════════════════════════════════════

export const LEVELS = [
  { threshold: 0,    name: "Novice",      icon: "🌱" },
  { threshold: 300,  name: "Observer",    icon: "👁️" },
  { threshold: 800,  name: "Apprentice",  icon: "📚" },
  { threshold: 1500, name: "Analyst",     icon: "🔍" },
  { threshold: 2500, name: "Investigator", icon: "🕵️" },
  { threshold: 4000, name: "Guardian",    icon: "🛡️" },
  { threshold: 6000, name: "Scholar",     icon: "🎓" },
  { threshold: 8500, name: "Expert",      icon: "⭐" },
  { threshold: 12000, name: "Master",     icon: "👑" },
];

// ════════════════════════════════════════════════════════════════
// BADGE REGISTRY — 21 Badges (7 per MVP)
// ════════════════════════════════════════════════════════════════

export const BADGE_REGISTRY: Badge[] = [
  // DeepReal Badges
  { id: "dr-sift", name: "SIFT Master", icon: "🔎", description: "Applied the SIFT method successfully 5 times", mvp: "deepreal", unlockedAt: null, requirement: "5 exercises with source verification" },
  { id: "dr-source", name: "Source Hunter", icon: "🎯", description: "Verified 10 sources using the Trusted Directory", mvp: "deepreal", unlockedAt: null, requirement: "10 source verifications" },
  { id: "dr-deepfake", name: "Deepfake Detective", icon: "🕵️", description: "Correctly identified 3 manipulated media items", mvp: "deepreal", unlockedAt: null, requirement: "3 thumbnail trap correct answers" },
  { id: "dr-factcheck", name: "Fact-Check Pro", icon: "✅", description: "Used live fact-check API on 5 claims", mvp: "deepreal", unlockedAt: null, requirement: "5 fact-check queries" },
  { id: "dr-forensic", name: "Media Forensic", icon: "🔬", description: "Analyzed 3 images for manipulation", mvp: "deepreal", unlockedAt: null, requirement: "3 forensic analyses" },
  { id: "dr-inoculation", name: "Inoculation Shield", icon: "💉", description: "Completed all Myth Autopsy exercises", mvp: "deepreal", unlockedAt: null, requirement: "All myth autopsy modes" },
  { id: "dr-guardian", name: "Digital Guardian", icon: "🛡️", description: "Completed all 14 DeepReal exercises", mvp: "deepreal", unlockedAt: null, requirement: "14/14 exercises" },

  // Mental Health Badges
  { id: "mh-stigma", name: "Stigma Breaker", icon: "💪", description: "Completed 3 stigma reduction scenarios", mvp: "mental-health", unlockedAt: null, requirement: "3 stigma exercises" },
  { id: "mh-seeker", name: "Help-Seeker", icon: "🤝", description: "Explored all help-seeking pathways", mvp: "mental-health", unlockedAt: null, requirement: "GHSQ assessment complete" },
  { id: "mh-emotion", name: "Emotion Reader", icon: "🎭", description: "Identified emotional triggers in 5 claims", mvp: "mental-health", unlockedAt: null, requirement: "5 emotion detections" },
  { id: "mh-resilience", name: "Resilience Builder", icon: "🏗️", description: "Completed 7 consecutive days", mvp: "mental-health", unlockedAt: null, requirement: "7-day streak" },
  { id: "mh-scholar", name: "MHL Scholar", icon: "📖", description: "Scored 80%+ on MHLS assessment", mvp: "mental-health", unlockedAt: null, requirement: "MHLS score ≥80%" },
  { id: "mh-coping", name: "Coping Strategist", icon: "🧩", description: "Identified positive vs negative coping in 5 exercises", mvp: "mental-health", unlockedAt: null, requirement: "5 coping exercises" },
  { id: "mh-champion", name: "Wellbeing Champion", icon: "🌟", description: "Completed all 14 Mental Health exercises", mvp: "mental-health", unlockedAt: null, requirement: "14/14 exercises" },

  // Religion Hub Badges
  { id: "rh-verifier", name: "Source Verifier", icon: "📜", description: "Cross-referenced 5 religious claims with scholarly sources", mvp: "religion-hub", unlockedAt: null, requirement: "5 source cross-references" },
  { id: "rh-hadith", name: "Hadith Scholar", icon: "📚", description: "Verified hadith authenticity grades in 3 exercises", mvp: "religion-hub", unlockedAt: null, requirement: "3 hadith verifications" },
  { id: "rh-science", name: "Faith & Science", icon: "⚗️", description: "Explored the relationship between faith and evidence-based care", mvp: "religion-hub", unlockedAt: null, requirement: "3 faith-science exercises" },
  { id: "rh-antiexploit", name: "Anti-Exploitation", icon: "🚫", description: "Identified 3 cases of religious text misuse", mvp: "religion-hub", unlockedAt: null, requirement: "3 exploitation identifications" },
  { id: "rh-analyst", name: "Sacred Text Analyst", icon: "🔍", description: "Used AlQuran API to verify 3 Quranic references", mvp: "religion-hub", unlockedAt: null, requirement: "3 Quran verifications" },
  { id: "rh-bridge", name: "Interfaith Bridge", icon: "🌉", description: "Completed cross-cultural understanding exercises", mvp: "religion-hub", unlockedAt: null, requirement: "3 cross-cultural exercises" },
  { id: "rh-coper", name: "Spiritual Coper", icon: "🕊️", description: "Completed all 14 Religion Hub exercises", mvp: "religion-hub", unlockedAt: null, requirement: "14/14 exercises" },
];

// ════════════════════════════════════════════════════════════════
// CORE ENGINE FUNCTIONS
// ════════════════════════════════════════════════════════════════

const STORAGE_KEY = "eal_player_profile";

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function getMVPStorageKey(mvp: "deepreal" | "mental-health" | "religion-hub"): keyof PlayerProfile["mvpProgress"] {
  switch (mvp) {
    case "mental-health":
      return "mentalHealth";
    case "religion-hub":
      return "religionHub";
    default:
      return "deepreal";
  }
}

function getExercisePrefix(mvp: "deepreal" | "mental-health" | "religion-hub"): string {
  switch (mvp) {
    case "mental-health":
      return "mh-";
    case "religion-hub":
      return "rh-";
    default:
      return "dr-";
  }
}

/**
 * Get or create player profile from localStorage.
 */
export function getPlayerProfile(): PlayerProfile {
  if (typeof window === "undefined") return createDefaultProfile();

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as Partial<PlayerProfile>;
      return {
        ...createDefaultProfile(),
        ...parsed,
        badges: parsed.badges ?? BADGE_REGISTRY.map((badge) => ({ ...badge })),
        mvpProgress: {
          ...createDefaultProfile().mvpProgress,
          ...parsed.mvpProgress,
        },
        xpHistory: parsed.xpHistory ?? [],
        completedExercises: parsed.completedExercises ?? [],
        awardedKeys: parsed.awardedKeys ?? [],
      };
    } catch {
      return createDefaultProfile();
    }
  }
  return createDefaultProfile();
}

function createDefaultProfile(): PlayerProfile {
  return {
    participantId: `P-${Date.now().toString(36)}`,
    totalXP: 0,
    level: 0,
    levelName: "Novice",
    badges: BADGE_REGISTRY.map((b) => ({ ...b })),
    streakDays: 0,
    lastActiveDate: "",
    completedExercises: [],
    mvpProgress: { deepreal: 0, mentalHealth: 0, religionHub: 0 },
    xpHistory: [],
    awardedKeys: [],
  };
}

function saveProfile(profile: PlayerProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

/**
 * Calculate current level from total XP.
 */
function calculateLevel(xp: number): { level: number; name: string; icon: string } {
  let current = LEVELS[0];
  for (const lvl of LEVELS) {
    if (xp >= lvl.threshold) current = lvl;
    else break;
  }
  return { level: LEVELS.indexOf(current), name: current.name, icon: current.icon };
}

/**
 * Award XP to the player. Returns the updated profile + any new badges.
 */
export function awardXP(
  source: XPSource,
  exerciseId?: string,
  description?: string,
  dedupeKey?: string,
): { profile: PlayerProfile; newBadges: Badge[]; leveledUp: boolean } {
  const profile = getPlayerProfile();
  const oldLevel = profile.level;
  const rewardKey = dedupeKey ?? (exerciseId ? `${source}:${exerciseId}` : undefined);

  if (rewardKey && profile.awardedKeys.includes(rewardKey)) {
    return { profile, newBadges: [], leveledUp: false };
  }

  const amount = XP_REWARDS[source];

  // Add XP
  profile.totalXP += amount;
  profile.xpHistory.push({
    timestamp: new Date().toISOString(),
    amount,
    source,
    exerciseId,
    description: description || `${source}: +${amount} XP`,
  });
  if (rewardKey) {
    profile.awardedKeys.push(rewardKey);
  }

  // Update level
  // Track exercise completion
  if (exerciseId && !profile.completedExercises.includes(exerciseId)) {
    profile.completedExercises.push(exerciseId);
  }

  // Update streak
  const today = getToday();
  if (profile.lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (profile.lastActiveDate === yesterday) {
      profile.streakDays += 1;
      // Streak bonus at 3, 7, 14 days
      if ([3, 7, 14].includes(profile.streakDays)) {
        profile.totalXP += XP_REWARDS.streak_bonus;
        profile.xpHistory.push({
          timestamp: new Date().toISOString(),
          amount: XP_REWARDS.streak_bonus,
          source: "streak_bonus",
          description: `🔥 ${profile.streakDays}-day streak bonus!`,
        });
      }
    } else if (profile.lastActiveDate !== today) {
      profile.streakDays = 1; // Reset streak
    }
    profile.lastActiveDate = today;
  }

  // Check for new badges
  const newBadges = checkBadgeUnlocks(profile);
  if (newBadges.length > 0) {
    newBadges.forEach((badge) => {
      profile.xpHistory.push({
        timestamp: badge.unlockedAt ?? new Date().toISOString(),
        amount: XP_REWARDS.badge_unlock,
        source: "badge_unlock",
        description: `Unlocked badge: ${badge.name}`,
      });
    });
  }

  const { level, name } = calculateLevel(profile.totalXP);
  profile.level = level;
  profile.levelName = name;
  const leveledUp = level > oldLevel;

  saveProfile(profile);
  return { profile, newBadges, leveledUp };
}

/**
 * Check if any badges should be unlocked based on current progress.
 */
function checkBadgeUnlocks(profile: PlayerProfile): Badge[] {
  const newlyUnlocked: Badge[] = [];

  for (const badge of profile.badges) {
    if (badge.unlockedAt) continue; // Already unlocked

    let shouldUnlock = false;

    switch (badge.id) {
      // DeepReal badges
      case "dr-guardian":
        shouldUnlock = profile.mvpProgress.deepreal >= 14;
        break;
      case "dr-sift":
        shouldUnlock = profile.completedExercises.filter((e) => e.startsWith("dr-")).length >= 5;
        break;

      // Mental Health badges
      case "mh-champion":
        shouldUnlock = profile.mvpProgress.mentalHealth >= 14;
        break;
      case "mh-resilience":
        shouldUnlock = profile.streakDays >= 7;
        break;

      // Religion Hub badges
      case "rh-coper":
        shouldUnlock = profile.mvpProgress.religionHub >= 14;
        break;

      // Generic progress-based badges
      default:
        // Unlock based on exercise count in MVP
        if (badge.mvp === "deepreal") {
          shouldUnlock = profile.completedExercises.filter((e) => e.startsWith("dr-")).length >= 3;
        } else if (badge.mvp === "mental-health") {
          shouldUnlock = profile.completedExercises.filter((e) => e.startsWith("mh-")).length >= 3;
        } else if (badge.mvp === "religion-hub") {
          shouldUnlock = profile.completedExercises.filter((e) => e.startsWith("rh-")).length >= 3;
        }
    }

    if (shouldUnlock) {
      badge.unlockedAt = new Date().toISOString();
      newlyUnlocked.push(badge);
      profile.totalXP += XP_REWARDS.badge_unlock;
    }
  }

  return newlyUnlocked;
}

/**
 * Get progress percentage toward next level.
 */
export function getLevelProgress(profile: PlayerProfile): {
  currentXP: number;
  nextLevelXP: number;
  progressPercent: number;
} {
  const currentThreshold = LEVELS[profile.level]?.threshold || 0;
  const nextThreshold = LEVELS[profile.level + 1]?.threshold || LEVELS[LEVELS.length - 1].threshold;
  const progress = profile.totalXP - currentThreshold;
  const needed = nextThreshold - currentThreshold;

  return {
    currentXP: profile.totalXP,
    nextLevelXP: nextThreshold,
    progressPercent: needed > 0 ? Math.min(Math.round((progress / needed) * 100), 100) : 100,
  };
}

/**
 * Get cohort social proof stats (anonymous).
 */
export function getCohortStats(): {
  avgCompletion: number;
  topStreakDays: number;
  participantsActive: number;
} {
  if (typeof window === "undefined") {
    return {
      avgCompletion: 0,
      topStreakDays: 0,
      participantsActive: 0,
    };
  }

  type CohortSnapshot = {
    exercisesCompleted?: number;
    streakDays?: number;
  };

  try {
    const cohort = JSON.parse(localStorage.getItem("eal-research-cohort") || "[]") as CohortSnapshot[];
    const currentProgress = JSON.parse(localStorage.getItem("eal-progress") || "{}") as {
      exercises?: unknown[];
      streak?: number;
    };

    const exercisesCompleted = Array.isArray(currentProgress.exercises)
      ? currentProgress.exercises.length
      : 0;
    const currentStreak = typeof currentProgress.streak === "number" ? currentProgress.streak : 0;

    const normalizedSnapshots = cohort.length > 0
      ? cohort
      : [{ exercisesCompleted, streakDays: currentStreak }];

    const completionValues = normalizedSnapshots.map((entry) =>
      Math.min(100, Math.round(((entry.exercisesCompleted ?? 0) / 42) * 100)),
    );
    const avgCompletion = completionValues.length > 0
      ? Math.round(completionValues.reduce((sum, value) => sum + value, 0) / completionValues.length)
      : 0;
    const topStreakDays = normalizedSnapshots.reduce(
      (best, entry) => Math.max(best, entry.streakDays ?? 0),
      0,
    );

    return {
      avgCompletion,
      topStreakDays,
      participantsActive: normalizedSnapshots.length,
    };
  } catch {
    const progress = JSON.parse(localStorage.getItem("eal-progress") || "{}") as {
      exercises?: unknown[];
      streak?: number;
    };
    const exercisesCompleted = Array.isArray(progress.exercises) ? progress.exercises.length : 0;
    const avgCompletion = Math.min(100, Math.round((exercisesCompleted / 42) * 100));
    return {
      avgCompletion,
      topStreakDays: typeof progress.streak === "number" ? progress.streak : 0,
      participantsActive: exercisesCompleted > 0 ? 1 : 0,
    };
  }
}

/**
 * Update MVP-specific progress counter.
 */
export function updateMVPProgress(mvp: "deepreal" | "mental-health" | "religion-hub"): void {
  const profile = getPlayerProfile();
  const storageKey = getMVPStorageKey(mvp);
  const prefix = getExercisePrefix(mvp);
  profile.mvpProgress[storageKey] = profile.completedExercises.filter((exerciseId) => exerciseId.startsWith(prefix)).length;
  saveProfile(profile);
}

export function getMVPProgress(profile: PlayerProfile, mvp: "deepreal" | "mental-health" | "religion-hub"): number {
  return profile.mvpProgress[getMVPStorageKey(mvp)];
}
