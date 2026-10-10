import { useSyncExternalStore } from "react";
import { prefersReducedMotion } from "./env";

// ── Shared "has the cover been printed yet?" state ──
const seen = () => {
  try {
    return sessionStorage.getItem("maaya-printed") === "1";
  } catch {
    return false;
  }
};
export const willPlay = typeof window !== "undefined" && !prefersReducedMotion() && !seen() && !location.hash;
let printed = !willPlay;
const listeners = new Set();
export const setPrinted = (v) => {
  printed = v;
  listeners.forEach((l) => l());
};
const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
/** True once the intro is over (or was never going to play). */
export const usePrinted = () => useSyncExternalStore(subscribe, () => printed, () => true);
