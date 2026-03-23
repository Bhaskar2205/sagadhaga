"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const sagaLetters = "SAGA".split("");
  const dhagaLetters = "DHAGA".split("");

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#f5efe6]">

      {/* Background Image */}
      <Image
        src="/interior.jpg"
        alt="Sagadhaga Interior"
        fill
        priority
        className="object-cover object-[center_72%] brightness-95 contrast-110"
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
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">

        {/* soft blur plate behind text */}
        <div className="absolute w-[900px] h-[400px] bg-[#f5efe6]/60 blur-[120px]"></div>

        {/* small luxury label */}
        <motion.p
  initial={{ opacity: 0, y: -8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 2.15, duration: 0.6, ease: "easeOut" }}
  className="relative mb-8 rounded-full bg-[#f6efe7]/60 px-4 py-1 text-xs font-semibold tracking-[0.48em] text-[#4a382d] backdrop-blur-sm"
>
  LUXURY HOME TEXTILES
</motion.p>

        {/* Brand Name - soft 3D layered treatment */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="relative"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              boxShadow: [
                "0 0 0 rgba(109,74,54,0.12)",
                "0 0 22px rgba(109,74,54,0.24)",
                "0 0 0 rgba(109,74,54,0.12)",
              ],
            }}
            transition={{
              opacity: { duration: 0.7, delay: 0.6 },
              boxShadow: { duration: 4.4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="relative overflow-hidden rounded-[24px] border border-[#6d4a36]/35 bg-[#f6eee3]/38 px-14 py-8 backdrop-blur-[2px]"
          >
            {/* animated dashed box border */}
            <motion.span
              aria-hidden
              animate={{ backgroundPositionX: ["0px", "-34px"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute left-0 right-0 top-0 h-[4px]"
              style={{
                backgroundImage:
                    "repeating-linear-gradient(to right, rgba(109,74,54,0.98) 0 20px, rgba(109,74,54,0.22) 20px 34px)",
              }}
            />
            <motion.span
              aria-hidden
              animate={{ backgroundPositionX: ["-34px", "0px"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-[4px]"
              style={{
                backgroundImage:
                    "repeating-linear-gradient(to right, rgba(109,74,54,0.98) 0 20px, rgba(109,74,54,0.22) 20px 34px)",
              }}
            />
            <motion.span
              aria-hidden
              animate={{ backgroundPositionY: ["0px", "34px"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute bottom-0 left-0 top-0 w-[4px]"
              style={{
                backgroundImage:
                    "repeating-linear-gradient(to bottom, rgba(109,74,54,0.98) 0 20px, rgba(109,74,54,0.22) 20px 34px)",
              }}
            />
            <motion.span
              aria-hidden
              animate={{ backgroundPositionY: ["34px", "0px"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute bottom-0 right-0 top-0 w-[4px]"
              style={{
                backgroundImage:
                    "repeating-linear-gradient(to bottom, rgba(109,74,54,0.98) 0 20px, rgba(109,74,54,0.22) 20px 34px)",
              }}
            />
            <motion.span
              aria-hidden
              initial={{ x: "-110%", opacity: 0 }}
              animate={{ x: "110%", opacity: [0, 0.38, 0] }}
              transition={{ duration: 1.4, delay: 0.9, ease: "easeOut", repeat: Infinity, repeatDelay: 2.2 }}
              className="pointer-events-none absolute inset-y-0 left-0 w-[28%] bg-gradient-to-r from-transparent via-white/45 to-transparent blur-[1px]"
            />

            <h1 className="relative flex items-center justify-center gap-12 text-5xl font-normal text-[#2f251f] md:gap-20 md:text-7xl">
            <span className="relative inline-flex tracking-[0.3em]">
              {sagaLetters.map((letter, index) => (
                <motion.span
                  key={`saga-${letter}-${index}`}
                  initial={{ opacity: 0, x: -10, scale: 0.92 }}
                  animate={{
                    opacity: [0, 1, 1, 1],
                    x: [-10, 0, 0, 0],
                    scale: [0.92, 1, 1, 1],
                    textShadow: [
                      "0 0 0 rgba(255,255,255,0)",
                      "0 0 14px rgba(255,245,230,0.95)",
                      "0 0 2px rgba(255,245,230,0.2)",
                      "0 0 2px rgba(255,245,230,0.2)",
                    ],
                  }}
                  transition={{
                    duration: 2.6,
                    delay: 0.42 + index * 0.11,
                    ease: "easeOut",
                  }}
                  className="relative text-[#6d4a36]"
                >
                  <span
                    aria-hidden
                    className="absolute left-[2px] top-[3px] text-[#3f291d]/70 blur-[0.2px]"
                  >
                    {letter}
                  </span>
                  <span
                    aria-hidden
                    className="absolute left-[1px] top-[1px] text-[#f2e1d0]/80"
                  >
                    {letter}
                  </span>
                  <span className="relative [text-shadow:0_1px_0_#f1e0ce,0_2px_0_#dcbfa6,0_3px_0_#b89477,0_10px_18px_rgba(58,36,24,0.42)]">
                    {letter}
                  </span>
                </motion.span>
              ))}
            </span>
            <span className="relative inline-flex tracking-[0.3em]">
              {dhagaLetters.map((letter, index) => (
                <motion.span
                  key={`dhaga-${letter}-${index}`}
                  initial={{ opacity: 0, x: -10, scale: 0.92 }}
                  animate={{
                    opacity: [0, 1, 1, 1],
                    x: [-10, 0, 0, 0],
                    scale: [0.92, 1, 1, 1],
                    textShadow: [
                      "0 0 0 rgba(255,255,255,0)",
                      "0 0 14px rgba(255,245,230,0.95)",
                      "0 0 2px rgba(255,245,230,0.2)",
                      "0 0 2px rgba(255,245,230,0.2)",
                    ],
                  }}
                  transition={{
                    duration: 2.6,
                    delay: 1 + index * 0.11,
                    ease: "easeOut",
                  }}
                  className="relative text-[#6d4a36]"
                >
                  <span
                    aria-hidden
                    className="absolute left-[2px] top-[3px] text-[#3f291d]/70 blur-[0.2px]"
                  >
                    {letter}
                  </span>
                  <span
                    aria-hidden
                    className="absolute left-[1px] top-[1px] text-[#f2e1d0]/80"
                  >
                    {letter}
                  </span>
                  <span className="relative [text-shadow:0_1px_0_#f1e0ce,0_2px_0_#dcbfa6,0_3px_0_#b89477,0_10px_18px_rgba(58,36,24,0.42)]">
                    {letter}
                  </span>
                </motion.span>
              ))}
            </span>
            </h1>
          </motion.div>
        </motion.div>

        {/* tagline */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.55, duration: 0.6, ease: "easeOut" }}
          className="relative mt-8 rounded-full bg-[#f6efe7]/58 px-5 py-1 text-sm font-medium tracking-[0.34em] text-[#4a382d] backdrop-blur-sm"
        >
          WHERE THREADS BECOME STORIES
        </motion.p>

        {/* buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25 }}
          className="relative mt-12 flex flex-wrap justify-center gap-5"
        >
          <Link
            href="/shop"
            className="group relative overflow-hidden rounded-full border border-[#d6b79b]/70 bg-gradient-to-r from-[#6d4a36] to-[#513527] px-10 py-3 text-sm tracking-[0.2em] text-[#fff7ef] shadow-[0_14px_30px_rgba(53,34,22,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(53,34,22,0.42)]"
          >
            <motion.span
              aria-hidden
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0, 0.5, 0], scale: [1, 1.1, 1.18] }}
              transition={{ delay: 3.15, duration: 0.85, ease: "easeInOut" }}
              className="pointer-events-none absolute -inset-[4px] rounded-full border border-[#e8d6c4]/80"
            />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            <span className="relative">SHOP COLLECTION</span>
          </Link>

          <Link
            href="/collections"
            className="rounded-full border border-[#c79f80]/80 bg-[#f8f1e7]/78 px-10 py-3 text-sm tracking-[0.2em] text-[#5a4335] shadow-[0_10px_24px_rgba(95,66,45,0.14)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-[#b99578] hover:text-white hover:shadow-[0_16px_28px_rgba(95,66,45,0.24)]"
          >
            EXPLORE
          </Link>
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
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full bg-[#f6eee3]/68 px-4 py-1 text-xs font-medium tracking-[0.4em] text-[#4a382d] shadow-[0_8px_20px_rgba(44,30,22,0.16)] backdrop-blur-sm"
      >
        SCROLL
      </motion.div>

    </section>
  );
}