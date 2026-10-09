import React, { useState } from "react";
import { SCHEDULE_DAYS, WORLDS } from "../data/festivalData";
import { Calendar, Clock, MapPin, Sparkles, Filter } from "lucide-react";
import { playClick, playWorldSwitch } from "../utils/audioEffects";

export default function ScheduleTimeline({ onSelectEventByName }) {
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const currentDay = SCHEDULE_DAYS[activeDayIdx];

  const getWorldColor = (worldId) => {
    const w = WORLDS.find((item) => item.id === worldId);
    return w ? w.accentColor : "#CDFA4E";
  };

  return (
    <section id="schedule" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E2E898]/15 text-[#E2E898] border border-[#E2E898]/30 text-xs font-space font-black tracking-widest uppercase mb-3">
            <Calendar size={14} />
            <span>05 — TWO-DAY FESTIVAL ITINERARY</span>
          </div>
          <h2 className="font-shrikhand text-4xl sm:text-6xl text-[#E9EFEA] tracking-wide">
            Programme & Schedule
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#93A29B] max-w-2xl">
            Track every beat, match, debate prelim, and showcase across both days at PES University Electronic City Campus.
          </p>
        </div>

        {/* Day 1 / Day 2 Tab Selector */}
        <div className="flex items-center p-1.5 rounded-2xl bg-black/50 border border-white/10 gap-2">
          {SCHEDULE_DAYS.map((d, idx) => (
            <button
              key={d.day}
              onClick={() => {
                playWorldSwitch(520);
                setActiveDayIdx(idx);
              }}
              className={`px-5 py-3 rounded-xl font-space font-black text-xs sm:text-sm tracking-wider transition-all flex items-center gap-2 ${
                activeDayIdx === idx
                  ? "bg-[#CDFA4E] text-black shadow-[0_0_20px_rgba(205,250,78,0.3)]"
                  : "text-[#93A29B] hover:text-white"
              }`}
            >
              <span>{d.day.toUpperCase()}</span>
              <span className="text-[10px] opacity-75 font-mono hidden sm:inline">
                ({idx === 0 ? "OCT 23" : "OCT 24"})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Day Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-space font-bold tracking-widest text-[#54D8F2]">
            {currentDay.date.toUpperCase()}
          </span>
          <h3 className="font-space font-black text-2xl text-[#E9EFEA] mt-1">
            THEME: {currentDay.theme}
          </h3>
        </div>
        <div className="text-xs font-space font-bold text-[#93A29B] px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
          {currentDay.items.length} KEY HIGHLIGHTS
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-white/10 space-y-6">
        {currentDay.items.map((item, idx) => {
          const color = getWorldColor(item.world);
          return (
            <div key={idx} className="relative group">
              {/* Timeline dot */}
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-4 w-4 h-4 rounded-full border-2 border-[#070b09] transition-transform group-hover:scale-125"
                style={{ backgroundColor: color }}
              />

              {/* Card */}
              <div className="p-5 sm:p-6 rounded-2xl glass-panel glass-panel-hover border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs font-mono font-bold text-[#CDFA4E]">
                      <Clock size={13} />
                      {item.time}
                    </span>
                    <span
                      className="text-[10px] font-space font-black tracking-widest px-2 py-0.5 rounded uppercase"
                      style={{ backgroundColor: `${color}20`, color: color }}
                    >
                      {item.world}
                    </span>
                  </div>

                  <h4 className="font-space font-bold text-lg text-[#E9EFEA] group-hover:text-[#CDFA4E] transition-colors">
                    {item.title}
                  </h4>
                </div>

                <div className="flex items-center gap-4 text-xs font-space text-[#93A29B] shrink-0">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-[#54D8F2]" />
                    <span>{item.venue}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
