import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const MUSIC_URL =
  "https://cdn.pixabay.com/audio/2022/10/30/audio_347111d654.mp3"; // royalty-free magical orchestral

export function SoundToggle() {
  const [on, setOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const a = new Audio(MUSIC_URL);
    a.loop = true;
    a.volume = 0.25;
    audioRef.current = a;
    return () => {
      a.pause();
      audioRef.current = null;
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
