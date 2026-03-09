import { create } from "zustand";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],

  addToCart: (item) =>
    set((state) => {
      const exists = state.cart.find((p) => p.id === item.id);

      if (exists) return state; // prevents duplicates

      return {
        cart: [...state.cart, item],
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
}));