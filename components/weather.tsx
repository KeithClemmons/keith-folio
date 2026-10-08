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
        <filter id="liquid" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.04"
            numOctaves="2"
            seed="3"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="10s"
              values="0.010 0.035;0.018 0.06;0.010 0.035"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="22"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
          />
        </filter>
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

export function WaterDivide() {
  return (
    <div className="water-divide" aria-hidden="true">
      <svg viewBox="0 0 1440 140" preserveAspectRatio="none">
        <path
          className="water-back"
          d="M0 70 C 180 110 320 20 520 60 C 760 110 900 20 1120 64 C 1280 96 1360 40 1440 58 L1440 140 L0 140 Z"
        />
        <path
          className="water-front"
          filter="url(#liquid)"
          d="M0 86 C 200 40 360 120 560 78 C 780 30 980 120 1200 74 C 1320 50 1380 90 1440 70 L1440 140 L0 140 Z"
        />
      </svg>
      <div className="puddle">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
