import ProductCard from "../components/ProductCard";

type Props = {
  title: string;
  description?: string;
  products: any[];
};

export default function CategoryProductGrid({ title, description, products }: Props) {
  return (
    <section className="bg-[#f6f1e9] min-h-screen px-10 md:px-20 py-28">

      <div className="text-center mb-20">

        <h1 className="text-5xl tracking-[0.35em] font-light text-[#2d2d2d]">
          {title.toUpperCase()}
        </h1>

        {description && (
          <p className="mt-6 text-neutral-700 text-base max-w-2xl mx-auto leading-relaxed tracking-wide text-center">
            {description}
          </p>
        )}

        <div className="w-16 h-px bg-neutral-400 mx-auto mt-6" />

      </div>

      <div className="max-w-350 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">

        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>

    </section>
  );
}
