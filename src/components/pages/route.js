import { useSyncExternalStore } from "react";

// The extra pages live behind hash routes (#/core, #/rules, #/legal), so the site
// stays a single static page with no router dependency and no server
// rewrites. Plain anchors (#programme, #faq...) still scroll the home page.
export const PAGES = {
  "/core": "Core team",
  "/credits": "Credits",
  "/rules": "Rules and regulations",
  "/legal": "Legal and privacy",
};

const read = () => {
  const h = typeof window === "undefined" ? "" : window.location.hash;
  const path = h.startsWith("#/") ? h.slice(1) : "";
  return path in PAGES ? path : null;
};
const subscribe = (cb) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};

export const usePage = () => useSyncExternalStore(subscribe, read, () => null);
