import React from "react";
import { ExternalLink } from "lucide-react";
import { CONCERT_DATA, CONCERT_PASSES } from "../data/festivalData";
import { playClick } from "../utils/audioEffects";
import Modal, { CloseButton } from "./Modal";

// How to buy a concert pass. Passes are paid for inside PESU Academy, which
// needs a student login and doesn't let another site open its payment form
// directly, so this walks people through the exact clicks, then sends them
// there.
export default function PassGuide({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="pass-guide-title" className="max-w-lg">
      <div className="grain relative bg-paper px-5 pt-7 pb-6 text-black shadow-[8px_8px_0_#000] sm:px-8 sm:pt-8">
        <span className="tape -top-3 left-10 -rotate-6" aria-hidden="true" />
        <div className="relative z-[2]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-riso-pink-deep">
                Concert pro-night, {CONCERT_DATA.headliner}
              </p>
              <h2 id="pass-guide-title" className="mt-1 text-2xl leading-tight font-black sm:text-3xl">
                Get your concert pass
              </h2>
            </div>
            <CloseButton onClick={onClose} label="Close the pass guide" />
          </div>

          <p className="mt-4 inline-flex items-baseline gap-2 border-[3px] border-black bg-riso-yellow px-3 py-1.5 shadow-[3px_3px_0_#000]">
            <span className="text-sm font-black uppercase">{CONCERT_PASSES.tier}</span>
            <span className="text-2xl font-black tabular-nums">{CONCERT_PASSES.price}</span>
          </p>
          <p className="mt-3 text-base leading-relaxed">
            Passes are paid for on {CONCERT_PASSES.portal}. Follow these steps there:
          </p>

          <ol className="mt-4 space-y-2.5">
            {CONCERT_PASSES.steps.map((step, i) => (
              <li key={step} className="flex items-start gap-3">
                <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-black text-sm font-black text-riso-yellow">
                  {i + 1}
                </span>
                <span className="pt-1 text-base leading-snug">{step}</span>
              </li>
            ))}
          </ol>

          <p className="mt-5 border-l-4 border-riso-pink-deep pl-3 text-sm leading-relaxed text-black/80">
            Pay exactly {CONCERT_PASSES.price}. Maaya 2026 payments are non-refundable and are confirmed once PES University's Accounts Section has verified them.{" "}
            <a href="#/rules" onClick={onClose} className="font-bold underline underline-offset-2">
              Read the rules and regulations
            </a>
          </p>

          <a
            href={CONCERT_PASSES.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 bg-black px-5 text-lg font-black text-riso-yellow shadow-[4px_4px_0_var(--color-riso-pink)]"
          >
            Open {CONCERT_PASSES.portal}
            <ExternalLink size={18} aria-hidden="true" />
          </a>
          <p className="mt-2 text-center text-xs text-black/60">Opens in a new tab. Keep this page open to follow the steps.</p>
        </div>
      </div>
    </Modal>
  );
}
