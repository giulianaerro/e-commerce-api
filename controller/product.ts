import { productsIndex } from "lib/algolia";

export async function getProductById(productId: string) {
  const product = await productsIndex.getObject(productId);
  return product;
}
export async function searchProducts(q: string, limit: number, offset: number) {
  const result = await productsIndex.search(q, {
    hitsPerPage: limit,
    page: offset > 1 ? Math.floor(offset / limit) : 0,
  });
  return result;
}
