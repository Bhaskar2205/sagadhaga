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
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50
        bg-white/95 backdrop-blur-md border border-neutral-200
        shadow-md rounded-full px-6 md:px-10 py-4
        w-[92%] md:w-auto"
      >

        <div className="flex items-center justify-between">

          {/* MOBILE MENU BUTTON */}

          <button
            className="md:hidden text-black"
            onClick={() => setMobileMenu(true)}
          >
            <Menu size={22} />
          </button>

          {/* DESKTOP MENU */}

          <ul className="hidden md:flex items-center gap-10 text-sm tracking-widest text-black">

            <li className="hover:text-neutral-500 transition cursor-pointer">
              CLOTHING
            </li>

            <li className="hover:text-neutral-500 transition cursor-pointer">
              JWELLERY
            </li>

            <li className="text-lg tracking-[0.35em] font-light hover:opacity-70 transition">
              <Link href="/">
                SAGADHAGA
              </Link>
            </li>

            <li className="hover:text-neutral-500 transition cursor-pointer">
              COLLECTIONS
            </li>

            <li className="hover:text-neutral-500 transition cursor-pointer">
              <Link href="/shop">
                STORE
              </Link>
            </li>

          </ul>

          {/* CART ICON */}

          <div
            className="relative cursor-pointer text-black"
            onClick={() => setOpenCart(true)}
          >

            <ShoppingBag size={20} />

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}

          </div>

        </div>

      </nav>

      {/* MOBILE MENU */}

      {mobileMenu && (

        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center gap-10">

          {/* CLOSE BUTTON */}

          <button
            className="absolute top-6 left-6 text-black"
            onClick={() => setMobileMenu(false)}
          >
            <X size={26} />
          </button>

          <Link
            href="/"
            className="text-lg tracking-widest text-black"
            onClick={() => setMobileMenu(false)}
          >
            SAGADHAGA
          </Link>

          <Link
            href="/"
            className="text-lg tracking-widest text-black"
            onClick={() => setMobileMenu(false)}
          >
            CLOTHING
          </Link>

          <Link
            href="/"
            className="text-lg tracking-widest text-black"
            onClick={() => setMobileMenu(false)}
          >
            JWELLERY
          </Link>

          <Link
            href="/"
            className="text-lg tracking-widest text-black"
            onClick={() => setMobileMenu(false)}
          >
            COLLECTIONS
          </Link>

          <Link
            href="/shop"
            className="text-lg tracking-widest text-black"
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