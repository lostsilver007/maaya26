import React from "react";
import { Download } from "lucide-react";
import { playChime } from "../utils/audioEffects";
import Modal, { CloseButton } from "./Modal";

const rules = [
  "All delegates must carry a valid College Identity Card and Government ID throughout the fest days.",
  "Decisions of appointed judges and organizers are final and binding in all competitive events.",
  "Any form of obscenity, hate speech, or defaming content leads to immediate disqualification.",
  "Participants must report to the designated room / venue at least 30 minutes prior to scheduled start times.",
  "Possession or consumption of alcohol, tobacco or banned substances is strictly prohibited with zero tolerance.",
  "Participation certificates and event accolades will be distributed at the Grand Valedictory.",
];

// The rulebook: a typed sheet of paper taped into the zine.
export default function RulebookModal({ isOpen, onClose }) {
  const handleDownload = () => {
    playChime();
    const file = new Blob(
      [
        `========================================
MAAYA 2026 — ECLECTRIA OFFICIAL RULEBOOK
PES University Electronic City Campus, Bengaluru
Dates: 23rd & 24th October 2026 (Pre-Fest from Oct 13)
========================================

GENERAL FEST GUIDELINES:
${rules.map((r, i) => `${i + 1}. ${r}`).join("\n")}

OFFICIAL CLUB COMPETITIONS:
- Pre-Fest Week: Digital Riot (DSGNR), HUMAN GLITCH (NSS), Shazam (Clefhangers).
- Day 1 (Oct 23): AlgoHunt 2.0 (CodeChef), Final Descent (Avions), Operation: Infinity (Socioholics), Ctrl+Alt+Steal (Neural Hive), Elysian Threads (Panache).
- Day 2 (Oct 24): Indimoves (Nirantara/Hashtag/Terpsichore), RAS: Mission Impossible (IEEE RAS), Treble & Taal 3.0 (Swarantraka/Clefhangers), Venture Wars (E-Club), Tarkataranga (Kannada Koota), Battle Politik (MUNSoc), Quick Cut (Mangobites), SUSpect (Apostrophe), WAS THIS TRASH (Solaris/Rotaract), Euphonic Battle of Bands (Tonic & A 9th).

Emergency Helpline: +91 80197 70591 / +91 63634 57241
Website: https://fest-island.vercel.app/
========================================`,
      ],
      { type: "text/plain" },
    );
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = "MAAYA_2026_OFFICIAL_RULEBOOK.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <Modal open={isOpen} onClose={onClose} labelledBy="rulebook-title" className="max-w-2xl">
      <div className="grain relative bg-paper px-5 pt-8 pb-6 text-black shadow-[8px_8px_0_#000] sm:px-9 sm:pt-10">
        <span className="tape -top-3 left-10 -rotate-6" aria-hidden="true" />
        <span className="tape -top-3 right-10 rotate-6" aria-hidden="true" />
        <div className="relative z-[2]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-script text-2xl text-riso-pink-deep">Code of conduct</p>
              <h2 id="rulebook-title" className="text-2xl leading-tight font-black sm:text-3xl">
                The Maaya rulebook
              </h2>
            </div>
            <CloseButton onClick={onClose} label="Close the rulebook" />
          </div>
          <ol className="mt-6 list-decimal space-y-3 pl-6 text-base leading-relaxed marker:font-black">
            {rules.map((rule, i) => (
              <li key={i} className="border-b-2 border-dashed border-black/15 pb-3 pl-1">
                {rule}
              </li>
            ))}
          </ol>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button type="button" onClick={onClose} className="min-h-11 px-2 text-base font-bold underline underline-offset-4">
              Close
            </button>
            <button type="button" onClick={handleDownload} className="inline-flex min-h-12 items-center gap-2 bg-black px-5 text-base font-black text-riso-yellow">
              <Download size={16} aria-hidden="true" />
              Download the rulebook (.txt)
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
