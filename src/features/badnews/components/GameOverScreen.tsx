"use client";

import { motion } from "framer-motion";
import { useRTL } from "@/components/shared/rtl-provider";
import type { BadgeId } from "../data/badges";
import { BADGE_MAP } from "../data/badges";

interface Props {
  followers: number;
  credibility: number;
  badges: BadgeId[];
  onRestart: () => void;
}

export function GameOverScreen({ followers, credibility, badges, onRestart }: Props) {
  const { t } = useRTL();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bn-gameover"
    >
      <h2 className="bn-gameover-title">{t({ en: "Game Over", ar: "انتهت اللعبة", arEG: "اللعبة خلصت" })}</h2>

      <p className="bn-gameover-subtitle">
        {t({ en: "You've built your fake news empire. Now you know the tricks of the trade.", ar: "لقد بنيت إمبراطوريتك المزيفة. الآن تعرف حيل التضليل.", arEG: "بنيت إمبراطوريتك المزيفة. دلوقتي عارف حيل التضليل." })}
      </p>

      {/* Final stats */}
      <div className="bn-gameover-stats">
        <div className="bn-gameover-stat">
          <span className="bn-gameover-stat-value bn-color-followers">
            {followers.toLocaleString()}
          </span>
          <span className="bn-gameover-stat-label">{t({ en: "Followers", ar: "المتابعون", arEG: "المتابعين" })}</span>
        </div>
        <div className="bn-gameover-stat-divider" />
        <div className="bn-gameover-stat">
          <span className="bn-gameover-stat-value bn-color-credibility">
            {credibility}
          </span>
          <span className="bn-gameover-stat-label">{t({ en: "Credibility", ar: "المصداقية", arEG: "المصداقية" })}</span>
        </div>
      </div>

      {/* Earned badges */}
      {badges.length > 0 && (
        <div className="bn-gameover-badges">
          <h3 className="bn-gameover-badges-title">{t({ en: "Badges Earned", ar: "الشارات المكتسبة", arEG: "الشارات اللي كسبتها" })}</h3>
          <div className="bn-gameover-badges-grid">
            {badges.map((bid) => {
              const b = BADGE_MAP[bid];
              return (
                <div key={bid} className="bn-gameover-badge">
                  {b?.icon ? (
                    <img src={b.icon} alt={b.name} className="bn-gameover-badge-icon" />
                  ) : (
                    <div className="bn-gameover-badge-placeholder">
                      {bid.substring(0, 2)}
                    </div>
                  )}
                  <span className="bn-gameover-badge-name">{b?.name ?? bid}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="bn-gameover-actions">
        <button onClick={onRestart} className="bn-btn-primary">
          Play Again
        </button>
        <button
          onClick={() => {
            const text = `I just played Bad News and got ${followers.toLocaleString()} followers! Can you beat my score? #BadNewsGame`;
            window.open(
              `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
              "_blank"
            );
          }}
          className="bn-btn-secondary"
        >
          Share on Twitter
        </button>
      </div>
    </motion.div>
  );
}
