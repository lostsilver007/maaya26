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

// All announcements deleted as requested.
// Organizers can add new announcements here regularly.
export const ANNOUNCEMENTS = [];
