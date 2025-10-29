"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";

export default function AboutSection() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // Pin container is tall (creates scroll room), inner stays sticky
  // h-[250vh] = ~2.5 screens of scroll; bump to 300 if you have long copy
  // IMPORTANT: no overflow-hidden on the tall wrapper.
  // The sticky child can have overflow-visible.
 const PARAGRAPH =
  "I started my journey in web development at 18, driven by curiosity and a deep love for creating things that feel alive on the web. Over time, I became passionate about TypeScript, UI/UX, and crafting high-performance single-page applications that merge design and technology. As a Full-Stack and Angular developer, I focus on delivering seamless, unique, and modern digital experiences while continuously learning and exploring new technologies to push creative boundaries.";

  const words = useMemo(
    () =>
      PARAGRAPH.split(" ").map((w) => ({
        text: w,
        isKey: /coding|design|typography|merged|beautiful|functional|engineering/i.test(
          w
        ),
      })),
    []
  );

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    // Full section progress from its top hitting the viewport to its bottom leaving
    offset: ["start start", "end end"],
  });

  // Read progress via onChange to compute per-word reveal
  const [p, setP] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setP(v));
    return () => unsub();
  }, [scrollYProgress]);

  // Utility with clamping
  const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

  const total = words.length;
  // Reserve a tiny tail (5%) so the last word can fully reach 1 before unpin
  const usable = 0.95;

  const getOpacity = (i: number) => {
    // Each word gets a small reveal window spread across usable progress
    const start = (i / total) * usable;
    const end = ((i + 1) / total) * usable;
    const t = (p - start) / Math.max(0.0001, end - start);
    return clamp01(t);
  };

  const getY = (i: number) => {
    const o = getOpacity(i);
    return (1 - o) * 14; // soft rise
  };

  return (
    <div
      ref={wrapRef}
      className="relative h-[250vh] bg-[#0c0c0c]"
      // DO NOT put overflow-hidden here; it will clip the reveal
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen overflow-visible">
        {/* Top soft blend so it doesn’t look like a hard seam with previous section */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/10 to-transparent" />
        {/* Ambient glows */}
        <div className="pointer-events-none absolute left-10 top-24 h-80 w-80 rounded-full bg-blue-900/10 blur-3xl" />
        <div className="pointer-events-none absolute right-10 bottom-24 h-80 w-80 rounded-full bg-red-900/10 blur-3xl" />

        {/* Content row */}
        <div className="relative z-10 mx-auto grid h-full max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-2 md:gap-16 md:px-10">
          {/* Text */}
          <div className="flex items-center">
  <div className="text-[15px] md:text-[17px] leading-[1.55] tracking-wide">
    <div className="flex flex-wrap gap-x-[6px] gap-y-[10px]">
      {words.map((w, i) => (
        <motion.span
          key={i}
          style={{
            opacity: getOpacity(i),
            y: getY(i),
          }}
          className={
            w.isKey ? "text-white font-semibold" : "text-gray-300"
          }
        >
          {w.text}
        </motion.span>
      ))}
    </div>
  </div>
</div>


          {/* Image / visual */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/20 via-transparent to-transparent blur-2xl" />
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl md:max-w-md">
              <img
                src="/professional-portrait-dark-theme.jpg"
                alt="Portrait"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/5" />
            </div>
          </div>
        </div>

        {/* Fade out when complete */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[#0c0c0c]"
          style={{ opacity: clamp01((p - 0.98) / 0.02) }} // quick fade at the very end
        />
      </div>
    </div>
  );
}
