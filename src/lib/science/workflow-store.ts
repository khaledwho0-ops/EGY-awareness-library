import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
// node:sqlite is dynamically imported in getDatabase() — it requires Node.js 22.5+
// and is unavailable on Vercel's Node 20 runtime.
type DatabaseSync = import("node:sqlite").DatabaseSync;
import { DEEPREAL_GAME_MODES as DEEPREAL_GAME_MODE_DEFINITIONS, type DeepRealGameModeId } from "@/data/research/deepreal-game";
import { SCIENCE_SIGNALS, TRUST_LEADERS, UPDATE_METHODS } from "@/data/research/scientific-intelligence";
import type { ModuleId } from "@/data/research/module-briefings";

export interface ModuleWorkflowState {
  completedStepIds: string[];
  selectedRuleIds: string[];
  selectedScenarioIds: string[];
  selectedExerciseIds: string[];
  selectedMythIds: string[];
  selectedTrickIds: string[];
  selectedReverseIds: string[];
  guideSeenAt: string;
  guideEmotionKey: string;
  updatedAt: string;
}

export interface WorkflowStore {
  modules: Record<ModuleId, ModuleWorkflowState>;
  lastRefreshAt: string | null;
}

export interface DeepRealGameHistoryEntry {
  roundId: string;
  choiceId: string;
  correct: boolean;
  scoreDelta: number;
  answeredAt: string;
}

export interface DeepRealGameProgress {
  modeId: DeepRealGameModeId;
  currentRoundIndex: number;
  score: number;
  completedRounds: number;
  perfectRounds: number;
  history: DeepRealGameHistoryEntry[];
  isComplete: boolean;
  updatedAt: string;
}

export interface ScienceSourceRecord {
  id: string;
  name: string;
  category: string;
  scope: string;
  url: string;
  whyTrusted: string;
  whyWeUseIt: string;
  trustSignals: string[];
  sourceType: "leader" | "signal";
  publicationYear: number | null;
  appliedModules: ModuleId[];
  lastSyncedAt: string;
  freshness: "reference" | "current" | "monitor" | "archive";
}

export interface ScienceRefreshRun {
  id: number;
  triggeredAt: string;
  sourceCount: number;
  signalCount: number;
  updateMethodCount: number;
  note: string;
}

export interface ScienceRefreshSummary {
  lastRefreshAt: string | null;
  sourceCount: number;
  signalCount: number;
  updateMethodCount: number;
  history: ScienceRefreshRun[];
  sources: ScienceSourceRecord[];
}

const MODULE_IDS: ModuleId[] = ["deepreal", "mental-health", "religion-hub"];
const DEEPREAL_GAME_MODES: DeepRealGameModeId[] = DEEPREAL_GAME_MODE_DEFINITIONS.map((mode) => mode.id);

const EMPTY_MODULE_STATE: ModuleWorkflowState = {
  completedStepIds: [],
  selectedRuleIds: [],
  selectedScenarioIds: [],
  selectedExerciseIds: [],
  selectedMythIds: [],
  selectedTrickIds: [],
  selectedReverseIds: [],
  guideSeenAt: "",
  guideEmotionKey: "",
  updatedAt: "",
};

const EMPTY_STORE: WorkflowStore = {
  modules: {
    deepreal: { ...EMPTY_MODULE_STATE },
    "mental-health": { ...EMPTY_MODULE_STATE },
    "religion-hub": { ...EMPTY_MODULE_STATE },
  },
  lastRefreshAt: null,
};

const SQLITE_PATH = path.join(process.cwd(), ".runtime", "science.db");
const LEGACY_JSON_PATH = path.join(process.cwd(), ".runtime", "science-workflow.json");

let database: DatabaseSync | null = null;
let sqliteUnavailable = false;

type WorkflowRow = {
  module_id: ModuleId;
  completed_step_ids: string;
  selected_rule_ids: string;
  selected_scenario_ids: string;
  selected_exercise_ids: string;
  selected_myth_ids: string;
  selected_trick_ids: string;
  selected_reverse_ids: string;
  guide_seen_at: string;
  guide_emotion_key: string;
  updated_at: string;
};

