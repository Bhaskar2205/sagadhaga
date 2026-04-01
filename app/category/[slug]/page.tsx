import { notFound } from "next/navigation";
import {
  CATEGORY_SLUGS,
  getCategoryLabel,
  isCategorySlug,
} from "@/app/lib/categoryTags";
import { getProductsByCategorySlug } from "@/app/lib/products";
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
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isCategorySlug(slug)) notFound();

  const products = await getProductsByCategorySlug(slug);
  const title = getCategoryLabel(slug) ?? slug;

  return (
    <main>
      <CategoryProductGrid title={title} products={products} />
    </main>
  );
}
