import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      aria-label="Apparate to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full border border-[color:var(--gold)]/50 bg-background/70 text-gold backdrop-blur-md transition hover:scale-110 hover:border-[color:var(--gold)] animate-glow-pulse"
    >
      <ArrowUp className="h-5 w-5" />
      <span className="sr-only">Apparate to top</span>
    </button>
  );
}
