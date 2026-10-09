import React from "react";
import { Book, Download, CheckCircle2, X } from "lucide-react";
import { playChime } from "../utils/audioEffects";

export default function RulebookModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const rules = [
    "All delegates must carry a valid College Identity Card and Government ID throughout the fest days.",
    "Decisions of appointed judges and organizers are final and binding in all competitive events.",
    "Any form of obscenity, hate speech, or defaming content leads to immediate disqualification.",
    "Participants must report to the designated room / venue at least 30 minutes prior to scheduled start times.",
    "Possession or consumption of alcohol, tobacco or banned substances is strictly prohibited with zero tolerance.",
    "Participation certificates and event accolades will be distributed at the Grand Valedictory.",
  ];

  const handleDownload = () => {
    playChime();
    const element = document.createElement("a");
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
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "MAAYA_2026_OFFICIAL_RULEBOOK.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0C0E14] border border-white/20 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl max-h-[90vh] flex flex-col justify-between overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white"
        >
          <X size={18} />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-outfit font-bold text-[#22E4F0] uppercase tracking-wider">
            <Book size={13} />
            <span>CODE OF CONDUCT</span>
          </div>
          <h2 className="font-outfit font-black text-xl sm:text-3xl text-[#F8F6F0]">
            Festival Guidelines & Rules
          </h2>
        </div>

        <div className="my-5 overflow-y-auto space-y-2.5 max-h-[50vh] pr-2">
          {rules.map((rule, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3"
            >
              <CheckCircle2 size={15} className="text-[#22E4F0] shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-[#8E96A4] leading-relaxed font-outfit">{rule}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
          <button
            onClick={handleDownload}
            className="pill-button-cyan px-4 sm:px-5 py-2 text-xs font-outfit font-bold flex items-center gap-2"
          >
            <Download size={14} />
            <span>Download (.txt)</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 sm:px-5 py-2 rounded-full bg-white/10 text-xs font-outfit font-bold text-[#F8F6F0] hover:bg-white/20"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
