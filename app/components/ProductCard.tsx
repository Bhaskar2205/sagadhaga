"use client";

import Image from "next/image";
import { useCartStore } from "../lib/cartStore";

export default function ProductCard({ product }: any) {

  const addToCart = useCartStore((state) => state.addToCart);

  const mainImage = product.images?.[0];
  const hoverImage = product.images?.[1];

  return (

    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-500">

      {/* Image area */}

      <div className="relative h-[360px] w-full overflow-hidden">

        {/* Main image */}

        <Image
          src={mainImage}
          alt={product.title}
          fill
          className="object-cover transition duration-500 group-hover:opacity-0"
        />

        {/* Hover image */}

        {hoverImage && (
          <Image
            src={hoverImage}
            alt={product.title}
            fill
            className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
          />
        )}

        {/* Floating add to cart */}

        <button
          onClick={() =>
            addToCart({
              id: product.id,
              name: product.title,
              price: product.price,
              image: mainImage,
              variantId: product.variantId,
            })
          }
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black text-sm px-6 py-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"
        >
          Add to Cart
        </button>

      </div>

      {/* Product info */}

      <div className="px-5 py-6 text-center">

      <h3 className="text-[15px] tracking-wide font-medium text-[#1f1f1f]">
                  {product.title}
        </h3>

        <p className="text-sm font-medium text-neutral-700 mt-2 leading-relaxed">
  {product.description?.slice(0, 80)}...
</p>

        <p className="text-xs text-neutral-600 mt-1">
                    HANDCRAFTED BY SAGA DHAGA
        </p>

        <p className="mt-2 text-sm font-semibold text-black">
                    ₹ {product.price}
        </p>

      </div>

    </div>

  );
}