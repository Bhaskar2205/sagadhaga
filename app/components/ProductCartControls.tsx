"use client";

import { ShoppingBag } from "lucide-react";
import { useTransition } from "react";
import { type AddToCartInput, useCartStore } from "../lib/cartStore";
import CartLineQtyControls from "./CartLineQtyControls";

type ProductCartControlsProps = {
  product: AddToCartInput;
  variantId: string;
  className?: string;
  /** Visual variant for different surfaces */
  variant?: "floating" | "shop";
};

export default function ProductCartControls({
  product,
  variantId,
  className = "",
  variant = "floating",
}: ProductCartControlsProps) {
  const cart = useCartStore((s) => s.cart);
  const addToCart = useCartStore((s) => s.addToCart);
  const [pending, startTransition] = useTransition();

  const line = cart.find((i) => i.variantId === variantId);

  const addLabel = variant === "shop" ? "ADD TO CART" : "Add to Cart";

  if (!variantId) {
    return (
      <div className={`text-xs text-neutral-500 ${className}`}>
        Unavailable
      </div>
    );
  }

  if (!line) {
    return (
      <div className={`flex flex-col items-center gap-1 ${className}`}>
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(() =>
              void addToCart({ ...product, variantId, quantity: 1 })
            )
          }
          className={
            variant === "shop"
              ? "bg-black text-white px-6 py-2 text-sm tracking-widest transition hover:bg-neutral-800 disabled:opacity-50"
              : "bg-black text-white text-sm px-6 py-2 rounded-full shadow-md transition active:scale-[0.98] md:bg-white md:text-black md:hover:bg-black md:hover:text-white disabled:opacity-50"
          }
        >
          <span className="inline-flex items-center gap-2">
            <ShoppingBag className="w-3.5 h-3.5 opacity-70" aria-hidden />
            {addLabel}
          </span>
        </button>
      </div>
    );
  }

  return (
    <CartLineQtyControls
      line={line}
      addPayload={product}
      showInCartLabel
      className={`items-center ${className}`}
    />
  );
}
