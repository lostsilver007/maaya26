import React, { useState, useEffect, useMemo } from "react";
import {
  Megaphone,
  Mic,
  Volume2,
  Radio,
  Bell,
  Sparkles,
  CheckCircle2,
  Share2,
  ChevronRight,
  ChevronLeft,
  Pin,
  Clock,
  Calendar,
  Check,
  Search,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { ANNOUNCEMENTS, ANNOUNCEMENT_BADGE_VARIANTS } from "../data/announcementsData";
import { playClick, playChime } from "../utils/audioEffects";
import Modal, { CloseButton } from "./Modal";

// Dynamic Lucide icon helper for badges
function BadgeIcon({ name, size = 16, className = "" }) {
  switch (name) {
    case "Mic":
      return <Mic size={size} className={className} />;
    case "Bell":
      return <Bell size={size} className={className} />;
    case "Radio":
      return <Radio size={size} className={className} />;
    case "Volume2":
      return <Volume2 size={size} className={className} />;
    case "Sparkles":
      return <Sparkles size={size} className={className} />;
    case "Megaphone":
    default:
      return <Megaphone size={size} className={className} />;
  }
}

// Live Audio Wave Micro-Animation (shows active loudspeaker broadcast)
function AudioWave() {
  return (
    <span aria-hidden="true" className="inline-flex items-end gap-0.5 h-3.5 px-1 py-0.5">
      <span className="w-1 bg-current rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2" />
      <span className="w-1 bg-current rounded-full animate-[pulse_1.1s_ease-in-out_infinite_0.2s] h-3.5" />
      <span className="w-1 bg-current rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-2.5" />
    </span>
  );
}

// Announcement Badge component with broadcast styling, optional avatar and desk tag
function SpeakerBadge({ speaker, badgeVariant, badgeText, secondaryBadge = null, compact = false }) {
  const variant = ANNOUNCEMENT_BADGE_VARIANTS[badgeVariant] || ANNOUNCEMENT_BADGE_VARIANTS.broadcast;

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 border-[2px] ${variant.border} ${variant.pillBg} ${variant.pillText} px-2.5 py-0.5 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0_#000]`}
        >
          <BadgeIcon name={variant.icon} size={13} />
          <span>{badgeText || variant.label}</span>
        </span>
        {secondaryBadge && (
          <span
            className="inline-flex items-center gap-1.5 border-[2px] border-black bg-riso-pink text-black px-2.5 py-0.5 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0_#000]"
          >
            <BadgeIcon name="Megaphone" size={13} />
            <span>{secondaryBadge}</span>
          </span>
        )}
        {speaker && speaker.name && (
          <span className="inline-flex items-center gap-1.5 bg-black/5 px-2 py-0.5 rounded text-xs font-bold text-black/80">
            <span
              className="grid size-4 place-items-center rounded-full text-[9px] font-black text-white shrink-0"
              style={{ backgroundColor: speaker.color || "#000" }}
            >
              {speaker.avatarText || "SP"}
            </span>
            <span className="truncate max-w-[130px] sm:max-w-[180px]">{speaker.name}</span>
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="border-[2px] border-black bg-white p-3 shadow-[3px_3px_0_#000]">
      <div className="flex items-center justify-between gap-2 border-b border-black/10 pb-2 mb-2">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 border-[2px] ${variant.border} ${variant.pillBg} ${variant.pillText} px-2.5 py-0.5 text-xs font-black uppercase tracking-wider shadow-[1.5px_1.5px_0_#000]`}
          >
            <BadgeIcon name={variant.icon} size={14} />
            <span>{badgeText || variant.label}</span>
          </span>
          <AudioWave />
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wide text-black/60 bg-black/5 px-2 py-0.5 rounded">
          <CheckCircle2 size={12} className="text-emerald-600" />
          Verified Desk
        </span>
      </div>

      {speaker && speaker.name && (
        <div className="flex items-center gap-3">
          <div
            className="grid size-10 place-items-center rounded-full border-2 border-black font-black text-sm text-white shadow-[2px_2px_0_#000] shrink-0"
            style={{ backgroundColor: speaker.color || "#000" }}
          >
            {speaker.avatarText || "SP"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h4 className="font-black text-sm text-black leading-tight truncate">{speaker.name}</h4>
            </div>
            <p className="text-xs font-semibold text-black/70 leading-tight truncate">
              {speaker.role} • <span className="text-black/50">{speaker.affiliation}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Single Announcement Box Card
function AnnouncementCard({ item, activeCategory = "all", onClick }) {
  const isBroadcastFilter = activeCategory === "broadcast" && item.categories?.includes("broadcast");
  const isAllFilter = activeCategory === "all";

  const currentBadgeVariant = isBroadcastFilter ? "broadcast" : item.badgeVariant;
  const currentBadgeText = isBroadcastFilter ? "OFFICIAL BROADCAST" : item.badge;
  const secondaryBadge = isAllFilter && item.categories?.includes("broadcast") && item.categories?.includes("pass")
    ? "BROADCAST"
    : null;

  return (
    <article
      onClick={() => {
        playClick();
        onClick(item);
      }}
      className="group relative flex flex-col justify-between border-[3px] border-black bg-white p-5 text-black shadow-[5px_5px_0_#000] transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[8px_8px_0_#000] cursor-pointer focus-within:ring-2 focus-within:ring-black"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          playClick();
          onClick(item);
        }
      }}
      role="button"
      aria-label={`Open announcement: ${item.title}`}
    >
      {/* Decorative tape on top of box */}
      <span aria-hidden="true" className="tape -top-3 right-6 -rotate-2" />

      {/* Top Bar: Pinned Badge + Date */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <SpeakerBadge
            speaker={item.speaker}
            badgeVariant={currentBadgeVariant}
            badgeText={currentBadgeText}
            secondaryBadge={secondaryBadge}
            compact
          />

          {item.pinned && (
            <span className="inline-flex items-center gap-1 border-2 border-black bg-riso-yellow px-2 py-0.5 text-[11px] font-black uppercase text-black shadow-[1.5px_1.5px_0_#000] shrink-0">
              <Pin size={11} className="fill-black" />
              Pinned
            </span>
          )}
        </div>

        {/* Date and time stamp */}
        <div className="flex items-center gap-3 text-xs font-bold text-black/60 mb-2">
          <span className="inline-flex items-center gap-1">
            <Calendar size={13} />
            {item.date}
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={13} />
            {item.time}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-sans text-xl leading-snug font-black text-black group-hover:text-riso-pink transition-colors">
          {item.title}
        </h3>

        {/* Truncated Summary Box (Content is intentionally limited here) */}
        <p className="mt-3 text-sm leading-relaxed text-black/75 line-clamp-3">
          {item.summary}
        </p>
      </div>

      {/* Bottom Action Section */}
      <div className="mt-5 pt-3 border-t-2 border-dashed border-black/20 flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {item.tags.slice(0, 2).map((t) => (
            <span key={t} className="bg-black/5 px-2 py-0.5 text-[11px] font-bold text-black/70 rounded">
              #{t}
            </span>
          ))}
        </div>

        <span className="inline-flex items-center gap-1 font-black text-xs uppercase tracking-wider text-black group-hover:translate-x-1 transition-transform">
          Read Full Message
          <ChevronRight size={15} className="text-black" />
        </span>
      </div>
    </article>
  );
}

// Full Announcement Pop-Up Modal
function AnnouncementModal({ item, open, onClose, onNavigate, hasPrev, hasNext }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) setCopied(false);
  }, [open, item]);

  if (!item) return null;

  const variant = ANNOUNCEMENT_BADGE_VARIANTS[item.badgeVariant] || ANNOUNCEMENT_BADGE_VARIANTS.broadcast;

  const copyLink = () => {
    playClick();
    const url = `${window.location.origin}${window.location.pathname}#announcements?id=${item.id}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <Modal open={open} onClose={onClose} labelledBy="announcement-title" className="max-w-2xl">
      <div className="border-[4px] border-black bg-paper text-black shadow-[10px_10px_0_#000]">
        {/* Header Ribbon */}
        <div className="flex items-center justify-between gap-4 border-b-[3px] border-black bg-riso-yellow px-5 py-3.5 sm:px-7">
          <div className="flex items-center gap-2">
            <span className="sticker -rotate-2 bg-black px-2 py-0.5 text-xs font-black uppercase text-riso-yellow">
              Dispatch
            </span>
            <span className="font-sans text-xs sm:text-sm font-black uppercase tracking-wider text-black">
              Maaya '26 Official Loudspeaker
            </span>
          </div>
          <CloseButton onClick={onClose} label="Close announcement" />
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 space-y-6">
          {/* Detailed Speaker Badge */}
          <SpeakerBadge
            speaker={item.speaker}
            badgeVariant={item.badgeVariant}
            badgeText={item.badge}
            secondaryBadge={item.categories?.includes("broadcast") && item.categories?.includes("pass") ? "OFFICIAL BROADCAST" : null}
          />

          {/* Date & Meta Info */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-black/60 border-b border-black/10 pb-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} />
                {item.date}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} />
                {item.time}
              </span>
            </div>

            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center gap-1.5 rounded border border-black/20 bg-white px-2.5 py-1 text-xs font-bold text-black hover:bg-black/5 active:scale-95 transition-all"
            >
              {copied ? <Check size={13} className="text-emerald-600" /> : <Share2 size={13} />}
              {copied ? "Link Copied!" : "Share Notice"}
            </button>
          </div>

          {/* Title */}
          <h2
            id="announcement-title"
            className="font-sans text-2xl sm:text-3xl font-black leading-tight text-black"
          >
            {item.title}
          </h2>

          {/* Complete Detailed Message Content */}
          <div className="space-y-4 text-base leading-relaxed text-black/85">
            {item.content.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}

            {/* Highlights List if present */}
            {item.content.highlights && item.content.highlights.length > 0 && (
              <div className="my-5 border-[2px] border-black bg-white p-4 shadow-[3px_3px_0_#000]">
                <h3 className="font-black text-sm uppercase tracking-wider text-black mb-2.5 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  Key Takeaways & Directives
                </h3>
                <ul className="space-y-2 text-sm">
                  {item.content.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 rounded-full bg-black shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Note / Callout box if present */}
            {item.content.note && (
              <div className="rounded-none border-l-4 border-kumkum bg-kumkum/10 p-3.5 text-sm font-semibold text-black">
                <p>
                  <strong className="font-black text-kumkum">Important Note: </strong>
                  {item.content.note}
                </p>
              </div>
            )}
          </div>

          {/* Action Button & Tags */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-[2px] border-black/15">
            <div className="flex flex-wrap items-center gap-2">
              {item.tags.map((t) => (
                <span
                  key={t}
                  className="border border-black/20 bg-white px-2.5 py-1 text-xs font-bold text-black/70"
                >
                  #{t}
                </span>
              ))}
            </div>

            {item.action && (
              <a
                href={item.action.url}
                onClick={() => {
                  playClick();
                  onClose();
                }}
                className="inline-flex min-h-11 items-center gap-2 border-[2px] border-black bg-riso-pink px-5 py-2 font-sans text-sm font-black text-black shadow-[3px_3px_0_#000] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#000] active:translate-y-0 transition-all"
              >
                <span>{item.action.label}</span>
                <ArrowRight size={16} />
              </a>
            )}
          </div>

          {/* Navigation Controls inside modal (Previous / Next) */}
          <div className="flex items-center justify-between gap-3 pt-2 text-sm font-black">
            <button
              type="button"
              disabled={!hasPrev}
              onClick={() => {
                playClick();
                onNavigate(-1);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 border-2 border-black bg-white shadow-[2px_2px_0_#000] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/5"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <span className="text-xs font-bold text-black/50">
              Press Esc to close
            </span>

            <button
              type="button"
              disabled={!hasNext}
              onClick={() => {
                playClick();
                onNavigate(1);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 border-2 border-black bg-white shadow-[2px_2px_0_#000] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/5"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

// Master Announcements Section Component
export default function AnnouncementsSection() {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Check URL on load for direct announcement link (e.g. #announcements?id=...)
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash;
      if (hash.includes("id=")) {
        const id = hash.split("id=")[1]?.split("&")[0];
        const match = ANNOUNCEMENTS.find((a) => a.id === id);
        if (match) {
          setSelectedAnnouncement(match);
        }
      }
    };
    handleHashCheck();
    window.addEventListener("hashchange", handleHashCheck);
    return () => window.removeEventListener("hashchange", handleHashCheck);
  }, []);

  // Filtered and searched announcements
  const filteredAnnouncements = useMemo(() => {
    return ANNOUNCEMENTS.filter((item) => {
      const matchesCategory =
        filterCategory === "all" ||
        item.badgeVariant === filterCategory ||
        (Array.isArray(item.categories) && item.categories.includes(filterCategory));

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        (item.speaker?.name && item.speaker.name.toLowerCase().includes(q)) ||
        item.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [filterCategory, searchQuery]);

  // Navigate between announcements inside the modal
  const currentIndex = selectedAnnouncement
    ? filteredAnnouncements.findIndex((a) => a.id === selectedAnnouncement.id)
    : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < filteredAnnouncements.length - 1;

  const handleNavigate = (direction) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < filteredAnnouncements.length) {
      setSelectedAnnouncement(filteredAnnouncements[newIndex]);
    }
  };

  const handleOpenAnnouncement = (item) => {
    setSelectedAnnouncement(item);
    playChime();
  };

  return (
    <section
      id="announcements"
      className="tex-paper grain relative px-4 pt-24 pb-28 text-black sm:px-6 lg:px-8 border-t-[3px] border-black"
    >
      <div className="relative z-[2] mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="sticker -rotate-2 bg-riso-yellow px-4 py-1.5 text-sm font-black uppercase text-black">
              Official Desk
            </span>
            <span className="inline-flex items-center gap-2 border-[2px] border-black bg-riso-pink px-3.5 py-1 text-xs font-black uppercase text-black shadow-[2px_2px_0_#000]">
              <Megaphone size={14} />
              Loudspeaker Active
              <AudioWave />
            </span>
          </div>

          <h2 className="mt-5 font-sans text-4xl sm:text-6xl font-black tracking-tight text-black">
            Festival Announcements
          </h2>
          <p className="mt-3 text-base sm:text-lg leading-relaxed text-black/75 max-w-xl mx-auto">
            Live broadcasts, urgent notices, and ticket drops. Updated continuously by the core committee.
          </p>
        </div>

        {/* Filter and Search Controls */}
        <div className="mt-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-[3px] border-black bg-white p-3 sm:p-4 shadow-[5px_5px_0_#000]">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: `All Updates (${ANNOUNCEMENTS.length})` },
              { id: "broadcast", label: "📢 Broadcasts" },
              { id: "urgent", label: "🚨 Urgent Notices" },
              { id: "pass", label: "🎟️ Pass Drops" },
            ].map((f) => {
              const active = filterCategory === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    playClick();
                    setFilterCategory(f.id);
                  }}
                  className={`border-[2px] border-black px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all ${
                    active
                      ? "bg-riso-yellow text-black shadow-[2px_2px_0_#000] -translate-y-0.5"
                      : "bg-black/5 text-black/80 hover:bg-black/10"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[200px] sm:min-w-[260px]">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search announcements..."
              className="w-full border-[2px] border-black bg-white py-1.5 pl-9 pr-3 text-xs sm:text-sm font-bold text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-riso-yellow"
            />
          </div>
        </div>

        {/* Announcements Grid (Boxes) */}
        {filteredAnnouncements.length === 0 ? (
          <div className="mt-8 border-[3px] border-dashed border-black/30 bg-white/60 p-10 text-center">
            <Megaphone size={36} className="mx-auto text-black/30 mb-3" />
            <p className="text-lg font-black text-black">No announcements found matching criteria.</p>
            <button
              type="button"
              onClick={() => {
                setFilterCategory("all");
                setSearchQuery("");
              }}
              className="mt-3 border-[2px] border-black bg-riso-yellow px-4 py-1.5 text-xs font-black uppercase text-black shadow-[2px_2px_0_#000]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {filteredAnnouncements.map((item) => (
              <AnnouncementCard
                key={item.id}
                item={item}
                activeCategory={filterCategory}
                onClick={handleOpenAnnouncement}
              />
            ))}
          </div>
        )}

        {/* Regular Update Note & FAQ anchor link */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-[2px] border-dashed border-black/30 bg-black/5 p-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-full bg-black text-white shrink-0">
              <Megaphone size={16} />
            </span>
            <p className="text-xs sm:text-sm font-semibold text-black/75">
              Have questions about registration or events? Check out our frequently asked questions below.
            </p>
          </div>
          <a
            href="#faq"
            onClick={playClick}
            className="inline-flex items-center gap-1.5 border-[2px] border-black bg-white px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-black shadow-[2px_2px_0_#000] hover:bg-riso-yellow shrink-0 transition-colors"
          >
            Jump to FAQ
            <ChevronRight size={14} />
          </a>
        </div>
      </div>

      {/* Expanded Modal showing entire message */}
      <AnnouncementModal
        item={selectedAnnouncement}
        open={Boolean(selectedAnnouncement)}
        onClose={() => setSelectedAnnouncement(null)}
        onNavigate={handleNavigate}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    </section>
  );
}
