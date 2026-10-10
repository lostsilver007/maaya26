import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import PesuSeal from "../PesuSeal";

// Support any file extension for cr1 and cr2 (png, jpg, jpeg, webp, avif)
const creditPhotos = import.meta.glob("../../assets/credits/cr*.*", { eager: true, import: "default" });

const getPhotoUrl = (num) => {
  const prefix = `../../assets/credits/cr${num}.`;
  for (const [path, url] of Object.entries(creditPhotos)) {
    if (path.startsWith(prefix)) {
      return url;
    }
  }
  return null;
};

const InstagramIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedInIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M4 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM2.3 9h3.4v12H2.3V9Zm6 0h3.3v1.7h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.4V21h-3.4v-6c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H8.3V9Z" />
  </svg>
);

const CREATORS = [
  {
    id: 1,
    photoNum: 1,
    name: "Sreevatshan S",
    role: "Lead Developer & Architect",
    tagline: "Core Architecture & Crazier build",
    quote: "Built the core, pushed at 3 AM, and somehow made it run fast.",
    passNo: "01",
    themeBadge: "bg-riso-yellow text-black",
    tapeColor: "-rotate-3",
    instagramLinks: [
      {
        label: "@_sreevats_",
        url: "https://www.instagram.com/_sreevats_?exln=MWVqbnZqMGRpNTZ2dQ==",
      },
      {
        label: "@shadow.vats",
        url: "https://www.instagram.com/shadow.vats?obrf=MTNib3oyNmFkZDk0dQ==",
      },
    ],
    linkedin: "https://www.linkedin.com/in/sreevatshan-s-9a3873393/",
  },
  {
    id: 2,
    photoNum: 2,
    name: "Swarnendu Bhattacharyya",
    role: "Lead Developer & Architect",
    tagline: "Core Architecture & Interactive Systems",
    quote: "Obsessed over every transition, animation, and micro-interaction.",
    passNo: "02",
    themeBadge: "bg-riso-pink text-black",
    tapeColor: "rotate-3",
    instagramLinks: [
      {
        label: "@swarnendu_7",
        url: "https://www.instagram.com/swarnendu_7?obrf=NGQ0NTRsOXc1cTBs",
      },
    ],
    linkedin: "https://www.linkedin.com/in/swarnendu-bhattacharyya-b160b3376/",
  },
];

