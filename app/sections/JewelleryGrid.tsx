import { getJewelleryProducts } from "../lib/products";
import ProductCard from "../components/ProductCard";

export default async function JewelleryGrid() {

  const products = await getJewelleryProducts();

  return (

    <section className="bg-[#f6f1e9] min-h-screen px-10 md:px-20 py-28">

  <div className="text-center mb-20">

  <h1 className="text-5xl tracking-[0.3em] font-light text-[#2d2d2d]">
  JEWELLERY
</h1>

<p className="mt-8 text-neutral-700 text-base max-w-2xl mx-auto leading-loose tracking-wide text-center">
  A curated selection of timeless handcrafted jewellery designed for elegance and everyday luxury.
</p>

  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">

        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>

    </section>
  );
}