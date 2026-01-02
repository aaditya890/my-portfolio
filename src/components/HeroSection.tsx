"use client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Navbar } from "./NavbarSection"
import FooterSection from "./footer"

export default function HomePage() {
  const profileImages = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&q=80&w=1000",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&q=80&w=1000",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&q=80&w=1000",
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % profileImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [profileImages.length])

  return (

    <>
        <div className="relative w-full md:min-h-screen h-fit bg-[#F7F6F3] text-[#1a1a1a] overflow-hidden">

          <div
            className="absolute inset-0 opacity-[0.25] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(45deg, transparent 49%, #e1e1e1 49%, #e1e1e1 51%, transparent 51%),
                linear-gradient(-45deg, transparent 49%, #e1e1e1 49%, #e1e1e1 51%, transparent 51%)
              `,
              backgroundSize: "42px 42px",
            }}
          />
          <Navbar />

          {/* ---------------- HERO SECTION ---------------- */}
          <section className="relative flex flex-col justify-start items-center h-fit sm:pb-4 pb-10 sm:min-h-screen w-full overflow-hidden  pt-10 sm:pt-10">
            {/* Content Wrapper */}
            <div className="relative z-10 w-full max-w-7xl px-6 lg:px-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-20">
              {/* ---- LEFT: Intro Section ---- */}
              <div className="flex-1 text-left">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-sm sm:text-[15px] text-gray-700 mb-4 under  font-medium tracking-[0.08em]"
                >
                  Software Developer & Designer
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="font-extrabold leading-[0.9] text-[60px] sm:text-[92px] xl:text-[122px] text-[#111]"
                >
                  John <br /> Marker
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mt-4 max-w-lg text-[#4a4a4a] text-[16px] sm:text-[17px] leading-relaxed"
                >
                  Open to job opportunities worldwide. Passionate about building
                  polished, intuitive, and thoughtful digital experiences that leave a mark.
                </motion.p>

                {/* ---- CTA Buttons: Contact + GitHub with GIF Icons ---- */}
                <div className="mt-10 flex items-center gap-4">
                  {/* Contact Button */}
                  <motion.a
                    href="#contact"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.3 }}
                    className="inline-flex items-center gap-1 border border-[#111] text-[#111] px-6 py-2 rounded-full font-semibold hover:bg-[#111] hover:text-white transition text-sm"              >
                    <img
                      src="src/assets/contact-icon-gif.gif"
                      alt="Contact Icon"
                      className="w-9 h-9 rounded-full object-contain"
                    />
                    <span>CONTACT</span>
                  </motion.a>

                  {/* GitHub Button */}
                  <motion.a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.4 }}
                    className="inline-flex items-center gap-1 border border-[#111] hover:text-[#111] hover:bg-transparent px-6 py-2 rounded-full font-semibold bg-[#111] text-white transition text-sm"
                  >
                    <img
                      src="src/assets/github-icon-gif.gif"
                      alt="GitHub Icon"
                      className="w-8 h-8 rounded-full object-contain"
                    />
                    <span>GITHUB</span>
                  </motion.a>
                </div>
              </div>

              {/* ---- CENTER: Profile Image ---- */}
              <div className="hidden sm:flex flex-1 justify-center lg:justify-center">
                <div className="relative w-40 h-44 sm:w-48 sm:h-52 lg:w-60 lg:h-64 rounded-md overflow-hidden border border-gray-300 bg-gray-100 shadow-md">
                  {profileImages.map((src, index) => (
                    <motion.img
                      key={index}
                      src={src}
                      alt="Profile"
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: index === currentIndex ? 1 : 0,
                        y: index === currentIndex ? 0 : -20,
                      }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                  ))}
                </div>
              </div>

              {/* ---- RIGHT: Availability (desktop only) ---- */}
              <div className="hidden sm:flex flex-1 flex-col items-end justify-end text-right lg:self-end">
                <p className="text-[12px] tracking-[0.25em] text-[#6c6c6c] uppercase mb-1">
                  Available for <br /> Work
                </p>
                <h2 className="text-[38px] sm:text-[48px] lg:text-[60px] font-extrabold text-[#1a1a1a]">
                  JUN'25
                </h2>
              </div>
            </div>

            {/* ---- Mobile version for image + work side by side ---- */}
            <div className="relative z-10 w-full px-6 mt-8 flex justify-between items-center sm:hidden">
              <div className="relative w-40 h-40 rounded-md overflow-hidden border border-gray-300 bg-gray-100 shadow-md">
                {profileImages.map((src, index) => (
                  <motion.img
                    key={index}
                    src={src}
                    alt="Profile"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: index === currentIndex ? 1 : 0,
                      y: index === currentIndex ? 0 : -20,
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                ))}
              </div>

              <div className="text-right">
                <p className="text-[14px] tracking-[0.25em] text-[#6c6c6c] uppercase">
                  Available for <br /> Work
                </p>
                <h2 className="mt-1 text-[40px] font-extrabold text-[#1a1a1a]">
                  JUN'25
                </h2>
              </div>
            </div>
          </section>

        </div>
      <FooterSection />
    </>
  )
}
