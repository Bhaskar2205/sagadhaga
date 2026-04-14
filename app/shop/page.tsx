"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "../lib/cartStore";
import ProductCartControls from "../components/ProductCartControls";

export default function Shop() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black px-6 md:px-16 py-32">
      <h1 className="text-4xl md:text-5xl tracking-[0.35em] text-center mb-24">
        THE TEXTILE STORE
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
        {products.map((product) => {
          const formattedProduct = {
            id: product.id,
            name: product.title,
            price: product.price,
            image: product.image,
            variantId: product.variantId,
            quantity: 1,
          };

          return (
            <ShopProductCard
              key={product.id}
              product={product}
              formattedProduct={formattedProduct}
            />
          );
        })}
      </div>
    </div>
  );
}

function ShopProductCard({
  product,
  formattedProduct,
}: {
  product: any;
  formattedProduct: {
    id: string;
    name: string;
    price: number;
    image: string;
    variantId: string;
    quantity: number;
  };
}) {
  const inCartQty = useCartStore((s) => {
    const line = s.cart.find((i) => i.variantId === product.variantId);
    return line?.quantity ?? 0;
  });

  return (
    <div
      className={`group relative cursor-pointer transition duration-500 hover:-translate-y-2 ${
        inCartQty > 0 ? "ring-2 ring-[#b89a82]/40 rounded-xl" : ""
      }`}
    >
      <div className="overflow-hidden rounded-xl bg-neutral-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[340px] object-cover group-hover:scale-110 transition duration-700"
        />
      </div>

      <div
        className={`absolute bottom-[110px] left-1/2 -translate-x-1/2 z-10 transition duration-300 ${
          inCartQty > 0
            ? "opacity-100"
            : "opacity-100 md:opacity-0 md:group-hover:opacity-100 pointer-events-auto md:pointer-events-none md:group-hover:pointer-events-auto"
        }`}
      >
        <ProductCartControls
          variant="shop"
          variantId={product.variantId}
          product={formattedProduct}
        />
      </div>

      <div className="mt-6 space-y-1">
        <h2 className="text-lg tracking-wide">{product.title}</h2>
        <p className="text-sm text-neutral-500">Handcrafted Textile</p>
        <p className="font-medium mt-2">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}
