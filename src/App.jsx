import React, { useState } from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import WorldTicker from "./components/WorldTicker";
import CampusIslandSection from "./components/CampusIslandSection";
import ProgrammeExplorer from "./components/ProgrammeExplorer";
import ConcertSection from "./components/ConcertSection";
import PastEditionsSection from "./components/PastEditionsSection";
import AnnouncementsAndFAQ from "./components/AnnouncementsAndFAQ";
import Footer from "./components/Footer";
import RegistrationModal from "./components/RegistrationModal";
import RulebookModal from "./components/RulebookModal";
import { EVENTS } from "./data/festivalData";
import PrintIntro from "./components/fx/PrintIntro";
import CursorTrails from "./components/fx/CursorTrails";
import WorldSpine from "./components/WorldSpine";

// MAAYA '26 · ECLECTRIA, laid out as a collage zine: a riso-printed cover,
// then one section per world (denim, cinema, cosmic, sports, tradition), then
// the riso back cover.
export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [registerEvent, setRegisterEvent] = useState(null);
  const [isRulebookOpen, setIsRulebookOpen] = useState(false);
  const [selectedEventForModal, setSelectedEventForModal] = useState(null);

  const handleOpenRegister = (event = null) => {
    setRegisterEvent(event || EVENTS[0]);
    setIsRegisterOpen(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <a href="#programme" className="sr-only z-[80] bg-black px-4 py-3 font-bold text-riso-yellow focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to the programme
      </a>
      <PrintIntro />
      <CursorTrails />
      <Navbar onOpenRegister={() => handleOpenRegister(null)} />
      <WorldSpine />

      <main id="main">
        <HeroSection onSelectEvent={(ev) => setSelectedEventForModal(ev)} />
        <WorldTicker />
        <CampusIslandSection />
        <ProgrammeExplorer selectedEventForModal={selectedEventForModal} setSelectedEventForModal={setSelectedEventForModal} />
        <ConcertSection />
        <PastEditionsSection />
        <AnnouncementsAndFAQ />
      </main>

      <Footer onOpenRulebook={() => setIsRulebookOpen(true)} onOpenRegister={() => handleOpenRegister(null)} />

      {/* Keyed by event so opening it for a different event starts on that event. */}
      <RegistrationModal key={registerEvent?.id ?? "none"} isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} initialEvent={registerEvent} />
      <RulebookModal isOpen={isRulebookOpen} onClose={() => setIsRulebookOpen(false)} />
    </MotionConfig>
  );
}
