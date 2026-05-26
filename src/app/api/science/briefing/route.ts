import { NextResponse } from "next/server";
import {
  AUDIENCE_RISK_PROFILES,
  AWARENESS_STANDARD_BLUEPRINT,
  FLAG_LIBRARY,
  SCIENCE_SIGNALS,
  TRUST_LEADERS,
  UPDATE_METHODS,
  type FlagFamily,
  type ScienceDomain,
} from "@/data/research/scientific-intelligence";

function matchesQuery(values: string[], query: string) {
  if (!query.trim()) return true;
  const normalized = query.trim().toLowerCase();
  return values.join(" ").toLowerCase().includes(normalized);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = (searchParams.get("domain") ?? "all") as ScienceDomain | "all";
  const query = searchParams.get("q") ?? "";
  const family = (searchParams.get("family") ?? "red") as FlagFamily;

  const signals = SCIENCE_SIGNALS.filter((signal) => {
    if (domain !== "all" && signal.domain !== domain) return false;
    return matchesQuery(
      [signal.title, signal.summary, signal.source, signal.whyItMatters],
      query
    );
  });

  const audiences = AUDIENCE_RISK_PROFILES.filter((profile) => {
    if (domain !== "all" && profile.domain !== domain) return false;
    return matchesQuery(
      [profile.audience, profile.audienceAr, profile.threat, profile.likelyHarm, profile.protectiveMove],
      query
    );
  });

  const sources = TRUST_LEADERS.filter((source) =>
    matchesQuery(
      [source.name, source.whyTrusted, source.whyWeUseIt, source.trustSignals.join(" ")],
      query
    )
  );

  const flags = FLAG_LIBRARY.filter((flag) => {
    if (flag.family !== family) return false;
    if (domain !== "all" && flag.domain !== domain) return false;
    return matchesQuery([flag.title, flag.cue, flag.whyItMatters, flag.counterMove], query);
  }).slice(0, 24);

  const updates = UPDATE_METHODS.filter((method) => {
    if (domain !== "all" && method.domain !== domain) return false;
    return matchesQuery([method.title, method.action, method.whyItWorks, method.sourceAnchor], query);
  }).slice(0, 24);

  return NextResponse.json({
    filters: {
      domain,
      family,
      query,
    },
    metrics: {
      signals: SCIENCE_SIGNALS.length,
      audiences: AUDIENCE_RISK_PROFILES.length,
      sources: TRUST_LEADERS.length,
      flags: FLAG_LIBRARY.length,
      updates: UPDATE_METHODS.length,
      standards: AWARENESS_STANDARD_BLUEPRINT.length,
    },
    collections: {
      signals,
      audiences,
      sources,
      flags,
      updates,
      standards: AWARENESS_STANDARD_BLUEPRINT,
    },
  });
}
