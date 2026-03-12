"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#f5efe6]">

      {/* Background Image */}
      <Image
        src="/interior.jpg"
        alt="Sagadhaga Interior"
        fill
        priority
        className="object-cover brightness-95 contrast-110"
      />

      {/* Light beige overlay (reduced for realism) */}
      <div className="absolute inset-0 bg-[#f5efe6]/40"></div>

      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20"></div>

      {/* luxury sunlight glow */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-[#e6d5c5] blur-[140px] opacity-40 rounded-full"></div>

      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-[#d8c4af] blur-[140px] opacity-40 rounded-full"></div>

      {/* subtle sunlight from window */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#e7d5c3] blur-[180px] opacity-30"></div>

      {/* grain texture */}
      <div className="absolute inset-0 opacity-[0.035] bg-[url('/grain.png')]"></div>

      {/* hero content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">

        {/* soft blur plate behind text */}
        <div className="absolute w-[900px] h-[400px] bg-[#f5efe6]/60 blur-[120px]"></div>

        {/* small luxury label */}
        <motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.2 }}
  className="relative text-xs tracking-[0.55em] text-[#6f5c4e] mb-6 font-medium"
>
  LUXURY HOME TEXTILES
</motion.p>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative flex justify-center items-center gap-14 md:gap-20 text-5xl md:text-7xl font-light text-[#3b3028]"
        >
          <span className="tracking-[0.32em]">SAGA</span>
          <span className="tracking-[0.32em]">DHAGA</span>
        </motion.h1>

        {/* decorative divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "150px" }}
          transition={{ delay: 0.7, duration: 1 }}
          className="relative h-[1px] mt-8 bg-gradient-to-r from-transparent via-[#b89a82] to-transparent"
        />

        {/* tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="relative mt-8 text-sm tracking-[0.40em] text-[#6e5e52]"
        >
          WHERE THREADS BECOME STORIES
        </motion.p>

        {/* buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="relative mt-12 flex gap-6 flex-wrap justify-center"
        >
          <Link href="/shop">
  <button className="px-10 py-3 bg-[#b89a82] text-white rounded-full text-sm tracking-widest hover:bg-[#a9876f] transition shadow-md">
    SHOP COLLECTION
  </button>
</Link>

          <button className="px-10 py-3 border border-[#b89a82] text-[#6e5e52] rounded-full text-sm tracking-widest hover:bg-[#b89a82] hover:text-white transition">
            EXPLORE
          </button>
        </motion.div>

        {/* floating luxury badge */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute right-10 bottom-24 bg-white/80 backdrop-blur-md px-6 py-3 rounded-xl text-xs tracking-widest text-[#6e5e52] shadow-md"
        >
          NEW COLLECTION
        </motion.div>

      </div>

      {/* scroll indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#8a7566] text-xs tracking-[0.4em]"
      >
        SCROLL
      </motion.div>

    </section>
  );
}