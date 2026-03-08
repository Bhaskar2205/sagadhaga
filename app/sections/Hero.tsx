"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-screen w-full bg-black text-white flex items-center justify-center relative overflow-hidden">

      {/* background glow */}
      <div className="absolute w-[800px] h-[800px] bg-white/5 blur-[200px] rounded-full"></div>

      <div className="text-center z-10">

        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-3xl sm:text-5xl md:text-7xl tracking-[0.4em] font-light"
        >
          SAGADHAGA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-sm tracking-[0.5em] text-neutral-400"
        >
          WHERE THREADS BECOME STORIES
        </motion.p>

      </div>

    </section>
  );
}