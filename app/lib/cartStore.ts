import { create } from "zustand";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  variantId: string;
};

type CartStore = {
  cart: CartItem[];
  addToCart: (product: CartItem) => Promise<void>;
  removeFromCart: (id: string) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: [],

  addToCart: async (product) => {

    try {

      if (!product.variantId) {
        console.error("Variant ID missing", product);
        return;
      }

      let cartId = localStorage.getItem("cartId");

      // 1️⃣ Create cart if none exists
      if (!cartId) {

        const res = await fetch("/api/cart/create", {
          method: "POST",
        });

        const cart = await res.json();

        cartId = cart.id;

        localStorage.setItem("cartId", cart.id);
        localStorage.setItem("checkoutUrl", cart.checkoutUrl);

        console.log("Cart created:", cart);

      }

      // 2️⃣ Add item to Shopify cart
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cartId,
          variantId: product.variantId,
          quantity: 1,
        }),
      });

      const updatedCart = await res.json();

      console.log("Cart updated:", updatedCart);

      // 3️⃣ Save checkout URL again
      if (updatedCart.checkoutUrl) {
        localStorage.setItem("checkoutUrl", updatedCart.checkoutUrl);
      }

      // 4️⃣ Update local cart state
      set((state) => ({
        cart: [...state.cart, product],
      }));

    } catch (error) {

      console.error("Add to cart error:", error);

    }

  },

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
}));