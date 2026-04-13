import { shopifyFetch } from "@/app/lib/shopify";
import { normalizeShopifyCartLines } from "@/app/lib/shopifyCartFormat";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cartId = req.nextUrl.searchParams.get("cartId");

  if (!cartId) {
    return NextResponse.json({ error: "cartId required" }, { status: 400 });
  }

  const data = await shopifyFetch(
    `
    query Cart($cartId: ID!) {
      cart(id: $cartId) {
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
    }
  `,
    { cartId }
  );

  const cart = data.cart;

  if (!cart) {
    return NextResponse.json({ error: "Cart not found" }, { status: 404 });
  }

  const items = normalizeShopifyCartLines(cart);

  return NextResponse.json({
    checkoutUrl: cart.checkoutUrl,
    items,
  });
}
