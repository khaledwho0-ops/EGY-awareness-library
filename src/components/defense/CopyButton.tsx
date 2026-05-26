"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const markCopied = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fallbackCopy = () => {
    if (typeof document === "undefined") {
      return false;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "true");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    try {
      const copiedWithFallback = document.execCommand("copy");
      document.body.removeChild(textarea);
      return copiedWithFallback;
    } catch {
      document.body.removeChild(textarea);
      return false;
    }
  };

  const handleCopy = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        markCopied();
        return;
      } catch {
        if (fallbackCopy()) {
          markCopied();
        }
        return;
      }
    }

    if (fallbackCopy()) {
      markCopied();
    }
  };

  return (
    <button
      onClick={handleCopy}
      title="Copy to clipboard"
      className="inline-flex items-center gap-1.5 rounded-md bg-[var(--bg-elevated)] px-2 py-1 text-[11px] font-medium text-[var(--text-secondary)] transition-colors hover:bg-[color:color-mix(in_srgb,var(--accent-cta)_15%,transparent)] hover:text-[var(--accent-cta)] border border-[var(--border-primary)]"
    >
      {copied ? <Check size={12} className="text-[var(--color-success)]" /> : <Copy size={12} />}
      {label && <span>{label}</span>}
      {!label && <span>Copy</span>}
    </button>
  );
}
