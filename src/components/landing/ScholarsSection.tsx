import { motion } from "framer-motion";
import { MapPin, Globe2 } from "lucide-react";
import { SectionHeader } from "./HousesSection";
import { Globe } from "./Globe";

// Approximate latitude/longitude for each location
const LOCATIONS = [
  { name: "Tamil Nadu", count: 15, lat: 11.1, lng: 78.6 },
  { name: "Maharashtra", count: 7, lat: 19.7, lng: 75.7 },
  { name: "Delhi NCR", count: 7, lat: 28.6, lng: 77.2 },
  { name: "Haryana", count: 7, lat: 29.0, lng: 76.0 },
  { name: "Karnataka", count: 6, lat: 15.3, lng: 75.7 },
  { name: "Rajasthan", count: 3, lat: 26.9, lng: 73.8 },
  { name: "Punjab", count: 3, lat: 31.1, lng: 75.3 },
  { name: "Uttar Pradesh", count: 3, lat: 27.0, lng: 80.9 },
  { name: "Bihar", count: 2, lat: 25.0, lng: 85.3 },
  { name: "Andhra Pradesh", count: 2, lat: 15.9, lng: 79.7 },
  { name: "Telangana", count: 2, lat: 17.7, lng: 79.0 },
  { name: "Jharkhand", count: 1, lat: 23.6, lng: 85.2 },
  { name: "Madhya Pradesh", count: 1, lat: 22.9, lng: 78.6 },
  { name: "Chandigarh", count: 1, lat: 30.7, lng: 76.7 },
];

const INTERNATIONAL = [
  { name: "United States", count: 2, lat: 38.9, lng: -77.0 },
  { name: "United Arab Emirates", count: 1, lat: 24.4, lng: 54.4 },
  { name: "Kosovo", count: 1, lat: 42.6, lng: 21.0 },
];




export function ScholarsSection() {
  const maxCount = Math.max(...LOCATIONS.map((l) => l.count));
  const totalIndia = LOCATIONS.reduce((s, l) => s + l.count, 0);
  const totalIntl = INTERNATIONAL.reduce((s, l) => s + l.count, 0);

  return (
    <section id="scholars" className="relative z-10 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/90 to-background" />
      <div
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          background:
            "radial-gradient(45% 40% at 70% 30%, rgba(255,180,80,0.10), transparent 70%), radial-gradient(40% 40% at 20% 70%, rgba(120,80,255,0.12), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader
          eyebrow="The Scholars"
          title="Where our magic gathers"
          subtitle="Sixty-six young builders, summoned from across India and beyond, each carrying a unique spark to the Hogwartz summer."
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl border border-[color:var(--gold)]/30 bg-background/40 p-6 backdrop-blur-sm sm:p-8"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold">
                <MapPin className="h-3.5 w-3.5" />
                Map of the Realm
              </div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {totalIndia} scholars · India
              </p>
            </div>

            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="h-auto w-full"
              role="img"
              aria-label="Map of India showing where Hogwartz scholars come from"
            >
              <defs>
                <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Subtle starfield */}
              {Array.from({ length: 40 }).map((_, i) => {
                const x = (i * 137) % VB_W;
                const y = (i * 71) % VB_H;
                return <circle key={i} cx={x} cy={y} r="0.6" fill="white" opacity="0.18" />;
              })}

              {/* India outline (projected from lat/lng waypoints) */}
              <path
                d={
                  "M " +
                  INDIA_OUTLINE.map(([lat, lng]) => {
                    const p = project(lat, lng);
                    return `${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
                  }).join(" L ") +
                  " Z"
                }
                fill="rgba(255,180,80,0.06)"
                stroke="rgba(255,180,80,0.55)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />


              {/* Constellation lines connecting major hubs */}
              {LOCATIONS.slice(0, 5).map((a, i) => {
                const b = LOCATIONS[(i + 1) % 5];
                const pa = project(a.lat, a.lng);
                const pb = project(b.lat, b.lng);
                return (
                  <line
                    key={`l-${i}`}
                    x1={pa.x}
                    y1={pa.y}
                    x2={pb.x}
                    y2={pb.y}
                    stroke="var(--gold)"
                    strokeOpacity="0.18"
                    strokeDasharray="2 4"
                  />
                );
              })}

              {/* Markers */}
              {LOCATIONS.map((loc) => {
                const { x, y } = project(loc.lat, loc.lng);
                const r = 4 + (loc.count / maxCount) * 10;
                return (
                  <g key={loc.name}>
                    <circle cx={x} cy={y} r={r * 2.4} fill="url(#dotGlow)" />
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={r}
                      fill="var(--gold)"
                      fillOpacity="0.85"
                      stroke="white"
                      strokeOpacity="0.9"
                      strokeWidth="1"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.05 * loc.count }}
                      style={{ transformOrigin: `${x}px ${y}px` }}
                    />
                    <text
                      x={x + r + 4}
                      y={y + 3}
                      fontSize="9"
                      fill="rgba(255,255,255,0.85)"
                      style={{ fontFamily: "system-ui, sans-serif" }}
                    >
                      {loc.name} · {loc.count}
                    </text>
                  </g>
                );
              })}
            </svg>

            <p className="mt-4 text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              A stylised map · not to cartographic scale
            </p>
          </motion.div>

          {/* Distribution table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="rounded-3xl border border-[color:var(--gold)]/30 bg-background/40 p-6 backdrop-blur-sm sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              By Region
            </p>
            <h3 className="font-display mt-2 text-2xl text-foreground">
              Across India
            </h3>

            <ul className="mt-5 space-y-2">
              {LOCATIONS.map((loc) => {
                const pct = (loc.count / maxCount) * 100;
                return (
                  <li key={loc.name}>
                    <div className="flex items-center justify-between text-xs text-foreground/85">
                      <span>{loc.name}</span>
                      <span className="font-medium text-gold">{loc.count}</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-[color:var(--gold)]/50 to-[color:var(--gold)]"
                      />
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold">
              <Globe2 className="h-3.5 w-3.5" />
              Beyond Borders
            </div>
            <ul className="mt-4 space-y-2">
              {INTERNATIONAL.map((loc) => (
                <li
                  key={loc.name}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-xs text-foreground/85"
                >
                  <span>{loc.name}</span>
                  <span className="font-medium text-gold">{loc.count}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {totalIntl} scholars · international
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
