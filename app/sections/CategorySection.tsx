"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { categories } from "../lib/categories"

export default function CategorySection() {
  return (
    <section className="py-32 px-6 bg-[#f8f5f2]">
      {/* Heading */}
      <div className="text-center mb-24">
        <p className="text-[12px] tracking-[0.6em] text-[#b7b1a9] mb-4">
          COLLECTION
        </p>
        <h2 className="text-3xl tracking-[0.3em] text-[#3d3d3d]">
          SHOP BY CATEGORY
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {categories.map((cat, i) => (
          <CategoryCard key={i} category={cat} />
        ))}
      </div>
    </section>
  )
}

/* ---------------- CARD ---------------- */

function CategoryCard({ category }: any) {
  const [isHovered, setIsHovered] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [brightness, setBrightness] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  const router = useRouter()

  /* ---------- MOBILE DETECTION ---------- */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  /* ---------- AUTO SLIDER ---------- */
  useEffect(() => {
    // Desktop → only on hover
    // Mobile → always run
    if (!isHovered && !isMobile) return

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % category.slides.length)
    }, 2200)

    return () => clearInterval(interval)
  }, [isHovered, isMobile, category.slides.length])

  const currentSlide = category.slides[activeSlide]

  /* ---------- BRIGHTNESS DETECTION ---------- */
  useEffect(() => {
    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.src = currentSlide.image

    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const data = ctx.getImageData(0, 0, img.width, img.height).data

      let r = 0,
        g = 0,
        b = 0

      for (let i = 0; i < data.length; i += 4) {
        r += data[i]
        g += data[i + 1]
        b += data[i + 2]
      }

      const totalPixels = data.length / 4
      r = r / totalPixels
      g = g / totalPixels
      b = b / totalPixels

      const avgBrightness = (r + g + b) / 3
      setBrightness(avgBrightness)
    }
  }, [currentSlide.image])

  /* ---------- DYNAMIC OVERLAY ---------- */
  const overlayStrength =
    brightness !== null
      ? brightness > 160
        ? "bg-black/60"
        : brightness > 100
        ? "bg-black/40"
        : "bg-black/20"
      : "bg-black/30"

  return (
    <div
      onMouseEnter={() => {
        if (!isMobile) {
          setIsHovered(true)
          setActiveSlide(0)
        }
      }}
      onMouseLeave={() => {
        if (!isMobile) setIsHovered(false)
      }}
      onClick={() => {
        // ✅ MOBILE: direct navigation
        if (isMobile) {
          router.push(currentSlide.slug)
        } else {
          // ✅ DESKTOP: only when hovered
          if (isHovered) router.push(currentSlide.slug)
        }
      }}
      className="relative h-[460px] rounded-[30px] overflow-hidden border border-[#e4ded7] bg-[#ece7e1] cursor-pointer group"
    >
      {/* IMAGE STACK (NO FLICKER) */}
      <div className="absolute inset-0">
        {category.slides.map((slide: any, idx: number) => (
          <motion.div
            key={slide.image}
            initial={false}
            animate={{
              opacity:
                (isHovered || isMobile) && idx === activeSlide ? 1 : 0,
            }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.name}
              fill
              className="object-cover"
              priority={idx === 0}
            />
          </motion.div>
        ))}
      </div>

      {/* SMART OVERLAY */}
      <div
        className={`absolute inset-0 ${overlayStrength} ${
          isHovered || isMobile ? "opacity-100" : "opacity-0"
        } transition duration-500`}
      />

      {/* MAIN TEXT */}
      <motion.div
        animate={{
          y: isHovered || isMobile ? -80 : 0,
          opacity: isHovered || isMobile ? 0.25 : 1,
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <h3 className="text-[22px] tracking-[0.35em] text-[#3d3d3d] 
        group-hover:text-white 
        transition duration-500 
        drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          {category.name.toUpperCase()}
        </h3>
      </motion.div>

      {/* SUB TEXT */}
      <motion.div
        key={currentSlide.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isHovered || isMobile ? 1 : 0,
          y: isHovered || isMobile ? 0 : 20,
        }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-12 left-10"
      >
        <p className="text-white text-xl tracking-wide 
        drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
          {currentSlide.name}
        </p>
      </motion.div>

      {/* DOTS */}
      <div className="absolute bottom-6 right-6 flex gap-2">
        {category.slides.map((_: any, idx: number) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full ${
              idx === activeSlide ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  )
}