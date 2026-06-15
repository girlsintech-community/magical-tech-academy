import { motion } from "framer-motion";
import { Users, Cake, Sparkles, MapPin } from "lucide-react";
import { SectionHeader } from "./HousesSection";

const STATS = [
  { icon: Users, value: "66", label: "Young builders enrolled" },
  { icon: Cake, value: "9 – 18", label: "Age range of our scholars" },
  { icon: MapPin, value: "15+", label: "States & countries represented" },
  { icon: Sparkles, value: "4", label: "Houses competing for glory" },
];

const AGE_DISTRIBUTION = [
  { age: 9, count: 5 },
  { age: 10, count: 6 },
  { age: 11, count: 5 },
  { age: 12, count: 5 },
  { age: 13, count: 11 },
  { age: 14, count: 4 },
  { age: 15, count: 9 },
  { age: 16, count: 8 },
  { age: 17, count: 9 },
  { age: 18, count: 4 },
];

export function ImpactSection() {
  const max = Math.max(...AGE_DISTRIBUTION.map((d) => d.count));

  return (
    <section id="impact" className="relative z-10 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-background" />
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            "radial-gradient(50% 40% at 30% 20%, rgba(255,180,80,0.10), transparent 70%), radial-gradient(40% 40% at 80% 80%, rgba(120,80,255,0.10), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader
          eyebrow="Our Impact"
          title="The magic by numbers"
          subtitle="A glimpse at the spark we've gathered for the inaugural cohort of Hogwartz."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-2xl border border-[color:var(--gold)]/25 bg-background/40 p-6 backdrop-blur-sm transition hover:border-[color:var(--gold)]/60"
            >
              <s.icon className="h-5 w-5 text-gold" />
              <div className="font-display mt-4 text-4xl text-foreground sm:text-5xl">
                {s.value}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="mt-12 rounded-3xl border border-[color:var(--gold)]/25 bg-background/40 p-6 backdrop-blur-sm sm:p-10"
        >
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                Age Distribution
              </p>
              <h3 className="font-display mt-2 text-2xl text-foreground sm:text-3xl">
                Builders across every year of wonder
              </h3>
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              66 scholars · ages 9 – 18
            </p>
          </div>

          <div className="mt-8 grid grid-cols-10 items-end gap-2 sm:gap-4">
            {AGE_DISTRIBUTION.map((d, i) => {
              const h = (d.count / max) * 100;
              return (
                <div key={d.age} className="flex flex-col items-center gap-2">
                  <span className="text-[10px] font-medium text-foreground/70 sm:text-xs">
                    {d.count}
                  </span>
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.9, delay: i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
                    className="w-full rounded-t-md bg-gradient-to-t from-[color:var(--gold)]/30 to-[color:var(--gold)]"
                    style={{ minHeight: 6, maxHeight: 160 }}
                  />
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">
                    {d.age}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
