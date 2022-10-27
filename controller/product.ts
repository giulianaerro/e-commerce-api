import { productsIndex } from "lib/algolia";

export async function getProductById(productId: string) {
  const product = await productsIndex.getObject(productId);
  return product;
}
