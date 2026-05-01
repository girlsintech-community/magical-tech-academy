import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const MUSIC_URL = "/intro-music.mp3";

export function SoundToggle() {
  const [on, setOn] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const a = new Audio(MUSIC_URL);
    a.loop = true;
    a.volume = 0.25;
    audioRef.current = a;

    // Try to autoplay
    const tryPlay = () => {
      a.play()
        .then(() => setOn(true))
        .catch(() => setOn(false));
    };
    tryPlay();

    // If browser blocks autoplay, start on first user interaction
    const onFirstInteract = () => {
      if (a.paused) {
        a.play().then(() => setOn(true)).catch(() => {});
      }
      window.removeEventListener("pointerdown", onFirstInteract);
      window.removeEventListener("keydown", onFirstInteract);
    };
    window.addEventListener("pointerdown", onFirstInteract, { once: true });
    window.addEventListener("keydown", onFirstInteract, { once: true });

    return () => {
      a.pause();
      audioRef.current = null;
      window.removeEventListener("pointerdown", onFirstInteract);
      window.removeEventListener("keydown", onFirstInteract);
    };
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (on) {
      a.pause();
      setOn(false);
    } else {
      try {
        await a.play();
        setOn(true);
      } catch {
        /* autoplay blocked — ignore */
      }
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={on ? "Mute magical music" : "Play magical music"}
      className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full border border-[color:var(--gold)]/40 bg-background/70 text-gold shadow-[var(--shadow-glow)] backdrop-blur transition hover:scale-110"
    >
      {on ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </button>
  );
}
