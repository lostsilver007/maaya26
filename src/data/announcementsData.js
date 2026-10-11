// MAAYA 2026 · Official Announcements
//
// HOW TO ADD NEW ANNOUNCEMENTS:
// 1. Copy the template object below.
// 2. Fill in the title, date, time, badge, summary, and content.
// 3. Paste it inside the ANNOUNCEMENTS array.
//
// TEMPLATE:
// {
//   id: "my-announcement-slug",
//   title: "Headline of the announcement",
//   date: "23 Oct 2026",
//   time: "10:30 AM",
//   timestamp: "2026-10-23T10:30:00+05:30",
//   pinned: false,
//   badge: "OFFICIAL BROADCAST", // Badge label
//   badgeVariant: "broadcast",  // 'broadcast' | 'urgent' | 'pass' | 'info'
//   summary: "Short 2-3 line teaser shown in the box before clicking.",
//   content: {
//     paragraphs: [
//       "First detailed paragraph explaining the full announcement.",
//       "Second paragraph with additional context and directions."
//     ],
//     highlights: [
//       "Key takeaway or directive #1",
//       "Key takeaway or directive #2"
//     ],
//     note: "Optional highlighted callout warning or advice."
//   },
//   action: { label: "Button Label", url: "#programme", type: "internal" }, // optional
//   tags: ["Tag1", "Tag2"],
// }

export const ANNOUNCEMENT_BADGE_VARIANTS = {
  broadcast: {
    label: "Official Broadcast",
    pillBg: "bg-riso-pink",
    pillText: "text-black",
    border: "border-black",
    glow: "shadow-[2px_2px_0_#000]",
    icon: "Megaphone",
  },
  urgent: {
    label: "Urgent Alert",
    pillBg: "bg-kumkum",
    pillText: "text-white",
    border: "border-black",
    glow: "shadow-[2px_2px_0_#000]",
    icon: "Bell",
  },
  pass: {
    label: "Pass Drop",
    pillBg: "bg-riso-blue",
    pillText: "text-white",
    border: "border-black",
    glow: "shadow-[2px_2px_0_#000]",
    icon: "Radio",
  },
  info: {
    label: "Notice Desk",
    pillBg: "bg-riso-yellow",
    pillText: "text-black",
    border: "border-black",
    glow: "shadow-[2px_2px_0_#000]",
    icon: "Sparkles",
  },
};

export const ANNOUNCEMENTS = [
  {
    id: "maaya-concert-tickets-live",
    title: "MAAYA CONCERT TICKETS ARE NOW LIVE!",
    date: "11 Oct 2026",
    time: "11:45 AM",
    timestamp: "2026-10-11T11:45:00+05:30",
    pinned: true,
    badge: "CONCERT PASS DROP",
    badgeVariant: "pass",
    categories: ["broadcast", "pass"],
    speaker: {
      name: "Core Committee",
      role: "Central Operations",
      affiliation: "MAAYA '26",
      color: "#FF477E",
      avatarText: "CC",
    },
    summary:
      "The wait is over! Get ready to experience the energy, music, and madness of MAAYA 2026. Ticket sales are officially open, and your chance to be part of an unforgettable concert experience starts now.",
    content: {
      paragraphs: [
        "The wait is over! Get ready to experience the energy, music, and madness of MAAYA 2026. Ticket sales are officially open, and your chance to be part of an unforgettable concert experience starts now.",
        "Gather your friends, feel the vibe, and get ready for a night filled with electrifying performances, incredible music, and memories that will last long after the final beat.",
        "Book your tickets now and be part of the MAAYA madness!",
      ],
      highlights: [
        "Ticket sales are officially open for MAAYA 2026 Concert Night.",
        "Electrifying performances and high-octane music lineup.",
        "Secure your passes early on PESU Academy before early-bird tiers close.",
      ],
      note: "Don’t wait until the last moment. Secure your spot and get ready to make some noise!",
    },
    action: { label: "Book Passes on PESU Academy", url: "#concert", type: "internal" },
    tags: ["Concert", "Tickets", "PassDrop", "Broadcast"],
  },
  {
    id: "dress-up-days-eclectria",
    title: "DRESS UP DAYS - ECLECTRIA",
    date: "11 Oct 2026",
    time: "11:52 AM",
    timestamp: "2026-10-11T11:52:00+05:30",
    pinned: false,
    badge: "OFFICIAL BROADCAST",
    badgeVariant: "broadcast",
    categories: ["broadcast"],
    speaker: {
      name: "Creatives & PR Desk",
      role: "Theme & Aesthetics",
      affiliation: "MAAYA '26",
      color: "#4D96FF",
      avatarText: "PR",
    },
    summary:
      "Unleash your style! Here is the official 6-day dress-up lineup for ECLECTRIA: from Dare to Denim and Screenverse to Desi Dusk, Knit & Layer, Jersey Jam, and Stardust.",
    content: {
      paragraphs: [
        "Unleash your aesthetic! The official 6-day theme calendar for MAAYA 2026: ECLECTRIA is officially out. Bring your freshest fits to campus and match the daily vibe:",
        "DAY 1 — DARE TO DENIM: Streetwear • Y2K • Denim Culture",
        "DAY 2 — SCREENVERSE: Cinema • TV • Anime • Fiction",
        "DAY 3 — DESI DUSK: Tradition • Culture • Indian Heritage",
        "DAY 4 — KNIT & LAYER: Knitwear • Layering • Minimalist Chic",
        "DAY 5 — JERSEY JAM: Sports • Team Spirit • Streetwear",
        "DAY 6 — STARDUST: Glamour • Nightlife • Cosmic Celebration",
      ],
      highlights: [],
      note: "Snap your fits, tag @maayapesu on Instagram, and get featured on the official fest stories!",
    },
    action: { label: "Explore Theme Worlds", url: "#venues", type: "internal" },
    tags: ["DressUpDays", "Eclectria", "Themes", "Fashion", "Broadcast"],
  },
];
