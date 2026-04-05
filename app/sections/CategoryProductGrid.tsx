import ProductCard from "../components/ProductCard";
import Link from "next/link";

type Props = {
  title: string;
  description?: string;
  products: any[];
  categorySlug: string;
  filterOptions?: { slug: string; label: string; depth: number }[];
  activeFilterSlug?: string;
};

export default function CategoryProductGrid({
  title,
  description,
  products,
  categorySlug,
  filterOptions = [],
  activeFilterSlug,
}: Props) {
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

      {filterOptions.length > 0 && (
        <div className="max-w-6xl mx-auto mb-12 flex flex-wrap gap-3 justify-center">
          <Link
            href={`/category/${categorySlug}`}
            className={`px-4 py-2 rounded-full text-xs tracking-widest border transition ${
              !activeFilterSlug
                ? "bg-[#2d2d2d] text-white border-[#2d2d2d]"
                : "bg-transparent text-[#4a4a4a] border-[#cfc6bc] hover:border-[#9f8f7e]"
            }`}
          >
            ALL
          </Link>

          {filterOptions.map((option) => (
            <Link
              key={option.slug}
              href={
                activeFilterSlug === option.slug
                  ? `/category/${categorySlug}`
                  : `/category/${categorySlug}?filter=${option.slug}`
              }
              className={`px-4 py-2 rounded-full text-xs tracking-widest border transition ${
                activeFilterSlug === option.slug
                  ? "bg-[#2d2d2d] text-white border-[#2d2d2d]"
                  : "bg-transparent text-[#4a4a4a] border-[#cfc6bc] hover:border-[#9f8f7e]"
              }`}
              style={{ marginLeft: option.depth > 1 ? "0.5rem" : undefined }}
            >
              {option.label.toUpperCase()}
              {activeFilterSlug === option.slug ? "  ×" : ""}
            </Link>
          ))}
        </div>
      )}

      <div className="max-w-350 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">

        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>

    </section>
  );
}
