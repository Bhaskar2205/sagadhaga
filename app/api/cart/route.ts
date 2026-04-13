import { shopifyFetch } from "@/app/lib/shopify";
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

  const items = cart.lines.edges.map(
    (edge: {
      node: {
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          price: { amount: string };
          image: { url: string } | null;
          product: { id: string; title: string };
        };
      };
    }) => {
      const { node } = edge;
      const v = node.merchandise;
      return {
        id: v.product.id,
        name: v.product.title,
        price: Number(v.price.amount),
        image: v.image?.url ?? "",
        variantId: v.id,
        quantity: node.quantity,
      };
    }
  );

  return NextResponse.json({
    checkoutUrl: cart.checkoutUrl,
    items,
  });
}
