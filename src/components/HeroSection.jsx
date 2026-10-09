import React, { useState, useEffect } from "react";
import { FESTIVAL_INFO, EVENTS } from "../data/festivalData";
import { Sparkles, Compass, ArrowRight, Dices, Calendar, MapPin } from "lucide-react";
import { playClick, playWorldSwitch } from "../utils/audioEffects";
import confetti from "canvas-confetti";

export default function HeroSection({ onOpenRegister, onSelectEvent }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-10-23T08:30:00+05:30").getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRandomEvent = () => {
    playWorldSwitch(560);
    const randomIndex = Math.floor(Math.random() * EVENTS.length);
    const randomEvent = EVENTS[randomIndex];

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#22E4F0", "#E63988", "#FFA502", "#4D96FF"],
      });
    } catch {
      // Ignore
    }

    onSelectEvent(randomEvent);
  };

  const keyStats = [
    { value: "18+", label: "Official Club Events", sub: "Technical, Cultural & Misc" },
    { value: "6", label: "Campus Venues", sub: "MRD, Engg, Pharmacy & Oval" },
    { value: "23 & 24", label: "October 2026", sub: "Pre-Fest from Oct 13" },
    { value: "15+", label: "Student Clubs", sub: "PESU EC Campus" },
  ];

  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#22E4F0]/08 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#E63988]/08 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none"></div>

      {/* Tagline Subtitle */}
      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 rounded-full bg-[#22E4F0]/10 text-[#22E4F0] border border-[#22E4F0]/25 text-[10px] sm:text-xs font-outfit font-bold tracking-widest uppercase mb-4 sm:mb-6 max-w-full truncate">
        <Sparkles size={12} className="shrink-0" />
        <span className="truncate">PES UNIVERSITY EC CAMPUS · BENGALURU</span>
      </div>

      {/* Hero Title */}
      <h1 className="font-outfit font-black text-5xl sm:text-8xl md:text-9xl text-[#F8F6F0] tracking-tight leading-[0.95] mb-2">
        MAAYA <span className="text-[#22E4F0]">'26</span>
      </h1>

      {/* Concept & Theme Title */}
      <div className="mt-1 sm:mt-2 mb-3 sm:mb-4">
        <span className="font-outfit font-extrabold text-2xl sm:text-4xl md:text-5xl text-[#E63988] tracking-tight">
          ECLECTRIA
        </span>
        <span className="font-outfit font-semibold text-sm sm:text-2xl text-[#8E96A4] block mt-1">
          Different by Design · 23rd & 24th October 2026
        </span>
      </div>

      {/* Narrative description */}
      <p className="max-w-2xl text-xs sm:text-base text-[#8E96A4] font-medium leading-relaxed mb-6 sm:mb-8 px-2">
        Five days. Five identities. One world. ECLECTRIA is a world where different styles, eras, cultures and identities come together.
      </p>

      {/* Countdown Pill */}
      <div className="mb-8 sm:mb-10 inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 bg-[#0C0E14]/85 text-[#22E4F0] rounded-2xl sm:rounded-full px-5 sm:px-6 py-3 sm:py-3.5 border border-[#22E4F0]/40 shadow-[0_0_30px_rgba(34,228,240,0.2)] backdrop-blur-md font-mono text-xs sm:text-sm font-bold w-full sm:w-auto">
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-outfit uppercase tracking-widest text-[#8E96A4]">
          <Calendar size={13} className="text-[#22E4F0]" />
          <span>FESTIVAL COUNTDOWN:</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base font-black text-[#F8F6F0]">
          <span><strong className="text-[#22E4F0]">{timeLeft.days}</strong>d</span>
          <span>:</span>
          <span><strong className="text-[#22E4F0]">{String(timeLeft.hours).padStart(2, "0")}</strong>h</span>
          <span>:</span>
          <span><strong className="text-[#22E4F0]">{String(timeLeft.minutes).padStart(2, "0")}</strong>m</span>
          <span>:</span>
          <span><strong className="text-[#E63988]">{String(timeLeft.seconds).padStart(2, "0")}</strong>s</span>
        </div>
      </div>

      {/* Pill Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto max-w-sm sm:max-w-none">
        <a
          href="#programme"
          onClick={playClick}
          className="w-full sm:w-auto pill-button-magenta px-6 sm:px-7 py-3 text-xs sm:text-sm font-outfit tracking-wider flex items-center justify-center gap-2 shadow-lg"
        >
          <span>EXPLORE EVENTS</span>
          <ArrowRight size={15} />
        </a>

        <a
          href="#venues"
          onClick={playClick}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#0C0E14]/80 text-[#F8F6F0] border border-[#22E4F0]/40 text-xs sm:text-sm font-outfit font-bold hover:bg-[#22E4F0]/15 hover:border-[#22E4F0] transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <Compass size={15} className="text-[#22E4F0]" />
          <span>3D CAMPUS ISLAND</span>
        </a>

        <button
          onClick={handleRandomEvent}
          className="w-full sm:w-auto px-5 py-3 rounded-full bg-white/5 border border-white/15 text-[#F8F6F0] text-xs sm:text-sm font-outfit font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
        >
          <Dices size={15} className="text-[#FFA502]" />
          <span>RANDOM EVENT</span>
        </button>
      </div>

      {/* Metric Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mt-12 sm:mt-16 w-full max-w-4xl">
        {keyStats.map((stat, idx) => (
          <div
            key={idx}
            className="fest-card p-3.5 sm:p-5 text-left flex flex-col justify-between"
          >
            <span className="text-xl sm:text-3xl font-outfit font-black text-[#F8F6F0]">
              {stat.value}
            </span>
            <div className="mt-1">
              <span className="text-[11px] sm:text-xs font-outfit font-bold text-[#22E4F0] block">
                {stat.label}
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#8E96A4] block truncate">
                {stat.sub}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
