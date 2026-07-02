import { useState } from "react";
import { CinematicIntro } from "@/components/magic/CinematicIntro";
import { Starfield } from "@/components/magic/Starfield";
import { CursorWand } from "@/components/magic/CursorWand";
import { SoundToggle } from "@/components/magic/SoundToggle";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { StagesSection } from "@/components/landing/StagesSection";
import { HousesSection } from "@/components/landing/HousesSection";
import { TimelineSection } from "@/components/landing/TimelineSection";
import { LearnSection } from "@/components/landing/LearnSection";
import { TeamSection } from "@/components/landing/TeamSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { ImpactSection } from "@/components/landing/ImpactSection";

import { LibrarySection } from "@/components/landing/LibrarySection";
import { ScrollToTop } from "@/components/magic/ScrollToTop";

export function HogwartsLanding() {
  const [showIntro, setShowIntro] = useState(false);

  return (
    <>
      <Starfield />
      <CursorWand />
      <SoundToggle />
      <ScrollToTop />
      {showIntro && <CinematicIntro onFinish={() => setShowIntro(false)} />}
      <Navbar />

      <main className="relative z-10">
        <Hero onReplayIntro={() => setShowIntro(true)} />
        <ImpactSection />
        <StagesSection />
        <HousesSection />
        <TimelineSection />
        <LearnSection />
        <StudentsSection />
        <LibrarySection />
        <TeamSection />
        <FaqSection />
        <Footer />
      </main>
    </>
  );
}
