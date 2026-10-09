import React from "react";

export default function MarqueeTicker() {
  const genresRow1 = [
    "MEMPHIS",
    "BAUHAUS",
    "BOLLYWOOD",
    "BAROQUE",
    "ART DECO",
    "PUNK",
    "Y2K",
    "BENGALURU",
    "AFROBEAT",
    "KOLAM",
    "CHIPTUNE",
    "CYBERPUNK",
  ];

  const genresRow2 = [
    "KOLAM",
    "AFROBEAT",
    "BENGALURU",
    "Y2K",
    "PUNK",
    "ART DECO",
    "BAROQUE",
    "BOLLYWOOD",
    "BAUHAUS",
    "MEMPHIS",
  ];

  return (
    <section className="py-6 space-y-3 overflow-hidden select-none">
      {/* Top Banner - Bright Lime Bar */}
      <div className="bg-[#CDFA4E] py-3.5 shadow-[0_0_30px_rgba(205,250,78,0.25)] -rotate-1 scale-105">
        <div className="flex whitespace-nowrap animate-marquee-slow w-max">
          {[...genresRow1, ...genresRow1, ...genresRow1].map((item, idx) => (
            <span
              key={idx}
              className="flex items-center gap-4 text-black font-space font-black tracking-[0.25em] text-sm sm:text-base px-4"
            >
              <span>✦</span>
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Banner - Ghost Cyan Outline Banner */}
      <div className="border-y border-white/10 py-3 bg-black/40 rotate-1 scale-105">
        <div className="flex whitespace-nowrap animate-marquee-reverse w-max">
          {[...genresRow2, ...genresRow2, ...genresRow2].map((item, idx) => (
            <span
              key={idx}
              className="flex items-center gap-4 font-shrikhand text-[#54D8F2] tracking-[0.2em] text-sm sm:text-base px-6 opacity-85 hover:opacity-100 transition-opacity"
            >
              <span>✦</span>
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
