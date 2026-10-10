import React from "react";
import { Download } from "lucide-react";
import { CODE_OF_CONDUCT, GENERAL_RULES, RULES_NOTICE, RULES_PDF } from "../../data/festivalData";
import PageShell, { PageSection } from "./PageShell";

// The official MAAYA 2026 General Rules and Regulations (each rule's text word
// for word from the fest team's document), the fest-day code of conduct, and
// the PDF itself.
export default function RulesPage() {
  return (
    <PageShell
      kicker="Read before you pay"
      title="Rules and regulations"
      intro="These rules apply to every Maaya 2026 registration and payment. Each event also has its own rules, on its ticket in the programme."
    >
      <a
        href={RULES_PDF}
        download
        className="mt-6 inline-flex min-h-12 items-center gap-2 bg-black px-5 text-base font-black text-riso-yellow shadow-[4px_4px_0_var(--color-riso-pink)]"
      >
        <Download size={17} aria-hidden="true" />
        Download the official PDF
      </a>

      <div role="note" className="mt-8 border-[3px] border-black bg-riso-yellow p-4 shadow-[4px_4px_0_#000] sm:p-5">
        <p className="text-sm font-black tracking-wide uppercase">Important notice</p>
        <p className="mt-1.5 text-base leading-relaxed">{RULES_NOTICE}</p>
      </div>

      <PageSection id="general-rules" title="MAAYA 2026: General Rules and Regulations">
        <ol className="space-y-4">
          {GENERAL_RULES.map((rule, i) => (
            <li key={rule.title} className="flex gap-3 border-b-2 border-dashed border-black/15 pb-4 sm:gap-4">
              <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-black text-sm font-black text-riso-yellow tabular-nums">
                {i + 1}
              </span>
              <p>
                <span className="font-black">{rule.title}.</span> {rule.text}
              </p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection id="conduct" title="Code of conduct on fest days">
        <ul className="list-disc space-y-2.5 pl-6 marker:text-riso-pink-deep">
          {CODE_OF_CONDUCT.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </PageSection>
    </PageShell>
  );
}
