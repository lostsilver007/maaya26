import React, { useState, useMemo, useRef } from "react";
import { Search, X, ExternalLink, FileText } from "lucide-react";
import { EVENTS } from "../data/festivalData";
import { playClick, playChime } from "../utils/audioEffects";
import Modal, { CloseButton } from "./Modal";
import Curtains from "./fx/Curtains";
import { finePointer, prefersReducedMotion } from "./fx/env";
import PesuSeal from "./PesuSeal";

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

const isPreFestEvent = (e) =>
  e.isPreFest ||
  e.day.toLowerCase().includes("pre") ||
  e.day.includes("15") ||
  e.day.includes("17") ||
  e.day.includes("19") ||
  e.day.includes("21") ||
  e.day.includes("22");

const DAY_TABS = [
  { label: "All", value: "all" },
  { label: "Pre-fest", value: "pre" },
  { label: "23 Oct", value: "23" },
  { label: "24 Oct", value: "24" },
];
const countFor = (value) => {
  if (value === "all") return EVENTS.length;
  if (value === "pre") return EVENTS.filter(isPreFestEvent).length;
  return EVENTS.filter((e) => e.day.includes(value) || e.date.includes(value)).length;
};

// One ticket. With a mouse it tilts towards the pointer like card stock in
// the hand, the stub starts to tear along the perforation, and registering
// punches a hole in it.
function Ticket({ e, punched, onPunch, onRules }) {
  const ref = useRef(null);
  const tilt = finePointer && !prefersReducedMotion();
  const onMove = (ev) => {
    if (!tilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (ev.clientX - r.left) / r.width - 0.5;
    const y = (ev.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(1100px) rotateY(${x * 7}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
    ref.current.style.setProperty("--glare-x", `${(x + 0.5) * 100}%`);
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <li ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className="group drop-shadow-[0_8px_0_rgb(0_0_0/0.45)] transition-transform duration-200 ease-out">
      <article className="ticket relative grid h-full text-black sm:grid-cols-[9.5rem_1fr]">
        {/* Stub */}
        <div className="relative flex min-h-[4.75rem] origin-right items-center justify-between gap-3 bg-ticket-red px-5 py-2 text-ticket transition-transform duration-300 sm:flex-col sm:items-start sm:justify-center sm:py-5 sm:group-hover:-translate-x-1 sm:group-hover:-rotate-2">
          {punched && <span className="punch top-2 right-3 sm:top-3 sm:right-auto sm:left-[6.6rem]" aria-hidden="true" />}
          <p className="text-xs font-bold tracking-wide uppercase opacity-90">{punched ? "Admitted" : "Admit one"}</p>
          <p className="text-right sm:text-left">
            <span className="block text-2xl leading-none font-black condensed sm:text-3xl">{e.day}</span>
            <span className="block text-sm font-bold">{e.dayLabel || (e.date === "2026-10-23" ? "Friday" : e.date === "2026-10-24" ? "Saturday" : "Tournament")}</span>
          </p>
          <p className="text-right sm:mt-2 sm:text-left">
            <span className="block text-3xl leading-none font-black tabular-nums condensed">{e.time}</span>
            <span className="block text-sm font-semibold opacity-90">to {e.end}</span>
          </p>
        </div>
        {/* Body */}
        <div className="relative border-dashed border-black/30 p-5 sm:border-l-[3px] sm:p-6">
          {/* Light catching the card stock */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "radial-gradient(40% 70% at var(--glare-x, 50%) 0%, rgb(255 255 255 / 0.45), transparent 70%)" }}
          />
          <p className="relative text-sm font-bold text-ticket-red">Hosted by {e.club}</p>
          <h3 className="relative mt-1 text-2xl leading-tight font-black sm:text-[1.75rem]">{e.name}</h3>
          <p className="relative mt-2 line-clamp-3 max-w-prose text-base leading-relaxed text-black/75 sm:line-clamp-none">{e.blurb}</p>
          <dl className="relative mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
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
            {e.fee && (
              <div className="flex gap-1.5">
                <dt className="font-semibold text-black/60">Fee</dt>
                <dd className="font-bold text-ticket-red">{e.fee}</dd>
              </div>
            )}
            {e.mode && (
              <div className="flex gap-1.5">
                <dt className="font-semibold text-black/60">Mode</dt>
                <dd className="font-bold uppercase">{e.mode}</dd>
              </div>
            )}
          </dl>
          <div className="relative mt-5 flex flex-wrap items-center gap-3">
            {e.paymentUrl ? (
              <a
                href={e.paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  playChime();
                  onPunch(e.id);
                }}
                className="inline-flex min-h-11 items-center gap-2 bg-ticket-red px-5 text-base font-black text-ticket shadow-[3px_3px_0_#000] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#000] active:translate-y-0.5 active:shadow-none"
              >
                Register
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            ) : (
              <span className="inline-flex min-h-11 items-center border-[2px] border-dashed border-black/40 bg-black/5 px-4 text-sm font-bold text-black/70">
                Will be updated soon
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                playClick();
                onRules(e);
              }}
              className="min-h-11 px-2 text-base font-bold underline decoration-2 underline-offset-4 hover:text-ticket-red"
            >
              Read the rules<span className="sr-only">: {e.name}</span>
            </button>
            {e.rulesUrl && (
              <a
                href={e.rulesUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="inline-flex min-h-11 items-center gap-1.5 border-[2px] border-black bg-white px-3.5 py-1.5 text-sm font-black text-black shadow-[2px_2px_0_#000] transition-all hover:-translate-y-0.5 hover:bg-riso-yellow hover:shadow-[4px_4px_0_#000] active:translate-y-0 active:shadow-none"
                title={`Rules PDF: ${e.name}`}
              >
                <FileText size={15} aria-hidden="true" />
                Rules PDF
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </article>
    </li>
  );
}

export default function ProgrammeExplorer({ selectedEventForModal, setSelectedEventForModal }) {
  const [punched, setPunched] = useState(() => new Set());
  const punch = (id) => setPunched((prev) => new Set(prev).add(id));
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentDayTab, setCurrentDayTab] = useState("all");

  const categories = useMemo(() => [...new Set(EVENTS.map((e) => e.category))], []);

  const filteredEvents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return EVENTS.filter((ev) => {
      let matchDay = true;
      if (currentDayTab === "all") {
        matchDay = true;
      } else if (currentDayTab === "pre") {
        matchDay = isPreFestEvent(ev);
      } else {
        matchDay = ev.day.includes(currentDayTab) || ev.date.includes(currentDayTab);
      }
      const matchCat = categoryFilter === "all" || ev.category === categoryFilter;
      const matchSearch =
        !q ||
        [ev.name, ev.club, ev.blurb, ev.venue, ev.room ?? "", ev.category, ev.contact ?? "", ev.fee ?? ""].some((s) =>
          s.toLowerCase().includes(q)
        );
      return matchDay && matchCat && matchSearch;
    });
  }, [currentDayTab, categoryFilter, searchQuery]);

  const resetFilters = () => {
    setSearchQuery("");
    setCurrentDayTab("all");
    setCategoryFilter("all");
  };

  const ev = selectedEventForModal;

  // A follow-spot: the velvet falls into shadow except where the pointer is.
  const spot = finePointer && !prefersReducedMotion();
  const onSpot = (e) => {
    if (!spot) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };

  return (
    <section id="programme" data-cursor="popcorn" onPointerMove={onSpot} className="tex-velvet grain-dark film-grain relative px-4 pt-6 pb-24 text-ticket sm:px-6 lg:px-8">
      {spot && <div aria-hidden="true" className="spotlight pointer-events-none absolute inset-0 z-[1]" />}
      <div className="relative z-[2] mx-auto max-w-6xl">
        {/* Marquee, behind curtains that part as you scroll */}
        <Curtains className="-mx-4 px-4 pt-20 pb-6 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="marquee-frame mx-auto max-w-3xl text-center">
          <div className="relative rounded-md bg-[#140204] px-4 py-6 sm:px-8 sm:py-8">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <p className="text-sm font-bold text-bulb/80">World 2: Cinema &amp; Retro</p>
              <PesuSeal world="cinema" size="sm" />
            </div>
            <h2 className="mt-2 font-marquee text-[2.7rem] leading-none text-bulb [text-shadow:0_0_14px_rgb(255_211_107/0.75),0_0_42px_rgb(255_120_40/0.45)] sm:text-7xl">
              Now sho<span className="neon-flicker">w</span>ing
            </h2>
            <p className="mt-4 text-base font-semibold text-ticket/90 sm:text-lg">
              {EVENTS.length} club events across October 23 & 24
            </p>
          </div>
        </div>
        </Curtains>

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
              {DAY_TABS.filter((tab) => tab.value === "all" || countFor(tab.value) > 0).map((tab) => {
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
              <Ticket key={e.id} e={e} punched={punched.has(e.id)} onPunch={punch} onRules={setSelectedEventForModal} />
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
                  {ev.day}. Hosted by {ev.club}
                </p>
                <h2 id="rules-title" className="mt-1 text-2xl leading-tight font-black sm:text-3xl">
                  {ev.name}
                </h2>
              </div>
              <CloseButton onClick={() => setSelectedEventForModal(null)} label="Close the rules" />
            </div>
            <div className="px-5 py-5 sm:px-7 sm:py-6">
              <p className="text-base leading-relaxed text-black/80">{ev.blurb}</p>
              {ev.description && (
                <div className="mt-3 whitespace-pre-line border-l-2 border-ticket-red/40 bg-black/5 p-3 text-sm leading-relaxed text-black/85">
                  {ev.description}
                </div>
              )}
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
                {ev.fee && (
                  <div>
                    <dt className="font-semibold text-black/60">Entry fee</dt>
                    <dd className="font-black text-ticket-red">{ev.fee}</dd>
                  </div>
                )}
                {ev.mode && (
                  <div>
                    <dt className="font-semibold text-black/60">Mode</dt>
                    <dd className="font-black uppercase">{ev.mode}</dd>
                  </div>
                )}
              </dl>
              {ev.contact && (
                <p className="mt-3 text-xs font-semibold text-black/75">
                  <span className="font-bold text-black">Point of contact:</span> {ev.contact}
                </p>
              )}
              {ev.rulesUrl && (
                <div className="mt-3">
                  <a
                    href={ev.rulesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    className="inline-flex items-center gap-2 border-[2px] border-black bg-riso-yellow px-4 py-2 text-sm font-black text-black shadow-[3px_3px_0_#000] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#000]"
                  >
                    <FileText size={16} aria-hidden="true" />
                    Open Official Rules PDF (Google Drive)
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </div>
              )}
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
                {ev.paymentUrl ? (
                  <a
                    href={ev.paymentUrl}
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
                ) : (
                  <span className="inline-flex min-h-12 items-center border-[2px] border-dashed border-black/40 bg-black/5 px-5 text-base font-bold text-black/70">
                    Will be updated soon
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
