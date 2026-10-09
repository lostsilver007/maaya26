import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CampusIslandSection from "./components/CampusIslandSection";
import ProgrammeExplorer from "./components/ProgrammeExplorer";
import ConcertSection from "./components/ConcertSection";
import PastEditionsSection from "./components/PastEditionsSection";
import AnnouncementsAndFAQ from "./components/AnnouncementsAndFAQ";
import Footer from "./components/Footer";
import RegistrationModal from "./components/RegistrationModal";
import RulebookModal from "./components/RulebookModal";
import { EVENTS } from "./data/festivalData";

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
    <div className="min-h-screen bg-[#0C0E14] text-[#F8F6F0] relative selection:bg-[#E63988] selection:text-white font-inter">
      {/* Floating Pill Capsule Navbar */}
      <Navbar onOpenRegister={() => handleOpenRegister(null)} />

      {/* Main Content */}
      <main id="main">
        {/* Clean Hero with Countdown & Metrics */}
        <HeroSection
          onOpenRegister={() => handleOpenRegister(null)}
          onSelectEvent={(ev) => setSelectedEventForModal(ev)}
        />

        {/* Embedded 3D Fest Island & Campus Venues */}
        <CampusIslandSection />

        {/* Programme Explorer (Official Events from Fest-Island) */}
        <ProgrammeExplorer
          onOpenRegisterForEvent={(ev) => handleOpenRegister(ev)}
          selectedEventForModal={selectedEventForModal}
          setSelectedEventForModal={setSelectedEventForModal}
        />

        {/* Concert Pro-Night Section */}
        <ConcertSection />

        {/* Past Editions & Retrospective */}
        <PastEditionsSection />

        {/* FAQ Support */}
        <AnnouncementsAndFAQ />
      </main>

      {/* Footer */}
      <Footer
        onOpenRulebook={() => setIsRulebookOpen(true)}
        onOpenRegister={() => handleOpenRegister(null)}
      />

      {/* Interactive Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        initialEvent={registerEvent}
      />

      {/* Code of Conduct Modal */}
      <RulebookModal
        isOpen={isRulebookOpen}
        onClose={() => setIsRulebookOpen(false)}
      />
    </div>
  );
}
