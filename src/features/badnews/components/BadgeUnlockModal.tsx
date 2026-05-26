"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRTL } from "@/components/shared/rtl-provider";
import type { Badge } from "../data/badges";

interface Props {
  badge: Badge | null;
  onClose: () => void;
}

export function BadgeUnlockModal({ badge, onClose }: Props) {
  const { t } = useRTL();
  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bn-modal-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.7, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.7, y: 30 }}
            transition={{ type: "spring", damping: 15 }}
            className="bn-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bn-modal-label">{t({ en: "Badge Unlocked!", ar: "تم فتح الشارة!", arEG: "الشارة اتفتحت!" })}</div>

            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.2 }}
              className="bn-modal-badge-circle"
            >
              <div className="bn-modal-badge-ping" />
              {badge.icon ? (
                <img src={badge.icon} alt={badge.name} className="bn-modal-badge-img" />
              ) : (
                <div className="bn-modal-badge-fallback">
                  {badge.name.substring(0, 2).toUpperCase()}
                </div>
              )}
            </motion.div>

            <h3 className="bn-modal-title">{badge.name}</h3>
            <p className="bn-modal-desc">{badge.expandedDescription || badge.description}</p>

            <button onClick={onClose} className="bn-btn-primary bn-modal-btn">
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
