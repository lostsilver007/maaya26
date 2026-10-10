import React from "react";
import { ArrowLeft } from "lucide-react";

// A page of the zine that isn't on the cover: riso-blue backing with a typed
// paper sheet taped on top.
export default function PageShell({ kicker, title, intro, children }) {
  return (
    <main id="main" className="grain relative min-h-dvh overflow-hidden bg-riso-blue px-4 pt-28 pb-24 sm:px-6 lg:px-8">
      <div aria-hidden="true" className="halftone absolute inset-0 opacity-50" />
      <div className="relative z-[2] mx-auto max-w-3xl">
        <a href="#top" className="inline-flex min-h-11 items-center gap-2 bg-black px-4 text-sm font-black text-riso-yellow shadow-[3px_3px_0_#000]">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to the site
        </a>
        <article className="grain relative mt-8 bg-paper px-5 pt-9 pb-8 text-black shadow-[8px_8px_0_#000] sm:px-10 sm:pt-12 sm:pb-10">
          <span className="tape -top-3 left-10 -rotate-6" aria-hidden="true" />
          <span className="tape -top-3 right-10 rotate-6" aria-hidden="true" />
          <div className="relative z-[2]">
            <p className="font-script text-2xl text-riso-pink-deep">{kicker}</p>
            <h1 className="mt-1 text-3xl leading-tight font-black sm:text-5xl">{title}</h1>
            {intro && <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/80 sm:text-lg">{intro}</p>}
            {children}
          </div>
        </article>
      </div>
    </main>
  );
}

// A titled block inside a page.
export function PageSection({ id, title, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mt-10 border-t-[3px] border-dashed border-black/20 pt-8">
      <h2 id={`${id}-title`} className="text-2xl font-black sm:text-3xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed">{children}</div>
    </section>
  );
}
