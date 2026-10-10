import React, { useState } from "react";
import { CORE_TEAM } from "../../data/festivalData";
import PageShell from "./PageShell";
import kushalPhoto from "../../assets/core/vakalapudi-kushal.webp";
import viswajithPhoto from "../../assets/core/malepati-viswajith.webp";

// Portraits sent directly (their sheet entries link a Drive folder, not a
// photo), cropped to the card and bundled with the site.
const LOCAL_PHOTOS = {
  "Vakalapudi Kushal": kushalPhoto,
  "Malepati Viswajith": viswajithPhoto,
};

// The core team as polaroids taped into the zine: the Head and Co-Head up top,
// then the domain heads, in the order of the team's sheet.

// Portraits are served straight from Google Drive (the files must be shared
// as "Anyone with the link"). If one won't load, the next source is tried,
// then the card falls back to the person's initials.
const driveSources = (id) => (id ? [`https://lh3.googleusercontent.com/d/${id}=w600`, `https://drive.google.com/thumbnail?id=${id}&sz=w600`] : []);
const INKS = ["bg-riso-pink", "bg-riso-yellow", "bg-[#7fc4ee]", "bg-[#9fd8a6]"];
const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

function Portrait({ person, index, big }) {
  const local = LOCAL_PHOTOS[person.name];
  const sources = local ? [local] : driveSources(person.photo);
  const [tryNo, setTryNo] = useState(0);
  const src = sources[tryNo];
  return (
    <div className={`relative aspect-[4/5] overflow-hidden border-2 border-black ${INKS[index % INKS.length]}`}>
      {src ? (
        <img
          src={src}
          alt={`Portrait of ${person.name}`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setTryNo((n) => n + 1)}
          className="absolute inset-0 h-full w-full object-cover object-[50%_25%]"
        />
      ) : (
        <span aria-hidden="true" className={`absolute inset-0 grid place-items-center font-black tracking-tight text-black/80 ${big ? "text-7xl" : "text-5xl"}`}>
          {initials(person.name)}
        </span>
      )}
      <div aria-hidden="true" className="halftone pointer-events-none absolute inset-0 opacity-15 mix-blend-multiply" />
    </div>
  );
}

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

function Socials({ person }) {
  return (
    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
      {person.instagram && (
        <a
          href={`https://www.instagram.com/${person.instagram}/`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${person.name} on Instagram, @${person.instagram}`}
          className="inline-flex min-h-9 max-w-full min-w-0 items-center gap-1.5 rounded-2xl border-2 border-black bg-white px-2.5 py-1 text-xs font-bold transition-colors hover:bg-riso-pink"
        >
          <InstagramIcon />
          <span className="min-w-0 leading-tight break-all">@{person.instagram}</span>
        </a>
      )}
      {person.linkedin && (
        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${person.name} on LinkedIn`}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full border-2 border-black bg-white px-2.5 text-xs font-bold transition-colors hover:bg-[#7fc4ee]"
        >
          <LinkedInIcon />
          LinkedIn
        </a>
      )}
    </div>
  );
}

function Polaroid({ person, index, big = false, className = "" }) {
  const tilt = ["-rotate-1", "rotate-1", "rotate-[0.6deg]", "-rotate-[0.8deg]"][index % 4];
  return (
    <li className={`relative bg-white p-2.5 pb-4 text-black shadow-[4px_5px_0_rgb(0_0_0/0.85)] ${tilt} ${big ? "sm:p-3.5 sm:pb-5" : ""} ${className}`}>
      <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" aria-hidden="true" />
      <Portrait person={person} index={index} big={big} />
      <h3 className={`mt-3 leading-tight font-black ${big ? "text-xl sm:text-2xl" : "text-base sm:text-lg"}`}>{person.name}</h3>
      <p className={`mt-1 leading-snug font-bold text-riso-pink-deep ${big ? "text-base" : "text-sm"}`}>{person.post}</p>
      <Socials person={person} />
    </li>
  );
}

export default function CorePage() {
  const [head, coHead, ...domains] = CORE_TEAM;
  return (
    <PageShell wide kicker="The people behind Maaya '26" title="Core team" intro="Meet the team putting Maaya '26 together.">
      <ul className="mx-auto mt-10 grid max-w-2xl justify-items-center gap-8 sm:grid-cols-2">
        {[head, coHead].map((p, i) => (
          <Polaroid key={p.name} person={p} index={i} big className="w-full max-w-[17rem] sm:max-w-none" />
        ))}
      </ul>

      <h2 className="mt-16 flex items-center gap-3 text-2xl font-black sm:text-3xl">
        <span className="h-[3px] flex-1 border-t-[3px] border-dashed border-black/25" aria-hidden="true" />
        Domain heads
        <span className="h-[3px] flex-1 border-t-[3px] border-dashed border-black/25" aria-hidden="true" />
      </h2>
      <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
        {domains.map((p, i) => (
          <Polaroid key={p.name} person={p} index={i + 2} />
        ))}
      </ul>
    </PageShell>
  );
}
