import { motion } from "framer-motion";
import { Linkedin, Globe, MapPin, Sparkles, Instagram } from "lucide-react";
import { SectionHeader } from "./HousesSection";
import manikAsset from "@/assets/mentor-daksh.png.asset.json";

// Served from /public/team — works on every host (Lovable preview AND Vercel).
const TEAM_PHOTOS = {
  misha: "/team/team-misha-2026.jpg",
  sarah: "/team/team-sarah-2026.jpg",
  manik: manikAsset.url,
  raksa: "/team/team-raksa-2026.png",
  vaishnavi: "/team/team-vaishnavi-2026.png",
  abhijna: "/team/team-abhijna-2026.png",
  samiksha: "/team/team-samiksha-2026.jpg",
  deeksha: "/team/team-deeksha-2026.jpg",
  vijay: "/team/team-vijay-2026.jpg",
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
    name: "Vijay Laxmi",
    title: "Apprentice of the Order",
    city: "Delhi",
    photo: TEAM_PHOTOS.vijay,
    linkedin: "https://www.linkedin.com/in/laxmi-vijay/",
    instagram: "https://www.instagram.com/_vijay.laxmi__",
    patronus: "Falcon",
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
    name: "Sarah Auma",
    title: "Social Media Manager ~ Owl Post",
    city: "Kenya",
    photo: TEAM_PHOTOS.sarah,
    patronus: "Lioness",
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

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="magic-card group relative flex flex-col overflow-hidden rounded-3xl"
            >
              <div className="absolute -right-6 -top-6 z-10 text-6xl opacity-10 transition group-hover:opacity-30">
                ✦
              </div>

              <div className="relative aspect-[4/5] w-full overflow-hidden">
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.04]"
                    loading={i < 3 ? "eager" : "lazy"}
                    decoding="async"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[color:var(--gold)]/20 via-background to-[color:var(--ember)]/20">
                    <span className="font-display text-8xl text-gold/70">
                      {initials(m.name)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              <div className="flex flex-col gap-2 p-6 md:p-7">
                <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Order of hogwartz</p>
                <h3 className="font-display text-2xl text-gold sm:text-3xl">{m.name}</h3>
                <p className="text-sm text-foreground/80">{m.title}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> <span>{m.city}</span>
                </div>
                <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full border border-[color:var(--gold)]/30 bg-background/40 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-foreground/70">
                  <Sparkles className="h-3 w-3 text-gold" /> Patronus ~ {m.patronus}
                </span>

                <div className="mt-3 flex flex-wrap items-center gap-2">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
