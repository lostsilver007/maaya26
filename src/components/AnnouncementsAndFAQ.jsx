import React, { useState } from "react";
import { FAQ_DATA } from "../data/festivalData";
import { playClick } from "../utils/audioEffects";

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

export default function AnnouncementsAndFAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    playClick();
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="tex-cotton-faint grain relative px-4 pt-32 pb-28 text-black sm:px-6 lg:px-8">
      <Toran />
      <div className="relative z-[2] mx-auto max-w-3xl">
        <div className="text-center">
          <p className="inline-block -rotate-1 bg-saffron px-4 py-1.5 text-sm font-black text-black">World 5: Indian Tradition</p>
          <h2 className="mt-5 font-deva text-[2.75rem] leading-[1.05] text-kumkum sm:text-6xl">Questions, answered</h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-black/75 sm:text-lg">
            Everything you need to know about dates, the theme, the 3D map and registering.
          </p>
        </div>

        <ul className="mt-12 space-y-4">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIdx === idx;
            const id = `faq-${idx}`;
            return (
              <li key={idx} className="flex overflow-hidden border-[3px] border-madder bg-white/80 shadow-[5px_5px_0_var(--color-madder)]">
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
                        className={`grid size-8 shrink-0 place-items-center rounded-full bg-marigold text-xl leading-none font-black transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                      >
                        +
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
      {/* Block-printed hem */}
      <div aria-hidden="true" className="tex-cotton absolute inset-x-0 bottom-0 z-[2] h-8 border-t-[3px] border-madder" />
    </section>
  );
}
