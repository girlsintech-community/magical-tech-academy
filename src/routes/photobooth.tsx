import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Upload,
  Download,
  Sparkles,
  RefreshCw,
  Move,
  Wand2,
  X,
  RotateCw,
} from "lucide-react";

import { Starfield } from "@/components/magic/Starfield";
import { CursorWand } from "@/components/magic/CursorWand";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import frameSrc from "@/assets/photobooth-frame.png";
import hatSrc from "@/assets/wizard-hat.png";
import applyBg from "@/assets/apply-bg.webp";

// Frame image is 1024×1024. The inner transparent window (in source pixels):
const FRAME_SIZE = 1024;
const WINDOW = { x: 188, y: 222, w: 672, h: 568 };

type Layer = "photo" | "hat";

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

function PhotoBoothPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [photo, setPhoto] = useState<HTMLImageElement | null>(null);
  const [frame, setFrame] = useState<HTMLImageElement | null>(null);
  const [hatImg, setHatImg] = useState<HTMLImageElement | null>(null);

  // Photo transform
  const [photoScale, setPhotoScale] = useState(1);
  const [photoX, setPhotoX] = useState(0);
  const [photoY, setPhotoY] = useState(0);

  // Hat
  const [hatOn, setHatOn] = useState(false);
  const [hatColor, setHatColor] = useState("#5b2a86"); // wizard purple
  const [hatScale, setHatScale] = useState(1);
  const [hatRot, setHatRot] = useState(-8);
  const [hatX, setHatX] = useState(WINDOW.x + WINDOW.w / 2);
  const [hatY, setHatY] = useState(WINDOW.y + 60);

  // Drag
  const [activeLayer, setActiveLayer] = useState<Layer>("photo");
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });

  // Preload frame + hat
  useEffect(() => {
    const f = new Image();
    f.crossOrigin = "anonymous";
    f.onload = () => setFrame(f);
    f.src = frameSrc;

    const h = new Image();
    h.crossOrigin = "anonymous";
    h.onload = () => setHatImg(h);
    h.src = hatSrc;
  }, []);

  // When hat is enabled, drag controls the hat by default
  useEffect(() => {
    if (hatOn) setActiveLayer("hat");
  }, [hatOn]);

  // Render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !frame) return;
    canvas.width = FRAME_SIZE;
    canvas.height = FRAME_SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, FRAME_SIZE, FRAME_SIZE);

    // Parchment fill behind window
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

      // Contain-fit so the FULL photo is visible inside the frame
      const baseScale = Math.min(WINDOW.w / photo.width, WINDOW.h / photo.height);
      const s = baseScale * photoScale;
      const drawW = photo.width * s;
      const drawH = photo.height * s;
      const cx = WINDOW.x + WINDOW.w / 2 + photoX;
      const cy = WINDOW.y + WINDOW.h / 2 + photoY;
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

    // Wizard hat (drawn over portrait, under frame so it sits inside the photo window)
    if (hatOn && hatImg) {
      const hatBase = 360; // base size in source px
      const w = hatBase * hatScale;
      const h = hatBase * hatScale;

      // Tint via offscreen canvas
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const octx = off.getContext("2d")!;
      octx.drawImage(hatImg, 0, 0, w, h);
      // Color tint
      octx.globalCompositeOperation = "source-atop";
      octx.fillStyle = hatColor;
      octx.globalAlpha = 0.7;
      octx.fillRect(0, 0, w, h);
      // Restore detail by overlaying the original at low opacity using multiply
      octx.globalCompositeOperation = "multiply";
      octx.globalAlpha = 0.55;
      octx.drawImage(hatImg, 0, 0, w, h);
      // Re-clip to hat alpha
      octx.globalCompositeOperation = "destination-in";
      octx.globalAlpha = 1;
      octx.drawImage(hatImg, 0, 0, w, h);

      ctx.save();
      // Clip hat to photo window so it doesn't escape onto the frame
      ctx.beginPath();
      ctx.rect(WINDOW.x, WINDOW.y, WINDOW.w, WINDOW.h);
      ctx.clip();
      ctx.translate(hatX, hatY);
      ctx.rotate((hatRot * Math.PI) / 180);
      ctx.drawImage(off, -w / 2, -h / 2, w, h);
      ctx.restore();
    }

    // Frame on top
    ctx.drawImage(frame, 0, 0, FRAME_SIZE, FRAME_SIZE);

    // "Girls Leading Tech" engraved into the bottom of the frame
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const plateY = FRAME_SIZE - 78;

    // Soft glow underlay
    ctx.shadowColor = "rgba(0,0,0,0.85)";
    ctx.shadowBlur = 6;
    ctx.font = "700 22px 'Cinzel', 'Times New Roman', serif";
    ctx.fillStyle = "rgba(212, 175, 55, 0.95)";
    ctx.fillText("GIRLS  LEADING  TECH", FRAME_SIZE / 2, plateY);

    ctx.shadowBlur = 0;
    ctx.font = "italic 12px 'Cinzel', 'Times New Roman', serif";
    ctx.fillStyle = "rgba(212, 175, 55, 0.7)";
    ctx.fillText("· Hogwartz Summer School ·", FRAME_SIZE / 2, plateY + 22);
    ctx.restore();
  }, [
    photo,
    frame,
    hatImg,
    hatOn,
    hatColor,
    hatScale,
    hatRot,
    hatX,
    hatY,
    photoScale,
    photoX,
    photoY,
  ]);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setPhoto(img);
      setPhotoScale(1);
      setPhotoX(0);
      setPhotoY(0);
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

  // Drag to reposition active layer
  const onPointerDown = (e: React.PointerEvent) => {
    if (activeLayer === "photo" && !photo) return;
    if (activeLayer === "hat" && !hatOn) return;
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      ox: activeLayer === "photo" ? photoX : hatX,
      oy: activeLayer === "photo" ? photoY : hatY,
    };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const ratio = FRAME_SIZE / rect.width;
    const dx = (e.clientX - dragStart.current.x) * ratio;
    const dy = (e.clientY - dragStart.current.y) * ratio;
    if (activeLayer === "photo") {
      setPhotoX(dragStart.current.ox + dx);
      setPhotoY(dragStart.current.oy + dy);
    } else {
      setHatX(dragStart.current.ox + dx);
      setHatY(dragStart.current.oy + dy);
    }
  };
  const onPointerUp = () => setDragging(false);

  const presetColors = [
    "#5b2a86", // wizard purple
    "#0e1a3a", // ravenclaw deep blue
    "#7a0d0d", // gryffindor red
    "#0c4a2b", // slytherin green
    "#d4af37", // gold
    "#1a1a1a", // black
    "#7c5e2a", // bronze
    "#b04a2f", // ember
  ];

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
            Upload a portrait, conjure a magical hat, and download a Hogwartz Summer
            School keepsake to share across the realms.
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
                (activeLayer === "photo" && photo) || (activeLayer === "hat" && hatOn)
                  ? "cursor-grab active:cursor-grabbing"
                  : "cursor-default"
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
                  <span className="font-display text-lg text-gold">
                    Tap to upload your portrait
                  </span>
                  <span className="text-xs text-muted-foreground">
                    or drag & drop a photo here
                  </span>
                </span>
              </button>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-5 rounded-2xl border border-[color:var(--gold)]/30 bg-background/60 p-6 backdrop-blur">
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
              <Upload className="h-4 w-4" />{" "}
              {photo ? "Choose a different photo" : "Upload a photo"}
            </button>

            {/* Layer toggle */}
            {hatOn && photo && (
              <div className="flex gap-2 rounded-full border border-white/10 bg-black/30 p-1 text-xs">
                {(["photo", "hat"] as Layer[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setActiveLayer(l)}
                    className={`flex-1 rounded-full px-3 py-1.5 capitalize transition ${
                      activeLayer === l
                        ? "bg-gradient-to-r from-[color:var(--gold)] to-[color:var(--ember)] text-[color:var(--primary-foreground)]"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    Editing {l}
                  </button>
                ))}
              </div>
            )}

            {/* Photo zoom */}
            <div className="space-y-2">
              <label className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <span>Photo zoom</span>
                <span className="text-gold">{photoScale.toFixed(2)}×</span>
              </label>
              <input
                type="range"
                min={0.5}
                max={3}
                step={0.01}
                value={photoScale}
                onChange={(e) => setPhotoScale(Number(e.target.value))}
                disabled={!photo}
                className="w-full accent-[color:var(--gold)] disabled:opacity-40"
              />
            </div>

            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Move className="h-3.5 w-3.5" /> Drag inside the frame to reposition the{" "}
              <span className="text-gold">{activeLayer}</span>.
            </p>

            {/* Hat section */}
            <div className="rounded-xl border border-[color:var(--gold)]/20 bg-black/30 p-4">
              <div className="flex items-center justify-between">
                <p className="font-display text-sm text-gold flex items-center gap-2">
                  <Wand2 className="h-4 w-4" /> Magical hat
                </p>
                {hatOn ? (
                  <button
                    onClick={() => setHatOn(false)}
                    className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground/80 hover:text-foreground"
                  >
                    <X className="h-3 w-3" /> Remove
                  </button>
                ) : (
                  <button
                    onClick={() => setHatOn(true)}
                    className="rounded-full border border-[color:var(--gold)]/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold hover:bg-[color:var(--gold)]/10"
                  >
                    + Add hat
                  </button>
                )}
              </div>

              {hatOn && (
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      Hat color
                    </label>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {presetColors.map((c) => (
                        <button
                          key={c}
                          onClick={() => setHatColor(c)}
                          aria-label={`Hat color ${c}`}
                          className={`h-7 w-7 rounded-full border transition ${
                            hatColor === c
                              ? "border-[color:var(--gold)] scale-110"
                              : "border-white/15 hover:border-white/40"
                          }`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                      <input
                        type="color"
                        value={hatColor}
                        onChange={(e) => setHatColor(e.target.value)}
                        className="h-7 w-10 cursor-pointer rounded border border-white/15 bg-transparent"
                        aria-label="Custom hat color"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      <span>Hat size</span>
                      <span className="text-gold">{hatScale.toFixed(2)}×</span>
                    </label>
                    <input
                      type="range"
                      min={0.4}
                      max={2.2}
                      step={0.01}
                      value={hatScale}
                      onChange={(e) => setHatScale(Number(e.target.value))}
                      className="w-full accent-[color:var(--gold)]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <RotateCw className="h-3 w-3" /> Tilt
                      </span>
                      <span className="text-gold">{hatRot}°</span>
                    </label>
                    <input
                      type="range"
                      min={-45}
                      max={45}
                      step={1}
                      value={hatRot}
                      onChange={(e) => setHatRot(Number(e.target.value))}
                      className="w-full accent-[color:var(--gold)]"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => {
                  setPhotoScale(1);
                  setPhotoX(0);
                  setPhotoY(0);
                  setHatScale(1);
                  setHatRot(-8);
                  setHatX(WINDOW.x + WINDOW.w / 2);
                  setHatY(WINDOW.y + 60);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs font-medium text-foreground/80 transition hover:border-white/40 hover:text-foreground"
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

            <div className="rounded-xl border border-[color:var(--gold)]/20 bg-black/30 p-4 text-xs text-foreground/70">
              <p className="font-display text-sm text-gold">A note from the headmistress</p>
              <p className="mt-1.5 leading-relaxed">
                Your photo is conjured entirely in your own browser — nothing is sent to
                our owls. Once downloaded, share it with{" "}
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
