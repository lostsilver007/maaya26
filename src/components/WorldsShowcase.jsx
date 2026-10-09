import React, { useState } from "react";
import { WORLDS } from "../data/festivalData";
import { Mic2, Palette, BookOpen, Gamepad2, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { playClick, playWorldSwitch } from "../utils/audioEffects";

const iconMap = {
  Mic2,
  Palette,
  BookOpen,
  Gamepad2,
  ShoppingBag,
};

export default function WorldsShowcase({ onSelectWorld, activeWorld }) {
  const [hoveredWorld, setHoveredWorld] = useState(null);

  const handleWorldClick = (worldId) => {
    playWorldSwitch(500);
    onSelectWorld(worldId);
    const elem = document.getElementById("events");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="worlds" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#54D8F2]/15 text-[#54D8F2] border border-[#54D8F2]/30 text-xs font-space font-black tracking-widest uppercase mb-3">
            <span>01 — THE THEMATIC REALMS</span>
          </div>
          <h2 className="font-shrikhand text-4xl sm:text-6xl text-[#E9EFEA] tracking-wide">
            Five Worlds, One Campus
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#93A29B] max-w-2xl">
            ECLECTRIA weaves five distinct aesthetic eras into one explosive two-day celebration. Tap any realm to jump straight into its events.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-space font-bold text-[#93A29B]">
            HOVER OR CLICK TO EXPLORE
          </span>
        </div>
      </div>

      {/* Grid of 5 Worlds */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {WORLDS.map((world, idx) => {
          const Icon = iconMap[world.icon] || Sparkles;
          const isSelected = activeWorld === world.id;

          return (
            <div
              key={world.id}
              onMouseEnter={() => {
                setHoveredWorld(world.id);
                playWorldSwitch(380 + idx * 80);
              }}
              onMouseLeave={() => setHoveredWorld(null)}
              onClick={() => handleWorldClick(world.id)}
              className={`group relative rounded-3xl p-6 cursor-pointer transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[380px] border ${
                isSelected
                  ? "border-2 scale-[1.02] shadow-2xl"
                  : "border-white/10 hover:border-white/30 hover:-translate-y-1.5"
              }`}
              style={{
                background: world.gradient,
                borderColor: isSelected ? world.borderColor : undefined,
                boxShadow: isSelected ? `0 0 30px ${world.accentColor}33` : undefined,
              }}
            >
              {/* Background watermark number */}
              <div
                aria-hidden="true"
                className="absolute -top-4 -right-2 font-shrikhand text-7xl text-white/5 select-none pointer-events-none group-hover:text-white/10 transition-colors"
              >
                {world.num}
              </div>

              {/* Top metadata */}
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className="text-[10px] font-space font-black tracking-widest px-2.5 py-1 rounded-md uppercase"
                    style={{
                      backgroundColor: `${world.accentColor}25`,
                      color: world.accentColor,
                      border: `1px solid ${world.accentColor}40`,
                    }}
                  >
                    {world.era}
                  </span>
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${world.accentColor}20`,
                      color: world.accentColor,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                </div>

                <h3 className="font-shrikhand text-3xl sm:text-4xl text-[#E9EFEA] tracking-wide mt-2">
                  {world.name}
                </h3>
                <p className="text-xs font-semibold text-[#93A29B] mt-1 line-clamp-2">
                  {world.tagline}
                </p>
              </div>

              {/* Bottom description & enter CTA */}
              <div className="relative z-10 pt-4 border-t border-white/10">
                <p className="text-xs text-white/70 line-clamp-3 mb-4 leading-relaxed">
                  {world.description}
                </p>

                <div
                  className="w-full py-2.5 px-4 rounded-xl flex items-center justify-between text-xs font-space font-black tracking-wider transition-all group-hover:scale-102"
                  style={{
                    backgroundColor: world.accentColor,
                    color: world.textColor,
                  }}
                >
                  <span>{world.eventsCount} EVENTS</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
