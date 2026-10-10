import React, { useEffect, useRef, useState } from "react";
import { playClick, playWorldSwitch } from "../../utils/audioEffects";
import { prefersReducedMotion } from "./env";

// The island sits behind the pocket's fly. Drag the zip pull down (or press
// "Unzip", or use the arrow keys on the pull) and the denim parts along the
// zip, the teeth coming apart above the pull. Fully open, the flaps fold
// away. The 3D view isn't fetched until the zip is a third of the way down.
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export default function Zipper({ children, forceOpen = false, className = "" }) {
  const box = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [p, setP] = useState(0);
  const [opened, setOpened] = useState(false);
  const anim = useRef(0);
  const open = opened || forceOpen;
  const mounted = open || p > 0.3;

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  useEffect(() => () => cancelAnimationFrame(anim.current), []);

  const settle = (v) => {
    const c = clamp(v, 0, 1);
    setP(c);
    if (c >= 0.96 && !opened) {
      setOpened(true);
      playWorldSwitch(330);
    }
  };

  // Glide the pull to the bottom (button, Enter, Space).
  const unzip = () => {
    playClick();
    if (prefersReducedMotion()) return settle(1);
    cancelAnimationFrame(anim.current);
    const from = p, t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / 900);
      const e = 1 - (1 - k) ** 3;
      settle(from + (1 - from) * e);
      if (k < 1) anim.current = requestAnimationFrame(step);
    };
    anim.current = requestAnimationFrame(step);
  };

  const onPointerDown = (e) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    cancelAnimationFrame(anim.current);
  };
  const onPointerMove = (e) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId) || !box.current) return;
    const r = box.current.getBoundingClientRect();
    settle((e.clientY - r.top) / r.height);
  };
  const onKeyDown = (e) => {
    const steps = { ArrowDown: 0.1, ArrowRight: 0.1, PageDown: 0.25, ArrowUp: -0.1, ArrowLeft: -0.1, PageUp: -0.25 };
    if (e.key in steps) {
      e.preventDefault();
      settle(p + steps[e.key]);
    } else if (e.key === "End" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      unzip();
    } else if (e.key === "Home") {
      e.preventDefault();
      settle(0);
    }
  };

  // Geometry of the fly.
  const { w, h } = size;
  const cx = w / 2;
  const py = clamp(p * h, 22, h);
  const gap = Math.min(1, p * 1.3) * w * 0.94;
  const left = `polygon(0 0, ${cx - gap / 2}px 0, ${cx}px ${py}px, ${cx}px 100%, 0 100%)`;
  const right = `polygon(${cx + gap / 2}px 0, 100% 0, 100% 100%, ${cx}px 100%, ${cx}px ${py}px)`;
  // Copper topstitch 18px in from each edge of the opening.
  const off = (ax, ay, bx, by, side) => {
    const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1;
    const nx = (-dy / len) * side * 18, ny = (dx / len) * side * 18;
    return [ax + nx, ay + ny, bx + nx, by + ny];
  };
  const [la, lb, lc, ld] = off(cx - gap / 2, 0, cx, py, 1);
  const [ra, rb, rc, rd] = off(cx + gap / 2, 0, cx, py, -1);

  return (
    <div ref={box} className={`relative overflow-hidden rounded-lg border-2 border-black bg-[#120b2b] ${className}`}>
      {mounted ? children : <div className="halftone absolute inset-0 opacity-40" aria-hidden="true" />}

      {w > 0 && (
        <div aria-hidden={open} className={open ? "pointer-events-none" : ""}>
          <div
            className="zip-flap tex-denim absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(.7,0,.3,1)]"
            style={{ clipPath: left, transform: open ? "translateX(-102%) rotate(-4deg)" : undefined }}
          />
          <div
            className="zip-flap tex-denim absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(.7,0,.3,1)]"
            style={{ clipPath: right, transform: open ? "translateX(102%) rotate(4deg)" : undefined }}
          />
          {!open && (
            <>
              <svg className="pointer-events-none absolute inset-0" width={w} height={h} aria-hidden="true">
                {/* Zip tape, teeth (closed below the pull, parted above it), topstitch */}
                <g fill="none" strokeLinecap="butt">
                  <path d={`M${cx - gap / 2} 0 L${cx} ${py} L${cx} ${h} M${cx + gap / 2} 0 L${cx} ${py}`} stroke="var(--color-denim-deep)" strokeWidth="18" />
                  <path d={`M${cx - 4} ${py} V${h}`} stroke="#d7dae1" strokeWidth="8" strokeDasharray="5 5" />
                  <path d={`M${cx + 4} ${py} V${h}`} stroke="#9aa0ad" strokeWidth="8" strokeDasharray="5 5" strokeDashoffset="5" />
                  <path d={`M${cx - gap / 2} 0 L${cx} ${py}`} stroke="#d7dae1" strokeWidth="8" strokeDasharray="5 5" />
                  <path d={`M${cx + gap / 2} 0 L${cx} ${py}`} stroke="#9aa0ad" strokeWidth="8" strokeDasharray="5 5" />
                  <path d={`M${la} ${lb} L${lc} ${ld} L${cx - 18} ${h}`} stroke="var(--color-thread)" strokeWidth="2.4" strokeDasharray="8 6" />
                  <path d={`M${ra} ${rb} L${rc} ${rd} L${cx + 18} ${h}`} stroke="var(--color-thread)" strokeWidth="2.4" strokeDasharray="8 6" />
                </g>
              </svg>

              {/* The pull */}
              <div
                role="slider"
                tabIndex={0}
                aria-label="Zip pull. Drag it down to open Fest Island"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(p * 100)}
                aria-valuetext={`${Math.round(p * 100)}% open`}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onKeyDown={onKeyDown}
                className="zip-pull absolute z-10 cursor-grab touch-none active:cursor-grabbing"
                style={{ left: cx - 17, top: py - 16 }}
              >
                <span className="zip-slider" />
                <span className="zip-tab" />
              </div>

              {p < 0.05 && (
                <div className="pointer-events-none absolute z-10 flex items-center gap-2 font-marker text-xl text-thread" style={{ left: cx + 34, top: 30 }}>
                  <svg width="46" height="30" viewBox="0 0 46 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M44 4 C 30 2, 14 8, 6 24" />
                    <path d="M3 15 L6 25 L15 21" />
                  </svg>
                  <span className="-rotate-3">pull me down</span>
                </div>
              )}

              <button
                type="button"
                onClick={unzip}
                className="absolute right-3 bottom-3 z-10 inline-flex min-h-11 items-center rounded-sm bg-leather px-4 text-sm font-black text-[#f6dcc0] shadow-[inset_0_0_0_2px_rgb(0_0_0/0.25),0_3px_0_rgb(0_0_0/0.4)]"
              >
                Unzip the island
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
