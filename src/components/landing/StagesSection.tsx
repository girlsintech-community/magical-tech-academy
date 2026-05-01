import { motion } from "framer-motion";
import { SectionHeader } from "./HousesSection";

const STAGES = [
  {
    n: "01",
    title: "Send your owl",
    subtitle: "Application",
    body: "Fill out a short magical form. Tell us who you are, what you love, and why this matters to you.",
    accent: "from-amber-400 to-orange-500",
  },
  {
    n: "02",
    title: "Prove your spark",
    subtitle: "The Task",
    body: "If your profile shines, we send you a personal magical task. Write to us — why do you want to join? Show us your spark.",
    accent: "from-fuchsia-400 to-purple-500",
  },
  {
    n: "03",
    title: "Receive your invitation",
    subtitle: "Hogwarts Letter",
    body: "If your spark is bright, your official Hogwarts invitation arrives — sealed, sorted into a house, and ready to begin.",
    accent: "from-emerald-400 to-teal-500",
  },
];

export function StagesSection() {
  return (
    <section id="stages" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
      <SectionHeader
        eyebrow="How you get in"
        title="Three stages to your invitation"
        subtitle="We hand-pick every student. Only 200 will be admitted this year — 150 girls, 50 boys."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {STAGES.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="magic-card relative rounded-2xl p-7"
          >
            <div
              className={`mb-5 inline-block rounded-md bg-gradient-to-br ${s.accent} bg-clip-text font-display text-5xl text-transparent`}
            >
              {s.n}
            </div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.subtitle}</p>
            <h3 className="font-display mt-1 text-2xl">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
