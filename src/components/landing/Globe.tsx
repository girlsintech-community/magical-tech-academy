import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export type GlobeMarker = {
  location: [number, number]; // [lat, lng]
  size: number;
};

export function Globe({ markers, size = 600 }: { markers: GlobeMarker[]; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const pointerInteracting = useRef<number | null>(null);
  const pointerDelta = useRef(0);

  useEffect(() => {
    let width = 0;
    const onResize = () => {
      if (canvasRef.current) width = canvasRef.current.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.25, 0.22, 0.3],
      markerColor: [255 / 255, 196 / 255, 92 / 255],
      glowColor: [1, 0.75, 0.35],
      markers: markers.map((m) => ({ location: m.location, size: m.size })),
    });

    let raf = 0;
    const tick = () => {
      if (pointerInteracting.current === null) phiRef.current += 0.003;
      globe.update({
        phi: phiRef.current + pointerDelta.current,
        width: width * 2,
        height: width * 2,
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [markers]);


  return (
    <div
      style={{ width: "100%", maxWidth: size, aspectRatio: "1" }}
      className="mx-auto"
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerDelta.current * 100;
          (e.target as HTMLCanvasElement).style.cursor = "grabbing";
        }}
        onPointerUp={(e) => {
          pointerInteracting.current = null;
          (e.target as HTMLCanvasElement).style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerDelta.current = delta / 100;
          }
        }}
        style={{ width: "100%", height: "100%", cursor: "grab", contain: "layout paint size" }}
      />
    </div>
  );
}
