"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface ParagraphProps {
  text: string
  delay?: number
  isMobile?: boolean
}

const AnimatedParagraph = ({ text, delay = 0, isMobile = false }: ParagraphProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.5 })

  const words = text.split(" ")

  const staggerDelay = isMobile ? 0.03 : 0.05

  return (
    <motion.p ref={ref} className="text-base md:text-xl leading-relaxed text-white/90 mb-8">
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            duration: 0.4,
            delay: delay + index * staggerDelay,
            ease: "easeOut",
          }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  )
}

export const AboutSection = () => {
  const containerRef = useRef(null)
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
    <section className="relative min-h-screen bg-black flex items-center justify-center py-20 overflow-hidden">
      {/* Decorative circle on top left */}
      <motion.div
        className="absolute top-0 left-0 w-40 h-40 border-2 border-white/10 rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      <div
        ref={containerRef}
        className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
      >
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {paragraphs.map((para, index) => (
            <AnimatedParagraph key={index} text={para.text} delay={para.delay} isMobile={true} />
          ))}
        </motion.div>

        {/* Image Content */}
        <motion.div
          className="relative h-80 md:h-full"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative h-full rounded-lg overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 from-red-600/30 to-orange-600/30 z-10" />
            <img
              src="/professional-portrait-person-coding.jpg"
              alt="About section profile"
              className="w-full h-full object-cover"
            />

            {/* Decorative circle on bottom right */}
            <motion.div
              className="absolute bottom-0 right-0 w-48 h-48 border-2 border-red-600/50 rounded-full"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
