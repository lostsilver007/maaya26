import React from "react";
import { Sparkles, ArrowRight, Zap, History } from "lucide-react";
import { playClick } from "../utils/audioEffects";

export default function PastEditionsGallery() {
  return (
    <section id="history" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#CDFA4E]/15 text-[#CDFA4E] border border-[#CDFA4E]/30 text-xs font-space font-black tracking-widest uppercase mb-3">
          <History size={14} />
          <span>06 — THE MAAYA ARCHIVE</span>
        </div>
        <h2 className="font-shrikhand text-4xl sm:text-6xl text-[#E9EFEA] tracking-wide">
          Where We've Been
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[#93A29B] max-w-2xl">
          Each edition leaves a mark on PES University history. Step into the transformation from Retronomia to Eclectria.
        </p>
      </div>

      {/* Side-by-side Hero Split Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
        {/* Left: Maaya 25 Retronomia */}
        <div className="p-8 sm:p-12 bg-gradient-to-br from-[#CDFA4E] to-[#9cd61a] text-black flex flex-col justify-between min-h-[340px]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-space font-black tracking-[0.3em] uppercase bg-black/10 px-3 py-1 rounded-md">
                MAAYA '25 ARCHIVE
              </span>
              <span className="text-xs font-mono font-black">OCT 2025</span>
            </div>

            <h3 className="font-shrikhand text-4xl sm:text-6xl text-black">
              Retronomia
            </h3>
            <p className="font-space font-bold text-sm sm:text-base text-black/80 mt-3 max-w-md">
              A nostalgic homage to vintage synthesizers, classic retro cinema, and 90s indie rock on the PES lawns.
            </p>
          </div>

          <div className="pt-6 flex items-center gap-2 text-xs font-space font-black">
            <span>LAST YEAR LOOKED BACK</span>
            <span className="text-base">✦</span>
          </div>
        </div>

        {/* Right: Maaya 26 Eclectria */}
        <div className="p-8 sm:p-12 bg-[#0e1512] text-[#E9EFEA] flex flex-col justify-between min-h-[340px] border-t md:border-t-0 md:border-l border-white/10">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-space font-black tracking-[0.3em] uppercase bg-[#54D8F2]/15 text-[#54D8F2] px-3 py-1 rounded-md border border-[#54D8F2]/30">
                MAAYA '26 NOW
              </span>
              <span className="text-xs font-mono font-bold text-[#54D8F2]">OCT 23–24, 2026</span>
            </div>

            <h3 className="font-shrikhand text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#54D8F2] via-[#E9EFEA] to-[#FF7A59]">
              Eclectria
            </h3>
            <p className="font-space font-bold text-sm sm:text-base text-[#93A29B] mt-3 max-w-md">
              This year we stop choosing. 5 worlds colliding into one stage. Amps, pixels, runway couture and carnival lights.
            </p>
          </div>

          <div className="pt-6">
            <a
              href="#events"
              onClick={playClick}
              className="inline-flex items-center gap-2 text-xs font-space font-black text-[#CDFA4E] hover:underline"
            >
              <span>JOIN THE 2026 CELEBRATION</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
