"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "../lib/cartStore";
import CartDrawer from "./CartDrawer";

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const cart = useCartStore((state) => state.cart);

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
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50
        bg-white/90 backdrop-blur-lg border border-neutral-200
        shadow-md rounded-full px-10 py-4"
      >

        <ul className="flex items-center gap-8 md:gap-12 text-sm tracking-widest text-black">

          <li className="hover:text-neutral-500 transition cursor-pointer">
            FABRICS
          </li>

          <li className="hover:text-neutral-500 transition cursor-pointer">
            STORY
          </li>

          <li className="text-lg tracking-[0.35em] font-light">
  <Link href="/">
    SAGADHAGA
  </Link>
</li>

          <li className="hover:text-neutral-500 transition cursor-pointer">
            COLLECTIONS
          </li>

          <li className="hover:text-neutral-500 transition cursor-pointer">
            STORE
          </li>

          {/* Cart */}

          <li
            className="relative cursor-pointer"
            onClick={() => setOpenCart(true)}
          >

            <ShoppingBag size={20} />

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}

          </li>

        </ul>

      </nav>

      {/* Cart Drawer */}

      <CartDrawer open={openCart} setOpen={setOpenCart} />

    </>
  );
}