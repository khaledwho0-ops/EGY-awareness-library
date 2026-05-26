import {
  getDeepRealGameMode,
  type DeepRealGameChoice,
  type DeepRealGameModeDefinition,
  type DeepRealGameModeId,
  type DeepRealGameRound,
} from "@/data/research/deepreal-game";
import {
  readDeepRealGameProgress,
  updateDeepRealGameProgress,
  type DeepRealGameHistoryEntry,
  type DeepRealGameProgress,
} from "./workflow-store";

export interface DeepRealGameResolution {
  roundId: string;
  choiceId: string;
  correct: boolean;
  scoreDelta: number;
  effectLabel: DeepRealGameChoice["effectLabel"];
  feedback: DeepRealGameChoice["feedback"];
  lesson: DeepRealGameChoice["lesson"];
}

export interface DeepRealGamePayload {
  mode: DeepRealGameModeDefinition;
  progress: DeepRealGameProgress;
  currentRound: DeepRealGameRound | null;
  totalRounds: number;
  remainingRounds: number;
  completionRate: number;
  lastResolution: DeepRealGameResolution | null;
}

function buildPayload(
  mode: DeepRealGameModeDefinition,
  progress: DeepRealGameProgress,
  lastResolution: DeepRealGameResolution | null = null
): DeepRealGamePayload {
  const totalRounds = mode.rounds.length;
  const currentRound = progress.isComplete ? null : mode.rounds[progress.currentRoundIndex] ?? null;

  return {
    mode,
    progress,
    currentRound,
    totalRounds,
    remainingRounds: Math.max(totalRounds - progress.completedRounds, 0),
    completionRate: totalRounds === 0 ? 0 : Math.round((progress.completedRounds / totalRounds) * 100),
    lastResolution,
  };
}

function toHistoryEntry(choice: DeepRealGameChoice, roundId: string): DeepRealGameHistoryEntry {
  return {
    roundId,
    choiceId: choice.id,
    correct: choice.correct,
    scoreDelta: choice.scoreDelta,
    answeredAt: new Date().toISOString(),
  };
}

export async function getDeepRealGamePayload(modeId: DeepRealGameModeId): Promise<DeepRealGamePayload> {
  const mode = getDeepRealGameMode(modeId);
  const progress = await readDeepRealGameProgress(modeId);
  return buildPayload(mode, progress);
}

export async function resetDeepRealGame(modeId: DeepRealGameModeId): Promise<DeepRealGamePayload> {
  const mode = getDeepRealGameMode(modeId);
  const progress = await updateDeepRealGameProgress(modeId, () => ({
    modeId,
    currentRoundIndex: 0,
    score: 0,
    completedRounds: 0,
    perfectRounds: 0,
    history: [],
    isComplete: false,
    updatedAt: "",
  }));

  return buildPayload(mode, progress);
}

export async function answerDeepRealGameRound(
  modeId: DeepRealGameModeId,
  choiceId: string
): Promise<DeepRealGamePayload | null> {
  const mode = getDeepRealGameMode(modeId);
  const round = mode.rounds[(await readDeepRealGameProgress(modeId)).currentRoundIndex];
  if (!round) {
    return null;
  }

  const choice = round.choices.find((item) => item.id === choiceId);
  if (!choice) {
    return null;
  }

  const lastResolution: DeepRealGameResolution = {
    roundId: round.id,
    choiceId: choice.id,
    correct: choice.correct,
    scoreDelta: choice.scoreDelta,
    effectLabel: choice.effectLabel,
    feedback: choice.feedback,
    lesson: choice.lesson,
  };

  const progress = await updateDeepRealGameProgress(modeId, (current) => {
    const nextHistory = [...current.history, toHistoryEntry(choice, round.id)];
    const nextCompleted = Math.min(current.completedRounds + 1, mode.rounds.length);
    const nextPerfect = choice.correct ? current.perfectRounds + 1 : current.perfectRounds;
    const nextIndex = Math.min(current.currentRoundIndex + 1, mode.rounds.length);
    const isComplete = nextCompleted >= mode.rounds.length;

    return {
      ...current,
      score: current.score + choice.scoreDelta,
      completedRounds: nextCompleted,
      perfectRounds: nextPerfect,
      currentRoundIndex: isComplete ? mode.rounds.length : nextIndex,
      history: nextHistory,
      isComplete,
    };
  });

  return buildPayload(mode, progress, lastResolution);
}
