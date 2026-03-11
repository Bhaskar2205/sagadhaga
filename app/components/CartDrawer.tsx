"use client";

import { useCartStore } from "../lib/cartStore";

type CartDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function CartDrawer({ open, setOpen }: CartDrawerProps) {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  // Fix total calculation
  const total = cart.reduce((sum, item) => {
    return sum + Number(item.price);
  }, 0);

  // Updated checkout
  const handleCheckout = () => {
    const checkoutUrl = localStorage.getItem("checkoutUrl");

    if (!checkoutUrl) {
      console.error("Checkout URL not found");
      return;
    }

    window.location.href = checkoutUrl;
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[420px] bg-[#f7f4ef] z-[100]
        shadow-2xl transition-transform duration-500 ease-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-neutral-200">
          <h2 className="text-lg tracking-[0.2em] font-medium text-black">
            YOUR CART
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="text-sm text-neutral-600 hover:text-black transition"
          >
            Close
          </button>
        </div>

        {/* Cart Items */}
        <div className="px-8 py-6 space-y-6 overflow-y-auto h-[65%]">
          {cart.length === 0 && (
            <p className="text-neutral-500 text-sm">Your cart is empty</p>
          )}

          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />

              <div className="flex-1">
                <p className="text-sm font-medium text-black">{item.name}</p>

                <p className="text-sm text-neutral-700 mt-1">
                  ₹{Number(item.price).toLocaleString("en-IN")}
                </p>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs text-neutral-500 hover:text-black mt-2 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full border-t border-neutral-200 px-8 py-6 bg-[#f7f4ef]">
          <div className="flex justify-between mb-4">
            <span className="text-sm text-neutral-600 tracking-wide">
              Subtotal
            </span>

            <span className="font-medium text-black">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-black text-white py-3 text-sm tracking-widest hover:bg-neutral-800 transition"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </>
  );
}