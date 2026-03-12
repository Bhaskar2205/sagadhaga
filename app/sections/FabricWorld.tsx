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

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  return (
    <section ref={ref} className="relative h-[320vh] bg-[#f5efe6]">

      {/* Scroll Progress Indicator */}
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="fixed right-6 top-0 h-full w-[2px] bg-[#cbb7a4] origin-top z-50"
      />

      <div className="sticky top-0 h-screen flex flex-col md:flex-row">

        {/* LEFT FABRIC IMAGE */}
        <div className="relative md:w-1/2 w-full h-[55vh] md:h-screen overflow-hidden">

          {fabrics.map((fabric, i) => (

            <motion.div
              key={fabric.city}
              className="absolute inset-0"
              style={{
                opacity: useTransform(sectionIndex, (v) =>
                  Math.round(v) === i ? 1 : 0
                ),
                scale: imageScale,
                y: imageY,
              }}
            >

              <Image
                src={fabric.image}
                alt={fabric.city}
                fill
                priority
                className="object-cover"
              />

              {/* luxury lighting overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-transparent"></div>

              {/* fabric texture glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_60%)]"></div>

            </motion.div>

          ))}

        </div>

        {/* RIGHT CONTENT */}
        <div className="md:w-1/2 w-full flex items-center justify-center px-10 md:px-20 py-16">

          <div className="max-w-xl w-full min-h-[420px] relative">

            {fabrics.map((fabric, i) => (

              <motion.div
                key={fabric.city}
                style={{
                  opacity: useTransform(sectionIndex, (v) =>
                    Math.round(v) === i ? 1 : 0
                  ),
                  y: useTransform(sectionIndex, (v) =>
                    Math.round(v) === i ? 0 : 50
                  ),
                }}
                className="absolute inset-0 flex flex-col justify-center"
              >

                {/* City Name */}
                <h2 className="text-4xl md:text-5xl tracking-[0.35em] text-[#3b3028] mb-8">
                  {fabric.city}
                </h2>

                {/* Description */}
                <p className="text-[#6e5e52] leading-relaxed mb-6">
                  {fabric.description}
                </p>

                {/* Sourcing */}
                <p className="text-[#7a6a5d] mb-8">
                  <span className="font-semibold">Sourcing:</span>{" "}
                  {fabric.sourcing}
                </p>

                {/* Materials */}
                <div className="flex flex-wrap gap-3">

                  {fabric.materials.map((m) => (

                    <span
                      key={m}
                      className="border border-[#d9c9bb] px-4 py-2 rounded-full text-sm text-[#6e5e52] hover:bg-[#efe4d8] transition"
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