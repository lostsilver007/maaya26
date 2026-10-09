import React, { useState } from "react";
import { EVENTS } from "../data/festivalData";
import { ExternalLink, X, MapPin, Clock, Users, Building, ShieldCheck } from "lucide-react";
import { playChime, playClick } from "../utils/audioEffects";

export default function RegistrationModal({ isOpen, onClose, initialEvent }) {
  const [selectedEventId, setSelectedEventId] = useState(
    initialEvent ? initialEvent.id : EVENTS[0].id
  );

  if (!isOpen) return null;

  const currentEvent = EVENTS.find((e) => e.id === selectedEventId) || EVENTS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0C0E14] border border-white/20 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
        >
          <X size={18} />
        </button>

        <div className="space-y-1 mb-5 pr-8">
          <span className="text-[10px] sm:text-xs font-outfit font-bold text-[#22E4F0] uppercase tracking-wider block">
            MAAYA '26 REGISTRATION & PAYMENT
          </span>
          <h2 className="font-outfit font-black text-2xl sm:text-3xl text-[#F8F6F0]">
            Event Registration
          </h2>
          <p className="text-xs text-[#8E96A4]">
            Select an official event below and proceed directly to the payment portal.
          </p>
        </div>

        <div className="space-y-4 text-xs font-outfit">
          {/* Event Select Dropdown */}
          <div>
            <label className="block text-[#8E96A4] font-bold mb-1.5 uppercase text-[10px] tracking-wider">
              SELECT COMPETITION / EVENT
            </label>
            <select
              value={selectedEventId}
              onChange={(e) => {
                playClick();
                setSelectedEventId(e.target.value);
              }}
              className="w-full py-2.5 px-3.5 rounded-xl bg-white/5 border border-white/10 text-[#F8F6F0] text-xs font-outfit focus:outline-none focus:ring-2 focus:ring-[#22E4F0]"
            >
              {EVENTS.map((ev) => (
                <option key={ev.id} value={ev.id} className="bg-[#0C0E14] text-white">
                  [{ev.day}] {ev.name} ({ev.club})
                </option>
              ))}
            </select>
          </div>

          {/* Event Details Card */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#22E4F0] uppercase block">
                  {currentEvent.day} · {currentEvent.category}
                </span>
                <h3 className="font-outfit font-black text-lg text-[#F8F6F0]">
                  {currentEvent.name}
                </h3>
                <span className="text-xs text-[#E63988] font-bold">
                  Club: {currentEvent.club}
                </span>
              </div>

              {currentEvent.teamSize && (
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/10 text-[#F8F6F0] shrink-0">
                  {currentEvent.teamSize}
                </span>
              )}
            </div>

            <p className="text-xs text-[#8E96A4] leading-relaxed">
              {currentEvent.blurb}
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="flex items-center gap-1.5 text-[#8E96A4]">
                <Clock size={12} className="text-[#22E4F0] shrink-0" />
                <span>{currentEvent.timeDisplay}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#8E96A4]">
                <MapPin size={12} className="text-[#E63988] shrink-0" />
                <span className="truncate">{currentEvent.venue} ({currentEvent.room})</span>
              </div>
            </div>
          </div>

          {/* Secure Note */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-[#22E4F0]/05 border border-[#22E4F0]/20 text-[11px] text-[#8E96A4]">
            <ShieldCheck size={16} className="text-[#22E4F0] shrink-0" />
            <span>You will be redirected to the secure payment portal to complete registration.</span>
          </div>

          {/* Direct Redirection CTA */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-full bg-white/5 text-xs font-outfit font-bold text-[#8E96A4] hover:text-white transition-colors"
            >
              Cancel
            </button>

            <a
              href={currentEvent.paymentUrl || "https://fest-island.vercel.app/#programme"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                playChime();
                onClose();
              }}
              className="pill-button-magenta px-6 py-2.5 text-xs font-outfit font-bold flex items-center gap-2 shadow-lg"
            >
              <span>Go to Payment Page</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
