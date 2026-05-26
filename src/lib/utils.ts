import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to merge Tailwind CSS classes with clsx.
 * Resolves conflicting classes intelligently.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * MVP identifiers matching framework §25.1 system identity.
 * DeepReal = truth-checking engine
 * Mental Health = understanding-and-support engine
 * Religion Hub = meaning-and-moderation engine
 */
export type MVPType = "deepreal" | "mental-health" | "religion-hub";

/**
 * Returns the accent CSS variable for a given MVP.
 */
export function getMVPAccent(mvp: MVPType): string {
  const accents: Record<MVPType, string> = {
    "deepreal": "var(--accent-deepreal)",
    "mental-health": "var(--accent-mentalhealth)",
    "religion-hub": "var(--accent-religionhub)",
  };
  return accents[mvp];
}

/**
 * Returns MVP display name.
 */
export function getMVPName(mvp: MVPType): string {
  const names: Record<MVPType, string> = {
    "deepreal": "DeepReal",
    "mental-health": "Mental Health",
    "religion-hub": "Religion Hub",
  };
  return names[mvp];
}

/**
 * Returns MVP icon name (Lucide icon names).
 */
export function getMVPIcon(mvp: MVPType): string {
  const icons: Record<MVPType, string> = {
    "deepreal": "shield-check",
    "mental-health": "heart-pulse",
    "religion-hub": "sparkles",
  };
  return icons[mvp];
}