function CreatorPolaroid({ creator, index }) {
  const photo = getPhotoUrl(creator.photoNum);
  const [imgError, setImgError] = useState(false);
  const tilt = index % 2 === 0 ? "-rotate-1" : "rotate-1";

  return (
    <li className={`group relative w-full max-w-[21.5rem] sm:max-w-none border-[3.5px] border-black bg-white p-4 pb-6 text-black shadow-[8px_8px_0_#000] transition-all duration-200 hover:-translate-y-2 hover:shadow-[12px_12px_0_#000] hover:rotate-0 ${tilt}`}>
      {/* Tape on top */}
      <span className={`tape -top-3.5 left-1/2 -translate-x-1/2 ${creator.tapeColor}`} aria-hidden="true" />

      {/* Uncropped 1:1 square photo with halftone finish */}
      <div className="relative aspect-square w-full overflow-hidden border-[3px] border-black bg-zinc-950 shadow-[3px_3px_0_#000]">
        {photo && !imgError ? (
          <img
            src={photo}
            alt={`Portrait of ${creator.name}`}
            onError={() => setImgError(true)}
            className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-102"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-riso-yellow font-black text-4xl text-black">
            {creator.name
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </div>
        )}
        <div aria-hidden="true" className="halftone pointer-events-none absolute inset-0 opacity-15 mix-blend-multiply" />
      </div>

      {/* Creator Info */}
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-sans text-2xl font-black leading-tight sm:text-3xl tracking-tight uppercase">{creator.name}</h3>
          <p className="mt-1 font-marker text-sm font-normal text-ticket-red sm:text-base">{creator.role}</p>
        </div>
        <span className={`shrink-0 border-2 border-black font-cosmic text-[0.65rem] font-black uppercase px-2 py-0.5 shadow-[2px_2px_0_#000] ${creator.themeBadge}`}>
          DEV #{creator.passNo}
        </span>
      </div>

      {/* Tagline Badge */}
      <div className="mt-2">
        <span className="inline-block border border-black/30 bg-black/5 px-2 py-0.5 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-black/80">
          {creator.tagline}
        </span>
      </div>

      {/* Punchy developer quote */}
      <blockquote className="mt-3 border-l-[3.5px] border-black bg-amber-50/90 px-3 py-2 text-xs italic font-medium text-black/90 shadow-[2px_2px_0_#000]">
        "{creator.quote}"
      </blockquote>

      {/* Social Links */}
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t-2 border-dashed border-black/20 pt-3.5">
        {creator.instagramLinks.map((ig) => (
          <a
            key={ig.url}
            href={ig.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${creator.name} on Instagram, ${ig.label}`}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border-2 border-black bg-white px-3 font-sans text-xs font-bold shadow-[2px_2px_0_#000] transition-all hover:-translate-y-0.5 hover:bg-riso-pink active:translate-y-0"
          >
            <InstagramIcon />
            <span>{ig.label}</span>
          </a>
        ))}
        {creator.linkedin && (
          <a
            href={creator.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${creator.name} on LinkedIn`}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border-2 border-black bg-white px-3 font-sans text-xs font-bold shadow-[2px_2px_0_#000] transition-all hover:-translate-y-0.5 hover:bg-[#7fc4ee] active:translate-y-0"
          >
            <LinkedInIcon />
            <span>LinkedIn</span>
          </a>
        )}
      </div>
    </li>
  );
}

export default function CreditsPage() {
  return (
    <main id="main" className="grain relative min-h-dvh overflow-hidden bg-riso-blue px-4 pt-28 pb-24 sm:px-6 lg:px-8">
      {/* Halftone texture overlay */}
      <div aria-hidden="true" className="halftone absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative z-[2] mx-auto max-w-5xl">
        {/* Top Navigation & Official Seal */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a
            href="#top"
            className="inline-flex min-h-11 items-center gap-2 border-2 border-black bg-black px-4 text-sm font-black text-riso-yellow shadow-[4px_4px_0_#000] transition-transform hover:-translate-y-0.5"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to the site
          </a>
          <PesuSeal world="paper" size="sm" />
        </div>

        {/* Main Vibrant Festival Paper Container */}
        <article className="grain relative mt-7 border-[4px] border-black bg-white px-5 pt-8 pb-10 text-black shadow-[10px_10px_0_#000] sm:px-10 sm:pt-11 sm:pb-12">
          {/* Top Tape Decors */}
          <span className="tape -top-3.5 left-10 -rotate-6" aria-hidden="true" />
          <span className="tape -top-3.5 right-10 rotate-6" aria-hidden="true" />

          {/* Cool Right-Side Sticker Badge */}
          <div className="hidden sm:block absolute top-24 right-7 sm:top-28 sm:right-10 lg:top-36 lg:right-12 z-10">
            <div className="relative rotate-6 transition-all duration-200 hover:rotate-0 hover:scale-105">
              <span className="tape -top-3.5 left-1/2 -translate-x-1/2 -rotate-3" aria-hidden="true" />
              <div className="border-[3px] border-black bg-riso-pink px-4 py-3.5 text-center shadow-[5px_5px_0_#000]">
                <div className="mt-1 flex items-center justify-center gap-2.5 text-3xl sm:text-4xl">
                  <span>👾</span>
                  <span>⚡</span>
                </div>
                <span className="mt-2 block font-marker text-xs text-black uppercase tracking-wider">
                  Built Diff!
                </span>
                <span className="mt-1 block border-t border-black/30 pt-1 font-mono text-[0.6rem] font-black text-black/80 uppercase tracking-widest">
                  PESU '26 // PROD
                </span>
              </div>
            </div>
          </div>

          {/* Grand Multi-Font Header */}
          <div className="text-center sm:text-left sm:pr-36">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="sticker -rotate-2 border-[2.5px] border-black bg-riso-pink px-4 py-1.5 font-marker text-sm tracking-wider text-black shadow-[4px_4px_0_#000] sm:text-base">
                ⚡ BEHIND THE SCENES ⚡
              </span>
              <span className="font-script text-xl text-riso-pink-deep sm:text-2xl">
                The architects of Eclectria
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-baseline gap-3">
              <h1 className="whitespace-nowrap font-cosmic text-3xl font-black uppercase tracking-tight text-black sm:text-5xl lg:text-6xl [text-shadow:4px_4px_0_var(--color-riso-yellow)]">
                WEBSITE CREDITS
              </h1>
              <span className="sticker rotate-3 border-[2.5px] border-black bg-riso-yellow px-3 py-1 font-mono text-xs font-black uppercase text-black shadow-[3px_3px_0_#000]">
                OFFICIAL BUILD ✦
              </span>
            </div>

            <p className="mt-3 max-w-2xl font-sans text-base font-bold leading-relaxed text-black/80 sm:text-lg">
              Architected, engineered, and shipped for <span className="border-b-2 border-black bg-riso-yellow/80 px-1 font-black">MAAYA 2026: ECLECTRIA</span> at PES University Electronic City Campus.
            </p>
          </div>

          {/* Dynamic Duo Crest Banner */}
          <div className="mt-10 flex flex-col items-center">
            <div className="relative inline-block transition-transform hover:scale-105">
              <div className="sticker -rotate-1 flex items-center gap-2.5 border-[3.5px] border-black bg-riso-yellow px-6 py-2.5 shadow-[5px_5px_0_#000]">
                <span className="text-xl">⚡</span>
                <span className="font-varsity text-xl font-black tracking-widest text-black sm:text-3xl uppercase">
                  Dynamic Duo
                </span>
                <span className="text-xl">⚡</span>
              </div>
              <span className="absolute -bottom-2.5 right-3 rotate-2 border border-black bg-black px-2 py-0.5 font-mono text-[0.65rem] font-black uppercase tracking-wider text-riso-yellow shadow-[1px_1px_0_#fff]">
                SHARED ARCHITECTURE
              </span>
            </div>
          </div>

          {/* Polaroid Cards Grid */}
          <ul className="mx-auto mt-9 grid max-w-3xl justify-items-center gap-8 sm:grid-cols-2">
            {CREATORS.map((creator, i) => (
              <CreatorPolaroid key={creator.id} creator={creator} index={i} />
            ))}
          </ul>

          {/* High-Impact Dev Log — Styled with Custom Fonts */}
          <div className="relative mx-auto mt-14 max-w-3xl border-[3.5px] border-black bg-gradient-to-br from-amber-50 via-white to-pink-50 p-5 shadow-[8px_8px_0_#000] sm:p-7">
            <span className="tape -top-3 left-10 -rotate-4" aria-hidden="true" />
            <span className="tape -top-3 right-10 rotate-4" aria-hidden="true" />

            <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-dashed border-black/25 pb-3">
              <div>
                <p className="font-script text-xl text-riso-pink-deep">The dev log</p>
                <h2 className="font-cosmic text-xl font-black uppercase tracking-tight sm:text-2xl">How this got made</h2>
              </div>
              <span className="rotate-2 border-2 border-black bg-riso-yellow px-3 py-1 font-mono text-xs font-black uppercase shadow-[2.5px_2.5px_0_#000]">
                500+ Commits
              </span>
            </div>

            <ul className="mt-4 space-y-3 font-sans text-sm font-semibold text-black/90">
              <li className="flex items-start gap-2.5">
                <span className="text-base font-black text-riso-pink-deep leading-none">✦</span>
                <span>Zero templates used — custom components, canvas audio, interactive ticket stubs, and 3D elements built from scratch.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-base font-black text-riso-pink-deep leading-none">✦</span>
                <span>Fueled by ungodly late-night G-Meets, PES canteen runs, and pushing straight to production before sunrise.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-base font-black text-riso-pink-deep leading-none">✦</span>
                <span>If something feels buttery smooth, that was intentional. If something breaks... refresh the page, it never happened.</span>
              </li>
            </ul>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t-2 border-dashed border-black/25 pt-4 text-xs font-bold text-black/70">
              <span className="font-mono tracking-wider uppercase">BUILD // MAAYA '26 · PESU ECC</span>
              <span className="font-marker text-sm font-normal text-ticket-red uppercase tracking-wider">Built for the students · by the students</span>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
