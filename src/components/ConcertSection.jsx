import React, { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Volume2 } from "lucide-react";
import { CONCERT_DATA, FESTIVAL_INFO } from "../data/festivalData";
import { playBassDrop, isSoundEnabled, setSoundEnabled } from "../utils/audioEffects";
import ChromeBlob from "./fx/ChromeBlob";

// World 3 — Cosmic Glamour. Deep space, liquid chrome, and a holographic
// trading card for the headliner (still to be announced).
function HoloCard() {
  const card = useRef(null);
  const reduce = useReducedMotion();
  const onMove = (e) => {
    if (reduce || !card.current) return;
    const r = card.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.current.style.transform = `perspective(900px) rotateY(${x * 18}deg) rotateX(${-y * 14}deg)`;
    card.current.style.setProperty("--holo-angle", `${200 + x * 160 + y * 90}deg`);
  };
  const onLeave = () => {
    if (!card.current) return;
    card.current.style.transform = "";
    card.current.style.removeProperty("--holo-angle");
  };
  return (
    <div
      ref={card}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="tex-holo relative mx-auto w-full max-w-sm rotate-2 rounded-3xl p-2.5 shadow-[0_30px_60px_-20px_rgb(255_122_217/0.55)] transition-transform duration-150 ease-out"
    >
      <div className="rounded-[1.1rem] bg-space/90 p-6 text-center sm:p-7">
        <p className="text-sm font-bold text-holo-cyan">Headliner</p>
        <p className="mt-3 font-cosmic text-4xl leading-none font-black chrome sm:text-5xl">TBA</p>
        <p className="mt-4 text-base leading-relaxed text-white/85">Lineup reveals and student passes drop on the official Instagram page.</p>
        <a
          href={FESTIVAL_INFO.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-12 items-center rounded-full bg-white px-6 text-base font-black text-space transition-transform hover:scale-105"
        >
          Follow @maayapesu
        </a>
      </div>
    </div>
  );
}

export default function ConcertSection() {
  const reduce = useReducedMotion();
  const soundCheck = () => {
    if (!isSoundEnabled()) setSoundEnabled(true);
    playBassDrop();
    window.dispatchEvent(new Event("maaya:bass"));
  };
  // The chrome headline's highlight slides with the pointer.
  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--shine", `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  const ring = "Concert pro-night ✦ 24 October ✦ MRD main stage ✦ Headliner TBA ✦";

  return (
    <section id="concert" data-cursor="star" onPointerMove={onMove} className="tex-space grain-dark relative overflow-hidden px-4 pt-28 pb-28 text-white sm:px-6 lg:px-8">
      <span className="edge-scallop top-0" aria-hidden="true" />
      <div className="relative z-[2] mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="tex-holo inline-block -rotate-2 rounded-full px-4 py-1.5 text-sm font-black text-space">World 3: Cosmic Glamour</p>
          <p className="mt-6 text-lg font-bold text-holo-pink">Concert pro-night</p>
          <h2
            className="mt-2 font-cosmic text-[2.75rem] leading-[0.92] font-black tracking-tight chrome transition-[background-position] duration-500 ease-out sm:text-7xl lg:text-[5.6rem]"
            style={{ backgroundSize: "100% 260%", backgroundPosition: "50% var(--shine, 40%)" }}
          >
            {CONCERT_DATA.headline}
          </h2>
          <dl className="mt-8 flex flex-wrap gap-3">
            <div className="rounded-full border-2 border-holo-lilac/70 px-5 py-2.5">
              <dt className="sr-only">When</dt>
              <dd className="text-base font-bold">{CONCERT_DATA.date}</dd>
            </div>
            <div className="rounded-full border-2 border-holo-cyan/70 px-5 py-2.5">
              <dt className="sr-only">Where</dt>
              <dd className="text-base font-bold">MRD Student Center, main stage</dd>
            </div>
          </dl>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            The grand live music finale of MAAYA 2026 at PES University Electronic City Campus.
          </p>
          <button
            type="button"
            onClick={soundCheck}
            className="mt-8 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-holo-lime px-6 text-base font-black text-space shadow-[0_0_30px_rgb(200_255_122/0.45)] transition-transform hover:scale-105"
          >
            <Volume2 size={18} aria-hidden="true" />
            Play a sound check
          </button>
        </div>
        <div className="relative lg:col-span-5">
          {/* Liquid chrome, ringed by the night's details */}
          <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
            <ChromeBlob className="absolute inset-0 h-full w-full" />
            <svg viewBox="0 0 200 200" aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${reduce ? "" : "animate-[spin_40s_linear_infinite]"}`}>
              <defs>
                <path id="orbit" d="M100 100 m-88 0 a88 88 0 1 1 176 0 a88 88 0 1 1 -176 0" />
              </defs>
              <text className="fill-white/80 font-cosmic text-[9.5px] font-black tracking-[0.18em] uppercase">
                <textPath href="#orbit" textLength="548" lengthAdjust="spacing">
                  {ring}
                </textPath>
              </text>
            </svg>
          </div>
          <div className="relative z-10 -mt-24 sm:-mt-32">
            <HoloCard />
          </div>
        </div>
      </div>
      {/* Athletic stripes: the way into the next world */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-[3] h-6 bg-[linear-gradient(var(--color-varsity)_0_33%,var(--color-jersey)_33%_66%,var(--color-court)_66%)]" />
    </section>
  );
}
