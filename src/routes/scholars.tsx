import { createFileRoute, Link } from "@tanstack/react-router";
import { Starfield } from "@/components/magic/Starfield";
import { CursorWand } from "@/components/magic/CursorWand";
import { ScrollToTop } from "@/components/magic/ScrollToTop";
import { SoundToggle } from "@/components/magic/SoundToggle";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ScholarsSection } from "@/components/landing/ScholarsSection";
import { StudentsSection } from "@/components/landing/StudentsSection";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/scholars")({
  component: ScholarsPage,
  head: () => ({
    meta: [
      { title: "Scholars of the Realm ~ hogwartz Summer School" },
      { name: "description", content: "See where our 66 young scholars journeyed from, across India and the world." },
    ],
  }),
});

function ScholarsPage() {
  return (
    <>
      <Starfield />
      <CursorWand />
      <SoundToggle />
      <ScrollToTop />
      <Navbar />
      <main className="relative z-10 pt-24">
        <div className="mx-auto max-w-6xl px-6 pt-6">
          <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground transition hover:text-gold">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to the gates
          </Link>
        </div>
        <ScholarsSection />
        <Footer />
      </main>
    </>
  );
}
