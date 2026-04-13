import { shopifyFetch } from "@/app/lib/shopify";
import { normalizeShopifyCartLines } from "@/app/lib/shopifyCartFormat";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { cartId, lineIds } = await req.json();

  if (!cartId || !Array.isArray(lineIds) || lineIds.length === 0) {
    return NextResponse.json(
      { error: "cartId and lineIds required" },
      { status: 400 }
    );
  }

  const data = await shopifyFetch(
    `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                    }
                    image {
                      url
                    }
                    product {
                      id
                      title
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `,
    { cartId, lineIds }
  );

  const payload = data.cartLinesRemove;

  if (!payload) {
    return NextResponse.json(
      { error: "Cart update failed" },
      { status: 502 }
    );
  }

  if (payload.userErrors?.length) {
    console.error(payload.userErrors);
    return NextResponse.json(
      { error: payload.userErrors[0].message },
      { status: 400 }
    );
  }

  const cart = payload.cart;

  if (!cart) {
    return NextResponse.json({ error: "Cart not found" }, { status: 404 });
  }

  const items = normalizeShopifyCartLines(cart);

  return NextResponse.json({
    checkoutUrl: cart.checkoutUrl,
    items,
  });
}
