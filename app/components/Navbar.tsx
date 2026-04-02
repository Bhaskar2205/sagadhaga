"use client";

import { useState } from "react";
import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "../lib/cartStore";
import CartDrawer from "./CartDrawer";
import { CATEGORY_NAV } from "../lib/categoryTags";

type NavItem = {
  slug: string;
  label: string;
  children?: NavItem[];
};

function NestedAccordionLinks({
  items,
  rootSlug,
  onNavigate,
  depth = 0,
}: {
  items: NavItem[];
  rootSlug: string;
  onNavigate?: () => void;
  depth?: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) =>
        item.children?.length ? (
          <details key={item.slug} className="group">
            <summary
              className="list-none cursor-pointer text-xs tracking-wide text-[#3b3028]
              flex items-center justify-between gap-2"
            >
              <span>{item.label}</span>
              <ChevronDown className="w-3 h-3 transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-2 pl-3 border-l border-[#d8cec2]">
              <NestedAccordionLinks
                items={item.children}
                rootSlug={rootSlug}
                onNavigate={onNavigate}
                depth={depth + 1}
              />
            </div>
          </details>
        ) : (
          <Link
            key={item.slug}
            href={`/category/${rootSlug}?filter=${item.slug}`}
            onClick={onNavigate}
            className={`text-xs tracking-wide hover:text-[#8b6f56] transition ${
              depth > 0 ? "text-neutral-600" : "text-[#3b3028]"
            }`}
          >
            {item.label}
          </Link>
        )
      )}
    </div>
  );
}

export default function Navbar() {

  const [mobileMenu, setMobileMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const cart = useCartStore((state) => state.cart);

  return (
    <>
      <nav
        className="
        fixed top-6 left-1/2 -translate-x-1/2 z-50
        bg-white/70 backdrop-blur-xl
        border border-white/40
        shadow-[0_10px_40px_rgba(0,0,0,0.08)]
        rounded-full
        px-4 md:px-8 py-4
        w-[92%] md:w-auto md:max-w-[min(96vw,1200px)]
        transition hover:shadow-[0_12px_50px_rgba(0,0,0,0.12)]
        "
      >

        <div className="flex items-center justify-between gap-4 md:gap-6">

          <button
            type="button"
            className="md:hidden text-[#3b3028]"
            onClick={() => setMobileMenu(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <Link
            href="/"
            className="md:hidden text-xs tracking-[0.25em] text-[#3b3028] font-light shrink-0"
          >
            SAGA&nbsp;DHAGA
          </Link>

          <ul className="hidden md:flex items-center flex-wrap justify-center gap-x-4 gap-y-2 lg:gap-x-6 text-[10px] lg:text-xs tracking-widest text-[#3b3028]">

            <li className="text-lg tracking-[0.35em] font-light hover:opacity-70 transition">
              <Link href="/">
                SAGA&nbsp;&nbsp;DHAGA
              </Link>
            </li>

            {CATEGORY_NAV.map((item) => (
              <li key={item.slug} className="relative group">
                <Link
                  href={`/category/${item.slug}`}
                  className="inline-flex items-center gap-1 border-b border-transparent group-hover:border-[#b89a82] transition-colors pb-0.5"
                >
                  {item.label.toUpperCase()}
                  {item.children?.length ? <ChevronDown className="w-3 h-3" /> : null}
                </Link>
                {item.children && (
                  <div
                    className="absolute left-0 top-full pt-2 min-w-[260px] opacity-0 invisible
                    group-hover:opacity-100 group-hover:visible transition-all z-50"
                  >
                    <div className="rounded-xl border border-white/40 bg-white/95 backdrop-blur-md p-4 shadow-lg text-left">
                      <NestedAccordionLinks
                        items={item.children as NavItem[]}
                        rootSlug={item.slug}
                      />
                    </div>
                  </div>
                )}
              </li>
            ))}

            <li>
              <Link
                href="/shop"
                className="inline-block border-b border-transparent hover:border-[#b89a82] transition-colors pb-0.5"
              >
                STORE
              </Link>
            </li>

          </ul>

          <div
            className="relative cursor-pointer text-[#3b3028] hover:scale-105 transition"
            onClick={() => setOpenCart(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setOpenCart(true);
            }}
            aria-label="Open cart"
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

      {mobileMenu && (

        <div className="fixed inset-0 bg-[#f5efe6] z-50 flex flex-col items-stretch overflow-y-auto px-8 py-6">

          <div className="flex justify-between items-center mb-8">
            <button
              type="button"
              className="text-[#3b3028]"
              onClick={() => setMobileMenu(false)}
              aria-label="Close menu"
            >
              <X size={26} />
            </button>
            <Link
              href="/"
              className="text-sm tracking-[0.35em] text-[#3b3028]"
              onClick={() => setMobileMenu(false)}
            >
              SAGA DHAGA
            </Link>
            <span className="w-[26px]" />
          </div>

          <nav className="flex flex-col gap-6 text-[#3b3028]">
            {CATEGORY_NAV.map((item) => (
              <div key={item.slug} className="border-b border-[#c9b8a2]/40 pb-4">
                <Link
                  href={`/category/${item.slug}`}
                  className="text-sm tracking-[0.2em] font-medium block mb-2"
                  onClick={() => setMobileMenu(false)}
                >
                  {item.label.toUpperCase()}
                </Link>
                {item.children && (
                  <div className="pl-2 mt-2">
                    <NestedAccordionLinks
                      items={item.children as NavItem[]}
                      rootSlug={item.slug}
                      onNavigate={() => setMobileMenu(false)}
                    />
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/shop"
              className="text-sm tracking-[0.2em] pt-2"
              onClick={() => setMobileMenu(false)}
            >
              STORE
            </Link>
          </nav>

        </div>

      )}

      <CartDrawer open={openCart} setOpen={setOpenCart} />

    </>
  );
}
