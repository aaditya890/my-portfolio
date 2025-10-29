"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";

export default function AboutSection() {
  const wrapRef = useRef<HTMLDivElement>(null);

  const PARAGRAPH =
    "I began my journey in web development at 18, driven by curiosity and a deep passion for building interactive digital experiences. Over the years, I’ve evolved into a versatile developer — blending expertise in UI/UX design and modern frameworks to craft high-performance single-page applications. As a Full-Stack Web and Software Developer, I focus on creating seamless, visually engaging, and efficient solutions that merge design with technology. I’m constantly exploring new tools and ideas to push creative and technical boundaries.";

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
    offset: ["start start", "end end"],
  });

  const [p, setP] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setP(v));
    return () => unsub();
  }, [scrollYProgress]);

  const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
  const total = words.length;
  const usable = 0.95;

  const getOpacity = (i: number) => {
    const start = (i / total) * usable;
    const end = ((i + 1) / total) * usable;
    const t = (p - start) / Math.max(0.0001, end - start);
    return clamp01(t);
  };

  const getY = (i: number) => {
    const o = getOpacity(i);
    return (1 - o) * 14;
  };

  return (
    <div ref={wrapRef} className="relative h-[250vh] bg-[#0c0c0c]">
      {/* Sticky section */}
      <div className="sticky top-0 h-screen overflow-visible">
        
        {/* 🔳 Smooth Top Shadow Gradient (transition from previous section) */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black via-black/90 to-transparent z-30 pointer-events-none" />

        {/* Ambient lighting effects */}
        <div className="pointer-events-none absolute left-10 top-24 h-80 w-80 rounded-full bg-blue-900/10 blur-3xl" />
        <div className="pointer-events-none absolute right-10 bottom-24 h-80 w-80 rounded-full bg-red-900/10 blur-3xl" />

        {/* Main Content */}
        <div className="relative z-10 mx-auto grid h-full max-w-6xl grid-cols-1 gap-10 px-6 pt-20 md:grid-cols-2 md:gap-16 md:px-10">
          
          {/* Text Section */}
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

          {/* Image Section */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-3xl from-red-500/20 via-transparent to-transparent blur-2xl" />
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

        {/* Fade out at the end */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[#0c0c0c]"
          style={{ opacity: clamp01((p - 0.98) / 0.02) }}
        />
      </div>
    </div>
  );
}
