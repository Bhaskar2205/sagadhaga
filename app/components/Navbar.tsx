"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const scroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", scroll);
    return () => window.removeEventListener("scroll", scroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 
        transition-all duration-500
        ${
          scrolled
            ? "bg-black/40 backdrop-blur-lg border border-neutral-800 rounded-full px-6 md:px-10 py-4"
            : "px-6 md:px-10 py-4"
        }`}
      >
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-12 text-sm tracking-widest text-white">

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

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-between w-[260px] text-white">

          <span className="tracking-[0.3em] text-sm">
            SAGADHAGA
          </span>

          <button
            onClick={() => setOpen(!open)}
            className="text-xl"
          >
            ☰
          </button>

        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-10 text-white text-xl tracking-widest">

          <button
            className="absolute top-8 right-8 text-2xl"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>

          <a className="hover:text-neutral-400">FABRICS</a>
          <a className="hover:text-neutral-400">STORY</a>
          <a className="hover:text-neutral-400">COLLECTIONS</a>
          <a className="hover:text-neutral-400">STORE</a>

        </div>
      )}
    </>
  );
}