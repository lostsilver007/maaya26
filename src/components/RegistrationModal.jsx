import React, { useState } from "react";
import { ExternalLink, Ticket } from "lucide-react";
import { EVENTS } from "../data/festivalData";
import { playChime, playClick } from "../utils/audioEffects";
import Modal, { CloseButton } from "./Modal";

const FALLBACK_URL = "https://fest-island.vercel.app/#programme";
const dayName = (day) => day;

// The box office: pick an event, check its details, go to its payment page.
export default function RegistrationModal({ isOpen, onClose, initialEvent }) {
  const [selectedEventId, setSelectedEventId] = useState(initialEvent ? initialEvent.id : "");
  const ev = EVENTS.find((e) => e.id === selectedEventId) || null;

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
            <option value="" disabled>
              -- Select an event to register --
            </option>
            {EVENTS.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name} ({dayName(e.day)})
              </option>
            ))}
          </select>

          {!ev ? (
            <div className="mt-5 border-[3px] border-dashed border-black/30 bg-black/5 p-6 text-center">
              <div className="mx-auto grid size-12 place-items-center rounded-full border-2 border-black bg-riso-yellow text-black shadow-[2px_2px_0_#000]">
                <Ticket size={24} aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-lg font-black uppercase tracking-tight">
                Choose an Event
              </h3>
              <p className="mt-1.5 text-sm font-medium text-black/70 max-w-sm mx-auto">
                Please select an event from the dropdown above to view its timings, venue, registration fees, and direct form link.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-5 border-y-[3px] border-dashed border-black/25 py-4">
                <p className="text-sm font-bold text-ticket-red">Hosted by {ev.club}</p>
                <h3 className="mt-0.5 text-xl leading-tight font-black">{ev.name}</h3>
                <p className="mt-2 text-base leading-relaxed text-black/75">{ev.blurb}</p>
                {ev.description && (
                  <div className="mt-3 whitespace-pre-line border-l-2 border-ticket-red/40 bg-black/5 p-3 text-sm leading-relaxed text-black/85">
                    {ev.description}
                  </div>
                )}
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
                  {ev.fee && (
                    <div>
                      <dt className="font-semibold text-black/60">Fee</dt>
                      <dd className="font-black text-ticket-red">{ev.fee}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="font-semibold text-black/60">Genre</dt>
                    <dd className="font-black">{ev.category}</dd>
                  </div>
                  {ev.mode && (
                    <div>
                      <dt className="font-semibold text-black/60">Mode</dt>
                      <dd className="font-black uppercase">{ev.mode}</dd>
                    </div>
                  )}
                  {ev.contact && (
                    <div className="col-span-2">
                      <dt className="font-semibold text-black/60">Point of contact</dt>
                      <dd className="font-bold text-black/90">{ev.contact}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {ev.paymentUrl ? (
                <p className="mt-4 text-sm text-black/70">Registration finishes on the event's official registration form, which opens in a new tab.</p>
              ) : (
                <p className="mt-4 text-sm font-bold text-ticket-red">Registration form link will be updated soon.</p>
              )}
            </>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <button type="button" onClick={onClose} className="min-h-11 px-2 text-base font-bold underline underline-offset-4">
              {ev ? "Not now" : "Close"}
            </button>
            {ev ? (
              ev.paymentUrl ? (
                <a
                  href={ev.paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    playChime();
                    onClose();
                  }}
                  className="inline-flex min-h-12 items-center gap-2 bg-ticket-red px-6 text-base font-black text-ticket"
                >
                  Register now
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              ) : (
                <span className="inline-flex min-h-12 items-center border-[2px] border-dashed border-black/40 bg-black/5 px-5 text-base font-bold text-black/60">
                  Will be updated soon
                </span>
              )
            ) : (
              <span className="inline-flex min-h-12 items-center border-[2px] border-dashed border-black/30 bg-black/5 px-4 text-sm font-bold text-black/50">
                Select an event to proceed
              </span>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
