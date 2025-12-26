"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Variants } from "framer-motion"

/* ────────────── Animations ────────────── */
const navContainer: Variants = {
  hidden: { opacity: 0, y: -12, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
}

const navItem: Variants = {
  hidden: { opacity: 0, y: -6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
}

const mobileDrawer: Variants = {
  hidden: { x: "100%", opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 28 },
  },
  exit: { x: "100%", opacity: 0 },
}

/* ────────────── Component ────────────── */
export const Navbar = ({
  profileImage = "src/assets/vector-profile-icon.svg",
  profileName = "Software Developer",
  profileRole = "Designer",
  links = ["Home", "Projects", "About", "Contact"],
  onNavigate = (link: string) => console.log(link),
}: {
  profileImage?: string
  profileName?: string
  profileRole?: string
  links?: string[]
  onNavigate?: (link: string) => void
} = {}) => {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-4 z-50 px-4">
      <motion.div
        variants={navContainer}
        initial="hidden"
        animate="show"
        className="
          relative flex items-center justify-between
          px-4 sm:px-6 py-2 max-w-4xl mx-auto
          rounded-full
          bg-white/60 backdrop-blur-xl
          border border-white/40
          shadow-sm
        "
      >
        {/* 🔹 LEFT: Profile Photo */}
        <motion.div variants={navItem} className="flex items-center">
          <button onClick={() => onNavigate("home")} className="focus:outline-none">
            <img
              src={profileImage || "/placeholder.svg"}
              alt="Profile"
              className="
                w-10 h-10 rounded-full object-cover
                ring-2 ring-white/60 shadow-md
              "
            />
          </button>
        </motion.div>

        {/* 🔹 DESKTOP NAV */}
        <nav className="hidden sm:flex items-center gap-8">
          {links.map((item) => (
            <motion.div key={item} variants={navItem}>
              <button
                onClick={() => onNavigate(item.toLowerCase())}
                className="
                  text-sm font-medium text-gray-700
                  hover:text-black transition
                "
              >
                {item}
              </button>
            </motion.div>
          ))}
        </nav>

        {/* 🔹 RIGHT SIDE */}
        <motion.div variants={navItem} className="flex items-center gap-3">
          {/* Desktop Action Button */}
          <button
            className="
              hidden sm:flex w-9 h-9 rounded-full
              border border-black/20
              text-sm font-semibold
              hover:bg-black hover:text-white
              transition
            "
          >
            h
          </button>

          {/* Mobile Hamburger (RIGHT) */}
          <button onClick={() => setOpen(true)} className="sm:hidden flex flex-col gap-1.5" aria-label="Open menu">
            <div className="hamburger">
              <input
                className="checkbox"
                type="checkbox"
                checked={open}
                onChange={(e) => setOpen(e.target.checked)}
                aria-hidden="true"
              />
              <svg fill="none" viewBox="0 0 50 50" height="40" width="40">
                <path
                  className="lineTop line"
                  strokeLinecap="round"
                  strokeWidth="4"
                  stroke="black"
                  d="M6 11L44 11"
                ></path>
                <path strokeLinecap="round" strokeWidth="4" stroke="black" d="M6 24H43" className="lineMid line"></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="4"
                  stroke="black"
                  d="M6 37H43"
                  className="lineBottom line"
                ></path>
              </svg>
            </div>
          </button>
        </motion.div>
      </motion.div>

      {/* ────────────── Mobile Drawer ────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Drawer from RIGHT */}
            <motion.div
              variants={mobileDrawer}
              initial="hidden"
              animate="show"
              exit="exit"
              className="
                fixed top-0 right-0 h-full w-[75%]
                bg-white/70 backdrop-blur-xl
                border-l border-white/40
                shadow-2xl z-50
                px-6 py-8
              "
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <img
                  src={profileImage || "/placeholder.svg"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white/60"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{profileName}</p>
                  <p className="text-xs text-gray-600">{profileRole}</p>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-6">
                {links.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      onNavigate(item.toLowerCase())
                      setOpen(false)
                    }}
                    className="
                      text-lg font-medium text-gray-800
                      hover:translate-x-1 transition
                      text-left
                    "
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
