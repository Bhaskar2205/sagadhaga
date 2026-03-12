"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const materials = [
  "Gold",
  "Silver",
  "Handcrafted",
  "Temple Design",
  "Traditional Stones",
  "Modern Minimal",
];

const images = [
  "/jewellery/j1.jpg",
  "/jewellery/j2.jpg",
  "/jewellery/j3.jpg",
  "/jewellery/j4.jpg",
  "/jewellery/j5.jpeg",
  "/jewellery/j6.jpeg",
];

export default function JewelleryStory() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      ref={ref}
      className="bg-[#f5efe6] min-h-screen flex items-center px-6 md:px-16 py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT – LUXURY MASONRY GALLERY */}

        <div className="grid grid-cols-2 gap-5 md:gap-6">

          {images.map((img, i) => {
            const isTall = i % 3 === 0;

            return (
              <motion.div
                key={i}
                style={{ y: i % 2 === 0 ? y1 : y2 }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative overflow-hidden rounded-2xl group 
                ${isTall ? "h-[260px] md:h-[340px]" : "h-[180px] md:h-[220px]"}`}
              >

                {/* IMAGE */}

                <Image
                  src={img}
                  alt="Sagadhaga Jewellery"
                  fill
                  className="object-cover transition duration-[1200ms] group-hover:scale-110"
                />

                {/* HOVER SPOTLIGHT */}

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 
                  transition duration-500 pointer-events-none
                  bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),transparent_60%)]"
                />

                {/* SPARKLE EFFECT */}

                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <span className="absolute top-6 left-6 w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                  <span className="absolute bottom-8 right-10 w-1 h-1 bg-white rounded-full animate-ping"></span>
                  <span className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full animate-ping"></span>
                </motion.div>

              </motion.div>
            );
          })}
        </div>

        {/* RIGHT – STORY */}

        <div className="max-w-xl">

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs tracking-[0.45em] text-[#8a7767] mb-6"
          >
            OUR JEWELLERY
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl tracking-[0.35em] text-[#3b3028] mb-8"
          >
            TIMELESS JEWELS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#6e5e52] leading-relaxed mb-12"
          >
            Our jewellery blends traditional craftsmanship with modern design.
            Each piece is shaped by skilled artisans using precious metals
            and natural stones, creating ornaments that reflect heritage,
            elegance, and contemporary luxury.
          </motion.p>

          {/* MATERIAL TAGS */}

          <div className="flex flex-wrap gap-3">

            {materials.map((m) => (
              <motion.span
                key={m}
                whileHover={{ y: -4 }}
                className="border border-[#d9c9bb] bg-white/50 backdrop-blur
                px-4 py-2 rounded-full text-sm text-[#6e5e52]
                hover:bg-[#efe4d8] transition"
              >
                {m}
              </motion.span>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}