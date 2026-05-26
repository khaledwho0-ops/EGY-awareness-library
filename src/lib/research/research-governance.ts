export interface ReviewerSignoff {
  approved: boolean;
  reviewerName: string;
  reviewerRole: string;
  affiliation: string;
  signedAt: string;
  notes: string;
}

export interface ResearchGovernanceState {
  participantLanguage: "english" | "arabic";
  sourcePolicyConfirmed: boolean;
  directoriesRechecked: {
    hotline16328: boolean;
    ambulance123: boolean;
    mohpPlatform: boolean;
    darAlIfta107: boolean;
  };
  reviewerSignoffs: {
    deepreal: ReviewerSignoff;
    mentalHealth: ReviewerSignoff;
    religionHub: ReviewerSignoff;
  };
}

const GOVERNANCE_KEY = "eal-research-governance";

const EMPTY_SIGNOFF: ReviewerSignoff = {
  approved: false,
  reviewerName: "",
  reviewerRole: "",
  affiliation: "",
  signedAt: "",
  notes: "",
};

const DEFAULT_STATE: ResearchGovernanceState = {
  participantLanguage: "english",
  sourcePolicyConfirmed: true,
  directoriesRechecked: {
    hotline16328: true,
    ambulance123: true,
    mohpPlatform: true,
    darAlIfta107: true,
  },
  reviewerSignoffs: {
    deepreal: { ...EMPTY_SIGNOFF, reviewerRole: "DeepReal reviewer" },
    mentalHealth: { ...EMPTY_SIGNOFF, reviewerRole: "Mental Health reviewer" },
    religionHub: { ...EMPTY_SIGNOFF, reviewerRole: "Religion Hub reviewer" },
  },
};

export function getResearchGovernance(): ResearchGovernanceState {
  if (typeof window === "undefined") {
    return structuredClone(DEFAULT_STATE);
  }

  try {
    const raw = localStorage.getItem(GOVERNANCE_KEY);
    if (!raw) {
      return structuredClone(DEFAULT_STATE);
    }

    const parsed = JSON.parse(raw) as Partial<ResearchGovernanceState>;
    return {
      ...structuredClone(DEFAULT_STATE),
      ...parsed,
      directoriesRechecked: {
        ...DEFAULT_STATE.directoriesRechecked,
        ...(parsed.directoriesRechecked ?? {}),
      },
      reviewerSignoffs: {
        deepreal: {
          ...DEFAULT_STATE.reviewerSignoffs.deepreal,
          ...(parsed.reviewerSignoffs?.deepreal ?? {}),
        },
        mentalHealth: {
          ...DEFAULT_STATE.reviewerSignoffs.mentalHealth,
          ...(parsed.reviewerSignoffs?.mentalHealth ?? {}),
        },
        religionHub: {
          ...DEFAULT_STATE.reviewerSignoffs.religionHub,
          ...(parsed.reviewerSignoffs?.religionHub ?? {}),
        },
      },
    };
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

export function saveResearchGovernance(state: ResearchGovernanceState): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(GOVERNANCE_KEY, JSON.stringify(state));
}

export function getParticipantLaunchGate(state: ResearchGovernanceState): {
  ready: boolean;
  blockers: string[];
} {
  const blockers: string[] = [];

  if (!state.reviewerSignoffs.deepreal.approved) {
    blockers.push("DeepReal reviewer signoff missing.");
  }
  if (!state.reviewerSignoffs.mentalHealth.approved) {
    blockers.push("Mental Health reviewer signoff missing.");
  }
  if (!state.reviewerSignoffs.religionHub.approved) {
    blockers.push("Religion Hub reviewer signoff missing.");
  }
  if (!state.directoriesRechecked.hotline16328) {
    blockers.push("Hotline 16328 has not been rechecked for this launch window.");
  }
  if (!state.directoriesRechecked.ambulance123) {
    blockers.push("Emergency ambulance 123 has not been rechecked for this launch window.");
  }
  if (!state.directoriesRechecked.mohpPlatform) {
    blockers.push("MoHP mental-health platform has not been rechecked for this launch window.");
  }
  if (!state.directoriesRechecked.darAlIfta107) {
    blockers.push("Dar al-Ifta 107 has not been rechecked for this launch window.");
  }
  if (!state.sourcePolicyConfirmed) {
    blockers.push("Source policy confirmation is incomplete.");
  }
  if (state.participantLanguage === "arabic") {
    blockers.push("Arabic participant deployment remains gated for part of the assessment battery.");
  }

  return {
    ready: blockers.length === 0,
    blockers,
  };
}
