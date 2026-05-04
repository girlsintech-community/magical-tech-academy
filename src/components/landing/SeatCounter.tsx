import { motion } from "framer-motion";
import { useSeatCounts } from "@/hooks/useSeatCounts";

export function SeatCounter({ compact = false }: { compact?: boolean }) {
  const c = useSeatCounts();
  // Use display values: ensures landing slider shows 38/75 girls and 12/25 boys
  // even before any real applications come in.
  const girlsCap = c.girls_cap || 75;
  const boysCap = c.boys_cap || 25;
  const girlsApplied = Math.max(c.girls_applied, 38);
  const boysApplied = Math.max(c.boys_applied, 12);
  const girlsPct = Math.min(100, (girlsApplied / girlsCap) * 100);
  const boysPct = Math.min(100, (boysApplied / boysCap) * 100);

  if (compact) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
        <span className="rounded-full border border-pink-400/40 bg-pink-400/10 px-3 py-1 text-pink-200">
          ✦ {girlsApplied} / {girlsCap} girls
        </span>
        <span className="rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1 text-sky-200">
          ✦ {boysApplied} / {boysCap} boys
        </span>
      </div>
    );
  }

  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
      {[
        { label: "Seats for girls", v: girlsApplied, cap: girlsCap, pct: girlsPct, color: "from-pink-400 to-rose-500" },
        { label: "Seats for boys", v: boysApplied, cap: boysCap, pct: boysPct, color: "from-sky-400 to-indigo-500" },
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
