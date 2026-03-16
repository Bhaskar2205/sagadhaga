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


export async function getJewelleryProducts() {

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
          products(first: 20, query: "tag:jewellery") {
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


export async function getClothingProducts() {

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
          products(first: 20, query: "tag:clothing") {
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

  return json.data.products.edges.map((p: any) => ({
    id: p.node.id,
    title: p.node.title,
    description: p.node.description,
    handle: p.node.handle,
    images: p.node.images.edges.map((img:any)=>img.node.url),

    price: Number(p.node.variants.edges[0]?.node.price.amount || 0),
    currency: p.node.variants.edges[0]?.node.price.currencyCode || null,
    variantId: p.node.variants.edges[0]?.node.id || null
  }));
}