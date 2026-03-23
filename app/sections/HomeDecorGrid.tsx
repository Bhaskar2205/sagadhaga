import { getHomeDecorProducts } from "../lib/products";
import ProductCard from "../components/ProductCard";

export default async function HomeDecorGrid() {

  const products = await getHomeDecorProducts();

  return (

    <section className="bg-[#eef3f1] min-h-screen px-10 md:px-20 py-28">

      {/* Heading */}

      <div className="text-center mb-20">

        <h1 className="text-5xl tracking-[0.35em] font-light text-[#2d2d2d]">
          HOME DECOR
        </h1>

        <p className="mt-6 text-neutral-700 text-base max-w-2xl mx-auto leading-relaxed tracking-wide">
          A refined collection of handcrafted decor pieces designed to elevate your living spaces with warmth and elegance.
        </p>

        <div className="w-16 h-px bg-neutral-400 mx-auto mt-6"></div>

      </div>

      {/* Grid */}

      <div className="max-w-350 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">

        {products.map((product: any) => (
          <ProductCard key={product.variantId} product={product} />
        ))}

      </div>

    </section>
  );
}