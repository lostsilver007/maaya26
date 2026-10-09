import React from "react";
import { FESTIVAL_INFO } from "../data/festivalData";
import { MapPin, Phone, Mail, Sparkles, ArrowUp } from "lucide-react";
import { playClick } from "../utils/audioEffects";

export default function Footer({ onOpenRulebook, onOpenRegister }) {
  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#080A0E] border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-[#F8F6F0]">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#E63988]"></span>
              <span className="font-outfit font-black text-2xl text-[#F8F6F0]">MAAYA '26</span>
            </div>
            <p className="text-xs text-[#8E96A4] leading-relaxed">
              {FESTIVAL_INFO.tagline}
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-outfit font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#22E4F0]">
                {FESTIVAL_INFO.dates.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Venue Location */}
          <div className="space-y-2 font-outfit">
            <h4 className="text-xs font-bold tracking-widest text-[#22E4F0] uppercase">
              VENUE & CAMPUS
            </h4>
            <div className="text-xs text-[#8E96A4] space-y-1 leading-relaxed">
              <p className="font-bold text-[#F8F6F0]">PES University Electronic City Campus</p>
              <p>Hosur Road, Konappana Agrahara</p>
              <p>Electronic City, Bengaluru, 560100</p>
            </div>
            <a
              href="https://maps.google.com/?q=PES+University+Electronic+City+Campus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#22E4F0] font-bold hover:underline pt-1"
            >
              <MapPin size={13} />
              <span>Get Directions →</span>
            </a>
          </div>

          {/* Contacts */}
          <div className="space-y-2 font-outfit">
            <h4 className="text-xs font-bold tracking-widest text-[#22E4F0] uppercase">
              ORGANIZERS
            </h4>
            <div className="space-y-2 text-xs">
              {FESTIVAL_INFO.contacts.map((c, i) => (
                <div key={i} className="leading-tight">
                  <span className="font-bold text-[#F8F6F0] block">{c.name} ({c.role})</span>
                  <a href={`tel:${c.phone}`} className="text-[#8E96A4] hover:text-[#22E4F0]">
                    {c.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Links & Socials */}
          <div className="space-y-2 font-outfit">
            <h4 className="text-xs font-bold tracking-widest text-[#22E4F0] uppercase">
              CONNECT & EXPLORE
            </h4>
            <div className="flex items-center gap-2 pt-1">
              <a
                href={FESTIVAL_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#E63988] hover:text-white transition-all flex items-center justify-center border border-white/10"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              <a
                href={FESTIVAL_INFO.socials.island}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="3D Campus Map"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#22E4F0] hover:text-[#0C0E14] transition-all flex items-center justify-center border border-white/10"
                title="3D Fest Island"
              >
                <Sparkles size={16} />
              </a>
            </div>

            <div className="pt-2 space-y-1 text-xs text-[#8E96A4]">
              <button
                onClick={onOpenRulebook}
                className="block text-[#8E96A4] hover:text-[#F8F6F0] hover:underline"
              >
                Fest Rulebook & Code of Conduct
              </button>
              <button
                onClick={onOpenRegister}
                className="block text-[#22E4F0] font-bold hover:underline"
              >
                Event Registration Portal →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-outfit text-[#8E96A4]">
          <p>© 2026 MAAYA · PES University Electronic City Campus. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[#F8F6F0] transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
