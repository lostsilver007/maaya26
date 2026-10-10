import React from "react";
import { FESTIVAL_INFO } from "../data/festivalData";
import { playClick } from "../utils/audioEffects";
import Overprint from "./fx/Overprint";

// Back cover of the zine: riso blue, paper scraps taped on.
export default function Footer({ onOpenRegister }) {
  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <footer className="grain relative overflow-hidden bg-riso-blue px-4 pt-20 pb-10 text-white sm:px-6 lg:px-8">
      <div aria-hidden="true" className="halftone absolute inset-0 opacity-60" />
      <div className="relative z-[2] mx-auto max-w-6xl">
        <Overprint
          as="p"
          text="See you at Maaya"
          keyInk="#fff"
          blend="normal"
          plates={[
            { ink: "var(--color-riso-pink)", dx: 1, dy: 0.7 },
            { ink: "var(--color-riso-yellow)", dx: -0.75, dy: -0.6 },
          ]}
          className="text-[3.2rem] leading-[0.9] font-black tracking-tight expanded sm:text-8xl lg:text-[7.5rem]"
        />
        <p className="mt-4 inline-block -rotate-1 bg-black px-3 py-1 font-script text-xl sm:text-2xl">{FESTIVAL_INFO.dates}</p>

        <div className="mt-14 grid gap-8 text-black md:grid-cols-3">
          {/* Venue */}
          <div className="scrap relative -rotate-1 p-5">
            <span className="tape -top-3 left-8 -rotate-3" aria-hidden="true" />
            <h2 className="text-xl font-black">Getting here</h2>
            <p className="mt-2 text-base leading-relaxed">
              PES University Electronic City Campus
              <br />
              Hosur Road, Konappana Agrahara
              <br />
              Electronic City, Bengaluru 560100
            </p>
            <a
              href="https://maps.google.com/?q=PES+University+Electronic+City+Campus"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center bg-black px-4 text-base font-black text-riso-yellow"
            >
              Get directions
            </a>
          </div>

          {/* Organisers */}
          <div className="scrap relative rotate-1 p-5">
            <span className="tape -top-3 right-8 rotate-6" aria-hidden="true" />
            <h2 className="text-xl font-black">Who to call</h2>
            <ul className="mt-2 space-y-3">
              {FESTIVAL_INFO.contacts.map((c) => (
                <li key={c.phone} className="text-base leading-tight">
                  <span className="block font-bold">{c.name}</span>
                  <span className="block text-sm text-black/70">{c.role}</span>
                  <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="font-semibold underline decoration-riso-blue decoration-2 underline-offset-2">
                    {c.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="scrap relative -rotate-[0.6deg] p-5">
            <span className="tape -top-3 left-1/3 -rotate-2" aria-hidden="true" />
            <h2 className="text-xl font-black">Elsewhere</h2>
            <ul className="mt-2 space-y-1 text-base">
              <li>
                <a href={FESTIVAL_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-bold underline underline-offset-4">
                  Instagram, @maayapesu
                </a>
              </li>
              <li>
                <a href={FESTIVAL_INFO.socials.island} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-bold underline underline-offset-4">
                  Fest Island, the 3D campus
                </a>
              </li>
              <li>
                <a href="#/core" onClick={playClick} className="inline-flex min-h-11 items-center font-bold underline underline-offset-4">
                  Core team
                </a>
              </li>
              <li>
                <a href="#/rules" onClick={playClick} className="inline-flex min-h-11 items-center font-bold underline underline-offset-4">
                  Rules and regulations
                </a>
              </li>
              <li>
                <a href="#/legal" onClick={playClick} className="inline-flex min-h-11 items-center font-bold underline underline-offset-4">
                  Legal and privacy
                </a>
              </li>
            </ul>
            <button
              type="button"
              onClick={onOpenRegister}
              className="sticker mt-3 inline-flex min-h-11 rotate-2 items-center bg-riso-pink px-4 text-base font-black text-black"
            >
              Register for an event
            </button>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t-[3px] border-dashed border-white/40 pt-6 sm:flex-row sm:items-center">
          <div className="text-sm font-semibold text-white">
            <p>© 2026 MAAYA, PES University Electronic City Campus</p>
            <p className="mt-1 flex flex-wrap gap-x-4">
              <a href="#/core" className="inline-flex min-h-11 items-center underline underline-offset-4 sm:min-h-0">
                Core team
              </a>
              <a href="#/rules" className="inline-flex min-h-11 items-center underline underline-offset-4 sm:min-h-0">
                Rules and regulations
              </a>
              <a href="#/legal" className="inline-flex min-h-11 items-center underline underline-offset-4 sm:min-h-0">
                Legal and privacy
              </a>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                playClick();
                window.dispatchEvent(new Event("maaya:reprint"));
              }}
              className="inline-flex min-h-11 items-center border-[3px] border-black bg-paper px-4 text-base font-black text-black shadow-[4px_4px_0_#000]"
            >
              Print another copy
            </button>
            <button type="button" onClick={scrollToTop} className="inline-flex min-h-11 items-center bg-riso-yellow px-4 text-base font-black text-black shadow-[4px_4px_0_#000]">
              Back to the cover
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
