"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ThreadLoader from "../components/ThreadLoader";

export default function EnterStore() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleEnter = () => {
    setLoading(true);

    setTimeout(() => {
      router.push("/shop");
    }, 1200);
  };

  return (
    <>
      {loading && <ThreadLoader />}

      <section className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-black via-[#1a1a1a] to-black text-white">

        {/* Main Content */}

        <div className="flex flex-col items-center justify-center text-center px-6 flex-grow">

          {/* Heading */}

          <h2 className="text-3xl sm:text-5xl md:text-6xl tracking-[0.35em] font-light mb-10 leading-snug">
            ENTER THE WORLD OF
            <span className="block mt-4 text-[#e7d9b7] tracking-[0.45em]">
              SAGADHAGA
            </span>
          </h2>

          {/* Decorative line */}

          <div className="w-20 h-[1px] bg-[#e7d9b7] mb-10"></div>

          {/* Description */}

          <p className="max-w-xl text-neutral-300 text-sm sm:text-base leading-relaxed mb-12">
            Step into a curated universe of timeless textiles and handcrafted
            jewellery. Every piece tells a story of heritage, artistry and
            elegance.
          </p>

          {/* Button */}

          <button
            onClick={handleEnter}
            className="relative px-10 py-4 border border-[#e7d9b7] text-[#e7d9b7] tracking-[0.3em] text-sm sm:text-base transition-all duration-300 hover:bg-[#e7d9b7] hover:text-black"
          >
            ENTER STORE
          </button>

        </div>

        {/* Footer */}

        <footer className="bg-[#f6f1e9] border-t border-[#e8e2d8] pt-12 pb-8 px-6">

<div className="max-w-6xl mx-auto text-center">

  {/* Jaipur Heritage Sketch */}

  <div className="mb-8 flex justify-center">

    <svg
      width="320"
      height="70"
      viewBox="0 0 320 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-70"
    >
      {/* Hawa Mahal style arches */}

      <path
        d="M10 50 L40 30 L70 50 L100 25 L130 50 L160 20 L190 50 L220 30 L250 50 L280 35 L310 50"
        stroke="#b8a78f"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Base line */}

      <line
        x1="5"
        y1="55"
        x2="315"
        y2="55"
        stroke="#b8a78f"
        strokeWidth="1"
      />
    </svg>

  </div>

  {/* Tagline */}

  <p className="text-sm text-[#6b5f4d] mb-6 tracking-wide">
    Inspired by the timeless artistry of Jaipur
  </p>

  {/* Links */}

  <div className="flex flex-wrap justify-center gap-6 text-sm text-[#7a6f5d] mb-6">

    <a href="#" className="hover:text-black transition">
      Instagram
    </a>

    <a href="#" className="hover:text-black transition">
      Pinterest
    </a>

    <a href="#" className="hover:text-black transition">
      Contact
    </a>

    <a href="#" className="hover:text-black transition">
      Privacy
    </a>

  </div>

  {/* Copyright */}

  <p className="text-xs text-[#8d8374]">
    © {new Date().getFullYear()} Sagadhaaga — Jaipur, India
  </p>

</div>

</footer>

      </section>
    </>
  );
}