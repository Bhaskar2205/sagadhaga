import { getClothingProducts } from "../lib/products";
import ProductCard from "../components/ProductCard";

export default async function ClothingGrid() {

  const products = await getClothingProducts();

  return (

    <section className="bg-[#f3f0ff] min-h-screen px-10 md:px-20 py-28">

      {/* Heading */}

      <div className="text-center mb-20">

        <h1 className="text-5xl tracking-[0.35em] font-light text-[#2d2d2d]">
          CLOTHING
        </h1>

        <p className="mt-6 text-neutral-700 text-base max-w-2xl mx-auto leading-relaxed tracking-wide text-center">
          A curated selection of contemporary clothing designed for comfort, elegance and everyday style.
        </p>

        <div className="w-16 h-[1px] bg-neutral-400 mx-auto mt-6"></div>

      </div>

      {/* Grid */}

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">

        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>

    </section>
  );
}