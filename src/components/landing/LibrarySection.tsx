import { motion } from "framer-motion";
import { PlayCircle, BookOpen, Trophy } from "lucide-react";
import { SectionHeader } from "@/components/landing/HousesSection";

function ytId(url: string): string | null {
  const m =
    url.match(/[?&]v=([\w-]{11})/) ||
    url.match(/youtu\.be\/([\w-]{11})/) ||
    url.match(/embed\/([\w-]{11})/);
  return m ? m[1] : null;
}

function ytThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
}

const CLASSES = [
  { url: "https://youtu.be/qrO-1L4-QIA", title: "Hogwartz Summer School Onboarding", speaker: "Vaishnavi", role: "Girls Leading Tech Team" },
  { url: "https://www.youtube.com/watch?v=4421-rBM3bo", title: "Vibe Coding Using AI Tools", speaker: "Anjali Rout", role: "Founder, Venture Bots" },
  { url: "https://www.youtube.com/watch?v=aUf559-c6XU", title: "How to Stay Ahead", speaker: "Manishka Dubey", role: "Founder, TinkerTechies" },
  { url: "https://www.youtube.com/watch?v=VRkPTResQtc", title: "Oneness with Nature", speaker: "Minal Dalal", role: "Mentor" },
  { url: "https://www.youtube.com/watch?v=w45ll9Lqlo8", title: "Leading from the Ground Up", speaker: "Avyana Mehta", role: "Founder, Plastic2Build · Earth Prize 2026 Winner" },
  { url: "https://www.youtube.com/watch?v=LSRzauMdm4A", title: "The Joy of Writing", speaker: "Rashmi Jaswal", role: "Founder, Research Eye" },
  { url: "https://www.youtube.com/watch?v=z789lcL9hLI", title: "Getting Started with LinkedIn", speaker: "Aarushi Chottani", role: "Founder, Autoni" },
  { url: "https://www.youtube.com/watch?v=VpOHH7ywlBM", title: "Communications & Public Speaking", speaker: "Aarushi Chottani", role: "Founder, Autoni" },
  { url: "https://www.youtube.com/watch?v=Ig4hcO5soSM", title: "Designing Your Future: Confidence, Purpose & Leadership", speaker: "Shilpi Mitra", role: "Principal Engineering Manager, Microsoft India" },
  { url: "https://www.youtube.com/watch?v=Wgf9tKbOrnU", title: "From Student to Innovator, Building with AI", speaker: "Daksh Mehan", role: "Founder & CEO, WeMakeAnyWebsites" },
  { url: "https://www.youtube.com/watch?v=V9epg8j6mKU", title: "The Secret Map to STEM Opportunities", speaker: "Uddipa Pal", role: "Research Unit Head, Beyond Infinity" },
  { url: "https://www.youtube.com/watch?v=sBrhRptCdO8", title: "Graduation Ceremony", speaker: "hogwartz Summer School", role: "Class of 2026" },
];

const PITCHES = [
  { url: "https://www.youtube.com/watch?v=7Yz8WOak3VY", title: "VaxiCare360", speaker: "Drishti Gupta", role: "Hogwartz Hacks Pitch" },
  { url: "https://www.youtube.com/watch?v=ZBa-MW47hLQ", title: "Lumous Nexus", speaker: "Harshita Saharan", role: "Hogwartz Hacks Pitch" },
  { url: "https://www.youtube.com/watch?v=wBlROg18ldk", title: "Pensieve AI", speaker: "John Antony", role: "Hogwartz Hacks Pitch" },
  { url: "https://www.youtube.com/watch?v=gZiLX0CB5WQ", title: "RiSync", speaker: "Riddhish Singh", role: "Hogwartz Hacks Pitch" },
];

function VideoCard({ url, title, speaker, role, index }: { url: string; title: string; speaker: string; role: string; index: number }) {
  const id = ytId(url);
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
      className="magic-card group relative flex flex-col overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {id ? (
          <img
            src={ytThumb(id)}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[color:var(--gold)]/20 to-[color:var(--ember)]/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="rounded-full border border-gold/60 bg-black/40 p-3 backdrop-blur-sm transition group-hover:scale-110 group-hover:border-gold">
            <PlayCircle className="h-8 w-8 text-gold" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 p-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold/80">{role}</p>
        <h4 className="font-display text-base text-foreground">{title}</h4>
        <p className="text-xs text-foreground/70">By {speaker}</p>
      </div>
    </motion.a>
  );
}

export function LibrarySection() {
  return (
    <section id="library" className="relative z-10 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-[#0a0713] to-background" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(circle_at_20%_30%,rgba(198,151,73,0.15),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(122,92,255,0.12),transparent_50%)]" />
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader
          eyebrow="The Restricted Section"
          title="The Library of hogwartz"
          subtitle="Every spell, every lecture, every incantation from our sacred classes, preserved in enchanted parchment for the ages."
        />

        {/* Class recordings */}
        <div className="mt-14">
          <div className="mb-6 flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-gold" />
            <h3 className="font-display text-2xl text-foreground">Class Recordings</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-[color:var(--gold)]/50 to-transparent" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CLASSES.map((c, i) => (
              <VideoCard key={c.url} url={c.url} title={c.title} speaker={c.speaker} role={c.role} index={i} />
            ))}
          </div>
        </div>

        {/* Pitches */}
        <div className="mt-16">
          <div className="mb-6 flex items-center gap-3">
            <Trophy className="h-5 w-5 text-gold" />
            <h3 className="font-display text-2xl text-foreground">
              Pitches of hogwartz Hacks
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-[color:var(--gold)]/50 to-transparent" />
          </div>
          <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
            The final duel. Watch our young founders unveil their spellbinding creations before the council of judges.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PITCHES.map((p, i) => (
              <VideoCard key={p.url} url={p.url} title={p.title} speaker={p.speaker} role={p.role} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
