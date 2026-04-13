import { create } from "zustand";
import {
  type AddToCartInput,
  type CartItem,
  normalizeShopifyCartLines,
} from "./shopifyCartFormat";

type CartStore = {
  cart: CartItem[];
  addToCart: (product: AddToCartInput) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  hydrateCart: () => Promise<void>;
};

/** Serialize mutations so cart create/add/remove never race each other. */
let cartMutationQueue: Promise<void> = Promise.resolve();

function runCartMutation<T>(fn: () => Promise<T>): Promise<T> {
  const result = cartMutationQueue.then(fn);
  cartMutationQueue = result.then(
    () => undefined,
    () => undefined
  );
  return result;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],

  hydrateCart: async () => {
    if (typeof window === "undefined") return;

    const cartId = localStorage.getItem("cartId");
    if (!cartId) {
      set({ cart: [] });
      return;
    }

    try {
      const res = await fetch(
        `/api/cart?cartId=${encodeURIComponent(cartId)}`
      );

      if (res.status === 404) {
        localStorage.removeItem("cartId");
        localStorage.removeItem("checkoutUrl");
        set({ cart: [] });
        return;
      }

      if (!res.ok) return;

      const data: { checkoutUrl?: string; items: CartItem[] } =
        await res.json();

      if (data.checkoutUrl) {
        localStorage.setItem("checkoutUrl", data.checkoutUrl);
      }

      set({ cart: data.items ?? [] });
    } catch {
      // keep existing UI state on transient failures
    }
  },

  addToCart: async (product) =>
    runCartMutation(async () => {
      try {
        if (!product.variantId) {
          console.error("Variant ID missing", product);
          return;
        }

        let cartId = localStorage.getItem("cartId");

        if (!cartId) {
          const res = await fetch("/api/cart/create", {
            method: "POST",
          });

          const cart = await res.json();

          cartId = cart.id;

          localStorage.setItem("cartId", cart.id);
          localStorage.setItem("checkoutUrl", cart.checkoutUrl);
        }

        const res = await fetch("/api/cart/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartId,
            variantId: product.variantId,
            quantity: 1,
          }),
        });

        const updatedCart = await res.json();

        if (updatedCart.checkoutUrl) {
          localStorage.setItem("checkoutUrl", updatedCart.checkoutUrl);
        }

        set({ cart: normalizeShopifyCartLines(updatedCart) });
      } catch (error) {
        console.error("Add to cart error:", error);
      }
    }),

  removeFromCart: (lineId) =>
    runCartMutation(async () => {
      const cartId = localStorage.getItem("cartId");
      if (!cartId || !lineId) {
        set((state) => ({
          cart: state.cart.filter((item) => item.lineId !== lineId),
        }));
        return;
      }

      try {
        const res = await fetch("/api/cart/remove", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartId, lineIds: [lineId] }),
        });

        if (res.status === 404) {
          localStorage.removeItem("cartId");
          localStorage.removeItem("checkoutUrl");
          set({ cart: [] });
          return;
        }

        if (!res.ok) return;

        const data: { checkoutUrl?: string; items: CartItem[] } =
          await res.json();

        if (data.checkoutUrl) {
          localStorage.setItem("checkoutUrl", data.checkoutUrl);
        }

        set({ cart: data.items ?? [] });
      } catch (error) {
        console.error("Remove from cart error:", error);
      }
    }),
}));

export type { CartItem, AddToCartInput } from "./shopifyCartFormat";
