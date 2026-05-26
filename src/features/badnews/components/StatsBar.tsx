"use client";

import { motion } from "framer-motion";
import { useRTL } from "@/components/shared/rtl-provider";

interface Props {
  followers: number;
  credibility: number;
}

export function StatsBar({ followers, credibility }: Props) {
  const { t } = useRTL();
  return (
    <div className="bn-stats">
      {/* Followers */}
      <div className="bn-stats-block">
        <span className="bn-stats-label">{t({ en: "Followers", ar: "المتابعون", arEG: "المتابعين" })}</span>
        <motion.span
          key={followers}
          initial={{ scale: 1.3, color: "#00c96b" }}
          animate={{ scale: 1, color: "#ffffff" }}
          transition={{ duration: 0.4 }}
          className="bn-stats-value"
        >
          {followers.toLocaleString()}
        </motion.span>
      </div>

      {/* Credibility */}
      <div className="bn-stats-block bn-stats-block-right">
        <span className="bn-stats-label">{t({ en: "Credibility", ar: "المصداقية", arEG: "المصداقية" })}</span>
        <div className="bn-credibility-bar">
          <motion.div
            className="bn-credibility-fill"
            initial={false}
            animate={{ width: `${Math.max(0, Math.min(100, credibility))}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}
