import React, { useState } from "react";
import { ExternalLink } from "lucide-react";
import { EVENTS } from "../data/festivalData";
import { playChime, playClick } from "../utils/audioEffects";
import Modal, { CloseButton } from "./Modal";

const FALLBACK_URL = "https://fest-island.vercel.app/#programme";
const dayName = (day) => day;

// The box office: pick an event, check its details, go to its payment page.
export default function RegistrationModal({ isOpen, onClose, initialEvent }) {
  const [selectedEventId, setSelectedEventId] = useState(initialEvent ? initialEvent.id : EVENTS[0].id);
  const ev = EVENTS.find((e) => e.id === selectedEventId) || EVENTS[0];

  return (
    <Modal open={isOpen} onClose={onClose} labelledBy="register-title" className="max-w-lg">
      <div className="bg-ticket text-black shadow-[8px_8px_0_#000]">
        <div className="flex items-start justify-between gap-4 bg-ticket-red px-5 py-4 text-ticket sm:px-7">
          <div>
            <p className="font-script text-xl text-bulb">Box office</p>
            <h2 id="register-title" className="text-2xl leading-tight font-black sm:text-3xl">
              Register for an event
            </h2>
          </div>
          <CloseButton onClick={onClose} label="Close registration" />
        </div>

        <div className="px-5 py-5 sm:px-7 sm:py-6">
          <label htmlFor="register-event" className="block text-sm font-bold">
            Event
          </label>
          <select
            id="register-event"
            value={selectedEventId}
            onChange={(e) => {
              playClick();
              setSelectedEventId(e.target.value);
            }}
            className="mt-1.5 min-h-12 w-full border-[3px] border-black bg-white px-3 text-base font-semibold"
          >
            {EVENTS.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name} ({dayName(e.day)})
              </option>
            ))}
          </select>

          <div className="mt-5 border-y-[3px] border-dashed border-black/25 py-4">
            <p className="text-sm font-bold text-ticket-red">Hosted by {ev.club}</p>
            <h3 className="mt-0.5 text-xl leading-tight font-black">{ev.name}</h3>
            <p className="mt-2 text-base leading-relaxed text-black/75">{ev.blurb}</p>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="font-semibold text-black/60">When</dt>
                <dd className="font-black">
                  {dayName(ev.day)}, {ev.timeDisplay}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-black/60">Where</dt>
                <dd className="font-black">{ev.room ? `${ev.room}, ${ev.venue}` : ev.venue}</dd>
              </div>
              {ev.teamSize && (
                <div>
                  <dt className="font-semibold text-black/60">Team</dt>
                  <dd className="font-black">{ev.teamSize}</dd>
                </div>
              )}
              <div>
                <dt className="font-semibold text-black/60">Genre</dt>
                <dd className="font-black">{ev.category}</dd>
              </div>
              {ev.contact && (
                <div className="col-span-2">
                  <dt className="font-semibold text-black/60">Club contact</dt>
                  <dd className="font-bold text-black/90">{ev.contact}</dd>
                </div>
              )}
            </dl>
          </div>

          <p className="mt-4 text-sm text-black/70">Registration and payment finish on the event's own payment page, which opens in a new tab.</p>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <button type="button" onClick={onClose} className="min-h-11 px-2 text-base font-bold underline underline-offset-4">
              Not now
            </button>
            <a
              href={ev.paymentUrl || FALLBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                playChime();
                onClose();
              }}
              className="inline-flex min-h-12 items-center gap-2 bg-ticket-red px-6 text-base font-black text-ticket"
            >
              Go to the payment page
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
}