type GameProgressRow = {
  mode_id: DeepRealGameModeId;
  current_round_index: number;
  score: number;
  completed_rounds: number;
  perfect_rounds: number;
  history_json: string;
  is_complete: number;
  updated_at: string;
};

type RefreshRow = {
  id: number;
  triggered_at: string;
  source_count: number;
  signal_count: number;
  update_method_count: number;
  note: string;
};

type SourceRow = {
  id: string;
  name: string;
  category: string;
  scope: string;
  url: string;
  why_trusted: string;
  why_we_use_it: string;
  trust_signals_json: string;
  source_type: "leader" | "signal";
  publication_year: number | null;
  applied_modules_json: string;
  last_synced_at: string;
  freshness: "reference" | "current" | "monitor" | "archive";
};

function ensureRuntimeDir() {
  mkdirSync(path.dirname(SQLITE_PATH), { recursive: true });
}

function getDatabase() {
  if (sqliteUnavailable) {
    return null;
  }

  if (database) {
    return database;
  }

  try {
    ensureRuntimeDir();
    // Dynamic require — node:sqlite only exists in Node.js 22.5+
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { DatabaseSync: SqliteDatabase } = require("node:sqlite") as { DatabaseSync: new (path: string) => DatabaseSync };
    database = new SqliteDatabase(SQLITE_PATH);
    database.exec(`
      CREATE TABLE IF NOT EXISTS module_workflow (
        module_id TEXT PRIMARY KEY,
        completed_step_ids TEXT NOT NULL DEFAULT '[]',
        selected_rule_ids TEXT NOT NULL DEFAULT '[]',
        selected_scenario_ids TEXT NOT NULL DEFAULT '[]',
        selected_exercise_ids TEXT NOT NULL DEFAULT '[]',
        selected_myth_ids TEXT NOT NULL DEFAULT '[]',
        selected_trick_ids TEXT NOT NULL DEFAULT '[]',
        selected_reverse_ids TEXT NOT NULL DEFAULT '[]',
        guide_seen_at TEXT NOT NULL DEFAULT '',
        guide_emotion_key TEXT NOT NULL DEFAULT '',
        updated_at TEXT NOT NULL DEFAULT ''
      );

      CREATE TABLE IF NOT EXISTS refresh_runs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        triggered_at TEXT NOT NULL,
        source_count INTEGER NOT NULL,
        signal_count INTEGER NOT NULL,
        update_method_count INTEGER NOT NULL,
        note TEXT NOT NULL DEFAULT ''
      );

      CREATE TABLE IF NOT EXISTS source_registry (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        scope TEXT NOT NULL,
        url TEXT NOT NULL,
        why_trusted TEXT NOT NULL,
        why_we_use_it TEXT NOT NULL,
        trust_signals_json TEXT NOT NULL,
        source_type TEXT NOT NULL,
        publication_year INTEGER,
        applied_modules_json TEXT NOT NULL,
        last_synced_at TEXT NOT NULL,
        freshness TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS deepreal_game_progress (
        mode_id TEXT PRIMARY KEY,
        current_round_index INTEGER NOT NULL DEFAULT 0,
        score INTEGER NOT NULL DEFAULT 0,
        completed_rounds INTEGER NOT NULL DEFAULT 0,
        perfect_rounds INTEGER NOT NULL DEFAULT 0,
        history_json TEXT NOT NULL DEFAULT '[]',
        is_complete INTEGER NOT NULL DEFAULT 0,
        updated_at TEXT NOT NULL DEFAULT ''
      );
    `);

    ensureWorkflowTableColumns(database);
    migrateLegacyJsonIfNeeded(database);
    seedModuleRows(database);
    seedSourceRegistry(database);
    seedGameRows(database);
    return database;
  } catch {
    sqliteUnavailable = true;
    database = null;
    return null;
  }
}

function seedModuleRows(db: DatabaseSync) {
  const statement = db.prepare(`
    INSERT INTO module_workflow (
      module_id,
      completed_step_ids,
      selected_rule_ids,
      selected_scenario_ids,
      selected_exercise_ids,
      guide_seen_at,
      guide_emotion_key,
      updated_at
    ) VALUES (?, '[]', '[]', '[]', '[]', '', '', '')
    ON CONFLICT(module_id) DO NOTHING
  `);

  for (const moduleId of MODULE_IDS) {
    statement.run(moduleId);
  }
}

