"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const scroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", scroll);
    return () => window.removeEventListener("scroll", scroll);
  }, []);

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 
      transition-all duration-500
      ${
        scrolled
          ? "bg-black/40 backdrop-blur-lg border border-neutral-800 rounded-full px-10 py-4"
          : "px-10 py-4"
      }`}
    >
      <ul className="flex items-center gap-12 text-sm tracking-widest text-white">

        <li className="hover:text-neutral-400 transition cursor-pointer">
          FABRICS
        </li>

        <li className="hover:text-neutral-400 transition cursor-pointer">
          STORY
        </li>

        <li className="text-lg tracking-[0.4em] font-light">
          SAGADHAGA
        </li>

        <li className="hover:text-neutral-400 transition cursor-pointer">
          COLLECTIONS
        </li>

        <li className="hover:text-neutral-400 transition cursor-pointer">
          STORE
        </li>

      </ul>
    </nav>
  );
}