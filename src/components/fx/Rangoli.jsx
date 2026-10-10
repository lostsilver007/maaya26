import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// A rangoli that draws itself, line by line, as it scrolls into view, then
// fills with colour like powder being poured in.
const BIG = "M0 -20 C 13 -32, 13 -54, 0 -70 C -13 -54, -13 -32, 0 -20 Z";
const SMALL = "M0 -78 C 8 -86, 8 -100, 0 -110 C -8 -100, -8 -86, 0 -78 Z";
const LEAF = "M0 -60 C 9 -66, 22 -66, 30 -58 C 22 -50, 9 -50, 0 -60 Z";

export default function Rangoli({ className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "center 0.5"] });
  const draw = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const fill = useTransform(scrollYProgress, [0.7, 1], [0, 1]);
  const spin = useTransform(scrollYProgress, [0, 1], [-40, 0]);
  const line = reduce ? { pathLength: 1 } : { pathLength: draw };
  const pour = reduce ? { fillOpacity: 1 } : { fillOpacity: fill };

  return (
    <svg ref={ref} viewBox="-140 -140 280 280" aria-hidden="true" className={className}>
      <motion.g style={reduce ? undefined : { rotate: spin }}>
        {/* Outer scalloped border */}
        <motion.circle r="128" fill="none" stroke="var(--color-leaf)" strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" style={line} />
        {Array.from({ length: 24 }, (_, i) => (
          <motion.circle key={`d${i}`} r="4" cx={Math.cos((i / 24) * Math.PI * 2) * 116} cy={Math.sin((i / 24) * Math.PI * 2) * 116} fill="var(--color-kumkum)" style={pour} />
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <motion.path key={`s${i}`} d={SMALL} transform={`rotate(${i * 22.5 + 11.25})`} fill="var(--color-saffron)" stroke="var(--color-madder)" strokeWidth="2.5" style={{ ...line, ...pour }} />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.path key={`l${i}`} d={LEAF} transform={`rotate(${i * 45 + 22.5})`} fill="var(--color-leaf)" stroke="#1f4a1f" strokeWidth="2" style={{ ...line, ...pour }} />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.path key={`b${i}`} d={BIG} transform={`rotate(${i * 45})`} fill="var(--color-marigold)" stroke="var(--color-kumkum)" strokeWidth="3" style={{ ...line, ...pour }} />
        ))}
        <motion.circle r="17" fill="var(--color-kumkum)" stroke="var(--color-madder)" strokeWidth="3" style={{ ...line, ...pour }} />
        <motion.circle r="7" fill="var(--color-marigold)" style={pour} />
      </motion.g>
    </svg>
  );
}