function ensureWorkflowTableColumns(db: DatabaseSync) {
  const statements = [
    "ALTER TABLE module_workflow ADD COLUMN selected_myth_ids TEXT NOT NULL DEFAULT '[]'",
    "ALTER TABLE module_workflow ADD COLUMN selected_trick_ids TEXT NOT NULL DEFAULT '[]'",
    "ALTER TABLE module_workflow ADD COLUMN selected_reverse_ids TEXT NOT NULL DEFAULT '[]'",
  ];

  for (const statement of statements) {
    try {
      db.exec(statement);
    } catch {
      // Column already exists on upgraded databases.
    }
  }
}

function seedGameRows(db: DatabaseSync) {
  const statement = db.prepare(`
    INSERT INTO deepreal_game_progress (
      mode_id,
      current_round_index,
      score,
      completed_rounds,
      perfect_rounds,
      history_json,
      is_complete,
      updated_at
    ) VALUES (?, 0, 0, 0, 0, '[]', 0, '')
    ON CONFLICT(mode_id) DO NOTHING
  `);

  for (const modeId of DEEPREAL_GAME_MODES) {
    statement.run(modeId);
  }
}

function seedSourceRegistry(db: DatabaseSync) {
  const row = db.prepare("SELECT COUNT(*) as count FROM source_registry").get() as { count: number } | undefined;
  if ((row?.count ?? 0) > 0) {
    return;
  }

  const upsert = db.prepare(`
    INSERT INTO source_registry (
      id,
      name,
      category,
      scope,
      url,
      why_trusted,
      why_we_use_it,
      trust_signals_json,
      source_type,
      publication_year,
      applied_modules_json,
      last_synced_at,
      freshness
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO NOTHING
  `);

  for (const source of getSourceSeeds()) {
    upsert.run(
      source.id,
      source.name,
      source.category,
      source.scope,
      source.url,
      source.whyTrusted,
      source.whyWeUseIt,
      JSON.stringify(source.trustSignals),
      source.sourceType,
      source.publicationYear,
      JSON.stringify(source.appliedModules),
      "",
      source.freshness
    );
  }
}

function migrateLegacyJsonIfNeeded(db: DatabaseSync) {
  const row = db.prepare("SELECT COUNT(*) as count FROM module_workflow").get() as { count: number } | undefined;
  if (!existsSync(LEGACY_JSON_PATH) || (row?.count ?? 0) > 0) {
    return;
  }

  try {
    const legacy = JSON.parse(readFileSync(LEGACY_JSON_PATH, "utf8")) as WorkflowStore;
    const upsert = db.prepare(`
      INSERT INTO module_workflow (
        module_id,
        completed_step_ids,
        selected_rule_ids,
        selected_scenario_ids,
        selected_exercise_ids,
        selected_myth_ids,
        selected_trick_ids,
        selected_reverse_ids,
        guide_seen_at,
        guide_emotion_key,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(module_id) DO UPDATE SET
        completed_step_ids = excluded.completed_step_ids,
        selected_rule_ids = excluded.selected_rule_ids,
        selected_scenario_ids = excluded.selected_scenario_ids,
        selected_exercise_ids = excluded.selected_exercise_ids,
        selected_myth_ids = excluded.selected_myth_ids,
        selected_trick_ids = excluded.selected_trick_ids,
        selected_reverse_ids = excluded.selected_reverse_ids,
        guide_seen_at = excluded.guide_seen_at,
        guide_emotion_key = excluded.guide_emotion_key,
        updated_at = excluded.updated_at
    `);

    for (const moduleId of MODULE_IDS) {
      const state = {
        ...EMPTY_MODULE_STATE,
        ...legacy.modules?.[moduleId],
      };
      upsert.run(
        moduleId,
        JSON.stringify(state.completedStepIds),
        JSON.stringify(state.selectedRuleIds),
        JSON.stringify(state.selectedScenarioIds),
        JSON.stringify(state.selectedExerciseIds),
        JSON.stringify(state.selectedMythIds),
        JSON.stringify(state.selectedTrickIds),
        JSON.stringify(state.selectedReverseIds),
        state.guideSeenAt,
        state.guideEmotionKey,
        state.updatedAt
      );
    }

    if (legacy.lastRefreshAt) {
      db.prepare(`
        INSERT INTO refresh_runs (triggered_at, source_count, signal_count, update_method_count, note)
        VALUES (?, ?, ?, ?, ?)
      `).run(
        legacy.lastRefreshAt,
        getTrackedSourceCount(),
        SCIENCE_SIGNALS.length,
        UPDATE_METHODS.length,
        "Imported from legacy JSON store"
      );
    }
  } catch {
    // Keep going; the JSON file remains as the fallback source if parsing fails.
  }
}

