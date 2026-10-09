import React, { useEffect, useState } from "react";
import { Maximize2, Minimize2, ExternalLink } from "lucide-react";
import { VENUES_DATA, FESTIVAL_INFO } from "../data/festivalData";
import { playClick } from "../utils/audioEffects";

// World 1 — Denim & Street. The 3D island sits in a stitched denim pocket
// with copper rivets; the venues are embroidered patches sewn on below.
const PATCHES = [
  { bg: "bg-[#c8401e]", text: "text-white", shape: "rounded-[2rem] lg:aspect-square lg:rounded-full", tilt: "-rotate-2" },
  { bg: "bg-[#f3ead3]", text: "text-denim-deep", shape: "rounded-[2rem] sm:rounded-t-[9rem]", tilt: "rotate-1" },
  { bg: "bg-[#e9b44c]", text: "text-black", shape: "rounded-[2rem]", tilt: "rotate-2" },
  { bg: "bg-[#1f6f66]", text: "text-white", shape: "rounded-[2rem] sm:rounded-t-[9rem]", tilt: "-rotate-1" },
  { bg: "bg-[#f4a3c0]", text: "text-black", shape: "rounded-[2rem] lg:aspect-square lg:rounded-full", tilt: "rotate-1" },
  { bg: "bg-white", text: "text-black", shape: "rounded-[2rem]", tilt: "-rotate-2" },
];

export default function CampusIslandSection() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const islandUrl = FESTIVAL_INFO.festIslandUrl;

  useEffect(() => {
    if (!isFullscreen) return;
    const onKey = (e) => e.key === "Escape" && setIsFullscreen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  return (
    <section id="venues" className="tex-denim grain-dark relative z-[5] px-4 pt-20 pb-24 text-white sm:px-6 sm:pt-24 lg:px-8">
      <div className="relative z-[2] mx-auto max-w-6xl">
        {/* World label: a leather jeans patch */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-block -rotate-2 rounded-sm bg-leather px-3 py-1.5 text-sm font-bold text-[#f6dcc0] shadow-[inset_0_0_0_2px_rgb(0_0_0/0.25),0_3px_0_rgb(0_0_0/0.4)] [text-shadow:0_1px_0_rgb(0_0_0/0.5)]">
              World 1: Denim &amp; Street
            </p>
            <h2 className="mt-4 max-w-3xl -rotate-1 font-marker text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl">
              Six venues, one floating island
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white sm:text-lg">
              PES University's EC campus, rebuilt as a low-poly 3D island. Drag it around, zoom in, and find the building your event is in.
            </p>
          </div>
        </div>

        {/* The pocket */}
        <div
          className={
            isFullscreen
              ? "fixed inset-2 z-[70] flex flex-col bg-denim-deep p-2 sm:inset-4"
              : "tex-denim stitched relative mt-10 rounded-b-[2.5rem] rounded-t-lg border-2 border-denim-deep p-3 shadow-[0_14px_0_-4px_rgb(0_0_0/0.35)] sm:p-5"
          }
        >
          {!isFullscreen && (
            <>
              <span className="rivet top-3 left-3" aria-hidden="true" />
              <span className="rivet top-3 right-3" aria-hidden="true" />
            </>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3 px-1 pb-3 sm:px-3">
            <p className="font-marker text-xl text-thread sm:text-2xl">Fest Island, live</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setIsFullscreen((f) => !f);
                }}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-thread px-4 text-sm font-bold text-thread transition-colors hover:bg-thread hover:text-denim-deep"
              >
                {isFullscreen ? <Minimize2 size={16} aria-hidden="true" /> : <Maximize2 size={16} aria-hidden="true" />}
                {isFullscreen ? "Exit full screen" : "Full screen"}
              </button>
              <a
                href={islandUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-leather px-4 text-sm font-bold text-[#f6dcc0] shadow-[inset_0_0_0_2px_rgb(0_0_0/0.25)]"
              >
                Open in a new tab
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
          <iframe
            src={islandUrl}
            title="Fest Island: PES University's EC campus in 3D"
            className={`w-full rounded-lg border-2 border-black bg-[#120b2b] ${isFullscreen ? "flex-1" : "h-[440px] sm:h-[560px] md:h-[640px]"}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
          />
        </div>

        {/* Venues as embroidered patches */}
        <h3 className="mt-16 font-marker text-3xl text-thread sm:text-4xl">Where things happen</h3>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {VENUES_DATA.map((venue, i) => {
            const p = PATCHES[i % PATCHES.length];
            return (
              <li key={venue.id} className={`${p.tilt} transition-transform hover:rotate-0`}>
                <a
                  href={islandUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  className={`${p.bg} ${p.text} ${p.shape} relative flex h-full min-h-44 flex-col items-center justify-center border-[6px] border-thread px-7 py-8 text-center shadow-[0_0_0_3px_var(--color-denim-deep),0_8px_0_3px_rgb(0_0_0/0.35)] outline-2 outline-offset-[-14px] outline-current/40 outline-dashed`}
                >
                  <span className="text-2xl leading-none font-black uppercase condensed sm:text-[1.7rem]">{venue.name}</span>
                  <span className="mt-2 max-w-[16rem] text-sm leading-snug font-medium opacity-90">{venue.role}</span>
                  <span className="mt-3 text-sm font-black underline decoration-2 underline-offset-4">Find it in 3D</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <span className="edge-fringe -bottom-[25px]" aria-hidden="true" />
    </section>
  );
}
