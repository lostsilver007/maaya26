import React, { useEffect, useRef } from "react";
import { finePointer, prefersReducedMotion } from "./env";

// One canvas over the page that gives each world's cursor a trail:
//   needle   (denim)     a length of copper thread hangs from the needle's eye
//                        and swings behind it (a verlet rope)
//   star     (cosmic)    stardust falls off the star
//   marigold (tradition) petals drift down behind it
//   scissors (cover)     a click snips paper triangles in the riso inks
//   popcorn  (cinema)    a click pops popcorn that arcs up and drops
// Mouse only, nothing under reduced motion, and it sleeps when idle.
const SPARK = ["#ffffff", "#ff7ad9", "#7af7ff", "#b48cff", "#c8ff7a"];
const PETAL = ["#ffb000", "#f28c28", "#ffc94d"];
const RISO = ["#ff48b0", "#0078bf", "#ffe800", "#000000"];
const ROPE_N = 20;
const ROPE_SEG = 7;
const EYE = 19.5; // needle eye, from the cursor hotspot (see the needle cursor in index.css)

export default function CursorTrails() {
  const canvas = useRef(null);

  useEffect(() => {
    if (!finePointer || prefersReducedMotion()) return;
    const el = canvas.current;
    const ctx = el.getContext("2d");
    let dpr = 1, W = 0, H = 0;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      el.width = W * dpr;
      el.height = H * dpr;
      el.style.width = `${W}px`;
      el.style.height = `${H}px`;
      wake();
    };

    const mouse = { x: -100, y: -100, dist: 0 };
    let mode = null;
    let parts = [];
    let rope = [];
    let ropeAlpha = 0;
    let raf = 0, last = performance.now();

    // The embedded island draws its own cursor, so nothing trails over it.
    const modeAt = (x, y) => {
      const t = document.elementFromPoint(x, y);
      if (!t || t.tagName === "IFRAME") return null;
      return t.closest("[data-cursor]")?.getAttribute("data-cursor") ?? null;
    };
    const resetRope = () => {
      rope = Array.from({ length: ROPE_N }, (_, i) => ({ x: mouse.x + EYE, y: mouse.y + EYE + i * ROPE_SEG, px: mouse.x + EYE, py: mouse.y + EYE + i * ROPE_SEG }));
    };

    const onMove = (e) => {
      const dx = e.clientX - mouse.x, dy = e.clientY - mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const next = modeAt(mouse.x, mouse.y);
      if (next === "needle" && mode !== "needle" && ropeAlpha < 0.05) resetRope();
      mode = next;
      const step = Math.hypot(dx, dy);
      if (mode === "star") {
        for (let i = 0; i < Math.min(3, 1 + step / 12); i++)
          parts.push({ k: "spark", x: mouse.x + (Math.random() - 0.5) * 8, y: mouse.y + (Math.random() - 0.5) * 8, vx: (Math.random() - 0.5) * 0.6 - dx * 0.02, vy: Math.random() * 0.4 + 0.2, life: 1, decay: 0.012 + Math.random() * 0.012, s: 2 + Math.random() * 4, c: SPARK[(Math.random() * SPARK.length) | 0], r: Math.random() * Math.PI });
      } else if (mode === "marigold") {
        mouse.dist += step;
        while (mouse.dist > 26) {
          mouse.dist -= 26;
          parts.push({ k: "petal", x: mouse.x, y: mouse.y + 10, vx: (Math.random() - 0.5) * 1.2, vy: 0.4 + Math.random() * 0.6, life: 1, decay: 0.006 + Math.random() * 0.004, s: 4 + Math.random() * 3, c: PETAL[(Math.random() * PETAL.length) | 0], r: Math.random() * Math.PI * 2, vr: (Math.random() - 0.5) * 0.12, ph: Math.random() * 6 });
        }
      }
      wake();
    };

    const onDown = (e) => {
      if (e.button !== 0 || e.target.closest("a, button, input, select, textarea, label, [role=slider], .grab")) return;
      const m = modeAt(e.clientX, e.clientY);
      if (m === "scissors") {
        for (let i = 0; i < 16; i++) {
          const a = Math.random() * Math.PI * 2, v = 2 + Math.random() * 5;
          parts.push({ k: "snip", x: e.clientX, y: e.clientY, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 2, life: 1, decay: 0.012 + Math.random() * 0.01, s: 5 + Math.random() * 7, c: RISO[(Math.random() * RISO.length) | 0], r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4 });
        }
      } else if (m === "popcorn") {
        for (let i = 0; i < 7; i++)
          parts.push({ k: "corn", x: e.clientX, y: e.clientY, vx: (Math.random() - 0.5) * 6, vy: -5 - Math.random() * 5, life: 1, decay: 0.01 + Math.random() * 0.006, s: 6 + Math.random() * 4, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3 });
      }
      wake();
    };

    const drawSpark = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.c;
      ctx.shadowColor = p.c;
      ctx.shadowBlur = 8;
      const s = p.s * (0.6 + p.life * 0.4);
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.quadraticCurveTo(0, 0, s, 0);
      ctx.quadraticCurveTo(0, 0, 0, s);
      ctx.quadraticCurveTo(0, 0, -s, 0);
      ctx.quadraticCurveTo(0, 0, 0, -s);
      ctx.fill();
      ctx.restore();
    };
    const drawPetal = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.globalAlpha = Math.min(1, p.life * 1.5);
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.s * 0.55, p.s, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(179,18,46,0.35)";
      ctx.beginPath();
      ctx.ellipse(0, p.s * 0.45, p.s * 0.2, p.s * 0.35, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    const drawSnip = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.globalAlpha = Math.min(1, p.life * 1.4);
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.moveTo(-p.s / 2, -p.s / 3);
      ctx.lineTo(p.s / 2, -p.s / 2);
      ctx.lineTo(p.s / 6, p.s / 2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };
    const drawCorn = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.globalAlpha = Math.min(1, p.life * 1.5);
      ctx.fillStyle = "#fff6d8";
      ctx.strokeStyle = "rgba(0,0,0,0.55)";
      ctx.lineWidth = 1;
      for (const [ox, oy, k] of [[0, 0, 0.62], [p.s * 0.45, -p.s * 0.2, 0.5], [-p.s * 0.4, -p.s * 0.25, 0.52], [0, -p.s * 0.5, 0.45]]) {
        ctx.beginPath();
        ctx.arc(ox, oy, p.s * k, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      ctx.fillStyle = "#f2b705";
      ctx.beginPath();
      ctx.arc(p.s * 0.1, p.s * 0.2, p.s * 0.22, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const stepRope = () => {
      if (!rope.length) return;
      const ax = mouse.x + EYE, ay = mouse.y + EYE;
      for (let i = 1; i < rope.length; i++) {
        const p = rope[i];
        const vx = (p.x - p.px) * 0.97, vy = (p.y - p.py) * 0.97;
        p.px = p.x;
        p.py = p.y;
        p.x += vx;
        p.y += vy + 0.45;
      }
      rope[0].x = ax;
      rope[0].y = ay;
      for (let it = 0; it < 8; it++) {
        for (let i = 1; i < rope.length; i++) {
          const a = rope[i - 1], b = rope[i];
          const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1;
          const diff = (d - ROPE_SEG) / d;
          if (i === 1) {
            b.x -= dx * diff;
            b.y -= dy * diff;
          } else {
            a.x += dx * diff * 0.5;
            a.y += dy * diff * 0.5;
            b.x -= dx * diff * 0.5;
            b.y -= dy * diff * 0.5;
          }
        }
        rope[0].x = ax;
        rope[0].y = ay;
      }
    };
    const drawRope = () => {
      if (ropeAlpha < 0.01 || rope.length < 2) return;
      ctx.save();
      ctx.globalAlpha = ropeAlpha;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const path = () => {
        ctx.beginPath();
        ctx.moveTo(rope[0].x, rope[0].y);
        for (let i = 1; i < rope.length - 1; i++) {
          const mx = (rope[i].x + rope[i + 1].x) / 2, my = (rope[i].y + rope[i + 1].y) / 2;
          ctx.quadraticCurveTo(rope[i].x, rope[i].y, mx, my);
        }
        const end = rope[rope.length - 1];
        ctx.lineTo(end.x, end.y);
      };
      ctx.strokeStyle = "rgba(0,0,0,0.35)";
      ctx.lineWidth = 3.2;
      ctx.translate(1.2, 1.6);
      path();
      ctx.stroke();
      ctx.translate(-1.2, -1.6);
      ctx.strokeStyle = "#f2a541";
      ctx.lineWidth = 2.4;
      path();
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,240,210,0.6)";
      ctx.lineWidth = 0.8;
      path();
      ctx.stroke();
      const end = rope[rope.length - 1];
      ctx.fillStyle = "#c97f22";
      ctx.beginPath();
      ctx.arc(end.x, end.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const frame = (now) => {
      const dt = Math.min(2, (now - last) / 16.7);
      last = now;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ropeAlpha += ((mode === "needle" ? 1 : 0) - ropeAlpha) * 0.12;
      if (ropeAlpha > 0.01) stepRope();
      drawRope();
      parts = parts.filter((p) => (p.life -= p.decay * dt) > 0 && p.y < H + 40);
      for (const p of parts) {
        if (p.k === "spark") {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.vy += 0.02 * dt;
          drawSpark(p);
        } else if (p.k === "petal") {
          p.ph += 0.05 * dt;
          p.x += (p.vx + Math.sin(p.ph) * 0.8) * dt;
          p.y += p.vy * dt;
          p.vy = Math.min(1.6, p.vy + 0.01 * dt);
          p.r += p.vr * dt;
          drawPetal(p);
        } else {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.vy += (p.k === "corn" ? 0.32 : 0.22) * dt;
          p.vx *= 0.99;
          p.r += p.vr * dt;
          if (p.k === "snip") drawSnip(p);
          else drawCorn(p);
        }
      }
      // Sleep when nothing is left to draw and the rope has settled.
      const ropeMoving = ropeAlpha > 0.01 && rope.some((p) => Math.abs(p.x - p.px) + Math.abs(p.y - p.py) > 0.05);
      raf = parts.length || ropeMoving || Math.abs((mode === "needle" ? 1 : 0) - ropeAlpha) > 0.01 ? requestAnimationFrame(frame) : 0;
      if (!raf) {
        ctx.clearRect(0, 0, W, H);
        drawRope();
      }
    };
    function wake() {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    }
    // Out of the window, or into the island's iframe (which swallows moves).
    const onLeave = (e) => {
      if (e.relatedTarget && e.relatedTarget.tagName !== "IFRAME") return;
      mode = null;
      wake();
    };
    const onScroll = () => {
      // The world under a still pointer changes as the page scrolls.
      mode = modeAt(mouse.x, mouse.y);
      wake();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerout", onLeave, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerout", onLeave);
    };
  }, []);

  if (!finePointer) return null;
  return <canvas ref={canvas} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[45]" />;
}
