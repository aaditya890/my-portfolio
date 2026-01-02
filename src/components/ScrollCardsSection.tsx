"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const CARDS = [
  { id: 1, image: "/img/1.jpg", name: "Vedhika Anoora", role: "Google" },
  { id: 2, image: "/img/2.jpg", name: "Rushab Kataria", role: "Salesforce" },
  { id: 3, image: "/img/3.jpg", name: "Prajwal Kashyap", role: "Samsung" },
  { id: 4, image: "/img/4.jpg", name: "Vimalesh Mallya", role: "BOSCH" },
  { id: 5, image: "/img/5.jpg", name: "Anil Reddy", role: "Lollypop" },
  { id: 6, image: "/img/6.jpg", name: "Shanmugha", role: "Infosys" },
  { id: 7, image: "/img/7.jpg", name: "Someone", role: "Design Lead" },
  { id: 8, image: "/img/8.jpg", name: "Another", role: "UX Head" },
]

export default function ScrollCardsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh] bg-black"
    >
      {/* STICKY VIEWPORT */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="relative w-full h-full">
          {CARDS.map((card, index) => {
            const start = index / CARDS.length
            const end = (index + 1) / CARDS.length

            const x = useTransform(
              scrollYProgress,
              [start, end],
              ["100%", "-120%"]
            )

            const y =
              index % 2 === 0
                ? "20%"
                : "55%"

            return (
              <motion.div
                key={card.id}
                style={{ x }}
                className="absolute left-1/2"
              >
                <div
                  className="w-[280px] md:w-[340px] bg-[#111] rounded-3xl overflow-hidden shadow-2xl"
                  style={{ transform: "translateX(-50%)", marginTop: y }}
                >
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-[360px] object-cover grayscale"
                  />

                  <div className="p-4 text-white">
                    <p className="font-semibold">{card.name}</p>
                    <p className="text-sm text-zinc-400">{card.role}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
