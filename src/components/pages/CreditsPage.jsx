import React, { useState } from "react";
import { Sparkles, Code, Terminal, ExternalLink, ShieldCheck } from "lucide-react";
import PageShell from "./PageShell";

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
  <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedInIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M4 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM2.3 9h3.4v12H2.3V9Zm6 0h3.3v1.7h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.4V21h-3.4v-6c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H8.3V9Z" />
  </svg>
);

const CREATORS = [
  {
    id: 1,
    photoNum: 1,
    name: "Sreevatshan S",
    role: "Lead Developer & Architect",
    tagline: "Architecture, Systems & Core Implementation",
    badge: "PASS NO. 01 // DEV CORE",
    themeColor: "from-amber-400 via-riso-yellow to-amber-500",
    ribbonColor: "bg-riso-yellow text-black",
    avatarBg: "bg-riso-yellow",
    quote: "Building the digital gateway to Eclectria.",
    instagramLinks: [
      {
        label: "@_sreevats_",
        url: "https://www.instagram.com/_sreevats_?exln=MWVqbnZqMGRpNTZ2dQ==",
        desc: "Main",
      },
      {
        label: "@shadow.vats",
        url: "https://www.instagram.com/shadow.vats?obrf=MTNib3oyNmFkZDk0dQ==",
        desc: "Creative",
      },
    ],
    linkedin: "https://www.linkedin.com/in/sreevatshan-s-9a3873393/",
  },
  {
    id: 2,
    photoNum: 2,
    name: "Swarnendu Bhattacharyya",
    role: "Co-Developer & Creative Engineer",
    tagline: "Interaction Design, Dynamics & Engineering",
    badge: "PASS NO. 02 // CREATIVE DEV",
    themeColor: "from-pink-400 via-riso-pink to-rose-500",
    ribbonColor: "bg-riso-pink text-black",
    avatarBg: "bg-riso-pink",
    quote: "Crafting textures, micro-interactions, and visual harmony.",
    instagramLinks: [
      {
        label: "@swarnendu_7",
        url: "https://www.instagram.com/swarnendu_7?obrf=NGQ0NTRsOXc1cTBs",
        desc: "Profile",
      },
    ],
    linkedin: "https://www.linkedin.com/in/swarnendu-bhattacharyya-b160b3376/",
  },
];

