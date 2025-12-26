"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const SOCIAL_LINKS = [
  { name: "Github", icon: "G", href: "#" },
  { name: "LinkedIn", icon: "in", href: "#" },
  { name: "X", icon: "𝕏", href: "#" },
  { name: "Contact", icon: "@", href: "#" },
]

const NAV_LINKS = [
  "HOME",
  "WORK",
  "AI ✦",
  "ACHIEVEMENTS",
  "WRITING",
  "ENGAGING",
  "MENTORING",
]

export default function FooterSection() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-50px" })

  return (
    <footer
      ref={containerRef}
      className="bg-black text-white py-12 px-6 md:px-12 border-t border-zinc-900"
    >
      <div className="max-w-6xl mx-auto">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">

          {/* LEFT CONTENT */}
          <motion.div
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-2xl text-zinc-300 md:text-3xl font-medium leading-tight max-w-sm">
              Feel free to hit me up. I'm looking forward to hearing from you.
            </h2>

            {/* SOCIAL ICONS — MOBILE BELOW EMAIL */}
            <div className="flex gap-6 mt-8 justify-start">
              {SOCIAL_LINKS.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-semibold text-zinc-300 hover:text-zinc-400 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 * idx, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            className="order-1 md:order-2 flex flex-col items-start md:items-end"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* 🐱 BILLi — MOBILE TOP */}
            <div className="w-full flex justify-start md:justify-end">
              <iframe
                src="https://lottie.host/embed/ac4fafe7-8154-4a9a-9e23-6ed3d4473a0f/QydhPlL3VL.lottie"
                className="w-40 h-40 border-0"
              />
            </div>

            {/* EMAIL */}
            <motion.a
              href="mailto:aadityamishra.dev@gmail.com"
              className="text-2xl font-medium text-zinc-300 hover:text-zinc-400 transition-colors border-b pb-1"
              whileHover={{ scale: 1.03 }}
            >
              aadityamishra.dev@gmail.com
            </motion.a>
          </motion.div>
        </div>

        {/* NAV LINKS — ALWAYS BOTTOM */}
        <motion.nav
          className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10 border-t border-zinc-900 pt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {NAV_LINKS.map((link) => (
            <motion.a
              key={link}
              href="#"
              className="text-xs md:text-sm font-bold tracking-widest text-zinc-300 hover:text-zinc-400 transition-colors"
              whileHover={{ y: -2 }}
            >
              {link}
            </motion.a>
          ))}
        </motion.nav>

        {/* FOOTER BOTTOM */}
        <motion.div
          className="text-center text-[10px] md:text-xs text-zinc-500 flex flex-col md:flex-row justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.5 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <span>Aaditya Mishra · Portfolio · Frontend / Full-Stack © 2026</span>
          <span className="hidden md:inline">·</span>
          <a href="#" className="hover:text-white transition-colors">
            Privacy policy
          </a>
        </motion.div>
      </div>
    </footer>
  )
}
