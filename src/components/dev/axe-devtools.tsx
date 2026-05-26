"use client";

import { useEffect } from "react";
import React from "react";
import ReactDOM from "react-dom";

export function AxeDevtools() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    let cancelled = false;

    void import("@axe-core/react").then(({ default: axe }) => {
      if (!cancelled) {
        axe(React, ReactDOM, 1000);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
