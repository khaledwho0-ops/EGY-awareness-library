interface CelebrationOptions {
  badgeCount?: number;
  leveledUp?: boolean;
  trackCompleted?: boolean;
}

export async function celebrateProgress({
  badgeCount = 0,
  leveledUp = false,
  trackCompleted = false,
}: CelebrationOptions): Promise<void> {
  if (typeof window === "undefined") {
    return;
  }

  const shouldCelebrate = badgeCount > 0 || leveledUp || trackCompleted;
  if (!shouldCelebrate) {
    return;
  }

  const { default: confetti } = await import("canvas-confetti");

  const baseParticleCount =
    80 +
    badgeCount * 25 +
    (leveledUp ? 40 : 0) +
    (trackCompleted ? 70 : 0);

  confetti({
    particleCount: baseParticleCount,
    spread: trackCompleted ? 100 : 72,
    startVelocity: trackCompleted ? 40 : 32,
    origin: { y: 0.7 },
    scalar: trackCompleted ? 1.05 : 0.95,
    colors: ["#0f766e", "#2563eb", "#f59e0b", "#7c3aed", "#16a34a"],
  });

  if (trackCompleted || badgeCount > 1) {
    setTimeout(() => {
      confetti({
        particleCount: Math.max(40, Math.round(baseParticleCount * 0.55)),
        spread: 120,
        startVelocity: 28,
        origin: { x: 0.2, y: 0.55 },
        colors: ["#16a34a", "#0ea5e9", "#f97316"],
      });
      confetti({
        particleCount: Math.max(40, Math.round(baseParticleCount * 0.55)),
        spread: 120,
        startVelocity: 28,
        origin: { x: 0.8, y: 0.55 },
        colors: ["#2563eb", "#eab308", "#7c3aed"],
      });
    }, 180);
  }
}
