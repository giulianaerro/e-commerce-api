import { productsIndex } from "lib/algolia";

export async function getProductById(id: string) {
  const product = await productsIndex.getObject(id);
  return product;
}
