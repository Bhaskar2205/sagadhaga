"use client";

import { products } from "../lib/products";
import { useCartStore } from "../lib/cartStore";


export default function Shop() {

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="min-h-screen bg-white text-black px-6 md:px-16 py-32">

      <h1 className="text-4xl md:text-5xl tracking-[0.3em] text-center mb-20">
        THE TEXTILE STORE
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">

        {products.map((product) => (

          <div key={product.id} className="group cursor-pointer">

            <div className="aspect-[4/3] overflow-hidden mb-6 rounded-sm">

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

            </div>

            <h2 className="text-lg tracking-wide font-medium">
              {product.name}
            </h2>

            <p className="text-sm text-neutral-500">
              {product.city}
            </p>

            <p className="mt-2 font-medium">
              ₹{product.price}
            </p>

            <button
              onClick={() =>
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image
                })
              }
              className="mt-4 text-sm border px-5 py-2 hover:bg-black hover:text-white transition"
            >
              Add to Cart
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}