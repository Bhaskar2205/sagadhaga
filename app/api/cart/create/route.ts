import { shopifyFetch } from "@/app/lib/shopify";
import { NextResponse } from "next/server";

export async function POST() {
  const data = await shopifyFetch(`
    mutation {
      cartCreate {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `);

  return NextResponse.json(data.cartCreate.cart);
}