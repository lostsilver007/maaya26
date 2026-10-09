import React, { useState, useMemo } from "react";
import { EVENTS, WORLDS } from "../data/festivalData";
import { Search, Filter, Calendar, MapPin, Users, Trophy, Sparkles, X, ChevronRight, CheckCircle2 } from "lucide-react";
import { playClick, playWorldSwitch, playChime } from "../utils/audioEffects";

export default function EventsExplorer({
  activeWorldFilter,
  setActiveWorldFilter,
  onOpenRegisterForEvent,
  selectedEventForModal,
  setSelectedEventForModal,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [dayFilter, setDayFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = useMemo(() => {
    const set = new Set();
    EVENTS.forEach((e) => set.add(e.category));
    return Array.from(set);
  }, []);

  const filteredEvents = useMemo(() => {
    return EVENTS.filter((ev) => {
      const matchWorld = activeWorldFilter === "all" || ev.worldId === activeWorldFilter;
      const matchDay = dayFilter === "all" || ev.day.toLowerCase().includes(dayFilter.toLowerCase());
      const matchCat = categoryFilter === "all" || ev.category === categoryFilter;
      const matchSearch =
        searchQuery === "" ||
        ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchWorld && matchDay && matchCat && matchSearch;
    });
  }, [activeWorldFilter, dayFilter, categoryFilter, searchQuery]);

  const getWorldObj = (worldId) => WORLDS.find((w) => w.id === worldId) || WORLDS[0];

  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#CDFA4E]/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#CDFA4E]/15 text-[#CDFA4E] border border-[#CDFA4E]/30 text-xs font-space font-black tracking-widest uppercase mb-3">
            <span>03 — ALL 33+ COMPETITIONS & BATTLES</span>
          </div>
          <h2 className="font-shrikhand text-4xl sm:text-6xl text-[#E9EFEA] tracking-wide">
            Events Explorer
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#93A29B] max-w-2xl">
            From fierce collegiate battle of the bands and 5v5 Valorant championships to high-fashion runways and campus treasure hunts.
          </p>
        </div>

        <div className="flex items-center gap-2 font-space text-sm text-[#CDFA4E] font-bold">
          <Sparkles size={16} />
          <span>Showing {filteredEvents.length} of {EVENTS.length} Events</span>
        </div>
      </div>

      {/* Control Bar: Search & World Filter Tabs */}
      <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-white/10 space-y-4 mb-8">
        {/* World Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-white/10">
          <button
            onClick={() => {
              playClick();
              setActiveWorldFilter("all");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-space font-black tracking-wider transition-all ${
              activeWorldFilter === "all"
                ? "bg-[#CDFA4E] text-black shadow-[0_0_15px_rgba(205,250,78,0.3)]"
                : "bg-white/5 text-[#93A29B] hover:text-[#E9EFEA] hover:bg-white/10"
            }`}
          >
            ALL WORLDS (33)
          </button>
          {WORLDS.map((w) => (
            <button
              key={w.id}
              onClick={() => {
                playWorldSwitch(480);
                setActiveWorldFilter(w.id);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-space font-black tracking-wider transition-all flex items-center gap-2 ${
                activeWorldFilter === w.id
                  ? "text-black shadow-lg"
                  : "bg-white/5 text-[#93A29B] hover:text-[#E9EFEA] hover:bg-white/10"
              }`}
              style={{
                backgroundColor: activeWorldFilter === w.id ? w.accentColor : undefined,
              }}
            >
              <span>{w.name.toUpperCase()}</span>
              <span className="opacity-70 text-[10px]">({w.eventsCount})</span>
            </button>
          ))}
        </div>

        {/* Search & Sub-filters (Days & Categories) */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search bar */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#93A29B]" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by event name, category, venue..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-black/50 border border-white/10 text-[#E9EFEA] placeholder-[#93A29B]/60 text-sm focus:outline-none focus:border-[#CDFA4E] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#93A29B] hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Day Filter */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto">
            {["all", "day 1", "day 2"].map((d) => (
              <button
                key={d}
                onClick={() => {
                  playClick();
                  setDayFilter(d);
                }}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-space font-bold uppercase whitespace-nowrap transition-colors ${
                  dayFilter === d
                    ? "bg-[#54D8F2] text-black font-black"
                    : "bg-white/5 text-[#93A29B] hover:text-white"
                }`}
              >
                {d === "all" ? "All Days" : d}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => {
              playClick();
              setCategoryFilter(e.target.value);
            }}
            className="w-full md:w-48 py-3 px-4 rounded-2xl bg-black/50 border border-white/10 text-xs font-space font-bold text-[#E9EFEA] focus:outline-none focus:border-[#CDFA4E]"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="glass-panel p-16 rounded-3xl text-center space-y-4">
          <p className="font-shrikhand text-2xl text-[#93A29B]">No events match your criteria</p>
          <p className="text-sm text-[#93A29B]">Try resetting the search query or selecting "All Worlds".</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveWorldFilter("all");
              setDayFilter("all");
              setCategoryFilter("all");
            }}
            className="px-6 py-2.5 rounded-full bg-[#CDFA4E] text-black font-space font-black text-xs"
          >
            RESET FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => {
            const world = getWorldObj(ev.worldId);
            return (
              <div
                key={ev.id}
                className="group relative rounded-3xl p-6 glass-panel glass-panel-hover flex flex-col justify-between min-h-[380px] overflow-hidden"
              >
                {/* World color accent glow strip */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: world.accentColor }}
                />

                {/* Top badges */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="text-[10px] font-space font-black tracking-widest px-2.5 py-0.5 rounded-full uppercase"
                      style={{
                        backgroundColor: `${world.accentColor}20`,
                        color: world.accentColor,
                        border: `1px solid ${world.accentColor}40`,
                      }}
                    >
                      {world.name} · {world.era.split("—")[0]}
                    </span>

                    <span className="text-[11px] font-space font-bold px-2 py-0.5 rounded-md bg-white/5 text-[#93A29B]">
                      {ev.day}
                    </span>
                  </div>

                  <h3 className="font-space font-black text-xl text-[#E9EFEA] group-hover:text-[#CDFA4E] transition-colors leading-snug">
                    {ev.title}
                  </h3>

                  <p className="text-xs text-[#93A29B] mt-2 line-clamp-2 leading-relaxed">
                    {ev.description}
                  </p>
                </div>

                {/* Metadata details */}
                <div className="py-4 my-3 border-y border-white/5 space-y-2 text-xs font-space">
                  <div className="flex items-center justify-between text-[#93A29B]">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#54D8F2]" />
                      <span>{ev.time}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={13} className="text-[#FF7A59]" />
                      <span>{ev.teamSize}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[#93A29B]">
                    <span className="flex items-center gap-1.5 truncate max-w-[180px]">
                      <MapPin size={13} className="text-[#CDFA4E] shrink-0" />
                      <span className="truncate">{ev.venue}</span>
                    </span>
                    <span className="font-bold text-[#CDFA4E]">
                      Fee: {ev.registrationFee}
                    </span>
                  </div>

                  {/* Prize pool pill */}
                  <div className="pt-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-[#E9EFEA] font-bold">
                      <Trophy size={13} className="text-[#FFAA33]" />
                      <span>Prizes:</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-[#FFAA33]">
                      {ev.prizes.split("|")[0]}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      playClick();
                      setSelectedEventForModal(ev);
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-space font-bold text-[#E9EFEA] transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Rules & Details</span>
                    <ChevronRight size={14} />
                  </button>

                  <button
                    onClick={() => {
                      playChime();
                      onOpenRegisterForEvent(ev);
                    }}
                    className="py-2.5 px-4 rounded-xl text-xs font-space font-black text-black transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5"
                    style={{ backgroundColor: world.accentColor }}
                  >
                    <Sparkles size={13} />
                    <span>Register</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Event Details & Rules Modal */}
      {selectedEventForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#0e1512] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setSelectedEventForModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              <X size={20} />
            </button>

            {/* Header info */}
            <div className="space-y-2 pr-8">
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-space font-black tracking-widest px-3 py-0.5 rounded-full uppercase"
                  style={{
                    backgroundColor: `${getWorldObj(selectedEventForModal.worldId).accentColor}25`,
                    color: getWorldObj(selectedEventForModal.worldId).accentColor,
                  }}
                >
                  {getWorldObj(selectedEventForModal.worldId).name} · {selectedEventForModal.category}
                </span>
                <span className="text-xs font-space font-bold px-2 py-0.5 rounded bg-white/10 text-[#93A29B]">
                  {selectedEventForModal.day}
                </span>
              </div>

              <h2 className="font-shrikhand text-2xl sm:text-3xl text-[#E9EFEA]">
                {selectedEventForModal.title}
              </h2>
            </div>

            <p className="text-sm text-[#93A29B] mt-4 leading-relaxed">
              {selectedEventForModal.description}
            </p>

            {/* Event Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 p-4 rounded-2xl bg-black/40 border border-white/5 text-xs font-space">
              <div>
                <span className="text-[#93A29B] block">TIME</span>
                <span className="font-bold text-[#E9EFEA]">{selectedEventForModal.time}</span>
              </div>
              <div>
                <span className="text-[#93A29B] block">VENUE</span>
                <span className="font-bold text-[#E9EFEA] truncate block">{selectedEventForModal.venue}</span>
              </div>
              <div>
                <span className="text-[#93A29B] block">TEAM SIZE</span>
                <span className="font-bold text-[#E9EFEA]">{selectedEventForModal.teamSize}</span>
              </div>
              <div>
                <span className="text-[#93A29B] block">REG. FEE</span>
                <span className="font-bold text-[#CDFA4E]">{selectedEventForModal.registrationFee}</span>
              </div>
            </div>

            {/* Prize pool */}
            <div className="p-4 rounded-2xl bg-[#FFAA33]/10 border border-[#FFAA33]/30 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-space font-bold text-[#FFAA33]">
                <Trophy size={18} />
                <span>Prizes & Accolades:</span>
              </div>
              <span className="font-mono font-bold text-sm text-[#E9EFEA]">
                {selectedEventForModal.prizes}
              </span>
            </div>

            {/* Rules */}
            <div className="space-y-3">
              <h4 className="font-space font-bold text-sm text-[#CDFA4E] uppercase tracking-wider">
                Guidelines & Rules:
              </h4>
              <ul className="space-y-2">
                {selectedEventForModal.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#93A29B] leading-relaxed">
                    <CheckCircle2 size={14} className="text-[#54D8F2] shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedEventForModal(null)}
                className="px-5 py-2.5 rounded-xl bg-white/5 text-xs font-space font-bold text-[#93A29B] hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const ev = selectedEventForModal;
                  setSelectedEventForModal(null);
                  onOpenRegisterForEvent(ev);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#CDFA4E] text-black font-space font-black text-xs hover:scale-105 transition-transform flex items-center gap-2"
              >
                <Sparkles size={14} />
                <span>Register for this Event</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
