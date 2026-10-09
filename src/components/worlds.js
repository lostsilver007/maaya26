import { ECLECTRIA_AESTHETICS } from "../data/festivalData";

// Which of Eclectria's five worlds dresses which part of the site. The world
// names and descriptions come from the official theme brief (festivalData).
const SECTION_FOR = {
  denim: { href: "#venues", part: "Venues", swatch: "tex-denim" },
  cinema: { href: "#programme", part: "Programme", swatch: "tex-velvet" },
  cosmic: { href: "#concert", part: "Concert night", swatch: "tex-space" },
  sports: { href: "#editions", part: "The archive", swatch: "tex-court" },
  heritage: { href: "#faq", part: "Questions", swatch: "tex-cotton" },
};

// In page order.
export const WORLDS = ["denim", "cinema", "cosmic", "sports", "heritage"].map((id) => ({
  ...ECLECTRIA_AESTHETICS.find((w) => w.id === id),
  ...SECTION_FOR[id],
}));
