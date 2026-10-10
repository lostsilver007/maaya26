import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FESTIVAL_INFO, EVENTS } from "../data/festivalData";
import { playClick, playTrumpet, playWorldSwitch } from "../utils/audioEffects";
import { WORLDS } from "./worlds";
import Overprint from "./fx/Overprint";
import SplitFlap from "./fx/SplitFlap";
import { finePointer } from "./fx/env";
import { usePrinted } from "./fx/printState";
import pesLogo from "../assets/brand/pes-university-logo.png";
import jagoSticker from "../assets/brand/jago-sticker.webp";

// MAAYA, cut out ransom-note style: one letter from each of Eclectria's five
// worlds. The letters slap on in turn, and (with a mouse) they peel off: grab
// one and it lifts, hums its world's note, and springs back when let go.
const LETTERS = [
  { ch: "M", world: "Denim & Street", chip: "tex-denim stitched", ink: "font-marker text-white", tilt: -7, note: 330 },
  { ch: "A", world: "Cinema & Retro", chip: "bg-ticket", ink: "font-marquee text-ticket-red", tilt: 5, note: 392 },
  { ch: "A", world: "Sports & Athleisure", chip: "tex-court", ink: "font-varsity varsity-outline", tilt: -3, note: 440 },
  { ch: "Y", world: "Indian Tradition", chip: "tex-cotton-faint", ink: "font-deva text-kumkum", tilt: 6, note: 523 },
  { ch: "A", world: "Cosmic Glamour", chip: "tex-space", ink: "font-cosmic chrome", tilt: -5, note: 659 },
];

const TARGET = new Date(FESTIVAL_INFO.isoDate).getTime();
function useCountdown() {
  const [left, setLeft] = useState(() => Math.max(0, TARGET - Date.now()));
  useEffect(() => {
    const id = setInterval(() => setLeft(Math.max(0, TARGET - Date.now())), 1000);
    return () => clearInterval(id);
  }, []);
  return {
    days: Math.floor(left / 86400000),
    hours: Math.floor((left / 3600000) % 24),
    minutes: Math.floor((left / 60000) % 60),
    seconds: Math.floor((left / 1000) % 60),
    done: left === 0,
  };
}

const CONTENTS_NOTE = {
  denim: "6 venues on a 3D island",
  cinema: `${EVENTS.length} club events`,
  cosmic: "Seher Band live, 24 October",
  sports: "Retronomia to Eclectria",
  heritage: "Dates, theme, registration",
};

const pad = (n) => String(n).padStart(2, "0");

