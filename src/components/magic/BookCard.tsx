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
  coverImage,
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
      className={`book group ${open ? "is-open" : ""} ${className}`}
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
      <div
        className="book-cover"
        style={
          coverImage
            ? {
                backgroundImage: `linear-gradient(180deg, oklch(0 0 0 / 0.15) 0%, oklch(0 0 0 / 0.55) 70%, oklch(0 0 0 / 0.85) 100%), url(${coverImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {!coverImage && (
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
        )}
        {!coverImage && (
          <h3 className="font-display mt-3 text-2xl text-foreground">{title}</h3>
        )}
        {!coverImage && subtitle && (
          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-gold">
            {subtitle}
          </p>
        )}
        <p
          className={`mt-4 text-[11px] uppercase tracking-[0.3em] text-gold transition-opacity duration-300 ${
            coverImage
              ? "absolute bottom-6 left-0 right-0 text-center opacity-0 group-hover:opacity-100"
              : "opacity-60 group-hover:opacity-100"
          }`}
          style={coverImage ? { textShadow: "0 2px 14px rgba(0,0,0,0.9)" } : undefined}
        >
          ✦ Tap to open ✦
        </p>
      </div>
    </motion.div>
  );
}
