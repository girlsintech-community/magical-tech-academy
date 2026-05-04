import { useEffect, useState } from "react";
import { SectionHeader } from "./HousesSection";

const TARGET = new Date("2026-06-07T09:00:00+05:30").getTime();

function diff() {
  const ms = Math.max(0, TARGET - Date.now());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s };
}

export function CountdownSection() {
  const [t, setT] = useState(diff());
  useEffect(() => {
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);
  const cells = [
    { l: "Days", v: t.d },
    { l: "Hours", v: t.h },
    { l: "Minutes", v: t.m },
    { l: "Seconds", v: t.s },
  ];
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center">
      <SectionHeader eyebrow="The clock is ticking" title="Until the gates open" />
      <div className="mt-10 grid grid-cols-4 gap-3 sm:gap-6">
        {cells.map((c) => (
          <div key={c.l} className="magic-card rounded-2xl p-4 sm:p-6">
            <div className="font-display text-3xl text-gold sm:text-5xl">
              {String(c.v).padStart(2, "0")}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
              {c.l}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        7 June 2026 ~ 9:00 AM IST ~ Demo Day on 21 June 2026
      </p>
    </section>
  );
}
