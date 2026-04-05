import { notFound } from "next/navigation";
import {
  CATEGORY_SLUGS,
  getCategoryFilterOptions,
  getVisibleCategoryFilterOptions,
  getCategoryLabel,
  isCategorySlug,
  getStorefrontQueryForFilter,
} from "@/app/lib/categoryTags";
import {
  getProductsByCategorySlug,
  getProductsByStorefrontQuery,
} from "@/app/lib/products";
import CategoryProductGrid from "@/app/sections/CategoryProductGrid";

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isCategorySlug(slug)) return { title: "Category" };
  const label = getCategoryLabel(slug);
  return { title: label ? `${label} | Saga Dhaga` : "Saga Dhaga" };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ filter?: string }>;
}) {
  const { slug } = await params;
  const { filter } = await searchParams;
  if (!isCategorySlug(slug)) notFound();

  const title = getCategoryLabel(slug) ?? slug;
  const allFilterOptions = getCategoryFilterOptions(slug);
  const validFilter = allFilterOptions.some((f) => f.slug === filter) ? filter : undefined;
  const filterOptions = getVisibleCategoryFilterOptions(slug, validFilter);
  const filterQuery = validFilter
    ? getStorefrontQueryForFilter(slug, validFilter)
    : null;
  const products = filterQuery
    ? await getProductsByStorefrontQuery(filterQuery)
    : await getProductsByCategorySlug(slug);

  return (
    <main>
      <CategoryProductGrid
        title={title}
        products={products}
        categorySlug={slug}
        filterOptions={filterOptions}
        activeFilterSlug={validFilter}
      />
    </main>
  );
}
