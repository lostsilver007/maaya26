import React, { useState } from "react";
import { FAQ_DATA } from "../data/festivalData";
import { HelpCircle, ChevronDown, ChevronUp, Bell } from "lucide-react";
import { playClick } from "../utils/audioEffects";

export default function AnnouncementsAndFAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    playClick();
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-outfit font-bold tracking-widest text-[#22E4F0] uppercase mb-2">
          <HelpCircle size={14} />
          <span>HELP & GUIDANCE</span>
        </div>
        <h2 className="font-outfit font-black text-4xl sm:text-5xl text-[#F8F6F0] tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-sm text-[#8E96A4] max-w-xl mx-auto leading-relaxed">
          Everything you need to know regarding participation, passes, and campus details.
        </p>
      </div>

      <div className="space-y-3">
        {FAQ_DATA.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="fest-card overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-outfit font-bold text-base text-[#F8F6F0] hover:text-[#22E4F0] transition-colors"
              >
                <span>{item.q}</span>
                <span className="shrink-0 p-1 rounded-full bg-white/5 text-[#8E96A4]">
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#8E96A4] leading-relaxed border-t border-white/5">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