function parseStringArray(raw: string) {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function parseGameHistory(raw: string): DeepRealGameHistoryEntry[] {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item): item is DeepRealGameHistoryEntry => {
      return Boolean(
        item &&
          typeof item === "object" &&
          typeof item.roundId === "string" &&
          typeof item.choiceId === "string" &&
          typeof item.correct === "boolean" &&
          typeof item.scoreDelta === "number" &&
          typeof item.answeredAt === "string"
      );
    });
  } catch {
    return [];
  }
}

function createEmptyGameProgress(modeId: DeepRealGameModeId): DeepRealGameProgress {
  return {
    modeId,
    currentRoundIndex: 0,
    score: 0,
    completedRounds: 0,
    perfectRounds: 0,
    history: [],
    isComplete: false,
    updatedAt: "",
  };
}

function toModuleState(row?: WorkflowRow): ModuleWorkflowState {
  if (!row) {
    return { ...EMPTY_MODULE_STATE };
  }

  return {
    completedStepIds: parseStringArray(row.completed_step_ids),
    selectedRuleIds: parseStringArray(row.selected_rule_ids),
    selectedScenarioIds: parseStringArray(row.selected_scenario_ids),
    selectedExerciseIds: parseStringArray(row.selected_exercise_ids),
    selectedMythIds: parseStringArray(row.selected_myth_ids),
    selectedTrickIds: parseStringArray(row.selected_trick_ids),
    selectedReverseIds: parseStringArray(row.selected_reverse_ids),
    guideSeenAt: row.guide_seen_at ?? "",
    guideEmotionKey: row.guide_emotion_key ?? "",
    updatedAt: row.updated_at ?? "",
  };
}

function getJsonStorePath() {
  return LEGACY_JSON_PATH;
}

function readJsonStore(): WorkflowStore {
  try {
    const raw = readFileSync(getJsonStorePath(), "utf8");
    const parsed = JSON.parse(raw) as WorkflowStore;
    return {
      ...EMPTY_STORE,
      ...parsed,
      modules: {
        deepreal: { ...EMPTY_MODULE_STATE, ...parsed.modules?.deepreal },
        "mental-health": { ...EMPTY_MODULE_STATE, ...parsed.modules?.["mental-health"] },
        "religion-hub": { ...EMPTY_MODULE_STATE, ...parsed.modules?.["religion-hub"] },
      },
    };
  } catch {
    return EMPTY_STORE;
  }
}

function writeJsonStore(store: WorkflowStore) {
  ensureRuntimeDir();
  writeFileSync(getJsonStorePath(), JSON.stringify(store, null, 2), "utf8");
}

