import React from "react";
import { FESTIVAL_INFO } from "../../data/festivalData";
import PageShell, { PageSection } from "./PageShell";

const UPDATED = "10 October 2026";

const A = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-riso-blue decoration-2 underline-offset-2">
    {children}
  </a>
);

// Terms of use, payments, privacy, accessibility and credits for this site.
// Everything here describes how the site actually works: it has no sign-up,
// no forms, no cookies and no analytics, and payments happen elsewhere.
export default function LegalPage() {
  return (
    <PageShell
      kicker="The small print"
      title="Legal and privacy"
      intro={`How this website works, what it does with your information (very little), and who made what. Last updated ${UPDATED}.`}
    >
      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
        {[
          ["#terms", "Terms of use"],
          ["#payments", "Payments and refunds"],
          ["#privacy", "Privacy policy"],
          ["#accessibility", "Accessibility"],
          ["#credits", "Credits"],
        ].map(([href, label]) => (
          <a
            key={href}
            href={href}
            onClick={(e) => {
              // In-page jump without leaving the #/legal page.
              e.preventDefault();
              document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="inline-flex min-h-11 items-center border-2 border-black bg-white px-3 text-sm font-bold shadow-[2px_2px_0_#000]"
          >
            {label}
          </a>
        ))}
      </nav>

      <PageSection id="terms" title="Terms of use">
        <p>
          This website is run by the MAAYA 2026 organising team at {FESTIVAL_INFO.venue} to share information about the fest. By using it, you agree to these terms.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Dates, timings, venues and line-ups can change. Announcements from the organising team and on Instagram (<A href={FESTIVAL_INFO.socials.instagram}>@maayapesu</A>) take
            priority over this site.
          </li>
          <li>
            Registrations and payments don't happen on this site. They happen on PESU Academy and on each event's registration form, and they're covered by the{" "}
            <a href="#/rules" className="font-bold underline decoration-riso-blue decoration-2 underline-offset-2">
              Maaya 2026 Rules and Regulations
            </a>{" "}
            and the terms of those services.
          </li>
          <li>
            The PES University name and logo, Jago the mascot, Maaya branding and the concert poster belong to their owners. Please don't reuse them without permission.
          </li>
          <li>We work to keep everything accurate, but mistakes can happen. If you spot one, tell the organising team.</li>
        </ul>
      </PageSection>

      <PageSection id="payments" title="Payments and refunds">
        <p>The full rules are on the rules page. In short:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>All payments made towards Maaya 2026 are non-refundable, including duplicate payments.</li>
          <li>Pay the exact amount. A payment of any other amount makes the registration void, and the amount is forfeited.</li>
          <li>A registration or pass is confirmed only after PES University's Accounts Section has verified the payment.</li>
          <li>If you pay twice by mistake, contact the organising team.</li>
        </ul>
        <p>
          <a href="#/rules" className="font-bold underline decoration-riso-blue decoration-2 underline-offset-2">
            Read the rules and regulations
          </a>
        </p>
      </PageSection>

      <PageSection id="privacy" title="Privacy policy">
        <h3 className="text-lg font-black">What this site collects</h3>
        <p>Nothing directly. There's no sign-up, no forms, no cookies, and no analytics or advertising trackers on this site.</p>

        <h3 className="text-lg font-black">What your browser keeps</h3>
        <p>
          One setting in your browser's session storage (<code className="bg-black/10 px-1">maaya-printed</code>), so the opening print animation plays once per visit. It's
          never sent anywhere and is deleted when you close the tab.
        </p>

        <h3 className="text-lg font-black">Services that see your visit</h3>
        <ul className="list-disc space-y-2 pl-6">
          <li>Our hosting provider keeps standard server logs (such as IP address, browser and the pages requested) to deliver the site and keep it secure.</li>
          <li>The typefaces load from Google Fonts, so Google receives your IP address and browser details when the fonts download.</li>
          <li>The 3D campus map is embedded from Fest Island, a separate website.</li>
        </ul>

        <h3 className="text-lg font-black">When you leave this site</h3>
        <p>
          Links to PESU Academy, Instagram, YouTube, Google Maps and the event registration forms take you to services with their own privacy policies. Registration forms
          collect what you enter, such as your details and payment proof, so the organising team and PES University's Accounts Section can verify your registration.
        </p>

        <h3 className="text-lg font-black">Questions</h3>
        <p>
          For anything about this site or your information, contact the organising team (the numbers are at the bottom of every page) or message{" "}
          <A href={FESTIVAL_INFO.socials.instagram}>@maayapesu</A> on Instagram.
        </p>
      </PageSection>

      <PageSection id="accessibility" title="Accessibility">
        <ul className="list-disc space-y-2 pl-6">
          <li>Everything works with a keyboard, and focus is visible on every control.</li>
          <li>If your device is set to reduce motion, the opening animation is skipped and the effects stay still.</li>
          <li>Sound effects are off until you turn them on.</li>
          <li>Images that carry information have text alternatives.</li>
        </ul>
        <p>If something doesn't work for you, tell the organising team and we'll fix it.</p>
      </PageSection>

      <PageSection id="credits" title="Credits">
        <ul className="list-disc space-y-2 pl-6">
          <li>PES University name and logo, and Jago the mascot: © PES University.</li>
          <li>Concert poster: official Maaya '26 artwork, © its creators.</li>
          <li>
            The 3D campus map uses map data © <A href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</A>, available under the Open Database Licence.
          </li>
          <li>
            Typefaces from Google Fonts: Archivo, Graduate, Monoton, Rozha One, Shrikhand and Unbounded (SIL Open Font License) and Permanent Marker (Apache License 2.0).
          </li>
          <li>Icons by Lucide (ISC License). Built with React, Vite, Tailwind CSS and Framer Motion (MIT License).</li>
        </ul>
      </PageSection>
    </PageShell>
  );
}
