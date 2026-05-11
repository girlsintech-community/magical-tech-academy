import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Upload, Download, Sparkles, RefreshCw, Move } from "lucide-react";

import { Starfield } from "@/components/magic/Starfield";
import { CursorWand } from "@/components/magic/CursorWand";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import frameSrc from "@/assets/photobooth-frame.png";
import applyBg from "@/assets/apply-bg.webp";

export const Route = createFileRoute("/photobooth")({
  component: PhotoBoothPage,
  head: () => ({
    meta: [
      { title: "Photo Booth ~ hogwartz Summer School" },
      {
        name: "description",
        content:
          "Step into the magical photo booth. Upload your portrait and conjure a Hogwartz Summer School keepsake to share with your fellow witches and wizards.",
      },
    ],
  }),
});

// Frame image is 1024×1024. The inner transparent window (in source pixels):
const FRAME_SIZE = 1024;
const WINDOW = { x: 188, y: 222, w: 672, h: 568 };

function PhotoBoothPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<HTMLImageElement | null>(null);
  const [frame, setFrame] = useState<HTMLImageElement | null>(null);
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });

  // Preload frame
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => setFrame(img);
    img.src = frameSrc;
  }, []);

  // Render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !frame) return;
    canvas.width = FRAME_SIZE;
    canvas.height = FRAME_SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Magical parchment fill behind window
    ctx.clearRect(0, 0, FRAME_SIZE, FRAME_SIZE);
    const grad = ctx.createRadialGradient(
      WINDOW.x + WINDOW.w / 2,
      WINDOW.y + WINDOW.h / 2,
      40,
      WINDOW.x + WINDOW.w / 2,
      WINDOW.y + WINDOW.h / 2,
      WINDOW.w
    );
    grad.addColorStop(0, "#2b1a08");
    grad.addColorStop(1, "#0a0604");
    ctx.fillStyle = grad;
    ctx.fillRect(WINDOW.x, WINDOW.y, WINDOW.w, WINDOW.h);

    if (photo) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(WINDOW.x, WINDOW.y, WINDOW.w, WINDOW.h);
      ctx.clip();

      // Cover-fit then apply user scale/offset
      const baseScale = Math.max(WINDOW.w / photo.width, WINDOW.h / photo.height);
      const s = baseScale * scale;
      const drawW = photo.width * s;
      const drawH = photo.height * s;
      const cx = WINDOW.x + WINDOW.w / 2 + offsetX;
      const cy = WINDOW.y + WINDOW.h / 2 + offsetY;
      ctx.drawImage(photo, cx - drawW / 2, cy - drawH / 2, drawW, drawH);

      // Subtle warm overlay for "magical photograph" feel
      ctx.fillStyle = "rgba(70, 40, 10, 0.18)";
      ctx.fillRect(WINDOW.x, WINDOW.y, WINDOW.w, WINDOW.h);
      ctx.restore();
    } else {
      ctx.fillStyle = "rgba(212, 175, 55, 0.55)";
      ctx.font = "600 28px 'Cinzel', serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        "Your portrait awaits…",
        WINDOW.x + WINDOW.w / 2,
        WINDOW.y + WINDOW.h / 2
      );
    }

    // Frame on top
    ctx.drawImage(frame, 0, 0, FRAME_SIZE, FRAME_SIZE);
  }, [photo, frame, scale, offsetX, offsetY]);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setPhoto(img);
      setScale(1);
      setOffsetX(0);
      setOffsetY(0);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f && f.type.startsWith("image/")) handleFile(f);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "hogwartz-photobooth.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  // Drag to reposition
  const onPointerDown = (e: React.PointerEvent) => {
    if (!photo) return;
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragStart.current = { x: e.clientX, y: e.clientY, ox: offsetX, oy: offsetY };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const ratio = FRAME_SIZE / rect.width;
    setOffsetX(dragStart.current.ox + (e.clientX - dragStart.current.x) * ratio);
    setOffsetY(dragStart.current.oy + (e.clientY - dragStart.current.y) * ratio);
  };
  const onPointerUp = () => setDragging(false);

  return (
    <>
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${applyBg})` }}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/75 via-background/85 to-background" />
      <Starfield />
      <CursorWand />
      <Navbar />

      <main className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground transition hover:text-gold"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to the gates
        </Link>

        <div className="mt-8 text-center">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-gold">
            <Sparkles className="h-3.5 w-3.5" /> The Enchanted Photo Booth
          </p>
          <h1 className="font-display mt-3 text-4xl sm:text-6xl">
            <span className="shimmer-text">Smile for the wizarding press</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-foreground/75 sm:text-base">
            Upload a portrait, slip into a Hogwartz Summer School frame, and download a magical keepsake to share across the realms (Instagram, X, WhatsApp).
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Canvas card */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className="relative overflow-hidden rounded-2xl border border-[color:var(--gold)]/30 bg-background/40 p-4 shadow-[0_0_60px_-10px_oklch(0.72_0.22_45/0.35)] backdrop-blur"
          >
            <canvas
              ref={canvasRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              className={`block h-auto w-full rounded-xl ${
                photo ? "cursor-grab active:cursor-grabbing" : "cursor-default"
              }`}
              style={{ touchAction: "none" }}
            />
            {!photo && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-4 grid place-items-center rounded-xl border-2 border-dashed border-[color:var(--gold)]/40 bg-black/30 text-center text-sm text-foreground/80 transition hover:border-[color:var(--gold)] hover:bg-black/40"
              >
                <span className="flex flex-col items-center gap-2 px-6">
                  <Upload className="h-6 w-6 text-gold" />
                  <span className="font-display text-lg text-gold">Tap to upload your portrait</span>
                  <span className="text-xs text-muted-foreground">or drag & drop a photo here</span>
                </span>
              </button>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-4 rounded-2xl border border-[color:var(--gold)]/30 bg-background/60 p-6 backdrop-blur">
            <h2 className="font-display text-2xl text-gold">Conjuring controls</h2>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onSelectFile}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--gold)]/40 px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-[color:var(--gold)] hover:text-gold"
            >
              <Upload className="h-4 w-4" /> {photo ? "Choose a different photo" : "Upload a photo"}
            </button>

            <div className="space-y-2">
              <label className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <span>Zoom</span>
                <span className="text-gold">{scale.toFixed(2)}×</span>
              </label>
              <input
                type="range"
                min={0.5}
                max={3}
                step={0.01}
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                disabled={!photo}
                className="w-full accent-[color:var(--gold)] disabled:opacity-40"
              />
            </div>

            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Move className="h-3.5 w-3.5" /> Drag the photo inside the frame to reposition.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  setScale(1);
                  setOffsetX(0);
                  setOffsetY(0);
                }}
                disabled={!photo}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs font-medium text-foreground/80 transition hover:border-white/40 hover:text-foreground disabled:opacity-40"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Reset
              </button>
              <button
                onClick={download}
                disabled={!photo}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--gold)] to-[color:var(--ember)] px-4 py-2.5 text-xs font-semibold text-[color:var(--primary-foreground)] shadow-[var(--shadow-glow)] transition hover:scale-[1.03] disabled:scale-100 disabled:opacity-50"
              >
                <Download className="h-3.5 w-3.5" /> Download
              </button>
            </div>

            <div className="mt-2 rounded-xl border border-[color:var(--gold)]/20 bg-black/30 p-4 text-xs text-foreground/70">
              <p className="font-display text-sm text-gold">A note from the headmistress</p>
              <p className="mt-1.5 leading-relaxed">
                Your photo is conjured entirely in your own browser — nothing is sent to our owls. Once downloaded, share it with{" "}
                <span className="text-gold">#HogwartzSummerSchool</span> and tag{" "}
                <span className="text-gold">@girlsleadingtech</span>.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
