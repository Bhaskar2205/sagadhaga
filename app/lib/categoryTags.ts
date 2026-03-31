/**
 * Category slugs mapped to Shopify Storefront `products(query: …)`.
 * These now follow top-level categories only.
 */
export const CATEGORY_SLUGS = [
  "bedding",
  "clothing",
  "kids",
  "accessories",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

const STOREFRONT_QUERY_BY_SLUG: Record<CategorySlug, string> = {
  bedding: "tag:bedding",
  clothing: "tag:clothing OR tag:bathrobes OR tag:towels",
  kids: "tag:kids",
  accessories: "tag:accessories",
};

const LABEL_BY_SLUG: Record<CategorySlug, string> = {
  bedding: "Bedding",
  clothing: "Clothing",
  kids: "Kids",
  accessories: "Accessories",
};

export function isCategorySlug(s: string): s is CategorySlug {
  return (CATEGORY_SLUGS as readonly string[]).includes(s);
}

export function getStorefrontQueryForSlug(slug: string): string | null {
  if (!isCategorySlug(slug)) return null;
  return STOREFRONT_QUERY_BY_SLUG[slug];
}

export function getCategoryLabel(slug: string): string | null {
  if (!isCategorySlug(slug)) return null;
  return LABEL_BY_SLUG[slug];
}

/** Nav structure for header / future homepage tiles */
export const CATEGORY_NAV: {
  label: string;
  slug: CategorySlug;
  children?: { label: string; slug: CategorySlug }[];
}[] = [
  { label: "Bedding", slug: "bedding" },
  { label: "Clothing", slug: "clothing" },
  { label: "Kids", slug: "kids" },
  { label: "Accessories", slug: "accessories" },
];
