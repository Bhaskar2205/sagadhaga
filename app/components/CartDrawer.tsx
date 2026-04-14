"use client";

import { useCartStore } from "../lib/cartStore";
import CartLineQtyControls from "./CartLineQtyControls";

type CartDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function CartDrawer({ open, setOpen }: CartDrawerProps) {
  const cart = useCartStore((state) => state.cart);

  const total = cart.reduce((sum, item) => {
    return sum + Number(item.price) * item.quantity;
  }, 0);

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
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[26rem] max-w-[100vw] bg-[#f7f4ef] z-100
        shadow-2xl transition-transform duration-500 ease-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center px-5 sm:px-8 py-6 border-b border-neutral-200">
          <h2 className="text-lg tracking-[0.2em] font-medium text-black">
            YOUR CART
          </h2>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-sm text-neutral-600 hover:text-black transition"
          >
            Close
          </button>
        </div>

        <div className="px-5 sm:px-8 py-6 space-y-6 overflow-y-auto h-[65%]">
          {cart.length === 0 && (
            <p className="text-neutral-500 text-sm">Your cart is empty</p>
          )}

          {cart.map((item) => (
            <div
              key={item.lineId}
              className="flex gap-4 items-start border-b border-neutral-200/80 pb-6 last:border-0 last:pb-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md shrink-0 bg-neutral-100"
              />

              <div className="flex-1 min-w-0 flex flex-col gap-3">
                <div className="flex justify-between gap-3 items-start">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-black">{item.name}</p>
                    <p className="text-sm text-neutral-700 mt-1">
                      ₹
                      {(Number(item.price) * item.quantity).toLocaleString(
                        "en-IN"
                      )}
                      {item.quantity > 1 ? (
                        <span className="text-xs text-neutral-500 ml-1">
                          ({Number(item.price).toLocaleString("en-IN")} each)
                        </span>
                      ) : null}
                    </p>
                  </div>

                  <CartLineQtyControls
                    line={{
                      lineId: item.lineId,
                      variantId: item.variantId,
                      quantity: item.quantity,
                    }}
                    addPayload={{
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                      variantId: item.variantId,
                      quantity: 1,
                    }}
                    className="items-end shrink-0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 w-full border-t border-neutral-200 px-5 sm:px-8 py-6 bg-[#f7f4ef]">
          <div className="flex justify-between mb-4">
            <span className="text-sm text-neutral-600 tracking-wide">
              Subtotal
            </span>

            <span className="font-medium text-black">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>

          <button
            type="button"
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
