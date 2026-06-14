import { createFileRoute, Link } from "@tanstack/react-router";
import { Starfield } from "@/components/magic/Starfield";
import { CursorWand } from "@/components/magic/CursorWand";
import { ScrollToTop } from "@/components/magic/ScrollToTop";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Linkedin, Sparkles } from "lucide-react";
import mentorBg from "@/assets/mentor-bg.webp";
import aarushiPhoto from "@/assets/mentor-aarushi.jpg";

export const Route = createFileRoute("/mentor")({
  component: MentorPage,
  head: () => ({
    meta: [
      { title: "Become a mentor ~ hogwartz: A Magical Virtual Tech Summer School" },
      { name: "description", content: "Designers, engineers, founders, artists, teachers — share your craft with the next generation of young builders." },
    ],
  }),
});

const FEATURED_MENTORS = [
  {
    name: "Aarushi Chottani",
    company: "Outreach Debate",
    designation: "India Branch Director",
    linkedin: "https://www.linkedin.com/in/aarushi-chottani-80b861322",
    house: "Order of the First Owl",
    photo: aarushiPhoto,
  },
];

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
      <ScrollToTop />
      <Navbar />
      <main className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-24">
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

        {/* Hall of Mentors */}
        <section className="mt-16">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold">The Hall of Mentors</p>
            <h2 className="font-display mt-2 text-2xl sm:text-3xl">Our first sworn-in guide</h2>
            <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground">
              The Sorting Hat has spoken. More mentors shall be revealed as the moon turns.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            {FEATURED_MENTORS.map((m) => (
              <a
                key={m.name}
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="magic-card group relative grid overflow-hidden rounded-3xl md:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.75fr)]"
              >
                <div className="absolute -right-6 -top-6 text-6xl opacity-10 transition group-hover:opacity-30">
                  ✦
                </div>
                <div className="relative min-h-80 overflow-hidden md:min-h-[30rem]">
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                </div>
                <div className="flex flex-col justify-end p-8 md:p-10">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Featured guide</p>
                  <h3 className="font-display mt-3 text-3xl text-gold sm:text-4xl">{m.name}</h3>
                  <p className="mt-3 text-sm text-foreground/80">{m.designation}</p>
                  <p className="text-sm text-muted-foreground">{m.company}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.3em] text-foreground/60">
                    <Sparkles className="h-3 w-3" /> {m.house}
                  </span>
                  <span className="mt-8 inline-flex items-center gap-1 text-sm text-gold transition group-hover:translate-x-0.5">
                    <Linkedin className="h-3.5 w-3.5" /> View scroll
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* External mentor application */}
        <section className="mt-20">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Send your owl</p>
            <h2 className="font-display mt-2 text-2xl sm:text-3xl">Pen your mentor application</h2>
            <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground">
              Continue to the mentor application in a new portal.
            </p>
          </div>

          <div className="mt-8 text-center">
            <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-[color:var(--gold)] to-[color:var(--ember)] px-8 shadow-[var(--shadow-glow)]">
              <a
              href="https://airtable.com/appHmtCuCXIoqbrxR/paghvCCEyZi9ncGDC/form"
              target="_blank"
              rel="noopener noreferrer"
            >
                Apply as a mentor <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
