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

      <section className="min-h-screen flex flex-col justify-between bg-[#f6f1e9] text-[#2d2d2d]">

        {/* Main Content */}

        <div className="flex flex-col items-center justify-center text-center px-6 flex-grow">

          {/* Heading */}

          <h2 className="text-3xl sm:text-5xl md:text-6xl tracking-[0.35em] font-light mb-8 leading-snug">
            ENTER THE WORLD OF
            <span className="block mt-4 text-[#8c6f4e] tracking-[0.45em]">
              SAGADHAGA
            </span>
          </h2>

          {/* Decorative divider */}

          <div className="w-16 h-[1px] bg-[#c9b8a2] mb-10"></div>

          {/* Description */}

          <p className="max-w-xl text-[#6b5f4d] text-sm sm:text-base leading-relaxed mb-12">
            Step into a curated universe of timeless textiles and handcrafted
            jewellery inspired by heritage, craftsmanship and elegance.
          </p>

          {/* Button */}

          <button
            onClick={handleEnter}
            className="px-12 py-4 border border-[#8c6f4e] text-[#8c6f4e] tracking-[0.3em] text-sm sm:text-base transition-all duration-300 hover:bg-[#8c6f4e] hover:text-white"
          >
            ENTER STORE
          </button>

        </div>

        {/* Footer */}

        <footer className="border-t border-[#e5dccf] py-8 px-6">

          <div className="max-w-6xl mx-auto text-center">

            {/* Jaipur Sketch */}

            <svg
              viewBox="0 0 320 70"
              className="mx-auto mb-6 w-[260px] opacity-70"
              fill="none"
            >
              <path
                d="M10 50 L40 30 L70 50 L100 25 L130 50 L160 20 L190 50 L220 30 L250 50 L280 35 L310 50"
                stroke="#b8a78f"
                strokeWidth="1.4"
                strokeLinecap="round"
              />

              <line
                x1="5"
                y1="55"
                x2="315"
                y2="55"
                stroke="#b8a78f"
                strokeWidth="1"
              />
            </svg>

            <p className="text-sm text-[#6b5f4d] mb-4 tracking-wide">
              Inspired by the timeless artistry of Jaipur
            </p>

            <div className="flex justify-center gap-6 text-sm text-[#7a6f5d] mb-4">

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

            <p className="text-xs text-[#8d8374]">
              © {new Date().getFullYear()} Sagadhaaga — Jaipur, India
            </p>

          </div>

        </footer>

      </section>
    </>
  );
}