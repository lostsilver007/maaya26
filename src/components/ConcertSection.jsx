import React from "react";
import { CONCERT_DATA, FESTIVAL_INFO } from "../data/festivalData";
import { Music, Volume2, Sparkles, Clock, MapPin } from "lucide-react";
import { playClick, playBassDrop } from "../utils/audioEffects";

export default function ConcertSection() {
  const handleTestBass = () => {
    playBassDrop();
  };

  return (
    <section id="concert" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#A55EEA]/10 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 relative z-10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-outfit font-bold tracking-widest text-[#22E4F0] uppercase mb-2">
            <Music size={13} />
            <span>FINALE PRO-SHOW · SATURDAY NIGHT</span>
          </div>
          <h2 className="font-outfit font-black text-3xl sm:text-6xl text-[#F8F6F0] tracking-tight">
            Concert Pro-Night
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-[#8E96A4] max-w-2xl leading-relaxed">
            The grand live music finale of MAAYA 2026 at PES University Electronic City Campus.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleTestBass}
            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#22E4F0] text-xs font-outfit font-bold hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <Volume2 size={15} />
            <span>STAGE SOUND CHECK 🔊</span>
          </button>
        </div>
      </div>

      {/* Main Concert Card */}
      <div className="fest-card p-6 sm:p-10 mb-8 border border-white/15 bg-gradient-to-br from-[#0C0E14] via-[#150a22] to-[#0C0E14] relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-outfit font-bold tracking-widest text-[#E63988] uppercase">
              <span>{CONCERT_DATA.date.toUpperCase()} · PES EC CAMPUS</span>
            </div>
            <h3 className="font-outfit font-black text-2xl sm:text-5xl text-[#F8F6F0] tracking-tight">
              {CONCERT_DATA.headline}
            </h3>
            <p className="text-xs sm:text-sm text-[#8E96A4] max-w-xl leading-relaxed">
              Lineup reveals and student passes dropping on the official Instagram page.
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs font-outfit text-[#F8F6F0]">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-[#E63988]" />
                <span>MRD Student Center / Main Stage</span>
              </div>
            </div>
          </div>

          {/* Social Follow Card */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3 shrink-0">
            <span className="text-[10px] font-outfit font-bold tracking-widest text-[#22E4F0] uppercase block">
              LINEUP ANNOUNCEMENT
            </span>
            <div className="font-outfit font-black text-2xl text-[#F8F6F0]">
              STAY TUNED
            </div>
            <p className="text-xs text-[#8E96A4]">
              Follow @maayapesu for headliner reveals.
            </p>
            <a
              href={FESTIVAL_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="pill-button-magenta px-5 py-2 text-xs font-outfit font-bold inline-flex items-center gap-2"
            >
              <span>Follow @maayapesu</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
