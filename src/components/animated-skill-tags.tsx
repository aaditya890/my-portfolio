"use client"
import { motion } from "motion/react"

interface SkillTag {
  label: string
  color: string
  icon: string
}

const skillTags: SkillTag[] = [
  { label: "SaaS Webs", color: "from-orange-400 to-orange-500", icon: "🌐" },
  { label: "Web Design", color: "from-purple-400 to-purple-500", icon: "🎨" },
  { label: "Angular", color: "from-red-500 to-red-600", icon: "⚡" },
  { label: "Tailwind", color: "from-cyan-400 to-cyan-500", icon: "🎯" },
  { label: "Database", color: "from-green-400 to-green-500", icon: "💾" },
  { label: "Github", color: "from-gray-700 to-gray-800", icon: "🔗" },
  { label: "TypeScript", color: "from-blue-500 to-blue-600", icon: "📘" },
  { label: "JavaScript", color: "from-yellow-400 to-yellow-500", icon: "✨" },
  { label: "UI/UX", color: "from-indigo-400 to-indigo-500", icon: "🎭" },
  { label: "E-commerce", color: "from-emerald-400 to-emerald-500", icon: "🛍️" },
]

export default function AnimatedSkillTags() {
  return (
    <div className="w-full">
      {/* Mobile Layout - Grid */}
      <div className="md:hidden grid grid-cols-2 gap-3 w-full">
        {skillTags.map((tag, index) => (
          <motion.div
            key={tag.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className={`bg-gradient-to-br ${tag.color} rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{tag.icon}</span>
              <span className="text-white font-semibold text-sm">{tag.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop Layout - Scattered with rotation */}
      <div className="hidden md:block relative w-full h-96">
        {skillTags.map((tag, index) => {
          const randomRotation = (index * 15 - 67.5) % 360
          const randomX = (index * 37) % 100
          const randomY = (index * 23) % 80

          return (
            <motion.div
              key={tag.label}
              initial={{ opacity: 0, scale: 0.8, rotate: randomRotation - 20 }}
              animate={{ opacity: 1, scale: 1, rotate: randomRotation }}
              transition={{
                delay: index * 0.08,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ scale: 1.05, rotate: randomRotation + 5 }}
              className={`absolute bg-gradient-to-br ${tag.color} rounded-lg px-4 py-2 shadow-lg cursor-pointer`}
              style={{
                left: `${randomX}%`,
                top: `${randomY}%`,
                transform: `translate(-50%, -50%)`,
              }}
            >
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-lg">{tag.icon}</span>
                <span className="text-white font-bold text-sm">{tag.label}</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
