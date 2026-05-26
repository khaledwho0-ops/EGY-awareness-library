"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRTL } from "@/components/shared/rtl-provider";

interface Props {
  onStart: (playerName: string) => void;
}

export function IntroScreen({ onStart }: Props) {
  const { t } = useRTL();
  const [name, setName] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bn-intro"
    >
      {/* Decorative glow */}
      <div className="bn-intro-glow" />

      <h1 className="bn-intro-title">{t({ en: "Bad News", ar: "Bad News", arEG: "Bad News" })}</h1>

      <p className="bn-intro-subtitle">
        {t({ en: "You are about to enter the world of disinformation. Can you become a fake news tycoon? Get as many followers as you can while maintaining your credibility!", ar: "أنت على وشك دخول عالم التضليل. هل تستطيع أن تصبح إمبراطور أخبار مزيفة؟ اجمع أكبر عدد من المتابعين مع الحفاظ على مصداقيتك!", arEG: "إنت على وشك تدخل عالم التضليل. تقدر تبقى إمبراطور أخبار مزيفة؟ اجمع أكبر عدد متابعين وحافظ على مصداقيتك!" })}
      </p>

      <div className="bn-intro-badges-preview">
        <span className="bn-intro-badge-label">{t({ en: "6 Badges to Unlock", ar: "٦ شارات للفتح", arEG: "٦ شارات تفتحهم" })}</span>
        <div className="bn-intro-badge-dots">
          {["IM", "EM", "PO", "CO", "DI", "TR"].map((b) => (
            <div key={b} className="bn-intro-badge-dot">{b}</div>
          ))}
        </div>
      </div>

      <form
        className="bn-intro-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) onStart(name.trim());
        }}
      >
        <label className="bn-intro-label" htmlFor="bn-player-name">
          {t({ en: "Enter your tycoon name", ar: "أدخل اسمك في اللعبة", arEG: "اكتب اسمك في اللعبة" })}
        </label>
        <input
          id="bn-player-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t({ en: "e.g. TheTruthTeller", ar: "مثلاً: كاشف_الحقيقة", arEG: "مثلاً: كاشف_الحقيقة" })}
          className="bn-intro-input"
          required
          autoComplete="off"
        />
        <button type="submit" className="bn-btn-primary" disabled={!name.trim()}>
          {t({ en: "Play the Game", ar: "ابدأ اللعبة", arEG: "ابدأ اللعبة" })}
        </button>
      </form>
    </motion.div>
  );
}
