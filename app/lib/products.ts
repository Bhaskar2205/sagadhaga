import {
  getStorefrontQueryForSlug,
  type CategorySlug,
} from "./categoryTags";

// ALL PRODUCTS
export async function getProducts() {

  const res = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        query: `
        {
          products(first: 10) {
            edges {
              node {
                id
                title
                handle
                images(first: 1) {
                  edges {
                    node {
                      url
                    }
                  }
                }
                variants(first: 1) {
                  edges {
                    node {
                      id
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
          }
        }
        `,
      }),
      next: { revalidate: 60 },
    }
  );

  const json = await res.json();

  return json.data.products.edges.map((p: any) => ({
    id: p.node.id,
    title: p.node.title,
    handle: p.node.handle,
    image: p.node.images.edges[0]?.node.url || null,
    price: Number(p.node.variants.edges[0]?.node.price.amount || 0),
    currency: p.node.variants.edges[0]?.node.price.currencyCode || null,
    variantId: p.node.variants.edges[0]?.node.id || null
  }));
}

function mapProductEdges(json: any) {
  return json.data.products.edges.map((p: any) => ({
    id: p.node.id,
    title: p.node.title,
    handle: p.node.handle,
    description: p.node.description,
    images: p.node.images.edges.map((img: any) => img.node.url),

    price: Number(p.node.variants.edges[0]?.node.price.amount || 0),
    currency: p.node.variants.edges[0]?.node.price.currencyCode || null,
    variantId: p.node.variants.edges[0]?.node.id || null
  }));
}

/** Single-tag filter (internal). */
async function fetchProductsByTag(tag: string) {

  const res = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        query: `
        {
          products(first: 20, query: "tag:${tag}") {
            edges {
              node {
                id
                title
                handle
                description

                images(first: 2) {
                  edges {
                    node {
                      url
                    }
                  }
                }

                variants(first: 1) {
                  edges {
                    node {
                      id
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }

              }
            }
          }
        }
        `,
      }),
      next: { revalidate: 60 },
    }
  );

  const json = await res.json();
  return mapProductEdges(json);
}

/**
 * Arbitrary Storefront search string (e.g. `tag:a OR tag:b`).
 * Used for group pages (Bedding, Kids, Accessories).
 */
async function fetchProductsByStorefrontQuery(searchQuery: string) {

  const res = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        query: `
        {
          products(first: 20, query: "${searchQuery}") {
            edges {
              node {
                id
                title
                handle
                description

                images(first: 2) {
                  edges {
                    node {
                      url
                    }
                  }
                }

                variants(first: 1) {
                  edges {
                    node {
                      id
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }

              }
            }
          }
        }
        `,
      }),
      next: { revalidate: 60 },
    }
  );

  const json = await res.json();
  return mapProductEdges(json);
}

/**
 * Fetch products for a category URL slug (see `categoryTags.ts`).
 * Single-tag queries use `fetchProductsByTag`; group pages use OR search strings.
 */
export async function getProductsByCategorySlug(slug: CategorySlug) {
  const q = getStorefrontQueryForSlug(slug)!;
  if (q.startsWith("tag:") && !q.includes(" OR ")) {
    return fetchProductsByTag(q.slice("tag:".length));
  }
  return fetchProductsByStorefrontQuery(q);
}

export async function getProductsByCategory(category: CategorySlug) {
  return getProductsByCategorySlug(category);
}
