import { motion } from "framer-motion";
import { Sparkles, Wand2, RotateCcw, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SeatCounter } from "./SeatCounter";
import heroBg from "@/assets/hogwarts-hero.webp";

export function Hero({ onReplayIntro }: { onReplayIntro: () => void }) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      {/* Wallpaper */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Layered atmosphere */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-background/60 to-background" />
      <div
        className="absolute inset-0 -z-10 opacity-60 mix-blend-screen"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(255,180,80,0.18), transparent 70%), radial-gradient(40% 40% at 80% 70%, rgba(120,80,255,0.18), transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pb-20 pt-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-full border border-[color:var(--gold)]/30 bg-black/30 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.4em] text-gold backdrop-blur sm:text-xs"
        >
          Girls Leading Tech · Class of 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-display mt-6 text-5xl leading-[1] sm:text-7xl md:text-[8.5rem]"
          style={{ textShadow: "0 8px 40px rgba(0,0,0,0.6)" }}
        >
          <span className="shimmer-text">Hogwarts</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="font-display mt-2 text-lg italic text-foreground/85 sm:text-2xl md:text-3xl"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.7)" }}
        >
          A Magical Virtual Tech Summer School
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mx-auto mt-7 max-w-2xl text-sm text-foreground/85 sm:text-lg"
          style={{ textShadow: "0 2px 14px rgba(0,0,0,0.7)" }}
        >
          A 14-day journey where AI meets imagination. Free for 200 chosen students,
          ages 8–18, across India. June 7 → June 21, 2026.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/apply"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--gold)] to-[color:var(--ember)] px-7 py-3.5 text-sm font-semibold text-[color:var(--primary-foreground)] shadow-[var(--shadow-glow)] transition hover:scale-105 hover:shadow-[var(--shadow-ember)]"
          >
            <Sparkles className="h-4 w-4" />
            Apply now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/mentor"
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 bg-background/40 px-6 py-3.5 text-sm text-foreground backdrop-blur transition hover:border-[color:var(--gold)] hover:bg-background/60"
          >
            <Wand2 className="h-4 w-4" />
            Become a mentor
          </Link>
          <button
            onClick={onReplayIntro}
            className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-xs text-foreground/70 transition hover:text-gold"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Replay intro
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4 }}
          className="mt-14 flex w-full justify-center"
        >
          <SeatCounter />
        </motion.div>

      </div>
    </section>
  );
}