function getSourceSeeds() {
  const seeds = new Map<string, ScienceSourceRecord>();

  for (const leader of TRUST_LEADERS) {
    seeds.set(leader.id, {
      id: leader.id,
      name: leader.name,
      category: leader.category,
      scope: leader.scope,
      url: leader.url,
      whyTrusted: leader.whyTrusted,
      whyWeUseIt: leader.whyWeUseIt,
      trustSignals: leader.trustSignals,
      sourceType: "leader",
      publicationYear: null,
      appliedModules: MODULE_IDS,
      lastSyncedAt: "",
      freshness: "reference",
    });
  }

  for (const signal of SCIENCE_SIGNALS) {
    const existing = Array.from(seeds.values()).find((seed) => seed.url === signal.url);
    if (existing) {
      const nextModules = new Set<ModuleId>([...existing.appliedModules, ...signal.appliedTo]);
      seeds.set(existing.id, { ...existing, appliedModules: Array.from(nextModules) });
      continue;
    }

    const id = `signal-${signal.id}`;
    const currentYear = new Date().getFullYear();
    const age = currentYear - signal.year;
    const freshness = age <= 1 ? "current" : age <= 3 ? "monitor" : "archive";

    seeds.set(id, {
      id,
      name: signal.source,
      category: signal.domain,
      scope: signal.region,
      url: signal.url,
      whyTrusted: signal.summary,
      whyWeUseIt: signal.whyItMatters,
      trustSignals: [signal.value, `${signal.year}`, ...signal.appliedTo],
      sourceType: "signal",
      publicationYear: signal.year,
      appliedModules: signal.appliedTo,
      lastSyncedAt: "",
      freshness,
    });
  }

  return Array.from(seeds.values());
}

function getTrackedSourceCount() {
  return getSourceSeeds().length;
}

function setRefreshTimestamp(db: DatabaseSync, triggeredAt: string, note: string, sourceCount = getTrackedSourceCount()) {
  db.prepare(`
    INSERT INTO refresh_runs (triggered_at, source_count, signal_count, update_method_count, note)
    VALUES (?, ?, ?, ?, ?)
  `).run(triggeredAt, sourceCount, SCIENCE_SIGNALS.length, UPDATE_METHODS.length, note);
}

function readLatestRefreshAt(db: DatabaseSync) {
  const row = db.prepare(`
    SELECT triggered_at
    FROM refresh_runs
    ORDER BY triggered_at DESC, id DESC
    LIMIT 1
  `).get() as { triggered_at: string } | undefined;

  return row?.triggered_at ?? null;
}

export async function readWorkflowStore(): Promise<WorkflowStore> {
  const db = getDatabase();
  if (!db) {
    return readJsonStore();
  }

  const rows = db.prepare(`
    SELECT
      module_id,
      completed_step_ids,
      selected_rule_ids,
      selected_scenario_ids,
      selected_exercise_ids,
      selected_myth_ids,
      selected_trick_ids,
      selected_reverse_ids,
      guide_seen_at,
      guide_emotion_key,
      updated_at
    FROM module_workflow
  `).all() as WorkflowRow[];

  const modules = {
    deepreal: { ...EMPTY_MODULE_STATE },
    "mental-health": { ...EMPTY_MODULE_STATE },
    "religion-hub": { ...EMPTY_MODULE_STATE },
  } satisfies Record<ModuleId, ModuleWorkflowState>;

  for (const row of rows) {
    modules[row.module_id] = toModuleState(row);
  }

  return {
    modules,
    lastRefreshAt: readLatestRefreshAt(db),
  };
}

export async function writeWorkflowStore(store: WorkflowStore) {
  const db = getDatabase();
  if (!db) {
    writeJsonStore(store);
    return;
  }

  const statement = db.prepare(`
    INSERT INTO module_workflow (
      module_id,
      completed_step_ids,
      selected_rule_ids,
      selected_scenario_ids,
      selected_exercise_ids,
      selected_myth_ids,
      selected_trick_ids,
      selected_reverse_ids,
      guide_seen_at,
      guide_emotion_key,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(module_id) DO UPDATE SET
      completed_step_ids = excluded.completed_step_ids,
      selected_rule_ids = excluded.selected_rule_ids,
      selected_scenario_ids = excluded.selected_scenario_ids,
      selected_exercise_ids = excluded.selected_exercise_ids,
      selected_myth_ids = excluded.selected_myth_ids,
      selected_trick_ids = excluded.selected_trick_ids,
      selected_reverse_ids = excluded.selected_reverse_ids,
      guide_seen_at = excluded.guide_seen_at,
      guide_emotion_key = excluded.guide_emotion_key,
      updated_at = excluded.updated_at
  `);

  for (const moduleId of MODULE_IDS) {
    const state = {
      ...EMPTY_MODULE_STATE,
      ...store.modules[moduleId],
    };
    statement.run(
      moduleId,
      JSON.stringify(state.completedStepIds),
      JSON.stringify(state.selectedRuleIds),
      JSON.stringify(state.selectedScenarioIds),
      JSON.stringify(state.selectedExerciseIds),
      JSON.stringify(state.selectedMythIds),
      JSON.stringify(state.selectedTrickIds),
      JSON.stringify(state.selectedReverseIds),
      state.guideSeenAt,
      state.guideEmotionKey,
      state.updatedAt
    );
  }

  const latestRefreshAt = readLatestRefreshAt(db);
  if (store.lastRefreshAt && latestRefreshAt !== store.lastRefreshAt) {
    setRefreshTimestamp(db, store.lastRefreshAt, "Workflow store sync");
  }
}