function CreatorCard({ creator }) {
  const photo = getPhotoUrl(creator.photoNum);
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group relative flex flex-col justify-between border-[3px] border-black bg-white p-5 text-black shadow-[8px_8px_0_#000] transition-all duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_0_#000] sm:p-7">
      {/* Decorative top tape / VIP seal */}
      <div className="absolute -top-3.5 left-6 z-10 -rotate-2">
        <span className={`inline-flex items-center gap-1.5 border-2 border-black px-3 py-0.5 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0_#000] ${creator.ribbonColor}`}>
          <Sparkles size={13} aria-hidden="true" />
          {creator.badge}
        </span>
      </div>

      <div className="absolute -top-3 right-6 z-10 hidden sm:block">
        <span className="inline-flex items-center gap-1 bg-black px-2.5 py-0.5 text-[0.7rem] font-bold tracking-widest text-riso-yellow uppercase">
          <ShieldCheck size={12} />
          VERIFIED ARCHITECT
        </span>
      </div>

      <div>
        {/* Photo Portrait Frame */}
        <div className="relative mt-3 aspect-[4/4.5] w-full overflow-hidden border-[3px] border-black bg-zinc-900 shadow-[4px_4px_0_#000]">
          {photo && !imgError ? (
            <img
              src={photo}
              alt={`Portrait of ${creator.name}`}
              onError={() => setImgError(true)}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className={`relative flex h-full w-full flex-col items-center justify-center p-6 text-center ${creator.avatarBg}`}>
              <div className="halftone absolute inset-0 opacity-20 mix-blend-multiply" />
              <div className="relative z-10 grid size-28 place-items-center rounded-full border-[3px] border-black bg-black text-4xl font-black text-white shadow-[4px_4px_0_#000]">
                {creator.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </div>
              <p className="relative z-10 mt-3 text-sm font-black tracking-wide text-black uppercase">
                Add photo as <span className="underline decoration-2">cr{creator.photoNum}</span>
              </p>
              <p className="relative z-10 text-xs font-semibold text-black/70">
                in <code>src/assets/credits/</code>
              </p>
            </div>
          )}

          {/* Halftone texture overlay */}
          <div aria-hidden="true" className="halftone pointer-events-none absolute inset-0 opacity-15 mix-blend-multiply" />

          {/* Shimmer gradient line on bottom of portrait */}
          <div className={`absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r ${creator.themeColor}`} />
        </div>

        {/* Creator Info Header */}
        <div className="mt-5">
          <div className="flex items-center gap-2">
            <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-wider text-black/60">Official Builder</p>
          </div>
          <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl lg:text-[2rem] leading-none">
            {creator.name}
          </h2>
          <p className="mt-1.5 text-base font-extrabold text-ticket-red sm:text-lg">
            {creator.role}
          </p>
          <p className="mt-1 text-sm font-semibold text-black/70">
            {creator.tagline}
          </p>
        </div>

        {/* Quote / Dedication */}
        <blockquote className="mt-4 border-l-[3px] border-black bg-black/5 px-3 py-2 text-sm italic font-medium text-black/80">
          "{creator.quote}"
        </blockquote>
      </div>

      {/* Social and Profile Links */}
      <div className="mt-6 border-t-[2px] border-dashed border-black/25 pt-5">
        <p className="text-xs font-black uppercase tracking-wider text-black/60">Connect & Follow</p>
        
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          {/* Instagram Link(s) */}
          {creator.instagramLinks.map((ig, i) => (
            <a
              key={ig.url}
              href={ig.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${creator.name} on Instagram, ${ig.label}`}
              className="inline-flex min-h-10 items-center gap-2 border-[2px] border-black bg-white px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0_#000] transition-all hover:-translate-y-0.5 hover:bg-riso-pink hover:shadow-[4px_4px_0_#000] active:translate-y-0"
            >
              <InstagramIcon />
              <span>{ig.label}</span>
              {creator.instagramLinks.length > 1 && (
                <span className="rounded bg-black/10 px-1 py-0.2 text-[0.65rem] font-black uppercase text-black/70">
                  {ig.desc}
                </span>
              )}
            </a>
          ))}

          {/* LinkedIn Link */}
          {creator.linkedin && (
            <a
              href={creator.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${creator.name} on LinkedIn`}
              className="inline-flex min-h-10 items-center gap-2 border-[2px] border-black bg-white px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0_#000] transition-all hover:-translate-y-0.5 hover:bg-[#7fc4ee] hover:shadow-[4px_4px_0_#000] active:translate-y-0"
            >
              <LinkedInIcon />
              <span>LinkedIn Profile</span>
              <ExternalLink size={12} aria-hidden="true" />
            </a>
          )}
        </div>

        {/* Access pass barcode aesthetic footer */}
        <div className="mt-5 flex items-center justify-between border-t border-black/15 pt-3 text-[0.7rem] font-bold text-black/50">
          <span className="tracking-widest uppercase">MAAYA 2026 // ECLECTRIA</span>
          <span className="font-mono tracking-tighter text-black/70">||| | |||| || ||| ||||</span>
        </div>
      </div>
    </article>
  );
}

export default function CreditsPage() {
  return (
    <PageShell
      wide
      kicker="The minds behind the screen"
      title="Website Credits & Engineering"
      intro="Designed, architected, and engineered from scratch for MAAYA 2026: ECLECTRIA at PES University Electronic City Campus."
    >
      {/* Grand Top Banner */}
      <div className="mt-8 border-[3px] border-black bg-black p-5 text-riso-yellow shadow-[6px_6px_0_var(--color-riso-pink)] sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-riso-pink px-2.5 py-1 text-xs font-black uppercase text-black">
              <Terminal size={14} />
              SYSTEM CREATORS
            </span>
            <h2 className="mt-2 text-xl font-black sm:text-2xl text-white">
              Two Developers. One Unified Vision.
            </h2>
            <p className="mt-1 text-sm font-semibold text-riso-yellow/80 max-w-xl">
              Bringing Eclectria's five aesthetic worlds to life with high performance, interactive 3D elements, ticket stubs, and seamless event synchronization.
            </p>
          </div>
          <div className="shrink-0">
            <span className="inline-flex items-center gap-1.5 border-2 border-riso-yellow bg-zinc-900 px-3.5 py-2 text-xs font-black tracking-widest text-riso-yellow uppercase">
              <Code size={14} />
              FULL-STACK DUO
            </span>
          </div>
        </div>
      </div>

      {/* Adjacent Side-by-Side 2 Creator Cards */}
      <section aria-label="Creators" className="mt-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {CREATORS.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </section>

      {/* Special Thanks & Project Signature */}
      <div className="mt-14 border-t-[3px] border-dashed border-black/25 pt-8 text-center">
        <p className="font-script text-2xl text-riso-pink-deep">Built for the students, by the students</p>
        <p className="mt-1 text-sm font-bold text-black/70">
          Special thanks to the MAAYA 2026 Core Team & PES University Electronic City Campus.
        </p>
      </div>
    </PageShell>
  );
}
