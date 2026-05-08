import { motion } from "framer-motion";
import { SectionHeader } from "./HousesSection";
import journeyBg from "@/assets/mentor-bg.webp";

const PHASES = [
  {
    title: "Days 1 to 4 ~ Learn the spells",
    items: ["AI fundamentals", "Design thinking", "Creative storytelling", "House sorting and rituals"],
    glow: "from-amber-400/20 to-transparent",
  },
  {
    title: "Days 5 to 10 ~ Build your magic",
    items: ["Pick your project", "Daily mentor sessions", "Build with no code and AI", "House challenges"],
    glow: "from-fuchsia-400/20 to-transparent",
  },
  {
    title: "Days 11 to 14 ~ Showcase",
    items: ["Polish your demo", "Pitch your project", "House cup ceremony", "Demo Day livestream"],
    glow: "from-emerald-400/20 to-transparent",
  },
];

export function TimelineSection() {
  return (
    <section id="journey" className="relative z-10 overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${journeyBg})` }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/85 to-background" />
      <div className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeader
        eyebrow="Your 14 day journey"
        title="Two weeks that change how you see the world"
        subtitle="June 7 to June 21, 2026 ~ Free for everyone admitted"
      />

      <div className="relative mt-14">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[color:var(--gold)]/0 via-[color:var(--gold)]/60 to-[color:var(--gold)]/0 sm:left-1/2" />
        <div className="space-y-10">
          {PHASES.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className={`relative pl-12 sm:w-1/2 sm:pl-0 ${
                i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:ml-auto sm:pl-12"
              }`}
            >
              <div className={`absolute left-0 top-3 h-3 w-3 rounded-full bg-gold shadow-[0_0_20px_var(--gold)] sm:left-auto ${i % 2 === 0 ? "sm:right-[-7px]" : "sm:left-[-7px]"}`} />
              <div className={`magic-card rounded-2xl bg-gradient-to-br ${p.glow} p-6`}>
                <h3 className="font-display text-xl text-gold">{p.title}</h3>
                <ul className={`mt-3 space-y-1 text-sm text-foreground/80 ${i % 2 === 0 ? "sm:items-end" : ""}`}>
                  {p.items.map((it) => (
                    <li key={it}>~ {it}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
