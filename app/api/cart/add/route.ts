import { shopifyFetch } from "@/app/lib/shopify";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { cartId, variantId, quantity } = await req.json();

  const data = await shopifyFetch(
    `
    mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                quantity
                merchandise {
                  ... on ProductVariant {
                    title
                    product {
                      title
                    }
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      cartId,
      lines: [
        {
          merchandiseId: variantId,
          quantity,
        },
      ],
    }
  );

  return NextResponse.json(data.cartLinesAdd.cart);
}