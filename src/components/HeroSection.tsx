"use client"
import { motion } from "motion/react"
import PhysicsTags from "./physics-tags"

export default function HeroSection() {
  return (
    <div className="relative min-h-screen w-full bg-white text-gray-800 overflow-hidden flex flex-col justify-start">
      {/* ⚙️ Background Grid */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-95"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75,85,99,0.08) 19px, rgba(75,85,99,0.08) 20px),
            repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75,85,99,0.08) 19px, rgba(75,85,99,0.08) 20px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* 🧭 Navbar */}
      <div className="absolute top-3 left-0 w-full flex items-center justify-center z-50">
        <motion.nav
          className="flex items-center justify-center gap-2 px-8 py-3 bg-white/90 backdrop-blur-md rounded-full border border-gray-200/50 shadow-md"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
              M
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {["Profile", "Projects", "Services", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        </motion.nav>
      </div>

      {/* ✨ Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-start px-4 pt-[90px] md:pt-[100px] min-h-screen">
        {/* 🔹 Small clean gap added */}
        <motion.p
          className="text-gray-600 text-xs md:text-sm font-medium mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
           Hey! I’m <span className="font-semibold text-gray-800">Aaditya Mishra</span> 👋
        </motion.p>

        <motion.h1
          className="text-center text-3xl md:text-5xl font-black text-black leading-snug mb-5"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
           Fullstack Developer & Designer <br /> Specialized in Angular + UI/UX
        </motion.h1>

        {/* 🎯 Buttons */}
        <motion.div
          className="flex flex-row items-center justify-center gap-3 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            className="px-6 py-2.5 bg-orange-400 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all text-xs md:text-sm flex items-center gap-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
             ● Contact →
          </motion.button>

          <motion.button
            className="px-6 py-2.5 bg-gray-800 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all text-xs md:text-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Github
          </motion.button>
        </motion.div>

        {/* 🧠 Physics Tags */}
        <div className="absolute inset-0 flex justify-center items-center z-0">
          <PhysicsTags />
        </div>
      </div>
    </div>
  )
}
