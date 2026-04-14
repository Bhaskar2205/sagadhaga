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
    <section className="bg-[#f6f1e9] min-h-screen px-4 sm:px-6 md:px-12 lg:px-20 py-20 sm:py-24 md:py-28">

      <div className="text-center mb-12 sm:mb-16 md:mb-20">

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.14em] sm:tracking-[0.22em] md:tracking-[0.3em] lg:tracking-[0.35em] font-light text-[#2d2d2d]">
          {title.toUpperCase()}
        </h1>

        {description && (
          <p className="mt-4 sm:mt-6 text-neutral-700 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed tracking-wide text-center">
            {description}
          </p>
        )}

        <div className="w-14 sm:w-16 h-px bg-neutral-400 mx-auto mt-5 sm:mt-6" />

      </div>

      {filterOptions.length > 0 && (
        <div className="max-w-6xl mx-auto mb-10 sm:mb-12">
          <div className="-mx-1 px-1 overflow-x-auto">
            <div className="flex min-w-max gap-2 sm:gap-3 justify-start sm:justify-center pb-1">
              <Link
                href={`/category/${categorySlug}`}
                className={`whitespace-nowrap px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs tracking-[0.14em] sm:tracking-widest border transition ${
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
                  className={`whitespace-nowrap px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs tracking-[0.14em] sm:tracking-widest border transition ${
                    activeFilterSlug === option.slug
                      ? "bg-[#2d2d2d] text-white border-[#2d2d2d]"
                      : "bg-transparent text-[#4a4a4a] border-[#cfc6bc] hover:border-[#9f8f7e]"
                  }`}
                  style={{ marginLeft: option.depth > 1 ? "0.35rem" : undefined }}
                >
                  {option.label.toUpperCase()}
                  {activeFilterSlug === option.slug ? "  ×" : ""}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:gap-14">

        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>

    </section>
  );
}
