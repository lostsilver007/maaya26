import React, { useEffect, useRef, useState } from "react";
import { finePointer, prefersReducedMotion } from "./env";

// Liquid chrome: four metaballs ray-marched in a fragment shader, mirroring a
// studio of fest-coloured light strips. One blob follows the pointer. Renders
// only while on screen; a still frame under reduced motion; a CSS stand-in if
// WebGL isn't available. No libraries: raw WebGL.
const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uKick;

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}
float map(vec3 p) {
  float t = uTime * 0.55;
  float k = 1.0 + 0.28 * uKick;
  float d = length(p - vec3(sin(t) * 0.5, cos(t * 1.3) * 0.32, 0.0)) - 0.62 * k;
  d = smin(d, length(p - vec3(cos(t * 0.8) * 0.7, sin(t * 0.9) * 0.55, sin(t) * 0.3)) - 0.42, 0.5);
  d = smin(d, length(p - vec3(sin(t * 1.7) * 0.45, -0.62 + cos(t) * 0.18, cos(t * 1.1) * 0.3)) - 0.34, 0.45);
  d = smin(d, length(p - vec3(uMouse * vec2(1.1, 0.9), 0.35)) - 0.3, 0.55);
  return d;
}
vec3 nrm(vec3 p) {
  vec2 e = vec2(0.0015, 0.0);
  return normalize(vec3(map(p + e.xyy) - map(p - e.xyy), map(p + e.yxy) - map(p - e.yxy), map(p + e.yyx) - map(p - e.yyx)));
}
// A studio of light strips in the fest colours, reflected in the chrome.
vec3 env(vec3 r) {
  float y = r.y * 0.5 + 0.5;
  vec3 c = mix(vec3(0.02, 0.01, 0.07), vec3(0.16, 0.06, 0.33), smoothstep(0.0, 0.6, y));
  c = mix(c, vec3(0.97, 0.96, 1.0), smoothstep(0.72, 0.98, y));
  c += vec3(1.0, 0.48, 0.85) * smoothstep(0.035, 0.0, abs(r.y - 0.12)) * 1.6;
  c += vec3(0.48, 0.97, 1.0) * smoothstep(0.05, 0.0, abs(r.x + 0.42)) * 1.2;
  c += vec3(0.78, 1.0, 0.48) * smoothstep(0.04, 0.0, abs(r.x - 0.55 + r.y * 0.2)) * 0.9;
  float a = atan(r.z, r.x);
  c += 0.5 * vec3(0.71, 0.55, 1.0) * pow(0.5 + 0.5 * sin(a * 3.0 + r.y * 5.0), 10.0);
  return c;
}
void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uRes) / min(uRes.x, uRes.y);
  vec3 ro = vec3(0.0, 0.0, 3.3);
  vec3 rd = normalize(vec3(uv, -2.3));
  float t = 0.0, d = 1.0, md = 9.0;
  for (int i = 0; i < 72; i++) {
    d = map(ro + rd * t);
    md = min(md, d);
    if (d < 0.001 || t > 7.0) break;
    t += d;
  }
  if (d > 0.001) {
    // Soft halo round the silhouette instead of a hard, aliased edge.
    float glow = smoothstep(0.18, 0.0, md) * 0.35;
    gl_FragColor = vec4(vec3(0.71, 0.55, 1.0) * glow, glow);
    return;
  }
  vec3 p = ro + rd * t;
  vec3 n = nrm(p);
  vec3 r = reflect(rd, n);
  float fres = pow(1.0 - max(dot(-rd, n), 0.0), 3.0);
  vec3 col = env(r) * 0.92 + fres * vec3(1.0, 0.62, 0.95) * 0.7;
  col = col / (1.0 + col * 0.18);
  gl_FragColor = vec4(col, 1.0);
}`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || "shader");
  return s;
}

export default function ChromeBlob({ className = "" }) {
  const canvas = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const gl = el.getContext("webgl", { premultipliedAlpha: true, antialias: false, alpha: true });
    if (!gl) {
      setFailed(true);
      return;
    }
    let prog;
    try {
      prog = gl.createProgram();
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("link");
    } catch {
      setFailed(true);
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uKick = gl.getUniformLocation(prog, "uKick");
    // The concert's sound check makes the chrome throb (see ConcertSection).
    let kick = 0;
    const onBass = () => {
      kick = 1;
      if (visible && !raf) raf = requestAnimationFrame(draw);
    };
    window.addEventListener("maaya:bass", onBass);

    // Render below native resolution: chrome reads fine soft, and it keeps phones cool.
    const scale = Math.min(window.devicePixelRatio || 1, 1.5) * (finePointer ? 0.85 : 0.6);
    const resize = () => {
      const w = Math.max(1, Math.round(el.clientWidth * scale));
      const h = Math.max(1, Math.round(el.clientHeight * scale));
      if (el.width !== w || el.height !== h) {
        el.width = w;
        el.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const mouse = { x: 0.6, y: -0.4, tx: 0.6, ty: -0.4 };
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      mouse.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouse.ty = -((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const still = prefersReducedMotion();
    let raf = 0, visible = false, t0 = performance.now();
    const draw = (now) => {
      resize();
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      gl.uniform2f(uRes, el.width, el.height);
      gl.uniform1f(uTime, still ? 2.4 : (now - t0) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uKick, kick);
      kick *= 0.9;
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = visible && (!still || kick > 0.01) ? requestAnimationFrame(draw) : 0;
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(draw);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("maaya:bass", onBass);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  if (failed)
    return (
      <div
        aria-hidden="true"
        className={`rounded-full ${className}`}
        style={{ background: "radial-gradient(circle at 35% 30%, #fff, #dfe4f0 18%, #8b93a7 40%, #2a0f55 62%, transparent 70%)" }}
      />
    );
  return <canvas ref={canvas} aria-hidden="true" className={className} />;
}
