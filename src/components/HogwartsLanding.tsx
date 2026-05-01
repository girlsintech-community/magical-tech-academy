import { useEffect, useState } from "react";
import { CinematicIntro } from "@/components/magic/CinematicIntro";
import { Starfield } from "@/components/magic/Starfield";
import { CursorWand } from "@/components/magic/CursorWand";
import { SoundToggle } from "@/components/magic/SoundToggle";
import { Hero } from "@/components/landing/Hero";
import { StagesSection } from "@/components/landing/StagesSection";
import { HousesSection, SectionHeader } from "@/components/landing/HousesSection";
import { TimelineSection } from "@/components/landing/TimelineSection";
import { LearnSection, TestimonialsSection } from "@/components/landing/LearnSection";
import { CountdownSection } from "@/components/landing/CountdownSection";
import { ApplyForm } from "@/components/forms/ApplyForm";
import { MentorForm } from "@/components/forms/MentorForm";
import { Mail } from "lucide-react";

export function HogwartsLanding() {
  const [showIntro, setShowIntro] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let seen = "0";
    try {
      seen = localStorage.getItem("hogwarts:intro:seen") ?? "0";
    } catch {}
    setShowIntro(seen !== "1");
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <>
      <Starfield />
      <CursorWand />
      <SoundToggle />
      {showIntro && <CinematicIntro onFinish={() => setShowIntro(false)} />}

      <main className="relative z-10">
        <Hero onReplayIntro={() => setShowIntro(true)} />
        <StagesSection />
        <HousesSection />
        <TimelineSection />
        <LearnSection />
        <CountdownSection />
        <TestimonialsSection />

        {/* APPLY */}
        <section id="apply" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
          <SectionHeader
            eyebrow="Stage 1"
            title="Send your owl"
            subtitle="Submit your application. If your spark catches our eye, we'll send you a magical task."
          />
          <div className="mt-12">
            <ApplyForm />
          </div>
        </section>

        {/* MENTOR */}
        <section id="mentor" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
          <SectionHeader
            eyebrow="For grown-up wizards"
            title="Become a mentor"
            subtitle="Designers, engineers, founders, artists, teachers — share your craft with the next generation."
          />
          <div className="mt-12">
            <MentorForm />
          </div>
        </section>

        <footer className="relative z-10 border-t border-border/40 px-6 py-14">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div>
              <p className="font-display text-lg text-gold">Hogwarts: A Magical Virtual Tech Summer School</p>
              <p className="text-xs text-muted-foreground">By Girls Leading Tech · 7–21 June 2026 · Free for everyone admitted</p>
            </div>
            <a
              href="mailto:girlsleadingtech@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm transition hover:border-gold hover:text-gold"
            >
              <Mail className="h-4 w-4" /> girlsleadingtech@gmail.com
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
