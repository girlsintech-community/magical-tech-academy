import { SectionHeader } from "./HousesSection";
import { Brain, Palette, Blocks, Stars } from "lucide-react";
import { motion } from "framer-motion";

const SKILLS = [
  { icon: Brain, title: "AI & prompt magic", body: "Build with the same models that power the modern world. Learn to think with AI, not just use it." },
  { icon: Palette, title: "Design that delights", body: "Color, type, motion. Make things people actually want to look at and use." },
  { icon: Blocks, title: "No-code superpowers", body: "Ship real working apps without writing a single line — Lovable, Bolt, Figma, Canva." },
  { icon: Stars, title: "Creativity as a craft", body: "Storytelling, pitching, taste. The skills that turn good ideas into great ones." },
];

export function LearnSection() {
  return (
    <section id="learn" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
      <SectionHeader
        eyebrow="What you'll learn"
        title="Tools to build the impossible"
        subtitle="No prior coding required. Just curiosity and the willingness to try."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="magic-card rounded-2xl p-6"
          >
            <s.icon className="h-7 w-7 text-gold" />
            <h3 className="font-display mt-4 text-xl">{s.title}</h3>
            <p className="mt-2 text-sm text-foreground/75">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const VOICES = [
  { quote: "I made my first AI app on Day 4. By Day 14, my mom was using it.", who: "Aanya, 13 · Mumbai" },
  { quote: "I always thought tech was for adults. This made me feel like the wizard.", who: "Ishaan, 11 · Delhi" },
  { quote: "Our house won the cup. I cried. It was the best two weeks of my year.", who: "Meera, 16 · Bangalore" },
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
