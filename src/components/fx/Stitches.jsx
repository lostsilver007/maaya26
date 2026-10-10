import React, { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Copper stitching that sews itself round its parent as it scrolls into view.
// Drawn in real pixels (so the dashes stay even), revealed through a mask.
export default function Stitches({ inset = 9, radiusTop = 8, radiusBottom = 36, color = "var(--color-thread)" }) {
  const ref = useRef(null);
  const id = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const [size, setSize] = useState({ w: 0, h: 0 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.75"] });
  const sewn = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = size;
  const x0 = inset, y0 = inset, x1 = w - inset, y1 = h - inset;
  const rt = radiusTop, rb = radiusBottom;
  const d =
    w > 0
      ? `M${x0 + rt} ${y0} H${x1 - rt} Q${x1} ${y0} ${x1} ${y0 + rt} V${y1 - rb} Q${x1} ${y1} ${x1 - rb} ${y1} H${x0 + rb} Q${x0} ${y1} ${x0} ${y1 - rb} V${y0 + rt} Q${x0} ${y0} ${x0 + rt} ${y0}`
      : "";

  return (
    <svg ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[4] h-full w-full" width={w} height={h} viewBox={`0 0 ${w || 1} ${h || 1}`}>
      {d && (
        <>
          <mask id={`sew-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
            <motion.path d={d} fill="none" stroke="#fff" strokeWidth="10" style={{ pathLength: reduce ? 1 : sewn }} />
          </mask>
          <path d={d} fill="none" stroke={color} strokeWidth="2.6" strokeDasharray="9 6" strokeLinecap="round" mask={`url(#sew-${id})`} />
        </>
      )}
    </svg>
  );
}
