import React from "react";
import { ECLECTRIA_AESTHETICS } from "../data/festivalData";
import { Sparkles, Shirt, Film, Trophy, Flame, Disc, ArrowRight } from "lucide-react";
import { playClick } from "../utils/audioEffects";

const iconMap = {
  denim: Shirt,
  cinema: Film,
  sports: Trophy,
  heritage: Flame,
  cosmic: Disc,
};

export default function FiveIdentitiesSection() {
  const scrollToProgramme = () => {
    playClick();
    const elem = document.getElementById("programme");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="identities" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-outfit font-bold tracking-widest text-[#22E4F0] uppercase mb-2">
            <span>THE CONCEPT · DIFFERENT AESTHETICS × ONE WORLD</span>
          </div>
          <h2 className="font-outfit font-black text-3xl sm:text-6xl text-[#F8F6F0] tracking-tight">
            Five Identities. One World.
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-[#8E96A4] max-w-2xl leading-relaxed">
            ECLECTRIA celebrates the beauty of contrast — where completely different styles, eras, and cultures collide, coexist and become something extraordinary.
          </p>
        </div>

        <button
          onClick={scrollToProgramme}
          className="self-start md:self-auto pill-button-cyan px-5 py-2 text-xs font-outfit tracking-wider flex items-center gap-1.5 shadow-md"
        >
          <span>VIEW ALL EVENTS</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* 5 Aesthetic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {ECLECTRIA_AESTHETICS.map((item, idx) => {
          const Icon = iconMap[item.id] || Sparkles;

          return (
            <div
              key={item.id}
              onClick={scrollToProgramme}
              className="fest-card p-5 sm:p-6 fest-card-hover cursor-pointer flex flex-col justify-between min-h-[220px] sm:min-h-[260px] border border-white/10 hover:border-white/25"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#8E96A4]">
                    0{idx + 1}
                  </span>
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: item.tagBg,
                      color: item.color,
                    }}
                  >
                    <Icon size={16} />
                  </div>
                </div>

                <h3 className="font-outfit font-black text-xl sm:text-2xl text-[#F8F6F0] tracking-tight leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[#8E96A4] mt-2.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-outfit text-[#22E4F0] font-bold">
                <span>Explore</span>
                <ArrowRight size={13} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
