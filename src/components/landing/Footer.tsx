import { Mail, Sparkles, Instagram, Github, Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative z-10 mt-24 overflow-hidden border-t border-[color:var(--gold)]/20">
      {/* Magical glow underlay */}
      <div
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 0%, rgba(180,120,255,0.18), transparent 60%), radial-gradient(40% 60% at 20% 100%, rgba(255,140,60,0.18), transparent 60%), radial-gradient(40% 60% at 80% 100%, rgba(80,160,255,0.18), transparent 60%)",
        }}
      />
      {/* Floating embers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute block h-1 w-1 animate-float-up rounded-full bg-[color:var(--ember)]"
            style={{
              left: `${(i * 53) % 100}%`,
              animationDuration: `${8 + (i % 6)}s`,
              animationDelay: `${(i * 0.7) % 10}s`,
              ["--drift" as string]: `${(i % 2 ? 1 : -1) * 30}px`,
              boxShadow: "0 0 8px var(--ember)",
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Headline ribbon */}
        <div className="parchment mx-auto max-w-3xl px-8 py-7 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-amber-900/80">
            By owl, by raven, by carrier pigeon
          </p>
          <p className="font-display mt-2 text-2xl italic text-amber-950 sm:text-3xl">
            "The wand chooses the wizard. The school chooses the spark."
          </p>
        </div>

        {/* Columns */}
        <div className="mt-14 grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-gold">
              <Sparkles className="h-5 w-5" />
              <p className="font-display text-xl">Hogwarts: A Magical Virtual Tech Summer School</p>
            </div>
            <p className="mt-3 max-w-md text-sm text-foreground/70">
              A free 14 day journey for 100 of India&apos;s most curious young builders.
              Brewed with love by{" "}
              <span className="text-gold">Girls Leading Tech</span>.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href="mailto:girlsleadingtech@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 bg-background/50 px-4 py-2 text-xs transition hover:border-[color:var(--gold)] hover:text-gold"
              >
                <Mail className="h-3.5 w-3.5" /> girlsleadingtech@gmail.com
              </a>
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Wander</p>
            <ul className="mt-4 space-y-2 text-sm text-foreground/75">
              <li><Link to="/" className="hover:text-gold">The great hall</Link></li>
              <li><a href="/#houses" className="hover:text-gold">The four houses</a></li>
              <li><a href="/#journey" className="hover:text-gold">The 14 day journey</a></li>
              <li><a href="/#learn" className="hover:text-gold">What you&apos;ll learn</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Join the magic</p>
            <ul className="mt-4 space-y-2 text-sm text-foreground/75">
              <li><Link to="/apply" className="hover:text-gold">Apply as a student</Link></li>
              <li><Link to="/mentor" className="hover:text-gold">Become a mentor</Link></li>
              <li><a href="mailto:girlsleadingtech@gmail.com?subject=Partner with Hogwarts" className="hover:text-gold">Partner with us</a></li>
            </ul>
            <div className="mt-5 flex items-center gap-2">
              <a aria-label="Instagram" href="#" className="grid h-8 w-8 place-items-center rounded-full border border-[color:var(--gold)]/30 text-foreground/70 transition hover:border-[color:var(--gold)] hover:text-gold">
                <Instagram className="h-4 w-4" />
              </a>
              <a aria-label="GitHub" href="#" className="grid h-8 w-8 place-items-center rounded-full border border-[color:var(--gold)]/30 text-foreground/70 transition hover:border-[color:var(--gold)] hover:text-gold">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom rune */}
        <div className="mt-14 flex flex-col items-center gap-3 border-t border-[color:var(--gold)]/15 pt-8 text-center">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px w-12 bg-[color:var(--gold)]/30" />
            <span className="font-display tracking-[0.3em]">DRACO ~ DORMIENS ~ NUNQUAM ~ TITILLANDUS</span>
            <span className="h-px w-12 bg-[color:var(--gold)]/30" />
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Girls Leading Tech ~ Conjured with{" "}
            <Heart className="inline h-3 w-3 fill-current text-[color:var(--ember)]" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
