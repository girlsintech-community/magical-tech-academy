import { useEffect, useRef } from "react";

/** Twinkling starfield + drifting embers, fixed behind everything */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      a: Math.random(),
      s: Math.random() * 0.02 + 0.005,
    }));

    const embers = Array.from({ length: 28 }, () => ({
      x: Math.random() * w,
      y: h + Math.random() * h,
      r: Math.random() * 2 + 1,
      vy: -(Math.random() * 0.6 + 0.2),
      vx: (Math.random() - 0.5) * 0.3,
      hue: 30 + Math.random() * 25,
      a: 0.6 + Math.random() * 0.4,
    }));

    const handle = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handle);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // stars
      for (const s of stars) {
        s.a += s.s;
        const alpha = 0.3 + Math.abs(Math.sin(s.a)) * 0.7;
        ctx.fillStyle = `rgba(255, 245, 220, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // embers
      for (const e of embers) {
        e.x += e.vx;
        e.y += e.vy;
        if (e.y < -10) {
          e.y = h + 10;
          e.x = Math.random() * w;
        }
        const grad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 6);
        grad.addColorStop(0, `hsla(${e.hue}, 95%, 65%, ${e.a})`);
        grad.addColorStop(1, `hsla(${e.hue}, 95%, 50%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * 6, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handle);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