export async function updateModuleWorkflow(
  module: ModuleId,
  updater: (state: ModuleWorkflowState) => ModuleWorkflowState
) {
  const store = await readWorkflowStore();
  store.modules[module] = {
    ...updater(store.modules[module]),
    updatedAt: new Date().toISOString(),
  };
  await writeWorkflowStore(store);
  return store.modules[module];
}

export async function readDeepRealGameProgress(modeId: DeepRealGameModeId): Promise<DeepRealGameProgress> {
  const db = getDatabase();
  if (!db) {
    return createEmptyGameProgress(modeId);
  }

  const row = db.prepare(`
    SELECT
      mode_id,
      current_round_index,
      score,
      completed_rounds,
      perfect_rounds,
      history_json,
      is_complete,
      updated_at
    FROM deepreal_game_progress
    WHERE mode_id = ?
    LIMIT 1
  `).get(modeId) as GameProgressRow | undefined;

  if (!row) {
    return createEmptyGameProgress(modeId);
  }

  return {
    modeId: row.mode_id,
    currentRoundIndex: row.current_round_index,
    score: row.score,
    completedRounds: row.completed_rounds,
    perfectRounds: row.perfect_rounds,
    history: parseGameHistory(row.history_json),
    isComplete: Boolean(row.is_complete),
    updatedAt: row.updated_at,
  };
}

export async function updateDeepRealGameProgress(
  modeId: DeepRealGameModeId,
  updater: (state: DeepRealGameProgress) => DeepRealGameProgress
): Promise<DeepRealGameProgress> {
  const db = getDatabase();
  const currentState = await readDeepRealGameProgress(modeId);
  const nextState = {
    ...updater(currentState),
    modeId,
    updatedAt: new Date().toISOString(),
  };

  if (!db) {
    return nextState;
  }

  db.prepare(`
    INSERT INTO deepreal_game_progress (
      mode_id,
      current_round_index,
      score,
      completed_rounds,
      perfect_rounds,
      history_json,
      is_complete,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(mode_id) DO UPDATE SET
      current_round_index = excluded.current_round_index,
      score = excluded.score,
      completed_rounds = excluded.completed_rounds,
      perfect_rounds = excluded.perfect_rounds,
      history_json = excluded.history_json,
      is_complete = excluded.is_complete,
      updated_at = excluded.updated_at
  `).run(
    modeId,
    nextState.currentRoundIndex,
    nextState.score,
    nextState.completedRounds,
    nextState.perfectRounds,
    JSON.stringify(nextState.history),
    nextState.isComplete ? 1 : 0,
    nextState.updatedAt
  );

  return nextState;
}

