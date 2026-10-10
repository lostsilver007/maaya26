import React, { useEffect, useState } from "react";
import { playClick } from "../utils/audioEffects";
import { WORLDS } from "./worlds";

// Laptops: the zine's spine down the right edge. One swatch per world (plus
// the cover); the one you're reading sticks out, and each jumps to its world.
const ITEMS = [{ id: "cover", href: "#top", part: "Cover", title: "Riso zine", swatch: "tex-riso" }, ...WORLDS];

export default function WorldSpine() {
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const sections = ITEMS.map((i) => document.querySelector(i.href)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Worlds" className="fixed top-1/2 right-3 z-40 hidden -translate-y-1/2 flex-col gap-2 2xl:flex min-[1340px]:flex">
      {ITEMS.map((item) => {
        const on = active === item.href;
        return (
          <a
            key={item.id}
            href={item.href}
            onClick={playClick}
            aria-current={on ? "true" : undefined}
            className="group relative flex items-center justify-end"
          >
            <span className="pointer-events-none absolute right-full mr-3 translate-x-2 bg-black px-2 py-1 text-sm font-bold whitespace-nowrap text-white opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
              {item.part}
            </span>
            <span
              aria-hidden="true"
              className={`${item.swatch} block border-2 border-black shadow-[2px_2px_0_#000] transition-all duration-300 ${on ? "h-12 w-7 -translate-x-1" : "h-6 w-5 opacity-80 group-hover:opacity-100"}`}
            />
            <span className="sr-only">{item.part}</span>
          </a>
        );
      })}
    </nav>
  );
}
