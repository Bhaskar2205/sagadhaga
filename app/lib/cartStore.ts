import { create } from "zustand";

type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  variantId: string;
};

type CartStore = {
  cart: CartItem[];
  addToCart: (product: CartItem) => Promise<void>;
  removeFromCart: (id: string) => void;
  hydrateCart: () => Promise<void>;
};

/** Serialize mutations so parallel add-to-cart never creates multiple Shopify carts. */
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

        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.variantId === product.variantId
          );

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.variantId === product.variantId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            cart: [...state.cart, { ...product, quantity: 1 }],
          };
        });
      } catch (error) {
        console.error("Add to cart error:", error);
      }
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
}));
