import { motion } from "framer-motion";
import { Linkedin, Globe, MapPin, Sparkles, Instagram } from "lucide-react";
import { SectionHeader } from "./HousesSection";

const TEAM_PHOTOS = {
  misha: "/__l5e/assets-v1/531d62cf-3a37-41f0-9cd8-b7b169fa0a9e/team-misha-2026.jpg",
  sarah: "/__l5e/assets-v1/2aa4af1a-01bd-43d6-8064-2082ed742adf/team-sarah-2026.jpg",
  manik: "/__l5e/assets-v1/73aca587-3987-4702-9b41-e2541aa9b976/team-manik.png",
  raksa: "/__l5e/assets-v1/ec9d63ca-7c70-4039-a06c-40e17ef5acec/team-raksa-2026.png",
  vaishnavi: "/__l5e/assets-v1/36424c94-8052-4c5c-adcb-afdaa4ac6589/team-vaishnavi-2026.png",
  abhijna: "/__l5e/assets-v1/18059ee0-a7ae-4d5f-a95b-db840f156919/team-abhijna-2026.png",
  samiksha: "/__l5e/assets-v1/c4fc7d28-9ba9-4d87-8fa8-790e1ea69e68/team-samiksha-2026.jpg",
  deeksha: "/__l5e/assets-v1/164110fe-1cea-409c-8409-144a9dc49609/team-deeksha-2026.jpg",
  vijay: "/__l5e/assets-v1/5814afac-22c1-4b06-9cd1-3aa71e5880c8/team-vijay-2026.jpg",
} as const;

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
    photo: TEAM_PHOTOS.misha,
    linkedin: "https://www.linkedin.com/in/misha-parekh",
    patronus: "Phoenix",
  },
  {
    name: "Sarah Auma",
    title: "Social Media Manager ~ Owl Post",
    city: "Kenya",
    photo: TEAM_PHOTOS.sarah,
    patronus: "Lioness",
  },
  {
    name: "Manik",
    title: "Quillmaster ~ Storyteller",
    city: "Chandigarh",
    photo: TEAM_PHOTOS.manik,
    website: "https://themanikdiaries.xyz/",
    patronus: "Stag",
  },
  {
    name: "S. Raksa Ruba",
    title: "Host & Moderator ~ Herald of the Hall",
    city: "Chennai, Tamil Nadu",
    photo: TEAM_PHOTOS.raksa,
    linkedin: "https://www.linkedin.com/in/raksarubas",
    instagram: "https://instagram.com/Rakza31",
    patronus: "Nightingale",
  },
  {
    name: "Vaishnavi Desale",
    title: "Host & Moderator ~ Voice of the Veil",
    city: "Nashik, Maharashtra",
    photo: TEAM_PHOTOS.vaishnavi,
    linkedin: "https://www.linkedin.com/in/vaishnavidesale27",
    instagram: "https://www.instagram.com/vaishnavi_gemini",
    patronus: "Doe",
  },
  {
    name: "Abhijna Laxmi",
    title: "Host & Moderator ~ Keeper of Ceremonies",
    city: "Mangalore, Karnataka",
    photo: TEAM_PHOTOS.abhijna,
    linkedin: "https://www.linkedin.com/in/abhijna-laxmi-659143298",
    instagram: "https://www.instagram.com/the_fantasticmoon20",
    patronus: "Snowy Owl",
  },
  {
    name: "Samiksha Patil",
    title: "Designer ~ Enchantress of Ink",
    city: "Ahilyanagar, Maharashtra",
    photo: TEAM_PHOTOS.samiksha,
    linkedin: "https://www.linkedin.com/in/samiksha-patil-622879385/",
    instagram: "https://instagram.com/samiksha__024",
    patronus: "Unicorn",
  },
  {
    name: "Deeksha G",
    title: "Content Writer ~ Scribe of Sparks",
    city: "Mangaluru, Karnataka",
    photo: TEAM_PHOTOS.deeksha,
    linkedin: "https://linkedin.com/in/deeksha-g-cybersec",
    instagram: "https://www.instagram.com/_dksha_bangera_",
    patronus: "Raven",
  },
  {
    name: "Vijay Laxmi",
    title: "Apprentice of the Order",
    city: "Delhi",
    photo: TEAM_PHOTOS.vijay,
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
                      className="relative z-10 block h-full w-full bg-background object-cover transition duration-700 group-hover:scale-110"
                      loading={i < 3 ? "eager" : "lazy"}
                      decoding="async"
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
