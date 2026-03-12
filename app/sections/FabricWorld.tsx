"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const fabrics = [
  {
    city: "JAIPUR",
    image: "/fabrics/Jaipur.png",
    description:
      "Jaipur is known for centuries-old hand block printing where artisans carve intricate wooden blocks and stamp patterns onto fabric.",
    sourcing:
      "Crafted in Rajasthan using natural dyes and traditional hand-block techniques.",
    materials: ["Cotton", "Natural Dyes", "Hand Block Printing"],
  },
  {
    city: "VARANASI",
    image: "/fabrics/Varanasi.jpg",
    description:
      "Varanasi silk is one of the most luxurious textiles in the world, woven with intricate patterns and gold zari threads.",
    sourcing:
      "Handwoven by master weavers along the ghats of Varanasi.",
    materials: ["Silk", "Gold Zari", "Handloom Weaving"],
  },
  {
    city: "KASHMIR",
    image: "/fabrics/Kashmir.jpg",
    description:
      "Kashmir fabrics are celebrated for their warmth and delicate embroidery inspired by Himalayan nature.",
    sourcing:
      "Created by Kashmiri artisans using centuries-old weaving traditions.",
    materials: ["Pashmina", "Wool", "Hand Embroidery"],
  },
  {
    city: "KANCHIPURAM",
    image: "/fabrics/Kanchipuram.jpg",
    description:
      "Kanchipuram silk is famous for temple motifs and vibrant weaving traditions from South India.",
    sourcing:
      "Handwoven in Tamil Nadu by generational weaving communities.",
    materials: ["Mulberry Silk", "Gold Zari", "Temple Weaving"],
  },
];

export default function FabricWorld() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const sectionIndex = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [0, 1, 2, 3]
  );

  return (
    <section ref={ref} className="relative h-[300vh] bg-[#f5efe6]">

      {/* Sticky container */}

      <div className="sticky top-0 h-screen flex">

        {/* LEFT IMAGE AREA */}

        <div className="relative w-1/2 h-screen overflow-hidden">

          {fabrics.map((fabric, i) => (

            <motion.div
              key={fabric.city}
              className="absolute inset-0"
              style={{
                opacity: useTransform(sectionIndex, (v) =>
                  Math.round(v) === i ? 1 : 0
                ),
              }}
            >

              <Image
                src={fabric.image}
                alt={fabric.city}
                fill
                priority
                className="object-cover"
              />

            </motion.div>

          ))}

        </div>

        {/* RIGHT TEXT AREA */}

        <div className="w-1/2 flex items-center justify-center px-12 md:px-20">

<div className="max-w-xl w-full min-h-[420px] relative">

  {fabrics.map((fabric, i) => (

    <motion.div
      key={fabric.city}
      style={{
        opacity: useTransform(sectionIndex, (v) =>
          Math.round(v) === i ? 1 : 0
        ),
        y: useTransform(sectionIndex, (v) =>
          Math.round(v) === i ? 0 : 30
        ),
      }}
      className="absolute inset-0 flex flex-col justify-center"
    >

      <h2 className="text-4xl md:text-5xl tracking-[0.35em] text-[#3b3028] mb-8">
        {fabric.city}
      </h2>

      <p className="text-[#6e5e52] leading-relaxed mb-6">
        {fabric.description}
      </p>

      <p className="text-[#7a6a5d] mb-8">
        <span className="font-semibold">Sourcing:</span>{" "}
        {fabric.sourcing}
      </p>

      <div className="flex flex-wrap gap-3">

        {fabric.materials.map((m) => (

          <span
            key={m}
            className="border border-[#d9c9bb] px-4 py-2 rounded-full text-sm text-[#6e5e52]"
          >
            {m}
          </span>

        ))}

      </div>

    </motion.div>

  ))}

</div>

</div>

      </div>

    </section>
  );
}