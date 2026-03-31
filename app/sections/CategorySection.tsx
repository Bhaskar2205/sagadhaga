"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { categories } from "../lib/categories"

export default function CategorySection() {
  const router = useRouter()

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

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {categories.map((cat, i) => (
          <CategoryCard key={i} category={cat} />
        ))}
      </div>
    </section>
  )
}

/* ---------------- CARD COMPONENT ---------------- */

function CategoryCard({ category }: any) {
  const [isHovered, setIsHovered] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (!isHovered) return

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % category.slides.length)
    }, 2200)

    return () => clearInterval(interval)
  }, [isHovered, category.slides.length])

  const currentSlide = category.slides[activeSlide]

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true)
        setActiveSlide(0)
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => isHovered && router.push(currentSlide.slug)}
      className="relative h-[460px] rounded-[30px] overflow-hidden border border-[#e4ded7] bg-[#ece7e1] cursor-pointer group"
    >
      {/* Background Image */}
      <motion.div
        key={currentSlide.image}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        <Image
          src={currentSlide.image}
          alt={currentSlide.name}
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-500" />

      {/* Main Category Name */}
      <motion.div
        animate={{
          y: isHovered ? -80 : 0,
          opacity: isHovered ? 0.25 : 1,
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <h3 className="text-[22px] tracking-[0.35em] text-[#3d3d3d] group-hover:text-white transition">
          {category.name.toUpperCase()}
        </h3>
      </motion.div>

      {/* Subcategory (Sliding Text) */}
      <motion.div
        key={currentSlide.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 20,
        }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-12 left-10"
      >
        <p className="text-white text-xl tracking-wide">
          {currentSlide.name}
        </p>
      </motion.div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 right-6 flex gap-2">
        {category.slides.map((_: any, idx: number) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full transition ${
              idx === activeSlide ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  )
}