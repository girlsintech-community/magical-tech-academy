import { createFileRoute, Link } from "@tanstack/react-router";
import { MentorForm } from "@/components/forms/MentorForm";
import { Starfield } from "@/components/magic/Starfield";
import { CursorWand } from "@/components/magic/CursorWand";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ArrowLeft } from "lucide-react";
import mentorBg from "@/assets/mentor-bg.webp";

export const Route = createFileRoute("/mentor")({
  component: MentorPage,
  head: () => ({
    meta: [
      { title: "Become a mentor ~ Hogwarts: A Magical Virtual Tech Summer School" },
      { name: "description", content: "Designers, engineers, founders, artists, teachers — share your craft with the next generation of young builders." },
    ],
  }),
});

function MentorPage() {
  return (
    <>
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${mentorBg})` }}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/70 via-background/80 to-background" />
      <Starfield />
      <CursorWand />
      <Navbar />
      <main className="relative z-10 mx-auto max-w-4xl px-6 pt-32 pb-24">
        <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground transition hover:text-gold">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to the gates
        </Link>
        <div className="mt-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold">For grown-up wizards</p>
          <h1 className="font-display mt-3 text-4xl sm:text-6xl">
            <span className="shimmer-text">Become a mentor</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-foreground/75 sm:text-base">
            Designers, engineers, founders, artists, teachers — share your craft with 200 of India&apos;s most curious young builders.
          </p>
        </div>
        <div className="mt-12">
          <MentorForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
