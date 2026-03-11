export async function getProducts() {

  console.log("DOMAIN:", process.env.SHOPIFY_STORE_DOMAIN);
  console.log("TOKEN:", process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN);

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
                      altText
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

  console.log("STATUS:", res.status);
  console.log("SHOPIFY RESPONSE:", JSON.stringify(json, null, 2));

  if (!res.ok || json.errors) {
    console.error("API Response:", json);
    throw new Error(
      `Shopify API error: ${JSON.stringify(json.errors || res.statusText)}`
    );
  }

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