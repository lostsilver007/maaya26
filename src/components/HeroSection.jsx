import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Dices } from "lucide-react";
import { FESTIVAL_INFO, EVENTS } from "../data/festivalData";
import { playClick, playWorldSwitch } from "../utils/audioEffects";
import confetti from "canvas-confetti";
import { WORLDS } from "./worlds";

// MAAYA, cut out ransom-note style: one letter from each of Eclectria's five
// worlds. This is the page's one big moment; the letters slap on in turn.
const LETTERS = [
  { ch: "M", world: "Denim & Street", chip: "tex-denim stitched", ink: "font-marker text-white", tilt: -7 },
  { ch: "A", world: "Cinema & Retro", chip: "bg-ticket", ink: "font-marquee text-ticket-red", tilt: 5 },
  { ch: "A", world: "Sports & Athleisure", chip: "tex-court", ink: "font-varsity varsity-outline", tilt: -3 },
  { ch: "Y", world: "Indian Tradition", chip: "tex-cotton-faint", ink: "font-deva text-kumkum", tilt: 6 },
  { ch: "A", world: "Cosmic Glamour", chip: "tex-space", ink: "font-cosmic chrome", tilt: -5 },
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
  cosmic: "24 October, MRD main stage",
  sports: "Retronomia to Eclectria",
  heritage: "Dates, theme, registration",
};

const pad = (n) => String(n).padStart(2, "0");

