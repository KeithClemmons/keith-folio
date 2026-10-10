"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Room around the portrait for its float (±12px) and tilt, so no drop clips the frame.
const HOLE_PAD = 28;

const px = (value: number) => `${Math.round(value)}px`;

// Revealed once as they scroll in, a batch at a time so neighbours stagger together.
const REVEALS: Record<string, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
  // Headings and intros settle like a sheet laid down on the desk.
  rise: {
    from: { y: 34, rotation: -1.2, opacity: 0 },
    to: { y: 0, rotation: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.08 },
  },
  // Cards are dealt in, each from a slightly different angle.
  deal: {
    from: { y: 70, rotation: (i: number) => (i % 2 ? 2.4 : -2.4), opacity: 0 },
    to: { y: 0, rotation: 0, opacity: 1, duration: 0.9, ease: "back.out(1.3)", stagger: 0.12 },
  },
  slide: {
    from: { x: -48, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1 },
  },
  // Tool tags pop on like stuck-down paper labels.
  tag: {
    from: { scale: 0.6, rotation: () => gsap.utils.random(-9, 9), opacity: 0 },
    to: { scale: 1, rotation: 0, opacity: 1, duration: 0.55, ease: "back.out(2)", stagger: 0.04 },
  },
  quote: {
    from: { x: (i: number) => (i % 2 ? 56 : -56), rotation: (i: number) => (i % 2 ? 1.4 : -1.4), opacity: 0 },
    to: { x: 0, rotation: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.12 },
  },
  field: {
    from: { y: 26, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.08 },
  },
};

export function ScrollEffects() {
  useGSAP(() => {
    const hero = document.querySelector<HTMLElement>("#top");
    const work = document.querySelector<HTMLElement>("#work");
    if (!hero || !work) return;
    const header = document.querySelector<HTMLElement>("header");
    const ocean = document.querySelector<HTMLElement>(".ocean-canvas");
    const rain = document.querySelector<HTMLElement>(".rain");
    const portraits = Array.from(document.querySelectorAll<HTMLElement>(".portrait-frame"));

    // Stick below the header, or, when the hero is taller than the space above the
    // waves, stick once its bottom reaches them so nothing is covered unseen.
    const stick = () => {
      const room = window.innerHeight - (ocean?.offsetHeight ?? 0) - hero.offsetHeight;
      hero.style.setProperty("--hero-top", px(Math.min(header?.offsetHeight ?? 0, room)));
    };

    // Cut the rain mask around whichever portrait is showing, down to where Work covers it.
    let lastHole = "";
    const hole = () => {
      if (!rain) return;
      const frame = portraits.find((el) => el.offsetWidth > 0);
      const box = frame?.getBoundingClientRect();
      const top = box ? box.top - HOLE_PAD : 0;
      const bottom = box ? Math.min(box.bottom + HOLE_PAD, work.getBoundingClientRect().top) : 0;
      const next = box && bottom > top ? [box.left - HOLE_PAD, top, box.width + HOLE_PAD * 2, bottom - top] : [-9999, -9999, 0, 0];
      const key = next.map(Math.round).join();
      if (key === lastHole) return;
      lastHole = key;
      rain.style.setProperty("--hole-x", px(next[0]));
      rain.style.setProperty("--hole-y", px(next[1]));
      rain.style.setProperty("--hole-w", px(next[2]));
      rain.style.setProperty("--hole-h", px(next[3]));
    };

    let queued = 0;
    const queue = () => {
      if (!queued) queued = requestAnimationFrame(() => {
        queued = 0;
        hole();
      });
    };
    const relayout = () => {
      stick();
      queue();
    };
    const sizes = new ResizeObserver(relayout);
    sizes.observe(hero);
    if (header) sizes.observe(header);
    window.addEventListener("resize", relayout);
    window.addEventListener("scroll", queue, { passive: true });
    relayout();

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // The hero sinks back and dims as the Work sheet slides over it. The shade dims it
      // so the portrait never turns see-through; clamp() keeps both untouched until the
      // first scroll, even though Work already peeks in above the fold.
      const covering = { trigger: work, start: "clamp(top bottom)", end: "top top", scrub: true };
      gsap.to(".hero-inner", { scale: 0.94, ease: "none", scrollTrigger: { ...covering } });
      gsap.to(".hero-shade", { opacity: 0.65, ease: "none", scrollTrigger: { ...covering } });

      for (const [kind, { from, to }] of Object.entries(REVEALS)) {
        const targets = gsap.utils.toArray<HTMLElement>(`[data-reveal="${kind}"]`);
        if (!targets.length) continue;
        gsap.set(targets, from);
        ScrollTrigger.batch(targets, {
          start: "top 88%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { ...to, overwrite: true }),
        });
      }

      const fields = gsap.utils.toArray<HTMLElement>("#contact form > :not(.sr-only)");
      if (fields.length) {
        gsap.set(fields, REVEALS.field.from);
        ScrollTrigger.batch(fields, {
          start: "top 92%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { ...REVEALS.field.to, overwrite: true }),
        });
      }
    });

    return () => {
      sizes.disconnect();
      window.removeEventListener("resize", relayout);
      window.removeEventListener("scroll", queue);
      cancelAnimationFrame(queued);
    };
  });

  return null;
}
