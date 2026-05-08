import { Mail, Sparkles, ScrollText } from "lucide-react";
import { SectionHeader } from "./HousesSection";
import { BookCard } from "@/components/magic/BookCard";
import owlBg from "@/assets/owl-bg.webp";

const STAGES = [
  {
    n: "01",
    title: "Send your owl",
    subtitle: "Stage I, Application",
    body: "Fill out a short magical form. Tell us who you are, what you love, and why this matters to you.",
    Icon: Mail,
  },
  {
    n: "02",
    title: "Prove your spark",
    subtitle: "Stage II, The Task",
    body: "If your profile shines, we send you a personal magical task. Write to us, why do you want to join? Show us your spark.",
    Icon: Sparkles,
  },
  {
    n: "03",
    title: "Receive your invitation",
    subtitle: "Stage III, Hogwarts Letter",
    body: "If your spark is bright, your official Hogwarts invitation arrives, sealed, sorted into a house, and ready to begin.",
    Icon: ScrollText,
  },
];

export function StagesSection() {
  return (
    <section id="stages" className="relative z-10 overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${owlBg})` }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/85 to-background" />
      <div className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeader
        eyebrow="How you get in"
        title="Three stages to your invitation"
        subtitle="We hand pick every student. Only 100 will be admitted this year, 75 girls and 25 boys. Open each tome to read its rite."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {STAGES.map((s, i) => (
          <BookCard
            key={s.n}
            index={i}
            title={s.title}
            subtitle={s.subtitle}
            coverIcon={<s.Icon className="h-6 w-6" />}
            minHeight={340}
          >
            <span className="font-display block text-3xl text-amber-900/60">{s.n}</span>
            <p className="mt-2">{s.body}</p>
          </BookCard>
        ))}
      </div>
      </div>
    </section>
  );
}
