import type { NextApiRequest, NextApiResponse } from "next";
import { productsIndex } from "lib/algolia";
import { getOfferAndLimitFromReq } from "lib/pagination";
import { byMethod } from "lib/middlewares";
import { searchProducts } from "controller/product";

const handler = byMethod({
  async get(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { offset, limit } = getOfferAndLimitFromReq(req);
      const { q } = req.query;
      const results = await searchProducts(q as string, limit, offset);

      res.send({
        results: results.hits,
        pagination: {
          offset,
          limit,
          total: results.nbHits,
        },
      });
    } catch (error) {
      res.status(401).send(error);
    }
  },
});
export default handler;
