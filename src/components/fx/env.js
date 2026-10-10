// What the visitor's device can do, read once.
const mq = (q) => typeof window !== "undefined" && window.matchMedia(q).matches;

export const finePointer = mq("(pointer: fine)");
export const prefersReducedMotion = () => mq("(prefers-reduced-motion: reduce)");
