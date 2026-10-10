import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Menu, X } from "lucide-react";
import { playClick, setSoundEnabled, isSoundEnabled, onSoundChange } from "../utils/audioEffects";
import { WORLDS } from "./worlds";
import { PAGES, usePage } from "./pages/route";

// The two pages that aren't sections of the home page.
const PAGE_TABS = [
  { href: "#/rules", path: "/rules", label: "Rules" },
  { href: "#/legal", path: "/legal", label: "Legal" },
];

// The nav is a strip of label-maker tape stuck across the top of the zine.
export default function Navbar({ onOpenRegister }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled);
  const page = usePage();

  useEffect(() => onSoundChange(setSoundOn), []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setMobileMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileMenuOpen]);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundEnabled(next);
    if (next) playClick();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="relative mx-auto flex max-w-6xl items-center gap-2">
        {/* Masthead sticker */}
        <a
          href="#top"
          onClick={playClick}
          className="sticker relative z-10 -rotate-3 bg-riso-pink px-2.5 py-1 font-sans text-lg leading-none font-black text-black transition-transform hover:rotate-0 sm:text-xl"
          aria-label="Maaya 2026, back to the top"
        >
          MAAYA<span className="ml-1 rounded-sm bg-black px-1 align-middle text-xs text-riso-yellow">'26</span>
        </a>

        {/* Label tape */}
        <div className="label-tape flex min-h-11 flex-1 items-center gap-1 py-1.5 pr-1.5 pl-3 shadow-[0_6px_14px_-6px_rgb(0_0_0/0.6)] sm:pl-4">
          <nav aria-label="Sections" className="no-scrollbar hidden flex-1 items-center gap-0.5 overflow-x-auto lg:flex">
            {WORLDS.map((w) => (
              <a
                key={w.id}
                href={w.href}
                onClick={playClick}
                className="embossed shrink-0 rounded-sm px-3 py-1.5 text-[0.8rem] font-bold uppercase condensed transition-colors hover:bg-white/15"
              >
                {w.part}
              </a>
            ))}
            <span aria-hidden="true" className="mx-1.5 h-5 w-px shrink-0 bg-white/30" />
            {PAGE_TABS.map((t) => (
              <a
                key={t.path}
                href={t.href}
                onClick={playClick}
                aria-current={page === t.path ? "page" : undefined}
                className={`embossed shrink-0 rounded-sm px-3 py-1.5 text-[0.8rem] font-bold uppercase condensed transition-colors ${
                  page === t.path ? "bg-riso-yellow text-black [text-shadow:none]" : "hover:bg-white/15"
                }`}
              >
                {t.label}
              </a>
            ))}
          </nav>
          <span className="flex-1 lg:hidden" />

          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={soundOn}
            aria-label={soundOn ? "Sound effects on" : "Sound effects off"}
            className={`grid size-9 shrink-0 place-items-center rounded-full transition-colors ${
              soundOn ? "bg-riso-yellow text-black" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-expanded={mobileMenuOpen}
            aria-controls="zine-menu"
            aria-label={mobileMenuOpen ? "Close the menu" : "Open the menu"}
            className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-white lg:hidden"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Register sticker */}
        <button
          type="button"
          onClick={() => {
            playClick();
            onOpenRegister();
          }}
          className="sticker relative z-10 rotate-2 bg-riso-yellow px-3 py-2 text-sm font-black text-black transition-transform hover:-rotate-1 hover:scale-105 sm:px-4 sm:text-base"
        >
          Register
        </button>
      </div>

      {/* Phones: the menu is a full sheet of yellow riso paper. */}
      {mobileMenuOpen && (
        <div id="zine-menu" className="slap-in grain fixed inset-x-3 top-[4.25rem] bottom-3 overflow-y-auto bg-riso-yellow p-5 shadow-[6px_6px_0_#000] lg:hidden">
          <p className="relative z-[2] text-sm font-semibold">Pick a world</p>
          <ul className="relative z-[2] mt-3 space-y-3">
            {WORLDS.map((w, i) => (
              <li key={w.id}>
                <a
                  href={w.href}
                  onClick={() => {
                    playClick();
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 border-[3px] border-black bg-white p-2 pr-4 shadow-[4px_4px_0_#000] ${i % 2 ? "rotate-1" : "-rotate-1"}`}
                >
                  <span aria-hidden="true" className={`${w.swatch} size-12 shrink-0 border-2 border-black`} />
                  <span>
                    <span className="block text-2xl leading-none font-black condensed uppercase">{w.part}</span>
                    <span className="mt-1 block text-sm text-black/70">{w.title}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="relative z-[2] mt-6 text-sm font-semibold">The small print</p>
          <ul className="relative z-[2] mt-3 grid grid-cols-2 gap-3">
            {PAGE_TABS.map((t) => (
              <li key={t.path}>
                <a
                  href={t.href}
                  onClick={() => {
                    playClick();
                    setMobileMenuOpen(false);
                  }}
                  aria-current={page === t.path ? "page" : undefined}
                  className="flex min-h-14 items-center justify-center border-[3px] border-black bg-white px-3 text-center text-base leading-tight font-black shadow-[4px_4px_0_#000]"
                >
                  {PAGES[t.path]}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              playClick();
              setMobileMenuOpen(false);
              onOpenRegister();
            }}
            className="relative z-[2] mt-6 w-full bg-black py-4 text-lg font-black text-riso-yellow"
          >
            Register for an event
          </button>
        </div>
      )}
    </header>
  );
}