// Jago, the PES mascot, as a die-cut sticker. He bobs gently; tap him and he
// shakes his head and trumpets (when sound is on).
function Jago({ reduce }) {
  const [shakes, setShakes] = useState(0);
  const shake = shakes % 2 ? [0, -10, 8, -5, 3, 0] : [0, 10, -8, 5, -3, 0];
  return (
    <button
      type="button"
      onClick={() => {
        playTrumpet();
        setShakes((n) => n + 1);
      }}
      aria-label="Say hi to Jago, the PES mascot"
      className="group relative block shrink-0 rounded-2xl"
    >
      <motion.span
        className="block"
        {...(reduce ? {} : { animate: { y: [0, -6, 0] }, transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" } })}
      >
        <motion.img
          src={jagoSticker}
          alt=""
          width="371"
          height="420"
          draggable="false"
          animate={reduce || !shakes ? undefined : { rotate: shake }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="h-[9.5rem] w-auto origin-top drop-shadow-[3px_6px_0_rgb(0_0_0/0.35)] transition-transform duration-300 select-none group-hover:-rotate-3 sm:h-48"
        />
      </motion.span>
      <span
        aria-hidden="true"
        className="absolute -top-7 -right-2 rotate-6 rounded-2xl border-[3px] border-black bg-white px-2.5 py-1 font-marker text-sm leading-none whitespace-nowrap text-black shadow-[2px_3px_0_#000] after:absolute after:-bottom-[9px] after:left-4 after:size-3.5 after:rotate-45 after:border-r-[3px] after:border-b-[3px] after:border-black after:bg-white sm:text-base"
      >
        Jago, the PES Mascot
      </span>
    </button>
  );
}

// Grab-and-peel for any collage piece (mouse only, so touch can still scroll).
const peel = (tilt = 0) =>
  finePointer
    ? {
        drag: true,
        dragSnapToOrigin: true,
        dragElastic: 0.55,
        dragTransition: { bounceStiffness: 380, bounceDamping: 14 },
        whileDrag: { scale: 1.12, rotate: tilt * -0.6, zIndex: 40, boxShadow: "14px 18px 0 rgba(0,0,0,0.55)" },
      }
    : {};

export default function HeroSection() {
  const reduce = useReducedMotion();
  const t = useCountdown();
  // Everything waits under the riso intro until the sheet has been printed.
  const go = usePrinted();
  const gate = (from, to) => (go ? to : from);

  // The entrance: the letters slap on, then every scrap flies in from off the
  // page and lands at its own angle.
  const slap = (i) =>
    reduce
      ? { style: { rotate: `${LETTERS[i].tilt}deg` } }
      : {
          initial: { opacity: 0, scale: 1.8, rotate: LETTERS[i].tilt * -4, y: -40 },
          animate: gate({ opacity: 0, scale: 1.8, rotate: LETTERS[i].tilt * -4, y: -40 }, { opacity: 1, scale: 1, rotate: LETTERS[i].tilt, y: 0 }),
          transition: { type: "spring", stiffness: 520, damping: 20, delay: 0.15 + i * 0.12 },
        };
  const land = (d, from = { x: 0, y: 60, r: 0 }, rest = 0) =>
    reduce
      ? { style: { rotate: `${rest}deg` } }
      : {
          initial: { opacity: 0, x: from.x, y: from.y, rotate: from.r },
          animate: gate({ opacity: 0, x: from.x, y: from.y, rotate: from.r }, { opacity: 1, x: 0, y: 0, rotate: rest }),
          transition: { type: "spring", stiffness: 260, damping: 20, delay: 0.9 + d },
        };

  return (
    <section id="top" data-cursor="stamp" className="tex-riso grain relative overflow-hidden px-4 pt-24 pb-24 sm:px-6 sm:pt-28 lg:px-8">
      <div className="relative z-[2] mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-8">
        {/* ── Left: the masthead ── */}
        <div className="lg:col-span-7">
          {/* The official PES University logo on a white tag */}
          <motion.div
            {...land(-0.8, { x: -80, y: 0, r: -12 }, -1)}
            className="inline-flex items-center gap-3 bg-white py-2 pr-4 pl-2.5 shadow-[3px_4px_0_rgb(0_0_0/0.85)] sm:gap-4 sm:py-2.5"
          >
            <img src={pesLogo} alt="PES University" width="326" height="148" className="h-10 w-auto sm:h-12" />
            <span className="border-l-2 border-black/15 pl-3 text-sm leading-tight font-semibold sm:pl-4 sm:text-base">
              Electronic City Campus
              <br />
              presents
            </span>
          </motion.div>

          <div className="relative w-fit">
            <h1 aria-label="Maaya" className="relative mt-6 flex w-fit items-end gap-x-1 sm:mt-8 sm:gap-x-2">
              {LETTERS.map((l, i) => (
                <motion.span
                  key={i}
                  aria-hidden="true"
                  title={l.world}
                  {...slap(i)}
                  {...peel(l.tilt)}
                  onDragStart={() => playWorldSwitch(l.note)}
                  whileHover={finePointer && !reduce ? { y: -8, rotate: l.tilt * 0.4, transition: { type: "spring", stiffness: 400, damping: 12 } } : undefined}
                  className={`${l.chip} ${finePointer ? "grab" : ""} relative grid h-[5.2rem] w-[3.9rem] touch-auto place-items-center overflow-hidden shadow-[5px_6px_0_rgb(0_0_0/0.85)] select-none sm:h-[8.5rem] sm:w-[6.4rem] lg:h-[9.5rem] lg:w-[7.1rem]`}
                >
                  <span className={`${l.ink} pointer-events-none block text-[3.6rem] leading-none sm:text-[6rem] lg:text-[6.8rem]`}>{l.ch}</span>
                </motion.span>
              ))}
              <motion.span
                aria-hidden="true"
                {...(reduce
                  ? { style: { rotate: "12deg" } }
                  : { initial: { opacity: 0, scale: 2.2, rotate: -30 }, animate: gate({ opacity: 0, scale: 2.2, rotate: -30 }, { opacity: 1, scale: 1, rotate: 12 }), transition: { type: "spring", stiffness: 480, damping: 16, delay: 0.85 } })}
                {...peel(12)}
                className={`${finePointer ? "grab" : ""} sticker absolute -right-3 -bottom-5 z-10 bg-riso-yellow px-2 py-1 text-2xl font-black select-none sm:-right-9 sm:-bottom-4 sm:text-4xl`}
              >
                '26
              </motion.span>
            </h1>
          </div>

          <motion.div {...land(0, { x: 0, y: 90, r: 4 })} className="mt-9 sm:mt-10">
            <Overprint text="ECLECTRIA" className="text-[2.6rem] leading-[0.95] font-black tracking-tight expanded sm:text-7xl lg:text-[5.4rem]" />
          </motion.div>
          <motion.p {...land(0.1, { x: -60, y: 20, r: -14 }, -2)} className="mt-3 inline-block bg-black px-3 py-1 font-script text-xl text-white sm:text-3xl">
            Different by design
          </motion.p>

          <motion.div {...land(0.2, { x: 0, y: 120, r: 6 }, 0.6)} className="scrap relative mt-8 max-w-xl p-4 sm:p-5">
            <span className="tape -top-3 left-6 -rotate-6" aria-hidden="true" />
            <p className="text-lg leading-snug font-extrabold sm:text-xl">Five days. Five identities. One world.</p>
            <p className="mt-1.5 text-base leading-relaxed text-black/80">
              ECLECTRIA is a world where different styles, eras, cultures and identities come together.
            </p>
          </motion.div>

          <motion.div {...land(0.3, { x: 0, y: 80, r: 0 })} className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#programme"
              onClick={playClick}
              className="inline-flex min-h-12 items-center bg-black px-6 text-base font-black text-riso-yellow shadow-[5px_5px_0_var(--color-riso-blue)] transition-all hover:-translate-y-1 hover:shadow-[8px_9px_0_var(--color-riso-blue)] active:translate-y-0.5 active:shadow-[2px_2px_0_var(--color-riso-blue)] sm:text-lg"
            >
              Explore events
            </a>
            <a
              href="#venues"
              onClick={playClick}
              className="inline-flex min-h-12 items-center border-[3px] border-black bg-paper px-5 text-base font-black shadow-[5px_5px_0_#000] transition-all hover:-translate-y-1 hover:shadow-[8px_9px_0_#000] active:translate-y-0.5 active:shadow-[2px_2px_0_#000] sm:text-lg"
            >
              Open the 3D campus
            </a>
          </motion.div>
        </div>

        {/* ── Right: date, countdown board, contents ── */}
        <div className="relative lg:col-span-5 lg:pt-6">
          <div className="flex flex-wrap items-start gap-4 sm:gap-6">
            <motion.div
              {...(reduce
                ? { style: { rotate: "8deg" } }
                : { initial: { opacity: 0, scale: 0.3, rotate: -60 }, animate: gate({ opacity: 0, scale: 0.3, rotate: -60 }, { opacity: 1, scale: 1, rotate: 8 }), transition: { type: "spring", stiffness: 300, damping: 12, delay: 1.1 } })}
              {...peel(8)}
              className={`${finePointer ? "grab" : ""} starburst grid size-40 shrink-0 place-items-center bg-riso-yellow text-center select-none sm:size-48`}
            >
              <span className="pointer-events-none block leading-none">
                <span className="block text-[2.6rem] font-black tracking-tight condensed sm:text-5xl">23–24</span>
                <span className="block text-base font-extrabold sm:text-lg">October 2026</span>
              </span>
            </motion.div>

            <motion.div
              {...(reduce
                ? {}
                : { initial: { opacity: 0, scale: 0.4, rotate: 25 }, animate: gate({ opacity: 0, scale: 0.4, rotate: 25 }, { opacity: 1, scale: 1, rotate: -4 }), transition: { type: "spring", stiffness: 260, damping: 13, delay: 1.25 } })}
              style={reduce ? { rotate: "-4deg" } : undefined}
              className="pt-3"
            >
              <Jago reduce={reduce} />
            </motion.div>

            {/* Countdown: an airport departure board */}
            <motion.div {...land(0.35, { x: 120, y: -20, r: 10 }, -2)} className="relative bg-[#0c0c0c] p-3.5 text-white shadow-[6px_6px_0_rgb(0_0_0/0.4)] sm:p-4">
              <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" aria-hidden="true" />
              <p className="flex items-center gap-2 text-sm font-bold text-riso-yellow">
                <span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-riso-yellow" />
                {t.done ? "Now boarding: Maaya" : "Doors open in"}
              </p>
              <div className="mt-2 flex items-start gap-2.5 text-[1.9rem] leading-none font-black tabular-nums condensed sm:text-[2.3rem]">
                {[
                  [t.days, "days"],
                  [pad(t.hours), "hrs"],
                  [pad(t.minutes), "min"],
                  [pad(t.seconds), "sec"],
                ].map(([v, unit]) => (
                  <span key={unit} className="flex flex-col items-center">
                    <SplitFlap value={pad(v)} label={`${v} ${unit}`} />
                    <span className="mt-1.5 text-[0.7rem] font-bold tracking-wide text-white/70 uppercase not-italic [font-stretch:100%]">{unit}</span>
                  </span>
                ))}
              </div>
              <p className="mt-2.5 text-xs font-semibold text-white/75">{FESTIVAL_INFO.preFestDates}</p>
            </motion.div>
          </div>

          {/* In this issue: the site's sections, in page order */}
          <motion.nav {...land(0.45, { x: 140, y: 60, r: 14 }, 1)} aria-label="In this issue" className="scrap relative mt-8 p-5 sm:p-6">
            <span className="tape -top-3 right-8 rotate-3" aria-hidden="true" />
            <p className="font-script text-2xl">In this issue</p>
            <ol className="mt-3 divide-y-2 divide-dashed divide-black/25">
              {WORLDS.map((w, i) => (
                <li key={w.id}>
                  <a href={w.href} onClick={playClick} className="group flex items-center gap-3 py-2.5">
                    <span aria-hidden="true" className={`${w.swatch} size-10 shrink-0 border-2 border-black transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110`} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-lg leading-tight font-black group-hover:underline">{w.part}</span>
                      <span className="block text-sm text-black/70">
                        {w.title}. {CONTENTS_NOTE[w.id]}
                      </span>
                    </span>
                    <span className="text-sm font-black tabular-nums transition-transform group-hover:translate-x-1">{pad(i + 2)}</span>
                  </a>
                </li>
              ))}
            </ol>
          </motion.nav>
        </div>
      </div>
      <span className="edge-torn flip bottom-0" style={{ "--edge": "var(--color-denim)" }} aria-hidden="true" />
    </section>
  );
}
