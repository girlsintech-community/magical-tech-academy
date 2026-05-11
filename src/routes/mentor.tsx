import { createFileRoute, Link } from "@tanstack/react-router";
import { Starfield } from "@/components/magic/Starfield";
import { CursorWand } from "@/components/magic/CursorWand";
import { ScrollToTop } from "@/components/magic/ScrollToTop";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ArrowLeft, Linkedin, Sparkles } from "lucide-react";
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

        {/* Hall of Mentors */}
        <section className="mt-16">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold">The Hall of Mentors</p>
            <h2 className="font-display mt-2 text-2xl sm:text-3xl">Our first sworn-in guide</h2>
            <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground">
              The Sorting Hat has spoken. More mentors shall be revealed as the moon turns.
            </p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {FEATURED_MENTORS.map((m) => (
              <a
                key={m.name}
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="magic-card group relative overflow-hidden rounded-2xl p-6"
              >
                <div className="absolute -right-6 -top-6 text-6xl opacity-10 transition group-hover:opacity-30">
                  ✦
                </div>
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[color:var(--gold)] to-[color:var(--ember)] font-display text-xl text-[color:var(--primary-foreground)]">
                    {m.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-gold">{m.name}</h3>
                    <p className="text-xs text-muted-foreground">{m.designation}</p>
                    <p className="text-xs text-foreground/70">{m.company}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.3em] text-foreground/60">
                    <Sparkles className="h-3 w-3" /> {m.house}
                  </span>
                  <span className="inline-flex items-center gap-1 text-gold transition group-hover:translate-x-0.5">
                    <Linkedin className="h-3.5 w-3.5" /> View scroll
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Application via Airtable */}
        <section className="mt-20">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Send your owl</p>
            <h2 className="font-display mt-2 text-2xl sm:text-3xl">Pen your mentor application</h2>
            <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground">
              Dip your quill and complete the enchanted parchment below.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[color:var(--gold)]/30 bg-background/40 shadow-[0_0_60px_-10px_oklch(0.72_0.22_45/0.35)] backdrop-blur">
            <iframe
              title="Mentor application form"
              src="https://airtable.com/embed/appHmtCuCXIoqbrxR/paghvCCEyZi9ncGDC/form"
              className="h-[820px] w-full"
              style={{ background: "transparent", border: 0 }}
            />
          </div>
          <p className="mt-3 text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Having trouble?{" "}
            <a
              href="https://airtable.com/appHmtCuCXIoqbrxR/paghvCCEyZi9ncGDC/form"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold underline-offset-4 hover:underline"
            >
              Open the parchment in a new portal
            </a>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
