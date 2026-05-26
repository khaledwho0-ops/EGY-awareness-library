"use client";

import { useReducer, useEffect, useState, useCallback } from "react";
import type { ScenarioNode, Choice } from "../data/scenarios";
import { SCENARIOS, FIRST_NODE_ID } from "../data/scenarios";
import { BADGE_MAP, type BadgeId, type Badge } from "../data/badges";
import { AnimatePresence, motion } from "framer-motion";

import { useRTL } from "@/components/shared/rtl-provider";
import { IntroScreen } from "./IntroScreen";
import { GameOverScreen } from "./GameOverScreen";
import { StatsBar } from "./StatsBar";
import { BadgeTray } from "./BadgeTray";
import { ScenarioCard } from "./ScenarioCard";
import { BadgeUnlockModal } from "./BadgeUnlockModal";

// ═══════════════════════════════════════════════════════════
// STATE MACHINE
// ═══════════════════════════════════════════════════════════
type Phase = "INTRO" | "PLAYING" | "BADGE_UNLOCK" | "GAME_OVER";

export interface GameState {
  phase: Phase;
  currentNodeId: string | null;
  followers: number;
  credibility: number;
  earnedBadges: BadgeId[];
  variables: Record<string, string>;
  history: string[];           // track visited node ids
  pendingBadge: BadgeId | null;
}

type GameAction =
  | { type: "START"; playerName: string }
  | { type: "CHOOSE"; choice: Choice }
  | { type: "DISMISS_BADGE" }
  | { type: "RESTART" }
  | { type: "LOAD"; state: GameState };

const INITIAL_STATE: GameState = {
  phase: "INTRO",
  currentNodeId: null,
  followers: 0,
  credibility: 0,
  earnedBadges: [],
  variables: {},
  history: [],
  pendingBadge: null,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START":
      return {
        ...INITIAL_STATE,
        phase: "PLAYING",
        currentNodeId: FIRST_NODE_ID,
        variables: { player_name: action.playerName || "Player" },
      };

    case "CHOOSE": {
      const { choice } = action;
      const eff = choice.effects;
      const newFollowers = Math.max(0, state.followers + eff.followers);
      const newCredibility = Math.max(0, Math.min(100, state.credibility + eff.credibility));
      const newVars = { ...state.variables, ...eff.variables };
      const newBadges = [...state.earnedBadges];
      let pendingBadge: BadgeId | null = null;

      if (eff.badge && !newBadges.includes(eff.badge as BadgeId)) {
        newBadges.push(eff.badge as BadgeId);
        pendingBadge = eff.badge as BadgeId;
      }

      const nextNodeId = choice.goTo;
      const isGameOver = !nextNodeId || !SCENARIOS[nextNodeId];

      return {
        ...state,
        followers: newFollowers,
        credibility: newCredibility,
        variables: newVars,
        earnedBadges: newBadges,
        currentNodeId: isGameOver ? null : nextNodeId,
        history: [...state.history, state.currentNodeId!],
        phase: pendingBadge ? "BADGE_UNLOCK" : isGameOver ? "GAME_OVER" : "PLAYING",
        pendingBadge,
      };
    }

    case "DISMISS_BADGE": {
      const isGameOver = !state.currentNodeId || !SCENARIOS[state.currentNodeId];
      return {
        ...state,
        phase: isGameOver ? "GAME_OVER" : "PLAYING",
        pendingBadge: null,
      };
    }

    case "RESTART":
      return { ...INITIAL_STATE };

    case "LOAD":
      return action.state;

    default:
      return state;
  }
}

// ═══════════════════════════════════════════════════════════
// MAIN GAME COMPONENT
// ═══════════════════════════════════════════════════════════
export function BadNewsGame() {
  const { t } = useRTL();
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);
  const [mounted, setMounted] = useState(false);

  // Load saved progress
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("badnews_progress");
      if (saved) {
        const parsed = JSON.parse(saved) as GameState;
        if (parsed.phase && parsed.phase !== "INTRO") {
          dispatch({ type: "LOAD", state: parsed });
        }
      }
    } catch {}
  }, []);

  // Persist progress
  useEffect(() => {
    if (!mounted) return;
    if (state.phase !== "INTRO") {
      localStorage.setItem("badnews_progress", JSON.stringify(state));
    } else {
      localStorage.removeItem("badnews_progress");
    }
  }, [state, mounted]);

  const handleStart = useCallback((playerName: string) => {
    dispatch({ type: "START", playerName });
  }, []);

  const handleChoice = useCallback((choice: Choice) => {
    dispatch({ type: "CHOOSE", choice });
  }, []);

  const handleDismissBadge = useCallback(() => {
    dispatch({ type: "DISMISS_BADGE" });
  }, []);

  const handleRestart = useCallback(() => {
    dispatch({ type: "RESTART" });
  }, []);

  const currentNode: ScenarioNode | null =
    state.currentNodeId ? SCENARIOS[state.currentNodeId] ?? null : null;

  const pendingBadgeData: Badge | null =
    state.pendingBadge ? BADGE_MAP[state.pendingBadge] ?? null : null;

  if (!mounted) return null;

  return (
    <div className="bn-root">
      {/* Stats bar — always visible when not on intro */}
      {state.phase !== "INTRO" && (
        <StatsBar
          followers={state.followers}
          credibility={state.credibility}
        />
      )}

      {/* Badge tray */}
      {state.phase !== "INTRO" && (
        <BadgeTray earnedBadges={state.earnedBadges} />
      )}

      {/* Main content area */}
      <main className="bn-main">
        <AnimatePresence mode="wait">
          {state.phase === "INTRO" && (
            <motion.div key="intro" exit={{ opacity: 0, y: -20 }} className="bn-page">
              <IntroScreen onStart={handleStart} />
            </motion.div>
          )}

          {(state.phase === "PLAYING" || state.phase === "BADGE_UNLOCK") && currentNode && (
            <motion.div
              key={currentNode.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="bn-page"
            >
              <ScenarioCard
                node={currentNode}
                variables={state.variables}
                onChoice={handleChoice}
              />
            </motion.div>
          )}

          {state.phase === "GAME_OVER" && (
            <motion.div key="gameover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bn-page">
              <GameOverScreen
                followers={state.followers}
                credibility={state.credibility}
                badges={state.earnedBadges}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Attribution footer */}
      <footer className="bn-footer">
        {t({ en: "Bad News was created by DROG and the University of Cambridge. Original game:", ar: "لعبة Bad News من إنتاج DROG وجامعة كامبريدج. اللعبة الأصلية:", arEG: "لعبة Bad News من إنتاج DROG وجامعة كامبريدج. اللعبة الأصلية:" })}{" "}
        <a href="https://www.getbadnews.com" target="_blank" rel="noopener noreferrer" className="bn-footer-link">
          getbadnews.com
        </a>
      </footer>

      {/* Badge unlock modal */}
      <BadgeUnlockModal badge={pendingBadgeData} onClose={handleDismissBadge} />
    </div>
  );
}
