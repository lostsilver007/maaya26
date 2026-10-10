import React from "react";
import pesCircleLogo from "../assets/brand/pes-circle-logo.png";
import { finePointer } from "./fx/env";

/**
 * PesuSeal / PesuBadge
 * Official circular PES University emblem ("that circle thing")
 * with bespoke world styling for each section of the zine.
 */
export default function PesuSeal({
  world = "paper",
  variant = "badge",
  size = "md",
  className = "",
}) {
  const isCircleOnly = variant === "circle";

  const sizeClasses = {
    sm: {
      img: "size-7 sm:size-8",
      disc: "size-8 sm:size-9",
      text: "text-xs",
      sub: "text-[9px] sm:text-[10px]",
      pad: "py-1 px-2.5 gap-2",
    },
    md: {
      img: "size-8 sm:size-10",
      disc: "size-10 sm:size-12",
      text: "text-xs sm:text-sm",
      sub: "text-[10px] sm:text-xs",
      pad: "py-1.5 px-3 sm:py-2 sm:px-3.5 gap-2.5",
    },
    lg: {
      img: "size-11 sm:size-14",
      disc: "size-13 sm:size-16",
      text: "text-sm sm:text-base",
      sub: "text-xs sm:text-sm",
      pad: "py-2 px-4 gap-3",
    },
  }[size] || {
    img: "size-8 sm:size-10",
    disc: "size-10 sm:size-12",
    text: "text-xs sm:text-sm",
    sub: "text-[10px] sm:text-xs",
    pad: "py-1.5 px-3 sm:py-2 sm:px-3.5 gap-2.5",
  };

  // World-specific aesthetic treatments
  const worldStyles = {
    denim: {
      wrap: "bg-[#f7f2e7] text-denim-deep border-2 border-[#16274a] shadow-[3px_3px_0_#16274a] -rotate-1 hover:rotate-0",
      disc: "bg-white border border-[#16274a]/30 shadow-inner",
      title: "font-black tracking-wide text-[#16274a]",
      subtitle: "font-bold text-[#16274a]/75 uppercase tracking-wider",
      subText: "Electronic City Campus",
    },
    cinema: {
      wrap: "bg-ticket text-black border-2 border-ticket-red shadow-[3px_3px_0_#140204] rotate-1 hover:rotate-0",
      disc: "bg-white border border-ticket-red/30",
      title: "font-black tracking-wider text-ticket-red",
      subtitle: "font-semibold text-black/70 uppercase tracking-widest",
      subText: "Official Programme",
    },
    cosmic: {
      wrap: "bg-[#0b0826]/90 backdrop-blur-md text-white border-2 border-holo-cyan shadow-[0_0_15px_rgb(0_242_254/0.35),3px_3px_0_#000] -rotate-1 hover:rotate-0",
      disc: "bg-white border-2 border-holo-lilac shadow-[0_0_8px_rgba(255,255,255,0.8)]",
      title: "font-black tracking-wider text-white",
      subtitle: "font-bold text-holo-cyan uppercase tracking-wider",
      subText: "Electronic City Campus",
    },
    sports: {
      wrap: "bg-white text-court-deep border-[3px] border-varsity shadow-[3px_3px_0_#000] rotate-1 hover:rotate-0",
      disc: "bg-white border border-black/20",
      title: "font-varsity tracking-wider text-court-deep",
      subtitle: "font-bold text-black/70 uppercase tracking-wider",
      subText: "Varsity Seal · EC Campus",
    },
    tradition: {
      wrap: "bg-[#fffdf7] text-black border-2 border-dashed border-kumkum shadow-[3px_3px_0_#9e2a2b] -rotate-1 hover:rotate-0",
      disc: "bg-white border border-kumkum/30",
      title: "font-deva font-black tracking-wide text-kumkum",
      subtitle: "font-semibold text-black/70 tracking-wide",
      subText: "Electronic City Campus",
    },
    paper: {
      wrap: "bg-white text-black border-2 border-black shadow-[3px_3px_0_#000] -rotate-1 hover:rotate-0",
      disc: "bg-white border border-black/20",
      title: "font-black tracking-wide text-black",
      subtitle: "font-semibold text-black/70",
      subText: "Electronic City Campus",
    },
  }[world] || {
    wrap: "bg-white text-black border-2 border-black shadow-[3px_3px_0_#000]",
    disc: "bg-white border border-black/20",
    title: "font-black tracking-wide text-black",
    subtitle: "font-semibold text-black/70",
    subText: "Electronic City Campus",
  };

  if (isCircleOnly) {
    return (
      <div
        className={`group relative inline-flex shrink-0 items-center justify-center rounded-full p-1 transition-transform duration-200 select-none ${worldStyles.wrap} ${className}`}
        title="PES University Electronic City Campus"
        aria-label="PES University Emblem"
      >
        <div className={`grid place-items-center rounded-full ${sizeClasses.disc} ${worldStyles.disc}`}>
          <img
            src={pesCircleLogo}
            alt="PES University circular emblem"
            width="160"
            height="160"
            className={`${sizeClasses.img} object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}
            draggable="false"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group relative inline-flex shrink-0 items-center rounded-2xl transition-transform duration-200 select-none ${sizeClasses.pad} ${worldStyles.wrap} ${className}`}
      title="PES University Electronic City Campus"
      aria-label="PES University Electronic City Campus"
    >
      {/* Circular Emblem ("That circle thing") */}
      <div className={`grid shrink-0 place-items-center rounded-full ${sizeClasses.disc} ${worldStyles.disc}`}>
        <img
          src={pesCircleLogo}
          alt="PES University circular emblem"
          width="160"
          height="160"
          className={`${sizeClasses.img} object-contain transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6`}
          draggable="false"
        />
      </div>

      {/* Official Typography */}
      <div className="leading-tight text-left">
        <span className={`block ${sizeClasses.text} ${worldStyles.title} uppercase`}>
          PES University
        </span>
        <span className={`block ${sizeClasses.sub} ${worldStyles.subtitle}`}>
          {worldStyles.subText}
        </span>
      </div>
    </div>
  );
}
