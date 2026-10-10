import React, { useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { FAQ_DATA } from "../data/festivalData";
import { playClick } from "../utils/audioEffects";
import Rangoli from "./fx/Rangoli";
import PesuSeal from "./PesuSeal";

// World 5 — Indian Tradition. A marigold toran across the doorway, hand
// block-printed cotton, and the questions people ask most.
function Toran() {
  const flowers = Array.from({ length: 40 });
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-[3]">
      <div className="h-1.5 bg-leaf" />
      <div className="flex justify-center overflow-hidden">
        <div className="flex shrink-0 items-start">
          {flowers.map((_, i) => (
            <div key={i} className="flex flex-col items-center" style={{ width: 34 }}>
              {/* Mango leaf, then the marigold */}
              <span className="block h-4 w-3 -translate-y-px rounded-b-full bg-leaf" style={{ transform: `rotate(${i % 2 ? 10 : -10}deg)` }} />
              <span
                className="-mt-1.5 block size-6 rounded-full"
                style={{ background: `radial-gradient(circle at 40% 35%, #ffe08a, ${i % 3 === 1 ? "var(--color-saffron)" : "var(--color-marigold)"} 55%, #c96a00)` }}
              />
              {/* Every fifth flower carries a hanging strand */}
              {i % 5 === 2 && (
                <span className="flex flex-col items-center">
                  {[0, 1, 2].map((k) => (
                    <span
                      key={k}
                      className="-mt-1 block size-4 rounded-full"
                      style={{ background: `radial-gradient(circle at 40% 35%, #ffe08a, ${k % 2 ? "var(--color-saffron)" : "var(--color-marigold)"} 55%, #c96a00)` }}
                    />
                  ))}
                  <span className="-mt-0.5 block h-3 w-1 bg-kumkum" />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Marigold petals thrown from the "+" when an answer opens. Seeded, so each
// burst differs but rendering stays pure.
const seeded = (seed) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};
function PetalBurst({ seed }) {
  const petals = useMemo(() => {
    const rand = seeded(seed * 7919 + 13);
    return Array.from({ length: 14 }, (_, i) => {
      const a = (i / 14) * Math.PI * 2 + rand() * 0.4;
      const d = 40 + rand() * 60;
      return { dx: Math.cos(a) * d, dy: Math.sin(a) * d - 20, r: rand() * 540 - 270, c: i % 3 ? "var(--color-marigold)" : "var(--color-saffron)", delay: rand() * 0.08 };
    });
  }, [seed]);
  return (
    <span aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2">
      {petals.map((p, i) => (
        <span key={i} className="petal" style={{ "--dx": `${p.dx}px`, "--dy": `${p.dy}px`, "--r": `${p.r}deg`, background: p.c, animationDelay: `${p.delay}s` }} />
      ))}
    </span>
  );
}

// Clay diyas along the hem, each with its own flicker.
function Diyas() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-8 z-[3] flex justify-around px-4">
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} className={`diya ${i > 4 ? "hidden sm:block" : ""}`} style={{ "--flick": `${1.1 + (i % 4) * 0.23}s` }}>
          <span className="flame" />
        </span>
      ))}
    </div>
  );
}

export default function AnnouncementsAndFAQ() {
  const reduce = useReducedMotion();
  const [openIdx, setOpenIdx] = useState(0);
  const [burst, setBurst] = useState({ idx: null, n: 0 });

  const toggle = (idx) => {
    playClick();
    const opening = openIdx !== idx;
    setOpenIdx(opening ? idx : null);
    if (opening) setBurst((b) => ({ idx, n: b.n + 1 }));
  };

  return (
    <section id="faq" data-cursor="marigold" className="tex-cotton-faint grain relative px-4 pt-32 pb-36 text-black sm:px-6 lg:px-8">
      <Toran />
      <div className="relative z-[2] mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)] lg:gap-16">
        <div className="text-center lg:sticky lg:top-28 lg:text-left">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <p className="inline-block -rotate-1 bg-saffron px-4 py-1.5 text-sm font-black text-black">World 5: Indian Tradition</p>
            <PesuSeal world="tradition" size="sm" />
          </div>
          <h2 className="mt-5 font-deva text-[2.75rem] leading-[1.05] text-kumkum sm:text-6xl">Questions, answered</h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-black/75 sm:text-lg lg:mx-0">
            Everything you need to know about dates, the theme, the 3D map and registering.
          </p>
          <Rangoli className="mx-auto mt-8 w-56 drop-shadow-[0_6px_0_rgb(158_42_43/0.25)] sm:w-72 lg:mx-0 lg:w-[22rem]" />
        </div>

        <ul className="space-y-4 lg:pt-4">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIdx === idx;
            const id = `faq-${idx}`;
            return (
              <li key={idx} className="flex overflow-visible border-[3px] border-madder bg-white/85 shadow-[5px_5px_0_var(--color-madder)]">
                {/* Block-printed border strip */}
                <span aria-hidden="true" className="tex-cotton w-6 shrink-0 border-r-[3px] border-madder sm:w-9" />
                <div className="min-w-0 flex-1">
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggle(idx)}
                      aria-expanded={isOpen}
                      aria-controls={id}
                      className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-4 text-left text-lg leading-snug font-extrabold sm:px-6"
                    >
                      <span>{item.q}</span>
                      <span
                        aria-hidden="true"
                        className={`relative grid size-8 shrink-0 place-items-center rounded-full bg-marigold text-xl leading-none font-black transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                      >
                        +{!reduce && burst.idx === idx && <PetalBurst key={burst.n} seed={burst.n} />}
                      </span>
                    </button>
                  </h3>
                  <div id={id} hidden={!isOpen} className="px-4 pb-5 text-base leading-relaxed text-black/80 sm:px-6">
                    {item.a}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Diyas />
      {/* Block-printed hem */}
      <div aria-hidden="true" className="tex-cotton absolute inset-x-0 bottom-0 z-[2] h-8 border-t-[3px] border-madder" />
    </section>
  );
}