export default function HeroSection({ onSelectEvent }) {
  const reduce = useReducedMotion();
  const t = useCountdown();

  const handleRandomEvent = () => {
    playWorldSwitch(560);
    const randomEvent = EVENTS[Math.floor(Math.random() * EVENTS.length)];
    if (!reduce) {
      try {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 }, colors: ["#ff48b0", "#0078bf", "#ffe800", "#000000"] });
      } catch {
        // Confetti is decoration only.
      }
    }
    onSelectEvent(randomEvent);
  };

  // The one orchestrated entrance: the letters first, then the rest settles in.
  const slap = (i) =>
    reduce
      ? { style: { rotate: `${LETTERS[i].tilt}deg` } }
      : {
          initial: { opacity: 0, scale: 1.7, rotate: LETTERS[i].tilt * -3, y: -30 },
          animate: { opacity: 1, scale: 1, rotate: LETTERS[i].tilt, y: 0 },
          transition: { type: "spring", stiffness: 520, damping: 22, delay: 0.15 + i * 0.13 },
        };
  const after = (d) =>
    reduce ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay: 0.95 + d, ease: [0.2, 0.9, 0.3, 1] } };

  return (
    <section id="top" className="tex-riso grain relative overflow-hidden px-4 pt-24 pb-24 sm:px-6 sm:pt-28 lg:px-8">
      <div className="relative z-[2] mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-8">
        {/* ── Left: the masthead ── */}
        <div className="lg:col-span-7">
          <motion.p {...after(-0.8)} className="scrap inline-block -rotate-1 px-3 py-1.5 text-sm font-semibold sm:text-base">
            PES University Electronic City Campus presents
          </motion.p>

          <h1 aria-label="Maaya" className="relative mt-6 flex w-fit items-end gap-x-1 sm:mt-8 sm:gap-x-2">
            {LETTERS.map((l, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                title={l.world}
                {...slap(i)}
                className={`${l.chip} grid h-[5.2rem] w-[3.9rem] place-items-center overflow-hidden shadow-[5px_6px_0_rgb(0_0_0/0.85)] sm:h-[8.5rem] sm:w-[6.4rem] lg:h-[9.5rem] lg:w-[7.1rem]`}
              >
                <span className={`${l.ink} block text-[3.6rem] leading-none sm:text-[6rem] lg:text-[6.8rem]`}>{l.ch}</span>
              </motion.span>
            ))}
            <motion.span
              aria-hidden="true"
              {...(reduce
                ? { style: { rotate: "12deg" } }
                : { initial: { opacity: 0, scale: 2, rotate: 0 }, animate: { opacity: 1, scale: 1, rotate: 12 }, transition: { type: "spring", stiffness: 480, damping: 18, delay: 0.85 } })}
              className="sticker absolute -right-3 -bottom-5 z-10 bg-riso-yellow px-2 py-1 text-2xl font-black sm:-right-9 sm:-bottom-4 sm:text-4xl"
            >
              '26
            </motion.span>
          </h1>

          <motion.p {...after(0)} className="misprint mt-9 text-[2.6rem] leading-[0.95] font-black tracking-tight expanded sm:mt-8 sm:text-7xl lg:text-[5.4rem]">
            ECLECTRIA
          </motion.p>
          <motion.p {...after(0.1)} className="mt-3 inline-block -rotate-2 bg-black px-3 py-1 font-script text-xl text-white sm:text-3xl">
            Different by design
          </motion.p>

          <motion.div {...after(0.2)} className="scrap relative mt-8 max-w-xl rotate-[0.6deg] p-4 sm:p-5">
            <span className="tape -top-3 left-6 -rotate-6" aria-hidden="true" />
            <p className="text-lg leading-snug font-extrabold sm:text-xl">Five days. Five identities. One world.</p>
            <p className="mt-1.5 text-base leading-relaxed text-black/80">
              ECLECTRIA is a world where different styles, eras, cultures and identities come together.
            </p>
          </motion.div>

          <motion.div {...after(0.3)} className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#programme"
              onClick={playClick}
              className="inline-flex min-h-12 items-center bg-black px-6 text-base font-black text-riso-yellow shadow-[5px_5px_0_var(--color-riso-blue)] transition-transform hover:-translate-y-0.5 sm:text-lg"
            >
              Explore events
            </a>
            <a
              href="#venues"
              onClick={playClick}
              className="inline-flex min-h-12 items-center border-[3px] border-black bg-paper px-5 text-base font-black shadow-[5px_5px_0_#000] transition-transform hover:-translate-y-0.5 sm:text-lg"
            >
              Open the 3D campus
            </a>
            <button
              type="button"
              onClick={handleRandomEvent}
              className="sticker inline-flex min-h-12 items-center gap-2 rounded-full bg-riso-yellow px-5 text-base font-black transition-transform hover:rotate-6"
            >
              <Dices size={18} aria-hidden="true" />
              Pick a random event
            </button>
          </motion.div>
        </div>

        {/* ── Right: date, countdown, contents ── */}
        <div className="relative lg:col-span-5 lg:pt-6">
          <div className="flex flex-wrap items-start gap-4 sm:gap-6">
            <motion.div
              {...(reduce
                ? { style: { rotate: "8deg" } }
                : { initial: { opacity: 0, scale: 0.4, rotate: -40 }, animate: { opacity: 1, scale: 1, rotate: 8 }, transition: { type: "spring", stiffness: 300, damping: 14, delay: 1.1 } })}
              className="starburst grid size-40 shrink-0 place-items-center bg-riso-yellow text-center sm:size-48"
            >
              <span className="block leading-none">
                <span className="block text-[2.6rem] font-black tracking-tight condensed sm:text-5xl">23–24</span>
                <span className="block text-base font-extrabold sm:text-lg">October 2026</span>
              </span>
            </motion.div>

            {/* Countdown, on a ticket stub */}
            <motion.div {...after(0.35)} className="scrap relative -rotate-2 border-l-[6px] border-dashed border-riso-pink-deep p-4 pr-5">
              <p className="text-sm font-semibold">{t.done ? "Maaya is here" : "Doors open in"}</p>
              <p className="mt-1 flex items-baseline gap-2 font-black tabular-nums condensed">
                <span className="text-4xl sm:text-5xl">{t.days}</span>
                <span className="text-sm">days</span>
                <span className="text-3xl sm:text-4xl">{pad(t.hours)}</span>
                <span className="text-sm">hrs</span>
              </p>
              <p className="flex items-baseline gap-2 font-black tabular-nums condensed">
                <span className="text-3xl text-riso-blue sm:text-4xl">{pad(t.minutes)}</span>
                <span className="text-sm">min</span>
                <span className="text-3xl text-riso-pink-deep sm:text-4xl">{pad(t.seconds)}</span>
                <span className="text-sm">sec</span>
              </p>
              <p className="mt-2 text-xs font-semibold text-black/70">{FESTIVAL_INFO.preFestDates}</p>
            </motion.div>
          </div>

          {/* In this issue: the site's sections, in page order */}
          <motion.nav {...after(0.45)} aria-label="In this issue" className="scrap relative mt-8 rotate-1 p-5 sm:p-6">
            <span className="tape -top-3 right-8 rotate-3" aria-hidden="true" />
            <p className="font-script text-2xl">In this issue</p>
            <ol className="mt-3 divide-y-2 divide-dashed divide-black/25">
              {WORLDS.map((w, i) => (
                <li key={w.id}>
                  <a href={w.href} onClick={playClick} className="group flex items-center gap-3 py-2.5">
                    <span aria-hidden="true" className={`${w.swatch} size-10 shrink-0 border-2 border-black transition-transform group-hover:-rotate-6`} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-lg leading-tight font-black group-hover:underline">{w.part}</span>
                      <span className="block text-sm text-black/70">
                        {w.title}. {CONTENTS_NOTE[w.id]}
                      </span>
                    </span>
                    <span className="text-sm font-black tabular-nums">p.{pad(i + 2)}</span>
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
