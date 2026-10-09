import React from "react";
import { Sparkles, ArrowRight, History } from "lucide-react";
import { playClick } from "../utils/audioEffects";

export default function PastEditionsSection() {
  return (
    <section id="editions" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-outfit font-bold tracking-widest text-[#22E4F0] uppercase mb-2">
          <History size={14} />
          <span>LEGACY · THE MAAYA ARCHIVE</span>
        </div>
        <h2 className="font-outfit font-black text-4xl sm:text-6xl text-[#F8F6F0] tracking-tight">
          Where We've Been
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#8E96A4] max-w-2xl leading-relaxed">
          From Retronomia's vintage synthesis to Eclectria's five colliding aesthetics.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Maaya 25 */}
        <div className="fest-card p-8 flex flex-col justify-between min-h-[300px]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-outfit font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-white/10 text-[#8E96A4] uppercase">
                MAAYA '25 ARCHIVE
              </span>
              <span className="text-xs font-mono text-[#8E96A4]">OCT 2025</span>
            </div>

            <h3 className="font-outfit font-black text-3xl text-[#F8F6F0]">
              Retronomia
            </h3>
            <p className="text-xs text-[#8E96A4] mt-2 leading-relaxed">
              A nostalgic tribute to vintage analog synthesizers, classic retro cinema, and 90s alternative rock on the campus lawns.
            </p>
          </div>

          <div className="pt-6 border-t border-white/5 text-xs font-outfit text-[#8E96A4]">
            <span>Last year looked back.</span>
          </div>
        </div>

        {/* Maaya 26 */}
        <div className="fest-card p-8 flex flex-col justify-between min-h-[300px] border-2 border-[#22E4F0]/40 shadow-[0_0_30px_rgba(34,228,240,0.1)]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-outfit font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-[#22E4F0]/20 text-[#22E4F0] uppercase">
                MAAYA '26 CURRENT
              </span>
              <span className="text-xs font-mono text-[#22E4F0]">OCT 23–24, 2026</span>
            </div>

            <h3 className="font-outfit font-black text-3xl text-[#F8F6F0]">
              Eclectria
            </h3>
            <p className="text-xs text-[#8E96A4] mt-2 leading-relaxed">
              Different by Design. Five identities, one world. Denim, cinema, sports athleisure, Indian tradition and cosmic glamour.
            </p>
          </div>

          <div className="pt-6 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-outfit font-bold text-[#E63988]">
              This year we stop choosing.
            </span>
            <a
              href="#programme"
              onClick={playClick}
              className="text-xs font-outfit font-bold text-[#22E4F0] hover:underline flex items-center gap-1"
            >
              <span>Explore Lineup</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
