"use client";

import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "../lib/cartStore";
import CartDrawer from "./CartDrawer";

export default function Navbar() {

  const [mobileMenu, setMobileMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const cart = useCartStore((state) => state.cart);

  return (
    <>
      {/* NAVBAR */}

      <nav
        className="
        fixed top-6 left-1/2 -translate-x-1/2 z-50
        bg-white/70 backdrop-blur-xl
        border border-white/40
        shadow-[0_10px_40px_rgba(0,0,0,0.08)]
        rounded-full
        px-6 md:px-12 py-4
        w-[92%] md:w-auto
        transition hover:shadow-[0_12px_50px_rgba(0,0,0,0.12)]
        "
      >

        <div className="flex items-center justify-between gap-8">

          {/* MOBILE MENU BUTTON */}

          <button
            className="md:hidden text-[#3b3028]"
            onClick={() => setMobileMenu(true)}
          >
            <Menu size={22} />
          </button>

          {/* DESKTOP MENU */}

          <ul className="hidden md:flex items-center gap-12 text-sm tracking-widest text-[#3b3028]">

            <li className="relative group cursor-pointer">
              <Link href="/clothing">CLOTHING</Link>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#b89a82] transition-all group-hover:w-full"></span>
            </li>

            <li className="relative group cursor-pointer">
              <Link href="/jewellery">JEWELLERY</Link>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#b89a82] transition-all group-hover:w-full"></span>
            </li>

            {/* BRAND */}

            <li className="text-lg tracking-[0.35em] font-light hover:opacity-70 transition">
              <Link href="/">
                SAGA&nbsp;&nbsp;DHAGA
              </Link>
            </li>

            <li className="relative group cursor-pointer">
              <Link href="/collections">COLLECTIONS</Link>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#b89a82] transition-all group-hover:w-full"></span>
            </li>

            <li className="relative group cursor-pointer">
              <Link href="/shop">STORE</Link>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#b89a82] transition-all group-hover:w-full"></span>
            </li>

          </ul>

          {/* CART ICON */}

          <div
            className="relative cursor-pointer text-[#3b3028] hover:scale-105 transition"
            onClick={() => setOpenCart(true)}
          >

            <ShoppingBag size={20} />

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#3b3028] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}

          </div>

        </div>

      </nav>

      {/* MOBILE MENU */}

      {mobileMenu && (

        <div className="fixed inset-0 bg-[#f5efe6] z-50 flex flex-col items-center justify-center gap-10">

          {/* CLOSE BUTTON */}

          <button
            className="absolute top-6 left-6 text-[#3b3028]"
            onClick={() => setMobileMenu(false)}
          >
            <X size={26} />
          </button>

          <Link
            href="/"
            className="text-lg tracking-[0.35em] text-[#3b3028]"
            onClick={() => setMobileMenu(false)}
          >
            SAGA DHAGA
          </Link>

          <Link
            href="/clothing"
            className="text-lg tracking-widest text-[#3b3028]"
            onClick={() => setMobileMenu(false)}
          >
            CLOTHING
          </Link>

          <Link
            href="/jewellery"
            className="text-lg tracking-widest text-[#3b3028]"
            onClick={() => setMobileMenu(false)}
          >
            JEWELLERY
          </Link>

          <Link
            href="/collections"
            className="text-lg tracking-widest text-[#3b3028]"
            onClick={() => setMobileMenu(false)}
          >
            COLLECTIONS
          </Link>

          <Link
            href="/shop"
            className="text-lg tracking-widest text-[#3b3028]"
            onClick={() => setMobileMenu(false)}
          >
            STORE
          </Link>

        </div>

      )}

      {/* CART DRAWER */}

      <CartDrawer open={openCart} setOpen={setOpenCart} />

    </>
  );
}