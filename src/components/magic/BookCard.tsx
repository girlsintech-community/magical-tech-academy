import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

type Props = {
  title: string;
  subtitle?: string;
  /** Color (CSS color or var) for the cover crest accent. */
  accent?: string;
  /** Cover icon (rendered above the title). */
  coverIcon?: ReactNode;
  /** Optional cover image URL — when set, the cover renders this image as background instead of the icon block. */
  coverImage?: string;
  /** Page contents (revealed when opened). */
  children: ReactNode;
  /** Index for stagger. */
  index?: number;
  className?: string;
  /** Optional minimum height of the card. */
  minHeight?: number;
};

export function BookCard({
  title,
  subtitle,
  accent = "var(--gold)",
  coverIcon,
  children,
  index = 0,
  className = "",
  minHeight = 320,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className={`book ${open ? "is-open" : ""} ${className}`}
      style={{ minHeight }}
      onClick={() => setOpen((v) => !v)}
      role="button"
      aria-expanded={open}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((v) => !v);
        }
      }}
    >
      {/* Page (under the cover) */}
      <div className="book-page">
        <div className="flex h-full flex-col">
          <div className="text-[10px] uppercase tracking-[0.3em] text-amber-900/80">
            {subtitle ?? "An open page"}
          </div>
          <h3
            className="font-display mt-1 text-2xl"
            style={{ color: "oklch(0.30 0.10 40)" }}
          >
            {title}
          </h3>
          <div className="mt-3 flex-1 text-sm leading-relaxed text-amber-950/85">
            {children}
          </div>
          <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-amber-900/70">
            <span>~ read ~</span>
            <span>tap to close</span>
          </div>
        </div>
      </div>

      {/* Spine glow */}
      <div className="book-spine-glow" />

      {/* Cover */}
      <div className="book-cover">
        <div
          className="grid h-12 w-12 place-items-center rounded-full text-foreground shadow-lg"
          style={{
            background: `linear-gradient(135deg, oklch(0.22 0.05 280 / 0.9), oklch(0.14 0.04 270 / 0.9))`,
            border: `1px solid color-mix(in oklab, ${accent} 50%, transparent)`,
            boxShadow: `0 0 18px -4px ${accent}`,
          }}
        >
          {coverIcon ?? <BookOpen className="h-6 w-6" />}
        </div>
        <h3 className="font-display mt-3 text-2xl text-foreground">{title}</h3>
        {subtitle && (
          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-gold">
            {subtitle}
          </p>
        )}
        <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
          ✦ Tap to open ✦
        </p>
      </div>
    </motion.div>
  );
}