export async function recordScienceRefresh(note = "Manual refresh pipeline run") {
  const db = getDatabase();
  const now = new Date().toISOString();

  if (!db) {
    const store = readJsonStore();
    store.lastRefreshAt = now;
    writeJsonStore(store);
    return {
      ok: true,
      lastRefreshAt: now,
      sourceCount: getTrackedSourceCount(),
      signalCount: SCIENCE_SIGNALS.length,
      updateMethodCount: UPDATE_METHODS.length,
      history: [{
        id: Date.now(),
        triggeredAt: now,
        sourceCount: getTrackedSourceCount(),
        signalCount: SCIENCE_SIGNALS.length,
        updateMethodCount: UPDATE_METHODS.length,
        note
      }] as ScienceRefreshRun[],
      sources: getSourceSeeds(),
    };
  }

  const upsert = db.prepare(`
    INSERT INTO source_registry (
      id,
      name,
      category,
      scope,
      url,
      why_trusted,
      why_we_use_it,
      trust_signals_json,
      source_type,
      publication_year,
      applied_modules_json,
      last_synced_at,
      freshness
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      category = excluded.category,
      scope = excluded.scope,
      url = excluded.url,
      why_trusted = excluded.why_trusted,
      why_we_use_it = excluded.why_we_use_it,
      trust_signals_json = excluded.trust_signals_json,
      source_type = excluded.source_type,
      publication_year = excluded.publication_year,
      applied_modules_json = excluded.applied_modules_json,
      last_synced_at = excluded.last_synced_at,
      freshness = excluded.freshness
  `);

  for (const source of getSourceSeeds()) {
    upsert.run(
      source.id,
      source.name,
      source.category,
      source.scope,
      source.url,
      source.whyTrusted,
      source.whyWeUseIt,
      JSON.stringify(source.trustSignals),
      source.sourceType,
      source.publicationYear,
      JSON.stringify(source.appliedModules),
      now,
      source.freshness
    );
  }

  setRefreshTimestamp(db, now, note, getTrackedSourceCount());
  return {
    ok: true,
    ...(await getScienceRefreshSummary()),
  };
}

export async function getScienceRefreshSummary(limit = 8): Promise<ScienceRefreshSummary> {
  const db = getDatabase();
  if (!db) {
    const fallback = readJsonStore();
    const now = fallback.lastRefreshAt || new Date().toISOString();
    return {
      lastRefreshAt: fallback.lastRefreshAt,
      sourceCount: getTrackedSourceCount(),
      signalCount: SCIENCE_SIGNALS.length,
      updateMethodCount: UPDATE_METHODS.length,
      history: [{
        id: Date.now(),
        triggeredAt: now,
        sourceCount: getTrackedSourceCount(),
        signalCount: SCIENCE_SIGNALS.length,
        updateMethodCount: UPDATE_METHODS.length,
        note: "Fallback history record"
      }] as ScienceRefreshRun[],
      sources: getSourceSeeds(),
    };
  }

  const historyRows = db.prepare(`
    SELECT id, triggered_at, source_count, signal_count, update_method_count, note
    FROM refresh_runs
    ORDER BY triggered_at DESC, id DESC
    LIMIT ?
  `).all(limit) as RefreshRow[];

  const sourceRows = db.prepare(`
    SELECT
      id,
      name,
      category,
      scope,
      url,
      why_trusted,
      why_we_use_it,
      trust_signals_json,
      source_type,
      publication_year,
      applied_modules_json,
      last_synced_at,
      freshness
    FROM source_registry
    ORDER BY last_synced_at DESC, name ASC
    LIMIT ?
  `).all(Math.max(limit * 2, 12)) as SourceRow[];

    const countRow = db.prepare("SELECT COUNT(*) as count FROM source_registry").get() as { count: number } | undefined;

    return {
      lastRefreshAt: readLatestRefreshAt(db),
      sourceCount: countRow?.count ?? 0,
      signalCount: SCIENCE_SIGNALS.length,
      updateMethodCount: UPDATE_METHODS.length,
      history: historyRows.map((row) => ({
      id: row.id,
      triggeredAt: row.triggered_at,
      sourceCount: row.source_count,
      signalCount: row.signal_count,
      updateMethodCount: row.update_method_count,
      note: row.note,
    })),
    sources: sourceRows.map((row) => ({
      id: row.id,
      name: row.name,
      category: row.category,
      scope: row.scope,
      url: row.url,
      whyTrusted: row.why_trusted,
      whyWeUseIt: row.why_we_use_it,
      trustSignals: parseStringArray(row.trust_signals_json),
      sourceType: row.source_type,
      publicationYear: row.publication_year,
      appliedModules: parseStringArray(row.applied_modules_json).filter(
        (item): item is ModuleId => MODULE_IDS.includes(item as ModuleId)
      ),
      lastSyncedAt: row.last_synced_at,
      freshness: row.freshness,
    })),
  };
}
