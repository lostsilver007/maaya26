import React, { useState, useEffect } from "react";
import { Sparkles, Volume2, VolumeX, Menu, X, Compass, ArrowRight } from "lucide-react";
import { playClick, setSoundEnabled } from "../utils/audioEffects";

export default function Navbar({ onOpenRegister }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playClick();
  };

  const navLinks = [
    { label: "3D CAMPUS MAP", href: "#venues" },
    { label: "PROGRAMME", href: "#programme" },
    { label: "CONCERT", href: "#concert" },
    { label: "EDITIONS", href: "#editions" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      {/* Floating Pill Capsule Navbar */}
      <header className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[94%] max-w-4xl">
        <div className="rounded-full bg-[#F8F6F0]/90 sm:bg-[#F8F6F0]/85 backdrop-blur-xl px-3 sm:px-4 py-2 flex items-center justify-between shadow-2xl border border-white/20">
          {/* Brand */}
          <a
            href="#"
            onClick={playClick}
            className="flex items-center gap-1.5 sm:gap-2 pl-1 sm:pl-2 text-[#1A1A1A] font-outfit font-black text-base sm:text-lg tracking-tight hover:opacity-80 transition-opacity"
          >
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#E63988]"></span>
            <span>MAAYA</span>
            <span className="text-[10px] sm:text-[11px] font-mono px-1.5 py-0.5 rounded-full bg-[#1A1A1A] text-[#F8F6F0]">
              '26
            </span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={playClick}
                className="px-3.5 py-1.5 text-xs font-outfit font-bold text-[#1A1A1A] hover:bg-[#1A1A1A]/10 rounded-full transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={toggleSound}
              aria-label="Toggle Sound"
              className={`p-1.5 sm:p-2 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                soundOn
                  ? "bg-[#22E4F0] text-[#0C0E14]"
                  : "bg-[#1A1A1A]/10 text-[#1A1A1A] hover:bg-[#1A1A1A]/20"
              }`}
            >
              {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            <button
              onClick={() => {
                playClick();
                onOpenRegister();
              }}
              className="bg-[#1A1A1A] text-[#F8F6F0] px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-outfit font-bold rounded-full hover:bg-black transition-all flex items-center gap-1 sm:gap-1.5 shadow-md active:scale-95"
            >
              <Sparkles size={12} className="text-[#22E4F0]" />
              <span>REGISTER</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full text-[#1A1A1A] hover:bg-[#1A1A1A]/10"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-5 rounded-3xl bg-[#0C0E14]/98 backdrop-blur-2xl border border-white/15 shadow-2xl space-y-3 animate-fade-in max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-outfit text-[#8E96A4]">
              <span>NAVIGATION MENU</span>
              <span className="text-[#22E4F0] font-bold">PES UNIVERSITY EC</span>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between py-3 px-4 rounded-2xl text-sm font-outfit font-bold text-[#F8F6F0] bg-white/5 hover:bg-white/10 active:bg-[#22E4F0]/20 transition-colors"
                >
                  <span>{item.label}</span>
                  <ArrowRight size={14} className="text-[#8E96A4]" />
                </a>
              ))}
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  playClick();
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-3.5 rounded-full bg-[#E63988] text-[#1A1A1A] font-outfit font-black text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <Sparkles size={14} />
                <span>REGISTER FOR EVENTS</span>
              </button>

              <a
                href="https://fest-island.vercel.app/#venues"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-white/5 border border-white/10 text-[#22E4F0] font-outfit font-bold text-xs flex items-center justify-center gap-2"
              >
                <Compass size={14} />
                <span>OPEN 3D CAMPUS MAP</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
