import algoliasearch from "algoliasearch";

const client = algoliasearch(process.env.ALGOLIA_ID, process.env.ALGOLIA_KEY);
export const productsIndex = client.initIndex("products");
