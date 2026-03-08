"use client";

import { motion } from "framer-motion";

const cities = ["JAIPUR", "VARANASI", "KASHMIR", "KANCHIPURAM"];

export default function FabricWorld() {
  return (
    <section className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center px-10">

      <div className="text-center mb-20">
        <h2 className="text-5xl tracking-widest mb-6">
          FABRIC WORLDS
        </h2>

        <p className="text-neutral-400 max-w-xl mx-auto">
          The most iconic textile cities of India are coming together in one
          place. Their stories will unfold soon.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {cities.map((city, index) => (
          <motion.div
            key={city}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="border border-neutral-800 backdrop-blur px-14 py-16 text-center hover:border-white transition duration-500"
          >
            <p className="text-lg tracking-widest">{city}</p>

            <p className="text-xs text-neutral-500 mt-4">
              REVEALING SOON
            </p>
          </motion.div>
        ))}

      </div>

      <p className="text-neutral-500 text-sm mt-16 tracking-widest">
        THE JOURNEY OF THREADS BEGINS SOON
      </p>

    </section>
  );
}