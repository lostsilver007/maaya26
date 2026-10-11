import React, { useEffect, useRef, useState } from "react";
import { playChime, playClick } from "../../utils/audioEffects";
import { prefersReducedMotion } from "./env";
import SplitFlap from "./SplitFlap";

// Half-time: a basketball you can drag and push/throw at the hoop. Gravity,
// bounces off the floor, ceiling, walls and backboard, rim collisions, a swish when it
// drops through the net, and a split-flap scoreboard.
const R = 24; // ball radius, px
const G = 0.42; // gravity per frame

export default function Hoop() {
  const court = useRef(null);
  const ballEl = useRef(null);
  const net = useRef(null);
  const [made, setMade] = useState(0);
  const [shots, setShots] = useState(0);
  const [call, setCall] = useState(null); // { text, n }
  const still = prefersReducedMotion();
  const sim = useRef({ x: 80, y: 0, vx: 0, vy: 0, angle: 0, held: false, samples: [], touchedRim: false, live: false, raf: 0, w: 0, h: 0, visible: false });

  useEffect(() => {
    const s = sim.current;
    const el = court.current;
    const geo = () => {
      s.w = el.clientWidth;
      s.h = el.clientHeight;
      const rimY = s.h * 0.36;
      const boardX = s.w - Math.max(26, s.w * 0.04);
      s.rim = { y: rimY, x1: boardX - 106, x2: boardX - 10, boardX, boardTop: rimY - 96, boardBottom: rimY + 18 };
      if (!s.live && !s.held) s.y = s.h - R;
      draw();
    };
    const draw = () => {
      if (!ballEl.current) return;
      ballEl.current.style.transform = `translate(${s.x - R}px, ${s.y - R}px) rotate(${s.angle}rad)`;
    };
    s.draw = draw;

    const step = () => {
      const { rim } = s;
      if (!s.held) {
        const prevY = s.y;
        s.vy += G;
        s.x += s.vx;
        s.y += s.vy;
        s.angle += s.vx / R;
        // Floor
        if (s.y > s.h - R) {
          s.y = s.h - R;
          if (Math.abs(s.vy) > 2.2) playClick();
          s.vy *= -0.6;
          s.vx *= 0.88;
          if (Math.abs(s.vy) < 1.1) s.vy = 0;
        }
        // Ceiling (prevents ball from flying out of top frame)
        if (s.y < R) {
          s.y = R;
          s.vy = Math.abs(s.vy) * 0.5;
        }
        // Walls
        if (s.x < R) {
          s.x = R;
          s.vx = Math.abs(s.vx) * 0.6;
        }
        if (s.x > s.w - R) {
          s.x = s.w - R;
          s.vx = -Math.abs(s.vx) * 0.6;
        }
        // Backboard
        if (s.x + R > rim.boardX && s.y > rim.boardTop && s.y < rim.boardBottom) {
          s.x = rim.boardX - R;
          s.vx = -Math.abs(s.vx) * 0.55;
        }
        // Rim: the front and back of the hoop are two small posts.
        for (const px of [rim.x1, rim.x2]) {
          const dx = s.x - px, dy = s.y - rim.y, d = Math.hypot(dx, dy);
          if (d < R + 3 && d > 0) {
            const nx = dx / d, ny = dy / d;
            s.x = px + nx * (R + 3);
            s.y = rim.y + ny * (R + 3);
            const vn = s.vx * nx + s.vy * ny;
            if (vn < 0) {
              s.vx -= 1.6 * vn * nx;
              s.vy -= 1.6 * vn * ny;
            }
            s.touchedRim = true;
          }
        }
        // Through the hoop, going down: a basket.
        if (prevY < rim.y && s.y >= rim.y && s.x > rim.x1 + 6 && s.x < rim.x2 - 6 && s.vy > 0) {
          setMade((m) => m + 1);
          setCall((c) => ({ text: s.touchedRim ? "Off the rim, in!" : "Swish!", n: (c?.n ?? 0) + 1 }));
          playChime();
          net.current?.classList.remove("net-swish");
          void net.current?.getBoundingClientRect();
          net.current?.classList.add("net-swish");
        }
        if (s.vy === 0 && Math.abs(s.vx) < 0.05 && s.y >= s.h - R - 0.5) s.live = false;
        s.vx *= 0.992;
      }
      draw();
      s.raf = (s.live || s.held) && s.visible ? requestAnimationFrame(step) : 0;
    };
    s.wake = () => {
      if (!s.raf && s.visible) s.raf = requestAnimationFrame(step);
    };

    geo();
    const ro = new ResizeObserver(geo);
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => {
      s.visible = e.isIntersecting;
      if (s.visible && s.live) s.wake();
    });
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(s.raf);
    };
  }, []);

  const local = (e) => {
    const r = court.current.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };
  const onDown = (e) => {
    if (still) return;
    const s = sim.current;
    e.currentTarget.setPointerCapture(e.pointerId);
    s.held = true;
    s.live = true;
    s.touchedRim = false;
    s.samples = [];
    s.wake();
  };
  const onMove = (e) => {
    const s = sim.current;
    if (!s.held) return;
    const [x, y] = local(e);
    s.x = Math.max(R, Math.min(s.w - R, x));
    s.y = Math.max(R, Math.min(s.h - R, y));
    s.samples.push({ x: s.x, y: s.y, t: performance.now() });
    if (s.samples.length > 6) s.samples.shift();
  };
  const onUp = () => {
    const s = sim.current;
    if (!s.held) return;
    s.held = false;
    const a = s.samples[0], b = s.samples[s.samples.length - 1];
    if (a && b && b.t > a.t) {
      const k = 16.7 / (b.t - a.t);
      // Gentle, controlled flick speed so the ball stays in frame and doesn't rocket away
      const speedScale = 0.55;
      s.vx = Math.max(-16, Math.min(16, (b.x - a.x) * k * speedScale));
      s.vy = Math.max(-18, Math.min(18, (b.y - a.y) * k * speedScale));
      if (Math.hypot(s.vx, s.vy) > 2) setShots((n) => n + 1);
    }
    s.wake();
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 className="font-varsity text-3xl sm:text-4xl">Half-time</h3>
          <p className="mt-1 text-base text-white">Drag and push the basketball into the hoop to score!</p>
        </div>
        {/* Scoreboard */}
        <div className="flex items-stretch gap-3 border-4 border-black bg-[#111] p-3 shadow-[5px_5px_0_rgb(0_0_0/0.4)]">
          <div className="text-center">
            <p className="text-xs font-bold text-varsity uppercase">Baskets</p>
            <SplitFlap value={String(made).padStart(2, "0")} label={`${made} baskets`} className="mt-1 text-4xl font-black condensed" />
          </div>
          <div className="w-px bg-white/20" />
          <div className="text-center">
            <p className="text-xs font-bold text-white/75 uppercase">Shots</p>
            <SplitFlap value={String(shots).padStart(2, "0")} label={`${shots} shots`} className="mt-1 text-4xl font-black condensed" />
          </div>
        </div>
      </div>

      <div ref={court} className="court-floor relative mt-5 h-[20rem] overflow-hidden border-4 border-white/70 sm:h-[24rem]" aria-hidden="true">
        {/* Markings */}
        <div className="absolute top-1/2 -left-24 size-48 -translate-y-1/2 rounded-full border-4 border-white/50" />
        <div className="absolute inset-y-0 right-0 w-[32%] border-l-4 border-white/50" />
        <div className="absolute top-1/2 right-[32%] size-40 translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/50" />
        {/* Backboard, rim and net */}
        <div className="absolute top-[calc(36%-96px)] right-[max(26px,4%)] h-[114px] w-3 translate-x-full bg-white shadow-[0_0_0_2px_#000]" />
        <div className="absolute top-[calc(36%-60px)] right-[max(26px,4%)] h-11 w-[70px] border-[3px] border-r-0 border-ticket-red" />
        <div className="absolute top-[36%] right-[calc(max(26px,4%)+10px)] h-1.5 w-[96px] -translate-y-1/2 rounded-full bg-saffron shadow-[0_2px_0_#000]" />
        <svg ref={net} viewBox="0 0 96 46" className="net absolute top-[36%] right-[calc(max(26px,4%)+10px)] h-[46px] w-[96px] origin-top" fill="none" stroke="rgb(255 255 255 / 0.9)" strokeWidth="1.5">
          <path d="M2 0 L17 44 M31 0 L26 44 M48 0 L48 44 M65 0 L70 44 M94 0 L79 44 M2 0 L48 14 L94 0 M10 20 L48 28 L86 20 M17 44 L79 44" />
        </svg>
        {/* The ball */}
        <div
          ref={ballEl}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className={`ball absolute top-0 left-0 touch-none ${still ? "" : "cursor-grab active:cursor-grabbing"}`}
          style={{ width: R * 2, height: R * 2 }}
        />
        {call && (
          <p key={call.n} className="call absolute top-6 left-1/2 -translate-x-1/2 -rotate-3 bg-varsity px-4 py-1.5 font-varsity text-2xl text-black shadow-[4px_4px_0_#000]">
            {call.text}
          </p>
        )}
      </div>
    </div>
  );
}
