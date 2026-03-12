"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function MobileHero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#f5efe6]">

      <Image
        src="/interior.jpg"
        alt="Sagadhaga Interior"
        fill
        priority
        className="object-cover brightness-95 contrast-110"
      />

      <div className="absolute inset-0 bg-[#f5efe6]/50"></div>

      <div className="absolute inset-0 opacity-[0.03] bg-[url('/grain.png')]"></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-[100svh]">

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[11px] tracking-[0.45em] text-[#6f5c4e] mb-6"
        >
          LUXURY HOME TEXTILES
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-6 text-3xl font-light text-[#3b3028]"
        >
          <span className="tracking-[0.25em]">SAGA</span>
          <span className="tracking-[0.25em]">DHAGA</span>
        </motion.h1>

        <div className="h-[1px] w-24 bg-[#b89a82] my-6"></div>

        <p className="text-[12px] tracking-[0.3em] text-[#6e5e52] mb-10">
          WHERE THREADS BECOME STORIES
        </p>

        <div className="flex flex-col gap-4 w-full max-w-[260px]">

          <Link href="/shop">
            <button className="w-full py-3 bg-[#b89a82] text-white rounded-full text-sm tracking-widest">
              SHOP COLLECTION
            </button>
          </Link>

          <button className="w-full py-3 border border-[#b89a82] text-[#6e5e52] rounded-full text-sm tracking-widest">
            EXPLORE
          </button>

        </div>

      </div>

    </section>
  );
}