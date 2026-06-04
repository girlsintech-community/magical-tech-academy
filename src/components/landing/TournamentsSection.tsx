import { motion } from "framer-motion";
import { Trophy, Flame, Hourglass, Scroll } from "lucide-react";
import { SectionHeader } from "./HousesSection";

type Status = "past" | "ongoing" | "upcoming";

type Tournament = {
  name: string;
  realName: string;
  status: Status;
  date: string;
  description: string;
  prize?: string;
};

const TOURNAMENTS: Tournament[] = [
  {
    name: "The Triwizard Code Cup",
    realName: "Inter-House AI Challenge",
    status: "upcoming",
    date: "21 June 2026",
    description:
      "Three trials, three days. Houses duel with AI agents, no-code spells and bold ideas. Only one champion lifts the goblet on Demo Day.",
    prize: "Goblet of Fire + mentor scroll",
  },
  {
    name: "The Quidditch of Quills",
    realName: "Storytelling & Prompt Tournament",
    status: "upcoming",
    date: "18 June 2026",
    description:
      "A high-speed prompt-craft tournament. Snitch the perfect prompt, dodge bludgers of bias, score with vivid worlds.",
    prize: "The Golden Snitch trophy",
  },
  {
    name: "The Sorcerer's Sprint",
    realName: "48-Hour Build Marathon",
    status: "ongoing",
    date: "Now brewing ~ ends 16 June 2026",
    description:
      "A two-night cauldron of code. Witches and wizards conjure working magic from scratch with mentors whispering through the night.",
    prize: "Philosopher's Stone medal",
  },
  {
    name: "The Sorting Skirmish",
    realName: "House Welcome Duel",
    status: "past",
    date: "9 June 2026",
    description:
      "First sparks of the term. New initiates duelled in mini-quests to earn their first house points.",
    prize: "First 100 house points",
  },
  {
    name: "Owls of the Open Source",
    realName: "Community Contribution Hunt",
    status: "past",
    date: "May 2026",
    description:
      "Pre-term scouting. Brave owls flew across GitHub forests to land their first pull-request feathers.",
    prize: "Founders' Owl badge",
  },
];

const STATUS_META: Record<
  Status,
  { label: string; icon: typeof Trophy; ring: string; chip: string; glow: string }
> = {
  upcoming: {
    label: "Upcoming ~ Forthcoming",
    icon: Hourglass,
    ring: "ring-amber-400/60",
    chip: "bg-amber-500/15 text-amber-200 border-amber-400/40",
    glow: "from-amber-400/25",
  },
  ongoing: {
    label: "Ongoing ~ Brewing now",
    icon: Flame,
    ring: "ring-fuchsia-400/70",
    chip: "bg-fuchsia-500/15 text-fuchsia-200 border-fuchsia-400/40",
    glow: "from-fuchsia-400/30",
  },
  past: {
    label: "Past ~ Chronicled",
    icon: Scroll,
    ring: "ring-emerald-400/40",
    chip: "bg-emerald-500/10 text-emerald-200 border-emerald-400/30",
    glow: "from-emerald-400/15",
  },
};

const ORDER: Status[] = ["ongoing", "upcoming", "past"];

export function TournamentsSection() {
  const grouped = ORDER.map((s) => ({
    status: s,
    items: TOURNAMENTS.filter((t) => t.status === s),
  })).filter((g) => g.items.length > 0);

  return (
    <section id="tournaments" className="relative z-10 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/90 to-background" />
      {/* Floating embers */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(circle_at_20%_30%,oklch(0.72_0.22_45/0.25),transparent_40%),radial-gradient(circle_at_80%_70%,oklch(0.55_0.18_320/0.18),transparent_45%)]" />

      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader
          eyebrow="The Tournaments"
          title="Trials, duels & magical sprints"
          subtitle="Every cohort writes a new chapter in the Hogwartz chronicles. Here are the trials past, present, and yet to come."
        />

        <div className="mt-14 space-y-14">
          {grouped.map(({ status, items }) => {
            const meta = STATUS_META[status];
            const Icon = meta.icon;
            return (
              <div key={status}>
                <div className="mb-6 flex items-center gap-3">
                  <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.3em] ${meta.chip}`}>
                    <Icon className="h-3.5 w-3.5" /> {meta.label}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-[color:var(--gold)]/40 to-transparent" />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {items.map((t, i) => (
                    <motion.article
                      key={t.name}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.55, delay: i * 0.06 }}
                      className={`magic-card relative overflow-hidden rounded-2xl bg-gradient-to-br ${meta.glow} to-transparent p-6`}
                    >
                      <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-[color:var(--gold)]/10 to-transparent blur-2xl`} />

                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display text-2xl text-gold sm:text-3xl">
                            {t.name}
                          </h3>
                          <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-foreground/55">
                            aka {t.realName}
                          </p>
                        </div>
                        <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-background/60 ring-2 ${meta.ring}`}>
                          <Trophy className="h-5 w-5 text-gold" />
                        </div>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                        {t.description}
                      </p>

                      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--gold)]/25 bg-background/40 px-3 py-1 text-foreground/75">
                          <Hourglass className="h-3 w-3 text-gold" /> {t.date}
                        </span>
                        {t.prize && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--gold)]/25 bg-background/40 px-3 py-1 text-foreground/75">
                            <Trophy className="h-3 w-3 text-gold" /> {t.prize}
                          </span>
                        )}
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-12 text-center text-xs text-muted-foreground">
          More trials shall be inscribed as the term unfolds. Keep an eye on the enchanted ceiling.
        </p>
      </div>
    </section>
  );
}
