"use client";

import { products } from "../lib/products";
import { useCartStore } from "../lib/cartStore";

export default function Shop() {

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="min-h-screen bg-white text-black px-6 md:px-16 py-32">

      <h1 className="text-4xl md:text-5xl tracking-[0.35em] text-center mb-24">
        THE TEXTILE STORE
      </h1>

      {/* PRODUCT GRID */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">

        {products.map((product) => (

          <div
            key={product.id}
            className="group relative cursor-pointer transition duration-500 hover:-translate-y-2"
          >

            {/* IMAGE */}

            <div className="overflow-hidden rounded-xl bg-neutral-100">

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[340px] object-cover
                group-hover:scale-110 transition duration-700"
              />

            </div>

            {/* ADD TO CART HOVER BUTTON */}

            <button
              onClick={() => addToCart(product)}
              className="absolute bottom-[110px] left-1/2 -translate-x-1/2
              opacity-0 group-hover:opacity-100
              bg-black text-white px-6 py-2 text-sm tracking-widest
              transition duration-300"
            >
              ADD TO CART
            </button>

            {/* PRODUCT INFO */}

            <div className="mt-6 space-y-1">

              <h2 className="text-lg tracking-wide">
                {product.name}
              </h2>

              <p className="text-sm text-neutral-500">
                {product.city}
              </p>

              <p className="font-medium mt-2">
                ₹{product.price}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}