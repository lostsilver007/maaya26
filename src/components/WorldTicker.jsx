import React from "react";
import { WORLDS } from "./worlds";

// A strip of riso-blue tape slapped across the seam between the zine cover and
// the first world. It scrolls (still under reduced motion).
export default function WorldTicker() {
  const run = WORLDS.map((w) => w.title)
    .concat(["23–24 October 2026", "PES University EC Campus"])
    .flatMap((s) => [s, "✦"]);
  return (
    <div aria-hidden="true" className="relative z-20 -my-7 overflow-hidden py-3">
      <div className="mx-[-5%] -rotate-[1.6deg] border-y-[3px] border-black bg-riso-blue py-2.5 shadow-[0_8px_0_rgb(0_0_0/0.35)]">
        <div className="ticker-track">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center gap-5 pr-5">
              {run.map((s, i) => (
                <span key={i} className={`text-lg font-black whitespace-nowrap text-white uppercase condensed sm:text-xl ${s === "✦" ? "text-riso-yellow" : ""}`}>
                  {s}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
