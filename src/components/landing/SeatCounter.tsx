import { motion } from "framer-motion";
import { useSeatCounts } from "@/hooks/useSeatCounts";

export function SeatCounter({ compact = false }: { compact?: boolean }) {
  const c = useSeatCounts();
  const girlsPct = Math.min(100, (c.girls_applied / c.girls_cap) * 100);
  const boysPct = Math.min(100, (c.boys_applied / c.boys_cap) * 100);

  if (compact) {
    return (
      <div className="flex items-center gap-3 text-xs sm:text-sm">
        <span className="rounded-full border border-pink-400/40 bg-pink-400/10 px-3 py-1 text-pink-200">
          🔮 {c.girls_applied} / {c.girls_cap} girls
        </span>
        <span className="rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1 text-sky-200">
          ⚡ {c.boys_applied} / {c.boys_cap} boys
        </span>
      </div>
    );
  }

  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
      {[
        { label: "Witches & seekers (girls)", v: c.girls_applied, cap: c.girls_cap, pct: girlsPct, color: "from-pink-400 to-rose-500" },
        { label: "Wizards & builders (boys)", v: c.boys_applied, cap: c.boys_cap, pct: boysPct, color: "from-sky-400 to-indigo-500" },
      ].map((row) => (
        <div key={row.label} className="magic-card rounded-xl p-4">
          <div className="flex items-baseline justify-between">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{row.label}</p>
            <p className="font-display text-lg text-gold">
              {row.v} <span className="text-muted-foreground">/ {row.cap}</span>
            </p>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${row.pct}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className={`h-full rounded-full bg-gradient-to-r ${row.color}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
