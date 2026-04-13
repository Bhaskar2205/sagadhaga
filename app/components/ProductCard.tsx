"use client";

import Image from "next/image";
import { useCartStore } from "../lib/cartStore";
import ProductCartControls from "./ProductCartControls";

export default function ProductCard({ product }: any) {
  const mainImage = product.images?.[0];
  const hoverImage = product.images?.[1];

  const inCartQty = useCartStore((s) => {
    const line = s.cart.find((i) => i.variantId === product.variantId);
    return line?.quantity ?? 0;
  });

  return (
    <div
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-500 ${
        inCartQty > 0 ? "ring-2 ring-[#b89a82]/50 ring-offset-2 ring-offset-[#f8f5f0]" : ""
      }`}
    >
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

        {/* Cart controls — show on hover; if in cart, stay slightly visible on mobile via group */}
        <div
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-10 transition duration-300 ${
            inCartQty > 0
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
          }`}
        >
          <ProductCartControls
            variant="floating"
            variantId={product.variantId}
            product={{
              id: product.id,
              name: product.title,
              price: product.price,
              image: mainImage,
              variantId: product.variantId,
              quantity: 1,
            }}
          />
        </div>
      </div>

      {/* Product info */}
      <div className="px-6 py-7 text-center">
        <h3 className="text-[15px] tracking-wide font-medium text-[#1f1f1f]">
          {product.title}
        </h3>

        <p className="text-sm font-medium text-neutral-700 mt-2 leading-relaxed line-clamp-2">
          {product.description?.slice(0, 80)}...
        </p>

        <p className="text-xs text-neutral-600 mt-2 tracking-wide">
          HANDCRAFTED BY SAGA DHAGA
        </p>

        <p className="mt-4 text-lg font-semibold text-[#1a1a1a]">
          ₹ {product.price?.toLocaleString("en-IN")}
        </p>

        <div className="w-6 h-px bg-neutral-300 mx-auto mt-3" />
      </div>
    </div>
  );
}
