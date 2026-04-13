import { shopifyFetch } from "@/app/lib/shopify";
import { normalizeShopifyCartLines } from "@/app/lib/shopifyCartFormat";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { cartId, lineId, quantity } = await req.json();

  if (!cartId || !lineId || typeof quantity !== "number") {
    return NextResponse.json(
      { error: "cartId, lineId, and quantity required" },
      { status: 400 }
    );
  }

  if (quantity < 1) {
    return NextResponse.json(
      { error: "Use remove endpoint for quantity below 1" },
      { status: 400 }
    );
  }

  const data = await shopifyFetch(
    `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
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
    {
      cartId,
      lines: [{ id: lineId, quantity }],
    }
  );

  const payload = data.cartLinesUpdate;

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
