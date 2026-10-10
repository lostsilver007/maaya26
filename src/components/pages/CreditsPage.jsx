import React, { useState } from "react";
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
    tagline: "Core Architecture & Systems Engineering",
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
    instagramLinks: [
      {
        label: "@swarnendu_7",
        url: "https://www.instagram.com/swarnendu_7?obrf=NGQ0NTRsOXc1cTBs",
      },
    ],
    linkedin: "https://www.linkedin.com/in/swarnendu-bhattacharyya-b160b3376/",
  },
];

function Polaroid({ creator, index }) {
  const photo = getPhotoUrl(creator.photoNum);
  const [imgError, setImgError] = useState(false);
  const tilt = index % 2 === 0 ? "-rotate-1" : "rotate-1";

  return (
    <li className={`relative w-full max-w-[19rem] sm:max-w-none bg-white p-3.5 pb-5 text-black shadow-[4px_5px_0_rgb(0_0_0/0.85)] ${tilt}`}>
      {/* Tape on top matching Core page */}
      <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" aria-hidden="true" />

      {/* Uncropped 1:1 square photo */}
      <div className="relative aspect-square w-full overflow-hidden border-2 border-black bg-zinc-900">
        {photo && !imgError ? (
          <img
            src={photo}
            alt={`Portrait of ${creator.name}`}
            onError={() => setImgError(true)}
            className="h-full w-full object-contain object-center"
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

      <h3 className="mt-3 text-xl font-black leading-tight sm:text-2xl">{creator.name}</h3>
      <p className="mt-1 text-base font-bold text-riso-pink-deep leading-snug">{creator.role}</p>
      <p className="mt-0.5 text-xs font-semibold text-black/70">{creator.tagline}</p>

      {/* Socials styled like CorePage */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {creator.instagramLinks.map((ig) => (
          <a
            key={ig.url}
            href={ig.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${creator.name} on Instagram, ${ig.label}`}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border-2 border-black bg-white px-2.5 text-xs font-bold transition-colors hover:bg-riso-pink"
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
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border-2 border-black bg-white px-2.5 text-xs font-bold transition-colors hover:bg-[#7fc4ee]"
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
    <PageShell
      wide
      kicker="The developers behind Maaya '26"
      title="Website Credits"
      intro="Meet the lead developers and architects who engineered and designed the official MAAYA 2026 web experience."
    >
      <ul className="mx-auto mt-10 grid max-w-2xl justify-items-center gap-8 sm:grid-cols-2">
        {CREATORS.map((creator, i) => (
          <Polaroid key={creator.id} creator={creator} index={i} />
        ))}
      </ul>
    </PageShell>
  );
}
