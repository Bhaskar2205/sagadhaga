"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { type AddToCartInput, useCartStore } from "../lib/cartStore";
import type { CartItem } from "../lib/shopifyCartFormat";

type LineRef = Pick<CartItem, "lineId" | "variantId" | "quantity">;

type CartLineQtyControlsProps = {
  line: LineRef;
  addPayload: AddToCartInput;
  /** “In cart” label above the pill (product cards) */
  showInCartLabel?: boolean;
  className?: string;
};

export default function CartLineQtyControls({
  line,
  addPayload,
  showInCartLabel = false,
  className = "",
}: CartLineQtyControlsProps) {
  const setLineQuantity = useCartStore((s) => s.setLineQuantity);
  const addToCart = useCartStore((s) => s.addToCart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const [pending, startTransition] = useTransition();
  const [removePressed, setRemovePressed] = useState(false);

  const triggerRemove = () => {
    setRemovePressed(true);
    window.setTimeout(() => {
      startTransition(() => void removeFromCart(line.lineId));
      setRemovePressed(false);
    }, 120);
  };

  return (
    <div
      className={`flex flex-col gap-1.5 ${className}`}
      role="group"
      aria-label="Adjust quantity"
    >
      {showInCartLabel ? (
        <span className="text-[10px] tracking-[0.2em] text-neutral-600 uppercase text-center">
          In cart
        </span>
      ) : null}

      <div className="flex items-center gap-0.5 rounded-full bg-white/95 backdrop-blur-md px-1 py-1 shadow-md border border-black/10">
        <button
          type="button"
          disabled={pending}
          aria-label="Decrease quantity"
          onClick={() =>
            startTransition(() =>
              void setLineQuantity(line.lineId, line.quantity - 1)
            )
          }
          className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full text-black hover:bg-black hover:text-white transition disabled:opacity-40"
        >
          <Minus className="w-3.5 h-3.5" strokeWidth={2} />
        </button>

        <span className="min-w-[2ch] px-1 text-center text-sm font-semibold tabular-nums">
          {line.quantity}
        </span>

        <button
          type="button"
          disabled={pending}
          aria-label="Increase quantity"
          onClick={() =>
            startTransition(() =>
              void addToCart({
                ...addPayload,
                variantId: line.variantId,
                quantity: 1,
              })
            )
          }
          className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full text-black hover:bg-black hover:text-white transition disabled:opacity-40"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2} />
        </button>

        <span className="w-px h-5 bg-neutral-200 mx-0.5" aria-hidden />

        <button
          type="button"
          disabled={pending}
          aria-label="Remove from cart"
          onPointerDown={() => setRemovePressed(true)}
          onPointerUp={() => setRemovePressed(false)}
          onPointerLeave={() => setRemovePressed(false)}
          onPointerCancel={() => setRemovePressed(false)}
          onTouchStart={() => setRemovePressed(true)}
          onTouchEnd={() => setRemovePressed(false)}
          onTouchCancel={() => setRemovePressed(false)}
          onClick={triggerRemove}
          className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-full transition md:hover:bg-red-50 md:hover:text-red-700 disabled:opacity-40 ${
            removePressed
              ? "bg-red-50 text-red-700"
              : "text-neutral-500 active:bg-red-50 active:text-red-700"
          }`}
        >
          <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
