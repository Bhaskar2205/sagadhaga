"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function MobileHero() {
  const sagaLetters = "SAGA".split("");
  const dhagaLetters = "DHAGA".split("");

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#f5efe6]">

      <Image
        src="/interior.jpg"
        alt="Sagadhaga Interior"
        fill
        priority
        className="object-cover object-[center_74%] brightness-95 contrast-110"
      />

      <div className="absolute inset-0 bg-[#f5efe6]/50"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20"></div>

      <div className="absolute inset-0 opacity-[0.03] bg-[url('/grain.png')]"></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-[100svh]">

        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.55, ease: "easeOut" }}
          className="relative mb-6 rounded-full bg-[#f6efe7]/62 px-4 py-1 text-[10px] font-semibold tracking-[0.4em] text-[#4a382d] backdrop-blur-sm"
        >
          LUXURY HOME TEXTILES
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative overflow-hidden rounded-[18px] border border-[#6d4a36]/35 bg-[#f6eee3]/38 px-7 py-5 backdrop-blur-[2px]"
        >
          {/* animated dashed box border */}
          <motion.span
            aria-hidden
            animate={{ backgroundPositionX: ["0px", "-34px"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute left-0 right-0 top-0 h-[3px]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, rgba(109,74,54,0.98) 0 18px, rgba(109,74,54,0.22) 18px 32px)",
            }}
          />
          <motion.span
            aria-hidden
            animate={{ backgroundPositionX: ["-34px", "0px"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-[3px]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, rgba(109,74,54,0.98) 0 18px, rgba(109,74,54,0.22) 18px 32px)",
            }}
          />
          <motion.span
            aria-hidden
            animate={{ backgroundPositionY: ["0px", "34px"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute bottom-0 left-0 top-0 w-[3px]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(109,74,54,0.98) 0 18px, rgba(109,74,54,0.22) 18px 32px)",
            }}
          />
          <motion.span
            aria-hidden
            animate={{ backgroundPositionY: ["34px", "0px"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute bottom-0 right-0 top-0 w-[3px]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(109,74,54,0.98) 0 18px, rgba(109,74,54,0.22) 18px 32px)",
            }}
          />
          <motion.span
            aria-hidden
            initial={{ x: "-110%", opacity: 0 }}
            animate={{ x: "110%", opacity: [0, 0.38, 0] }}
            transition={{ duration: 1.4, delay: 0.9, ease: "easeOut", repeat: Infinity, repeatDelay: 2.2 }}
            className="pointer-events-none absolute inset-y-0 left-0 w-[30%] bg-gradient-to-r from-transparent via-white/40 to-transparent blur-[1px]"
          />

          <h1 className="relative flex gap-5 text-[30px] font-normal text-[#2f251f]">
            <span className="relative inline-flex tracking-[0.22em]">
              {sagaLetters.map((letter, index) => (
                <motion.span
                  key={`saga-mobile-${letter}-${index}`}
                  initial={{ opacity: 0, x: -8, scale: 0.94 }}
                  animate={{
                    opacity: [0, 1, 1, 1],
                    x: [-8, 0, 0, 0],
                    scale: [0.94, 1, 1, 1],
                    textShadow: [
                      "0 0 0 rgba(255,255,255,0)",
                      "0 0 10px rgba(255,245,230,0.9)",
                      "0 0 2px rgba(255,245,230,0.2)",
                      "0 0 2px rgba(255,245,230,0.2)",
                    ],
                  }}
                  transition={{
                    duration: 2.2,
                    delay: 0.34 + index * 0.1,
                    ease: "easeOut",
                  }}
                  className="relative text-[#6d4a36]"
                >
                  <span aria-hidden className="absolute left-[1px] top-[2px] text-[#3f291d]/70">
                    {letter}
                  </span>
                  <span aria-hidden className="absolute left-[1px] top-[1px] text-[#f2e1d0]/70">
                    {letter}
                  </span>
                  <span className="relative [text-shadow:0_1px_0_#f1e0ce,0_2px_0_#dcbfa6,0_3px_0_#b89477,0_8px_14px_rgba(58,36,24,0.38)]">
                    {letter}
                  </span>
                </motion.span>
              ))}
            </span>
            <span className="relative inline-flex tracking-[0.22em]">
              {dhagaLetters.map((letter, index) => (
                <motion.span
                  key={`dhaga-mobile-${letter}-${index}`}
                  initial={{ opacity: 0, x: -8, scale: 0.94 }}
                  animate={{
                    opacity: [0, 1, 1, 1],
                    x: [-8, 0, 0, 0],
                    scale: [0.94, 1, 1, 1],
                    textShadow: [
                      "0 0 0 rgba(255,255,255,0)",
                      "0 0 10px rgba(255,245,230,0.9)",
                      "0 0 2px rgba(255,245,230,0.2)",
                      "0 0 2px rgba(255,245,230,0.2)",
                    ],
                  }}
                  transition={{
                    duration: 2.2,
                    delay: 0.84 + index * 0.1,
                    ease: "easeOut",
                  }}
                  className="relative text-[#6d4a36]"
                >
                  <span aria-hidden className="absolute left-[1px] top-[2px] text-[#3f291d]/70">
                    {letter}
                  </span>
                  <span aria-hidden className="absolute left-[1px] top-[1px] text-[#f2e1d0]/70">
                    {letter}
                  </span>
                  <span className="relative [text-shadow:0_1px_0_#f1e0ce,0_2px_0_#dcbfa6,0_3px_0_#b89477,0_8px_14px_rgba(58,36,24,0.38)]">
                    {letter}
                  </span>
                </motion.span>
              ))}
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.35, duration: 0.55, ease: "easeOut" }}
          className="relative mt-6 rounded-full bg-[#f6efe7]/58 px-4 py-1 text-[11px] font-medium tracking-[0.24em] text-[#4a382d] backdrop-blur-sm mb-9"
        >
          WHERE THREADS BECOME STORIES
        </motion.p>

        <div className="flex flex-col gap-4 w-full max-w-[260px]">

          <Link
            href="/shop"
            className="group relative w-full overflow-hidden rounded-full border border-[#d6b79b]/70 bg-gradient-to-r from-[#6d4a36] to-[#513527] py-3 text-center text-sm tracking-widest text-[#fff7ef] shadow-[0_14px_30px_rgba(53,34,22,0.35)] transition duration-300"
          >
            <motion.span
              aria-hidden
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0, 0.5, 0], scale: [1, 1.08, 1.16] }}
              transition={{ delay: 3.05, duration: 0.8, ease: "easeInOut" }}
              className="pointer-events-none absolute -inset-[4px] rounded-full border border-[#e8d6c4]/80"
            />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            <span className="relative">SHOP COLLECTION</span>
          </Link>

          <Link
            href="/collections"
            className="w-full rounded-full border border-[#c79f80]/80 bg-[#f8f1e7]/78 py-3 text-center text-sm tracking-widest text-[#5a4335] shadow-[0_10px_24px_rgba(95,66,45,0.14)] backdrop-blur-sm transition duration-300"
          >
            EXPLORE
          </Link>

        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 rounded-full bg-[#f6eee3]/68 px-3 py-1 text-[10px] font-medium tracking-[0.35em] text-[#4a382d] shadow-[0_8px_20px_rgba(44,30,22,0.16)] backdrop-blur-sm"
        >
          SCROLL
        </motion.div>

      </div>

    </section>
  );
}