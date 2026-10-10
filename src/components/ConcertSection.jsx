import React, { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Ticket, Volume2 } from "lucide-react";
import { CONCERT_DATA, CONCERT_PASSES, FESTIVAL_INFO } from "../data/festivalData";
import { playBassDrop, isSoundEnabled, setSoundEnabled } from "../utils/audioEffects";
import ChromeBlob from "./fx/ChromeBlob";
import PassGuide from "./PassGuide";
import posterJpg from "../assets/concert/seher-band-poster-720.jpg";
import poster720 from "../assets/concert/seher-band-poster-720.webp";
import poster1080 from "../assets/concert/seher-band-poster-1080.webp";

// World 3 — Cosmic Glamour. Deep space, liquid chrome, and the headliner's
// official poster (Seher Band) in a holographic frame that tilts with the
// pointer.
function PosterCard() {
  const card = useRef(null);
  const reduce = useReducedMotion();
  const [guide, setGuide] = useState(false);
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
    <>
    <div
      ref={card}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="tex-holo relative mx-auto w-full max-w-[17.5rem] rotate-2 rounded-3xl p-2 shadow-[0_30px_60px_-20px_rgb(255_122_217/0.55)] transition-transform duration-150 ease-out sm:max-w-[21rem] sm:p-2.5"
    >
      <div className="overflow-hidden rounded-[1.1rem] bg-space">
        <picture>
          <source type="image/webp" srcSet={`${poster720} 720w, ${poster1080} 1080w`} sizes="(min-width: 640px) 21rem, 17.5rem" />
          <img
            src={posterJpg}
            alt={`Maaya '26 Concert poster: ${CONCERT_DATA.headliner}`}
            width="720"
            height="900"
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        </picture>
        <div className="px-4 pt-3.5 pb-4 text-center sm:px-5 sm:pb-5">
          <p className="text-xs font-bold tracking-wide text-holo-cyan uppercase">{CONCERT_PASSES.tier} passes</p>
          <p className="mt-1 font-cosmic text-3xl leading-none font-black chrome tabular-nums">{CONCERT_PASSES.price}</p>
          <p className="mt-2 text-sm leading-relaxed text-white/85">Live now on {CONCERT_PASSES.portal}. Grab yours before prices go up.</p>
          <button
            type="button"
            onClick={() => setGuide(true)}
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-black text-space transition-transform hover:scale-105 sm:text-base"
          >
            <Ticket size={16} aria-hidden="true" />
            Get your pass
          </button>
          <a
            href={FESTIVAL_INFO.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-11 items-center px-2 text-sm font-bold text-white/85 underline decoration-holo-pink decoration-2 underline-offset-4 hover:text-white"
          >
            Updates on @maayapesu
          </a>
        </div>
      </div>
    </div>
    {/* Outside the card, so moving over the dialog doesn't tilt it */}
    <PassGuide open={guide} onClose={() => setGuide(false)} />
    </>
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
  const ring = `Concert pro-night ✦ 24 October ✦ MRD main stage ✦ ${CONCERT_DATA.headliner} live ✦`;

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
            <div className="tex-holo rounded-full px-5 py-2.5 text-space">
              <dt className="sr-only">Headliner</dt>
              <dd className="text-base font-black">{CONCERT_DATA.headliner} live</dd>
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
          <div className="relative z-10 -mt-6 sm:-mt-32">
            <PosterCard />
          </div>
        </div>
      </div>
      {/* Athletic stripes: the way into the next world */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-[3] h-6 bg-[linear-gradient(var(--color-varsity)_0_33%,var(--color-jersey)_33%_66%,var(--color-court)_66%)]" />
    </section>
  );
}
