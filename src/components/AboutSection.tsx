"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface ParagraphProps {
  text: string
  delay?: number
  isMobile?: boolean
}

/* ======================
   Animated Paragraph
   (Mobile safe)
====================== */
const AnimatedParagraph = ({ text, delay = 0, isMobile = false }: ParagraphProps) => {
  const ref = useRef<HTMLParagraphElement | null>(null)
  const isInView = useInView(ref, { once: false, amount: 0.4 })

  const words = text.split(" ")
  const staggerDelay = isMobile ? 0.02 : 0.04

  return (
    <motion.p
      ref={ref}
      className="
        text-base md:text-xl
        leading-relaxed
        text-white/90
        mb-8
        break-words
        overflow-hidden
      "
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{
            duration: 0.3,
            delay: delay + index * staggerDelay,
            ease: "easeOut",
          }}
          className="inline-block mr-1 whitespace-normal"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  )
}

/* ======================
   About Section
   (IMAGE HIDDEN ON MOBILE)
====================== */
export const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })

  const paragraphs: ParagraphProps[] = [
    {
      text: "I began my software development journey at the age of 18, working on real-world applications and building systems with a strong focus on structure, scalability, and code quality. Over the years, I have developed a disciplined engineering approach centered on reliability, performance, and long-term maintainability.",
      delay: 0,
    },
    {
      text: "I have strong hands-on experience with Angular, full-stack development, and cloud-based APIs, combined with a deep focus on UI and UX. I carefully design and engineer user-focused digital products, while continuously improving my skills to deliver clean, modern, and high-performance software solutions.",
      delay: 0.2,
    },
  ]

  return (
    <section
      className="
        relative
        bg-black
        py-16 md:py-18
        overflow-x-hidden
      "
    >
      {/* Decorative circle (desktop only) */}
      <motion.div
        className="
          absolute
          top-[-40px] left-[-40px]
          w-40 h-40
          border-2 border-white/10
          rounded-full
          hidden md:block
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div
        ref={containerRef}
        className="
          max-w-7xl mx-auto
          px-4 sm:px-6 md:px-12
          grid grid-cols-1 md:grid-cols-2
          gap-10 md:gap-12
          items-center
          overflow-x-hidden
        "
      >
        {/* TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="overflow-x-hidden"
        >
          {paragraphs.map((para, index) => (
            <AnimatedParagraph
              key={index}
              text={para.text}
              delay={para.delay}
              isMobile={true}
            />
          ))}
        </motion.div>

        {/* IMAGE CONTENT — DESKTOP ONLY */}
        <motion.div
          className="hidden md:block relative"
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative w-full h-[360px] rounded-lg overflow-hidden">

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 to-orange-600/30 z-10 pointer-events-none" />

            {/* Image */}
            <img
              src="/professional-portrait-person-coding.jpg"
              alt="About section profile"
              className="w-full h-full object-cover"
            />

            {/* Decorative circle */}
            <motion.div
              className="
                absolute
                bottom-[-40px] right-[-40px]
                w-40 h-40
                border-2 border-red-600/50
                rounded-full
              "
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
