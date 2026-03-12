"use client";

import { motion } from "framer-motion";

const materials = [
  "Cotton",
  "Silk",
  "Pashmina",
  "Linen",
  "Handloom",
  "Natural Dyes",
  "Block Printing",
];

export default function CraftStory() {
  return (
    <section className="relative min-h-screen bg-[#e9dccf] flex items-center justify-center px-6 md:px-10 py-20 overflow-hidden">

      {/* THREAD WEAVING LINES */}

      <div className="absolute top-0 left-0 w-full h-32 md:h-40 overflow-hidden pointer-events-none">

        <motion.div
          initial={{ x: "-30%" }}
          animate={{ x: "30%" }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          className="absolute top-8 md:top-10 w-[220%] h-[2px] bg-[#bfae9c]"
        />

        <motion.div
          initial={{ x: "30%" }}
          animate={{ x: "-30%" }}
          transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
          className="absolute top-16 md:top-20 w-[220%] h-[2px] bg-[#cdbdad]"
        />

        <motion.div
          initial={{ x: "-20%" }}
          animate={{ x: "20%" }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="absolute top-24 md:top-32 w-[220%] h-[2px] bg-[#a8896e]"
        />

      </div>

      {/* MAIN CONTENT */}

      <div className="max-w-4xl text-center relative z-10">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl tracking-[0.35em] text-[#3b3028] mb-10 md:mb-12"
        >
          THE ART OF THREADS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-[#5f5146] leading-relaxed text-sm md:text-lg mb-12 md:mb-16 max-w-2xl mx-auto"
        >
          At SAGADHAGA, every fabric tells a story. Our textiles are crafted
          with precision, passion, and a deep appreciation for timeless
          design. From luxurious linens to elegant home décor pieces, we
          create fabrics that transform living spaces into experiences.
        </motion.p>

        {/* MATERIALS */}

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">

          {materials.map((m) => (
            <motion.span
              key={m}
              whileHover={{ y: -4 }}
              className="border border-[#d1c2b4] bg-white/50 backdrop-blur px-4 md:px-5 py-2 rounded-full text-xs md:text-sm text-[#5f5146] hover:bg-[#e4d6c7] transition"
            >
              {m}
            </motion.span>
          ))}

        </div>

      </div>

      {/* FABRIC LIGHT GLOW */}

      <div className="absolute bottom-[-120px] md:bottom-[-200px] left-1/2 -translate-x-1/2 w-[400px] md:w-[700px] h-[250px] md:h-[400px] bg-[#d8c4af] blur-[140px] md:blur-[180px] opacity-40"></div>

    </section>
  );
}