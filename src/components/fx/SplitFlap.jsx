import React, { useState } from "react";

// One split-flap tile: when its character changes, the top half folds down
// and the new bottom half drops into place, like an airport departure board.
function Flap({ ch }) {
  const [state, setState] = useState({ cur: ch, prev: ch, n: 0 });
  if (state.cur !== ch) setState({ cur: ch, prev: state.cur, n: state.n + 1 });
  const { cur, prev, n } = state;
  return (
    <span className="flap" aria-hidden="true">
      <span className="flap-half flap-top">
        <span>{cur}</span>
      </span>
      <span className="flap-half flap-bottom">
        <span>{n ? prev : cur}</span>
      </span>
      {n > 0 && (
        <>
          <span key={`f${n}`} className="flap-half flap-top flap-fold">
            <span>{prev}</span>
          </span>
          <span key={`u${n}`} className="flap-half flap-bottom flap-unfold">
            <span>{cur}</span>
          </span>
        </>
      )}
    </span>
  );
}

// A row of tiles for a string such as "13" or "07". `label` is what screen
// readers hear instead of the flapping characters.
export default function SplitFlap({ value, label, className = "" }) {
  return (
    <span className={`inline-flex gap-[0.06em] ${className}`} role="img" aria-label={label ?? String(value)}>
      {String(value)
        .split("")
        .map((ch, i) => (
          <Flap key={i} ch={ch} />
        ))}
    </span>
  );
}
