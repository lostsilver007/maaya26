import React, { useState, useMemo } from "react";
import { Search, X, ExternalLink } from "lucide-react";
import { EVENTS } from "../data/festivalData";
import { playClick, playChime } from "../utils/audioEffects";
import Modal, { CloseButton } from "./Modal";

// World 2 — Cinema & Retro. A marquee over the box office; every event is a
// ticket stub (admit one), and its rules are the fine print.
const standardGuidelines = [
  "All participants must carry their valid college identity cards throughout the event.",
  "Participants must report to the venue and room at least 20 minutes prior to the start time.",
  "Decisions of the organizing student club and event judges are final and binding.",
  "Any form of malpractices, misconduct, or rule breach will lead to immediate disqualification.",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const shortDate = (iso) => (iso ? `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1]}` : "");
const dayName = (day) => (day.toLowerCase().includes("week") ? "Pre-fest" : day);
const FALLBACK_URL = "https://fest-island.vercel.app/#programme";

const DAY_TABS = [
  { label: "All", value: "all" },
  { label: "Pre-fest week", value: "week" },
  { label: "Day 1, 23 Oct", value: "day 1" },
  { label: "Day 2, 24 Oct", value: "day 2" },
];
const countFor = (value) => (value === "all" ? EVENTS.length : EVENTS.filter((e) => e.day.toLowerCase().includes(value)).length);

export default function ProgrammeExplorer({ selectedEventForModal, setSelectedEventForModal }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentDayTab, setCurrentDayTab] = useState("all");

  const categories = useMemo(() => [...new Set(EVENTS.map((e) => e.category))], []);

  const filteredEvents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return EVENTS.filter((ev) => {
      const matchDay = currentDayTab === "all" || ev.day.toLowerCase().includes(currentDayTab);
      const matchCat = categoryFilter === "all" || ev.category === categoryFilter;
      const matchSearch = !q || [ev.name, ev.club, ev.blurb, ev.venue, ev.room ?? "", ev.category].some((s) => s.toLowerCase().includes(q));
      return matchDay && matchCat && matchSearch;
    });
  }, [currentDayTab, categoryFilter, searchQuery]);

  const resetFilters = () => {
    setSearchQuery("");
    setCurrentDayTab("all");
    setCategoryFilter("all");
  };

  const ev = selectedEventForModal;

  return (
    <section id="programme" className="tex-velvet grain-dark relative px-4 pt-24 pb-24 text-ticket sm:px-6 lg:px-8">
      <div className="relative z-[2] mx-auto max-w-6xl">
        {/* Marquee */}
        <div className="marquee-frame mx-auto max-w-3xl text-center">
          <div className="relative rounded-md bg-[#140204] px-4 py-6 sm:px-8 sm:py-8">
            <p className="text-sm font-bold text-bulb/80">World 2: Cinema &amp; Retro</p>
            <h2 className="mt-2 font-marquee text-[2.7rem] leading-none text-bulb [text-shadow:0_0_14px_rgb(255_211_107/0.75),0_0_42px_rgb(255_120_40/0.45)] sm:text-7xl">
              Now showing
            </h2>
            <p className="mt-4 text-base font-semibold text-ticket/90 sm:text-lg">
              {EVENTS.length} club events, from pre-fest week to the last night
            </p>
          </div>
        </div>

        {/* Box office: search and filters */}
        <div className="mx-auto mt-12 max-w-4xl rounded-t-[2.5rem] border-[3px] border-[#1a0306] bg-[#3a0911] p-4 shadow-[inset_0_0_0_2px_rgb(255_211_107/0.25)] sm:p-6">
          <label htmlFor="event-search" className="block text-center font-script text-2xl text-bulb">
            Box office
          </label>
          <div className="relative mt-3">
            <Search className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ticket-red" size={18} aria-hidden="true" />
            <input
              id="event-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events, clubs or rooms"
              className="min-h-12 w-full rounded-full border-[3px] border-[#1a0306] bg-ticket pr-12 pl-11 text-base font-semibold text-black placeholder:text-black/50 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear the search"
                className="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-black hover:bg-black/10"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <fieldset className="mt-5 min-w-0">
            <legend className="text-sm font-bold text-bulb">Showtimes</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {DAY_TABS.map((tab) => {
                const on = currentDayTab === tab.value;
                return (
                  <button
                    key={tab.value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      playClick();
                      setCurrentDayTab(tab.value);
                    }}
                    className={`min-h-11 border-2 border-dashed px-3.5 text-sm font-bold transition-colors ${
                      on ? "border-ticket bg-ticket text-ticket-red" : "border-ticket/40 text-ticket hover:border-ticket"
                    }`}
                  >
                    {tab.label} <span className="tabular-nums opacity-70">({countFor(tab.value)})</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="mt-4 min-w-0">
            <legend className="text-sm font-bold text-bulb">Genre</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {["all", ...categories].map((cat) => {
                const on = categoryFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      playClick();
                      setCategoryFilter(cat);
                    }}
                    className={`min-h-11 rounded-full px-4 text-sm font-bold transition-colors ${
                      on ? "bg-bulb text-black" : "bg-black/30 text-ticket hover:bg-black/50"
                    }`}
                  >
                    {cat === "all" ? "Every genre" : cat}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        <p className="mx-auto mt-8 max-w-6xl text-sm font-semibold text-ticket/80" aria-live="polite">
          Showing {filteredEvents.length} of {EVENTS.length} events
        </p>

        {/* Tickets */}
        {filteredEvents.length === 0 ? (
          <div className="ticket mx-auto mt-4 max-w-4xl px-6 py-10 text-center text-black sm:pl-[11rem]">
            <p className="text-xl font-black">Nothing showing for that search.</p>
            <p className="mt-1 text-base text-black/70">Clear the filters to see all {EVENTS.length} events again.</p>
            <button type="button" onClick={resetFilters} className="mt-5 min-h-11 bg-ticket-red px-5 text-base font-black text-ticket">
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="mx-auto mt-4 grid max-w-6xl gap-6 lg:grid-cols-2">
            {filteredEvents.map((e) => (
              <li key={e.id} className="drop-shadow-[0_8px_0_rgb(0_0_0/0.45)] transition-transform duration-200 hover:-rotate-[0.6deg]">
                <article className="ticket relative grid h-full text-black sm:grid-cols-[9.5rem_1fr]">
                  {/* Stub */}
                  <div className="flex min-h-[4.75rem] items-center justify-between gap-3 bg-ticket-red px-5 py-2 text-ticket sm:flex-col sm:items-start sm:justify-center sm:py-5">
                    <p className="text-xs font-bold tracking-wide uppercase opacity-90">Admit one</p>
                    <p className="text-right sm:text-left">
                      <span className="block text-2xl leading-none font-black condensed sm:text-3xl">{dayName(e.day)}</span>
                      <span className="block text-sm font-bold">{shortDate(e.date)}</span>
                    </p>
                    <p className="text-right sm:mt-2 sm:text-left">
                      <span className="block text-3xl leading-none font-black tabular-nums condensed">{e.time}</span>
                      <span className="block text-sm font-semibold opacity-90">to {e.end}</span>
                    </p>
                  </div>
                  {/* Body */}
                  <div className="relative border-dashed border-black/30 p-5 sm:border-l-[3px] sm:p-6">
                    {e.headline && (
                      <span className="absolute top-3 right-3 grid size-[4.6rem] rotate-12 place-items-center rounded-full border-[3px] border-double border-ticket-red text-center text-[0.68rem] leading-tight font-black text-ticket-red uppercase sm:top-4 sm:right-5">
                        Headline
                        <br />
                        event
                      </span>
                    )}
                    <p className="pr-20 text-sm font-bold text-ticket-red">Hosted by {e.club}</p>
                    <h3 className="mt-1 pr-20 text-2xl leading-tight font-black sm:text-[1.75rem]">{e.name}</h3>
                    <p className="mt-2 line-clamp-3 max-w-prose text-base leading-relaxed text-black/75 sm:line-clamp-none">{e.blurb}</p>
                    <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                      <div className="flex gap-1.5">
                        <dt className="font-semibold text-black/60">Where</dt>
                        <dd className="font-bold">{e.room ? `${e.room}, ${e.venue}` : e.venue}</dd>
                      </div>
                      <div className="flex gap-1.5">
                        <dt className="font-semibold text-black/60">Genre</dt>
                        <dd className="font-bold">{e.category}</dd>
                      </div>
                      {e.teamSize && (
                        <div className="flex gap-1.5">
                          <dt className="font-semibold text-black/60">Team</dt>
                          <dd className="font-bold">{e.teamSize}</dd>
                        </div>
                      )}
                    </dl>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <a
                        href={e.paymentUrl || FALLBACK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playChime}
                        className="inline-flex min-h-11 items-center gap-2 bg-ticket-red px-5 text-base font-black text-ticket transition-transform hover:-translate-y-0.5"
                      >
                        Register
                        <ExternalLink size={15} aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          playClick();
                          setSelectedEventForModal(e);
                        }}
                        className="min-h-11 px-2 text-base font-bold underline decoration-2 underline-offset-4 hover:text-ticket-red"
                      >
                        Read the rules<span className="sr-only">: {e.name}</span>
                      </button>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* The fine print */}
      <Modal open={!!ev} onClose={() => setSelectedEventForModal(null)} labelledBy="rules-title" className="max-w-2xl">
        {ev && (
          <div className="bg-ticket text-black shadow-[8px_8px_0_#000]">
            <div className="flex items-start justify-between gap-4 bg-ticket-red px-5 py-4 text-ticket sm:px-7">
              <div>
                <p className="text-sm font-bold">
                  {dayName(ev.day)}, {shortDate(ev.date)}. Hosted by {ev.club}
                </p>
                <h2 id="rules-title" className="mt-1 text-2xl leading-tight font-black sm:text-3xl">
                  {ev.name}
                </h2>
              </div>
              <CloseButton onClick={() => setSelectedEventForModal(null)} label="Close the rules" />
            </div>
            <div className="px-5 py-5 sm:px-7 sm:py-6">
              <p className="text-base leading-relaxed text-black/80">{ev.blurb}</p>
              <dl className="mt-5 grid grid-cols-2 gap-4 border-y-[3px] border-dashed border-black/25 py-4 text-sm sm:grid-cols-4">
                <div>
                  <dt className="font-semibold text-black/60">Time</dt>
                  <dd className="font-black tabular-nums">{ev.timeDisplay || `${ev.time} – ${ev.end}`}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-black/60">Venue</dt>
                  <dd className="font-black">{ev.venue}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-black/60">Room</dt>
                  <dd className="font-black">{ev.room || "See the campus map"}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-black/60">Team</dt>
                  <dd className="font-black">{ev.teamSize || "Open"}</dd>
                </div>
              </dl>
              <h3 className="mt-5 font-script text-2xl text-ticket-red">The fine print</h3>
              <ol className="mt-2 list-decimal space-y-2 pl-5 text-base leading-relaxed marker:font-black marker:text-ticket-red">
                {(ev.rules?.length ? ev.rules : standardGuidelines).map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ol>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <button type="button" onClick={() => setSelectedEventForModal(null)} className="min-h-11 px-2 text-base font-bold underline underline-offset-4">
                  Back to the programme
                </button>
                <a
                  href={ev.paymentUrl || FALLBACK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    playChime();
                    setSelectedEventForModal(null);
                  }}
                  className="inline-flex min-h-12 items-center gap-2 bg-ticket-red px-6 text-base font-black text-ticket"
                >
                  Register for {ev.name.length > 22 ? "this event" : ev.name}
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
