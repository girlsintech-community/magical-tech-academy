import { useEffect, useRef, useState } from "react";

/**
 * Harry Potter wooden wand cursor with a glowing red gem at the tip.
 * - Replaces the default cursor with an SVG wand
 * - Emits a trail of red/gold sparkles from the wand tip
 * - Disabled on touch devices
 */
export function CursorWand() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    document.documentElement.style.cursor = "none";
    return () => {
      document.documentElement.style.cursor = "";
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; hue: number; size: number };
    const particles: P[] = [];

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      // sparkles emitted from the gem (top of wand). Wand is rendered with tip at cursor.
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 4,
          y: e.clientY + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4 - 0.4,
          life: 0,
          max: 35 + Math.random() * 30,
          // mostly red/ember, occasionally gold
          hue: Math.random() < 0.75 ? 5 + Math.random() * 20 : 45 + Math.random() * 10,
          size: 1.5 + Math.random() * 2,
        });
      }
      if (particles.length > 220) particles.splice(0, particles.length - 220);
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.012;
        const t = 1 - p.life / p.max;
        if (t <= 0) {
          particles.splice(i, 1);
          continue;
        }
        const r = p.size * t;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        grad.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${t})`);
        grad.addColorStop(0.4, `hsla(${p.hue}, 100%, 55%, ${t * 0.6})`);
        grad.addColorStop(1, `hsla(${p.hue}, 100%, 50%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <canvas
        ref={ref}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60]"
        style={{ mixBlendMode: "screen" }}
      />
      {/* Wand SVG — tip (gem) anchored at cursor position */}
      <svg
        aria-hidden="true"
        width="58"
        height="58"
        viewBox="0 0 58 58"
        className="pointer-events-none fixed z-[70]"
        style={{
          left: pos.x,
          top: pos.y,
          // Position so the gem (top-left of svg) sits exactly on the cursor
          transform: "translate(-4px, -4px) rotate(35deg)",
          transformOrigin: "4px 4px",
          filter: "drop-shadow(0 0 6px rgba(255, 60, 40, 0.65))",
        }}
      >
        <defs>
          <linearGradient id="wand-wood" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3a200f" />
            <stop offset="40%" stopColor="#6b3a1c" />
            <stop offset="70%" stopColor="#4a2511" />
            <stop offset="100%" stopColor="#2a1608" />
          </linearGradient>
          <linearGradient id="wand-handle" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1a0c04" />
            <stop offset="100%" stopColor="#3d2110" />
          </linearGradient>
          <radialGradient id="wand-gem" cx="0.35" cy="0.35" r="0.65">
            <stop offset="0%" stopColor="#fff5f2" />
            <stop offset="20%" stopColor="#ff8a7a" />
            <stop offset="55%" stopColor="#e63b22" />
            <stop offset="100%" stopColor="#5a0a02" />
          </radialGradient>
        </defs>

        {/* shaft (tapered) — from tip near (4,4) down to handle */}
        <path
          d="M 6 6 L 8 8 L 36 36 L 30 42 Z"
          fill="url(#wand-wood)"
          stroke="#1a0a02"
          strokeWidth="0.5"
        />
        {/* handle */}
        <path
          d="M 30 42 L 36 36 L 50 50 L 44 56 Z"
          fill="url(#wand-handle)"
          stroke="#0d0502"
          strokeWidth="0.6"
        />
        {/* handle rings */}
        <line x1="34" y1="46" x2="40" y2="40" stroke="#160803" strokeWidth="0.8" />
        <line x1="38" y1="50" x2="44" y2="44" stroke="#160803" strokeWidth="0.8" />
        {/* gem */}
        <circle cx="4" cy="4" r="3.6" fill="url(#wand-gem)" stroke="#2a0500" strokeWidth="0.5" />
        <circle cx="3" cy="3" r="0.9" fill="#fff" opacity="0.9" />
      </svg>
    </>
  );
}
