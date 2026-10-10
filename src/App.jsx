import React, { useEffect, useRef, useState } from "react";
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
import { EVENTS } from "./data/festivalData";
import PrintIntro from "./components/fx/PrintIntro";
import CursorTrails from "./components/fx/CursorTrails";
import WorldSpine from "./components/WorldSpine";
import { usePage } from "./components/pages/route";
import CorePage from "./components/pages/CorePage";
import CreditsPage from "./components/pages/CreditsPage";
import RulesPage from "./components/pages/RulesPage";
import LegalPage from "./components/pages/LegalPage";

// MAAYA '26 · ECLECTRIA, laid out as a collage zine: a riso-printed cover,
// then one section per world (denim, cinema, cosmic, sports, tradition), then
// the riso back cover.
export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [registerEvent, setRegisterEvent] = useState(null);
  const [selectedEventForModal, setSelectedEventForModal] = useState(null);

  // #/core, #/rules and #/legal swap the home page for a page of their own. Opening
  // one starts at its top; coming back lands on the section the link named.
  const page = usePage();
  const lastPage = useRef(page);
  useEffect(() => {
    if (page) window.scrollTo(0, 0);
    else if (lastPage.current) {
      const id = window.location.hash.slice(1);
      requestAnimationFrame(() => (id ? document.getElementById(id)?.scrollIntoView() : window.scrollTo(0, 0)));
    }
    lastPage.current = page;
  }, [page]);

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
      {!page && <WorldSpine />}

      {page === "/core" ? (
        <CorePage />
      ) : page === "/credits" ? (
        <CreditsPage />
      ) : page === "/rules" ? (
        <RulesPage />
      ) : page === "/legal" ? (
        <LegalPage />
      ) : (
        <main id="main">
          <HeroSection />
          <WorldTicker />
          <CampusIslandSection />
          <ProgrammeExplorer selectedEventForModal={selectedEventForModal} setSelectedEventForModal={setSelectedEventForModal} />
          <ConcertSection />
          <PastEditionsSection />
          <AnnouncementsAndFAQ />
        </main>
      )}

      <Footer onOpenRegister={() => handleOpenRegister(null)} />

      {/* Keyed by event so opening it for a different event starts on that event. */}
      <RegistrationModal key={registerEvent?.id ?? "none"} isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} initialEvent={registerEvent} />
    </MotionConfig>
  );
}
