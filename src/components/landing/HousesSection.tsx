import { motion } from "framer-motion";
import { Flame, BookOpen, Code2, Sprout } from "lucide-react";
import { BookCard } from "@/components/magic/BookCard";

const HOUSES = [
  {
    name: "Fireforge",
    tagline: "Bold builders",
    color: "var(--fireforge)",
    Icon: Flame,
    desc: "You charge at hard problems with energy and grit. You'd rather build the thing than wait for permission.",
  },
  {
    name: "Brightmind",
    tagline: "Curious thinkers",
    color: "var(--brightmind)",
    Icon: BookOpen,
    desc: "You love untangling ideas. You ask better questions than most adults and you read the docs for fun.",
  },
  {
    name: "Codecraft",
    tagline: "Strategic creators",
    color: "var(--codecraft)",
    Icon: Code2,
    desc: "You see patterns. You plan three moves ahead. The world is one giant board to be cleverly arranged.",
  },
  {
    name: "Sparkroot",
    tagline: "Collaborators",
    color: "var(--sparkroot)",
    Icon: Sprout,
    desc: "You make every team better. Kindness, patience, follow-through — your magic is the people around you.",
  },
];

export function HousesSection() {
  return (
    <section id="houses" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
      <SectionHeader
        eyebrow="The Four Houses"
        title="Find your magic"
        subtitle="Every student is sorted into a house — your tribe for the 14-day journey, your team in the final showcase. Tap a tome to open it."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {HOUSES.map((h, i) => (
          <BookCard
            key={h.name}
            index={i}
            title={h.name}
            subtitle={h.tagline}
            accent={h.color}
            coverIcon={<h.Icon className="h-6 w-6" />}
            minHeight={340}
          >
            {h.desc}
          </BookCard>
        ))}
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7 }}
      className="text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
      <h2 className="font-display mt-3 text-4xl text-foreground sm:text-5xl">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">{subtitle}</p>
      )}
    </motion.div>
  );
}
