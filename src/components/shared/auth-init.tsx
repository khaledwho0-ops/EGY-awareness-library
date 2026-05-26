"use client";

import { useEffect } from "react";

/**
 * AuthInit — invisible client component that initializes
 * the auth + progress auto-save system on app mount.
 * Rendered once in the root layout.
 */
export function AuthInit() {
  useEffect(() => {
    // Auth initialization is now handled server-side via Zero-Trust JWTs
  }, []);

  return null;
}
