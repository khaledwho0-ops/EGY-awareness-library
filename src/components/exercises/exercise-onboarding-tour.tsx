"use client";

import { useMemo, useState } from "react";
import { Joyride, STATUS } from "react-joyride";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CallBackProps = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Step = any;

interface ExerciseOnboardingTourProps {
  accentColor: string;
  mvp: "deepreal" | "mental-health" | "religion-hub";
  includeForensicsStep: boolean;
  includeSupportStep: boolean;
  visible: boolean;
}

export function ExerciseOnboardingTour({
  accentColor,
  mvp,
  includeForensicsStep,
  includeSupportStep,
  visible,
}: ExerciseOnboardingTourProps) {
  const storageKey = `eal-exercise-tour-complete:${mvp}`;
  const [completed, setCompleted] = useState(() =>
    typeof window !== "undefined" && localStorage.getItem(storageKey) === "true",
  );

  const steps = useMemo<Step[]>(() => {
    const baseSteps: Step[] = [
      {
        target: "#exercise-gamification",
        content: "This panel tracks level, streak, badges, and real progress through the current awareness track.",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      {
        target: "#exercise-verification",
        content: "Use this console to fact-check claims, check source quality, and open the live verification routes connected to the current exercise.",
      },
      {
        target: "#exercise-scenario",
        content: "This scenario is the actual learning target. Read it first before answering, and use the sentiment and readability badges to notice emotional pressure.",
      },
    ];

    if (includeForensicsStep) {
      baseSteps.push({
        target: "#exercise-forensics",
        content: "DeepReal exercises include a forensic workbench for metadata, provenance, reverse-image, and media integrity checks.",
      });
    }

    if (includeSupportStep) {
      baseSteps.push({
        target: "#exercise-support",
        content: "Mental Health and Religion Hub exercises keep formal support and guidance routes visible whenever the content requires escalation.",
      });
    }

    return baseSteps;
  }, [includeForensicsStep, includeSupportStep]);

  const handleCallback = (data: CallBackProps) => {
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(data.status)) {
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, "true");
      }
      setCompleted(true);
    }
  };

  if (!visible) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const JoyrideAny = Joyride as any;

  return (
    <JoyrideAny
      callback={handleCallback}
      continuous
      disableScrolling={false}
      hideCloseButton
      run={visible && !completed}
      scrollOffset={96}
      showProgress
      showSkipButton
      steps={steps}
      styles={{
        options: {
          primaryColor: accentColor,
          textColor: "#e2e8f0",
          backgroundColor: "#0f172a",
          overlayColor: "rgba(2, 6, 23, 0.6)",
          zIndex: 2000,
        },
        tooltip: {
          borderRadius: 16,
          boxShadow: "0 18px 60px rgba(15, 23, 42, 0.45)",
        },
      }}
    />
  );
}
