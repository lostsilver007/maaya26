import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Velvet stage curtains over whatever is inside. Scrolling the stage into
// view draws them apart and brings the house lights up on the show.
export default function Curtains({ children, className = "" }) {
  const stage = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start 0.9", "center 0.5"] });
  const left = useTransform(scrollYProgress, [0.05, 1], ["0%", "-101%"]);
  const right = useTransform(scrollYProgress, [0.05, 1], ["0%", "101%"]);
  const lights = useTransform(scrollYProgress, [0.35, 1], ["brightness(0.3) saturate(0.6)", "brightness(1) saturate(1)"]);
  const sway = useTransform(scrollYProgress, [0, 0.5, 1], ["0deg", "1.2deg", "0deg"]);

  return (
    <div ref={stage} className={`relative overflow-hidden ${className}`}>
      <motion.div style={reduce ? undefined : { filter: lights }}>{children}</motion.div>
      {!reduce && (
        <>
          <motion.div aria-hidden="true" className="curtain curtain-left" style={{ x: left, rotate: sway, transformOrigin: "0 0" }} />
          <motion.div aria-hidden="true" className="curtain curtain-right" style={{ x: right, rotate: sway, transformOrigin: "100% 0" }} />
        </>
      )}
      <div aria-hidden="true" className="valance" />
    </div>
  );
}
