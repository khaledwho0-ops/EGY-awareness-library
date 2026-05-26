"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

interface UseFocusTrapOptions {
  isActive: boolean;
  onClose: () => void;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
}

export function useFocusTrap({
  isActive,
  onClose,
  closeOnOverlay = true,
  closeOnEscape = true,
}: UseFocusTrapOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    const focusable = containerRef.current.querySelectorAll(FOCUSABLE_SELECTORS);
    if (focusable.length > 0) {
      (focusable[0] as HTMLElement).focus();
    }

    return () => {
      previousFocusRef.current?.focus();
    };
  }, [isActive]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isActive || !containerRef.current) return;

      if (event.key === "Escape" && closeOnEscape) {
        event.preventDefault();
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = containerRef.current.querySelectorAll(FOCUSABLE_SELECTORS);
      if (focusable.length === 0) return;

      const first = focusable[0] as HTMLElement;
      const last = focusable[focusable.length - 1] as HTMLElement;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [closeOnEscape, isActive, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => document.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [handleKeyDown]);

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent) => {
      if (closeOnOverlay && event.target === event.currentTarget) {
        onClose();
      }
    },
    [closeOnOverlay, onClose]
  );

  return { containerRef, handleOverlayClick };
}

interface FocusTrapModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  maxWidth?: number;
}

export function FocusTrapModal({
  isOpen,
  onClose,
  title,
  children,
  closeOnOverlay = true,
  closeOnEscape = true,
  showCloseButton = true,
  maxWidth = 560,
}: FocusTrapModalProps) {
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeModal = useCallback(() => {
    setDismissed(true);
    // Restore body scroll immediately
    document.body.classList.remove("menu-open");
    document.body.style.overflow = "";
    onClose();
  }, [onClose]);

  const { containerRef, handleOverlayClick } = useFocusTrap({
    isActive: isOpen && !dismissed,
    onClose: closeModal,
    closeOnOverlay,
    closeOnEscape,
  });

  useEffect(() => {
    if (isOpen) {
      setDismissed(false);
    }
  }, [isOpen]);

  // Lock body scroll when modal is open, restore when closed
  useEffect(() => {
    if (isOpen && !dismissed) {
      document.body.classList.add("menu-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
    }

    return () => {
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
    };
  }, [dismissed, isOpen]);

  if (!isOpen || dismissed || !mounted) return null;

  return createPortal(
    <div
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "rgba(0,0,0,0.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        isolation: "isolate",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={containerRef}
        tabIndex={-1}
        style={{
          background: "var(--bg-card)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-primary)",
          maxWidth,
          width: "100%",
          maxHeight: "80vh",
          overflow: "auto",
          boxShadow: "var(--shadow-xl)",
          position: "relative",
          zIndex: 10001,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: showCloseButton ? "space-between" : "flex-start",
            padding: "16px 20px",
            borderBottom: "1px solid var(--border-primary)",
            position: "sticky",
            top: 0,
            background: "var(--bg-card)",
            zIndex: 2,
          }}
        >
          <h3 id="modal-title" style={{ fontSize: 18, margin: 0 }}>
            {title}
          </h3>
          {showCloseButton ? (
            <button
              type="button"
              onClick={closeModal}
              aria-label="إغلاق"
              title="إغلاق"
              style={{
                width: 44,
                height: 44,
                minWidth: 44,
                minHeight: 44,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--border-primary)",
                background: "var(--bg-secondary)",
                cursor: "pointer",
                fontSize: 24,
                fontWeight: 700,
                color: "var(--text-primary)",
                flexShrink: 0,
                marginInlineStart: 12,
                transition: "background 0.15s, transform 0.1s",
                position: "relative",
                zIndex: 3,
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = "var(--color-danger, #ef4444)";
                (e.target as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = "var(--bg-secondary)";
                (e.target as HTMLElement).style.color = "var(--text-primary)";
              }}
            >
              ✕
            </button>
          ) : null}
        </div>
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
