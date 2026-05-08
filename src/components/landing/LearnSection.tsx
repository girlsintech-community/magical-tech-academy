import { SectionHeader } from "./HousesSection";
import { Brain, Palette, Blocks, Stars } from "lucide-react";
import { motion } from "framer-motion";
import { BookCard } from "@/components/magic/BookCard";
import learnBg from "@/assets/apply-bg.webp";

const SKILLS = [
  { Icon: Brain, title: "AI and prompt magic", body: "Build with the same models that power the modern world. Learn to think with AI, not just use it." },
  { Icon: Palette, title: "Design that delights", body: "Color, type, motion. Make things people actually want to look at and use." },
  { Icon: Blocks, title: "No code superpowers", body: "Ship real working apps without writing a single line, Lovable, Bolt, Figma, Canva." },
  { Icon: Stars, title: "Creativity as a craft", body: "Storytelling, pitching, taste. The skills that turn good ideas into great ones." },
];

export function LearnSection() {
  return (
    <section id="learn" className="relative z-10 overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${learnBg})` }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/85 to-background" />
      <div className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeader
        eyebrow="What you'll learn"
        title="Tools to build the impossible"
        subtitle="No prior coding required. Just curiosity and the willingness to try."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map((s, i) => (
          <BookCard
            key={s.title}
            index={i}
            title={s.title}
            subtitle="A spell to learn"
            coverIcon={<s.Icon className="h-6 w-6" />}
            minHeight={320}
          >
            {s.body}
          </BookCard>
        ))}
      </div>
      </div>
    </section>
  );
}

const VOICES = [
  { quote: "I made my first AI app on Day 4. By Day 14, my mom was using it.", who: "Aanya, 13 ~ Mumbai" },
  { quote: "I always thought tech was for adults. This made me feel like the wizard.", who: "Ishaan, 11 ~ Delhi" },
  { quote: "Our house won the cup. I cried. It was the best two weeks of my year.", who: "Meera, 16 ~ Bangalore" },
];

export function TestimonialsSection() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-24">
      <SectionHeader eyebrow="Whispers from past students" title="Voices from the school" />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {VOICES.map((v, i) => (
          <motion.figure
            key={v.who}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="parchment p-6"
          >
            <blockquote className="font-display text-lg italic">"{v.quote}"</blockquote>
            <figcaption className="mt-4 text-xs uppercase tracking-wider text-amber-900">
              — {v.who}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
