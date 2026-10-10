"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const SVG_NS = "http://www.w3.org/2000/svg";
const CLOUD_W = 240;
const CLOUD_H = 110;

// Back-to-front paper stock for each cloud stack.
const SKY_STOCK = ["#2b3a5c", "#34466d", "#405380"];
const STORM_STOCK = ["#463f6c", "#4a5c89", "#6a7eac", "#a3b3d6"];
const BOLT_STOCK = ["#f21b51", "#ffcf6b", "#fff7e3"];

const drops = Array.from({ length: 42 }, (_, index) => ({
  left: `${(index * 47) % 100}%`,
  delay: `${(index % 14) * 0.45}s`,
  duration: `${4.2 + (index % 8) * 0.85}s`,
  height: 14 + (index % 6) * 7,
  pink: index % 3 === 0,
}));

function seeded(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const n = (value: number) => value.toFixed(1);

// Scalloped cut-paper outlines: back layers stand taller, front layers sit low and wide.
function cloudLayers(seed: number, count: number) {
  const random = seeded(seed);
  return Array.from({ length: count }, (_, k) => {
    const left = 8 + k * 10 + random() * 10;
    const right = CLOUD_W - 8 - k * 8 - random() * 10;
    const base = CLOUD_H - 12 + k * 3;
    const reach = (CLOUD_H - 18) * (1 - k * 0.17);
    const bumps = 3 + Math.floor(random() * 3);
    let d = `M${n(left)} ${n(base)}`;
    let px = left;
    let py = base;
    const arc = (x: number, y: number) => {
      const r = Math.hypot(x - px, y - py) * (0.56 + random() * 0.12);
      d += ` A${n(r)} ${n(r)} 0 0 1 ${n(x)} ${n(y)}`;
      px = x;
      py = y;
    };
    for (let i = 0; i < bumps; i++) {
      const t = (i + 0.5 + (random() - 0.5) * 0.45) / bumps;
      const lift = reach * (0.42 + 0.58 * Math.sin(Math.PI * t)) * (0.78 + random() * 0.3);
      arc(left + (right - left) * t, base - lift);
    }
    arc(right, base);
    d += ` Q${n((left + right) / 2)} ${n(base + 6)} ${n(left)} ${n(base)} Z`;
    return d;
  });
}

function PaperCloud({
  seed,
  stock,
  className,
}: {
  seed: number;
  stock: readonly string[];
  className: string;
}) {
  const layers = cloudLayers(seed, stock.length);
  const box = `0 0 ${CLOUD_W} ${CLOUD_H}`;
  return (
    <div className={`paper-cloud ${className}`}>
      <svg viewBox={box} className="paper-cloud-art">
        {layers.map((d, k) => (
          <path key={k} d={d} fill={stock[k]} filter="url(#paper-cut)" />
        ))}
      </svg>
      {/* Separate unfiltered sheet so flashes never re-rasterize the paper filter. */}
      <svg viewBox={box} className="paper-cloud-lit storm-lit">
        {layers.map((d, k) => (
          <path key={k} d={d} fill="url(#storm-lit-fade)" />
        ))}
      </svg>
    </div>
  );
}

function drift(el: Element) {
  const random = gsap.utils.random;
  gsap
    .to(el, {
      x: random(-90, 90),
      y: random(-16, 16),
      rotation: random(-1.6, 1.6),
      duration: random(14, 26),
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    })
    .progress(Math.random());
}

type Point = [number, number];

function zigzag(x: number, y: number, yEnd: number, steps: number, swing: number, lean = 0) {
  const random = gsap.utils.random;
  const points: Point[] = [[x, y]];
  let dir = Math.random() < 0.5 ? -1 : 1;
  for (let i = 1; i <= steps; i++) {
    y += ((yEnd - points[0][1]) / steps) * random(0.75, 1.25);
    x += dir * random(0.45, 1) * swing + lean;
    points.push([x, y]);
    if (Math.random() < 0.8) dir = -dir;
  }
  return points;
}

// Tapered strip with mitered joints, so diagonal runs keep their full thickness.
function ribbon(points: Point[], width: number) {
  const last = points.length - 1;
  const normal = (a: Point, b: Point): Point => {
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    return [-(b[1] - a[1]) / len, (b[0] - a[0]) / len];
  };
  const left: string[] = [];
  const right: string[] = [];
  for (let i = 0; i < last; i++) {
    const out = normal(points[i], points[i + 1]);
    const into = i > 0 ? normal(points[i - 1], points[i]) : out;
    let mx = out[0] + into[0];
    let my = out[1] + into[1];
    const ml = Math.hypot(mx, my) || 1;
    mx /= ml;
    my /= ml;
    const miter = Math.min(2.2, 1 / Math.max(0.2, mx * out[0] + my * out[1]));
    const half = ((width * (1 - (0.85 * i) / last)) / 2) * miter;
    const [x, y] = points[i];
    left.push(`${n(x + mx * half)},${n(y + my * half)}`);
    right.push(`${n(x - mx * half)},${n(y - my * half)}`);
  }
  const [tx, ty] = points[last];
  return [...left, `${n(tx)},${n(ty)}`, ...right.reverse()].join(" ");
}

function buildBolt(x: number, y0: number, y1: number, w: number, h: number) {
  const random = gsap.utils.random;
  const scale = Math.min(1.2, Math.max(0.7, w / 1200));
  const trunk = zigzag(x, y0, y1, Math.round(random(8, 12)), 46 * scale);
  const forks = Array.from({ length: Math.round(random(1, 2)) }, () => {
    const at = Math.round(random(2, trunk.length - 4));
    const [fx, fy] = trunk[at];
    const side = Math.random() < 0.5 ? -1 : 1;
    const steps = Math.round(random(3, 4));
    return {
      points: zigzag(fx, fy, fy + (y1 - y0) * random(0.2, 0.32), steps, 20 * scale, side * 22 * scale),
      width: 14 * scale * (1 - at / trunk.length),
    };
  });
  const strands = [{ points: trunk, width: 26 * scale }, ...forks];

  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("class", "bolt");
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  svg.setAttribute("preserveAspectRatio", "none");
  BOLT_STOCK.forEach((fill, k) => {
    for (const strand of strands) {
      const sheet = document.createElementNS(SVG_NS, "polygon");
      const width = strand.width * [1, 1, 0.42][k];
      const shift = k === 0 ? 5 * scale : 0;
      sheet.setAttribute("points", ribbon(strand.points.map(([px, py]) => [px + shift, py + shift * 0.6]), width));
      sheet.setAttribute("fill", fill);
      sheet.setAttribute("filter", "url(#paper-cut)");
      svg.appendChild(sheet);
    }
  });
  return svg;
}

// The ocean canvas (public/ocean.js) listens for this to light the boat's sails.
function signalFlash(strength: number) {
  window.dispatchEvent(new CustomEvent("storm:flash", { detail: { strength } }));
}

function litNear(x: number, y: number, radius: number, peak: number) {
  const sheets = Array.from(document.querySelectorAll<SVGElement>(".storm-lit"));
  const levels = sheets.map((sheet) => {
    const box = sheet.getBoundingClientRect();
    if (box.bottom < 0 || box.top > window.innerHeight) return 0;
    const d = Math.hypot(box.left + box.width / 2 - x, box.top + box.height / 2 - y);
    return peak * Math.max(0, 1 - d / radius);
  });
  return { sheets, levels };
}

export function Atmosphere() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const random = gsap.utils.random;
        const flash = root.current!.querySelector<HTMLElement>(".sky-flash")!;
        const glow = root.current!.querySelector<HTMLElement>(".heat-glow")!;
        const bolts = root.current!.querySelector<HTMLElement>(".bolt-layer")!;

        gsap.utils.toArray<Element>(".paper-cloud").forEach(drift);

        // Heat lightning: distant, soft pulses that backlight the paper clouds.
        const heat = () => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          const x = random(0.05, 0.95) * w;
          const y = random(0.04, 0.42) * h;
          const peak = random(0.5, 0.9);
          gsap.set(glow, {
            x,
            y,
            xPercent: -50,
            yPercent: -50,
            scale: random(0.7, 1.35),
            "--glow": Math.random() < 0.6 ? "255, 120, 168" : "255, 200, 130",
          });
          const pulse = gsap.timeline();
          pulse.to(glow, { opacity: peak, duration: 0.08, ease: "power1.in", overwrite: "auto" });
          if (Math.random() < 0.6) {
            pulse
              .to(glow, { opacity: peak * 0.2, duration: 0.12 })
              .to(glow, { opacity: peak * random(0.6, 1), duration: 0.07 });
          }
          pulse.to(glow, { opacity: 0, duration: random(0.8, 1.5), ease: "power2.out" });

          signalFlash(peak * 0.3);
          const { sheets, levels } = litNear(x, y, w * 0.4, peak * 0.55);
          gsap.to(sheets, { opacity: (i) => levels[i], duration: 0.1, overwrite: "auto" });
          gsap.to(sheets, { opacity: 0, duration: 1.1, delay: 0.25, ease: "power2.out" });

          gsap.delayedCall(random(1.8, 5.5), heat);
        };

        // Bolts: a cut-paper strike that tears down from the cloud deck.
        const strike = (echo: boolean, near?: Point) => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          // Tear out from behind a cloud near the top of the viewport when one is in view.
          const decks = Array.from(document.querySelectorAll(".storm-lit"))
            .map((sheet) => sheet.getBoundingClientRect())
            .filter((box) => box.bottom > 0 && box.top < h * 0.4 && box.right > 0 && box.left < w);
          const deck = decks.length ? gsap.utils.random(decks) : null;
          const x =
            near
              ? near[0] + random(-70, 70)
              : deck
                ? Math.min(w * 0.95, Math.max(w * 0.05, deck.left + deck.width * random(0.3, 0.7)))
                : random(0.08, 0.92) * w;
          const y0 = near ? near[1] : deck ? Math.max(0, deck.top + deck.height * 0.55) : random(0.06, 0.2) * h;
          const y1 = random(0.68, 0.92) * h;
          const bolt = buildBolt(x, y0, y1, w, h);
          bolts.appendChild(bolt);

          const strength = echo ? 0.6 : 1;
          const { sheets, levels } = litNear(x, y0, w * 0.75, 0.85 * strength);
          gsap.set(flash, { "--x": `${x}px` });

          const tl = gsap.timeline({ onComplete: () => bolt.remove() });
          tl.fromTo(
            bolt,
            { clipPath: `inset(0px 0px ${h - y0}px 0px)` },
            { clipPath: "inset(0px 0px 0px 0px)", duration: 0.12, ease: "power3.in" },
            0,
          )
            .to(flash, { opacity: 0.22 * strength, duration: 0.05, overwrite: "auto" }, 0.09)
            .to(flash, { opacity: 0.05, duration: 0.08 })
            .to(flash, { opacity: 0.15 * strength, duration: 0.05 })
            .to(flash, { opacity: 0, duration: 0.7, ease: "power2.out" })
            .to(sheets, { opacity: (i) => levels[i], duration: 0.06, overwrite: "auto" }, 0.09)
            .to(sheets, { opacity: 0, duration: 1, ease: "power2.out" }, 0.4)
            .call(signalFlash, [0.9 * strength], 0.09)
            .call(signalFlash, [0.6 * strength], 0.27)
            .to(bolt, { opacity: 0.3, duration: 0.05 }, 0.22)
            .to(bolt, { opacity: 1, duration: 0.04 })
            .to(bolt, { opacity: 0, duration: 0.45, ease: "power2.in" }, "+=0.14");

          if (!echo) {
            if (Math.random() < 0.3) gsap.delayedCall(random(0.35, 0.6), () => strike(true, [x, y0]));
            gsap.delayedCall(random(7, 15), () => strike(false));
          }
        };

        gsap.delayedCall(1.2, heat);
        gsap.delayedCall(3.5, () => strike(false));

        return () => bolts.replaceChildren();
      });
    },
    { scope: root },
  );

  return (
    <>
      <div ref={root} className="atmosphere" aria-hidden="true">
        <svg className="svg-defs" width="0" height="0">
          <defs>
            <filter
              id="paper-cut"
              x="-15%"
              y="-15%"
              width="130%"
              height="140%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="7" result="noise" />
              <feColorMatrix
                in="noise"
                type="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -0.4 0 0 0 0.24"
                result="grain"
              />
              <feComposite in="grain" in2="SourceAlpha" operator="in" result="speck" />
              <feDropShadow
                in="SourceGraphic"
                dx="-1.5"
                dy="3"
                stdDeviation="2.4"
                floodColor="#040e24"
                floodOpacity="0.45"
                result="lifted"
              />
              <feMerge>
                <feMergeNode in="lifted" />
                <feMergeNode in="speck" />
              </feMerge>
            </filter>
            <linearGradient id="storm-lit-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff4f7" stopOpacity="0.95" />
              <stop offset="0.55" stopColor="#ffd0dd" stopOpacity="0.3" />
              <stop offset="1" stopColor="#ffd0dd" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <div className="sky-flash" />
        <div className="heat-glow" />
        <div className="bolt-layer" />

        <div className="cloud-field">
          <PaperCloud seed={11} stock={SKY_STOCK} className="cloud cloud-a" />
          <PaperCloud seed={23} stock={SKY_STOCK} className="cloud cloud-b" />
          <PaperCloud seed={37} stock={SKY_STOCK} className="cloud cloud-c" />
          <PaperCloud seed={41} stock={SKY_STOCK} className="cloud cloud-d" />
        </div>
      </div>

      {/* Outside the atmosphere so it falls in front of the frosted section panels, down to the waves. */}
      <div className="rain" aria-hidden="true">
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
    </>
  );
}

export function StormStage() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<Element>(".paper-cloud").forEach(drift);
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="storm-stage" aria-hidden="true">
      <PaperCloud seed={5} stock={STORM_STOCK} className="storm-cloud storm-cloud-1" />
      <PaperCloud seed={17} stock={STORM_STOCK} className="storm-cloud storm-cloud-2" />
      <PaperCloud seed={29} stock={STORM_STOCK} className="storm-cloud storm-cloud-3" />
      <PaperCloud seed={53} stock={STORM_STOCK} className="storm-cloud storm-cloud-4" />
    </div>
  );
}
