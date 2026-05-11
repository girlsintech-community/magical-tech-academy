import { useEffect, useState } from "react";
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
import { CountdownSection } from "@/components/landing/CountdownSection";
import { ScrollToTop } from "@/components/magic/ScrollToTop";

export function HogwartsLanding() {
  const [showIntro, setShowIntro] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Always play the intro on every visit
    setShowIntro(true);
    setReady(true);
  }, []);

  if (!ready) return null;

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
        <CountdownSection />
        <StagesSection />
        <HousesSection />
        <TimelineSection />
        <LearnSection />
        <Footer />
      </main>
    </>
  );
}
