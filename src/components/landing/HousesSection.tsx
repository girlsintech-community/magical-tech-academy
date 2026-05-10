import { motion } from "framer-motion";
import { BookCard } from "@/components/magic/BookCard";
import housesBg from "@/assets/sorting-hat-bg.webp";
import astraImg from "@/assets/house-astra.webp";
import novaImg from "@/assets/house-nova.webp";
import lunoImg from "@/assets/house-luno.webp";
import nyxImg from "@/assets/house-nyx.webp";

const HOUSES = [
  {
    name: "Astra",
    tagline: "The Dreamer",
    image: astraImg,
    desc: "You see worlds before they exist. Bold, electric, unafraid of the unknown, you turn raw imagination into the spark that lights the future.",
  },
  {
    name: "Nova",
    tagline: "The Visionary",
    image: novaImg,
    desc: "You read tomorrow like a map. Curious and clear eyed, you connect ideas across galaxies and code the future before it arrives.",
  },
  {
    name: "Luno",
    tagline: "The Alchemist",
    image: lunoImg,
    desc: "You turn ordinary code into gold. Patient, precise, a little mysterious, you brew elegance out of chaos and craft what others only attempt.",
  },
  {
    name: "Nyx",
    tagline: "The Enigma",
    image: nyxImg,
    desc: "You hack the paradox and rule the code. Sharp, strategic, three moves ahead, you find the secret door in every locked room.",
  },
];

export function HousesSection() {
  return (
    <section id="houses" className="relative z-10 overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${housesBg})` }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/85 to-background" />
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader
          eyebrow="The Four Houses"
          title="Find your magic"
          subtitle="Every student is sorted into a house, your tribe for the 14 day journey, your team in the final showcase. Hover a tome and tap to open it."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOUSES.map((h, i) => (
            <BookCard
              key={h.name}
              index={i}
              title={h.name}
              subtitle={h.tagline}
              coverImage={h.image}
              minHeight={420}
            >
              <div className="text-[10px] uppercase tracking-[0.3em] text-amber-900/80">
                {h.tagline}
              </div>
              <h4 className="font-display mt-1 text-2xl" style={{ color: "oklch(0.30 0.10 40)" }}>
                House of {h.name}
              </h4>
              <p className="mt-3">{h.desc}</p>
            </BookCard>
          ))}
        </div>
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
