import React, { useState, useMemo } from "react";
import { EVENTS } from "../data/festivalData";
import { Search, MapPin, X, CheckCircle2, ExternalLink, Sparkles, Building, Clock, Users } from "lucide-react";
import { playClick, playChime } from "../utils/audioEffects";

const standardGuidelines = [
  "All participants must carry their valid college identity cards throughout the event.",
  "Participants must report to the venue and room at least 20 minutes prior to the start time.",
  "Decisions of the organizing student club and event judges are final and binding.",
  "Any form of malpractices, misconduct, or rule breach will lead to immediate disqualification.",
];

export default function ProgrammeExplorer({
  onOpenRegisterForEvent,
  selectedEventForModal,
  setSelectedEventForModal,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentDayTab, setCurrentDayTab] = useState("all");

  const categories = useMemo(() => {
    const set = new Set();
    EVENTS.forEach((e) => set.add(e.category));
    return Array.from(set);
  }, []);

  const filteredEvents = useMemo(() => {
    return EVENTS.filter((ev) => {
      const matchDay =
        currentDayTab === "all" ||
        ev.day.toLowerCase().includes(currentDayTab.toLowerCase());
      const matchCat = categoryFilter === "all" || ev.category === categoryFilter;
      const matchSearch =
        searchQuery === "" ||
        ev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.blurb.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ev.room && ev.room.toLowerCase().includes(searchQuery.toLowerCase())) ||
        ev.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchDay && matchCat && matchSearch;
    });
  }, [currentDayTab, categoryFilter, searchQuery]);

  const dayTabs = [
    { label: "All Events", value: "all", count: EVENTS.length },
    { label: "Day 1 (Oct 23)", value: "day 1", count: EVENTS.filter(e => e.day === "Day 1").length },
    { label: "Day 2 (Oct 24)", value: "day 2", count: EVENTS.filter(e => e.day === "Day 2").length },
    { label: "Pre-Fest Week", value: "week", count: EVENTS.filter(e => e.day.includes("Week")).length },
  ];

  return (
    <section id="programme" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-outfit font-bold tracking-widest text-[#22E4F0] uppercase mb-2">
            <span>OFFICIAL PROGRAMME · ALL 18 CLUB COMPETITIONS</span>
          </div>
          <h2 className="font-outfit font-black text-3xl sm:text-6xl text-[#F8F6F0] tracking-tight">
            Schedule & Events
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-[#8E96A4] max-w-2xl leading-relaxed">
            Official competitions hosted by PES University student clubs. Check timings, rooms, and register below.
          </p>
        </div>

        <div className="text-[11px] sm:text-xs font-outfit font-bold text-[#22E4F0]">
          Showing {filteredEvents.length} of {EVENTS.length} Events
        </div>
      </div>

      {/* Main Filter Container Card */}
      <div className="fest-card p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 space-y-4 sm:space-y-6">
        {/* Search Bar Pill */}
        <div className="relative">
          <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-[#8E96A4]" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by event, club (CodeChef, Panache, Tonic...), room, category..."
            className="w-full rounded-full bg-white/5 border border-white/10 text-[#F8F6F0] pl-10 sm:pl-12 pr-10 py-3 sm:py-3.5 placeholder:text-[#8E96A4] text-xs sm:text-sm font-outfit focus:ring-2 focus:ring-[#E63988] focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8E96A4] hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Day Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {dayTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => {
                playClick();
                setCurrentDayTab(tab.value);
              }}
              className={`px-4 py-2 rounded-full text-[11px] sm:text-xs font-outfit font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                currentDayTab === tab.value
                  ? "bg-[#F8F6F0] text-[#1A1A1A] shadow-md"
                  : "bg-white/5 text-[#8E96A4] hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>{tab.label}</span>
              <span className="opacity-70 text-[10px]">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => {
              playClick();
              setCategoryFilter("all");
            }}
            className={`px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-outfit font-bold shrink-0 transition-all ${
              categoryFilter === "all"
                ? "bg-[#22E4F0] text-[#1A1A1A]"
                : "bg-white/5 text-[#8E96A4] border border-white/10"
            }`}
          >
            All Categories
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClick();
                setCategoryFilter(cat);
              }}
              className={`px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-outfit font-bold shrink-0 transition-all ${
                categoryFilter === cat
                  ? "bg-[#22E4F0] text-[#1A1A1A]"
                  : "bg-white/5 text-[#8E96A4] border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events List Rows */}
      {filteredEvents.length === 0 ? (
        <div className="fest-card p-8 sm:p-12 text-center space-y-3">
          <p className="font-outfit font-bold text-base sm:text-lg text-[#8E96A4]">No events match your search</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setCurrentDayTab("all");
              setCategoryFilter("all");
            }}
            className="pill-button-cyan px-5 py-2 text-xs font-outfit font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="fest-card p-4 sm:p-6 fest-card-hover flex flex-col md:flex-row md:items-center justify-between gap-3.5 sm:gap-4"
            >
              {/* Left: Time, Club & Main Info */}
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-[#22E4F0]">
                    {ev.timeDisplay}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-outfit font-bold px-2.5 py-0.5 rounded-full uppercase bg-[#22E4F0]/15 text-[#22E4F0]">
                    {ev.day}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-outfit font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-[#F8F6F0]">
                    Club: {ev.club}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-outfit font-bold px-2 py-0.5 rounded-full bg-white/5 text-[#8E96A4]">
                    {ev.category}
                  </span>
                  {ev.headline && (
                    <span className="text-[9px] sm:text-[10px] font-outfit font-black px-2.5 py-0.5 rounded-full bg-[#E63988] text-white">
                      HEADLINE
                    </span>
                  )}
                </div>

                <h3 className="font-outfit font-black text-lg sm:text-xl text-[#F8F6F0]">
                  {ev.name}
                </h3>

                <p className="text-xs text-[#8E96A4] max-w-2xl leading-relaxed">
                  {ev.blurb}
                </p>
              </div>

              {/* Right: Venue, Room & Action Buttons */}
              <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                <div className="text-left md:text-right font-outfit text-xs text-[#8E96A4]">
                  <div className="flex items-center gap-1 md:justify-end text-[#F8F6F0] font-semibold text-[11px] sm:text-xs">
                    <MapPin size={12} className="text-[#22E4F0] shrink-0" />
                    <span>{ev.venue}</span>
                  </div>
                  {ev.room && (
                    <span className="text-[#8E96A4] block text-[10px] mt-0.5">
                      {ev.room}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => {
                      playClick();
                      setSelectedEventForModal(ev);
                    }}
                    className="px-3.5 sm:px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-[11px] sm:text-xs font-outfit font-bold text-[#F8F6F0] transition-colors border border-white/10 hover:border-white/20"
                  >
                    Rules
                  </button>

                  <a
                    href={ev.paymentUrl || "https://fest-island.vercel.app/#programme"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      playChime();
                    }}
                    className="pill-button-magenta px-4 sm:px-5 py-2 text-[11px] sm:text-xs font-outfit font-bold shadow-sm flex items-center gap-1.5"
                  >
                    <span>Register / Pay</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rules Modal (Safe, Comprehensive & Direct Payment Redirection) */}
      {selectedEventForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#0C0E14] border border-white/20 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedEventForModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white"
            >
              <X size={18} />
            </button>

            <div className="space-y-1.5 pr-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] sm:text-xs font-outfit font-bold text-[#22E4F0] uppercase tracking-wider">
                  {selectedEventForModal.day} · Hosted by {selectedEventForModal.club}
                </span>
                {selectedEventForModal.teamSize && (
                  <span className="text-[10px] font-outfit font-bold px-2 py-0.5 rounded-full bg-white/10 text-[#F8F6F0]">
                    {selectedEventForModal.teamSize}
                  </span>
                )}
              </div>
              <h2 className="font-outfit font-black text-xl sm:text-3xl text-[#F8F6F0]">
                {selectedEventForModal.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#8E96A4] leading-relaxed">
                {selectedEventForModal.blurb}
              </p>
            </div>

            {/* Event Coordinates */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-5 p-3.5 rounded-2xl bg-white/5 border border-white/5 text-xs font-outfit">
              <div>
                <span className="text-[#8E96A4] block text-[10px]">TIME</span>
                <span className="font-bold text-[#F8F6F0]">{selectedEventForModal.timeDisplay || `${selectedEventForModal.time} - ${selectedEventForModal.end}`}</span>
              </div>
              <div>
                <span className="text-[#8E96A4] block text-[10px]">VENUE</span>
                <span className="font-bold text-[#F8F6F0] truncate block">{selectedEventForModal.venue}</span>
              </div>
              <div>
                <span className="text-[#8E96A4] block text-[10px]">ROOM / STAGE</span>
                <span className="font-bold text-[#22E4F0] truncate block">{selectedEventForModal.room || "Check Campus Map"}</span>
              </div>
            </div>

            {/* Event Rules & Guidelines */}
            <div className="space-y-2.5">
              <h4 className="font-outfit font-bold text-[11px] sm:text-xs text-[#22E4F0] uppercase tracking-wider">
                Event Guidelines & Rules:
              </h4>
              <ul className="space-y-2">
                {(selectedEventForModal.rules && selectedEventForModal.rules.length > 0
                  ? selectedEventForModal.rules
                  : standardGuidelines
                ).map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#8E96A4] leading-relaxed">
                    <CheckCircle2 size={15} className="text-[#22E4F0] shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedEventForModal(null)}
                className="px-4 py-2 rounded-full bg-white/5 text-xs font-outfit font-bold text-[#8E96A4] hover:text-white"
              >
                Close
              </button>
              <a
                href={selectedEventForModal.paymentUrl || "https://fest-island.vercel.app/#programme"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  playChime();
                  setSelectedEventForModal(null);
                }}
                className="pill-button-magenta px-5 sm:px-6 py-2.5 text-xs font-outfit font-bold flex items-center gap-2 shadow-lg"
              >
                <span>Proceed to Payment / Register</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
