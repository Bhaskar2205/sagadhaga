"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function FounderStory() {
  return (
    <section className="relative bg-[#e9dccf] py-28 px-6 md:px-16 overflow-hidden">

      {/* subtle grain */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/grain.png')]"></div>

      {/* soft glow */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#d8c4af] blur-[180px] opacity-40"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">

        {/* LEFT – FOUNDER IMAGE */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative h-[420px] md:h-[520px] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.15)]"
        >

          <Image
            src="/founder.png"
            alt="Juhi Jainani - Founder of Sagadhaga"
            fill
            className="object-cover"
          />

          {/* image vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        </motion.div>

        {/* RIGHT – STORY */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >

          {/* label */}

          <p className="text-xs tracking-[0.45em] text-[#8a7767] mb-6">
            FOUNDER'S NOTE
          </p>

          {/* name */}

          <h2 className="text-4xl md:text-5xl tracking-[0.32em] text-[#3b3028] mb-3">
            JUHI JAINANI
          </h2>

          <p className="text-sm tracking-widest text-[#6e5e52] mb-8">
            Founder, SAGA DHAGA
          </p>

          {/* divider */}

          <div className="w-24 h-[1px] bg-[#b89a82] mb-8"></div>

          {/* story */}

          <p className="text-[#5f5146] leading-relaxed mb-6">
            SAGADHAGA was born from a deep admiration for the craft traditions
            hidden within the villages of India. The idea was simple — to bring
            authentic textiles and handcrafted designs from skilled artisans
            to modern living spaces.
          </p>

          <p className="text-[#5f5146] leading-relaxed mb-8">
            Our journey takes us deep into villages where weaving traditions
            have been preserved for generations. Every thread carries the
            legacy of artisans, and every design reflects culture,
            craftsmanship and timeless elegance.
          </p>

          {/* signature */}

          <div className="text-[#3b3028] tracking-[0.35em] text-sm">
            — JUHI JAINANI
          </div>

        </motion.div>

      </div>

    </section>
  );
}