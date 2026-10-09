import React, { useState } from "react";
import { VENUES_DATA } from "../data/festivalData";
import { Compass, Maximize2, Minimize2, ExternalLink, MapPin } from "lucide-react";
import { playClick } from "../utils/audioEffects";

export default function CampusIslandSection() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    playClick();
    setIsFullscreen(!isFullscreen);
  };

  const islandUrl = "https://fest-island.vercel.app/#venues";

  return (
    <section id="venues" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-outfit font-bold tracking-widest text-[#22E4F0] uppercase mb-2">
            <Compass size={13} />
            <span>WHERE IT HAPPENS · 3D CAMPUS SIMULATOR</span>
          </div>
          <h2 className="font-outfit font-black text-3xl sm:text-6xl text-[#F8F6F0] tracking-tight">
            Venues & Fest Island
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-[#8E96A4] max-w-2xl leading-relaxed">
            PES University Electronic City Campus reconstructed as a floating low-poly 3D island. Drag to rotate and explore stages.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleFullscreen}
            className="px-3.5 sm:px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#F8F6F0] text-[11px] sm:text-xs font-outfit font-bold hover:bg-white/10 transition-all flex items-center gap-1.5"
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            <span>{isFullscreen ? "COLLAPSE" : "FULLSCREEN"}</span>
          </button>

          <a
            href={islandUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="pill-button-cyan px-4 sm:px-5 py-2 text-[11px] sm:text-xs font-outfit tracking-wider flex items-center gap-1.5 shadow-md"
          >
            <span>3D APP</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* 3D Viewer Frame */}
      <div
        className={`relative transition-all duration-500 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-[#0C0E14] shadow-2xl ${
          isFullscreen
            ? "fixed inset-2 sm:inset-4 z-50 rounded-xl sm:rounded-2xl h-[calc(100vh-16px)] sm:h-[calc(100vh-32px)] border-2 border-[#22E4F0]"
            : "w-full h-[460px] sm:h-[600px] md:h-[700px]"
        }`}
      >
        {/* Top Floating Mini Bar */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-[#0C0E14]/85 backdrop-blur-md px-4 sm:px-6 py-2.5 sm:py-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-outfit text-[#8E96A4]">
            <span className="w-2 h-2 rounded-full bg-[#22E4F0] animate-pulse"></span>
            <span className="font-bold text-[#F8F6F0]">MAAYA 3D ENGINE</span>
            <span className="hidden sm:inline">· Drag to rotate, scroll to zoom</span>
          </div>

          <a
            href={islandUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] sm:text-xs font-outfit font-bold text-[#22E4F0] hover:underline"
          >
            Full Map View ↗
          </a>
        </div>

        {/* The Live Interactive Iframe */}
        <iframe
          src={islandUrl}
          title="PES University 3D Fest Island"
          className="w-full h-full pt-10 sm:pt-11 border-0 bg-[#0C0E14]"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          loading="lazy"
        />
      </div>

      {/* Venues Grid Showcase */}
      <div className="mt-10 sm:mt-12">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="font-outfit font-bold text-lg sm:text-xl text-[#F8F6F0]">
            Campus Venues Directory
          </h3>
          <span className="text-[11px] sm:text-xs font-outfit text-[#8E96A4]">
            6 OFFICIAL VENUES
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {VENUES_DATA.map((venue) => (
            <div
              key={venue.id}
              className="fest-card p-4 sm:p-6 fest-card-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-outfit font-bold tracking-widest text-[#22E4F0] uppercase mb-2">
                  <MapPin size={12} />
                  <span>PESU EC CAMPUS</span>
                </div>

                <h4 className="font-outfit font-black text-lg sm:text-xl text-[#F8F6F0]">
                  {venue.name}
                </h4>
                <p className="text-xs text-[#8E96A4] mt-2 leading-relaxed">
                  {venue.role}
                </p>
              </div>

              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  href={islandUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  className="pill-button-cream px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-outfit font-bold hover:bg-[#E63988] hover:text-white transition-colors"
                >
                  Explore in 3D →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
