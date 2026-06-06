import { motion } from "framer-motion";
import { Linkedin, Globe, MapPin, Sparkles, Instagram } from "lucide-react";
import { SectionHeader } from "./HousesSection";
import mishaPhoto from "@/assets/team-misha.jpg.asset.json";
import sarahPhoto from "@/assets/team-sarah.jpg.asset.json";
import manikPhoto from "@/assets/team-manik.png.asset.json";
import raksaPhoto from "@/assets/team-raksa.png.asset.json";
import vaishnaviPhoto from "@/assets/team-vaishnavi.png.asset.json";
import abhijnaPhoto from "@/assets/team-abhijna.png.asset.json";
import samikshaPhoto from "@/assets/team-samiksha.jpg.asset.json";
import deekshaPhoto from "@/assets/team-deeksha.jpg.asset.json";
import vijayPhoto from "@/assets/team-vijay.jpg.asset.json";

type Member = {
  name: string;
  title: string;
  city: string;
  photo?: string;
  linkedin?: string;
  website?: string;
  instagram?: string;
  patronus: string;
};

const TEAM: Member[] = [
  {
    name: "Misha Parekh",
    title: "Content Writer ~ Quillkeeper",
    city: "Mumbai, Maharashtra",
    photo: mishaPhoto.url,
    linkedin: "https://www.linkedin.com/in/misha-parekh",
    patronus: "Phoenix",
  },
  {
    name: "Sarah Auma",
    title: "Social Media Manager ~ Owl Post",
    city: "Kenya",
    photo: sarahPhoto.url,
    patronus: "Lioness",
  },
  {
    name: "Manik",
    title: "Quillmaster ~ Storyteller",
    city: "Chandigarh",
    photo: manikPhoto.url,
    website: "https://themanikdiaries.xyz/",
    patronus: "Stag",
  },
  {
    name: "S. Raksa Ruba",
    title: "Host & Moderator ~ Herald of the Hall",
    city: "Chennai, Tamil Nadu",
    linkedin: "https://www.linkedin.com/in/raksarubas",
    instagram: "https://instagram.com/Rakza31",
    patronus: "Nightingale",
  },
  {
    name: "Vaishnavi Desale",
    title: "Host & Moderator ~ Voice of the Veil",
    city: "Nashik, Maharashtra",
    linkedin: "https://www.linkedin.com/in/vaishnavidesale27",
    instagram: "https://www.instagram.com/vaishnavi_gemini",
    patronus: "Doe",
  },
  {
    name: "Abhijna Laxmi",
    title: "Host & Moderator ~ Keeper of Ceremonies",
    city: "Mangalore, Karnataka",
    linkedin: "https://www.linkedin.com/in/abhijna-laxmi-659143298",
    instagram: "https://www.instagram.com/the_fantasticmoon20",
    patronus: "Snowy Owl",
  },
  {
    name: "Samiksha Patil",
    title: "Designer ~ Enchantress of Ink",
    city: "Ahilyanagar, Maharashtra",
    linkedin: "https://www.linkedin.com/in/samiksha-patil-622879385/",
    instagram: "https://instagram.com/samiksha__024",
    patronus: "Unicorn",
  },
  {
    name: "Deeksha G",
    title: "Content Writer ~ Scribe of Sparks",
    city: "Mangaluru, Karnataka",
    linkedin: "https://linkedin.com/in/deeksha-g-cybersec",
    instagram: "https://www.instagram.com/_dksha_bangera_",
    patronus: "Raven",
  },
  {
    name: "Vijay Laxmi",
    title: "Apprentice of the Order",
    city: "Delhi",
    linkedin: "https://www.linkedin.com/in/laxmi-vijay/",
    instagram: "https://www.instagram.com/_vijay.laxmi__",
    patronus: "Falcon",
  },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TeamSection() {
  return (
    <section id="team" className="relative z-10 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/90 to-background" />
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader
          eyebrow="The Order of Hogwartz"
          title="Meet the keepers of the castle"
          subtitle="The witches and wizards who brew this fortnight of magic into being."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="magic-card group relative overflow-hidden rounded-3xl p-6 text-center"
            >
              <div className="absolute -right-8 -top-8 text-7xl opacity-10 transition group-hover:opacity-25">
                ✦
              </div>

              <div className="relative mx-auto h-32 w-32">
                <div className="absolute inset-0 -m-1 rounded-full bg-gradient-to-br from-[color:var(--gold)] via-[color:var(--ember)] to-[color:var(--gold)] opacity-70 blur-md transition group-hover:opacity-100" />
                <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-[color:var(--gold)]/70 shadow-[0_0_45px_-8px_oklch(0.72_0.22_45/0.7)]">
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[color:var(--gold)]/30 via-background to-[color:var(--ember)]/30 font-display text-3xl text-gold">
                      {initials(m.name)}
                    </div>
                  )}
                </div>
              </div>

              <h3 className="font-display mt-5 text-2xl text-gold">{m.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-foreground/70">
                {m.title}
              </p>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{m.city}</span>
              </div>

              <div className="mt-4 inline-flex items-center gap-1 rounded-full border border-[color:var(--gold)]/30 bg-background/40 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-foreground/75">
                <Sparkles className="h-3 w-3 text-gold" /> Patronus ~ {m.patronus}
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--gold)]/40 px-3 py-1.5 text-[11px] text-foreground/85 transition hover:border-[color:var(--gold)] hover:text-gold"
                  >
                    <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                  </a>
                )}
                {m.instagram && (
                  <a
                    href={m.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--gold)]/40 px-3 py-1.5 text-[11px] text-foreground/85 transition hover:border-[color:var(--gold)] hover:text-gold"
                  >
                    <Instagram className="h-3.5 w-3.5" /> Instagram
                  </a>
                )}
                {m.website && (
                  <a
                    href={m.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--gold)]/40 px-3 py-1.5 text-[11px] text-foreground/85 transition hover:border-[color:var(--gold)] hover:text-gold"
                  >
                    <Globe className="h-3.5 w-3.5" /> Diaries
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
