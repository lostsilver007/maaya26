import React, { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./env";

// Riso overprint: the same words printed in three inks that never quite line
// up. The two colour plates drift out of register as the pointer moves and
// as the page scrolls, then ease back.
const PLATES = [
  { ink: "var(--color-riso-blue)", dx: 1, dy: 0.7 },
  { ink: "var(--color-riso-yellow)", dx: -0.85, dy: -0.75 },
];

export default function Overprint({ text, as: Tag = "p", className = "", keyInk = "#000", plates = PLATES, blend = "multiply" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0, lastY = window.scrollY, kick = 0;
    const tick = () => {
      kick *= 0.9;
      x += (tx - x) * 0.12;
      y += (ty + kick - y) * 0.12;
      el.style.setProperty("--ox", x.toFixed(3));
      el.style.setProperty("--oy", y.toFixed(3));
      raf = Math.abs(tx - x) + Math.abs(ty + kick - y) + Math.abs(kick) > 0.002 ? requestAnimationFrame(tick) : 0;
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      wake();
    };
    const onScroll = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      kick = Math.max(-0.9, Math.min(0.9, kick + dy / 120));
      wake();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Tag ref={ref} className={`overprint ${className}`}>
      {plates.map((p, i) => (
        <span key={i} aria-hidden="true" className="overprint-plate" style={{ color: p.ink, "--dx": p.dx, "--dy": p.dy, mixBlendMode: blend }}>
          {text}
        </span>
      ))}
      <span style={{ color: keyInk }}>{text}</span>
    </Tag>
  );
}
