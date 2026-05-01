import { motion } from "framer-motion";
import { Sparkles, Wand2, RotateCcw } from "lucide-react";
import { SeatCounter } from "./SeatCounter";

export function Hero({ onReplayIntro }: { onReplayIntro: () => void }) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pt-16 text-center">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-xs font-semibold uppercase tracking-[0.4em] text-gold"
      >
        Girls Leading Tech presents
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="font-display mt-6 text-5xl leading-[1.05] sm:text-7xl md:text-8xl"
      >
        <span className="shimmer-text">Hogwarts</span>
        <span className="block text-2xl font-normal italic text-foreground/80 sm:text-3xl md:text-4xl">
          A Magical Virtual Tech Summer School
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mx-auto mt-6 max-w-2xl text-base text-foreground/75 sm:text-lg"
      >
        A 14-day journey where AI meets imagination. Free for 200 chosen students,
        ages 8–18, across India. June 7 → June 21, 2026.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.1 }}
        className="mt-9 flex flex-wrap items-center justify-center gap-3"
      >
        <button
          onClick={() => scrollTo("apply")}
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--gold)] to-[color:var(--ember)] px-7 py-3 text-sm font-semibold text-[color:var(--primary-foreground)] shadow-[var(--shadow-glow)] transition hover:scale-105 hover:shadow-[var(--shadow-ember)]"
        >
          <Sparkles className="h-4 w-4" />
          Apply now
        </button>
        <button
          onClick={() => scrollTo("mentor")}
          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 bg-background/40 px-6 py-3 text-sm text-foreground backdrop-blur transition hover:border-[color:var(--gold)] hover:bg-background/60"
        >
          <Wand2 className="h-4 w-4" />
          Become a mentor
        </button>
        <button
          onClick={onReplayIntro}
          className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-xs text-muted-foreground transition hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Replay intro
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.4 }}
        className="mt-14 w-full"
      >
        <SeatCounter />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        ↓ scroll to discover
      </motion.div>
    </section>
  );
}
