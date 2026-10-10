import React, { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./env";
import { setPrinted, willPlay } from "./printState";

// The cover comes off a riso duplicator. Four drum passes sweep down the
// sheet — yellow, pink, blue, then black — each ink a hair out of register,
// and the printed sheet slides away to reveal the site. Once per visit, any
// click or key skips it, and it never plays under reduced motion or when the
// visitor arrives on a deep link.

const PASSES = [
  { ink: "var(--color-riso-yellow)", name: "Yellow", dx: "-0.05em", dy: "0.035em" },
  { ink: "var(--color-riso-pink)", name: "Fluorescent pink", dx: "0.06em", dy: "-0.02em" },
  { ink: "var(--color-riso-blue)", name: "Blue", dx: "-0.03em", dy: "-0.045em" },
  { ink: "#000", name: "Black", dx: "0", dy: "0" },
];
const PASS_MS = 420;

export default function PrintIntro() {
  const [run, setRun] = useState(willPlay ? 0 : -1); // -1 idle · 0..3 passes · 4 ejecting
  const playing = run >= 0;
  const live = useRef(playing);
  const replay = useRef(false);
  useEffect(() => {
    live.current = playing;
  }, [playing]);

  // Replay on request (the footer's "Print another copy").
  useEffect(() => {
    const again = () => {
      if (live.current || prefersReducedMotion()) return;
      // Instant: a smooth scroll would be frozen halfway by the scroll lock.
      window.scrollTo({ top: 0, behavior: "instant" });
      replay.current = true;
      setPrinted(false);
      setRun(0);
    };
    window.addEventListener("maaya:reprint", again);
    return () => window.removeEventListener("maaya:reprint", again);
  }, []);

  useEffect(() => {
    if (!playing) return;
    document.documentElement.style.overflow = "hidden";
    const next = setTimeout(
      () => {
        if (run < 4) setRun(run + 1);
        else {
          setRun(-1);
          setPrinted(true);
          if (replay.current) {
            // Keyboard focus follows the view back to the cover.
            replay.current = false;
            const cover = document.getElementById("top");
            if (cover) {
              cover.tabIndex = -1;
              cover.focus({ preventScroll: true });
            }
          }
          try {
            sessionStorage.setItem("maaya-printed", "1");
          } catch {
            // Private mode: it just plays again next time.
          }
        }
      },
      run < 4 ? PASS_MS : 650,
    );
    return () => {
      clearTimeout(next);
      document.documentElement.style.overflow = "";
    };
  }, [run, playing]);

  useEffect(() => {
    if (!playing) return;
    const skip = (e) => {
      // Space or Enter would otherwise also press whatever button has focus.
      if (e.key === " " || e.key === "Enter") e.preventDefault();
      setRun(4);
    };
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, [playing]);

  if (!playing) return null;
  const pass = Math.min(run, 3);
  return (
    <div
      onClick={() => setRun(4)}
      aria-hidden="true"
      className={`print-sheet fixed inset-0 z-[90] cursor-pointer overflow-hidden bg-paper ${run === 4 ? "print-eject" : ""}`}
    >
      <div className="halftone absolute inset-0 opacity-40" />
      {/* The drum and its rollers */}
      <div className="print-drum absolute inset-x-0 top-0 z-20 flex h-14 items-center justify-between px-4 text-sm font-black text-white sm:px-8">
        <span className="condensed uppercase">Riso · Issue 26</span>
        <span className="flex items-center gap-2">
          <span className="size-3 rounded-full" style={{ background: PASSES[pass].ink, boxShadow: "0 0 0 2px #fff" }} />
          Pass {pass + 1} of 4: {PASSES[pass].name}
        </span>
      </div>
      {/* Each pass lays its ink down as the print head sweeps the sheet */}
      <div className="absolute inset-0 grid place-items-center px-4">
        <div className="relative grid text-center">
          {PASSES.map((p, i) =>
            i <= pass ? (
              <div
                key={p.name}
                className={`print-pass col-start-1 row-start-1 ${i === pass && run < 4 ? "print-wipe" : ""}`}
                style={{ color: p.ink, transform: `translate(${p.dx}, ${p.dy})`, mixBlendMode: i < 3 ? "multiply" : "normal" }}
              >
                <p className="text-[24vw] leading-[0.82] font-black tracking-tight expanded sm:text-[19vw] lg:text-[15rem]">MAAYA</p>
                <p className="mt-3 text-[6vw] font-black tracking-tight expanded sm:text-[4.4vw] lg:text-6xl">ECLECTRIA · 23–24 OCT</p>
              </div>
            ) : null,
          )}
        </div>
      </div>
      {run < 4 && <div key={run} className="print-head absolute inset-x-0 z-10 h-3" style={{ background: PASSES[pass].ink }} />}
      <p className="absolute right-4 bottom-4 z-20 bg-black px-3 py-1.5 text-sm font-bold text-white sm:right-8 sm:bottom-6">Press any key to skip</p>
    </div>
  );
}
