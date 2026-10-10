import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { playClick, playWorldSwitch } from "../utils/audioEffects";
import Hoop from "./fx/Hoop";
import PesuSeal from "./PesuSeal";

// World 4 — Sports & Athleisure. Two editions as two varsity jerseys pegged
// to a washing line over the court (they swing when you touch them), each
// with its scoreboard, then a half-time hoop you can actually shoot at.
const SEASONS = [
  {
    number: "25",
    name: "RETRONOMIA",
    label: "Maaya '25",
    when: "October 2025",
    blurb: "A nostalgic tribute to vintage analog synthesizers, classic retro cinema, and 90s alternative rock on the campus lawns.",
    line: "Last year looked back.",
    jersey: "bg-jersey tex-mesh text-court-deep",
    tilt: -3,
  },
  {
    number: "26",
    name: "ECLECTRIA",
    label: "Maaya '26",
    when: "23–24 October 2026",
    blurb: "Different by Design. Five identities, one world. Denim, cinema, sports athleisure, Indian tradition and cosmic glamour.",
    line: "This year we stop choosing.",
    jersey: "bg-varsity tex-mesh text-court-deep",
    tilt: 2,
    current: true,
  },
];

function Peg() {
  return (
    <span aria-hidden="true" className="absolute -top-3 left-1/2 z-10 h-9 w-3.5 -translate-x-1/2 rounded-sm bg-[linear-gradient(90deg,#c99a5b,#e8c08a_45%,#b07f42)] shadow-[0_2px_0_rgb(0_0_0/0.45)]">
      <span className="absolute inset-x-0 top-3.5 h-1.5 bg-[#8d8f96]" />
    </span>
  );
}

export default function PastEditionsSection() {
  const reduce = useReducedMotion();
  return (
    <section id="editions" data-cursor="ball" className="tex-court grain-dark relative overflow-hidden px-4 pt-24 pb-24 text-white sm:px-6 lg:px-8">
      {/* Court markings */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute top-[34%] left-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/15" />
        <div className="absolute inset-6 border-4 border-white/12 sm:inset-10" />
      </div>

      <div className="relative z-[2] mx-auto max-w-6xl">
        <div className="text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <p className="banner-notch inline-block -rotate-1 bg-varsity py-2 pr-9 pl-4 text-sm font-black whitespace-nowrap text-court-deep">World 4: Sports &amp; Athleisure</p>
            <PesuSeal world="sports" size="sm" />
          </div>
          <h2 className="mt-5 font-varsity text-[2.6rem] leading-none sm:text-6xl lg:text-7xl">Last season, this season</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white sm:text-lg">From Retronomia's vintage synthesis to Eclectria's five colliding aesthetics.</p>
        </div>

        {/* The washing line */}
        <div className="relative mt-16">
          <svg aria-hidden="true" viewBox="0 0 1000 60" preserveAspectRatio="none" className="absolute inset-x-0 -top-2 hidden h-14 w-full md:block">
            <path d="M0 6 Q 500 70 1000 6" fill="none" stroke="#f6f5ef" strokeWidth="3" />
          </svg>
          <div className="grid gap-16 md:grid-cols-2 md:gap-10">
            {SEASONS.map((s, i) => (
              <article key={s.number} className="flex flex-col items-center">
                <motion.div
                  className="relative w-full max-w-[19rem] drop-shadow-[0_10px_0_rgb(0_0_0/0.35)] md:mt-8"
                  style={{ rotate: s.tilt, originY: 0 }}
                  onPointerEnter={() => playWorldSwitch(i ? 494 : 392)}
                  {...(reduce
                    ? {}
                    : {
                        // Pegged on with a swing as it comes into view; touch it and it swings again.
                        initial: { rotate: s.tilt + (i ? 14 : -14) },
                        whileInView: { rotate: s.tilt, transition: { type: "spring", stiffness: 60, damping: 4 } },
                        whileHover: { rotate: [s.tilt, s.tilt + 7, s.tilt - 5, s.tilt + 3, s.tilt - 1.5, s.tilt], transition: { duration: 1.6, ease: "easeInOut" } },
                        whileTap: { rotate: [s.tilt, s.tilt - 8, s.tilt + 5, s.tilt - 2, s.tilt], transition: { duration: 1.2 } },
                        viewport: { once: true, amount: 0.6 },
                      })}
                >
                  <Peg />
                  <div className={`jersey ${s.jersey} grid aspect-[1/1.02] w-full place-items-center pt-[22%]`}>
                    <div className="text-center">
                      <p className="font-varsity text-lg tracking-[0.12em] sm:text-xl">{s.name}</p>
                      <p className="font-varsity varsity-outline text-[7.5rem] leading-[0.85] sm:text-[8.5rem]">{s.number}</p>
                    </div>
                  </div>
                  {s.current && <span className="sticker absolute -top-1 -right-3 rotate-12 rounded-full bg-riso-pink px-3 py-1.5 text-sm font-black text-black">Now playing</span>}
                </motion.div>
                {/* The scoreboard */}
                <div className="mt-8 w-full max-w-md border-4 border-black bg-[#111] p-5 text-left shadow-[6px_6px_0_rgb(0_0_0/0.4)]">
                  <div className="flex items-baseline justify-between gap-3 border-b-2 border-dashed border-white/25 pb-3">
                    <h3 className="font-varsity text-2xl text-varsity">{s.label}</h3>
                    <p className="text-sm font-bold text-white/75 tabular-nums">{s.when}</p>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-white/85">{s.blurb}</p>
                  <p className="mt-4 font-script text-xl text-holo-lime">{s.line}</p>
                  {s.current && (
                    <a href="#programme" onClick={playClick} className="mt-4 inline-flex min-h-11 items-center bg-varsity px-5 text-base font-black text-black">
                      See the programme
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <Hoop />
        </div>
      </div>
    </section>
  );
}
