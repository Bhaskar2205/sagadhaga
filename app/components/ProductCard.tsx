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
      <div className="relative h-90 w-full overflow-hidden">

        {/* Main image */}
        <div className="relative aspect-3/4 w-full overflow-hidden bg-[#f8f5f0]">

  <Image
    src={mainImage}
    alt={product.title}
    fill
    className="object-cover object-top transition duration-500 group-hover:opacity-0"
  />

  {hoverImage && (
    <Image
      src={hoverImage}
      alt={product.title}
      fill
      className="object-cover object-top absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
    />
  )}

</div>

        {/* Floating add to cart */}
        <button
          onClick={() =>
            addToCart({
              id: product.id,
              name: product.title,
              price: product.price,
              image: mainImage,
              variantId: product.variantId,
              quantity: 1, // ✅ FIXED ERROR
            })
          }
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black text-sm px-6 py-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition hover:bg-black hover:text-white"
        >
          Add to Cart
        </button>

      </div>

      {/* Product info */}
      <div className="px-6 py-7 text-center">

        {/* Title */}
        <h3 className="text-[15px] tracking-wide font-medium text-[#1f1f1f]">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-sm font-medium text-neutral-700 mt-2 leading-relaxed line-clamp-2">
          {product.description?.slice(0, 80)}...
        </p>

        {/* Tagline */}
        <p className="text-xs text-neutral-600 mt-2 tracking-wide">
          HANDCRAFTED BY SAGA DHAGA
        </p>

        {/* Price */}
        <p className="mt-4 text-lg font-semibold text-[#1a1a1a]">
          ₹ {product.price?.toLocaleString("en-IN")}
        </p>

        {/* Optional subtle divider */}
        <div className="w-6 h-px bg-neutral-300 mx-auto mt-3"></div>

      </div>

    </div>

  );
}