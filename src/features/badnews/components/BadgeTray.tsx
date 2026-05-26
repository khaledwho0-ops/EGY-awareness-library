"use client";

import type { BadgeId } from "../data/badges";
import { BADGES } from "../data/badges";
import { motion } from "framer-motion";

interface Props {
  earnedBadges: BadgeId[];
}

export function BadgeTray({ earnedBadges }: Props) {
  return (
    <div className="bn-badge-tray">
      {BADGES.map((badge) => {
        const earned = earnedBadges.includes(badge.id as BadgeId);
        return (
          <div
            key={badge.id}
            className={`bn-badge-slot ${earned ? "bn-badge-earned" : ""}`}
            title={earned ? `${badge.name}: ${badge.description}` : "???"}
          >
            {earned && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bn-badge-glow"
              />
            )}
            {badge.icon ? (
              <img
                src={badge.icon}
                alt={badge.name}
                className="bn-badge-icon"
                style={{ opacity: earned ? 1 : 0.2, filter: earned ? "none" : "grayscale(1)" }}
              />
            ) : (
              <span className="bn-badge-initials">
                {badge.name.substring(0, 2).toUpperCase()}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
