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
import rashmiPhoto from "@/assets/mentor-rashmi.jpg";
import shilpiPhoto from "@/assets/mentor-shilpi.png";
import anjaliPhoto from "@/assets/mentor-anjali.png";
import manishkaPhoto from "@/assets/mentor-manishka.jpg";
import minalPhoto from "@/assets/mentor-minal.jpg";
import avyanaPhoto from "@/assets/mentor-avyana.jpg";

import uddipaAsset from "@/assets/student-uddipa_pal.jpeg.asset.json";

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
  {
    name: "Rashmi Malapur Jaswal",
    company: "Research Eye",
    designation: "Founder",
    linkedin: "https://www.linkedin.com/in/rashmi-jaswal-93a25015/",
    house: "Circle of Founders",
    photo: rashmiPhoto,
  },
  {
    name: "Shilpi Mitra",
    company: "Microsoft India",
    designation: "Principal Software Engineering Manager",
    linkedin: "https://www.linkedin.com/in/shilpimitra/",
    house: "Architects of the Arcane",
    photo: shilpiPhoto,
  },
  {
    name: "Anjali Rout",
    company: "Venture Bots · Mentroid · FlyRank",
    designation: "Founder @ Venture Bots | AI Management Lead @ Mentroid | ML Intern @ FlyRank",
    linkedin: "https://www.linkedin.com/in/anjali-rout-117752357",
    house: "Order of the Algorithm",
    photo: anjaliPhoto,
  },
  {
    name: "Manishka Dubey",
    company: "Tinker Techie",
    designation: "Founder",
    linkedin: "https://www.linkedin.com/in/manishka-dubey-871a65202",
    house: "Circle of Makers",
    photo: manishkaPhoto,
  },
  {
    name: "Minal Dalal",
    company: "",
    designation: "Mentor",
    linkedin: "",
    house: "Council of Elders",
    photo: minalPhoto,
  },
  {
    name: "Avyana Mehta",
    company: "Plastic2Build",
    designation: "Founder @ Plastic2Build",
    linkedin: "",
    house: "Circle of Founders",
    photo: avyanaPhoto,
  },
  {
    name: "Daksh Mehan",
    company: "WeMakeAnyWebsites · DnD Techsolutions",
    designation: "Founder and CEO",
    linkedin: "https://www.linkedin.com/in/daksh-mehan-985939294/",
    house: "Circle of Founders",
    photo: null,
  },
  {
    name: "Uddipa Pal",
    company: "NIOS",
    designation: "Researcher",
    linkedin: "https://www.linkedin.com/in/uddipa-pal",
    house: "Order of Scholars",
    photo: uddipaAsset.url,
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
            <span className="shimmer-text">Become a Professor</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-foreground/75 sm:text-base">
            Designers, engineers, founders, artists, teachers — share your craft with 200 of India&apos;s most curious young builders.
          </p>
        </div>

        {/* Hall of Professors */}
        <section className="mt-16">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold">The Hall of Professors</p>
            <h2 className="font-display mt-2 text-2xl sm:text-3xl">Our sworn-in guides</h2>
            <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground">
              The Sorting Hat has spoken. More Professors shall be revealed as the moon turns.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_MENTORS.map((m) => {
              const Tag: any = m.linkedin ? "a" : "div";
              const linkProps = m.linkedin
                ? { href: m.linkedin, target: "_blank", rel: "noopener noreferrer" }
                : {};
              return (
                <Tag
                  key={m.name}
                  {...linkProps}
                  className="magic-card group relative flex flex-col overflow-hidden rounded-3xl"
                >
                  <div className="absolute -right-6 -top-6 text-6xl opacity-10 transition group-hover:opacity-30">
                    ✦
                  </div>
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    {m.photo ? (
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[color:var(--gold)]/20 via-background to-[color:var(--ember)]/20">
                        <span className="font-display text-8xl text-gold/70">
                          {m.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                  <div className="flex flex-col gap-2 p-6 md:p-7">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Featured guide</p>
                    <h3 className="font-display text-2xl text-gold sm:text-3xl">{m.name}</h3>
                    <p className="text-sm text-foreground/80">{m.designation}</p>
                    {m.company && <p className="text-sm text-muted-foreground">{m.company}</p>}
                    <span className="mt-1 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.3em] text-foreground/60">
                      <Sparkles className="h-3 w-3" /> {m.house}
                    </span>
                    {m.linkedin && (
                      <span className="mt-3 inline-flex items-center gap-1 text-sm text-gold transition group-hover:translate-x-0.5">
                        <Linkedin className="h-3.5 w-3.5" /> View scroll
                      </span>
                    )}
                  </div>
                </Tag>
              );
            })}
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
