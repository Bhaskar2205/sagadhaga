export type CartItem = {
  lineId: string;
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  variantId: string;
};

export type AddToCartInput = Omit<CartItem, "lineId">;

type ShopifyCartLines = {
  lines?: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          price: { amount: string };
          image: { url: string } | null;
          product: { id: string; title: string };
        };
      };
    }>;
  };
};

export function normalizeShopifyCartLines(
  cart: ShopifyCartLines | null | undefined
): CartItem[] {
  if (!cart?.lines?.edges?.length) return [];

  return cart.lines.edges.map((edge) => {
    const { node } = edge;
    const v = node.merchandise;
    return {
      lineId: node.id,
      id: v.product.id,
      name: v.product.title,
      price: Number(v.price.amount),
      image: v.image?.url ?? "",
      variantId: v.id,
      quantity: node.quantity,
    };
  });
}
