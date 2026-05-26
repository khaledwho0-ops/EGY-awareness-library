"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import { ExerciseEngine } from "@/components/exercises/exercise-engine";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Exercise } from "@/types";
import { recordExerciseCompletion } from "@/lib/progress/progress-service";
import { syncCurrentParticipantSnapshot } from "@/lib/research/research-ops";
import { useRTL } from "@/components/shared/rtl-provider";

// ─── JSON-first exercise imports (Chunk 5: full JSON pipeline) ───
import day01 from "@/data/exercises/deepreal/day-01.json";
import day02 from "@/data/exercises/deepreal/day-02.json";
import day03 from "@/data/exercises/deepreal/day-03.json";
import day04 from "@/data/exercises/deepreal/day-04.json";
import day05 from "@/data/exercises/deepreal/day-05.json";
import day06 from "@/data/exercises/deepreal/day-06.json";
import day07 from "@/data/exercises/deepreal/day-07.json";
import day08 from "@/data/exercises/deepreal/day-08.json";
import day09 from "@/data/exercises/deepreal/day-09.json";
import day10 from "@/data/exercises/deepreal/day-10.json";
import day11 from "@/data/exercises/deepreal/day-11.json";
import day12 from "@/data/exercises/deepreal/day-12.json";
import day13 from "@/data/exercises/deepreal/day-13.json";
import day14 from "@/data/exercises/deepreal/day-14.json";

// All 14 days loaded directly from validated JSON files with COM-B metadata
const EXERCISES: Record<string, Exercise> = {
  "1": day01 as unknown as Exercise,
  "2": day02 as unknown as Exercise,
  "3": day03 as unknown as Exercise,
  "4": day04 as unknown as Exercise,
  "5": day05 as unknown as Exercise,
  "6": day06 as unknown as Exercise,
  "7": day07 as unknown as Exercise,
  "8": day08 as unknown as Exercise,
  "9": day09 as unknown as Exercise,
  "10": day10 as unknown as Exercise,
  "11": day11 as unknown as Exercise,
  "12": day12 as unknown as Exercise,
  "13": day13 as unknown as Exercise,
  "14": day14 as unknown as Exercise,
};

/**
 * DeepReal Exercise Page — Framework §13.2
 *
 * Dynamic route: /deepreal/exercise/[day]
 * Renders the Exercise Engine with the correct exercise data for the given day.
 * Full 14-day program: 5 source + 5 detection + 4 bias (§16.2)
 */
export default function DeepRealExercisePage() {
  const params = useParams();
  const dayParam = params.day as string;
  // Accept both "1" and "day-01" formats
  const dayKey = dayParam.startsWith("day-") ? String(parseInt(dayParam.replace("day-", ""), 10)) : dayParam;
  const exercise = useMemo(() => EXERCISES[dayKey], [dayKey]);
  const { isRTL, t } = useRTL();
  const a = isRTL;

  if (!exercise) {
    return (
      <div style={{ paddingTop: "calc(var(--navbar-height) + var(--space-xl))" }}>
        <div className="container" style={{ textAlign: "center", padding: "var(--space-3xl) var(--space-lg)" }}>
          <h2>{t({ en: "Exercise Not Found", ar: "التمرين غير موجود", arEG: "التمرين غير موجود" })}</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>
            {a ? `تمرين اليوم ${dayParam} غير متوفر حالياً.` : `Day ${dayParam} exercise is not yet available. Stay tuned!`}
          </p>
          <Link href="/deepreal" className="btn-primary no-underline">
            <ArrowLeft size={14} style={{ transform: a ? "rotate(180deg)" : "none" }} /> {t({ en: "Back to DeepReal", ar: "العودة إلى ديب ريل", arEG: "العودة إلى ديب ريل" })}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "calc(var(--navbar-height) + var(--space-md))" }}>
      {/* Back button */}
      <div className="container" style={{ marginBottom: "var(--space-md)" }}>
        <Link
          href="/deepreal"
          className="flex items-center gap-1 no-underline"
          style={{ fontSize: "13px", color: "var(--text-muted)" }}
        >
          <ArrowLeft size={14} style={{ transform: a ? "rotate(180deg)" : "none" }} /> {t({ en: "Back to DeepReal", ar: "العودة إلى ديب ريل", arEG: "العودة إلى ديب ريل" })}
        </Link>
      </div>

      {/* Exercise Engine */}
      <div className="container" style={{ paddingBottom: "var(--space-3xl)" }}>
        <ExerciseEngine
          exercise={exercise}
          onComplete={(result) => {
            recordExerciseCompletion(
              result.exerciseId, "deepreal", Number(dayParam),
              result.score, result.maxScore, result.timeSpentSeconds,
              result.confidencePre, result.confidencePost,
              (exercise as Record<string, unknown>).com_b_target as string | undefined,
              (exercise as Record<string, unknown>).com_b_mechanism as string | undefined,
            );
            syncCurrentParticipantSnapshot();
          }}
        />
      </div>
    </div>
  );
}
