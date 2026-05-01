import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sparkles, Menu, X } from "lucide-react";

const NAV = [
  { to: "/#houses", label: "Houses" },
  { to: "/#journey", label: "Journey" },
  { to: "/#learn", label: "Learn" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHash = (e: React.MouseEvent, to: string) => {
    if (!to.includes("#")) return;
    const [path, hash] = to.split("#");
    if ((path === "" || path === "/") && loc.pathname === "/") {
      e.preventDefault();
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        className={`pointer-events-auto inline-flex items-center gap-1 rounded-full border border-[color:var(--gold)]/30 px-2 py-2 backdrop-blur-xl transition-all ${
          scrolled ? "bg-background/80 shadow-[var(--shadow-glow)]" : "bg-background/50"
        }`}
        style={{ boxShadow: scrolled ? undefined : "0 8px 32px -12px rgba(0,0,0,0.5)" }}
      >
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold text-gold transition hover:bg-white/5"
        >
          <Sparkles className="h-4 w-4" />
          <span className="font-display tracking-wide">Hogwarts</span>
        </Link>

        {/* Desktop links */}
        <div className="ml-1 hidden items-center gap-0.5 md:flex">
          {NAV.map((item) => (
            <a
              key={item.to}
              href={item.to}
              onClick={(e) => handleHash(e, item.to)}
              className="rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-foreground/75 transition hover:bg-white/5 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="ml-1 hidden items-center gap-1.5 md:flex">
          <Link
            to="/mentor"
            className="rounded-full border border-[color:var(--gold)]/40 px-3.5 py-1.5 text-xs font-medium text-foreground transition hover:border-[color:var(--gold)] hover:text-gold"
          >
            Mentor
          </Link>
          <Link
            to="/apply"
            className="rounded-full bg-gradient-to-r from-[color:var(--gold)] to-[color:var(--ember)] px-4 py-1.5 text-xs font-semibold text-[color:var(--primary-foreground)] shadow-[var(--shadow-glow)] transition hover:scale-[1.04]"
          >
            Apply
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-full text-foreground/80 transition hover:bg-white/5 md:hidden"
          aria-label="Open menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="pointer-events-auto absolute top-[68px] left-4 right-4 rounded-2xl border border-[color:var(--gold)]/30 bg-background/95 p-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <a
                key={item.to}
                href={item.to}
                onClick={(e) => handleHash(e, item.to)}
                className="rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
            <Link to="/mentor" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-white/5">
              Become a mentor
            </Link>
            <Link
              to="/apply"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-lg bg-gradient-to-r from-[color:var(--gold)] to-[color:var(--ember)] px-3 py-2 text-center text-sm font-semibold text-[color:var(--primary-foreground)]"
            >
              Apply now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
