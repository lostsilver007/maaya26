import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const FOCUSABLE = 'a[href], button:not([disabled]), select, input, textarea, [tabindex]:not([tabindex="-1"])';

// Shared pop-up shell: a real dialog (Esc closes it, Tab stays inside, the
// page behind doesn't scroll, focus goes back where it came from). Rendered
// at the end of <body>, above the nav, whichever section opens it. Each
// pop-up brings its own material for the panel.
export default function Modal({ open, onClose, labelledBy, className = "", children }) {
  const panel = useRef(null);
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const before = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === "Escape") close.current?.();
      if (e.key !== "Tab" || !panel.current) return;
      const items = [...panel.current.querySelectorAll(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      if (before instanceof HTMLElement) before.focus({ preventScroll: true });
    };
  }, [open]);

  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6">
      <div className="absolute inset-0 bg-black/80 halftone" onClick={() => close.current?.()} aria-hidden="true" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={`slap-in relative w-full max-h-[90dvh] overflow-y-auto overscroll-contain focus:outline-none ${className}`}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

// Round close button, used on every pop-up.
export function CloseButton({ onClick, label = "Close", className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`grid size-11 shrink-0 place-items-center rounded-full bg-black text-white transition-transform hover:rotate-90 ${className}`}
    >
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  );
}
