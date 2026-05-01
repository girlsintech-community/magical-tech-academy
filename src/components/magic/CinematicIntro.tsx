import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkipForward, Volume2, VolumeX } from "lucide-react";

const BEATS = [
  "In a world where magic meets code…",
  "You have been chosen to apply for a 14-day journey at the Magical Virtual Tech Summer School.",
  "Only 200 young witches, wizards and builders will be admitted this year.",
  "Four houses await — each with its own gift.",
  "But first, you must prove your spark. Apply, complete your task, then receive your invitation.",
];

const VIDEO_URL = "/intro.webm";
const MUSIC_URL = "/intro-music.mp3";

export function CinematicIntro({ onFinish }: { onFinish: () => void }) {
  const [beat, setBeat] = useState(0);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const a = new Audio(MUSIC_URL);
    a.loop = true;
    a.volume = 0.55;
    audioRef.current = a;
    a.play().catch(() => {});
    return () => {
      a.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (beat < BEATS.length - 1) setBeat(beat + 1);
      else finish();
    }, 5200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beat]);

  const finish = () => {
    try {
      localStorage.setItem("hogwarts:intro:seen", "1");
    } catch {}
    onFinish();
  };

  const next = () => {
    if (beat < BEATS.length - 1) setBeat(beat + 1);
    else finish();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] overflow-hidden bg-black"
      onClick={next}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
      >
        <source src={VIDEO_URL} type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/85" />

      {/* Top controls */}
      <div className="absolute right-4 top-4 z-10 flex gap-3" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setMuted((m) => !m)}
          className="flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-black/60"
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          {muted ? "Unmute" : "Mute"}
        </button>
        <button
          onClick={finish}
          className="flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-black/60"
        >
          Skip Intro <SkipForward className="h-4 w-4" />
        </button>
      </div>

      {/* Story text */}
      <div className="absolute inset-x-0 bottom-[18%] flex flex-col items-center px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={beat}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display max-w-3xl text-2xl leading-relaxed text-[color:var(--parchment)] sm:text-3xl md:text-4xl"
            style={{ textShadow: "0 2px 30px rgba(0,0,0,0.95)" }}
          >
            {BEATS[beat]}
          </motion.p>
        </AnimatePresence>

        <div className="mt-8 flex gap-2">
          {BEATS.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all ${
                i <= beat ? "w-10 bg-gold" : "w-6 bg-white/30"
              }`}
            />
          ))}
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-white/60">
          Tap anywhere to continue
        </p>
      </div>
    </motion.div>
  );
}
