import type { CSSProperties } from "react";

const drops = Array.from({ length: 42 }, (_, index) => ({
  left: `${(index * 47) % 100}%`,
  delay: `${(index % 14) * 0.45}s`,
  duration: `${4.2 + (index % 8) * 0.85}s`,
  height: 14 + (index % 6) * 7,
  pink: index % 3 === 0,
}));

export function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <svg className="svg-defs" width="0" height="0">
        <filter id="cloud-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </svg>

      <div className="cloud-field">
        <Cloud className="cloud cloud-a" />
        <Cloud className="cloud cloud-b" />
        <Cloud className="cloud cloud-c" />
        <Cloud className="cloud cloud-d" />
      </div>

      <div className="rain">
        {drops.map((drop, index) => (
          <span
            key={index}
            className={drop.pink ? "drop drop-blue" : "drop"}
            style={{
              left: drop.left,
              height: drop.height,
              animationDelay: drop.delay,
              animationDuration: drop.duration,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Cloud({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 220 90" fill="none">
      <g filter="url(#cloud-soft)" fill="#ffffff">
        <ellipse cx="78" cy="52" rx="58" ry="24" />
        <ellipse cx="118" cy="40" rx="46" ry="28" />
        <ellipse cx="150" cy="52" rx="40" ry="20" />
        <ellipse cx="48" cy="56" rx="28" ry="16" />
      </g>
    </svg>
  );
}

export function StormStage() {
  return (
    <div className="storm-stage" aria-hidden="true">
      <div className="storm-cloud storm-cloud-1">
        <Cloud className="h-full w-full" />
      </div>
      <div className="storm-cloud storm-cloud-2">
        <Cloud className="h-full w-full" />
      </div>
      <div className="storm-cloud storm-cloud-3">
        <Cloud className="h-full w-full" />
      </div>
    </div>
  );
}

const waveImages = [
  { src: "waves/wave-long.webp", ratio: 1672 / 353 },
  { src: "waves/wave-mid.webp", ratio: 1501 / 360 },
  { src: "waves/wave-tall.webp", ratio: 692 / 360 },
] as const;

const oceanLayers = [
  { count: 4, height: 40, bottom: 44, duration: 74, tone: 0.62 },
  { count: 4, height: 52, bottom: 30, duration: 56, tone: 0.76 },
  { count: 4, height: 66, bottom: 16, duration: 41, tone: 0.9 },
  { count: 3, height: 82, bottom: -2, duration: 30, tone: 1 },
] as const;

function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

const oceanWaves = (() => {
  const random = seeded(20261009);
  return oceanLayers.flatMap((layer, depth) =>
    Array.from({ length: layer.count }, (_, index) => {
      const image = waveImages[Math.floor(random() * waveImages.length)];
      const duration = layer.duration * (0.82 + random() * 0.36);
      const slot = (index + random() * 0.6) / layer.count;
      return {
        key: `${depth}-${index}`,
        src: image.src,
        zIndex: depth * 10 + Math.floor(random() * 10),
        height: layer.height * (0.86 + random() * 0.28),
        bottom: layer.bottom + (random() - 0.5) * 8,
        duration,
        delay: -duration * slot,
        tone: layer.tone,
        rest: Math.round(slot * 100),
      };
    }),
  );
})();

export function Ocean() {
  return (
    <div className="ocean" aria-hidden="true">
      <div className="ocean-floor" />
      {oceanWaves.map((wave) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={wave.key}
          src={wave.src}
          alt=""
          className="ocean-wave"
          draggable={false}
          style={
            {
              zIndex: wave.zIndex,
              height: `${wave.height.toFixed(1)}%`,
              bottom: `${wave.bottom.toFixed(1)}%`,
              animationDuration: `${wave.duration.toFixed(1)}s`,
              animationDelay: `${wave.delay.toFixed(1)}s`,
              filter: wave.tone < 1 ? `brightness(${wave.tone})` : undefined,
              "--rest": `${wave.rest}%`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
