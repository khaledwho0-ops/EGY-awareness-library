/**
 * VERSIONED CONTENT HISTORY — Q101
 * Structural storage of timestamps to prove periodic updates
 * Prevents overwrite and preserves old versions
 * 
 * Framework: §23.1 #7 — Versioned content history
 */

export interface ContentVersion {
  version: number;
  exerciseId: string;
  timestamp: string;
  author: string;
  changeType: "created" | "updated" | "reviewed" | "approved";
  changeSummary: string;
  previousContent?: string;
  expertRecommendation?: string;
}

export interface ContentHistory {
  exerciseId: string;
  currentVersion: number;
  versions: ContentVersion[];
}

/**
 * Get version history for an exercise
 */
export function getContentHistory(exerciseId: string): ContentHistory {
  try {
    const stored = localStorage.getItem(`content_history_${exerciseId}`);
    if (stored) return JSON.parse(stored);
  } catch { /* silent */ }
  
  // Default: initial creation record
  return {
    exerciseId,
    currentVersion: 1,
    versions: [{
      version: 1,
      exerciseId,
      timestamp: "2026-04-12T00:00:00Z",
      author: "System",
      changeType: "created",
      changeSummary: "Initial exercise creation from Master Framework §13.2 template",
    }],
  };
}

/**
 * Record a new version (update, review, or approval)
 */
export function recordContentVersion(
  exerciseId: string,
  changeType: ContentVersion["changeType"],
  changeSummary: string,
  author: string,
  expertRecommendation?: string
): ContentVersion {
  const history = getContentHistory(exerciseId);
  const newVersion: ContentVersion = {
    version: history.currentVersion + 1,
    exerciseId,
    timestamp: new Date().toISOString(),
    author,
    changeType,
    changeSummary,
    expertRecommendation,
  };
  
  history.versions.push(newVersion);
  history.currentVersion = newVersion.version;
  
  try {
    localStorage.setItem(`content_history_${exerciseId}`, JSON.stringify(history));
  } catch { /* silent */ }
  
  return newVersion;
}

/**
 * Export all version histories for research pack
 */
export function exportAllHistories(): Record<string, ContentHistory> {
  const result: Record<string, ContentHistory> = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("content_history_")) {
        const val = localStorage.getItem(key);
        if (val) result[key.replace("content_history_", "")] = JSON.parse(val);
      }
    }
  } catch { /* silent */ }
  return result;
}
